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
        await fetchutils.executeJsonFetch(this.GET_NOTES_URL, 'GET', this,notes =>{
            console.log(`Received notes`, notes)
            this.notes = notes
        })
        console.log(`Received notes:`, this.notes)
        console.log("notes.length", this.notes.length)
    }

    getHtml() {
        let tableBody = ``
        for(let i = 0; i < this.notes.length; i++) {
            tableBody = tableBody.concat(`
<tr class="main_list_item">
    <td>
    ${this.notes[i].title}
        </td>

    <td>${this.notes[i].completionDate}</td>
    <td>${this.notes[i].status}</td>

    <td>
        <a href="/edit_note/${i}" data-link>edit</a>
        <a href="/delete_note/${i}" data-link>delete</a>
    </td>
</tr>
            `)
        }

        return `
<form method="GET" id="sort_filter_notes_list_form" action="/"></form>

    <table>
        <colgroup>
            <col span="1" class="main_list_title_column">
            <col span="1" class="main_list_date_column">
            <col span="1" class="main_list_status_column">
            <col span="1">
        </colgroup>
    
        <tbody>
            <tr>    
                    <th>
                        Title
                    </th>
                    <th>
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
                    <th>
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