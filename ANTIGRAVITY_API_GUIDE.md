# Antigravity API Integration Guide

This guide explains how to use the Antigravity API integration in your Next.js application.

## 📋 Overview

The Antigravity API route (`/api/antigravity`) provides a secure endpoint that:
1. Authenticates users with email/password
2. Generates a JWT token for authenticated sessions
3. Calls the Antigravity API with a user-provided prompt
4. Returns both the JWT token and Antigravity response

## 🔧 Setup

### 1. Environment Variables

Create a `.env.local` file in the project root:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ANTIGRAVITY_CLIENT_KEY=your-antigravity-api-key-here
```

**Important:** 
- Replace `your-super-secret-jwt-key-change-this-in-production` with a strong random string
- Get your Antigravity API key from [https://antigravity.com/dashboard](https://antigravity.com/dashboard)
- Never commit `.env.local` to version control

### 2. Dependencies

The following dependencies are already installed:
- `jsonwebtoken` - For JWT token generation
- `@types/jsonwebtoken` - TypeScript types for jsonwebtoken

## 🚀 Usage

### API Endpoint

**URL:** `/api/antigravity`  
**Method:** `POST`  
**Content-Type:** `application/json`

### Request Body

```json
{
  "email": "test@example.com",
  "password": "password123",
  "prompt": "Your prompt for Antigravity API"
}
```

### Response (Success)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "antigravity": {
    // Antigravity API response data
  }
}
```

### Response (Error)

```json
{
  "error": "Error message"
}
```

## 🧪 Testing

### Using the Test Page

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to: [http://localhost:3000/test-antigravity](http://localhost:3000/test-antigravity)

3. Use the test credentials:
   - **Email:** test@example.com
   - **Password:** password123

4. Enter your prompt and click "Test Antigravity API"

### Using cURL

```bash
curl -X POST http://localhost:3000/api/antigravity \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "prompt": "Generate a creative perfume description"
  }'
```

### Using JavaScript/TypeScript

```typescript
const response = await fetch('/api/antigravity', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123',
    prompt: 'Your prompt here'
  }),
});

const data = await response.json();

if (response.ok) {
  console.log('JWT Token:', data.token);
  console.log('Antigravity Response:', data.antigravity);
} else {
  console.error('Error:', data.error);
}
```

## 🔐 Authentication

### Current Implementation

The route currently uses hardcoded credentials for testing:
- **Email:** test@example.com
- **Password:** password123

### Production Considerations

For production, you should:

1. **Replace hardcoded credentials** with database authentication:
   ```typescript
   // Example with a database
   const user = await db.user.findUnique({ where: { email } });
   if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
   }
   ```

2. **Hash passwords** using bcrypt or similar:
   ```bash
   npm install bcrypt
   npm install -D @types/bcrypt
   ```

3. **Add rate limiting** to prevent brute force attacks

4. **Implement refresh tokens** for better security

## 🎯 JWT Token

### Token Details

- **Algorithm:** HS256
- **Expiration:** 7 days
- **Payload:** `{ email: string }`

### Using the Token

The JWT token can be used for subsequent authenticated requests:

```typescript
const response = await fetch('/api/protected-route', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Verifying the Token

```typescript
import jwt from 'jsonwebtoken';

const token = req.headers.get('authorization')?.replace('Bearer ', '');
const decoded = jwt.verify(token, process.env.JWT_SECRET!);
```

## 🌐 Antigravity API

### API Endpoint

The route calls: `https://api.antigravity.com/v1/generate`

### Request Format

```json
{
  "prompt": "Your prompt text"
}
```

### Headers

- `Authorization: Bearer YOUR_API_KEY`
- `Content-Type: application/json`

## ⚠️ Error Handling

The API handles several error cases:

| Error | Status | Description |
|-------|--------|-------------|
| Invalid credentials | 401 | Wrong email or password |
| JWT_SECRET not set | 500 | Missing environment variable |
| ANTIGRAVITY_CLIENT_KEY not set | 500 | Missing API key |
| Antigravity API error | Varies | Error from Antigravity service |
| Internal Server Error | 500 | Unexpected server error |

## 📝 Code Structure

```
app/
├── api/
│   └── antigravity/
│       └── route.ts          # Main API route
└── test-antigravity/
    └── page.tsx              # Test page component
```

## 🔄 Next Steps

1. **Set up environment variables** in `.env.local`
2. **Get your Antigravity API key** from the dashboard
3. **Test the integration** using the test page
4. **Implement database authentication** for production
5. **Add error logging** and monitoring
6. **Implement rate limiting** for security

## 📚 Additional Resources

- [Next.js API Routes Documentation](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [JWT.io](https://jwt.io/) - JWT debugger and documentation
- [Antigravity API Documentation](https://antigravity.com/docs) - Official API docs

## 🐛 Troubleshooting

### "JWT_SECRET not set" error
- Make sure `.env.local` exists in the project root
- Restart the development server after creating the file

### "Antigravity API key not found" error
- Verify `ANTIGRAVITY_CLIENT_KEY` is set in `.env.local`
- Check that you're using the correct API key from your dashboard

### "Invalid credentials" error
- Use the test credentials: test@example.com / password123
- Check for typos in email or password

### CORS errors
- The API route runs server-side, so CORS shouldn't be an issue
- If testing from external domains, you may need to add CORS headers
