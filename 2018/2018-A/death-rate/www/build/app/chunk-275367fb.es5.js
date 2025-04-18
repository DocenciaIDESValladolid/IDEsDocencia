var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*! Built with http://stenciljs.com */
App.loadBundle("chunk-275367fb.js", ["exports", "./chunk-12ee72ee.js"], function (e, t) { window.App.h; var r = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, n = new RegExp("[\\-\\.0-9" + r.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"), i = new RegExp("^" + r.source + n.source + "*(?::" + r.source + n.source + "*)?$"), a = 0, o = 1, s = 2, l = 3, c = 4, u = 5, h = 6, f = 7; function d() { } function p(e, t) { return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t; } function m(e, t, r, n, i, d) { for (var p, m = ++t, g = a;;) {
    var w = e.charAt(m);
    switch (w) {
        case "=":
            if (g === o)
                p = e.slice(t, m), g = l;
            else {
                if (g !== s)
                    throw new Error("attribute equal must after attrName");
                g = l;
            }
            break;
        case "'":
        case '"':
            if (g === l || g === o) {
                if (g === o && (d.warning('attribute value must after "="'), p = e.slice(t, m)), t = m + 1, !((m = e.indexOf(w, t)) > 0))
                    throw new Error("attribute value no end '" + w + "' match");
                y = e.slice(t, m).replace(/&#?\w+;/g, i), r.add(p, y, t - 1), g = u;
            }
            else {
                if (g != c)
                    throw new Error('attribute value must after "="');
                y = e.slice(t, m).replace(/&#?\w+;/g, i), r.add(p, y, t), d.warning('attribute "' + p + '" missed start quot(' + w + ")!!"), t = m + 1, g = u;
            }
            break;
        case "/":
            switch (g) {
                case a: r.setTagName(e.slice(t, m));
                case u:
                case h:
                case f: g = f, r.closed = !0;
                case c:
                case o:
                case s: break;
                default: throw new Error("attribute invalid close char('/')");
            }
            break;
        case "": return d.error("unexpected end of input"), g == a && r.setTagName(e.slice(t, m)), m;
        case ">":
            switch (g) {
                case a: r.setTagName(e.slice(t, m));
                case u:
                case h:
                case f: break;
                case c:
                case o: "/" === (y = e.slice(t, m)).slice(-1) && (r.closed = !0, y = y.slice(0, -1));
                case s:
                    g === s && (y = p), g == c ? (d.warning('attribute "' + y + '" missed quot(")!!'), r.add(p, y.replace(/&#?\w+;/g, i), t)) : ("http://www.w3.org/1999/xhtml" === n[""] && y.match(/^(?:disabled|checked|selected)$/i) || d.warning('attribute "' + y + '" missed value!! "' + y + '" instead!!'), r.add(y, y, t));
                    break;
                case l: throw new Error("attribute value missed!!");
            }
            return m;
        case "": w = " ";
        default: if (w <= " ")
            switch (g) {
                case a:
                    r.setTagName(e.slice(t, m)), g = h;
                    break;
                case o:
                    p = e.slice(t, m), g = s;
                    break;
                case c:
                    var y = e.slice(t, m).replace(/&#?\w+;/g, i);
                    d.warning('attribute "' + y + '" missed quot(")!!'), r.add(p, y, t);
                case u: g = h;
            }
        else
            switch (g) {
                case s:
                    r.tagName, "http://www.w3.org/1999/xhtml" === n[""] && p.match(/^(?:disabled|checked|selected)$/i) || d.warning('attribute "' + p + '" missed value!! "' + p + '" instead2!!'), r.add(p, p, t), t = m, g = o;
                    break;
                case u: d.warning('attribute space is required"' + p + '"!!');
                case h:
                    g = o, t = m;
                    break;
                case l:
                    g = c, t = m;
                    break;
                case f: throw new Error("elements closed character '/' and '>' must be connected to");
            }
    }
    m++;
} } function g(e, t, r) { for (var n = e.tagName, i = null, a = e.length; a--;) {
    var o = e[a], s = o.qName, l = o.value;
    if ((f = s.indexOf(":")) > 0)
        var c = o.prefix = s.slice(0, f), u = s.slice(f + 1), h = "xmlns" === c && u;
    else
        u = s, c = null, h = "xmlns" === s && "";
    o.localName = u, !1 !== h && (null == i && (i = {}, b(r, r = {})), r[h] = i[h] = l, o.uri = "http://www.w3.org/2000/xmlns/", t.startPrefixMapping(h, l));
} for (a = e.length; a--;)
    (c = (o = e[a]).prefix) && ("xml" === c && (o.uri = "http://www.w3.org/XML/1998/namespace"), "xmlns" !== c && (o.uri = r[c || ""])); var f; (f = n.indexOf(":")) > 0 ? (c = e.prefix = n.slice(0, f), u = e.localName = n.slice(f + 1)) : (c = null, u = e.localName = n); var d = e.uri = r[c || ""]; if (t.startElement(d, u, n, e), !e.closed)
    return e.currentNSMap = r, e.localNSMap = i, !0; if (t.endElement(d, u, n), i)
    for (c in i)
        t.endPrefixMapping(c); } function w(e, t, r, n, i) { if (/^(?:script|textarea)$/i.test(r)) {
    var a = e.indexOf("</" + r + ">", t), o = e.substring(t + 1, a);
    if (/[&<]/.test(o))
        return /^script$/i.test(r) ? (i.characters(o, 0, o.length), a) : (o = o.replace(/&#?\w+;/g, n), i.characters(o, 0, o.length), a);
} return t + 1; } function y(e, t, r, n) { var i = n[r]; return null == i && ((i = e.lastIndexOf("</" + r + ">")) < t && (i = e.lastIndexOf("</" + r)), n[r] = i), i < t; } function b(e, t) { for (var r in e)
    t[r] = e[r]; } function v(e, t, r, n) { switch (e.charAt(t + 2)) {
    case "-": return "-" === e.charAt(t + 3) ? (i = e.indexOf("--\x3e", t + 4)) > t ? (r.comment(e, t + 4, i - t - 4), i + 3) : (n.error("Unclosed comment"), -1) : -1;
    default:
        if ("CDATA[" == e.substr(t + 3, 6)) {
            var i = e.indexOf("]]>", t + 9);
            return r.startCDATA(), r.characters(e, t + 9, i - t - 9), r.endCDATA(), i + 3;
        }
        var a = function (e, t) { var r, n = [], i = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g; for (i.lastIndex = t, i.exec(e); r = i.exec(e);)
            if (n.push(r), r[1])
                return n; }(e, t), o = a.length;
        if (o > 1 && /!doctype/i.test(a[0][0])) {
            var s = a[1][0], l = o > 3 && /^public$/i.test(a[2][0]) && a[3][0], c = o > 4 && a[4][0], u = a[o - 1];
            return r.startDTD(s, l && l.replace(/^(['"])(.*?)\1$/, "$2"), c && c.replace(/^(['"])(.*?)\1$/, "$2")), r.endDTD(), u.index + u[0].length;
        }
} return -1; } function _(e, t, r) { var n = e.indexOf("?>", t); if (n) {
    var i = e.substring(t, n).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
    return i ? (i[0].length, r.processingInstruction(i[1], i[2]), n + 2) : -1;
} return -1; } function E(e) { } function N(e, t) { return e.__proto__ = t, e; } d.prototype = { parse: function (e, t, r) { var n = this.domBuilder; n.startDocument(), b(t, t = {}), function (e, t, r, n, i) { function a(e) { var t = e.slice(1, -1); return t in r ? r[t] : "#" === t.charAt(0) ? function (e) { if (e > 65535) {
        var t = 55296 + ((e -= 65536) >> 10), r = 56320 + (1023 & e);
        return String.fromCharCode(t, r);
    } return String.fromCharCode(e); }(parseInt(t.substr(1).replace("x", "0x"))) : (i.error("entity not found:" + e), e); } function o(t) { if (t > b) {
        var r = e.substring(b, t).replace(/&#?\w+;/g, a);
        h && s(b), n.characters(r, 0, t - b), b = t;
    } } function s(t, r) { for (; t >= c && (r = u.exec(e));)
        l = r.index, c = l + r[0].length, h.lineNumber++; h.columnNumber = t - l + 1; } for (var l = 0, c = 0, u = /.*(?:\r\n?|\n)|.*$/g, h = n.locator, f = [{ currentNSMap: t }], d = {}, b = 0;;) {
        try {
            var N = e.indexOf("<", b);
            if (N < 0) {
                if (!e.substr(b).match(/^\s*$/)) {
                    var S = n.doc, D = S.createTextNode(e.substr(b));
                    S.appendChild(D), n.currentElement = D;
                }
                return;
            }
            switch ((N > b && o(N), e.charAt(N + 1))) {
                case "/":
                    var T = e.indexOf(">", N + 3), x = e.substring(N + 2, T), I = f.pop();
                    T < 0 ? (x = e.substring(N + 2).replace(/[\s<].*/, ""), i.error("end tag name: " + x + " is not complete:" + I.tagName), T = N + 1 + x.length) : x.match(/\s</) && (x = x.replace(/[\s<].*/, ""), i.error("end tag name: " + x + " maybe not complete"), T = N + 1 + x.length);
                    var A = I.localNSMap, k = I.tagName == x;
                    if (k || I.tagName && I.tagName.toLowerCase() == x.toLowerCase()) {
                        if (n.endElement(I.uri, I.localName, x), A)
                            for (var C in A)
                                n.endPrefixMapping(C);
                        k || i.fatalError("end tag name: " + x + " is not match the current start tagName:" + I.tagName);
                    }
                    else
                        f.push(I);
                    T++;
                    break;
                case "?":
                    h && s(N), T = _(e, N, n);
                    break;
                case "!":
                    h && s(N), T = v(e, N, n, i);
                    break;
                default:
                    h && s(N);
                    var O = new E, R = f[f.length - 1].currentNSMap, F = (T = m(e, N, O, R, a, i), O.length);
                    if (!O.closed && y(e, T, O.tagName, d) && (O.closed = !0, r.nbsp || i.warning("unclosed xml attribute")), h && F) {
                        for (var L = p(h, {}), M = 0; M < F; M++) {
                            var B = O[M];
                            s(B.offset), B.locator = p(h, {});
                        }
                        n.locator = L, g(O, n, R) && f.push(O), n.locator = h;
                    }
                    else
                        g(O, n, R) && f.push(O);
                    "http://www.w3.org/1999/xhtml" !== O.uri || O.closed ? T++ : T = w(e, T, O.tagName, a, n);
            }
        }
        catch (e) {
            i.error("element parse error: " + e), T = -1;
        }
        T > b ? b = T : o(Math.max(N, b) + 1);
    } }(e, t, r, n, this.errorHandler), n.endDocument(); } }, E.prototype = { setTagName: function (e) { if (!i.test(e))
        throw new Error("invalid tagName:" + e); this.tagName = e; }, add: function (e, t, r) { if (!i.test(e))
        throw new Error("invalid attribute:" + e); this[this.length++] = { qName: e, value: t, offset: r }; }, length: 0, getLocalName: function (e) { return this[e].localName; }, getLocator: function (e) { return this[e].locator; }, getQName: function (e) { return this[e].qName; }, getURI: function (e) { return this[e].uri; }, getValue: function (e) { return this[e].value; } }, N({}, N.prototype) instanceof N || (N = function (e, t) { function r() { } for (t in r.prototype = t, r = new r, e)
    r[t] = e[t]; return r; }); var S = d, D = { XMLReader: S }, T = Object.freeze({ default: D, __moduleExports: D, XMLReader: S }); function x(e, t) { for (var r in e)
    t[r] = e[r]; } function I(e, t) { var r = e.prototype; if (Object.create) {
    var n = Object.create(t.prototype);
    r.__proto__ = n;
} if (!(r instanceof t)) {
    function i() { }
    i.prototype = t.prototype, x(r, i = new i), e.prototype = r = i;
} r.constructor != e && ("function" != typeof e && console.error("unknow Class:" + e), r.constructor = e); } var A = "http://www.w3.org/1999/xhtml", k = {}, C = k.ELEMENT_NODE = 1, O = k.ATTRIBUTE_NODE = 2, R = k.TEXT_NODE = 3, F = k.CDATA_SECTION_NODE = 4, L = k.ENTITY_REFERENCE_NODE = 5, M = k.ENTITY_NODE = 6, B = k.PROCESSING_INSTRUCTION_NODE = 7, U = k.COMMENT_NODE = 8, P = k.DOCUMENT_NODE = 9, G = k.DOCUMENT_TYPE_NODE = 10, Z = k.DOCUMENT_FRAGMENT_NODE = 11, K = k.NOTATION_NODE = 12, V = {}, j = {}, z = (V.INDEX_SIZE_ERR = (j[1] = "Index size error", 1), V.DOMSTRING_SIZE_ERR = (j[2] = "DOMString size error", 2), V.HIERARCHY_REQUEST_ERR = (j[3] = "Hierarchy request error", 3)), H = (V.WRONG_DOCUMENT_ERR = (j[4] = "Wrong document", 4), V.INVALID_CHARACTER_ERR = (j[5] = "Invalid character", 5), V.NO_DATA_ALLOWED_ERR = (j[6] = "No data allowed", 6), V.NO_MODIFICATION_ALLOWED_ERR = (j[7] = "No modification allowed", 7), V.NOT_FOUND_ERR = (j[8] = "Not found", 8)), Y = (V.NOT_SUPPORTED_ERR = (j[9] = "Not supported", 9), V.INUSE_ATTRIBUTE_ERR = (j[10] = "Attribute in use", 10)); function W(e, t) { if (t instanceof Error)
    var r = t;
else
    r = this, Error.call(this, j[e]), this.message = j[e], Error.captureStackTrace && Error.captureStackTrace(this, W); return r.code = e, t && (this.message = this.message + ": " + t), r; } function X() { } function $(e, t) { this._node = e, this._refresh = t, q(this); } function q(e) { var t = e._node._inc || e._node.ownerDocument._inc; if (e._inc != t) {
    var r = e._refresh(e._node);
    xe(e, "length", r.length), x(r, e), e._inc = t;
} } function Q() { } function J(e, t) { for (var r = e.length; r--;)
    if (e[r] === t)
        return r; } function ee(e, t, r, n) { if (n ? t[J(t, n)] = r : t[t.length++] = r, e) {
    r.ownerElement = e;
    var i = e.ownerDocument;
    i && (n && se(i, e, n), function (e, t, r) { e && e._inc++, "http://www.w3.org/2000/xmlns/" == r.namespaceURI && (t._nsMap[r.prefix ? r.localName : ""] = r.value); }(i, e, r));
} } function te(e, t, r) { var n = J(t, r); if (!(n >= 0))
    throw W(H, new Error(e.tagName + "@" + r)); for (var i = t.length - 1; n < i;)
    t[n] = t[++n]; if (t.length = i, e) {
    var a = e.ownerDocument;
    a && (se(a, e, r), r.ownerElement = null);
} } function re(e) { if (this._features = {}, e)
    for (var t in e)
        this._features = e[t]; } function ne() { } function ie(e) { return ("<" == e ? "&lt;" : ">" == e && "&gt;") || "&" == e && "&amp;" || '"' == e && "&quot;" || "&#" + e.charCodeAt() + ";"; } function ae(e, t) { if (t(e))
    return !0; if (e = e.firstChild)
    do {
        if (ae(e, t))
            return !0;
    } while (e = e.nextSibling); } function oe() { } function se(e, t, r, n) { e && e._inc++, "http://www.w3.org/2000/xmlns/" == r.namespaceURI && delete t._nsMap[r.prefix ? r.localName : ""]; } function le(e, t, r) { if (e && e._inc) {
    e._inc++;
    var n = t.childNodes;
    if (r)
        n[n.length++] = r;
    else {
        for (var i = t.firstChild, a = 0; i;)
            n[a++] = i, i = i.nextSibling;
        n.length = a;
    }
} } function ce(e, t) { var r = t.previousSibling, n = t.nextSibling; return r ? r.nextSibling = n : e.firstChild = n, n ? n.previousSibling = r : e.lastChild = r, le(e.ownerDocument, e), t; } function ue(e, t, r) { var n = t.parentNode; if (n && n.removeChild(t), t.nodeType === Z) {
    var i = t.firstChild;
    if (null == i)
        return t;
    var a = t.lastChild;
}
else
    i = a = t; var o = r ? r.previousSibling : e.lastChild; i.previousSibling = o, a.nextSibling = r, o ? o.nextSibling = i : e.firstChild = i, null == r ? e.lastChild = a : r.previousSibling = a; do {
    i.parentNode = e;
} while (i !== a && (i = i.nextSibling)); return le(e.ownerDocument || e, e), t.nodeType == Z && (t.firstChild = t.lastChild = null), t; } function he() { this._nsMap = {}; } function fe() { } function de() { } function pe() { } function me() { } function ge() { } function we() { } function ye() { } function be() { } function ve() { } function _e() { } function Ee() { } function Ne() { } function Se(e, t) { var r = [], n = 9 == this.nodeType ? this.documentElement : this, i = n.prefix, a = n.namespaceURI; if (a && null == i && null == (i = n.lookupPrefix(a)))
    var o = [{ namespace: a, prefix: null }]; return Te(this, r, e, t, o), r.join(""); } function De(e, t, r) { var n = e.prefix || "", i = e.namespaceURI; if (!n && !i)
    return !1; if ("xml" === n && "http://www.w3.org/XML/1998/namespace" === i || "http://www.w3.org/2000/xmlns/" == i)
    return !1; for (var a = r.length; a--;) {
    var o = r[a];
    if (o.prefix == n)
        return o.namespace != i;
} return !0; } function Te(e, t, r, n, i) { if (n) {
    if (!(e = n(e)))
        return;
    if ("string" == typeof e)
        return void t.push(e);
} switch (e.nodeType) {
    case C:
        i || (i = []), i.length;
        var a = e.attributes, o = a.length, s = e.firstChild, l = e.tagName;
        r = A === e.namespaceURI || r, t.push("<", l);
        for (var c = 0; c < o; c++)
            "xmlns" == (u = a.item(c)).prefix ? i.push({ prefix: u.localName, namespace: u.value }) : "xmlns" == u.nodeName && i.push({ prefix: "", namespace: u.value });
        for (c = 0; c < o; c++) {
            var u;
            if (De(u = a.item(c), 0, i)) {
                var h = u.prefix || "", f = u.namespaceURI, d = h ? " xmlns:" + h : " xmlns";
                t.push(d, '="', f, '"'), i.push({ prefix: h, namespace: f });
            }
            Te(u, t, r, n, i);
        }
        if (De(e, 0, i) && (h = e.prefix || "", f = e.namespaceURI, d = h ? " xmlns:" + h : " xmlns", t.push(d, '="', f, '"'), i.push({ prefix: h, namespace: f })), s || r && !/^(?:meta|link|img|br|hr|input)$/i.test(l)) {
            if (t.push(">"), r && /^script$/i.test(l))
                for (; s;)
                    s.data ? t.push(s.data) : Te(s, t, r, n, i), s = s.nextSibling;
            else
                for (; s;)
                    Te(s, t, r, n, i), s = s.nextSibling;
            t.push("</", l, ">");
        }
        else
            t.push("/>");
        return;
    case P:
    case Z:
        for (s = e.firstChild; s;)
            Te(s, t, r, n, i), s = s.nextSibling;
        return;
    case O: return t.push(" ", e.name, '="', e.value.replace(/[<&"]/g, ie), '"');
    case R: return t.push(e.data.replace(/[<&]/g, ie));
    case F: return t.push("<![CDATA[", e.data, "]]>");
    case U: return t.push("\x3c!--", e.data, "--\x3e");
    case G:
        var p = e.publicId, m = e.systemId;
        if (t.push("<!DOCTYPE ", e.name), p)
            t.push(' PUBLIC "', p), m && "." != m && t.push('" "', m), t.push('">');
        else if (m && "." != m)
            t.push(' SYSTEM "', m, '">');
        else {
            var g = e.internalSubset;
            g && t.push(" [", g, "]"), t.push(">");
        }
        return;
    case B: return t.push("<?", e.target, " ", e.data, "?>");
    case L: return t.push("&", e.nodeName, ";");
    default: t.push("??", e.nodeName);
} } function xe(e, t, r) { e[t] = r; } V.INVALID_STATE_ERR = (j[11] = "Invalid state", 11), V.SYNTAX_ERR = (j[12] = "Syntax error", 12), V.INVALID_MODIFICATION_ERR = (j[13] = "Invalid modification", 13), V.NAMESPACE_ERR = (j[14] = "Invalid namespace", 14), V.INVALID_ACCESS_ERR = (j[15] = "Invalid access", 15), W.prototype = Error.prototype, x(V, W), X.prototype = { length: 0, item: function (e) { return this[e] || null; }, toString: function (e, t) { for (var r = [], n = 0; n < this.length; n++)
        Te(this[n], r, e, t); return r.join(""); } }, $.prototype.item = function (e) { return q(this), this[e]; }, I($, X), Q.prototype = { length: 0, item: X.prototype.item, getNamedItem: function (e) { for (var t = this.length; t--;) {
        var r = this[t];
        if (r.nodeName == e)
            return r;
    } }, setNamedItem: function (e) { var t = e.ownerElement; if (t && t != this._ownerElement)
        throw new W(Y); var r = this.getNamedItem(e.nodeName); return ee(this._ownerElement, this, e, r), r; }, setNamedItemNS: function (e) { var t, r = e.ownerElement; if (r && r != this._ownerElement)
        throw new W(Y); return t = this.getNamedItemNS(e.namespaceURI, e.localName), ee(this._ownerElement, this, e, t), t; }, removeNamedItem: function (e) { var t = this.getNamedItem(e); return te(this._ownerElement, this, t), t; }, removeNamedItemNS: function (e, t) { var r = this.getNamedItemNS(e, t); return te(this._ownerElement, this, r), r; }, getNamedItemNS: function (e, t) { for (var r = this.length; r--;) {
        var n = this[r];
        if (n.localName == t && n.namespaceURI == e)
            return n;
    } return null; } }, re.prototype = { hasFeature: function (e, t) { var r = this._features[e.toLowerCase()]; return !(!r || t && !(t in r)); }, createDocument: function (e, t, r) { var n = new oe; if (n.implementation = this, n.childNodes = new X, n.doctype = r, r && n.appendChild(r), t) {
        var i = n.createElementNS(e, t);
        n.appendChild(i);
    } return n; }, createDocumentType: function (e, t, r) { var n = new we; return n.name = e, n.nodeName = e, n.publicId = t, n.systemId = r, n; } }, ne.prototype = { firstChild: null, lastChild: null, previousSibling: null, nextSibling: null, attributes: null, parentNode: null, childNodes: null, ownerDocument: null, nodeValue: null, namespaceURI: null, prefix: null, localName: null, insertBefore: function (e, t) { return ue(this, e, t); }, replaceChild: function (e, t) { this.insertBefore(e, t), t && this.removeChild(t); }, removeChild: function (e) { return ce(this, e); }, appendChild: function (e) { return this.insertBefore(e, null); }, hasChildNodes: function () { return null != this.firstChild; }, cloneNode: function (e) { return function e(t, r, n) { var i = new r.constructor; for (var a in r) {
        var o = r[a];
        "object" != typeof o && o != i[a] && (i[a] = o);
    } switch ((r.childNodes && (i.childNodes = new X), i.ownerDocument = t, i.nodeType)) {
        case C:
            var s = r.attributes, l = i.attributes = new Q, c = s.length;
            l._ownerElement = i;
            for (var u = 0; u < c; u++)
                i.setAttributeNode(e(t, s.item(u), !0));
            break;
        case O: n = !0;
    } if (n)
        for (var h = r.firstChild; h;)
            i.appendChild(e(t, h, n)), h = h.nextSibling; return i; }(this.ownerDocument || this, this, e); }, normalize: function () { for (var e = this.firstChild; e;) {
        var t = e.nextSibling;
        t && t.nodeType == R && e.nodeType == R ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), e = t);
    } }, isSupported: function (e, t) { return this.ownerDocument.implementation.hasFeature(e, t); }, hasAttributes: function () { return this.attributes.length > 0; }, lookupPrefix: function (e) { for (var t = this; t;) {
        var r = t._nsMap;
        if (r)
            for (var n in r)
                if (r[n] == e)
                    return n;
        t = t.nodeType == O ? t.ownerDocument : t.parentNode;
    } return null; }, lookupNamespaceURI: function (e) { for (var t = this; t;) {
        var r = t._nsMap;
        if (r && e in r)
            return r[e];
        t = t.nodeType == O ? t.ownerDocument : t.parentNode;
    } return null; }, isDefaultNamespace: function (e) { return null == this.lookupPrefix(e); } }, x(k, ne), x(k, ne.prototype), oe.prototype = { nodeName: "#document", nodeType: P, doctype: null, documentElement: null, _inc: 1, insertBefore: function (e, t) { if (e.nodeType == Z) {
        for (var r = e.firstChild; r;) {
            var n = r.nextSibling;
            this.insertBefore(r, t), r = n;
        }
        return e;
    } return null == this.documentElement && e.nodeType == C && (this.documentElement = e), ue(this, e, t), e.ownerDocument = this, e; }, removeChild: function (e) { return this.documentElement == e && (this.documentElement = null), ce(this, e); }, importNode: function (e, t) { return function e(t, r, n) { var i; switch (r.nodeType) {
        case C: (i = r.cloneNode(!1)).ownerDocument = t;
        case Z: break;
        case O: n = !0;
    } if (i || (i = r.cloneNode(!1)), i.ownerDocument = t, i.parentNode = null, n)
        for (var a = r.firstChild; a;)
            i.appendChild(e(t, a, n)), a = a.nextSibling; return i; }(this, e, t); }, getElementById: function (e) { var t = null; return ae(this.documentElement, function (r) { if (r.nodeType == C && r.getAttribute("id") == e)
        return t = r, !0; }), t; }, createElement: function (e) { var t = new he; return t.ownerDocument = this, t.nodeName = e, t.tagName = e, t.childNodes = new X, (t.attributes = new Q)._ownerElement = t, t; }, createDocumentFragment: function () { var e = new _e; return e.ownerDocument = this, e.childNodes = new X, e; }, createTextNode: function (e) { var t = new pe; return t.ownerDocument = this, t.appendData(e), t; }, createComment: function (e) { var t = new me; return t.ownerDocument = this, t.appendData(e), t; }, createCDATASection: function (e) { var t = new ge; return t.ownerDocument = this, t.appendData(e), t; }, createProcessingInstruction: function (e, t) { var r = new Ee; return r.ownerDocument = this, r.tagName = r.target = e, r.nodeValue = r.data = t, r; }, createAttribute: function (e) { var t = new fe; return t.ownerDocument = this, t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t; }, createEntityReference: function (e) { var t = new ve; return t.ownerDocument = this, t.nodeName = e, t; }, createElementNS: function (e, t) { var r = new he, n = t.split(":"), i = r.attributes = new Q; return r.childNodes = new X, r.ownerDocument = this, r.nodeName = t, r.tagName = t, r.namespaceURI = e, 2 == n.length ? (r.prefix = n[0], r.localName = n[1]) : r.localName = t, i._ownerElement = r, r; }, createAttributeNS: function (e, t) { var r = new fe, n = t.split(":"); return r.ownerDocument = this, r.nodeName = t, r.name = t, r.namespaceURI = e, r.specified = !0, 2 == n.length ? (r.prefix = n[0], r.localName = n[1]) : r.localName = t, r; } }, I(oe, ne), he.prototype = { nodeType: C, hasAttribute: function (e) { return null != this.getAttributeNode(e); }, getAttribute: function (e) { var t = this.getAttributeNode(e); return t && t.value || ""; }, getAttributeNode: function (e) { return this.attributes.getNamedItem(e); }, setAttribute: function (e, t) { var r = this.ownerDocument.createAttribute(e); r.value = r.nodeValue = "" + t, this.setAttributeNode(r); }, removeAttribute: function (e) { var t = this.getAttributeNode(e); t && this.removeAttributeNode(t); }, appendChild: function (e) { return e.nodeType === Z ? this.insertBefore(e, null) : function (e, t) { var r = t.parentNode; if (r) {
        var n = e.lastChild;
        r.removeChild(t), n = e.lastChild;
    } return n = e.lastChild, t.parentNode = e, t.previousSibling = n, t.nextSibling = null, n ? n.nextSibling = t : e.firstChild = t, e.lastChild = t, le(e.ownerDocument, e, t), t; }(this, e); }, setAttributeNode: function (e) { return this.attributes.setNamedItem(e); }, setAttributeNodeNS: function (e) { return this.attributes.setNamedItemNS(e); }, removeAttributeNode: function (e) { return this.attributes.removeNamedItem(e.nodeName); }, removeAttributeNS: function (e, t) { var r = this.getAttributeNodeNS(e, t); r && this.removeAttributeNode(r); }, hasAttributeNS: function (e, t) { return null != this.getAttributeNodeNS(e, t); }, getAttributeNS: function (e, t) { var r = this.getAttributeNodeNS(e, t); return r && r.value || ""; }, setAttributeNS: function (e, t, r) { var n = this.ownerDocument.createAttributeNS(e, t); n.value = n.nodeValue = "" + r, this.setAttributeNode(n); }, getAttributeNodeNS: function (e, t) { return this.attributes.getNamedItemNS(e, t); }, getElementsByTagName: function (e) { return new $(this, function (t) { var r = []; return ae(t, function (n) { n === t || n.nodeType != C || "*" !== e && n.tagName != e || r.push(n); }), r; }); }, getElementsByTagNameNS: function (e, t) { return new $(this, function (r) { var n = []; return ae(r, function (i) { i === r || i.nodeType !== C || "*" !== e && i.namespaceURI !== e || "*" !== t && i.localName != t || n.push(i); }), n; }); } }, oe.prototype.getElementsByTagName = he.prototype.getElementsByTagName, oe.prototype.getElementsByTagNameNS = he.prototype.getElementsByTagNameNS, I(he, ne), fe.prototype.nodeType = O, I(fe, ne), de.prototype = { data: "", substringData: function (e, t) { return this.data.substring(e, e + t); }, appendData: function (e) { e = this.data + e, this.nodeValue = this.data = e, this.length = e.length; }, insertData: function (e, t) { this.replaceData(e, 0, t); }, appendChild: function (e) { throw new Error(j[z]); }, deleteData: function (e, t) { this.replaceData(e, t, ""); }, replaceData: function (e, t, r) { r = this.data.substring(0, e) + r + this.data.substring(e + t), this.nodeValue = this.data = r, this.length = r.length; } }, I(de, ne), pe.prototype = { nodeName: "#text", nodeType: R, splitText: function (e) { var t = this.data, r = t.substring(e); t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length; var n = this.ownerDocument.createTextNode(r); return this.parentNode && this.parentNode.insertBefore(n, this.nextSibling), n; } }, I(pe, de), me.prototype = { nodeName: "#comment", nodeType: U }, I(me, de), ge.prototype = { nodeName: "#cdata-section", nodeType: F }, I(ge, de), we.prototype.nodeType = G, I(we, ne), ye.prototype.nodeType = K, I(ye, ne), be.prototype.nodeType = M, I(be, ne), ve.prototype.nodeType = L, I(ve, ne), _e.prototype.nodeName = "#document-fragment", _e.prototype.nodeType = Z, I(_e, ne), Ee.prototype.nodeType = B, I(Ee, ne), Ne.prototype.serializeToString = function (e, t, r) { return Se.call(e, t, r); }, ne.prototype.toString = Se; try {
    Object.defineProperty && (Object.defineProperty($.prototype, "length", { get: function () { return q(this), this.$$length; } }), Object.defineProperty(ne.prototype, "textContent", { get: function () { return function e(t) { switch (t.nodeType) {
            case C:
            case Z:
                var r = [];
                for (t = t.firstChild; t;)
                    7 !== t.nodeType && 8 !== t.nodeType && r.push(e(t)), t = t.nextSibling;
                return r.join("");
            default: return t.nodeValue;
        } }(this); }, set: function (e) { switch (this.nodeType) {
            case C:
            case Z:
                for (; this.firstChild;)
                    this.removeChild(this.firstChild);
                (e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
                break;
            default: this.data = e, this.value = e, this.nodeValue = e;
        } } }), xe = function (e, t, r) { e["$$" + t] = r; });
}
catch (e) { } var Ie, Ae = re, ke = Ne, Ce = { DOMImplementation: Ae, XMLSerializer: ke }, Oe = Object.freeze({ default: Ce, __moduleExports: Ce, DOMImplementation: Ae, XMLSerializer: ke }), Re = T && D || T, Fe = Oe && Ce || Oe, Le = t.createCommonjsModule(function (e, t) { function r(e) { this.options = e || { locator: {} }; } function n() { this.cdata = !1; } function i(e, t) { t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber; } function a(e) { if (e)
    return "\n@" + (e.systemId || "") + "#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]"; } function o(e, t, r) { return "string" == typeof e ? e.substr(t, r) : e.length >= t + r || t ? new java.lang.String(e, t, r) + "" : e; } function s(e, t) { e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t); } r.prototype.parseFromString = function (e, t) { var r = this.options, i = new l, o = r.domBuilder || new n, s = r.errorHandler, c = r.locator, u = r.xmlns || {}, h = { lt: "<", gt: ">", amp: "&", quot: '"', apos: "'" }; return c && o.setDocumentLocator(c), i.errorHandler = function (e, t, r) { if (!e) {
    if (t instanceof n)
        return t;
    e = t;
} var i = {}, o = e instanceof Function; function s(t) { var n = e[t]; !n && o && (n = 2 == e.length ? function (r) { e(t, r); } : e), i[t] = n && function (e) { n("[xmldom " + t + "]\t" + e + a(r)); } || function () { }; } return r = r || {}, s("warning"), s("error"), s("fatalError"), i; }(s, o, c), i.domBuilder = r.domBuilder || o, /\/x?html?$/.test(t) && (h.nbsp = " ", h.copy = "©", u[""] = "http://www.w3.org/1999/xhtml"), u.xml = u.xml || "http://www.w3.org/XML/1998/namespace", e ? i.parse(e, u, h) : i.errorHandler.error("invalid doc source"), o.doc; }, n.prototype = { startDocument: function () { this.doc = (new c).createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId); }, startElement: function (e, t, r, n) { var a = this.doc, o = a.createElementNS(e, r || t), l = n.length; s(this, o), this.currentElement = o, this.locator && i(this.locator, o); for (var c = 0; c < l; c++) {
        e = n.getURI(c);
        var u = n.getValue(c), h = (r = n.getQName(c), a.createAttributeNS(e, r));
        this.locator && i(n.getLocator(c), h), h.value = h.nodeValue = u, o.setAttributeNode(h);
    } }, endElement: function (e, t, r) { var n = this.currentElement; n.tagName, this.currentElement = n.parentNode; }, startPrefixMapping: function (e, t) { }, endPrefixMapping: function (e) { }, processingInstruction: function (e, t) { var r = this.doc.createProcessingInstruction(e, t); this.locator && i(this.locator, r), s(this, r); }, ignorableWhitespace: function (e, t, r) { }, characters: function (e, t, r) { if (e = o.apply(this, arguments)) {
        if (this.cdata)
            var n = this.doc.createCDATASection(e);
        else
            n = this.doc.createTextNode(e);
        this.currentElement ? this.currentElement.appendChild(n) : /^\s*$/.test(e) && this.doc.appendChild(n), this.locator && i(this.locator, n);
    } }, skippedEntity: function (e) { }, endDocument: function () { this.doc.normalize(); }, setDocumentLocator: function (e) { (this.locator = e) && (e.lineNumber = 0); }, comment: function (e, t, r) { e = o.apply(this, arguments); var n = this.doc.createComment(e); this.locator && i(this.locator, n), s(this, n); }, startCDATA: function () { this.cdata = !0; }, endCDATA: function () { this.cdata = !1; }, startDTD: function (e, t, r) { var n = this.doc.implementation; if (n && n.createDocumentType) {
        var a = n.createDocumentType(e, t, r);
        this.locator && i(this.locator, a), s(this, a);
    } }, warning: function (e) { console.warn("[xmldom warning]\t" + e, a(this.locator)); }, error: function (e) { console.error("[xmldom error]\t" + e, a(this.locator)); }, fatalError: function (e) { throw console.error("[xmldom fatalError]\t" + e, a(this.locator)), e; } }, "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function (e) { n.prototype[e] = function () { return null; }; }); var l = Re.XMLReader, c = t.DOMImplementation = Fe.DOMImplementation; t.XMLSerializer = Fe.XMLSerializer, t.DOMParser = r; }), Me = Le.DOMImplementation, Be = Le.XMLSerializer, Ue = Le.DOMParser, Pe = Object.freeze({ default: Le, __moduleExports: Le, DOMImplementation: Me, XMLSerializer: Be, DOMParser: Ue }), Ge = Pe && Le || Pe, Ze = { 315: "Artist", 258: "BitsPerSample", 265: "CellLength", 264: "CellWidth", 320: "ColorMap", 259: "Compression", 33432: "Copyright", 306: "DateTime", 338: "ExtraSamples", 266: "FillOrder", 289: "FreeByteCounts", 288: "FreeOffsets", 291: "GrayResponseCurve", 290: "GrayResponseUnit", 316: "HostComputer", 270: "ImageDescription", 257: "ImageLength", 256: "ImageWidth", 271: "Make", 281: "MaxSampleValue", 280: "MinSampleValue", 272: "Model", 254: "NewSubfileType", 274: "Orientation", 262: "PhotometricInterpretation", 284: "PlanarConfiguration", 296: "ResolutionUnit", 278: "RowsPerStrip", 277: "SamplesPerPixel", 305: "Software", 279: "StripByteCounts", 273: "StripOffsets", 255: "SubfileType", 263: "Threshholding", 282: "XResolution", 283: "YResolution", 326: "BadFaxLines", 327: "CleanFaxData", 343: "ClipPath", 328: "ConsecutiveBadFaxLines", 433: "Decode", 434: "DefaultImageColor", 269: "DocumentName", 336: "DotRange", 321: "HalftoneHints", 346: "Indexed", 347: "JPEGTables", 285: "PageName", 297: "PageNumber", 317: "Predictor", 319: "PrimaryChromaticities", 532: "ReferenceBlackWhite", 339: "SampleFormat", 340: "SMinSampleValue", 341: "SMaxSampleValue", 559: "StripRowCounts", 330: "SubIFDs", 292: "T4Options", 293: "T6Options", 325: "TileByteCounts", 323: "TileLength", 324: "TileOffsets", 322: "TileWidth", 301: "TransferFunction", 318: "WhitePoint", 344: "XClipPathUnits", 286: "XPosition", 529: "YCbCrCoefficients", 531: "YCbCrPositioning", 530: "YCbCrSubSampling", 345: "YClipPathUnits", 287: "YPosition", 37378: "ApertureValue", 40961: "ColorSpace", 36868: "DateTimeDigitized", 36867: "DateTimeOriginal", 34665: "Exif IFD", 36864: "ExifVersion", 33434: "ExposureTime", 41728: "FileSource", 37385: "Flash", 40960: "FlashpixVersion", 33437: "FNumber", 42016: "ImageUniqueID", 37384: "LightSource", 37500: "MakerNote", 37377: "ShutterSpeedValue", 37510: "UserComment", 33723: "IPTC", 34675: "ICC Profile", 700: "XMP", 42112: "GDAL_METADATA", 42113: "GDAL_NODATA", 34377: "Photoshop", 33550: "ModelPixelScale", 33922: "ModelTiepoint", 34264: "ModelTransformation", 34735: "GeoKeyDirectory", 34736: "GeoDoubleParams", 34737: "GeoAsciiParams" }, Ke = {}; for (Ie in Ze)
    Ke[Ze[Ie]] = parseInt(Ie); var Ve = [Ke.BitsPerSample, Ke.ExtraSamples, Ke.SampleFormat, Ke.StripByteCounts, Ke.StripOffsets, Ke.StripRowCounts, Ke.TileByteCounts, Ke.TileOffsets], je = { 1: "BYTE", 2: "ASCII", 3: "SHORT", 4: "LONG", 5: "RATIONAL", 6: "SBYTE", 7: "UNDEFINED", 8: "SSHORT", 9: "SLONG", 10: "SRATIONAL", 11: "FLOAT", 12: "DOUBLE", 16: "LONG8", 17: "SLONG8", 18: "IFD8" }, ze = {}; for (Ie in je)
    ze[je[Ie]] = parseInt(Ie); var He, Ye = { 1024: "GTModelTypeGeoKey", 1025: "GTRasterTypeGeoKey", 1026: "GTCitationGeoKey", 2048: "GeographicTypeGeoKey", 2049: "GeogCitationGeoKey", 2050: "GeogGeodeticDatumGeoKey", 2051: "GeogPrimeMeridianGeoKey", 2052: "GeogLinearUnitsGeoKey", 2053: "GeogLinearUnitSizeGeoKey", 2054: "GeogAngularUnitsGeoKey", 2055: "GeogAngularUnitSizeGeoKey", 2056: "GeogEllipsoidGeoKey", 2057: "GeogSemiMajorAxisGeoKey", 2058: "GeogSemiMinorAxisGeoKey", 2059: "GeogInvFlatteningGeoKey", 2060: "GeogAzimuthUnitsGeoKey", 2061: "GeogPrimeMeridianLongGeoKey", 2062: "GeogTOWGS84GeoKey", 3072: "ProjectedCSTypeGeoKey", 3073: "PCSCitationGeoKey", 3074: "ProjectionGeoKey", 3075: "ProjCoordTransGeoKey", 3076: "ProjLinearUnitsGeoKey", 3077: "ProjLinearUnitSizeGeoKey", 3078: "ProjStdParallel1GeoKey", 3079: "ProjStdParallel2GeoKey", 3080: "ProjNatOriginLongGeoKey", 3081: "ProjNatOriginLatGeoKey", 3082: "ProjFalseEastingGeoKey", 3083: "ProjFalseNorthingGeoKey", 3084: "ProjFalseOriginLongGeoKey", 3085: "ProjFalseOriginLatGeoKey", 3086: "ProjFalseOriginEastingGeoKey", 3087: "ProjFalseOriginNorthingGeoKey", 3088: "ProjCenterLongGeoKey", 3089: "ProjCenterLatGeoKey", 3090: "ProjCenterEastingGeoKey", 3091: "ProjCenterNorthingGeoKey", 3092: "ProjScaleAtNatOriginGeoKey", 3093: "ProjScaleAtCenterGeoKey", 3094: "ProjAzimuthAngleGeoKey", 3095: "ProjStraightVertPoleLongGeoKey", 3096: "ProjRectifiedGridAngleGeoKey", 4096: "VerticalCSTypeGeoKey", 4097: "VerticalCitationGeoKey", 4098: "VerticalDatumGeoKey", 4099: "VerticalUnitsGeoKey" }, We = {}; for (Ie in Ye)
    We[Ye[Ie]] = parseInt(Ie); "undefined" == typeof window ? He = function (e) { return (new (0, Ge.DOMParser)).parseFromString(e, "text/xml"); } : void 0 !== window.DOMParser ? He = function (e) { return (new window.DOMParser).parseFromString(e, "text/xml"); } : void 0 !== window.ActiveXObject && new window.ActiveXObject("Microsoft.XMLDOM") && (He = function (e) { var t = new window.ActiveXObject("Microsoft.XMLDOM"); return t.async = "false", t.loadXML(e), t; }); var Xe = { fieldTags: Ke, fieldTagNames: Ze, arrayFields: Ve, fieldTypes: ze, fieldTypeNames: je, photometricInterpretations: { WhiteIsZero: 0, BlackIsZero: 1, RGB: 2, Palette: 3, TransparencyMask: 4, CMYK: 5, YCbCr: 6, CIELab: 8, ICCLab: 9 }, geoKeys: We, geoKeyNames: Ye, parseXml: He }, $e = Xe.fieldTags, qe = Xe.fieldTagNames, Qe = Xe.arrayFields, Je = Xe.fieldTypes, et = Xe.fieldTypeNames, tt = Xe.photometricInterpretations, rt = Xe.geoKeys, nt = Xe.geoKeyNames, it = Xe.parseXml, at = Object.freeze({ default: Xe, __moduleExports: Xe, fieldTags: $e, fieldTagNames: qe, arrayFields: Qe, fieldTypes: Je, fieldTypeNames: et, photometricInterpretations: tt, geoKeys: rt, geoKeyNames: nt, parseXml: it }), ot = { fromWhiteIsZero: function (e, t, r, n) { for (var i, a = new Uint8Array(r * n * 3), o = 0, s = 0; o < e.length; ++o, s += 3)
        i = 256 - e[o] / t * 256, a[s] = i, a[s + 1] = i, a[s + 2] = i; return a; }, fromBlackIsZero: function (e, t, r, n) { for (var i, a = new Uint8Array(r * n * 3), o = 0, s = 0; o < e.length; ++o, s += 3)
        i = e[o] / t * 256, a[s] = i, a[s + 1] = i, a[s + 2] = i; return a; }, fromPalette: function (e, t, r, n) { for (var i = new Uint8Array(r * n * 3), a = t.length / 3, o = t.length / 3 * 2, s = 0, l = 0; s < e.length; ++s, l += 3) {
        var c = e[s];
        i[l] = t[c] / 65536 * 256, i[l + 1] = t[c + a] / 65536 * 256, i[l + 2] = t[c + o] / 65536 * 256;
    } return i; }, fromCMYK: function (e, t, r) { for (var n, i, a, o, s = new Uint8Array(t * r * 3), l = 0, c = 0; l < e.length; l += 4, c += 3)
        n = e[l], i = e[l + 1], a = e[l + 2], o = e[l + 3], s[c] = (255 - n) / 256 * 255 * ((255 - o) / 256), s[c + 1] = (255 - i) / 256 * 255 * ((255 - o) / 256), s[c + 2] = (255 - a) / 256 * 255 * ((255 - o) / 256); return s; }, fromYCbCr: function (e, t, r) { for (var n, i, a, o = new Uint8Array(t * r * 3), s = 0, l = 0; s < e.length; s += 3, l += 3)
        n = e[s], i = e[s + 1], a = e[s + 2], o[l] = n + 1.402 * (a - 128), o[l + 1] = n - .34414 * (i - 128) - .71414 * (a - 128), o[l + 2] = n + 1.772 * (i - 128); return o; }, fromCIELab: function (e, t, r) { for (var n, i, a, o, s, l, c, u, h, f, d, p, m = [3.240479, -1.53715, -.498535, -.969256, 1.875992, .041556, .055648, -.204043, 1.057311], g = new Uint8Array(t * r * 3), w = 0, y = 0; w < e.length; w += 3, y += 3)
        n = e[w], i = e[w + 1], a = e[w + 2], d = s = (0 !== (u = (s = Math.pow((n + 16) / 116, 3)) > .008856)) * (n / 903.3) + u * s, f = (c = (o = i / 500 + (s = u * Math.pow(s, 1 / 3) + (0 !== u) * (7.787 * s + 16 / 116))) > .206893) * Math.pow(o, 3) + (0 !== c) * ((o - 16 / 116) / 7.787), p = (h = (l = s - a / 200) > .206893) * Math.pow(l, 3) + (0 !== h) * ((l - 16 / 116) / 7.787), f *= .950456, p *= 1.088754, g[y] = f * m[0] + d * m[1] + p * m[2], g[y + 1] = f * m[3] + d * m[4] + p * m[5], g[y + 2] = f * m[6] + d * m[7] + p * m[8]; return g; } }, st = ot.fromWhiteIsZero, lt = ot.fromBlackIsZero, ct = ot.fromPalette, ut = ot.fromCMYK, ht = ot.fromYCbCr, ft = ot.fromCIELab, dt = Object.freeze({ default: ot, __moduleExports: ot, fromWhiteIsZero: st, fromBlackIsZero: lt, fromPalette: ct, fromCMYK: ut, fromYCbCr: ht, fromCIELab: ft }); function pt() { } pt.prototype = { isAsync: function () { return void 0 === this.decodeBlock; } }; var mt = pt, gt = Object.freeze({ default: mt, __moduleExports: mt }), wt = gt && mt || gt; function yt() { } yt.prototype = Object.create(wt.prototype), yt.prototype.constructor = yt, yt.prototype.decodeBlock = function (e) { return e; }; var bt = yt, vt = Object.freeze({ default: bt, __moduleExports: bt }); function _t() { this.littleEndian = !1, this.position = 0, this._makeEntryLookup = !1, this.dictionary = []; } function Et() { this.decompressor = new _t; } _t.prototype = { constructor: _t, initDictionary: function () { this.dictionary = new Array(258), this.entryLookup = {}, this.byteLength = 9; for (var e = 0; e <= 257; e++)
        this.dictionary[e] = [e], this._makeEntryLookup && (this.entryLookup[e] = e); }, decompress: function (e) { this._makeEntryLookup = !1, this.initDictionary(), this.position = 0, this.result = [], e.buffer || (e = new Uint8Array(e)); for (var t, r = new DataView(e.buffer), n = this.getNext(r); 257 !== n;) {
        if (256 === n) {
            for (this.initDictionary(), n = this.getNext(r); 256 === n;)
                n = this.getNext(r);
            if (n > 256)
                throw "corrupted code at scanline " + n;
            if (257 === n)
                break;
            var i = this.dictionary[n];
            this.appendArray(this.result, i), t = n;
        }
        else if (void 0 !== this.dictionary[n]) {
            var a = this.dictionary[n];
            this.appendArray(this.result, a);
            var o = this.dictionary[t].concat(this.dictionary[n][0]);
            this.addToDictionary(o), t = n;
        }
        else {
            var s = this.dictionary[t];
            if (!s)
                throw "Bogus entry. Not in dictionary, " + t + " / " + this.dictionary.length + ", position: " + this.position;
            var l = s.concat(this.dictionary[t][0]);
            this.appendArray(this.result, l), this.addToDictionary(l), t = n;
        }
        this.dictionary.length >= Math.pow(2, this.byteLength) - 1 && this.byteLength++, n = this.getNext(r);
    } return new Uint8Array(this.result); }, appendArray: function (e, t) { for (var r = 0; r < t.length; r++)
        e.push(t[r]); return e; }, haveBytesChanged: function () { return this.dictionary.length >= Math.pow(2, this.byteLength) && (this.byteLength++, !0); }, addToDictionary: function (e) { return this.dictionary.push(e), this._makeEntryLookup && (this.entryLookup[e] = this.dictionary.length - 1), this.haveBytesChanged(), this.dictionary.length - 1; }, getNext: function (e) { var t = this.getByte(e, this.position, this.byteLength); return this.position += this.byteLength, t; }, getByte: function (e, t, r) { var n = t % 8, i = Math.floor(t / 8), a = 8 - n, o = t + r - 8 * (i + 1), s = 8 * (i + 2) - (t + r), l = 8 * (i + 2) - t; if (s = Math.max(0, s), i >= e.byteLength)
        return console.warn("ran off the end of the buffer before finding EOI_CODE (end on input code)"), 257; var c = e.getUint8(i, this.littleEndian) & Math.pow(2, 8 - n) - 1, u = c <<= r - a; if (i + 1 < e.byteLength) {
        var h = e.getUint8(i + 1, this.littleEndian) >>> s;
        u += h <<= Math.max(0, r - l);
    } if (o > 8 && i + 2 < e.byteLength) {
        var f = 8 * (i + 3) - (t + r);
        u += e.getUint8(i + 2, this.littleEndian) >>> f;
    } return u; }, compress: function (e) { this._makeEntryLookup = !0, this.initDictionary(), this.position = 0; var t = [], r = []; t = this.appendArray(t, this.binaryFromByte(256, this.byteLength)); for (var n = 0; n < e.length; n++) {
        var i = [e[n]], a = r.concat(i);
        if (void 0 !== this.entryLookup[a])
            r = a;
        else {
            var o = this.entryLookup[r], s = this.binaryFromByte(o, this.byteLength);
            t = this.appendArray(t, s), this.addToDictionary(a), r = i, this.dictionary.length >= Math.pow(2, 12) && (t = this.appendArray(t, this.binaryFromByte(256, this.byteLength)), this.initDictionary());
        }
    } var l = this.entryLookup[r], c = this.binaryFromByte(l, this.byteLength); return t = this.appendArray(t, c), t = t = this.appendArray(t, this.binaryFromByte(257, this.byteLength)), this.binary = t, this.result = this.binaryToUint8(t), this.result; }, byteFromCode: function (e) { return this.dictionary[e]; }, binaryFromByte: function (e) { for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 8, r = new Uint8Array(t), n = 0; n < r.length; n++) {
        var i = (e & Math.pow(2, n)) > 0;
        r[r.length - 1 - n] = i;
    } return r; }, binaryToNumber: function (e) { for (var t = 0, r = 0; r < e.length; r++)
        t += Math.pow(2, e.length - r - 1) * e[r]; return t; }, inputToBinary: function (e) { for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 8, r = new Uint8Array(e.length * t), n = 0; n < e.length; n++) {
        var i = this.binaryFromByte(e[n], t);
        r.set(i, n * t);
    } return r; }, binaryToUint8: function (e) { for (var t = new Uint8Array(Math.ceil(e.length / 8)), r = 0, n = 0; n < e.length; n += 8) {
        for (var i = 0, a = 0; a < 8 && n + a < e.length; a++)
            i += e[n + a] * Math.pow(2, 8 - a - 1);
        t[r] = i, r++;
    } return t; } }, Et.prototype = Object.create(wt.prototype), Et.prototype.constructor = Et, Et.prototype.decodeBlock = function (e) { return this.decompressor.decompress(e).buffer; }; var Nt = Et, St = Object.freeze({ default: Nt, __moduleExports: Nt }), Dt = t.createCommonjsModule(function (e, t) { var r = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array; function n(e, t) { return Object.prototype.hasOwnProperty.call(e, t); } t.assign = function (e) { for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
    var r = t.shift();
    if (r) {
        if ("object" != typeof r)
            throw new TypeError(r + "must be non-object");
        for (var i in r)
            n(r, i) && (e[i] = r[i]);
    }
} return e; }, t.shrinkBuf = function (e, t) { return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e); }; var i = { arraySet: function (e, t, r, n, i) { if (t.subarray && e.subarray)
        e.set(t.subarray(r, r + n), i);
    else
        for (var a = 0; a < n; a++)
            e[i + a] = t[r + a]; }, flattenChunks: function (e) { var t, r, n, i, a, o; for (n = 0, t = 0, r = e.length; t < r; t++)
        n += e[t].length; for (o = new Uint8Array(n), i = 0, t = 0, r = e.length; t < r; t++)
        a = e[t], o.set(a, i), i += a.length; return o; } }, a = { arraySet: function (e, t, r, n, i) { for (var a = 0; a < n; a++)
        e[i + a] = t[r + a]; }, flattenChunks: function (e) { return [].concat.apply([], e); } }; t.setTyped = function (e) { e ? (t.Buf8 = Uint8Array, t.Buf16 = Uint16Array, t.Buf32 = Int32Array, t.assign(t, i)) : (t.Buf8 = Array, t.Buf16 = Array, t.Buf32 = Array, t.assign(t, a)); }, t.setTyped(r); }), Tt = Dt.assign, xt = Dt.shrinkBuf, It = Dt.setTyped, At = Dt.Buf8, kt = Dt.Buf16, Ct = Dt.Buf32, Ot = Object.freeze({ default: Dt, __moduleExports: Dt, assign: Tt, shrinkBuf: xt, setTyped: It, Buf8: At, Buf16: kt, Buf32: Ct }), Rt = function (e, t, r, n) { for (var i = 65535 & e | 0, a = e >>> 16 & 65535 | 0, o = 0; 0 !== r;) {
    r -= o = r > 2e3 ? 2e3 : r;
    do {
        a = a + (i = i + t[n++] | 0) | 0;
    } while (--o);
    i %= 65521, a %= 65521;
} return i | a << 16 | 0; }, Ft = Object.freeze({ default: Rt, __moduleExports: Rt }), Lt = function () { for (var e, t = [], r = 0; r < 256; r++) {
    e = r;
    for (var n = 0; n < 8; n++)
        e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
    t[r] = e;
} return t; }(), Mt = function (e, t, r, n) { var i = Lt, a = n + r; e ^= -1; for (var o = n; o < a; o++)
    e = e >>> 8 ^ i[255 & (e ^ t[o])]; return -1 ^ e; }, Bt = Object.freeze({ default: Mt, __moduleExports: Mt }), Ut = function (e, t) { var r, n, i, a, o, s, l, c, u, h, f, d, p, m, g, w, y, b, v, _, E, N, S, D, T; r = e.state, n = e.next_in, D = e.input, i = n + (e.avail_in - 5), a = e.next_out, T = e.output, o = a - (t - e.avail_out), s = a + (e.avail_out - 257), l = r.dmax, c = r.wsize, u = r.whave, h = r.wnext, f = r.window, d = r.hold, p = r.bits, m = r.lencode, g = r.distcode, w = (1 << r.lenbits) - 1, y = (1 << r.distbits) - 1; e: do {
    p < 15 && (d += D[n++] << p, p += 8, d += D[n++] << p, p += 8), b = m[d & w];
    t: for (;;) {
        if (d >>>= v = b >>> 24, p -= v, 0 == (v = b >>> 16 & 255))
            T[a++] = 65535 & b;
        else {
            if (!(16 & v)) {
                if (0 == (64 & v)) {
                    b = m[(65535 & b) + (d & (1 << v) - 1)];
                    continue t;
                }
                if (32 & v) {
                    r.mode = 12;
                    break e;
                }
                e.msg = "invalid literal/length code", r.mode = 30;
                break e;
            }
            _ = 65535 & b, (v &= 15) && (p < v && (d += D[n++] << p, p += 8), _ += d & (1 << v) - 1, d >>>= v, p -= v), p < 15 && (d += D[n++] << p, p += 8, d += D[n++] << p, p += 8), b = g[d & y];
            r: for (;;) {
                if (d >>>= v = b >>> 24, p -= v, !(16 & (v = b >>> 16 & 255))) {
                    if (0 == (64 & v)) {
                        b = g[(65535 & b) + (d & (1 << v) - 1)];
                        continue r;
                    }
                    e.msg = "invalid distance code", r.mode = 30;
                    break e;
                }
                if (E = 65535 & b, p < (v &= 15) && (d += D[n++] << p, (p += 8) < v && (d += D[n++] << p, p += 8)), (E += d & (1 << v) - 1) > l) {
                    e.msg = "invalid distance too far back", r.mode = 30;
                    break e;
                }
                if (d >>>= v, p -= v, E > (v = a - o)) {
                    if ((v = E - v) > u && r.sane) {
                        e.msg = "invalid distance too far back", r.mode = 30;
                        break e;
                    }
                    if (N = 0, S = f, 0 === h) {
                        if (N += c - v, v < _) {
                            _ -= v;
                            do {
                                T[a++] = f[N++];
                            } while (--v);
                            N = a - E, S = T;
                        }
                    }
                    else if (h < v) {
                        if (N += c + h - v, (v -= h) < _) {
                            _ -= v;
                            do {
                                T[a++] = f[N++];
                            } while (--v);
                            if (N = 0, h < _) {
                                _ -= v = h;
                                do {
                                    T[a++] = f[N++];
                                } while (--v);
                                N = a - E, S = T;
                            }
                        }
                    }
                    else if (N += h - v, v < _) {
                        _ -= v;
                        do {
                            T[a++] = f[N++];
                        } while (--v);
                        N = a - E, S = T;
                    }
                    for (; _ > 2;)
                        T[a++] = S[N++], T[a++] = S[N++], T[a++] = S[N++], _ -= 3;
                    _ && (T[a++] = S[N++], _ > 1 && (T[a++] = S[N++]));
                }
                else {
                    N = a - E;
                    do {
                        T[a++] = T[N++], T[a++] = T[N++], T[a++] = T[N++], _ -= 3;
                    } while (_ > 2);
                    _ && (T[a++] = T[N++], _ > 1 && (T[a++] = T[N++]));
                }
                break;
            }
        }
        break;
    }
} while (n < i && a < s); n -= _ = p >> 3, d &= (1 << (p -= _ << 3)) - 1, e.next_in = n, e.next_out = a, e.avail_in = n < i ? i - n + 5 : 5 - (n - i), e.avail_out = a < s ? s - a + 257 : 257 - (a - s), r.hold = d, r.bits = p; }, Pt = Object.freeze({ default: Ut, __moduleExports: Ut }), Gt = Ot && Dt || Ot, Zt = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], Kt = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], Vt = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], jt = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64], zt = function (e, t, r, n, i, a, o, s) { var l, c, u, h, f, d, p, m, g, w = s.bits, y = 0, b = 0, v = 0, _ = 0, E = 0, N = 0, S = 0, D = 0, T = 0, x = 0, I = null, A = 0, k = new Gt.Buf16(16), C = new Gt.Buf16(16), O = null, R = 0; for (y = 0; y <= 15; y++)
    k[y] = 0; for (b = 0; b < n; b++)
    k[t[r + b]]++; for (E = w, _ = 15; _ >= 1 && 0 === k[_]; _--)
    ; if (E > _ && (E = _), 0 === _)
    return i[a++] = 20971520, i[a++] = 20971520, s.bits = 1, 0; for (v = 1; v < _ && 0 === k[v]; v++)
    ; for (E < v && (E = v), D = 1, y = 1; y <= 15; y++)
    if (D <<= 1, (D -= k[y]) < 0)
        return -1; if (D > 0 && (0 === e || 1 !== _))
    return -1; for (C[1] = 0, y = 1; y < 15; y++)
    C[y + 1] = C[y] + k[y]; for (b = 0; b < n; b++)
    0 !== t[r + b] && (o[C[t[r + b]]++] = b); if (0 === e ? (I = O = o, d = 19) : 1 === e ? (I = Zt, A -= 257, O = Kt, R -= 257, d = 256) : (I = Vt, O = jt, d = -1), x = 0, b = 0, y = v, f = a, N = E, S = 0, u = -1, h = (T = 1 << E) - 1, 1 === e && T > 852 || 2 === e && T > 592)
    return 1; for (;;) {
    p = y - S, o[b] < d ? (m = 0, g = o[b]) : o[b] > d ? (m = O[R + o[b]], g = I[A + o[b]]) : (m = 96, g = 0), l = 1 << y - S, v = c = 1 << N;
    do {
        i[f + (x >> S) + (c -= l)] = p << 24 | m << 16 | g | 0;
    } while (0 !== c);
    for (l = 1 << y - 1; x & l;)
        l >>= 1;
    if (0 !== l ? (x &= l - 1, x += l) : x = 0, b++, 0 == --k[y]) {
        if (y === _)
            break;
        y = t[r + o[b]];
    }
    if (y > E && (x & h) !== u) {
        for (0 === S && (S = E), f += v, D = 1 << (N = y - S); N + S < _ && !((D -= k[N + S]) <= 0);)
            N++, D <<= 1;
        if (T += 1 << N, 1 === e && T > 852 || 2 === e && T > 592)
            return 1;
        i[u = x & h] = E << 24 | N << 16 | f - a | 0;
    }
} return 0 !== x && (i[f + x] = y - S << 24 | 64 << 16 | 0), s.bits = E, 0; }, Ht = Object.freeze({ default: zt, __moduleExports: zt }), Yt = Ft && Rt || Ft, Wt = Bt && Mt || Bt, Xt = Pt && Ut || Pt, $t = Ht && zt || Ht, qt = 1, Qt = 2, Jt = 0, er = -2, tr = 1, rr = 852, nr = 592; function ir(e) { return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24); } function ar(e) { var t; return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = tr, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new Gt.Buf32(rr), t.distcode = t.distdyn = new Gt.Buf32(nr), t.sane = 1, t.back = -1, Jt) : er; } function or(e) { var t; return e && e.state ? ((t = e.state).wsize = 0, t.whave = 0, t.wnext = 0, ar(e)) : er; } function sr(e, t) { var r, n; return e && e.state ? (n = e.state, t < 0 ? (r = 0, t = -t) : (r = 1 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? er : (null !== n.window && n.wbits !== t && (n.window = null), n.wrap = r, n.wbits = t, or(e))) : er; } function lr(e, t) { var r, n; return e ? (n = new function () { this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Gt.Buf16(320), this.work = new Gt.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0; }, e.state = n, n.window = null, (r = sr(e, t)) !== Jt && (e.state = null), r) : er; } var cr, ur, hr = !0; function fr(e) { if (hr) {
    var t;
    for (cr = new Gt.Buf32(512), ur = new Gt.Buf32(32), t = 0; t < 144;)
        e.lens[t++] = 8;
    for (; t < 256;)
        e.lens[t++] = 9;
    for (; t < 280;)
        e.lens[t++] = 7;
    for (; t < 288;)
        e.lens[t++] = 8;
    for ($t(qt, e.lens, 0, 288, cr, 0, e.work, { bits: 9 }), t = 0; t < 32;)
        e.lens[t++] = 5;
    $t(Qt, e.lens, 0, 32, ur, 0, e.work, { bits: 5 }), hr = !1;
} e.lencode = cr, e.lenbits = 9, e.distcode = ur, e.distbits = 5; } function dr(e, t, r, n) { var i, a = e.state; return null === a.window && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Gt.Buf8(a.wsize)), n >= a.wsize ? (Gt.arraySet(a.window, t, r - a.wsize, a.wsize, 0), a.wnext = 0, a.whave = a.wsize) : ((i = a.wsize - a.wnext) > n && (i = n), Gt.arraySet(a.window, t, r - n, i, a.wnext), (n -= i) ? (Gt.arraySet(a.window, t, r - n, n, 0), a.wnext = n, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0; } var pr = or, mr = sr, gr = ar, wr = function (e) { return lr(e, 15); }, yr = lr, br = function (e, t) { var r, n, i, a, o, s, l, c, u, h, f, d, p, m, g, w, y, b, v, _, E, N, S, D, T = 0, x = new Gt.Buf8(4), I = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]; if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in)
    return er; 12 === (r = e.state).mode && (r.mode = 13), o = e.next_out, i = e.output, l = e.avail_out, a = e.next_in, n = e.input, s = e.avail_in, c = r.hold, u = r.bits, h = s, f = l, N = Jt; e: for (;;)
    switch (r.mode) {
        case tr:
            if (0 === r.wrap) {
                r.mode = 13;
                break;
            }
            for (; u < 16;) {
                if (0 === s)
                    break e;
                s--, c += n[a++] << u, u += 8;
            }
            if (2 & r.wrap && 35615 === c) {
                r.check = 0, x[0] = 255 & c, x[1] = c >>> 8 & 255, r.check = Wt(r.check, x, 2, 0), c = 0, u = 0, r.mode = 2;
                break;
            }
            if (r.flags = 0, r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & c) << 8) + (c >> 8)) % 31) {
                e.msg = "incorrect header check", r.mode = 30;
                break;
            }
            if (8 != (15 & c)) {
                e.msg = "unknown compression method", r.mode = 30;
                break;
            }
            if (u -= 4, E = 8 + (15 & (c >>>= 4)), 0 === r.wbits)
                r.wbits = E;
            else if (E > r.wbits) {
                e.msg = "invalid window size", r.mode = 30;
                break;
            }
            r.dmax = 1 << E, e.adler = r.check = 1, r.mode = 512 & c ? 10 : 12, c = 0, u = 0;
            break;
        case 2:
            for (; u < 16;) {
                if (0 === s)
                    break e;
                s--, c += n[a++] << u, u += 8;
            }
            if (r.flags = c, 8 != (255 & r.flags)) {
                e.msg = "unknown compression method", r.mode = 30;
                break;
            }
            if (57344 & r.flags) {
                e.msg = "unknown header flags set", r.mode = 30;
                break;
            }
            r.head && (r.head.text = c >> 8 & 1), 512 & r.flags && (x[0] = 255 & c, x[1] = c >>> 8 & 255, r.check = Wt(r.check, x, 2, 0)), c = 0, u = 0, r.mode = 3;
        case 3:
            for (; u < 32;) {
                if (0 === s)
                    break e;
                s--, c += n[a++] << u, u += 8;
            }
            r.head && (r.head.time = c), 512 & r.flags && (x[0] = 255 & c, x[1] = c >>> 8 & 255, x[2] = c >>> 16 & 255, x[3] = c >>> 24 & 255, r.check = Wt(r.check, x, 4, 0)), c = 0, u = 0, r.mode = 4;
        case 4:
            for (; u < 16;) {
                if (0 === s)
                    break e;
                s--, c += n[a++] << u, u += 8;
            }
            r.head && (r.head.xflags = 255 & c, r.head.os = c >> 8), 512 & r.flags && (x[0] = 255 & c, x[1] = c >>> 8 & 255, r.check = Wt(r.check, x, 2, 0)), c = 0, u = 0, r.mode = 5;
        case 5:
            if (1024 & r.flags) {
                for (; u < 16;) {
                    if (0 === s)
                        break e;
                    s--, c += n[a++] << u, u += 8;
                }
                r.length = c, r.head && (r.head.extra_len = c), 512 & r.flags && (x[0] = 255 & c, x[1] = c >>> 8 & 255, r.check = Wt(r.check, x, 2, 0)), c = 0, u = 0;
            }
            else
                r.head && (r.head.extra = null);
            r.mode = 6;
        case 6:
            if (1024 & r.flags && ((d = r.length) > s && (d = s), d && (r.head && (E = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Array(r.head.extra_len)), Gt.arraySet(r.head.extra, n, a, d, E)), 512 & r.flags && (r.check = Wt(r.check, n, d, a)), s -= d, a += d, r.length -= d), r.length))
                break e;
            r.length = 0, r.mode = 7;
        case 7:
            if (2048 & r.flags) {
                if (0 === s)
                    break e;
                d = 0;
                do {
                    E = n[a + d++], r.head && E && r.length < 65536 && (r.head.name += String.fromCharCode(E));
                } while (E && d < s);
                if (512 & r.flags && (r.check = Wt(r.check, n, d, a)), s -= d, a += d, E)
                    break e;
            }
            else
                r.head && (r.head.name = null);
            r.length = 0, r.mode = 8;
        case 8:
            if (4096 & r.flags) {
                if (0 === s)
                    break e;
                d = 0;
                do {
                    E = n[a + d++], r.head && E && r.length < 65536 && (r.head.comment += String.fromCharCode(E));
                } while (E && d < s);
                if (512 & r.flags && (r.check = Wt(r.check, n, d, a)), s -= d, a += d, E)
                    break e;
            }
            else
                r.head && (r.head.comment = null);
            r.mode = 9;
        case 9:
            if (512 & r.flags) {
                for (; u < 16;) {
                    if (0 === s)
                        break e;
                    s--, c += n[a++] << u, u += 8;
                }
                if (c !== (65535 & r.check)) {
                    e.msg = "header crc mismatch", r.mode = 30;
                    break;
                }
                c = 0, u = 0;
            }
            r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), e.adler = r.check = 0, r.mode = 12;
            break;
        case 10:
            for (; u < 32;) {
                if (0 === s)
                    break e;
                s--, c += n[a++] << u, u += 8;
            }
            e.adler = r.check = ir(c), c = 0, u = 0, r.mode = 11;
        case 11:
            if (0 === r.havedict)
                return e.next_out = o, e.avail_out = l, e.next_in = a, e.avail_in = s, r.hold = c, r.bits = u, 2;
            e.adler = r.check = 1, r.mode = 12;
        case 12: if (5 === t || 6 === t)
            break e;
        case 13:
            if (r.last) {
                c >>>= 7 & u, u -= 7 & u, r.mode = 27;
                break;
            }
            for (; u < 3;) {
                if (0 === s)
                    break e;
                s--, c += n[a++] << u, u += 8;
            }
            switch (r.last = 1 & c, u -= 1, 3 & (c >>>= 1)) {
                case 0:
                    r.mode = 14;
                    break;
                case 1:
                    if (fr(r), r.mode = 20, 6 === t) {
                        c >>>= 2, u -= 2;
                        break e;
                    }
                    break;
                case 2:
                    r.mode = 17;
                    break;
                case 3: e.msg = "invalid block type", r.mode = 30;
            }
            c >>>= 2, u -= 2;
            break;
        case 14:
            for (c >>>= 7 & u, u -= 7 & u; u < 32;) {
                if (0 === s)
                    break e;
                s--, c += n[a++] << u, u += 8;
            }
            if ((65535 & c) != (c >>> 16 ^ 65535)) {
                e.msg = "invalid stored block lengths", r.mode = 30;
                break;
            }
            if (r.length = 65535 & c, c = 0, u = 0, r.mode = 15, 6 === t)
                break e;
        case 15: r.mode = 16;
        case 16:
            if (d = r.length) {
                if (d > s && (d = s), d > l && (d = l), 0 === d)
                    break e;
                Gt.arraySet(i, n, a, d, o), s -= d, a += d, l -= d, o += d, r.length -= d;
                break;
            }
            r.mode = 12;
            break;
        case 17:
            for (; u < 14;) {
                if (0 === s)
                    break e;
                s--, c += n[a++] << u, u += 8;
            }
            if (r.nlen = 257 + (31 & c), c >>>= 5, u -= 5, r.ndist = 1 + (31 & c), c >>>= 5, u -= 5, r.ncode = 4 + (15 & c), c >>>= 4, u -= 4, r.nlen > 286 || r.ndist > 30) {
                e.msg = "too many length or distance symbols", r.mode = 30;
                break;
            }
            r.have = 0, r.mode = 18;
        case 18:
            for (; r.have < r.ncode;) {
                for (; u < 3;) {
                    if (0 === s)
                        break e;
                    s--, c += n[a++] << u, u += 8;
                }
                r.lens[I[r.have++]] = 7 & c, c >>>= 3, u -= 3;
            }
            for (; r.have < 19;)
                r.lens[I[r.have++]] = 0;
            if (r.lencode = r.lendyn, r.lenbits = 7, S = { bits: r.lenbits }, N = $t(0, r.lens, 0, 19, r.lencode, 0, r.work, S), r.lenbits = S.bits, N) {
                e.msg = "invalid code lengths set", r.mode = 30;
                break;
            }
            r.have = 0, r.mode = 19;
        case 19:
            for (; r.have < r.nlen + r.ndist;) {
                for (; w = (T = r.lencode[c & (1 << r.lenbits) - 1]) >>> 16 & 255, y = 65535 & T, !((g = T >>> 24) <= u);) {
                    if (0 === s)
                        break e;
                    s--, c += n[a++] << u, u += 8;
                }
                if (y < 16)
                    c >>>= g, u -= g, r.lens[r.have++] = y;
                else {
                    if (16 === y) {
                        for (D = g + 2; u < D;) {
                            if (0 === s)
                                break e;
                            s--, c += n[a++] << u, u += 8;
                        }
                        if (c >>>= g, u -= g, 0 === r.have) {
                            e.msg = "invalid bit length repeat", r.mode = 30;
                            break;
                        }
                        E = r.lens[r.have - 1], d = 3 + (3 & c), c >>>= 2, u -= 2;
                    }
                    else if (17 === y) {
                        for (D = g + 3; u < D;) {
                            if (0 === s)
                                break e;
                            s--, c += n[a++] << u, u += 8;
                        }
                        u -= g, E = 0, d = 3 + (7 & (c >>>= g)), c >>>= 3, u -= 3;
                    }
                    else {
                        for (D = g + 7; u < D;) {
                            if (0 === s)
                                break e;
                            s--, c += n[a++] << u, u += 8;
                        }
                        u -= g, E = 0, d = 11 + (127 & (c >>>= g)), c >>>= 7, u -= 7;
                    }
                    if (r.have + d > r.nlen + r.ndist) {
                        e.msg = "invalid bit length repeat", r.mode = 30;
                        break;
                    }
                    for (; d--;)
                        r.lens[r.have++] = E;
                }
            }
            if (30 === r.mode)
                break;
            if (0 === r.lens[256]) {
                e.msg = "invalid code -- missing end-of-block", r.mode = 30;
                break;
            }
            if (r.lenbits = 9, S = { bits: r.lenbits }, N = $t(qt, r.lens, 0, r.nlen, r.lencode, 0, r.work, S), r.lenbits = S.bits, N) {
                e.msg = "invalid literal/lengths set", r.mode = 30;
                break;
            }
            if (r.distbits = 6, r.distcode = r.distdyn, S = { bits: r.distbits }, N = $t(Qt, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, S), r.distbits = S.bits, N) {
                e.msg = "invalid distances set", r.mode = 30;
                break;
            }
            if (r.mode = 20, 6 === t)
                break e;
        case 20: r.mode = 21;
        case 21:
            if (s >= 6 && l >= 258) {
                e.next_out = o, e.avail_out = l, e.next_in = a, e.avail_in = s, r.hold = c, r.bits = u, Xt(e, f), o = e.next_out, i = e.output, l = e.avail_out, a = e.next_in, n = e.input, s = e.avail_in, c = r.hold, u = r.bits, 12 === r.mode && (r.back = -1);
                break;
            }
            for (r.back = 0; w = (T = r.lencode[c & (1 << r.lenbits) - 1]) >>> 16 & 255, y = 65535 & T, !((g = T >>> 24) <= u);) {
                if (0 === s)
                    break e;
                s--, c += n[a++] << u, u += 8;
            }
            if (w && 0 == (240 & w)) {
                for (b = g, v = w, _ = y; w = (T = r.lencode[_ + ((c & (1 << b + v) - 1) >> b)]) >>> 16 & 255, y = 65535 & T, !(b + (g = T >>> 24) <= u);) {
                    if (0 === s)
                        break e;
                    s--, c += n[a++] << u, u += 8;
                }
                c >>>= b, u -= b, r.back += b;
            }
            if (c >>>= g, u -= g, r.back += g, r.length = y, 0 === w) {
                r.mode = 26;
                break;
            }
            if (32 & w) {
                r.back = -1, r.mode = 12;
                break;
            }
            if (64 & w) {
                e.msg = "invalid literal/length code", r.mode = 30;
                break;
            }
            r.extra = 15 & w, r.mode = 22;
        case 22:
            if (r.extra) {
                for (D = r.extra; u < D;) {
                    if (0 === s)
                        break e;
                    s--, c += n[a++] << u, u += 8;
                }
                r.length += c & (1 << r.extra) - 1, c >>>= r.extra, u -= r.extra, r.back += r.extra;
            }
            r.was = r.length, r.mode = 23;
        case 23:
            for (; w = (T = r.distcode[c & (1 << r.distbits) - 1]) >>> 16 & 255, y = 65535 & T, !((g = T >>> 24) <= u);) {
                if (0 === s)
                    break e;
                s--, c += n[a++] << u, u += 8;
            }
            if (0 == (240 & w)) {
                for (b = g, v = w, _ = y; w = (T = r.distcode[_ + ((c & (1 << b + v) - 1) >> b)]) >>> 16 & 255, y = 65535 & T, !(b + (g = T >>> 24) <= u);) {
                    if (0 === s)
                        break e;
                    s--, c += n[a++] << u, u += 8;
                }
                c >>>= b, u -= b, r.back += b;
            }
            if (c >>>= g, u -= g, r.back += g, 64 & w) {
                e.msg = "invalid distance code", r.mode = 30;
                break;
            }
            r.offset = y, r.extra = 15 & w, r.mode = 24;
        case 24:
            if (r.extra) {
                for (D = r.extra; u < D;) {
                    if (0 === s)
                        break e;
                    s--, c += n[a++] << u, u += 8;
                }
                r.offset += c & (1 << r.extra) - 1, c >>>= r.extra, u -= r.extra, r.back += r.extra;
            }
            if (r.offset > r.dmax) {
                e.msg = "invalid distance too far back", r.mode = 30;
                break;
            }
            r.mode = 25;
        case 25:
            if (0 === l)
                break e;
            if (d = f - l, r.offset > d) {
                if ((d = r.offset - d) > r.whave && r.sane) {
                    e.msg = "invalid distance too far back", r.mode = 30;
                    break;
                }
                d > r.wnext ? (d -= r.wnext, p = r.wsize - d) : p = r.wnext - d, d > r.length && (d = r.length), m = r.window;
            }
            else
                m = i, p = o - r.offset, d = r.length;
            d > l && (d = l), l -= d, r.length -= d;
            do {
                i[o++] = m[p++];
            } while (--d);
            0 === r.length && (r.mode = 21);
            break;
        case 26:
            if (0 === l)
                break e;
            i[o++] = r.length, l--, r.mode = 21;
            break;
        case 27:
            if (r.wrap) {
                for (; u < 32;) {
                    if (0 === s)
                        break e;
                    s--, c |= n[a++] << u, u += 8;
                }
                if (f -= l, e.total_out += f, r.total += f, f && (e.adler = r.check = r.flags ? Wt(r.check, i, f, o - f) : Yt(r.check, i, f, o - f)), f = l, (r.flags ? c : ir(c)) !== r.check) {
                    e.msg = "incorrect data check", r.mode = 30;
                    break;
                }
                c = 0, u = 0;
            }
            r.mode = 28;
        case 28:
            if (r.wrap && r.flags) {
                for (; u < 32;) {
                    if (0 === s)
                        break e;
                    s--, c += n[a++] << u, u += 8;
                }
                if (c !== (4294967295 & r.total)) {
                    e.msg = "incorrect length check", r.mode = 30;
                    break;
                }
                c = 0, u = 0;
            }
            r.mode = 29;
        case 29:
            N = 1;
            break e;
        case 30:
            N = -3;
            break e;
        case 31: return -4;
        case 32:
        default: return er;
    } return e.next_out = o, e.avail_out = l, e.next_in = a, e.avail_in = s, r.hold = c, r.bits = u, (r.wsize || f !== e.avail_out && r.mode < 30 && (r.mode < 27 || 4 !== t)) && dr(e, e.output, e.next_out, f - e.avail_out) ? (r.mode = 31, -4) : (h -= e.avail_in, f -= e.avail_out, e.total_in += h, e.total_out += f, r.total += f, r.wrap && f && (e.adler = r.check = r.flags ? Wt(r.check, i, f, e.next_out - f) : Yt(r.check, i, f, e.next_out - f)), e.data_type = r.bits + (r.last ? 64 : 0) + (12 === r.mode ? 128 : 0) + (20 === r.mode || 15 === r.mode ? 256 : 0), (0 === h && 0 === f || 4 === t) && N === Jt && (N = -5), N); }, vr = function (e) { if (!e || !e.state)
    return er; var t = e.state; return t.window && (t.window = null), e.state = null, Jt; }, _r = function (e, t) { var r; return e && e.state ? 0 == (2 & (r = e.state).wrap) ? er : (r.head = t, t.done = !1, Jt) : er; }, Er = function (e, t) { var r, n = t.length; return e && e.state ? 0 !== (r = e.state).wrap && 11 !== r.mode ? er : 11 === r.mode && Yt(1, t, n, 0) !== r.check ? -3 : dr(e, t, n, n) ? (r.mode = 31, -4) : (r.havedict = 1, Jt) : er; }, Nr = "pako inflate (from Nodeca project)", Sr = { inflateReset: pr, inflateReset2: mr, inflateResetKeep: gr, inflateInit: wr, inflateInit2: yr, inflate: br, inflateEnd: vr, inflateGetHeader: _r, inflateSetDictionary: Er, inflateInfo: Nr }, Dr = Object.freeze({ default: Sr, __moduleExports: Sr, inflateReset: pr, inflateReset2: mr, inflateResetKeep: gr, inflateInit: wr, inflateInit2: yr, inflate: br, inflateEnd: vr, inflateGetHeader: _r, inflateSetDictionary: Er, inflateInfo: Nr }), Tr = !0, xr = !0; try {
    String.fromCharCode.apply(null, [0]);
}
catch (e) {
    Tr = !1;
} try {
    String.fromCharCode.apply(null, new Uint8Array(1));
}
catch (e) {
    xr = !1;
} for (var Ir = new Gt.Buf8(256), Ar = 0; Ar < 256; Ar++)
    Ir[Ar] = Ar >= 252 ? 6 : Ar >= 248 ? 5 : Ar >= 240 ? 4 : Ar >= 224 ? 3 : Ar >= 192 ? 2 : 1; Ir[254] = Ir[254] = 1; var kr = function (e) { var t, r, n, i, a, o = e.length, s = 0; for (i = 0; i < o; i++)
    55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < o && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++), s += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4; for (t = new Gt.Buf8(s), a = 0, i = 0; a < s; i++)
    55296 == (64512 & (r = e.charCodeAt(i))) && i + 1 < o && 56320 == (64512 & (n = e.charCodeAt(i + 1))) && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++), r < 128 ? t[a++] = r : r < 2048 ? (t[a++] = 192 | r >>> 6, t[a++] = 128 | 63 & r) : r < 65536 ? (t[a++] = 224 | r >>> 12, t[a++] = 128 | r >>> 6 & 63, t[a++] = 128 | 63 & r) : (t[a++] = 240 | r >>> 18, t[a++] = 128 | r >>> 12 & 63, t[a++] = 128 | r >>> 6 & 63, t[a++] = 128 | 63 & r); return t; }; function Cr(e, t) { if (t < 65537 && (e.subarray && xr || !e.subarray && Tr))
    return String.fromCharCode.apply(null, Gt.shrinkBuf(e, t)); for (var r = "", n = 0; n < t; n++)
    r += String.fromCharCode(e[n]); return r; } var Or = function (e) { return Cr(e, e.length); }, Rr = function (e) { for (var t = new Gt.Buf8(e.length), r = 0, n = t.length; r < n; r++)
    t[r] = e.charCodeAt(r); return t; }, Fr = function (e, t) { var r, n, i, a, o = t || e.length, s = new Array(2 * o); for (n = 0, r = 0; r < o;)
    if ((i = e[r++]) < 128)
        s[n++] = i;
    else if ((a = Ir[i]) > 4)
        s[n++] = 65533, r += a - 1;
    else {
        for (i &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && r < o;)
            i = i << 6 | 63 & e[r++], a--;
        a > 1 ? s[n++] = 65533 : i < 65536 ? s[n++] = i : (i -= 65536, s[n++] = 55296 | i >> 10 & 1023, s[n++] = 56320 | 1023 & i);
    } return Cr(s, n); }, Lr = function (e, t) { var r; for ((t = t || e.length) > e.length && (t = e.length), r = t - 1; r >= 0 && 128 == (192 & e[r]);)
    r--; return r < 0 ? t : 0 === r ? t : r + Ir[e[r]] > t ? r : t; }, Mr = { string2buf: kr, buf2binstring: Or, binstring2buf: Rr, buf2string: Fr, utf8border: Lr }, Br = Object.freeze({ default: Mr, __moduleExports: Mr, string2buf: kr, buf2binstring: Or, binstring2buf: Rr, buf2string: Fr, utf8border: Lr }), Ur = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 }, Pr = Ur.Z_NO_FLUSH, Gr = Ur.Z_PARTIAL_FLUSH, Zr = Ur.Z_SYNC_FLUSH, Kr = Ur.Z_FULL_FLUSH, Vr = Ur.Z_FINISH, jr = Ur.Z_BLOCK, zr = Ur.Z_TREES, Hr = Ur.Z_OK, Yr = Ur.Z_STREAM_END, Wr = Ur.Z_NEED_DICT, Xr = Ur.Z_ERRNO, $r = Ur.Z_STREAM_ERROR, qr = Ur.Z_DATA_ERROR, Qr = Ur.Z_BUF_ERROR, Jr = Ur.Z_NO_COMPRESSION, en = Ur.Z_BEST_SPEED, tn = Ur.Z_BEST_COMPRESSION, rn = Ur.Z_DEFAULT_COMPRESSION, nn = Ur.Z_FILTERED, an = Ur.Z_HUFFMAN_ONLY, on = Ur.Z_RLE, sn = Ur.Z_FIXED, ln = Ur.Z_DEFAULT_STRATEGY, cn = Ur.Z_BINARY, un = Ur.Z_TEXT, hn = Ur.Z_UNKNOWN, fn = Ur.Z_DEFLATED, dn = Object.freeze({ default: Ur, __moduleExports: Ur, Z_NO_FLUSH: Pr, Z_PARTIAL_FLUSH: Gr, Z_SYNC_FLUSH: Zr, Z_FULL_FLUSH: Kr, Z_FINISH: Vr, Z_BLOCK: jr, Z_TREES: zr, Z_OK: Hr, Z_STREAM_END: Yr, Z_NEED_DICT: Wr, Z_ERRNO: Xr, Z_STREAM_ERROR: $r, Z_DATA_ERROR: qr, Z_BUF_ERROR: Qr, Z_NO_COMPRESSION: Jr, Z_BEST_SPEED: en, Z_BEST_COMPRESSION: tn, Z_DEFAULT_COMPRESSION: rn, Z_FILTERED: nn, Z_HUFFMAN_ONLY: an, Z_RLE: on, Z_FIXED: sn, Z_DEFAULT_STRATEGY: ln, Z_BINARY: cn, Z_TEXT: un, Z_UNKNOWN: hn, Z_DEFLATED: fn }), pn = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" }, mn = Object.freeze({ default: pn, __moduleExports: pn }), gn = function () { this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0; }, wn = Object.freeze({ default: gn, __moduleExports: gn }), yn = function () { this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1; }, bn = Object.freeze({ default: yn, __moduleExports: yn }), vn = Dr && Sr || Dr, _n = Br && Mr || Br, En = dn && Ur || dn, Nn = mn && pn || mn, Sn = wn && gn || wn, Dn = bn && yn || bn, Tn = Object.prototype.toString; function xn(e) { if (!(this instanceof xn))
    return new xn(e); this.options = Gt.assign({ chunkSize: 16384, windowBits: 0, to: "" }, e || {}); var t = this.options; t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Sn, this.strm.avail_out = 0; var r = vn.inflateInit2(this.strm, t.windowBits); if (r !== En.Z_OK)
    throw new Error(Nn[r]); this.header = new Dn, vn.inflateGetHeader(this.strm, this.header); } function In(e, t) { var r = new xn(t); if (r.push(e, !0), r.err)
    throw r.msg || Nn[r.err]; return r.result; } xn.prototype.push = function (e, t) { var r, n, i, a, o, s, l = this.strm, c = this.options.chunkSize, u = this.options.dictionary, h = !1; if (this.ended)
    return !1; n = t === ~~t ? t : !0 === t ? En.Z_FINISH : En.Z_NO_FLUSH, "string" == typeof e ? l.input = _n.binstring2buf(e) : "[object ArrayBuffer]" === Tn.call(e) ? l.input = new Uint8Array(e) : l.input = e, l.next_in = 0, l.avail_in = l.input.length; do {
    if (0 === l.avail_out && (l.output = new Gt.Buf8(c), l.next_out = 0, l.avail_out = c), (r = vn.inflate(l, En.Z_NO_FLUSH)) === En.Z_NEED_DICT && u && (s = "string" == typeof u ? _n.string2buf(u) : "[object ArrayBuffer]" === Tn.call(u) ? new Uint8Array(u) : u, r = vn.inflateSetDictionary(this.strm, s)), r === En.Z_BUF_ERROR && !0 === h && (r = En.Z_OK, h = !1), r !== En.Z_STREAM_END && r !== En.Z_OK)
        return this.onEnd(r), this.ended = !0, !1;
    l.next_out && (0 !== l.avail_out && r !== En.Z_STREAM_END && (0 !== l.avail_in || n !== En.Z_FINISH && n !== En.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i = _n.utf8border(l.output, l.next_out), a = l.next_out - i, o = _n.buf2string(l.output, i), l.next_out = a, l.avail_out = c - a, a && Gt.arraySet(l.output, l.output, i, a, 0), this.onData(o)) : this.onData(Gt.shrinkBuf(l.output, l.next_out)))), 0 === l.avail_in && 0 === l.avail_out && (h = !0);
} while ((l.avail_in > 0 || 0 === l.avail_out) && r !== En.Z_STREAM_END); return r === En.Z_STREAM_END && (n = En.Z_FINISH), n === En.Z_FINISH ? (r = vn.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === En.Z_OK) : n !== En.Z_SYNC_FLUSH || (this.onEnd(En.Z_OK), l.avail_out = 0, !0); }, xn.prototype.onData = function (e) { this.chunks.push(e); }, xn.prototype.onEnd = function (e) { e === En.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = Gt.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg; }; var An = xn, kn = In, Cn = function (e, t) { return (t = t || {}).raw = !0, In(e, t); }, On = In, Rn = { Inflate: An, inflate: kn, inflateRaw: Cn, ungzip: On }, Fn = Object.freeze({ default: Rn, __moduleExports: Rn, Inflate: An, inflate: kn, inflateRaw: Cn, ungzip: On }), Ln = (Fn && Rn || Fn).inflate; function Mn() { } Mn.prototype = Object.create(wt.prototype), Mn.prototype.constructor = Mn, Mn.prototype.decodeBlock = function (e) { return Ln(new Uint8Array(e)).buffer; }; var Bn = Mn, Un = Object.freeze({ default: Bn, __moduleExports: Bn }); function Pn() { } Pn.prototype = Object.create(wt.prototype), Pn.prototype.constructor = Pn, Pn.prototype.decodeBlock = function (e) { var t, r, n = new DataView(e), i = []; for (t = 0; t < e.byteLength; ++t) {
    var a = n.getInt8(t);
    if (a < 0) {
        var o = n.getUint8(t + 1);
        for (a = -a, r = 0; r <= a; ++r)
            i.push(o);
        t += 1;
    }
    else {
        for (r = 0; r <= a; ++r)
            i.push(n.getUint8(t + r + 1));
        t += a + 1;
    }
} return new Uint8Array(i).buffer; }; var Gn = Pn, Zn = Object.freeze({ default: Gn, __moduleExports: Gn }), Kn = at && Xe || at, Vn = dt && ot || dt, jn = vt && bt || vt, zn = St && Nt || St, Hn = Un && Bn || Un, Yn = Zn && Gn || Zn, Wn = function (e, t, r) { for (var n = 0, i = t; i < r; ++i)
    n += e[i]; return n; }, Xn = function (e, t, r) { switch (e) {
    case 1:
        switch (t) {
            case 8: return new Uint8Array(r);
            case 16: return new Uint16Array(r);
            case 32: return new Uint32Array(r);
        }
        break;
    case 2:
        switch (t) {
            case 8: return new Int8Array(r);
            case 16: return new Int16Array(r);
            case 32: return new Int32Array(r);
        }
        break;
    case 3: switch (t) {
        case 32: return new Float32Array(r);
        case 64: return new Float64Array(r);
    }
} throw Error("Unsupported data format/bitsPerSample"); }; function $n(e, t, r, n, i) { this.fileDirectory = e, this.geoKeys = t, this.dataView = r, this.littleEndian = n, this.tiles = i ? {} : null, this.isTiled = !e.StripOffsets; var a = e.PlanarConfiguration; if (this.planarConfiguration = void 0 === a ? 1 : a, 1 !== this.planarConfiguration && 2 !== this.planarConfiguration)
    throw new Error("Invalid planar configuration."); switch (this.fileDirectory.Compression) {
    case void 0:
    case 1:
        this.decoder = new jn;
        break;
    case 5:
        this.decoder = new zn;
        break;
    case 6: throw new Error("JPEG compression not supported.");
    case 8:
        this.decoder = new Hn;
        break;
    case 32773:
        this.decoder = new Yn;
        break;
    default: throw new Error("Unknown compresseion method identifier: " + this.fileDirectory.Compression);
} } $n.prototype = { getFileDirectory: function () { return this.fileDirectory; }, getGeoKeys: function () { return this.geoKeys; }, getWidth: function () { return this.fileDirectory.ImageWidth; }, getHeight: function () { return this.fileDirectory.ImageLength; }, getSamplesPerPixel: function () { return this.fileDirectory.SamplesPerPixel; }, getTileWidth: function () { return this.isTiled ? this.fileDirectory.TileWidth : this.getWidth(); }, getTileHeight: function () { return this.isTiled ? this.fileDirectory.TileLength : this.fileDirectory.RowsPerStrip; }, getBytesPerPixel: function () { for (var e = 0, t = 0; t < this.fileDirectory.BitsPerSample.length; ++t) {
        var r = this.fileDirectory.BitsPerSample[t];
        if (r % 8 != 0)
            throw new Error("Sample bit-width of " + r + " is not supported.");
        if (r !== this.fileDirectory.BitsPerSample[0])
            throw new Error("Differing size of samples in a pixel are not supported.");
        e += r;
    } return e / 8; }, getSampleByteSize: function (e) { if (e >= this.fileDirectory.BitsPerSample.length)
        throw new RangeError("Sample index " + e + " is out of range."); var t = this.fileDirectory.BitsPerSample[e]; if (t % 8 != 0)
        throw new Error("Sample bit-width of " + t + " is not supported."); return t / 8; }, getReaderForSample: function (e) { var t = this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[e] : 1, r = this.fileDirectory.BitsPerSample[e]; switch (t) {
        case 1:
            switch (r) {
                case 8: return DataView.prototype.getUint8;
                case 16: return DataView.prototype.getUint16;
                case 32: return DataView.prototype.getUint32;
            }
            break;
        case 2:
            switch (r) {
                case 8: return DataView.prototype.getInt8;
                case 16: return DataView.prototype.getInt16;
                case 32: return DataView.prototype.getInt32;
            }
            break;
        case 3: switch (r) {
            case 32: return DataView.prototype.getFloat32;
            case 64: return DataView.prototype.getFloat64;
        }
    } }, getArrayForSample: function (e, t) { var r = this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[e] : 1, n = this.fileDirectory.BitsPerSample[e]; return Xn(r, n, t); }, getDecoder: function () { return this.decoder; }, getTileOrStrip: function (e, t, r, n) { var i, a, o, s = Math.ceil(this.getWidth() / this.getTileWidth()), l = Math.ceil(this.getHeight() / this.getTileHeight()), c = this.tiles; if (1 === this.planarConfiguration ? i = t * s + e : 2 === this.planarConfiguration && (i = r * s * l + t * s + e), null !== c && i in c)
        return n ? n(null, { x: e, y: t, sample: r, data: c[i] }) : c[i]; this.isTiled ? (a = this.fileDirectory.TileOffsets[i], o = this.fileDirectory.TileByteCounts[i]) : (a = this.fileDirectory.StripOffsets[i], o = this.fileDirectory.StripByteCounts[i]); var u = this.dataView.buffer.slice(a, a + o); if (n)
        return this.getDecoder().decodeBlockAsync(u, function (a, o) { a || null === c || (c[i] = o), n(a, { x: e, y: t, sample: r, data: o }); }); var h = this.getDecoder().decodeBlock(u); return null !== c && (c[i] = h), h; }, _readRasterAsync: function (e, t, r, n, i, a) { for (var o = this.getTileWidth(), s = this.getTileHeight(), l = Math.floor(e[0] / o), c = Math.ceil(e[2] / o), u = Math.floor(e[1] / s), h = Math.ceil(e[3] / s), f = (Math.ceil(this.getWidth() / o), e[2] - e[0]), d = (e[3], e[1], this.getBytesPerPixel()), p = (this.getWidth(), this.fileDirectory.Predictor || 1), m = [], g = [], w = 0; w < t.length; ++w)
        1 === this.planarConfiguration ? m.push(Wn(this.fileDirectory.BitsPerSample, 0, t[w]) / 8) : m.push(0), g.push(this.getReaderForSample(t[w])); var y = !1, b = 0, v = this.littleEndian, _ = null; function E() { y && 0 === b && (_ ? a(_) : i(r)); } function N(i, a) { if (i)
        _ = i;
    else
        for (var l = new DataView(a.data), c = a.y * s, u = a.x * o, h = (a.y + 1) * s, w = (a.x + 1) * o, y = a.sample, N = Math.max(0, e[1] - c); N < Math.min(s, s - (h - e[3])); ++N)
            for (var S = Math.max(0, e[0] - u); S < Math.min(o, o - (w - e[2])); ++S) {
                var D, T = (N * o + S) * d, x = g[y].call(l, T + m[y], v);
                n ? (1 !== p && S > 0 && (D = (N + c - e[1]) * f * t.length + (S + u - e[0] - 1) * t.length + y, x += r[D]), D = (N + c - e[1]) * f * t.length + (S + u - e[0]) * t.length + y, r[D] = x) : (1 !== p && S > 0 && (D = (N + c - e[1]) * f + S - 1 + u - e[0], x += r[y][D]), D = (N + c - e[1]) * f + S + u - e[0], r[y][D] = x);
            } b -= 1, E(); } for (var S = u; S <= h; ++S)
        for (var D = l; D <= c; ++D)
            for (var T = 0; T < t.length; ++T) {
                var x = t[T];
                2 === this.planarConfiguration && (d = this.getSampleByteSize(x)), b += 1, this.getTileOrStrip(D, S, x, N);
            } y = !0, E(); }, _readRaster: function (e, t, r, n, i, a) { try {
        for (var o = this.getTileWidth(), s = this.getTileHeight(), l = Math.floor(e[0] / o), c = Math.ceil(e[2] / o), u = Math.floor(e[1] / s), h = Math.ceil(e[3] / s), f = (Math.ceil(this.getWidth() / o), e[2] - e[0]), d = (e[3], e[1], this.getBytesPerPixel()), p = (this.getWidth(), this.fileDirectory.Predictor || 1), m = [], g = [], w = 0; w < t.length; ++w)
            1 === this.planarConfiguration ? m.push(Wn(this.fileDirectory.BitsPerSample, 0, t[w]) / 8) : m.push(0), g.push(this.getReaderForSample(t[w]));
        for (var y = u; y < h; ++y)
            for (var b = l; b < c; ++b)
                for (var v = y * s, _ = b * o, E = (y + 1) * s, N = (b + 1) * o, S = 0; S < t.length; ++S) {
                    var D = t[S];
                    2 === this.planarConfiguration && (d = this.getSampleByteSize(D));
                    var T = new DataView(this.getTileOrStrip(b, y, D)), x = g[S], I = Math.min(s, s - (E - e[3])), A = Math.min(o, o - (N - e[2])), k = (I * o + A) * d, C = new Uint8Array(T.buffer).length;
                    2 * C !== k && this._debugMessages && console.warn("dimension mismatch", C, k);
                    for (var O = Math.max(0, e[1] - v); O < I; ++O)
                        for (var R = Math.max(0, e[0] - _); R < A; ++R) {
                            var F, L = (O * o + R) * d, M = 0;
                            L < C - 1 && (M = x.call(T, L + m[S], this.littleEndian)), n ? (1 !== p && R > 0 && (M += r[F = (O + v - e[1]) * f * t.length + (R + _ - e[0] - 1) * t.length + S]), r[F = (O + v - e[1]) * f * t.length + (R + _ - e[0]) * t.length + S] = M) : (1 !== p && R > 0 && (F = (O + v - e[1]) * f + R - 1 + _ - e[0], M += r[S][F]), F = (O + v - e[1]) * f + R + _ - e[0], r[S][F] = M);
                        }
                }
        return i(r), r;
    }
    catch (e) {
        return a(e);
    } }, readRasters: function () { var e, t, r; switch (arguments.length) {
        case 0: break;
        case 1:
            "function" == typeof arguments[0] ? t = arguments[0] : e = arguments[0];
            break;
        case 2:
            "function" == typeof arguments[0] ? (t = arguments[0], r = arguments[1]) : (e = arguments[0], t = arguments[1]);
            break;
        case 3:
            e = arguments[0], t = arguments[1], r = arguments[2];
            break;
        default: throw new Error("Invalid number of arguments passed.");
    } e = e || {}, r = r || function (e) { console.error(e); }; var n = e.window || [0, 0, this.getWidth(), this.getHeight()], i = e.samples, a = e.interleave; if (n[0] < 0 || n[1] < 0 || n[2] > this.getWidth() || n[3] > this.getHeight())
        throw new Error("Select window is out of image bounds."); if (n[0] > n[2] || n[1] > n[3])
        throw new Error("Invalid subsets"); var o, s, l = (n[2] - n[0]) * (n[3] - n[1]); if (i) {
        for (o = 0; o < i.length; ++o)
            if (i[o] >= this.fileDirectory.SamplesPerPixel)
                throw new RangeError("Invalid sample index '" + i[o] + "'.");
    }
    else
        for (i = [], o = 0; o < this.fileDirectory.SamplesPerPixel; ++o)
            i.push(o); if (a) {
        var c = this.fileDirectory.SampleFormat ? Math.max.apply(null, this.fileDirectory.SampleFormat) : 1, u = Math.max.apply(null, this.fileDirectory.BitsPerSample);
        s = Xn(c, u, l * i.length);
    }
    else
        for (s = [], o = 0; o < i.length; ++o)
            s.push(this.getArrayForSample(i[o], l)); if (this.getDecoder().isAsync()) {
        if (!t)
            throw new Error("No callback specified for asynchronous raster reading.");
        return this._readRasterAsync(n, i, s, a, t, r);
    } return t = t || function () { }, this._readRaster(n, i, s, a, t, r); }, readRGB: function () { var e = null, t = null, r = null; switch (arguments.length) {
        case 0: break;
        case 1:
            "function" == typeof arguments[0] ? t = arguments[0] : e = arguments[0];
            break;
        case 2:
            "function" == typeof arguments[0] ? (t = arguments[0], r = arguments[1]) : (e = arguments[0], t = arguments[1]);
            break;
        case 3:
            e = arguments[0], t = arguments[1], r = arguments[2];
            break;
        default: throw new Error("Invalid number of arguments passed.");
    } e = e || {}, r = r || function (e) { console.error(e); }; var n = e.window || [0, 0, this.getWidth(), this.getHeight()]; if (n[0] < 0 || n[1] < 0 || n[2] > this.getWidth() || n[3] > this.getHeight())
        throw new Error("Select window is out of image bounds."); if (n[0] > n[2] || n[1] > n[3])
        throw new Error("Invalid subsets"); var i, a = n[2] - n[0], o = n[3] - n[1], s = this.fileDirectory.PhotometricInterpretation, l = this.fileDirectory.BitsPerSample[0], c = Math.pow(2, l); if (s === Kn.photometricInterpretations.RGB)
        return this.readRasters({ window: e.window, interleave: !0 }, t, r); switch (s) {
        case Kn.photometricInterpretations.WhiteIsZero:
        case Kn.photometricInterpretations.BlackIsZero:
        case Kn.photometricInterpretations.Palette:
            i = [0];
            break;
        case Kn.photometricInterpretations.CMYK:
            i = [0, 1, 2, 3];
            break;
        case Kn.photometricInterpretations.YCbCr:
        case Kn.photometricInterpretations.CIELab:
            i = [0, 1, 2];
            break;
        default: throw new Error("Invalid or unsupported photometric interpretation.");
    } var u = { window: e.window, interleave: !0, samples: i }, h = this.fileDirectory; return this.readRasters(u, function (e) { switch (s) {
        case Kn.photometricInterpretations.WhiteIsZero: return t(Vn.fromWhiteIsZero(e, c, a, o));
        case Kn.photometricInterpretations.BlackIsZero: return t(Vn.fromBlackIsZero(e, c, a, o));
        case Kn.photometricInterpretations.Palette: return t(Vn.fromPalette(e, h.ColorMap, a, o));
        case Kn.photometricInterpretations.CMYK: return t(Vn.fromCMYK(e, a, o));
        case Kn.photometricInterpretations.YCbCr: return t(Vn.fromYCbCr(e, a, o));
        case Kn.photometricInterpretations.CIELab: return t(Vn.fromCIELab(e, a, o));
    } }, r); }, getTiePoints: function () { if (!this.fileDirectory.ModelTiepoint)
        return []; for (var e = [], t = 0; t < this.fileDirectory.ModelTiepoint.length; t += 6)
        e.push({ i: this.fileDirectory.ModelTiepoint[t], j: this.fileDirectory.ModelTiepoint[t + 1], k: this.fileDirectory.ModelTiepoint[t + 2], x: this.fileDirectory.ModelTiepoint[t + 3], y: this.fileDirectory.ModelTiepoint[t + 4], z: this.fileDirectory.ModelTiepoint[t + 5] }); return e; }, getGDALMetadata: function () { var e = {}; if (!this.fileDirectory.GDAL_METADATA)
        return null; for (var t = this.fileDirectory.GDAL_METADATA, r = Kn.parseXml(t.substring(0, t.length - 1)), n = r.evaluate("GDALMetadata/Item", r, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null), i = 0; i < n.snapshotLength; ++i) {
        var a = n.snapshotItem(i);
        e[a.getAttribute("name")] = a.textContent;
    } return e; }, getOrigin: function () { var e = this.fileDirectory.ModelTiepoint; if (!e || 6 !== e.length)
        throw new Error("The image does not have an affine transformation."); return [e[3], e[4], e[5]]; }, getResolution: function () { if (!this.fileDirectory.ModelPixelScale)
        throw new Error("The image does not have an affine transformation."); return [this.fileDirectory.ModelPixelScale[0], this.fileDirectory.ModelPixelScale[1], this.fileDirectory.ModelPixelScale[2]]; }, pixelIsArea: function () { return 1 === this.geoKeys.GTRasterTypeGeoKey; }, getBoundingBox: function () { var e = this.getOrigin(), t = this.getResolution(), r = e[0], n = e[1], i = r + t[0] * this.getWidth(), a = n + t[1] * this.getHeight(); return [Math.min(r, i), Math.min(n, a), Math.max(r, i), Math.max(n, a)]; } }; var qn = $n, Qn = Object.freeze({ default: qn, __moduleExports: qn }), Jn = function () { function e(e, t) { for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
} } return function (t, r, n) { return r && e(t.prototype, r), n && e(t, n), t; }; }(), ei = function () { function e(t) { !function (t, r) { if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function"); }(this), this._dataView = new DataView(t); } return Jn(e, [{ key: "getUint64", value: function (e, t) { var r = this.getUint32(e, t), n = this.getUint32(e + 4, t); return t ? r << 32 | n : n << 32 | r; } }, { key: "getInt64", value: function (e, t) { var r; return t ? (r = this.getInt32(e, t)) << 32 | this.getUint32(e + 4, t) : (r = this.getUint32(e, t), this.getInt32(e + 4, t) << 32 | r); } }, { key: "getUint8", value: function (e, t) { return this._dataView.getUint8(e, t); } }, { key: "getInt8", value: function (e, t) { return this._dataView.getInt8(e, t); } }, { key: "getUint16", value: function (e, t) { return this._dataView.getUint16(e, t); } }, { key: "getInt16", value: function (e, t) { return this._dataView.getInt16(e, t); } }, { key: "getUint32", value: function (e, t) { return this._dataView.getUint32(e, t); } }, { key: "getInt32", value: function (e, t) { return this._dataView.getInt32(e, t); } }, { key: "getFloat32", value: function (e, t) { return this._dataView.getFloat32(e, t); } }, { key: "getFloat64", value: function (e, t) { return this._dataView.getFloat64(e, t); } }, { key: "buffer", get: function () { return this._dataView.buffer; } }]), e; }(), ti = Object.freeze({ default: ei, __moduleExports: ei }), ri = Qn && qn || Qn, ni = ti && ei || ti, ii = Kn.fieldTypes, ai = Kn.fieldTagNames, oi = Kn.arrayFields, si = Kn.geoKeyNames; function li(e, t) { this.dataView = new ni(e), t = t || {}, this.cache = t.cache || !1; var r = this.dataView.getUint16(0, 0); if (18761 === r)
    this.littleEndian = !0;
else {
    if (19789 !== r)
        throw new TypeError("Invalid byte order value.");
    this.littleEndian = !1;
} var n = this.dataView.getUint16(2, this.littleEndian); if (42 === this.dataView.getUint16(2, this.littleEndian))
    this.bigTiff = !1;
else {
    if (43 !== n)
        throw new TypeError("Invalid magic number.");
    if (this.bigTiff = !0, 8 !== this.dataView.getUint16(4, this.littleEndian))
        throw new Error("Unsupported offset byte-size.");
} this.fileDirectories = this.parseFileDirectories(this.getOffset(this.bigTiff ? 8 : 4)); } li.prototype = { getOffset: function (e) { return this.bigTiff ? this.dataView.getUint64(e, this.littleEndian) : this.dataView.getUint32(e, this.littleEndian); }, getFieldTypeLength: function (e) { switch (e) {
        case ii.BYTE:
        case ii.ASCII:
        case ii.SBYTE:
        case ii.UNDEFINED: return 1;
        case ii.SHORT:
        case ii.SSHORT: return 2;
        case ii.LONG:
        case ii.SLONG:
        case ii.FLOAT: return 4;
        case ii.RATIONAL:
        case ii.SRATIONAL:
        case ii.DOUBLE:
        case ii.LONG8:
        case ii.SLONG8:
        case ii.IFD8: return 8;
        default: throw new RangeError("Invalid field type: " + e);
    } }, getValues: function (e, t, r) { var n, i = null, a = null, o = this.getFieldTypeLength(e); switch (e) {
        case ii.BYTE:
        case ii.ASCII:
        case ii.UNDEFINED:
            i = new Uint8Array(t), a = this.dataView.getUint8;
            break;
        case ii.SBYTE:
            i = new Int8Array(t), a = this.dataView.getInt8;
            break;
        case ii.SHORT:
            i = new Uint16Array(t), a = this.dataView.getUint16;
            break;
        case ii.SSHORT:
            i = new Int16Array(t), a = this.dataView.getInt16;
            break;
        case ii.LONG:
            i = new Uint32Array(t), a = this.dataView.getUint32;
            break;
        case ii.SLONG:
            i = new Int32Array(t), a = this.dataView.getInt32;
            break;
        case ii.LONG8:
        case ii.IFD8:
            i = new Array(t), a = this.dataView.getUint64;
            break;
        case ii.SLONG8:
            i = new Array(t), a = this.dataView.getInt64;
            break;
        case ii.RATIONAL:
            i = new Uint32Array(2 * t), a = this.dataView.getUint32;
            break;
        case ii.SRATIONAL:
            i = new Int32Array(2 * t), a = this.dataView.getInt32;
            break;
        case ii.FLOAT:
            i = new Float32Array(t), a = this.dataView.getFloat32;
            break;
        case ii.DOUBLE:
            i = new Float64Array(t), a = this.dataView.getFloat64;
            break;
        default: throw new RangeError("Invalid field type: " + e);
    } if (e !== ii.RATIONAL && e !== ii.SRATIONAL)
        for (n = 0; n < t; ++n)
            i[n] = a.call(this.dataView, r + n * o, this.littleEndian);
    else
        for (n = 0; n < t; n += 2)
            i[n] = a.call(this.dataView, r + n * o, this.littleEndian), i[n + 1] = a.call(this.dataView, r + (n * o + 4), this.littleEndian); return e === ii.ASCII ? String.fromCharCode.apply(null, i) : i; }, getFieldValues: function (e, t, r, n) { var i; if (this.getFieldTypeLength(t) * r <= (this.bigTiff ? 8 : 4))
        i = this.getValues(t, r, n);
    else {
        var a = this.getOffset(n);
        i = this.getValues(t, r, a);
    } return 1 === r && -1 === oi.indexOf(e) && t !== ii.RATIONAL && t !== ii.SRATIONAL ? i[0] : i; }, parseGeoKeyDirectory: function (e) { var t = e.GeoKeyDirectory; if (!t)
        return null; for (var r = {}, n = 4; n < 4 * t[3]; n += 4) {
        var i = si[t[n]], a = t[n + 1] ? ai[t[n + 1]] : null, o = t[n + 2], s = t[n + 3], l = null;
        if (a) {
            if (void 0 === (l = e[a]) || null === l)
                throw new Error("Could not get value of geoKey '" + i + "'.");
            "string" == typeof l ? l = l.substring(s, s + o - 1) : l.subarray && (l = l.subarray(s, s + o - 1));
        }
        else
            l = s;
        r[i] = l;
    } return r; }, parseFileDirectories: function (e) { for (var t = e, r = []; 0 !== t;) {
        for (var n = this.bigTiff ? this.dataView.getUint64(t, this.littleEndian) : this.dataView.getUint16(t, this.littleEndian), i = {}, a = t + (this.bigTiff ? 8 : 2), o = 0; o < n; a += this.bigTiff ? 20 : 12, ++o) {
            var s = this.dataView.getUint16(a, this.littleEndian), l = this.dataView.getUint16(a + 2, this.littleEndian), c = this.bigTiff ? this.dataView.getUint64(a + 4, this.littleEndian) : this.dataView.getUint32(a + 4, this.littleEndian);
            i[ai[s]] = this.getFieldValues(s, l, c, a + (this.bigTiff ? 12 : 8));
        }
        r.push([i, this.parseGeoKeyDirectory(i)]), t = this.getOffset(a);
    } return r; }, getImage: function (e) { e = e || 0; var t = this.fileDirectories[e]; if (!t)
        throw new RangeError("Invalid image index"); return new ri(t[0], t[1], this.dataView, this.littleEndian, this.cache); }, getImageCount: function () { return this.fileDirectories.length; } }; var ci = li, ui = Object.freeze({ default: ci, __moduleExports: ci }), hi = ui && ci || ui, fi = t.createCommonjsModule(function (e) { var t = function (e, t) { var r, n, i, a; if ("string" == typeof e || e instanceof String)
    for (r = new ArrayBuffer(2 * e.length), a = new Uint16Array(r), n = 0, i = e.length; n < i; ++n)
        a[n] = e.charCodeAt(n);
else {
    if (!(e instanceof ArrayBuffer))
        throw new Error("Invalid input data given.");
    r = e;
} return new hi(r, t); }; e.exports.parse = t, "undefined" != typeof window && (window.GeoTIFF = { parse: t }); }).parse; var di = "Basic Z3J1cG8yMDE4QTpncjE4QXh6"; function pi(e) { try {
    return JSON.parse(localStorage.getItem(e));
}
catch (e) {
    return;
} } e.getSetting = pi, e.setSetting = function (e, t) { localStorage.setItem(e, JSON.stringify(t)); }, e.getCurrentCoord = function (e, t) {
    return __awaiter(this, void 0, void 0, function () { var r, e_1; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!("geolocation" in navigator))
                    throw new Error("geolocation not available");
                r = new Promise(function (r) { navigator.geolocation.getCurrentPosition(function (n) { r({ lat: n.coords.latitude, log: n.coords.longitude, angle: e, resolution: t }); }); });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, r];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                e_1 = _a.sent();
                return [2 /*return*/, { angle: .1, lat: 41.662351099999995, log: -4.7061376, resolution: 2 }];
            case 4: return [2 /*return*/];
        }
    }); });
}, e.calculateCoverage = function (e, t, r) {
    return __awaiter(this, void 0, void 0, function () { var n, i, a, e_2; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(e.map(function (e) { return (function (e, t) {
                    return __awaiter(this, void 0, void 0, function () { var r, n; return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(e.url, { method: "POST", body: function (e, t, r) {
                                        if (r === void 0) { r = "EPSG:4326"; }
                                        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n  <GetCoverage version=\"1.0.0\" service=\"WCS\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://www.opengis.net/wcs\" xmlns:ows=\"http://www.opengis.net/ows/1.1\" xmlns:gml=\"http://www.opengis.net/gml\" xmlns:ogc=\"http://www.opengis.net/ogc\" xsi:schemaLocation=\"http://www.opengis.net/wcs http://schemas.opengis.net/wcs/1.0.0/getCoverage.xsd\">\n\n  <sourceCoverage>" + e + "</sourceCoverage>\n\n  <domainSubset>\n    <spatialSubset>\n      <gml:Envelope srsName=\"" + r + "\">\n        <gml:pos>" + (t.log - t.angle) + " " + (t.lat - t.angle) + "</gml:pos>\n        <gml:pos>" + (t.log + t.angle) + " " + (t.lat + t.angle) + "</gml:pos>\n      </gml:Envelope>\n      <gml:Grid dimension=\"2\">\n        <gml:limits>\n          <gml:GridEnvelope>\n            <gml:low>0 0</gml:low>\n            <gml:high>" + t.resolution + " " + t.resolution + "</gml:high>\n          </gml:GridEnvelope>\n        </gml:limits>\n        <gml:axisName>x</gml:axisName>\n        <gml:axisName>y</gml:axisName>\n      </gml:Grid>\n    </spatialSubset>\n  </domainSubset>\n  <output>\n    <crs>" + r + "</crs>\n    <format>GeoTIFF</format>\n  </output>\n</GetCoverage>";
                                    }(e.coverage, t) })];
                            case 1:
                                r = _a.sent();
                                return [4 /*yield*/, r.arrayBuffer()];
                            case 2:
                                n = _a.sent();
                                return [2 /*return*/, fi(n)];
                        }
                    }); });
                })(e, t); }))];
            case 1:
                n = (_a.sent()).map(function (e) { var t = e.getImage(), r = t.readRasters()[0], n = t.fileDirectory.GDAL_NODATA; return n ? function (e, t) { for (var r_1 = 0; r_1 < e.length; r_1++)
                    e[r_1] === t && (e[r_1] = 0); return e; }(r, parseFloat(n)) : r; }), i = Math.pow(t.resolution, 2), a = new Float32Array(i);
                for (e_2 = 0; e_2 < i; e_2++)
                    a[e_2] = r.apply(void 0, [e_2].concat(n));
                return [2 /*return*/, a];
        }
    }); });
}, e.getExtends = function (e) { return [e.log - e.angle, e.lat - e.angle, e.log + e.angle, e.lat + e.angle]; }, e.average = function (e) { return e.reduce(function (e, t) { return t + e; }, 0) / e.length; }, e.getUser = function (e, t) { return { username: pi("nombre") || "unknown", deathRate: e, coord: t }; }, e.requestQueryUsers = function (e) {
    return __awaiter(this, void 0, void 0, function () { var t, r, n, i; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t = function (e) { return "<wfs:GetFeature service=\"WFS\" version=\"1.0.0\"\n  xmlns:wfs=\"http://www.opengis.net/wfs\"\n  xmlns:DeathRate=\"http://itastdevserver.tel.uva.es/IDE2018A\"\n  xmlns:gml=\"http://www.opengis.net/gml\"\n  xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n  xmlns:ogc=\"http://www.opengis.net/ogc\"\n  xsi:schemaLocation=\"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd http://itastdevserver.tel.uva.es/IDE2018A https://itastdevserver.tel.uva.es/geoserver/wfs/DescribeFeatureType?typename=ide2018a:table_history\">\n    <wfs:Query typeName=\"ide2018a:table_history\">\n      <ogc:Filter>\n        <ogc:PropertyIsEqualTo>\n          <ogc:PropertyName>ide2018a:username</ogc:PropertyName>\n          <ogc:Literal>" + e.username + "</ogc:Literal>\n        </ogc:PropertyIsEqualTo>\n      </ogc:Filter>\n    </wfs:Query>\n  </wfs:GetFeature>\n  "; }(e);
                return [4 /*yield*/, fetch("/geoserver/ide2018a/ows", { method: "POST", body: t, headers: new Headers({ Authorization: di }) })];
            case 1:
                r = _a.sent();
                return [4 /*yield*/, r.text()];
            case 2:
                n = _a.sent(), i = (new DOMParser).parseFromString(n, "text/xml");
                return [2 /*return*/, Array.from(i.querySelectorAll("featureMember")).map(function (e) { var _a = e.querySelector("position coordinates").textContent.split(","), t = _a[0], r = _a[1]; return { username: e.querySelector("username").textContent, deathRate: parseFloat(e.querySelector("deathRate").textContent), coord: { lat: parseFloat(r), log: parseFloat(t), angle: .1, resolution: 2 } }; })];
        }
    }); });
}, e.requestCoordForName = function (e) {
    return __awaiter(this, void 0, void 0, function () { var t, r; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://nominatim.openstreetmap.org/search/" + e + "?format=json&addressdetails=1&limit=1")];
            case 1:
                t = _a.sent();
                return [4 /*yield*/, t.json()];
            case 2:
                r = _a.sent();
                if (r.length > 0)
                    return [2 /*return*/, r[0]];
                return [2 /*return*/];
        }
    }); });
}, e.requestInsertUser = function (e) {
    return __awaiter(this, void 0, void 0, function () { var t; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t = function (e) { return "\n  <wfs:Transaction service=\"WFS\" version=\"1.0.0\"\n  xmlns:wfs=\"http://www.opengis.net/wfs\"\n  xmlns:DeathRate=\"http://itastdevserver.tel.uva.es/IDE2018A\"\n  xmlns:gml=\"http://www.opengis.net/gml\"\n  xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n  xsi:schemaLocation=\"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd http://itastdevserver.tel.uva.es/IDE2018A https://itastdevserver.tel.uva.es/geoserver/wfs/DescribeFeatureType?typename=ide2018a:table_history\">\n  <wfs:Insert>\n    <DeathRate:table_history>\n      <DeathRate:position>\n          <gml:Point><gml:coordinates>" + e.coord.log + "," + e.coord.lat + "</gml:coordinates></gml:Point>\n      </DeathRate:position>\n      <DeathRate:username>" + e.username + "</DeathRate:username>\n   \t  <DeathRate:deathRate>" + e.deathRate + "</DeathRate:deathRate>\n   \t  <DeathRate:date>2018-12-12</DeathRate:date>\n    </DeathRate:table_history>\n  </wfs:Insert>\n</wfs:Transaction>"; }(e);
                return [4 /*yield*/, fetch("/geoserver/ide2018a/ows", { method: "POST", body: t, headers: new Headers({ Authorization: di }) })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    }); });
}, e.requestAddressForCoord = function (e) {
    return __awaiter(this, void 0, void 0, function () { var t; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://nominatim.openstreetmap.org/reverse.php?format=json&lat=" + e.lat + "&lon=" + e.log + "&zoom=18")];
            case 1:
                t = _a.sent();
                return [4 /*yield*/, t.json()];
            case 2: return [2 /*return*/, (_a.sent()).address];
        }
    }); });
}; });
