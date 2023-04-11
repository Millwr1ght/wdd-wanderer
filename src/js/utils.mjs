import ExternalServices from "./ExternalServices.mjs";

export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

//get partial template
async function getTemplate(path) {
    const response = await fetch(path);
    const template = response.text();
    return template;
}

// render a list 
export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
    const htmlStrings = list.map(template);
    if (clear) {
        parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

function renderTemplate(parent, template, callback, data) {
    parent.insertAdjacentHTML("afterbegin", template);
    //callback
    if (callback) {
        callback(data)
    }
}

//load headers and footer
export async function loadHeaderFooter(headerCallback, headerData, footerCallback = getLastPush, footerData = "#lastModified") {
    //get data and locations
    const headerElement = qs("#main-header");
    const headerTemplate = await getTemplate("/partials/header.html");
    const footerElement = qs("#main-footer");
    const footerTemplate = await getTemplate("/partials/footer.html");

    //put data in location
    renderTemplate(headerElement, headerTemplate, headerCallback, headerData);
    renderTemplate(footerElement, footerTemplate, footerCallback, footerData);
}

//load navbar
export async function loadNavbar(activeSelector) {
    //get data && location
    const navElement = qs(".nav-top");
    const navTemplate = await getTemplate("/partials/nav.html");

    //put data in location
    renderTemplate(navElement, navTemplate);

    //select active link
    if (activeSelector) {
        //choose the selected element
        const activeElement = qs(activeSelector);

        //make it the active selection on the navbar
        activeElement.classList.add("active");
    }
}

//it was this easy
//narrator: it was not 
async function getLastPush(selector) {
    const services = new ExternalServices("github");
    const data = await services.getData("repositories?q=repo:Millwr1ght/wdd-wanderer");
    const date = new Date(data.items[0].pushed_at);
    qs(selector).innerHTML = ` | Last Modified: ${date.toDateString()}`

    //turns out this shows when the HTML was last built, which for most html documents, is when the page was last loaded.
    //turns out what we wanted was when the GH repo was last pushed at.
    //qs(selector).innerHTML = ` | Last Modified: ${document.lastModified}`;
};