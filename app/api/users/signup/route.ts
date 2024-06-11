
import { NextResponse } from 'next/server'
import clientPromise from '@/app/lib/mongodb'
import {
  createUserAndGenerateTokens,
  findUserByEmail,
  getDbAndReqBody,
} from '@/app/lib/utils/api-routes'

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
    const user = await findUserByEmail(db, reqBody.email)

    if (user) {
      return NextResponse.json({
        warningMessage: 'User already exists',
      })
    }

    const tokens = await createUserAndGenerateTokens(db, reqBody)

    return NextResponse.json(tokens)
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

