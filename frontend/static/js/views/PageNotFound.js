import AbstractView from "./AbstractView.js"
import * as urlutils from "../urlutils/urlutils.js"
export default class extends AbstractView {

    constructor(params) {
        super(params)
        this.title = "Error 404!"
    }


    getHtml() {
        return `
Error 404! <br\>
Page  ${this.params.queryParams.notFoundUrl === undefined ? "": this.params.queryParams.notFoundUrl} not found
`
    }

}