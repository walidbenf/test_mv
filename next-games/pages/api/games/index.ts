import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { igdbClient } from '../igdb'
import type { IGDBGame } from '../../types/game'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const query = req.query.query as string || ''

  try {
    // Search database first
    const dbGames = await prisma.game.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive'
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (dbGames.length > 0) {
      return res.status(200).json(dbGames)
    }

    // If no results in DB, search IGDB
    const client = await igdbClient()
    const response = await client.post('/games', `
      search "${query}";
      fields name, slug, summary, cover.url, rating, genres.name, first_release_date, screenshots.url;
      limit 10;
    `)

    const games = await Promise.all(
      response.data.map(async (game: IGDBGame) => {
        return await prisma.game.upsert({
          where: { slug: game.slug },
          update: {
            name: game.name,
            summary: game.summary,
            coverUrl: game.cover?.url?.replace('t_thumb', 't_cover_big'),
            rating: game.rating,
            releaseDate: game.first_release_date ? new Date(game.first_release_date * 1000) : null,
            genres: game.genres ? JSON.stringify(game.genres.map(g => g.name)) : null,
            screenshots: game.screenshots ? JSON.stringify(game.screenshots.map(s => s.url.replace('t_thumb', 't_screenshot_huge'))) : null
          },
          create: {
            name: game.name,
            slug: game.slug,
            summary: game.summary,
            coverUrl: game.cover?.url?.replace('t_thumb', 't_cover_big'),
            rating: game.rating,
            releaseDate: game.first_release_date ? new Date(game.first_release_date * 1000) : null,
            genres: game.genres ? JSON.stringify(game.genres.map(g => g.name)) : null,
            screenshots: game.screenshots ? JSON.stringify(game.screenshots.map(s => s.url.replace('t_thumb', 't_screenshot_huge'))) : null
          }
        })
      })
    )

    return res.status(200).json(games)
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: 'Failed to fetch games' })
  }
}