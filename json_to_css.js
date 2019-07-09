const isCamelCase = (s) => {
    let uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < s.length; i++) {
        let e = s[i]
        if (uppers.includes(e)) {
            return true
        }
    }
    return false
}

const camelCaseToHyphen = (s) => {
    if (isCamelCase(s)) {
        let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let index = 0
        for (let i = 0; i < s.length; i++) {
            let char = s[i]
            if (upper.includes(char)) {
                index = i
                break
            }
        }
        let s1 = s.slice(0, index)
        let s2 = s.slice(index)
        return s1 + '-' + s2.toLowerCase()
    } else {
        return s
    }
}

const parsedDeclarations = (object) => {
    let s = Object.defineProperties(object).map(([k, v]) => {
        let property = camelCaseToHyphen(k)
        return `${property}: ${v}`
    }).join(';\n    ')
    let r = `{
        ${s};
    }`
    return r
}

const jsonToCSS = (s) => {
    let o = JSON.parse(s)
    let entries = Object.entries(o)
    let set = []
    for (let i = 0; i < entries.length; i++) {
        let [k, v] = entries[i]
        let declarations = parsedDeclarations(v)
        let rule = `${k} ${declarations}`
        set.push(rule)        
    }
    let css = set.join('\n\n')
    return css
}

module.exports = jsonToCSS