import { useState } from 'react'

interface Game {
  id: number
  name: string
  slug: string
  createdAt: string
}

export default function Home() {
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const searchGames = async (query: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/games?query=${query}`)
      const data = await response.json()
      setGames(data)
    } catch (error) {
      console.error('Error:', error)
    }
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Game Search</h1>
      <input
        type="text"
        onChange={(e) => searchGames(e.target.value)}
        placeholder="Search games..."
        className="w-full p-2 border rounded-lg mb-8"
      />

      {isLoading && <div>Loading...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <div key={game.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">{game.name}</h2>
            <p className="text-gray-600">{game.slug}</p>
          </div>
        ))}
      </div>
    </div>
  )
}