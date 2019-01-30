describe('Nonmodule:', function() {

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
        client.executeAsync(function(done) {
            document.addEventListener('cogizmo-ready', function() {
                done(true);
            });

            let s = document.createElement('script');
            s.src = '../../Cogizmo.js';
            document.head.appendChild(s);
        },
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    it('is in the global scope', client => {
        client.executeAsync(function(done) {
            document.addEventListener('cogizmo-ready', function() {
                done(!!Cogizmo);
            });

            let s = document.createElement('script');
            s.src = '../../Cogizmo.js';
            document.head.appendChild(s);
        },
        [],
        (result) => {
            client.assert.ok(result.value).end();
        });
    });

    describe('Cogizmo... ', function() {
        it('is a function', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    done("function" === typeof Cogizmo);
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is a constructor', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    done(Cogizmo.name === Cogizmo.prototype.constructor.name);
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is a subclass of HTMLElement', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    done(HTMLElement.isPrototypeOf(Cogizmo));
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });
    });

    describe('Cogizmo.script... ', function() {
        it('is defined', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    done("undefined" !== typeof Cogizmo.script);
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is immutable', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    let o = Cogizmo.script;
                    Cogizmo.script = document.createElement('script');
                    done(o === Cogizmo.script);
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is the script element that invoked it', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    done(document.querySelector('script') === Cogizmo.script);
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });
    })

    describe('Cogizmo.path... ', function() {
        it('is defined', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    done("undefined" !== typeof Cogizmo.path);
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is immutable', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    let o = Cogizmo.path;
                    Cogizmo.path = '';
                    done(o === Cogizmo.path);
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is a string', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    done("string" === typeof Cogizmo.path);
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('contains script.src', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    let a = document.createElement('a');
                    a.href = Cogizmo.script.src + /../;
                    done(a.href === Cogizmo.path);
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });
    });

    describe('Cogizmo.observedAttributes... ', function() {
        it('is defined', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    done("undefined" !== Cogizmo.observedAttributes);
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is an Array', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    done(Array.isArray(Cogizmo.observedAttributes));
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is immutable', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    let o = Cogizmo.observedAttributes;
                    o.push = 'try-me';
                    done(0 === Cogizmo.observedAttributes.length);
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });
    });

    describe('Cogizmo.template... ', function() {
        it('is defined', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    done("undefined" !== typeof Cogizmo.template);
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is an HTMLTemplateElement', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    done(Cogizmo.template instanceof HTMLTemplateElement);
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });
    });

    describe('Cogizmo.manage... ', function() {
        it('is defined', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    done("undefined" !== Cogizmo.manage);
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is a function', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    done("function" === typeof Cogizmo.manage);
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is immutable', client => {
            client.executeAsync(function(done) {
                document.addEventListener('cogizmo-ready', function() {
                    let o = Cogizmo.manage;
                    Cogizmo.manage = function() {};
                    done(o === Cogizmo.manage);
                });

                let s = document.createElement('script');
                s.src = '../../Cogizmo.js';
                document.head.appendChild(s);
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });
    });
});
