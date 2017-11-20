/**
 * @todo Add conditional document.currentScript polyfill for IE10+,
 * and workaround for IE11.
 */
(() => {
    class Cogizmo extends HTMLElement {
        constructor() {
            super();

            // Attach template up as early as possible
            const root = this.attachShadow({ mode: 'open' });
            const instance = this.constructor.template.content.cloneNode(true);
            root.appendChild(instance);
        }

        connectedCallback() {
            if ('function' === typeof super.connectedCallback)
                super.connectedCallback();
        }

        static get observedAttributes() {
            return [];
        }

        attributeChangedCallback(name, old, value) {
            if ('function' === typeof super.attributeChangedCallback)
                super.attributeChangedCallback(name, old, value);

            /** @todo Convert attribute names to Camel Case */
            if ('function' === typeof this[`on${name.charAt(0).toUpperCase()}${name.slice(1)}Changed`])
                this[`on${name.charAt(0).toUpperCase()}${name.slice(1)}Changed`](old, value);
        }

        disconnectedCallback() {
            if ('function' === typeof super.disconnectedCallback)
                super.disconnectedCallback();
        }

        static async manage() {
            if (!!!_PROPERTIES_.get(this))
                _PROPERTIES_.set(this, Object.create(null))

            _PROPERTIES_.get(this).script = document.currentScript;

            let a = await this.template;
            customElements.define(this.is, this);

        }

        static get script() {
            return _PROPERTIES_.get(this).script;
        }

        static get path() {
            let url = _PROPERTIES_.get(this).path;
            if (!!!url) {
                let a = document.createElement('a'),
                    href = _PROPERTIES_.get(this).script.src + '/../';
                a.href = href;
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

        static get template() {
            if (!!!_PROPERTIES_.get(this).template)
                _PROPERTIES_.get(this).template = getTemplate.call(this);
            return _PROPERTIES_.get(this).template
        }
    }
    const _PROPERTIES_ = new WeakMap();
    _PROPERTIES_.set(Cogizmo, Object.create(null));
    _PROPERTIES_.get(Cogizmo).scripts = new WeakMap();
    window.Cogizmo = Cogizmo;

    async function getTemplate() {
        let response = await fetch(`${this.path}template.html`);
        let txt = await response.text();

        let html =  new DOMParser().parseFromString(txt, 'text/html');
        console.log('Imported HTML: ', html);
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

}) ();
