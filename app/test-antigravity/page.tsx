"use client";

import { useState } from "react";

export default function AntigravityTest() {
    const [email, setEmail] = useState("test@example.com");
    const [password, setPassword] = useState("password123");
    const [prompt, setPrompt] = useState("Generate a creative perfume description");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const res = await fetch("/api/antigravity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, prompt }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "An error occurred");
            } else {
                setResponse(data);
            }
        } catch (err) {
            setError("Failed to connect to the API");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">
                    Antigravity API Test
                </h1>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Prompt
                            </label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Processing..." : "Test Antigravity API"}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
                            <h3 className="text-red-300 font-semibold mb-2">Error:</h3>
                            <p className="text-red-200">{error}</p>
                        </div>
                    )}

                    {response && (
                        <div className="mt-6 space-y-4">
                            <div className="p-4 bg-green-900/50 border border-green-500 rounded-lg">
                                <h3 className="text-green-300 font-semibold mb-2">Success!</h3>
                                <p className="text-green-200 text-sm">JWT Token generated and API called successfully</p>
                            </div>

                            <div className="p-4 bg-gray-900/50 border border-gray-600 rounded-lg">
                                <h3 className="text-gray-300 font-semibold mb-2">JWT Token:</h3>
                                <p className="text-gray-400 text-xs break-all font-mono">
                                    {response.token}
                                </p>
                            </div>

                            <div className="p-4 bg-gray-900/50 border border-gray-600 rounded-lg">
                                <h3 className="text-gray-300 font-semibold mb-2">Antigravity Response:</h3>
                                <pre className="text-gray-400 text-xs overflow-auto">
                                    {JSON.stringify(response.antigravity, null, 2)}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-8 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg">
                    <h3 className="text-blue-300 font-semibold mb-2">Test Credentials:</h3>
                    <ul className="text-blue-200 text-sm space-y-1">
                        <li>• Email: test@example.com</li>
                        <li>• Password: password123</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
