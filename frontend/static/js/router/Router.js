import * as urlutils from "../urlutils/urlutils.js";
import Notesboard from "../views/Notesboard.js";
import CreateNote from "../views/CreateNote.js";
import EditNote from "../views/EditNote.js";
import PageNotFound from "../views/PageNotFound.js";

export default class {

    routes
    constructor(routes = [
        {path: "/", view: Notesboard},
        {path: "/create_note", view: CreateNote},
        {path: "/edit_note/:id", view: EditNote},
        {path: "/about"},
        {path: "/404", view: PageNotFound},
    ]) {
        this.routes = routes
    }


    async route() {

        const potentialMatches = this.routes.map(route => {
            return {
                route: route,
                result: location.pathname.match(urlutils.urlToRegex(route.path))
            };
        });

        console.log(potentialMatches)

        let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

        /* Route not found - return first route OR a specific "not-found" route */
        if (!match) {
            match = {
                route: this.routes.find( (element, index, array) =>{
                    return element.path === "/404"
                }),
                result: [location.pathname]
            };
        }

        let view = new match.route.view({
            url: location.pathname,
            urlParams: urlutils.parseParams(match.route.path, location.pathname),
            query: urlutils.parseQuery(location.search)
        })

        if (view !== undefined) {

            document.querySelector("#app").innerHTML = await view.getHtml()
            await view.configureDocument(document, this)

        } else {
            document.querySelector("#app").innerHTML = "page not found!"
        }
    }

    navigateTo(url) {
        console.log(url)
        history.pushState(null, null, url);
        this.route();
    };
}