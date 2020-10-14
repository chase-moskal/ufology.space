
import {LitElement, css, property, html} from "lit-element"
import {dashify} from "metalshop/dist/metalfront/toolbox/dashify.js"
import {mixinStyles} from "metalshop/dist/metalfront/framework/mixin-styles.js"

import {UfoReport} from "../types.js"

const styles = css`

:host {
	display: block;
	position: relative;
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
	color: inherit;
	user-select: none;
	text-transform: inherit;
}

[part=card]:focus,
[part=card]:hover {
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

.modal {
	position: absolute;
	z-index: 1;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}

.modal-blanket {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: #000b;
	backdrop-filter: blur(20px);
}

.modal-content {
	position: relative;
	top: 0;
	background: #fffe;
}

`

export interface UfoCatalogModal {
	top: number
	report: UfoReport
}

export class UfoCardClickEvent extends CustomEvent<{modal: UfoCatalogModal}> {
	constructor({modal}: {modal: UfoCatalogModal}) {
		super(dashify(UfoCardClickEvent.name), {
			detail: {modal},
			bubbles: true,
			composed: true,
		})
	}
}

 @mixinStyles(styles)
export class UfoCatalog extends LitElement {
	@property({type: Object}) modal: UfoCatalogModal
	@property({type: Object}) reports: UfoReport[]

	private _readLocation() {
		const {hash} = window.location
		const report = this.reports.find(r => `#${r.shortname}` === hash)
		if (report) {
			const element = this.shadowRoot.querySelector<HTMLElement>(
				`[data-shortname="${report.shortname}"]`
			)
			let top = element.offsetTop - 15
			top = (top < 0) ? 0 : top
			this.modal = {report, top}
		}
		else {
			this.modal = undefined
		}
	}

	firstUpdated() {
		setTimeout(() => this._readLocation(), 0)
	}

	private _handleHashChange = () => this._readLocation()
	connectedCallback() {
		window.addEventListener("hashchange", this._handleHashChange)
		super.connectedCallback()
	}
	disconnectedCallback() {
		window.removeEventListener("hashchange", this._handleHashChange)
		super.disconnectedCallback()
	}

	render() {
		const {modal, reports} = this
		return html`
			<header part=header></header>
			<div part=container>
				${modal
					? renderModal(modal)
					: null}
				${renderCards({
					reports,
					selectable: !modal,
				})}
			</div>
		`
	}
}

function renderModal(modal: UfoCatalogModal) {
	return html`
		<div class=modal>
			<div class=modal-blanket @click=${() => { window.location.href = "#" }}></div>
			<div class=modal-content style="top: ${modal.top}px">
				<p><a href="#">back</a></p>
				<p>modal-content</p>
			</div>
		</div>
	`
}

function renderCards({reports, selectable}: {
		reports: UfoReport[]
		selectable: boolean
	}) {
	const tabindex = selectable ? "0" : null
	return reports.map(report => html`
		<a
			part=card
			href="#${report.shortname}"
			data-shortname=${report.shortname}>
			<ufo-card
				.report=${report}
				tabindex=${tabindex}
			></ufo-card>
		</a>
	`)
}
