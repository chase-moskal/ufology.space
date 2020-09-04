
import {LitElement, css, property, html} from "lit-element"
import {mixinStyles} from "metalshop/dist/metalfront/framework/mixin-styles.js"

import {UfoReport} from "../types.js"

const styles = css`

:host {
	display: block;
}

:host {
	--_internal-grid-spacing: var(--ufo-catalog-grid-spacing, 1.5rem);
}

[part=header] {
	min-height: 1em;
	background: rgba(255,255,255, 0.1);
}

[part=container] {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
	justify-items: center;
	gap: var(--_internal-grid-spacing);
	padding: var(--_internal-grid-spacing);
}

[part=card] {
	width: 100%;
	max-width: 16em;
	box-shadow: 1px 3px 24px rgba(0,0,0, 0.75);
	outline: 0px solid rgba(255,255,255, 0);
	transition: outline 200ms linear, transform 200ms linear;
}

[part=card]:focus,
[part=card]:hover {
	z-index: 1;
	position: relative;
}

[part=card]:focus {
	outline: var(--focus-outline);
	transform: scale(1.05);
}

[part=card]:hover {
	outline: var(--hover-outline);
	transform: scale(1.1);
}

[part=card]:active {
	outline: var(--active-outline);
}

.fullreport {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100%;
}

.fullreport section {
	width: 100%;
	min-height: 120px;
	background: rgba(70,70,70, 0.9);
}

:host([fullreport]) .fullreport {
	z-index: 2;
}

:host([anim="1"]) .fullreport {
	animation: 1s linear report_appear;
}

:host([anim="2"]) .fullreport {
	animation: 1s linear report_disappear;
}

@keyframes report_appear {
	0% {
		opacity: 0;
		transform: rotate3d(0, 1, 0, 90deg);
	}
	50% {
		opacity: 0;
		transform: rotate3d(0, 1, 0, 90deg);
	}
	100% {
		opacity: 1;
		transform: rotate3d(0);
	}
}

@keyframes report_disappear {
	0% {
		opacity: 1;
		transform: rotate3d(0);
	}
	50% {
		opacity: 0;
		transform: rotate3d(0, 1, 0, 90deg);
	}
	100% {
		opacity: 0;
		transform: rotate3d(0, 1, 0, 90deg);
	}
}

:host {
	perspective: 100em;
}

.explorer {
	opacity: 1;
}

:host([fullreport]) .explorer {
	opacity: 0;
}

:host([anim="1"]) .explorer {
	animation: 1s linear explorer_disappear;
}

:host([anim="2"]) .explorer {
	animation: 1s linear explorer_appear;
}

@keyframes explorer_disappear {
	0% {
		opacity: 1;
		transform: rotate3d(0);
	}
	50% {
		opacity: 0;
		transform: rotate3d(0, 1, 0, -90deg);
	}
	100% {
		opacity: 0;
		transform: rotate3d(0, 1, 0, -90deg);
	}
}

@keyframes explorer_appear {
	0% {
		opacity: 0;
		transform: rotate3d(0, 1, 0, -90deg);
	}
	50% {
		opacity: 0;
		transform: rotate3d(0, 1, 0, -90deg);
	}
	100% {
		opacity: 1;
		transform: rotate3d(0);
	}
}

`

 @mixinStyles(styles)
export class UfoCatalog extends LitElement {
	@property({type: Object}) cardData: UfoReport[]
	@property({type: Boolean, reflect: true}) fullreport: boolean = false
	@property({type: Number, reflect: true}) anim: number = 0

	@property({type: Boolean}) private busy: boolean = false

	private _engageFullReport() {
		if (this.busy) return
		this.busy = true
		this.anim = 1
		this.fullreport = true
		setTimeout(() => {
			this.busy = false
		}, 1000)
	}

	private _closeFullReport() {
		if (this.busy) return
		this.busy = true
		this.anim = 2
		setTimeout(() => {
			this.fullreport = false
			this.busy = false
		}, 1000)
	}

	render() {
		const {cardData} = this
		return html`
			${this.fullreport ? html`
				<div class=fullreport>
					<header><a @click=${this._closeFullReport} href="#">🔙 close</a></header>
					<section>
						abc
					</section>
				</div>
			` : html``}
			<div class=explorer>
				<header part=header></header>
				<div part=container>
					${cardData.map(data => html`
						<ufo-card
							part=card
							tabindex=0
							.data=${data}
							@click=${this._engageFullReport}
						></ufo-card>
					`)}
				</div>
			</div>
		`
	}
}
