import Router from "./router/Router.js";

let router = new Router()
// router.route()

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            console.log(e.target.action)
            if (e.target.href !== undefined){
                router.navigateTo(e.target.href);
            } else {
                console.log("no href to navigate to")
            }
        }
    });

    /* Document has loaded -  run the router! */
    router.route();
});

//We'll also want to run the router when the user navigates with the back and forward buttons.
window.addEventListener("popstate", router);
