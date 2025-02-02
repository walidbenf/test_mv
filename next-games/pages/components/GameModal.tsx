import { Game } from '../types/game'

interface Props {
  game: Game
  onClose: () => void
}

export default function GameModal({ game, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{game.name}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {game.coverUrl && (
            <img 
              src={`https:${game.coverUrl.replace('t_cover_big', 't_1080p')}`}
              alt={game.name}
              className="w-full h-auto rounded-lg mb-4"
            />
          )}

          {game.summary && (
            <p className="text-gray-700 mb-4">{game.summary}</p>
          )}

          {game.rating && (
            <p className="text-yellow-500 mb-4">
              Rating: {Math.round(game.rating)}/100
            </p>
          )}

          {game.screenshots && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {JSON.parse(game.screenshots).map((url: string, index: number) => (
                <img 
                  key={index}
                  src={`https:${url}`}
                  alt={`${game.name} screenshot ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}