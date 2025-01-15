--------------------------------------------------------------------------------------------------
-- 1. Create database: nba_stats
--------------------------------------------------------------------------------------------------
CREATE DATABASE nba_stats
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
--------------------------------------------------------------------------------------------------


--------------------------------------------------------------------------------------------------
-- 2. Set database path
--------------------------------------------------------------------------------------------------
ALTER DATABASE nba_stats
    SET search_path TO public;
--------------------------------------------------------------------------------------------------

--------------------------------------------------------------------------------------------------
-- 3. Ensure database was created and ensure you are using the new database to create the tables
-- REFRESH THE DATABASES AND MAKE SURE THE nba_stats DATABASE EXISTS
-- CLOSE THIS SCRIPT
-- RIGHT CLICK ON THE nba_stats DATABASE AND SELECT Query Tool
-- OPEN THE CreateTables.sql SCRIPT
--------------------------------------------------------------------------------------------------