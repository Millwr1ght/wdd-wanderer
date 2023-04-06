import { qs } from "./utils.mjs";

export default class Alert {
    constructor() {
        this.dataSource = ("../src/json/alerts.json");
    }

    renderAlertByID(alertID, scroll=true){
        const element = qs("main");
        console.log(this.dataSource);
        element.prepend(alertTemplate(this.dataSource[alertID]));
        scroll ? window.scrollTo(0, 0): null;
    }

    //yes these are the same. but hear me out, who has all the alert IDs memorized
    //and this would be more descriptive in the code as to which alert is happening
    renderAlertByName(alertName, scroll=true){
        const element = qs("main");
        element.prepend(alertTemplate(this.dataSource[alertName]));
        scroll ? window.scrollTo(0, 0): null;
    }
}

function alertTemplate(dataSource) {
    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-section");
    //message
    const alertP = document.createElement("p");
    alertP.innerText = dataSource.message;
    alertP.style.backgroundColor = alertMessage.background;
    alertP.style.color = alertMessage.color;
    alertSection.appendChild(alertP);
    
    //close button
    const alertX = document.createElement("span");
    alertX.innerText = "X"
    alertSection.appendChild(alertX);

    //add eventListener
    alertSection.addEventListener("click", function(event) {
        if (event.target.tagName == "SPAN") {
            main.removeChild(this);
        }
    });
    
    return alertSection
}