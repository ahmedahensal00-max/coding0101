"use client";

import { useState } from "react";

export default function GeminiChatTest() {
    const [message, setMessage] = useState("What are the best perfumes for summer?");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);
        setError(null);
        setReply("");

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to get response");
            }

            setReply(data.reply);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const exampleQuestions = [
        "What are the best perfumes for summer?",
        "Recommend a luxury perfume for evening wear",
        "What's the difference between Eau de Parfum and Eau de Toilette?",
        "Tell me about oud-based fragrances",
        "How should I store my perfumes?"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Gemini Chat API Test
                    </h1>
                    <p className="text-purple-200 text-lg">
                        Powered by Google Gemini 1.5 Flash
                    </p>
                </div>

                {/* Main Chat Interface */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-purple-200 mb-2">
                                Your Message
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
                                placeholder="Ask anything about perfumes..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !message.trim()}
                            className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Thinking...
                                </span>
                            ) : (
                                "Send Message"
                            )}
                        </button>
                    </form>
                </div>

                {/* Example Questions */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
                    <h3 className="text-purple-200 font-semibold mb-3">Try These Questions:</h3>
                    <div className="space-y-2">
                        {exampleQuestions.map((question, index) => (
                            <button
                                key={index}
                                onClick={() => setMessage(question)}
                                className="w-full text-left px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-purple-100 text-sm transition-colors"
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-500/20 backdrop-blur-lg rounded-2xl p-6 border border-red-500/50 mb-6">
                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-red-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="text-red-200 font-semibold mb-1">Error</h3>
                                <p className="text-red-100">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reply Display */}
                {reply && (
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-start gap-3 mb-4">
                            <svg className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="flex-1">
                                <h3 className="text-green-200 font-semibold mb-3">Gemini's Response:</h3>
                                <div className="bg-black/20 rounded-lg p-4">
                                    <p className="text-white whitespace-pre-wrap leading-relaxed">{reply}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* API Info */}
                <div className="mt-6 bg-blue-500/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
                    <h3 className="text-blue-200 font-semibold mb-3">API Information</h3>
                    <div className="space-y-2 text-blue-100 text-sm">
                        <p><strong>Endpoint:</strong> <code className="bg-black/20 px-2 py-1 rounded">/api/chat</code></p>
                        <p><strong>Method:</strong> POST</p>
                        <p><strong>Model:</strong> Gemini 1.5 Flash</p>
                        <p><strong>Authentication:</strong> None required</p>
                        <p><strong>Request:</strong> <code className="bg-black/20 px-2 py-1 rounded">{`{ "message": "..." }`}</code></p>
                        <p><strong>Response:</strong> <code className="bg-black/20 px-2 py-1 rounded">{`{ "reply": "..." }`}</code></p>
                    </div>
                </div>

                {/* Code Example */}
                <div className="mt-6 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h3 className="text-purple-200 font-semibold mb-3">Code Example</h3>
                    <div className="bg-black/30 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-purple-200 text-sm font-mono">
                            {`const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "Your question" })
});

const data = await response.json();
console.log(data.reply);`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
