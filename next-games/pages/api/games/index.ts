import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { igdbClient } from '../igdb'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const query = req.query.query as string || ''

    try {
      const client = await igdbClient()
      const response = await client.post('/games', `
        search "${query}";
        fields name,slug,summary,cover.url;
        limit 10;
      `)

      const games = await Promise.all(
        response.data.map(async (game: any) => {
          return await prisma.game.create({
            data: {
              name: game.name,
              slug: game.slug,
            }
          })
        })
      )

      return res.status(200).json(games)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Failed to fetch games' })
    }
  }
}