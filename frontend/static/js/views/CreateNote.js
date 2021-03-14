import AbstractView from "./AbstractView.js";
import * as urlutils from "../urlutils/urlutils.js"
export default class extends AbstractView {

    POST_NOTE_URL = '/api/notes'

    constructor(params) {
        super(params)
        this.setTitle("Note Creation")
    }

    async getHtml() {
        return ``
    }

    async configureDocument(document, router){
        let noteId
        fetch(this.POST_NOTE_URL, { method: 'POST' })
            .then((response) => {
            return response.json()
        })
            .then((note) => {
                noteId = note.id
            })
            .then(() => {
            router.navigateTo(`/edit_note/` + noteId)
        })
    }


}