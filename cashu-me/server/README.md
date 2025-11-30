# Leaderboard API Server

Simple Express server for storing and retrieving game scores and gamer tags.

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3001` by default.

## API Endpoints

### POST /api/scores
Submit a new score.

Request body:
```json
{
  "gameType": "reaction-time",
  "npub": "npub1...",
  "gamerTag": "Player1",
  "score": 150,
  "timestamp": 1234567890,
  "gameData": {}
}
```

### GET /api/scores/:gameType
Get leaderboard for a specific game type.

Response:
```json
{
  "entries": [
    {
      "npub": "npub1...",
      "gamerTag": "Player1",
      "bestScore": 150,
      "gamesPlayed": 5,
      "lastPlayed": 1234567890,
      "gameType": "reaction-time"
    }
  ]
}
```

### GET /api/scores
Get all scores (for debugging).

### POST /api/gamer-tags
Set a gamer tag for a user.

Request body:
```json
{
  "npub": "npub1...",
  "gamerTag": "Player1"
}
```

### GET /api/gamer-tags/:npub
Get gamer tag for a specific npub.

### GET /api/gamer-tags
Get all gamer tags.

### GET /api/health
Health check endpoint.

## Data Storage

Scores and gamer tags are stored in JSON files in the `data/` directory:
- `data/scores.json` - All game scores
- `data/gamer-tags.json` - All gamer tags

## Environment Variables

- `PORT` - Server port (default: 3001)

## Frontend Configuration

Set the API URL in your frontend environment:

```bash
# .env
VITE_API_URL=http://localhost:3001
```

Or update `quasar.config.js` to set it in the build.

