import { useState, useEffect } from 'react'
import { Game } from './types/game'
import GameCard from './components/GameCard'
import GameModal from './components/GameModal'
import Navbar from './components/Navbar'

export default function Home() {
  const [games, setGames] = useState<Game[]>([])
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Load initial games
  useEffect(() => {
    searchGames('')
  }, [])
  
  const searchGames = async (query: string) => {
	setIsLoading(true)
	try {
	  // Keep existing games that match the query
	  const matchingExistingGames = games.filter(game => 
		game.name.toLowerCase().includes(query.toLowerCase())
	  )
  
	  // Fetch new games from API
	  const res = await fetch(`/api/games?query=${query}`)
	  const newGames = await res.json()
  
	  if (Array.isArray(newGames)) {
		// Combine matching existing games with new games, avoiding duplicates
		const allGames = [...matchingExistingGames]
		newGames.forEach(newGame => {
		  const exists = allGames.some(game => game.id === newGame.id)
		  if (!exists) {
			allGames.push(newGame)
		  }
		})
		setGames(allGames)
		setFilteredGames(allGames)
	  }
	} catch (error) {
	  console.error(error)
	}
	setIsLoading(false)
  }

  const handleGenreSelect = (genre: string | null) => {
	console.log('Selected genre:', genre)
	console.log('Available games:', games)
  
	if (!genre) {
	  setFilteredGames(games)
	  return
	}
  
	const filtered = games.filter(game => {
	  if (!game.genres) return false
	  try {
		const gameGenres = JSON.parse(game.genres)
		console.log('Game genres:', gameGenres)
		return gameGenres.some((g: string) => {
		  const matches = g.toLowerCase().includes(genre.toLowerCase())
		  console.log(`Comparing ${g} with ${genre}: ${matches}`)
		  return matches
		})
	  } catch (error) {
		console.error('Error parsing genres for game:', game.name, error)
		return false
	  }
	})
  
	console.log('Filtered games:', filtered)
	setFilteredGames(filtered)
  }

  return (
    <main>
      <Navbar onGenreSelect={handleGenreSelect} />
      <div className="container mx-auto px-4 py-8">
        <input
          type="text"
          onChange={(e) => searchGames(e.target.value)}
          placeholder="Search games to add to database..."
          className="w-full p-2 border rounded-lg mb-8"
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="text-[#EC954D] text-xl">Loading...</div>
          </div>
        ) : filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                onClick={setSelectedGame}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-[#EC954D]">No games found</div>
        )}

        {selectedGame && (
          <GameModal 
            game={selectedGame} 
            onClose={() => setSelectedGame(null)} 
          />
        )}
      </div>
    </main>
  )
}