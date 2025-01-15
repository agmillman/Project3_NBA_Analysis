const express = require('express');
const { Client } = require('pg');
const path = require('path');

const app = express();
const PORT = 3000;

const dbClient = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'nba_stats',
    password: 'B@$3ball',
    port: 5432,
});

dbClient.connect();

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' folder

// API to fetch players
app.get('/players', async (req, res) => {
    try {
        const result = await dbClient.query('SELECT "PLAYER_NAME", "PLAYER_ID" FROM public."PlayerCareer_Stats"');
        res.json(result.rows.map(player => ({
            id: player.player_id,
            first_name: player.player_name.split(' ')[0],
            last_name: player.player_name.split(' ')[1]
        })));
    } catch (err) {
        console.error('Database query error', err);
        res.status(500).send('Error retrieving players');
    }
});

// API to fetch player stats
app.get('/player-stats', async (req, res) => {
    const { playerId } = req.query;
    // Assuming playercareerstats is correctly imported and used
    const careerStats = await playercareerstats.PlayerCareerStats(player_id = playerId).get_data_frames();
    const stats = careerStats[0].map(season => ({ season: season['SEASON_ID'], pts: season['PTS'] }));
    res.json(stats);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
