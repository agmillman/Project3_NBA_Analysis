CREATE VIEW public.playersummary AS
SELECT 
    "SEASON_ID" AS season_id, 
    "PLAYER_ID" AS player_id,
	"PLAYER_NAME" as player_name,
	"FGA" AS fga,
    "FG_PCT" AS fg_pct, 
    "FG3M" AS fg3m, 
    "FG3A" AS fg3a, 
    "FG3_PCT" AS fg3_pct, 
    "AST" AS ast, 
    "STL" AS stl, 
    "BLK" AS blk, 
    ROUND(SUM("PTS")::NUMERIC / NULLIF(SUM("GP"), 0), 3) AS ppg
FROM 
    public."PlayerCareer_Stats"
GROUP BY 
    "SEASON_ID", 
    "PLAYER_ID",
	"PLAYER_NAME",
	"FGA",
    "FG_PCT", 
    "FG3M", 
    "FG3A", 
    "FG3_PCT", 
    "AST", 
    "STL", 
    "BLK";

SELECT * FROM public."playersummary"

-- DROP VIEW public.playersummary