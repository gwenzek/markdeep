/**
 See http://casual-effects.com/markdeep for @license and documentation.

 markdeep.min.js version 0.12
 Copyright 2015-2016, Morgan McGuire
 All rights reserved.
 (BSD 2-clause license)

 highlight.min.js 8.8.0 from https://highlightjs.org/
 Copyright 2006, Ivan Sagalaev
 All rights reserved.
 (BSD 3-clause license)
*/
! function() {
    "use strict";

    function e(e, t, r) {
        return "<" + e + (r ? " " + r : "") + ">" + t + "</" + e + ">"
    }

    function t(e) {
        var t = document.createElement("canvas"),
            r = t.getContext("2d");
        return r.font = "10pt " + e, r.measureText("M").width
    }

    function r(e) {
        return window.markdeepOptions && void 0 !== window.markdeepOptions[e] ? window.markdeepOptions[e] : void 0 !== U[e] ? U[e] : void 0
    }

    function n(e) {
        return r("lang").keyword[e] || e
    }

    function a(e) {
        return (e + "").rp(/&/g, "&amp;").rp(/</g, "&lt;").rp(/>/g, "&gt;").rp(/"/g, "&quot;")
    }

    function i(e) {
        return e.rp(/&lt;/g, "<").rp(/&gt;/g, ">").rp(/&quot;/g, '"').rp(/&#39;/g, "'").rp(/&ndash;/g, "--").rp(/&mdash;/g, "---").rp(/&amp;/g, "&")
    }

    function s(e) {
        return e.rp(/<.*?>/g, "")
    }

    function o(e) {
        return encodeURI(e.rp(/\s/g, "").toLowerCase())
    }

    function c() {
        for (var t = "", r = 1; 6 >= r; ++r) {
            t += "h" + r + "::before {\ncontent:";
            for (var n = 1; r >= n; ++n) t += "counter(h" + n + ') "' + (r > n ? "." : " ") + '"';
            t += ";\ncounter-increment: h" + r + ";margin-right:10px}"
        }
        return e("style", t)
    }

    function l(e, t) {
        var r = e.innerHTML;
        return r = r.rp(/(?:<style class="fallback">[\s\S]*?<\/style>[\s\S]*)<\/\S+@\S+\.\S+?>/gim, ""), r = r.rp(/<\/h?ttps?:.*>/gi, ""), r = r.rp(/<(https?): (.*?)>/gi, function(e, t, r) {
            var n = "<" + t + "://" + r.rp(/=""\s/g, "/");
            return '=""' === n.ss(n.length - 3) && (n = n.ss(0, n.length - 3)), n = n.rp(/"/g, ""), n + ">"
        }), r = r.rp(/<style class=["']fallback["']>.*?<\/style>/gim, ""), r = i(r)
    }

    function u(e) {
        function t() {
            l = e.indexOf("\n", i) + 1, u = u || /\S/.test(e.ss(i, i + s)), d = d || /\S/.test(e.ss(i + o + 1, l))
        }
        for (var r = {
                h: e,
                j: "",
                m: "",
                o: ""
            }, n = e.indexOf(S); n >= 0; n = e.indexOf(S, n + S.length)) {
            var a, i = W(0, e.lastIndexOf("\n", n)) + 1,
                s = n - i;
            for (a = n + S.length; e[a] === $; ++a);
            var o = a - i - 1,
                c = {
                    h: e.ss(0, i),
                    j: "",
                    m: "center",
                    o: e.ss(i, n).rp(/[ \t]+$/, " ")
                },
                l = 0,
                u = !1,
                d = !1;
            t();
            for (var p = !0, h = a; p;) {
                if (i = l, t(), 0 === i) return r;
                if (u ? c.m = "floatright" : d && (c.m = "floatleft"), e[i + s] === $ && e[i + o] === $) {
                    for (var f = s; o > f && e[i + f] === $; ++f);
                    var g = i + s,
                        m = i + o;
                    if (c.o += e.ss(h, g).rp(/^[ \t]*[ \t]/, " ").rp(/[ \t][ \t]*$/, " "), f === o) return c.o += e.ss(i + o + 1), c;
                    c.j += e.ss(g + 1, m) + "\n", h = m + 1
                } else p = !1
            }
        }
        return r
    }

    function d(e, t, r, n) {
        var a = t.source,
            i = "[^ \\t\\n" + a + "]",
            s = "(" + a + ")(" + i + ".*?(\\n.+?)*?)" + a + "(?![A-Za-z0-9])";
        return e.rp(RegExp(s, "g"), "<" + r + (n ? " " + n : "") + ">$2</" + r + ">")
    }

    function p(t, r) {
        function n(e) {
            return e.trim().rp(/^\||\|$/g, "")
        }
        var a = /(?:\n\|?[ \t\S]+?(?:\|[ \t\S]+?)+\|?(?=\n))/.source,
            i = /\n\|? *\:?-+\:?(?: *\| *\:?-+\:?)+ *\|?(?=\n)/.source,
            s = /\n[ \t]*\[[^\n\|]+\][ \t]*(?=\n)/.source,
            o = RegExp(a + i + a + "+(" + s + ")?", "g");
        return t = t.rp(o, function(t) {
            var a = t.split("\n"),
                i = "",
                s = "" === a[0] ? 1 : 0,
                o = a[a.length - 1].trim();
            o.length > 3 && "[" === o[0] && "]" === o[o.length - 1] ? (a.pop(), o = o.ss(1, o.length - 1)) : o = void 0;
            var c = [];
            n(a[s + 1]).rp(/:?-+:?/g, function(e) {
                var t = ":" === e[0],
                    n = ":" === e[e.length - 1];
                c.push(r(' style="text-align:' + (t && n ? "center" : n ? "right" : "left") + '"'))
            });
            for (var l = "th", u = s; a.length > u; ++u) {
                var d = n(a[u].trim());
                i += "<tr>";
                var p = 0;
                i += "<" + l + c[0] + ">" + d.rp(/\|/g, function() {
                    return ++p, "</" + l + "><" + l + c[p] + ">"
                }) + "</" + l + ">", i += "</tr>\n", u == s && (++u, l = "td")
            }
            return i = e("table", i, r('class="table"')), o && (i = "<div " + r('class="tablecaption"') + ">" + o + "</div>" + i), i
        })
    }

    function h(e, t) {
        for (var r = /^\s*\n/.source, n = /[:,]\s*\n/.source, a = RegExp("(" + n + "|" + r + ")" + /((?:[ \t]*(?:\d+\.|-|\+|\*)(?:[ \t]+.+\n\n?)+)+)/.source, "gm"), i = !0, s = {
                "+": t('class="plus"'),
                "-": t('class="minus"'),
                "*": t('class="asterisk"')
            }, o = t('class="number"'); i;) i = !1, e = e.rp(a, function(e, t, r) {
            var n = t,
                a = [],
                c = {
                    p: -1
                };
            for (r.split("\n").forEach(function(e) {
                    var t = e.rp(/^\s*/, ""),
                        r = e.length - t.length,
                        l = s[t[0]],
                        u = !!l;
                    l = l || o;
                    var d = /^\d+\.[ \t]/.test(t);
                    if (c)
                        if (d || u) {
                            if (r !== c.p)
                                if (-1 !== c.p && c.p > r)
                                    for (; c && c.p > r;) a.pop(), n += "</li></" + c.tag + ">", c = a[a.length - 1];
                                else c = {
                                    p: r,
                                    tag: d ? "ol" : "ul",
                                    q: e.ss(0, r)
                                }, a.push(c), n += "<" + c.tag + ">";
                            else -1 !== c.p && (n += "</li>");
                            c ? n += "\n" + c.q + "<li " + l + ">" + t.rp(/^(\d+\.|-|\+|\*) /, "") : (n += "\n" + e, i = !0)
                        } else n += "\n" + c.q + e;
                    else n += "\n" + e
                }), c = a.pop(); c; c = a.pop()) n += "</li></" + c.tag + ">\n";
            return n
        });
        return e
    }

    function f(t, r) {
        var a = /^(?:[^\|<>\s-\+\*\d].*[12]\d{3}(?!\d).*?|(?:[12]\d{3}(?!\.).*\d.*?)|(?:\d{1,3}(?!\.).*[12]\d{3}(?!\d).*?))/.source,
            i = "(" + a + "):" + /[ \t]+([^ \t\n].*)\n/.source,
            s = /(?:[ \t]*\n)?((?:[ \t]+.+\n(?:[ \t]*\n){0,3})*)/.source,
            o = i + s,
            c = RegExp(o, "gm"),
            l = r('valign="top"'),
            u = r('style="width:100px;padding-right:15px" rowspan="2"'),
            d = r('style="padding-bottom:25px"'),
            p = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(n),
            h = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].map(n),
            f = h.join("|"),
            g = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(n);
        try {
            var m = 0;
            t = t.rp(RegExp("(" + o + "){2,}", "gm"), function(t) {
                ++m;
                var n = [];
                t.rp(c, function(t, a, i, s) {
                    var o = "",
                        c = "",
                        g = "",
                        b = a.match(RegExp("([0123]?\\d)\\D+([01]?\\d|" + f + ")\\D+([12]\\d{3})", "i"));
                    if (b) g = b[1], c = b[2], o = b[3];
                    else if (b = a.match(RegExp("([12]\\d{3})\\D+([01]?\\d|" + f + ")\\D+([0123]?\\d)", "i"))) g = b[3], c = b[2], o = b[1];
                    else {
                        if (b = a.match(RegExp("(" + f + ")\\D+([0123]?\\d)\\D+([12]\\d{3})", "i")), !b) throw "Could not parse date";
                        g = b[2], c = b[1], o = b[3]
                    }
                    a = g + " " + c + " " + o;
                    var v = parseInt(c) - 1;
                    isNaN(v) && (v = h.indexOf(c.toLowerCase()));
                    var y = new Date(parseInt(o), v, parseInt(g));
                    return a = p[y.getDay()] + "<br/>" + a, n.push({
                        date: y,
                        title: i,
                        text: e("tr", e("td", "<a " + r('name="schedule' + m + "_" + y.getFullYear() + "-" + (y.getMonth() + 1) + "-" + y.getDate() + '"') + "></a>" + a, u) + e("td", e("b", i)), l) + e("tr", e("td", "\n\n" + s, d), l)
                    }), ""
                }), n.sort(function(e, t) {
                    return e.date.getTime() - t.date.getTime()
                });
                var a = 864e5,
                    i = (n[n.length - 1].date.getTime() - n[0].date.getTime()) / a,
                    s = new Date;
                s = new Date(s.getFullYear(), s.getMonth(), s.getDate());
                var o = "";
                if (i > 14 && 16 > i / n.length) {
                    var b = r('colspan="2" width="14%" style="padding-top:5px;text-align:center;font-style:italic"'),
                        v = r('width="1px" height="30px" style="text-align:right;border:1px solid #EEE;border-right:none;"'),
                        y = r('width="1px" height="30px" style="color:#BBB;text-align:right;"'),
                        x = r('width="14%" style="border:1px solid #EEE;border-left:none;"'),
                        w = n[0].date,
                        N = 0;
                    w = new Date(w.getFullYear(), w.getMonth(), 1);
                    for (var k = function(e, t) {
                            return Math.abs(e.getTime() - t.getTime()) < a / 2
                        }; w.getTime() < n[n.length - 1].date.getTime();) {
                        for (o += "<table " + r('class="calendar"') + ">\n" + e("tr", e("th", g[w.getMonth()] + " " + w.getFullYear(), r('colspan="14"'))) + "<tr>", p.forEach(function(t) {
                                o += e("td", t, b)
                            }), o += "</tr>"; 0 !== new Date(w.getTime() + 432e5).getDay();) w = new Date(w.getTime() - a);
                        if (1 !== w.getDate())
                            for (o += "<tr " + l + ">"; 1 !== w.getDate();) o += "<td " + y + ">" + w.getDate() + "</td><td>&nbsp;</td>", w = new Date(w.getTime() + a);
                        do {
                            0 === w.getDay() && (o += "<tr " + l + ">");
                            var C = n[N],
                                _ = "";
                            k(w, s) && (_ = r(' class="today"')), C && k(C.date, w) ? (o += e("td", e("b", w.getDate()), v + _) + e("td", e("a", C.title, r('href="#schedule' + m + "_" + w.getFullYear() + "-" + (w.getMonth() + 1) + "-" + w.getDate() + '"')), x + _), ++N) : o += "<td " + v + _ + "></a>" + w.getDate() + "</td><td " + x + _ + "> &nbsp; </td>", 6 === w.getDay() && (o += "</tr>"), w = new Date(w.getTime() + a)
                        } while (w.getDate() > 1);
                        if (0 !== w.getDay()) {
                            for (; 0 !== w.getDay();) o += "<td " + y + ">" + w.getDate() + "</td><td>&nbsp</td>", w = new Date(w.getTime() + a);
                            o += "</tr>"
                        }
                        o += "</table><br/>\n", w = new Date(w.getFullYear(), w.getMonth(), 1)
                    }
                }
                return t = "", n.forEach(function(e) {
                    t += e.text
                }), o + e("table", t, r('class="schedule"')) + "\n\n"
            })
        } catch (b) {}
        return t
    }

    function g(t) {
        var r = /^.+\n:(?=[ \t])/.source,
            n = "(s*\n|[: 	].+\n)+";
        return t = t.rp(RegExp("(" + r + n + ")+", "gm"), function(t) {
            var r = "";
            return t.split("\n").forEach(function(e, t) {
                0 === e.trim().length ? r += "\n" : /\s/.test(e[0]) || ":" === e[0] ? (":" === e[0] && (e = " " + e.ss(1)), r += e + "\n") : (t > 0 && (r += "</dd>"), r += "<dt>\n" + e + "\n</dt>\n<dd>\n\n")
            }), e("dl", r + "</dd>")
        })
    }

    function m(t, r) {
        var n = "",
            a = "",
            i = [0],
            o = 0,
            c = 0,
            l = {};
        t = t.rp(/<h([1-6])>(.*?)<\/h\1>/gi, function(t, u, d) {
            u = parseInt(u), d = d.trim();
            for (var p = o; u > p; ++p) i[p] = 0;
            i.splice(u, o - u), o = u, ++i[o - 1];
            var h = i.join("."),
                f = "toc" + h;
            return l[s(d).trim().toLowerCase()] = h, 3 >= u && (n += Array(u).join("&nbsp;&nbsp;") + '<a href="#' + f + '" class="level' + u + '">' + h + "&nbsp; " + d + "</a><br/>\n", 1 === u ? a += ' &middot; <a href="#' + f + '">' + d + "</a>" : ++c), e("a", "", r('name="' + f + '"')) + t
        }), a.length > 0 && (a = a.ss(10));
        var u = i[0],
            d = u + c,
            p = t.regexIndexOf(/((<a\s+\S+><\/a>)\s*)*<h1>/i); - 1 === p && (p = 0);
        var h = '<div class="afterTitles"></div>',
            f = t.indexOf(h); - 1 === f ? f = 0 : f += h.length;
        var g = "";
        return 4 > d && 1 >= u || 2048 > t.length || (7 > u && 2.5 > d / u ? g = '<div class="shortTOC">' + a + "</div>" : -1 === p || p / 55 > d ? g = '<div class="mediumTOC"><center><b>Contents</b></center><p>' + n + "</p></div>" : (f = p, g = '<div class="longTOC"><div class="tocHeader">Contents</div><p>' + n + "</p></div>")), t = t.ss(0, f) + g + t.ss(f), [t, l]
    }

    function b(e) {
        return e.rp(/([\.\[\]\(\)\*\+\?\^\$\\\{\}\|])/g, "\\$1")
    }

    function v(e, t) {
        return e && t ? (e = e.match(/\n/g), t = t.match(/\n/g), e && e.length > 1 && t && t.length > 1) : !1
    }

    function y(t, r) {
        function i(e) {
            for (var t = (E.push(e) - 1).toString(j); A > t.length;) t = "0" + t;
            return M + t
        }

        function c(e) {
            var e = parseInt(e.ss(1), j);
            return E[e]
        }

        function l(e, t) {
            return i(t)
        }

        function y(e, t, r) {
            return t + i(r)
        }

        function x(t) {
            return function(r, n) {
                return "\n<a " + i('name="' + o(s(n)) + '"') + "></a>" + e("h" + t, n) + "\n\n"
            }
        }

        function w(t) {
            var r = u(t);
            if (r.j) {
                var n = /^\n*[ \t]*\[[^\n]+\][ \t]*(?=\n)/;
                r.o = r.o.rp(n, function(t) {
                    return t = t.trim(), t = t.ss(1, t.length - 1), e("center", e("div", t, i('class="imagecaption"')))
                });
                var a = k(r.j, r.m);
                return r.h + a + "\n" + w(r.o)
            }
            return t
        }
        var N = {},
            C = 0,
            _ = {},
            M = "\ue010",
            j = 36,
            E = [],
            A = 4,
            B = RegExp(M + "[0-9a-z]{" + A + "," + A + "}", "g");
        void 0 === r && (r = !0), void 0 !== t.innerHTML && (t = t.innerHTML), t = t.rp(/<script\s+type\s*=\s*['"]preformatted['"]\s*>([\s\S]*?)<\/script>/gi, "$1"), t = "\n\n" + t;
        var $ = function(r, n) {
            var a = RegExp("\n" + n + "{3,}.*\n([\\s\\S]+?)\n" + n + "{3,}\n([ 	]*\\[.*\\])?", "g");
            t = t.rp(a, function(t, n, a) {
                var s = "\n";
                a && (a = a.trim(), s += "<div " + i('class="listingcaption ' + r + '"') + ">" + a.ss(1, a.length - 1) + "</div>\n");
                var o = hljs.highlightAuto(n);
                return s + i(e("pre", e("code", o.value), 'class="listing ' + r + '"')) + "\n"
            })
        };
        $("tilde", "~"), $("backtick", "`"), t = t.rp(/(<code\b.*?<\/code>)/gi, l), t = w(t), t = t.rp(/<svg( .*?)?>([\s\S]*?)<\/svg>/gi, function(e, t, r) {
            return "<svg" + i(t) + ">" + i(r) + "</svg>"
        }), t = t.rp(/<style>([\s\S]*?)<\/style>/gi, function(t, r) {
            return e("style", i(r))
        }), t = t.rp(/<img\s+src=(["'])[\s\S]*?\1\s*>/gi, function(e, t) {
            return "<img " + i(e.ss(5, e.length - 1)) + ">"
        }), t = t.rp(/(`)(.+?(?:\n.+?)?)`(?!\d)/g, e("code", "$2")), t = t.rp(/(<code(?: .*?)?>)([\s\S]*?)<\/code>/gi, function(e, t, r) {
            return i(t + a(r) + "</code>")
        }), t = t.rp(/(<pre\b[\s\S]*?<\/pre>)/gi, l), t = t.rp(/(<\w[^ \n<>]*?[ \t]+)(.*?)(?=\/?>)/g, y), t = t.rp(/(\$\$[\s\S]+?\$\$)/g, l), t = t.rp(/((?:[^\w\d]))\$([ \t][^\$]+?[ \t])\$(?![\w\d])/g, "$1\\($2\\)"), t = t.rp(/((?:[^\w\d]))\$(\S(?:[^\$]*?\S(?!US))??)\$(?![\w\d])/g, "$1\\($2\\)"), t = t.rp(/(\\\([\s\S]+?\\\))/g, l), t = t.rp(/(\\begin\{equation\}[\s\S]*?\\end\{equation\})/g, l), t = t.rp(/(\\begin\{eqnarray\}[\s\S]*?\\end\{eqnarray\})/g, l), t = t.rp(/(\\begin\{equation\*\}[\s\S]*?\\end\{equation\*\})/g, l), t = t.rp(/(?:^|\n)(.+?)\n[ \t]*={3,}[ \t]*\n/g, x(1)), t = t.rp(/(?:^|\n)(.+?)\n[ \t]*-{3,}[ \t]*\n/g, x(2));
        for (var S = 6; S > 0; --S) t = t.rp(RegExp(/^[ \t]*/.source + "#{" + S + "," + S + "}(?:[ 	])([^\n#]+)#*[ 	]*\n", "gm"), x(S)), t = t.rp(RegExp(/^[ \t]*/.source + "\\(#{" + S + "," + S + "}\\)(?:[ 	])([^\n#]+)\\(?#*\\)?\\n[ 	]*\n", "gm"), e("div", "$1", i('class="nonumberh' + S + '"')));
        t = t.rp(/\n((?:_[ \t]*){3,}|(?:-[ \t]*){3,}|(?:\*[ \t]*){3,})\s*?\n/g, "\n<hr/>\n");
        var T = i('class="fancyquote"');
        t = t.rp(/\n>[ \t]*"(.*(?:\n>.*)*)"[ \t]*(?:\n>[ \t]*)?(\n>[ \t]{2,}\S.*)?\n/g, function(t, r, n) {
            return e("blockquote", e("span", r.rp(/\n>/g, "\n"), T) + (n ? e("span", n.rp(/\n>/g, "\n"), i('class="author"')) : ""), T)
        }), t = t.rp(/(?:\n>.*){2,}/g, function(t) {
            return e("blockquote", t.rp(/\n>/g, "\n"))
        }), t = t.rp(/\s*\[\^(.*?)\](?!:)/g, function(e, t) {
            return t = t.toLowerCase().trim(), t in N || (++C, N[t] = C), "<sup><a " + i('href="#endnote-' + t + '"') + ">" + N[t] + "</a></sup>"
        }), t = t.rp(/\[#(.*?)\](?!:)/g, function(e, t) {
            return t = t.trim(), "[<a " + i('href="#citation-' + t.toLowerCase() + '"') + ">" + t + "</a>]"
        }), t = t.rp(/\n\[#(.*?)\]:((?:.+?\n?)*)/g, function(e, t, r) {
            return t = t.trim(), "<div " + i('class="bib"') + ">[<a " + i('name="citation-' + t.toLowerCase() + '"') + "></a><b>" + t + "</b>] " + r + "</div>"
        }), t = p(t, i), t = t.rp(/^\[([^\^#].*?)\]:(.*?)$/gm, function(e, t, r) {
            return _[t.toLowerCase().trim()] = r.trim(), ""
        }), t = t.rp(/(?:<|(?!<)\b)(\S+@(\S+\.)+?\S{3,}?)(?:$|>|(?=<)|(?=\s)(?!>))/g, function(e, t) {
            return "<a " + i('href="mailto:' + t + '"') + ">" + t + "</a>"
        });
        var R = function(t, r, n) {
            n = n || "";
            var a, s;
            return /(.mp4|.m4v|.avi|.mpg|.mov)$/i.test(r) ? a = "<video " + i('class="markdeep" src="' + r + '"' + n + ' width="480px" controls="true"') + "/>" : (s = r.match(/^https:\/\/(?:www\.)?youtube.com\/\S*?v=([\w\d-]+)(&.*)?$/i)) ? a = "<iframe " + i('class="markdeep" src="https://www.youtube.com/embed/' + s[1] + '"' + n + ' width="480px" height="300px" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen') + "></iframe>" : (s = r.match(/^https:\/\/(?:www\.)?vimeo.com\/\S*?\/([\w\d-]+)$/i)) ? a = "<iframe " + i('class="markdeep" src="https://player.vimeo.com/video/' + s[1] + '"' + n + ' width="480px" height="300px" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen') + "></iframe>" : (a = "<img " + i('class="markdeep" src="' + r + '"' + n) + "/>", /\b(width|height)\b/i.test(n) && (a = e("a ", a, i('href="' + r + '" target="_blank"')))), a
        };
        t = t.rp(/\(http:\/\/g.gravizo.com\/g\?((?:[^\(\)]|\([^\(\)]*\))*)\)/gi, function(e, t) {
            return "(http://g.gravizo.com/g?" + encodeURIComponent(t) + ")"
        }), t = t.rp(/(^|[^!])\[([^\[\]]+?)\]\(([^\)]+?)\)/g, function(e, t, r, n) {
            return t + "<a " + i('href="' + n + '"') + ">" + r + "</a>"
        }), t = t.rp(/(^|[^!])\[[ \t]*?\]\(([^\)]+?)\)/g, function(e, t, r) {
            return t + "<a " + i('href="' + r + '"') + ">" + r + "</a>"
        }), t = t.rp(/(\s*)!\[\]\(([^\)\s]+)([^\)]*?)?\)(\s*)/g, function(t, r, n, a, i) {
            var s = R(t, n, a);
            return v(r, i) && (s = e("center", s)), r + s + i
        });
        for (var L = !0; L;) L = !1, t = t.rp(/(\s*)!\[([\s\S]+?)?\]\(([^\)\s]+)([^\)]*?)?\)(\s*)/, function(t, r, n, a, s, o) {
            L = !0;
            var c = "";
            s && (s = s.rp(/((?:max-)?width)\s*:\s*[^;'"]*/g, function(e, t) {
                return c = e + ";", t + ":100%"
            }), s = s.rp(/((?:max-)?width)\s*=\s*('\S+?'|"\S+?")/g, function(e, t, r) {
                return c = t + ":" + r.ss(1, r.length - 1) + ";", 'style="width:100%" '
            }));
            var l = R(t, a, s);
            return v(r, o) ? (r += "<center>", o = "</center>" + o) : c += "float:right;margin:4px 0px 0px 25px;", r + e("div", l + e("div", n, i('class="imagecaption"')), i('class="image" style="' + c + '"')) + o
        });
        t = d(t, /\*\*/, "strong", i('class="asterisk"')), t = d(t, /__/, "strong", i('class="underscore"')), t = d(t, /\*/, "em", i('class="asterisk"')), t = d(t, /_/, "em", i('class="underscore"')), t = t.rp(/\~\~([^~].*?)\~\~/g, e("del", "$1")), t = t.rp(/(^|[ \t->])(")(?=\w)/gm, "$1&ldquo;"), t = t.rp(/([A-Za-z\.,:;\?!=<])(")(?=$|\W)/gm, "$1&rdquo;"), t = t.rp(/(\s)==>(\s)/g, "$1&rarr;$2"), t = t.rp(/(\s)<==(\s)/g, "$1&larr;$2"), t = t.rp(/([^-!\:\|])---([^->\:\|])/g, "$1&mdash;$2"), t = t.rp(/([^-!\:\|])--([^->\:\|])/g, "$1&ndash;$2"), t = t.rp(/(\d+\s?)x(\s?\d+)/g, "$1&times;$2"), t = t.rp(/([\s\(\[<\|])-(\d)/g, "$1&minus;$2"), t = t.rp(/(\d) - (\d)/g, "$1 &minus; $2"), t = t.rp(/\^([-+]?\d+)\b/g, "<sup>$1</sup>"), t = f(t, i), t = g(t), t = h(t, i), t = t.rp(/(\d+?)[ \t-]degree(?:s?)/g, "$1&deg;"), t = t.rp(/\n[\s\n]*?\n/g, "\n\n</p><p>\n\n"), t = t.rp(/\[(.+?)\]\[(.*?)\]/g, function(e, t, r) {
            return r.trim() || (r = t), r = r.toLowerCase().trim(), "<a " + i('href="' + _[r] + '"') + ">" + t + "</a>"
        }), t = t.rp(/\n\[\^(.*?)\]:((?:.+?\n?)*)/g, function(e, t, r) {
            return t = t.toLowerCase().trim(), t in N ? "\n<div " + i('class="endnote"') + "><a " + i('name="endnote-' + t + '"') + "></a><sup>" + N[t] + "</sup> " + r + "</div>" : "\n"
        });
        var z = t.match(/<h([1-6])>(.*?)<\/h\1>/gi);
        z && z.forEach(function(e) {
            e = s(e.ss(4, e.length - 5)).trim();
            var r = "<a " + i('href="#' + o(e) + '"') + ">";
            t = t.rp(RegExp("(\\b" + b(e) + ")(?=\\s" + n("subsection") + "|\\s" + n("section") + ")", "gi"), r + "$1</a>")
        });
        var q = {},
            I = {};
        if (t = t.rp(RegExp(/($|>)\s*/.source + "(" + n("figure") + "|" + n("table") + "|" + n("listing") + "|" + n("diagram") + ")" + /\s+\[(.+?)\]:/.source, "gim"), function(t, r, n, a) {
                n = n.toLowerCase();
                var s = q[n] = (0 | q[n]) + 1,
                    a = n + "_" + o(a.toLowerCase().trim());
                return I[a] = s, r + e("a", "", i('name="' + a + '"')) + e("b", n[0].toUpperCase() + n.ss(1) + "&nbsp;" + s + ":", i('style="font-style:normal;"'))
            }), t = t.rp(/\b(figure|fig\.|table|tbl\.|listing|lst.)\s+\[(.+?)\]/gi, function(e, t, r) {
                var n = t.toLowerCase();
                switch (n) {
                    case "fig.":
                        n = "figure";
                        break;
                    case "tbl.":
                        n = "table";
                        break;
                    case "lst.":
                        n = "listing"
                }
                var r = n + "_" + o(r.toLowerCase().trim()),
                    a = I[r];
                return a ? "<a " + i('href="#' + r + '"') + ">" + t + "&nbsp;" + a + "</a>" : t + " ?"
            }), t = t.rp(/(?:<|(?!<)\b)(\w{3,6}:\/\/.+?)(?:$|>|(?=<)|(?=\s)(?!<))/g, function(e, t) {
                return "<a " + i('href="' + t + '" class="url"') + ">" + t + "</a>"
            }), !r) {
            var O = /^\s*(?:<\/p><p>\s*)<strong.*?>([^ \t\*].*?[^ \t\*])<\/strong>[ \t]*\n/.source,
                D = /([ {4,}\t][ \t]*\S.*\n)*/.source;
            t = t.rp(RegExp(O + D, "g"), function(t, r) {
                r = r.trim();
                var n = t.ss(t.indexOf("\n", t.indexOf("</strong>")));
                return n = n ? n.rp(/[ \t]*(\S.*?)\n/g, '<div class="subtitle"> $1 </div>\n') : "", e("title", s(r)) + '<div class="title"> ' + r + " </div>\n" + n + '<div class="afterTitles"></div>\n'
            })
        }
        if (t = t.rp(/^\s*<\/p>/, ""), !r) {
            var F = m(t, i);
            t = F[0];
            var U = F[1];
            t = t.rp(RegExp("\\b(" + n("sec") + "\\.|" + n("section") + "|" + n("subsection") + ")\\s\\[(.+?)\\]", "gi"), function(e, t, r) {
                var n = U[r.toLowerCase().trim()];
                return n ? t + "  <a " + i('href="#toc' + n + '"') + ">" + n + "</a>" : t + " ?"
            })
        }
        for (; t.indexOf(M) + 1;) t = t.rp(B, c);
        return '<span class="md">' + e("p", t) + "</span>"
    }

    function x(e) {
        var t = e.split("\n"),
            r = 0;
        t.forEach(function(e) {
            r = W(r, e.length)
        });
        var n = Array(r + 1).join(" "),
            a = "";
        return t.forEach(function(e) {
            a += e + n.ss(e.length) + "\n"
        }), a
    }

    function w(e) {
        var t = e.split("\n"),
            r = 1 / 0;
        if (t.forEach(function(e) {
                if ("" !== e.trim()) {
                    var t = e.match(/^([ \t]*)/);
                    t && (r = Z(r, t[0].length))
                }
            }), 0 === r) return e;
        var n = "";
        return t.forEach(function(e) {
            n += e.ss(r) + "\n"
        }), n
    }

    function N(e) {
        var t = e.charCodeAt(0);
        return t >= 65 && 90 >= t || t >= 97 && 122 >= t
    }

    function k(e, t) {
        function r(e) {
            return F.indexOf(e) + 1
        }

        function n(e) {
            return -1 !== U.indexOf(e)
        }

        function i(e) {
            return r(e) || "." === e
        }

        function s(e) {
            return r(e) || "'" === e
        }

        function o(e) {
            return n(e) || "<" === e || b(e)
        }

        function c(e) {
            return n(e) || ">" === e || b(e)
        }

        function l(e) {
            return H.indexOf(e) + 1
        }

        function u(e) {
            return P.indexOf(e) + 1
        }

        function d(e) {
            return "-" === e || r(e) || m(e)
        }

        function p(e) {
            return h(e) || m(e) || b(e)
        }

        function h(e) {
            return "|" === e || r(e)
        }

        function f(e) {
            return "/" === e || r(e)
        }

        function g(e) {
            return "\\" === e || r(e)
        }

        function m(e) {
            return D.indexOf(e) + 1
        }

        function b(e) {
            return O.indexOf(e) + 1
        }

        function v(e) {
            return J.indexOf(e) + 1
        }

        function y(e, t) {
            return this instanceof y ? (void 0 === t && (void 0 === e ? e = t = 0 : e instanceof y && (t = e.y, e = e.x)), this.x = e, this.y = t, void Object.seal(this)) : new y(e, t)
        }

        function w(e) {
            var t = function(r, n) {
                return void 0 === n && r instanceof y && (n = r.y, r = r.x), r >= 0 && t.width > r && n >= 0 && t.height > n ? e[n * (t.width + 1) + r] : " "
            };
            return t._used = [], t.width = e.indexOf("\n"), t.height = e.split("\n").length, "\n" === e[e.length - 1] && --t.height, t.s = function(e, r) {
                void 0 === r && e instanceof y && (r = e.y, e = e.x), e >= 0 && t.width > e && r >= 0 && t.height > r && (t._used[r * (t.width + 1) + e] = !0)
            }, t.u = function(e, t) {
                return void 0 === t && e instanceof y && (t = e.y, e = e.x), this._used[t * (this.width + 1) + e] === !0
            }, t.F = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var n = t(e, r - 1),
                    a = t(e, r),
                    o = t(e, r + 1),
                    c = t(e + 1, r - 1),
                    l = t(e - 1, r - 1);
                return h(a) ? i(n) || "^" === n || h(n) || m(n) || s(o) || "v" === o || h(o) || m(o) || b(n) || b(o) || "_" === t(e, r - 1) || "_" === l || "_" === c || (i(l) || i(c)) && (s(t(e - 1, r + 1)) || s(t(e + 1, r + 1))) : i(a) || "^" === a ? h(o) || m(o) && "." !== a : s(a) || "v" === a ? h(n) || m(n) && "'" !== a : b(a) ? h(n) || h(o) : !1
            }, t.G = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var a = t(e - 2, r),
                    i = t(e - 1, r),
                    s = t(e + 0, r),
                    l = t(e + 1, r),
                    u = t(e + 2, r);
                return d(s) || d(i) && m(s) ? d(i) ? d(l) || c(l) || d(a) || o(a) : o(i) ? d(l) : d(l) && (d(u) || c(u)) : "<" === s ? d(l) && d(u) : ">" === s ? d(i) && d(a) : n(s) ? d(i) && d(a) || d(l) && d(u) : !1
            }, t.H = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var a = t(e, r),
                    o = t(e - 1, r - 1),
                    c = t(e + 1, r + 1);
                return "\\" === a ? g(c) || s(c) || b(c) || "v" === c || g(o) || i(o) || b(o) || "^" === o || "/" === t(e, r - 1) || "/" === t(e, r + 1) || "_" === c || "_" === o : "." === a ? "\\" === c : "'" === a ? "\\" === o : "^" === a ? "\\" === c : "v" === a ? "\\" === o : n(a) || b(a) || "|" === a ? g(o) || g(c) : void 0
            }, t.I = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var a = t(e, r),
                    o = t(e - 1, r + 1),
                    c = t(e + 1, r - 1);
                return "/" !== a || "\\" !== t(e, r - 1) && "\\" !== t(e, r + 1) ? f(a) ? f(c) || i(c) || b(c) || "^" === c || "_" === c || f(o) || s(o) || b(o) || "v" === o || "_" === o : "." === a ? "/" === o : "'" === a ? "/" === c : "^" === a ? "/" === o : "v" === a ? "/" === c : n(a) || b(a) || "|" === a ? f(o) || f(c) : !1 : !0
            }, t.toString = function() {
                return e
            }, Object.freeze(t)
        }

        function k(e, t, r, n, a) {
            this.A = e, this.B = t, r && (this.C = r, this.D = n ? n : r), this.dashed = a || !1, Object.freeze(this)
        }

        function C() {
            this.$ = []
        }

        function _(e) {
            return function(t, r) {
                for (var n = 0; this.$.length > n; ++n)
                    if (e.call(this.$[n], t, r)) return !0;
                return !1
            }
        }

        function M() {
            this.ba = []
        }

        function $(e, t) {
            function r(t, r, n) {
                var a, i, s = K(r.x - t.x),
                    o = K(r.y - t.y);
                for (a = t.x, i = t.y; a !== r.x || i !== r.y; a += s, i += o)
                    if (e(a, i) === n) return !0;
                return e(a, i) === n
            }
            for (var a = 0; e.width > a; ++a)
                for (var o = 0; e.height > o; ++o)
                    if (e.F(a, o)) {
                        var c = y(a, o);
                        do e.s(a, o), ++o; while (e.F(a, o));
                        var l = y(a, o - 1),
                            u = e(c),
                            f = e(c.x, c.y - 1);
                        (!n(u) && ("-" === f || "_" === f || "_" === e(c.x - 1, c.y - 1) || "_" === e(c.x + 1, c.y - 1) || s(f)) || m(f)) && (c.y -= .5);
                        var g = e(l),
                            v = e(l.x, l.y + 1);
                        (!n(g) && ("-" === v || i(v)) || m(v) || "_" === e(l.x - 1, l.y) || "_" === e(l.x + 1, l.y)) && (l.y += .5), c.x === l.x && c.y === l.y || t.aa(new k(c, l))
                    } else "'" === e(a, o) && ("-" === e(a - 1, o) && "_" === e(a + 1, o - 1) && !p(e(a - 1, o - 1)) || "_" === e(a - 1, o - 1) && "-" === e(a + 1, o) && !p(e(a + 1, o - 1))) ? t.aa(new k(y(a, o - .5), y(a, o))) : "." === e(a, o) && ("_" === e(a - 1, o) && "-" === e(a + 1, o) && !p(e(a + 1, o + 1)) || "-" === e(a - 1, o) && "_" === e(a + 1, o) && !p(e(a - 1, o + 1))) && t.aa(new k(y(a, o), y(a, o + .5)));
            for (var o = 0; e.height > o; ++o)
                for (var a = 0; e.width > a; ++a)
                    if (e.G(a, o)) {
                        var c = y(a, o);
                        do e.s(a, o), ++a; while (e.G(a, o));
                        var l = y(a - 1, o);
                        !n(e(c.x - 1, c.y)) && (i(e(c)) && p(e(c.x - 1, c.y + 1)) || s(e(c)) && p(e(c.x - 1, c.y - 1))) && ++c.x, !n(e(l.x + 1, l.y)) && (i(e(l)) && p(e(l.x + 1, l.y + 1)) || s(e(l)) && p(e(l.x + 1, l.y - 1))) && --l.x, c.x === l.x && c.y === l.y || t.aa(new k(c, l))
                    }
            for (var x = -e.height; e.width > x; ++x)
                for (var a = x, o = 0; e.height > o; ++o, ++a)
                    if (e.H(a, o)) {
                        var c = y(a, o);
                        do ++a, ++o; while (e.H(a, o));
                        var l = y(a - 1, o - 1);
                        if (r(c, l, "\\")) {
                            for (var w = c.x; l.x >= w; ++w) e.s(w, c.y + (w - c.x));
                            var C = e(c),
                                u = e(c.x, c.y - 1),
                                _ = e(c.x - 1, c.y - 1);
                            "/" === u || "_" === _ || "_" === u || !n(C) && (d(_) || h(_)) ? (c.x -= .5, c.y -= .5) : b(_) && (c.x -= .25, c.y -= .25);
                            var M = (e(l), e(l.x + 1, l.y + 1));
                            "/" === e(l.x, l.y + 1) || "_" === e(l.x + 1, l.y) || "_" === e(l.x - 1, l.y) || !n(e(l)) && (d(M) || h(M)) ? (l.x += .5, l.y += .5) : b(M) && (l.x += .25, l.y += .25), t.aa(new k(c, l))
                        }
                    }
            for (var x = -e.height; e.width > x; ++x)
                for (var a = x, o = e.height - 1; o >= 0; --o, ++a)
                    if (e.I(a, o)) {
                        var c = y(a, o);
                        do ++a, --o; while (e.I(a, o));
                        var l = y(a - 1, o + 1);
                        if (r(c, l, "/")) {
                            for (var w = c.x; l.x >= w; ++w) e.s(w, c.y - (w - c.x));
                            var u = e(l.x, l.y - 1),
                                j = e(l.x + 1, l.y - 1);
                            e(l);
                            "\\" === u || "_" === u || "_" === j || !n(e(l)) && (d(j) || h(j)) ? (l.x += .5, l.y -= .5) : b(j) && (l.x += .25, l.y -= .25);
                            var E = e(c.x - 1, c.y + 1),
                                C = e(c);
                            "\\" === e(c.x, c.y + 1) || "_" === e(c.x - 1, c.y) || "_" === e(c.x + 1, c.y) || !n(e(c)) && (d(E) || h(E)) ? (c.x -= .5, c.y += .5) : b(E) && (c.x -= .25, c.y += .25), t.aa(new k(c, l))
                        }
                    }
            for (var o = 0; e.height > o; ++o)
                for (var a = 0; e.width > a; ++a) {
                    var A = e(a, o);
                    i(A) && (d(e(a - 1, o)) && h(e(a + 1, o + 1)) && (e.s(a - 1, o), e.s(a, o), e.s(a + 1, o + 1), t.aa(new k(y(a - 1, o), y(a + 1, o + 1), y(a + 1.1, o), y(a + 1, o + 1)))), d(e(a + 1, o)) && h(e(a - 1, o + 1)) && (e.s(a - 1, o + 1), e.s(a, o), e.s(a + 1, o), t.aa(new k(y(a + 1, o), y(a - 1, o + 1), y(a - 1.1, o), y(a - 1, o + 1))))), ")" !== A && !b(A) || "." !== e(a - 1, o - 1) || "'" !== e(a - 1, o + 1) || (e.s(a, o), e.s(a - 1, o - 1), e.s(a - 1, o + 1), t.aa(new k(y(a - 2, o - 1), y(a - 2, o + 1), y(a + .6, o - 1), y(a + .6, o + 1)))), "(" !== A && !b(A) || "." !== e(a + 1, o - 1) || "'" !== e(a + 1, o + 1) || (e.s(a, o), e.s(a + 1, o - 1), e.s(a + 1, o + 1), t.aa(new k(y(a + 2, o - 1), y(a + 2, o + 1), y(a - .6, o - 1), y(a - .6, o + 1)))), s(A) && (d(e(a - 1, o)) && h(e(a + 1, o - 1)) && (e.s(a - 1, o), e.s(a, o), e.s(a + 1, o - 1), t.aa(new k(y(a - 1, o), y(a + 1, o - 1), y(a + 1.1, o), y(a + 1, o - 1)))), d(e(a + 1, o)) && h(e(a - 1, o - 1)) && (e.s(a - 1, o - 1), e.s(a, o), e.s(a + 1, o), t.aa(new k(y(a + 1, o), y(a - 1, o - 1), y(a - 1.1, o), y(a - 1, o - 1)))))
                }
            for (var o = 0; e.height > o; ++o)
                for (var a = 0; e.width - 2 > a; ++a) {
                    var B = e(a - 1, o);
                    if (!("_" !== e(a, o) || "_" !== e(a + 1, o) || N(e(a + 2, o)) && "_" !== B || N(B) && "_" !== e(a + 2, o))) {
                        var $ = e(a - 2, o),
                            c = y(a - .5, o + .5);
                        "|" === B || "|" === e(a - 1, o + 1) || "." === B || "'" === e(a - 1, o + 1) ? (c.x -= .5, "." !== B || "-" !== $ && "." !== $ || "(" !== e(a - 2, o + 1) || (c.x -= .5)) : "/" === B && (c.x -= 1), "(" === B && "(" === $ && "'" === e(a, o + 1) && "." === e(a, o - 1) && (c.x += .5), B = $ = void 0;
                        do e.s(a, o), ++a; while ("_" === e(a, o));
                        var l = y(a - .5, o + .5),
                            A = e(a, o),
                            S = e(a + 1, o),
                            g = e(a, o + 1);
                        "|" === A || "|" === g || "." === A || "'" === g ? (l.x += .5, "." !== A || "-" !== S && "." !== S || ")" !== e(a + 1, o + 1) || (l.x += .5)) : "\\" === A && (l.x += 1), ")" === A && ")" === S && "'" === e(a - 1, o + 1) && "." === e(a - 1, o - 1) && (l.x += -.5), t.aa(new k(c, l))
                    }
                }
        }

        function S(e, t, r) {
            function n(e) {
                return " " === e || /[^a-zA-Z0-9]|[ov]/.test(e)
            }

            function a(e, t, r, a) {
                return (n(t) || b(t)) && (n(e) || b(e)) && n(a) && n(r)
            }
            for (var i = 0; e.width > i; ++i)
                for (var s = 0; e.height > s; ++s) {
                    var o = e(i, s),
                        c = s;
                    if (m(o)) t.V(i, c - .5) && t.P(i, c + .5) && (r.aa(i, c, o), e.s(i, c));
                    else if (b(o)) {
                        var d = e(i, c - 1),
                            p = e(i, c + 1),
                            h = e(i - 1, c),
                            f = e(i + 1, c);
                        (t.X(i - 1, c) || t.W(i + 1, c) || t.V(i, c - 1) || t.P(i, c + 1) || t.P(i, c) || t.V(i, c) || a(d, p, h, f)) && (r.aa(i, c, o), e.s(i, c))
                    } else if (l(o)) r.aa(i, c, o), e.s(i, c);
                    else if (u(o)) r.aa(i, c, o), e.s(i, c);
                    else {
                        var g = 0;
                        ">" === o && (t.X(i, c) || t.Z(i, c)) ? (b(e(i + 1, c)) && (g = -.5), r.aa(i + g, c, ">", 0), e.s(i, c)) : "<" === o && (t.W(i, c) || t.Z(i, c)) ? (b(e(i - 1, c)) && (g = .5), r.aa(i + g, c, ">", 180), e.s(i, c)) : "^" === o ? t.P(i, c - .5) ? (r.aa(i, c - .5, ">", 270), e.s(i, c)) : t.P(i, c) ? (r.aa(i, c, ">", 270), e.s(i, c)) : t.R(i + .5, c - .5) ? (r.aa(i + .5, c - .5, ">", 270 + z), e.s(i, c)) : t.R(i + .25, c - .25) ? (r.aa(i + .25, c - .25, ">", 270 + z), e.s(i, c)) : t.R(i, c) ? (r.aa(i, c, ">", 270 + z), e.s(i, c)) : t.T(i, c) ? (r.aa(i, c, o, 270 - z), e.s(i, c)) : t.T(i - .5, c - .5) ? (r.aa(i - .5, c - .5, o, 270 - z), e.s(i, c)) : t.T(i - .25, c - .25) ? (r.aa(i - .25, c - .25, o, 270 - z), e.s(i, c)) : t.Y(i, c) && (r.aa(i, c - .5, ">", 270), e.s(i, c)) : "v" === o && (t.V(i, c + .5) ? (r.aa(i, c + .5, ">", 90), e.s(i, c)) : t.V(i, c) ? (r.aa(i, c, ">", 90), e.s(i, c)) : t.S(i, c) ? (r.aa(i, c, ">", 90 + z), e.s(i, c)) : t.S(i - .5, c + .5) ? (r.aa(i - .5, c + .5, ">", 90 + z), e.s(i, c)) : t.S(i - .25, c + .25) ? (r.aa(i - .25, c + .25, ">", 90 + z), e.s(i, c)) : t.U(i, c) ? (r.aa(i, c, ">", 90 - z), e.s(i, c)) : t.U(i + .5, c + .5) ? (r.aa(i + .5, c + .5, ">", 90 - z), e.s(i, c)) : t.U(i + .25, c + .25) ? (r.aa(i + .25, c + .25, ">", 90 - z), e.s(i, c)) : t.Y(i, c) && (r.aa(i, c + .5, ">", 90), e.s(i, c)))
                    }
                }
        }
        e = x(e);
        var T = "\ue004";
        e = e.rp(/([a-z]|[A-Z])o([a-z]|[A-Z])/g, "$1" + T + "$2");
        var R = 8,
            L = 2,
            z = 180 * Math.atan(1 / L) / Math.PI,
            q = 1e-6,
            I = ">v<^",
            O = "o*",
            D = "()",
            F = "+",
            U = F + ".'",
            H = "\u2591\u2592\u2593\u2594\u2589",
            P = "\u25e2\u25e3\u25e4\u25e5",
            J = I + O + D + H + P;
        y.prototype.toString = y.prototype.toSVG = function() {
            return "" + this.x * R + "," + this.y * R * L + " "
        };
        var Q = k.prototype;
        Q.J = function() {
            return this.B.x === this.A.x
        }, Q.K = function() {
            return this.B.y === this.A.y
        }, Q.L = function() {
            var e = this.B.x - this.A.x,
                t = this.B.y - this.A.y;
            return Math.abs(t + e) < q
        }, Q.M = function() {
            var e = this.B.x - this.A.x,
                t = this.B.y - this.A.y;
            return Math.abs(t - e) < q
        }, Q.N = function() {
            return void 0 !== this.C
        }, Q.O = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.A.x === e && this.A.y === t || this.B.x === e && this.B.y === t
        }, Q.P = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.J() && this.A.x === e && Z(this.A.y, this.B.y) === t
        }, Q.R = function(e, t) {
            return this.L() ? (void 0 === t && (t = e.y, e = e.x), this.B.y > this.A.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, Q.S = function(e, t) {
            return this.L() ? (void 0 === t && (t = e.y, e = e.x), this.A.y > this.B.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, Q.T = function(e, t) {
            return this.M() ? (void 0 === t && (t = e.y, e = e.x), this.B.y > this.A.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, Q.U = function(e, t) {
            return this.M() ? (void 0 === t && (t = e.y, e = e.x), this.A.y > this.B.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, Q.V = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.J() && this.A.x === e && W(this.A.y, this.B.y) === t
        }, Q.W = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.K() && this.A.y === t && Z(this.A.x, this.B.x) === e
        }, Q.X = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.K() && this.A.y === t && W(this.A.x, this.B.x) === e
        }, Q.Y = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.J() && this.A.x === e && Z(this.A.y, this.B.y) <= t && W(this.A.y, this.B.y) >= t
        }, Q.Z = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.K() && this.A.y === t && Z(this.A.x, this.B.x) <= e && W(this.A.x, this.B.x) >= e
        }, Q.toSVG = function() {
            var e = '<path d="M ' + this.A;
            return e += this.N() ? "C " + this.C + this.D + this.B : "L " + this.B, e += '" style="fill:none;"', this.dashed && (e += ' stroke-dasharray="3,6"'), e += "/>"
        };
        var V = C.prototype;
        V.aa = function(e) {
            this.$.push(e)
        }, V.P = _(Q.P), V.R = _(Q.R), V.T = _(Q.T), V.S = _(Q.S), V.U = _(Q.U), V.V = _(Q.V), V.W = _(Q.W), V.X = _(Q.X), V.O = _(Q.O), V.Y = _(Q.Y), V.Z = _(Q.Z), V.toSVG = function() {
            for (var e = "", t = 0; this.$.length > t; ++t) e += this.$[t].toSVG() + "\n";
            return e
        };
        var G = M.prototype;
        G.aa = function(e, t, r, n) {
            void 0 === r && (r = t, t = e.y, e = e.x), !v(r);
            var a = {
                C: y(e, t),
                type: r,
                angle: n || 0
            };
            b(r) ? this.ba.push(a) : this.ba.unshift(a)
        }, G.toSVG = function() {
            for (var e = "", t = 0; this.ba.length > t; ++t) {
                var r = this.ba[t],
                    n = r.C;
                if (m(r.type)) {
                    var a = ")" === r.type ? .75 : -.75,
                        i = y(n.x, n.y - .5),
                        s = y(n.x, n.y + .5),
                        o = y(n.x + a, n.y - .5),
                        c = y(n.x + a, n.y + .5);
                    e += '<path d="M ' + s + " C " + c + o + i + '" style="fill:none;"/>'
                } else if (b(r.type)) e += '<circle cx="' + n.x * R + '" cy="' + n.y * R * L + '" r="' + (R - B) + '" class="' + ("*" === r.type ? "closed" : "open") + 'dot"/>';
                else if (l(r.type)) {
                    var d = Math.round(63.75 * (3 - H.indexOf(r.type)));
                    e += '<rect x="' + (n.x - .5) * R + '" y="' + (n.y - .5) * R * L + '" width="' + R + '" height="' + R * L + '" fill="rgb(' + d + "," + d + "," + d + ')"/>'
                } else if (u(r.type)) {
                    var p = P.indexOf(r.type),
                        h = .5 - (1 & p),
                        f = .5 - (p >> 1);
                    h *= K(f);
                    var g = y(n.x + h, n.y - f),
                        i = y(n.x + h, n.y + f),
                        s = y(n.x - h, n.y + f);
                    e += '<polygon points="' + g + i + s + '" style="stroke:none"/>\n'
                } else {
                    var g = y(n.x + 1, n.y),
                        i = y(n.x - .5, n.y - .35),
                        s = y(n.x - .5, n.y + .35);
                    e += '<polygon points="' + g + i + s + '"  style="stroke:none" transform="rotate(' + r.angle + "," + n + ')"/>\n'
                }
            }
            return e
        };
        var X = w(e),
            Y = new C,
            ee = new M;
        $(X, Y), S(X, Y, ee);
        var te = '<svg class="diagram" xmlns="http://www.w3.org/2000/svg" version="1.1" height="' + (X.height + 1) * R * L + '" width="' + (X.width + 1) * R + '"';
        if ("floatleft" === t ? te += ' style="float:left;margin: 15px 30px 15px 0px;"' : "floatright" === t ? te += ' style="float:right;margin: 15px 0px 15px 30px;"' : "center" === t && (te += ' style="margin: 0px auto 0px auto;"'), te += '><g transform="translate(' + y(1, 1) + ')">\n', j) {
            te += '<g style="opacity:0.1">\n';
            for (var re = 0; X.width > re; ++re)
                for (var ne = 0; X.height > ne; ++ne) te += '<rect x="' + ((re - .5) * R + 1) + '" + y="' + ((ne - .5) * R * L + 2) + '" width="' + (R - 2) + '" height="' + (R * L - 2) + '" style="fill:', te += X.u(re, ne) ? "red;" : " " === X(re, ne) ? "gray; opacity:0.05" : "blue;", te += '"/>\n';
            te += "</g>\n"
        }
        if (te += Y.toSVG(), te += ee.toSVG(), !A) {
            te += '<g transform="translate(0,0)">';
            for (var ne = 0; X.height > ne; ++ne)
                for (var re = 0; X.width > re; ++re) {
                    var ae = X(re, ne);
                    /[\u2B22\u2B21]/.test(ae) ? te += '<text text-anchor="middle" x="' + re * R + '" y="' + (4 + ne * R * L) + '" style="font-size:20.5px">' + a(ae) + "</text>" : " " === ae || X.u(re, ne) || (te += '<text text-anchor="middle" x="' + re * R + '" y="' + (4 + ne * R * L) + '">' + a(ae) + "</text>")
                }
            te += "</g>"
        }
        if (E) {
            te += '<g transform="translate(2, 2)">\n';
            for (var re = 0; X.width > re; ++re)
                for (var ne = 0; X.height > ne; ++ne) {
                    var ae = X(re, ne);
                    " " !== ae && (te += '<text text-anchor="middle" x="' + re * R + '" y="' + (4 + ne * R * L) + '" style="fill:#F00;font-family:Menlo,monospace;font-size:12px;text-align:center">' + a(ae) + "</text>")
                }
            te += "</g>"
        }
        return te += "</g></svg>", te = te.rp(RegExp(T, "g"), "o")
    }

    function C(e) {
        return -1 !== e.search(/markdeep\S*?\.js$/i)
    }

    function _(e) {
        return Array.prototype.slice.call(e)
    }
    var M = String.prototype;
    M.rp = M.replace, M.ss = M.substring, M.regexIndexOf = function(e, t) {
        var r = this.ss(t || 0).search(e);
        return r >= 0 ? r + (t || 0) : r
    };
    var j = !1,
        E = j,
        A = E,
        B = 2,
        $ = "*",
        S = Array(6).join($),
        T = "Menlo,'Lucida Console',monospace",
        R = 105.1316178 / t(T) + "px",
        L = e("style", 'body{max-width:680px;margin:auto;padding:20px;text-align:justify;line-height:140%; -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-smoothing:antialiased;color:#222;font-family:Palatino,Georgia,"Times New Roman",serif;}'),
        z = e("style", "body{counter-reset: h1 h2 h3 h4 h5 h6;}.md code,pre{font-family:" + T + ";font-size:" + R + ';line-height:140%;}.md div.title{font-size:26px;font-weight:800;padding-bottom:5px;line-height:120%;text-align:center;}.md div.afterTitles{height:10px;}.md div.subtitle{text-align:center;}.md .image{display:inline-block}.md div.imagecaption,.md div.tablecaption,.md div.listingcaption{margin:0.2em 0 10px 0;font-style:italic;}.md div.imagecaption{margin-bottom:0px}.md img{max-width:100%;}li{text-align:left};.md div.tilde{margin:20px 0 -10px 0;text-align:center;}.md blockquote.fancyquote{margin-top:25px;margin-bottom:25px;text-align:left;line-height:160%;}.md blockquote.fancyquote::before{content: "\u201c";color:#DDD;font-family:Times New Roman;font-size: 45px;line-height: 0;margin-right: 6px;vertical-align: -0.3em;}.md span.fancyquote{font-size:118%;color:#777;font-style:italic;}.md span.fancyquote::after{content: "\u201d";font-style:normal;color:#DDD;font-family:Times New Roman;font-size: 45px;line-height: 0;margin-left: 6px;vertical-align: -0.3em;}.md blockquote.fancyquote .author{width:100%;margin-top: 10px;display:inline-block;text-align:right;}.md small{font-size:60%;}.md div.title,contents,.md .tocHeader,h1,h2,h3,h4,h5,h6,.md .shortTOC,.md .mediumTOC,.nonumberh1,.nonumberh2,.nonumberh3,.nonumberh4,.nonumberh5,.nonumberh6{font-family:Verdana,Helvetica,Arial,sans-serif;}.md svg.diagram{display:block;font-family:' + T + ";font-size:" + R + ";text-align:center;stroke-linecap:round;stroke-width:" + B + "px;stroke:#000;fill:#000;}.md svg.diagram .opendot{fill:#FFF}.md svg.diagram text{stroke:none;}.md a:link.url{font-family:Georgia,Palatino,'Times New Roman';}h1,.tocHeader,.nonumberh1{padding-bottom:3px;padding-top:15px;border-bottom:3px solid;border-top:none;font-size:20px;font-weight:bold;clear:both;}h1,.nonumberh1{counter-reset: h2 h3 h4 h5 h6;}h2,.nonumberh2{counter-reset: h3 h4 h5 h6;font-family:Helvetica,Arial,sans-serif;padding-bottom:3px;padding-top:15px;border-bottom:2px solid #999;border-top:none;color:#555;font-size:18px;clear:both;}h3,h4,h5,h6,.nonumberh3,.nonumberh4,.nonumberh5,.nonumberh6{font-family:Helvetica,Arial,sans-serif;padding-bottom:3px;padding-top:15px;border-top:none;color:#555;font-size:16px;clear:both;}h3{counter-reset: h4 h5 h6;}h4{counter-reset: h5 h6;}h5{counter-reset: h6;}.md table{border-collapse:collapse;line-height:140%; }.md table.table{margin:auto;}.md table.calendar{width:100%;margin:auto;font-size:11px;font-family:Helvetica,Arial,sans-serif;}.md table.calendar th{font-size:16px;}.md .today{background:#ECF8FA;}.md div.tablecaption{text-align: center;}.md table.table th{color:#FFF;background-color:#AAA;border:1px solid #888;padding:8px 15px 8px 15px;}.md table.table td{padding:5px 15px 5px 15px;border:1px solid #888;}.md table.table tr:nth-child(even){background:#EEE;}.md pre.tilde{border-top: 1px solid #CCC;border-bottom: 1px solid #CCC;padding: 5px 0 5px 20px;margin-bottom: 30px;background: #FCFCFC;}.md a:link, .md a:visited{color:#38A;text-decoration:none;}.md a:hover{text-decoration:underline}.md dt{font-weight:700;}.md dd{padding-bottom:18px;}.md code{white-space:pre;}.md .endnote{font-size:13px;line-height:15px;padding-left:10px;text-indent:-10px;}.md .bib{padding-left:80px;text-indent:-80px;text-align:left;}.markdeepFooter{font-size:9px;text-align:right;padding-top:80px;color:#999;}.md .mediumTOC{float:right;font-size:12px;line-height:15px;border-left:1px solid #CCC;padding-left:15px;margin:15px 0px 15px 25px;}.md .mediumTOC .level1{font-weight:600;}.md .longTOC .level1{font-weight:600;display:block;padding-top:12px; margin-bottom:-20px;}.md .shortTOC{text-align:center;font-weight:bold;margin-top:15px;font-size:14px;}"),
        q = '<!-- Markdeep: --><style class="fallback">body{visibility:hidden;white-space:pre;font-family:monospace}</style><script src="markdeep.min.js"></script><script src="https://casual-effects.com/markdeep/latest/markdeep.min.js"></script><script>window.alreadyProcessedMarkdeep||(document.body.style.visibility="visible")</script>',
        I = '<div class="markdeepFooter"><i>formatted by <a href="http://casual-effects.com/markdeep" style="color:#999">Markdeep&nbsp;&nbsp;&nbsp;</a></i><div style="display:inline-block;font-size:13px;font-family:\'Times New Roman\',serif;vertical-align:middle;transform:translate(-3px,-1px)rotate(135deg);">&#x2712;</div></div>',
        O = {
            keyword: {
                table: "tableau",
                figure: "figure",
                g: "liste",
                diagram: "diagramme",
                sec: "sec",
                section: "section",
                subsection: "paragraphe",
                Monday: "lundi",
                Tuesday: "mardi",
                Wednesday: "mercredi",
                Thursday: "jeudi",
                Friday: "vendredi",
                Saturday: "samedi",
                Sunday: "dimanche",
                January: "Janvier",
                February: "F\xe9vrier",
                March: "Mars",
                April: "Avril",
                May: "Mai",
                June: "Juin",
                July: "Julliet",
                August: "Ao\xfbt",
                September: "Septembre",
                October: "Octobre",
                November: "Novembre",
                December: "D\xe9cembre",
                jan: "janv",
                feb: "f\xe9vr",
                mar: "mars",
                apr: "avril",
                may: "mai",
                jun: "juin",
                jul: "juil",
                aug: "ao\xfbt",
                sep: "sept",
                oct: "oct",
                nov: "nov",
                dec: "d\xe9c"
            }
        },
        D = {
            keyword: {
                table: "\u0442\u0430\u0431\u043b\u0438\u0446\u0430",
                figure: "\u0444\u0438\u0433\u0443\u0440\u0430",
                g: "\u0441\u043f\u0438\u0441\u044a\u043a",
                diagram: "\u0434\u0438\u0430\u0433\u0440\u0430\u043c\u0430",
                sec: "\u0441\u0435\u043a",
                section: "\u0440\u0430\u0437\u0434\u0435\u043b",
                subsection: "\u043f\u043e\u0434\u0440\u0430\u0437\u0434\u0435\u043b",
                Monday: "\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u043d\u0438\u043a",
                Tuesday: "\u0432\u0442\u043e\u0440\u043d\u0438\u043a",
                Wednesday: "\u0441\u0440\u044f\u0434\u0430",
                Thursday: "\u0447\u0435\u0442\u0432\u044a\u0440\u0442\u044a\u043a",
                Friday: "\u043f\u0435\u0442\u044a\u043a",
                Saturday: "\u0441\u044a\u0431\u043e\u0442\u0430",
                Sunday: "\u043d\u0435\u0434\u0435\u043b\u044f",
                January: "\u044f\u043d\u0443\u0430\u0440\u0438",
                February: "\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438",
                March: "\u043c\u0430\u0440\u0442",
                April: "\u0430\u043f\u0440\u0438\u043b",
                May: "\u043c\u0430\u0439",
                June: "\u044e\u043d\u0438",
                July: "\u044e\u043b\u0438",
                August: "\u0430\u0432\u0433\u0443\u0441\u0442",
                September: "\u0441\u0435\u043f\u0442\u0435\u043c\u0432\u0440\u0438",
                October: "\u043e\u043a\u0442\u043e\u043c\u0432\u0440\u0438",
                November: "\u043d\u043e\u0435\u043c\u0432\u0440\u0438",
                December: "\u0434\u0435\u043a\u0435\u043c\u0432\u0440\u0438",
                jan: "\u044f\u043d",
                feb: "\u0444\u0435\u0432\u0440",
                mar: "\u043c\u0430\u0440\u0442",
                apr: "\u0430\u043f\u0440",
                may: "\u043c\u0430\u0439",
                jun: "\u044e\u043d\u0438",
                jul: "\u044e\u043b\u0438",
                aug: "\u0430\u0432\u0433",
                sep: "\u0441\u0435\u043f\u0442",
                oct: "\u043e\u043a\u0442",
                nov: "\u043d\u043e\u0435\u043c",
                dec: "\u0434\u0435\u043a"
            }
        },
        F = {
            keyword: {
                table: "\u0442\u0430\u0431\u043b\u0438\u0446\u0430",
                figure: "\u0440\u0438\u0441\u0443\u043d\u043e\u043a",
                g: "\u043b\u0438\u0441\u0442\u0438\u043d\u0433",
                diagram: "\u0434\u0438\u0430\u0433\u0440\u0430\u043c\u043c\u0430",
                sec: "\u0441\u0435\u043a",
                section: "\u0440\u0430\u0437\u0434\u0435\u043b",
                subsection: "\u043f\u043e\u0434\u0440\u0430\u0437\u0434\u0435\u043b",
                Monday: "\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a",
                Tuesday: "\u0432\u0442\u043e\u0440\u043d\u0438\u043a",
                Wednesday: "\u0441\u0440\u0435\u0434\u0430",
                Thursday: "\u0447\u0435\u0442\u0432\u0435\u0440\u0433",
                Friday: "\u043f\u044f\u0442\u043d\u0438\u0446\u0430",
                Saturday: "\u0441\u0443\u0431\u0431\u043e\u0442\u0430",
                Sunday: "\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435",
                January: "\u044f\u043d\u0432\u0430\u0440\u044cr",
                February: "\u0444\u0435\u0432\u0440\u0430\u043b\u044c",
                March: "\u043c\u0430\u0440\u0442",
                April: "\u0430\u043f\u0440\u0435\u043b\u044c",
                May: "\u043c\u0430\u0439",
                June: "\u0438\u044e\u043d\u044c",
                July: "\u0438\u044e\u043b\u044c",
                August: "\u0430\u0432\u0433\u0443\u0441\u0442",
                September: "\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c",
                October: "\u043e\u043a\u0442\u044f\u0431\u0440\u044c",
                November: "\u043d\u043e\u044f\u0431\u0440\u044c",
                December: "\u0434\u0435\u043a\u0430\u0431\u0440\u044c",
                jan: "\u044f\u043d\u0432",
                feb: "\u0444\u0435\u0432\u0440",
                mar: "\u043c\u0430\u0440\u0442",
                apr: "\u0430\u043f\u0440",
                may: "\u043c\u0430\u0439",
                jun: "\u0438\u044e\u043d\u044c",
                jul: "\u0438\u044e\u043b\u044c",
                aug: "\u0430\u0432\u0433",
                sep: "\u0441\u0435\u043d\u0442",
                oct: "\u043e\u043a\u0442",
                nov: "\u043d\u043e\u044f\u0431\u0440\u044c",
                dec: "\u0434\u0435\u043a"
            }
        },
        U = {
            mode: "markdeep",
            detectMath: !0,
            lang: {
                keyword: {}
            }
        },
        H = {
            ru: F,
            fr: O,
            bg: D
        };
    [].slice.call(document.getElementsByTagName("meta")).forEach(function(e) {
        var t = e.getAttribute("lang");
        if (t) {
            var r = H[t];
            r && (U.lang = r)
        }
    });
    var W = Math.max,
        Z = Math.min,
        K = Math.sign || function(e) {
            return +e === e ? 0 === e ? e : e > 0 ? 1 : -1 : NaN
        },
        P = "<style>.hljs{display:block;overflow-x:auto;padding:0.5em;background:#fff;color:#000;-webkit-text-size-adjust:none}.hljs-comment{color:#006a00}.hljs-keyword {color:#02E}.hljs-literal,.nginx .hljs-title{color:#aa0d91}.method,.hljs-list .hljs-title,.hljs-tag .hljs-title,.setting .hljs-value,.hljs-winutils,.tex .hljs-command,.http .hljs-title,.hljs-request,.hljs-status,.hljs-name{color:#008}.hljs-envvar,.tex .hljs-special{color:#660}.hljs-string{color:#c41a16}.hljs-tag .hljs-value,.hljs-cdata,.hljs-filter .hljs-argument,.hljs-attr_selector,.apache .hljs-cbracket,.hljs-date,.hljs-regexp{color:#080}.hljs-sub .hljs-identifier,.hljs-pi,.hljs-tag,.hljs-tag .hljs-keyword,.hljs-decorator,.ini .hljs-title,.hljs-shebang,.hljs-prompt,.hljs-hexcolor,.hljs-rule .hljs-value,.hljs-symbol,.hljs-symbol .hljs-string,.hljs-number,.css .hljs-function,.hljs-function .hljs-title,.coffeescript .hljs-attribute{color:#A0C}.hljs-function .hljs-title{font-weight:bold;color:#000}.hljs-class .hljs-title,.smalltalk .hljs-class,.hljs-type,.hljs-typename,.hljs-tag .hljs-attribute,.hljs-doctype,.hljs-class .hljs-id,.hljs-built_in,.setting,.hljs-params,.clojure .hljs-attribute{color:#5c2699}.hljs-variable{color:#3f6e74}.css .hljs-tag,.hljs-rule .hljs-property,.hljs-pseudo,.hljs-subst{color:#000}.css .hljs-class,.css .hljs-id{color:#9b703f}.hljs-value .hljs-important{color:#ff7700;font-weight:bold}.hljs-rule .hljs-keyword{color:#c5af75}.hljs-annotation,.apache .hljs-sqbracket,.nginx .hljs-built_in{color:#9b859d}.hljs-preprocessor,.hljs-preprocessor *,.hljs-pragma{color:#643820}.tex .hljs-formula{background-color:#eee;font-style:italic}.diff .hljs-header,.hljs-chunk{color:#808080;font-weight:bold}.diff .hljs-change{background-color:#bccff9}.hljs-addition{background-color:#baeeba}.hljs-deletion{background-color:#ffc8bd}.hljs-comment .hljs-doctag{font-weight:bold}.method .hljs-id{color:#000}</style>";
    if (!window.alreadyProcessedMarkdeep) {
        window.alreadyProcessedMarkdeep = !0;
        var J = -1 !== window.location.href.search(/\?.*noformat.*/i);
        window.markdeep = Object.freeze({
            format: y,
            formatDiagram: k,
            stylesheet: function() {
                return z + c() + P
            }
        });
        var Q = r("mode");
        switch (Q) {
            case "script":
                return;
            case "html":
            case "doxygen":
                return _(document.getElementsByClassName("diagram")).concat(_(document.getElementsByTagName("diagram"))).forEach(function(e) {
                    var t = i(e.innerHTML);
                    t = t.rp(/(:?^[ \t]*\n)|(:?\n[ \t]*)$/g, ""), "doxygen" === Q && (t = t.rp(RegExp("\u2013", "g"), "--"), t = t.rp(RegExp("\u2014", "g"), "---"), t = t.rp(/<a class="el" .*>(.*)<\/a>/g, "$1")), e.outerHTML = '<center class="md">' + k(w(t), "") + "</center>"
                }), _(document.getElementsByClassName("markdeep")).concat(_(document.getElementsByTagName("markdeep"))).forEach(function(e) {
                    var t = document.createElement("div");
                    t.innerHTML = y(w(i(e.innerHTML)), !0), e.parentNode.replaceChild(t, e)
                }), void(document.head.innerHTML = window.markdeep.stylesheet() + document.head.innerHTML)
        }
        J || (_(document.getElementsByTagName("script")).forEach(function(e) {
            C(e.src) && e.parentNode.removeChild(e)
        }), document.body.style.visibility = "hidden");
        var V = l(document.body);
        if (J) return V = V.rp(/<!-- Markdeep:.+$/gm, "") + q, V = V.rp(/</g, "&lt;").rp(/>/g, "&gt;"), void(document.body.innerHTML = e("pre", V));
        V = i(V), setTimeout(function() {
            var t = y(V, !1),
                n = r("detectMath") && (-1 !== t.search(/(?:\$\$[\s\S]+\$\$)|(?:\\begin{)/m) || -1 !== t.search(/\\\(.*\\\)/));
            if (n) {
                var i = "$$NC{\\n}{\\hat{n}}NC{\\w}{\\hat{\\omega}}NC{\\wi}{\\w_\\mathrm{i}}NC{\\wo}{\\w_\\mathrm{o}}NC{\\wh}{\\w_\\mathrm{h}}NC{\\Li}{L_\\mathrm{i}}NC{\\Lo}{L_\\mathrm{o}}NC{\\Le}{L_\\mathrm{e}}NC{\\Lr}{L_\\mathrm{r}}NC{\\Lt}{L_\\mathrm{t}}NC{\\O}{\\mathrm{O}}NC{\\degrees}{{^\\circ}}NC{\\T}{\\mathsf{T}}NC{\\mathset}[1]{\\mathbb{#1}}NC{\\Real}{\\mathset{R}}NC{\\Integer}{\\mathset{Z}}NC{\\Boolean}{\\mathset{B}}NC{\\Complex}{\\mathset{C}}$$\n".rp(/NC/g, "\\newcommand");
                t = '<script type="text/x-mathjax-config">MathJax.Hub.Config({ TeX: { equationNumbers: {autoNumber: "AMS"} } });</script><span style="display:none">' + i + "</span>\n" + t
            }
            t += I;
            var s = V.length > 1e3,
                o = L + z + c() + P;
            if (s && (o += e("style", "div.title { padding-top: 40px; } div.afterTitles { height: 15px; }")), -1 !== window.location.href.search(/\?.*export.*/i)) {
                var l = '<meta charset="UTF-8"><meta http-equiv="content-type" content="text/html; charset=UTF-8">' + o + document.head.innerHTML + t;
                n && (l += '<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>'), document.body.innerHTML = e("code", a(l))
            } else if (document.head.innerHTML = '<meta charset="UTF-8"><meta http-equiv="content-type" content="text/html; charset=UTF-8">' + o + document.head.innerHTML, document.body.innerHTML = t, n) {
                var u = document.createElement("script");
                u.type = "text/javascript", u.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML", document.getElementsByTagName("head")[0].appendChild(u)
            }
            document.body.style.visibility = "visible"
        }, 0)
    }
}(), ! function(e) {
    var t = "object" == typeof window && window || "object" == typeof self && self;
    "undefined" != typeof exports ? e(exports) : t && (t.hljs = e({}), "function" == typeof define && define.amd && define([], function() {
        return t.hljs
    }))
}(function(e) {
    function t(e) {
        return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
    }

    function r(e) {
        return e.nodeName.toLowerCase()
    }

    function n(e, t) {
        var r = e && e.exec(t);
        return r && 0 == r.index
    }

    function a(e) {
        return /^(no-?highlight|plain|text)$/i.test(e)
    }

    function i(e) {
        var t, r, n, i = e.className + " ";
        if (i += e.parentNode ? e.parentNode.className : "", r = /\blang(?:uage)?-([\w-]+)\b/i.exec(i)) return x(r[1]) ? r[1] : "no-highlight";
        for (i = i.split(/\s+/), t = 0, n = i.length; n > t; t++)
            if (x(i[t]) || a(i[t])) return i[t]
    }

    function s(e, t) {
        var r, n = {};
        for (r in e) n[r] = e[r];
        if (t)
            for (r in t) n[r] = t[r];
        return n
    }

    function o(e) {
        var t = [];
        return function n(e, a) {
            for (var i = e.firstChild; i; i = i.nextSibling) 3 == i.nodeType ? a += i.nodeValue.length : 1 == i.nodeType && (t.push({
                event: "start",
                offset: a,
                node: i
            }), a = n(i, a), r(i).match(/br|hr|img|input/) || t.push({
                event: "stop",
                offset: a,
                node: i
            }));
            return a
        }(e, 0), t
    }

    function c(e, n, a) {
        function i() {
            return e.length && n.length ? e[0].offset != n[0].offset ? n[0].offset > e[0].offset ? e : n : "start" == n[0].event ? e : n : e.length ? e : n
        }

        function s(e) {
            function n(e) {
                return " " + e.nodeName + '="' + t(e.value) + '"'
            }
            u += "<" + r(e) + Array.prototype.map.call(e.attributes, n).join("") + ">"
        }

        function o(e) {
            u += "</" + r(e) + ">"
        }

        function c(e) {
            ("start" == e.event ? s : o)(e.node)
        }
        for (var l = 0, u = "", d = []; e.length || n.length;) {
            var p = i();
            if (u += t(a.substr(l, p[0].offset - l)), l = p[0].offset, p == e) {
                d.reverse().forEach(o);
                do c(p.splice(0, 1)[0]), p = i(); while (p == e && p.length && p[0].offset == l);
                d.reverse().forEach(s)
            } else "start" == p[0].event ? d.push(p[0].node) : d.pop(), c(p.splice(0, 1)[0])
        }
        return u + t(a.substr(l))
    }

    function l(e) {
        function t(e) {
            return e && e.source || e
        }

        function r(r, n) {
            return RegExp(t(r), "m" + (e.cI ? "i" : "") + (n ? "g" : ""))
        }

        function n(a, i) {
            if (!a.compiled) {
                if (a.compiled = !0, a.k = a.k || a.bK) {
                    var o = {},
                        c = function(t, r) {
                            e.cI && (r = r.toLowerCase()), r.split(" ").forEach(function(e) {
                                var r = e.split("|");
                                o[r[0]] = [t, r[1] ? +r[1] : 1]
                            })
                        };
                    "string" == typeof a.k ? c("keyword", a.k) : Object.keys(a.k).forEach(function(e) {
                        c(e, a.k[e])
                    }), a.k = o
                }
                a.lR = r(a.l || /\w+/, !0), i && (a.bK && (a.b = "\\b(" + a.bK.split(" ").join("|") + ")\\b"), a.b || (a.b = /\B|\b/), a.bR = r(a.b), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = r(a.e)), a.tE = t(a.e) || "", a.eW && i.tE && (a.tE += (a.e ? "|" : "") + i.tE)), a.i && (a.iR = r(a.i)), void 0 === a.r && (a.r = 1), a.c || (a.c = []);
                var l = [];
                a.c.forEach(function(e) {
                    e.v ? e.v.forEach(function(t) {
                        l.push(s(e, t))
                    }) : l.push("self" == e ? a : e)
                }), a.c = l, a.c.forEach(function(e) {
                    n(e, a)
                }), a.starts && n(a.starts, i);
                var u = a.c.map(function(e) {
                    return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b
                }).concat([a.tE, a.i]).map(t).filter(Boolean);
                a.t = u.length ? r(u.join("|"), !0) : {
                    exec: function() {
                        return null
                    }
                }
            }
        }
        n(e)
    }

    function u(e, r, a, i) {
        function s(e, t) {
            for (var r = 0; t.c.length > r; r++)
                if (n(t.c[r].bR, e)) return t.c[r]
        }

        function o(e, t) {
            if (n(e.eR, t)) {
                for (; e.endsParent && e.parent;) e = e.parent;
                return e
            }
            return e.eW ? o(e.parent, t) : void 0
        }

        function c(e, t) {
            return !a && n(t.iR, e)
        }

        function p(e, t) {
            var r = y.cI ? t[0].toLowerCase() : t[0];
            return e.k.hasOwnProperty(r) && e.k[r]
        }

        function h(e, t, r, n) {
            var a = n ? "" : w.classPrefix,
                i = '<span class="' + a,
                s = r ? "" : "</span>";
            return i += e + '">', i + t + s
        }

        function f() {
            if (!C.k) return t(j);
            var e = "",
                r = 0;
            C.lR.lastIndex = 0;
            for (var n = C.lR.exec(j); n;) {
                e += t(j.substr(r, n.index - r));
                var a = p(C, n);
                a ? (E += a[1], e += h(a[0], t(n[0]))) : e += t(n[0]), r = C.lR.lastIndex, n = C.lR.exec(j)
            }
            return e + t(j.substr(r))
        }

        function g() {
            var e = "string" == typeof C.sL;
            if (e && !N[C.sL]) return t(j);
            var r = e ? u(C.sL, j, !0, _[C.sL]) : d(j, C.sL.length ? C.sL : void 0);
            return C.r > 0 && (E += r.r), e && (_[C.sL] = r.top), h(r.language, r.value, !1, !0)
        }

        function m() {
            M += void 0 !== C.sL ? g() : f(), j = ""
        }

        function b(e, t) {
            M += e.cN ? h(e.cN, "", !0) : "", C = Object.create(e, {
                parent: {
                    value: C
                }
            })
        }

        function v(e, t) {
            if (j += e, void 0 === t) return m(), 0;
            var r = s(t, C);
            if (r) return r.skip ? j += t : (r.eB && (j += t), m(), r.rB || r.eB || (j = t)), b(r, t), r.rB ? 0 : t.length;
            var n = o(C, t);
            if (n) {
                var a = C;
                a.skip ? j += t : (a.rE || a.eE || (j += t), m(), a.eE && (j = t));
                do C.cN && (M += "</span>"), C.skip || (E += C.r), C = C.parent; while (C != n.parent);
                return n.starts && b(n.starts, ""), a.rE ? 0 : t.length
            }
            if (c(t, C)) throw Error('Illegal lexeme "' + t + '" for mode "' + (C.cN || "<unnamed>") + '"');
            return j += t, t.length || 1
        }
        var y = x(e);
        if (!y) throw Error('Unknown language: "' + e + '"');
        l(y);
        var k, C = i || y,
            _ = {},
            M = "";
        for (k = C; k != y; k = k.parent) k.cN && (M = h(k.cN, "", !0) + M);
        var j = "",
            E = 0;
        try {
            for (var A, B, $ = 0; C.t.lastIndex = $, A = C.t.exec(r), A;) B = v(r.substr($, A.index - $), A[0]), $ = A.index + B;
            for (v(r.substr($)), k = C; k.parent; k = k.parent) k.cN && (M += "</span>");
            return {
                r: E,
                value: M,
                language: e,
                top: C
            }
        } catch (S) {
            if (-1 != S.message.indexOf("Illegal")) return {
                r: 0,
                value: t(r)
            };
            throw S
        }
    }

    function d(e, r) {
        r = r || w.languages || Object.keys(N);
        var n = {
                r: 0,
                value: t(e)
            },
            a = n;
        return r.filter(x).forEach(function(t) {
            var r = u(t, e, !1);
            r.language = t, r.r > a.r && (a = r), r.r > n.r && (a = n, n = r)
        }), a.language && (n.second_best = a), n
    }

    function p(e) {
        return w.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, t) {
            return t.replace(/\t/g, w.tabReplace)
        })), w.useBR && (e = e.replace(/\n/g, "<br>")), e
    }

    function h(e, t, r) {
        var n = t ? k[t] : r,
            a = [e.trim()];
        return e.match(/\bhljs\b/) || a.push("hljs"), -1 === e.indexOf(n) && a.push(n), a.join(" ").trim()
    }

    function f(e) {
        var t = i(e);
        if (!a(t)) {
            var r;
            w.useBR ? (r = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), r.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : r = e;
            var n = r.textContent,
                s = t ? u(t, n, !0) : d(n),
                l = o(r);
            if (l.length) {
                var f = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                f.innerHTML = s.value, s.value = c(l, o(f), n)
            }
            s.value = p(s.value), e.innerHTML = s.value, e.className = h(e.className, t, s.language), e.result = {
                language: s.language,
                re: s.r
            }, s.second_best && (e.second_best = {
                language: s.second_best.language,
                re: s.second_best.r
            })
        }
    }

    function g(e) {
        w = s(w, e)
    }

    function m() {
        if (!m.called) {
            m.called = !0;
            var e = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(e, f)
        }
    }

    function b() {
        addEventListener("DOMContentLoaded", m, !1), addEventListener("load", m, !1)
    }

    function v(t, r) {
        var n = N[t] = r(e);
        n.aliases && n.aliases.forEach(function(e) {
            k[e] = t
        })
    }

    function y() {
        return Object.keys(N)
    }

    function x(e) {
        return e = (e || "").toLowerCase(), N[e] || N[k[e]]
    }
    var w = {
            classPrefix: "hljs-",
            tabReplace: null,
            useBR: !1,
            languages: void 0
        },
        N = {},
        k = {};
    return e.highlight = u, e.highlightAuto = d, e.fixMarkup = p, e.highlightBlock = f, e.configure = g, e.initHighlighting = m, e.initHighlightingOnLoad = b, e.ca = v, e.da = y, e.ea = x, e.inherit = s, e.IR = "[a-zA-Z]\\w*", e.UIR = "[a-zA-Z_]\\w*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    }, e.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [e.BE]
    }, e.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [e.BE]
    }, e.PWM = {
        b: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/
    }, e.C = function(t, r, n) {
        var a = e.inherit({
            cN: "comment",
            b: t,
            e: r,
            c: []
        }, n || {});
        return a.c.push(e.PWM), a.c.push({
            cN: "doctag",
            b: "(?:TODO|FIXME|NOTE|BUG|XXX):",
            r: 0
        }), a
    }, e.CLCM = e.C("//", "$"), e.CBCM = e.C("/\\*", "\\*/"), e.HCM = e.C("#", "$"), e.NM = {
        cN: "number",
        b: e.NR,
        r: 0
    }, e.CNM = {
        cN: "number",
        b: e.CNR,
        r: 0
    }, e.BNM = {
        cN: "number",
        b: e.BNR,
        r: 0
    }, e.CSSNM = {
        cN: "number",
        b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        r: 0
    }, e.RM = {
        cN: "regexp",
        b: /\//,
        e: /\/[gimuy]*/,
        i: /\n/,
        c: [e.BE, {
            b: /\[/,
            e: /\]/,
            r: 0,
            c: [e.BE]
        }]
    }, e.TM = {
        cN: "title",
        b: e.IR,
        r: 0
    }, e.UTM = {
        cN: "title",
        b: e.UIR,
        r: 0
    }, e.METHOD_GUARD = {
        b: "\\.\\s*" + e.UIR,
        r: 0
    }, e
}), hljs.ca("bash", function(e) {
    var t = {
            cN: "variable",
            v: [{
                b: /\$[\w\d#@][\w\d_]*/
            }, {
                b: /\$\{(.*?)}/
            }]
        },
        r = {
            cN: "string",
            b: /"/,
            e: /"/,
            c: [e.BE, t, {
                cN: "variable",
                b: /\$\(/,
                e: /\)/,
                c: [e.BE]
            }]
        },
        n = {
            cN: "string",
            b: /'/,
            e: /'/
        };
    return {
        aliases: ["sh", "zsh"],
        l: /-?[a-z\.]+/,
        k: {
            keyword: "if then else elif fi for while in do done case esac function",
            literal: "true false",
            built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
            _: "-ne -eq -lt -gt -f -d -e -s -l -a"
        },
        c: [{
            cN: "meta",
            b: /^#![^\n]+sh\s*$/,
            r: 10
        }, {
            cN: "function",
            b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
            rB: !0,
            c: [e.inherit(e.TM, {
                b: /\w[\w\d_]*/
            })],
            r: 0
        }, e.HCM, r, n, t]
    }
}), hljs.ca("xml", function(e) {
    var t = "[A-Za-z0-9\\._:-]+",
        r = {
            eW: !0,
            i: /</,
            r: 0,
            c: [{
                cN: "attr",
                b: t,
                r: 0
            }, {
                b: /=\s*/,
                r: 0,
                c: [{
                    cN: "string",
                    endsParent: !0,
                    v: [{
                        b: /"/,
                        e: /"/
                    }, {
                        b: /'/,
                        e: /'/
                    }, {
                        b: /[^\s"'=<>`]+/
                    }]
                }]
            }]
        };
    return {
        aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],
        cI: !0,
        c: [{
            cN: "meta",
            b: "<!DOCTYPE",
            e: ">",
            r: 10,
            c: [{
                b: "\\[",
                e: "\\]"
            }]
        }, e.C("<!--", "-->", {
            r: 10
        }), {
            b: "<\\!\\[CDATA\\[",
            e: "\\]\\]>",
            r: 10
        }, {
            b: /<\?(php)?/,
            e: /\?>/,
            sL: "php",
            c: [{
                b: "/\\*",
                e: "\\*/",
                skip: !0
            }]
        }, {
            cN: "tag",
            b: "<style(?=\\s|>|$)",
            e: ">",
            k: {
                name: "style"
            },
            c: [r],
            starts: {
                e: "</style>",
                rE: !0,
                sL: ["css", "xml"]
            }
        }, {
            cN: "tag",
            b: "<script(?=\\s|>|$)",
            e: ">",
            k: {
                name: "script"
            },
            c: [r],
            starts: {
                e: "</script>",
                rE: !0,
                sL: ["actionscript", "javascript", "handlebars", "xml"]
            }
        }, {
            cN: "meta",
            v: [{
                b: /<\?xml/,
                e: /\?>/,
                r: 10
            }, {
                b: /<\?\w+/,
                e: /\?>/
            }]
        }, {
            cN: "tag",
            b: "</?",
            e: "/?>",
            c: [{
                cN: "name",
                b: /[^\/><\s]+/,
                r: 0
            }, r]
        }]
    }
}), hljs.ca("apache", function(e) {
    var t = {
        cN: "number",
        b: "[\\$%]\\d+"
    };
    return {
        aliases: ["apacheconf"],
        cI: !0,
        c: [e.HCM, {
            cN: "section",
            b: "</?",
            e: ">"
        }, {
            cN: "attribute",
            b: /\w+/,
            r: 0,
            k: {
                nomarkup: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
            },
            starts: {
                e: /$/,
                r: 0,
                k: {
                    literal: "on off all"
                },
                c: [{
                    cN: "meta",
                    b: "\\s\\[",
                    e: "\\]$"
                }, {
                    cN: "variable",
                    b: "[\\$%]\\{",
                    e: "\\}",
                    c: ["self", t]
                }, t, e.QSM]
            }
        }],
        i: /\S/
    }
}), hljs.ca("java", function(e) {
    var t = e.UIR + "(<" + e.UIR + "(\\s*,\\s*" + e.UIR + ")*>)?",
        r = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports",
        n = "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
        a = {
            cN: "number",
            b: n,
            r: 0
        };
    return {
        aliases: ["jsp"],
        k: r,
        i: /<\/|#/,
        c: [e.C("/\\*\\*", "\\*/", {
            r: 0,
            c: [{
                b: /\w+@/,
                r: 0
            }, {
                cN: "doctag",
                b: "@[A-Za-z]+"
            }]
        }), e.CLCM, e.CBCM, e.ASM, e.QSM, {
            cN: "class",
            bK: "class interface",
            e: /[{;=]/,
            eE: !0,
            k: "class interface",
            i: /[:"\[\]]/,
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, {
            bK: "new throw return else",
            r: 0
        }, {
            cN: "function",
            b: "(" + t + "\\s+)+" + e.UIR + "\\s*\\(",
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: r,
            c: [{
                b: e.UIR + "\\s*\\(",
                rB: !0,
                r: 0,
                c: [e.UTM]
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                k: r,
                r: 0,
                c: [e.ASM, e.QSM, e.CNM, e.CBCM]
            }, e.CLCM, e.CBCM]
        }, a, {
            cN: "meta",
            b: "@[A-Za-z]+"
        }]
    }
}), hljs.ca("perl", function(e) {
    var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
        r = {
            cN: "subst",
            b: "[$@]\\{",
            e: "\\}",
            k: t
        },
        n = {
            b: "->{",
            e: "}"
        },
        a = {
            v: [{
                b: /\$\d/
            }, {
                b: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/
            }, {
                b: /[\$%@][^\s\w{]/,
                r: 0
            }]
        },
        i = [e.BE, r, a],
        s = [a, e.HCM, e.C("^\\=\\w", "\\=cut", {
            eW: !0
        }), n, {
            cN: "string",
            c: i,
            v: [{
                b: "q[qwxr]?\\s*\\(",
                e: "\\)",
                r: 5
            }, {
                b: "q[qwxr]?\\s*\\[",
                e: "\\]",
                r: 5
            }, {
                b: "q[qwxr]?\\s*\\{",
                e: "\\}",
                r: 5
            }, {
                b: "q[qwxr]?\\s*\\|",
                e: "\\|",
                r: 5
            }, {
                b: "q[qwxr]?\\s*\\<",
                e: "\\>",
                r: 5
            }, {
                b: "qw\\s+q",
                e: "q",
                r: 5
            }, {
                b: "'",
                e: "'",
                c: [e.BE]
            }, {
                b: '"',
                e: '"'
            }, {
                b: "`",
                e: "`",
                c: [e.BE]
            }, {
                b: "{\\w+}",
                c: [],
                r: 0
            }, {
                b: "-?\\w+\\s*\\=\\>",
                c: [],
                r: 0
            }]
        }, {
            cN: "number",
            b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
            r: 0
        }, {
            b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
            k: "split return print reverse grep",
            r: 0,
            c: [e.HCM, {
                cN: "regexp",
                b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
                r: 10
            }, {
                cN: "regexp",
                b: "(m|qr)?/",
                e: "/[a-z]*",
                c: [e.BE],
                r: 0
            }]
        }, {
            cN: "function",
            bK: "sub",
            e: "(\\s*\\(.*?\\))?[;{]",
            eE: !0,
            r: 5,
            c: [e.TM]
        }, {
            b: "-\\w\\b",
            r: 0
        }, {
            b: "^__DATA__$",
            e: "^__END__$",
            sL: "mojolicious",
            c: [{
                b: "^@@.*",
                e: "$",
                cN: "comment"
            }]
        }];
    return r.c = s, n.c = s, {
        aliases: ["pl", "pm"],
        l: /[\w\.]+/,
        k: t,
        c: s
    }
}), hljs.ca("css", function(e) {
    var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
        r = {
            b: /[A-Z\_\.\-]+\s*:/,
            rB: !0,
            e: ";",
            eW: !0,
            c: [{
                cN: "attribute",
                b: /\S/,
                e: ":",
                eE: !0,
                starts: {
                    eW: !0,
                    eE: !0,
                    c: [{
                        b: /[\w-]+\(/,
                        rB: !0,
                        c: [{
                            cN: "built_in",
                            b: /[\w-]+/
                        }, {
                            b: /\(/,
                            e: /\)/,
                            c: [e.ASM, e.QSM]
                        }]
                    }, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
                        cN: "number",
                        b: "#[0-9A-Fa-f]+"
                    }, {
                        cN: "meta",
                        b: "!important"
                    }]
                }
            }]
        };
    return {
        cI: !0,
        i: /[=\/|'\$]/,
        c: [e.CBCM, {
            cN: "selector-id",
            b: /#[A-Za-z0-9_-]+/
        }, {
            cN: "selector-class",
            b: /\.[A-Za-z0-9_-]+/
        }, {
            cN: "selector-attr",
            b: /\[/,
            e: /\]/,
            i: "$"
        }, {
            cN: "selector-pseudo",
            b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/
        }, {
            b: "@(font-face|page)",
            l: "[a-z-]+",
            k: "font-face page"
        }, {
            b: "@",
            e: "[{;]",
            i: /:/,
            c: [{
                cN: "keyword",
                b: /\w+/
            }, {
                b: /\s/,
                eW: !0,
                eE: !0,
                r: 0,
                c: [e.ASM, e.QSM, e.CSSNM]
            }]
        }, {
            cN: "selector-tag",
            b: t,
            r: 0
        }, {
            b: "{",
            e: "}",
            i: /\S/,
            c: [e.CBCM, r]
        }]
    }
}), hljs.ca("ruby", function(e) {
    var t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
        r = {
            keyword: "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
            literal: "true false nil"
        },
        n = {
            cN: "doctag",
            b: "@[A-Za-z]+"
        },
        a = {
            b: "#<",
            e: ">"
        },
        i = [e.C("#", "$", {
            c: [n]
        }), e.C("^\\=begin", "^\\=end", {
            c: [n],
            r: 10
        }), e.C("^__END__", "\\n$")],
        s = {
            cN: "subst",
            b: "#\\{",
            e: "}",
            k: r
        },
        o = {
            cN: "string",
            c: [e.BE, s],
            v: [{
                b: /'/,
                e: /'/
            }, {
                b: /"/,
                e: /"/
            }, {
                b: /`/,
                e: /`/
            }, {
                b: "%[qQwWx]?\\(",
                e: "\\)"
            }, {
                b: "%[qQwWx]?\\[",
                e: "\\]"
            }, {
                b: "%[qQwWx]?{",
                e: "}"
            }, {
                b: "%[qQwWx]?<",
                e: ">"
            }, {
                b: "%[qQwWx]?/",
                e: "/"
            }, {
                b: "%[qQwWx]?%",
                e: "%"
            }, {
                b: "%[qQwWx]?-",
                e: "-"
            }, {
                b: "%[qQwWx]?\\|",
                e: "\\|"
            }, {
                b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
            }]
        },
        c = {
            cN: "params",
            b: "\\(",
            e: "\\)",
            endsParent: !0,
            k: r
        },
        l = [o, a, {
            cN: "class",
            bK: "class module",
            e: "$|;",
            i: /=/,
            c: [e.inherit(e.TM, {
                b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
            }), {
                b: "<\\s*",
                c: [{
                    b: "(" + e.IR + "::)?" + e.IR
                }]
            }].concat(i)
        }, {
            cN: "function",
            bK: "def",
            e: "$|;",
            c: [e.inherit(e.TM, {
                b: t
            }), c].concat(i)
        }, {
            b: e.IR + "::"
        }, {
            cN: "symbol",
            b: e.UIR + "(\\!|\\?)?:",
            r: 0
        }, {
            cN: "symbol",
            b: ":(?!\\s)",
            c: [o, {
                b: t
            }],
            r: 0
        }, {
            cN: "number",
            b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
            r: 0
        }, {
            b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
        }, {
            cN: "params",
            b: /\|/,
            e: /\|/,
            k: r
        }, {
            b: "(" + e.RSR + ")\\s*",
            c: [a, {
                cN: "regexp",
                c: [e.BE, s],
                i: /\n/,
                v: [{
                    b: "/",
                    e: "/[a-z]*"
                }, {
                    b: "%r{",
                    e: "}[a-z]*"
                }, {
                    b: "%r\\(",
                    e: "\\)[a-z]*"
                }, {
                    b: "%r!",
                    e: "![a-z]*"
                }, {
                    b: "%r\\[",
                    e: "\\][a-z]*"
                }]
            }].concat(i),
            r: 0
        }].concat(i);
    s.c = l, c.c = l;
    var u = "[>?]>",
        d = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
        p = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",
        h = [{
            b: /^\s*=>/,
            starts: {
                e: "$",
                c: l
            }
        }, {
            cN: "meta",
            b: "^(" + u + "|" + d + "|" + p + ")",
            starts: {
                e: "$",
                c: l
            }
        }];
    return {
        aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
        k: r,
        i: /\/\*/,
        c: i.concat(h).concat(l)
    }
}), hljs.ca("coffeescript", function(e) {
    var t = {
            keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
            literal: "true false null undefined yes no on off",
            built_in: "npm require console print module global window document"
        },
        r = "[A-Za-z$_][0-9A-Za-z$_]*",
        n = {
            cN: "subst",
            b: /#\{/,
            e: /}/,
            k: t
        },
        a = [e.BNM, e.inherit(e.CNM, {
            starts: {
                e: "(\\s*/)?",
                r: 0
            }
        }), {
            cN: "string",
            v: [{
                b: /'''/,
                e: /'''/,
                c: [e.BE]
            }, {
                b: /'/,
                e: /'/,
                c: [e.BE]
            }, {
                b: /"""/,
                e: /"""/,
                c: [e.BE, n]
            }, {
                b: /"/,
                e: /"/,
                c: [e.BE, n]
            }]
        }, {
            cN: "regexp",
            v: [{
                b: "///",
                e: "///",
                c: [n, e.HCM]
            }, {
                b: "//[gim]*",
                r: 0
            }, {
                b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
            }]
        }, {
            b: "@" + r
        }, {
            b: "`",
            e: "`",
            eB: !0,
            eE: !0,
            sL: "javascript"
        }];
    n.c = a;
    var i = e.inherit(e.TM, {
            b: r
        }),
        s = "(\\(.*\\))?\\s*\\B[-=]>",
        o = {
            cN: "params",
            b: "\\([^\\(]",
            rB: !0,
            c: [{
                b: /\(/,
                e: /\)/,
                k: t,
                c: ["self"].concat(a)
            }]
        };
    return {
        aliases: ["coffee", "cson", "iced"],
        k: t,
        i: /\/\*/,
        c: a.concat([e.C("###", "###"), e.HCM, {
            cN: "function",
            b: "^\\s*" + r + "\\s*=\\s*" + s,
            e: "[-=]>",
            rB: !0,
            c: [i, o]
        }, {
            b: /[:\(,=]\s*/,
            r: 0,
            c: [{
                cN: "function",
                b: s,
                e: "[-=]>",
                rB: !0,
                c: [o]
            }]
        }, {
            cN: "class",
            bK: "class",
            e: "$",
            i: /[:="\[\]]/,
            c: [{
                bK: "extends",
                eW: !0,
                i: /[:="\[\]]/,
                c: [i]
            }, i]
        }, {
            b: r + ":",
            e: ":",
            rB: !0,
            rE: !0,
            r: 0
        }])
    }
}), hljs.ca("http", function(e) {
    var t = "HTTP/[0-9\\.]+";
    return {
        aliases: ["https"],
        i: "\\S",
        c: [{
            b: "^" + t,
            e: "$",
            c: [{
                cN: "number",
                b: "\\b\\d{3}\\b"
            }]
        }, {
            b: "^[A-Z]+ (.*?) " + t + "$",
            rB: !0,
            e: "$",
            c: [{
                cN: "string",
                b: " ",
                e: " ",
                eB: !0,
                eE: !0
            }, {
                b: t
            }, {
                cN: "keyword",
                b: "[A-Z]+"
            }]
        }, {
            cN: "attribute",
            b: "^\\w",
            e: ": ",
            eE: !0,
            i: "\\n|\\s|=",
            starts: {
                e: "$",
                r: 0
            }
        }, {
            b: "\\n\\n",
            starts: {
                sL: [],
                eW: !0
            }
        }]
    }
}), hljs.ca("makefile", function(e) {
    var t = {
        cN: "variable",
        b: /\$\(/,
        e: /\)/,
        c: [e.BE]
    };
    return {
        aliases: ["mk", "mak"],
        c: [e.HCM, {
            b: /^\w+\s*\W*=/,
            rB: !0,
            r: 0,
            starts: {
                e: /\s*\W*=/,
                eE: !0,
                starts: {
                    e: /$/,
                    r: 0,
                    c: [t]
                }
            }
        }, {
            cN: "section",
            b: /^[\w]+:\s*$/
        }, {
            cN: "meta",
            b: /^\.PHONY:/,
            e: /$/,
            k: {
                "meta-keyword": ".PHONY"
            },
            l: /[\.\w]+/
        }, {
            b: /^\t+/,
            e: /$/,
            r: 0,
            c: [e.QSM, t]
        }]
    }
}), hljs.ca("cs", function(e) {
    var t = {
            keyword: "abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield",
            literal: "null false true"
        },
        r = e.IR + "(<" + e.IR + ">)?(\\[\\])?";
    return {
        aliases: ["csharp"],
        k: t,
        i: /::/,
        c: [e.C("///", "$", {
            rB: !0,
            c: [{
                cN: "doctag",
                v: [{
                    b: "///",
                    r: 0
                }, {
                    b: "<!--|-->"
                }, {
                    b: "</?",
                    e: ">"
                }]
            }]
        }), e.CLCM, e.CBCM, {
            cN: "meta",
            b: "#",
            e: "$",
            k: {
                "meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum"
            }
        }, {
            cN: "string",
            b: '@"',
            e: '"',
            c: [{
                b: '""'
            }]
        }, e.ASM, e.QSM, e.CNM, {
            bK: "class interface",
            e: /[{;=]/,
            i: /[^\s:]/,
            c: [e.TM, e.CLCM, e.CBCM]
        }, {
            bK: "namespace",
            e: /[{;=]/,
            i: /[^\s:]/,
            c: [e.inherit(e.TM, {
                b: "[a-zA-Z](\\.?\\w)*"
            }), e.CLCM, e.CBCM]
        }, {
            bK: "new return throw await",
            r: 0
        }, {
            cN: "function",
            b: "(" + r + "\\s+)+" + e.IR + "\\s*\\(",
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: t,
            c: [{
                b: e.IR + "\\s*\\(",
                rB: !0,
                c: [e.TM],
                r: 0
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                eB: !0,
                eE: !0,
                k: t,
                r: 0,
                c: [e.ASM, e.QSM, e.CNM, e.CBCM]
            }, e.CLCM, e.CBCM]
        }]
    }
}), hljs.ca("sql", function(e) {
    var t = e.C("--", "$");
    return {
        cI: !0,
        i: /[<>{}*#]/,
        c: [{
            bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke",
            e: /;/,
            eW: !0,
            l: /[\w\.]+/,
            k: {
                keyword: "",
                literal: "true false null",
                built_in: "array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"
            },
            c: [{
                cN: "string",
                b: "'",
                e: "'",
                c: [e.BE, {
                    b: "''"
                }]
            }, {
                cN: "string",
                b: '"',
                e: '"',
                c: [e.BE, {
                    b: '""'
                }]
            }, {
                cN: "string",
                b: "`",
                e: "`",
                c: [e.BE]
            }, e.CNM, e.CBCM, t]
        }, e.CBCM, t]
    }
}), hljs.ca("python", function(e) {
    var t = {
            cN: "meta",
            b: /^(>>>|\.\.\.) /
        },
        r = {
            cN: "string",
            c: [e.BE],
            v: [{
                b: /(u|b)?r?'''/,
                e: /'''/,
                c: [t],
                r: 10
            }, {
                b: /(u|b)?r?"""/,
                e: /"""/,
                c: [t],
                r: 10
            }, {
                b: /(u|r|ur)'/,
                e: /'/,
                r: 10
            }, {
                b: /(u|r|ur)"/,
                e: /"/,
                r: 10
            }, {
                b: /(b|br)'/,
                e: /'/
            }, {
                b: /(b|br)"/,
                e: /"/
            }, e.ASM, e.QSM]
        },
        n = {
            cN: "number",
            r: 0,
            v: [{
                b: e.BNR + "[lLjJ]?"
            }, {
                b: "\\b(0o[0-7]+)[lLjJ]?"
            }, {
                b: e.CNR + "[lLjJ]?"
            }]
        },
        a = {
            cN: "params",
            b: /\(/,
            e: /\)/,
            c: ["self", t, n, r]
        };
    return {
        aliases: ["py", "gyp"],
        k: {
            keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",
            built_in: "Ellipsis NotImplemented"
        },
        i: /(<\/|->|\?)/,
        c: [t, n, r, e.HCM, {
            v: [{
                cN: "function",
                bK: "def",
                r: 10
            }, {
                cN: "class",
                bK: "class"
            }],
            e: /:/,
            i: /[${=;\n,]/,
            c: [e.UTM, a, {
                b: /->/,
                eW: !0,
                k: "None"
            }]
        }, {
            cN: "meta",
            b: /^[\t ]*@/,
            e: /$/
        }, {
            b: /\b(print|exec)\(/
        }]
    }
}), hljs.ca("objectivec", function(e) {
    var t = {
            cN: "built_in",
            b: "(AV|CA|CF|CG|CI|MK|MP|NS|UI|XC)\\w+"
        },
        r = {
            keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required",
            literal: "false true FALSE TRUE nil YES NO NULL",
            built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
        },
        n = /[a-zA-Z@][a-zA-Z0-9_]*/,
        a = "@interface @class @protocol @implementation";
    return {
        aliases: ["mm", "objc", "obj-c"],
        k: r,
        l: n,
        i: "</",
        c: [t, e.CLCM, e.CBCM, e.CNM, e.QSM, {
            cN: "string",
            v: [{
                b: '@"',
                e: '"',
                i: "\\n",
                c: [e.BE]
            }, {
                b: "'",
                e: "[^\\\\]'",
                i: "[^\\\\][^']"
            }]
        }, {
            cN: "meta",
            b: "#",
            e: "$",
            c: [{
                cN: "meta-string",
                v: [{
                    b: '"',
                    e: '"'
                }, {
                    b: "<",
                    e: ">"
                }]
            }]
        }, {
            cN: "class",
            b: "(" + a.split(" ").join("|") + ")\\b",
            e: "({|$)",
            eE: !0,
            k: a,
            l: n,
            c: [e.UTM]
        }, {
            b: "\\." + e.UIR,
            r: 0
        }]
    }
}), hljs.ca("php", function(e) {
    var t = {
            b: "\\$+[a-zA-Z_-\xff][a-zA-Z0-9_-\xff]*"
        },
        r = {
            cN: "meta",
            b: /<\?(php)?|\?>/
        },
        n = {
            cN: "string",
            c: [e.BE, r],
            v: [{
                b: 'b"',
                e: '"'
            }, {
                b: "b'",
                e: "'"
            }, e.inherit(e.ASM, {
                i: null
            }), e.inherit(e.QSM, {
                i: null
            })]
        },
        a = {
            v: [e.BNM, e.CNM]
        };
    return {
        aliases: ["php3", "php4", "php5", "php6"],
        cI: !0,
        k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
        c: [e.HCM, e.C("//", "$", {
            c: [r]
        }), e.C("/\\*", "\\*/", {
            c: [{
                cN: "doctag",
                b: "@[A-Za-z]+"
            }]
        }), e.C("__halt_compiler.+?;", !1, {
            eW: !0,
            k: "__halt_compiler",
            l: e.UIR
        }), {
            cN: "string",
            b: /<<<['"]?\w+['"]?$/,
            e: /^\w+;?$/,
            c: [e.BE, {
                cN: "subst",
                v: [{
                    b: /\$\w+/
                }, {
                    b: /\{\$/,
                    e: /\}/
                }]
            }]
        }, r, t, {
            b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
        }, {
            cN: "function",
            bK: "function",
            e: /[;{]/,
            eE: !0,
            i: "\\$|\\[|%",
            c: [e.UTM, {
                cN: "params",
                b: "\\(",
                e: "\\)",
                c: ["self", t, e.CBCM, n, a]
            }]
        }, {
            cN: "class",
            bK: "class interface",
            e: "{",
            eE: !0,
            i: /[:\(\$"]/,
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, {
            bK: "namespace",
            e: ";",
            i: /[\.']/,
            c: [e.UTM]
        }, {
            bK: "use",
            e: ";",
            c: [e.UTM]
        }, {
            b: "=>"
        }, n, a]
    }
}), hljs.ca("javascript", function(e) {
    return {
        aliases: ["js", "jsx"],
        k: {
            keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",
            literal: "true false null undefined NaN Infinity",
            built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
        },
        c: [{
            cN: "meta",
            r: 10,
            b: /^\s*['"]use (strict|asm)['"]/
        }, {
            cN: "meta",
            b: /^#!/,
            e: /$/
        }, e.ASM, e.QSM, {
            cN: "string",
            b: "`",
            e: "`",
            c: [e.BE, {
                cN: "subst",
                b: "\\$\\{",
                e: "\\}"
            }]
        }, e.CLCM, e.CBCM, {
            cN: "number",
            v: [{
                b: "\\b(0[bB][01]+)"
            }, {
                b: "\\b(0[oO][0-7]+)"
            }, {
                b: e.CNR
            }],
            r: 0
        }, {
            b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
            k: "return throw case",
            c: [e.CLCM, e.CBCM, e.RM, {
                b: /</,
                e: /(\/\w+|\w+\/)>/,
                sL: "xml",
                c: [{
                    b: /<\w+\s*\/>/,
                    skip: !0
                }, {
                    b: /<\w+/,
                    e: /(\/\w+|\w+\/)>/,
                    skip: !0,
                    c: ["self"]
                }]
            }],
            r: 0
        }, {
            cN: "function",
            bK: "function",
            e: /\{/,
            eE: !0,
            c: [e.inherit(e.TM, {
                b: /[A-Za-z$_][0-9A-Za-z$_]*/
            }), {
                cN: "params",
                b: /\(/,
                e: /\)/,
                eB: !0,
                eE: !0,
                c: [e.CLCM, e.CBCM]
            }],
            i: /\[|%/
        }, {
            b: /\$[(.]/
        }, e.METHOD_GUARD, {
            cN: "class",
            bK: "class",
            e: /[{;=]/,
            eE: !0,
            i: /[:"\[\]]/,
            c: [{
                bK: "extends"
            }, e.UTM]
        }, {
            bK: "constructor",
            e: /\{/,
            eE: !0
        }],
        i: /#(?!!)/
    }
}), hljs.ca("json", function(e) {
    var t = {
            literal: "true false null"
        },
        r = [e.QSM, e.CNM],
        n = {
            e: ",",
            eW: !0,
            eE: !0,
            c: r,
            k: t
        },
        a = {
            b: "{",
            e: "}",
            c: [{
                cN: "attr",
                b: /"/,
                e: /"/,
                c: [e.BE],
                i: "\\n"
            }, e.inherit(n, {
                b: /:/
            })],
            i: "\\S"
        },
        i = {
            b: "\\[",
            e: "\\]",
            c: [e.inherit(n)],
            i: "\\S"
        };
    return r.splice(r.length, 0, a, i), {
        c: r,
        k: t,
        i: "\\S"
    }
}), hljs.ca("cpp", function(e) {
    var t = {
            cN: "keyword",
            b: "\\b[a-z\\d_]*_t\\b"
        },
        r = {
            cN: "string",
            v: [e.inherit(e.QSM, {
                b: '((u8?|U)|L)?"'
            }), {
                b: '(u8?|U)?R"',
                e: '"',
                c: [e.BE]
            }, {
                b: "'\\\\?.",
                e: "'",
                i: "."
            }]
        },
        n = {
            cN: "number",
            v: [{
                b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
            }, {
                b: e.CNR
            }],
            r: 0
        },
        a = {
            cN: "meta",
            b: "#",
            e: "$",
            k: {
                "meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef"
            },
            c: [{
                b: /\\\n/,
                r: 0
            }, {
                bK: "include",
                e: "$",
                k: {
                    "meta-keyword": "include"
                },
                c: [e.inherit(r, {
                    cN: "meta-string"
                }), {
                    cN: "meta-string",
                    b: "<",
                    e: ">",
                    i: "\\n"
                }]
            }, r, e.CLCM, e.CBCM]
        },
        i = e.IR + "\\s*\\(",
        s = {
            keyword: "int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong",
            built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr",
            literal: "true false nullptr NULL"
        },
        o = [t, e.CLCM, e.CBCM, n, r];
    return {
        aliases: ["c", "cc", "h", "c++", "h++", "hpp"],
        k: s,
        i: "</",
        c: o.concat([a, {
            b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
            e: ">",
            k: s,
            c: ["self", t]
        }, {
            b: e.IR + "::",
            k: s
        }, {
            v: [{
                b: /=/,
                e: /;/
            }, {
                b: /\(/,
                e: /\)/
            }, {
                bK: "new throw return else",
                e: /;/
            }],
            k: s,
            c: o.concat([{
                b: /\(/,
                e: /\)/,
                c: o.concat(["self"]),
                r: 0
            }]),
            r: 0
        }, {
            cN: "function",
            b: "(" + e.IR + "[\\*&\\s]+)+" + i,
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: s,
            i: /[^\w\s\*&]/,
            c: [{
                b: i,
                rB: !0,
                c: [e.TM],
                r: 0
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                k: s,
                r: 0,
                c: [e.CLCM, e.CBCM, r, n]
            }, e.CLCM, e.CBCM, a]
        }])
    }
});
