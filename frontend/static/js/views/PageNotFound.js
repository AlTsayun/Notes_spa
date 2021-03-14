import AbstractView from "./AbstractView.js";
import * as urlutils from "../urlutils/urlutils.js"
export default class extends AbstractView {

    constructor(params) {
        super(params);
        this.setTitle("Error 404!");
    }


    async getHtml() {
        return `
Error 404! <br\>
Page not found
`
    }

    async configureDocument(document, router){}


}