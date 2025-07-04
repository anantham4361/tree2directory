# 🗂️ AI-Powered Directory Script Generator

This is a web-based tool that allows developers to **generate OS-specific scripts** from a directory structure input. You paste a directory tree (like from AI or `tree` command), choose the target operating system (Windows/Linux/macOS), and the app returns a fully working `.bat` or `.sh` script to auto-generate that structure.

---

## 🚀 Idea Behind This Project

Developers frequently receive directory layouts from AI tools or design documents. Rebuilding these folder/file trees manually is time-consuming or requires writing custom scripts.

> This tool bridges that gap: Just paste → Choose OS → Download & Run the script.

- 🔧 Saves time and effort
- 💻 Works on Windows or Linux/macOS
- 🧠 Powered by OpenRouter AI (free-tier support)

---

## 🛠️ Tech Stack

| Layer         | Technology                         |
|--------------|-------------------------------------|
| Frontend      | React (Vite)                        |
| API/AI Model  | OpenRouter AI (e.g. Mistral, LLaMA) |
| Hosting       | Vercel                              |
| Styling       | Custom CSS (Tailwind optional)      |
| Tooling       | Axios, dotenv (Vite env support)    |

---

## 🧭 How It Works (Process Flow)

1. **User Input**:
   - Enters directory tree in `tree` format
   - Selects OS: `Windows (.bat)` or `Linux/macOS (.sh)`

2. **Prompt Generation**:
   - App builds a system prompt instructing the AI to convert the directory tree into minimal, valid shell/batch scripts

3. **AI API Call**:
   - Script is requested from OpenRouter using models like `mistral-7b-instruct` or `openchat`

4. **Response Parsing**:
   - Shell/BAT script is extracted and displayed in a code preview

5. **Download + Instructions**:
   - Script can be downloaded as `.bat` or `.sh`
   - Step-by-step OS-specific instructions provided

---

## 🧩 Module Descriptions

| Module | File | Description |
|--------|------|-------------|
| `App.jsx` | Main UI | Entire application logic and UI built inside a single file using React |
| `.env` | Env Config | Stores the OpenRouter API key securely for local use |
| `vite.config.js` | Vite Config | Vite bundler config (auto-handled by Vercel) |
| `index.html` | Template | Root HTML shell for rendering app |
| `vercel.json` *(optional)* | Deployment | Customize builds or routes if needed |

---
##💡 Features

✅ Converts tree structure to .sh or .bat

✅ Optimized, minimal shell/batch code

✅ One-click download

✅ OS-specific instructions

✅ Free model (OpenRouter) support

--- 
##📥 How to Run Downloaded Script

###🪟 Windows (.bat)

Right-click generate.bat

Select “Run as Administrator”

###🐧 Linux/macOS (.sh)


<pre>```chmod +x generate.sh```</pre>

<pre>```./generate.sh```</pre>
