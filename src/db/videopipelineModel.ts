'use server'

import {NewVideoPipeline, VideoPipeline, videoPipelines} from "./schema";
import db from "./dbSetup";
import {and, eq, inArray, not} from "drizzle-orm";

interface Overrides {
    allowAutomaticDeallocate: boolean,
    allowAutomaticAllocate: boolean
}

//should everything be indexed by group?

export async function insertVideoPipeline(newVideoPipeline: NewVideoPipeline) : Promise<VideoPipeline | undefined> {
    const [videoPipeline] = await db.insert(videoPipelines).values(newVideoPipeline).returning()
    return videoPipeline
}

//index by relay_uuid
export async function findOneByRelay(relayUuid: string) : Promise<VideoPipeline | undefined> {
    const [videoPipeline] = await db.select().from(videoPipelines)
        .where(eq(videoPipelines.relayUuid, relayUuid))
    return videoPipeline
}

//index by streamer_uuid
export async function findOneByStreamer(streamerUuid: string) : Promise<VideoPipeline> {
    const [videoPipeline] = await db.select().from(videoPipelines)
        .where(eq(videoPipelines.streamerUuid, streamerUuid))
    return videoPipeline
}

//index by relay_uuid
export async function deleteOneByRelay(relayUuid: string) : Promise<VideoPipeline | undefined> {
    const [videoPipeline] = await db.delete(videoPipelines)
        .where(eq(videoPipelines.relayUuid, relayUuid)).returning()
    return videoPipeline
}

//index by relay_uuid
export async function updateOverrides(relayUuid: string, overrides: Overrides): Promise<VideoPipeline | undefined> {
    const {allowAutomaticDeallocate, allowAutomaticAllocate} = overrides
    const [videoPipeline] = await db.update(videoPipelines).set({
        allowAutomaticAllocate,
        allowAutomaticDeallocate
    }).where(eq(videoPipelines.relayUuid, relayUuid)).returning()
    return videoPipeline
}

//index by streamer_uuid & index by machineIdentifier
export function findVideoPipelines(assigned: boolean, machineIdentifier?: string): Promise<VideoPipeline[]> {
    const whereQuery = [eq(videoPipelines.relayUuid, videoPipelines.relayUuid)]
    if(assigned) {
        whereQuery.push(not(eq(videoPipelines.streamerUuid, null)))
    }
    if(machineIdentifier) {
        whereQuery.push(eq(videoPipelines.machineIdentifier, machineIdentifier))
    }
    return db.select().from(videoPipelines).where(and(...whereQuery))
}

//index by streamer_uuid & relay_version & relay_set & allowAutomaticAllocate
export async function assignStreamerToVideoPipeline(streamerUuid: string, version: string, nativeNode: boolean, relaySets: string[]) : Promise<VideoPipeline | undefined> {
    const existingVideoPipeline = await findOneByStreamer(streamerUuid)
    if (existingVideoPipeline) {
        return existingVideoPipeline
    }
    const availableVideoPipelines = await db.select().from(videoPipelines).where(and(
        eq(videoPipelines.streamerUuid, null),
        eq(videoPipelines.relayVersion, version),
        eq(videoPipelines.allowAutomaticAllocate, true),
        inArray(videoPipelines.relaySet, relaySets),
        // eq(videoPipelines.relay_status, 'online'),
    ))
    //need to sort
    const natives = availableVideoPipelines.filter((videoPipeline) => {
        return videoPipeline.nodeUuid === null
    })
    const nonNatives = availableVideoPipelines.filter((videoPipeline) => {
        return videoPipeline.nodeUuid !== null
    })
    const selectedNative = relaySets.map((relaySet) => {
        return natives.find((videoPipeline) => {
            return relaySet === videoPipeline.relaySet
        })
    }).find((videoPipeline) => !!videoPipeline)
    const selectedNonNative = relaySets.map((relaySet) => {
        return nonNatives.find((videoPipeline) => {
            return relaySet === videoPipeline.relaySet
        })
    }).find((videoPipeline) => !!videoPipeline)
    return nativeNode ? selectedNative || selectedNonNative : selectedNonNative
}

// index by relay_uuid
export async function releaseVideoPipeline(relayUuid: string) : Promise<VideoPipeline | undefined> {
    const [videoPipeline] = await db.update(videoPipelines).set({
        nodeUuid: null,
    }).where(eq(videoPipelines.relayUuid, relayUuid)).returning()
    return videoPipeline
}
