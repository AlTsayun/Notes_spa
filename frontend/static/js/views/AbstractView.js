export default class {
    params
    constructor(params) {
        this.params = params
        console.log(params)
        this.params.url
    }

    getUrl(){
        return this.params.url
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