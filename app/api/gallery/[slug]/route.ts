import { httpGet } from "@/lib/api/http";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:{slug:string}}){
    try{
        const data = await httpGet(`/gallery/${params.slug}`)
        return  NextResponse.json(data as any,{status:200})
    }catch(e:any){
        return NextResponse.json({message:e?.message||"Network error"},{status:502})
    }
}