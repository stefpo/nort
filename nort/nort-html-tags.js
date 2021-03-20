/*!
 * NORT web UI component library
 * Copyright(c) 2019-2020 Stephane Potelle 
 * MIT Licensed
*/

tags = [
    "a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", 
    "base", "basefont", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", 
    "caption", "center", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", 
    "dfn", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", 
    "figure", "font", "footer", "form", "frame", "frameset", "head", "header", "hgroup", 
    "h1", "h2", "h3", "h4", "h5", "h6", "hr", "html", "i", "iframe", "img", 
    "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "map", "mark", 
    "menuitem", "menu", "meta", "meter", "nav", "noframes", "noscript", "object", 
    "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", 
    "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", 
    "source", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", 
    "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", 
    "tt", "u", "ul", "var", "video", "wbr", ]

    for ( let v of tags ) {
        //let s = "window['$" + v + "'] = function() {return nort.createElement(\""+ v + "\", { \"nort-element\" : \"" + v + "\"}, arguments) }\n"
        //eval (s)
        let tn = v
        window["$" + tn ] = function(...args) { return nort.createElement(tn, { "nort-element" : tn }, args) }
    }

    function $htmldiv(attributes, html) {
        let div = $div(attributes)
        div.innerHTML = html
        return div
    }

    function $htmlp(attributes, html) {
        let div = $p(attributes)
        div.innerHTML = html
        return div
    }

