/*! Built with http://stenciljs.com */
App.loadBundle("chunk-85279000.js", ["exports", "./chunk-12ee72ee.js"], function (t, e) { window.App.h; var n = { ASSUME_TOUCH: !1, DEFAULT_MAX_ZOOM: 42, DEFAULT_MIN_ZOOM: 0, DEFAULT_RASTER_REPROJECTION_ERROR_THRESHOLD: .5, DEFAULT_TILE_SIZE: 256, DEFAULT_WMS_VERSION: "1.3.0", ENABLE_CANVAS: !0, ENABLE_PROJ4JS: !0, ENABLE_RASTER_REPROJECTION: !0, ENABLE_WEBGL: !0, DEBUG_WEBGL: !0, INITIAL_ATLAS_SIZE: 256, MAX_ATLAS_SIZE: -1, MOUSEWHEELZOOM_MAXDELTA: 1, OVERVIEWMAP_MAX_RATIO: .75, OVERVIEWMAP_MIN_RATIO: .1, RASTER_REPROJECTION_MAX_SOURCE_TILES: 100, RASTER_REPROJECTION_MAX_SUBDIVISION: 10, RASTER_REPROJECTION_MAX_TRIANGLE_WIDTH: .25, SIMPLIFY_TOLERANCE: .5, WEBGL_TEXTURE_CACHE_HIGH_WATER_MARK: 1024, VERSION: "v4.6.5", inherits: function (t, e) { t.prototype = Object.create(e.prototype), t.prototype.constructor = t; }, nullFunction: function () { }, getUid: function (t) { return t.ol_uid || (t.ol_uid = ++n.uidCounter_); }, uidCounter_: 0 }, i = function (t) { var e = n.VERSION ? n.VERSION.split("-")[0] : "latest"; this.message = "Assertion failed. See https://openlayers.org/en/" + e + "/doc/errors/#" + t + " for details.", this.code = t, this.name = "AssertionError"; }; n.inherits(i, Error); var r = { assert: function (t, e) { if (!t)
        throw new i(e); } }, o = {}; o.assign = "function" == typeof Object.assign ? Object.assign : function (t, e) { if (void 0 === t || null === t)
    throw new TypeError("Cannot convert undefined or null to object"); for (var n = Object(t), i = 1, r = arguments.length; i < r; ++i) {
    var o = arguments[i];
    if (void 0 !== o && null !== o)
        for (var s in o)
            o.hasOwnProperty(s) && (n[s] = o[s]);
} return n; }, o.clear = function (t) { for (var e in t)
    delete t[e]; }, o.getValues = function (t) { var e = []; for (var n in t)
    e.push(t[n]); return e; }, o.isEmpty = function (t) { var e; for (e in t)
    return !1; return !e; }; var s = { bindListener_: function (t) { var e = function (e) { var n = t.listener, i = t.bindTo || t.target; return t.callOnce && s.unlistenByKey(t), n.call(i, e); }; return t.boundListener = e, e; }, findListener_: function (t, e, n, i) { for (var r, o = 0, s = t.length; o < s; ++o)
        if ((r = t[o]).listener === e && r.bindTo === n)
            return i && (r.deleteIndex = o), r; }, getListeners: function (t, e) { var n = t.ol_lm; return n ? n[e] : void 0; }, getListenerMap_: function (t) { var e = t.ol_lm; return e || (e = t.ol_lm = {}), e; }, removeListeners_: function (t, e) { var n = s.getListeners(t, e); if (n) {
        for (var i = 0, r = n.length; i < r; ++i)
            t.removeEventListener(e, n[i].boundListener), o.clear(n[i]);
        n.length = 0;
        var a = t.ol_lm;
        a && (delete a[e], 0 === Object.keys(a).length && delete t.ol_lm);
    } }, listen: function (t, e, n, i, r) { var o = s.getListenerMap_(t), a = o[e]; a || (a = o[e] = []); var u = s.findListener_(a, n, i, !1); return u ? r || (u.callOnce = !1) : (u = { bindTo: i, callOnce: !!r, listener: n, target: t, type: e }, t.addEventListener(e, s.bindListener_(u)), a.push(u)), u; }, listenOnce: function (t, e, n, i) { return s.listen(t, e, n, i, !0); }, unlisten: function (t, e, n, i) { var r = s.getListeners(t, e); if (r) {
        var o = s.findListener_(r, n, i, !0);
        o && s.unlistenByKey(o);
    } }, unlistenByKey: function (t) { if (t && t.target) {
        t.target.removeEventListener(t.type, t.boundListener);
        var e = s.getListeners(t.target, t.type);
        if (e) {
            var n = "deleteIndex" in t ? t.deleteIndex : e.indexOf(t);
            -1 !== n && e.splice(n, 1), 0 === e.length && s.removeListeners_(t.target, t.type);
        }
        o.clear(t);
    } }, unlistenAll: function (t) { var e = s.getListenerMap_(t); for (var n in e)
        s.removeListeners_(t, n); } }, a = { CHANGE: "change", CLEAR: "clear", CLICK: "click", DBLCLICK: "dblclick", DRAGENTER: "dragenter", DRAGOVER: "dragover", DROP: "drop", ERROR: "error", KEYDOWN: "keydown", KEYPRESS: "keypress", LOAD: "load", MOUSEDOWN: "mousedown", MOUSEMOVE: "mousemove", MOUSEOUT: "mouseout", MOUSEUP: "mouseup", MOUSEWHEEL: "mousewheel", MSPOINTERDOWN: "MSPointerDown", RESIZE: "resize", TOUCHSTART: "touchstart", TOUCHMOVE: "touchmove", TOUCHEND: "touchend", WHEEL: "wheel" }, u = { PROPERTYCHANGE: "propertychange" }, h = function () { }; h.prototype.disposed_ = !1, h.prototype.dispose = function () { this.disposed_ || (this.disposed_ = !0, this.disposeInternal()); }, h.prototype.disposeInternal = n.nullFunction; var l = function (t) { this.propagationStopped, this.type = t, this.target = null; }; l.prototype.preventDefault = l.prototype.stopPropagation = function () { this.propagationStopped = !0; }, l.stopPropagation = function (t) { t.stopPropagation(); }, l.preventDefault = function (t) { t.preventDefault(); }; var c = function () { h.call(this), this.pendingRemovals_ = {}, this.dispatching_ = {}, this.listeners_ = {}; }; n.inherits(c, h), c.prototype.addEventListener = function (t, e) { var n = this.listeners_[t]; n || (n = this.listeners_[t] = []), -1 === n.indexOf(e) && n.push(e); }, c.prototype.dispatchEvent = function (t) { var e = "string" == typeof t ? new l(t) : t, i = e.type; e.target = this; var r, o = this.listeners_[i]; if (o) {
    i in this.dispatching_ || (this.dispatching_[i] = 0, this.pendingRemovals_[i] = 0), ++this.dispatching_[i];
    for (var s = 0, a = o.length; s < a; ++s)
        if (!1 === o[s].call(this, e) || e.propagationStopped) {
            r = !1;
            break;
        }
    if (--this.dispatching_[i], 0 === this.dispatching_[i]) {
        var u = this.pendingRemovals_[i];
        for (delete this.pendingRemovals_[i]; u--;)
            this.removeEventListener(i, n.nullFunction);
        delete this.dispatching_[i];
    }
    return r;
} }, c.prototype.disposeInternal = function () { s.unlistenAll(this); }, c.prototype.getListeners = function (t) { return this.listeners_[t]; }, c.prototype.hasListener = function (t) { return t ? t in this.listeners_ : Object.keys(this.listeners_).length > 0; }, c.prototype.removeEventListener = function (t, e) { var i = this.listeners_[t]; if (i) {
    var r = i.indexOf(e);
    t in this.pendingRemovals_ ? (i[r] = n.nullFunction, ++this.pendingRemovals_[t]) : (i.splice(r, 1), 0 === i.length && delete this.listeners_[t]);
} }; var f = function () { c.call(this), this.revision_ = 0; }; n.inherits(f, c), f.unByKey = function (t) { if (Array.isArray(t))
    for (var e = 0, n = t.length; e < n; ++e)
        s.unlistenByKey(t[e]);
else
    s.unlistenByKey(t); }, f.prototype.changed = function () { ++this.revision_, this.dispatchEvent(a.CHANGE); }, f.prototype.getRevision = function () { return this.revision_; }, f.prototype.on = function (t, e, n) { if (Array.isArray(t)) {
    for (var i = t.length, r = new Array(i), o = 0; o < i; ++o)
        r[o] = s.listen(this, t[o], e, n);
    return r;
} return s.listen(this, t, e, n); }, f.prototype.once = function (t, e, n) { if (Array.isArray(t)) {
    for (var i = t.length, r = new Array(i), o = 0; o < i; ++o)
        r[o] = s.listenOnce(this, t[o], e, n);
    return r;
} return s.listenOnce(this, t, e, n); }, f.prototype.un = function (t, e, n) { if (Array.isArray(t))
    for (var i = 0, r = t.length; i < r; ++i)
        s.unlisten(this, t[i], e, n);
else
    s.unlisten(this, t, e, n); }; var p = function (t) { f.call(this), n.getUid(this), this.values_ = {}, void 0 !== t && this.setProperties(t); }; n.inherits(p, f), p.changeEventTypeCache_ = {}, p.getChangeEventType = function (t) { return p.changeEventTypeCache_.hasOwnProperty(t) ? p.changeEventTypeCache_[t] : p.changeEventTypeCache_[t] = "change:" + t; }, p.prototype.get = function (t) { var e; return this.values_.hasOwnProperty(t) && (e = this.values_[t]), e; }, p.prototype.getKeys = function () { return Object.keys(this.values_); }, p.prototype.getProperties = function () { return o.assign({}, this.values_); }, p.prototype.notify = function (t, e) { var n; n = p.getChangeEventType(t), this.dispatchEvent(new p.Event(n, t, e)), n = u.PROPERTYCHANGE, this.dispatchEvent(new p.Event(n, t, e)); }, p.prototype.set = function (t, e, n) { if (n)
    this.values_[t] = e;
else {
    var i = this.values_[t];
    this.values_[t] = e, i !== e && this.notify(t, i);
} }, p.prototype.setProperties = function (t, e) { var n; for (n in t)
    this.set(n, t[n], e); }, p.prototype.unset = function (t, e) { if (t in this.values_) {
    var n = this.values_[t];
    delete this.values_[t], e || this.notify(t, n);
} }, p.Event = function (t, e, n) { l.call(this, t), this.key = e, this.oldValue = n; }, n.inherits(p.Event, l); var _ = { UNKNOWN: 0, INTERSECTING: 1, ABOVE: 2, RIGHT: 4, BELOW: 8, LEFT: 16 }, d = { boundingExtent: function (t) { for (var e = d.createEmpty(), n = 0, i = t.length; n < i; ++n)
        d.extendCoordinate(e, t[n]); return e; }, boundingExtentXYs_: function (t, e, n) { var i = Math.min.apply(null, t), r = Math.min.apply(null, e), o = Math.max.apply(null, t), s = Math.max.apply(null, e); return d.createOrUpdate(i, r, o, s, n); }, buffer: function (t, e, n) { return n ? (n[0] = t[0] - e, n[1] = t[1] - e, n[2] = t[2] + e, n[3] = t[3] + e, n) : [t[0] - e, t[1] - e, t[2] + e, t[3] + e]; }, clone: function (t, e) { return e ? (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e) : t.slice(); }, closestSquaredDistanceXY: function (t, e, n) { var i, r; return (i = e < t[0] ? t[0] - e : t[2] < e ? e - t[2] : 0) * i + (r = n < t[1] ? t[1] - n : t[3] < n ? n - t[3] : 0) * r; }, containsCoordinate: function (t, e) { return d.containsXY(t, e[0], e[1]); }, containsExtent: function (t, e) { return t[0] <= e[0] && e[2] <= t[2] && t[1] <= e[1] && e[3] <= t[3]; }, containsXY: function (t, e, n) { return t[0] <= e && e <= t[2] && t[1] <= n && n <= t[3]; }, coordinateRelationship: function (t, e) { var n = t[0], i = t[1], r = t[2], o = t[3], s = e[0], a = e[1], u = _.UNKNOWN; return s < n ? u |= _.LEFT : s > r && (u |= _.RIGHT), a < i ? u |= _.BELOW : a > o && (u |= _.ABOVE), u === _.UNKNOWN && (u = _.INTERSECTING), u; }, createEmpty: function () { return [1 / 0, 1 / 0, -1 / 0, -1 / 0]; }, createOrUpdate: function (t, e, n, i, r) { return r ? (r[0] = t, r[1] = e, r[2] = n, r[3] = i, r) : [t, e, n, i]; }, createOrUpdateEmpty: function (t) { return d.createOrUpdate(1 / 0, 1 / 0, -1 / 0, -1 / 0, t); }, createOrUpdateFromCoordinate: function (t, e) { var n = t[0], i = t[1]; return d.createOrUpdate(n, i, n, i, e); }, createOrUpdateFromCoordinates: function (t, e) { var n = d.createOrUpdateEmpty(e); return d.extendCoordinates(n, t); }, createOrUpdateFromFlatCoordinates: function (t, e, n, i, r) { var o = d.createOrUpdateEmpty(r); return d.extendFlatCoordinates(o, t, e, n, i); }, createOrUpdateFromRings: function (t, e) { var n = d.createOrUpdateEmpty(e); return d.extendRings(n, t); }, equals: function (t, e) { return t[0] == e[0] && t[2] == e[2] && t[1] == e[1] && t[3] == e[3]; }, extend: function (t, e) { return e[0] < t[0] && (t[0] = e[0]), e[2] > t[2] && (t[2] = e[2]), e[1] < t[1] && (t[1] = e[1]), e[3] > t[3] && (t[3] = e[3]), t; }, extendCoordinate: function (t, e) { e[0] < t[0] && (t[0] = e[0]), e[0] > t[2] && (t[2] = e[0]), e[1] < t[1] && (t[1] = e[1]), e[1] > t[3] && (t[3] = e[1]); }, extendCoordinates: function (t, e) { var n, i; for (n = 0, i = e.length; n < i; ++n)
        d.extendCoordinate(t, e[n]); return t; }, extendFlatCoordinates: function (t, e, n, i, r) { for (; n < i; n += r)
        d.extendXY(t, e[n], e[n + 1]); return t; }, extendRings: function (t, e) { var n, i; for (n = 0, i = e.length; n < i; ++n)
        d.extendCoordinates(t, e[n]); return t; }, extendXY: function (t, e, n) { t[0] = Math.min(t[0], e), t[1] = Math.min(t[1], n), t[2] = Math.max(t[2], e), t[3] = Math.max(t[3], n); }, forEachCorner: function (t, e, n) { var i; return (i = e.call(n, d.getBottomLeft(t))) ? i : (i = e.call(n, d.getBottomRight(t))) ? i : (i = e.call(n, d.getTopRight(t))) ? i : (i = e.call(n, d.getTopLeft(t))) || !1; }, getArea: function (t) { var e = 0; return d.isEmpty(t) || (e = d.getWidth(t) * d.getHeight(t)), e; }, getBottomLeft: function (t) { return [t[0], t[1]]; }, getBottomRight: function (t) { return [t[2], t[1]]; }, getCenter: function (t) { return [(t[0] + t[2]) / 2, (t[1] + t[3]) / 2]; }, getCorner: function (t, e) { var n; return "bottom-left" === e ? n = d.getBottomLeft(t) : "bottom-right" === e ? n = d.getBottomRight(t) : "top-left" === e ? n = d.getTopLeft(t) : "top-right" === e ? n = d.getTopRight(t) : r.assert(!1, 13), n; }, getEnlargedArea: function (t, e) { var n = Math.min(t[0], e[0]), i = Math.min(t[1], e[1]); return (Math.max(t[2], e[2]) - n) * (Math.max(t[3], e[3]) - i); }, getForViewAndSize: function (t, e, n, i, r) { var o = e * i[0] / 2, s = e * i[1] / 2, a = Math.cos(n), u = Math.sin(n), h = o * a, l = o * u, c = s * a, f = s * u, p = t[0], _ = t[1], g = p - h + f, m = p - h - f, v = p + h - f, E = p + h + f, y = _ - l - c, T = _ - l + c, S = _ + l + c, x = _ + l - c; return d.createOrUpdate(Math.min(g, m, v, E), Math.min(y, T, S, x), Math.max(g, m, v, E), Math.max(y, T, S, x), r); }, getHeight: function (t) { return t[3] - t[1]; }, getIntersectionArea: function (t, e) { var n = d.getIntersection(t, e); return d.getArea(n); }, getIntersection: function (t, e, n) { var i = n || d.createEmpty(); return d.intersects(t, e) && (t[0] > e[0] ? i[0] = t[0] : i[0] = e[0], t[1] > e[1] ? i[1] = t[1] : i[1] = e[1], t[2] < e[2] ? i[2] = t[2] : i[2] = e[2], t[3] < e[3] ? i[3] = t[3] : i[3] = e[3]), i; }, getMargin: function (t) { return d.getWidth(t) + d.getHeight(t); }, getSize: function (t) { return [t[2] - t[0], t[3] - t[1]]; }, getTopLeft: function (t) { return [t[0], t[3]]; }, getTopRight: function (t) { return [t[2], t[3]]; }, getWidth: function (t) { return t[2] - t[0]; }, intersects: function (t, e) { return t[0] <= e[2] && t[2] >= e[0] && t[1] <= e[3] && t[3] >= e[1]; }, isEmpty: function (t) { return t[2] < t[0] || t[3] < t[1]; }, returnOrUpdate: function (t, e) { return e ? (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e) : t; }, scaleFromCenter: function (t, e) { var n = (t[2] - t[0]) / 2 * (e - 1), i = (t[3] - t[1]) / 2 * (e - 1); t[0] -= n, t[2] += n, t[1] -= i, t[3] += i; }, intersectsSegment: function (t, e, n) { var i = !1, r = d.coordinateRelationship(t, e), o = d.coordinateRelationship(t, n); if (r === _.INTERSECTING || o === _.INTERSECTING)
        i = !0;
    else {
        var s, a, u = t[0], h = t[1], l = t[2], c = t[3], f = e[0], p = e[1], g = n[0], m = n[1], v = (m - p) / (g - f);
        o & _.ABOVE && !(r & _.ABOVE) && (i = (s = g - (m - c) / v) >= u && s <= l), i || !(o & _.RIGHT) || r & _.RIGHT || (i = (a = m - (g - l) * v) >= h && a <= c), i || !(o & _.BELOW) || r & _.BELOW || (i = (s = g - (m - h) / v) >= u && s <= l), i || !(o & _.LEFT) || r & _.LEFT || (i = (a = m - (g - u) * v) >= h && a <= c);
    } return i; }, applyTransform: function (t, e, n) { var i = [t[0], t[1], t[0], t[3], t[2], t[1], t[2], t[3]]; e(i, i, 2); var r = [i[0], i[2], i[4], i[6]], o = [i[1], i[3], i[5], i[7]]; return d.boundingExtentXYs_(r, o, n); } }, g = { TRUE: function () { return !0; }, FALSE: function () { return !1; } }, m = { transform2D: function (t, e, n, i, r, o) { var s, a = o || [], u = 0; for (s = e; s < n; s += i) {
        var h = t[s], l = t[s + 1];
        a[u++] = r[0] * h + r[2] * l + r[4], a[u++] = r[1] * h + r[3] * l + r[5];
    } return o && a.length != u && (a.length = u), a; }, rotate: function (t, e, n, i, r, o, s) { for (var a = s || [], u = Math.cos(r), h = Math.sin(r), l = o[0], c = o[1], f = 0, p = e; p < n; p += i) {
        var _ = t[p] - l, d = t[p + 1] - c;
        a[f++] = l + _ * u - d * h, a[f++] = c + _ * h + d * u;
        for (var g = p + 2; g < p + i; ++g)
            a[f++] = t[g];
    } return s && a.length != f && (a.length = f), a; }, scale: function (t, e, n, i, r, o, s, a) { for (var u = a || [], h = s[0], l = s[1], c = 0, f = e; f < n; f += i) {
        var p = t[f] - h, _ = t[f + 1] - l;
        u[c++] = h + r * p, u[c++] = l + o * _;
        for (var d = f + 2; d < f + i; ++d)
            u[c++] = t[d];
    } return a && u.length != c && (u.length = c), u; }, translate: function (t, e, n, i, r, o, s) { var a, u, h = s || [], l = 0; for (a = e; a < n; a += i)
        for (h[l++] = t[a] + r, h[l++] = t[a + 1] + o, u = a + 2; u < a + i; ++u)
            h[l++] = t[u]; return s && h.length != l && (h.length = l), h; } }, v = { clamp: function (t, e, n) { return Math.min(Math.max(t, e), n); } }; v.cosh = "cosh" in Math ? Math.cosh : function (t) { var e = Math.exp(t); return (e + 1 / e) / 2; }, v.roundUpToPowerOfTwo = function (t) { return r.assert(0 < t, 29), Math.pow(2, Math.ceil(Math.log(t) / Math.LN2)); }, v.squaredSegmentDistance = function (t, e, n, i, r, o) { var s = r - n, a = o - i; if (0 !== s || 0 !== a) {
    var u = ((t - n) * s + (e - i) * a) / (s * s + a * a);
    u > 1 ? (n = r, i = o) : u > 0 && (n += s * u, i += a * u);
} return v.squaredDistance(t, e, n, i); }, v.squaredDistance = function (t, e, n, i) { var r = n - t, o = i - e; return r * r + o * o; }, v.solveLinearSystem = function (t) { for (var e = t.length, n = 0; n < e; n++) {
    for (var i = n, r = Math.abs(t[n][n]), o = n + 1; o < e; o++) {
        var s = Math.abs(t[o][n]);
        s > r && (r = s, i = o);
    }
    if (0 === r)
        return null;
    var a = t[i];
    t[i] = t[n], t[n] = a;
    for (var u = n + 1; u < e; u++)
        for (var h = -t[u][n] / t[n][n], l = n; l < e + 1; l++)
            n == l ? t[u][l] = 0 : t[u][l] += h * t[n][l];
} for (var c = new Array(e), f = e - 1; f >= 0; f--) {
    c[f] = t[f][e] / t[f][f];
    for (var p = f - 1; p >= 0; p--)
        t[p][e] -= t[p][f] * c[f];
} return c; }, v.toDegrees = function (t) { return 180 * t / Math.PI; }, v.toRadians = function (t) { return t * Math.PI / 180; }, v.modulo = function (t, e) { var n = t % e; return n * e < 0 ? n + e : n; }, v.lerp = function (t, e, n) { return t + n * (e - t); }; var E = { POINT: "Point", LINE_STRING: "LineString", LINEAR_RING: "LinearRing", POLYGON: "Polygon", MULTI_POINT: "MultiPoint", MULTI_LINE_STRING: "MultiLineString", MULTI_POLYGON: "MultiPolygon", GEOMETRY_COLLECTION: "GeometryCollection", CIRCLE: "Circle" }, y = function (t) { this.radius = t; }; y.prototype.geodesicArea = function (t) { return y.getArea_(t, this.radius); }, y.prototype.haversineDistance = function (t, e) { return y.getDistance_(t, e, this.radius); }, y.prototype.offset = function (t, e, n) { var i = v.toRadians(t[1]), r = v.toRadians(t[0]), o = e / this.radius, s = Math.asin(Math.sin(i) * Math.cos(o) + Math.cos(i) * Math.sin(o) * Math.cos(n)), a = r + Math.atan2(Math.sin(n) * Math.sin(o) * Math.cos(i), Math.cos(o) - Math.sin(i) * Math.sin(s)); return [v.toDegrees(a), v.toDegrees(s)]; }, y.DEFAULT_RADIUS = 6371008.8, y.getLength = function (t, e) { var n, i, r, o, s, a, u = e || {}, h = u.radius || y.DEFAULT_RADIUS, l = u.projection || "EPSG:3857", c = (t = t.clone().transform(l, "EPSG:4326")).getType(), f = 0; switch (c) {
    case E.POINT:
    case E.MULTI_POINT: break;
    case E.LINE_STRING:
    case E.LINEAR_RING:
        n = t.getCoordinates(), f = y.getLength_(n, h);
        break;
    case E.MULTI_LINE_STRING:
    case E.POLYGON:
        for (r = 0, o = (n = t.getCoordinates()).length; r < o; ++r)
            f += y.getLength_(n[r], h);
        break;
    case E.MULTI_POLYGON:
        for (r = 0, o = (n = t.getCoordinates()).length; r < o; ++r)
            for (s = 0, a = (i = n[r]).length; s < a; ++s)
                f += y.getLength_(i[s], h);
        break;
    case E.GEOMETRY_COLLECTION:
        var p = t.getGeometries();
        for (r = 0, o = p.length; r < o; ++r)
            f += y.getLength(p[r], e);
        break;
    default: throw new Error("Unsupported geometry type: " + c);
} return f; }, y.getLength_ = function (t, e) { for (var n = 0, i = 0, r = t.length; i < r - 1; ++i)
    n += y.getDistance_(t[i], t[i + 1], e); return n; }, y.getDistance_ = function (t, e, n) { var i = v.toRadians(t[1]), r = v.toRadians(e[1]), o = (r - i) / 2, s = v.toRadians(e[0] - t[0]) / 2, a = Math.sin(o) * Math.sin(o) + Math.sin(s) * Math.sin(s) * Math.cos(i) * Math.cos(r); return 2 * n * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); }, y.getArea = function (t, e) { var n, i, r, o, s, a, u = e || {}, h = u.radius || y.DEFAULT_RADIUS, l = u.projection || "EPSG:3857", c = (t = t.clone().transform(l, "EPSG:4326")).getType(), f = 0; switch (c) {
    case E.POINT:
    case E.MULTI_POINT:
    case E.LINE_STRING:
    case E.MULTI_LINE_STRING:
    case E.LINEAR_RING: break;
    case E.POLYGON:
        for (n = t.getCoordinates(), f = Math.abs(y.getArea_(n[0], h)), r = 1, o = n.length; r < o; ++r)
            f -= Math.abs(y.getArea_(n[r], h));
        break;
    case E.MULTI_POLYGON:
        for (r = 0, o = (n = t.getCoordinates()).length; r < o; ++r)
            for (i = n[r], f += Math.abs(y.getArea_(i[0], h)), s = 1, a = i.length; s < a; ++s)
                f -= Math.abs(y.getArea_(i[s], h));
        break;
    case E.GEOMETRY_COLLECTION:
        var p = t.getGeometries();
        for (r = 0, o = p.length; r < o; ++r)
            f += y.getArea(p[r], e);
        break;
    default: throw new Error("Unsupported geometry type: " + c);
} return f; }, y.getArea_ = function (t, e) { for (var n = 0, i = t.length, r = t[i - 1][0], o = t[i - 1][1], s = 0; s < i; s++) {
    var a = t[s][0], u = t[s][1];
    n += v.toRadians(a - r) * (2 + Math.sin(v.toRadians(o)) + Math.sin(v.toRadians(u))), r = a, o = u;
} return n * e * e / 2; }; var T = { DEGREES: "degrees", FEET: "ft", METERS: "m", PIXELS: "pixels", TILE_PIXELS: "tile-pixels", USFEET: "us-ft", METERS_PER_UNIT: {} }; T.METERS_PER_UNIT[T.DEGREES] = 2 * Math.PI * 6370997 / 360, T.METERS_PER_UNIT[T.FEET] = .3048, T.METERS_PER_UNIT[T.METERS] = 1, T.METERS_PER_UNIT[T.USFEET] = 1200 / 3937; var S = { cache_: null, set: function (t) { S.cache_ = t; }, get: function () { return S.cache_ || window.proj4; } }, x = function (t) { this.code_ = t.code, this.units_ = t.units, this.extent_ = void 0 !== t.extent ? t.extent : null, this.worldExtent_ = void 0 !== t.worldExtent ? t.worldExtent : null, this.axisOrientation_ = void 0 !== t.axisOrientation ? t.axisOrientation : "enu", this.global_ = void 0 !== t.global && t.global, this.canWrapX_ = !(!this.global_ || !this.extent_), this.getPointResolutionFunc_ = t.getPointResolution, this.defaultTileGrid_ = null, this.metersPerUnit_ = t.metersPerUnit; var e = t.code; if (n.ENABLE_PROJ4JS) {
    var i = S.get();
    if ("function" == typeof i) {
        var r = i.defs(e);
        void 0 !== r && (void 0 !== r.axis && void 0 === t.axisOrientation && (this.axisOrientation_ = r.axis), void 0 === t.metersPerUnit && (this.metersPerUnit_ = r.to_meter), void 0 === t.units && (this.units_ = r.units));
    }
} }; x.prototype.canWrapX = function () { return this.canWrapX_; }, x.prototype.getCode = function () { return this.code_; }, x.prototype.getExtent = function () { return this.extent_; }, x.prototype.getUnits = function () { return this.units_; }, x.prototype.getMetersPerUnit = function () { return this.metersPerUnit_ || T.METERS_PER_UNIT[this.units_]; }, x.prototype.getWorldExtent = function () { return this.worldExtent_; }, x.prototype.getAxisOrientation = function () { return this.axisOrientation_; }, x.prototype.isGlobal = function () { return this.global_; }, x.prototype.setGlobal = function (t) { this.global_ = t, this.canWrapX_ = !(!t || !this.extent_); }, x.prototype.getDefaultTileGrid = function () { return this.defaultTileGrid_; }, x.prototype.setDefaultTileGrid = function (t) { this.defaultTileGrid_ = t; }, x.prototype.setExtent = function (t) { this.extent_ = t, this.canWrapX_ = !(!this.global_ || !t); }, x.prototype.setWorldExtent = function (t) { this.worldExtent_ = t; }, x.prototype.setGetPointResolution = function (t) { this.getPointResolutionFunc_ = t; }, x.prototype.getPointResolutionFunc = function () { return this.getPointResolutionFunc_; }; var R = { Projection_: function (t) { x.call(this, { code: t, units: T.METERS, extent: R.EXTENT, global: !0, worldExtent: R.WORLD_EXTENT, getPointResolution: function (t, e) { return t / v.cosh(e[1] / R.RADIUS); } }); } }; n.inherits(R.Projection_, x), R.RADIUS = 6378137, R.HALF_SIZE = Math.PI * R.RADIUS, R.EXTENT = [-R.HALF_SIZE, -R.HALF_SIZE, R.HALF_SIZE, R.HALF_SIZE], R.WORLD_EXTENT = [-180, -85, 180, 85], R.PROJECTIONS = [new R.Projection_("EPSG:3857"), new R.Projection_("EPSG:102100"), new R.Projection_("EPSG:102113"), new R.Projection_("EPSG:900913"), new R.Projection_("urn:ogc:def:crs:EPSG:6.18:3:3857"), new R.Projection_("urn:ogc:def:crs:EPSG::3857"), new R.Projection_("http://www.opengis.net/gml/srs/epsg.xml#3857")], R.fromEPSG4326 = function (t, e, n) { var i = t.length, r = n > 1 ? n : 2, o = e; void 0 === o && (o = r > 2 ? t.slice() : new Array(i)); for (var s = R.HALF_SIZE, a = 0; a < i; a += r) {
    o[a] = s * t[a] / 180;
    var u = R.RADIUS * Math.log(Math.tan(Math.PI * (t[a + 1] + 90) / 360));
    u > s ? u = s : u < -s && (u = -s), o[a + 1] = u;
} return o; }, R.toEPSG4326 = function (t, e, n) { var i = t.length, r = n > 1 ? n : 2, o = e; void 0 === o && (o = r > 2 ? t.slice() : new Array(i)); for (var s = 0; s < i; s += r)
    o[s] = 180 * t[s] / R.HALF_SIZE, o[s + 1] = 360 * Math.atan(Math.exp(t[s + 1] / R.RADIUS)) / Math.PI - 90; return o; }; var C = { Projection_: function (t, e) { x.call(this, { code: t, units: T.DEGREES, extent: C.EXTENT, axisOrientation: e, global: !0, metersPerUnit: C.METERS_PER_UNIT, worldExtent: C.EXTENT }); } }; n.inherits(C.Projection_, x), C.RADIUS = 6378137, C.EXTENT = [-180, -90, 180, 90], C.METERS_PER_UNIT = Math.PI * C.RADIUS / 180, C.PROJECTIONS = [new C.Projection_("CRS:84"), new C.Projection_("EPSG:4326", "neu"), new C.Projection_("urn:ogc:def:crs:EPSG::4326", "neu"), new C.Projection_("urn:ogc:def:crs:EPSG:6.6:4326", "neu"), new C.Projection_("urn:ogc:def:crs:OGC:1.3:CRS84"), new C.Projection_("urn:ogc:def:crs:OGC:2:84"), new C.Projection_("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"), new C.Projection_("urn:x-ogc:def:crs:EPSG:4326", "neu")]; var M = { cache_: {}, clear: function () { M.cache_ = {}; }, get: function (t) { return M.cache_[t] || null; }, add: function (t, e) { M.cache_[t] = e; } }, A = { cache_: {}, clear: function () { A.cache_ = {}; }, add: function (t, e, n) { var i = t.getCode(), r = e.getCode(), o = A.cache_; i in o || (o[i] = {}), o[i][r] = n; }, remove: function (t, e) { var n = t.getCode(), i = e.getCode(), r = A.cache_, s = r[n][i]; return delete r[n][i], o.isEmpty(r[n]) && delete r[n], s; }, get: function (t, e) { var n, i = A.cache_; return t in i && e in i[t] && (n = i[t][e]), n; } }, L = {}; L.METERS_PER_UNIT = T.METERS_PER_UNIT, L.SPHERE_ = new y(y.DEFAULT_RADIUS), n.ENABLE_PROJ4JS && (L.setProj4 = function (t) { S.set(t); }), L.getPointResolution = function (t, e, n, i) { var r, o = (t = L.get(t)).getPointResolutionFunc(); if (o)
    r = o(e, n);
else if (t.getUnits() == T.DEGREES && !i || i == T.DEGREES)
    r = e;
else {
    var s = L.getTransformFromProjections(t, L.get("EPSG:4326")), a = [n[0] - e / 2, n[1], n[0] + e / 2, n[1], n[0], n[1] - e / 2, n[0], n[1] + e / 2];
    a = s(a, a, 2), r = (L.SPHERE_.haversineDistance(a.slice(0, 2), a.slice(2, 4)) + L.SPHERE_.haversineDistance(a.slice(4, 6), a.slice(6, 8))) / 2;
    var u = i ? T.METERS_PER_UNIT[i] : t.getMetersPerUnit();
    void 0 !== u && (r /= u);
} return r; }, L.addEquivalentProjections = function (t) { L.addProjections(t), t.forEach(function (e) { t.forEach(function (t) { e !== t && A.add(e, t, L.cloneTransform); }); }); }, L.addEquivalentTransforms = function (t, e, n, i) { t.forEach(function (t) { e.forEach(function (e) { A.add(t, e, n), A.add(e, t, i); }); }); }, L.addProjection = function (t) { M.add(t.getCode(), t), A.add(t, t, L.cloneTransform); }, L.addProjections = function (t) { t.forEach(L.addProjection); }, L.clearAllProjections = function () { M.clear(), A.clear(); }, L.createProjection = function (t, e) { return t ? "string" == typeof t ? L.get(t) : t : L.get(e); }, L.addCoordinateTransforms = function (t, e, n, i) { var r = L.get(t), o = L.get(e); A.add(r, o, L.createTransformFromCoordinateTransform(n)), A.add(o, r, L.createTransformFromCoordinateTransform(i)); }, L.createTransformFromCoordinateTransform = function (t) { return function (e, n, i) { var r, o, s, a = e.length, u = void 0 !== i ? i : 2, h = void 0 !== n ? n : new Array(a); for (o = 0; o < a; o += u)
    for (r = t([e[o], e[o + 1]]), h[o] = r[0], h[o + 1] = r[1], s = u - 1; s >= 2; --s)
        h[o + s] = e[o + s]; return h; }; }, L.fromLonLat = function (t, e) { return L.transform(t, "EPSG:4326", void 0 !== e ? e : "EPSG:3857"); }, L.toLonLat = function (t, e) { var n = L.transform(t, void 0 !== e ? e : "EPSG:3857", "EPSG:4326"), i = n[0]; return (i < -180 || i > 180) && (n[0] = v.modulo(i + 180, 360) - 180), n; }, L.get = function (t) { var e = null; if (t instanceof x)
    e = t;
else if ("string" == typeof t) {
    var i = t;
    if (e = M.get(i), n.ENABLE_PROJ4JS && !e) {
        var r = S.get();
        "function" == typeof r && void 0 !== r.defs(i) && (e = new x({ code: i }), L.addProjection(e));
    }
} return e; }, L.equivalent = function (t, e) { if (t === e)
    return !0; var n = t.getUnits() === e.getUnits(); return t.getCode() === e.getCode() ? n : L.getTransformFromProjections(t, e) === L.cloneTransform && n; }, L.getTransform = function (t, e) { var n = L.get(t), i = L.get(e); return L.getTransformFromProjections(n, i); }, L.getTransformFromProjections = function (t, e) { var i = t.getCode(), r = e.getCode(), o = A.get(i, r); if (n.ENABLE_PROJ4JS && !o) {
    var s = S.get();
    if ("function" == typeof s) {
        var a = s.defs(i), u = s.defs(r);
        if (void 0 !== a && void 0 !== u) {
            if (a === u)
                L.addEquivalentProjections([e, t]);
            else {
                var h = s(r, i);
                L.addCoordinateTransforms(e, t, h.forward, h.inverse);
            }
            o = A.get(i, r);
        }
    }
} return o || (o = L.identityTransform), o; }, L.identityTransform = function (t, e, n) { if (void 0 !== e && t !== e) {
    for (var i = 0, r = t.length; i < r; ++i)
        e[i] = t[i];
    t = e;
} return t; }, L.cloneTransform = function (t, e, n) { var i; if (void 0 !== e) {
    for (var r = 0, o = t.length; r < o; ++r)
        e[r] = t[r];
    i = e;
}
else
    i = t.slice(); return i; }, L.transform = function (t, e, n) { return L.getTransform(e, n)(t, void 0, t.length); }, L.transformExtent = function (t, e, n) { var i = L.getTransform(e, n); return d.applyTransform(t, i); }, L.transformWithProjections = function (t, e, n) { return L.getTransformFromProjections(e, n)(t); }, L.addCommon = function () { L.addEquivalentProjections(R.PROJECTIONS), L.addEquivalentProjections(C.PROJECTIONS), L.addEquivalentTransforms(C.PROJECTIONS, R.PROJECTIONS, R.fromEPSG4326, R.toEPSG4326); }, L.addCommon(); var O = {}; O.tmp_ = new Array(6), O.create = function () { return [1, 0, 0, 1, 0, 0]; }, O.reset = function (t) { return O.set(t, 1, 0, 0, 1, 0, 0); }, O.multiply = function (t, e) { var n = t[0], i = t[1], r = t[2], o = t[3], s = t[4], a = t[5], u = e[0], h = e[1], l = e[2], c = e[3], f = e[4], p = e[5]; return t[0] = n * u + r * h, t[1] = i * u + o * h, t[2] = n * l + r * c, t[3] = i * l + o * c, t[4] = n * f + r * p + s, t[5] = i * f + o * p + a, t; }, O.set = function (t, e, n, i, r, o, s) { return t[0] = e, t[1] = n, t[2] = i, t[3] = r, t[4] = o, t[5] = s, t; }, O.setFromArray = function (t, e) { return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t; }, O.apply = function (t, e) { var n = e[0], i = e[1]; return e[0] = t[0] * n + t[2] * i + t[4], e[1] = t[1] * n + t[3] * i + t[5], e; }, O.rotate = function (t, e) { var n = Math.cos(e), i = Math.sin(e); return O.multiply(t, O.set(O.tmp_, n, i, -i, n, 0, 0)); }, O.scale = function (t, e, n) { return O.multiply(t, O.set(O.tmp_, e, 0, 0, n, 0, 0)); }, O.translate = function (t, e, n) { return O.multiply(t, O.set(O.tmp_, 1, 0, 0, 1, e, n)); }, O.compose = function (t, e, n, i, r, o, s, a) { var u = Math.sin(o), h = Math.cos(o); return t[0] = i * h, t[1] = r * u, t[2] = -i * u, t[3] = r * h, t[4] = s * i * h - a * i * u + e, t[5] = s * r * u + a * r * h + n, t; }, O.invert = function (t) { var e = O.determinant(t); r.assert(0 !== e, 32); var n = t[0], i = t[1], o = t[2], s = t[3], a = t[4], u = t[5]; return t[0] = s / e, t[1] = -i / e, t[2] = -o / e, t[3] = n / e, t[4] = (o * u - s * a) / e, t[5] = -(n * u - i * a) / e, t; }, O.determinant = function (t) { return t[0] * t[3] - t[1] * t[2]; }; var I = function () { p.call(this), this.extent_ = d.createEmpty(), this.extentRevision_ = -1, this.simplifiedGeometryCache = {}, this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = 0, this.tmpTransform_ = O.create(); }; n.inherits(I, p), I.prototype.clone = function () { }, I.prototype.closestPointXY = function (t, e, n, i) { }, I.prototype.getClosestPoint = function (t, e) { var n = e || [NaN, NaN]; return this.closestPointXY(t[0], t[1], n, 1 / 0), n; }, I.prototype.intersectsCoordinate = function (t) { return this.containsXY(t[0], t[1]); }, I.prototype.computeExtent = function (t) { }, I.prototype.containsXY = g.FALSE, I.prototype.getExtent = function (t) { return this.extentRevision_ != this.getRevision() && (this.extent_ = this.computeExtent(this.extent_), this.extentRevision_ = this.getRevision()), d.returnOrUpdate(this.extent_, t); }, I.prototype.rotate = function (t, e) { }, I.prototype.scale = function (t, e, n) { }, I.prototype.simplify = function (t) { return this.getSimplifiedGeometry(t * t); }, I.prototype.getSimplifiedGeometry = function (t) { }, I.prototype.getType = function () { }, I.prototype.applyTransform = function (t) { }, I.prototype.intersectsExtent = function (t) { }, I.prototype.translate = function (t, e) { }, I.prototype.transform = function (t, e) { var n = this.tmpTransform_, i = (t = L.get(t)).getUnits() == T.TILE_PIXELS ? function (i, r, o) { var s = t.getExtent(), a = t.getWorldExtent(), u = d.getHeight(a) / d.getHeight(s); return O.compose(n, a[0], a[3], u, -u, 0, 0, 0), m.transform2D(i, 0, i.length, o, n, r), L.getTransform(t, e)(i, r, o); } : L.getTransform(t, e); return this.applyTransform(i), this; }; var P, N, w = { HEX_COLOR_RE_: /^#(?:[0-9a-f]{3,4}){1,2}$/i, NAMED_COLOR_RE_: /^([a-z]*)$/i, asArray: function (t) { return Array.isArray(t) ? t : w.fromString(t); }, asString: function (t) { return "string" == typeof t ? t : w.toString(t); }, fromNamed: function (t) { var e = document.createElement("div"); e.style.color = t, document.body.appendChild(e); var n = getComputedStyle(e).color; return document.body.removeChild(e), n; } }; w.fromString = (P = {}, N = 0, function (t) { var e; if (P.hasOwnProperty(t))
    e = P[t];
else {
    if (N >= 1024) {
        var n, i = 0;
        for (n in P)
            0 == (3 & i++) && (delete P[n], --N);
    }
    e = w.fromStringInternal_(t), P[t] = e, ++N;
} return e; }), w.fromStringInternal_ = function (t) { var e, n, i, o, s, a; if (w.NAMED_COLOR_RE_.exec(t) && (t = w.fromNamed(t)), w.HEX_COLOR_RE_.exec(t)) {
    var u, h = t.length - 1;
    u = h <= 4 ? 1 : 2;
    var l = 4 === h || 8 === h;
    e = parseInt(t.substr(1 + 0 * u, u), 16), n = parseInt(t.substr(1 + 1 * u, u), 16), i = parseInt(t.substr(1 + 2 * u, u), 16), o = l ? parseInt(t.substr(1 + 3 * u, u), 16) : 255, 1 == u && (e = (e << 4) + e, n = (n << 4) + n, i = (i << 4) + i, l && (o = (o << 4) + o)), s = [e, n, i, o / 255];
}
else
    0 == t.indexOf("rgba(") ? (a = t.slice(5, -1).split(",").map(Number), s = w.normalize(a)) : 0 == t.indexOf("rgb(") ? ((a = t.slice(4, -1).split(",").map(Number)).push(1), s = w.normalize(a)) : r.assert(!1, 14); return s; }, w.normalize = function (t, e) { var n = e || []; return n[0] = v.clamp(t[0] + .5 | 0, 0, 255), n[1] = v.clamp(t[1] + .5 | 0, 0, 255), n[2] = v.clamp(t[2] + .5 | 0, 0, 255), n[3] = v.clamp(t[3], 0, 1), n; }, w.toString = function (t) { var e = t[0]; e != (0 | e) && (e = e + .5 | 0); var n = t[1]; n != (0 | n) && (n = n + .5 | 0); var i = t[2]; return i != (0 | i) && (i = i + .5 | 0), "rgba(" + e + "," + n + "," + i + "," + (void 0 === t[3] ? 1 : t[3]) + ")"; }; var X = { asColorLike: function (t) { return X.isColorLike(t) ? t : w.asString(t); }, isColorLike: function (t) { return "string" == typeof t || t instanceof CanvasPattern || t instanceof CanvasGradient; } }, U = { createCanvasContext2D: function (t, e) { var n = document.createElement("CANVAS"); return t && (n.width = t), e && (n.height = e), n.getContext("2d"); }, outerWidth: function (t) { var e = t.offsetWidth, n = getComputedStyle(t); return e + (parseInt(n.marginLeft, 10) + parseInt(n.marginRight, 10)); }, outerHeight: function (t) { var e = t.offsetHeight, n = getComputedStyle(t); return e + (parseInt(n.marginTop, 10) + parseInt(n.marginBottom, 10)); }, replaceNode: function (t, e) { var n = e.parentNode; n && n.replaceChild(t, e); }, removeNode: function (t) { return t && t.parentNode ? t.parentNode.removeChild(t) : null; }, removeChildren: function (t) { for (; t.lastChild;)
        t.removeChild(t.lastChild); } }, F = { ONE: 1, SRC_ALPHA: 770, COLOR_ATTACHMENT0: 36064, COLOR_BUFFER_BIT: 16384, TRIANGLES: 4, TRIANGLE_STRIP: 5, ONE_MINUS_SRC_ALPHA: 771, ARRAY_BUFFER: 34962, ELEMENT_ARRAY_BUFFER: 34963, STREAM_DRAW: 35040, STATIC_DRAW: 35044, DYNAMIC_DRAW: 35048, CULL_FACE: 2884, BLEND: 3042, STENCIL_TEST: 2960, DEPTH_TEST: 2929, SCISSOR_TEST: 3089, UNSIGNED_BYTE: 5121, UNSIGNED_SHORT: 5123, UNSIGNED_INT: 5125, FLOAT: 5126, RGBA: 6408, FRAGMENT_SHADER: 35632, VERTEX_SHADER: 35633, LINK_STATUS: 35714, LINEAR: 9729, TEXTURE_MAG_FILTER: 10240, TEXTURE_MIN_FILTER: 10241, TEXTURE_WRAP_S: 10242, TEXTURE_WRAP_T: 10243, TEXTURE_2D: 3553, TEXTURE0: 33984, CLAMP_TO_EDGE: 33071, COMPILE_STATUS: 35713, FRAMEBUFFER: 36160, CONTEXT_IDS_: ["experimental-webgl", "webgl", "webkit-3d", "moz-webgl"], getContext: function (t, e) { var n, i, r = F.CONTEXT_IDS_.length; for (i = 0; i < r; ++i)
        try {
            if (n = t.getContext(F.CONTEXT_IDS_[i], e))
                return n;
        }
        catch (t) { } return null; } }, D = {}, b = "undefined" != typeof navigator ? navigator.userAgent.toLowerCase() : ""; D.FIREFOX = -1 !== b.indexOf("firefox"), D.SAFARI = -1 !== b.indexOf("safari") && -1 == b.indexOf("chrom"), D.WEBKIT = -1 !== b.indexOf("webkit") && -1 == b.indexOf("edge"), D.MAC = -1 !== b.indexOf("macintosh"), D.DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1, D.CANVAS_LINE_DASH = !1, D.CANVAS = n.ENABLE_CANVAS && function () { if (!("HTMLCanvasElement" in window))
    return !1; try {
    var t = document.createElement("CANVAS").getContext("2d");
    return !!t && (void 0 !== t.setLineDash && (D.CANVAS_LINE_DASH = !0), !0);
}
catch (t) {
    return !1;
} }(), D.DEVICE_ORIENTATION = "DeviceOrientationEvent" in window, D.GEOLOCATION = "geolocation" in navigator, D.TOUCH = n.ASSUME_TOUCH || "ontouchstart" in window, D.POINTER = "PointerEvent" in window, D.MSPOINTER = !!navigator.msPointerEnabled, function () { if (n.ENABLE_WEBGL) {
    var t, e = !1, i = [];
    if ("WebGLRenderingContext" in window)
        try {
            var r = document.createElement("CANVAS"), o = F.getContext(r, { failIfMajorPerformanceCaveat: !0 });
            o && (e = !0, t = o.getParameter(o.MAX_TEXTURE_SIZE), i = o.getSupportedExtensions());
        }
        catch (t) { }
    D.WEBGL = e, n.WEBGL_EXTENSIONS = i, n.WEBGL_MAX_TEXTURE_SIZE = t;
} }(); var Y = { CLASS_HIDDEN: "ol-hidden", CLASS_SELECTABLE: "ol-selectable", CLASS_UNSELECTABLE: "ol-unselectable", CLASS_UNSUPPORTED: "ol-unsupported", CLASS_CONTROL: "ol-control" }; Y.getFontFamilies = function () { var t, e = {}; return function (n) { if (t || (t = document.createElement("div").style), !(n in e)) {
    t.font = n;
    var i = t.fontFamily;
    if (t.font = "", !i)
        return null;
    e[n] = i.split(/,\s?/);
} return e[n]; }; }(); var G = function (t) { c.call(this), this.highWaterMark = void 0 !== t ? t : 2048, this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null; }; n.inherits(G, c), G.prototype.canExpireCache = function () { return this.getCount() > this.highWaterMark; }, G.prototype.clear = function () { this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null, this.dispatchEvent(a.CLEAR); }, G.prototype.containsKey = function (t) { return this.entries_.hasOwnProperty(t); }, G.prototype.forEach = function (t, e) { for (var n = this.oldest_; n;)
    t.call(e, n.value_, n.key_, this), n = n.newer; }, G.prototype.get = function (t) { var e = this.entries_[t]; return r.assert(void 0 !== e, 15), e === this.newest_ ? e.value_ : (e === this.oldest_ ? (this.oldest_ = this.oldest_.newer, this.oldest_.older = null) : (e.newer.older = e.older, e.older.newer = e.newer), e.newer = null, e.older = this.newest_, this.newest_.newer = e, this.newest_ = e, e.value_); }, G.prototype.remove = function (t) { var e = this.entries_[t]; return r.assert(void 0 !== e, 15), e === this.newest_ ? (this.newest_ = e.older, this.newest_ && (this.newest_.newer = null)) : e === this.oldest_ ? (this.oldest_ = e.newer, this.oldest_ && (this.oldest_.older = null)) : (e.newer.older = e.older, e.older.newer = e.newer), delete this.entries_[t], --this.count_, e.value_; }, G.prototype.getCount = function () { return this.count_; }, G.prototype.getKeys = function () { var t, e = new Array(this.count_), n = 0; for (t = this.newest_; t; t = t.older)
    e[n++] = t.key_; return e; }, G.prototype.getValues = function () { var t, e = new Array(this.count_), n = 0; for (t = this.newest_; t; t = t.older)
    e[n++] = t.value_; return e; }, G.prototype.peekLast = function () { return this.oldest_.value_; }, G.prototype.peekLastKey = function () { return this.oldest_.key_; }, G.prototype.peekFirstKey = function () { return this.newest_.key_; }, G.prototype.pop = function () { var t = this.oldest_; return delete this.entries_[t.key_], t.newer && (t.newer.older = null), this.oldest_ = t.newer, this.oldest_ || (this.newest_ = null), --this.count_, t.value_; }, G.prototype.replace = function (t, e) { this.get(t), this.entries_[t].value_ = e; }, G.prototype.set = function (t, e) { r.assert(!(t in this.entries_), 16); var n = { key_: t, newer: null, older: this.newest_, value_: e }; this.newest_ ? this.newest_.newer = n : this.oldest_ = n, this.newest_ = n, this.entries_[t] = n, ++this.count_; }, G.prototype.prune = function () { for (; this.canExpireCache();)
    this.pop(); }; var B, j, z = { defaultFont: "10px sans-serif", defaultFillStyle: [0, 0, 0, 1], defaultLineCap: "round", defaultLineDash: [], defaultLineDashOffset: 0, defaultLineJoin: "round", defaultMiterLimit: 10, defaultStrokeStyle: [0, 0, 0, 1], defaultTextAlign: "center", defaultTextBaseline: "middle", defaultPadding: [0, 0, 0, 0], defaultLineWidth: 1 }; z.labelCache = new G, z.checkedFonts_ = {}, z.measureContext_ = null, z.textHeights_ = {}, z.checkFont = function () { var t, e, n = 60, i = z.checkedFonts_, r = z.labelCache, s = "32px monospace", a = "wmytzilWMYTZIL@#/&?$%10"; function u(t) { var n = z.getMeasureContext(); n.font = s, e = n.measureText(a).width; var i = !0; return "monospace" != t && (n.font = "32px " + t + ",monospace", i = n.measureText(a).width != e), i; } function h() { var e = !0; for (var s in i)
    i[s] < n && (u(s) ? (i[s] = n, o.clear(z.textHeights_), z.measureContext_ = null, r.clear()) : (++i[s], e = !1)); e && (window.clearInterval(t), t = void 0); } return function (e) { var r = Y.getFontFamilies(e); if (r)
    for (var o = 0, s = r.length; o < s; ++o) {
        var a = r[o];
        a in i || (i[a] = n, u(a) || (i[a] = 0, void 0 === t && (t = window.setInterval(h, 32))));
    } }; }(), z.getMeasureContext = function () { var t = z.measureContext_; return t || (t = z.measureContext_ = U.createCanvasContext2D(1, 1)), t; }, z.measureTextHeight = (j = z.textHeights_, function (t) { var e = j[t]; return void 0 == e && (B || ((B = document.createElement("span")).textContent = "M", B.style.margin = B.style.padding = "0 !important", B.style.position = "absolute !important", B.style.left = "-99999px !important"), B.style.font = t, document.body.appendChild(B), e = j[t] = B.offsetHeight, document.body.removeChild(B)), e; }), z.measureTextWidth = function (t, e) { var n = z.getMeasureContext(); return t != n.font && (n.font = t), n.measureText(e).width; }, z.rotateAtOffset = function (t, e, n, i) { 0 !== e && (t.translate(n, i), t.rotate(e), t.translate(-n, -i)); }, z.resetTransform_ = O.create(), z.drawImage = function (t, e, n, i, r, o, s, a, u, h, l) { var c; 1 != n && (c = t.globalAlpha, t.globalAlpha = c * n), e && t.setTransform.apply(t, e), t.drawImage(i, r, o, s, a, u, h, s * l, a * l), c && (t.globalAlpha = c), e && t.setTransform.apply(t, z.resetTransform_); }; var H = function (t) { var e = t || {}; this.color_ = void 0 !== e.color ? e.color : null, this.lineCap_ = e.lineCap, this.lineDash_ = void 0 !== e.lineDash ? e.lineDash : null, this.lineDashOffset_ = e.lineDashOffset, this.lineJoin_ = e.lineJoin, this.miterLimit_ = e.miterLimit, this.width_ = e.width, this.checksum_ = void 0; }; H.prototype.clone = function () { var t = this.getColor(); return new H({ color: t && t.slice ? t.slice() : t || void 0, lineCap: this.getLineCap(), lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0, lineDashOffset: this.getLineDashOffset(), lineJoin: this.getLineJoin(), miterLimit: this.getMiterLimit(), width: this.getWidth() }); }, H.prototype.getColor = function () { return this.color_; }, H.prototype.getLineCap = function () { return this.lineCap_; }, H.prototype.getLineDash = function () { return this.lineDash_; }, H.prototype.getLineDashOffset = function () { return this.lineDashOffset_; }, H.prototype.getLineJoin = function () { return this.lineJoin_; }, H.prototype.getMiterLimit = function () { return this.miterLimit_; }, H.prototype.getWidth = function () { return this.width_; }, H.prototype.setColor = function (t) { this.color_ = t, this.checksum_ = void 0; }, H.prototype.setLineCap = function (t) { this.lineCap_ = t, this.checksum_ = void 0; }, H.prototype.setLineDash = function (t) { this.lineDash_ = t, this.checksum_ = void 0; }, H.prototype.setLineDashOffset = function (t) { this.lineDashOffset_ = t, this.checksum_ = void 0; }, H.prototype.setLineJoin = function (t) { this.lineJoin_ = t, this.checksum_ = void 0; }, H.prototype.setMiterLimit = function (t) { this.miterLimit_ = t, this.checksum_ = void 0; }, H.prototype.setWidth = function (t) { this.width_ = t, this.checksum_ = void 0; }, H.prototype.getChecksum = function () { return void 0 === this.checksum_ && (this.checksum_ = "s", this.color_ ? "string" == typeof this.color_ ? this.checksum_ += this.color_ : this.checksum_ += n.getUid(this.color_).toString() : this.checksum_ += "-", this.checksum_ += "," + (void 0 !== this.lineCap_ ? this.lineCap_.toString() : "-") + "," + (this.lineDash_ ? this.lineDash_.toString() : "-") + "," + (void 0 !== this.lineDashOffset_ ? this.lineDashOffset_ : "-") + "," + (void 0 !== this.lineJoin_ ? this.lineJoin_ : "-") + "," + (void 0 !== this.miterLimit_ ? this.miterLimit_.toString() : "-") + "," + (void 0 !== this.width_ ? this.width_.toString() : "-")), this.checksum_; }; var Z = { XY: "XY", XYZ: "XYZ", XYM: "XYM", XYZM: "XYZM" }, W = function () { I.call(this), this.layout = Z.XY, this.stride = 2, this.flatCoordinates = null; }; n.inherits(W, I), W.getLayoutForStride_ = function (t) { var e; return 2 == t ? e = Z.XY : 3 == t ? e = Z.XYZ : 4 == t && (e = Z.XYZM), e; }, W.getStrideForLayout = function (t) { var e; return t == Z.XY ? e = 2 : t == Z.XYZ || t == Z.XYM ? e = 3 : t == Z.XYZM && (e = 4), e; }, W.prototype.containsXY = g.FALSE, W.prototype.computeExtent = function (t) { return d.createOrUpdateFromFlatCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t); }, W.prototype.getCoordinates = function () { }, W.prototype.getFirstCoordinate = function () { return this.flatCoordinates.slice(0, this.stride); }, W.prototype.getFlatCoordinates = function () { return this.flatCoordinates; }, W.prototype.getLastCoordinate = function () { return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride); }, W.prototype.getLayout = function () { return this.layout; }, W.prototype.getSimplifiedGeometry = function (t) { if (this.simplifiedGeometryRevision != this.getRevision() && (o.clear(this.simplifiedGeometryCache), this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = this.getRevision()), t < 0 || 0 !== this.simplifiedGeometryMaxMinSquaredTolerance && t <= this.simplifiedGeometryMaxMinSquaredTolerance)
    return this; var e = t.toString(); if (this.simplifiedGeometryCache.hasOwnProperty(e))
    return this.simplifiedGeometryCache[e]; var n = this.getSimplifiedGeometryInternal(t); return n.getFlatCoordinates().length < this.flatCoordinates.length ? (this.simplifiedGeometryCache[e] = n, n) : (this.simplifiedGeometryMaxMinSquaredTolerance = t, this); }, W.prototype.getSimplifiedGeometryInternal = function (t) { return this; }, W.prototype.getStride = function () { return this.stride; }, W.prototype.setFlatCoordinatesInternal = function (t, e) { this.stride = W.getStrideForLayout(t), this.layout = t, this.flatCoordinates = e; }, W.prototype.setCoordinates = function (t, e) { }, W.prototype.setLayout = function (t, e, n) { var i; if (t)
    i = W.getStrideForLayout(t);
else {
    var r;
    for (r = 0; r < n; ++r) {
        if (0 === e.length)
            return this.layout = Z.XY, void (this.stride = 2);
        e = e[0];
    }
    i = e.length, t = W.getLayoutForStride_(i);
} this.layout = t, this.stride = i; }, W.prototype.applyTransform = function (t) { this.flatCoordinates && (t(this.flatCoordinates, this.flatCoordinates, this.stride), this.changed()); }, W.prototype.rotate = function (t, e) { var n = this.getFlatCoordinates(); if (n) {
    var i = this.getStride();
    m.rotate(n, 0, n.length, i, t, e, n), this.changed();
} }, W.prototype.scale = function (t, e, n) { var i = e; void 0 === i && (i = t); var r = n; r || (r = d.getCenter(this.getExtent())); var o = this.getFlatCoordinates(); if (o) {
    var s = this.getStride();
    m.scale(o, 0, o.length, s, t, i, r, o), this.changed();
} }, W.prototype.translate = function (t, e) { var n = this.getFlatCoordinates(); if (n) {
    var i = this.getStride();
    m.translate(n, 0, n.length, i, t, e, n), this.changed();
} }, W.transform2D = function (t, e, n) { var i = t.getFlatCoordinates(); if (i) {
    var r = t.getStride();
    return m.transform2D(i, 0, i.length, r, e, n);
} return null; }; var k = { coordinate: function (t, e, n, i) { var r, o; for (r = 0, o = n.length; r < o; ++r)
        t[e++] = n[r]; return e; }, coordinates: function (t, e, n, i) { var r, o; for (r = 0, o = n.length; r < o; ++r) {
        var s, a = n[r];
        for (s = 0; s < i; ++s)
            t[e++] = a[s];
    } return e; }, coordinatess: function (t, e, n, i, r) { var o, s, a = r || [], u = 0; for (o = 0, s = n.length; o < s; ++o) {
        var h = k.coordinates(t, e, n[o], i);
        a[u++] = h, e = h;
    } return a.length = u, a; }, coordinatesss: function (t, e, n, i, r) { var o, s, a = r || [], u = 0; for (o = 0, s = n.length; o < s; ++o) {
        var h = k.coordinatess(t, e, n[o], i, a[u]);
        a[u++] = h, e = h[h.length - 1];
    } return a.length = u, a; } }, K = function () { this.cache_ = {}, this.cacheSize_ = 0, this.maxCacheSize_ = 32; }; K.getKey = function (t, e, n) { return e + ":" + t + ":" + (n ? w.asString(n) : "null"); }, K.prototype.clear = function () { this.cache_ = {}, this.cacheSize_ = 0; }, K.prototype.expire = function () { if (this.cacheSize_ > this.maxCacheSize_) {
    var t, e, n = 0;
    for (t in this.cache_)
        e = this.cache_[t], 0 != (3 & n++) || e.hasListener() || (delete this.cache_[t], --this.cacheSize_);
} }, K.prototype.get = function (t, e, n) { var i = K.getKey(t, e, n); return i in this.cache_ ? this.cache_[i] : null; }, K.prototype.set = function (t, e, n, i) { var r = K.getKey(t, e, n); this.cache_[r] = i, ++this.cacheSize_; }, K.prototype.setSize = function (t) { this.maxCacheSize_ = t, this.expire(); }; var V = {}; V.iconImageCache = new K; var q = { ADD: "add", REMOVE: "remove" }, J = function (t, e) { p.call(this); var n = e || {}; if (this.unique_ = !!n.unique, this.array_ = t || [], this.unique_)
    for (var i = 0, r = this.array_.length; i < r; ++i)
        this.assertUnique_(this.array_[i], i); this.updateLength_(); }; n.inherits(J, p), J.prototype.clear = function () { for (; this.getLength() > 0;)
    this.pop(); }, J.prototype.extend = function (t) { var e, n; for (e = 0, n = t.length; e < n; ++e)
    this.push(t[e]); return this; }, J.prototype.forEach = function (t, e) { for (var n = e ? t.bind(e) : t, i = this.array_, r = 0, o = i.length; r < o; ++r)
    n(i[r], r, i); }, J.prototype.getArray = function () { return this.array_; }, J.prototype.item = function (t) { return this.array_[t]; }, J.prototype.getLength = function () { return this.get(J.Property_.LENGTH); }, J.prototype.insertAt = function (t, e) { this.unique_ && this.assertUnique_(e), this.array_.splice(t, 0, e), this.updateLength_(), this.dispatchEvent(new J.Event(q.ADD, e)); }, J.prototype.pop = function () { return this.removeAt(this.getLength() - 1); }, J.prototype.push = function (t) { this.unique_ && this.assertUnique_(t); var e = this.getLength(); return this.insertAt(e, t), this.getLength(); }, J.prototype.remove = function (t) { var e, n, i = this.array_; for (e = 0, n = i.length; e < n; ++e)
    if (i[e] === t)
        return this.removeAt(e); }, J.prototype.removeAt = function (t) { var e = this.array_[t]; return this.array_.splice(t, 1), this.updateLength_(), this.dispatchEvent(new J.Event(q.REMOVE, e)), e; }, J.prototype.setAt = function (t, e) { var n = this.getLength(); if (t < n) {
    this.unique_ && this.assertUnique_(e, t);
    var i = this.array_[t];
    this.array_[t] = e, this.dispatchEvent(new J.Event(q.REMOVE, i)), this.dispatchEvent(new J.Event(q.ADD, e));
}
else {
    var r;
    for (r = n; r < t; ++r)
        this.insertAt(r, void 0);
    this.insertAt(t, e);
} }, J.prototype.updateLength_ = function () { this.set(J.Property_.LENGTH, this.array_.length); }, J.prototype.assertUnique_ = function (t, e) { for (var n = 0, r = this.array_.length; n < r; ++n)
    if (this.array_[n] === t && n !== e)
        throw new i(58); }, J.Property_ = { LENGTH: "length" }, J.Event = function (t, e) { l.call(this, t), this.element = e; }, n.inherits(J.Event, l); var $ = { binarySearch: function (t, e, n) { for (var i, r, o = n || $.numberSafeCompareFunction, s = 0, a = t.length, u = !1; s < a;)
        (r = +o(t[i = s + (a - s >> 1)], e)) < 0 ? s = i + 1 : (a = i, u = !r); return u ? s : ~s; }, numberSafeCompareFunction: function (t, e) { return t > e ? 1 : t < e ? -1 : 0; }, includes: function (t, e) { return t.indexOf(e) >= 0; }, linearFindNearest: function (t, e, n) { var i, r = t.length; if (t[0] <= e)
        return 0; if (e <= t[r - 1])
        return r - 1; if (n > 0) {
        for (i = 1; i < r; ++i)
            if (t[i] < e)
                return i - 1;
    }
    else if (n < 0) {
        for (i = 1; i < r; ++i)
            if (t[i] <= e)
                return i;
    }
    else
        for (i = 1; i < r; ++i) {
            if (t[i] == e)
                return i;
            if (t[i] < e)
                return t[i - 1] - e < e - t[i] ? i - 1 : i;
        } return r - 1; }, reverseSubArray: function (t, e, n) { for (; e < n;) {
        var i = t[e];
        t[e] = t[n], t[n] = i, ++e, --n;
    } }, extend: function (t, e) { var n, i = Array.isArray(e) ? e : [e], r = i.length; for (n = 0; n < r; n++)
        t[t.length] = i[n]; }, remove: function (t, e) { var n = t.indexOf(e), i = n > -1; return i && t.splice(n, 1), i; }, find: function (t, e) { for (var n, i = t.length >>> 0, r = 0; r < i; r++)
        if (e(n = t[r], r, t))
            return n; return null; }, equals: function (t, e) { var n = t.length; if (n !== e.length)
        return !1; for (var i = 0; i < n; i++)
        if (t[i] !== e[i])
            return !1; return !0; }, stableSort: function (t, e) { var n, i = t.length, r = Array(t.length); for (n = 0; n < i; n++)
        r[n] = { index: n, value: t[n] }; for (r.sort(function (t, n) { return e(t.value, n.value) || t.index - n.index; }), n = 0; n < t.length; n++)
        t[n] = r[n].value; }, findIndex: function (t, e) { var n; return t.every(function (i, r) { return n = r, !e(i, r, t); }) ? -1 : n; }, isSorted: function (t, e, n) { var i = e || $.numberSafeCompareFunction; return t.every(function (e, r) { if (0 === r)
        return !0; var o = i(t[r - 1], e); return !(o > 0 || n && 0 === o); }); } }, Q = function (t, e, n, i) { this.minX = t, this.maxX = e, this.minY = n, this.maxY = i; }; Q.createOrUpdate = function (t, e, n, i, r) { return void 0 !== r ? (r.minX = t, r.maxX = e, r.minY = n, r.maxY = i, r) : new Q(t, e, n, i); }, Q.prototype.contains = function (t) { return this.containsXY(t[1], t[2]); }, Q.prototype.containsTileRange = function (t) { return this.minX <= t.minX && t.maxX <= this.maxX && this.minY <= t.minY && t.maxY <= this.maxY; }, Q.prototype.containsXY = function (t, e) { return this.minX <= t && t <= this.maxX && this.minY <= e && e <= this.maxY; }, Q.prototype.equals = function (t) { return this.minX == t.minX && this.minY == t.minY && this.maxX == t.maxX && this.maxY == t.maxY; }, Q.prototype.extend = function (t) { t.minX < this.minX && (this.minX = t.minX), t.maxX > this.maxX && (this.maxX = t.maxX), t.minY < this.minY && (this.minY = t.minY), t.maxY > this.maxY && (this.maxY = t.maxY); }, Q.prototype.getHeight = function () { return this.maxY - this.minY + 1; }, Q.prototype.getSize = function () { return [this.getWidth(), this.getHeight()]; }, Q.prototype.getWidth = function () { return this.maxX - this.minX + 1; }, Q.prototype.intersects = function (t) { return this.minX <= t.maxX && this.maxX >= t.minX && this.minY <= t.maxY && this.maxY >= t.minY; }; var tt = { buffer: function (t, e, n) { return void 0 === n && (n = [0, 0]), n[0] = t[0] + 2 * e, n[1] = t[1] + 2 * e, n; }, hasArea: function (t) { return t[0] > 0 && t[1] > 0; }, scale: function (t, e, n) { return void 0 === n && (n = [0, 0]), n[0] = t[0] * e + .5 | 0, n[1] = t[1] * e + .5 | 0, n; }, toSize: function (t, e) { return Array.isArray(t) ? t : (void 0 === e ? e = [t, t] : e[0] = e[1] = t, e); } }, et = { createOrUpdate: function (t, e, n, i) { return void 0 !== i ? (i[0] = t, i[1] = e, i[2] = n, i) : [t, e, n]; }, getKeyZXY: function (t, e, n) { return t + "/" + e + "/" + n; }, getKey: function (t) { return et.getKeyZXY(t[0], t[1], t[2]); }, fromKey: function (t) { return t.split("/").map(Number); }, hash: function (t) { return (t[1] << t[0]) + t[2]; }, quadKey: function (t) { var e, n, i = t[0], r = new Array(i), o = 1 << i - 1; for (e = 0; e < i; ++e)
        n = 48, t[1] & o && (n += 1), t[2] & o && (n += 2), r[e] = String.fromCharCode(n), o >>= 1; return r.join(""); }, withinExtentAndZ: function (t, e) { var n = t[0], i = t[1], r = t[2]; if (e.getMinZoom() > n || n > e.getMaxZoom())
        return !1; var o, s = e.getExtent(); return !(o = s ? e.getTileRangeForExtentAndZ(s, n) : e.getFullTileRange(n)) || o.containsXY(i, r); } }, nt = function (t) { var e; if (this.minZoom = void 0 !== t.minZoom ? t.minZoom : 0, this.resolutions_ = t.resolutions, r.assert($.isSorted(this.resolutions_, function (t, e) { return e - t; }, !0), 17), !t.origins)
    for (var i = 0, o = this.resolutions_.length - 1; i < o; ++i)
        if (e) {
            if (this.resolutions_[i] / this.resolutions_[i + 1] !== e) {
                e = void 0;
                break;
            }
        }
        else
            e = this.resolutions_[i] / this.resolutions_[i + 1]; this.zoomFactor_ = e, this.maxZoom = this.resolutions_.length - 1, this.origin_ = void 0 !== t.origin ? t.origin : null, this.origins_ = null, void 0 !== t.origins && (this.origins_ = t.origins, r.assert(this.origins_.length == this.resolutions_.length, 20)); var s = t.extent; void 0 === s || this.origin_ || this.origins_ || (this.origin_ = d.getTopLeft(s)), r.assert(!this.origin_ && this.origins_ || this.origin_ && !this.origins_, 18), this.tileSizes_ = null, void 0 !== t.tileSizes && (this.tileSizes_ = t.tileSizes, r.assert(this.tileSizes_.length == this.resolutions_.length, 19)), this.tileSize_ = void 0 !== t.tileSize ? t.tileSize : this.tileSizes_ ? null : n.DEFAULT_TILE_SIZE, r.assert(!this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_, 22), this.extent_ = void 0 !== s ? s : null, this.fullTileRanges_ = null, this.tmpSize_ = [0, 0], void 0 !== t.sizes ? this.fullTileRanges_ = t.sizes.map(function (t, e) { return new Q(Math.min(0, t[0]), Math.max(t[0] - 1, -1), Math.min(0, t[1]), Math.max(t[1] - 1, -1)); }, this) : s && this.calculateTileRanges_(s); }; nt.tmpTileCoord_ = [0, 0, 0], nt.prototype.forEachTileCoord = function (t, e, n) { for (var i = this.getTileRangeForExtentAndZ(t, e), r = i.minX, o = i.maxX; r <= o; ++r)
    for (var s = i.minY, a = i.maxY; s <= a; ++s)
        n([e, r, s]); }, nt.prototype.forEachTileCoordParentTileRange = function (t, e, n, i, r) { var o, s, a, u = null, h = t[0] - 1; for (2 === this.zoomFactor_ ? (s = t[1], a = t[2]) : u = this.getTileCoordExtent(t, r); h >= this.minZoom;) {
    if (2 === this.zoomFactor_ ? (s = Math.floor(s / 2), a = Math.floor(a / 2), o = Q.createOrUpdate(s, s, a, a, i)) : o = this.getTileRangeForExtentAndZ(u, h, i), e.call(n, h, o))
        return !0;
    --h;
} return !1; }, nt.prototype.getExtent = function () { return this.extent_; }, nt.prototype.getMaxZoom = function () { return this.maxZoom; }, nt.prototype.getMinZoom = function () { return this.minZoom; }, nt.prototype.getOrigin = function (t) { return this.origin_ ? this.origin_ : this.origins_[t]; }, nt.prototype.getResolution = function (t) { return this.resolutions_[t]; }, nt.prototype.getResolutions = function () { return this.resolutions_; }, nt.prototype.getTileCoordChildTileRange = function (t, e, n) { if (t[0] < this.maxZoom) {
    if (2 === this.zoomFactor_) {
        var i = 2 * t[1], r = 2 * t[2];
        return Q.createOrUpdate(i, i + 1, r, r + 1, e);
    }
    var o = this.getTileCoordExtent(t, n);
    return this.getTileRangeForExtentAndZ(o, t[0] + 1, e);
} return null; }, nt.prototype.getTileRangeExtent = function (t, e, n) { var i = this.getOrigin(t), r = this.getResolution(t), o = tt.toSize(this.getTileSize(t), this.tmpSize_), s = i[0] + e.minX * o[0] * r, a = i[0] + (e.maxX + 1) * o[0] * r, u = i[1] + e.minY * o[1] * r, h = i[1] + (e.maxY + 1) * o[1] * r; return d.createOrUpdate(s, u, a, h, n); }, nt.prototype.getTileRangeForExtentAndZ = function (t, e, n) { var i = nt.tmpTileCoord_; this.getTileCoordForXYAndZ_(t[0], t[1], e, !1, i); var r = i[1], o = i[2]; return this.getTileCoordForXYAndZ_(t[2], t[3], e, !0, i), Q.createOrUpdate(r, i[1], o, i[2], n); }, nt.prototype.getTileCoordCenter = function (t) { var e = this.getOrigin(t[0]), n = this.getResolution(t[0]), i = tt.toSize(this.getTileSize(t[0]), this.tmpSize_); return [e[0] + (t[1] + .5) * i[0] * n, e[1] + (t[2] + .5) * i[1] * n]; }, nt.prototype.getTileCoordExtent = function (t, e) { var n = this.getOrigin(t[0]), i = this.getResolution(t[0]), r = tt.toSize(this.getTileSize(t[0]), this.tmpSize_), o = n[0] + t[1] * r[0] * i, s = n[1] + t[2] * r[1] * i, a = o + r[0] * i, u = s + r[1] * i; return d.createOrUpdate(o, s, a, u, e); }, nt.prototype.getTileCoordForCoordAndResolution = function (t, e, n) { return this.getTileCoordForXYAndResolution_(t[0], t[1], e, !1, n); }, nt.prototype.getTileCoordForXYAndResolution_ = function (t, e, n, i, r) { var o = this.getZForResolution(n), s = n / this.getResolution(o), a = this.getOrigin(o), u = tt.toSize(this.getTileSize(o), this.tmpSize_), h = i ? .5 : 0, l = i ? 0 : .5, c = Math.floor((t - a[0]) / n + h), f = Math.floor((e - a[1]) / n + l), p = s * c / u[0], _ = s * f / u[1]; return i ? (p = Math.ceil(p) - 1, _ = Math.ceil(_) - 1) : (p = Math.floor(p), _ = Math.floor(_)), et.createOrUpdate(o, p, _, r); }, nt.prototype.getTileCoordForXYAndZ_ = function (t, e, n, i, r) { var o = this.getOrigin(n), s = this.getResolution(n), a = tt.toSize(this.getTileSize(n), this.tmpSize_), u = i ? .5 : 0, h = i ? 0 : .5, l = Math.floor((t - o[0]) / s + u), c = Math.floor((e - o[1]) / s + h), f = l / a[0], p = c / a[1]; return i ? (f = Math.ceil(f) - 1, p = Math.ceil(p) - 1) : (f = Math.floor(f), p = Math.floor(p)), et.createOrUpdate(n, f, p, r); }, nt.prototype.getTileCoordForCoordAndZ = function (t, e, n) { return this.getTileCoordForXYAndZ_(t[0], t[1], e, !1, n); }, nt.prototype.getTileCoordResolution = function (t) { return this.resolutions_[t[0]]; }, nt.prototype.getTileSize = function (t) { return this.tileSize_ ? this.tileSize_ : this.tileSizes_[t]; }, nt.prototype.getFullTileRange = function (t) { return this.fullTileRanges_ ? this.fullTileRanges_[t] : null; }, nt.prototype.getZForResolution = function (t, e) { var n = $.linearFindNearest(this.resolutions_, t, e || 0); return v.clamp(n, this.minZoom, this.maxZoom); }, nt.prototype.calculateTileRanges_ = function (t) { for (var e = this.resolutions_.length, n = new Array(e), i = this.minZoom; i < e; ++i)
    n[i] = this.getTileRangeForExtentAndZ(t, i); this.fullTileRanges_ = n; }; var it = { getForProjection: function (t) { var e = t.getDefaultTileGrid(); return e || (e = it.createForProjection(t), t.setDefaultTileGrid(e)), e; }, wrapX: function (t, e, n) { var i = e[0], r = t.getTileCoordCenter(e), o = it.extentFromProjection(n); if (d.containsCoordinate(o, r))
        return e; var s = d.getWidth(o), a = Math.ceil((o[0] - r[0]) / s); return r[0] += s * a, t.getTileCoordForCoordAndZ(r, i); }, createForExtent: function (t, e, n, i) { var r = void 0 !== i ? i : "top-left", o = it.resolutionsFromExtent(t, e, n); return new nt({ extent: t, origin: d.getCorner(t, r), resolutions: o, tileSize: n }); }, createXYZ: function (t) { var e = {}; return o.assign(e, void 0 !== t ? t : {}), void 0 === e.extent && (e.extent = L.get("EPSG:3857").getExtent()), e.resolutions = it.resolutionsFromExtent(e.extent, e.maxZoom, e.tileSize), delete e.maxZoom, new nt(e); }, resolutionsFromExtent: function (t, e, i) { for (var r = void 0 !== e ? e : n.DEFAULT_MAX_ZOOM, o = d.getHeight(t), s = d.getWidth(t), a = tt.toSize(void 0 !== i ? i : n.DEFAULT_TILE_SIZE), u = Math.max(s / a[0], o / a[1]), h = r + 1, l = new Array(h), c = 0; c < h; ++c)
        l[c] = u / Math.pow(2, c); return l; }, createForProjection: function (t, e, n, i) { var r = it.extentFromProjection(t); return it.createForExtent(r, e, n, i); }, extentFromProjection: function (t) { var e = (t = L.get(t)).getExtent(); if (!e) {
        var n = 180 * L.METERS_PER_UNIT[T.DEGREES] / t.getMetersPerUnit();
        e = d.createOrUpdate(-n, -n, n, n);
    } return e; } }, rt = function (t) { this.html_ = t.html, this.tileRanges_ = t.tileRanges ? t.tileRanges : null; }; rt.prototype.getHTML = function () { return this.html_; }, rt.prototype.intersectsAnyTileRange = function (t, e, n) { if (!this.tileRanges_)
    return !0; var i, r, o, s; for (s in t) {
    var a;
    if (s in this.tileRanges_)
        for (o = t[s], i = 0, r = this.tileRanges_[s].length; i < r; ++i) {
            if ((a = this.tileRanges_[s][i]).intersects(o))
                return !0;
            var u = e.getTileRangeForExtentAndZ(it.extentFromProjection(n), parseInt(s, 10)), h = u.getWidth();
            if (o.minX < u.minX || o.maxX > u.maxX) {
                if (a.intersects(new Q(v.modulo(o.minX, h), v.modulo(o.maxX, h), o.minY, o.maxY)))
                    return !0;
                if (o.getWidth() > h && a.intersects(u))
                    return !0;
            }
        }
} return !1; }; var ot = { UNDEFINED: "undefined", LOADING: "loading", READY: "ready", ERROR: "error" }, st = function (t) { p.call(this), this.projection_ = L.get(t.projection), this.attributions_ = null, this.attributions2_ = this.adaptAttributions_(t.attributions), this.logo_ = t.logo, this.state_ = void 0 !== t.state ? t.state : ot.READY, this.wrapX_ = void 0 !== t.wrapX && t.wrapX; }; n.inherits(st, p), st.prototype.adaptAttributions_ = function (t) { if (!t)
    return null; if (t instanceof rt)
    return this.attributions_ = [t], function (e) { return [t.getHTML()]; }; if (Array.isArray(t)) {
    if (t[0] instanceof rt) {
        this.attributions_ = t;
        var e = t.map(function (t) { return t.getHTML(); });
        return function (t) { return e; };
    }
    return this.attributions_ = t.map(function (t) { return new rt({ html: t }); }), function (e) { return t; };
} return "function" == typeof t ? t : (this.attributions_ = [new rt({ html: t })], function (e) { return [t]; }); }, st.prototype.forEachFeatureAtCoordinate = n.nullFunction, st.prototype.getAttributions = function () { return this.attributions_; }, st.prototype.getAttributions2 = function () { return this.attributions2_; }, st.prototype.getLogo = function () { return this.logo_; }, st.prototype.getProjection = function () { return this.projection_; }, st.prototype.getResolutions = function () { }, st.prototype.getState = function () { return this.state_; }, st.prototype.getWrapX = function () { return this.wrapX_; }, st.prototype.refresh = function () { this.changed(); }, st.prototype.setAttributions = function (t) { this.attributions2_ = this.adaptAttributions_(t), this.changed(); }, st.prototype.setLogo = function (t) { this.logo_ = t; }, st.prototype.setState = function (t) { this.state_ = t, this.changed(); }; var at = e.createCommonjsModule(function (t, n) { e.commonjsGlobal, t.exports = function () { function t(t, e, n) { var i = t[e]; t[e] = t[n], t[n] = i; } function e(t, e) { return t < e ? -1 : t > e ? 1 : 0; } return function (n, i, r, o, s) { !function e(n, i, r, o, s) { for (; o > r;) {
    if (o - r > 600) {
        var a = o - r + 1, u = i - r + 1, h = Math.log(a), l = .5 * Math.exp(2 * h / 3), c = .5 * Math.sqrt(h * l * (a - l) / a) * (u - a / 2 < 0 ? -1 : 1);
        e(n, i, Math.max(r, Math.floor(i - u * l / a + c)), Math.min(o, Math.floor(i + (a - u) * l / a + c)), s);
    }
    var f = n[i], p = r, _ = o;
    for (t(n, r, i), s(n[o], f) > 0 && t(n, r, o); p < _;) {
        for (t(n, p, _), p++, _--; s(n[p], f) < 0;)
            p++;
        for (; s(n[_], f) > 0;)
            _--;
    }
    0 === s(n[r], f) ? t(n, r, _) : t(n, ++_, o), _ <= i && (r = _ + 1), i <= _ && (o = _ - 1);
} }(n, i, r || 0, o || n.length - 1, s || e); }; }(); }), ut = Object.freeze({ default: at, __moduleExports: at }), ht = ut && at || ut, lt = ct; function ct(t, e) { if (!(this instanceof ct))
    return new ct(t, e); this._maxEntries = Math.max(4, t || 9), this._minEntries = Math.max(2, Math.ceil(.4 * this._maxEntries)), e && this._initFormat(e), this.clear(); } function ft(t, e, n) { if (!n)
    return e.indexOf(t); for (var i = 0; i < e.length; i++)
    if (n(t, e[i]))
        return i; return -1; } function pt(t, e) { _t(t, 0, t.children.length, e, t); } function _t(t, e, n, i, r) { r || (r = St(null)), r.minX = 1 / 0, r.minY = 1 / 0, r.maxX = -1 / 0, r.maxY = -1 / 0; for (var o, s = e; s < n; s++)
    o = t.children[s], dt(r, t.leaf ? i(o) : o); return r; } function dt(t, e) { return t.minX = Math.min(t.minX, e.minX), t.minY = Math.min(t.minY, e.minY), t.maxX = Math.max(t.maxX, e.maxX), t.maxY = Math.max(t.maxY, e.maxY), t; } function gt(t, e) { return t.minX - e.minX; } function mt(t, e) { return t.minY - e.minY; } function vt(t) { return (t.maxX - t.minX) * (t.maxY - t.minY); } function Et(t) { return t.maxX - t.minX + (t.maxY - t.minY); } function yt(t, e) { return t.minX <= e.minX && t.minY <= e.minY && e.maxX <= t.maxX && e.maxY <= t.maxY; } function Tt(t, e) { return e.minX <= t.maxX && e.minY <= t.maxY && e.maxX >= t.minX && e.maxY >= t.minY; } function St(t) { return { children: t, height: 1, leaf: !0, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 }; } function xt(t, e, n, i, r) { for (var o, s = [e, n]; s.length;)
    (n = s.pop()) - (e = s.pop()) <= i || (o = e + Math.ceil((n - e) / i / 2) * i, ht(t, o, e, n, r), s.push(e, o, o, n)); } ct.prototype = { all: function () { return this._all(this.data, []); }, search: function (t) { var e = this.data, n = [], i = this.toBBox; if (!Tt(t, e))
        return n; for (var r, o, s, a, u = []; e;) {
        for (r = 0, o = e.children.length; r < o; r++)
            s = e.children[r], Tt(t, a = e.leaf ? i(s) : s) && (e.leaf ? n.push(s) : yt(t, a) ? this._all(s, n) : u.push(s));
        e = u.pop();
    } return n; }, collides: function (t) { var e = this.data, n = this.toBBox; if (!Tt(t, e))
        return !1; for (var i, r, o, s, a = []; e;) {
        for (i = 0, r = e.children.length; i < r; i++)
            if (o = e.children[i], Tt(t, s = e.leaf ? n(o) : o)) {
                if (e.leaf || yt(t, s))
                    return !0;
                a.push(o);
            }
        e = a.pop();
    } return !1; }, load: function (t) { if (!t || !t.length)
        return this; if (t.length < this._minEntries) {
        for (var e = 0, n = t.length; e < n; e++)
            this.insert(t[e]);
        return this;
    } var i = this._build(t.slice(), 0, t.length - 1, 0); if (this.data.children.length)
        if (this.data.height === i.height)
            this._splitRoot(this.data, i);
        else {
            if (this.data.height < i.height) {
                var r = this.data;
                this.data = i, i = r;
            }
            this._insert(i, this.data.height - i.height - 1, !0);
        }
    else
        this.data = i; return this; }, insert: function (t) { return t && this._insert(t, this.data.height - 1), this; }, clear: function () { return this.data = St([]), this; }, remove: function (t, e) { if (!t)
        return this; for (var n, i, r, o, s = this.data, a = this.toBBox(t), u = [], h = []; s || u.length;) {
        if (s || (s = u.pop(), i = u[u.length - 1], n = h.pop(), o = !0), s.leaf && -1 !== (r = ft(t, s.children, e)))
            return s.children.splice(r, 1), u.push(s), this._condense(u), this;
        o || s.leaf || !yt(s, a) ? i ? (n++, s = i.children[n], o = !1) : s = null : (u.push(s), h.push(n), n = 0, i = s, s = s.children[0]);
    } return this; }, toBBox: function (t) { return t; }, compareMinX: gt, compareMinY: mt, toJSON: function () { return this.data; }, fromJSON: function (t) { return this.data = t, this; }, _all: function (t, e) { for (var n = []; t;)
        t.leaf ? e.push.apply(e, t.children) : n.push.apply(n, t.children), t = n.pop(); return e; }, _build: function (t, e, n, i) { var r, o = n - e + 1, s = this._maxEntries; if (o <= s)
        return pt(r = St(t.slice(e, n + 1)), this.toBBox), r; i || (i = Math.ceil(Math.log(o) / Math.log(s)), s = Math.ceil(o / Math.pow(s, i - 1))), (r = St([])).leaf = !1, r.height = i; var a, u, h, l, c = Math.ceil(o / s), f = c * Math.ceil(Math.sqrt(s)); for (xt(t, e, n, f, this.compareMinX), a = e; a <= n; a += f)
        for (xt(t, a, h = Math.min(a + f - 1, n), c, this.compareMinY), u = a; u <= h; u += c)
            l = Math.min(u + c - 1, h), r.children.push(this._build(t, u, l, i - 1)); return pt(r, this.toBBox), r; }, _chooseSubtree: function (t, e, n, i) { for (var r, o, s, a, u, h, l, c, f, p; i.push(e), !e.leaf && i.length - 1 !== n;) {
        for (l = c = 1 / 0, r = 0, o = e.children.length; r < o; r++)
            u = vt(s = e.children[r]), f = t, p = s, (h = (Math.max(p.maxX, f.maxX) - Math.min(p.minX, f.minX)) * (Math.max(p.maxY, f.maxY) - Math.min(p.minY, f.minY)) - u) < c ? (c = h, l = u < l ? u : l, a = s) : h === c && u < l && (l = u, a = s);
        e = a || e.children[0];
    } return e; }, _insert: function (t, e, n) { var i = this.toBBox, r = n ? t : i(t), o = [], s = this._chooseSubtree(r, this.data, e, o); for (s.children.push(t), dt(s, r); e >= 0 && o[e].children.length > this._maxEntries;)
        this._split(o, e), e--; this._adjustParentBBoxes(r, o, e); }, _split: function (t, e) { var n = t[e], i = n.children.length, r = this._minEntries; this._chooseSplitAxis(n, r, i); var o = this._chooseSplitIndex(n, r, i), s = St(n.children.splice(o, n.children.length - o)); s.height = n.height, s.leaf = n.leaf, pt(n, this.toBBox), pt(s, this.toBBox), e ? t[e - 1].children.push(s) : this._splitRoot(n, s); }, _splitRoot: function (t, e) { this.data = St([t, e]), this.data.height = t.height + 1, this.data.leaf = !1, pt(this.data, this.toBBox); }, _chooseSplitIndex: function (t, e, n) { var i, r, o, s, a, u, h, l, c, f, p, _, d, g; for (u = h = 1 / 0, i = e; i <= n - e; i++)
        c = r = _t(t, 0, i, this.toBBox), f = o = _t(t, i, n, this.toBBox), p = Math.max(c.minX, f.minX), _ = Math.max(c.minY, f.minY), d = Math.min(c.maxX, f.maxX), g = Math.min(c.maxY, f.maxY), s = Math.max(0, d - p) * Math.max(0, g - _), a = vt(r) + vt(o), s < u ? (u = s, l = i, h = a < h ? a : h) : s === u && a < h && (h = a, l = i); return l; }, _chooseSplitAxis: function (t, e, n) { var i = t.leaf ? this.compareMinX : gt, r = t.leaf ? this.compareMinY : mt; this._allDistMargin(t, e, n, i) < this._allDistMargin(t, e, n, r) && t.children.sort(i); }, _allDistMargin: function (t, e, n, i) { t.children.sort(i); var r, o, s = this.toBBox, a = _t(t, 0, e, s), u = _t(t, n - e, n, s), h = Et(a) + Et(u); for (r = e; r < n - e; r++)
        o = t.children[r], dt(a, t.leaf ? s(o) : o), h += Et(a); for (r = n - e - 1; r >= e; r--)
        o = t.children[r], dt(u, t.leaf ? s(o) : o), h += Et(u); return h; }, _adjustParentBBoxes: function (t, e, n) { for (var i = n; i >= 0; i--)
        dt(e[i], t); }, _condense: function (t) { for (var e, n = t.length - 1; n >= 0; n--)
        0 === t[n].children.length ? n > 0 ? (e = t[n - 1].children).splice(e.indexOf(t[n]), 1) : this.clear() : pt(t[n], this.toBBox); }, _initFormat: function (t) { var e = ["return a", " - b", ";"]; this.compareMinX = new Function("a", "b", e.join(t[0])), this.compareMinY = new Function("a", "b", e.join(t[1])), this.toBBox = new Function("a", "return {minX: a" + t[0] + ", minY: a" + t[1] + ", maxX: a" + t[2] + ", maxY: a" + t[3] + "};"); } }; var Rt = function (t) { this.rbush_ = lt(t), this.items_ = {}; }; Rt.prototype.insert = function (t, e) { var i = { minX: t[0], minY: t[1], maxX: t[2], maxY: t[3], value: e }; this.rbush_.insert(i), this.items_[n.getUid(e)] = i; }, Rt.prototype.load = function (t, e) { for (var i = new Array(e.length), r = 0, o = e.length; r < o; r++) {
    var s = t[r], a = e[r], u = { minX: s[0], minY: s[1], maxX: s[2], maxY: s[3], value: a };
    i[r] = u, this.items_[n.getUid(a)] = u;
} this.rbush_.load(i); }, Rt.prototype.remove = function (t) { var e = n.getUid(t), i = this.items_[e]; return delete this.items_[e], null !== this.rbush_.remove(i); }, Rt.prototype.update = function (t, e) { var i = this.items_[n.getUid(e)], r = [i.minX, i.minY, i.maxX, i.maxY]; d.equals(r, t) || (this.remove(e), this.insert(t, e)); }, Rt.prototype.getAll = function () { return this.rbush_.all().map(function (t) { return t.value; }); }, Rt.prototype.getInExtent = function (t) { var e = { minX: t[0], minY: t[1], maxX: t[2], maxY: t[3] }; return this.rbush_.search(e).map(function (t) { return t.value; }); }, Rt.prototype.forEach = function (t, e) { return this.forEach_(this.getAll(), t, e); }, Rt.prototype.forEachInExtent = function (t, e, n) { return this.forEach_(this.getInExtent(t), e, n); }, Rt.prototype.forEach_ = function (t, e, n) { for (var i, r = 0, o = t.length; r < o; r++)
    if (i = e.call(n, t[r]))
        return i; return i; }, Rt.prototype.isEmpty = function () { return o.isEmpty(this.items_); }, Rt.prototype.clear = function () { this.rbush_.clear(), this.items_ = {}; }, Rt.prototype.getExtent = function (t) { var e = this.rbush_.data; return d.createOrUpdate(e.minX, e.minY, e.maxX, e.maxY, t); }, Rt.prototype.concat = function (t) { for (var e in this.rbush_.load(t.rbush_.all()), t.items_)
    this.items_[0 | e] = t.items_[0 | e]; }; var Ct = function (t) { p.call(this); var e = o.assign({}, t); e.opacity = void 0 !== t.opacity ? t.opacity : 1, e.visible = void 0 === t.visible || t.visible, e.zIndex = void 0 !== t.zIndex ? t.zIndex : 0, e.maxResolution = void 0 !== t.maxResolution ? t.maxResolution : 1 / 0, e.minResolution = void 0 !== t.minResolution ? t.minResolution : 0, this.setProperties(e), this.state_ = { layer: this, managed: !0 }, this.type; }; n.inherits(Ct, p), Ct.prototype.getType = function () { return this.type; }, Ct.prototype.getLayerState = function () { return this.state_.opacity = v.clamp(this.getOpacity(), 0, 1), this.state_.sourceState = this.getSourceState(), this.state_.visible = this.getVisible(), this.state_.extent = this.getExtent(), this.state_.zIndex = this.getZIndex(), this.state_.maxResolution = this.getMaxResolution(), this.state_.minResolution = Math.max(this.getMinResolution(), 0), this.state_; }, Ct.prototype.getLayersArray = function (t) { }, Ct.prototype.getLayerStatesArray = function (t) { }, Ct.prototype.getExtent = function () { return this.get("extent"); }, Ct.prototype.getMaxResolution = function () { return this.get("maxResolution"); }, Ct.prototype.getMinResolution = function () { return this.get("minResolution"); }, Ct.prototype.getOpacity = function () { return this.get("opacity"); }, Ct.prototype.getSourceState = function () { }, Ct.prototype.getVisible = function () { return this.get("visible"); }, Ct.prototype.getZIndex = function () { return this.get("zIndex"); }, Ct.prototype.setExtent = function (t) { this.set("extent", t); }, Ct.prototype.setMaxResolution = function (t) { this.set("maxResolution", t); }, Ct.prototype.setMinResolution = function (t) { this.set("minResolution", t); }, Ct.prototype.setOpacity = function (t) { this.set("opacity", t); }, Ct.prototype.setVisible = function (t) { this.set("visible", t); }, Ct.prototype.setZIndex = function (t) { this.set("zIndex", t); }; var Mt = { POSTCOMPOSE: "postcompose", PRECOMPOSE: "precompose", RENDER: "render" }, At = function (t) { var e = o.assign({}, t); delete e.source, Ct.call(this, e), this.mapPrecomposeKey_ = null, this.mapRenderKey_ = null, this.sourceChangeKey_ = null, t.map && this.setMap(t.map), s.listen(this, p.getChangeEventType("source"), this.handleSourcePropertyChange_, this); var n = t.source ? t.source : null; this.setSource(n); }; n.inherits(At, Ct), At.visibleAtResolution = function (t, e) { return t.visible && e >= t.minResolution && e < t.maxResolution; }, At.prototype.getLayersArray = function (t) { var e = t || []; return e.push(this), e; }, At.prototype.getLayerStatesArray = function (t) { var e = t || []; return e.push(this.getLayerState()), e; }, At.prototype.getSource = function () { return this.get("source") || null; }, At.prototype.getSourceState = function () { var t = this.getSource(); return t ? t.getState() : ot.UNDEFINED; }, At.prototype.handleSourceChange_ = function () { this.changed(); }, At.prototype.handleSourcePropertyChange_ = function () { this.sourceChangeKey_ && (s.unlistenByKey(this.sourceChangeKey_), this.sourceChangeKey_ = null); var t = this.getSource(); t && (this.sourceChangeKey_ = s.listen(t, a.CHANGE, this.handleSourceChange_, this)), this.changed(); }, At.prototype.setMap = function (t) { this.mapPrecomposeKey_ && (s.unlistenByKey(this.mapPrecomposeKey_), this.mapPrecomposeKey_ = null), t || this.changed(), this.mapRenderKey_ && (s.unlistenByKey(this.mapRenderKey_), this.mapRenderKey_ = null), t && (this.mapPrecomposeKey_ = s.listen(t, Mt.PRECOMPOSE, function (t) { var e = this.getLayerState(); e.managed = !1, e.zIndex = 1 / 0, t.frameState.layerStatesArray.push(e), t.frameState.layerStates[n.getUid(this)] = e; }, this), this.mapRenderKey_ = s.listen(this, a.CHANGE, t.render, t), this.changed()); }, At.prototype.setSource = function (t) { this.set("source", t); }, t._ol_ = n, t._ol_colorlike_ = X, t._ol_dom_ = U, t._ol_has_ = D, t._ol_ImageState_ = { IDLE: 0, LOADING: 1, LOADED: 2, ERROR: 3 }, t._ol_render_canvas_ = z, t._ol_color_ = w, t._ol_asserts_ = r, t._ol_geom_GeometryType_ = E, t._ol_style_Stroke_ = H, t._ol_events_ = s, t._ol_events_EventType_ = a, t._ol_Object_ = p, t._ol_geom_Geometry_ = I, t._ol_extent_ = d, t._ol_geom_GeometryLayout_ = Z, t._ol_geom_SimpleGeometry_ = W, t._ol_geom_flat_deflate_ = k, t._ol_math_ = v, t._ol_events_EventTarget_ = c, t._ol_style_ = V, t._ol_array_ = $, t._ol_Collection_ = J, t._ol_CollectionEventType_ = q, t._ol_ObjectEventType_ = u, t._ol_events_Event_ = l, t._ol_functions_ = g, t._ol_obj_ = o, t._ol_source_Source_ = st, t._ol_source_State_ = ot, t._ol_structs_RBush_ = Rt, t._ol_LayerType_ = { IMAGE: "IMAGE", TILE: "TILE", VECTOR_TILE: "VECTOR_TILE", VECTOR: "VECTOR" }, t._ol_layer_Layer_ = At, t._ol_layer_VectorRenderType_ = { IMAGE: "image", VECTOR: "vector" }, t._ol_proj_ = L, t._ol_proj_Units_ = T, t._ol_layer_Base_ = Ct, t._ol_size_ = tt, t._ol_transform_ = O, t._ol_css_ = Y, t._ol_Disposable_ = h, t._ol_geom_flat_transform_ = m, t._ol_Observable_ = f, t._ol_render_EventType_ = Mt, t._ol_TileRange_ = Q, t._ol_extent_Relationship_ = _, t._ol_ext_rbush_ = lt, t._ol_webgl_ = F, t._ol_structs_LRUCache_ = G, t._ol_tilecoord_ = et, t._ol_tilegrid_ = it; });
