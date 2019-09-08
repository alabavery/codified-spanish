!function (e) {
    var t = {};

    function r(n) {
        if (t[n]) return t[n].exports;
        var o = t[n] = {i: n, l: !1, exports: {}};
        return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }

    r.m = e, r.c = t, r.d = function (e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: n})
    }, r.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, r.t = function (e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var o in e) r.d(n, o, function (t) {
            return e[t]
        }.bind(null, o));
        return n
    }, r.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 3)
}([function (e, t) {
    e.exports = require("sequelize")
}, function (e, t) {
    e.exports = require("graphql")
}, function (e, t, r) {
    "use strict";
    var n = r(1), o = r(0), i = r.n(o),
        u = new i.a("postgres://juwfhddomnoezp:f9db989b90cbefb145aff0dbc50f7ec243de9f4b7eb2756061d56aa762ed5b2c@ec2-54-83-9-36.compute-1.amazonaws.com:5432/dd3am2e2dguhs1", {
            dialect: "postgres",
            protocol: "postgres",
            define: {underscored: !0, freezeTableName: !0},
            ssl: !0,
            dialectOptions: {ssl: !0}
        });
    u.authenticate().then(function () {
        console.log("Connection has been established successfully.")
    }).catch(function (e) {
        console.error("Unable to connect to the database:", e)
    }), u.sync();
    var a = u, l = a.define("word", {
        id: {type: i.a.UUID, primaryKey: !0},
        string: {type: i.a.STRING, allowNull: !1},
        partOfSpeech: {type: i.a.STRING, allowNull: !1},
        person: {type: i.a.INTEGER, allowNull: !0},
        mood: {type: i.a.STRING, allowNull: !0},
        tense: {type: i.a.STRING, allowNull: !0},
        isPlural: {type: i.a.BOOLEAN, allowNull: !0},
        gender: {type: i.a.STRING, allowNull: !0}
    }), c = a.define("lemma", {
        id: {type: i.a.UUID, primaryKey: !0},
        string: {type: i.a.STRING, allowNull: !1},
        partOfSpeech: {type: i.a.STRING, allowNull: !1},
        meanings: {type: i.a.ARRAY(i.a.STRING), allowNull: !0}
    });

    function s(e, t, r, n, o, i, u) {
        try {
            var a = e[i](u), l = a.value
        } catch (e) {
            return void r(e)
        }
        a.done ? t(l) : Promise.resolve(l).then(n, o)
    }

    c.hasMany(l), l.belongsTo(c);

    function f() {
        var e;
        return e = regeneratorRuntime.mark(function e(t, r) {
            return regeneratorRuntime.wrap(function (e) {
                for (; ;) switch (e.prev = e.next) {
                    case 0:
                        return e.abrupt("return", l.findAll(p(r)));
                    case 1:
                    case"end":
                        return e.stop()
                }
            }, e)
        }), (f = function () {
            var t = this, r = arguments;
            return new Promise(function (n, o) {
                var i = e.apply(t, r);

                function u(e) {
                    s(i, n, o, u, a, "next", e)
                }

                function a(e) {
                    s(i, n, o, u, a, "throw", e)
                }

                u(void 0)
            })
        }).apply(this, arguments)
    }

    function p(e) {
        if (e && Object.keys(e).length) return {
            where: Object.keys(e).reduce(function (t, r) {
                var n, i, u;
                return Array.isArray(e[r]) ? t[r] = (n = {}, i = o.Op.or, u = e[r], i in n ? Object.defineProperty(n, i, {
                    value: u,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[i] = u, n) : t[r] = e[r], t
            }, {})
        }
    }

    var d = {
        id: {type: n.GraphQLList(n.GraphQLID)},
        string: {type: n.GraphQLList(n.GraphQLID)},
        partOfSpeech: {type: n.GraphQLString},
        lemmaId: {type: n.GraphQLID}
    }, h = new n.GraphQLObjectType({name: "word", fields: d}), y = {
        type: n.GraphQLList(h), args: d, resolve: function (e, t) {
            return f.apply(this, arguments)
        }
    };
    t.a = new n.GraphQLSchema({query: new n.GraphQLObjectType({name: "RootQueryType", fields: {word: y}})})
}, function (e, t, r) {
    e.exports = r(4)
}, function (e, t, r) {
    r(5)
}, function (e, t, r) {
    "use strict";
    r.r(t), function (e) {
        var t = r(2), n = r(7), o = r(8), i = n();
        i.use("/", o({schema: t.a, graphiql: !0})), i.listen(e.env.PORT || 4e3, function () {
            console.log("Listening...")
        })
    }.call(this, r(6))
}, function (e, t) {
    var r, n, o = e.exports = {};

    function i() {
        throw new Error("setTimeout has not been defined")
    }

    function u() {
        throw new Error("clearTimeout has not been defined")
    }

    function a(e) {
        if (r === setTimeout) return setTimeout(e, 0);
        if ((r === i || !r) && setTimeout) return r = setTimeout, setTimeout(e, 0);
        try {
            return r(e, 0)
        } catch (t) {
            try {
                return r.call(null, e, 0)
            } catch (t) {
                return r.call(this, e, 0)
            }
        }
    }

    !function () {
        try {
            r = "function" == typeof setTimeout ? setTimeout : i
        } catch (e) {
            r = i
        }
        try {
            n = "function" == typeof clearTimeout ? clearTimeout : u
        } catch (e) {
            n = u
        }
    }();
    var l, c = [], s = !1, f = -1;

    function p() {
        s && l && (s = !1, l.length ? c = l.concat(c) : f = -1, c.length && d())
    }

    function d() {
        if (!s) {
            var e = a(p);
            s = !0;
            for (var t = c.length; t;) {
                for (l = c, c = []; ++f < t;) l && l[f].run();
                f = -1, t = c.length
            }
            l = null, s = !1, function (e) {
                if (n === clearTimeout) return clearTimeout(e);
                if ((n === u || !n) && clearTimeout) return n = clearTimeout, clearTimeout(e);
                try {
                    n(e)
                } catch (t) {
                    try {
                        return n.call(null, e)
                    } catch (t) {
                        return n.call(this, e)
                    }
                }
            }(e)
        }
    }

    function h(e, t) {
        this.fun = e, this.array = t
    }

    function y() {
    }

    o.nextTick = function (e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        c.push(new h(e, t)), 1 !== c.length || s || a(d)
    }, h.prototype.run = function () {
        this.fun.apply(null, this.array)
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = y, o.addListener = y, o.once = y, o.off = y, o.removeListener = y, o.removeAllListeners = y, o.emit = y, o.prependListener = y, o.prependOnceListener = y, o.listeners = function (e) {
        return []
    }, o.binding = function (e) {
        throw new Error("process.binding is not supported")
    }, o.cwd = function () {
        return "/"
    }, o.chdir = function (e) {
        throw new Error("process.chdir is not supported")
    }, o.umask = function () {
        return 0
    }
}, function (e, t) {
    e.exports = require("express")
}, function (e, t) {
    e.exports = require("express-graphql")
}]);