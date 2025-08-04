# EGate Admin Panel - Deployment Guide

## Quick Deploy to Vercel

1. **Prepare Repository**
   - Push this code to your GitHub repository
   - Make sure the repository is public or you have a Vercel Pro account for private repos

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will automatically detect it's a Next.js project
   - Click "Deploy"

3. **Use Your Admin Panel**
   - Once deployed, you'll get a URL like `https://your-app.vercel.app`
   - Open the URL and enter:
     - **API URL**: Your EGate API URL (e.g., `https://your-app.vercel.app/api`)
     - **Admin Password**: Your EGate API admin password

## Manual Deployment

If you prefer to deploy manually or to another platform:

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server  
npm start
```

### Build and Deploy
```bash
# Build the application
npm run build

# The built files will be in the .next directory
# Deploy the entire project folder to your hosting platform
```

## Environment Variables

This admin panel doesn't require any environment variables since it connects to your EGate API through the web interface.

## Security Considerations

- Always use HTTPS in production
- Your admin password is not stored anywhere - it's only used for API requests
- The admin panel communicates directly with your EGate API from the browser
- No sensitive data is persisted in the application

## Troubleshooting

### "Cannot connect to API"
- Verify your EGate API URL is correct and accessible
- Check that your API is deployed and running
- Make sure the `/ping` endpoint responds with `{"status": "ok"}`

### "Invalid admin password"
- Double-check your admin password matches the `ADMIN_PASSWORD` environment variable in your EGate API deployment
- Ensure there are no extra spaces or special characters

### "Failed to load keys"
- This usually indicates an authentication issue
- Verify your admin password is correct
- Check that the `/dump` endpoint is working in your EGate API

## Support

For issues specific to this admin panel, please create an issue in this repository.
For EGate API issues, refer to the [EGate repository](https://github.com/eman225511/EGate).
