# EGate Admin Panel

A modern web-based admin panel for managing EGate API license keys. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🔐 **Secure Authentication** - Connect with your EGate API URL and admin password
- 🏓 **Connection Testing** - Automatically tests API connectivity using the `/ping` endpoint
- 📋 **Key Management** - View, create, delete, and reset license keys
- 📊 **Detailed Information** - View key details including HWID binding and creation dates
- 🎨 **Modern UI** - Clean, responsive interface built with Tailwind CSS
- ⚡ **Real-time Actions** - Immediate feedback on all operations

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- An EGate API instance (deployed on Vercel)
- Admin password for your EGate API

### Installation

1. Clone this repository:
```bash
git clone https://github.com/your-username/egate-admin-panel.git
cd egate-admin-panel
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Usage

1. **Connect to API**: Enter your EGate API URL (e.g., `https://your-api.vercel.app/api`) and admin password
2. **View Keys**: Browse all license keys with their status and binding information
3. **Create Keys**: Generate new random license keys
4. **Manage Keys**: 
   - View detailed information about any key
   - Reset HWID binding for customer support
   - Delete keys when no longer needed

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

The app will be available at `https://your-app.vercel.app`

### Environment Variables

No environment variables are required. The admin panel connects to your EGate API using the URL and password provided through the web interface.

## API Endpoints Used

This admin panel interacts with the following EGate API endpoints:

- `GET /ping` - Test API connectivity
- `GET /dump?admin=PASSWORD` - List all license keys  
- `GET /make?admin=PASSWORD` - Create new license key
- `GET /info?key=KEY&admin=PASSWORD` - Get key information
- `GET /delete?key=KEY&admin=PASSWORD` - Delete a key
- `GET /adminReset?key=KEY&admin=PASSWORD` - Reset key HWID binding

## Security Notes

- Admin passwords are not stored - they're only used for API requests
- All API communication happens client-side
- No sensitive data is persisted in the application
- Always use HTTPS for production deployments

## Development

### Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main page
│   └── globals.css     # Global styles
└── components/         # React components
    ├── LoginForm.tsx           # API connection form
    ├── AdminDashboard.tsx      # Main dashboard layout  
    ├── KeysList.tsx            # Keys listing and management
    └── CreateKeyForm.tsx       # New key creation form
```

### Built With

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React](https://reactjs.org/) - UI library

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Projects

- [EGate API](https://github.com/eman225511/EGate) - The license key management API
- [EGate Documentation](https://github.com/eman225511/EGate#readme) - Complete API documentation
