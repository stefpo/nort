/*!
 * NORT web UI component library
 * Copyright(c) 2019-2020 Stephane Potelle 
 * MIT Licensed
*/

var debug = false

export function setDebugMode(v) { debug = v}

export function logDebug(source, e) {
    if (debug) {
        if ( typeof(e) == "string") {  console.log(source + ": " + e) }
        else { console.log(source + ": " + JSON.stringify(e,undefined, 4))}
    }
}

export function parseURL(urlStr) {
    let urlRE = /(http[s]?):[/]{2}((?:[a-z]|[A-Z]|[0-9]|[.]|[.-])*)[:]?(\d*)([/][^?]*)[?]?(.*)/
    let urlParts = urlRE.exec(urlStr)   
    if (urlParts != null ) {
        if (urlParts.port == '') urlParts.port = urlParts.protocol == 'https' ? 80 : 443
        return { protocol: urlParts[1], host: urlParts[2], port: urlParts[3], path: urlParts[4], queryString: urlParts[5], queryStringParts: urlParts[5].split('&')}
    }
    return null
}

export function request(method, url, options, callback) {
    let hr = new XMLHttpRequest() 
    let maxTime = options.timeout || 15
    let to

    hr.onreadystatechange = function(){
        switch (hr.readyState) {
            /*
            0: request not initialized
            1: server connection established
            2: request received
            3: processing request
            4: request finished and response is ready  */
            case 4: 
                clearTimeout(to)
                logDebug("request: complete", hr.status )
                logDebug("request: received", hr.responseText )
                callback(null,  { status: hr.status, data: hr.responseText})
        }
    }

    to = setTimeout(function() {
        hr.abort()
        logDebug("request", "timeout" )
        callback("ERR_TIMEOUT")
    }, maxTime*1000)

    hr.open(method, url, true)
    if (options.postData) {
        if (typeof(options.headers) == "object" ) {
            for (let k in options.headers) {
                hr.setRequestHeader(k, options.headers[k])
            }
        }
        logDebug("request: sending", options.postData )
        hr.send(options.postData)
    } else {
        hr.send()
    }
}


export function get(url, options, callback) {
    request("GET", url,  options, callback)
}

export function jsonRequest(method, url, options, callback) {
    if ( ! options ) options = {}
    if ( ! options.headers) options.headers={}
    options.headers["content-type"] = "application/json"
    if ( options.postData ) options.postData = JSON.stringify(options.postData)

    document.body.style.cursor = "progress"

    request(method, url, options, function(e, data) {
        if (e) callback(e)
        else {
            let em = undefined
            if ( data.status == 200 ) {
                try {
                    let jsdata = JSON.parse(data.data) 
                    data.data = jsdata
                } catch (e) {
                    em = "ERR_NOT_JSON_RESPONSE"
                }
            } else {
                em = data.status
            }
            document.body.style.cursor = "initial"
            callback(em, data)
        }
    }) 
}

export function requestAsync(method, url, options) {
    let prom = new Promise((resolve, reject) => {
        request(method, url, options, function(err, result) {
            if (err) reject(err) 
            else resolve(result)
        }
        )
    } )
    return prom 
}

export function getAsync(method, url, options) {
    let prom = new Promise((resolve, reject) => {
        get(method, url, options, function(err, result) {
            if (err) reject(err) 
            else resolve(result)
        }
        )
    } )
    return prom 
}

export function jsonRequestAsync(method, url, options) {
    let prom = new Promise((resolve, reject) => {
        jsonRequest(method, url, options, function(err, result) {
            if (err) reject(err) 
            else resolve(result)
        }
        )
    } )
    return prom 
}

