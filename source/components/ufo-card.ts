
import {LitElement, css, property, html} from "lit-element"
import {mixinStyles} from "metalshop/dist/metalfront/framework/mixin-styles.js"

import {UfoReport} from "../types.js"

const styles = css`

:host {
	display: block;
	cursor: pointer;
	background: #222;
}

.poster {
	position: relative;
	width: 100%;
	height: 6em;
	background: #333;
}

.poster > img {
	pointer-events: none;
	display: block;
	position: absolute;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.overlay {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: 0.25rem;
	color: white;
	text-shadow: 1px 2px 3px rgba(0,0,0, 0.9);
}

.title {
	font-size: 1.2em;
	line-height: 1em;
	font-weight: bold;
}

.subtitle {
	font-size: 0.9em;
	line-height: 1em;
}

.details {
	display: flex;
	flex-direction: row;
}

.grade {
	font-size: 0.6em;
	line-height: 1.3em;
	display: flex;
	padding: 0.2em;
	flex-direction: column;
	text-align: center;
	background: #181818;
}

.grade > span:nth-child(1) {
	opacity: 0.6;
	font-size: 0.8em;
}

.grade > span:nth-child(2) {
	font-size: 2em;
}

`

 @mixinStyles(styles)
export class UfoCard extends LitElement {
	@property({type: Object}) report: UfoReport

	render() {
		const {report} = this
		return (report ?? null) && html`
			<div class=poster>
				${report.poster ? html`
					<img
						alt=""
						src=${`reports/${report.shortname}/${report.poster.link}`}
						title=${`attribution: ${report.poster.attribution.source}`}
						/>
				` : null}
				<div class="overlay">
					<p class=title>${report.title}</p>
					<p class=subtitle>${report.subtitle}</p>
				</div>
			</div>
			<div class=details>
				<div class=grade>
					<span>Grade</span>
					<span>${report.grade}</span>
				</div>
				<div class=extra></div>
			</div>
		`
	}
}
