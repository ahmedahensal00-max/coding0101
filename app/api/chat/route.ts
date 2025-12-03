import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("📨 Request body:", body);

        const { message } = body;
        if (!message) {
            console.error("❌ No message provided");
            return NextResponse.json({ error: "No message provided" }, { status: 400 });
        }

        // Check for Gemini API key
        const geminiApiKey = process.env.GEMINI_API_KEY;
        if (!geminiApiKey) {
            console.error("❌ GEMINI_API_KEY is missing");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        // Initialize Gemini AI
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "You are a helpful assistant for coding0101, a luxury perfume e-commerce website. Help customers with their questions about perfumes, recommendations, and orders. Be friendly, knowledgeable, and professional."
        });

        console.log("🤖 Generating response with Gemini...");

        // Generate content
        const result = await model.generateContent(message);
        const response = result.response;
        const reply = response.text();

        console.log("✅ Reply generated:", reply.substring(0, 100) + "...");

        return NextResponse.json({ reply });

    } catch (error: any) {
        console.error("💥 Unexpected error:", error);

        // Provide more detailed error information
        const errorMessage = error?.message || "Internal Server Error";
        const errorDetails = error?.response?.data || error?.toString();

        console.error("Error details:", errorDetails);

        return NextResponse.json({
            error: "Internal Server Error",
            details: process.env.NODE_ENV === "development" ? errorMessage : undefined
        }, { status: 500 });
    }
}
