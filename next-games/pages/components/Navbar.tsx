import { useState } from 'react'

interface Props {
  onGenreSelect: (genre: string | null) => void
}

export default function Navbar({ onGenreSelect }: Props) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  
  const genres = [
    "Action", "Adventure", "RPG", "Shooter", "Strategy", 
    "Simulation", "Sports", "Racing", "Puzzle"
  ]

  const handleGenreClick = (genre: string) => {
    if (selectedGenre === genre) {
      setSelectedGenre(null)
      onGenreSelect(null)
    } else {
      setSelectedGenre(genre)
      onGenreSelect(genre)
    }
  }

  return (
    <nav className="bg-[#19191A] border-b border-[#EC954D]/20 mb-8">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-full text-sm bg-[#EC954D] text-[#0F0F11] hover:bg-[#EC954D]/80 transition-colors mr-4"
          >
            Home
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className={`px-4 py-2 rounded-full text-sm transition-colors
                ${selectedGenre === genre 
                  ? 'bg-[#EC954D] text-[#0F0F11]' 
                  : 'bg-[#0F0F11] text-[#EC954D] hover:bg-[#EC954D]/20'}`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}