'use server'

import db from '../src/db/dbSetup'
import {compatibleNodeVersions} from "../src/db/schema";

export async function runQueries() {
    console.log('got here')
    await db.insert(compatibleNodeVersions).values({
        compatible_node_version: 'a',
        video_pipeline_id: 'a'
    })
}