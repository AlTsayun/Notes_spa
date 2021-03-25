import AbstractView from "./AbstractView.js"
import {executeJsonFetch} from "../fetchutils/fetchutils.js";
export default class extends AbstractView {

    POST_NOTE_URL = '/api/notes'

    constructor(params) {
        super(params)
        this.title = "Note Creation"
    }

    async configureView(router){
        await executeJsonFetch(this.POST_NOTE_URL, 'POST', this, null, note => {
            console.log(`Created note:`, note)
            this.redirectUrl = `/edit_note/${note.id}`
        })
    }

}