# Cogizmo
Cogizmo is a convenience SuperClass for vanilla `<custom-elements>` (Web Component). This is primarily used to load external `<template>`, stylesheets and other assets so that your `<custom-element>` does not have to know the server filesystem architecture.

## Usage

1. Make a Custom Element class that extends Component

    ***MyComponent.js***
    ```
    class MyComponent extends Cogizmo {
        // Component implementation details
    }
    ```

2. Start the resource linking and component registration

    ***MyComponent.js***
    ```
    MyComponent.manage();
    ```

### Installation
Installation is very simple. Just place the required files in a web accessible directory.

1. Install Cogizmo to a web accessible directory.
2. Add Cogizmo to your document's `<head>` element.

    1. If you are using the module form (preferred), use:
        ```
        <script src="path/to/Cogizmo.mjs" type="module"></script>
        ```
    2. If you are using the non-module form, use:
        ```
        <script src="path/to/Cogizmo.js"></script>
        ```
3. If using webcomponents polyfill, Cogizmo script must come after the polyfill.

### For Compatibility
Some browsers do not have the complete WebComponents spec implemented. As a result, some browsers may require the webcomponents polyfills. Webcomponents polyfill is a smart polyfill that only includes features that are not yet implemented.

1. Add `<script src="path/to/webcomponents.js"></script>` to document `<head>`

## Features

### External Templates
Using an external template file is as simple as placing a template.html file in your web component's root path. When `MyComponent.manage()` is called, it will automatically load the template and attach it to your class for attachment at construction time. *You did remember to call `super()`, didn't you?*

***template.html***
```
<template>
    <!-- Template details -->
</template>
```

### External Stylesheet
External Stylesheets may be used by placing a `<link>` in your `<template>`. `MyComponent.manage()` auto-inspects the `<template>` and attaches the CSS to your class' internal template property.

***template.html***
```
<template>
    <link rel="stylesheet" href="path/to/stylesheet.css">
    <!-- Template details -->
</template>
```

### Customizable `<element-name>`
Unforunately, the web component spec does not allow for multiple instances of the same `ComponentClass` to use the same `<element-name>`. This can be a problem as web components gain wider adoption. Future custom elements may extend, consume or otherwise depend upon earlier elements and version compatibility may become an issue if these code consumers rely on different versions of the same control. Cogizmo allows preemptive renaming of elements by use of a `tagname` custom attribute.

*This requires no changes or conformance to your custom element's code.*

***application.html***
```
<html>
<head>
    <script src="path/to/webcomponents-loader.js"></script>
    <script src="path/to/Cogizmo.js"></script>

    <script src="path/to/MyComponent.js" tagname="a-b-c"></script>
</head>
<body>
    <!-- Will render and work correctly. -->
    <a-b-c></a-b-c>

    <!-- Will no longer work. -->
    <my-component></my-component>
</body>
</html>
```

### Custom Element Registration
Automatically calls `customElements.define()` for your `<custom-element>` utilizing the `MyComponent.is` property.

## Web Component Compatibility

Cogizmo can be loaded as a module or non-module with ease. Module form is the preferred method. However, some browsers have not fully implemented ES Modules. Additionally, many custom elements may be written without the ability to digest modules. As a result, Cogizmo has a number of loading options to allow the greatest compatibility, forward and backward.

### Browser Fallback Support

If you must support several browsing environments, it is typically better to add both the module and non-module form to your document.

```
<script src="path/to/Cogizmo.mjs" type="module"></script>
<script src="path/to/Cogizmo.js" nomodule></script>
```

This allows module enabled browsers to ignore the non-module, while out of date browsers will automatically ignore the module.

### Supporting Non-module Custom Elements with Cogizmo Module

Even if very few or none of your custom elements are ES Modules, you can still use Cogizmo as a module. When loaded, Cogizmo looks for the `use-global` attribute on its script tag. This method does not conflict with fallback support.

```
<script src="path/to/Cogizmo.mjs" type="module" use-global></script>
<!-- Can still access Cogizmo from window/global object. -->
<script src="path/to/MyComponent.js"></script>
```

