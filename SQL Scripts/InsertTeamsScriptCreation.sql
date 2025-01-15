---------------------------------------------------------------------------
-- SCRIPT TO GENERATE INSERT STATEMENT FOR THE Teams TABLE
--
-- NOTE:  The last comma will need to be deleted from the generated script
---------------------------------------------------------------------------

COPY (
	SELECT 'INSERT INTO public."Teams" ("id", "full_name", "abbreviation", "nickname", "city", "state", "year_founded") VALUES' AS FIELD1
	
	UNION
	
	SELECT 
	    CONCAT('(',
	        "id", ', ',
	        '''', "full_name", '''', ', ',
			'''', "abbreviation", '''', ', ',
			'''', "nickname", '''', ', ',
			'''', "city", '''', ', ',
			'''', "state", '''', ', ',
	        "year_founded",  '), ') AS FIELD1
	FROM public."Teams"
	ORDER BY FIELD1 DESC
) TO 'C:\Users\Public\Documents\teams_insert.sql';
