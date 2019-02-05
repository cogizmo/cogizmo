/**
 * @todo Add conditional document.currentScript polyfill for IE10+,
 * and workaround for IE11.
 */
(() => {
    const _PROPERTIES_ = new WeakMap();
    const _TEMPLATE_ = new DOMParser().parseFromString('<template><slot></slot></template>', 'text/html').querySelector('template');
    class Cogizmo extends HTMLElement {
        constructor() {
            super();

        // Attach HTML Template as soon as possible
            const root = this.attachShadow({ mode: 'open' });
            const instance = this.constructor.template.content.cloneNode(true);
            root.appendChild(instance);
        }

        connectedCallback() {
        // Feature Check
            if ('function' === typeof super.connectedCallback)
                super.connectedCallback();
        }

        static get observedAttributes() {
        // Future proof inheritance
            return [];
        }

        attributeChangedCallback(name, old, value) {
        // Feature Check and follow convention
            if ('function' === typeof super.attributeChangedCallback)
                super.attributeChangedCallback(name, old, value);

            /** @todo Convert attribute names to Camel Case */
            if ('function' === typeof this[`on${name.charAt(0).toUpperCase()}${name.slice(1)}Changed`])
                this[`on${name.charAt(0).toUpperCase()}${name.slice(1)}Changed`](value, old);
        }

        disconnectedCallback() {
        // Feature Check and follow convention
            if ('function' === typeof super.disconnectedCallback)
                super.disconnectedCallback();
        }

        /**
         * Tells Cogizmo SuperClass to collect resources and register the
         * Custom Element with the browser.
         */
        static async manage() {
            if (!!!_PROPERTIES_.get(this))
                _PROPERTIES_.set(this, Object.create(null))

            let script = _PROPERTIES_.get(this).script = document.currentScript;

            await this.template;

            let tag = this.is;
            if (script.hasAttribute('tagname'))
                tag = script.getAttribute('tagname') || tag;

            customElements.define(tag, this);
        }

        /**
         * Retrieves a safe reference to the <script> element that loaded
         * the Custom Element.
         */
        static get script() {
            return _PROPERTIES_.get(this).script;
        }

        /**
         * Root URL of the Custom Element. May be used to load external assets
         * and dependencies.
         */
        static get path() {
            let url = _PROPERTIES_.get(this).path;
            if (!!!url) {
            // Reverse-Engineer the path from the <script> element.
                let a = document.createElement('a'),
                    href = _PROPERTIES_.get(this).script.src + '/../';
                a.href = href;
            // Store path locally to avoid external tampering
                url = _PROPERTIES_.get(this).path = a.href;

                /** @todo Insecure. Used for electron compatibility.
                 *  Add support for custom protocols.
                 */
                // Support Electron file: protocol
                if ('file:' === a.protocol
                &&  'function' === typeof require
                &&  'object' === typeof require('electron')) {
                    let {webFrame} = require('electron');
                    webFrame.registerURLSchemeAsPrivileged('file');
                }
            }
            return url;
        }

        /**
         * Returns the imported <template> used by the Custom Element.
         */
        static get template() {
            if (!!!_PROPERTIES_.get(this).template)
                _PROPERTIES_.get(this).template = getTemplate.call(this);
            return _PROPERTIES_.get(this).template
        }
    }
    Object.defineProperties(Cogizmo, {
        'manage': { writable: false }
    });

    _PROPERTIES_.set(Cogizmo, Object.create(null));
    _PROPERTIES_.get(Cogizmo).script = document.currentScript;
    _PROPERTIES_.get(Cogizmo).scripts = new WeakMap();
    _PROPERTIES_.get(Cogizmo).template = _TEMPLATE_;
    window.Cogizmo = Cogizmo;

    Cogizmo.script.dispatchEvent(new CustomEvent('cogizmo-ready', {
        bubbles: true,
        cancelable: false,
        detail: Cogizmo
    }));

    async function getTemplate() {
        let response = await fetch(`${this.path}template.html`);
        let txt = await response.text();

        let html =  new DOMParser().parseFromString(txt, 'text/html');
        let scripts = html.querySelectorAll('head > script');
        Array.prototype.forEach.call(scripts, (script) => {
            script.src = `${this.path}${script.getAttribute('src')}`
            let imported = document.importNode(script, true);
            document.head.appendChild(imported);
        });

        let tpl = _PROPERTIES_.get(this).template = html.querySelector('head > template');

        // Support external stylesheets in templates
        let link = tpl.content.querySelector('link');
        if (link)
            link.href = `${this.path}${link.getAttribute('href')}`;
        return tpl;
    }

    Object.defineProperties(Cogizmo, {
        'manage': { writable: false }
    });
}) ();
