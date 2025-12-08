import { httpGet } from "@/lib/api/http";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const data = await httpGet(`/gallery/${slug}`);
        return NextResponse.json(data as any, { status: 200 });
    } catch (e: any) {
        return NextResponse.json(
            { message: e?.message || "Network error" },
            { status: 502 }
        );
    }
}