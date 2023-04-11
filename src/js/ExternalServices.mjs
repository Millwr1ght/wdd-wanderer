export default class ExternalServices { 
    _baseURL = {  
        github: "https://api.github.com/search/",
        local:  "../"
    }
    
    constructor(location) {
        if (!location in this._baseURL) {
            throw { name: "servicesError", message:`Not listening for data from this location: ${location}`};
        }
        this.URL = this._baseURL[location]; //bool
    }
    
    _jsonQuery(filepath) {
        return `${this.URL}${filepath}`;
    }

    //internal json: by categories: news updates, comments?, etc
    //external json: by filepath or API query
    buildLocalQuery(category) {
        return `json/${category}.json`;
    }
    
    async getData(filepath) {
        try {
            const result = await fetch(this._jsonQuery(filepath))
                .then((response) => { 
                    if (!response.ok) {
                        throw { name: "servicesError", message: data};
                    }
                    return response.json();
                }).then((data) => {
                    //console.log(data);
                    return data;
                })
            return result
        } catch (error) {
            console.error(error);
        }
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