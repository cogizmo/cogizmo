let sDone = `
    let done = arguments[arguments.length - 1];
`,
    sCogizmo = `
    import(\'../Cogizmo.mjs\')
        .then(module => {
            document.dispatchEvent(new CustomEvent('cogizmo-ready', {
                bubbles: true,
                composed: true,
                cancelable: false,
                detail: module
            }));
        });
`;

describe('Cogizmo (script):', function() {

    before(function(client, done) {
        done();
    });

    after(function(client, done) {
        client.end(function() {
            done();
        });
    });

    afterEach(function(client, done) {
        done();
    });

    beforeEach(function(client, done) {
        client.url(client.launch_url)
            .waitForElementPresent('body');
        done();
    });

    it('fires cogizmo-ready', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function(ev) {
                let Cogizmo = ev.detail;
                done(true);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('is in the global scope', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function(ev) {
                let Cogizmo = ev.detail;
                done(!!Cogizmo);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('is a function', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function(ev) {
                let Cogizmo = ev.detail;
                done("function" === typeof Cogizmo);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('is a class', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function(ev) {
                let Cogizmo = ev.detail;
                done(Cogizmo.name === Cogizmo.prototype.constructor.name);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('inherits HTMLElement', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function(ev) {
                let Cogizmo = ev.detail;
                done(HTMLElement.isPrototypeOf(Cogizmo));
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('has a script property', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function(ev) {
                let Cogizmo = ev.detail;
                done("undefined" !== Cogizmo.script);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('.script is immutable', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function(ev) {
                let Cogizmo = ev.detail;
                let o = Cogizmo.script;
                Cogizmo.script = document.createElement('script');
                done(o === Cogizmo.script);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('.script === script element', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function(ev) {
                let Cogizmo = ev.detail;
                done(document.querySelector('script') === Cogizmo.script);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('has a path property', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function(ev) {
                let Cogizmo = ev.detail;
                done("undefined" !== Cogizmo.path);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('.path is immutable', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function(ev) {
                let Cogizmo = ev.detail;
                let o = Cogizmo.path;
                Cogizmo.path = '';
                done(o === Cogizmo.path);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('.path is a string', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function() {
                let Cogizmo = ev.detail;
                done("string" === typeof Cogizmo.path);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('.path contains script.src', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function() {
                let Cogizmo = ev.detail;
                let a = document.createElement('a');
                a.href = Cogizmo.script.src + /../;
                done(a.href === Cogizmo.path);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('has observedAttributes', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function() {
                let Cogizmo = ev.detail;
                done("undefined" !== Cogizmo.observedAttributes);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('.observedAttributes is an Array', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function() {
                let Cogizmo = ev.detail;
                done(Array.isArray(Cogizmo.observedAttributes));
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('.observedAttributes is immutable', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function() {
                let Cogizmo = ev.detail;
                let o = Cogizmo.observedAttributes;
                o.push = 'try-me';
                done(0 === Cogizmo.observedAttributes.length);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('has a template property', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function() {
                let Cogizmo = ev.detail;
                done("undefined" !== Cogizmo.template);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('.template is an HTMLTemplateElement', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function() {
                let Cogizmo = ev.detail;
                done(Cogizmo.template instanceof HTMLTemplateElement);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('has a manage method', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function() {
                let Cogizmo = ev.detail;
                done("undefined" !== Cogizmo.manage);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('.manage() is immutable', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function() {
                let Cogizmo = ev.detail;
                let o = Cogizmo.manage;
                Cogizmo.manage = function() {};
                done(o === Cogizmo.manage);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('.manage() is a function', client => {
        client.executeAsync(`${sDone}
            document.addEventListener('cogizmo-ready', function() {
                let Cogizmo = ev.detail;
                done("function" === typeof Cogizmo.manage);
            });
            ${sCogizmo}
        `,
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

});
