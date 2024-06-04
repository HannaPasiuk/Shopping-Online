import { Db, MongoClient } from 'mongodb'
import { shuffle } from '@/app/lib/utils/common'

export const getDbAndReqBody = async (
  clientPromise: Promise<MongoClient>,
  req: Request | null
) => {
  const db = (await clientPromise).db(process.env.NEXT_PUBLIC_DB_NAME)

  if (req) {
    const reqBody = await req.json()
    return { db, reqBody }
  }

  return { db }
}

export const getHitsProducts = async (db: Db, isHits: string)  => {
  const clothes = await db.collection('cloth').find().toArray()
  const accessories = await db.collection('accessories').find().toArray()

  return shuffle([
    ...clothes
      .filter(
        (item) => 
          item[isHits] 
      )
      .slice(0, 2),
    ...accessories
      .filter(
        (item) => 
          item[isHits] 
      )
      .slice(0, 2)
  ])
}