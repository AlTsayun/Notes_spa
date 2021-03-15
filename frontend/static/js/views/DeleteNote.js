import AbstractView from "./AbstractView.js"
import {executeJsonFetch} from "../fetchutils/fetchutils.js";
export default class extends AbstractView {

    DELETE_NOTE_URL = '/api/notes'

    constructor(params) {
        super(params)
        this.title = "Note Deletion"
        this.DELETE_NOTE_URL = `/api/notes/${this.params.urlParams.id}`
    }

    async configureView(router){
        console.log("not yet")
        await executeJsonFetch(this.DELETE_NOTE_URL, 'DELETE', this, emptyObject => {
            console.log(emptyObject)
            this.redirectUrl = `/`
        })
        console.log("done")
    }

}