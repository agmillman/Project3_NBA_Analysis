-- Database: nba_stats

-- DROP DATABASE IF EXISTS nba_stats;

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

ALTER DATABASE nba_stats
    SET search_path TO public;


-- Table: public.Seasons

-- DROP TABLE IF EXISTS public."Seasons";

CREATE TABLE IF NOT EXISTS public."Seasons"
(
    "SEASON_ID" character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Seasons_pkey" PRIMARY KEY ("SEASON_ID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Seasons"
    OWNER to postgres;


-- Table: public.Teams

-- DROP TABLE IF EXISTS public."Teams";

CREATE TABLE IF NOT EXISTS public."Teams"
(
    id bigint NOT NULL,
    full_name character varying COLLATE pg_catalog."default" NOT NULL,
    abbreviation character varying COLLATE pg_catalog."default",
    nickname character varying COLLATE pg_catalog."default",
    city character varying COLLATE pg_catalog."default",
    state character varying COLLATE pg_catalog."default",
    year_founded integer,
    CONSTRAINT "Teams_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Teams"
    OWNER to postgres;

-- Table: public.PlayerCareer_Stats

-- DROP TABLE IF EXISTS public."PlayerCareer_Stats";

CREATE TABLE IF NOT EXISTS public."PlayerCareer_Stats"
(
    "PLAYER_ID" bigint NOT NULL,
    "SEASON_ID" character varying COLLATE pg_catalog."default" NOT NULL,
    "LEAGUE_ID" character varying COLLATE pg_catalog."default" NOT NULL,
    "TEAM_ID" bigint NOT NULL,
    "TEAM_ABBREVIATION" character varying COLLATE pg_catalog."default",
    "PLAYER_AGE" numeric,
    "GP" integer,
    "GS" integer,
    "MIN" numeric,
    "FGM" integer,
    "FGA" integer,
    "FG_PCT" numeric,
    "FG3M" integer,
    "FG3A" integer,
    "FG3_PCT" numeric,
    "FTM" integer,
    "FTA" integer,
    "FT_PCT" numeric,
    "OREB" integer,
    "DREB" integer,
    "REB" integer,
    "AST" integer,
    "STL" integer,
    "BLK" integer,
    "TOV" integer,
    "PF" integer,
    "PTS" integer,
    "PLAYER_NAME" character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PlayerCareer_Stats_pkey" PRIMARY KEY ("PLAYER_ID", "SEASON_ID", "TEAM_ID"),
    CONSTRAINT fk_season_id FOREIGN KEY ("SEASON_ID")
        REFERENCES public."Seasons" ("SEASON_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_team_id FOREIGN KEY ("TEAM_ID")
        REFERENCES public."Teams" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."PlayerCareer_Stats"
    OWNER to postgres;

INSERT INTO public."Seasons"(
	"SEASON_ID")
	VALUES 
	 ('2013-14'),
	 ('2014-15'),
	 ('2015-16'),
	 ('2016-17'),
	 ('2017-18'),
	 ('2018-19'),
	 ('2019-20'),
	 ('2020-21'),
	 ('2021-22'),
	 ('2022-23')
;

SELECT *
	FROM public."Seasons";

SELECT *
	FROM public."Teams";

SELECT *
	FROM public."PlayerCareer_Stats";

