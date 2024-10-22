/*!
 * VERSION: 0.5.6
 * DATE: 2017-01-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
!(function (a) {
  "use strict";
  var b = a.GreenSockGlobals || a,
    c = function (a) {
      var c,
        d = a.split("."),
        e = b;
      for (c = 0; c < d.length; c++) e[d[c]] = e = e[d[c]] || {};
      return e;
    },
    d = c("com.greensock.utils"),
    e = function (a) {
      var b = a.nodeType,
        c = "";
      if (1 === b || 9 === b || 11 === b) {
        if ("string" == typeof a.textContent) return a.textContent;
        for (a = a.firstChild; a; a = a.nextSibling) c += e(a);
      } else if (3 === b || 4 === b) return a.nodeValue;
      return c;
    },
    f = document,
    g = f.defaultView ? f.defaultView.getComputedStyle : function () {},
    h = /([A-Z])/g,
    i = function (a, b, c, d) {
      var e;
      return (
        (c = c || g(a, null))
          ? ((a = c.getPropertyValue(b.replace(h, "-$1").toLowerCase())),
            (e = a || c.length ? a : c[b]))
          : a.currentStyle && ((c = a.currentStyle), (e = c[b])),
        d ? e : parseInt(e, 10) || 0
      );
    },
    j = function (a) {
      return a.length &&
        a[0] &&
        ((a[0].nodeType && a[0].style && !a.nodeType) ||
          (a[0].length && a[0][0]))
        ? !0
        : !1;
    },
    k = function (a) {
      var b,
        c,
        d,
        e = [],
        f = a.length;
      for (b = 0; f > b; b++)
        if (((c = a[b]), j(c)))
          for (d = c.length, d = 0; d < c.length; d++) e.push(c[d]);
        else e.push(c);
      return e;
    },
    l = /(?:\r|\n|\t\t)/g,
    m = /(?:\s\s+)/g,
    n = 55296,
    o = 56319,
    p = 56320,
    q = 127462,
    r = 127487,
    s = 127995,
    t = 127999,
    u = function (a) {
      return ((a.charCodeAt(0) - n) << 10) + (a.charCodeAt(1) - p) + 65536;
    },
    v = f.all && !f.addEventListener,
    w =
      " style='position:relative;display:inline-block;" +
      (v ? "*display:inline;*zoom:1;'" : "'"),
    x = function (a, b) {
      a = a || "";
      var c = -1 !== a.indexOf("++"),
        d = 1;
      return (
        c && (a = a.split("++").join("")),
        function () {
          return (
            "<" + b + w + (a ? " class='" + a + (c ? d++ : "") + "'>" : ">")
          );
        }
      );
    },
    y = (d.SplitText = b.SplitText = function (a, b) {
      if (("string" == typeof a && (a = y.selector(a)), !a))
        throw "cannot split a null element.";
      (this.elements = j(a) ? k(a) : [a]),
        (this.chars = []),
        (this.words = []),
        (this.lines = []),
        (this._originals = []),
        (this.vars = b || {}),
        this.split(b);
    }),
    z = function (a, b, c) {
      var d = a.nodeType;
      if (1 === d || 9 === d || 11 === d)
        for (a = a.firstChild; a; a = a.nextSibling) z(a, b, c);
      else (3 === d || 4 === d) && (a.nodeValue = a.nodeValue.split(b).join(c));
    },
    A = function (a, b) {
      for (var c = b.length; --c > -1; ) a.push(b[c]);
    },
    B = function (a) {
      var b,
        c = [],
        d = a.length;
      for (b = 0; b !== d; c.push(a[b++]));
      return c;
    },
    C = function (a, b, c) {
      for (var d; a && a !== b; ) {
        if ((d = a._next || a.nextSibling))
          return d.textContent.charAt(0) === c;
        a = a.parentNode || a._parent;
      }
      return !1;
    },
    D = function (a) {
      var b,
        c,
        d = B(a.childNodes),
        e = d.length;
      for (b = 0; e > b; b++)
        (c = d[b]),
          c._isSplit
            ? D(c)
            : (b && 3 === c.previousSibling.nodeType
                ? (c.previousSibling.nodeValue +=
                    3 === c.nodeType ? c.nodeValue : c.firstChild.nodeValue)
                : 3 !== c.nodeType && a.insertBefore(c.firstChild, c),
              a.removeChild(c));
    },
    E = function (a, b, c, d, e, h, j) {
      var k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u,
        v,
        w = g(a),
        x = i(a, "paddingLeft", w),
        y = -999,
        B = i(a, "borderBottomWidth", w) + i(a, "borderTopWidth", w),
        E = i(a, "borderLeftWidth", w) + i(a, "borderRightWidth", w),
        F = i(a, "paddingTop", w) + i(a, "paddingBottom", w),
        G = i(a, "paddingLeft", w) + i(a, "paddingRight", w),
        H = 0.2 * i(a, "fontSize"),
        I = i(a, "textAlign", w, !0),
        J = [],
        K = [],
        L = [],
        M = b.wordDelimiter || " ",
        N = b.span ? "span" : "div",
        O = b.type || b.split || "chars,words,lines",
        P = e && -1 !== O.indexOf("lines") ? [] : null,
        Q = -1 !== O.indexOf("words"),
        R = -1 !== O.indexOf("chars"),
        S = "absolute" === b.position || b.absolute === !0,
        T = b.linesClass,
        U = -1 !== (T || "").indexOf("++"),
        V = [];
      for (
        P &&
          1 === a.children.length &&
          a.children[0]._isSplit &&
          (a = a.children[0]),
          U && (T = T.split("++").join("")),
          l = a.getElementsByTagName("*"),
          m = l.length,
          o = [],
          k = 0;
        m > k;
        k++
      )
        o[k] = l[k];
      if (P || S)
        for (k = 0; m > k; k++)
          (n = o[k]),
            (p = n.parentNode === a),
            (p || S || (R && !Q)) &&
              ((v = n.offsetTop),
              P &&
                p &&
                Math.abs(v - y) > H &&
                "BR" !== n.nodeName &&
                ((q = []), P.push(q), (y = v)),
              S &&
                ((n._x = n.offsetLeft),
                (n._y = v),
                (n._w = n.offsetWidth),
                (n._h = n.offsetHeight)),
              P &&
                (((n._isSplit && p) ||
                  (!R && p) ||
                  (Q && p) ||
                  (!Q &&
                    n.parentNode.parentNode === a &&
                    !n.parentNode._isSplit)) &&
                  (q.push(n), (n._x -= x), C(n, a, M) && (n._wordEnd = !0)),
                "BR" === n.nodeName &&
                  n.nextSibling &&
                  "BR" === n.nextSibling.nodeName &&
                  P.push([])));
      for (k = 0; m > k; k++)
        (n = o[k]),
          (p = n.parentNode === a),
          "BR" !== n.nodeName
            ? (S &&
                ((s = n.style),
                Q ||
                  p ||
                  ((n._x += n.parentNode._x), (n._y += n.parentNode._y)),
                (s.left = n._x + "px"),
                (s.top = n._y + "px"),
                (s.position = "absolute"),
                (s.display = "block"),
                (s.width = n._w + 1 + "px"),
                (s.height = n._h + "px")),
              !Q && R
                ? n._isSplit
                  ? ((n._next = n.nextSibling), n.parentNode.appendChild(n))
                  : n.parentNode._isSplit
                  ? ((n._parent = n.parentNode),
                    !n.previousSibling &&
                      n.firstChild &&
                      (n.firstChild._isFirst = !0),
                    n.nextSibling &&
                      " " === n.nextSibling.textContent &&
                      !n.nextSibling.nextSibling &&
                      V.push(n.nextSibling),
                    (n._next =
                      n.nextSibling && n.nextSibling._isFirst
                        ? null
                        : n.nextSibling),
                    n.parentNode.removeChild(n),
                    o.splice(k--, 1),
                    m--)
                  : p ||
                    ((v = !n.nextSibling && C(n.parentNode, a, M)),
                    n.parentNode._parent && n.parentNode._parent.appendChild(n),
                    v && n.parentNode.appendChild(f.createTextNode(" ")),
                    b.span && (n.style.display = "inline"),
                    J.push(n))
                : n.parentNode._isSplit && !n._isSplit && "" !== n.innerHTML
                ? K.push(n)
                : R &&
                  !n._isSplit &&
                  (b.span && (n.style.display = "inline"), J.push(n)))
            : P || S
            ? (n.parentNode && n.parentNode.removeChild(n),
              o.splice(k--, 1),
              m--)
            : Q || a.appendChild(n);
      for (k = V.length; --k > -1; ) V[k].parentNode.removeChild(V[k]);
      if (P) {
        for (
          S &&
            ((t = f.createElement(N)),
            a.appendChild(t),
            (u = t.offsetWidth + "px"),
            (v = t.offsetParent === a ? 0 : a.offsetLeft),
            a.removeChild(t)),
            s = a.style.cssText,
            a.style.cssText = "display:none;";
          a.firstChild;

        )
          a.removeChild(a.firstChild);
        for (r = " " === M && (!S || (!Q && !R)), k = 0; k < P.length; k++) {
          for (
            q = P[k],
              t = f.createElement(N),
              t.style.cssText =
                "display:block;text-align:" +
                I +
                ";position:" +
                (S ? "absolute;" : "relative;"),
              T && (t.className = T + (U ? k + 1 : "")),
              L.push(t),
              m = q.length,
              l = 0;
            m > l;
            l++
          )
            "BR" !== q[l].nodeName &&
              ((n = q[l]),
              t.appendChild(n),
              r && n._wordEnd && t.appendChild(f.createTextNode(" ")),
              S &&
                (0 === l &&
                  ((t.style.top = n._y + "px"), (t.style.left = x + v + "px")),
                (n.style.top = "0px"),
                v && (n.style.left = n._x - v + "px")));
          0 === m
            ? (t.innerHTML = "&nbsp;")
            : Q || R || (D(t), z(t, String.fromCharCode(160), " ")),
            S && ((t.style.width = u), (t.style.height = n._h + "px")),
            a.appendChild(t);
        }
        a.style.cssText = s;
      }
      S &&
        (j > a.clientHeight &&
          ((a.style.height = j - F + "px"),
          a.clientHeight < j && (a.style.height = j + B + "px")),
        h > a.clientWidth &&
          ((a.style.width = h - G + "px"),
          a.clientWidth < h && (a.style.width = h + E + "px"))),
        A(c, J),
        A(d, K),
        A(e, L);
    },
    F = function (a, b, c, d) {
      var g,
        h,
        i,
        j,
        k,
        p,
        v,
        w,
        x,
        y = b.span ? "span" : "div",
        A = b.type || b.split || "chars,words,lines",
        B = (-1 !== A.indexOf("words"), -1 !== A.indexOf("chars")),
        C = "absolute" === b.position || b.absolute === !0,
        D = b.wordDelimiter || " ",
        E = " " !== D ? "" : C ? "&#173; " : " ",
        F = b.span ? "</span>" : "</div>",
        G = !0,
        H = f.createElement("div"),
        I = a.parentNode;
      for (
        I.insertBefore(H, a),
          H.textContent = a.nodeValue,
          I.removeChild(a),
          a = H,
          g = e(a),
          v = -1 !== g.indexOf("<"),
          b.reduceWhiteSpace !== !1 && (g = g.replace(m, " ").replace(l, "")),
          v && (g = g.split("<").join("{{LT}}")),
          k = g.length,
          h = (" " === g.charAt(0) ? E : "") + c(),
          i = 0;
        k > i;
        i++
      )
        if (((p = g.charAt(i)), p === D && g.charAt(i - 1) !== D && i)) {
          for (h += G ? F : "", G = !1; g.charAt(i + 1) === D; ) (h += E), i++;
          i === k - 1
            ? (h += E)
            : ")" !== g.charAt(i + 1) && ((h += E + c()), (G = !0));
        } else
          "{" === p && "{{LT}}" === g.substr(i, 6)
            ? ((h += B ? d() + "{{LT}}</" + y + ">" : "{{LT}}"), (i += 5))
            : (p.charCodeAt(0) >= n && p.charCodeAt(0) <= o) ||
              (g.charCodeAt(i + 1) >= 65024 && g.charCodeAt(i + 1) <= 65039)
            ? ((w = u(g.substr(i, 2))),
              (x = u(g.substr(i + 2, 2))),
              (j =
                (w >= q && r >= w && x >= q && r >= x) || (x >= s && t >= x)
                  ? 4
                  : 2),
              (h +=
                B && " " !== p
                  ? d() + g.substr(i, j) + "</" + y + ">"
                  : g.substr(i, j)),
              (i += j - 1))
            : (h += B && " " !== p ? d() + p + "</" + y + ">" : p);
      (a.outerHTML = h + (G ? F : "")), v && z(I, "{{LT}}", "<");
    },
    G = function (a, b, c, d) {
      var e,
        f,
        g = B(a.childNodes),
        h = g.length,
        j = "absolute" === b.position || b.absolute === !0;
      if (3 !== a.nodeType || h > 1) {
        for (b.absolute = !1, e = 0; h > e; e++)
          (f = g[e]),
            (3 !== f.nodeType || /\S+/.test(f.nodeValue)) &&
              (j &&
                3 !== f.nodeType &&
                "inline" === i(f, "display", null, !0) &&
                ((f.style.display = "inline-block"),
                (f.style.position = "relative")),
              (f._isSplit = !0),
              G(f, b, c, d));
        return (b.absolute = j), void (a._isSplit = !0);
      }
      F(a, b, c, d);
    },
    H = y.prototype;
  (H.split = function (a) {
    this.isSplit && this.revert(),
      (this.vars = a = a || this.vars),
      (this._originals.length = this.chars.length = this.words.length = this.lines.length = 0);
    for (
      var b,
        c,
        d,
        e = this.elements.length,
        f = a.span ? "span" : "div",
        g =
          ("absolute" === a.position || a.absolute === !0, x(a.wordsClass, f)),
        h = x(a.charsClass, f);
      --e > -1;

    )
      (d = this.elements[e]),
        (this._originals[e] = d.innerHTML),
        (b = d.clientHeight),
        (c = d.clientWidth),
        G(d, a, g, h),
        E(d, a, this.chars, this.words, this.lines, c, b);
    return (
      this.chars.reverse(),
      this.words.reverse(),
      this.lines.reverse(),
      (this.isSplit = !0),
      this
    );
  }),
    (H.revert = function () {
      if (!this._originals) throw "revert() call wasn't scoped properly.";
      for (var a = this._originals.length; --a > -1; )
        this.elements[a].innerHTML = this._originals[a];
      return (
        (this.chars = []),
        (this.words = []),
        (this.lines = []),
        (this.isSplit = !1),
        this
      );
    }),
    (y.selector =
      a.$ ||
      a.jQuery ||
      function (b) {
        var c = a.$ || a.jQuery;
        return c
          ? ((y.selector = c), c(b))
          : "undefined" == typeof document
          ? b
          : document.querySelectorAll
          ? document.querySelectorAll(b)
          : document.getElementById("#" === b.charAt(0) ? b.substr(1) : b);
      }),
    (y.version = "0.5.6");
})(_gsScope),
  (function (a) {
    "use strict";
    var b = function () {
      return (_gsScope.GreenSockGlobals || _gsScope)[a];
    };
    "function" == typeof define && define.amd
      ? define([], b)
      : "undefined" != typeof module &&
        module.exports &&
        (module.exports = b());
  })("SplitText");

/*!
 * isMobile.js v0.4.1
 *
 * A simple library to detect Apple phones and tablets,
 * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
 * and any kind of seven inch device, via user agent sniffing.
 *
 * @author: Kai Mallea (kmallea@gmail.com)
 *
 * @license: http://creativecommons.org/publicdomain/zero/1.0/
 */
!(function (a) {
  var b = /iPhone/i,
    c = /iPod/i,
    d = /iPad/i,
    e = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
    f = /Android/i,
    g = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
    h = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
    i = /Windows Phone/i,
    j = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
    k = /BlackBerry/i,
    l = /BB10/i,
    m = /Opera Mini/i,
    n = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
    o = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
    p = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
    q = function (a, b) {
      return a.test(b);
    },
    r = function (a) {
      var r = a || navigator.userAgent || "",
        s = r.split("[FBAN");
      if (
        ("undefined" != typeof s[1] && (r = s[0]),
        (s = r.split("Twitter")),
        "undefined" != typeof s[1] && (r = s[0]),
        (this.apple = {
          phone: q(b, r),
          ipod: q(c, r),
          tablet: !q(b, r) && q(d, r),
          device: q(b, r) || q(c, r) || q(d, r),
        }),
        (this.amazon = {
          phone: q(g, r),
          tablet: !q(g, r) && q(h, r),
          device: q(g, r) || q(h, r),
        }),
        (this.android = {
          phone: q(g, r) || q(e, r),
          tablet: !q(g, r) && !q(e, r) && (q(h, r) || q(f, r)),
          device: q(g, r) || q(h, r) || q(e, r) || q(f, r),
        }),
        (this.windows = {
          phone: q(i, r),
          tablet: q(j, r),
          device: q(i, r) || q(j, r),
        }),
        (this.other = {
          blackberry: q(k, r),
          blackberry10: q(l, r),
          opera: q(m, r),
          firefox: q(o, r),
          chrome: q(n, r),
          device: q(k, r) || q(l, r) || q(m, r) || q(o, r) || q(n, r),
        }),
        (this.seven_inch = q(p, r)),
        (this.any =
          this.apple.device ||
          this.android.device ||
          this.windows.device ||
          this.other.device ||
          this.seven_inch),
        (this.phone =
          this.apple.phone || this.android.phone || this.windows.phone),
        (this.tablet =
          this.apple.tablet || this.android.tablet || this.windows.tablet),
        "undefined" == typeof window)
      )
        return this;
    },
    s = function () {
      var a = new r();
      return (a.Class = r), a;
    };
  "undefined" != typeof module && module.exports && "undefined" == typeof window
    ? (module.exports = r)
    : "undefined" != typeof module &&
      module.exports &&
      "undefined" != typeof window
    ? (module.exports = s())
    : "function" == typeof define && define.amd
    ? define("isMobile", [], (a.isMobile = s()))
    : (a.isMobile = s());
})(this);

/*!
 * The Final Countdown for jQuery v2.2.0 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2016 Edson Hilios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
!(function (a) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery);
})(function (a) {
  "use strict";
  function b(a) {
    if (a instanceof Date) return a;
    if (String(a).match(g))
      return (
        String(a).match(/^[0-9]*$/) && (a = Number(a)),
        String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")),
        new Date(a)
      );
    throw new Error("Couldn't cast `" + a + "` to a date object.");
  }
  function c(a) {
    var b = a.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    return new RegExp(b);
  }
  function d(a) {
    return function (b) {
      var d = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
      if (d)
        for (var f = 0, g = d.length; f < g; ++f) {
          var h = d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
            j = c(h[0]),
            k = h[1] || "",
            l = h[3] || "",
            m = null;
          (h = h[2]),
            i.hasOwnProperty(h) && ((m = i[h]), (m = Number(a[m]))),
            null !== m &&
              ("!" === k && (m = e(l, m)),
              "" === k && m < 10 && (m = "0" + m.toString()),
              (b = b.replace(j, m.toString())));
        }
      return (b = b.replace(/%%/, "%"));
    };
  }
  function e(a, b) {
    var c = "s",
      d = "";
    return (
      a &&
        ((a = a.replace(/(:|;|\s)/gi, "").split(/\,/)),
        1 === a.length ? (c = a[0]) : ((d = a[0]), (c = a[1]))),
      Math.abs(b) > 1 ? c : d
    );
  }
  var f = [],
    g = [],
    h = { precision: 100, elapse: !1, defer: !1 };
  g.push(/^[0-9]*$/.source),
    g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
    g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
    (g = new RegExp(g.join("|")));
  var i = {
      Y: "years",
      m: "months",
      n: "daysToMonth",
      d: "daysToWeek",
      w: "weeks",
      W: "weeksToMonth",
      H: "hours",
      M: "minutes",
      S: "seconds",
      D: "totalDays",
      I: "totalHours",
      N: "totalMinutes",
      T: "totalSeconds",
    },
    j = function (b, c, d) {
      (this.el = b),
        (this.$el = a(b)),
        (this.interval = null),
        (this.offset = {}),
        (this.options = a.extend({}, h)),
        (this.instanceNumber = f.length),
        f.push(this),
        this.$el.data("countdown-instance", this.instanceNumber),
        d &&
          ("function" == typeof d
            ? (this.$el.on("update.countdown", d),
              this.$el.on("stoped.countdown", d),
              this.$el.on("finish.countdown", d))
            : (this.options = a.extend({}, h, d))),
        this.setFinalDate(c),
        this.options.defer === !1 && this.start();
    };
  a.extend(j.prototype, {
    start: function () {
      null !== this.interval && clearInterval(this.interval);
      var a = this;
      this.update(),
        (this.interval = setInterval(function () {
          a.update.call(a);
        }, this.options.precision));
    },
    stop: function () {
      clearInterval(this.interval),
        (this.interval = null),
        this.dispatchEvent("stoped");
    },
    toggle: function () {
      this.interval ? this.stop() : this.start();
    },
    pause: function () {
      this.stop();
    },
    resume: function () {
      this.start();
    },
    remove: function () {
      this.stop.call(this),
        (f[this.instanceNumber] = null),
        delete this.$el.data().countdownInstance;
    },
    setFinalDate: function (a) {
      this.finalDate = b(a);
    },
    update: function () {
      if (0 === this.$el.closest("html").length) return void this.remove();
      var b,
        c = void 0 !== a._data(this.el, "events"),
        d = new Date();
      (b = this.finalDate.getTime() - d.getTime()),
        (b = Math.ceil(b / 1e3)),
        (b = !this.options.elapse && b < 0 ? 0 : Math.abs(b)),
        this.totalSecsLeft !== b &&
          c &&
          ((this.totalSecsLeft = b),
          (this.elapsed = d >= this.finalDate),
          (this.offset = {
            seconds: this.totalSecsLeft % 60,
            minutes: Math.floor(this.totalSecsLeft / 60) % 60,
            hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
            days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
            daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
            daysToMonth: Math.floor(
              (this.totalSecsLeft / 60 / 60 / 24) % 30.4368
            ),
            weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
            weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
            months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
            years: Math.abs(this.finalDate.getFullYear() - d.getFullYear()),
            totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
            totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
            totalMinutes: Math.floor(this.totalSecsLeft / 60),
            totalSeconds: this.totalSecsLeft,
          }),
          this.options.elapse || 0 !== this.totalSecsLeft
            ? this.dispatchEvent("update")
            : (this.stop(), this.dispatchEvent("finish")));
    },
    dispatchEvent: function (b) {
      var c = a.Event(b + ".countdown");
      (c.finalDate = this.finalDate),
        (c.elapsed = this.elapsed),
        (c.offset = a.extend({}, this.offset)),
        (c.strftime = d(this.offset)),
        this.$el.trigger(c);
    },
  }),
    (a.fn.countdown = function () {
      var b = Array.prototype.slice.call(arguments, 0);
      return this.each(function () {
        var c = a(this).data("countdown-instance");
        if (void 0 !== c) {
          var d = f[c],
            e = b[0];
          j.prototype.hasOwnProperty(e)
            ? d[e].apply(d, b.slice(1))
            : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)
            ? (d.setFinalDate.call(d, e), d.start())
            : a.error(
                "Method %s does not exist on jQuery.countdown".replace(
                  /\%s/gi,
                  e
                )
              );
        } else new j(this, b[0], b[1]);
      });
    });
});

/*!
 * imagesLoaded PACKAGED v4.1.3
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!(function (e, t) {
  "function" == typeof define && define.amd
    ? define("ev-emitter/ev-emitter", t)
    : "object" == typeof module && module.exports
    ? (module.exports = t())
    : (e.EvEmitter = t());
})("undefined" != typeof window ? window : this, function () {
  function e() {}
  var t = e.prototype;
  return (
    (t.on = function (e, t) {
      if (e && t) {
        var i = (this._events = this._events || {}),
          n = (i[e] = i[e] || []);
        return -1 == n.indexOf(t) && n.push(t), this;
      }
    }),
    (t.once = function (e, t) {
      if (e && t) {
        this.on(e, t);
        var i = (this._onceEvents = this._onceEvents || {}),
          n = (i[e] = i[e] || {});
        return (n[t] = !0), this;
      }
    }),
    (t.off = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        var n = i.indexOf(t);
        return -1 != n && i.splice(n, 1), this;
      }
    }),
    (t.emitEvent = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        var n = 0,
          o = i[n];
        t = t || [];
        for (var r = this._onceEvents && this._onceEvents[e]; o; ) {
          var s = r && r[o];
          s && (this.off(e, o), delete r[o]),
            o.apply(this, t),
            (n += s ? 0 : 1),
            (o = i[n]);
        }
        return this;
      }
    }),
    (t.allOff = t.removeAllListeners = function () {
      delete this._events, delete this._onceEvents;
    }),
    e
  );
}),
  (function (e, t) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["ev-emitter/ev-emitter"], function (i) {
          return t(e, i);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = t(e, require("ev-emitter")))
      : (e.imagesLoaded = t(e, e.EvEmitter));
  })("undefined" != typeof window ? window : this, function (e, t) {
    function i(e, t) {
      for (var i in t) e[i] = t[i];
      return e;
    }
    function n(e) {
      var t = [];
      if (Array.isArray(e)) t = e;
      else if ("number" == typeof e.length)
        for (var i = 0; i < e.length; i++) t.push(e[i]);
      else t.push(e);
      return t;
    }
    function o(e, t, r) {
      return this instanceof o
        ? ("string" == typeof e && (e = document.querySelectorAll(e)),
          (this.elements = n(e)),
          (this.options = i({}, this.options)),
          "function" == typeof t ? (r = t) : i(this.options, t),
          r && this.on("always", r),
          this.getImages(),
          h && (this.jqDeferred = new h.Deferred()),
          void setTimeout(
            function () {
              this.check();
            }.bind(this)
          ))
        : new o(e, t, r);
    }
    function r(e) {
      this.img = e;
    }
    function s(e, t) {
      (this.url = e), (this.element = t), (this.img = new Image());
    }
    var h = e.jQuery,
      a = e.console;
    (o.prototype = Object.create(t.prototype)),
      (o.prototype.options = {}),
      (o.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (o.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e),
          this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && d[t]) {
          for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var o = i[n];
            this.addImage(o);
          }
          if ("string" == typeof this.options.background) {
            var r = e.querySelectorAll(this.options.background);
            for (n = 0; n < r.length; n++) {
              var s = r[n];
              this.addElementBackgroundImages(s);
            }
          }
        }
      });
    var d = { 1: !0, 9: !0, 11: !0 };
    return (
      (o.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage);
            null !== n;

          ) {
            var o = n && n[2];
            o && this.addBackground(o, e), (n = i.exec(t.backgroundImage));
          }
      }),
      (o.prototype.addImage = function (e) {
        var t = new r(e);
        this.images.push(t);
      }),
      (o.prototype.addBackground = function (e, t) {
        var i = new s(e, t);
        this.images.push(i);
      }),
      (o.prototype.check = function () {
        function e(e, i, n) {
          setTimeout(function () {
            t.progress(e, i, n);
          });
        }
        var t = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (t) {
                t.once("progress", e), t.check();
              })
            : void this.complete()
        );
      }),
      (o.prototype.progress = function (e, t, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
          this.emitEvent("progress", [this, e, t]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, e),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && a && a.log("progress: " + i, e, t);
      }),
      (o.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(e, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var t = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[t](this);
        }
      }),
      (r.prototype = Object.create(t.prototype)),
      (r.prototype.check = function () {
        var e = this.getIsImageComplete();
        return e
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (r.prototype.getIsImageComplete = function () {
        return this.img.complete && void 0 !== this.img.naturalWidth;
      }),
      (r.prototype.confirm = function (e, t) {
        (this.isLoaded = e), this.emitEvent("progress", [this, this.img, t]);
      }),
      (r.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
      }),
      (r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype = Object.create(r.prototype)),
      (s.prototype.check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url);
        var e = this.getIsImageComplete();
        e &&
          (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
          this.unbindEvents());
      }),
      (s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype.confirm = function (e, t) {
        (this.isLoaded = e),
          this.emitEvent("progress", [this, this.element, t]);
      }),
      (o.makeJQueryPlugin = function (t) {
        (t = t || e.jQuery),
          t &&
            ((h = t),
            (h.fn.imagesLoaded = function (e, t) {
              var i = new o(this, e, t);
              return i.jqDeferred.promise(h(this));
            }));
      }),
      o.makeJQueryPlugin(),
      o
    );
  });
