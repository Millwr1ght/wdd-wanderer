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

function renderTemplate(parent, template) {
    parent.insertAdjacentHTML("afterbegin", template);
    //callback
}

//load headers and footer
export async function loadHeaderFooter() {
    //get data and locations
    const headerElement = qs("#main-header");
    const headerTemplate = await getTemplate("/partials/header.html");
    const footerElement = qs("#main-footer");
    const footerTemplate = await getTemplate("/partials/footer.html");
    
    //put data in location
    renderTemplate(headerElement, headerTemplate);
    renderTemplate(footerElement, footerTemplate);
}


//load navbar
export async function loadNavbar() {
    //get data && location
    const navElement = qs("#nav-top");
    const navTemplate = await getTemplate("/partials/nav.html");

    //put data in location
    renderTemplate(navElement, navTemplate);    
}

