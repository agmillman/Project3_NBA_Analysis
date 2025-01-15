---------------------------------------------------------------------------
-- SCRIPT TO GENERATE INSERT STATEMENT FOR THE PlayerCareer_Stats TABLE
--
-- NOTE:  The last comma will need to be deleted from the generated script
---------------------------------------------------------------------------

COPY (
	SELECT 'INSERT INTO public."PlayerCareer_Stats" ("PLAYER_ID", "SEASON_ID", "LEAGUE_ID", "TEAM_ID", "TEAM_ABBREVIATION", "PLAYER_AGE", "GP", "GS", "MIN", "FGM", "FGA", "FG_PCT", "FG3M", "FG3A", "FG3_PCT", "FTM", "FTA", "FT_PCT", "OREB", "DREB", "REB", "AST", "STL", "BLK", "TOV", "PF", "PTS", "PLAYER_NAME") VALUES' AS FIELD1
	
	UNION
	
	SELECT 
	    CONCAT('(',
	        "PLAYER_ID", ', ',
	        '''', "SEASON_ID", '''', ', ',
	        "LEAGUE_ID", ', ',
	        "TEAM_ID", ', ',
	        '''', "TEAM_ABBREVIATION", '''', ', ',
	        "PLAYER_AGE", ', ',
	        "GP", ', ',
	        "GS", ', ',
	        "MIN", ', ',
	        "FGM", ', ',
	        "FGA", ', ',
	        "FG_PCT", ', ',
	        "FG3M", ', ',
	        "FG3A", ', ',
	        "FG3_PCT", ', ',
	        "FTM", ', ',
	        "FTA", ', ',
	        "FT_PCT", ', ',
	        "OREB", ', ',
	        "DREB", ', ',
	        "REB", ', ',
	        "AST", ', ',
	        "STL", ', ',
	        "BLK", ', ',
	        "TOV", ', ',
	        "PF", ', ',
	        "PTS", ', ',
			'''', REPLACE("PLAYER_NAME", '''', ''''''), '''', '), ') AS FIELD1
	FROM public."PlayerCareer_Stats"
	ORDER BY FIELD1 DESC
) TO 'C:\Users\Public\Documents\player_stats_insert.sql';
