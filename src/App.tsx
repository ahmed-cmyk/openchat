import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [rustMsg, setRustMsg] = useState("");
  const [message, setMessage] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setRustMsg(await invoke("send_to_rust", { message }));
  }

  return (
    <main className="container">
      <h1>OpenChat</h1>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="message-input"
          onChange={(e) => setMessage(e.currentTarget.value)}
          placeholder="Enter a message..."
        />
        <button type="submit">Submit Message</button>
      </form>
      <p>{rustMsg}</p>
    </main>
  );
}

export default App;
