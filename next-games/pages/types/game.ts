export interface IGDBGame {
	id: number
	name: string
	slug: string
	summary?: string
	cover?: {
	  url: string
	}
	rating?: number
	first_release_date?: number
	genres?: Array<{
	  name: string
	}>
	screenshots?: Array<{
	  url: string
	}>
  }
  
  export interface Game {
	id: number
	name: string
	slug: string
	summary?: string
	coverUrl?: string
	rating?: number
	releaseDate?: Date
	genres?: string
	screenshots?: string
	createdAt: Date
  }