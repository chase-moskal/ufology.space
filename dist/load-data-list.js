import { parseDataYaml } from "./parse-data-yaml.js";
export async function loadDataList({ dataNames, dataDirectory, updateProgress, }) {
    let count = 0;
    return Promise.all(dataNames.map(async (dataName) => {
        const url = `${dataDirectory}/${dataName}/data.yaml`;
        const text = await fetch(url).then(response => response.text());
        const { data, problems } = parseDataYaml(text);
        if (problems.length > 0)
            throw new Error(`failed validation: ${dataName} - ${problems.join(";")}`);
        data.shortname = dataName;
        updateProgress(++count);
        return data;
    }));
}
//# sourceMappingURL=load-data-list.js.map