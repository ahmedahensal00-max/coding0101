import { NextResponse } from "next/server";
import { verifyToken } from "@/app/api/auth/verifyToken";

export async function POST(req: Request) {
    // Verify JWT token
    const user = verifyToken(req);
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "Missing API key" }, { status: 500 });
        }

        // Gemini API Endpoint (gemini-1.5-flash)
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [{ text: message }]
                }
            ],
            systemInstruction: {
                parts: [{ text: "You are a helpful assistant for coding0101, a luxury perfume e-commerce website. Help customers with their questions about perfumes, recommendations, and orders." }]
            }
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Gemini API Error:", errorData);
            return NextResponse.json({ error: "Failed to fetch from Gemini API" }, { status: response.status });
        }

        const data = await response.json();

        // Extract the text from the response
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";

        return NextResponse.json({ reply });

    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
