# Gemini Chat API - Complete Guide

## 📋 Overview

The `/api/chat` endpoint provides a simple chat interface powered by Google's Gemini AI. Unlike `/api/ai/chat` (which requires JWT authentication), this endpoint is open and ready to use.

## 🔧 Setup

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Add to Environment Variables

Create or update `.env.local`:

```env
GEMINI_API_KEY=AIzaSy...your-actual-key-here
```

### 3. Restart Development Server

```bash
npm run dev
```

## 🚀 Usage

### API Endpoint

**URL:** `/api/chat`  
**Method:** `POST`  
**Content-Type:** `application/json`

### Request Format

```json
{
  "message": "Your message here"
}
```

### Response Format

**Success (200):**
```json
{
  "reply": "AI generated response"
}
```

**Error (400):**
```json
{
  "error": "No message provided"
}
```

**Error (500):**
```json
{
  "error": "Server configuration error"
}
```

## 💻 Code Examples

### JavaScript/TypeScript

```typescript
const response = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: "What are the best perfumes for summer?"
  })
});

const data = await response.json();
console.log(data.reply);
```

### React Component

```typescript
"use client";

import { useState } from "react";

export default function ChatDemo() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      setReply(data.reply);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
      />
      <button type="submit" disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>
      {reply && <p>{reply}</p>}
    </form>
  );
}
```

### cURL

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about luxury perfumes"}'
```

## 🔄 API Comparison

| Feature | `/api/chat` | `/api/ai/chat` |
|---------|-------------|----------------|
| **Authentication** | ❌ None | ✅ JWT Required |
| **AI Model** | Gemini 1.5 Flash | Gemini 1.5 Flash |
| **Request** | `{ message }` | `{ message }` + Bearer token |
| **Use Case** | Public chat | Authenticated users |
| **System Prompt** | Perfume assistant | Perfume assistant |

## 🎯 Features

- ✅ **No Authentication Required** - Simple and direct
- ✅ **Gemini 1.5 Flash** - Fast and efficient AI model
- ✅ **Custom System Prompt** - Tailored for perfume e-commerce
- ✅ **Error Handling** - Comprehensive error messages
- ✅ **Logging** - Console logs for debugging
- ✅ **TypeScript** - Full type safety

## 🛠️ Implementation Details

### Using Google Generative AI SDK

The route uses the official `@google/generative-ai` package:

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: "Your custom instructions..."
});

const result = await model.generateContent(message);
const reply = result.response.text();
```

### System Instruction

The AI is configured with this system prompt:

> "You are a helpful assistant for coding0101, a luxury perfume e-commerce website. Help customers with their questions about perfumes, recommendations, and orders. Be friendly, knowledgeable, and professional."

## 🐛 Troubleshooting

### "GEMINI_API_KEY is missing"

**Solution:**
1. Create `.env.local` in project root
2. Add `GEMINI_API_KEY=your-key-here`
3. Restart the dev server

### "No message provided"

**Solution:**
Ensure your request includes a `message` field:
```json
{
  "message": "Your text here"
}
```

### API Rate Limits

Gemini API has rate limits. If you hit them:
- Wait a few moments
- Consider implementing rate limiting on your end
- Upgrade your API quota if needed

## 📊 Console Logs

The route provides helpful console logs:

```
📨 Request body: { message: "..." }
🤖 Generating response with Gemini...
✅ Reply generated: ...
```

Or on error:
```
❌ No message provided
❌ GEMINI_API_KEY is missing
💥 Unexpected error: ...
```

## 🔐 Security Considerations

### Current Implementation
- ⚠️ **No authentication** - Anyone can call this endpoint
- ⚠️ **No rate limiting** - Could be abused
- ⚠️ **API key exposed server-side** - This is OK (never expose client-side)

### For Production

Consider adding:

1. **Rate Limiting**
```typescript
// Example with a simple in-memory store
const rateLimiter = new Map();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRequests = rateLimiter.get(ip) || [];
  const recentRequests = userRequests.filter(time => now - time < 60000);
  
  if (recentRequests.length >= 10) {
    return false; // Too many requests
  }
  
  recentRequests.push(now);
  rateLimiter.set(ip, recentRequests);
  return true;
}
```

2. **Authentication** (if needed)
```typescript
// Add JWT verification like in /api/ai/chat
const user = verifyToken(req);
if (!user) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

3. **Input Validation**
```typescript
if (message.length > 1000) {
  return NextResponse.json({ error: "Message too long" }, { status: 400 });
}
```

## 📚 Related Documentation

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai)

## 🎓 Next Steps

1. ✅ **API route created** - `/api/chat/route.ts`
2. ⏳ **Add GEMINI_API_KEY** - In `.env.local`
3. ⏳ **Test the endpoint** - Use cURL or create a test page
4. ⏳ **Integrate into UI** - Add to your chat widget or create new component
5. ⏳ **Add rate limiting** - For production security

## 💡 Tips

- **Model Selection**: `gemini-1.5-flash` is fast and cost-effective. Use `gemini-1.5-pro` for more complex tasks.
- **System Instructions**: Customize the system prompt to match your brand voice.
- **Error Handling**: Always handle API errors gracefully in your UI.
- **Logging**: Use the console logs for debugging during development.

---

**Ready to test?** Just add your `GEMINI_API_KEY` and start chatting! 🚀
