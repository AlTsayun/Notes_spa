import AbstractView from "./AbstractView.js"
import * as urlutils from "../urlutils/urlutils.js"
import * as fetchutils from "../fetchutils/fetchutils.js"
export default class extends AbstractView {

    GET_NOTE_URL
    PUT_NOTE_URL
    note

    constructor(params) {
        super(params)
        this.title = "Note Editing"
        this.GET_NOTE_URL = `/api/notes/${this.params.urlParams.id}`
        this.POST_NOTE_URL = `/api/notes/${this.params.urlParams.id}`
    }

    async configureView(router){
        await fetchutils.executeJsonFetch(this.GET_NOTE_URL, 'GET', this, note =>{
                console.log(`Received note`, note)
                this.note = note
            })
    }



    getHtml() {
        let tableBody = ``
        for(let file of this.note.files) {
            tableBody = tableBody.concat(`
<tr>
    <td>
        ${file.originalname}
    </td>
</tr>

`)
        }

        return `
<div class="edit_note_main">
    <form method="POST" enctype="multipart/form-data">
        <ol>
            <li class="edit_note_list_item">
                <label>
                    <input type="text" name="title" placeholder="Enter a title" value="${this.note.title}"/>
                </label>
            </li>

            <li class="edit_note_list_item">
                <label>Status
                    <select name="status" id="cars">
                        <option value="to do" ${this.note.status === "to do" ? "selected: selected": ""}>to do</option>
                        <option value="in progress" ${this.note.status === "in progress" ? "selected: selected": ""}>in progress</option>
                        <option value="done" ${this.note.status === "done" ? "selected: selected": ""}>done</option>
                    </select>
                </label>
            </li>

            <li class="edit_note_list_item">
                <label>
                    Completion date:
                    <input type="date" name="completionDate" placeholder="Enter a date" value="${this.note.completionDate}"/>
                </label>
            </li>
            <li class="edit_note_list_item">
                <textarea rows="5" cols="60" name="text" placeholder="Enter a note">${this.note.text}</textarea>
            </li>
            <li class="edit_note_list_item">
                <table>
                    ${tableBody}
                </table>
                <input type="file" name="file" multiple/>
            </li>

        </ol>


        <input type="submit"/>

        <a href="/">Cancel</a>
    </form>
</div>
`
    }

    async configureDocument(document){}


}