# EduMate Platform

A modern, gamified educational platform built with React, TypeScript, and Tailwind CSS.

## Deployment Instructions (Mobile Friendly)

### Option 1: Replit (Recommended for Phone users)
1. Create a new Repl using the **React TypeScript** template.
2. Copy the contents of `src/` and `package.json` to your Repl.
3. Press **Run**.

### Option 2: Netlify
1. Connect your GitHub repository to Netlify.
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. The included `public/_redirects` file handles the routing automatically.

### Option 3: Vercel
1. Connect your GitHub repository to Vercel.
2. The included `vercel.json` file handles the routing automatically.

## Safety & Security
- This app uses **LocalStorage** for data persistence, meaning your data stays in your browser and is not sent to a central server.
- AI features are powered by the **Gemini API** via a secure service layer.
