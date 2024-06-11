import { Db, MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'






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
        (item) => item[isHits] 
      )
    ]
  )

}


export const generateTokens = (name: string, email: string) => {
  const accessToken = jwt.sign(
    { name, email },
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
    {
      expiresIn: "10m",
    }
  );
  const refreshToken = jwt.sign(
    { email },
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
    {
      expiresIn: "30d",
    }
  );

  return { accessToken, refreshToken };
};




export const createUserAndGenerateTokens = async (
  db: Db,
 reqBody: { name: string; email: string; password: string }
) => {
  const salt = bcrypt.genSaltSync(10);

  const hash = bcrypt.hashSync(reqBody.password, salt);

  await db.collection("users").insertOne({
    name: reqBody.name,
    email: reqBody.email,
    password: hash,
    role: "user",
  });

  return generateTokens(reqBody.name, reqBody.email);
};




export const findUserByEmail = async (db: Db, email: string) => (
  db.collection('users').findOne({ email })
)





