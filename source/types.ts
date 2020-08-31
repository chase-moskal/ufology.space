
export interface ImageData {
	link: string
	attribution: {
		link: string
		source: string
	}
}

export interface UfologyData {

	// meta
	shortname: string

	// required
	title: string
	subtitle: string
	summary: string
	grade: number

	// optional
	poster?: ImageData
	writeup?: string
	labels?: string[]
	bullets?: string[]
	persuasive?: string[]
	dissuasive?: string[]
}
