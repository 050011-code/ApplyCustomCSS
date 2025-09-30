# ApplyCustomCSS
Javascript function to apply CSS to the DOM by passing in selector and properties.

## Usage:
Link to the raw github file and then use the function in your code.

#### Arguments
The method takes 2 required arguments and 3 optional arguments:

- selector [String] - CSS selector - eg: '#myDiv'
  * Whitespaces are auto-reduced (``.myClass     #myDiv`` will match ``.myClass #myDiv``)

- rules [CSS String, Object] - eg (either is acceptable):
  - { border: "solid 3px green", color: "white" } - must put all properties in quotations
  - 'border: solid 3px green; color: white'

- sheet (Optional) [String, StyleSheet]
  - if empty, all stylesheets will be checked
  - 'myStyles.css' A relative or absolute URL to sheet
  - document.styleSheets[1] - A reference to a sheet

- verbose (Optional) [Boolean]
  - Print stuff to console, useful for debugging

- addElementInstead (Optional) [Boolean]
  - if set to true, the function will create a stylesheet element in the html body to add the elements to, instead of changing the document.styleSheets

Examples:

```js
adjustCSSRules('#myDiv', { width: '50%', height: '200px' }); // all stylesheets
adjustCSSRules('#myDiv', 'width: 30px; color: blue', {sheets: 'style.css'}); // style.css only  
adjustCSSRules('#myDiv  .myClass', 'width: 30px', {sheets: document.styleSheets[0]}); // Apply to both '#myDiv' and '.myClass' and only first stylesheet
adjustCSSRules('#myDiv  .myClass', 'width: 30px', {sheets: document.styleSheets[0], verbose: true, addElementInstead: true}); // All options at once, but the addElementInstead will override the css file input
```
