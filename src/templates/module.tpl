`import Cogizmo from '../cogizmo/Cogizmo.mjs';

const _PRIVATE_ = new WeakMap();
class ${ClassName} extends Cogizmo {
    static get is() {   return '${name}';   }

/* Lifecycle Callbacks  - - - - - - - - - - - - - - - - - - - - - - - - - */
    constructor() {
        super();
        _PRIVATE_.set(this, Object.create(null));

    // --- initialization code below ---
    }

    connectedCallback() {
        super.connectedCallback();

    // --- attachment code below ---

    }

    disconnectedCallback() {

    // --- detachment code above ---
        super.disconnectedCallback();
    }

/* Element Attributes - - - - - - - - - - - - - - - - - - - - - - - - - - */
    static get observedAttributes() {
        // List attributes here.
        let attrs = []

        // Get superclasses observed attributes
        let a = [];
        if (!!super.observedAttributes
        &&  super.observedAttributes instanceof Array)
            a = super.observedAttributes;
        // Merge arrays without duplicates
        return a.concat(attrs.filter(item => { a.indexOf(item) < 0 }));

    }

    attributeChangedCallback(name, old, value) {
    // Maintain native behavior and (if applicable) enhancements
        if ("function" === typeof super.attributeChangedCallback)
            super.attributeChangedCallback(name, old, value);

    }

/* Public Methods (below) - - - - - - - - - - - - - - - - - - - - - - - - */
}

_PRIVATE_.set(${ClassName}, Object.create(null));
if ("function"=== typeof ${ClassName}.manage)
    ${ClassName}.manage();
else customElements.define(${ClassName}, ${name})

/* ----------------------------- STATIC PRIVATE ----------------------------- */

/* ---------------------------- PRIVATE METHODS ----------------------------- */
