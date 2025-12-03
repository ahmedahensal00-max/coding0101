# 🚀 Antigravity API - Quick Start

## ⚡ 3-Step Setup

### 1️⃣ Create `.env.local`
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ANTIGRAVITY_CLIENT_KEY=your-antigravity-api-key-here
```

### 2️⃣ Start Dev Server
```bash
npm run dev
```

### 3️⃣ Test the API
Visit: **http://localhost:3000/test-antigravity**

---

## 📝 Test Credentials
- **Email:** `test@example.com`
- **Password:** `password123`

---

## 🔌 API Endpoint

**POST** `/api/antigravity`

```json
{
  "email": "test@example.com",
  "password": "password123",
  "prompt": "Your prompt here"
}
```

**Response:**
```json
{
  "token": "JWT_TOKEN_HERE",
  "antigravity": { /* API response */ }
}
```

---

## 📚 Full Documentation
See **ANTIGRAVITY_API_GUIDE.md** for complete details.
