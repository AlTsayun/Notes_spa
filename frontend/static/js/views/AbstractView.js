export default class {
    params
    url
    constructor(url, params) {
        this.params = params
        this.url = url
    }

    getUrl(){
        return this.url
    }

    setTitle(title) {
        document.title = title
    }

    async getHtml() {
        return ""
    }

    async configureDocument(document, router){
    }
}