const STORAGE_KEY = "my-copilot-todos";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const clearCompletedButton = document.querySelector("#clear-completed");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeLabel = document.querySelector(".theme-label");
const filterButtons = document.querySelectorAll(".filter-button");

let todos = loadTodos();
let activeFilter = "all";

const THEME_STORAGE_KEY = "my-copilot-theme";
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

// 從瀏覽器儲存空間取回上次的待辦資料。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch (error) {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function getEffectiveTheme() {
  return document.documentElement.dataset.theme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

// 套用使用者手動選擇的主題，沒有選擇時交給作業系統設定。
function applyTheme(theme) {
  if (theme) {
    document.documentElement.dataset.theme = theme;
  } else {
    delete document.documentElement.dataset.theme;
  }

  const isDark = getEffectiveTheme() === "dark";
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "淺色模式" : "深色模式";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

function filterTodos() {
  if (activeFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  }

  if (activeFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

function getEmptyMessage() {
  if (todos.length === 0) {
    return "還沒有任何待辦事項，新增一個吧!";
  }

  if (activeFilter === "active") {
    return "太好了，目前沒有未完成事項!";
  }

  if (activeFilter === "completed") {
    return "目前還沒有已完成事項。";
  }

  return "還沒有任何待辦事項，新增一個吧!";
}

// 依目前資料重新繪製清單與未完成數量。
function renderTodos() {
  list.replaceChildren();
  const visibleTodos = filterTodos();
  emptyState.textContent = getEmptyMessage();
  emptyState.hidden = visibleTodos.length > 0;

  visibleTodos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item";
    item.dataset.id = todo.id;

    if (todo.completed) {
      item.classList.add("is-complete");
    }

    const checkbox = document.createElement("input");
    checkbox.className = "todo-check";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `完成待辦：${todo.text}`);
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除待辦：${todo.text}`);
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));

    item.append(checkbox, text, deleteButton);
    list.append(item);
  });

  const remainingTodos = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成: ${remainingTodos} 項`;
  clearCompletedButton.hidden = !todos.some((todo) => todo.completed);
}

function updateFilterButtons() {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === activeFilter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function addTodo(text) {
  todos.push({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    text,
    completed: false,
  });
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

function clearCompletedTodos() {
  if (!todos.some((todo) => todo.completed)) {
    return;
  }

  if (!confirm("確定要刪除所有已完成的待辦事項嗎？")) {
    return;
  }

  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    input.focus();
    return;
  }

  addTodo(text);
  form.reset();
  input.focus();
});

clearCompletedButton.addEventListener("click", clearCompletedTodos);

themeToggle.addEventListener("click", () => {
  const nextTheme = getEffectiveTheme() === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    updateFilterButtons();
    renderTodos();
  });
});

systemThemeQuery.addEventListener("change", () => {
  if (!localStorage.getItem(THEME_STORAGE_KEY)) {
    applyTheme();
  }
});

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
applyTheme(savedTheme === "light" || savedTheme === "dark" ? savedTheme : undefined);
updateFilterButtons();
renderTodos();