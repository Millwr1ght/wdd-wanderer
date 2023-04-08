export default class ExternalServices {
    //constructor() {}
    
    _jsonPath(filename) {
        this.path = `../json/${filename}.json`;
    }

    //internal json categories: news updates, comments?, etc
    async getData(category) {
        const response = await fetch(_jsonPath(category));
        const data = await convertToJson(response);
        //data.Result.sort(sortByProperty(sort));
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