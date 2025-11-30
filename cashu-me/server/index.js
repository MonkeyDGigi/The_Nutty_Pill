const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, 'data');
const SCORES_FILE = path.join(DATA_DIR, 'scores.json');
const GAMER_TAGS_FILE = path.join(DATA_DIR, 'gamer-tags.json');

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

// Read scores from file
async function readScores() {
  try {
    const data = await fs.readFile(SCORES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write scores to file
async function writeScores(scores) {
  await ensureDataDir();
  await fs.writeFile(SCORES_FILE, JSON.stringify(scores, null, 2));
}

// Read gamer tags from file
async function readGamerTags() {
  try {
    const data = await fs.readFile(GAMER_TAGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

// Write gamer tags to file
async function writeGamerTags(gamerTags) {
  await ensureDataDir();
  await fs.writeFile(GAMER_TAGS_FILE, JSON.stringify(gamerTags, null, 2));
}

// API Routes

// Submit a score
app.post('/api/scores', async (req, res) => {
  try {
    const { gameType, npub, gamerTag, score, timestamp, gameData } = req.body;
    
    if (!gameType || !npub || typeof score !== 'number') {
      return res.status(400).json({ error: 'Missing required fields: gameType, npub, score' });
    }
    
    const scores = await readScores();
    const newScore = {
      id: `score-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      gameType,
      npub,
      gamerTag,
      score,
      timestamp: timestamp || Date.now(),
      gameData,
    };
    
    scores.push(newScore);
    
    // Keep only last 10000 scores to prevent file from growing too large
    if (scores.length > 10000) {
      scores.sort((a, b) => b.timestamp - a.timestamp);
      scores.splice(10000);
    }
    
    await writeScores(scores);
    
    res.json({ success: true, score: newScore });
  } catch (error) {
    console.error('Error submitting score:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get leaderboard for a game type
app.get('/api/scores/:gameType', async (req, res) => {
  try {
    const { gameType } = req.params;
    const scores = await readScores();
    const gamerTags = await readGamerTags();
    
    // Filter scores by game type
    const gameScores = scores.filter(s => s.gameType === gameType);
    
    // Group by npub and get best score for each user
    const entriesMap = new Map();
    
    gameScores.forEach(score => {
      const existing = entriesMap.get(score.npub);
      const tag = score.gamerTag || gamerTags[score.npub];
      
      if (!existing || score.score > existing.bestScore) {
        entriesMap.set(score.npub, {
          npub: score.npub,
          gamerTag: tag,
          bestScore: score.score,
          gamesPlayed: (existing?.gamesPlayed || 0) + 1,
          lastPlayed: Math.max(existing?.lastPlayed || 0, score.timestamp),
          gameType: gameType,
        });
      } else if (existing) {
        existing.gamesPlayed++;
        existing.lastPlayed = Math.max(existing.lastPlayed, score.timestamp);
      }
    });
    
    const entries = Array.from(entriesMap.values())
      .sort((a, b) => b.bestScore - a.bestScore);
    
    res.json({ entries });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all scores (for debugging/admin)
app.get('/api/scores', async (req, res) => {
  try {
    const scores = await readScores();
    res.json({ scores });
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Set gamer tag
app.post('/api/gamer-tags', async (req, res) => {
  try {
    const { npub, gamerTag } = req.body;
    
    if (!npub || !gamerTag) {
      return res.status(400).json({ error: 'Missing required fields: npub, gamerTag' });
    }
    
    const gamerTags = await readGamerTags();
    gamerTags[npub] = gamerTag;
    await writeGamerTags(gamerTags);
    
    res.json({ success: true, gamerTag });
  } catch (error) {
    console.error('Error setting gamer tag:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get gamer tag for a npub
app.get('/api/gamer-tags/:npub', async (req, res) => {
  try {
    const { npub } = req.params;
    const gamerTags = await readGamerTags();
    const gamerTag = gamerTags[npub] || null;
    res.json({ npub, gamerTag });
  } catch (error) {
    console.error('Error fetching gamer tag:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all gamer tags
app.get('/api/gamer-tags', async (req, res) => {
  try {
    const gamerTags = await readGamerTags();
    res.json({ gamerTags });
  } catch (error) {
    console.error('Error fetching gamer tags:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(`Leaderboard API server running on http://localhost:${PORT}`);
});

