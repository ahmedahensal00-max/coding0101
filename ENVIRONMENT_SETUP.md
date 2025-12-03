# Environment Variables Configuration

This file contains the required environment variables for the Antigravity API integration.

## Required Variables

Create a `.env.local` file in the project root with the following variables:

```env
# JWT Secret for token generation
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Antigravity API Key
# Get your key from: https://antigravity.com/dashboard
ANTIGRAVITY_CLIENT_KEY=your-antigravity-api-key-here
```

## Setup Instructions

1. Copy the above content to a new file named `.env.local` in the project root
2. Replace `your-super-secret-jwt-key-change-this-in-production` with a strong random string
3. Replace `your-antigravity-api-key-here` with your actual Antigravity API key
4. Restart the development server after creating the file

## Security Notes

- Never commit `.env.local` to version control (it's already in `.gitignore`)
- Use different keys for development and production environments
- Keep your API keys secure and rotate them regularly
