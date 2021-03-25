import AbstractView from "./AbstractView.js"
import {executeNoResponseFetch} from "../fetchutils/fetchutils.js";
export default class extends AbstractView {

    DELETE_NOTE_URL = '/api/notes'

    constructor(params) {
        super(params)
        this.title = "Note Deletion"
        this.DELETE_NOTE_URL = `/api/notes/${this.params.urlParams.id}`
    }

    async configureView(router){
        await executeNoResponseFetch(this.DELETE_NOTE_URL, 'DELETE', this, null)
        this.redirectUrl = '/'
    }

}