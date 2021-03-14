import AbstractView from "./AbstractView.js";
import * as urlutils from "../urlutils/urlutils.js"
export default class extends AbstractView {

    GET_NOTE_URL
    PUT_NOTE_URL

    constructor(params) {
        super(params)
        this.setTitle("Note Editing")
        this.GET_NOTE_URL = `/api/notes/${this.params.urlParams.id}`
        this.POST_NOTE_URL = `/api/notes/${this.params.urlParams.id}`
    }


    async getHtml() {
        return ``
    }

    async configureDocument(document, router){
        fetch(this.GET_NOTE_URL, { method: 'GET' })
            .then((response) => {
                console.log(response.status)
                if (response.status === 404){
                    router.navigateTo('/404' + urlutils.formQueryString({url: this.params.url}))
                }
                return response.json()
            })
            .then((note) => {
                console.log()
            })
    }


}