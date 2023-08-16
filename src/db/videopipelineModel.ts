'use server'

import {NewVideoPipeline, VideoPipeline, videoPipelines} from "./schema";
import db from "./dbSetup";
import {and, eq, inArray, not} from "drizzle-orm";

interface Overrides {
    allowAutomaticDeallocate: boolean,
    allowAutomaticAllocate: boolean
}

//should everything be indexed by group?

export async function insertVideoPipeline(newVideoPipeline: NewVideoPipeline, groups: string[]) : Promise<VideoPipeline | undefined> {
    if(!groups.includes(newVideoPipeline.group)) {
        return undefined
    }
    const [videoPipeline] = await db.insert(videoPipelines).values(newVideoPipeline).returning()
    return videoPipeline
}

//index by relay_uuid
export async function findOneByRelay(relayUuid: string, groups: string[]) : Promise<VideoPipeline | undefined> {
    const [videoPipeline] = await db.select().from(videoPipelines)
        .where(and(eq(videoPipelines.relay_uuid, relayUuid), inArray(videoPipelines.group, groups)))
    return videoPipeline
}

//index by streamer_uuid
export async function findOneByStreamer(streamerUuid: string, groups: string[]) : Promise<VideoPipeline> {
    const [videoPipeline] = await db.select().from(videoPipelines)
        .where(and(eq(videoPipelines.streamer_uuid, streamerUuid), inArray(videoPipelines.group, groups)))
    return videoPipeline
}

//index by relay_uuid

export async function deleteOneByRelay(relayUuid: string, groups: string[]) : Promise<VideoPipeline | undefined> {
    const [videoPipeline] = await db.delete(videoPipelines)
        .where(and(eq(videoPipelines.relay_uuid, relayUuid), inArray(videoPipelines.group, groups))).returning()
    return videoPipeline
}

//index by relay_uuid
export async function updateOverrides(relayUuid: string, groups: string[], overrides: Overrides): Promise<VideoPipeline | undefined> {
    const {allowAutomaticDeallocate, allowAutomaticAllocate} = overrides
    const [videoPipeline] = await db.update(videoPipelines).set({
        allowAutomaticAllocate,
        allowAutomaticDeallocate
    }).where(and(eq(videoPipelines.relay_uuid, relayUuid), inArray(videoPipelines.group, groups))).returning()
    return videoPipeline
}

//index by streamer_uuid & index by machineIdentifier
export function findVideoPipelines(groups: string[], assigned: boolean, machineIdentifier?: string): Promise<VideoPipeline[]> {
    const whereQuery = [inArray(videoPipelines.group, groups)]
    if(assigned) {
        whereQuery.push(not(eq(videoPipelines.streamer_uuid, null)))
    }
    if(machineIdentifier) {
        whereQuery.push(eq(videoPipelines.machine_identifier, machineIdentifier))
    }
    return db.select().from(videoPipelines).where(and(...whereQuery))
}

//index by streamer_uuid & relay_version & relay_set & allowAutomaticAllocate
export async function assignStreamerToVideoPipeline(streamerUuid: string, version: string, nativeNode: boolean, groups: string[], relaySets: string[]) : Promise<VideoPipeline | undefined> {
    const existingVideoPipeline = await findOneByStreamer(streamerUuid, groups)
    if (existingVideoPipeline) {
        return existingVideoPipeline
    }
    const availableVideoPipelines = await db.select().from(videoPipelines).where(and(
        eq(videoPipelines.streamer_uuid, null),
        eq(videoPipelines.relay_version, version),
        eq(videoPipelines.allowAutomaticAllocate, true),
        inArray(videoPipelines.relay_set, relaySets),
        inArray(videoPipelines.group, groups)
        // eq(videoPipelines.relay_status, 'online'),
    ))
    //need to sort
    const natives = availableVideoPipelines.filter((videoPipeline) => {
        return videoPipeline.node_uuid === null
    })
    const nonNatives = availableVideoPipelines.filter((videoPipeline) => {
        return videoPipeline.node_uuid !== null
    })
    const selectedNative = relaySets.map((relaySet) => {
        return natives.find((videoPipeline) => {
            return relaySet === videoPipeline.relay_set
        })
    }).find((videoPipeline) => !!videoPipeline)
    const selectedNonNative = relaySets.map((relaySet) => {
        return nonNatives.find((videoPipeline) => {
            return relaySet === videoPipeline.relay_set
        })
    }).find((videoPipeline) => !!videoPipeline)
    return nativeNode ? selectedNative || selectedNonNative : selectedNonNative
}

// index by relay_uuid
export async function releaseVideoPipeline(relayUuid: string, groups: string[]) : Promise<VideoPipeline | undefined> {
    const [videoPipeline] = await db.update(videoPipelines).set({
        node_uuid: null,
    }).where(and(eq(videoPipelines.relay_uuid, relayUuid), inArray(videoPipelines.group, groups))).returning()
    return videoPipeline
}
