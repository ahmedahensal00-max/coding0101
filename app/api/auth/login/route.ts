import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        // مثال للتحقق من المستخدم (تبدلها بالتحقق الفعلي من قاعدة البيانات)
        if (email !== "test@example.com" || password !== "password123") {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // توليد JWT
        const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "7d" });

        return NextResponse.json({ token });
    } catch (error) {
        console.error(error); // هاد السطر مهم باش تشوف الأخطاء ف logs
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
