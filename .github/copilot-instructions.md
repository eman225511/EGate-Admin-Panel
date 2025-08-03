<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a Next.js admin panel for the EGate API license key management system. 

Key features:
- Connects to EGate API with custom URL and admin password
- Tests connection using /ping endpoint
- Lists all keys using /dump endpoint  
- Manages individual keys with create, delete, reset, and info operations
- Built with Next.js, TypeScript, and Tailwind CSS
- Designed for deployment on Vercel

The application structure:
- `/src/app/page.tsx` - Main page with login/dashboard switching
- `/src/components/LoginForm.tsx` - API connection form
- `/src/components/AdminDashboard.tsx` - Main dashboard layout
- `/src/components/KeysList.tsx` - Keys listing and management
- `/src/components/CreateKeyForm.tsx` - New key creation form

When working on this project, focus on:
- Maintaining clean TypeScript interfaces
- Following Tailwind CSS patterns
- Handling API errors gracefully
- Ensuring responsive design
- Security best practices for admin authentication
