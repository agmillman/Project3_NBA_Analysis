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
    const result = await pool.query('SELECT DISTINCT "PLAYER_NAME" AS player_name FROM public."PlayerCareer_Stats" GROUP BY "PLAYER_NAME" ORDER BY "PLAYER_NAME"');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching players:', err);
    res.status(500).send('Server error');
  }
});

// API route to fetch a specific player's stats
app.get('/api/stats/:player', async (req, res) => {
  const playerName = req.params.player;
  try {
    const result = await pool.query(
       `SELECT "season_id", "player_name", "fga", "fg3a", "ppg", "fg_pct", "fg3_pct"
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

// API route to fetch a specific player's shot profile
const fetchShotZoneData = (player) => {
  return fetch(`/api/shot-zones/${player}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching shot zone data:', error);
    });
};

app.get('/api/shot-zones/:player', async (req, res) => {
  const playerName = req.params.player;

  const query = `
    SELECT 
      "SEASON_ID" AS season_id,
      "PLAYER_NAME" AS player_name,
      CASE 
        WHEN "SHOT_ZONE_BASIC" LIKE '%3%' THEN '3 Pointer'
        WHEN "SHOT_ZONE_BASIC" LIKE 'Backcourt' THEN '3 Pointer'
        WHEN "SHOT_ZONE_BASIC" IN('Restricted Area', 'In The Paint (Non-RA)') THEN 'In The Paint'
        ELSE 'Mid-Range'
      END AS shot_zone,
      SUM("TOT_MAKES") AS shots
    FROM public."made_shots_view"
    WHERE "PLAYER_NAME" = $1
    GROUP BY season_id, player_name, shot_zone
    ORDER BY season_id, shot_zone;
  `;

  try {
    const result = await pool.query(query, [playerName]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching shot zone data:', error);
    res.status(500).send('Error fetching data');
  }
});


// Serve static files from the "public" directory
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
