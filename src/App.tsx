import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const isButtonDisabled = !message;

  async function chat() {
    if (!message.trim()) return;

    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setMessageList([...messageList, await invoke("send_to_rust", { message })]);
    setMessage("");
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check for Cmd+Enter or Ctrl+Enter
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();

      // Cast event.currentTarget or event.target to HTMLTextAreaElement
      const target = event.currentTarget as HTMLTextAreaElement;

      if (target.form) {
        // Use `requestSubmit` to ensure the onSubmitHandler is called
        target.form.requestSubmit();
      }
    }
  };

  return (
    <main className="container">
      <h1>OpenChat</h1>

      <ul>
        {messageList.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>

      <form
        className="prompt-container"
        onSubmit={(e) => {
          e.preventDefault();
          chat();
        }}
      >
        <textarea
          id="message-input"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          placeholder="Enter a message..."
        />
        <button
          className="chat-button"
          disabled={isButtonDisabled}
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5" /* Slightly thicker for that UI look */
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* The Arrow Head */}
            <path d="m17 11-5-5-5 5" />
            {/* The Arrow Stem */}
            <path d="M12 18V6" />
          </svg>
        </button>
      </form>
    </main>
  );
}

export default App;
