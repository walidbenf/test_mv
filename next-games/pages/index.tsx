import { useState, useEffect } from 'react'
import { Game } from './types/game'
import GameCard from './components/GameCard'
import GameModal from './components/GameModal'

export default function Home() {
  const [games, setGames] = useState<Game[]>([])
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const searchGames = async (query: string) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/games?query=${query}`)
      const data = await res.json()
      if (Array.isArray(data)) {
        setGames(data)
      }
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  // Refresh games every 5 seconds if empty
  useEffect(() => {
    if (games.length === 0) {
      const timer = setInterval(() => {
        searchGames(document.querySelector('input')?.value || '')
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [games])

  return (
    <main className="container mx-auto px-4 py-8">
      <input
        type="text"
        onChange={(e) => searchGames(e.target.value)}
        placeholder="Search games..."
        className="w-full p-2 border rounded-lg mb-8"
      />

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onClick={setSelectedGame}
            />
          ))}
        </div>
      )}

      {selectedGame && (
        <GameModal 
          game={selectedGame} 
          onClose={() => setSelectedGame(null)} 
        />
      )}
    </main>
  )
}