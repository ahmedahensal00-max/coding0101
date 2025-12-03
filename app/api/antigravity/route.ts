import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, prompt } = body;

        // Hardcoded credentials check (as per request)
        if (email !== "test@example.com" || password !== "password123") {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Generate JWT
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET is not defined");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const token = jwt.sign({ email }, secret, { expiresIn: "7d" });

        // Check Antigravity API Key
        const API_KEY = process.env.ANTIGRAVITY_CLIENT_KEY;
        if (!API_KEY) {
            console.error("ANTIGRAVITY_CLIENT_KEY is not defined");
            return NextResponse.json({ error: "Antigravity API key not found" }, { status: 500 });
        }

        // Call Antigravity API
        const agResponse = await fetch("https://api.antigravity.com/v1/generate", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        });

        if (!agResponse.ok) {
            const text = await agResponse.text();
            console.error("Antigravity API error:", text);
            return NextResponse.json({ error: text }, { status: agResponse.status });
        }

        const agData = await agResponse.json();

        // Return JWT and Antigravity response
        return NextResponse.json({ token, antigravity: agData });

    } catch (error) {
        console.error("Next.js API error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
