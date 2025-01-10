from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.static.players import _get_players
from nba_api.stats.static.players import _get_active_players
import pandas as pd


# Fetch Nikola Jokić's career stats (player_id='203999')
career = playercareerstats.PlayerCareerStats(player_id='203999')

# Get data as a pandas DataFrame
df = career.get_data_frames()[0]

# Print the DataFrame
#print(df)

# Get data as JSON
json_data = career.get_json()
#print(json_data)

# Get data as a dictionary
dict_data = career.get_dict()
#print(dict_data)

# Fetch all players
players = _get_active_players()

# Print the first 10 players for verification
#print(players[:10])
players_df = pd.DataFrame(players)
print(players_df.head(10))

#random sample of players
#random_players = players_df.sample(10)

# Print their full names
#print(random_players)