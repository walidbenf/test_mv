import { Game } from '../types/game'

interface Props {
  game: Game
  onClick: (game: Game) => void
}

export default function GameCard({ game, onClick }: Props) {
	return (
	  <div 
		className="bg-[#19191A] border border-[#EC954D]/20 rounded-lg shadow hover:shadow-xl transition-all duration-300 cursor-pointer"
		onClick={() => onClick(game)}
	  >
		<div className="relative h-[280px] overflow-hidden">
		  {game.coverUrl ? (
			<img 
			  src={`https:${game.coverUrl.replace('t_cover_big', 't_720p')}`}
			  alt={game.name}
			  className="w-full h-full object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
			  loading="lazy"
			/>
		  ) : (
			<div className="w-full h-full bg-[#0F0F11] flex items-center justify-center">
			  <span className="text-[#EC954D]">No image available</span>
			</div>
		  )}
		  {game.rating && (
			<div className="absolute bottom-2 right-2 bg-[#0F0F11] bg-opacity-90 text-[#EC954D] px-2 py-1 rounded-lg text-sm font-medium">
			  {Math.round(game.rating)}/100
			</div>
		  )}
		</div>
		<div className="p-4">
		  <h2 className="text-xl font-bold text-[#EC954D] mb-2">{game.name}</h2>
		  {game.genres && (
			<div className="flex flex-wrap gap-2">
			  {JSON.parse(game.genres).slice(0, 2).map((genre: string, index: number) => (
				<span 
				  key={index}
				  className="bg-[#0F0F11] text-[#EC954D] text-xs px-2 py-1 rounded-full border border-[#EC954D]/20"
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