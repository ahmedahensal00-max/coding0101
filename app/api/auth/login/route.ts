import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // In a real app, you would verify the email/password against a database here
        // For this demo, we'll just generate a token for the provided email

        const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "7d" });

        return NextResponse.json({ token });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
