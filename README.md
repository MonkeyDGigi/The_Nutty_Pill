# The Nutty Pill

An orange pilling project based on the Cashu.me wallet. Help your friends and family learn about Bitcoin while earning sats!

## About

The Nutty Pill is an educational application that gamifies Bitcoin learning. Users complete lessons about Bitcoin and unlock sats (satoshis) as rewards. It's designed for orange pillers who want to help their friends and family learn about Bitcoin in an engaging way.

### Key Features

- **Bitcoin Education**: 84 lessons across 4 topics:
  - 📜 Bitcoin History (21 lessons) - From the whitepaper to today
  - ⚙️ The Tech (21 lessons) - How Bitcoin works under the hood
  - 💰 21M/∞ (21 lessons) - Hard money vs infinite fiat
  - 🔐 Stay Sovereign (21 lessons) - Hold your own keys, stay in control

- **Reward System**: Lock sats in a reward pool that learners unlock by completing lessons with 100% scores
- **Progress Tracking**: Track lesson completion and unlocked sats locally on the device
- **Multiple Themes**: Customizable visual themes including Neon Cyberpunk (default), Kawaii, and more
- **PWA Support**: Install as a Progressive Web App for native-like experience
- **Based on Cashu**: Built on the Cashu.me ecash wallet infrastructure

## Credits

This project is based on [cashu.me](https://github.com/cashubtc/cashu.me).  
Huge thanks to the original authors for their work.

This project is a fork/derivative of cashu.me. The original project uses the MIT license (see LICENSE.md).

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd The_Nutty_Pill/cashu-me
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### Building for Production

Build as a Progressive Web App:
```bash
npm run build
# or
npm run build:pwa
```

The built files will be in `cashu-me/dist/spa/`

## How to Use

### For Orange Pillers (Setup)

1. **Install on Learner's Device**: Set up The Nutty Pill on your friend's or family member's device
2. **Create Wallet**: During onboarding, a wallet will be created
3. **Secure the Seed Phrase**: **Important** - Save the wallet's seed phrase securely. This allows you to access the wallet on cashu.me if needed to unlock sats or recover funds if something goes wrong
4. **Add Sats**: Receive sats to the wallet from a Cashu mint
5. **Set Reward Pool**: Go to Settings to set the total reward pool. All sats are locked by default and can only be unlocked by completing lessons
6. **Let Them Learn**: Progress is saved locally on their device. Learners complete lessons and unlock sats as they progress!

### For Learners

1. **Complete Lessons**: Navigate through the 4 topics and complete lessons
2. **Answer Questions**: Each lesson includes questions to test understanding
3. **Unlock Sats**: Earn sats by completing lessons with 100% scores
4. **Track Progress**: See your progress for each topic (x/21 lessons completed)

## Project Structure

```
The_Nutty_Pill/
├── cashu-me/              # Main application directory
│   ├── src/
│   │   ├── pages/           # Main application pages
│   │   │   ├── HomePage.vue      # Main education interface
│   │   │   ├── WalletPage.vue    # Wallet interface
│   │   │   ├── Settings.vue      # App settings
│   │   │   └── MintsPage.vue     # Mint management
│   │   ├── stores/          # Pinia state management
│   │   │   ├── education.ts      # Lesson progress and rewards
│   │   │   └── bitcoin-lessons.ts  # Lesson content
│   │   ├── components/      # Reusable Vue components
│   │   └── css/            # Styles and themes
│   ├── public/             # Static assets
│   │   └── icons/          # PWA icons
│   └── quasar.config.js    # Quasar framework configuration
└── README.md              # This file
```

## Development Commands

Navigate to the `cashu-me` directory first:

```bash
cd cashu-me
```

### Lint the files
```bash
npm run lint
```

### Format the files
```bash
npm run format
```

### Check translations
```bash
npm run i18n:check
```

### Run tests
```bash
npm test
```

## Deployment

### Netlify

The project is configured for Netlify deployment. The `netlify.toml` file specifies:
- Base directory: `cashu-me`
- Build command: `npm install && npm run build`
- Publish directory: `cashu-me/dist/spa`

### Docker

```bash
cd cashu-me
docker-compose up -d
```

Access at `http://localhost:3000` or serve it behind a reverse proxy.

### Reverse Proxy (Caddy)

For Quasar Vue Router with history mode, add this fallback URL to allow refreshes:

`Caddyfile`:
```
# CORS snippet by https://kalnytskyi.com/posts/setup-cors-caddy-2/
(cors) {
  @cors_preflight method OPTIONS
  @cors header Origin {args.0}

  handle @cors_preflight {
    header Access-Control-Allow-Origin "{args.0}"
    header Access-Control-Allow-Methods "GET, POST, PUT, PATCH, DELETE"
    header Access-Control-Allow-Headers "Content-Type"
    header Access-Control-Max-Age "3600"
    respond "" 204
  }

  handle @cors {
    header Access-Control-Allow-Origin "{args.0}"
    header Access-Control-Expose-Headers "Link"
  }
}
host.com {
    import cors *
    encode gzip

    header /service-worker.js {
            Service-Worker-Allowed "/"
            Cache-Control "no-cache"
    }

    # SPA root
    root * /usr/share/caddy/the-nutty-pill/

    # quasar vue router fallback history mode
    try_files {path} /index.html

    file_server
}
```

## Mobile App (Capacitor)

After updating code, run:

```bash
cd cashu-me
quasar build -m pwa
npx cap copy
npx cap sync
npx cap open android / ios
```

Regenerate assets:
```bash
npx capacitor-assets generate
```

## Configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js) for customization options.

## License

MIT License - see LICENSE.md for details.
