import { renderListWithTemplate } from "./utils.mjs";

export default class NewsList {
    constructor(category, dataSource, listElement) {
        this.dataSource = dataSource;
        this.category = category;
        this.listElement = listElement;
    }

    async init() {
        const filePath = this.dataSource.buildLocalQuery(this.category);
        const list = await this.dataSource.getData(filePath);
        this.renderList(list);
    }

    renderList(list) {
        renderListWithTemplate(updateCardTemplate, this.listElement, list);
    }
}

function updateCardTemplate(update){
    return `<article class="wanderer-article flex-row">
        <div class="wa-header">
            <h1 class="wa-title">${update.title}</h1>
            <h2 class="wa-date">${update.date} by ${update.author}</h2>
        </div>
        <div class="horiz-separator"></div>
        <section class="wa-content">${update.content}</section>
        <div class="horiz-separator"></div>
    </article>`
}