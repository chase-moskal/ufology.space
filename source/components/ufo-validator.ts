
import {LitElement, css, property, html} from "lit-element"
import {makeDebouncer} from "metalshop/dist/metalfront/toolbox/debouncer.js"
import {mixinStyles} from "metalshop/dist/metalfront/framework/mixin-styles.js"

import {parseReportYaml} from "../parse-report-yaml.js"

const styles = css`

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

`

 @mixinStyles(styles)
export class UfoValidator extends LitElement {

	 @property({type: String})
	private dataYaml: string = ""

	 @property({type: Array})
	private problems: string[]

	private validate = () => {
		if (this.dataYaml) {
			const {problems} = parseReportYaml(this.dataYaml)
			this.problems = problems
		}
	}

	private debouncer = makeDebouncer({
		delay: 200,
		action: this.validate,
	})

	private queueValidation(event: any) {
		this.problems = undefined
		const textarea = event.path[0]
		this.dataYaml = textarea.value
		this.debouncer.queue()
	}

	render() {
		return html`
			<textarea
				placeholder="enter report.yaml here"
				@change=${this.queueValidation}
				@keyup=${this.queueValidation}
			></textarea>
			<div part="results">
				${!!this.problems ? html`
					${this.problems.length ? html`
						<ul part="problems">
							${this.problems.map(problem => html`
								<li>${problem}</li>
							`)}
						</ul>
					` : html`
						<p part="valid">valid report.yaml</p>
					`}
				` : null}
			</div>
		`
	}
}
