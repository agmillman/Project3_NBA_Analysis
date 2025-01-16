-- Table: public.ShotChartDetail

CREATE TABLE IF NOT EXISTS public."ShotChartDetail"
(
    "GRID_TYPE" character varying COLLATE pg_catalog."default",
	"GAME_ID" bigint NOT NULL,
	"GAME_EVENT_ID" bigint,
	"PLAYER_ID" bigint NOT NULL,
	"PLAYER_NAME" character varying COLLATE pg_catalog."default",
	"TEAM_ID" bigint NOT NULL,
	"TEAM_NAME" character varying COLLATE pg_catalog."default",
	"PERIOD" int,
	"MINUTES_REMAINING" numeric,
	"SECONDS_REMAINING" numeric,
	"EVENT_TYPE" character varying COLLATE pg_catalog."default",
	"ACTION_TYPE" character varying COLLATE pg_catalog."default",
	"SHOT_TYPE" character varying COLLATE pg_catalog."default",
	"SHOT_ZONE_BASIC" character varying COLLATE pg_catalog."default",
	"SHOT_ZONE_AREA" character varying COLLATE pg_catalog."default",
	"SHOT_ZONE_RANGE" character varying COLLATE pg_catalog."default",
	"SHOT_DISTANCE" int,
	"LOC_X" int,
	"LOC_Y" int,
	"SHOT_ATTEMPTED_FLAG" int,
	"SHOT_MADE_FLAG" int,
	"GAME_DATE" date,
	"HTM" character varying COLLATE pg_catalog."default",
	"VTM" character varying COLLATE pg_catalog."default",
	CONSTRAINT "ShotChartDetail_pkey" PRIMARY KEY ("GAME_ID", "PLAYER_ID", "TEAM_ID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."ShotChartDetail"
    OWNER to postgres;