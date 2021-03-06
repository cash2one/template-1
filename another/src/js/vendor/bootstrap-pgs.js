/* carousel dropdown  transtion*/
!function (t) {
    function e(i) {
        if (n[i]) return n[i].exports;
        var r = n[i] = {i: i, l: !1, exports: {}};
        return t[i].call(r.exports, r, r.exports, e), r.l = !0, r.exports
    }

    var n = {};
    e.m = t, e.c = n, e.d = function (t, n, i) {
        e.o(t, n) || Object.defineProperty(t, n, {configurable: !1, enumerable: !0, get: i})
    }, e.n = function (t) {
        var n = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return e.d(n, "a", n), n
    }, e.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, e.p = "", e(e.s = 0)
}([function (t, e, n) {
    "use strict";
    n(1), n(2), n(3)
}, function (t, e, n) {
    "use strict";
    +function (t) {
        function e() {
            var t = document.createElement("bootstrap"), e = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
            for (var n in e) if (void 0 !== t.style[n]) return {end: e[n]};
            return !1
        }

        t.fn.emulateTransitionEnd = function (e) {
            var n = !1, i = this;
            t(this).one("bsTransitionEnd", function () {
                n = !0
            });
            var r = function () {
                n || t(i).trigger(t.support.transition.end)
            };
            return setTimeout(r, e), this
        }, t(function () {
            t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
                bindType: t.support.transition.end,
                delegateType: t.support.transition.end,
                handle: function (e) {
                    if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                }
            })
        })
    }(jQuery)
}, function (t, e, n) {
    "use strict";
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    +function (t) {
        function e(e) {
            return this.each(function () {
                var r = t(this), o = r.data("bs.carousel"),
                    s = t.extend({}, n.DEFAULTS, r.data(), "object" == (void 0 === e ? "undefined" : i(e)) && e),
                    a = "string" == typeof e ? e : s.slide;
                o || r.data("bs.carousel", o = new n(this, s)), "number" == typeof e ? o.to(e) : a ? o[a]() : s.interval && o.pause().cycle()
            })
        }

        var n = function (e, n) {
            this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
        };
        n.VERSION = "3.3.7", n.TRANSITION_DURATION = 600, n.DEFAULTS = {
            interval: 5e3,
            pause: "hover",
            wrap: !0,
            keyboard: !0
        }, n.prototype.keydown = function (t) {
            if (!/input|textarea/i.test(t.target.tagName)) {
                switch (t.which) {
                    case 37:
                        this.prev();
                        break;
                    case 39:
                        this.next();
                        break;
                    default:
                        return
                }
                t.preventDefault()
            }
        }, n.prototype.cycle = function (e) {
            return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
        }, n.prototype.getItemIndex = function (t) {
            return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
        }, n.prototype.getItemForDirection = function (t, e) {
            var n = this.getItemIndex(e);
            if (("prev" == t && 0 === n || "next" == t && n == this.$items.length - 1) && !this.options.wrap) return e;
            var i = "prev" == t ? -1 : 1, r = (n + i) % this.$items.length;
            return this.$items.eq(r)
        }, n.prototype.to = function (t) {
            var e = this, n = this.getItemIndex(this.$active = this.$element.find(".item.active"));
            if (!(t > this.$items.length - 1 || t < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function () {
                e.to(t)
            }) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", this.$items.eq(t))
        }, n.prototype.pause = function (e) {
            return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
        }, n.prototype.next = function () {
            if (!this.sliding) return this.slide("next")
        }, n.prototype.prev = function () {
            if (!this.sliding) return this.slide("prev")
        }, n.prototype.slide = function (e, i) {
            var r = this.$element.find(".item.active"), o = i || this.getItemForDirection(e, r), s = this.interval,
                a = "next" == e ? "left" : "right", d = this;
            if (o.hasClass("active")) return this.sliding = !1;
            var l = o[0], c = t.Event("slide.bs.carousel", {relatedTarget: l, direction: a});
            if (this.$element.trigger(c), !c.isDefaultPrevented()) {
                if (this.sliding = !0, s && this.pause(), this.$indicators.length) {
                    this.$indicators.find(".active").removeClass("active");
                    var u = t(this.$indicators.children()[this.getItemIndex(o)]);
                    u && u.addClass("active")
                }
                var p = t.Event("slid.bs.carousel", {relatedTarget: l, direction: a});
                return t.support.transition && this.$element.hasClass("slide") ? (o.addClass(e), o[0].offsetWidth, r.addClass(a), o.addClass(a), r.one("bsTransitionEnd", function () {
                    o.removeClass([e, a].join(" ")).addClass("active"), r.removeClass(["active", a].join(" ")), d.sliding = !1, setTimeout(function () {
                        d.$element.trigger(p)
                    }, 0)
                }).emulateTransitionEnd(n.TRANSITION_DURATION)) : (r.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger(p)), s && this.cycle(), this
            }
        };
        var r = t.fn.carousel;
        t.fn.carousel = e, t.fn.carousel.Constructor = n, t.fn.carousel.noConflict = function () {
            return t.fn.carousel = r, this
        };
        var o = function (n) {
            var i, r = t(this), o = t(r.attr("data-target") || (i = r.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""));
            if (o.hasClass("carousel")) {
                var s = t.extend({}, o.data(), r.data()), a = r.attr("data-slide-to");
                a && (s.interval = !1), e.call(o, s), a && o.data("bs.carousel").to(a), n.preventDefault()
            }
        };
        t(document).on("click.bs.carousel.data-api", "[data-slide]", o).on("click.bs.carousel.data-api", "[data-slide-to]", o), t(window).on("load", function () {
            t('[data-ride="carousel"]').each(function () {
                var n = t(this);
                e.call(n, n.data())
            })
        })
    }(jQuery)
}, function (t, e, n) {
    "use strict";
    +function (t) {
        function e(e) {
            var n = e.attr("data-target");
            n || (n = e.attr("href"), n = n && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
            var i = n && t(n);
            return i && i.length ? i : e.parent()
        }

        function n(n) {
            n && 3 === n.which || (t(r).remove(), t(o).each(function () {
                var i = t(this), r = e(i), o = {relatedTarget: this};
                r.hasClass("open") && (n && "click" == n.type && /input|textarea/i.test(n.target.tagName) && t.contains(r[0], n.target) || (r.trigger(n = t.Event("hide.bs.dropdown", o)), n.isDefaultPrevented() || (i.attr("aria-expanded", "false"), r.removeClass("open").trigger(t.Event("hidden.bs.dropdown", o)))))
            }))
        }

        function i(e) {
            return this.each(function () {
                var n = t(this), i = n.data("bs.dropdown");
                i || n.data("bs.dropdown", i = new s(this)), "string" == typeof e && i[e].call(n)
            })
        }

        var r = ".dropdown-backdrop", o = '[data-toggle="dropdown"]', s = function (e) {
            t(e).on("click.bs.dropdown", this.toggle)
        };
        s.VERSION = "3.3.7", s.prototype.toggle = function (i) {
            var r = t(this);
            if (!r.is(".disabled, :disabled")) {
                var o = e(r), s = o.hasClass("open");
                if (n(), !s) {
                    "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", n);
                    var a = {relatedTarget: this};
                    if (o.trigger(i = t.Event("show.bs.dropdown", a)), i.isDefaultPrevented()) return;
                    r.trigger("focus").attr("aria-expanded", "true"), o.toggleClass("open").trigger(t.Event("shown.bs.dropdown", a))
                }
                return !1
            }
        }, s.prototype.keydown = function (n) {
            if (/(38|40|27|32)/.test(n.which) && !/input|textarea/i.test(n.target.tagName)) {
                var i = t(this);
                if (n.preventDefault(), n.stopPropagation(), !i.is(".disabled, :disabled")) {
                    var r = e(i), s = r.hasClass("open");
                    if (!s && 27 != n.which || s && 27 == n.which) return 27 == n.which && r.find(o).trigger("focus"), i.trigger("click");
                    var a = r.find(".dropdown-menu li:not(.disabled):visible a");
                    if (a.length) {
                        var d = a.index(n.target);
                        38 == n.which && d > 0 && d--, 40 == n.which && d < a.length - 1 && d++, ~d || (d = 0), a.eq(d).trigger("focus")
                    }
                }
            }
        };
        var a = t.fn.dropdown;
        t.fn.dropdown = i, t.fn.dropdown.Constructor = s, t.fn.dropdown.noConflict = function () {
            return t.fn.dropdown = a, this
        }, t(document).on("click.bs.dropdown.data-api", n).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
            t.stopPropagation()
        }).on("click.bs.dropdown.data-api", o, s.prototype.toggle).on("keydown.bs.dropdown.data-api", o, s.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", s.prototype.keydown)
    }(jQuery)
}]);