const HTTP = require('http');
const STATIC = require('serve-static');
const FINAL = require('finalhandler');
const PATH = require('path');

let serve = STATIC(PATH.dirname(PATH.dirname(__dirname)))
let svc = HTTP.createServer((req, res) => {
    serve(req, res, FINAL);
});

describe('Module:', function() {

    before(function(client, done) {
        svc.listen(31547, '127.0.0.1');
        done();
    });

    after(function(client, done) {
        svc.close();
        client.end(function() {
            done();
        });
    });

    afterEach(function(client, done) {
        done();
    });

    beforeEach(function(client, done) {
        client.url('http://127.0.0.1:31547/test/test-module/module.html')
            .waitForElementPresent('body');
        done();
    });

    describe('Cogizmo... ', function() {
        it('is a function', client => {
            client.executeAsync(function(done) {
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    done("function" === typeof Cogizmo);
                })
                .catch(reason => {
                    console.log(reason);
                })
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is a constructor', client => {
            client.executeAsync(function(done) {
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    done(Cogizmo.name === Cogizmo.prototype.constructor.name);
                })
                .catch(reason => {
                    console.log(reason);
                })
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is a subclass of HTMLElement', client => {
            client.executeAsync(function(done) {
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    done(HTMLElement.isPrototypeOf(Cogizmo));
                })
                .catch(reason => {
                    console.log(reason);
                })
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
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    done("undefined" !== typeof Cogizmo.script);
                })
                .catch(reason => {
                    console.log(reason);
                })
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is immutable', client => {
            client.executeAsync(function(done) {
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    let o = Cogizmo.script;
                    Cogizmo.script = document.createElement('script');
                    done(o === Cogizmo.script);
                })
                .catch(reason => {
                    console.log(reason);
                })
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is the script element that invoked it', client => {
            client.executeAsync(function(done) {
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    done(document.querySelector('script') === Cogizmo.script);
                })
                .catch(reason => {
                    console.log(reason);
                })
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
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    done("undefined" !== typeof Cogizmo.path);
                })
                .catch(reason => {
                    console.log(reason);
                })
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is immutable', client => {
            client.executeAsync(function(done) {
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    let o = Cogizmo.path;
                    Cogizmo.path = '';
                    done(o === Cogizmo.path);
                })
                .catch(reason => {
                    console.log(reason);
                })
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is a string', client => {
            client.executeAsync(function(done) {
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    done("string" === typeof Cogizmo.path);
                })
                .catch(reason => {
                    console.log(reason);
                })
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('contains script.src', client => {
            client.executeAsync(function(done) {
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    let a = document.createElement('a');
                    a.href = Cogizmo.script.src + /../;
                    done(a.href === Cogizmo.path);
                })
                .catch(reason => {
                    console.log(reason);
                })
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
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    done("undefined" !== Cogizmo.observedAttributes);
                })
                .catch(reason => {
                    console.log(reason);
                })
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is an Array', client => {
            client.executeAsync(function(done) {
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    done(Array.isArray(Cogizmo.observedAttributes));
                })
                .catch(reason => {
                    console.log(reason);
                })
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is immutable', client => {
            client.executeAsync(function(done) {
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    let o = Cogizmo.observedAttributes;
                    o.push = 'try-me';
                    done(0 === Cogizmo.observedAttributes.length);
                })
                .catch(reason => {
                    console.log(reason);
                })
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
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    done("undefined" !== typeof Cogizmo.template);
                })
                .catch(reason => {
                    console.log(reason);
                })
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is an HTMLTemplateElement', client => {
            client.executeAsync(function(done) {
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    done(Cogizmo.template instanceof HTMLTemplateElement);
                })
                .catch(reason => {
                    console.log(reason);
                })
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
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    done("undefined" !== Cogizmo.manage);
                })
                .catch(reason => {
                    console.log(reason);
                })
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is a function', client => {
            client.executeAsync(function(done) {
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    done("function" === typeof Cogizmo.manage);
                })
                .catch(reason => {
                    console.log(reason);
                })
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });

        it('is immutable', client => {
            client.executeAsync(function(done) {
                import('/Cogizmo.mjs')
                .then(module => {
                    let Cogizmo = module.default;
                    let o = Cogizmo.manage;
                    Cogizmo.manage = function() {};
                    done(o === Cogizmo.manage);
                })
                .catch(reason => {
                    console.log(reason);
                })
            },
            [],
            (result) => {
                client.assert.ok(result.value).end();
            });
        });
    });
});
