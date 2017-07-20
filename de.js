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
    Document,
    DocumentFragment,
    HTMLTableElement,
    HTMLTableRowElement,
    HTMLSelectElement,
    HTMLOptionElement,
    Option,
    RTCPeerConnection,
    RTCSessionDescription,
    HTMLUListElement,
    HTMLOListElement,
    Window,
    iframe,
    li
*/
/*
eslint
    dot-location: ["error", "property"],
*/

((glb) => {
    "use strict";

    Object.getOwnPropertyDescriptors || Object.defineProperties(Object, {
        getOwnPropertyDescriptors: {
            configurable: true,
            value (o) {
                let res = {};
                Object.keys(o).forEach((v) => res[v] = Object.getOwnPropertyDescriptor(o, v));
                return res;
            }
        }
    });

    [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach((item) => {
        item.append || Object.defineProperties(item, {
            append: {
                configurable: true,
                writable: true,
                value: function append() {
                    var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();
                    
                    argArr.forEach((argItem) => {
                        docFrag.appendChild(argItem instanceof Node ? argItem : document.createTextNode(String(argItem)));
                    });
                    
                    this.appendChild(docFrag);
                }
            }
        });
    });

let $ = glb.$ = glb.$ || {};

    let is = glb.is = Object.assign((t) => {
        try {
            return t.constructor;
        } catch (e) {
            return t;
        }
    }, {
        "able": (t) => (v) => is.function(t) && t(v) || undefined,
        "array": (t) => is(t) === Array,
        "blank": (t) => t === "",
        "boolean": (t) => is(t) === Boolean,
        "defined": (t) => is(t) !== undefined,
        "function": (t) => is(t) === Function,
        "held": (t) => (p) => t instanceof p,
        "nan": (t) => is.number(t) && isNaN(t),
        "null": (t) => is(t) === null,
        "number": (t) => is(t) === Number,
        "object": (t) => is(t) === Object,
        "pure": (t) => is.object(t) || is.array(t),
        "string": (t) => is(t) === String,
        "there": (t) => is.valid(t.length) && t.length !== 0 || is.valid(t.keys) && is.there(t.keys),
        "valid": (t) => !is.blank(t) && !is.nan(t) && is(t) !== t,
        "self": (t) => is(t).prototype === t,
        "symbol": (t) => is(t) === Symbol
    });

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

        ep: {
            value: (a) => (b) => is.function(a) &&
                b.each((v, k) => is.pure(v) && de.ep(v)(a) || a(v, k)) ||
                a.each((v, k) => is.pure(v) && de.ep(v)(b) || b(v, k))
        },

        fine: {value: Object.defineProperties},
        al: {value: Object.create},
        alt: {value: (l) => new Array(l).fill(true).map},
        legate: {value: is.able}
    });

    de.fine(de, {_: {value: de.configurable}});

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
            get () {
                return de.ep(this);
            }
        }),

        copy: de._({
            get () {
                return Object.create(is(this).prototype, this.de);
            }
        }),

        deal: de._({
            get () {
                return Object.create(this);
            }
        }),

        mix: de._({
            value (cb) {
                return de.ep(this.copy)((v, k) => this[k] = cb(v, k));
            }
        }),

        map: de._({
            value (cb) {
                return this.copy.each((v, k) => this[k] = cb(v, k));
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
                return Array.from(this);
            }
        }),

        handleEvent: de._({
            value (e) {
                this.stop && e.stopPropagation();
                this.oppo && e.preventDefault();
                is.object(this[e.type]) && this[e.type][
                    is.string(e._.type) && e._.type || this[e.type].type
                ].call(this, e);
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
        Object.assign($, {
            html: document.documentElement,
            head: document.head,
            body: document.body
        });

        Event.__({
            $: de._({
                get () {
                    return this.target;
                }
            }),

            _: de._({
                get () {
                    return this.data && this.data.json ||
                    is.held(this.target)(Element) && this.target.now;
                },

                set (v) {
                    this.data = v.json;
                    return true;
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
                        case Object: return (ks) => this.$(ks.map((v) => t[v]));
                        case Array || NodeList || HTMLCollection: {
                            this.append(t);
                            break;
                        }

                        case null || undefined: return this.outer.out(this);
                        case String || Number || Boolean: {
                            is.defined(this.src) && this._({src: String(t)}) || this.append(t);
                            break;
                        }

                        default: this.append(t);
                    }
                    return this;
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
            })
        });

        HTMLCollection.__({
            id: {
                value (t, s) {
                    return this.toArray.id(t, s);
                }
            },

            each: {
                value (f) {
                    return this.toArray.each(f);
                }
            }
        });

        NodeList.__({
            id: {
                value (t, s) {
                    return this.toArray.id(t, s);
                }
            },

            each: {
                value (f) {
                    return this.toArray.each(f);
                }
            }
        });

        Location.__({
            _: de._({
                get () {
                    return decodeURIComponent(location.search.slice(1)).json;
                }
            })
        });

        Element.__({
            now: de._({
                get () {
                    switch (this.tagName) {
                        case "option": return this.outer.value;
                        case "input" || "select": switch (this.type) {
                            case "checkbox" || "radio": return this.checked;
                            default: return this.value;
                        }
                        case "img" || "iframe": return this.src;
                        default: return this.innerText;
                    }
                },

                set (v) {
                    switch (this.tagName) {
                        case "option": this.outer.value = v; break;
                        case "input" || "select": switch (this.type) {
                            case "checkbox" || "radio": this.checked = v; break;
                            default: this.value = v;
                        } break;
                        case "img" || "iframe": this.src = v; break;
                        default: this.innerText = v;
                    }
                    return true;
                }
            }),

            wear: de._({
                value (s) {
                    is.object(s) && this.style._(s);
                    this.style.cssText = is.string(s) && s || this.style.cssText;
                    return this;
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
            })
        });

        HTMLUListElement.__({
            $: de._({
                value (t) {
                    switch (is(t)) {
                        case Object: return (ks) => this.$(ks.map((v) => t[v]));
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
                        case Object: return (ks) => this.$(ks.map((v) => t[v]));
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

        let Wait = glb.Wait = (s, cb) => {
            let t = setTimeout(cb, s);
            return () => clearTimeout(t);
        };

        let Each = glb.Each = (s, cb) => {
            let t = setInterval(cb, s);
            return () => clearInterval(t);
        };

        Window.__({
            article: de._({
                get () {
                    return document.createElement("article");
                }
            }),

            div: de._({
                get () {
                    return document.createElement("div");
                }
            }),

            section: de._({
                get () {
                    return document.createElement("section");
                }
            }),

            nav: de._({
                get () {
                    return document.createElement("nav");
                }
            }),

            aside: de._({
                get () {
                    return document.createElement("aside");
                }
            }),

            header: de._({
                get () {
                    return document.createElement("header");
                }
            }),

            footer: de._({
                get () {
                    return document.createElement("footer");
                }
            }),

            h1: de._({
                get () {
                    return document.createElement("h1");
                }
            }),

            h2: de._({
                get () {
                    return document.createElement("h2");
                }
            }),

            h3: de._({
                get () {
                    return document.createElement("h3");
                }
            }),

            h4: de._({
                get () {
                    return document.createElement("h4");
                }
            }),

            h5: de._({
                get () {
                    return document.createElement("h5");
                }
            }),

            h6: de._({
                get () {
                    return document.createElement("h6");
                }
            }),

            p: de._({
                get () {
                    return document.createElement("p");
                }
            }),

            br: de._({
                get () {
                    return document.createElement("br");
                }
            }),

            table: de._({
                get () {
                    return document.createElement("table");
                }
            }),

            ul: de._({
                get () {
                    return document.createElement("ul");
                }
            }),

            ol: de._({
                get () {
                    return document.createElement("ol");
                }
            }),

            li: de._({
                get () {
                    return document.createElement("li");
                }
            }),

            dl: de._({
                get () {
                    return document.createElement("dl");
                }
            }),

            dt: de._({
                get () {
                    return document.createElement("dt");
                }
            }),

            dd: de._({
                get () {
                    return document.createElement("dd");
                }
            }),

            form: de._({
                get () {
                    return document.createElement("form");
                }
            }),

            label: de._({
                get () {
                    return document.createElement("label");
                }
            }),

            input: de._({
                get () {
                    return document.createElement("input");
                }
            }),

            textarea: de._({
                get () {
                    return document.createElement("textarea");
                }
            }),

            map: de._({
                get () {
                    return document.createElement("map");
                }
            }),

            area: de._({
                get () {
                    return document.createElement("area");
                }
            }),

            img: de._({
                get () {
                    return document.createElement("img");
                }
            }),

            button: de._({
                get () {
                    return document.createElement("button");
                }
            }),

            iframe: de._({
                get () {
                    return document.createElement("iframe");
                }
            }),

            select: de._({
                get () {
                    return document.createElement("select");
                }
            }),

            a: de._({
                get () {
                    return document.createElement("a");
                }
            }),

            em: de._({
                get () {
                    return document.createElement("em");
                }
            }),

            strong: de._({
                get () {
                    return document.createElement("strong");
                }
            }),

            span: de._({
                get () {
                    return document.createElement("span");
                }
            })
        });

        let XPath = function XPath (uri, ssl) {
            this._(
                iframe.$(ssl && "https://" + uri || "http://" + uri)
                .wear({
                    width: "1px",
                    height: "1px",
                    position: "absolute",
                    top: "-100px;"
                })
            ).on("load");
            $.body.$(this.$);
        }._({
            load (e) {
                e.$.$();
            }
        });

        let Socket = glb.Socket = function Socket (uri, ssl) {
            new XPath(uri, ssl);
            return new WebSocket(ssl && "wss://" + uri || "ws://" + uri);
        };

        let PvP = glb.PvP = function PvP (l, uri, ssl) {
            this
            ._({
                talk: null,
                signaling: new Socket(uri, ssl).hear(this)
            })
            ._(
                new RTCPeerConnection({iceServers: l})
            )
            .on([
                "icecandidate",
                "datachannel"
            ]);
        }.__({
            message: de.writable({
                value (e) {
                    e.data.json && this.take(e.data.json) || this.open();
                }
            }),

            icecandidate: de.writable({
                value (e) {
                    return e.candidate && this.signaling.send(this.local.json);
                }
            }),

            datachannel: de.writable({
                value (e) {
                    this.talk = e.channel;
                }
            }),

            open: de._({
                value () {
                    this.talk = this.$.createDataChannel("talk");
                    return this.$.createOffer().then(
                        (v) => this.local = v, (e) => e
                    );
                }
            }),

            take: de._({
                value (signal) {
                    this.remote = signal;
                    return this.$.createAnswer().then(
                        (v) => this.local = v, (e) => e
                    );
                }
            }),

            local: de._({
                set (v) {
                    this.$.setLocalDescription(new RTCSessionDescription(v));
                    return true;
                },

                get () {
                    return this.$.localDescription;
                }
            }),

            remote: de._({
                set (v) {
                    this.$.setRemoteDescription(new RTCSessionDescription(v));
                    return true;
                },

                get () {
                    return this.$.remoteDescription;
                }
            })
        });
    })();
})(window || process);
