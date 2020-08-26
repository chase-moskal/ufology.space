
import {loadDataList} from "./load-data-list.js"

// import {registerComponents} from "metalshop/dist/metalfront/toolbox/register-components.js"

void async function() {

	// read the ufo names script
	const dataNames = document.querySelector("script[type=ufo-names]")
		.textContent
		.split("\n")
		.map(line => line.trim())
		.filter(line => line.length > 0)

	// create catalog in loading state
	const catalog = document.querySelector<HTMLDivElement>(".catalog")

	// loading
	const loading = (() => {
		const element = document.createElement("div")
		element.className = "loading"
		catalog.appendChild(element)
		return {
			update(progress: number) {
				element.textContent = `loading ${progress}/${dataNames.length}`
			},
			remove() {
				catalog.removeChild(element)
			},
		}
	})()

	loading.update(0)

	// load data yamls
	const data = await loadDataList({
		dataNames,
		dataDirectory: "data",
		updateProgress: loading.update,
	})

	loading.remove()

	for (const item of data) {
		const p = document.createElement("p")
		p.textContent = item.shortname
		catalog.appendChild(p)
	}
}()
