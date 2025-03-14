function adjustCSSRules(selector, props, { sheets = '', verbose = false, addElementInstead = false } = {}){
    if (verbose) {console.log("\n"); console.log("%c--- adjustCSSRules executing in verbose mode! ---", "color: rgb(226, 254, 104);");}

    if (verbose) {console.log("Selector: "); console.log("%c\t" + selector, "color:rgb(105, 200, 255);");}
    if (verbose) {
        console.log("Property(s): "); 
        if (typeof props == "string") {
            console.log("%c\t" + props, "color: #68cdfe;");
        }
        else {
            console.log(props); 
        }
    }


    if (addElementInstead) { //optional element instead    
        var cssStyle = "";

        const propsArr = props.sup
        ? props.split(/\s*;\s*/).map(i => i.split(/\s*:\s*/)) // from string
        : Object.entries(props);// from Object
    
        if (document.getElementById("ApplyCustomCSSstylesheet")) {
            cssStyle = `${selector} { `;
            for (let [prop, val] of propsArr){
                cssStyle += `${prop}: ${val}; `;
            }
            cssStyle += `}\n`;
    
            document.getElementById("ApplyCustomCSSstylesheet").textContent += cssStyle;
            if (verbose) {console.log("%cAdded stylesheet via element ✓", "color:rgb(46, 255, 115)");}
    
        } else {
            var styleSheet = document.createElement("style");
    
            cssStyle = `${selector} { `;
            for (let [prop, val] of propsArr){
                cssStyle += `${prop}: ${val}; `;
            }
            cssStyle += `}\n`;
    
            styleSheet.textContent = cssStyle;
    
            document.body.appendChild(styleSheet);
            styleSheet.setAttribute("id","ApplyCustomCSSstylesheet");

            if (verbose) {console.log("%cAdded stylesheet via element ✓", "color:rgb(46, 255, 115)");}
        }



    } else { //Main function

        // get stylesheet(s)
        if (!sheets) sheets = [...document.styleSheets];

        else if (sheets.sup){// sheets is a string
            let absoluteURL = new URL(sheets, document.baseURI).href;
            sheets = [...document.styleSheets].filter(i => i.href == absoluteURL);
        }
        else sheets = [sheets]; // sheets is a stylesheet
        if (verbose) {console.log("Sheets: "); console.log(sheets);}


        // CSS (& HTML) reduce spaces in selector to one.
        selector = selector.replace(/\s+/g, ' ');
        const findRule = s => {
            try {
                [...s.cssRules].reverse().find(i => i.selectorText == selector);
            }
            catch ({ name, message }) {

                if (verbose) {
                    //Want to catch "SecurityError"
                    //Want to catch "CSSStyleSheet.cssRules getter: Not allowed to access cross-origin stylesheet"
                    if (name == "SecurityError") {
                        console.log("Cross Origin: Javascript not allowed to access sheet: " + s.href);
                    } else {
                        console.log(name);
                        console.log(message);
                    }
                }
            }
        }

        let rule = sheets.map(findRule).filter(i=>i).pop()
        if (verbose) {
            if (rule) {
                console.log("Selector search result: " + rule);
            } else {
                console.log("Selector doesn't exist in any readable stylesheet, adding to the end of last stylesheet");
            }
        }

        const propsArr = props.sup
        ? props.split(/\s*;\s*/).map(i => i.split(/\s*:\s*/)) // from string
        : Object.entries(props);// from Object

        if (rule) {
            for (let [prop, val] of propsArr){
                // rule.style[prop] = val; is against the spec, and does not support !important.
                rule.style.setProperty(prop, ...val.split(/ *!(?=important)/));   // was erroring out and messing up my other functions supposedly
                //rule.style.setProperty(prop, val);                     //and this is the fix
                
                if (verbose) {console.log("%cAdded property(s) to existing stylesheet ✓", "color:rgb(46, 255, 115)");}
            }

        } else {
            var sheet = sheets.pop();
            if (!props.sup) props = propsArr.reduce((str, [k, v]) => `${str}; ${k}: ${v}`, '');
            sheet.insertRule(` ${selector} { ${props} }`, sheet.cssRules.length);
            if (verbose) {console.log("%cAdded new property(s) to stylesheet ✓", "color:rgb(46, 255, 115)");}
        }
    }
};
