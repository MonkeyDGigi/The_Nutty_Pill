# Cashu Arcade

A minimalist React web app for Cashu wallet management with a gaming focus.

## Features

- **🎮 Games Hub**: Browse placeholder games (Stake Duel, Arcade Challenge, Tournaments)
- **💼 Wallet**: Basic Cashu wallet with send/receive functionality
- **👥 Friends**: Manage friends and send challenges with privacy controls
- **⚙️ Profile**: User settings with username, mint URL, and privacy toggle

## Tech Stack

- **React 18** with Vite
- **JavaScript** (no TypeScript)
- **React Router** for navigation
- **@cashu/cashu-ts** for wallet operations (currently stubbed)
- **CSS Modules/Global CSS** with dark theme

## Project Structure

```
src/
├── main.jsx              # React entry point
├── App.jsx               # Main app with routing
├── index.css             # Global styles
├── components/
│   └── SetupScreen.jsx   # First-time setup
├── pages/
│   ├── GamesPage.jsx     # Games hub
│   ├── WalletPage.jsx    # Wallet interface
│   ├── FriendsPage.jsx   # Friends management
│   └── ProfilePage.jsx   # User settings
└── utils/
    └── wallet.js         # Cashu wallet utilities
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## User Flow

### First Visit
- Setup screen prompts for username, Cashu mint URL, and privacy preference
- Data saved to localStorage

### Main App
- **Games**: View placeholder games (coming soon)
- **Wallet**: Check balance, send/receive sats (currently mocked)
- **Friends**: Add friends, view players based on privacy setting
- **Profile**: Update settings

## Privacy Modes

- **Public**: Profile visible to all, can receive challenges from anyone
- **Private**: Only friends can see profile and send challenges

## Wallet Integration

The wallet module (`src/utils/wallet.js`) provides stubs for:
- `initWallet(mintUrl)` - Initialize with Cashu mint
- `getBalance()` - Get current sat balance
- `receive(amount)` - Generate receive token
- `send(amount, destination)` - Send sats

Currently uses mock data. Replace with real @cashu/cashu-ts calls for production.

## Data Storage

All user data stored in localStorage:
- `username` - User's display name
- `mintUrl` - Cashu mint URL
- `privacy` - "public" or "private"
- `friends` - Array of friend objects

## Development Notes

- Dark theme with CSS custom properties
- Responsive design
- No external state management (uses React state + localStorage)
- ESLint configured for React

## Future Enhancements

- Real Cashu wallet integration
- Game implementations
- WebSocket for real-time challenges
- Backend for persistent data
- PWA features


