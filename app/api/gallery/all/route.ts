import { NextResponse } from "next/server";
import { httpGet } from "../../../../lib/api/http";


export async function GET() {
  try {
    const data = await httpGet("/gallery/all", { timeoutMs: 8000, retries: 0 });
    return NextResponse.json(data as any, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e?.message || "Network error" }, { status: 502 });
  }
}


