from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.static.players import _get_players
from nba_api.stats.static.players import _get_active_players
from nba_api.stats.endpoints import commonteamroster
from nba_api.stats.static import teams
from nba_api.stats.endpoints import shotchartdetail
import pandas as pd
import time


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

# Fetch all players ever
players = _get_players()

# Print the first 10 players for verification
#print(players[:10])

# players_df = pd.DataFrame(players)
#print(players_df)

# RANDOM sample of players for verification
# random_players = players_df.sample(10) # 10 players
#print(random_players) # Prints their full names

# Search for exact player
# player_name = 'Nikola Jokić'
# matched_players = players_df[players_df['full_name'].str.contains(player_name, case=False)]
#print(matched_players)

# -------------------------------------------- #
# Get all NBA teams

# Use get teams function
# nba_teams = teams.get_teams()

# Convert to DataFrame
# teams_df = pd.DataFrame(nba_teams)

# print(teams_df)

# -------------------------------------------- #
# Get season IDs
# teams = get_teams()
# sample_team_id = nba_teams[0]['id']  # Use the first team from the list

# Fetch roster data for the team to extract seasons
# team_roster = commonteamroster.CommonTeamRoster(team_id=sample_team_id)

# Convert to DataFrame
# team_roster_df = team_roster.get_data_frames()[1]  # The second DataFrame contains season info

# Extract unique seasons
# seasons = team_roster_df[['SEASON', 'SEASON_ID']].drop_duplicates()

# Print the seasons
# print(seasons)



# ----------------HEATMAP EXAMPLE-------------------- #


# Fetch shot data for Stephen Curry (player_id=201939) in the 2022-23 season
player_id = 201939  # Stephen Curry
season = "2015-16"

shot_chart = shotchartdetail.ShotChartDetail(
    team_id=0,  # Use 0 for all teams
    player_id=player_id,
    season_nullable=season,
    season_type_all_star="Regular Season"
)

# Convert to DataFrame
shot_df = shot_chart.get_data_frames()[0]
print(shot_df.columns.tolist())
print(shot_df.head())

# Group data by shot zone and count attempts
shot_zone_data = shot_df.groupby(['SHOT_ZONE_BASIC', 'GAME_DATE']).size().unstack(fill_value=0)

import seaborn as sns
import matplotlib.pyplot as plt

# Create a heatmap of shot attempts by zone
plt.figure(figsize=(10, 8))
sns.heatmap(shot_zone_data, cmap="YlGnBu", annot=False)
plt.title("Shot Selection Heatmap")
plt.ylabel("Shot Zone")
plt.xlabel("Game Date")
plt.show()


# -------------------------------------------- #

# PUTTING ALL PLAYERS ALONG WITH STATS INTO SINGLE DATAFRAME


# players_subset = players[:10]  # Slicing the first 20 players

# # Step 2: Prepare a list to store career stats
# filtered_players_stats = []

# # Step 3: Define the target seasons
# target_seasons = [f"{year}-{str(year + 1)[-2:]}" for year in range(2013, 2023)]

# # Step 3: Loop through each player
# for player in players_subset:
#     player_id = player['id']
#     player_name = player['full_name']
    
#     try:
#         # Fetch career stats for the player
#         career = playercareerstats.PlayerCareerStats(player_id=player_id)
#         career_df = career.get_data_frames()[0]

#         # Filter for seasons between 2013-2023
#         career_df = career_df[career_df['SEASON_ID'].isin(target_seasons)]
        
#         # Check if the player played during the target seasons
#         if any(season in target_seasons for season in career_df['SEASON_ID']):
#             # Add player name to the DataFrame
#             career_df['PLAYER_NAME'] = player_name
            
#             # Append the player's stats to the list
#             filtered_players_stats.append(career_df)
            
#             # Optional: Print progress
#             #print(f"Included {player_name} in filtered stats")
        
#         # Sleep to avoid hitting rate limits
#         time.sleep(0.5)
        
#     except Exception as e:
#         print(f"Could not fetch stats for {player_name}: {e}")


# # Step 4: Combine all stats into a single DataFrame
# all_stats_df = pd.concat(filtered_players_stats, ignore_index=True)

# print(all_stats_df)
# #print(all_stats_df.columns.to_list)

# # Step 7: Save to CSV
# all_stats_df.to_csv("2013_2023_stats.csv", index=False)

# print("Filtered stats for the players 2013-2023")