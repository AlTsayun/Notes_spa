export function urlToRegex(path) {
    return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")
}

export function parseParams(templateUrl, actualUrl) {
    const values = actualUrl.match(urlToRegex(templateUrl)).slice(1)
    const keys = Array.from(templateUrl.matchAll(/:(\w+)/g)).map(result => result[1])
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]]
    }))
}

export function formParamsUrl(templateUrl, params){
    return templateUrl.replace(/:(\w+)/g, (key)=>{
        return params[key.substr(1, key.length)]
    })
}

export function parseQuery(queryString) {
    let query = {}
    let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&')
    for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i].split('=')
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
    }
    return query
}

export function formQueryString(params){
    let qs = ""

    for(let key in params) {
        qs += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&"
    }
    if (qs.length > 0){
        //chop off last "&" and add ? to beginning
        qs = "?" + qs.substring(0, qs.length-1)
    }
    return qs
}