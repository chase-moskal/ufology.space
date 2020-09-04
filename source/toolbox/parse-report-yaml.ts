
import yaml from "js-yaml-chase-esm"
import {UfoReport, ImageInfo} from "../types.js"
import {tabsToSpaces} from "./tabs-to-spaces.js"

export function parseReportYaml(text: string) {
	let report: UfoReport
	const problems = []

	//
	// parsing the yaml
	//

	try {
		report = yaml.safeLoad(tabsToSpaces(text))
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
		if (necessary) r = r && assert(isSet(subject), `"${key}" string is required`)
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
		if (necessary) r = r && assert(isSet(num), `"${key}" number is required`)
		if (isSet(num)) {
			r = r
				&& assert(typeof num === "number", `"${key}" must be a number`)
				&& assert(num >= min, `"${key}" must be ${min} or greater`)
				&& assert(num <= max, `"${key}" must be ${max} or less`)
		}
		return r
	}

	function assertImageData(imageData: ImageInfo, key: string, necessary: boolean) {
		let r = true
		if (necessary) r = r && assert(isSet(imageData), `"${key}" is required`)
		if (isSet(imageData)) {
			r = r
				&& assert(!!imageData && typeof imageData === "object", `"${key}" must be object`)
				&& assertString(imageData.link, `${key}.link`, true, 1, 256)
				&& assert(!!imageData.attribution && typeof imageData.attribution === "object", `"${key}" must be object`)
				&& assertString(imageData.attribution.link, `${key}.attribution.link`, true, 1, 1024)
				&& assertString(imageData.attribution.link, `${key}.attribution.source`, true, 1, 512)
		}
		return r
	}

	function assertBullets(bullets: string[], key: string, necessary: boolean, min: number, max: number) {
		let r = true
		if (necessary) r = r && assert(isSet(bullets), `"${key}" is bullets are required`)
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

	if (report) {
		try {

			assertString(report.title, "title", required, 4, 40)
			assertString(report.subtitle, "subtitle", required, 4, 80)
			assertNumber(report.grade, "grade", required, 0, 100)
			assertImageData(report.poster, "poster", optional)

			assertString(report.writeup, "writeup", optional, 0, 10000)
			assertBullets(report.labels, "labels", optional, 2, 32)
			assertBullets(report.bullets, "bullets", optional, 2, 2000)
			assertBullets(report.persuasive, "persuasive", optional, 2, 1000)
			assertBullets(report.dissuasive, "dissuasive", optional, 2, 1000)

		}
		catch (error) {
			problems.push(`error during validation: ${error.message}`)
		}
	}

	return {report, problems}
}