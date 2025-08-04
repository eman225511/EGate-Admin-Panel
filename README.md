# 🔐 EGate Admin Panel

A modern, universal web-based admin panel for managing **any** EGate API license key system. Built with Next.js, TypeScript, and Tailwind CSS.

**🌐 Live Demo:** [https://egate-admin-panel.vercel.app](https://egate-admin-panel.vercel.app)

> **Universal Compatibility**: This admin panel works with any EGate API deployment - whether you're hosting your own EGate instance or using someone else's. Just enter your API URL and admin credentials!

## ✨ Features

- 🔐 **Universal Connection** - Works with any EGate API deployment worldwide
- 🏓 **Connection Testing** - Automatically validates API connectivity and credentials
- 📋 **Complete Key Management** - View, create, delete, and reset license keys
- �️ **Bulk Operations** - Delete all keys with double confirmation for safety
- 📊 **Detailed Analytics** - View key information including HWID binding and timestamps
- 🎨 **Modern Interface** - Clean, responsive design that works on all devices
- ⚡ **Real-time Updates** - Immediate feedback on all operations
- 🛡️ **CORS-Free** - Built-in proxy to bypass CORS restrictions
- 🚀 **Zero Setup** - No installation required, use the live version instantly

## 🚀 Quick Start (No Installation Required)

1. **Visit the Live Panel**: Go to [https://egate-admin-panel.vercel.app](https://egate-admin-panel.vercel.app)
2. **Enter Your API Details**:
   - **API URL**: Your EGate API endpoint (e.g., `https://your-egate.vercel.app/api`)
   - **Admin Password**: Your EGate admin password
3. **Start Managing**: View, create, delete, and manage your license keys instantly!

## 🏠 Self-Hosting (Optional)

Want to host your own instance? Follow these steps:

### Prerequisites

- Node.js 18+ and npm
- Vercel account (for deployment)

### Installation

1. **Clone & Install**:
```bash
git clone https://github.com/eman225511/EGate-Admin-Panel.git
cd EGate-Admin-Panel
npm install
```

2. **Run Locally**:
```bash
npm run dev
# Visit http://localhost:3000
```

3. **Deploy to Vercel**:
```bash
npm run build
# Deploy to Vercel or your preferred platform
```

## Deployment

## 📖 How It Works

### Universal EGate Compatibility

This admin panel is designed to work with **any** EGate API deployment:

1. **EGate API** - The license key management system ([GitHub repo](https://github.com/eman225511/EGate))
2. **This Admin Panel** - Universal web interface for managing any EGate instance
3. **CORS Proxy** - Built-in proxy system that bypasses CORS restrictions

### Connection Process

1. Enter your EGate API URL (e.g., `https://your-project.vercel.app/api`)
2. Enter your admin password (set in your EGate's `ADMIN_PASSWORD` environment variable)
3. The panel tests connectivity and authenticates with your EGate API
4. Manage your license keys through the modern web interface

### Supported Operations

| Operation | Description | EGate Endpoint |
|-----------|-------------|----------------|
| **Connect** | Test API connectivity | `GET /ping` |
| **List Keys** | View all license keys | `GET /dump?admin=PASSWORD` |
| **Create Key** | Generate new random key | `GET /make?admin=PASSWORD` |
| **View Details** | Get key information | `GET /info?key=KEY&admin=PASSWORD` |
| **Delete Key** | Remove specific key | `GET /delete?key=KEY&admin=PASSWORD` |
| **Reset HWID** | Clear device binding | `GET /adminReset?key=KEY&admin=PASSWORD` |
| **Delete All** | Remove all keys (with confirmation) | `GET /deleteAll?admin=PASSWORD` |

## 🛡️ Security & Privacy

- **No Data Storage**: Your API credentials and keys are never stored
- **Client-Side Only**: All API communication happens in your browser
- **CORS Bypass**: Built-in proxy eliminates cross-origin issues
- **HTTPS Required**: Always use secure connections in production
- **No Tracking**: No analytics, cookies, or user tracking

## 🚀 For EGate Users

### Using with Your Own EGate

1. Deploy your EGate API following the [official guide](https://github.com/eman225511/EGate)
2. Note your deployment URL and admin password
3. Visit this admin panel: [https://egate-admin-panel.vercel.app](https://egate-admin-panel.vercel.app)
4. Enter your EGate details and start managing keys!

### Deployment URLs

Your EGate API URL will typically look like:
- `https://your-project-name.vercel.app/api`
- `https://your-custom-domain.com/api`
- `https://your-egate-123abc.vercel.app/api`

## 🔧 Development

### Local Development

```bash
# Clone and setup
git clone https://github.com/eman225511/EGate-Admin-Panel.git
cd EGate-Admin-Panel
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/               # Proxy API routes (CORS bypass)
│   │   ├── ping/          # Test connectivity
│   │   ├── dump/          # List keys
│   │   ├── create/        # Generate keys
│   │   ├── delete/        # Delete key
│   │   ├── deleteAll/     # Delete all keys
│   │   ├── reset/         # Reset HWID
│   │   └── info/          # Key details
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main application
│   └── globals.css        # Global styles
└── components/            # React components
    ├── LoginForm.tsx      # API connection form
    ├── AdminDashboard.tsx # Main dashboard
    ├── KeysList.tsx       # Key management
    └── CreateKeyForm.tsx  # Key creation
```

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for modern UI
- **Deployment**: Vercel (serverless)
- **Compatibility**: Works with any EGate API instance

## 🤝 Contributing

Contributions are welcome! This project aims to provide the best possible admin experience for all EGate users.

### How to Contribute

1. **Fork** this repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to your branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Ideas for Contributions

- 🎨 UI/UX improvements
- 🔧 New EGate API features support
- 🐛 Bug fixes and optimizations
- 📚 Documentation improvements
- 🌍 Internationalization (i18n)

## 📚 Related Projects

- **[EGate](https://github.com/eman225511/EGate)** - The serverless license key system
- **[EGate Docs](https://github.com/eman225511/EGate#readme)** - Complete EGate documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **[Eman](https://github.com/eman225511)** - Original creator of EGate and this admin panel

## 🌟 Show Support

If this project helps you manage your EGate license keys, please consider:

- ⭐ **Starring** this repository
- 🐛 **Reporting** any issues you find
- 💡 **Suggesting** new features
- 🔄 **Sharing** with other EGate users

---

<div align="center">

**🔐 Secure • 🌐 Universal • ⚡ Fast**

Made with ❤️ for the EGate community

[Live Demo](https://egate-admin-panel.vercel.app) • [EGate API](https://github.com/eman225511/EGate) • [Report Bug](https://github.com/eman225511/EGate-Admin-Panel/issues) • [Request Feature](https://github.com/eman225511/EGate-Admin-Panel/issues)

</div>

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Projects

- [EGate API](https://github.com/eman225511/EGate) - The license key management API
- [EGate Documentation](https://github.com/eman225511/EGate#readme) - Complete API documentation
