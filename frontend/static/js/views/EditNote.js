import AbstractView from "./AbstractView.js"
import * as fetchutils from "../fetchutils/fetchutils.js"
import {executeJsonFetch} from "../fetchutils/fetchutils.js";
export default class extends AbstractView {

    GET_NOTE_URL
    PUT_NOTE_URL
    note

    constructor(params) {
        super(params)
        this.title = "Note Editing"
        this.GET_NOTE_URL = `/api/notes/${this.params.urlParams.id}`
        this.PUT_NOTE_URL = `/api/notes/${this.params.urlParams.id}`
    }

    async configureView(router){
        await fetchutils.executeJsonFetch(this.GET_NOTE_URL, 'GET', this, null, note =>{
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
<div class="edit_note_main d-flex justify-content-center">
    <form method="POST" enctype="multipart/form-data" id="edit_note_form" style="max-width: 800px">
<!--        <div class="form-group">-->
            <div class="form-row">
                <input class="form-control" type="text" name="title"  placeholder="Enter a title" value="${this.note.title}"/>
            </div>
            
            <div class="row">
<!--                        <select name="status" id="cars">-->
<!--                            <option value="to do" ${this.note.status === "to do" ? "selected: selected": ""}>to do</option>-->
<!--                            <option value="in progress" ${this.note.status === "in progress" ? "selected: selected": ""}>in progress</option>-->
<!--                            <option value="done" ${this.note.status === "done" ? "selected: selected": ""}>done</option>-->
<!--                        </select>-->
                <div class="col">
                    <div class="btn-group form-control" role="group">
                        <input type="radio" class="btn-check" id="btnradio1" name="status" value="to do"
                        ${this.note.status === "to do" ? "checked": ""}
                        >
                        <label class="btn btn-outline-primary" for="btnradio1">to do</label>
                        
                        <input type="radio" class="btn-check"  id="btnradio2" name="status" value="in progress"
                        ${this.note.status === "in progress" ? "checked": ""}
                        >
                        <label class="btn btn-outline-primary" for="btnradio2">in progress</label>
                        
                        <input type="radio" class="btn-check" id="btnradio3" name="status" value="done"
                        ${this.note.status === "done" ? "checked": ""}
                        >
                        <label class="btn btn-outline-primary" for="btnradio3">done</label>
                    </div>
                </div>
                <div class="col">
                    <label class="form-control">
                        Completion date:
                        <input type="date" name="completionDate" placeholder="Enter a date" value="${this.note.completionDate}"/>
                    </label>
                </div>
            </div>
            
            <div class="row">
                <div class="col">
                    <textarea class="form-control" rows="5" cols="60" name="text" placeholder="Enter a note">${this.note.text}</textarea>
                </div>
                <div class="col">
                    <input class="form-control" type="file" name="files" multiple/>
                    <table  class="form-control">
                        ${tableBody}
                    </table>
                </div>
            </div>
                        
            <div class="d-flex justify-content-center">
                <div class="btn-group">
                    <input class="form-control btn btn-primary" type="submit"/>
                    <a class="form-control btn btn-primary" href="/">Cancel</a>
                </div>
            </div>
    
    
<!--        </div>-->
    </form>
</div>
`
    }

    async configureDocument(document){
        const form = document.getElementById('edit_note_form');
        form.onsubmit = async e => {
            e.preventDefault()
            let formData = new FormData(form)
            await executeJsonFetch(this.PUT_NOTE_URL, 'PUT', this, formData, {})
            this.params.router.navigateTo('/')
        }
    }


}