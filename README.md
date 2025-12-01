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
HUGE thanks to Calle for his work - he is an inspiration and always shipping. He's the GOAT and the one who inspired me to try and build this project.

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

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

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

## License

MIT License - see LICENSE.md for details.
