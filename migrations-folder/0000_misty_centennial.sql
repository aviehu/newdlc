CREATE TABLE IF NOT EXISTS "compatible_node_versions" (
	"id" serial PRIMARY KEY NOT NULL,
	"video_pipeline_id" text,
	"compatible_node_version" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicles" (
	"streamer_uuid" text PRIMARY KEY NOT NULL,
	"vin" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "video_pipelines" (
	"id" serial PRIMARY KEY NOT NULL,
	"state" text,
	"streamer_uuid" text,
	"relay_uuid" text,
	"node_uuid" text,
	"error" text,
	"server_ip" text,
	"data_listen_port" integer,
	"data_connection_port" integer,
	"control_listen_port" integer,
	"control_connection_port" integer,
	"trampoline_listen_port" integer,
	"trampoline_connection_port" integer,
	"rtc_https_url" text,
	"node_https_url" text,
	"node_wss_url" text,
	"rtp_connection_url" text,
	"control_password" text,
	"trampoline_password" text,
	"relay_version" text,
	"node_version" text,
	"group" text,
	"allowAutomaticDeallocate" boolean,
	"allowAutomaticAllocate" boolean,
	"machine_identifier" text,
	"relay_set" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
