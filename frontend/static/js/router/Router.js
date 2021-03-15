import * as urlutils from "../urlutils/urlutils.js";
import Notesboard from "../views/Notesboard.js";
import CreateNote from "../views/CreateNote.js";
import EditNote from "../views/EditNote.js";
import PageNotFound from "../views/PageNotFound.js";
import DeleteNote from "../views/DeleteNote.js";

export default class {

    routes
    constructor(routes = [
        {path: "/", view: Notesboard},
        {path: "/create_note", view: CreateNote},
        {path: "/edit_note/:id", view: EditNote},
        {path: "/delete_note/:id", view: DeleteNote},
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

        console.log(`Potential matches:`, potentialMatches)

        let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
        console.log(`Selected match:`, match)


        /* Route not found - return first route OR a specific "not-found" route */
        if (!match) {
            console.log(`No match found`)
            this.navigateTo(`/404${urlutils.formQueryString({notFoundUrl: location.pathname})}`)
        }


        if (match.route.view !== undefined) {
            let view = new match.route.view({
                url: location.pathname,
                urlParams: urlutils.parseParams(match.route.path, location.pathname),
                queryParams: urlutils.parseQuery(location.search),
                router: this
            })

            await view.configureView(this)
            console.log(`View is configured`, view)

            if (view.redirectUrl !== null){
                this.navigateTo(view.redirectUrl)
            } else {

                document.title = await view.getTitle()

                document.querySelector("#app").innerHTML = view.getHtml()

                await view.configureDocument(document, this)
            }

        } else {
            console.log(`View for`, match.route.path, `is not defined!`)
            document.querySelector("#app").innerHTML = ""
        }
    }

    navigateTo(url) {
        console.log(`Navigating to`, url)
        history.pushState(null, null, url);
        this.route();
    };
}