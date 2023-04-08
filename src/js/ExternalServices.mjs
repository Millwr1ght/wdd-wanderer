export default class ExternalServices {
    constructor(category) {
        this.category = category
        this.path = `../json/${this.category}.json`;
    }
    
    //category: news updates, comments?, etc
    async getData(category) {
        const response = await fetch(this.path);
        const data = await convertToJson(response);
        data.Result.sort(sortByProperty(sort));
        return data.Result;
    }

}

async function convertToJson(res) {
    const data = await res.json();
    if (res.ok) {
        return data;
    } else {
        throw { name: "servicesError", message: data};
    }
}