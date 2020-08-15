var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, property, html } from "lit-element";
import { mixinStyles } from "metalshop/dist/metalfront/framework/mixin-styles.js";
const styles = css `

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

`;
let UfoCatalog = class UfoCatalog extends LitElement {
    render() {
        const { cardData } = this;
        return html `
			<header part=header></header>
			<div part=container>
				${cardData.map(data => html `
					<ufo-card part=card .data=${data} tabindex=0></ufo-card>
				`)}
			</div>
		`;
    }
};
__decorate([
    property({ type: Object })
], UfoCatalog.prototype, "cardData", void 0);
UfoCatalog = __decorate([
    mixinStyles(styles)
], UfoCatalog);
export { UfoCatalog };
//# sourceMappingURL=ufo-catalog.js.map