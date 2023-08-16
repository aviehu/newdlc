import {boolean, integer, pgTable, serial, text, timestamp} from "drizzle-orm/pg-core";
import {InferModel} from "drizzle-orm";

export const videoPipelines = pgTable('video_pipelines', {
    id: serial('id').primaryKey(),
    state: text('state'),
    streamerUuid: text('streamerUuid'),
    relayUuid: text('relayUuid'),
    nodeUuid: text('nodeUuid'),
    error: text('error'),
    serverIp: text('serverIp'),
    dataListenPort: integer('dataListenPort'),
    dataConnectionPort: integer('dataConnectionPort'),
    controlListenPort: integer('controlListenPort'),
    controlConnectionPort: integer('controlConnectionPort'),
    trampolineListenPort: integer('trampolineListenPort'),
    trampolineConnectionPort: integer('trampolineConnectionPort'),
    rtcHttpsUrl: text('rtcHttpsUrl'),
    nodeHttpsUrl: text('nodeHttpsUrl'),
    nodeWssUrl: text('nodeWssUrl'),
    rtpConnectionUrl: text('rtpConnectionUrl'),
    controlPassword: text('controlPassword'),
    trampolinePassword: text('trampolinePassword'),
    relayVersion: text('relayVersion'),
    nodeVersion: text('nodeVersion'),
    allowAutomaticDeallocate: boolean('allowAutomaticDeallocate'),
    allowAutomaticAllocate: boolean('allowAutomaticAllocate'),
    machineIdentifier: text('machineIdentifier'),
    relaySet: text('relaySet'),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export type VideoPipeline = InferModel<typeof videoPipelines>;
export type NewVideoPipeline = InferModel<typeof videoPipelines, 'insert'>;

export const vehicles = pgTable('vehicles', {
    streamerUuid: text('streamerUuid').primaryKey(),
    vin: text('vin'),
    streamer_status: text('vin'),
    streamer_version: text('vin'),
});

export type Vehicle = InferModel<typeof vehicles>;
export type NewVehicle = InferModel<typeof vehicles, 'insert'>;

export const compatibleNodeVersions = pgTable('compatible_node_versions', {
    id: serial('id').primaryKey(),
    videoPipelineId: text('videoPipelineId'),
    compatibleNodeVersion: text('compatibleNodeVersion'),
});

export type CompatibleNodeVersion = InferModel<typeof compatibleNodeVersions>;
export type NewCompatibleNodeVersion = InferModel<typeof compatibleNodeVersions, 'insert'>;
