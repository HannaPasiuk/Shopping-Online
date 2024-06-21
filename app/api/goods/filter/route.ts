import { Sort } from 'mongodb'
import { NextResponse } from 'next/server'
import { allowedColors} from '@/constants/product'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'


export async function GET(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null)
    const url = new URL(req.url)
    const limit = url.searchParams.get('limit') || 12
    const offset = url.searchParams.get('offset') || 0
    const isCatalogParam = url.searchParams.get('catalog')
    const categoryParam = url.searchParams.get('category')
    const sortParam = url.searchParams.get('sort') || 'default'
    const filter = {}
   
    if (isCatalogParam) {
      const getFilteredCollection = async (collection: string) => {
        const goods = await db.collection(collection).find(filter).toArray()

        return goods
      }

      const [cloth, accessories, office, souvenirs] = await Promise.allSettled([
        getFilteredCollection('cloth'),
        getFilteredCollection('accessories'),
        getFilteredCollection('office'),
        getFilteredCollection('souvenirs'),
      ])

      if (
        cloth.status !== 'fulfilled' ||
        accessories.status !== 'fulfilled' 
      ) {
        return NextResponse.json({
          count: 0,
          items: [],
         
          
        }) 
        
      } 

      const allGoods = [
        ...cloth.value,
        ...accessories.value
      ]
        

      return NextResponse.json({
        count: allGoods.length,
        items: allGoods.slice(+offset, +limit),
      })
    }

    const currentGoods = await db
      .collection(categoryParam as string)
      .find(filter)
      .toArray()

    return NextResponse.json({
      count: currentGoods.length,
      items: currentGoods.length,
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const dynamic = 'force-dynamic'