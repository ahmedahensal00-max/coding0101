"use client";

import { useState } from "react";
import { useAntigravity } from "@/hooks/useAntigravity";

export default function AntigravityHookDemo() {
    const [prompt, setPrompt] = useState("Generate a creative perfume description for a summer fragrance");
    const { generate, loading, error, data, token, reset } = useAntigravity();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        try {
            await generate(prompt);
        } catch (err) {
            // Error is already handled by the hook
            console.error("Generation failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Antigravity API Hook Demo
                    </h1>
                    <p className="text-purple-200 text-lg">
                        Using the <code className="bg-white/10 px-2 py-1 rounded">useAntigravity()</code> custom hook
                    </p>
                </div>

                <div className="grid gap-6">
                    {/* Input Form */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-purple-200 mb-2">
                                    Enter Your Prompt
                                </label>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                                    placeholder="Describe what you want to generate..."
                                    required
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={loading || !prompt.trim()}
                                    className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Generating...
                                        </span>
                                    ) : (
                                        "Generate with Antigravity"
                                    )}
                                </button>

                                {(data || error) && (
                                    <button
                                        type="button"
                                        onClick={reset}
                                        className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="bg-red-500/20 backdrop-blur-lg rounded-2xl p-6 border border-red-500/50">
                            <div className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-red-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h3 className="text-red-200 font-semibold mb-1">Error Occurred</h3>
                                    <p className="text-red-100">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Success Display */}
                    {data && (
                        <div className="space-y-4">
                            <div className="bg-green-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-500/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <svg className="w-6 h-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="text-green-200 font-semibold text-lg">Generation Successful!</h3>
                                </div>
                                <p className="text-green-100 text-sm">
                                    Your content has been generated and a JWT token has been created.
                                </p>
                            </div>

                            {/* JWT Token */}
                            {token && (
                                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                                    <h3 className="text-purple-200 font-semibold mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                        </svg>
                                        JWT Token
                                    </h3>
                                    <div className="bg-black/30 rounded-lg p-4 overflow-x-auto">
                                        <code className="text-purple-200 text-xs font-mono break-all">
                                            {token}
                                        </code>
                                    </div>
                                    <p className="text-purple-300 text-xs mt-2">
                                        Token expires in 7 days • Stored in localStorage
                                    </p>
                                </div>
                            )}

                            {/* Antigravity Response */}
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                                <h3 className="text-purple-200 font-semibold mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    Antigravity Response
                                </h3>
                                <div className="bg-black/30 rounded-lg p-4 overflow-x-auto max-h-96">
                                    <pre className="text-purple-200 text-sm font-mono">
                                        {JSON.stringify(data, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Hook State Info */}
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                        <h3 className="text-purple-200 font-semibold mb-4">Hook State</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-black/20 rounded-lg p-3">
                                <p className="text-purple-300 text-xs mb-1">Loading</p>
                                <p className="text-white font-semibold">
                                    {loading ? "✓ True" : "✗ False"}
                                </p>
                            </div>
                            <div className="bg-black/20 rounded-lg p-3">
                                <p className="text-purple-300 text-xs mb-1">Has Error</p>
                                <p className="text-white font-semibold">
                                    {error ? "✓ True" : "✗ False"}
                                </p>
                            </div>
                            <div className="bg-black/20 rounded-lg p-3">
                                <p className="text-purple-300 text-xs mb-1">Has Data</p>
                                <p className="text-white font-semibold">
                                    {data ? "✓ True" : "✗ False"}
                                </p>
                            </div>
                            <div className="bg-black/20 rounded-lg p-3">
                                <p className="text-purple-300 text-xs mb-1">Has Token</p>
                                <p className="text-white font-semibold">
                                    {token ? "✓ True" : "✗ False"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Code Example */}
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                        <h3 className="text-purple-200 font-semibold mb-3">Usage Example</h3>
                        <div className="bg-black/30 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-purple-200 text-sm font-mono">
                                {`import { useAntigravity } from "@/hooks/useAntigravity";

function MyComponent() {
  const { generate, loading, error, data } = useAntigravity();

  const handleClick = async () => {
    try {
      const result = await generate("Your prompt here");
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? "Loading..." : "Generate"}
    </button>
  );
}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
