# ApplyCustomCSS
Javascript function to apply CSS to the DOM by passing in selector and properties

### Usage:
Link to the raw github file and then use the function in your code.

#### Arguments
The method takes three arguments:

- selector [String] - CSS selector - eg: '#myDiv'
  * Whitespaces are auto-reduced (``.myClass     #myDiv`` will match ``.myClass #myDiv``)

- rules [CSS String, Object] - eg (either is acceptable):
  - { border: "solid 3px green", color: "white" }
  - 'border: solid 3px green; color: white'

- sheet (Optional) [String, StyleSheet]
  - if empty, all stylesheets will be checked
  - 'myStyles.css' A relative or absolute URL to sheet
  - document.styleSheets[1] - A reference to a sheet

- verbose (Optional) [Boolean]
  - Print processes to console, useful for debugging

Examples:

```js
adjustCSSRules('#myDiv', {width: '30px'}); // all stylesheets
adjustCSSRules('#myDiv', 'width: 30px', {sheets = 'style.css'}); // style.css only  
adjustCSSRules('#myDiv  .myClass', 'width: 30px', {sheets = document.styleSheets[0]}); // Apply to both '#myDiv' and '.myClass' and only first stylesheet
adjustCSSRules('#myDiv  .myClass', 'width: 30px', {sheets = document.styleSheets[0], verbose = true}); // All options at once
```
