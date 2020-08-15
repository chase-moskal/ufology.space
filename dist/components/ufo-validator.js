var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, property, html } from "lit-element";
import { makeDebouncer } from "metalshop/dist/metalfront/toolbox/debouncer.js";
import { mixinStyles } from "metalshop/dist/metalfront/framework/mixin-styles.js";
import { parseDataYaml } from "../parse-data-yaml.js";
const styles = css `

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

textarea {
	width: 100%;
	min-height: 24em;
	padding: 1em;
	color: #ccc;
	background: #000;
}

[part=results] {
	padding: 0.25em 0.5em;
}

[part=problems] {
	list-style: none;
	padding: 0;
}

[part=problems] li::before {
	content: "\\274C";
	display: inline-block;
	margin-right: 0.25em;
}

[part=valid]::before {
	content: "\\2714";
	display: inline-block;
	margin-right: 0.25em;
}

`;
let UfoValidator = class UfoValidator extends LitElement {
    constructor() {
        super(...arguments);
        this.dataYaml = "";
        this.validate = () => {
            if (this.dataYaml) {
                const { problems } = parseDataYaml(this.dataYaml);
                this.problems = problems;
            }
        };
        this.debouncer = makeDebouncer({
            delay: 200,
            action: this.validate,
        });
    }
    queueValidation(event) {
        this.problems = undefined;
        const textarea = event.path[0];
        this.dataYaml = textarea.value;
        this.debouncer.queue();
    }
    render() {
        return html `
			<textarea
				placeholder="enter data.yaml here"
				@change=${this.queueValidation}
				@keyup=${this.queueValidation}
			></textarea>
			<div part="results">
				${!!this.problems ? html `
					${this.problems.length ? html `
						<ul part="problems">
							${this.problems.map(problem => html `
								<li>${problem}</li>
							`)}
						</ul>
					` : html `
						<p part="valid">valid data.yaml</p>
					`}
				` : null}
			</div>
		`;
    }
};
__decorate([
    property({ type: String })
], UfoValidator.prototype, "dataYaml", void 0);
__decorate([
    property({ type: Array })
], UfoValidator.prototype, "problems", void 0);
UfoValidator = __decorate([
    mixinStyles(styles)
], UfoValidator);
export { UfoValidator };
//# sourceMappingURL=ufo-validator.js.map