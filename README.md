# DaivAI - AI Chat Web Application

DaivAI is a modern, responsive, and robust AI chat web application built using React, Vite, TailwindCSS (v4), and Zustand. It allows users to simulate multi-engine chat sessions or use real AI engines with persistent state management and a clean, modular component architecture.

## Full Project Summary

DaivAI provides a dual-panel layout (Sidebar + Chat Area) similar to industry-standard AI chat interfaces like ChatGPT. It features complete persistent offline storage for your chats, giving you the ability to create, switch, rename, and delete conversations cleanly. Furthermore, the chat elements support hover actions to edit and delete individual messages. 

It contains both a "Fallback/Simulated" AI mode with smart artificial delays, dummy formatting, and a real **Google Gemini API Integration**. 

### Features Implemented
- **Dual-Panel Interface:** Responsive sidebar navigation with collapsible design and a vast central chat area.
- **State Management:** Fully integrated `zustand` global state with `persist` middleware (local browser storage).
- **CRUD Chat Operations:** Creating new sessions, renaming them inline, deleting them with confirmation modals, and switching active history.
- **Message Controls:** Edit existing prompts or delete specific messages seamlessly within the conversation.
- **AI Integration (Gemini 1.5 Flash):** Capable of generating brilliant responses via Google Generative AI natively. Included a secure UI Settings Modal for inserting your own personal API Key.
- **Fallback Simulation Engine:** Mimics latency, simulates typing loaders, outputs formatted code blocks, and returns mock responses when real API Keys are absent.
- **Dynamic Auto-resizing Layouts:** The chat input automatically expands based on content height, and the chat timeline auto-scrolls to the newest message smoothly.
- **Tailwind v4 Aesthetics:** Sleek gray scale layout containing vivid UI accents, shadow variants, custom scrollbars, and hover interactions.

## Setup Instructions

### Prerequisites
Make sure you have Node.js installed on your machine (v18+ recommended). 

### Installation
1. Clone or download this project.
2. Open your terminal in the root folder (where `package.json` is located).
3. Run the following command to install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To spin up the local development server:
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

### Connecting to Real AI (Google Gemini)
1. Get a free API Key from [Google AI Studio](https://aistudio.google.com/).
2. Start your local server and open the web app.
3. Click the **Settings (gear) icon** in the top right corner of the header.
4. Paste your API Key into the **Gemini API Key** field.
5. Click **Save & Close**.
6. Send a message! The application will automatically route through Google's neural models. *(Note: keys are stored securely and directly in your local browser storage never touching a backend).*

## Tech Stack
- Frontend Framework: **React**
- Build Tool: **Vite**
- Styling: **TailwindCSS (v4)**
- State Management: **Zustand**
- Icons: **Lucide React**
- API Wrapper: **@google/generative-ai**
