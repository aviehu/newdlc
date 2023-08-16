'use server'

import {NextRequest, NextResponse} from "next/server";
import {getFilesHeaders} from "../../../../lib/s3BucketHandler";

export async function GET(request: NextRequest, { params }: { params: { sessionId: string } }) {
    const sessionId = params.sessionId
    const headers = await getFilesHeaders(sessionId)
    return NextResponse.json(headers)
}