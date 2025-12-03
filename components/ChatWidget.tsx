"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hello! How can I help you discover your perfect scent today?" },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Auto-login on mount to get token
    useEffect(() => {
        const login = async () => {
            try {
                // Check if we already have a token in localStorage
                const storedToken = localStorage.getItem("chatToken");
                if (storedToken) return;

                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: "guest@coding0101.com" }),
                });
                const data = await res.json();
                if (data.token) {
                    localStorage.setItem("chatToken", data.token);
                }
            } catch (error) {
                console.error("Failed to login:", error);
            }
        };
        login();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const token = localStorage.getItem("chatToken");
            if (!token) throw new Error("No authentication token");

            const response = await fetch("/api/ai/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ message: userMessage }),
            });

            if (response.status === 401) {
                // Token might be expired, clear it
                localStorage.removeItem("chatToken");
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: "Session expired. Please refresh the page." },
                ]);
                return;
            }

            if (!response.ok) throw new Error("Failed to fetch response");

            const data = await response.json();
            setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[350px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
                                        <path d="m19 13-1.5-3" />
                                        <path d="M5 13 6.5 10" />
                                        <path d="M21.18 13A10 10 0 1 1 2.82 13" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold">AI Assistant</h3>
                                    <p className="text-xs text-white/80">Ask me anything about perfumes</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-full p-1 hover:bg-white/20"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="h-[400px] overflow-y-auto bg-gray-50 p-4 dark:bg-zinc-900/50">
                            <div className="flex flex-col gap-4">
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.role === "user"
                                                ? "bg-purple-600 text-white"
                                                : "bg-white text-gray-800 shadow-sm dark:bg-zinc-800 dark:text-gray-200"
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="flex items-center gap-1 rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-zinc-800">
                                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
                                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
                                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="border-t border-gray-100 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m22 2-7 20-4-9-9-4Z" />
                                        <path d="M22 2 11 13" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 transition-shadow hover:shadow-purple-600/50"
            >
                {isOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m18 15-6-6-6 6" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                )}
            </motion.button>
        </div>
    );
}
