
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

`

 @mixinStyles(styles)
export class UfoCatalog extends LitElement {
	@property({type: Object}) cardData: UfoReport[]

	render() {
		const {cardData} = this
		return html`
			<header part=header></header>
			<div part=container>
				${cardData.map(data => html`
					<ufo-card part=card .data=${data} tabindex=0></ufo-card>
				`)}
			</div>
		`
	}
}
