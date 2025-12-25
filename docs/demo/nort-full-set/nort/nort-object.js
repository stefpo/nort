/*!
 * NORT web UI component library
 * Copyright(c) 2019 Stephane Potelle 
 * MIT Licensed
*/

/*!
 * $modulename
 * Copyright(c) 2019 Stephane Potelle 
 * MIT Licensed
*/

export function merge(destObject, sourceObject, createProperties, intersect) {
    // Merges sourceObject into destObject by setting individual properties.
    // If createProperties is true, all new properties will be created.
    // If intersect is true, only common properties will be retained after the merge.
    if (typeof(sourceObject)=='object') {
        for (const k of Object.keys(sourceObject)) {
            let d=destObject[k];
            if (d != undefined || createProperties) {
                let s=sourceObject[k];

                if (typeof(d)==typeof(s) || d ==undefined ) {
                    if (Array.isArray(sourceObject[k])) {
                        d=[];
                        for (let i=0; i<s.length; i++) d.push(s[i]);
                        destObject[k]=d;
                    } else {
                        destObject[k]=s;
                    }
                } 
            }
        }
        if (intersect) intersect(destObject, sourceObject) 
        return true;
    } else {
        return false;
    }
}

export function intersect(destObject, sourceObject) {
    // Removes all properties of destObject that are not part of sourceObject
    for (const k of Object.keys(destObject)) {
        if ( sourceObject[k] === undefined ) {
            delete destObject[k]
        }
    }
}

export function clone(sourceObject) {
    // Returns a deep copy of an object. 
    n = {};
    Object.setPrototypeOf(n,Object.getPrototypeOf(sourceObject));
    merge(n,sourceObject,true);
    return n;
}




