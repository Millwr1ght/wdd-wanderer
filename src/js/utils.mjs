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

export async function getJSONData(path) {
    const response = await fetch(path);
    return response.json();
}

//get partial template
async function getTemplate(path) {
    const response = await fetch(path);
    const template = response.text();
    return template;
}

function renderTemplate(parent, template, callback, data) {
    parent.insertAdjacentHTML("afterbegin", template);
    //callback
    if (callback) {
        callback(data)
    }
}

//load headers and footer
export async function loadHeaderFooter(headerCallback, headerData) {
    //get data and locations
    const headerElement = qs("#main-header");
    const headerTemplate = await getTemplate("/partials/header.html");
    const footerElement = qs("#main-footer");
    const footerTemplate = await getTemplate("/partials/footer.html");

    //put data in location
    renderTemplate(headerElement, headerTemplate, headerCallback, headerData);
    renderTemplate(footerElement, footerTemplate);
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