/*
global
    EventTarget,
    Event,
    Node,
    NodeList,
    HTMLCollection,
    Location,
    location,
    Element,
    HTMLTableElement,
    HTMLTableRowElement,
    HTMLSelectElement,
    HTMLOptionElement,
    HTMLInputElement,
    HTMLTextAreaElement,
    HTMLUListElement,
    HTMLOListElement,
    Option,
    RTCPeerConnection,
    RTCSessionDescription,
    Window,
    iframe,
    li,
    events,

    {
        eslint: {
            dot-location: ["error", "property"]
        }
    };
*/

((glb) => {
    "use strict";

    let is = glb.is = Object.assign((t) => {
        try {
            return t.constructor;
        } catch (e) {
            return t;
        }
    }, {
        "array": (t) => is(t) === Array,
        "blank": (t) => t === "",
        "boolean": (t) => is(t) === Boolean,
        "defined": (t) => is(t) !== undefined,
        "function": (t) => is(t) === Function,
        "generator": (t) => is(t) === is(gt),
        "iterable": (t) => is(t) === is(ir),
        "held": (t) => (p) => t instanceof p,
        "nan": (t) => is.number(t) && isNaN(t),
        "null": (t) => is(t) === null,
        "number": (t) => is(t) === Number,
        "object": (t) => is(t) === Object,
        "pure": (t) => is.object(t) || is.array(t),
        "string": (t) => is(t) === String,
        "there": (t) => t.length !== 0,
        "valid": (t) => !is.blank(t) && !is.nan(t) && is(t) !== t,
        "self": (t) => is(t).prototype === t,
        "symbol": (t) => is(t) === Symbol
    });

    let gt = is(function* () {});
    let ir = is(function* () {}());

    let de = glb.de = Object.create(null, {
        configurable: {
            value: (o) => Object.assign({
                configurable: true
            }, o)
        },

        enumerable: {
            value: (o) => Object.assign({
                configurable: true,
                enumerable: true
            }, o)
        },

        writable: {
            value: (o) => Object.assign({
                configurable: true,
                writable: true
            }, o)
        },

        all: {
            value: (o) => Object.assign({
                enumerable: true,
                configurable: true,
                writable: true
            }, o)
        },

        fine: {value: Object.defineProperties},
        al: {value: Object.create},
        tail: {value: Object.getOwnPropertyDescriptors}
    });

    de.fine(de, {_: {value: de.configurable}});

    de.fine(ir.prototype, {
        each: de._({
            value (cb) {
                for (let v of this) {
                    cb(v);
                }
                return this;
            }
        }),

        _: de._({
            get () {
                return this.next;
            }
        })
    });

    de.fine(Function.prototype, {
        keep: de._({
            get () {
                return de.fine(
                    this.prototype,
                    {constructor: de.writable({value: this})}
                ) && this;
            }
        }),

        __: de._({
            value (p) {
                return de.fine(this.prototype, p) && this.keep;
            }
        }),

        _: de._({
            value (p) {
                switch (is(p)) {
                    case Object: {
                        this.prototype = is.self(p) && Object.create(p) || this.prototype._(p);
                        break;
                    }

                    case Function: {
                        this.prototype = Object.create(p.prototype);
                        break;
                    }
                    default: break;
                }
                return this.keep;
            }
        }),

        fact: de._({
            value (o) {
                Object.assign(this, o);
                return this.__(o.map((vv, k) => ({
                    [k]: de._({
                        get: () => this[k],
                        set: (v) => this[k] = v
                    })
                })));
            }
        })
    });

    Object.__({
        __$__: de.writable({value: false}),

        $: de._({
            get () {
                return this.__$__;
            },

            set (t) {
                this.__({__$__: de.writable({value: t})});
            }
        }),

        _: de._({
            value (o) {
                this.$ = is.held(o)(EventTarget) && o || false;
                return is.pure(o) && Object.assign(this, o) || this;
            }
        }),

        __: de._({
            value (o) {
                return Object.defineProperties(this, o);
            }
        }),

        de: de._({
            get () {
                return Object.getOwnPropertyDescriptors(this);
            }
        }),

        keys: de._({
            get () {
                return Object.keys(this);
            }
        }),

        length: de._({
            get () {
                return this.keys.length;
            }
        }),

        on: de._({
            value (e) {
                is.array(e) && e.each((v) => this.on(v)) || this.$ && this.$.on(e, this);
                return this;
            }
        }),

        off: de._({
            value (e) {
                is.array(e) && e.each((v) => this.off(v)) || this.$ && this.$.off(e, this);
                return this;
            }
        }),

        each: de._({
            value (f) {
                this.keys.forEach((k) => f(this[k], k));
                return this;
            }
        }),

        deep: de._({
            value (cb) {
                return this.each((v, k) => is.pure(v) && v.deep(cb) || cb(v, k));
            }
        }),

        deal: de._({
            get () {
                return Object.create(this);
            }
        }),

        copy: de._({
            get () {
                return Object.create(is(this).prototype, this.de);
            }
        }),

        clone: de._({
            get () {
                return this.map((v) => (is.pure(v) || is.held(v)(Node)) && v.clone || v);
            }
        }),

        map: de._({
            value (cb) {
                let a = this.copy;
                return a.each((v, k) => a[k] = cb(v, k));
            }
        }),

        mix: de._({
            value (cb) {
                let a = this.clone;
                return a.map((v, k) => is.pure(v) && v.mix(cb) || cb(v, k));
            }
        }),

        json: de._({
            get () {
                return JSON.stringify(this);
            }
        }),

        __oppo__: de._({value: false}),
        __stop__: de._({value: false}),

        oppo: de._({
            get () {
                return this.__oppo__;
            },

            set (v) {
                this.__({__oppo__: de._({value: v})});
            }
        }),

        stop: de._({
            get () {
                return this.__stop__;
            },

            set (v) {
                this.__({__stop__: de._({value: v})});
            }
        }),

        toArray: de._({
            get () {
                is.valid(this.length) || this._({length: this.keys.length});
                return Array.from(this);
            }
        }),

        handleEvent: de._({
            value (e) {
                this.stop && e.stopPropagation();
                this.oppo && e.preventDefault();
                is.object(this[e.type]) && this[e.type][this[e.type].type].call(this, e);
                is.function(this[e.type]) && this[e.type](e);
            }
        })
    });

    Array.__({
        _: de._({value: Array.prototype.splice}),
        id: de._({
            value (t, s) {
                return this.indexOf(t, s) === -1 && false || this.indexOf(t, s);
            }
        }),

        each: de._({
            value (f) {
                this.forEach(f);
                return this;
            }
        }),

        pull: de._({
            value (v) {
                this.unshift(v);
                return this;
            }
        }),

        kick: de._({value: Array.prototype.shift}),

        push: de._({
            value (v) {
                this[this.length] = v;
                return this;
            }
        })
    });

    String.__({
        _: de._({
            get () {
                return this.json;
            }
        }),

        id: de._({
            get () {
                return this.indexOf;
            }
        }),

        json: de._({
            get () {
                try {
                    return JSON.parse(this);
                } catch (e) {
                    return this;
                }
            }
        }),

        byte: de._({
            value (b) {
                let res = "";

                switch (b) {
                    case 1: {
                        this.each(
                            (v) => res += String.fromCharCode(
                                v.charCodeAt(0) - 0xFEE0
                            )
                        );
                        break;
                    }

                    case 2: {
                        this.each(
                            (v) => res += String.fromCharCode(
                                v.charCodeAt(0) + 0xFEE0
                            )
                        );
                        break;
                    }
                    default: return this;
                }
                return res;
            }
        })
    });

    glb === window && (() => {
        window.$ = Object.assign(window.$ && window.$ || ((q) => document.querySelectorAll(q).length === 1 &&
            document.querySelector(q) ||
            document.querySelectorAll(q)),
        {
            get html () {
                return document.documentElement;
            },

            get head () {
                return document.head;
            },

            get body () {
                return document.body;
            },

            get here () {
                return location.hostname;
            },

            get port () {
                return location.port;
            },

            get https () {
                return location.https;
            },

            get path () {
                return location.pathname;
            }
        });

        window._  = Object.create({
            on (ee) {
                is.array(ee) && ee.each((vv) => {
                    window._.constructor.__({
                        [vv]: de._({
                            value (e) {
                                is.pure(e) && e._.each((v, k) => {
                                    is.object(this[k][vv]) && this[k][vv][e._[k].type](e._[k]);
                                    is.function(this[k][vv]) && this[k][vv](e._[k]);
                                });
                            }
                        })
                    });
                    this.$.on(vv, window._);
                });

                is.string(ee) && window._.constructor.__({
                    [ee]: de._({
                        value (e) {
                            is.pure(e) && e._.each((v, k) => {
                                is.object(this[k][ee]) && this[k][ee][e._[k].type](e._[k]);
                                is.function(this[k][ee]) && this[k][ee](e._[k]);
                            });
                        }
                    })
                }) && this.$.on(ee, window._);

                return this;
            }
        }, window._ && window._.de || {});

        Event.__({
            $: de._({
                get () {
                    return this.target;
                }
            }),

            _: de._({
                get () {
                    return this.data && this.data._;
                }
            })
        });

        EventTarget.__({
            on: de._({
                value (e, cb, p) {
                    this.addEventListener(e, cb, p);
                    return this;
                }
            }),

            off: de._({
                value (e, cb, p) {
                    this.removeEventListener(e, cb, p);
                    return this;
                }
            }),

            say: de._({
                value (v) {
                    is.function(this.send) && this.send(
                        is.string(v) && v || v.json
                    );
                    return this;
                }
            }),

            hear: de._({
                value (cb) {
                    return this.on("message", cb);
                }
            })
        });

        Node.__({
            $: de._({
                value (t) {
                    switch (is(t)) {
                        case Object: return this.$(t.$);
                        case Array || NodeList || HTMLCollection || ir: {
                            let ve = document.createDocumentFragment();
                            t.each((v) => ve.$(v));
                            return this.$(ve);
                        }

                        case null || undefined: return this.outer.out(this);
                        case String || Number || Boolean: {
                            is.defined(this.src) && this._({src: String(t)}) || this.append(t);
                            return this;
                        }

                        default: return this.append(t) || this;
                    }
                }
            }),

            out: de._({
                value (t) {
                    let outer = this.outer;
                    return is.valid(t) && (!this.removeChild(t) || this) || !outer.removeChild(this) || outer;
                }
            }),

            _: de._({
                value (a) {
                    is.object(a) &&
                    a.each((v, k) => is.valid(v) && !this.setAttribute(k, v) || this.removeAttribute(k));
                    return is.string(a) && this.getAttribute(a) || this;
                }
            }),

            inner: de._({
                get () {
                    return this.childNodes;
                }
            }),

            outer: de._({
                get () {
                    return this.parentNode;
                }
            }),

            clone: de._({
                get () {
                    return this.cloneNode();
                }
            }),

            wear: de._({
                value (s) {
                    is.object(s) && this.style._(s);
                    this.style.cssText = is.string(s) && s || this.style.cssText;
                    return this;
                }
            }),

            css: de._({
                get () {
                    return this.wear;
                }
            }),

            now: de._({
                get () {
                    return this.innerText;
                },

                set (v) {
                    this.innerText = v;
                    return true;
                }
            })
        });

        HTMLCollection.__({
            id: de._({
                value (t, s) {
                    return this.toArray.id(t, s);
                }
            }),

            each: de._({
                value (f) {
                    return this.toArray.each(f);
                }
            })
        });

        NodeList.__({
            id: de._({
                value (t, s) {
                    return this.toArray.id(t, s);
                }
            }),

            each: de._({
                value (f) {
                    return this.toArray.each(f);
                }
            })
        });

        Location.__({
            _: de._({
                get () {
                    return decodeURIComponent(location.search.slice(1)).json;
                }
            }),

            port: de._({
                get () {
                    return location.host.slice(location.host.id(":") + 1);
                }
            }),

            https: de._({
                get () {
                    return location.protocol === "https:";
                }
            })
        });

        Element.__({
            ["#"]: de._({
                get () {
                    return this.id;
                },

                set (v) {
                    this.id = v;
                    return true;
                }
            }),

            ["."]: de._({
                get () {
                    return this.class;
                },

                set (v) {
                    this.class = v;
                    return true;
                }
            })
        });

        HTMLTableElement.__({
            $: de._({
                value (c) {
                    return is.valid(c) &&
                        (is.array(c) && !c.each((v) => this.insertRow().$(v)) || this) ||
                        (!this.insertRow().$(c) || this) ||
                        this.insertRow();
                }
            }),

            cell: de._({
                value (r) {
                    return (c) => this.rows[r].cells[c];
                }
            }),

            deep: de._({
                value (f) {
                    return this.rows.each(
                        (cr, r) => cr.each(
                            (v, c) => f(v, r, c)
                        )
                    );
                }
            })
        });

        HTMLTableRowElement.__({
            $: de._({
                value (c) {
                    return is.valid(c) &&
                        (is.array(c) && !c.each((v) => this.insertCell().$(v)) || this.outer) ||
                        (!this.insertCell().$(c) || this.outer) ||
                        this.insertCell();
                }
            }),

            each: de._({
                value (f) {
                    return this.cells.each(f);
                }
            })
        });

        HTMLSelectElement.__({
            $: de._({
                value (o) {
                    is.pure(o) &&
                    o.each((v, k) => this.options.add(is(v) === HTMLOptionElement && v || new Option(v, k)));
                    return this;
                }
            }),

            now: de._({
                get () {
                    return this.value;
                },

                set (v) {
                    this.value = v;
                    return this;
                }
            })
        });

        HTMLUListElement.__({
            $: de._({
                value (t) {
                    switch (is(t)) {
                        case Array || NodeList || HTMLCollection: {
                            let ve = document.createDocumentFragment();
                            t.each((v) => ve.$(li.$(v)));
                            this.append(ve);
                            break;
                        }
                        default: Element.prototype.$.call(this, t);
                    }
                    return this;
                }
            }),

            li: de._({
                get () {
                    return this.children;
                }
            })
        });

        HTMLOListElement.__({
            $: de._({
                value (t) {
                    switch (is(t)) {
                        case Array || NodeList || HTMLCollection: {
                            let ve = document.createDocumentFragment();
                            t.each((v) => ve.$(li.$(v)));
                            this.append(ve);
                            break;
                        }
                        default: Element.prototype.$.call(this, t);
                    }
                    return this;
                }
            }),

            li: de._({
                get () {
                    return this.children;
                }
            })
        });

        HTMLInputElement.__({
            now: de._({
                get () {
                    switch (this.type) {
                        case "checkbox" || "radio": return this.checked;
                        default: return this.value;
                    }
                },

                set (v) {
                    switch (this.type) {
                        case "checkbox" || "radio": {
                            this.checked = v;
                            break;
                        }

                        default: return this.value = v;
                    }
                    return true;
                }
            })
        });

        HTMLTextAreaElement.__({
            now: de._({
                get () {
                    return this.value;
                },

                set (v) {
                    this.value = v;
                    return this;
                }
            })
        });

        XMLHttpRequest.__({
            data: de._({
                get () {
                    return this.response;
                }
            }),

            say: de._({
                value (o) {
                    this.open(
                        o.method || "GET",
                        o.url || "",
                        true,
                        o.id || undefined,
                        o.pass || undefined
                    );
                    o.header && this.header(o.header);
                    this.withCredentials = o.credential || false;
                    this.send(o.data || null);
                    return this;
                }
            }),

            header: de._({
                value (v) {
                    is.object(v) && v.each((v, k) => this.setRequestHeader(k, v));
                    return this;
                }
            }),

            sayType: de._({
                value (type, cs) {
                    return {header: {"Content-Type": type + "; charset=" + cs}};
                }
            }),

            stream: de._({
                header: {
                    "Content-Type": "text/stream; charset=utf-8"
                }
            })
        });

        let Wait = glb.Wait = (s, cb) => {
            let t = setTimeout(cb, s);
            return () => clearTimeout(t);
        };

        let Each = glb.Each = (s, cb) => {
            let t = setInterval(cb, s);
            return () => clearInterval(t);
        };

        Window.__({
            article: de._({get: () => document.createElement("article")}),
            div: de._({get: () => document.createElement("div")}),
            section: de._({get: () => document.createElement("section")}),
            nav: de._({get: () => document.createElement("nav")}),
            aside: de._({get: () => document.createElement("aside")}),
            header: de._({get: () => document.createElement("header")}),
            footer: de._({get: () => document.createElement("footer")}),
            h1: de._({get: () => document.createElement("h1")}),
            h2: de._({get: () => document.createElement("h2")}),
            h3: de._({get: () => document.createElement("h3")}),
            h4: de._({get: () => document.createElement("h4")}),
            h5: de._({get: () => document.createElement("h5")}),
            h6: de._({get: () => document.createElement("h6")}),
            p: de._({get: () => document.createElement("p")}),
            br: de._({get: () => document.createElement("br")}),
            table: de._({get: () => document.createElement("table")}),
            ul: de._({get: () => document.createElement("ul")}),
            ol: de._({get: () => document.createElement("ol")}),
            li: de._({get: () => document.createElement("li")}),
            dl: de._({get: () => document.createElement("dl")}),
            dt: de._({get: () => document.createElement("dt")}),
            dd: de._({get: () => document.createElement("dd")}),
            form: de._({get: () => document.createElement("form")}),
            label: de._({get: () => document.createElement("label")}),
            input: de._({get: () => document.createElement("input")}),
            checkbox: de._({get: () => window.input._({type: "checkbox"})}),
            radio: de._({get: () => window.input._({type: "radio"})}),
            text: de._({get: () => window.input._({type: "text"})}),
            textarea: de._({get: () => document.createElement("textarea")}),
            button: de._({get: () => document.createElement("button")}),
            img: de._({get: () => document.createElement("img")}),
            area: de._({get: () => document.createElement("area")}),
            map: de._({get: () => document.createElement("map")}),
            iframe: de._({get: () => document.createElement("iframe")}),
            select: de._({get: () => document.createElement("select")}),
            a: de._({get: () => document.createElement("a")}),
            em: de._({get: () => document.createElement("em")}),
            strong: de._({get: () => document.createElement("strong")}),
            span: de._({get: () => document.createElement("span")})
        });

        let XD = function (uri, ssl) {
            this
            ._(
                iframe.$(ssl && "https://" + uri || "http://" + uri)
                .wear({
                    width: "1px",
                    height: "1px",
                    position: "absolute",
                    top: "-100px;"
                })
            )
            .on("load");
            $.body.$(this.$);
        }._({
            load (e) {
                e.$.$();
            }
        });

        let Socket = glb.Socket = function (uri = $.here, ssl = $.https) {
            uri === $.hear || new XD(uri, ssl);
            return new WebSocket(ssl && "wss://" + uri || "ws://" + uri);
        };
    })();
})(window || process);
