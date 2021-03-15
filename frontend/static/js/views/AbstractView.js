export default class {
    params
    redirectUrl
    title
    constructor(params) {
        this.params = params
        console.log(`Created view recieved params:`, params)
        this.redirectUrl = null
    }

    async getTitle(){
        return this.title
    }

    async configureView(router){

    }

    getHtml() {
        return ""
    }

    async configureDocument(document){
    }
}