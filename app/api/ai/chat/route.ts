import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { verifyToken } from "@/middleware/auth";

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

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "You are a helpful assistant for coding1010, a luxury perfume e-commerce website. Help customers with their questions about perfumes, recommendations, and orders." }],
                },
                {
                    role: "model",
                    parts: [{ text: "Hello! I'm here to help you discover your perfect scent. How can I assist you today?" }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const reply = response.text();

        return NextResponse.json({ reply });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
