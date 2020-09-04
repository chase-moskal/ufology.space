
import {parseReportYaml} from "./parse-report-yaml.js"

export async function loadReports({
		reportNames,
		reportDirectory,
		updateProgress,
	}: {
		reportNames: string[]
		reportDirectory: string
		updateProgress: (progress: number) => void
	}) {

	let count = 0
	updateProgress(count)

	return Promise.all(reportNames.map(async reportName => {
		const url = `${reportDirectory}/${reportName}/report.yaml`
		const text = await fetch(url).then(response => response.text())
		const {report, problems} = parseReportYaml(text)

		if (problems.length > 0)
			throw new Error(`failed validation: ${reportName} - ${problems.join(";")}`)

		report.shortname = reportName
		updateProgress(++count)
		return report
	}))
}
