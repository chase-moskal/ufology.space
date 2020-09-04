
export interface ImageInfo {
	link: string
	attribution: {
		link: string
		source: string
	}
}

export interface UfoReport {

	// meta
	shortname: string

	// required
	title: string
	subtitle: string
	summary: string
	grade: number

	// optional
	poster?: ImageInfo
	writeup?: string
	labels?: string[]
	bullets?: string[]
	persuasive?: string[]
	dissuasive?: string[]
}
