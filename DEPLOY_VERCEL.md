# Deploying to Vercel

To deploy the **Smart Stadium Management System** to Vercel, we will deploy the Frontend and Backend as two separate projects, linked together.

> **Important**: The SQLite database (`db.sqlite3`) will be **read-only** and will reset on every redeployment on Vercel. For a real production app, you should connect a cloud database (like Neon or Supabase).

## Prerequisites
1. Create a [GitHub account](https://github.com/) and push this code to a new repository.
2. Create a [Vercel account](https://vercel.com/).

## Step 1: Deploy Backend (Django)

1. Go to your Vercel Dashboard and click **"Add New..."** -> **"Project"**.
2. Import your GitHub repository.
3. **Configure Project**:
   - **Root Directory**: Click "Edit" and select `backend`.
   - **Framework Preset**: Vercel should auto-detect, or leave as Other.
   - **Environment Variables**: None needed for MVP (unless using external DB).
4. Click **Deploy**.
5. Once deployed, Vercel will give you a domain (e.g., `smart-stadium-backend.vercel.app`). **Copy this URL.**

## Step 2: Deploy Frontend (React)

1. Go back to Vercel Dashboard and click **"Add New..."** -> **"Project"**.
2. Import the **same** GitHub repository again.
3. **Configure Project**:
   - **Root Directory**: Click "Edit" and select `frontend`.
   - **Framework Preset**: Vite.
4. **Environment Variables**:
   We need to tell the frontend where the backend lives.
   - Add a variable named: `VITE_API_URL`
   - Value: `https://your-backend-url.vercel.app` (The URL you copied in Step 1).
   *Note: You might need to update the axios config in `frontend/src/context/AuthContext.tsx` to use this env var if it's hardcoded.*
5. Click **Deploy**.

## Step 3: Final Configuration

1. Go to your **Backend Project** settings on Vercel.
2. Add the **Frontend URL** to `ALLOWED_HOSTS` or CORS settings if needed (for this MVP, allowing all helps).
3. Ensure your `frontend/src/context/AuthContext.tsx` is updated to look for `import.meta.env.VITE_API_URL || 'http://localhost:8000/api'`.

Your Smart Stadium App is now live!
