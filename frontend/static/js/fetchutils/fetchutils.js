import * as urlutils from "../urlutils/urlutils.js"

export async function executeJsonFetch(url, fetchMethod, view, dataHandler, errorHandler = (e) => {throw e}){
    await fetch(url, { method: fetchMethod })
        .then((response) => {
            console.log(url, `(${fetchMethod}) responded with status`, response.status)

            if (!response.ok){
                throw new Error("bad response")
            } else {
                return response.json()
            }
        })
        .then(dataHandler)
        .catch(errorHandler)
        .catch(e =>{
            console.log("catch")
            if (e.message === "bad response"){
                view.redirectUrl =  '/404' + urlutils.formQueryString({notFoundUrl: view.params.url})
            } else {
                throw e
            }
        })
}