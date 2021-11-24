# StandardUI

[![testing-cypress](https://github.com/standardui/ui/actions/workflows/test.yml/badge.svg)](https://github.com/standardui/ui/actions/workflows/test.yml)


## Intro

StandardUI is a set of reusable framework-agnostic web components.  This means it doesn't matter if you use React/Angular/Vue/Svelte/HotNewThing or no framework at all, you should be able to use these components to standardise your UI and remove the need to always re-invent the wheel in each framework.

Because the web and things we can do with it is so vast this packages goal is to offer the most commonly used patterns, think things like accordians, inputs, etc.

There is much work to be done! we welcome any pull requests.

## Standalone usage

An example of how you can use this package standalone can be seen in this projects index.html, firstly a script tag with type module to import main.js

````html
<script type='module'>
  import registerUi from './src/main.js';

  /* this registers all components into the 'testing' namespace, ie:
    <testing-integer-input></testing-integer-input>
    use whatever namespace you would like for your brand.
  */
  registerUi('testing');
</script>
````

TODO: Later we will add a method to register only desired components, see readme update at that time for details.

Note: This approach is supported on all modern browsers except some mobile ones https://caniuse.com/es6-module - you may have to decide if this is acceptable to your project.

## Usage with frameworks

Within a bundled project you should be able to use the files as you would expect, just register the desired (or all) components using either `registerUi` or `registerComponents` at the earliest opportunity, for example in `App.js` or wherever your application is bootstrapped, you could also include the script in the standalone style above too.
