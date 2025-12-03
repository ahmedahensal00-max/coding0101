# Antigravity API Usage Examples

## ✅ Correct Usage

### Basic Fetch Example

```typescript
const response = await fetch("/api/antigravity", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "test@example.com",
    password: "password123",
    prompt: "Hello Antigravity!"
  })
});

const data = await response.json();

console.log("JWT Token:", data.token);
console.log("Antigravity Response:", data.antigravity);
```

### With Error Handling

```typescript
async function callAntigravity(prompt: string) {
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

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "API call failed");
    }

    const data = await response.json();
    
    // Store JWT token for future use
    localStorage.setItem("antigravity_token", data.token);
    
    return data.antigravity;
  } catch (error) {
    console.error("Antigravity API Error:", error);
    throw error;
  }
}

// Usage
const result = await callAntigravity("Generate a perfume description");
```

### React Component Example

```typescript
"use client";

import { useState } from "react";

export default function AntigravityDemo() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
      />
      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Submit"}
      </button>
      
      {error && <div className="error">{error}</div>}
      {result && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(result.antigravity, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}
```

### Using with Stored Token

```typescript
// First call - Get token and result
const firstResponse = await fetch("/api/antigravity", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "test@example.com",
    password: "password123",
    prompt: "First prompt"
  })
});

const firstData = await firstResponse.json();
const token = firstData.token;

// Store token for later use
localStorage.setItem("jwt_token", token);

// Later, you can use this token for authenticated requests
// (if you create protected routes that verify JWT)
const protectedResponse = await fetch("/api/protected-route", {
  headers: {
    "Authorization": `Bearer ${token}`
  }
});
```

## ❌ Common Mistakes

### Wrong Endpoint

```typescript
// ❌ WRONG - This calls the AI chat API, not Antigravity
const response = await fetch("/api/ai/chat", {
  method: "POST",
  body: JSON.stringify({
    email: "test@example.com",
    password: "password123",
    prompt: "Hello"
  })
});

// ✅ CORRECT - Use /api/antigravity
const response = await fetch("/api/antigravity", {
  method: "POST",
  body: JSON.stringify({
    email: "test@example.com",
    password: "password123",
    prompt: "Hello"
  })
});
```

### Missing Required Fields

```typescript
// ❌ WRONG - Missing email and password
const response = await fetch("/api/antigravity", {
  method: "POST",
  body: JSON.stringify({
    prompt: "Hello"
  })
});

// ✅ CORRECT - All required fields included
const response = await fetch("/api/antigravity", {
  method: "POST",
  body: JSON.stringify({
    email: "test@example.com",
    password: "password123",
    prompt: "Hello"
  })
});
```

### Not Handling Errors

```typescript
// ❌ WRONG - No error handling
const response = await fetch("/api/antigravity", { /* ... */ });
const data = await response.json();
console.log(data.antigravity); // Might fail if response has error

// ✅ CORRECT - Proper error handling
const response = await fetch("/api/antigravity", { /* ... */ });
const data = await response.json();

if (!response.ok) {
  console.error("Error:", data.error);
  return;
}

console.log(data.antigravity);
```

## 🔄 Integration Patterns

### Pattern 1: One-time Call

```typescript
// Simple one-time API call
async function generateContent(prompt: string) {
  const res = await fetch("/api/antigravity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "test@example.com",
      password: "password123",
      prompt
    })
  });
  
  const data = await res.json();
  return data.antigravity;
}
```

### Pattern 2: With Token Caching

```typescript
// Cache token to avoid re-authentication
let cachedToken: string | null = null;

async function getToken() {
  if (cachedToken) return cachedToken;
  
  const res = await fetch("/api/antigravity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "test@example.com",
      password: "password123",
      prompt: "init" // Dummy prompt to get token
    })
  });
  
  const data = await res.json();
  cachedToken = data.token;
  return cachedToken;
}

async function callAntigravity(prompt: string) {
  await getToken(); // Ensure we have a token
  
  const res = await fetch("/api/antigravity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "test@example.com",
      password: "password123",
      prompt
    })
  });
  
  return (await res.json()).antigravity;
}
```

### Pattern 3: Custom Hook (React)

```typescript
import { useState, useCallback } from "react";

export function useAntigravity() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      setData(result.antigravity);
      return result.antigravity;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { generate, loading, error, data };
}

// Usage in component:
function MyComponent() {
  const { generate, loading, error, data } = useAntigravity();

  const handleClick = async () => {
    await generate("My prompt");
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        Generate
      </button>
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

## 🎯 Production Considerations

### Environment-based Credentials

```typescript
// Don't hardcode credentials in production
const credentials = {
  email: process.env.NEXT_PUBLIC_ANTIGRAVITY_EMAIL || "test@example.com",
  password: process.env.NEXT_PUBLIC_ANTIGRAVITY_PASSWORD || "password123"
};

const response = await fetch("/api/antigravity", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    ...credentials,
    prompt: "My prompt"
  })
});
```

### Rate Limiting

```typescript
// Simple client-side rate limiting
let lastCallTime = 0;
const MIN_INTERVAL = 1000; // 1 second between calls

async function rateLimitedCall(prompt: string) {
  const now = Date.now();
  const timeSinceLastCall = now - lastCallTime;
  
  if (timeSinceLastCall < MIN_INTERVAL) {
    await new Promise(resolve => 
      setTimeout(resolve, MIN_INTERVAL - timeSinceLastCall)
    );
  }
  
  lastCallTime = Date.now();
  
  return fetch("/api/antigravity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "test@example.com",
      password: "password123",
      prompt
    })
  });
}
```

## 📚 See Also

- [ANTIGRAVITY_API_GUIDE.md](./ANTIGRAVITY_API_GUIDE.md) - Complete API documentation
- [ANTIGRAVITY_QUICKSTART.md](./ANTIGRAVITY_QUICKSTART.md) - Quick setup guide
- [Test Page](http://localhost:3000/test-antigravity) - Interactive testing interface
