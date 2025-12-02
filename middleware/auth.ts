import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request) {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return null;

    const token = authHeader.split(" ")[1]; // Bearer TOKEN

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded;
    } catch {
        return null;
    }
}

export function generateToken(payload: object, expiresIn: string = "7d") {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn });
}
