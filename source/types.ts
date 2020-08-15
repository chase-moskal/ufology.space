
export interface UfologyData {

	// required
	title: string
	summary: string
	grade: number
	shortname: string

	// optional
	writeup?: string
	labels?: string[]
	bullets?: string[]
	persuasive?: string[]
	dissuasive?: string[]
}
