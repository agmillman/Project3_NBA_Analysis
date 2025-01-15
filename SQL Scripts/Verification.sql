--------------------------------------------------------------------------------------------------
-- Verify the following record counts:
-- Player Stats Count: 6423
-- Seasons Count: 10
-- Teams Count: 31
--------------------------------------------------------------------------------------------------

SELECT 'Seasons Count' AS TableName, COUNT(*) AS Records
	FROM public."Seasons"

UNION

SELECT 'Teams Count' AS TableName, COUNT(*) AS Records
	FROM public."Teams"

UNION

SELECT 'Player Stats Count' AS TableName, COUNT(*) AS Records
	FROM public."PlayerCareer_Stats";
