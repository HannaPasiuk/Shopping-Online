import { NextResponse } from "next/server";
import { getDbAndReqBody, getHitsProducts } from "@/app/lib/utils/api-routes";
import clientPromise from "@/app/lib/mongodb";


export async function GET(){
  const { db } = await getDbAndReqBody( clientPromise, null); 

  return NextResponse.json(await getHitsProducts( db, 'isHits' )); 
}