# 今日待辦：GitHub Copilot 實戰工作坊作品集

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。作品以純前端技術實作，讓使用者可以建立、管理與篩選日常待辦事項，並將資料保存在瀏覽器中。

## 線上展示

[查看線上展示](https://<你的帳號>.github.io/<你的repo名稱>/)

> 請將網址中的 `<你的帳號>` 與 `<你的repo名稱>` 替換成實際的 GitHub 帳號與 repository 名稱。

## 功能

- 新增待辦事項。
- 防止輸入空白內容時建立待辦事項。
- 勾選待辦事項並標記為完成，完成項目會顯示刪除線並淡化。
- 刪除單筆待辦事項。
- 清除所有已完成的待辦事項，操作前會顯示確認對話框。
- 沒有已完成事項時，自動隱藏「清除已完成」按鈕。
- 顯示整體未完成待辦事項數量，統計不受篩選條件影響。
- 依「全部」、「未完成」與「已完成」篩選待辦事項。
- 篩選後沒有符合項目時，顯示對應的提示文字。
- 支援淺色與深色模式切換。
- 記住使用者選擇的主題偏好，重新整理後仍會保留。
- 使用者尚未手動選擇主題時，跟隨作業系統的深淺色設定。
- 使用響應式版面支援手機螢幕。
- 待辦資料保存於 `localStorage`，重新整理頁面後資料仍會保留。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用任何前端框架或外部套件。
- 不依賴外部 CDN，可離線開啟與運作。
- 使用 CSS 變數集中管理介面色彩，支援淺色與深色主題。
- 使用瀏覽器 `localStorage` 保存待辦資料與主題偏好。

## 開發方式

本專案是在 GitHub Copilot 實戰工作坊中，透過以下方式逐步完成：

- 使用 GitHub Copilot Agent Mode，依照需求建立待辦清單的介面與互動功能。
- 透過 MCP 整合 Microsoft Learn 與 GitHub，查詢官方文件及 repository issue。
- 使用 `.github/prompts/` 中的 `fix-issue.prompt.md`，建立從讀取 issue、提出計畫、修改、驗證到建立 Pull Request 的 agentic workflow。
- 依照 GitHub issue 的需求進行功能修正，並透過分支、commit 與 Pull Request 管理變更。

## 我學到什麼

- 如何使用 GitHub Copilot Agent Mode 將自然語言需求轉換成可運作的前端功能。
- 如何使用 `localStorage` 保存瀏覽器端資料，讓頁面重新整理後仍能保留狀態。
- 如何使用 MCP 連接官方文件與 GitHub repository，取得開發所需的上下文。
- 如何透過 `.github/prompts/` 建立有順序、有確認點的 agentic workflow。
- 如何使用 GitHub issue、分支與 Pull Request 追蹤並交付功能變更。
