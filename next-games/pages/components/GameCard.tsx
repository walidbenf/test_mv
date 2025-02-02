import { Game } from '../types/game'

interface Props {
  game: Game
  onClick: (game: Game) => void
}

export default function GameCard({ game, onClick }: Props) {
	return (
	  <div 
		className="border rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer"
		onClick={() => onClick(game)}
	  >
		{game.coverUrl && (
		  <div className="relative h-[280px] overflow-hidden">
			<img 
			  src={`https:${game.coverUrl.replace('t_cover_big', 't_cover_big')}`}
			  alt={game.name}
			  className="w-full h-full object-cover rounded-t-lg hover:scale-105 transition-transform"
			  loading="lazy"
			/>
			{game.rating && (
			  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-yellow-400 px-2 py-1 rounded-lg text-sm font-medium">
				{Math.round(game.rating)}/100
			  </div>
			)}
		  </div>
		)}
		<div className="p-4">
		  <h2 className="text-xl font-bold mb-2">{game.name}</h2>
		  {game.genres && (
			<div className="flex flex-wrap gap-2">
			  {JSON.parse(game.genres).slice(0, 2).map((genre: string, index: number) => (
				<span 
				  key={index}
				  className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
				>
				  {genre}
				</span>
			  ))}
			</div>
		  )}
		</div>
	  </div>
	)
  }