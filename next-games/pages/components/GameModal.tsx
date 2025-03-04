import { useState, useEffect } from 'react'
import { Game } from '../types/game'

interface Props {
  game: Game
  onClose: () => void
}

export default function GameModal({ game, onClose }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true)
      try {
        // Preload cover image
        if (game.coverUrl) {
          await preloadImage(`https:${game.coverUrl.replace('t_cover_big', 't_1080p')}`)
        }

        // Preload screenshots
        if (game.screenshots) {
          const screenshotUrls = JSON.parse(game.screenshots)
          await Promise.all(screenshotUrls.map((url: string) => preloadImage(`https:${url}`)))
        }

        setImagesLoaded(true)
      } catch (error) {
        console.error('Error loading images:', error)
      }
      setIsLoading(false)
    }

    loadImages()
  }, [game])

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = src
      img.onload = () => resolve()
      img.onerror = reject
    })
  }

  return (
    <div className="fixed inset-0 bg-[#0F0F11] bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-[#19191A] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#EC954D]/20 scrollbar-thin scrollbar-thumb-[#EC954D] scrollbar-track-[#0F0F11]">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-[#EC954D] text-xl">Loading...</div>
          </div>
        ) : (
          <div className={`p-6 transition-opacity duration-300 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">{game.name}</h2>
              <button 
                onClick={onClose}
                className="text-[#EC954D] hover:text-[#EC954D]/80 transition-colors"
              >
                ✕
              </button>
            </div>

            {game.coverUrl && (
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img 
                  src={`https:${game.coverUrl.replace('t_cover_big', 't_1080p')}`}
                  alt={game.name}
                  className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            {game.summary && (
              <p className="text-gray-300 mb-4 leading-relaxed">{game.summary}</p>
            )}

            {game.rating && (
              <p className="text-[#EC954D] mb-4 font-medium">
                Rating: {Math.round(game.rating)}/100
              </p>
            )}

            {game.genres && (
              <div className="flex flex-wrap gap-2 mb-4">
                {JSON.parse(game.genres).map((genre: string, index: number) => (
                  <span 
                    key={index}
                    className="bg-[#0F0F11] text-[#EC954D] text-sm px-3 py-1 rounded-full border border-[#EC954D]/20"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {game.screenshots && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {JSON.parse(game.screenshots).map((url: string, index: number) => (
                  <img 
                    key={index}
                    src={`https:${url}`}
                    alt={`${game.name} screenshot ${index + 1}`}
                    className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}