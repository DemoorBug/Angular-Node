(function() {
    define("t5/core/validation", "underscore ./dom ./events ./utils ./messages ./fields".split(" "),
    function(a, m, p, l, b) {
        var e, k, h, q, r, w, B;
        r = b("decimal-symbols.minus");
        h = b("decimal-symbols.group");
        e = b("decimal-symbols.decimal");
        w = function(a, k) {
            var m, q, p, g, w, B, K, Z, R, L, N;
            g = "";
            m = function(a) {
                return g += a
            };
            q = function(a) {
                if ("0" > a || "9" < a) throw Error(b("core-input-not-numeric"));
                m(a)
            };
            R = function(a) {
                q(a);
                return p
            };
            B = function(a) {
                q(a);
                return B
            };
            p = function(a) {
                switch (a) {
                case h:
                    return R;
                case e:
                    if (k) throw Error(b("core-input-not-integer"));
                    m(".");
                    return B;
                default:
                    return R(a)
                }
            };
            N = function(a) {
                return a === r ? (m("-"), R) : p(a)
            };
            L = l.trim(a);
            K = 0;
            for (Z = L.length; K < Z; K++) w = L[K],
            N = N(w);
            return Number(g)
        };
        q = function(a, b) {
            var e;
            e = a.match(b);
            return null === e ? !1 : e[0] === a
        };
        k = RegExp("[A-Za-z0-9!#$%\x26'*+/\x3d?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%\x26'*+/\x3d?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?");
        B = function(e, h, k) {
            var l;
            try {
                l = w(h.value, k);
                if (a.isNaN(l)) throw b("core-input-not-numeric");
                return h.translated = l
            } catch(m) {
                return h.error = e.attr("data-translation-message") || m.message || "ERROR",
                !1
            }
        };
        m.onDocument(p.field.optional, "[data-optionality\x3drequired]",
        function(a, b) {
            if (l.isBlank(b.value)) return b.error = this.attr("data-required-message") || "REQUIRED"
        });
        m.onDocument(p.field.translate, "[data-translation\x3dnumeric]",
        function(a, b) {
            return B(this, b, !1)
        });
        m.onDocument(p.field.translate, "[data-translation\x3dinteger]",
        function(a, b) {
            return B(this, b, !0)
        });
        m.onDocument(p.field.validate, "[data-validate-min-length]",
        function(a, b) {
            var e;
            e = parseInt(this.attr("data-validate-min-length"));
            if (b.translated.length < e) return b.error = this.attr("data-min-length-message") || "TOO SHORT",
            !1
        });
        m.onDocument(p.field.validate, "[data-validate-max-length]",
        function(a, b) {
            var e;
            e = parseInt(this.attr("data-validate-max-length"));
            if (b.translated.length > e) return b.error = this.attr("data-max-length-message") || "TOO LONG",
            !1
        });
        m.onDocument(p.field.validate, "[data-validate-max]",
        function(a, b) {
            var e;
            e = parseInt(this.attr("data-validate-max"));
            if (b.translated > e) return b.error = this.attr("data-max-message") || "TOO LARGE",
            !1
        });
        m.onDocument(p.field.validate, "[data-validate-min]",
        function(a, b) {
            var e;
            e = parseInt(this.attr("data-validate-min"));
            if (b.translated < e) return b.error = this.attr("data-min-message") || "TOO SMALL",
            !1
        });
        m.onDocument(p.field.validate, "[data-validate-email]",
        function(a, b) {
            if (!q(b.translated, k)) return b.error = this.attr("data-email-message") || "INVALID EMAIL",
            !1
        });
        m.onDocument(p.field.validate, "[data-validate-regexp]",
        function(a, b) {
            var e;
            e = this.meta("t5:regular-expression");
            e || (e = RegExp(this.attr("data-validate-regexp")), this.meta("t5:regular-expression", e));
            if (!q(b.translated, e)) return b.error = this.attr("data-regexp-message") || "INVALID",
            !1
        });
        return {
            parseNumber: w
        }
    })
}).call(this); 

onDocument: function(a, b, e) {
    return B.on(document, a, b, e)
},
