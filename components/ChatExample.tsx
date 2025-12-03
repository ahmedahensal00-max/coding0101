"use client";

import { useState } from "react";

export default function ChatComponent() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [token, setToken] = useState("");

    const login = async () => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "user@example.com" }),
        });
        const data = await res.json();
        setToken(data.token);
        alert("Logged in! Token: " + data.token.substring(0, 10) + "...");
    };

    const sendMessage = async () => {
        if (!token) return alert("Please login first");

        const res = await fetch("/api/ai/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ message }),
        });

        if (res.status === 401) {
            return alert("Unauthorized! Please login again.");
        }

        const data = await res.json();
        setResponse(data.reply);
    };

    return (
        <div className="p-4 space-y-4">
            <button onClick={login} className="bg-blue-500 text-white px-4 py-2 rounded">
                Login (Get Token)
            </button>

            <div className="flex gap-2">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border p-2 rounded text-black"
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage} className="bg-green-500 text-white px-4 py-2 rounded">
                    Send
                </button>
            </div>

            {response && (
                <div className="bg-gray-100 p-4 rounded text-black">
                    <strong>AI:</strong> {response}
                </div>
            )}
        </div>
    );
}
