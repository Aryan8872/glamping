
import { httpGet } from "@/lib/api/http";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await httpGet(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/contact/all`, {
            timeoutMs: 8000,
            retries: 0,
            next: {
                tags: ["contact"]
            }
        })
        return NextResponse.json(res, { status: 200 })
    }
    catch (e: any) {
        return NextResponse.json({ message: e?.message || "Network error" }, { status: 502 })
    }
}