import { Db, MongoClient, WithId } from 'mongodb'


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

export const getNewHitsProducts = async (db: Db, isHits: string) => {
  const cloth = await db.collection('cloth').find().toArray()
  const accessories = await db.collection('accessories').find().toArray()

  return (
   [
    ...cloth
      .filter(
        (item) => item[isHits]
      ),
    ...accessories
      .filter(
        (item) =>   item[isHits] 
      )
    ]
  )

}