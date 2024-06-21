import { Sort } from "mongodb";
import { NextResponse } from "next/server";
import { allowedColors } from "@/constants/product";
import clientPromise from "@/lib/mongodb";
import { getDbAndReqBody } from "@/lib/utils/api-routes";

export async function GET(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null);
    const url = new URL(req.url);
    const limit = url.searchParams.get("limit") || 6;
    const offset = url.searchParams.get("offset") || 0;
    const isCatalogParam = url.searchParams.get("catalog");
    const categoryParam = url.searchParams.get("category");
    const filter = {};

    if (isCatalogParam) {
      const getFilteredCollection = async (collection: string) => {
        const goods = await db.collection(collection).find(filter).toArray();

        return goods;
      };

      const [cloth, accessories] = await Promise.allSettled([
        getFilteredCollection("cloth"),
        getFilteredCollection("accessories"),
      ]);

      if (cloth.status !== "fulfilled" || accessories.status !== "fulfilled") {
        return NextResponse.json({
          count: 0,
          items: [],
        });
      }

      const allGoods = [...cloth.value, ...accessories.value];

      return NextResponse.json({
        count: allGoods.length,
        items: allGoods.slice(+offset, +limit),
      });
    }

    return NextResponse.json({
      count: 0,
      items: [],
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
