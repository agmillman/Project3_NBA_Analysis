const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nba_stats',
  password: 'B@$3ball',
  port: 5432,
});

// API route to fetch players
app.get('/api/players', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT "PLAYER_NAME" AS player_name FROM public."PlayerCareer_Stats" GROUP BY "PLAYER_NAME" HAVING COUNT(*) = 10 ORDER BY "PLAYER_NAME"');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching players:', err);
    res.status(500).send('Server error');
  }
});

// Endpoint to fetch stats for a specific player
app.get('/api/stats/:player', async (req, res) => {
  const playerName = req.params.player;
  try {
    const result = await pool.query(
      `SELECT "season_id", "ppg", "fg_pct"
       FROM public."playersummary"
       WHERE "player_name" = $1
       ORDER BY "season_id"`,
      [playerName]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(`Error fetching stats for ${playerName}:`, err);
    res.status(500).send('Server error');
  }
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
