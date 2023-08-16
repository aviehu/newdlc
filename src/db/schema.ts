import {boolean, integer, pgTable, serial, text, timestamp} from "drizzle-orm/pg-core";
import {InferModel} from "drizzle-orm";

export const videoPipelines = pgTable('video_pipelines', {
    id: serial('id').primaryKey(),
    state: text('state'),
    streamer_uuid: text('streamer_uuid').unique(),
    relay_uuid: text('relay_uuid').unique(),
    node_uuid: text('node_uuid').unique(),
    error: text('error'),
    server_ip: text('server_ip'),
    data_listen_port: integer('data_listen_port'),
    data_connection_port: integer('data_connection_port'),
    control_listen_port: integer('control_listen_port'),
    control_connection_port: integer('control_connection_port'),
    trampoline_listen_port: integer('trampoline_listen_port'),
    trampoline_connection_port: integer('trampoline_connection_port'),
    rtc_https_url: text('rtc_https_url'),
    node_https_url: text('node_https_url'),
    node_wss_url: text('node_wss_url'),
    rtp_connection_url: text('rtp_connection_url'),
    control_password: text('control_password'),
    trampoline_password: text('trampoline_password'),
    relay_version: text('relay_version'),
    node_version: text('node_version'),
    group: text('group'),
    allowAutomaticDeallocate: boolean('allowAutomaticDeallocate'),
    allowAutomaticAllocate: boolean('allowAutomaticAllocate'),
    machine_identifier: text('machine_identifier'),
    relay_set: text('relay_set'),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export type VideoPipeline = InferModel<typeof videoPipelines>;
export type NewVideoPipeline = InferModel<typeof videoPipelines, 'insert'>;

export const vehicles = pgTable('vehicles', {
    streamer_uuid: text('streamer_uuid').primaryKey(),
    vin: text('vin'),
    streamer_status: text('vin'),
    streamer_version: text('vin'),
    group: text('group')
});

export type Vehicle = InferModel<typeof vehicles>;
export type NewVehicle = InferModel<typeof vehicles, 'insert'>;

export const compatibleNodeVersions = pgTable('compatible_node_versions', {
    id: serial('id').primaryKey(),
    video_pipeline_id: text('video_pipeline_id'),
    compatible_node_version: text('compatible_node_version'),
});

export type CompatibleNodeVersion = InferModel<typeof compatibleNodeVersions>;
export type NewCompatibleNodeVersion = InferModel<typeof compatibleNodeVersions, 'insert'>;
