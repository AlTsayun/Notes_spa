import AbstractView from "./AbstractView.js";
import * as urlutils from "../urlutils/urlutils.js"
export default class extends AbstractView {

    constructor(params) {
        super(params);
        this.setTitle("Notesboard");
    }


    async getHtml() {

        // let tbody = ``
        // for(var i = 0; i < this.params?.notes.length; i++) {
        //
        // }
        // `<tr class="main_list_item">
        //     <td>
        //     <%= notes[i].title %>
        //         </td>
        //
        //     <td><%= notes[i].completionDate %></td>
        //     <td><%= notes[i].status %></td>
        //
        //     <td>
        //         <a href="/edit_note/<%= notes[i].id %>">edit</a>
        //         <form action="/delete_note/<%= notes[i].id %>" method="POST">
        //             <a href="#" onclick="this.parentNode.submit()">delete</a>
        //         </form>
        //     </td>
        // </tr>`


        return `
<form method="GET" id="sort_edit_notes_list_form" action="/"></form>

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
                        <select name="completionDateOrder" form="sort_edit_notes_list_form">
                            <option value="not sorted">not sorted</option>
                            <option value="newest" ${this.params?.query?.completionDateOrder === "newest" ? "selected: selected": ""}>newest</option>
                            <option value="oldest" ${this.params?.query?.completionDateOrder === "oldest" ? "selected: selected": ""}>oldest</option>
                        </select>
                    </label>
                </th>
                <th>
                    <label>
                        Status
                        <br/>
                        <select name="statusFilter" form="sort_edit_notes_list_form">
                            <option value="all">all</option>
                            <option value="to do" ${this.params?.query?.statusFilter === "to do" ? "selected: selected": ""}>to do</option>
                            <option value="in progress" ${this.params?.query?.statusFilter === "in progress" ? "selected: selected": ""}>in progress</option>
                            <option value="done" ${this.params?.query?.statusFilter === "done" ? "selected: selected": ""}>done</option>
                        </select>
                    </label>
                </th>
                <th>
                    <input type="submit" value="Apply" form="sort_edit_notes_list_form"/>
                </th>
        </tr>
                <tr class="main_list_item">
                <td>
                <%= notes[i].title %>
                    </td>
    
                <td><%= notes[i].completionDate %></td>
                <td><%= notes[i].status %></td>
    
                <td>
                    <a href="/edit_note/<%= notes[i].id %>">edit</a>
                    <form action="/delete_note" method="POST">
                        <a href="#" onclick="this.parentNode.submit()">delete</a>
                    </form>
                </td>
            </tr>
    
        </tbody>
    </table>

`
    }

    async configureDocument(document, router){
        const form = document.getElementById('sort_edit_notes_list_form');
        form.addEventListener("submit", e => {
            e.preventDefault()
            const formData = new FormData(document.querySelector('form'))

            let queryParametersString = urlutils.formQueryParametersString(Object.fromEntries(formData.entries()))
            router.navigateTo(form.action + queryParametersString)
        });
    }


}