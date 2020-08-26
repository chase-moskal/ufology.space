
import {jsYaml} from "js-yaml-chase-esm/dist/js-yaml.esm.js"
import {UfologyData} from "./types.js"

export function validateDataYaml(dataYaml: string) {
	let data: UfologyData
	const problems = []

	//
	// parsing the yaml
	//

	try {
		data = jsYaml.safeLoad(dataYaml)
	}
	catch (error) {
		problems.push(`yaml parsing error: ${error.message}`)
	}

	//
	// validating the data
	//

	const required = true
	const optional = false

	function assert(condition: boolean, problem: string) {
		if (!condition) problems.push(problem)
		return condition
	}

	function isSet(x: any) {
		return (x !== undefined && x !== null)
	}

	function assertString(subject: string, key: string, necessary: boolean, min: number, max: number) {
		let r = true
		if (necessary) r = r && assert(isSet(subject), `"${key}" is required`)
		if (isSet(subject)) {
			r = r
				&& assert(typeof subject === "string", `"${key}" must be string`)
				&& assert(subject.length >= min, `"${key}" must be ${min} characters or more`)
				&& assert(subject.length <= max, `"${key}" must be ${max} characters or less`)
		}
		return r
	}

	function assertNumber(num: number, key: string, necessary: boolean, min: number, max: number) {
		let r = true
		if (necessary) r = r && assert(isSet(num), `"${key}" is required`)
		if (isSet(num)) {
			r = r
				&& assert(typeof num === "number", `"${key}" must be a number`)
				&& assert(num >= min, `"${key}" must be ${min} or greater`)
				&& assert(num <= max, `"${key}" must be ${max} or less`)
		}
		return r
	}

	function assertBullets(bullets: string[], key: string, necessary: boolean, min: number, max: number) {
		let r = true
		if (necessary) r = r && assert(isSet(bullets), `"${key}" is required`)
		if (isSet(bullets)) {
			if (r = r && assert(Array.isArray(bullets), `"${key}" must be bullet points`)) {
				bullets.forEach((bullet, index) => {
					const subkey = `${key}.${index}`
					const x = assertString(bullet, subkey, required, min, max)
					r = r && x
				})
			}
		}
		return r
	}

	if (data) {
		try {

			assertString(data.title, "title", required, 4, 80)
			assertString(data.summary, "summary", required, 12, 256)
			assertNumber(data.grade, "grade", required, 0, 100)

			assertString(data.writeup, "writeup", optional, 0, 10000)
			assertBullets(data.labels, "labels", optional, 2, 32)
			assertBullets(data.bullets, "bullets", optional, 2, 2000)
			assertBullets(data.persuasive, "persuasive", optional, 2, 1000)
			assertBullets(data.dissuasive, "dissuasive", optional, 2, 1000)

		}
		catch (error) {
			problems.push(`error during validation: ${error.message}`)
		}
	}

	return {data, problems}
}
