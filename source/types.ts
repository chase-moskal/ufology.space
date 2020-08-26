
export interface UfologyData {

	// meta
	shortname: string

	// required
	title: string
	summary: string
	grade: number

	// optional
	writeup?: string
	labels?: string[]
	bullets?: string[]
	persuasive?: string[]
	dissuasive?: string[]
}
