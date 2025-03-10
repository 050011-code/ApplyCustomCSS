//Usage: adjustCSSRules('#myDiv', 'width: 300px !important', "folder/file.css");     "folder/file.css" path is optional
export function adjustCSSRules(selector, props, sheets, verbose = false){
    try {
        // get stylesheet(s)
        if (!sheets) sheets = [...document.styleSheets];
            
        else if (sheets.sup){// sheets is a string
            let absoluteURL = new URL(sheets, document.baseURI).href;
            sheets = [...document.styleSheets].filter(i => i.href == absoluteURL);
        }
        else sheets = [sheets]; // sheets is a stylesheet
        if (verbose) console.log(sheets);


        // CSS (& HTML) reduce spaces in selector to one.
        selector = selector.replace(/\s+/g, ' ');
        const findRule = s => [...s.cssRules].reverse().find(i => i.selectorText == selector)
        if (verbose) console.log(findRule);
        let rule = sheets.map(findRule).filter(i=>i).pop()
        if (verbose) console.log(rule);

        const propsArr = props.sup
        ? props.split(/\s*;\s*/).map(i => i.split(/\s*:\s*/)) // from string
        : Object.entries(props);// from Object

        if (rule) {
            for (let [prop, val] of propsArr){
                // rule.style[prop] = val; is against the spec, and does not support !important.
                //rule.style.setProperty(prop, ...val.split(/ *!(?=important)/));   ahh was erroring out and mesing up my other functions
                rule.style.setProperty(prop, val);
            }

        } else {
            var sheet = sheets.pop();
            if (!props.sup) props = propsArr.reduce((str, [k, v]) => `${str}; ${k}: ${v}`, '');
            sheet.insertRule(` ${selector} { ${props} }`, sheet.cssRules.length);
        }
    }
    catch (err) {
        console.log(err);
        console.log("From above error, defaulting to attaching stylesheet html tag");

        var cssStyle = "";

        if (document.getElementById("ApplyCustomCSSstylesheet")) {
            cssStyle = `${selector} {
            ${props}
            }`;

            document.getElementById("ApplyCustomCSSstylesheet").textContent += cssStyle;

        } else {
            var styleSheet = document.createElement("style");

            cssStyle = `${selector} {
            ${props}
            }`;

            styleSheet.textContent = cssStyle;

            document.body.appendChild(styleSheet);
            styleSheet.setAttribute("id","ApplyCustomCSSstylesheet")
        }
    }
}
