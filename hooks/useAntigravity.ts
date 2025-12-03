"use client";

import { useState, useCallback } from "react";

interface AntigravityResponse {
    token: string;
    antigravity: any;
}

interface UseAntigravityReturn {
    generate: (prompt: string) => Promise<any>;
    loading: boolean;
    error: string | null;
    data: any | null;
    token: string | null;
    reset: () => void;
}

/**
 * Custom React hook for Antigravity API integration
 * 
 * @example
 * ```tsx
 * const { generate, loading, error, data } = useAntigravity();
 * 
 * const handleSubmit = async () => {
 *   try {
 *     const result = await generate("Generate a perfume description");
 *     console.log(result);
 *   } catch (err) {
 *     console.error(err);
 *   }
 * };
 * ```
 */
export function useAntigravity(): UseAntigravityReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    const generate = useCallback(async (prompt: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/antigravity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: "test@example.com",
                    password: "password123",
                    prompt
                })
            });

            const result: AntigravityResponse = await response.json();

            if (!response.ok) {
                throw new Error((result as any).error || "API call failed");
            }

            setData(result.antigravity);
            setToken(result.token);

            // Store token in localStorage for future use
            if (result.token) {
                localStorage.setItem("antigravity_token", result.token);
            }

            return result.antigravity;
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
        setData(null);
        setToken(null);
    }, []);

    return { generate, loading, error, data, token, reset };
}
