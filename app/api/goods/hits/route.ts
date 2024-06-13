import clientPromise from "../../../../lib/mongodb";
import { getDbAndReqBody, getNewHitsProducts} from "../../../../lib/utils/api-routes";
import { NextResponse } from "next/server";





export async function GET() {
 
const { db } = await getDbAndReqBody(clientPromise, null)
return NextResponse.json(await getNewHitsProducts(db,'isHits'))

}