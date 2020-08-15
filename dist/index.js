import { themeComponents } from "metalshop/dist/metalfront/framework/theme-components.js";
import { registerComponents } from "metalshop/dist/metalfront/toolbox/register-components.js";
import { UfoCard } from "./components/ufo-card.js";
import { UfoCatalog } from "./components/ufo-catalog.js";
import theme from "./theme.css.js";
import { loadDataList } from "./load-data-list.js";
void async function () {
    const main = document.querySelector("main");
    registerComponents(themeComponents(theme, {
        UfoCard,
        UfoCatalog,
    }));
    // read the ufo names script
    const dataNames = document.querySelector("script[type=ufo-names]")
        .textContent
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);
    // create loading indicator
    const loading = (() => {
        const element = document.createElement("div");
        element.className = "loading";
        main.appendChild(element);
        return {
            update(progress) {
                element.textContent = `loading ${progress}/${dataNames.length}`;
            },
            end() {
                main.removeChild(element);
            },
        };
    })();
    loading.update(0);
    // load data yamls
    const data = await loadDataList({
        dataNames,
        dataDirectory: "data",
        updateProgress: loading.update,
    });
    // initialize catalog
    const catalog = document.createElement("ufo-catalog");
    catalog.cardData = data;
    loading.end();
    main.appendChild(catalog);
}();
//# sourceMappingURL=index.js.map