# ApplyCustomCSS
Javascript function to apply CSS to the DOM by passing in selectors and properties.

# Usage:
Link the raw github file and then use the function in your code.
<br>
I use it for Tampermonkey.

#### Arguments
The method takes 2 required arguments and 3 optional arguments:

- selector [String] - CSS selector - eg: '#myDiv'
  * Whitespaces are auto-reduced (``.myClass     #myDiv`` will match ``.myClass #myDiv``)

- rules [CSS String, Object] - eg (either is acceptable):
  - { border: "solid 3px green", color: "white" } - must put all properties in quotations
  - 'border: solid 3px green; color: white'

- sheet (Optional) [String, StyleSheet]
  - If empty, all stylesheets will be checked to edit the rule.
  - 'myStyles.css' - A relative or absolute URL to sheet.
  - document.styleSheets[1] - A reference to a sheet.

- verbose (Optional) [Boolean]
  - Print stuff to console, useful for debugging.

- addElementInstead (Optional) [Boolean]
  - If set to true, the function will append a stylesheet element to the html body, instead of changing the document.styleSheets.

Examples:

```js
adjustCSSRules('#myDiv', { width: '50%', height: '200px' }); // all stylesheets
adjustCSSRules('#myDiv', 'width: 30px; color: blue', {sheets: 'style.css'}); // style.css only  
adjustCSSRules('#myDiv  .myClass', 'width: 30px', {sheets: document.styleSheets[0]}); // Apply to both '#myDiv' and '.myClass' and only first stylesheet
adjustCSSRules('#myDiv  .myClass', 'width: 30px', {sheets: document.styleSheets[0], verbose: true, addElementInstead: true}); // All options at once, but the addElementInstead will override the css file input
```
