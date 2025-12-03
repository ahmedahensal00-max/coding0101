"use client";

import { useState, useCallback } from "react";

interface UseGeminiChatReturn {
    sendMessage: (message: string) => Promise<string>;
    loading: boolean;
    error: string | null;
    reply: string | null;
    reset: () => void;
}

/**
 * Custom React hook for Gemini Chat API
 * 
 * @example
 * ```tsx
 * const { sendMessage, loading, error, reply } = useGeminiChat();
 * 
 * const handleSubmit = async () => {
 *   try {
 *     const response = await sendMessage("Hello!");
 *     console.log(response);
 *   } catch (err) {
 *     console.error(err);
 *   }
 * };
 * ```
 */
export function useGeminiChat(): UseGeminiChatReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [reply, setReply] = useState<string | null>(null);

    const sendMessage = useCallback(async (message: string): Promise<string> => {
        if (!message.trim()) {
            throw new Error("Message cannot be empty");
        }

        setLoading(true);
        setError(null);
        setReply(null);

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
            return data.reply;

        } catch (err: any) {
            const errorMessage = err.message || "An error occurred";
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setLoading(false);
        setError(null);
        setReply(null);
    }, []);

    return { sendMessage, loading, error, reply, reset };
}
