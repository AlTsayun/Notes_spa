import AbstractView from "./AbstractView.js"
import * as urlutils from "../urlutils/urlutils.js"
import * as fetchutils from "../fetchutils/fetchutils.js";
export default class extends AbstractView {

    GET_NOTES_URL = '/api/notes'
    notes

    constructor(params) {
        super(params)
        this.title = "Notesboard"
    }

    async configureView(router){
        if (this.params.queryParams.statusFilter !== undefined){
            this.GET_NOTES_URL = this.GET_NOTES_URL + urlutils.formQueryString({statusFilter: this.params.queryParams.statusFilter})
        }
        console.log('GET_NOTES_URL', this.GET_NOTES_URL)
        await fetchutils.executeJsonFetch(this.GET_NOTES_URL, 'GET', this, null,notes =>{
            console.log(`Received notes`, notes)
            this.notes = notes
        })
        console.log(`Received notes:`, this.notes)
        if (this.params.queryParams.completionDateOrder === "newest"){
            this.notes.sort((note1, note2) => -note1.completionDate.localeCompare(note2.completionDate))
        } else if (this.params.queryParams.completionDateOrder === "oldest"){
            this.notes.sort((note1, note2) => note1.completionDate.localeCompare(note2.completionDate))
        }
        console.log(`Notes after sorting:`, this.notes)

        console.log("notes.length", this.notes.length)
    }

    getHtml() {
        let tableBody = ``
        for(let i = 0; i < this.notes.length; i++) {
            tableBody = tableBody.concat(`
<tr>
    <td>
    ${this.notes[i].title}
        </td>

    <td>${this.notes[i].completionDate}</td>
    <td>${this.notes[i].status}</td>

    <td>
        <a href="/edit_note/${this.notes[i].id}" data-link>edit</a>
        <a href="/delete_note/${this.notes[i].id}" data-link>delete</a>
    </td>
</tr>
            `)
        }

        return `
<form method="GET" id="sort_filter_notes_list_form" action="/"></form>

    <table class="table table-hover">
        <thead>
            <tr>    
                <th class="col-8">
                    Title
                </th>
                <th class="col-2">
                    <label>
                        Date
                        <br/>
                        <select name="completionDateOrder" form="sort_filter_notes_list_form">
                            <option value="not sorted">not sorted</option>
                            <option value="newest" ${this.params?.queryParams?.completionDateOrder === "newest" ? "selected: selected": ""}>newest</option>
                            <option value="oldest" ${this.params?.queryParams?.completionDateOrder === "oldest" ? "selected: selected": ""}>oldest</option>
                        </select>
                    </label>
                </th>
                <th class="col-2">
                    <label>
                        Status
                        <br/>
                        <select name="statusFilter" form="sort_filter_notes_list_form">
                            <option value="all">all</option>
                            <option value="to do" ${this.params?.queryParams?.statusFilter === "to do" ? "selected: selected": ""}>to do</option>
                            <option value="in progress" ${this.params?.queryParams?.statusFilter === "in progress" ? "selected: selected": ""}>in progress</option>
                            <option value="done" ${this.params?.queryParams?.statusFilter === "done" ? "selected: selected": ""}>done</option>
                        </select>
                    </label>
                </th>
                <th>
                    <input type="submit" value="Apply" form="sort_filter_notes_list_form"/>
                </th>
            </tr>
        </thead>
        <tbody>
            ${tableBody}
        </tbody>
    </table>
</form>
`
    }
    
    async configureDocument(document){
        const form = document.getElementById('sort_filter_notes_list_form');
        form.onsubmit = e => {
            e.preventDefault()
            const formData = new FormData(form)
            let queryParametersString = urlutils.formQueryString(Object.fromEntries(formData.entries()))
            this.params.router.navigateTo(form.action + queryParametersString)
        }
    }


}