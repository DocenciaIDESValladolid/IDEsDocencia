/*! Built with http://stenciljs.com */
App.loadBundle("maps.js", ["exports", "./chunk-12ee72ee.js"], function (t, e) { window.App.h; var i = { ASSUME_TOUCH: !1, DEFAULT_MAX_ZOOM: 42, DEFAULT_MIN_ZOOM: 0, DEFAULT_RASTER_REPROJECTION_ERROR_THRESHOLD: .5, DEFAULT_TILE_SIZE: 256, DEFAULT_WMS_VERSION: "1.3.0", ENABLE_CANVAS: !0, ENABLE_PROJ4JS: !0, ENABLE_RASTER_REPROJECTION: !0, ENABLE_WEBGL: !0, DEBUG_WEBGL: !0, INITIAL_ATLAS_SIZE: 256, MAX_ATLAS_SIZE: -1, MOUSEWHEELZOOM_MAXDELTA: 1, OVERVIEWMAP_MAX_RATIO: .75, OVERVIEWMAP_MIN_RATIO: .1, RASTER_REPROJECTION_MAX_SOURCE_TILES: 100, RASTER_REPROJECTION_MAX_SUBDIVISION: 10, RASTER_REPROJECTION_MAX_TRIANGLE_WIDTH: .25, SIMPLIFY_TOLERANCE: .5, WEBGL_TEXTURE_CACHE_HIGH_WATER_MARK: 1024, VERSION: "v4.6.5", inherits: function (t, e) { t.prototype = Object.create(e.prototype), t.prototype.constructor = t; }, nullFunction: function () { }, getUid: function (t) { return t.ol_uid || (t.ol_uid = ++i.uidCounter_); }, uidCounter_: 0 }, n = function (t) { var e = i.VERSION ? i.VERSION.split("-")[0] : "latest"; this.message = "Assertion failed. See https://openlayers.org/en/" + e + "/doc/errors/#" + t + " for details.", this.code = t, this.name = "AssertionError"; }; i.inherits(n, Error); var r = {}; r.assign = "function" == typeof Object.assign ? Object.assign : function (t, e) { if (void 0 === t || null === t)
    throw new TypeError("Cannot convert undefined or null to object"); for (var i = Object(t), n = 1, r = arguments.length; n < r; ++n) {
    var o = arguments[n];
    if (void 0 !== o && null !== o)
        for (var s in o)
            o.hasOwnProperty(s) && (i[s] = o[s]);
} return i; }, r.clear = function (t) { for (var e in t)
    delete t[e]; }, r.getValues = function (t) { var e = []; for (var i in t)
    e.push(t[i]); return e; }, r.isEmpty = function (t) { var e; for (e in t)
    return !1; return !e; }; var o = { bindListener_: function (t) { var e = function (e) { var i = t.listener, n = t.bindTo || t.target; return t.callOnce && o.unlistenByKey(t), i.call(n, e); }; return t.boundListener = e, e; }, findListener_: function (t, e, i, n) { for (var r, o = 0, s = t.length; o < s; ++o)
        if ((r = t[o]).listener === e && r.bindTo === i)
            return n && (r.deleteIndex = o), r; }, getListeners: function (t, e) { var i = t.ol_lm; return i ? i[e] : void 0; }, getListenerMap_: function (t) { var e = t.ol_lm; return e || (e = t.ol_lm = {}), e; }, removeListeners_: function (t, e) { var i = o.getListeners(t, e); if (i) {
        for (var n = 0, s = i.length; n < s; ++n)
            t.removeEventListener(e, i[n].boundListener), r.clear(i[n]);
        i.length = 0;
        var a = t.ol_lm;
        a && (delete a[e], 0 === Object.keys(a).length && delete t.ol_lm);
    } }, listen: function (t, e, i, n, r) { var s = o.getListenerMap_(t), a = s[e]; a || (a = s[e] = []); var h = o.findListener_(a, i, n, !1); return h ? r || (h.callOnce = !1) : (h = { bindTo: n, callOnce: !!r, listener: i, target: t, type: e }, t.addEventListener(e, o.bindListener_(h)), a.push(h)), h; }, listenOnce: function (t, e, i, n) { return o.listen(t, e, i, n, !0); }, unlisten: function (t, e, i, n) { var r = o.getListeners(t, e); if (r) {
        var s = o.findListener_(r, i, n, !0);
        s && o.unlistenByKey(s);
    } }, unlistenByKey: function (t) { if (t && t.target) {
        t.target.removeEventListener(t.type, t.boundListener);
        var e = o.getListeners(t.target, t.type);
        if (e) {
            var i = "deleteIndex" in t ? t.deleteIndex : e.indexOf(t);
            -1 !== i && e.splice(i, 1), 0 === e.length && o.removeListeners_(t.target, t.type);
        }
        r.clear(t);
    } }, unlistenAll: function (t) { var e = o.getListenerMap_(t); for (var i in e)
        o.removeListeners_(t, i); } }, s = function () { }; s.prototype.disposed_ = !1, s.prototype.dispose = function () { this.disposed_ || (this.disposed_ = !0, this.disposeInternal()); }, s.prototype.disposeInternal = i.nullFunction; var a = function (t) { this.propagationStopped, this.type = t, this.target = null; }; a.prototype.preventDefault = a.prototype.stopPropagation = function () { this.propagationStopped = !0; }, a.stopPropagation = function (t) { t.stopPropagation(); }, a.preventDefault = function (t) { t.preventDefault(); }; var h = function () { s.call(this), this.pendingRemovals_ = {}, this.dispatching_ = {}, this.listeners_ = {}; }; i.inherits(h, s), h.prototype.addEventListener = function (t, e) { var i = this.listeners_[t]; i || (i = this.listeners_[t] = []), -1 === i.indexOf(e) && i.push(e); }, h.prototype.dispatchEvent = function (t) { var e = "string" == typeof t ? new a(t) : t, n = e.type; e.target = this; var r, o = this.listeners_[n]; if (o) {
    n in this.dispatching_ || (this.dispatching_[n] = 0, this.pendingRemovals_[n] = 0), ++this.dispatching_[n];
    for (var s = 0, h = o.length; s < h; ++s)
        if (!1 === o[s].call(this, e) || e.propagationStopped) {
            r = !1;
            break;
        }
    if (--this.dispatching_[n], 0 === this.dispatching_[n]) {
        var l = this.pendingRemovals_[n];
        for (delete this.pendingRemovals_[n]; l--;)
            this.removeEventListener(n, i.nullFunction);
        delete this.dispatching_[n];
    }
    return r;
} }, h.prototype.disposeInternal = function () { o.unlistenAll(this); }, h.prototype.getListeners = function (t) { return this.listeners_[t]; }, h.prototype.hasListener = function (t) { return t ? t in this.listeners_ : Object.keys(this.listeners_).length > 0; }, h.prototype.removeEventListener = function (t, e) { var n = this.listeners_[t]; if (n) {
    var r = n.indexOf(e);
    t in this.pendingRemovals_ ? (n[r] = i.nullFunction, ++this.pendingRemovals_[t]) : (n.splice(r, 1), 0 === n.length && delete this.listeners_[t]);
} }; var l = function () { h.call(this), this.revision_ = 0; }; i.inherits(l, h), l.unByKey = function (t) { if (Array.isArray(t))
    for (var e = 0, i = t.length; e < i; ++e)
        o.unlistenByKey(t[e]);
else
    o.unlistenByKey(t); }, l.prototype.changed = function () { ++this.revision_, this.dispatchEvent("change"); }, l.prototype.getRevision = function () { return this.revision_; }, l.prototype.on = function (t, e, i) { if (Array.isArray(t)) {
    for (var n = t.length, r = new Array(n), s = 0; s < n; ++s)
        r[s] = o.listen(this, t[s], e, i);
    return r;
} return o.listen(this, t, e, i); }, l.prototype.once = function (t, e, i) { if (Array.isArray(t)) {
    for (var n = t.length, r = new Array(n), s = 0; s < n; ++s)
        r[s] = o.listenOnce(this, t[s], e, i);
    return r;
} return o.listenOnce(this, t, e, i); }, l.prototype.un = function (t, e, i) { if (Array.isArray(t))
    for (var n = 0, r = t.length; n < r; ++n)
        o.unlisten(this, t[n], e, i);
else
    o.unlisten(this, t, e, i); }; var u = function (t) { l.call(this), i.getUid(this), this.values_ = {}, void 0 !== t && this.setProperties(t); }; i.inherits(u, l), u.changeEventTypeCache_ = {}, u.getChangeEventType = function (t) { return u.changeEventTypeCache_.hasOwnProperty(t) ? u.changeEventTypeCache_[t] : u.changeEventTypeCache_[t] = "change:" + t; }, u.prototype.get = function (t) { var e; return this.values_.hasOwnProperty(t) && (e = this.values_[t]), e; }, u.prototype.getKeys = function () { return Object.keys(this.values_); }, u.prototype.getProperties = function () { return r.assign({}, this.values_); }, u.prototype.notify = function (t, e) { var i; i = u.getChangeEventType(t), this.dispatchEvent(new u.Event(i, t, e)), i = "propertychange", this.dispatchEvent(new u.Event(i, t, e)); }, u.prototype.set = function (t, e, i) { if (i)
    this.values_[t] = e;
else {
    var n = this.values_[t];
    this.values_[t] = e, n !== e && this.notify(t, n);
} }, u.prototype.setProperties = function (t, e) { var i; for (i in t)
    this.set(i, t[i], e); }, u.prototype.unset = function (t, e) { if (t in this.values_) {
    var i = this.values_[t];
    delete this.values_[t], e || this.notify(t, i);
} }, u.Event = function (t, e, i) { a.call(this, t), this.key = e, this.oldValue = i; }, i.inherits(u.Event, a); var c = function (t, e) { u.call(this); var i = e || {}; if (this.unique_ = !!i.unique, this.array_ = t || [], this.unique_)
    for (var n = 0, r = this.array_.length; n < r; ++n)
        this.assertUnique_(this.array_[n], n); this.updateLength_(); }; i.inherits(c, u), c.prototype.clear = function () { for (; this.getLength() > 0;)
    this.pop(); }, c.prototype.extend = function (t) { var e, i; for (e = 0, i = t.length; e < i; ++e)
    this.push(t[e]); return this; }, c.prototype.forEach = function (t, e) { for (var i = e ? t.bind(e) : t, n = this.array_, r = 0, o = n.length; r < o; ++r)
    i(n[r], r, n); }, c.prototype.getArray = function () { return this.array_; }, c.prototype.item = function (t) { return this.array_[t]; }, c.prototype.getLength = function () { return this.get(c.Property_.LENGTH); }, c.prototype.insertAt = function (t, e) { this.unique_ && this.assertUnique_(e), this.array_.splice(t, 0, e), this.updateLength_(), this.dispatchEvent(new c.Event("add", e)); }, c.prototype.pop = function () { return this.removeAt(this.getLength() - 1); }, c.prototype.push = function (t) { this.unique_ && this.assertUnique_(t); var e = this.getLength(); return this.insertAt(e, t), this.getLength(); }, c.prototype.remove = function (t) { var e, i, n = this.array_; for (e = 0, i = n.length; e < i; ++e)
    if (n[e] === t)
        return this.removeAt(e); }, c.prototype.removeAt = function (t) { var e = this.array_[t]; return this.array_.splice(t, 1), this.updateLength_(), this.dispatchEvent(new c.Event("remove", e)), e; }, c.prototype.setAt = function (t, e) { var i = this.getLength(); if (t < i) {
    this.unique_ && this.assertUnique_(e, t);
    var n = this.array_[t];
    this.array_[t] = e, this.dispatchEvent(new c.Event("remove", n)), this.dispatchEvent(new c.Event("add", e));
}
else {
    var r;
    for (r = i; r < t; ++r)
        this.insertAt(r, void 0);
    this.insertAt(t, e);
} }, c.prototype.updateLength_ = function () { this.set(c.Property_.LENGTH, this.array_.length); }, c.prototype.assertUnique_ = function (t, e) { for (var i = 0, r = this.array_.length; i < r; ++i)
    if (this.array_[i] === t && i !== e)
        throw new n(58); }, c.Property_ = { LENGTH: "length" }, c.Event = function (t, e) { a.call(this, t), this.element = e; }, i.inherits(c.Event, a); var d = function (t, e, i) { a.call(this, t), this.map = e, this.frameState = void 0 !== i ? i : null; }; i.inherits(d, a); var p = function (t, e, i, n, r) { d.call(this, t, e, r), this.originalEvent = i, this.pixel = e.getEventPixel(i), this.coordinate = e.getCoordinateFromPixel(this.pixel), this.dragging = void 0 !== n && n; }; i.inherits(p, d), p.prototype.preventDefault = function () { d.prototype.preventDefault.call(this), this.originalEvent.preventDefault(); }, p.prototype.stopPropagation = function () { d.prototype.stopPropagation.call(this), this.originalEvent.stopPropagation(); }; var f = { ONE: 1, SRC_ALPHA: 770, COLOR_ATTACHMENT0: 36064, COLOR_BUFFER_BIT: 16384, TRIANGLES: 4, TRIANGLE_STRIP: 5, ONE_MINUS_SRC_ALPHA: 771, ARRAY_BUFFER: 34962, ELEMENT_ARRAY_BUFFER: 34963, STREAM_DRAW: 35040, STATIC_DRAW: 35044, DYNAMIC_DRAW: 35048, CULL_FACE: 2884, BLEND: 3042, STENCIL_TEST: 2960, DEPTH_TEST: 2929, SCISSOR_TEST: 3089, UNSIGNED_BYTE: 5121, UNSIGNED_SHORT: 5123, UNSIGNED_INT: 5125, FLOAT: 5126, RGBA: 6408, FRAGMENT_SHADER: 35632, VERTEX_SHADER: 35633, LINK_STATUS: 35714, LINEAR: 9729, TEXTURE_MAG_FILTER: 10240, TEXTURE_MIN_FILTER: 10241, TEXTURE_WRAP_S: 10242, TEXTURE_WRAP_T: 10243, TEXTURE_2D: 3553, TEXTURE0: 33984, CLAMP_TO_EDGE: 33071, COMPILE_STATUS: 35713, FRAMEBUFFER: 36160, CONTEXT_IDS_: ["experimental-webgl", "webgl", "webkit-3d", "moz-webgl"], getContext: function (t, e) { var i, n, r = f.CONTEXT_IDS_.length; for (n = 0; n < r; ++n)
        try {
            if (i = t.getContext(f.CONTEXT_IDS_[n], e))
                return i;
        }
        catch (t) { } return null; } }, g = {}, _ = "undefined" != typeof navigator ? navigator.userAgent.toLowerCase() : ""; g.FIREFOX = -1 !== _.indexOf("firefox"), g.SAFARI = -1 !== _.indexOf("safari") && -1 == _.indexOf("chrom"), g.WEBKIT = -1 !== _.indexOf("webkit") && -1 == _.indexOf("edge"), g.MAC = -1 !== _.indexOf("macintosh"), g.DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1, g.CANVAS_LINE_DASH = !1, g.CANVAS = i.ENABLE_CANVAS && function () { if (!("HTMLCanvasElement" in window))
    return !1; try {
    var t = document.createElement("CANVAS").getContext("2d");
    return !!t && (void 0 !== t.setLineDash && (g.CANVAS_LINE_DASH = !0), !0);
}
catch (t) {
    return !1;
} }(), g.DEVICE_ORIENTATION = "DeviceOrientationEvent" in window, g.GEOLOCATION = "geolocation" in navigator, g.TOUCH = i.ASSUME_TOUCH || "ontouchstart" in window, g.POINTER = "PointerEvent" in window, g.MSPOINTER = !!navigator.msPointerEnabled, function () { if (i.ENABLE_WEBGL) {
    var t, e = !1, n = [];
    if ("WebGLRenderingContext" in window)
        try {
            var r = document.createElement("CANVAS"), o = f.getContext(r, { failIfMajorPerformanceCaveat: !0 });
            o && (e = !0, t = o.getParameter(o.MAX_TEXTURE_SIZE), n = o.getSupportedExtensions());
        }
        catch (t) { }
    g.WEBGL = e, i.WEBGL_EXTENSIONS = n, i.WEBGL_MAX_TEXTURE_SIZE = t;
} }(); var v = { SINGLECLICK: "singleclick", CLICK: "click", DBLCLICK: "dblclick", POINTERDRAG: "pointerdrag", POINTERMOVE: "pointermove", POINTERDOWN: "pointerdown", POINTERUP: "pointerup", POINTEROVER: "pointerover", POINTEROUT: "pointerout", POINTERENTER: "pointerenter", POINTERLEAVE: "pointerleave", POINTERCANCEL: "pointercancel" }, y = function (t, e, i, n, r) { p.call(this, t, e, i.originalEvent, n, r), this.pointerEvent = i; }; i.inherits(y, p); var m = function (t, e) { this.dispatcher = t, this.mapping_ = e; }; m.prototype.getEvents = function () { return Object.keys(this.mapping_); }, m.prototype.getHandlerForEvent = function (t) { return this.mapping_[t]; }; var x = function (t) { var e = { mousedown: this.mousedown, mousemove: this.mousemove, mouseup: this.mouseup, mouseover: this.mouseover, mouseout: this.mouseout }; m.call(this, t, e), this.pointerMap = t.pointerMap, this.lastTouches = []; }; i.inherits(x, m), x.POINTER_ID = 1, x.POINTER_TYPE = "mouse", x.DEDUP_DIST = 25, x.prototype.isEventSimulatedFromTouch_ = function (t) { for (var e, i = this.lastTouches, n = t.clientX, r = t.clientY, o = 0, s = i.length; o < s && (e = i[o]); o++) {
    var a = Math.abs(n - e[0]), h = Math.abs(r - e[1]);
    if (a <= x.DEDUP_DIST && h <= x.DEDUP_DIST)
        return !0;
} return !1; }, x.prepareEvent = function (t, e) { var i = e.cloneEvent(t, t), n = i.preventDefault; return i.preventDefault = function () { t.preventDefault(), n(); }, i.pointerId = x.POINTER_ID, i.isPrimary = !0, i.pointerType = x.POINTER_TYPE, i; }, x.prototype.mousedown = function (t) { if (!this.isEventSimulatedFromTouch_(t)) {
    x.POINTER_ID.toString() in this.pointerMap && this.cancel(t);
    var e = x.prepareEvent(t, this.dispatcher);
    this.pointerMap[x.POINTER_ID.toString()] = t, this.dispatcher.down(e, t);
} }, x.prototype.mousemove = function (t) { if (!this.isEventSimulatedFromTouch_(t)) {
    var e = x.prepareEvent(t, this.dispatcher);
    this.dispatcher.move(e, t);
} }, x.prototype.mouseup = function (t) { if (!this.isEventSimulatedFromTouch_(t)) {
    var e = this.pointerMap[x.POINTER_ID.toString()];
    if (e && e.button === t.button) {
        var i = x.prepareEvent(t, this.dispatcher);
        this.dispatcher.up(i, t), this.cleanupMouse();
    }
} }, x.prototype.mouseover = function (t) { if (!this.isEventSimulatedFromTouch_(t)) {
    var e = x.prepareEvent(t, this.dispatcher);
    this.dispatcher.enterOver(e, t);
} }, x.prototype.mouseout = function (t) { if (!this.isEventSimulatedFromTouch_(t)) {
    var e = x.prepareEvent(t, this.dispatcher);
    this.dispatcher.leaveOut(e, t);
} }, x.prototype.cancel = function (t) { var e = x.prepareEvent(t, this.dispatcher); this.dispatcher.cancel(e, t), this.cleanupMouse(); }, x.prototype.cleanupMouse = function () { delete this.pointerMap[x.POINTER_ID.toString()]; }; var E = function (t) { var e = { MSPointerDown: this.msPointerDown, MSPointerMove: this.msPointerMove, MSPointerUp: this.msPointerUp, MSPointerOut: this.msPointerOut, MSPointerOver: this.msPointerOver, MSPointerCancel: this.msPointerCancel, MSGotPointerCapture: this.msGotPointerCapture, MSLostPointerCapture: this.msLostPointerCapture }; m.call(this, t, e), this.pointerMap = t.pointerMap, this.POINTER_TYPES = ["", "unavailable", "touch", "pen", "mouse"]; }; i.inherits(E, m), E.prototype.prepareEvent_ = function (t) { var e = t; return "number" == typeof t.pointerType && ((e = this.dispatcher.cloneEvent(t, t)).pointerType = this.POINTER_TYPES[t.pointerType]), e; }, E.prototype.cleanup = function (t) { delete this.pointerMap[t.toString()]; }, E.prototype.msPointerDown = function (t) { this.pointerMap[t.pointerId.toString()] = t; var e = this.prepareEvent_(t); this.dispatcher.down(e, t); }, E.prototype.msPointerMove = function (t) { var e = this.prepareEvent_(t); this.dispatcher.move(e, t); }, E.prototype.msPointerUp = function (t) { var e = this.prepareEvent_(t); this.dispatcher.up(e, t), this.cleanup(t.pointerId); }, E.prototype.msPointerOut = function (t) { var e = this.prepareEvent_(t); this.dispatcher.leaveOut(e, t); }, E.prototype.msPointerOver = function (t) { var e = this.prepareEvent_(t); this.dispatcher.enterOver(e, t); }, E.prototype.msPointerCancel = function (t) { var e = this.prepareEvent_(t); this.dispatcher.cancel(e, t), this.cleanup(t.pointerId); }, E.prototype.msLostPointerCapture = function (t) { var e = this.dispatcher.makeEvent("lostpointercapture", t, t); this.dispatcher.dispatchEvent(e); }, E.prototype.msGotPointerCapture = function (t) { var e = this.dispatcher.makeEvent("gotpointercapture", t, t); this.dispatcher.dispatchEvent(e); }; var T = function (t) { var e = { pointerdown: this.pointerDown, pointermove: this.pointerMove, pointerup: this.pointerUp, pointerout: this.pointerOut, pointerover: this.pointerOver, pointercancel: this.pointerCancel, gotpointercapture: this.gotPointerCapture, lostpointercapture: this.lostPointerCapture }; m.call(this, t, e); }; i.inherits(T, m), T.prototype.pointerDown = function (t) { this.dispatcher.fireNativeEvent(t); }, T.prototype.pointerMove = function (t) { this.dispatcher.fireNativeEvent(t); }, T.prototype.pointerUp = function (t) { this.dispatcher.fireNativeEvent(t); }, T.prototype.pointerOut = function (t) { this.dispatcher.fireNativeEvent(t); }, T.prototype.pointerOver = function (t) { this.dispatcher.fireNativeEvent(t); }, T.prototype.pointerCancel = function (t) { this.dispatcher.fireNativeEvent(t); }, T.prototype.lostPointerCapture = function (t) { this.dispatcher.fireNativeEvent(t); }, T.prototype.gotPointerCapture = function (t) { this.dispatcher.fireNativeEvent(t); }; var C = function (t, e, i) { a.call(this, t), this.originalEvent = e; var n = i || {}; this.buttons = this.getButtons_(n), this.pressure = this.getPressure_(n, this.buttons), this.bubbles = "bubbles" in n && n.bubbles, this.cancelable = "cancelable" in n && n.cancelable, this.view = "view" in n ? n.view : null, this.detail = "detail" in n ? n.detail : null, this.screenX = "screenX" in n ? n.screenX : 0, this.screenY = "screenY" in n ? n.screenY : 0, this.clientX = "clientX" in n ? n.clientX : 0, this.clientY = "clientY" in n ? n.clientY : 0, this.ctrlKey = "ctrlKey" in n && n.ctrlKey, this.altKey = "altKey" in n && n.altKey, this.shiftKey = "shiftKey" in n && n.shiftKey, this.metaKey = "metaKey" in n && n.metaKey, this.button = "button" in n ? n.button : 0, this.relatedTarget = "relatedTarget" in n ? n.relatedTarget : null, this.pointerId = "pointerId" in n ? n.pointerId : 0, this.width = "width" in n ? n.width : 0, this.height = "height" in n ? n.height : 0, this.tiltX = "tiltX" in n ? n.tiltX : 0, this.tiltY = "tiltY" in n ? n.tiltY : 0, this.pointerType = "pointerType" in n ? n.pointerType : "", this.hwTimestamp = "hwTimestamp" in n ? n.hwTimestamp : 0, this.isPrimary = "isPrimary" in n && n.isPrimary, e.preventDefault && (this.preventDefault = function () { e.preventDefault(); }); }; i.inherits(C, a), C.prototype.getButtons_ = function (t) { var e; if (t.buttons || C.HAS_BUTTONS)
    e = t.buttons;
else
    switch (t.which) {
        case 1:
            e = 1;
            break;
        case 2:
            e = 4;
            break;
        case 3:
            e = 2;
            break;
        default: e = 0;
    } return e; }, C.prototype.getPressure_ = function (t, e) { return t.pressure ? t.pressure : e ? .5 : 0; }, C.HAS_BUTTONS = !1, function () { try {
    var t = new MouseEvent("click", { buttons: 1 });
    C.HAS_BUTTONS = 1 === t.buttons;
}
catch (t) { } }(); var S = { binarySearch: function (t, e, i) { for (var n, r, o = i || S.numberSafeCompareFunction, s = 0, a = t.length, h = !1; s < a;)
        (r = +o(t[n = s + (a - s >> 1)], e)) < 0 ? s = n + 1 : (a = n, h = !r); return h ? s : ~s; }, numberSafeCompareFunction: function (t, e) { return t > e ? 1 : t < e ? -1 : 0; }, includes: function (t, e) { return t.indexOf(e) >= 0; }, linearFindNearest: function (t, e, i) { var n, r = t.length; if (t[0] <= e)
        return 0; if (e <= t[r - 1])
        return r - 1; if (i > 0) {
        for (n = 1; n < r; ++n)
            if (t[n] < e)
                return n - 1;
    }
    else if (i < 0) {
        for (n = 1; n < r; ++n)
            if (t[n] <= e)
                return n;
    }
    else
        for (n = 1; n < r; ++n) {
            if (t[n] == e)
                return n;
            if (t[n] < e)
                return t[n - 1] - e < e - t[n] ? n - 1 : n;
        } return r - 1; }, reverseSubArray: function (t, e, i) { for (; e < i;) {
        var n = t[e];
        t[e] = t[i], t[i] = n, ++e, --i;
    } }, extend: function (t, e) { var i, n = Array.isArray(e) ? e : [e], r = n.length; for (i = 0; i < r; i++)
        t[t.length] = n[i]; }, remove: function (t, e) { var i = t.indexOf(e), n = i > -1; return n && t.splice(i, 1), n; }, find: function (t, e) { for (var i, n = t.length >>> 0, r = 0; r < n; r++)
        if (e(i = t[r], r, t))
            return i; return null; }, equals: function (t, e) { var i = t.length; if (i !== e.length)
        return !1; for (var n = 0; n < i; n++)
        if (t[n] !== e[n])
            return !1; return !0; }, stableSort: function (t, e) { var i, n = t.length, r = Array(t.length); for (i = 0; i < n; i++)
        r[i] = { index: i, value: t[i] }; for (r.sort(function (t, i) { return e(t.value, i.value) || t.index - i.index; }), i = 0; i < t.length; i++)
        t[i] = r[i].value; }, findIndex: function (t, e) { var i; return t.every(function (n, r) { return i = r, !e(n, r, t); }) ? -1 : i; }, isSorted: function (t, e, i) { var n = e || S.numberSafeCompareFunction; return t.every(function (e, r) { if (0 === r)
        return !0; var o = n(t[r - 1], e); return !(o > 0 || i && 0 === o); }); } }, R = function (t, e) { var i = { touchstart: this.touchstart, touchmove: this.touchmove, touchend: this.touchend, touchcancel: this.touchcancel }; m.call(this, t, i), this.pointerMap = t.pointerMap, this.mouseSource = e, this.firstTouchId_ = void 0, this.clickCount_ = 0, this.resetId_ = void 0; }; i.inherits(R, m), R.DEDUP_TIMEOUT = 2500, R.CLICK_COUNT_TIMEOUT = 200, R.POINTER_TYPE = "touch", R.prototype.isPrimaryTouch_ = function (t) { return this.firstTouchId_ === t.identifier; }, R.prototype.setPrimaryTouch_ = function (t) { var e = Object.keys(this.pointerMap).length; (0 === e || 1 === e && x.POINTER_ID.toString() in this.pointerMap) && (this.firstTouchId_ = t.identifier, this.cancelResetClickCount_()); }, R.prototype.removePrimaryPointer_ = function (t) { t.isPrimary && (this.firstTouchId_ = void 0, this.resetClickCount_()); }, R.prototype.resetClickCount_ = function () { this.resetId_ = setTimeout(this.resetClickCountHandler_.bind(this), R.CLICK_COUNT_TIMEOUT); }, R.prototype.resetClickCountHandler_ = function () { this.clickCount_ = 0, this.resetId_ = void 0; }, R.prototype.cancelResetClickCount_ = function () { void 0 !== this.resetId_ && clearTimeout(this.resetId_); }, R.prototype.touchToPointer_ = function (t, e) { var i = this.dispatcher.cloneEvent(t, e); return i.pointerId = e.identifier + 2, i.bubbles = !0, i.cancelable = !0, i.detail = this.clickCount_, i.button = 0, i.buttons = 1, i.width = e.webkitRadiusX || e.radiusX || 0, i.height = e.webkitRadiusY || e.radiusY || 0, i.pressure = e.webkitForce || e.force || .5, i.isPrimary = this.isPrimaryTouch_(e), i.pointerType = R.POINTER_TYPE, i.clientX = e.clientX, i.clientY = e.clientY, i.screenX = e.screenX, i.screenY = e.screenY, i; }, R.prototype.processTouches_ = function (t, e) { var i, n, r = Array.prototype.slice.call(t.changedTouches), o = r.length; function s() { t.preventDefault(); } for (i = 0; i < o; ++i)
    (n = this.touchToPointer_(t, r[i])).preventDefault = s, e.call(this, t, n); }, R.prototype.findTouch_ = function (t, e) { for (var i = t.length, n = 0; n < i; n++)
    if (t[n].identifier === e)
        return !0; return !1; }, R.prototype.vacuumTouches_ = function (t) { var e = t.touches, i = Object.keys(this.pointerMap), n = i.length; if (n >= e.length) {
    var r, o, s, a = [];
    for (r = 0; r < n; ++r)
        o = i[r], s = this.pointerMap[o], o == x.POINTER_ID || this.findTouch_(e, o - 2) || a.push(s.out);
    for (r = 0; r < a.length; ++r)
        this.cancelOut_(t, a[r]);
} }, R.prototype.touchstart = function (t) { this.vacuumTouches_(t), this.setPrimaryTouch_(t.changedTouches[0]), this.dedupSynthMouse_(t), this.clickCount_++, this.processTouches_(t, this.overDown_); }, R.prototype.overDown_ = function (t, e) { this.pointerMap[e.pointerId] = { target: e.target, out: e, outTarget: e.target }, this.dispatcher.over(e, t), this.dispatcher.enter(e, t), this.dispatcher.down(e, t); }, R.prototype.touchmove = function (t) { t.preventDefault(), this.processTouches_(t, this.moveOverOut_); }, R.prototype.moveOverOut_ = function (t, e) { var i = e, n = this.pointerMap[i.pointerId]; if (n) {
    var r = n.out, o = n.outTarget;
    this.dispatcher.move(i, t), r && o !== i.target && (r.relatedTarget = i.target, i.relatedTarget = o, r.target = o, i.target ? (this.dispatcher.leaveOut(r, t), this.dispatcher.enterOver(i, t)) : (i.target = o, i.relatedTarget = null, this.cancelOut_(t, i))), n.out = i, n.outTarget = i.target;
} }, R.prototype.touchend = function (t) { this.dedupSynthMouse_(t), this.processTouches_(t, this.upOut_); }, R.prototype.upOut_ = function (t, e) { this.dispatcher.up(e, t), this.dispatcher.out(e, t), this.dispatcher.leave(e, t), this.cleanUpPointer_(e); }, R.prototype.touchcancel = function (t) { this.processTouches_(t, this.cancelOut_); }, R.prototype.cancelOut_ = function (t, e) { this.dispatcher.cancel(e, t), this.dispatcher.out(e, t), this.dispatcher.leave(e, t), this.cleanUpPointer_(e); }, R.prototype.cleanUpPointer_ = function (t) { delete this.pointerMap[t.pointerId], this.removePrimaryPointer_(t); }, R.prototype.dedupSynthMouse_ = function (t) { var e = this.mouseSource.lastTouches, i = t.changedTouches[0]; if (this.isPrimaryTouch_(i)) {
    var n = [i.clientX, i.clientY];
    e.push(n), setTimeout(function () { S.remove(e, n); }, R.DEDUP_TIMEOUT);
} }; var I = function (t) { h.call(this), this.element_ = t, this.pointerMap = {}, this.eventMap_ = {}, this.eventSourceList_ = [], this.registerSources(); }; i.inherits(I, h), I.prototype.registerSources = function () { if (g.POINTER)
    this.registerSource("native", new T(this));
else if (g.MSPOINTER)
    this.registerSource("ms", new E(this));
else {
    var t = new x(this);
    this.registerSource("mouse", t), g.TOUCH && this.registerSource("touch", new R(this, t));
} this.register_(); }, I.prototype.registerSource = function (t, e) { var i = e, n = i.getEvents(); n && (n.forEach(function (t) { var e = i.getHandlerForEvent(t); e && (this.eventMap_[t] = e.bind(i)); }, this), this.eventSourceList_.push(i)); }, I.prototype.register_ = function () { for (var t, e = this.eventSourceList_.length, i = 0; i < e; i++)
    t = this.eventSourceList_[i], this.addEvents_(t.getEvents()); }, I.prototype.unregister_ = function () { for (var t, e = this.eventSourceList_.length, i = 0; i < e; i++)
    t = this.eventSourceList_[i], this.removeEvents_(t.getEvents()); }, I.prototype.eventHandler_ = function (t) { var e = t.type, i = this.eventMap_[e]; i && i(t); }, I.prototype.addEvents_ = function (t) { t.forEach(function (t) { o.listen(this.element_, t, this.eventHandler_, this); }, this); }, I.prototype.removeEvents_ = function (t) { t.forEach(function (t) { o.unlisten(this.element_, t, this.eventHandler_, this); }, this); }, I.prototype.cloneEvent = function (t, e) { for (var i, n = {}, r = 0, o = I.CLONE_PROPS.length; r < o; r++)
    n[i = I.CLONE_PROPS[r][0]] = t[i] || e[i] || I.CLONE_PROPS[r][1]; return n; }, I.prototype.down = function (t, e) { this.fireEvent("pointerdown", t, e); }, I.prototype.move = function (t, e) { this.fireEvent("pointermove", t, e); }, I.prototype.up = function (t, e) { this.fireEvent("pointerup", t, e); }, I.prototype.enter = function (t, e) { t.bubbles = !1, this.fireEvent("pointerenter", t, e); }, I.prototype.leave = function (t, e) { t.bubbles = !1, this.fireEvent("pointerleave", t, e); }, I.prototype.over = function (t, e) { t.bubbles = !0, this.fireEvent("pointerover", t, e); }, I.prototype.out = function (t, e) { t.bubbles = !0, this.fireEvent("pointerout", t, e); }, I.prototype.cancel = function (t, e) { this.fireEvent("pointercancel", t, e); }, I.prototype.leaveOut = function (t, e) { this.out(t, e), this.contains_(t.target, t.relatedTarget) || this.leave(t, e); }, I.prototype.enterOver = function (t, e) { this.over(t, e), this.contains_(t.target, t.relatedTarget) || this.enter(t, e); }, I.prototype.contains_ = function (t, e) { return !(!t || !e) && t.contains(e); }, I.prototype.makeEvent = function (t, e, i) { return new C(t, i, e); }, I.prototype.fireEvent = function (t, e, i) { var n = this.makeEvent(t, e, i); this.dispatchEvent(n); }, I.prototype.fireNativeEvent = function (t) { var e = this.makeEvent(t.type, t, t); this.dispatchEvent(e); }, I.prototype.wrapMouseEvent = function (t, e) { return this.makeEvent(t, x.prepareEvent(e, this), e); }, I.prototype.disposeInternal = function () { this.unregister_(), h.prototype.disposeInternal.call(this); }, I.CLONE_PROPS = [["bubbles", !1], ["cancelable", !1], ["view", null], ["detail", null], ["screenX", 0], ["screenY", 0], ["clientX", 0], ["clientY", 0], ["ctrlKey", !1], ["altKey", !1], ["shiftKey", !1], ["metaKey", !1], ["button", 0], ["relatedTarget", null], ["buttons", 0], ["pointerId", 0], ["width", 0], ["height", 0], ["pressure", 0], ["tiltX", 0], ["tiltY", 0], ["pointerType", ""], ["hwTimestamp", 0], ["isPrimary", !1], ["type", ""], ["target", null], ["currentTarget", null], ["which", 0]]; var L = function (t, e) { h.call(this), this.map_ = t, this.clickTimeoutId_ = 0, this.dragging_ = !1, this.dragListenerKeys_ = [], this.moveTolerance_ = e ? e * g.DEVICE_PIXEL_RATIO : g.DEVICE_PIXEL_RATIO, this.down_ = null; var i = this.map_.getViewport(); this.activePointers_ = 0, this.trackedTouches_ = {}, this.pointerEventHandler_ = new I(i), this.documentPointerEventHandler_ = null, this.pointerdownListenerKey_ = o.listen(this.pointerEventHandler_, "pointerdown", this.handlePointerDown_, this), this.relayedListenerKey_ = o.listen(this.pointerEventHandler_, "pointermove", this.relayEvent_, this); }; i.inherits(L, h), L.prototype.emulateClick_ = function (t) { var e = new y(v.CLICK, this.map_, t); this.dispatchEvent(e), 0 !== this.clickTimeoutId_ ? (clearTimeout(this.clickTimeoutId_), this.clickTimeoutId_ = 0, e = new y(v.DBLCLICK, this.map_, t), this.dispatchEvent(e)) : this.clickTimeoutId_ = setTimeout(function () { this.clickTimeoutId_ = 0; var e = new y(v.SINGLECLICK, this.map_, t); this.dispatchEvent(e); }.bind(this), 250); }, L.prototype.updateActivePointers_ = function (t) { var e = t; e.type == v.POINTERUP || e.type == v.POINTERCANCEL ? delete this.trackedTouches_[e.pointerId] : e.type == v.POINTERDOWN && (this.trackedTouches_[e.pointerId] = !0), this.activePointers_ = Object.keys(this.trackedTouches_).length; }, L.prototype.handlePointerUp_ = function (t) { this.updateActivePointers_(t); var e = new y(v.POINTERUP, this.map_, t); this.dispatchEvent(e), e.propagationStopped || this.dragging_ || !this.isMouseActionButton_(t) || this.emulateClick_(this.down_), 0 === this.activePointers_ && (this.dragListenerKeys_.forEach(o.unlistenByKey), this.dragListenerKeys_.length = 0, this.dragging_ = !1, this.down_ = null, this.documentPointerEventHandler_.dispose(), this.documentPointerEventHandler_ = null); }, L.prototype.isMouseActionButton_ = function (t) { return 0 === t.button; }, L.prototype.handlePointerDown_ = function (t) { this.updateActivePointers_(t); var e = new y(v.POINTERDOWN, this.map_, t); this.dispatchEvent(e), this.down_ = t, 0 === this.dragListenerKeys_.length && (this.documentPointerEventHandler_ = new I(document), this.dragListenerKeys_.push(o.listen(this.documentPointerEventHandler_, v.POINTERMOVE, this.handlePointerMove_, this), o.listen(this.documentPointerEventHandler_, v.POINTERUP, this.handlePointerUp_, this), o.listen(this.pointerEventHandler_, v.POINTERCANCEL, this.handlePointerUp_, this))); }, L.prototype.handlePointerMove_ = function (t) { if (this.isMoving_(t)) {
    this.dragging_ = !0;
    var e = new y(v.POINTERDRAG, this.map_, t, this.dragging_);
    this.dispatchEvent(e);
} t.preventDefault(); }, L.prototype.relayEvent_ = function (t) { var e = !(!this.down_ || !this.isMoving_(t)); this.dispatchEvent(new y(t.type, this.map_, t, e)); }, L.prototype.isMoving_ = function (t) { return Math.abs(t.clientX - this.down_.clientX) > this.moveTolerance_ || Math.abs(t.clientY - this.down_.clientY) > this.moveTolerance_; }, L.prototype.disposeInternal = function () { this.relayedListenerKey_ && (o.unlistenByKey(this.relayedListenerKey_), this.relayedListenerKey_ = null), this.pointerdownListenerKey_ && (o.unlistenByKey(this.pointerdownListenerKey_), this.pointerdownListenerKey_ = null), this.dragListenerKeys_.forEach(o.unlistenByKey), this.dragListenerKeys_.length = 0, this.documentPointerEventHandler_ && (this.documentPointerEventHandler_.dispose(), this.documentPointerEventHandler_ = null), this.pointerEventHandler_ && (this.pointerEventHandler_.dispose(), this.pointerEventHandler_ = null), h.prototype.disposeInternal.call(this); }; var w = function (t, e) { if (!t)
    throw new n(e); }, A = function (t, e) { this.priorityFunction_ = t, this.keyFunction_ = e, this.elements_ = [], this.priorities_ = [], this.queuedElements_ = {}; }; A.DROP = 1 / 0, A.prototype.clear = function () { this.elements_.length = 0, this.priorities_.length = 0, r.clear(this.queuedElements_); }, A.prototype.dequeue = function () { var t = this.elements_, e = this.priorities_, i = t[0]; 1 == t.length ? (t.length = 0, e.length = 0) : (t[0] = t.pop(), e[0] = e.pop(), this.siftUp_(0)); var n = this.keyFunction_(i); return delete this.queuedElements_[n], i; }, A.prototype.enqueue = function (t) { w(!(this.keyFunction_(t) in this.queuedElements_), 31); var e = this.priorityFunction_(t); return e != A.DROP && (this.elements_.push(t), this.priorities_.push(e), this.queuedElements_[this.keyFunction_(t)] = !0, this.siftDown_(0, this.elements_.length - 1), !0); }, A.prototype.getCount = function () { return this.elements_.length; }, A.prototype.getLeftChildIndex_ = function (t) { return 2 * t + 1; }, A.prototype.getRightChildIndex_ = function (t) { return 2 * t + 2; }, A.prototype.getParentIndex_ = function (t) { return t - 1 >> 1; }, A.prototype.heapify_ = function () { var t; for (t = (this.elements_.length >> 1) - 1; t >= 0; t--)
    this.siftUp_(t); }, A.prototype.isEmpty = function () { return 0 === this.elements_.length; }, A.prototype.isKeyQueued = function (t) { return t in this.queuedElements_; }, A.prototype.isQueued = function (t) { return this.isKeyQueued(this.keyFunction_(t)); }, A.prototype.siftUp_ = function (t) { for (var e = this.elements_, i = this.priorities_, n = e.length, r = e[t], o = i[t], s = t; t < n >> 1;) {
    var a = this.getLeftChildIndex_(t), h = this.getRightChildIndex_(t), l = h < n && i[h] < i[a] ? h : a;
    e[t] = e[l], i[t] = i[l], t = l;
} e[t] = r, i[t] = o, this.siftDown_(s, t); }, A.prototype.siftDown_ = function (t, e) { for (var i = this.elements_, n = this.priorities_, r = i[e], o = n[e]; e > t;) {
    var s = this.getParentIndex_(e);
    if (!(n[s] > o))
        break;
    i[e] = i[s], n[e] = n[s], e = s;
} i[e] = r, n[e] = o; }, A.prototype.reprioritize = function () { var t, e, i, n = this.priorityFunction_, r = this.elements_, o = this.priorities_, s = 0, a = r.length; for (e = 0; e < a; ++e)
    (i = n(t = r[e])) == A.DROP ? delete this.queuedElements_[this.keyFunction_(t)] : (o[s] = i, r[s++] = t); r.length = s, o.length = s, this.heapify_(); }; var P = function (t, e) { A.call(this, function (e) { return t.apply(null, e); }, function (t) { return t[0].getKey(); }), this.tileChangeCallback_ = e, this.tilesLoading_ = 0, this.tilesLoadingKeys_ = {}; }; i.inherits(P, A), P.prototype.enqueue = function (t) { var e = A.prototype.enqueue.call(this, t); if (e) {
    var i = t[0];
    o.listen(i, "change", this.handleTileChange, this);
} return e; }, P.prototype.getTilesLoading = function () { return this.tilesLoading_; }, P.prototype.handleTileChange = function (t) { var e = t.target, i = e.getState(); if (2 === i || 3 === i || 4 === i || 5 === i) {
    o.unlisten(e, "change", this.handleTileChange, this);
    var n = e.getKey();
    n in this.tilesLoadingKeys_ && (delete this.tilesLoadingKeys_[n], --this.tilesLoading_), this.tileChangeCallback_();
} }, P.prototype.loadMoreTiles = function (t, e) { for (var i, n, r, o = 0, s = !1; this.tilesLoading_ < t && o < e && this.getCount() > 0;)
    r = (n = this.dequeue()[0]).getKey(), 5 === (i = n.getState()) ? s = !0 : 0 !== i || r in this.tilesLoadingKeys_ || (this.tilesLoadingKeys_[r] = !0, ++this.tilesLoading_, ++o, n.load()); 0 === o && s && this.tileChangeCallback_(); }; var F = { clamp: function (t, e, i) { return Math.min(Math.max(t, e), i); } }; F.cosh = "cosh" in Math ? Math.cosh : function (t) { var e = Math.exp(t); return (e + 1 / e) / 2; }, F.roundUpToPowerOfTwo = function (t) { return w(0 < t, 29), Math.pow(2, Math.ceil(Math.log(t) / Math.LN2)); }, F.squaredSegmentDistance = function (t, e, i, n, r, o) { var s = r - i, a = o - n; if (0 !== s || 0 !== a) {
    var h = ((t - i) * s + (e - n) * a) / (s * s + a * a);
    h > 1 ? (i = r, n = o) : h > 0 && (i += s * h, n += a * h);
} return F.squaredDistance(t, e, i, n); }, F.squaredDistance = function (t, e, i, n) { var r = i - t, o = n - e; return r * r + o * o; }, F.solveLinearSystem = function (t) { for (var e = t.length, i = 0; i < e; i++) {
    for (var n = i, r = Math.abs(t[i][i]), o = i + 1; o < e; o++) {
        var s = Math.abs(t[o][i]);
        s > r && (r = s, n = o);
    }
    if (0 === r)
        return null;
    var a = t[n];
    t[n] = t[i], t[i] = a;
    for (var h = i + 1; h < e; h++)
        for (var l = -t[h][i] / t[i][i], u = i; u < e + 1; u++)
            i == u ? t[h][u] = 0 : t[h][u] += l * t[i][u];
} for (var c = new Array(e), d = e - 1; d >= 0; d--) {
    c[d] = t[d][e] / t[d][d];
    for (var p = d - 1; p >= 0; p--)
        t[p][e] -= t[p][d] * c[d];
} return c; }, F.toDegrees = function (t) { return 180 * t / Math.PI; }, F.toRadians = function (t) { return t * Math.PI / 180; }, F.modulo = function (t, e) { var i = t % e; return i * e < 0 ? i + e : i; }, F.lerp = function (t, e, i) { return t + i * (e - t); }; var M = { createExtent: function (t) { return function (e) { return e ? [F.clamp(e[0], t[0], t[2]), F.clamp(e[1], t[1], t[3])] : void 0; }; }, none: function (t) { return t; } }, b = function (t) { return function (e, i, n) { if (void 0 !== e) {
    var r = S.linearFindNearest(t, e, n);
    r = F.clamp(r + i, 0, t.length - 1);
    var o = Math.floor(r);
    if (r != o && o < t.length - 1) {
        var s = t[o] / t[o + 1];
        return t[o] / Math.pow(s, r - o);
    }
    return t[o];
} }; }, D = function (t, e, i) { return function (n, r, o) { if (void 0 !== n) {
    var s = -o / 2 + .5, a = Math.floor(Math.log(e / n) / Math.log(t) + s), h = Math.max(a + r, 0);
    return void 0 !== i && (h = Math.min(h, i)), e / Math.pow(t, h);
} }; }, O = { disable: function (t, e) { return void 0 !== t ? 0 : void 0; }, none: function (t, e) { return void 0 !== t ? t + e : void 0; }, createSnapToN: function (t) { var e = 2 * Math.PI / t; return function (t, i) { return void 0 !== t ? t = Math.floor((t + i) / e + .5) * e : void 0; }; }, createSnapToZero: function (t) { var e = t || F.toRadians(5); return function (t, i) { return void 0 !== t ? Math.abs(t + i) <= e ? 0 : t + i : void 0; }; } }, k = function (t, e, i) { var n = void 0 !== i ? t.toFixed(i) : "" + t, r = n.indexOf("."); return (r = -1 === r ? n.length : r) > e ? n : new Array(1 + e - r).join("0") + n; }, G = { add: function (t, e) { return t[0] += e[0], t[1] += e[1], t; }, closestOnCircle: function (t, e) { var i = e.getRadius(), n = e.getCenter(), r = n[0], o = n[1], s = t[0] - r, a = t[1] - o; 0 === s && 0 === a && (s = 1); var h = Math.sqrt(s * s + a * a); return [r + i * s / h, o + i * a / h]; }, closestOnSegment: function (t, e) { var i, n, r = t[0], o = t[1], s = e[0], a = e[1], h = s[0], l = s[1], u = a[0], c = a[1], d = u - h, p = c - l, f = 0 === d && 0 === p ? 0 : (d * (r - h) + p * (o - l)) / (d * d + p * p || 0); return f <= 0 ? (i = h, n = l) : f >= 1 ? (i = u, n = c) : (i = h + f * d, n = l + f * p), [i, n]; }, createStringXY: function (t) { return function (e) { return G.toStringXY(e, t); }; }, degreesToStringHDMS: function (t, e, i) { var n = F.modulo(e + 180, 360) - 180, r = Math.abs(3600 * n), o = i || 0, s = Math.pow(10, o), a = Math.floor(r / 3600), h = Math.floor((r - 3600 * a) / 60), l = r - 3600 * a - 60 * h; return (l = Math.ceil(l * s) / s) >= 60 && (l = 0, h += 1), h >= 60 && (h = 0, a += 1), a + "° " + k(h, 2) + "′ " + k(l, 2, o) + "″" + (0 == n ? "" : " " + t.charAt(n < 0 ? 1 : 0)); }, format: function (t, e, i) { return t ? e.replace("{x}", t[0].toFixed(i)).replace("{y}", t[1].toFixed(i)) : ""; }, equals: function (t, e) { for (var i = !0, n = t.length - 1; n >= 0; --n)
        if (t[n] != e[n]) {
            i = !1;
            break;
        } return i; }, rotate: function (t, e) { var i = Math.cos(e), n = Math.sin(e), r = t[0] * i - t[1] * n, o = t[1] * i + t[0] * n; return t[0] = r, t[1] = o, t; }, scale: function (t, e) { return t[0] *= e, t[1] *= e, t; }, sub: function (t, e) { return t[0] -= e[0], t[1] -= e[1], t; }, squaredDistance: function (t, e) { var i = t[0] - e[0], n = t[1] - e[1]; return i * i + n * n; }, distance: function (t, e) { return Math.sqrt(G.squaredDistance(t, e)); }, squaredDistanceToSegment: function (t, e) { return G.squaredDistance(t, G.closestOnSegment(t, e)); }, toStringHDMS: function (t, e) { return t ? G.degreesToStringHDMS("NS", t[1], e) + " " + G.degreesToStringHDMS("EW", t[0], e) : ""; }, toStringXY: function (t, e) { return G.format(t, "{x}, {y}", e); } }, U = { easeIn: function (t) { return Math.pow(t, 3); }, easeOut: function (t) { return 1 - U.easeIn(1 - t); }, inAndOut: function (t) { return 3 * t * t - 2 * t * t * t; }, linear: function (t) { return t; }, upAndDown: function (t) { return t < .5 ? U.inAndOut(2 * t) : 1 - U.inAndOut(2 * (t - .5)); } }, B = { boundingExtent: function (t) { for (var e = B.createEmpty(), i = 0, n = t.length; i < n; ++i)
        B.extendCoordinate(e, t[i]); return e; }, boundingExtentXYs_: function (t, e, i) { var n = Math.min.apply(null, t), r = Math.min.apply(null, e), o = Math.max.apply(null, t), s = Math.max.apply(null, e); return B.createOrUpdate(n, r, o, s, i); }, buffer: function (t, e, i) { return i ? (i[0] = t[0] - e, i[1] = t[1] - e, i[2] = t[2] + e, i[3] = t[3] + e, i) : [t[0] - e, t[1] - e, t[2] + e, t[3] + e]; }, clone: function (t, e) { return e ? (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e) : t.slice(); }, closestSquaredDistanceXY: function (t, e, i) { var n, r; return (n = e < t[0] ? t[0] - e : t[2] < e ? e - t[2] : 0) * n + (r = i < t[1] ? t[1] - i : t[3] < i ? i - t[3] : 0) * r; }, containsCoordinate: function (t, e) { return B.containsXY(t, e[0], e[1]); }, containsExtent: function (t, e) { return t[0] <= e[0] && e[2] <= t[2] && t[1] <= e[1] && e[3] <= t[3]; }, containsXY: function (t, e, i) { return t[0] <= e && e <= t[2] && t[1] <= i && i <= t[3]; }, coordinateRelationship: function (t, e) { var i = t[0], n = t[1], r = t[2], o = t[3], s = e[0], a = e[1], h = 0; return s < i ? h |= 16 : s > r && (h |= 4), a < n ? h |= 8 : a > o && (h |= 2), 0 === h && (h = 1), h; }, createEmpty: function () { return [1 / 0, 1 / 0, -1 / 0, -1 / 0]; }, createOrUpdate: function (t, e, i, n, r) { return r ? (r[0] = t, r[1] = e, r[2] = i, r[3] = n, r) : [t, e, i, n]; }, createOrUpdateEmpty: function (t) { return B.createOrUpdate(1 / 0, 1 / 0, -1 / 0, -1 / 0, t); }, createOrUpdateFromCoordinate: function (t, e) { var i = t[0], n = t[1]; return B.createOrUpdate(i, n, i, n, e); }, createOrUpdateFromCoordinates: function (t, e) { var i = B.createOrUpdateEmpty(e); return B.extendCoordinates(i, t); }, createOrUpdateFromFlatCoordinates: function (t, e, i, n, r) { var o = B.createOrUpdateEmpty(r); return B.extendFlatCoordinates(o, t, e, i, n); }, createOrUpdateFromRings: function (t, e) { var i = B.createOrUpdateEmpty(e); return B.extendRings(i, t); }, equals: function (t, e) { return t[0] == e[0] && t[2] == e[2] && t[1] == e[1] && t[3] == e[3]; }, extend: function (t, e) { return e[0] < t[0] && (t[0] = e[0]), e[2] > t[2] && (t[2] = e[2]), e[1] < t[1] && (t[1] = e[1]), e[3] > t[3] && (t[3] = e[3]), t; }, extendCoordinate: function (t, e) { e[0] < t[0] && (t[0] = e[0]), e[0] > t[2] && (t[2] = e[0]), e[1] < t[1] && (t[1] = e[1]), e[1] > t[3] && (t[3] = e[1]); }, extendCoordinates: function (t, e) { var i, n; for (i = 0, n = e.length; i < n; ++i)
        B.extendCoordinate(t, e[i]); return t; }, extendFlatCoordinates: function (t, e, i, n, r) { for (; i < n; i += r)
        B.extendXY(t, e[i], e[i + 1]); return t; }, extendRings: function (t, e) { var i, n; for (i = 0, n = e.length; i < n; ++i)
        B.extendCoordinates(t, e[i]); return t; }, extendXY: function (t, e, i) { t[0] = Math.min(t[0], e), t[1] = Math.min(t[1], i), t[2] = Math.max(t[2], e), t[3] = Math.max(t[3], i); }, forEachCorner: function (t, e, i) { var n; return (n = e.call(i, B.getBottomLeft(t))) ? n : (n = e.call(i, B.getBottomRight(t))) ? n : (n = e.call(i, B.getTopRight(t))) ? n : (n = e.call(i, B.getTopLeft(t))) || !1; }, getArea: function (t) { var e = 0; return B.isEmpty(t) || (e = B.getWidth(t) * B.getHeight(t)), e; }, getBottomLeft: function (t) { return [t[0], t[1]]; }, getBottomRight: function (t) { return [t[2], t[1]]; }, getCenter: function (t) { return [(t[0] + t[2]) / 2, (t[1] + t[3]) / 2]; }, getCorner: function (t, e) { var i; return "bottom-left" === e ? i = B.getBottomLeft(t) : "bottom-right" === e ? i = B.getBottomRight(t) : "top-left" === e ? i = B.getTopLeft(t) : "top-right" === e ? i = B.getTopRight(t) : w(!1, 13), i; }, getEnlargedArea: function (t, e) { var i = Math.min(t[0], e[0]), n = Math.min(t[1], e[1]); return (Math.max(t[2], e[2]) - i) * (Math.max(t[3], e[3]) - n); }, getForViewAndSize: function (t, e, i, n, r) { var o = e * n[0] / 2, s = e * n[1] / 2, a = Math.cos(i), h = Math.sin(i), l = o * a, u = o * h, c = s * a, d = s * h, p = t[0], f = t[1], g = p - l + d, _ = p - l - d, v = p + l - d, y = p + l + d, m = f - u - c, x = f - u + c, E = f + u + c, T = f + u - c; return B.createOrUpdate(Math.min(g, _, v, y), Math.min(m, x, E, T), Math.max(g, _, v, y), Math.max(m, x, E, T), r); }, getHeight: function (t) { return t[3] - t[1]; }, getIntersectionArea: function (t, e) { var i = B.getIntersection(t, e); return B.getArea(i); }, getIntersection: function (t, e, i) { var n = i || B.createEmpty(); return B.intersects(t, e) && (t[0] > e[0] ? n[0] = t[0] : n[0] = e[0], t[1] > e[1] ? n[1] = t[1] : n[1] = e[1], t[2] < e[2] ? n[2] = t[2] : n[2] = e[2], t[3] < e[3] ? n[3] = t[3] : n[3] = e[3]), n; }, getMargin: function (t) { return B.getWidth(t) + B.getHeight(t); }, getSize: function (t) { return [t[2] - t[0], t[3] - t[1]]; }, getTopLeft: function (t) { return [t[0], t[3]]; }, getTopRight: function (t) { return [t[2], t[3]]; }, getWidth: function (t) { return t[2] - t[0]; }, intersects: function (t, e) { return t[0] <= e[2] && t[2] >= e[0] && t[1] <= e[3] && t[3] >= e[1]; }, isEmpty: function (t) { return t[2] < t[0] || t[3] < t[1]; }, returnOrUpdate: function (t, e) { return e ? (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e) : t; }, scaleFromCenter: function (t, e) { var i = (t[2] - t[0]) / 2 * (e - 1), n = (t[3] - t[1]) / 2 * (e - 1); t[0] -= i, t[2] += i, t[1] -= n, t[3] += n; }, intersectsSegment: function (t, e, i) { var n = !1, r = B.coordinateRelationship(t, e), o = B.coordinateRelationship(t, i); if (1 === r || 1 === o)
        n = !0;
    else {
        var s, a, h = t[0], l = t[1], u = t[2], c = t[3], d = e[0], p = e[1], f = i[0], g = i[1], _ = (g - p) / (f - d);
        2 & o && !(2 & r) && (n = (s = f - (g - c) / _) >= h && s <= u), n || !(4 & o) || 4 & r || (n = (a = g - (f - u) * _) >= l && a <= c), n || !(8 & o) || 8 & r || (n = (s = f - (g - l) / _) >= h && s <= u), n || !(16 & o) || 16 & r || (n = (a = g - (f - h) * _) >= l && a <= c);
    } return n; }, applyTransform: function (t, e, i) { var n = [t[0], t[1], t[0], t[3], t[2], t[1], t[2], t[3]]; e(n, n, 2); var r = [n[0], n[2], n[4], n[6]], o = [n[1], n[3], n[5], n[7]]; return B.boundingExtentXYs_(r, o, i); } }, N = { TRUE: function () { return !0; }, FALSE: function () { return !1; } }, W = function (t, e, i, n, r, o) { var s, a = o || [], h = 0; for (s = e; s < i; s += n) {
    var l = t[s], u = t[s + 1];
    a[h++] = r[0] * l + r[2] * u + r[4], a[h++] = r[1] * l + r[3] * u + r[5];
} return o && a.length != h && (a.length = h), a; }, X = function (t, e, i, n, r, o, s) { for (var a = s || [], h = Math.cos(r), l = Math.sin(r), u = o[0], c = o[1], d = 0, p = e; p < i; p += n) {
    var f = t[p] - u, g = t[p + 1] - c;
    a[d++] = u + f * h - g * l, a[d++] = c + f * l + g * h;
    for (var _ = p + 2; _ < p + n; ++_)
        a[d++] = t[_];
} return s && a.length != d && (a.length = d), a; }, V = function (t, e, i, n, r, o, s, a) { for (var h = a || [], l = s[0], u = s[1], c = 0, d = e; d < i; d += n) {
    var p = t[d] - l, f = t[d + 1] - u;
    h[c++] = l + r * p, h[c++] = u + o * f;
    for (var g = d + 2; g < d + n; ++g)
        h[c++] = t[g];
} return a && h.length != c && (h.length = c), h; }, j = function (t, e, i, n, r, o, s) { var a, h, l = s || [], u = 0; for (a = e; a < i; a += n)
    for (l[u++] = t[a] + r, l[u++] = t[a + 1] + o, h = a + 2; h < a + n; ++h)
        l[u++] = t[h]; return s && l.length != u && (l.length = u), l; }, z = function (t) { this.radius = t; }; z.prototype.geodesicArea = function (t) { return z.getArea_(t, this.radius); }, z.prototype.haversineDistance = function (t, e) { return z.getDistance_(t, e, this.radius); }, z.prototype.offset = function (t, e, i) { var n = F.toRadians(t[1]), r = F.toRadians(t[0]), o = e / this.radius, s = Math.asin(Math.sin(n) * Math.cos(o) + Math.cos(n) * Math.sin(o) * Math.cos(i)), a = r + Math.atan2(Math.sin(i) * Math.sin(o) * Math.cos(n), Math.cos(o) - Math.sin(n) * Math.sin(s)); return [F.toDegrees(a), F.toDegrees(s)]; }, z.DEFAULT_RADIUS = 6371008.8, z.getLength = function (t, e) { var i, n, r, o, s, a, h = e || {}, l = h.radius || z.DEFAULT_RADIUS, u = h.projection || "EPSG:3857", c = (t = t.clone().transform(u, "EPSG:4326")).getType(), d = 0; switch (c) {
    case "Point":
    case "MultiPoint": break;
    case "LineString":
    case "LinearRing":
        i = t.getCoordinates(), d = z.getLength_(i, l);
        break;
    case "MultiLineString":
    case "Polygon":
        for (r = 0, o = (i = t.getCoordinates()).length; r < o; ++r)
            d += z.getLength_(i[r], l);
        break;
    case "MultiPolygon":
        for (r = 0, o = (i = t.getCoordinates()).length; r < o; ++r)
            for (s = 0, a = (n = i[r]).length; s < a; ++s)
                d += z.getLength_(n[s], l);
        break;
    case "GeometryCollection":
        var p = t.getGeometries();
        for (r = 0, o = p.length; r < o; ++r)
            d += z.getLength(p[r], e);
        break;
    default: throw new Error("Unsupported geometry type: " + c);
} return d; }, z.getLength_ = function (t, e) { for (var i = 0, n = 0, r = t.length; n < r - 1; ++n)
    i += z.getDistance_(t[n], t[n + 1], e); return i; }, z.getDistance_ = function (t, e, i) { var n = F.toRadians(t[1]), r = F.toRadians(e[1]), o = (r - n) / 2, s = F.toRadians(e[0] - t[0]) / 2, a = Math.sin(o) * Math.sin(o) + Math.sin(s) * Math.sin(s) * Math.cos(n) * Math.cos(r); return 2 * i * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); }, z.getArea = function (t, e) { var i, n, r, o, s, a, h = e || {}, l = h.radius || z.DEFAULT_RADIUS, u = h.projection || "EPSG:3857", c = (t = t.clone().transform(u, "EPSG:4326")).getType(), d = 0; switch (c) {
    case "Point":
    case "MultiPoint":
    case "LineString":
    case "MultiLineString":
    case "LinearRing": break;
    case "Polygon":
        for (i = t.getCoordinates(), d = Math.abs(z.getArea_(i[0], l)), r = 1, o = i.length; r < o; ++r)
            d -= Math.abs(z.getArea_(i[r], l));
        break;
    case "MultiPolygon":
        for (r = 0, o = (i = t.getCoordinates()).length; r < o; ++r)
            for (n = i[r], d += Math.abs(z.getArea_(n[0], l)), s = 1, a = n.length; s < a; ++s)
                d -= Math.abs(z.getArea_(n[s], l));
        break;
    case "GeometryCollection":
        var p = t.getGeometries();
        for (r = 0, o = p.length; r < o; ++r)
            d += z.getArea(p[r], e);
        break;
    default: throw new Error("Unsupported geometry type: " + c);
} return d; }, z.getArea_ = function (t, e) { for (var i = 0, n = t.length, r = t[n - 1][0], o = t[n - 1][1], s = 0; s < n; s++) {
    var a = t[s][0], h = t[s][1];
    i += F.toRadians(a - r) * (2 + Math.sin(F.toRadians(o)) + Math.sin(F.toRadians(h))), r = a, o = h;
} return i * e * e / 2; }; var Y = { DEGREES: "degrees", FEET: "ft", METERS: "m", PIXELS: "pixels", TILE_PIXELS: "tile-pixels", USFEET: "us-ft", METERS_PER_UNIT: {} }; Y.METERS_PER_UNIT[Y.DEGREES] = 2 * Math.PI * 6370997 / 360, Y.METERS_PER_UNIT[Y.FEET] = .3048, Y.METERS_PER_UNIT[Y.METERS] = 1, Y.METERS_PER_UNIT[Y.USFEET] = 1200 / 3937; var K = { cache_: null, set: function (t) { K.cache_ = t; }, get: function () { return K.cache_ || window.proj4; } }, H = function (t) { this.code_ = t.code, this.units_ = t.units, this.extent_ = void 0 !== t.extent ? t.extent : null, this.worldExtent_ = void 0 !== t.worldExtent ? t.worldExtent : null, this.axisOrientation_ = void 0 !== t.axisOrientation ? t.axisOrientation : "enu", this.global_ = void 0 !== t.global && t.global, this.canWrapX_ = !(!this.global_ || !this.extent_), this.getPointResolutionFunc_ = t.getPointResolution, this.defaultTileGrid_ = null, this.metersPerUnit_ = t.metersPerUnit; var e = t.code; if (i.ENABLE_PROJ4JS) {
    var n = K.get();
    if ("function" == typeof n) {
        var r = n.defs(e);
        void 0 !== r && (void 0 !== r.axis && void 0 === t.axisOrientation && (this.axisOrientation_ = r.axis), void 0 === t.metersPerUnit && (this.metersPerUnit_ = r.to_meter), void 0 === t.units && (this.units_ = r.units));
    }
} }; H.prototype.canWrapX = function () { return this.canWrapX_; }, H.prototype.getCode = function () { return this.code_; }, H.prototype.getExtent = function () { return this.extent_; }, H.prototype.getUnits = function () { return this.units_; }, H.prototype.getMetersPerUnit = function () { return this.metersPerUnit_ || Y.METERS_PER_UNIT[this.units_]; }, H.prototype.getWorldExtent = function () { return this.worldExtent_; }, H.prototype.getAxisOrientation = function () { return this.axisOrientation_; }, H.prototype.isGlobal = function () { return this.global_; }, H.prototype.setGlobal = function (t) { this.global_ = t, this.canWrapX_ = !(!t || !this.extent_); }, H.prototype.getDefaultTileGrid = function () { return this.defaultTileGrid_; }, H.prototype.setDefaultTileGrid = function (t) { this.defaultTileGrid_ = t; }, H.prototype.setExtent = function (t) { this.extent_ = t, this.canWrapX_ = !(!this.global_ || !t); }, H.prototype.setWorldExtent = function (t) { this.worldExtent_ = t; }, H.prototype.setGetPointResolution = function (t) { this.getPointResolutionFunc_ = t; }, H.prototype.getPointResolutionFunc = function () { return this.getPointResolutionFunc_; }; var Z = { Projection_: function (t) { H.call(this, { code: t, units: Y.METERS, extent: Z.EXTENT, global: !0, worldExtent: Z.WORLD_EXTENT, getPointResolution: function (t, e) { return t / F.cosh(e[1] / Z.RADIUS); } }); } }; i.inherits(Z.Projection_, H), Z.RADIUS = 6378137, Z.HALF_SIZE = Math.PI * Z.RADIUS, Z.EXTENT = [-Z.HALF_SIZE, -Z.HALF_SIZE, Z.HALF_SIZE, Z.HALF_SIZE], Z.WORLD_EXTENT = [-180, -85, 180, 85], Z.PROJECTIONS = [new Z.Projection_("EPSG:3857"), new Z.Projection_("EPSG:102100"), new Z.Projection_("EPSG:102113"), new Z.Projection_("EPSG:900913"), new Z.Projection_("urn:ogc:def:crs:EPSG:6.18:3:3857"), new Z.Projection_("urn:ogc:def:crs:EPSG::3857"), new Z.Projection_("http://www.opengis.net/gml/srs/epsg.xml#3857")], Z.fromEPSG4326 = function (t, e, i) { var n = t.length, r = i > 1 ? i : 2, o = e; void 0 === o && (o = r > 2 ? t.slice() : new Array(n)); for (var s = Z.HALF_SIZE, a = 0; a < n; a += r) {
    o[a] = s * t[a] / 180;
    var h = Z.RADIUS * Math.log(Math.tan(Math.PI * (t[a + 1] + 90) / 360));
    h > s ? h = s : h < -s && (h = -s), o[a + 1] = h;
} return o; }, Z.toEPSG4326 = function (t, e, i) { var n = t.length, r = i > 1 ? i : 2, o = e; void 0 === o && (o = r > 2 ? t.slice() : new Array(n)); for (var s = 0; s < n; s += r)
    o[s] = 180 * t[s] / Z.HALF_SIZE, o[s + 1] = 360 * Math.atan(Math.exp(t[s + 1] / Z.RADIUS)) / Math.PI - 90; return o; }; var q = { Projection_: function (t, e) { H.call(this, { code: t, units: Y.DEGREES, extent: q.EXTENT, axisOrientation: e, global: !0, metersPerUnit: q.METERS_PER_UNIT, worldExtent: q.EXTENT }); } }; i.inherits(q.Projection_, H), q.RADIUS = 6378137, q.EXTENT = [-180, -90, 180, 90], q.METERS_PER_UNIT = Math.PI * q.RADIUS / 180, q.PROJECTIONS = [new q.Projection_("CRS:84"), new q.Projection_("EPSG:4326", "neu"), new q.Projection_("urn:ogc:def:crs:EPSG::4326", "neu"), new q.Projection_("urn:ogc:def:crs:EPSG:6.6:4326", "neu"), new q.Projection_("urn:ogc:def:crs:OGC:1.3:CRS84"), new q.Projection_("urn:ogc:def:crs:OGC:2:84"), new q.Projection_("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"), new q.Projection_("urn:x-ogc:def:crs:EPSG:4326", "neu")]; var J = { cache_: {}, clear: function () { J.cache_ = {}; }, get: function (t) { return J.cache_[t] || null; }, add: function (t, e) { J.cache_[t] = e; } }, Q = { cache_: {}, clear: function () { Q.cache_ = {}; }, add: function (t, e, i) { var n = t.getCode(), r = e.getCode(), o = Q.cache_; n in o || (o[n] = {}), o[n][r] = i; }, remove: function (t, e) { var i = t.getCode(), n = e.getCode(), o = Q.cache_, s = o[i][n]; return delete o[i][n], r.isEmpty(o[i]) && delete o[i], s; }, get: function (t, e) { var i, n = Q.cache_; return t in n && e in n[t] && (i = n[t][e]), i; } }, $ = {}; $.METERS_PER_UNIT = Y.METERS_PER_UNIT, $.SPHERE_ = new z(z.DEFAULT_RADIUS), i.ENABLE_PROJ4JS && ($.setProj4 = function (t) { K.set(t); }), $.getPointResolution = function (t, e, i, n) { var r, o = (t = $.get(t)).getPointResolutionFunc(); if (o)
    r = o(e, i);
else if (t.getUnits() == Y.DEGREES && !n || n == Y.DEGREES)
    r = e;
else {
    var s = $.getTransformFromProjections(t, $.get("EPSG:4326")), a = [i[0] - e / 2, i[1], i[0] + e / 2, i[1], i[0], i[1] - e / 2, i[0], i[1] + e / 2];
    a = s(a, a, 2), r = ($.SPHERE_.haversineDistance(a.slice(0, 2), a.slice(2, 4)) + $.SPHERE_.haversineDistance(a.slice(4, 6), a.slice(6, 8))) / 2;
    var h = n ? Y.METERS_PER_UNIT[n] : t.getMetersPerUnit();
    void 0 !== h && (r /= h);
} return r; }, $.addEquivalentProjections = function (t) { $.addProjections(t), t.forEach(function (e) { t.forEach(function (t) { e !== t && Q.add(e, t, $.cloneTransform); }); }); }, $.addEquivalentTransforms = function (t, e, i, n) { t.forEach(function (t) { e.forEach(function (e) { Q.add(t, e, i), Q.add(e, t, n); }); }); }, $.addProjection = function (t) { J.add(t.getCode(), t), Q.add(t, t, $.cloneTransform); }, $.addProjections = function (t) { t.forEach($.addProjection); }, $.clearAllProjections = function () { J.clear(), Q.clear(); }, $.createProjection = function (t, e) { return t ? "string" == typeof t ? $.get(t) : t : $.get(e); }, $.addCoordinateTransforms = function (t, e, i, n) { var r = $.get(t), o = $.get(e); Q.add(r, o, $.createTransformFromCoordinateTransform(i)), Q.add(o, r, $.createTransformFromCoordinateTransform(n)); }, $.createTransformFromCoordinateTransform = function (t) { return function (e, i, n) { var r, o, s, a = e.length, h = void 0 !== n ? n : 2, l = void 0 !== i ? i : new Array(a); for (o = 0; o < a; o += h)
    for (r = t([e[o], e[o + 1]]), l[o] = r[0], l[o + 1] = r[1], s = h - 1; s >= 2; --s)
        l[o + s] = e[o + s]; return l; }; }, $.fromLonLat = function (t, e) { return $.transform(t, "EPSG:4326", void 0 !== e ? e : "EPSG:3857"); }, $.toLonLat = function (t, e) { var i = $.transform(t, void 0 !== e ? e : "EPSG:3857", "EPSG:4326"), n = i[0]; return (n < -180 || n > 180) && (i[0] = F.modulo(n + 180, 360) - 180), i; }, $.get = function (t) { var e = null; if (t instanceof H)
    e = t;
else if ("string" == typeof t) {
    var n = t;
    if (e = J.get(n), i.ENABLE_PROJ4JS && !e) {
        var r = K.get();
        "function" == typeof r && void 0 !== r.defs(n) && (e = new H({ code: n }), $.addProjection(e));
    }
} return e; }, $.equivalent = function (t, e) { if (t === e)
    return !0; var i = t.getUnits() === e.getUnits(); return t.getCode() === e.getCode() ? i : $.getTransformFromProjections(t, e) === $.cloneTransform && i; }, $.getTransform = function (t, e) { var i = $.get(t), n = $.get(e); return $.getTransformFromProjections(i, n); }, $.getTransformFromProjections = function (t, e) { var n = t.getCode(), r = e.getCode(), o = Q.get(n, r); if (i.ENABLE_PROJ4JS && !o) {
    var s = K.get();
    if ("function" == typeof s) {
        var a = s.defs(n), h = s.defs(r);
        if (void 0 !== a && void 0 !== h) {
            if (a === h)
                $.addEquivalentProjections([e, t]);
            else {
                var l = s(r, n);
                $.addCoordinateTransforms(e, t, l.forward, l.inverse);
            }
            o = Q.get(n, r);
        }
    }
} return o || (o = $.identityTransform), o; }, $.identityTransform = function (t, e, i) { if (void 0 !== e && t !== e) {
    for (var n = 0, r = t.length; n < r; ++n)
        e[n] = t[n];
    t = e;
} return t; }, $.cloneTransform = function (t, e, i) { var n; if (void 0 !== e) {
    for (var r = 0, o = t.length; r < o; ++r)
        e[r] = t[r];
    n = e;
}
else
    n = t.slice(); return n; }, $.transform = function (t, e, i) { return $.getTransform(e, i)(t, void 0, t.length); }, $.transformExtent = function (t, e, i) { var n = $.getTransform(e, i); return B.applyTransform(t, n); }, $.transformWithProjections = function (t, e, i) { return $.getTransformFromProjections(e, i)(t); }, $.addCommon = function () { $.addEquivalentProjections(Z.PROJECTIONS), $.addEquivalentProjections(q.PROJECTIONS), $.addEquivalentTransforms(q.PROJECTIONS, Z.PROJECTIONS, Z.fromEPSG4326, Z.toEPSG4326); }, $.addCommon(); var tt = {}; tt.tmp_ = new Array(6), tt.create = function () { return [1, 0, 0, 1, 0, 0]; }, tt.reset = function (t) { return tt.set(t, 1, 0, 0, 1, 0, 0); }, tt.multiply = function (t, e) { var i = t[0], n = t[1], r = t[2], o = t[3], s = t[4], a = t[5], h = e[0], l = e[1], u = e[2], c = e[3], d = e[4], p = e[5]; return t[0] = i * h + r * l, t[1] = n * h + o * l, t[2] = i * u + r * c, t[3] = n * u + o * c, t[4] = i * d + r * p + s, t[5] = n * d + o * p + a, t; }, tt.set = function (t, e, i, n, r, o, s) { return t[0] = e, t[1] = i, t[2] = n, t[3] = r, t[4] = o, t[5] = s, t; }, tt.setFromArray = function (t, e) { return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t; }, tt.apply = function (t, e) { var i = e[0], n = e[1]; return e[0] = t[0] * i + t[2] * n + t[4], e[1] = t[1] * i + t[3] * n + t[5], e; }, tt.rotate = function (t, e) { var i = Math.cos(e), n = Math.sin(e); return tt.multiply(t, tt.set(tt.tmp_, i, n, -n, i, 0, 0)); }, tt.scale = function (t, e, i) { return tt.multiply(t, tt.set(tt.tmp_, e, 0, 0, i, 0, 0)); }, tt.translate = function (t, e, i) { return tt.multiply(t, tt.set(tt.tmp_, 1, 0, 0, 1, e, i)); }, tt.compose = function (t, e, i, n, r, o, s, a) { var h = Math.sin(o), l = Math.cos(o); return t[0] = n * l, t[1] = r * h, t[2] = -n * h, t[3] = r * l, t[4] = s * n * l - a * n * h + e, t[5] = s * r * h + a * r * l + i, t; }, tt.invert = function (t) { var e = tt.determinant(t); w(0 !== e, 32); var i = t[0], n = t[1], r = t[2], o = t[3], s = t[4], a = t[5]; return t[0] = o / e, t[1] = -n / e, t[2] = -r / e, t[3] = i / e, t[4] = (r * a - o * s) / e, t[5] = -(i * a - n * s) / e, t; }, tt.determinant = function (t) { return t[0] * t[3] - t[1] * t[2]; }; var et = function () { u.call(this), this.extent_ = B.createEmpty(), this.extentRevision_ = -1, this.simplifiedGeometryCache = {}, this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = 0, this.tmpTransform_ = tt.create(); }; i.inherits(et, u), et.prototype.clone = function () { }, et.prototype.closestPointXY = function (t, e, i, n) { }, et.prototype.getClosestPoint = function (t, e) { var i = e || [NaN, NaN]; return this.closestPointXY(t[0], t[1], i, 1 / 0), i; }, et.prototype.intersectsCoordinate = function (t) { return this.containsXY(t[0], t[1]); }, et.prototype.computeExtent = function (t) { }, et.prototype.containsXY = N.FALSE, et.prototype.getExtent = function (t) { return this.extentRevision_ != this.getRevision() && (this.extent_ = this.computeExtent(this.extent_), this.extentRevision_ = this.getRevision()), B.returnOrUpdate(this.extent_, t); }, et.prototype.rotate = function (t, e) { }, et.prototype.scale = function (t, e, i) { }, et.prototype.simplify = function (t) { return this.getSimplifiedGeometry(t * t); }, et.prototype.getSimplifiedGeometry = function (t) { }, et.prototype.getType = function () { }, et.prototype.applyTransform = function (t) { }, et.prototype.intersectsExtent = function (t) { }, et.prototype.translate = function (t, e) { }, et.prototype.transform = function (t, e) { var i = this.tmpTransform_, n = (t = $.get(t)).getUnits() == Y.TILE_PIXELS ? function (n, r, o) { var s = t.getExtent(), a = t.getWorldExtent(), h = B.getHeight(a) / B.getHeight(s); return tt.compose(i, a[0], a[3], h, -h, 0, 0, 0), W(n, 0, n.length, o, i, r), $.getTransform(t, e)(n, r, o); } : $.getTransform(t, e); return this.applyTransform(n), this; }; var it = function () { et.call(this), this.layout = "XY", this.stride = 2, this.flatCoordinates = null; }; i.inherits(it, et), it.getLayoutForStride_ = function (t) { var e; return 2 == t ? e = "XY" : 3 == t ? e = "XYZ" : 4 == t && (e = "XYZM"), e; }, it.getStrideForLayout = function (t) { var e; return "XY" == t ? e = 2 : "XYZ" == t || "XYM" == t ? e = 3 : "XYZM" == t && (e = 4), e; }, it.prototype.containsXY = N.FALSE, it.prototype.computeExtent = function (t) { return B.createOrUpdateFromFlatCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t); }, it.prototype.getCoordinates = function () { }, it.prototype.getFirstCoordinate = function () { return this.flatCoordinates.slice(0, this.stride); }, it.prototype.getFlatCoordinates = function () { return this.flatCoordinates; }, it.prototype.getLastCoordinate = function () { return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride); }, it.prototype.getLayout = function () { return this.layout; }, it.prototype.getSimplifiedGeometry = function (t) { if (this.simplifiedGeometryRevision != this.getRevision() && (r.clear(this.simplifiedGeometryCache), this.simplifiedGeometryMaxMinSquaredTolerance = 0, this.simplifiedGeometryRevision = this.getRevision()), t < 0 || 0 !== this.simplifiedGeometryMaxMinSquaredTolerance && t <= this.simplifiedGeometryMaxMinSquaredTolerance)
    return this; var e = t.toString(); if (this.simplifiedGeometryCache.hasOwnProperty(e))
    return this.simplifiedGeometryCache[e]; var i = this.getSimplifiedGeometryInternal(t); return i.getFlatCoordinates().length < this.flatCoordinates.length ? (this.simplifiedGeometryCache[e] = i, i) : (this.simplifiedGeometryMaxMinSquaredTolerance = t, this); }, it.prototype.getSimplifiedGeometryInternal = function (t) { return this; }, it.prototype.getStride = function () { return this.stride; }, it.prototype.setFlatCoordinatesInternal = function (t, e) { this.stride = it.getStrideForLayout(t), this.layout = t, this.flatCoordinates = e; }, it.prototype.setCoordinates = function (t, e) { }, it.prototype.setLayout = function (t, e, i) { var n; if (t)
    n = it.getStrideForLayout(t);
else {
    var r;
    for (r = 0; r < i; ++r) {
        if (0 === e.length)
            return this.layout = "XY", void (this.stride = 2);
        e = e[0];
    }
    n = e.length, t = it.getLayoutForStride_(n);
} this.layout = t, this.stride = n; }, it.prototype.applyTransform = function (t) { this.flatCoordinates && (t(this.flatCoordinates, this.flatCoordinates, this.stride), this.changed()); }, it.prototype.rotate = function (t, e) { var i = this.getFlatCoordinates(); if (i) {
    var n = this.getStride();
    X(i, 0, i.length, n, t, e, i), this.changed();
} }, it.prototype.scale = function (t, e, i) { var n = e; void 0 === n && (n = t); var r = i; r || (r = B.getCenter(this.getExtent())); var o = this.getFlatCoordinates(); if (o) {
    var s = this.getStride();
    V(o, 0, o.length, s, t, n, r, o), this.changed();
} }, it.prototype.translate = function (t, e) { var i = this.getFlatCoordinates(); if (i) {
    var n = this.getStride();
    j(i, 0, i.length, n, t, e, i), this.changed();
} }, it.transform2D = function (t, e, i) { var n = t.getFlatCoordinates(); if (n) {
    var r = t.getStride();
    return W(n, 0, n.length, r, e, i);
} return null; }; var nt = { linearRing: function (t, e, i, n) { for (var r = 0, o = t[i - n], s = t[i - n + 1]; e < i; e += n) {
        var a = t[e], h = t[e + 1];
        r += s * a - o * h, o = a, s = h;
    } return r / 2; }, linearRings: function (t, e, i, n) { var r, o, s = 0; for (r = 0, o = i.length; r < o; ++r) {
        var a = i[r];
        s += nt.linearRing(t, e, a, n), e = a;
    } return s; }, linearRingss: function (t, e, i, n) { var r, o, s = 0; for (r = 0, o = i.length; r < o; ++r) {
        var a = i[r];
        s += nt.linearRings(t, e, a, n), e = a[a.length - 1];
    } return s; } }, rt = { point: function (t, e, i, n, r, o, s) { var a, h, l = t[e], u = t[e + 1], c = t[i] - l, d = t[i + 1] - u; if (0 === c && 0 === d)
        h = e;
    else {
        var p = ((r - l) * c + (o - u) * d) / (c * c + d * d);
        if (p > 1)
            h = i;
        else {
            if (p > 0) {
                for (a = 0; a < n; ++a)
                    s[a] = F.lerp(t[e + a], t[i + a], p);
                return void (s.length = n);
            }
            h = e;
        }
    } for (a = 0; a < n; ++a)
        s[a] = t[h + a]; s.length = n; }, getMaxSquaredDelta: function (t, e, i, n, r) { var o = t[e], s = t[e + 1]; for (e += n; e < i; e += n) {
        var a = t[e], h = t[e + 1], l = F.squaredDistance(o, s, a, h);
        l > r && (r = l), o = a, s = h;
    } return r; }, getsMaxSquaredDelta: function (t, e, i, n, r) { var o, s; for (o = 0, s = i.length; o < s; ++o) {
        var a = i[o];
        r = rt.getMaxSquaredDelta(t, e, a, n, r), e = a;
    } return r; }, getssMaxSquaredDelta: function (t, e, i, n, r) { var o, s; for (o = 0, s = i.length; o < s; ++o) {
        var a = i[o];
        r = rt.getsMaxSquaredDelta(t, e, a, n, r), e = a[a.length - 1];
    } return r; }, getClosestPoint: function (t, e, i, n, r, o, s, a, h, l, u) { if (e == i)
        return l; var c, d; if (0 === r) {
        if ((d = F.squaredDistance(s, a, t[e], t[e + 1])) < l) {
            for (c = 0; c < n; ++c)
                h[c] = t[e + c];
            return h.length = n, d;
        }
        return l;
    } for (var p = u || [NaN, NaN], f = e + n; f < i;)
        if (rt.point(t, f - n, f, n, s, a, p), (d = F.squaredDistance(s, a, p[0], p[1])) < l) {
            for (l = d, c = 0; c < n; ++c)
                h[c] = p[c];
            h.length = n, f += n;
        }
        else
            f += n * Math.max((Math.sqrt(d) - Math.sqrt(l)) / r | 0, 1); if (o && (rt.point(t, i - n, e, n, s, a, p), (d = F.squaredDistance(s, a, p[0], p[1])) < l)) {
        for (l = d, c = 0; c < n; ++c)
            h[c] = p[c];
        h.length = n;
    } return l; }, getsClosestPoint: function (t, e, i, n, r, o, s, a, h, l, u) { var c, d, p = u || [NaN, NaN]; for (c = 0, d = i.length; c < d; ++c) {
        var f = i[c];
        l = rt.getClosestPoint(t, e, f, n, r, o, s, a, h, l, p), e = f;
    } return l; }, getssClosestPoint: function (t, e, i, n, r, o, s, a, h, l, u) { var c, d, p = u || [NaN, NaN]; for (c = 0, d = i.length; c < d; ++c) {
        var f = i[c];
        l = rt.getsClosestPoint(t, e, f, n, r, o, s, a, h, l, p), e = f[f.length - 1];
    } return l; } }, ot = { coordinate: function (t, e, i, n) { var r, o; for (r = 0, o = i.length; r < o; ++r)
        t[e++] = i[r]; return e; }, coordinates: function (t, e, i, n) { var r, o; for (r = 0, o = i.length; r < o; ++r) {
        var s, a = i[r];
        for (s = 0; s < n; ++s)
            t[e++] = a[s];
    } return e; }, coordinatess: function (t, e, i, n, r) { var o, s, a = r || [], h = 0; for (o = 0, s = i.length; o < s; ++o) {
        var l = ot.coordinates(t, e, i[o], n);
        a[h++] = l, e = l;
    } return a.length = h, a; }, coordinatesss: function (t, e, i, n, r) { var o, s, a = r || [], h = 0; for (o = 0, s = i.length; o < s; ++o) {
        var l = ot.coordinatess(t, e, i[o], n, a[h]);
        a[h++] = l, e = l[l.length - 1];
    } return a.length = h, a; } }, st = { coordinates: function (t, e, i, n, r) { var o, s = void 0 !== r ? r : [], a = 0; for (o = e; o < i; o += n)
        s[a++] = t.slice(o, o + n); return s.length = a, s; }, coordinatess: function (t, e, i, n, r) { var o, s, a = void 0 !== r ? r : [], h = 0; for (o = 0, s = i.length; o < s; ++o) {
        var l = i[o];
        a[h++] = st.coordinates(t, e, l, n, a[h]), e = l;
    } return a.length = h, a; }, coordinatesss: function (t, e, i, n, r) { var o, s, a = void 0 !== r ? r : [], h = 0; for (o = 0, s = i.length; o < s; ++o) {
        var l = i[o];
        a[h++] = st.coordinatess(t, e, l, n, a[h]), e = l[l.length - 1];
    } return a.length = h, a; } }, at = { lineString: function (t, e, i, n, r, o, s) { var a = void 0 !== s ? s : []; return o || (i = at.radialDistance(t, e, i, n, r, a, 0), t = a, e = 0, n = 2), a.length = at.douglasPeucker(t, e, i, n, r, a, 0), a; }, douglasPeucker: function (t, e, i, n, r, o, s) { var a = (i - e) / n; if (a < 3) {
        for (; e < i; e += n)
            o[s++] = t[e], o[s++] = t[e + 1];
        return s;
    } var h = new Array(a); h[0] = 1, h[a - 1] = 1; for (var l, u = [e, i - n], c = 0; u.length > 0;) {
        var d = u.pop(), p = u.pop(), f = 0, g = t[p], _ = t[p + 1], v = t[d], y = t[d + 1];
        for (l = p + n; l < d; l += n) {
            var m = t[l], x = t[l + 1], E = F.squaredSegmentDistance(m, x, g, _, v, y);
            E > f && (c = l, f = E);
        }
        f > r && (h[(c - e) / n] = 1, p + n < c && u.push(p, c), c + n < d && u.push(c, d));
    } for (l = 0; l < a; ++l)
        h[l] && (o[s++] = t[e + l * n], o[s++] = t[e + l * n + 1]); return s; }, douglasPeuckers: function (t, e, i, n, r, o, s, a) { var h, l; for (h = 0, l = i.length; h < l; ++h) {
        var u = i[h];
        s = at.douglasPeucker(t, e, u, n, r, o, s), a.push(s), e = u;
    } return s; }, douglasPeuckerss: function (t, e, i, n, r, o, s, a) { var h, l; for (h = 0, l = i.length; h < l; ++h) {
        var u = i[h], c = [];
        s = at.douglasPeuckers(t, e, u, n, r, o, s, c), a.push(c), e = u[u.length - 1];
    } return s; }, radialDistance: function (t, e, i, n, r, o, s) { if (i <= e + n) {
        for (; e < i; e += n)
            o[s++] = t[e], o[s++] = t[e + 1];
        return s;
    } var a = t[e], h = t[e + 1]; o[s++] = a, o[s++] = h; var l = a, u = h; for (e += n; e < i; e += n)
        l = t[e], u = t[e + 1], F.squaredDistance(a, h, l, u) > r && (o[s++] = l, o[s++] = u, a = l, h = u); return l == a && u == h || (o[s++] = l, o[s++] = u), s; }, snap: function (t, e) { return e * Math.round(t / e); }, quantize: function (t, e, i, n, r, o, s) { if (e == i)
        return s; var a, h, l = at.snap(t[e], r), u = at.snap(t[e + 1], r); e += n, o[s++] = l, o[s++] = u; do {
        if (a = at.snap(t[e], r), h = at.snap(t[e + 1], r), (e += n) == i)
            return o[s++] = a, o[s++] = h, s;
    } while (a == l && h == u); for (; e < i;) {
        var c, d;
        if (c = at.snap(t[e], r), d = at.snap(t[e + 1], r), e += n, c != a || d != h) {
            var p = a - l, f = h - u, g = c - l, _ = d - u;
            p * _ == f * g && (p < 0 && g < p || p == g || p > 0 && g > p) && (f < 0 && _ < f || f == _ || f > 0 && _ > f) ? (a = c, h = d) : (o[s++] = a, o[s++] = h, l = a, u = h, a = c, h = d);
        }
    } return o[s++] = a, o[s++] = h, s; }, quantizes: function (t, e, i, n, r, o, s, a) { var h, l; for (h = 0, l = i.length; h < l; ++h) {
        var u = i[h];
        s = at.quantize(t, e, u, n, r, o, s), a.push(s), e = u;
    } return s; }, quantizess: function (t, e, i, n, r, o, s, a) { var h, l; for (h = 0, l = i.length; h < l; ++h) {
        var u = i[h], c = [];
        s = at.quantizes(t, e, u, n, r, o, s, c), a.push(c), e = u[u.length - 1];
    } return s; } }, ht = function (t, e) { it.call(this), this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.setCoordinates(t, e); }; i.inherits(ht, it), ht.prototype.clone = function () { var t = new ht(null); return t.setFlatCoordinates(this.layout, this.flatCoordinates.slice()), t; }, ht.prototype.closestPointXY = function (t, e, i, n) { return n < B.closestSquaredDistanceXY(this.getExtent(), t, e) ? n : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(rt.getMaxSquaredDelta(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0)), this.maxDeltaRevision_ = this.getRevision()), rt.getClosestPoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, !0, t, e, i, n)); }, ht.prototype.getArea = function () { return nt.linearRing(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride); }, ht.prototype.getCoordinates = function () { return st.coordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride); }, ht.prototype.getSimplifiedGeometryInternal = function (t) { var e = []; e.length = at.douglasPeucker(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t, e, 0); var i = new ht(null); return i.setFlatCoordinates("XY", e), i; }, ht.prototype.getType = function () { return "LinearRing"; }, ht.prototype.intersectsExtent = function (t) { }, ht.prototype.setCoordinates = function (t, e) { t ? (this.setLayout(e, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = ot.coordinates(this.flatCoordinates, 0, t, this.stride), this.changed()) : this.setFlatCoordinates("XY", null); }, ht.prototype.setFlatCoordinates = function (t, e) { this.setFlatCoordinatesInternal(t, e), this.changed(); }; var lt = function (t, e) { it.call(this), this.setCoordinates(t, e); }; i.inherits(lt, it), lt.prototype.clone = function () { var t = new lt(null); return t.setFlatCoordinates(this.layout, this.flatCoordinates.slice()), t; }, lt.prototype.closestPointXY = function (t, e, i, n) { var r = this.flatCoordinates, o = F.squaredDistance(t, e, r[0], r[1]); if (o < n) {
    var s, a = this.stride;
    for (s = 0; s < a; ++s)
        i[s] = r[s];
    return i.length = a, o;
} return n; }, lt.prototype.getCoordinates = function () { return this.flatCoordinates ? this.flatCoordinates.slice() : []; }, lt.prototype.computeExtent = function (t) { return B.createOrUpdateFromCoordinate(this.flatCoordinates, t); }, lt.prototype.getType = function () { return "Point"; }, lt.prototype.intersectsExtent = function (t) { return B.containsXY(t, this.flatCoordinates[0], this.flatCoordinates[1]); }, lt.prototype.setCoordinates = function (t, e) { t ? (this.setLayout(e, t, 0), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = ot.coordinate(this.flatCoordinates, 0, t, this.stride), this.changed()) : this.setFlatCoordinates("XY", null); }, lt.prototype.setFlatCoordinates = function (t, e) { this.setFlatCoordinatesInternal(t, e), this.changed(); }; var ut = { linearRingContainsExtent: function (t, e, i, n, r) { return !B.forEachCorner(r, function (r) { return !ut.linearRingContainsXY(t, e, i, n, r[0], r[1]); }); }, linearRingContainsXY: function (t, e, i, n, r, o) { for (var s = 0, a = t[i - n], h = t[i - n + 1]; e < i; e += n) {
        var l = t[e], u = t[e + 1];
        h <= o ? u > o && (l - a) * (o - h) - (r - a) * (u - h) > 0 && s++ : u <= o && (l - a) * (o - h) - (r - a) * (u - h) < 0 && s--, a = l, h = u;
    } return 0 !== s; }, linearRingsContainsXY: function (t, e, i, n, r, o) { if (0 === i.length)
        return !1; if (!ut.linearRingContainsXY(t, e, i[0], n, r, o))
        return !1; var s, a; for (s = 1, a = i.length; s < a; ++s)
        if (ut.linearRingContainsXY(t, i[s - 1], i[s], n, r, o))
            return !1; return !0; }, linearRingssContainsXY: function (t, e, i, n, r, o) { if (0 === i.length)
        return !1; var s, a; for (s = 0, a = i.length; s < a; ++s) {
        var h = i[s];
        if (ut.linearRingsContainsXY(t, e, h, n, r, o))
            return !0;
        e = h[h.length - 1];
    } return !1; } }, ct = { linearRings: function (t, e, i, n, r, o, s) { for (var a, h, l, u, c, d, p, f = r[o + 1], g = [], _ = 0, v = i.length; _ < v; ++_) {
        var y = i[_];
        for (u = t[y - n], d = t[y - n + 1], a = e; a < y; a += n)
            c = t[a], p = t[a + 1], (f <= d && p <= f || d <= f && f <= p) && (l = (f - d) / (p - d) * (c - u) + u, g.push(l)), u = c, d = p;
    } var m = NaN, x = -1 / 0; for (g.sort(S.numberSafeCompareFunction), u = g[0], a = 1, h = g.length; a < h; ++a) {
        c = g[a];
        var E = Math.abs(c - u);
        E > x && (l = (u + c) / 2, ut.linearRingsContainsXY(t, e, i, n, l, f) && (m = l, x = E)), u = c;
    } return isNaN(m) && (m = r[o]), s ? (s.push(m, f, x), s) : [m, f, x]; }, linearRingss: function (t, e, i, n, r) { var o, s, a = []; for (o = 0, s = i.length; o < s; ++o) {
        var h = i[o];
        a = ct.linearRings(t, e, h, n, r, 2 * o, a), e = h[h.length - 1];
    } return a; } }, dt = function (t, e, i, n, r, o) { for (var s, a = [t[e], t[e + 1]], h = []; e + n < i; e += n) {
    if (h[0] = t[e + n], h[1] = t[e + n + 1], s = r.call(o, a, h))
        return s;
    a[0] = h[0], a[1] = h[1];
} return !1; }, pt = { lineString: function (t, e, i, n, r) { var o = B.extendFlatCoordinates(B.createEmpty(), t, e, i, n); return !!B.intersects(r, o) && (!!B.containsExtent(r, o) || o[0] >= r[0] && o[2] <= r[2] || o[1] >= r[1] && o[3] <= r[3] || dt(t, e, i, n, function (t, e) { return B.intersectsSegment(r, t, e); })); }, lineStrings: function (t, e, i, n, r) { var o, s; for (o = 0, s = i.length; o < s; ++o) {
        if (pt.lineString(t, e, i[o], n, r))
            return !0;
        e = i[o];
    } return !1; }, linearRing: function (t, e, i, n, r) { return !!(pt.lineString(t, e, i, n, r) || ut.linearRingContainsXY(t, e, i, n, r[0], r[1]) || ut.linearRingContainsXY(t, e, i, n, r[0], r[3]) || ut.linearRingContainsXY(t, e, i, n, r[2], r[1]) || ut.linearRingContainsXY(t, e, i, n, r[2], r[3])); }, linearRings: function (t, e, i, n, r) { if (!pt.linearRing(t, e, i[0], n, r))
        return !1; if (1 === i.length)
        return !0; var o, s; for (o = 1, s = i.length; o < s; ++o)
        if (ut.linearRingContainsExtent(t, i[o - 1], i[o], n, r))
            return !1; return !0; }, linearRingss: function (t, e, i, n, r) { var o, s; for (o = 0, s = i.length; o < s; ++o) {
        var a = i[o];
        if (pt.linearRings(t, e, a, n, r))
            return !0;
        e = a[a.length - 1];
    } return !1; } }, ft = function (t, e, i, n) { for (; e < i - n;) {
    var r;
    for (r = 0; r < n; ++r) {
        var o = t[e + r];
        t[e + r] = t[i - n + r], t[i - n + r] = o;
    }
    e += n, i -= n;
} }, gt = { linearRingIsClockwise: function (t, e, i, n) { for (var r = 0, o = t[i - n], s = t[i - n + 1]; e < i; e += n) {
        var a = t[e], h = t[e + 1];
        r += (a - o) * (h + s), o = a, s = h;
    } return r > 0; }, linearRingsAreOriented: function (t, e, i, n, r) { var o, s, a = void 0 !== r && r; for (o = 0, s = i.length; o < s; ++o) {
        var h = i[o], l = gt.linearRingIsClockwise(t, e, h, n);
        if (0 === o) {
            if (a && l || !a && !l)
                return !1;
        }
        else if (a && !l || !a && l)
            return !1;
        e = h;
    } return !0; }, linearRingssAreOriented: function (t, e, i, n, r) { var o, s; for (o = 0, s = i.length; o < s; ++o)
        if (!gt.linearRingsAreOriented(t, e, i[o], n, r))
            return !1; return !0; }, orientLinearRings: function (t, e, i, n, r) { var o, s, a = void 0 !== r && r; for (o = 0, s = i.length; o < s; ++o) {
        var h = i[o], l = gt.linearRingIsClockwise(t, e, h, n);
        (0 === o ? a && l || !a && !l : a && !l || !a && l) && ft(t, e, h, n), e = h;
    } return e; }, orientLinearRingss: function (t, e, i, n, r) { var o, s; for (o = 0, s = i.length; o < s; ++o)
        e = gt.orientLinearRings(t, e, i[o], n, r); return e; } }, _t = function (t, e) { it.call(this), this.ends_ = [], this.flatInteriorPointRevision_ = -1, this.flatInteriorPoint_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, this.setCoordinates(t, e); }; i.inherits(_t, it), _t.prototype.appendLinearRing = function (t) { this.flatCoordinates ? S.extend(this.flatCoordinates, t.getFlatCoordinates()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed(); }, _t.prototype.clone = function () { var t = new _t(null); return t.setFlatCoordinates(this.layout, this.flatCoordinates.slice(), this.ends_.slice()), t; }, _t.prototype.closestPointXY = function (t, e, i, n) { return n < B.closestSquaredDistanceXY(this.getExtent(), t, e) ? n : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(rt.getsMaxSquaredDelta(this.flatCoordinates, 0, this.ends_, this.stride, 0)), this.maxDeltaRevision_ = this.getRevision()), rt.getsClosestPoint(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, !0, t, e, i, n)); }, _t.prototype.containsXY = function (t, e) { return ut.linearRingsContainsXY(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, t, e); }, _t.prototype.getArea = function () { return nt.linearRings(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride); }, _t.prototype.getCoordinates = function (t) { var e; return void 0 !== t ? (e = this.getOrientedFlatCoordinates().slice(), gt.orientLinearRings(e, 0, this.ends_, this.stride, t)) : e = this.flatCoordinates, st.coordinatess(e, 0, this.ends_, this.stride); }, _t.prototype.getEnds = function () { return this.ends_; }, _t.prototype.getFlatInteriorPoint = function () { if (this.flatInteriorPointRevision_ != this.getRevision()) {
    var t = B.getCenter(this.getExtent());
    this.flatInteriorPoint_ = ct.linearRings(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, t, 0), this.flatInteriorPointRevision_ = this.getRevision();
} return this.flatInteriorPoint_; }, _t.prototype.getInteriorPoint = function () { return new lt(this.getFlatInteriorPoint(), "XYM"); }, _t.prototype.getLinearRingCount = function () { return this.ends_.length; }, _t.prototype.getLinearRing = function (t) { if (t < 0 || this.ends_.length <= t)
    return null; var e = new ht(null); return e.setFlatCoordinates(this.layout, this.flatCoordinates.slice(0 === t ? 0 : this.ends_[t - 1], this.ends_[t])), e; }, _t.prototype.getLinearRings = function () { var t, e, i = this.layout, n = this.flatCoordinates, r = this.ends_, o = [], s = 0; for (t = 0, e = r.length; t < e; ++t) {
    var a = r[t], h = new ht(null);
    h.setFlatCoordinates(i, n.slice(s, a)), o.push(h), s = a;
} return o; }, _t.prototype.getOrientedFlatCoordinates = function () { if (this.orientedRevision_ != this.getRevision()) {
    var t = this.flatCoordinates;
    gt.linearRingsAreOriented(t, 0, this.ends_, this.stride) ? this.orientedFlatCoordinates_ = t : (this.orientedFlatCoordinates_ = t.slice(), this.orientedFlatCoordinates_.length = gt.orientLinearRings(this.orientedFlatCoordinates_, 0, this.ends_, this.stride)), this.orientedRevision_ = this.getRevision();
} return this.orientedFlatCoordinates_; }, _t.prototype.getSimplifiedGeometryInternal = function (t) { var e = [], i = []; e.length = at.quantizes(this.flatCoordinates, 0, this.ends_, this.stride, Math.sqrt(t), e, 0, i); var n = new _t(null); return n.setFlatCoordinates("XY", e, i), n; }, _t.prototype.getType = function () { return "Polygon"; }, _t.prototype.intersectsExtent = function (t) { return pt.linearRings(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, t); }, _t.prototype.setCoordinates = function (t, e) { if (t) {
    this.setLayout(e, t, 2), this.flatCoordinates || (this.flatCoordinates = []);
    var i = ot.coordinatess(this.flatCoordinates, 0, t, this.stride, this.ends_);
    this.flatCoordinates.length = 0 === i.length ? 0 : i[i.length - 1], this.changed();
}
else
    this.setFlatCoordinates("XY", null, this.ends_); }, _t.prototype.setFlatCoordinates = function (t, e, i) { this.setFlatCoordinatesInternal(t, e), this.ends_ = i, this.changed(); }, _t.circular = function (t, e, i, n) { var r, o = n || 32, s = []; for (r = 0; r < o; ++r)
    S.extend(s, t.offset(e, i, 2 * Math.PI * r / o)); s.push(s[0], s[1]); var a = new _t(null); return a.setFlatCoordinates("XY", s, [s.length]), a; }, _t.fromExtent = function (t) { var e = t[0], i = t[1], n = t[2], r = t[3], o = [e, i, e, r, n, r, n, i, e, i], s = new _t(null); return s.setFlatCoordinates("XY", o, [o.length]), s; }, _t.fromCircle = function (t, e, i) { for (var n = e || 32, r = t.getStride(), o = t.getLayout(), s = new _t(null, o), a = r * (n + 1), h = new Array(a), l = 0; l < a; l++)
    h[l] = 0; var u = [h.length]; return s.setFlatCoordinates(o, h, u), _t.makeRegular(s, t.getCenter(), t.getRadius(), i), s; }, _t.makeRegular = function (t, e, i, n) { for (var r, o, s = t.getFlatCoordinates(), a = t.getLayout(), h = t.getStride(), l = t.getEnds(), u = s.length / h - 1, c = n || 0, d = 0; d <= u; ++d)
    o = d * h, r = c + 2 * F.modulo(d, u) * Math.PI / u, s[o] = e[0] + i * Math.cos(r), s[o + 1] = e[1] + i * Math.sin(r); t.setFlatCoordinates(a, s, l); }; var vt = function (t) { u.call(this); var e = r.assign({}, t); this.hints_ = [0, 0], this.animations_ = [], this.updateAnimationKey_, this.updateAnimations_ = this.updateAnimations_.bind(this), this.projection_ = $.createProjection(e.projection, "EPSG:3857"), this.applyOptions_(e); }; i.inherits(vt, u), vt.prototype.applyOptions_ = function (t) { var e = {}; e.center = void 0 !== t.center ? t.center : null; var i = vt.createResolutionConstraint_(t); this.maxResolution_ = i.maxResolution, this.minResolution_ = i.minResolution, this.zoomFactor_ = i.zoomFactor, this.resolutions_ = t.resolutions, this.minZoom_ = i.minZoom; var n = vt.createCenterConstraint_(t), r = i.constraint, o = vt.createRotationConstraint_(t); this.constraints_ = { center: n, resolution: r, rotation: o }, void 0 !== t.resolution ? e.resolution = t.resolution : void 0 !== t.zoom && (e.resolution = this.constrainResolution(this.maxResolution_, t.zoom - this.minZoom_), this.resolutions_ && (e.resolution = F.clamp(Number(this.getResolution() || e.resolution), this.minResolution_, this.maxResolution_))), e.rotation = void 0 !== t.rotation ? t.rotation : 0, this.setProperties(e), this.options_ = t; }, vt.prototype.getUpdatedOptions_ = function (t) { var e = r.assign({}, this.options_); return void 0 !== e.resolution ? e.resolution = this.getResolution() : e.zoom = this.getZoom(), e.center = this.getCenter(), e.rotation = this.getRotation(), r.assign({}, e, t); }, vt.prototype.animate = function (t) { var e, i = arguments.length; if (i > 1 && "function" == typeof arguments[i - 1] && (e = arguments[i - 1], --i), !this.isDef()) {
    var n = arguments[i - 1];
    return n.center && this.setCenter(n.center), void 0 !== n.zoom && this.setZoom(n.zoom), void 0 !== n.rotation && this.setRotation(n.rotation), void (e && e(!0));
} for (var r = Date.now(), o = this.getCenter().slice(), s = this.getResolution(), a = this.getRotation(), h = [], l = 0; l < i; ++l) {
    var u = arguments[l], c = { start: r, complete: !1, anchor: u.anchor, duration: void 0 !== u.duration ? u.duration : 1e3, easing: u.easing || U.inAndOut };
    if (u.center && (c.sourceCenter = o, c.targetCenter = u.center, o = c.targetCenter), void 0 !== u.zoom ? (c.sourceResolution = s, c.targetResolution = this.constrainResolution(this.maxResolution_, u.zoom - this.minZoom_, 0), s = c.targetResolution) : u.resolution && (c.sourceResolution = s, c.targetResolution = u.resolution, s = c.targetResolution), void 0 !== u.rotation) {
        c.sourceRotation = a;
        var d = F.modulo(u.rotation - a + Math.PI, 2 * Math.PI) - Math.PI;
        c.targetRotation = a + d, a = c.targetRotation;
    }
    c.callback = e, vt.isNoopAnimation(c) ? c.complete = !0 : r += c.duration, h.push(c);
} this.animations_.push(h), this.setHint(0, 1), this.updateAnimations_(); }, vt.prototype.getAnimating = function () { return this.hints_[0] > 0; }, vt.prototype.getInteracting = function () { return this.hints_[1] > 0; }, vt.prototype.cancelAnimations = function () { this.setHint(0, -this.hints_[0]); for (var t = 0, e = this.animations_.length; t < e; ++t) {
    var i = this.animations_[t];
    i[0].callback && i[0].callback(!1);
} this.animations_.length = 0; }, vt.prototype.updateAnimations_ = function () { if (void 0 !== this.updateAnimationKey_ && (cancelAnimationFrame(this.updateAnimationKey_), this.updateAnimationKey_ = void 0), this.getAnimating()) {
    for (var t = Date.now(), e = !1, i = this.animations_.length - 1; i >= 0; --i) {
        for (var n = this.animations_[i], r = !0, o = 0, s = n.length; o < s; ++o) {
            var a = n[o];
            if (!a.complete) {
                var h = t - a.start, l = a.duration > 0 ? h / a.duration : 1;
                l >= 1 ? (a.complete = !0, l = 1) : r = !1;
                var u = a.easing(l);
                if (a.sourceCenter) {
                    var c = a.sourceCenter[0], d = a.sourceCenter[1], p = c + u * (a.targetCenter[0] - c), f = d + u * (a.targetCenter[1] - d);
                    this.set("center", [p, f]);
                }
                if (a.sourceResolution && a.targetResolution) {
                    var g = 1 === u ? a.targetResolution : a.sourceResolution + u * (a.targetResolution - a.sourceResolution);
                    a.anchor && this.set("center", this.calculateCenterZoom(g, a.anchor)), this.set("resolution", g);
                }
                if (void 0 !== a.sourceRotation && void 0 !== a.targetRotation) {
                    var _ = 1 === u ? F.modulo(a.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : a.sourceRotation + u * (a.targetRotation - a.sourceRotation);
                    a.anchor && this.set("center", this.calculateCenterRotate(_, a.anchor)), this.set("rotation", _);
                }
                if (e = !0, !a.complete)
                    break;
            }
        }
        if (r) {
            this.animations_[i] = null, this.setHint(0, -1);
            var v = n[0].callback;
            v && v(!0);
        }
    }
    this.animations_ = this.animations_.filter(Boolean), e && void 0 === this.updateAnimationKey_ && (this.updateAnimationKey_ = requestAnimationFrame(this.updateAnimations_));
} }, vt.prototype.calculateCenterRotate = function (t, e) { var i, n = this.getCenter(); return void 0 !== n && (i = [n[0] - e[0], n[1] - e[1]], G.rotate(i, t - this.getRotation()), G.add(i, e)), i; }, vt.prototype.calculateCenterZoom = function (t, e) { var i, n = this.getCenter(), r = this.getResolution(); return void 0 !== n && void 0 !== r && (i = [e[0] - t * (e[0] - n[0]) / r, e[1] - t * (e[1] - n[1]) / r]), i; }, vt.prototype.getSizeFromViewport_ = function () { var t = [100, 100], e = '.ol-viewport[data-view="' + i.getUid(this) + '"]', n = document.querySelector(e); if (n) {
    var r = getComputedStyle(n);
    t[0] = parseInt(r.width, 10), t[1] = parseInt(r.height, 10);
} return t; }, vt.prototype.constrainCenter = function (t) { return this.constraints_.center(t); }, vt.prototype.constrainResolution = function (t, e, i) { var n = e || 0, r = i || 0; return this.constraints_.resolution(t, n, r); }, vt.prototype.constrainRotation = function (t, e) { var i = e || 0; return this.constraints_.rotation(t, i); }, vt.prototype.getCenter = function () { return this.get("center"); }, vt.prototype.getConstraints = function () { return this.constraints_; }, vt.prototype.getHints = function (t) { return void 0 !== t ? (t[0] = this.hints_[0], t[1] = this.hints_[1], t) : this.hints_.slice(); }, vt.prototype.calculateExtent = function (t) { var e = t || this.getSizeFromViewport_(), i = this.getCenter(); w(i, 1); var n = this.getResolution(); w(void 0 !== n, 2); var r = this.getRotation(); return w(void 0 !== r, 3), B.getForViewAndSize(i, n, r, e); }, vt.prototype.getMaxResolution = function () { return this.maxResolution_; }, vt.prototype.getMinResolution = function () { return this.minResolution_; }, vt.prototype.getMaxZoom = function () { return this.getZoomForResolution(this.minResolution_); }, vt.prototype.setMaxZoom = function (t) { this.applyOptions_(this.getUpdatedOptions_({ maxZoom: t })); }, vt.prototype.getMinZoom = function () { return this.getZoomForResolution(this.maxResolution_); }, vt.prototype.setMinZoom = function (t) { this.applyOptions_(this.getUpdatedOptions_({ minZoom: t })); }, vt.prototype.getProjection = function () { return this.projection_; }, vt.prototype.getResolution = function () { return this.get("resolution"); }, vt.prototype.getResolutions = function () { return this.resolutions_; }, vt.prototype.getResolutionForExtent = function (t, e) { var i = e || this.getSizeFromViewport_(), n = B.getWidth(t) / i[0], r = B.getHeight(t) / i[1]; return Math.max(n, r); }, vt.prototype.getResolutionForValueFunction = function (t) { var e = t || 2, i = this.maxResolution_, n = this.minResolution_, r = Math.log(i / n) / Math.log(e); return function (t) { return i / Math.pow(e, t * r); }; }, vt.prototype.getRotation = function () { return this.get("rotation"); }, vt.prototype.getValueForResolutionFunction = function (t) { var e = t || 2, i = this.maxResolution_, n = this.minResolution_, r = Math.log(i / n) / Math.log(e); return function (t) { return Math.log(i / t) / Math.log(e) / r; }; }, vt.prototype.getState = function () { var t = this.getCenter(), e = this.getProjection(), i = this.getResolution(), n = this.getRotation(); return { center: t.slice(), projection: void 0 !== e ? e : null, resolution: i, rotation: n, zoom: this.getZoom() }; }, vt.prototype.getZoom = function () { var t, e = this.getResolution(); return void 0 !== e && (t = this.getZoomForResolution(e)), t; }, vt.prototype.getZoomForResolution = function (t) { var e, i, n = this.minZoom_ || 0; if (this.resolutions_) {
    var r = S.linearFindNearest(this.resolutions_, t, 1);
    n = r, e = this.resolutions_[r], i = r == this.resolutions_.length - 1 ? 2 : e / this.resolutions_[r + 1];
}
else
    e = this.maxResolution_, i = this.zoomFactor_; return n + Math.log(e / t) / Math.log(i); }, vt.prototype.getResolutionForZoom = function (t) { return this.constrainResolution(this.maxResolution_, t - this.minZoom_, 0); }, vt.prototype.fit = function (t, e) { var n, r = e || {}, o = r.size; o || (o = this.getSizeFromViewport_()), t instanceof it ? "Circle" === t.getType() ? (t = t.getExtent(), (n = _t.fromExtent(t)).rotate(this.getRotation(), B.getCenter(t))) : n = t : (w(Array.isArray(t), 24), w(!B.isEmpty(t), 25), n = _t.fromExtent(t)); var s, a = void 0 !== r.padding ? r.padding : [0, 0, 0, 0], h = void 0 === r.constrainResolution || r.constrainResolution, l = void 0 !== r.nearest && r.nearest; s = void 0 !== r.minResolution ? r.minResolution : void 0 !== r.maxZoom ? this.constrainResolution(this.maxResolution_, r.maxZoom - this.minZoom_, 0) : 0; for (var u = n.getFlatCoordinates(), c = this.getRotation(), d = Math.cos(-c), p = Math.sin(-c), f = 1 / 0, g = 1 / 0, _ = -1 / 0, v = -1 / 0, y = n.getStride(), m = 0, x = u.length; m < x; m += y) {
    var E = u[m] * d - u[m + 1] * p, T = u[m] * p + u[m + 1] * d;
    f = Math.min(f, E), g = Math.min(g, T), _ = Math.max(_, E), v = Math.max(v, T);
} var C = this.getResolutionForExtent([f, g, _, v], [o[0] - a[1] - a[3], o[1] - a[0] - a[2]]); if (C = isNaN(C) ? s : Math.max(C, s), h) {
    var S = this.constrainResolution(C, 0, 0);
    !l && S < C && (S = this.constrainResolution(S, -1, 0)), C = S;
} p = -p; var R = (f + _) / 2, I = (g + v) / 2, L = [(R += (a[1] - a[3]) / 2 * C) * d - (I += (a[0] - a[2]) / 2 * C) * p, I * d + R * p], A = r.callback ? r.callback : i.nullFunction; void 0 !== r.duration ? this.animate({ resolution: C, center: L, duration: r.duration, easing: r.easing }, A) : (this.setResolution(C), this.setCenter(L), setTimeout(A.bind(void 0, !0), 0)); }, vt.prototype.centerOn = function (t, e, i) { var n = this.getRotation(), r = Math.cos(-n), o = Math.sin(-n), s = t[0] * r - t[1] * o, a = t[1] * r + t[0] * o, h = this.getResolution(), l = (s += (e[0] / 2 - i[0]) * h) * r - (a += (i[1] - e[1] / 2) * h) * (o = -o), u = a * r + s * o; this.setCenter([l, u]); }, vt.prototype.isDef = function () { return !!this.getCenter() && void 0 !== this.getResolution(); }, vt.prototype.rotate = function (t, e) { if (void 0 !== e) {
    var i = this.calculateCenterRotate(t, e);
    this.setCenter(i);
} this.setRotation(t); }, vt.prototype.setCenter = function (t) { this.set("center", t), this.getAnimating() && this.cancelAnimations(); }, vt.prototype.setHint = function (t, e) { return this.hints_[t] += e, this.changed(), this.hints_[t]; }, vt.prototype.setResolution = function (t) { this.set("resolution", t), this.getAnimating() && this.cancelAnimations(); }, vt.prototype.setRotation = function (t) { this.set("rotation", t), this.getAnimating() && this.cancelAnimations(); }, vt.prototype.setZoom = function (t) { this.setResolution(this.getResolutionForZoom(t)); }, vt.createCenterConstraint_ = function (t) { return void 0 !== t.extent ? M.createExtent(t.extent) : M.none; }, vt.createResolutionConstraint_ = function (t) { var e, n, r, o = void 0 !== t.minZoom ? t.minZoom : i.DEFAULT_MIN_ZOOM, s = void 0 !== t.maxZoom ? t.maxZoom : 28, a = void 0 !== t.zoomFactor ? t.zoomFactor : 2; if (void 0 !== t.resolutions) {
    var h = t.resolutions;
    n = h[o], r = void 0 !== h[s] ? h[s] : h[h.length - 1], e = b(h);
}
else {
    var l = $.createProjection(t.projection, "EPSG:3857"), u = l.getExtent(), c = (u ? Math.max(B.getWidth(u), B.getHeight(u)) : 360 * $.METERS_PER_UNIT[Y.DEGREES] / l.getMetersPerUnit()) / i.DEFAULT_TILE_SIZE / Math.pow(2, i.DEFAULT_MIN_ZOOM), d = c / Math.pow(2, 28 - i.DEFAULT_MIN_ZOOM);
    void 0 !== (n = t.maxResolution) ? o = 0 : n = c / Math.pow(a, o), void 0 === (r = t.minResolution) && (r = void 0 !== t.maxZoom ? void 0 !== t.maxResolution ? n / Math.pow(a, s) : c / Math.pow(a, s) : d), s = o + Math.floor(Math.log(n / r) / Math.log(a)), r = n / Math.pow(a, s - o), e = D(a, n, s - o);
} return { constraint: e, maxResolution: n, minResolution: r, minZoom: o, zoomFactor: a }; }, vt.createRotationConstraint_ = function (t) { if (void 0 === t.enableRotation || t.enableRotation) {
    var e = t.constrainRotation;
    return void 0 === e || !0 === e ? O.createSnapToZero() : !1 === e ? O.none : "number" == typeof e ? O.createSnapToN(e) : O.none;
} return O.disable; }, vt.isNoopAnimation = function (t) { return !(t.sourceCenter && t.targetCenter && !G.equals(t.sourceCenter, t.targetCenter)) && t.sourceResolution === t.targetResolution && t.sourceRotation === t.targetRotation; }; var yt = function (t, e) { var i = document.createElement("CANVAS"); return t && (i.width = t), e && (i.height = e), i.getContext("2d"); }, mt = function (t, e) { var i = e.parentNode; i && i.replaceChild(t, e); }, xt = function (t) { return t && t.parentNode ? t.parentNode.removeChild(t) : null; }, Et = function (t) { u.call(this); var e = r.assign({}, t); e.opacity = void 0 !== t.opacity ? t.opacity : 1, e.visible = void 0 === t.visible || t.visible, e.zIndex = void 0 !== t.zIndex ? t.zIndex : 0, e.maxResolution = void 0 !== t.maxResolution ? t.maxResolution : 1 / 0, e.minResolution = void 0 !== t.minResolution ? t.minResolution : 0, this.setProperties(e), this.state_ = { layer: this, managed: !0 }, this.type; }; i.inherits(Et, u), Et.prototype.getType = function () { return this.type; }, Et.prototype.getLayerState = function () { return this.state_.opacity = F.clamp(this.getOpacity(), 0, 1), this.state_.sourceState = this.getSourceState(), this.state_.visible = this.getVisible(), this.state_.extent = this.getExtent(), this.state_.zIndex = this.getZIndex(), this.state_.maxResolution = this.getMaxResolution(), this.state_.minResolution = Math.max(this.getMinResolution(), 0), this.state_; }, Et.prototype.getLayersArray = function (t) { }, Et.prototype.getLayerStatesArray = function (t) { }, Et.prototype.getExtent = function () { return this.get("extent"); }, Et.prototype.getMaxResolution = function () { return this.get("maxResolution"); }, Et.prototype.getMinResolution = function () { return this.get("minResolution"); }, Et.prototype.getOpacity = function () { return this.get("opacity"); }, Et.prototype.getSourceState = function () { }, Et.prototype.getVisible = function () { return this.get("visible"); }, Et.prototype.getZIndex = function () { return this.get("zIndex"); }, Et.prototype.setExtent = function (t) { this.set("extent", t); }, Et.prototype.setMaxResolution = function (t) { this.set("maxResolution", t); }, Et.prototype.setMinResolution = function (t) { this.set("minResolution", t); }, Et.prototype.setOpacity = function (t) { this.set("opacity", t); }, Et.prototype.setVisible = function (t) { this.set("visible", t); }, Et.prototype.setZIndex = function (t) { this.set("zIndex", t); }; var Tt = function (t) { var e = t || {}, i = r.assign({}, e); delete i.layers; var n = e.layers; Et.call(this, i), this.layersListenerKeys_ = [], this.listenerKeys_ = {}, o.listen(this, u.getChangeEventType(Tt.Property_.LAYERS), this.handleLayersChanged_, this), n ? Array.isArray(n) ? n = new c(n.slice(), { unique: !0 }) : (w(n instanceof c, 43), n = n) : n = new c(void 0, { unique: !0 }), this.setLayers(n); }; i.inherits(Tt, Et), Tt.prototype.handleLayerChange_ = function () { this.changed(); }, Tt.prototype.handleLayersChanged_ = function (t) { this.layersListenerKeys_.forEach(o.unlistenByKey), this.layersListenerKeys_.length = 0; var e = this.getLayers(); for (var n in this.layersListenerKeys_.push(o.listen(e, "add", this.handleLayersAdd_, this), o.listen(e, "remove", this.handleLayersRemove_, this)), this.listenerKeys_)
    this.listenerKeys_[n].forEach(o.unlistenByKey); r.clear(this.listenerKeys_); var s, a, h, l = e.getArray(); for (s = 0, a = l.length; s < a; s++)
    h = l[s], this.listenerKeys_[i.getUid(h).toString()] = [o.listen(h, "propertychange", this.handleLayerChange_, this), o.listen(h, "change", this.handleLayerChange_, this)]; this.changed(); }, Tt.prototype.handleLayersAdd_ = function (t) { var e = t.element, n = i.getUid(e).toString(); this.listenerKeys_[n] = [o.listen(e, "propertychange", this.handleLayerChange_, this), o.listen(e, "change", this.handleLayerChange_, this)], this.changed(); }, Tt.prototype.handleLayersRemove_ = function (t) { var e = t.element, n = i.getUid(e).toString(); this.listenerKeys_[n].forEach(o.unlistenByKey), delete this.listenerKeys_[n], this.changed(); }, Tt.prototype.getLayers = function () { return this.get(Tt.Property_.LAYERS); }, Tt.prototype.setLayers = function (t) { this.set(Tt.Property_.LAYERS, t); }, Tt.prototype.getLayersArray = function (t) { var e = void 0 !== t ? t : []; return this.getLayers().forEach(function (t) { t.getLayersArray(e); }), e; }, Tt.prototype.getLayerStatesArray = function (t) { var e = void 0 !== t ? t : [], i = e.length; this.getLayers().forEach(function (t) { t.getLayerStatesArray(e); }); var n, r, o, s = this.getLayerState(); for (n = i, r = e.length; n < r; n++)
    (o = e[n]).opacity *= s.opacity, o.visible = o.visible && s.visible, o.maxResolution = Math.min(o.maxResolution, s.maxResolution), o.minResolution = Math.max(o.minResolution, s.minResolution), void 0 !== s.extent && (void 0 !== o.extent ? o.extent = B.getIntersection(o.extent, s.extent) : o.extent = s.extent); return e; }, Tt.prototype.getSourceState = function () { return "ready"; }, Tt.Property_ = { LAYERS: "layers" }; var Ct = { mapRendererPlugins_: [], getMapRendererPlugins: function () { return Ct.mapRendererPlugins_; }, layerRendererPlugins_: [], getLayerRendererPlugins: function () { return Ct.layerRendererPlugins_; }, register: function (t, e) { switch (t) {
        case "MAP_RENDERER":
            Ct.mapRendererPlugins_.push(e);
            break;
        case "LAYER_RENDERER":
            Ct.layerRendererPlugins_.push(e);
            break;
        default: throw new Error("Unsupported plugin type: " + t);
    } }, registerMultiple: function (t, e) { for (var i = 0, n = e.length; i < n; ++i)
        Ct.register(t, e[i]); } }, St = function (t) { return t[0] > 0 && t[1] > 0; }, Rt = function (t, e, i) { return void 0 === i && (i = [0, 0]), i[0] = t[0] * e + .5 | 0, i[1] = t[1] * e + .5 | 0, i; }, It = function (t, e) { return Array.isArray(t) ? t : (void 0 === e ? e = [t, t] : e[0] = e[1] = t, e); }, Lt = function (t) { u.call(this); var e = Lt.createOptionsInternal(t); this.loadTilesWhileAnimating_ = void 0 !== t.loadTilesWhileAnimating && t.loadTilesWhileAnimating, this.loadTilesWhileInteracting_ = void 0 !== t.loadTilesWhileInteracting && t.loadTilesWhileInteracting, this.pixelRatio_ = void 0 !== t.pixelRatio ? t.pixelRatio : g.DEVICE_PIXEL_RATIO, this.logos_ = e.logos, this.animationDelayKey_, this.animationDelay_ = function () { this.animationDelayKey_ = void 0, this.renderFrame_.call(this, Date.now()); }.bind(this), this.coordinateToPixelTransform_ = tt.create(), this.pixelToCoordinateTransform_ = tt.create(), this.frameIndex_ = 0, this.frameState_ = null, this.previousExtent_ = null, this.viewPropertyListenerKey_ = null, this.viewChangeListenerKey_ = null, this.layerGroupPropertyListenerKeys_ = null, this.viewport_ = document.createElement("DIV"), this.viewport_.className = "ol-viewport" + (g.TOUCH ? " ol-touch" : ""), this.viewport_.style.position = "relative", this.viewport_.style.overflow = "hidden", this.viewport_.style.width = "100%", this.viewport_.style.height = "100%", this.viewport_.style.msTouchAction = "none", this.viewport_.style.touchAction = "none", this.overlayContainer_ = document.createElement("DIV"), this.overlayContainer_.className = "ol-overlaycontainer", this.viewport_.appendChild(this.overlayContainer_), this.overlayContainerStopEvent_ = document.createElement("DIV"), this.overlayContainerStopEvent_.className = "ol-overlaycontainer-stopevent"; for (var i = ["click", "dblclick", "mousedown", "touchstart", "MSPointerDown", v.POINTERDOWN, "mousewheel", "wheel"], n = 0, r = i.length; n < r; ++n)
    o.listen(this.overlayContainerStopEvent_, i[n], a.stopPropagation); for (var s in this.viewport_.appendChild(this.overlayContainerStopEvent_), this.mapBrowserEventHandler_ = new L(this, t.moveTolerance), v)
    o.listen(this.mapBrowserEventHandler_, v[s], this.handleMapBrowserEvent, this); this.keyboardEventTarget_ = e.keyboardEventTarget, this.keyHandlerKeys_ = null, o.listen(this.viewport_, "wheel", this.handleBrowserEvent, this), o.listen(this.viewport_, "mousewheel", this.handleBrowserEvent, this), this.controls = e.controls || new c, this.interactions = e.interactions || new c, this.overlays_ = e.overlays, this.overlayIdIndex_ = {}, this.renderer_ = e.mapRendererPlugin.create(this.viewport_, this), this.handleResize_, this.focus_ = null, this.postRenderFunctions_ = [], this.tileQueue_ = new P(this.getTilePriority.bind(this), this.handleTileChange_.bind(this)), this.skippedFeatureUids_ = {}, o.listen(this, u.getChangeEventType("layergroup"), this.handleLayerGroupChanged_, this), o.listen(this, u.getChangeEventType("view"), this.handleViewChanged_, this), o.listen(this, u.getChangeEventType("size"), this.handleSizeChanged_, this), o.listen(this, u.getChangeEventType("target"), this.handleTargetChanged_, this), this.setProperties(e.values), this.controls.forEach(function (t) { t.setMap(this); }, this), o.listen(this.controls, "add", function (t) { t.element.setMap(this); }, this), o.listen(this.controls, "remove", function (t) { t.element.setMap(null); }, this), this.interactions.forEach(function (t) { t.setMap(this); }, this), o.listen(this.interactions, "add", function (t) { t.element.setMap(this); }, this), o.listen(this.interactions, "remove", function (t) { t.element.setMap(null); }, this), this.overlays_.forEach(this.addOverlayInternal_, this), o.listen(this.overlays_, "add", function (t) { this.addOverlayInternal_(t.element); }, this), o.listen(this.overlays_, "remove", function (t) { var e = t.element.getId(); void 0 !== e && delete this.overlayIdIndex_[e.toString()], t.element.setMap(null); }, this); }; i.inherits(Lt, u), Lt.prototype.addControl = function (t) { this.getControls().push(t); }, Lt.prototype.addInteraction = function (t) { this.getInteractions().push(t); }, Lt.prototype.addLayer = function (t) { this.getLayerGroup().getLayers().push(t); }, Lt.prototype.addOverlay = function (t) { this.getOverlays().push(t); }, Lt.prototype.addOverlayInternal_ = function (t) { var e = t.getId(); void 0 !== e && (this.overlayIdIndex_[e.toString()] = t), t.setMap(this); }, Lt.prototype.disposeInternal = function () { this.mapBrowserEventHandler_.dispose(), o.unlisten(this.viewport_, "wheel", this.handleBrowserEvent, this), o.unlisten(this.viewport_, "mousewheel", this.handleBrowserEvent, this), void 0 !== this.handleResize_ && (window.removeEventListener("resize", this.handleResize_, !1), this.handleResize_ = void 0), this.animationDelayKey_ && (cancelAnimationFrame(this.animationDelayKey_), this.animationDelayKey_ = void 0), this.setTarget(null), u.prototype.disposeInternal.call(this); }, Lt.prototype.forEachFeatureAtPixel = function (t, e, i) { if (this.frameState_) {
    var n = this.getCoordinateFromPixel(t), r = void 0 !== (i = void 0 !== i ? i : {}).hitTolerance ? i.hitTolerance * this.frameState_.pixelRatio : 0, o = void 0 !== i.layerFilter ? i.layerFilter : N.TRUE;
    return this.renderer_.forEachFeatureAtCoordinate(n, this.frameState_, r, e, null, o, null);
} }, Lt.prototype.getFeaturesAtPixel = function (t, e) { var i = null; return this.forEachFeatureAtPixel(t, function (t) { i || (i = []), i.push(t); }, e), i; }, Lt.prototype.forEachLayerAtPixel = function (t, e, i, n, r) { if (this.frameState_) {
    var o = void 0 !== i ? i : null, s = void 0 !== n ? n : N.TRUE, a = void 0 !== r ? r : null;
    return this.renderer_.forEachLayerAtPixel(t, this.frameState_, e, o, s, a);
} }, Lt.prototype.hasFeatureAtPixel = function (t, e) { if (!this.frameState_)
    return !1; var i = this.getCoordinateFromPixel(t), n = void 0 !== (e = void 0 !== e ? e : {}).layerFilter ? e.layerFilter : N.TRUE, r = void 0 !== e.hitTolerance ? e.hitTolerance * this.frameState_.pixelRatio : 0; return this.renderer_.hasFeatureAtCoordinate(i, this.frameState_, r, n, null); }, Lt.prototype.getEventCoordinate = function (t) { return this.getCoordinateFromPixel(this.getEventPixel(t)); }, Lt.prototype.getEventPixel = function (t) { var e = this.viewport_.getBoundingClientRect(), i = t.changedTouches ? t.changedTouches[0] : t; return [i.clientX - e.left, i.clientY - e.top]; }, Lt.prototype.getTarget = function () { return this.get("target"); }, Lt.prototype.getTargetElement = function () { var t = this.getTarget(); return void 0 !== t ? "string" == typeof t ? document.getElementById(t) : t : null; }, Lt.prototype.getCoordinateFromPixel = function (t) { var e = this.frameState_; return e ? tt.apply(e.pixelToCoordinateTransform, t.slice()) : null; }, Lt.prototype.getControls = function () { return this.controls; }, Lt.prototype.getOverlays = function () { return this.overlays_; }, Lt.prototype.getOverlayById = function (t) { var e = this.overlayIdIndex_[t.toString()]; return void 0 !== e ? e : null; }, Lt.prototype.getInteractions = function () { return this.interactions; }, Lt.prototype.getLayerGroup = function () { return this.get("layergroup"); }, Lt.prototype.getLayers = function () { return this.getLayerGroup().getLayers(); }, Lt.prototype.getPixelFromCoordinate = function (t) { var e = this.frameState_; return e ? tt.apply(e.coordinateToPixelTransform, t.slice(0, 2)) : null; }, Lt.prototype.getRenderer = function () { return this.renderer_; }, Lt.prototype.getSize = function () { return this.get("size"); }, Lt.prototype.getView = function () { return this.get("view"); }, Lt.prototype.getViewport = function () { return this.viewport_; }, Lt.prototype.getOverlayContainer = function () { return this.overlayContainer_; }, Lt.prototype.getOverlayContainerStopEvent = function () { return this.overlayContainerStopEvent_; }, Lt.prototype.getTilePriority = function (t, e, i, n) { var r = this.frameState_; if (!(r && e in r.wantedTiles))
    return A.DROP; if (!r.wantedTiles[e][t.getKey()])
    return A.DROP; var o = i[0] - r.focus[0], s = i[1] - r.focus[1]; return 65536 * Math.log(n) + Math.sqrt(o * o + s * s) / n; }, Lt.prototype.handleBrowserEvent = function (t, e) { var i = e || t.type, n = new p(i, this, t); this.handleMapBrowserEvent(n); }, Lt.prototype.handleMapBrowserEvent = function (t) { if (this.frameState_) {
    this.focus_ = t.coordinate, t.frameState = this.frameState_;
    var e, i = this.getInteractions().getArray();
    if (!1 !== this.dispatchEvent(t))
        for (e = i.length - 1; e >= 0; e--) {
            var n = i[e];
            if (n.getActive() && !n.handleEvent(t))
                break;
        }
} }, Lt.prototype.handlePostRender = function () { var t = this.frameState_, e = this.tileQueue_; if (!e.isEmpty()) {
    var i = 16, n = i;
    if (t) {
        var r = t.viewHints;
        r[0] && (i = this.loadTilesWhileAnimating_ ? 8 : 0, n = 2), r[1] && (i = this.loadTilesWhileInteracting_ ? 8 : 0, n = 2);
    }
    e.getTilesLoading() < i && (e.reprioritize(), e.loadMoreTiles(i, n));
} var o, s, a = this.postRenderFunctions_; for (o = 0, s = a.length; o < s; ++o)
    a[o](this, t); a.length = 0; }, Lt.prototype.handleSizeChanged_ = function () { this.render(); }, Lt.prototype.handleTargetChanged_ = function () { var t; if (this.getTarget() && (t = this.getTargetElement()), this.keyHandlerKeys_) {
    for (var e = 0, i = this.keyHandlerKeys_.length; e < i; ++e)
        o.unlistenByKey(this.keyHandlerKeys_[e]);
    this.keyHandlerKeys_ = null;
} if (t) {
    t.appendChild(this.viewport_);
    var n = this.keyboardEventTarget_ ? this.keyboardEventTarget_ : t;
    this.keyHandlerKeys_ = [o.listen(n, "keydown", this.handleBrowserEvent, this), o.listen(n, "keypress", this.handleBrowserEvent, this)], this.handleResize_ || (this.handleResize_ = this.updateSize.bind(this), window.addEventListener("resize", this.handleResize_, !1));
}
else
    this.renderer_.removeLayerRenderers(), xt(this.viewport_), void 0 !== this.handleResize_ && (window.removeEventListener("resize", this.handleResize_, !1), this.handleResize_ = void 0); this.updateSize(); }, Lt.prototype.handleTileChange_ = function () { this.render(); }, Lt.prototype.handleViewPropertyChanged_ = function () { this.render(); }, Lt.prototype.handleViewChanged_ = function () { this.viewPropertyListenerKey_ && (o.unlistenByKey(this.viewPropertyListenerKey_), this.viewPropertyListenerKey_ = null), this.viewChangeListenerKey_ && (o.unlistenByKey(this.viewChangeListenerKey_), this.viewChangeListenerKey_ = null); var t = this.getView(); t && (this.viewport_.setAttribute("data-view", i.getUid(t)), this.viewPropertyListenerKey_ = o.listen(t, "propertychange", this.handleViewPropertyChanged_, this), this.viewChangeListenerKey_ = o.listen(t, "change", this.handleViewPropertyChanged_, this)), this.render(); }, Lt.prototype.handleLayerGroupChanged_ = function () { this.layerGroupPropertyListenerKeys_ && (this.layerGroupPropertyListenerKeys_.forEach(o.unlistenByKey), this.layerGroupPropertyListenerKeys_ = null); var t = this.getLayerGroup(); t && (this.layerGroupPropertyListenerKeys_ = [o.listen(t, "propertychange", this.render, this), o.listen(t, "change", this.render, this)]), this.render(); }, Lt.prototype.isRendered = function () { return !!this.frameState_; }, Lt.prototype.renderSync = function () { this.animationDelayKey_ && cancelAnimationFrame(this.animationDelayKey_), this.animationDelay_(); }, Lt.prototype.render = function () { void 0 === this.animationDelayKey_ && (this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_)); }, Lt.prototype.removeControl = function (t) { return this.getControls().remove(t); }, Lt.prototype.removeInteraction = function (t) { return this.getInteractions().remove(t); }, Lt.prototype.removeLayer = function (t) { return this.getLayerGroup().getLayers().remove(t); }, Lt.prototype.removeOverlay = function (t) { return this.getOverlays().remove(t); }, Lt.prototype.renderFrame_ = function (t) { var e, n, o, s = this.getSize(), a = this.getView(), h = B.createEmpty(), l = this.frameState_, u = null; if (void 0 !== s && St(s) && a && a.isDef()) {
    var c = a.getHints(this.frameState_ ? this.frameState_.viewHints : void 0), p = this.getLayerGroup().getLayerStatesArray(), f = {};
    for (e = 0, n = p.length; e < n; ++e)
        f[i.getUid(p[e].layer)] = p[e];
    var g = (o = a.getState()).center, _ = o.resolution / this.pixelRatio_;
    g[0] = Math.round(g[0] / _) * _, g[1] = Math.round(g[1] / _) * _, u = { animate: !1, coordinateToPixelTransform: this.coordinateToPixelTransform_, extent: h, focus: this.focus_ ? this.focus_ : g, index: this.frameIndex_++, layerStates: f, layerStatesArray: p, logos: r.assign({}, this.logos_), pixelRatio: this.pixelRatio_, pixelToCoordinateTransform: this.pixelToCoordinateTransform_, postRenderFunctions: [], size: s, skippedFeatureUids: this.skippedFeatureUids_, tileQueue: this.tileQueue_, time: t, usedTiles: {}, viewState: o, viewHints: c, wantedTiles: {} };
} u && (u.extent = B.getForViewAndSize(o.center, o.resolution, o.rotation, u.size, h)), this.frameState_ = u, this.renderer_.renderFrame(u), u && (u.animate && this.render(), Array.prototype.push.apply(this.postRenderFunctions_, u.postRenderFunctions), l && (!this.previousExtent_ || !B.isEmpty(this.previousExtent_) && !B.equals(u.extent, this.previousExtent_)) && (this.dispatchEvent(new d("movestart", this, l)), this.previousExtent_ = B.createOrUpdateEmpty(this.previousExtent_)), this.previousExtent_ && !u.viewHints[0] && !u.viewHints[1] && !B.equals(u.extent, this.previousExtent_) && (this.dispatchEvent(new d("moveend", this, u)), B.clone(u.extent, this.previousExtent_))), this.dispatchEvent(new d("postrender", this, u)), setTimeout(this.handlePostRender.bind(this), 0); }, Lt.prototype.setLayerGroup = function (t) { this.set("layergroup", t); }, Lt.prototype.setSize = function (t) { this.set("size", t); }, Lt.prototype.setTarget = function (t) { this.set("target", t); }, Lt.prototype.setView = function (t) { this.set("view", t); }, Lt.prototype.skipFeature = function (t) { var e = i.getUid(t).toString(); this.skippedFeatureUids_[e] = !0, this.render(); }, Lt.prototype.updateSize = function () { var t = this.getTargetElement(); if (t) {
    var e = getComputedStyle(t);
    this.setSize([t.offsetWidth - parseFloat(e.borderLeftWidth) - parseFloat(e.paddingLeft) - parseFloat(e.paddingRight) - parseFloat(e.borderRightWidth), t.offsetHeight - parseFloat(e.borderTopWidth) - parseFloat(e.paddingTop) - parseFloat(e.paddingBottom) - parseFloat(e.borderBottomWidth)]);
}
else
    this.setSize(void 0); }, Lt.prototype.unskipFeature = function (t) { var e = i.getUid(t).toString(); delete this.skippedFeatureUids_[e], this.render(); }, Lt.DEFAULT_RENDERER_TYPES = ["canvas", "webgl"], Lt.LOGO_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC", Lt.createOptionsInternal = function (t) { var e = null; void 0 !== t.keyboardEventTarget && (e = "string" == typeof t.keyboardEventTarget ? document.getElementById(t.keyboardEventTarget) : t.keyboardEventTarget); var n = {}, r = {}; if (void 0 === t.logo || "boolean" == typeof t.logo && t.logo)
    r[Lt.LOGO_URL] = "https://openlayers.org/";
else {
    var o = t.logo;
    "string" == typeof o ? r[o] = "" : o instanceof HTMLElement ? r[i.getUid(o).toString()] = o : o && (w("string" == typeof o.href, 44), w("string" == typeof o.src, 45), r[o.src] = o.href);
} var s, a, h = t.layers instanceof Tt ? t.layers : new Tt({ layers: t.layers }); n.layergroup = h, n.target = t.target, n.view = void 0 !== t.view ? t.view : new vt, void 0 !== t.renderer ? (Array.isArray(t.renderer) ? s = t.renderer : "string" == typeof t.renderer ? s = [t.renderer] : w(!1, 46), s.indexOf("dom") >= 0 && (s = s.concat(Lt.DEFAULT_RENDERER_TYPES))) : s = Lt.DEFAULT_RENDERER_TYPES; var l, u, d, p = Ct.getMapRendererPlugins(); t: for (var f = 0, g = s.length; f < g; ++f)
    for (var _ = s[f], v = 0, y = p.length; v < y; ++v) {
        var m = p[v];
        if (m.handles(_)) {
            a = m;
            break t;
        }
    } if (!a)
    throw new Error("Unable to create a map renderer for types: " + s.join(", ")); return void 0 !== t.controls && (Array.isArray(t.controls) ? l = new c(t.controls.slice()) : (w(t.controls instanceof c, 47), l = t.controls)), void 0 !== t.interactions && (Array.isArray(t.interactions) ? u = new c(t.interactions.slice()) : (w(t.interactions instanceof c, 48), u = t.interactions)), void 0 !== t.overlays ? Array.isArray(t.overlays) ? d = new c(t.overlays.slice()) : (w(t.overlays instanceof c, 49), d = t.overlays) : d = new c, { controls: l, interactions: u, keyboardEventTarget: e, logos: r, overlays: d, mapRendererPlugin: a, values: n }; }; var wt = function (t) { u.call(this), this.element = t.element ? t.element : null, this.target_ = null, this.map_ = null, this.listenerKeys = [], this.render = t.render ? t.render : i.nullFunction, t.target && this.setTarget(t.target); }; i.inherits(wt, u), wt.prototype.disposeInternal = function () { xt(this.element), u.prototype.disposeInternal.call(this); }, wt.prototype.getMap = function () { return this.map_; }, wt.prototype.setMap = function (t) { this.map_ && xt(this.element); for (var e = 0, n = this.listenerKeys.length; e < n; ++e)
    o.unlistenByKey(this.listenerKeys[e]); this.listenerKeys.length = 0, this.map_ = t, this.map_ && ((this.target_ ? this.target_ : t.getOverlayContainerStopEvent()).appendChild(this.element), this.render !== i.nullFunction && this.listenerKeys.push(o.listen(t, "postrender", this.render, this)), t.render()); }, wt.prototype.setTarget = function (t) { this.target_ = "string" == typeof t ? document.getElementById(t) : t; }; var At, Pt, Ft = { CLASS_HIDDEN: "ol-hidden", CLASS_SELECTABLE: "ol-selectable", CLASS_UNSELECTABLE: "ol-unselectable", CLASS_UNSUPPORTED: "ol-unsupported", CLASS_CONTROL: "ol-control" }; Ft.getFontFamilies = (Pt = {}, function (t) { if (At || (At = document.createElement("div").style), !(t in Pt)) {
    At.font = t;
    var e = At.fontFamily;
    if (At.font = "", !e)
        return null;
    Pt[t] = e.split(/,\s?/);
} return Pt[t]; }); var Mt = function (t) { var e = r.assign({}, t); delete e.source, Et.call(this, e), this.mapPrecomposeKey_ = null, this.mapRenderKey_ = null, this.sourceChangeKey_ = null, t.map && this.setMap(t.map), o.listen(this, u.getChangeEventType("source"), this.handleSourcePropertyChange_, this); var i = t.source ? t.source : null; this.setSource(i); }; i.inherits(Mt, Et), Mt.visibleAtResolution = function (t, e) { return t.visible && e >= t.minResolution && e < t.maxResolution; }, Mt.prototype.getLayersArray = function (t) { var e = t || []; return e.push(this), e; }, Mt.prototype.getLayerStatesArray = function (t) { var e = t || []; return e.push(this.getLayerState()), e; }, Mt.prototype.getSource = function () { return this.get("source") || null; }, Mt.prototype.getSourceState = function () { var t = this.getSource(); return t ? t.getState() : "undefined"; }, Mt.prototype.handleSourceChange_ = function () { this.changed(); }, Mt.prototype.handleSourcePropertyChange_ = function () { this.sourceChangeKey_ && (o.unlistenByKey(this.sourceChangeKey_), this.sourceChangeKey_ = null); var t = this.getSource(); t && (this.sourceChangeKey_ = o.listen(t, "change", this.handleSourceChange_, this)), this.changed(); }, Mt.prototype.setMap = function (t) { this.mapPrecomposeKey_ && (o.unlistenByKey(this.mapPrecomposeKey_), this.mapPrecomposeKey_ = null), t || this.changed(), this.mapRenderKey_ && (o.unlistenByKey(this.mapRenderKey_), this.mapRenderKey_ = null), t && (this.mapPrecomposeKey_ = o.listen(t, "precompose", function (t) { var e = this.getLayerState(); e.managed = !1, e.zIndex = 1 / 0, t.frameState.layerStatesArray.push(e), t.frameState.layerStates[i.getUid(this)] = e; }, this), this.mapRenderKey_ = o.listen(this, "change", t.render, t), this.changed()); }, Mt.prototype.setSource = function (t) { this.set("source", t); }; var bt = function (t) { var e = t || {}; this.ulElement_ = document.createElement("UL"), this.logoLi_ = document.createElement("LI"), this.ulElement_.appendChild(this.logoLi_), this.logoLi_.style.display = "none", this.collapsed_ = void 0 === e.collapsed || e.collapsed, this.collapsible_ = void 0 === e.collapsible || e.collapsible, this.collapsible_ || (this.collapsed_ = !1); var i = void 0 !== e.className ? e.className : "ol-attribution", n = void 0 !== e.tipLabel ? e.tipLabel : "Attributions", r = void 0 !== e.collapseLabel ? e.collapseLabel : "»"; "string" == typeof r ? (this.collapseLabel_ = document.createElement("span"), this.collapseLabel_.textContent = r) : this.collapseLabel_ = r; var s = void 0 !== e.label ? e.label : "i"; "string" == typeof s ? (this.label_ = document.createElement("span"), this.label_.textContent = s) : this.label_ = s; var a = this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_, h = document.createElement("button"); h.setAttribute("type", "button"), h.title = n, h.appendChild(a), o.listen(h, "click", this.handleClick_, this); var l = i + " " + Ft.CLASS_UNSELECTABLE + " " + Ft.CLASS_CONTROL + (this.collapsed_ && this.collapsible_ ? " ol-collapsed" : "") + (this.collapsible_ ? "" : " ol-uncollapsible"), u = document.createElement("div"); u.className = l, u.appendChild(this.ulElement_), u.appendChild(h); var c = e.render ? e.render : bt.render; wt.call(this, { element: u, render: c, target: e.target }), this.renderedAttributions_ = [], this.renderedVisible_ = !0, this.logoElements_ = {}; }; i.inherits(bt, wt), bt.prototype.getSourceAttributions_ = function (t) { for (var e = {}, i = [], n = t.layerStatesArray, r = t.viewState.resolution, o = 0, s = n.length; o < s; ++o) {
    var a = n[o];
    if (Mt.visibleAtResolution(a, r)) {
        var h = a.layer.getSource();
        if (h) {
            var l = h.getAttributions2();
            if (l) {
                var u = l(t);
                if (u)
                    if (Array.isArray(u))
                        for (var c = 0, d = u.length; c < d; ++c)
                            u[c] in e || (i.push(u[c]), e[u[c]] = !0);
                    else
                        u in e || (i.push(u), e[u] = !0);
            }
        }
    }
} return i; }, bt.render = function (t) { this.updateElement_(t.frameState); }, bt.prototype.updateElement_ = function (t) { if (t) {
    var e = this.getSourceAttributions_(t);
    if (!S.equals(e, this.renderedAttributions_)) {
        for (; this.ulElement_.lastChild !== this.logoLi_;)
            this.ulElement_.removeChild(this.ulElement_.lastChild);
        for (var i = 0, n = e.length; i < n; ++i) {
            var o = document.createElement("LI");
            o.innerHTML = e[i], this.ulElement_.appendChild(o);
        }
        0 === e.length && this.renderedAttributions_.length > 0 ? this.element.classList.add("ol-logo-only") : 0 === this.renderedAttributions_.length && e.length > 0 && this.element.classList.remove("ol-logo-only");
        var s = e.length > 0 || !r.isEmpty(t.logos);
        this.renderedVisible_ != s && (this.element.style.display = s ? "" : "none", this.renderedVisible_ = s), this.renderedAttributions_ = e, this.insertLogos_(t);
    }
}
else
    this.renderedVisible_ && (this.element.style.display = "none", this.renderedVisible_ = !1); }, bt.prototype.insertLogos_ = function (t) { var e, i, n, o, s = t.logos, a = this.logoElements_; for (e in a)
    e in s || (xt(a[e]), delete a[e]); for (o in s) {
    var h = s[o];
    h instanceof HTMLElement && (this.logoLi_.appendChild(h), a[o] = h), o in a || ((i = new Image).src = o, "" === h ? n = i : ((n = document.createElement("a")).href = h, n.appendChild(i)), this.logoLi_.appendChild(n), a[o] = n);
} this.logoLi_.style.display = r.isEmpty(s) ? "none" : ""; }, bt.prototype.handleClick_ = function (t) { t.preventDefault(), this.handleToggle_(); }, bt.prototype.handleToggle_ = function () { this.element.classList.toggle("ol-collapsed"), this.collapsed_ ? mt(this.collapseLabel_, this.label_) : mt(this.label_, this.collapseLabel_), this.collapsed_ = !this.collapsed_; }, bt.prototype.getCollapsible = function () { return this.collapsible_; }, bt.prototype.setCollapsible = function (t) { this.collapsible_ !== t && (this.collapsible_ = t, this.element.classList.toggle("ol-uncollapsible"), !t && this.collapsed_ && this.handleToggle_()); }, bt.prototype.setCollapsed = function (t) { this.collapsible_ && this.collapsed_ !== t && this.handleToggle_(); }, bt.prototype.getCollapsed = function () { return this.collapsed_; }; var Dt = function (t) { var e = t || {}, i = void 0 !== e.className ? e.className : "ol-rotate", n = void 0 !== e.label ? e.label : "⇧"; this.label_ = null, "string" == typeof n ? (this.label_ = document.createElement("span"), this.label_.className = "ol-compass", this.label_.textContent = n) : (this.label_ = n, this.label_.classList.add("ol-compass")); var r = e.tipLabel ? e.tipLabel : "Reset rotation", s = document.createElement("button"); s.className = i + "-reset", s.setAttribute("type", "button"), s.title = r, s.appendChild(this.label_), o.listen(s, "click", Dt.prototype.handleClick_, this); var a = i + " " + Ft.CLASS_UNSELECTABLE + " " + Ft.CLASS_CONTROL, h = document.createElement("div"); h.className = a, h.appendChild(s); var l = e.render ? e.render : Dt.render; this.callResetNorth_ = e.resetNorth ? e.resetNorth : void 0, wt.call(this, { element: h, render: l, target: e.target }), this.duration_ = void 0 !== e.duration ? e.duration : 250, this.autoHide_ = void 0 === e.autoHide || e.autoHide, this.rotation_ = void 0, this.autoHide_ && this.element.classList.add(Ft.CLASS_HIDDEN); }; i.inherits(Dt, wt), Dt.prototype.handleClick_ = function (t) { t.preventDefault(), void 0 !== this.callResetNorth_ ? this.callResetNorth_() : this.resetNorth_(); }, Dt.prototype.resetNorth_ = function () { var t = this.getMap().getView(); t && void 0 !== t.getRotation() && (this.duration_ > 0 ? t.animate({ rotation: 0, duration: this.duration_, easing: U.easeOut }) : t.setRotation(0)); }, Dt.render = function (t) { var e = t.frameState; if (e) {
    var i = e.viewState.rotation;
    if (i != this.rotation_) {
        var n = "rotate(" + i + "rad)";
        if (this.autoHide_) {
            var r = this.element.classList.contains(Ft.CLASS_HIDDEN);
            r || 0 !== i ? r && 0 !== i && this.element.classList.remove(Ft.CLASS_HIDDEN) : this.element.classList.add(Ft.CLASS_HIDDEN);
        }
        this.label_.style.msTransform = n, this.label_.style.webkitTransform = n, this.label_.style.transform = n;
    }
    this.rotation_ = i;
} }; var Ot = function (t) { var e = t || {}, i = void 0 !== e.className ? e.className : "ol-zoom", n = void 0 !== e.delta ? e.delta : 1, r = void 0 !== e.zoomInLabel ? e.zoomInLabel : "+", s = void 0 !== e.zoomOutLabel ? e.zoomOutLabel : "−", a = void 0 !== e.zoomInTipLabel ? e.zoomInTipLabel : "Zoom in", h = void 0 !== e.zoomOutTipLabel ? e.zoomOutTipLabel : "Zoom out", l = document.createElement("button"); l.className = i + "-in", l.setAttribute("type", "button"), l.title = a, l.appendChild("string" == typeof r ? document.createTextNode(r) : r), o.listen(l, "click", Ot.prototype.handleClick_.bind(this, n)); var u = document.createElement("button"); u.className = i + "-out", u.setAttribute("type", "button"), u.title = h, u.appendChild("string" == typeof s ? document.createTextNode(s) : s), o.listen(u, "click", Ot.prototype.handleClick_.bind(this, -n)); var c = i + " " + Ft.CLASS_UNSELECTABLE + " " + Ft.CLASS_CONTROL, d = document.createElement("div"); d.className = c, d.appendChild(l), d.appendChild(u), wt.call(this, { element: d, target: e.target }), this.duration_ = void 0 !== e.duration ? e.duration : 250; }; i.inherits(Ot, wt), Ot.prototype.handleClick_ = function (t, e) { e.preventDefault(), this.zoomByDelta_(t); }, Ot.prototype.zoomByDelta_ = function (t) { var e = this.getMap().getView(); if (e) {
    var i = e.getResolution();
    if (i) {
        var n = e.constrainResolution(i, t);
        this.duration_ > 0 ? (e.getAnimating() && e.cancelAnimations(), e.animate({ resolution: n, duration: this.duration_, easing: U.easeOut })) : e.setResolution(n);
    }
} }; var kt = function (t) { var e = t || {}, i = new c; return (void 0 === e.zoom || e.zoom) && i.push(new Ot(e.zoomOptions)), (void 0 === e.rotate || e.rotate) && i.push(new Dt(e.rotateOptions)), (void 0 === e.attribution || e.attribution) && i.push(new bt(e.attributionOptions)), i; }, Gt = function (t, e, i) { this.decay_ = t, this.minVelocity_ = e, this.delay_ = i, this.points_ = [], this.angle_ = 0, this.initialVelocity_ = 0; }; Gt.prototype.begin = function () { this.points_.length = 0, this.angle_ = 0, this.initialVelocity_ = 0; }, Gt.prototype.update = function (t, e) { this.points_.push(t, e, Date.now()); }, Gt.prototype.end = function () { if (this.points_.length < 6)
    return !1; var t = Date.now() - this.delay_, e = this.points_.length - 3; if (this.points_[e + 2] < t)
    return !1; for (var i = e - 3; i > 0 && this.points_[i + 2] > t;)
    i -= 3; var n = this.points_[e + 2] - this.points_[i + 2]; if (n < 1e3 / 60)
    return !1; var r = this.points_[e] - this.points_[i], o = this.points_[e + 1] - this.points_[i + 1]; return this.angle_ = Math.atan2(o, r), this.initialVelocity_ = Math.sqrt(r * r + o * o) / n, this.initialVelocity_ > this.minVelocity_; }, Gt.prototype.getDistance = function () { return (this.minVelocity_ - this.initialVelocity_) / this.decay_; }, Gt.prototype.getAngle = function () { return this.angle_; }; var Ut = function (t) { u.call(this), this.map_ = null, this.setActive(!0), this.handleEvent = t.handleEvent; }; i.inherits(Ut, u), Ut.prototype.getActive = function () { return this.get("active"); }, Ut.prototype.getMap = function () { return this.map_; }, Ut.prototype.setActive = function (t) { this.set("active", t); }, Ut.prototype.setMap = function (t) { this.map_ = t; }, Ut.pan = function (t, e, i) { var n = t.getCenter(); if (n) {
    var r = t.constrainCenter([n[0] + e[0], n[1] + e[1]]);
    i ? t.animate({ duration: i, easing: U.linear, center: r }) : t.setCenter(r);
} }, Ut.rotate = function (t, e, i, n) { e = t.constrainRotation(e, 0), Ut.rotateWithoutConstraints(t, e, i, n); }, Ut.rotateWithoutConstraints = function (t, e, i, n) { if (void 0 !== e) {
    var r = t.getRotation(), o = t.getCenter();
    void 0 !== r && o && n > 0 ? t.animate({ rotation: e, anchor: i, duration: n, easing: U.easeOut }) : t.rotate(e, i);
} }, Ut.zoom = function (t, e, i, n, r) { e = t.constrainResolution(e, 0, r), Ut.zoomWithoutConstraints(t, e, i, n); }, Ut.zoomByDelta = function (t, e, i, n) { var r = t.getResolution(), o = t.constrainResolution(r, e, 0); if (void 0 !== o) {
    var s = t.getResolutions();
    o = F.clamp(o, t.getMinResolution() || s[s.length - 1], t.getMaxResolution() || s[0]);
} if (i && void 0 !== o && o !== r) {
    var a = t.getCenter(), h = t.calculateCenterZoom(o, i);
    h = t.constrainCenter(h), i = [(o * a[0] - r * h[0]) / (o - r), (o * a[1] - r * h[1]) / (o - r)];
} Ut.zoomWithoutConstraints(t, o, i, n); }, Ut.zoomWithoutConstraints = function (t, e, i, n) { if (e) {
    var r = t.getResolution(), o = t.getCenter();
    if (void 0 !== r && o && e !== r && n)
        t.animate({ resolution: e, anchor: i, duration: n, easing: U.easeOut });
    else {
        if (i) {
            var s = t.calculateCenterZoom(e, i);
            t.setCenter(s);
        }
        t.setResolution(e);
    }
} }; var Bt = function (t) { var e = t || {}; this.delta_ = e.delta ? e.delta : 1, Ut.call(this, { handleEvent: Bt.handleEvent }), this.duration_ = void 0 !== e.duration ? e.duration : 250; }; i.inherits(Bt, Ut), Bt.handleEvent = function (t) { var e = !1, i = t.originalEvent; if (t.type == v.DBLCLICK) {
    var n = t.map, r = t.coordinate, o = i.shiftKey ? -this.delta_ : this.delta_, s = n.getView();
    Ut.zoomByDelta(s, o, r, this.duration_), t.preventDefault(), e = !0;
} return !e; }; var Nt = { altKeyOnly: function (t) { var e = t.originalEvent; return e.altKey && !(e.metaKey || e.ctrlKey) && !e.shiftKey; }, altShiftKeysOnly: function (t) { var e = t.originalEvent; return e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey; } }; Nt.always = N.TRUE, Nt.click = function (t) { return t.type == v.CLICK; }, Nt.mouseActionButton = function (t) { var e = t.originalEvent; return 0 == e.button && !(g.WEBKIT && g.MAC && e.ctrlKey); }, Nt.never = N.FALSE, Nt.pointerMove = function (t) { return "pointermove" == t.type; }, Nt.singleClick = function (t) { return t.type == v.SINGLECLICK; }, Nt.doubleClick = function (t) { return t.type == v.DBLCLICK; }, Nt.noModifierKeys = function (t) { var e = t.originalEvent; return !e.altKey && !(e.metaKey || e.ctrlKey) && !e.shiftKey; }, Nt.platformModifierKeyOnly = function (t) { var e = t.originalEvent; return !e.altKey && (g.MAC ? e.metaKey : e.ctrlKey) && !e.shiftKey; }, Nt.shiftKeyOnly = function (t) { var e = t.originalEvent; return !e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey; }, Nt.targetNotEditable = function (t) { var e = t.originalEvent.target.tagName; return "INPUT" !== e && "SELECT" !== e && "TEXTAREA" !== e; }, Nt.mouseOnly = function (t) { return w(t.pointerEvent, 56), "mouse" == t.pointerEvent.pointerType; }, Nt.primaryAction = function (t) { var e = t.pointerEvent; return e.isPrimary && 0 === e.button; }; var Wt = function (t) { var e = t || {}, i = e.handleEvent ? e.handleEvent : Wt.handleEvent; Ut.call(this, { handleEvent: i }), this.handleDownEvent_ = e.handleDownEvent ? e.handleDownEvent : Wt.handleDownEvent, this.handleDragEvent_ = e.handleDragEvent ? e.handleDragEvent : Wt.handleDragEvent, this.handleMoveEvent_ = e.handleMoveEvent ? e.handleMoveEvent : Wt.handleMoveEvent, this.handleUpEvent_ = e.handleUpEvent ? e.handleUpEvent : Wt.handleUpEvent, this.handlingDownUpSequence = !1, this.trackedPointers_ = {}, this.targetPointers = []; }; i.inherits(Wt, Ut), Wt.centroid = function (t) { for (var e = t.length, i = 0, n = 0, r = 0; r < e; r++)
    i += t[r].clientX, n += t[r].clientY; return [i / e, n / e]; }, Wt.prototype.isPointerDraggingEvent_ = function (t) { var e = t.type; return e === v.POINTERDOWN || e === v.POINTERDRAG || e === v.POINTERUP; }, Wt.prototype.updateTrackedPointers_ = function (t) { if (this.isPointerDraggingEvent_(t)) {
    var e = t.pointerEvent, i = e.pointerId.toString();
    t.type == v.POINTERUP ? delete this.trackedPointers_[i] : t.type == v.POINTERDOWN ? this.trackedPointers_[i] = e : i in this.trackedPointers_ && (this.trackedPointers_[i] = e), this.targetPointers = r.getValues(this.trackedPointers_);
} }, Wt.handleDragEvent = i.nullFunction, Wt.handleUpEvent = N.FALSE, Wt.handleDownEvent = N.FALSE, Wt.handleMoveEvent = i.nullFunction, Wt.handleEvent = function (t) { if (!(t instanceof y))
    return !0; var e = !1; if (this.updateTrackedPointers_(t), this.handlingDownUpSequence) {
    if (t.type == v.POINTERDRAG)
        this.handleDragEvent_(t);
    else if (t.type == v.POINTERUP) {
        var i = this.handleUpEvent_(t);
        this.handlingDownUpSequence = i && this.targetPointers.length > 0;
    }
}
else if (t.type == v.POINTERDOWN) {
    var n = this.handleDownEvent_(t);
    this.handlingDownUpSequence = n, e = this.shouldStopEvent(n);
}
else
    t.type == v.POINTERMOVE && this.handleMoveEvent_(t); return !e; }, Wt.prototype.shouldStopEvent = function (t) { return t; }; var Xt = function (t) { Wt.call(this, { handleDownEvent: Xt.handleDownEvent_, handleDragEvent: Xt.handleDragEvent_, handleUpEvent: Xt.handleUpEvent_ }); var e = t || {}; this.kinetic_ = e.kinetic, this.lastCentroid = null, this.lastPointersCount_, this.condition_ = e.condition ? e.condition : Nt.noModifierKeys, this.noKinetic_ = !1; }; i.inherits(Xt, Wt), Xt.handleDragEvent_ = function (t) { var e = this.targetPointers, i = Wt.centroid(e); if (e.length == this.lastPointersCount_) {
    if (this.kinetic_ && this.kinetic_.update(i[0], i[1]), this.lastCentroid) {
        var n = this.lastCentroid[0] - i[0], r = i[1] - this.lastCentroid[1], o = t.map.getView(), s = o.getState(), a = [n, r];
        G.scale(a, s.resolution), G.rotate(a, s.rotation), G.add(a, s.center), a = o.constrainCenter(a), o.setCenter(a);
    }
}
else
    this.kinetic_ && this.kinetic_.begin(); this.lastCentroid = i, this.lastPointersCount_ = e.length; }, Xt.handleUpEvent_ = function (t) { var e = t.map, i = e.getView(); if (0 === this.targetPointers.length) {
    if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
        var n = this.kinetic_.getDistance(), r = this.kinetic_.getAngle(), o = i.getCenter(), s = e.getPixelFromCoordinate(o), a = e.getCoordinateFromPixel([s[0] - n * Math.cos(r), s[1] - n * Math.sin(r)]);
        i.animate({ center: i.constrainCenter(a), duration: 500, easing: U.easeOut });
    }
    return i.setHint(1, -1), !1;
} return this.kinetic_ && this.kinetic_.begin(), this.lastCentroid = null, !0; }, Xt.handleDownEvent_ = function (t) { if (this.targetPointers.length > 0 && this.condition_(t)) {
    var e = t.map.getView();
    return this.lastCentroid = null, this.handlingDownUpSequence || e.setHint(1, 1), e.getAnimating() && e.setCenter(t.frameState.viewState.center), this.kinetic_ && this.kinetic_.begin(), this.noKinetic_ = this.targetPointers.length > 1, !0;
} return !1; }, Xt.prototype.shouldStopEvent = N.FALSE; var Vt = function (t) { var e = t || {}; Wt.call(this, { handleDownEvent: Vt.handleDownEvent_, handleDragEvent: Vt.handleDragEvent_, handleUpEvent: Vt.handleUpEvent_ }), this.condition_ = e.condition ? e.condition : Nt.altShiftKeysOnly, this.lastAngle_ = void 0, this.duration_ = void 0 !== e.duration ? e.duration : 250; }; i.inherits(Vt, Wt), Vt.handleDragEvent_ = function (t) { if (Nt.mouseOnly(t)) {
    var e = t.map, i = e.getView();
    if (i.getConstraints().rotation !== O.disable) {
        var n = e.getSize(), r = t.pixel, o = Math.atan2(n[1] / 2 - r[1], r[0] - n[0] / 2);
        if (void 0 !== this.lastAngle_) {
            var s = o - this.lastAngle_, a = i.getRotation();
            Ut.rotateWithoutConstraints(i, a - s);
        }
        this.lastAngle_ = o;
    }
} }, Vt.handleUpEvent_ = function (t) { if (!Nt.mouseOnly(t))
    return !0; var e = t.map.getView(); e.setHint(1, -1); var i = e.getRotation(); return Ut.rotate(e, i, void 0, this.duration_), !1; }, Vt.handleDownEvent_ = function (t) { return !(!Nt.mouseOnly(t) || !Nt.mouseActionButton(t) || !this.condition_(t) || (t.map.getView().setHint(1, 1), this.lastAngle_ = void 0, 0)); }, Vt.prototype.shouldStopEvent = N.FALSE; var jt = function (t) { this.geometry_ = null, this.element_ = document.createElement("div"), this.element_.style.position = "absolute", this.element_.className = "ol-box " + t, this.map_ = null, this.startPixel_ = null, this.endPixel_ = null; }; i.inherits(jt, s), jt.prototype.disposeInternal = function () { this.setMap(null); }, jt.prototype.render_ = function () { var t = this.startPixel_, e = this.endPixel_, i = this.element_.style; i.left = Math.min(t[0], e[0]) + "px", i.top = Math.min(t[1], e[1]) + "px", i.width = Math.abs(e[0] - t[0]) + "px", i.height = Math.abs(e[1] - t[1]) + "px"; }, jt.prototype.setMap = function (t) { if (this.map_) {
    this.map_.getOverlayContainer().removeChild(this.element_);
    var e = this.element_.style;
    e.left = e.top = e.width = e.height = "inherit";
} this.map_ = t, this.map_ && this.map_.getOverlayContainer().appendChild(this.element_); }, jt.prototype.setPixels = function (t, e) { this.startPixel_ = t, this.endPixel_ = e, this.createOrUpdateGeometry(), this.render_(); }, jt.prototype.createOrUpdateGeometry = function () { var t = this.startPixel_, e = this.endPixel_, i = [t, [t[0], e[1]], e, [e[0], t[1]]].map(this.map_.getCoordinateFromPixel, this.map_); i[4] = i[0].slice(), this.geometry_ ? this.geometry_.setCoordinates([i]) : this.geometry_ = new _t([i]); }, jt.prototype.getGeometry = function () { return this.geometry_; }; var zt = function (t) { Wt.call(this, { handleDownEvent: zt.handleDownEvent_, handleDragEvent: zt.handleDragEvent_, handleUpEvent: zt.handleUpEvent_ }); var e = t || {}; this.box_ = new jt(e.className || "ol-dragbox"), this.minArea_ = void 0 !== e.minArea ? e.minArea : 64, this.startPixel_ = null, this.condition_ = e.condition ? e.condition : Nt.always, this.boxEndCondition_ = e.boxEndCondition ? e.boxEndCondition : zt.defaultBoxEndCondition; }; i.inherits(zt, Wt), zt.defaultBoxEndCondition = function (t, e, i) { var n = i[0] - e[0], r = i[1] - e[1]; return n * n + r * r >= this.minArea_; }, zt.handleDragEvent_ = function (t) { Nt.mouseOnly(t) && (this.box_.setPixels(this.startPixel_, t.pixel), this.dispatchEvent(new zt.Event(zt.EventType_.BOXDRAG, t.coordinate, t))); }, zt.prototype.getGeometry = function () { return this.box_.getGeometry(); }, zt.prototype.onBoxEnd = i.nullFunction, zt.handleUpEvent_ = function (t) { return !Nt.mouseOnly(t) || (this.box_.setMap(null), this.boxEndCondition_(t, this.startPixel_, t.pixel) && (this.onBoxEnd(t), this.dispatchEvent(new zt.Event(zt.EventType_.BOXEND, t.coordinate, t))), !1); }, zt.handleDownEvent_ = function (t) { return !(!Nt.mouseOnly(t) || !Nt.mouseActionButton(t) || !this.condition_(t) || (this.startPixel_ = t.pixel, this.box_.setMap(t.map), this.box_.setPixels(this.startPixel_, this.startPixel_), this.dispatchEvent(new zt.Event(zt.EventType_.BOXSTART, t.coordinate, t)), 0)); }, zt.EventType_ = { BOXSTART: "boxstart", BOXDRAG: "boxdrag", BOXEND: "boxend" }, zt.Event = function (t, e, i) { a.call(this, t), this.coordinate = e, this.mapBrowserEvent = i; }, i.inherits(zt.Event, a); var Yt = function (t) { var e = t || {}, i = e.condition ? e.condition : Nt.shiftKeyOnly; this.duration_ = void 0 !== e.duration ? e.duration : 200, this.out_ = void 0 !== e.out && e.out, zt.call(this, { condition: i, className: e.className || "ol-dragzoom" }); }; i.inherits(Yt, zt), Yt.prototype.onBoxEnd = function () { var t = this.getMap(), e = t.getView(), i = t.getSize(), n = this.getGeometry().getExtent(); if (this.out_) {
    var r = e.calculateExtent(i), o = B.createOrUpdateFromCoordinates([t.getPixelFromCoordinate(B.getBottomLeft(n)), t.getPixelFromCoordinate(B.getTopRight(n))]), s = e.getResolutionForExtent(o, i);
    B.scaleFromCenter(r, 1 / s), n = r;
} var a = e.constrainResolution(e.getResolutionForExtent(n, i)), h = B.getCenter(n); h = e.constrainCenter(h), e.animate({ resolution: a, center: h, duration: this.duration_, easing: U.easeOut }); }; var Kt = function (t) { Ut.call(this, { handleEvent: Kt.handleEvent }); var e = t || {}; this.defaultCondition_ = function (t) { return Nt.noModifierKeys(t) && Nt.targetNotEditable(t); }, this.condition_ = void 0 !== e.condition ? e.condition : this.defaultCondition_, this.duration_ = void 0 !== e.duration ? e.duration : 100, this.pixelDelta_ = void 0 !== e.pixelDelta ? e.pixelDelta : 128; }; i.inherits(Kt, Ut), Kt.handleEvent = function (t) { var e = !1; if ("keydown" == t.type) {
    var i = t.originalEvent.keyCode;
    if (this.condition_(t) && (40 == i || 37 == i || 39 == i || 38 == i)) {
        var n = t.map.getView(), r = n.getResolution() * this.pixelDelta_, o = 0, s = 0;
        40 == i ? s = -r : 37 == i ? o = -r : 39 == i ? o = r : s = r;
        var a = [o, s];
        G.rotate(a, n.getRotation()), Ut.pan(n, a, this.duration_), t.preventDefault(), e = !0;
    }
} return !e; }; var Ht = function (t) { Ut.call(this, { handleEvent: Ht.handleEvent }); var e = t || {}; this.condition_ = e.condition ? e.condition : Nt.targetNotEditable, this.delta_ = e.delta ? e.delta : 1, this.duration_ = void 0 !== e.duration ? e.duration : 100; }; i.inherits(Ht, Ut), Ht.handleEvent = function (t) { var e = !1; if ("keydown" == t.type || "keypress" == t.type) {
    var i = t.originalEvent.charCode;
    if (this.condition_(t) && (i == "+".charCodeAt(0) || i == "-".charCodeAt(0))) {
        var n = t.map, r = i == "+".charCodeAt(0) ? this.delta_ : -this.delta_, o = n.getView();
        Ut.zoomByDelta(o, r, void 0, this.duration_), t.preventDefault(), e = !0;
    }
} return !e; }; var Zt = function (t) { Ut.call(this, { handleEvent: Zt.handleEvent }); var e = t || {}; this.delta_ = 0, this.duration_ = void 0 !== e.duration ? e.duration : 250, this.timeout_ = void 0 !== e.timeout ? e.timeout : 80, this.useAnchor_ = void 0 === e.useAnchor || e.useAnchor, this.constrainResolution_ = e.constrainResolution || !1, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_ = void 0, this.mode_ = void 0, this.trackpadEventGap_ = 400, this.trackpadTimeoutId_ = void 0, this.trackpadDeltaPerZoom_ = 300, this.trackpadZoomBuffer_ = 1.5; }; i.inherits(Zt, Ut), Zt.handleEvent = function (t) { var e = t.type; if ("wheel" !== e && "mousewheel" !== e)
    return !0; t.preventDefault(); var i, n = t.map, r = t.originalEvent; if (this.useAnchor_ && (this.lastAnchor_ = t.coordinate), "wheel" == t.type ? (i = r.deltaY, g.FIREFOX && r.deltaMode === WheelEvent.DOM_DELTA_PIXEL && (i /= g.DEVICE_PIXEL_RATIO), r.deltaMode === WheelEvent.DOM_DELTA_LINE && (i *= 40)) : "mousewheel" == t.type && (i = -r.wheelDeltaY, g.SAFARI && (i /= 3)), 0 === i)
    return !1; var o = Date.now(); if (void 0 === this.startTime_ && (this.startTime_ = o), (!this.mode_ || o - this.startTime_ > this.trackpadEventGap_) && (this.mode_ = Math.abs(i) < 4 ? Zt.Mode_.TRACKPAD : Zt.Mode_.WHEEL), this.mode_ === Zt.Mode_.TRACKPAD) {
    var s = n.getView();
    this.trackpadTimeoutId_ ? clearTimeout(this.trackpadTimeoutId_) : s.setHint(1, 1), this.trackpadTimeoutId_ = setTimeout(this.decrementInteractingHint_.bind(this), this.trackpadEventGap_);
    var a = s.getResolution() * Math.pow(2, i / this.trackpadDeltaPerZoom_), h = s.getMinResolution(), l = s.getMaxResolution(), u = 0;
    if (a < h ? (a = Math.max(a, h / this.trackpadZoomBuffer_), u = 1) : a > l && (a = Math.min(a, l * this.trackpadZoomBuffer_), u = -1), this.lastAnchor_) {
        var c = s.calculateCenterZoom(a, this.lastAnchor_);
        s.setCenter(s.constrainCenter(c));
    }
    return s.setResolution(a), 0 === u && this.constrainResolution_ && s.animate({ resolution: s.constrainResolution(a, i > 0 ? -1 : 1), easing: U.easeOut, anchor: this.lastAnchor_, duration: this.duration_ }), u > 0 ? s.animate({ resolution: h, easing: U.easeOut, anchor: this.lastAnchor_, duration: 500 }) : u < 0 && s.animate({ resolution: l, easing: U.easeOut, anchor: this.lastAnchor_, duration: 500 }), this.startTime_ = o, !1;
} this.delta_ += i; var d = Math.max(this.timeout_ - (o - this.startTime_), 0); return clearTimeout(this.timeoutId_), this.timeoutId_ = setTimeout(this.handleWheelZoom_.bind(this, n), d), !1; }, Zt.prototype.decrementInteractingHint_ = function () { this.trackpadTimeoutId_ = void 0, this.getMap().getView().setHint(1, -1); }, Zt.prototype.handleWheelZoom_ = function (t) { var e = t.getView(); e.getAnimating() && e.cancelAnimations(); var n = i.MOUSEWHEELZOOM_MAXDELTA, r = F.clamp(this.delta_, -n, n); Ut.zoomByDelta(e, -r, this.lastAnchor_, this.duration_), this.mode_ = void 0, this.delta_ = 0, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_ = void 0; }, Zt.prototype.setMouseAnchor = function (t) { this.useAnchor_ = t, t || (this.lastAnchor_ = null); }, Zt.Mode_ = { TRACKPAD: "trackpad", WHEEL: "wheel" }; var qt = function (t) { Wt.call(this, { handleDownEvent: qt.handleDownEvent_, handleDragEvent: qt.handleDragEvent_, handleUpEvent: qt.handleUpEvent_ }); var e = t || {}; this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.threshold_ = void 0 !== e.threshold ? e.threshold : .3, this.duration_ = void 0 !== e.duration ? e.duration : 250; }; i.inherits(qt, Wt), qt.handleDragEvent_ = function (t) { var e = 0, i = this.targetPointers[0], n = this.targetPointers[1], r = Math.atan2(n.clientY - i.clientY, n.clientX - i.clientX); if (void 0 !== this.lastAngle_) {
    var o = r - this.lastAngle_;
    this.rotationDelta_ += o, !this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_ && (this.rotating_ = !0), e = o;
} this.lastAngle_ = r; var s = t.map, a = s.getView(); if (a.getConstraints().rotation !== O.disable) {
    var h = s.getViewport().getBoundingClientRect(), l = Wt.centroid(this.targetPointers);
    if (l[0] -= h.left, l[1] -= h.top, this.anchor_ = s.getCoordinateFromPixel(l), this.rotating_) {
        var u = a.getRotation();
        s.render(), Ut.rotateWithoutConstraints(a, u + e, this.anchor_);
    }
} }, qt.handleUpEvent_ = function (t) { if (this.targetPointers.length < 2) {
    var e = t.map.getView();
    if (e.setHint(1, -1), this.rotating_) {
        var i = e.getRotation();
        Ut.rotate(e, i, this.anchor_, this.duration_);
    }
    return !1;
} return !0; }, qt.handleDownEvent_ = function (t) { if (this.targetPointers.length >= 2) {
    var e = t.map;
    return this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.handlingDownUpSequence || e.getView().setHint(1, 1), !0;
} return !1; }, qt.prototype.shouldStopEvent = N.FALSE; var Jt = function (t) { Wt.call(this, { handleDownEvent: Jt.handleDownEvent_, handleDragEvent: Jt.handleDragEvent_, handleUpEvent: Jt.handleUpEvent_ }); var e = t || {}; this.constrainResolution_ = e.constrainResolution || !1, this.anchor_ = null, this.duration_ = void 0 !== e.duration ? e.duration : 400, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1; }; i.inherits(Jt, Wt), Jt.handleDragEvent_ = function (t) { var e = 1, i = this.targetPointers[0], n = this.targetPointers[1], r = i.clientX - n.clientX, o = i.clientY - n.clientY, s = Math.sqrt(r * r + o * o); void 0 !== this.lastDistance_ && (e = this.lastDistance_ / s), this.lastDistance_ = s; var a = t.map, h = a.getView(), l = h.getResolution(), u = h.getMaxResolution(), c = h.getMinResolution(), d = l * e; d > u ? (e = u / l, d = u) : d < c && (e = c / l, d = c), 1 != e && (this.lastScaleDelta_ = e); var p = a.getViewport().getBoundingClientRect(), f = Wt.centroid(this.targetPointers); f[0] -= p.left, f[1] -= p.top, this.anchor_ = a.getCoordinateFromPixel(f), a.render(), Ut.zoomWithoutConstraints(h, d, this.anchor_); }, Jt.handleUpEvent_ = function (t) { if (this.targetPointers.length < 2) {
    var e = t.map.getView();
    e.setHint(1, -1);
    var i = e.getResolution();
    if (this.constrainResolution_ || i < e.getMinResolution() || i > e.getMaxResolution()) {
        var n = this.lastScaleDelta_ - 1;
        Ut.zoom(e, i, this.anchor_, this.duration_, n);
    }
    return !1;
} return !0; }, Jt.handleDownEvent_ = function (t) { if (this.targetPointers.length >= 2) {
    var e = t.map;
    return this.anchor_ = null, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1, this.handlingDownUpSequence || e.getView().setHint(1, 1), !0;
} return !1; }, Jt.prototype.shouldStopEvent = N.FALSE; var Qt = function (t) { var e = t || {}, i = new c, n = new Gt(-.005, .05, 100); return (void 0 === e.altShiftDragRotate || e.altShiftDragRotate) && i.push(new Vt), (void 0 === e.doubleClickZoom || e.doubleClickZoom) && i.push(new Bt({ delta: e.zoomDelta, duration: e.zoomDuration })), (void 0 === e.dragPan || e.dragPan) && i.push(new Xt({ kinetic: n })), (void 0 === e.pinchRotate || e.pinchRotate) && i.push(new qt), (void 0 === e.pinchZoom || e.pinchZoom) && i.push(new Jt({ constrainResolution: e.constrainResolution, duration: e.zoomDuration })), (void 0 === e.keyboard || e.keyboard) && (i.push(new Kt), i.push(new Ht({ delta: e.zoomDelta, duration: e.zoomDuration }))), (void 0 === e.mouseWheelZoom || e.mouseWheelZoom) && i.push(new Zt({ constrainResolution: e.constrainResolution, duration: e.zoomDuration })), (void 0 === e.shiftDragZoom || e.shiftDragZoom) && i.push(new Yt({ duration: e.zoomDuration })), i; }, $t = function (t, e, i, n) { h.call(this), this.extent = t, this.pixelRatio_ = i, this.resolution = e, this.state = n; }; i.inherits($t, h), $t.prototype.changed = function () { this.dispatchEvent("change"); }, $t.prototype.getExtent = function () { return this.extent; }, $t.prototype.getImage = function () { }, $t.prototype.getPixelRatio = function () { return this.pixelRatio_; }, $t.prototype.getResolution = function () { return this.resolution; }, $t.prototype.getState = function () { return this.state; }, $t.prototype.load = function () { }; var te = function (t, e, i, n, r) { this.loader_ = void 0 !== r ? r : null, $t.call(this, t, e, i, void 0 !== r ? 0 : 2), this.canvas_ = n, this.error_ = null; }; i.inherits(te, $t), te.prototype.getError = function () { return this.error_; }, te.prototype.handleLoad_ = function (t) { t ? (this.error_ = t, this.state = 3) : this.state = 2, this.changed(); }, te.prototype.load = function () { 0 == this.state && (this.state = 1, this.changed(), this.loader_(this.handleLoad_.bind(this))); }, te.prototype.getImage = function () { return this.canvas_; }; var ee = function (t, e, i, n, r) { a.call(this, t), this.vectorContext = e, this.frameState = i, this.context = n, this.glContext = r; }; i.inherits(ee, a); var ie = function (t) { h.call(this), this.highWaterMark = void 0 !== t ? t : 2048, this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null; }; i.inherits(ie, h), ie.prototype.canExpireCache = function () { return this.getCount() > this.highWaterMark; }, ie.prototype.clear = function () { this.count_ = 0, this.entries_ = {}, this.oldest_ = null, this.newest_ = null, this.dispatchEvent("clear"); }, ie.prototype.containsKey = function (t) { return this.entries_.hasOwnProperty(t); }, ie.prototype.forEach = function (t, e) { for (var i = this.oldest_; i;)
    t.call(e, i.value_, i.key_, this), i = i.newer; }, ie.prototype.get = function (t) { var e = this.entries_[t]; return w(void 0 !== e, 15), e === this.newest_ ? e.value_ : (e === this.oldest_ ? (this.oldest_ = this.oldest_.newer, this.oldest_.older = null) : (e.newer.older = e.older, e.older.newer = e.newer), e.newer = null, e.older = this.newest_, this.newest_.newer = e, this.newest_ = e, e.value_); }, ie.prototype.remove = function (t) { var e = this.entries_[t]; return w(void 0 !== e, 15), e === this.newest_ ? (this.newest_ = e.older, this.newest_ && (this.newest_.newer = null)) : e === this.oldest_ ? (this.oldest_ = e.newer, this.oldest_ && (this.oldest_.older = null)) : (e.newer.older = e.older, e.older.newer = e.newer), delete this.entries_[t], --this.count_, e.value_; }, ie.prototype.getCount = function () { return this.count_; }, ie.prototype.getKeys = function () { var t, e = new Array(this.count_), i = 0; for (t = this.newest_; t; t = t.older)
    e[i++] = t.key_; return e; }, ie.prototype.getValues = function () { var t, e = new Array(this.count_), i = 0; for (t = this.newest_; t; t = t.older)
    e[i++] = t.value_; return e; }, ie.prototype.peekLast = function () { return this.oldest_.value_; }, ie.prototype.peekLastKey = function () { return this.oldest_.key_; }, ie.prototype.peekFirstKey = function () { return this.newest_.key_; }, ie.prototype.pop = function () { var t = this.oldest_; return delete this.entries_[t.key_], t.newer && (t.newer.older = null), this.oldest_ = t.newer, this.oldest_ || (this.newest_ = null), --this.count_, t.value_; }, ie.prototype.replace = function (t, e) { this.get(t), this.entries_[t].value_ = e; }, ie.prototype.set = function (t, e) { w(!(t in this.entries_), 16); var i = { key_: t, newer: null, older: this.newest_, value_: e }; this.newest_ ? this.newest_.newer = i : this.oldest_ = i, this.newest_ = i, this.entries_[t] = i, ++this.count_; }, ie.prototype.prune = function () { for (; this.canExpireCache();)
    this.pop(); }; var ne, re, oe = { defaultFont: "10px sans-serif", defaultFillStyle: [0, 0, 0, 1], defaultLineCap: "round", defaultLineDash: [], defaultLineDashOffset: 0, defaultLineJoin: "round", defaultMiterLimit: 10, defaultStrokeStyle: [0, 0, 0, 1], defaultTextAlign: "center", defaultTextBaseline: "middle", defaultPadding: [0, 0, 0, 0], defaultLineWidth: 1 }; oe.labelCache = new ie, oe.checkedFonts_ = {}, oe.measureContext_ = null, oe.textHeights_ = {}, oe.checkFont = function () { var t, e, i = 60, n = oe.checkedFonts_, o = oe.labelCache, s = "32px monospace", a = "wmytzilWMYTZIL@#/&?$%10"; function h(t) { var i = oe.getMeasureContext(); i.font = s, e = i.measureText(a).width; var n = !0; return "monospace" != t && (i.font = "32px " + t + ",monospace", n = i.measureText(a).width != e), n; } function l() { var e = !0; for (var s in n)
    n[s] < i && (h(s) ? (n[s] = i, r.clear(oe.textHeights_), oe.measureContext_ = null, o.clear()) : (++n[s], e = !1)); e && (window.clearInterval(t), t = void 0); } return function (e) { var r = Ft.getFontFamilies(e); if (r)
    for (var o = 0, s = r.length; o < s; ++o) {
        var a = r[o];
        a in n || (n[a] = i, h(a) || (n[a] = 0, void 0 === t && (t = window.setInterval(l, 32))));
    } }; }(), oe.getMeasureContext = function () { var t = oe.measureContext_; return t || (t = oe.measureContext_ = yt(1, 1)), t; }, oe.measureTextHeight = (re = oe.textHeights_, function (t) { var e = re[t]; return void 0 == e && (ne || ((ne = document.createElement("span")).textContent = "M", ne.style.margin = ne.style.padding = "0 !important", ne.style.position = "absolute !important", ne.style.left = "-99999px !important"), ne.style.font = t, document.body.appendChild(ne), e = re[t] = ne.offsetHeight, document.body.removeChild(ne)), e; }), oe.measureTextWidth = function (t, e) { var i = oe.getMeasureContext(); return t != i.font && (i.font = t), i.measureText(e).width; }, oe.rotateAtOffset = function (t, e, i, n) { 0 !== e && (t.translate(i, n), t.rotate(e), t.translate(-i, -n)); }, oe.resetTransform_ = tt.create(), oe.drawImage = function (t, e, i, n, r, o, s, a, h, l, u) { var c; 1 != i && (c = t.globalAlpha, t.globalAlpha = c * i), e && t.setTransform.apply(t, e), t.drawImage(n, r, o, s, a, h, l, s * u, a * u), c && (t.globalAlpha = c), e && t.setTransform.apply(t, oe.resetTransform_); }; var se = { HEX_COLOR_RE_: /^#(?:[0-9a-f]{3,4}){1,2}$/i, NAMED_COLOR_RE_: /^([a-z]*)$/i, asArray: function (t) { return Array.isArray(t) ? t : se.fromString(t); }, asString: function (t) { return "string" == typeof t ? t : se.toString(t); }, fromNamed: function (t) { var e = document.createElement("div"); e.style.color = t, document.body.appendChild(e); var i = getComputedStyle(e).color; return document.body.removeChild(e), i; } }; se.fromString = function () { var t = {}, e = 0; return function (i) { var n; if (t.hasOwnProperty(i))
    n = t[i];
else {
    if (e >= 1024) {
        var r, o = 0;
        for (r in t)
            0 == (3 & o++) && (delete t[r], --e);
    }
    n = se.fromStringInternal_(i), t[i] = n, ++e;
} return n; }; }(), se.fromStringInternal_ = function (t) { var e, i, n, r, o, s; if (se.NAMED_COLOR_RE_.exec(t) && (t = se.fromNamed(t)), se.HEX_COLOR_RE_.exec(t)) {
    var a, h = t.length - 1;
    a = h <= 4 ? 1 : 2;
    var l = 4 === h || 8 === h;
    e = parseInt(t.substr(1 + 0 * a, a), 16), i = parseInt(t.substr(1 + 1 * a, a), 16), n = parseInt(t.substr(1 + 2 * a, a), 16), r = l ? parseInt(t.substr(1 + 3 * a, a), 16) : 255, 1 == a && (e = (e << 4) + e, i = (i << 4) + i, n = (n << 4) + n, l && (r = (r << 4) + r)), o = [e, i, n, r / 255];
}
else
    0 == t.indexOf("rgba(") ? (s = t.slice(5, -1).split(",").map(Number), o = se.normalize(s)) : 0 == t.indexOf("rgb(") ? ((s = t.slice(4, -1).split(",").map(Number)).push(1), o = se.normalize(s)) : w(!1, 14); return o; }, se.normalize = function (t, e) { var i = e || []; return i[0] = F.clamp(t[0] + .5 | 0, 0, 255), i[1] = F.clamp(t[1] + .5 | 0, 0, 255), i[2] = F.clamp(t[2] + .5 | 0, 0, 255), i[3] = F.clamp(t[3], 0, 1), i; }, se.toString = function (t) { var e = t[0]; e != (0 | e) && (e = e + .5 | 0); var i = t[1]; i != (0 | i) && (i = i + .5 | 0); var n = t[2]; return n != (0 | n) && (n = n + .5 | 0), "rgba(" + e + "," + i + "," + n + "," + (void 0 === t[3] ? 1 : t[3]) + ")"; }; var ae = { asColorLike: function (t) { return ae.isColorLike(t) ? t : se.asString(t); }, isColorLike: function (t) { return "string" == typeof t || t instanceof CanvasPattern || t instanceof CanvasGradient; } }, he = function () { }; he.prototype.drawCustom = function (t, e, i) { }, he.prototype.drawGeometry = function (t) { }, he.prototype.setStyle = function (t) { }, he.prototype.drawCircle = function (t, e) { }, he.prototype.drawFeature = function (t, e) { }, he.prototype.drawGeometryCollection = function (t, e) { }, he.prototype.drawLineString = function (t, e) { }, he.prototype.drawMultiLineString = function (t, e) { }, he.prototype.drawMultiPoint = function (t, e) { }, he.prototype.drawMultiPolygon = function (t, e) { }, he.prototype.drawPoint = function (t, e) { }, he.prototype.drawPolygon = function (t, e) { }, he.prototype.drawText = function (t, e) { }, he.prototype.setFillStrokeStyle = function (t, e) { }, he.prototype.setImageStyle = function (t, e) { }, he.prototype.setTextStyle = function (t, e) { }; var le = function (t, e, i, n, r) { he.call(this), this.context_ = t, this.pixelRatio_ = e, this.extent_ = i, this.transform_ = n, this.viewRotation_ = r, this.contextFillState_ = null, this.contextStrokeState_ = null, this.contextTextState_ = null, this.fillState_ = null, this.strokeState_ = null, this.image_ = null, this.imageAnchorX_ = 0, this.imageAnchorY_ = 0, this.imageHeight_ = 0, this.imageOpacity_ = 0, this.imageOriginX_ = 0, this.imageOriginY_ = 0, this.imageRotateWithView_ = !1, this.imageRotation_ = 0, this.imageScale_ = 0, this.imageSnapToPixel_ = !1, this.imageWidth_ = 0, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = !1, this.textRotation_ = 0, this.textScale_ = 0, this.textFillState_ = null, this.textStrokeState_ = null, this.textState_ = null, this.pixelCoordinates_ = [], this.tmpLocalTransform_ = tt.create(); }; i.inherits(le, he), le.prototype.drawImages_ = function (t, e, i, n) { if (this.image_) {
    var r = W(t, e, i, 2, this.transform_, this.pixelCoordinates_), o = this.context_, s = this.tmpLocalTransform_, a = o.globalAlpha;
    1 != this.imageOpacity_ && (o.globalAlpha = a * this.imageOpacity_);
    var h, l, u = this.imageRotation_;
    for (this.imageRotateWithView_ && (u += this.viewRotation_), h = 0, l = r.length; h < l; h += 2) {
        var c = r[h] - this.imageAnchorX_, d = r[h + 1] - this.imageAnchorY_;
        if (this.imageSnapToPixel_ && (c = Math.round(c), d = Math.round(d)), 0 !== u || 1 != this.imageScale_) {
            var p = c + this.imageAnchorX_, f = d + this.imageAnchorY_;
            tt.compose(s, p, f, this.imageScale_, this.imageScale_, u, -p, -f), o.setTransform.apply(o, s);
        }
        o.drawImage(this.image_, this.imageOriginX_, this.imageOriginY_, this.imageWidth_, this.imageHeight_, c, d, this.imageWidth_, this.imageHeight_);
    }
    0 === u && 1 == this.imageScale_ || o.setTransform(1, 0, 0, 1, 0, 0), 1 != this.imageOpacity_ && (o.globalAlpha = a);
} }, le.prototype.drawText_ = function (t, e, i, n) { if (this.textState_ && "" !== this.text_) {
    this.textFillState_ && this.setContextFillState_(this.textFillState_), this.textStrokeState_ && this.setContextStrokeState_(this.textStrokeState_), this.setContextTextState_(this.textState_);
    var r = W(t, e, i, n, this.transform_, this.pixelCoordinates_), o = this.context_, s = this.textRotation_;
    for (this.textRotateWithView_ && (s += this.viewRotation_); e < i; e += n) {
        var a = r[e] + this.textOffsetX_, h = r[e + 1] + this.textOffsetY_;
        if (0 !== s || 1 != this.textScale_) {
            var l = tt.compose(this.tmpLocalTransform_, a, h, this.textScale_, this.textScale_, s, -a, -h);
            o.setTransform.apply(o, l);
        }
        this.textStrokeState_ && o.strokeText(this.text_, a, h), this.textFillState_ && o.fillText(this.text_, a, h);
    }
    0 === s && 1 == this.textScale_ || o.setTransform(1, 0, 0, 1, 0, 0);
} }, le.prototype.moveToLineTo_ = function (t, e, i, n, r) { var o = this.context_, s = W(t, e, i, n, this.transform_, this.pixelCoordinates_); o.moveTo(s[0], s[1]); var a = s.length; r && (a -= 2); for (var h = 2; h < a; h += 2)
    o.lineTo(s[h], s[h + 1]); return r && o.closePath(), i; }, le.prototype.drawRings_ = function (t, e, i, n) { var r, o; for (r = 0, o = i.length; r < o; ++r)
    e = this.moveToLineTo_(t, e, i[r], n, !0); return e; }, le.prototype.drawCircle = function (t) { if (B.intersects(this.extent_, t.getExtent())) {
    if (this.fillState_ || this.strokeState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        var e = it.transform2D(t, this.transform_, this.pixelCoordinates_), i = e[2] - e[0], n = e[3] - e[1], r = Math.sqrt(i * i + n * n), o = this.context_;
        o.beginPath(), o.arc(e[0], e[1], r, 0, 2 * Math.PI), this.fillState_ && o.fill(), this.strokeState_ && o.stroke();
    }
    "" !== this.text_ && this.drawText_(t.getCenter(), 0, 2, 2);
} }, le.prototype.setStyle = function (t) { this.setFillStrokeStyle(t.getFill(), t.getStroke()), this.setImageStyle(t.getImage()), this.setTextStyle(t.getText()); }, le.prototype.drawGeometry = function (t) { switch (t.getType()) {
    case "Point":
        this.drawPoint(t);
        break;
    case "LineString":
        this.drawLineString(t);
        break;
    case "Polygon":
        this.drawPolygon(t);
        break;
    case "MultiPoint":
        this.drawMultiPoint(t);
        break;
    case "MultiLineString":
        this.drawMultiLineString(t);
        break;
    case "MultiPolygon":
        this.drawMultiPolygon(t);
        break;
    case "GeometryCollection":
        this.drawGeometryCollection(t);
        break;
    case "Circle": this.drawCircle(t);
} }, le.prototype.drawFeature = function (t, e) { var i = e.getGeometryFunction()(t); i && B.intersects(this.extent_, i.getExtent()) && (this.setStyle(e), this.drawGeometry(i)); }, le.prototype.drawGeometryCollection = function (t) { var e, i, n = t.getGeometriesArray(); for (e = 0, i = n.length; e < i; ++e)
    this.drawGeometry(n[e]); }, le.prototype.drawPoint = function (t) { var e = t.getFlatCoordinates(), i = t.getStride(); this.image_ && this.drawImages_(e, 0, e.length, i), "" !== this.text_ && this.drawText_(e, 0, e.length, i); }, le.prototype.drawMultiPoint = function (t) { var e = t.getFlatCoordinates(), i = t.getStride(); this.image_ && this.drawImages_(e, 0, e.length, i), "" !== this.text_ && this.drawText_(e, 0, e.length, i); }, le.prototype.drawLineString = function (t) { if (B.intersects(this.extent_, t.getExtent())) {
    if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        var e = this.context_, i = t.getFlatCoordinates();
        e.beginPath(), this.moveToLineTo_(i, 0, i.length, t.getStride(), !1), e.stroke();
    }
    if ("" !== this.text_) {
        var n = t.getFlatMidpoint();
        this.drawText_(n, 0, 2, 2);
    }
} }, le.prototype.drawMultiLineString = function (t) { var e = t.getExtent(); if (B.intersects(this.extent_, e)) {
    if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        var i, n, r = this.context_, o = t.getFlatCoordinates(), s = 0, a = t.getEnds(), h = t.getStride();
        for (r.beginPath(), i = 0, n = a.length; i < n; ++i)
            s = this.moveToLineTo_(o, s, a[i], h, !1);
        r.stroke();
    }
    if ("" !== this.text_) {
        var l = t.getFlatMidpoints();
        this.drawText_(l, 0, l.length, 2);
    }
} }, le.prototype.drawPolygon = function (t) { if (B.intersects(this.extent_, t.getExtent())) {
    if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        var e = this.context_;
        e.beginPath(), this.drawRings_(t.getOrientedFlatCoordinates(), 0, t.getEnds(), t.getStride()), this.fillState_ && e.fill(), this.strokeState_ && e.stroke();
    }
    if ("" !== this.text_) {
        var i = t.getFlatInteriorPoint();
        this.drawText_(i, 0, 2, 2);
    }
} }, le.prototype.drawMultiPolygon = function (t) { if (B.intersects(this.extent_, t.getExtent())) {
    if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        var e, i, n = this.context_, r = t.getOrientedFlatCoordinates(), o = 0, s = t.getEndss(), a = t.getStride();
        for (n.beginPath(), e = 0, i = s.length; e < i; ++e) {
            var h = s[e];
            o = this.drawRings_(r, o, h, a);
        }
        this.fillState_ && n.fill(), this.strokeState_ && n.stroke();
    }
    if ("" !== this.text_) {
        var l = t.getFlatInteriorPoints();
        this.drawText_(l, 0, l.length, 2);
    }
} }, le.prototype.setContextFillState_ = function (t) { var e = this.context_, i = this.contextFillState_; i ? i.fillStyle != t.fillStyle && (i.fillStyle = e.fillStyle = t.fillStyle) : (e.fillStyle = t.fillStyle, this.contextFillState_ = { fillStyle: t.fillStyle }); }, le.prototype.setContextStrokeState_ = function (t) { var e = this.context_, i = this.contextStrokeState_; i ? (i.lineCap != t.lineCap && (i.lineCap = e.lineCap = t.lineCap), g.CANVAS_LINE_DASH && (S.equals(i.lineDash, t.lineDash) || e.setLineDash(i.lineDash = t.lineDash), i.lineDashOffset != t.lineDashOffset && (i.lineDashOffset = e.lineDashOffset = t.lineDashOffset)), i.lineJoin != t.lineJoin && (i.lineJoin = e.lineJoin = t.lineJoin), i.lineWidth != t.lineWidth && (i.lineWidth = e.lineWidth = t.lineWidth), i.miterLimit != t.miterLimit && (i.miterLimit = e.miterLimit = t.miterLimit), i.strokeStyle != t.strokeStyle && (i.strokeStyle = e.strokeStyle = t.strokeStyle)) : (e.lineCap = t.lineCap, g.CANVAS_LINE_DASH && (e.setLineDash(t.lineDash), e.lineDashOffset = t.lineDashOffset), e.lineJoin = t.lineJoin, e.lineWidth = t.lineWidth, e.miterLimit = t.miterLimit, e.strokeStyle = t.strokeStyle, this.contextStrokeState_ = { lineCap: t.lineCap, lineDash: t.lineDash, lineDashOffset: t.lineDashOffset, lineJoin: t.lineJoin, lineWidth: t.lineWidth, miterLimit: t.miterLimit, strokeStyle: t.strokeStyle }); }, le.prototype.setContextTextState_ = function (t) { var e = this.context_, i = this.contextTextState_, n = t.textAlign ? t.textAlign : oe.defaultTextAlign; i ? (i.font != t.font && (i.font = e.font = t.font), i.textAlign != n && (i.textAlign = n), i.textBaseline != t.textBaseline && (i.textBaseline = e.textBaseline = t.textBaseline)) : (e.font = t.font, e.textAlign = n, e.textBaseline = t.textBaseline, this.contextTextState_ = { font: t.font, textAlign: n, textBaseline: t.textBaseline }); }, le.prototype.setFillStrokeStyle = function (t, e) { if (t) {
    var i = t.getColor();
    this.fillState_ = { fillStyle: ae.asColorLike(i || oe.defaultFillStyle) };
}
else
    this.fillState_ = null; if (e) {
    var n = e.getColor(), r = e.getLineCap(), o = e.getLineDash(), s = e.getLineDashOffset(), a = e.getLineJoin(), h = e.getWidth(), l = e.getMiterLimit();
    this.strokeState_ = { lineCap: void 0 !== r ? r : oe.defaultLineCap, lineDash: o || oe.defaultLineDash, lineDashOffset: s || oe.defaultLineDashOffset, lineJoin: void 0 !== a ? a : oe.defaultLineJoin, lineWidth: this.pixelRatio_ * (void 0 !== h ? h : oe.defaultLineWidth), miterLimit: void 0 !== l ? l : oe.defaultMiterLimit, strokeStyle: ae.asColorLike(n || oe.defaultStrokeStyle) };
}
else
    this.strokeState_ = null; }, le.prototype.setImageStyle = function (t) { if (t) {
    var e = t.getAnchor(), i = t.getImage(1), n = t.getOrigin(), r = t.getSize();
    this.imageAnchorX_ = e[0], this.imageAnchorY_ = e[1], this.imageHeight_ = r[1], this.image_ = i, this.imageOpacity_ = t.getOpacity(), this.imageOriginX_ = n[0], this.imageOriginY_ = n[1], this.imageRotateWithView_ = t.getRotateWithView(), this.imageRotation_ = t.getRotation(), this.imageScale_ = t.getScale() * this.pixelRatio_, this.imageSnapToPixel_ = t.getSnapToPixel(), this.imageWidth_ = r[0];
}
else
    this.image_ = null; }, le.prototype.setTextStyle = function (t) { if (t) {
    var e = t.getFill();
    if (e) {
        var i = e.getColor();
        this.textFillState_ = { fillStyle: ae.asColorLike(i || oe.defaultFillStyle) };
    }
    else
        this.textFillState_ = null;
    var n = t.getStroke();
    if (n) {
        var r = n.getColor(), o = n.getLineCap(), s = n.getLineDash(), a = n.getLineDashOffset(), h = n.getLineJoin(), l = n.getWidth(), u = n.getMiterLimit();
        this.textStrokeState_ = { lineCap: void 0 !== o ? o : oe.defaultLineCap, lineDash: s || oe.defaultLineDash, lineDashOffset: a || oe.defaultLineDashOffset, lineJoin: void 0 !== h ? h : oe.defaultLineJoin, lineWidth: void 0 !== l ? l : oe.defaultLineWidth, miterLimit: void 0 !== u ? u : oe.defaultMiterLimit, strokeStyle: ae.asColorLike(r || oe.defaultStrokeStyle) };
    }
    else
        this.textStrokeState_ = null;
    var c = t.getFont(), d = t.getOffsetX(), p = t.getOffsetY(), f = t.getRotateWithView(), g = t.getRotation(), _ = t.getScale(), v = t.getText(), y = t.getTextAlign(), m = t.getTextBaseline();
    this.textState_ = { font: void 0 !== c ? c : oe.defaultFont, textAlign: void 0 !== y ? y : oe.defaultTextAlign, textBaseline: void 0 !== m ? m : oe.defaultTextBaseline }, this.text_ = void 0 !== v ? v : "", this.textOffsetX_ = void 0 !== d ? this.pixelRatio_ * d : 0, this.textOffsetY_ = void 0 !== p ? this.pixelRatio_ * p : 0, this.textRotateWithView_ = void 0 !== f && f, this.textRotation_ = void 0 !== g ? g : 0, this.textScale_ = this.pixelRatio_ * (void 0 !== _ ? _ : 1);
}
else
    this.text_ = ""; }; var ue = function (t) { l.call(this), this.layer_ = t; }; i.inherits(ue, l), ue.prototype.forEachFeatureAtCoordinate = i.nullFunction, ue.prototype.hasFeatureAtCoordinate = N.FALSE, ue.prototype.createLoadedTileFinder = function (t, e, i) { return function (n, r) { return t.forEachLoadedTile(e, n, r, function (t) { i[n] || (i[n] = {}), i[n][t.tileCoord.toString()] = t; }); }; }, ue.prototype.getLayer = function () { return this.layer_; }, ue.prototype.handleImageChange_ = function (t) { 2 === t.target.getState() && this.renderIfReadyAndVisible(); }, ue.prototype.loadImage = function (t) { var e = t.getState(); return 2 != e && 3 != e && o.listen(t, "change", this.handleImageChange_, this), 0 == e && (t.load(), e = t.getState()), 2 == e; }, ue.prototype.renderIfReadyAndVisible = function () { var t = this.getLayer(); t.getVisible() && "ready" == t.getSourceState() && this.changed(); }, ue.prototype.scheduleExpireCache = function (t, e) { if (e.canExpireCache()) {
    var n = function (t, e, n) { var r = i.getUid(t).toString(); r in n.usedTiles && t.expireCache(n.viewState.projection, n.usedTiles[r]); }.bind(null, e);
    t.postRenderFunctions.push(n);
} }, ue.prototype.updateLogos = function (t, e) { var i = e.getLogo(); void 0 !== i && ("string" == typeof i ? t.logos[i] = "" : i && (w("string" == typeof i.href, 44), w("string" == typeof i.src, 45), t.logos[i.src] = i.href)); }, ue.prototype.updateUsedTiles = function (t, e, n, r) { var o = i.getUid(e).toString(), s = n.toString(); o in t ? s in t[o] ? t[o][s].extend(r) : t[o][s] = r : (t[o] = {}, t[o][s] = r); }, ue.prototype.manageTilePyramid = function (t, e, n, r, o, s, a, h, l, u) { var c = i.getUid(e).toString(); c in t.wantedTiles || (t.wantedTiles[c] = {}); var d, p, f, g, _, v, y = t.wantedTiles[c], m = t.tileQueue; for (v = n.getMinZoom(); v <= a; ++v)
    for (p = n.getTileRangeForExtentAndZ(s, v, p), f = n.getResolution(v), g = p.minX; g <= p.maxX; ++g)
        for (_ = p.minY; _ <= p.maxY; ++_)
            a - v <= h ? (0 == (d = e.getTile(v, g, _, r, o)).getState() && (y[d.getKey()] = !0, m.isKeyQueued(d.getKey()) || m.enqueue([d, c, n.getTileCoordCenter(d.tileCoord), f])), void 0 !== l && l.call(u, d)) : e.useTile(v, g, _, o); }; var ce = function (t) { ue.call(this, t), this.renderedResolution, this.transform_ = tt.create(); }; i.inherits(ce, ue), ce.prototype.clip = function (t, e, i) { var n = e.pixelRatio, r = e.size[0] * n, o = e.size[1] * n, s = e.viewState.rotation, a = B.getTopLeft(i), h = B.getTopRight(i), l = B.getBottomRight(i), u = B.getBottomLeft(i); tt.apply(e.coordinateToPixelTransform, a), tt.apply(e.coordinateToPixelTransform, h), tt.apply(e.coordinateToPixelTransform, l), tt.apply(e.coordinateToPixelTransform, u), t.save(), oe.rotateAtOffset(t, -s, r / 2, o / 2), t.beginPath(), t.moveTo(a[0] * n, a[1] * n), t.lineTo(h[0] * n, h[1] * n), t.lineTo(l[0] * n, l[1] * n), t.lineTo(u[0] * n, u[1] * n), t.clip(), oe.rotateAtOffset(t, s, r / 2, o / 2); }, ce.prototype.dispatchComposeEvent_ = function (t, e, i, n) { var r = this.getLayer(); if (r.hasListener(t)) {
    var o = i.size[0] * i.pixelRatio, s = i.size[1] * i.pixelRatio, a = i.viewState.rotation;
    oe.rotateAtOffset(e, -a, o / 2, s / 2);
    var h = void 0 !== n ? n : this.getTransform(i, 0), l = new le(e, i.pixelRatio, i.extent, h, i.viewState.rotation), u = new ee(t, l, i, e, null);
    r.dispatchEvent(u), oe.rotateAtOffset(e, a, o / 2, s / 2);
} }, ce.prototype.forEachLayerAtCoordinate = function (t, e, i, n) { return this.forEachFeatureAtCoordinate(t, e, 0, N.TRUE, this) ? i.call(n, this.getLayer(), null) : void 0; }, ce.prototype.postCompose = function (t, e, i, n) { this.dispatchComposeEvent_("postcompose", t, e, n); }, ce.prototype.preCompose = function (t, e, i) { this.dispatchComposeEvent_("precompose", t, e, i); }, ce.prototype.dispatchRenderEvent = function (t, e, i) { this.dispatchComposeEvent_("render", t, e, i); }, ce.prototype.getTransform = function (t, e) { var i = t.viewState, n = t.pixelRatio, r = n * t.size[0] / 2, o = n * t.size[1] / 2, s = n / i.resolution, a = -s, h = -i.rotation, l = -i.center[0] + e, u = -i.center[1]; return tt.compose(this.transform_, r, o, s, a, h, l, u); }, ce.prototype.composeFrame = function (t, e, i) { }, ce.prototype.prepareFrame = function (t, e) { }; var de = function (t) { ce.call(this, t), this.coordinateToCanvasPixelTransform = tt.create(), this.hitCanvasContext_ = null; }; i.inherits(de, ce), de.prototype.composeFrame = function (t, e, i) { this.preCompose(i, t); var n = this.getImage(); if (n) {
    var r = e.extent, o = void 0 !== r && !B.containsExtent(r, t.extent) && B.intersects(r, t.extent);
    o && this.clip(i, t, r);
    var s = this.getImageTransform(), a = i.globalAlpha;
    i.globalAlpha = e.opacity;
    var h = s[4], l = s[5], u = n.width * s[0], c = n.height * s[3];
    i.drawImage(n, 0, 0, +n.width, +n.height, Math.round(h), Math.round(l), Math.round(u), Math.round(c)), i.globalAlpha = a, o && i.restore();
} this.postCompose(i, t, e); }, de.prototype.getImage = function () { }, de.prototype.getImageTransform = function () { }, de.prototype.forEachFeatureAtCoordinate = function (t, e, i, n, r) { var o = this.getLayer(), s = o.getSource(), a = e.viewState.resolution, h = e.viewState.rotation, l = e.skippedFeatureUids; return s.forEachFeatureAtCoordinate(t, a, h, i, l, function (t) { return n.call(r, t, o); }); }, de.prototype.forEachLayerAtCoordinate = function (t, e, n, r) { if (this.getImage()) {
    if (this.getLayer().getSource().forEachFeatureAtCoordinate !== i.nullFunction)
        return ce.prototype.forEachLayerAtCoordinate.apply(this, arguments);
    var o = tt.apply(this.coordinateToCanvasPixelTransform, t.slice());
    G.scale(o, e.viewState.resolution / this.renderedResolution), this.hitCanvasContext_ || (this.hitCanvasContext_ = yt(1, 1)), this.hitCanvasContext_.clearRect(0, 0, 1, 1), this.hitCanvasContext_.drawImage(this.getImage(), o[0], o[1], 1, 1, 0, 0, 1, 1);
    var s = this.hitCanvasContext_.getImageData(0, 0, 1, 1).data;
    return s[3] > 0 ? n.call(r, this.getLayer(), s) : void 0;
} }; var pe = function (t) { de.call(this, t), this.image_ = null, this.imageTransform_ = tt.create(), this.skippedFeatures_ = [], this.vectorRenderer_ = null; }; i.inherits(pe, de), pe.handles = function (t, e) { return "canvas" === t && ("IMAGE" === e.getType() || "VECTOR" === e.getType() && "image" === e.getRenderMode()); }, pe.create = function (t, e) { var i = new pe(e); if ("VECTOR" === e.getType())
    for (var n = Ct.getLayerRendererPlugins(), r = 0, o = n.length; r < o; ++r) {
        var s = n[r];
        s !== pe && s.handles("canvas", e) && i.setVectorRenderer(s.create(t, e));
    } return i; }, pe.prototype.getImage = function () { return this.image_ ? this.image_.getImage() : null; }, pe.prototype.getImageTransform = function () { return this.imageTransform_; }, pe.prototype.prepareFrame = function (t, e) { var n, o = t.pixelRatio, s = t.size, a = t.viewState, h = a.center, l = a.resolution, u = this.getLayer().getSource(), c = t.viewHints, d = t.extent; if (void 0 !== e.extent && (d = B.getIntersection(d, e.extent)), !c[0] && !c[1] && !B.isEmpty(d)) {
    var p = a.projection;
    if (!i.ENABLE_RASTER_REPROJECTION) {
        var f = u.getProjection();
        f && (p = f);
    }
    var g = this.vectorRenderer_;
    if (g) {
        var _ = g.context, v = r.assign({}, t, { size: [B.getWidth(d) / l, B.getHeight(d) / l], viewState: r.assign({}, t.viewState, { rotation: 0 }) }), y = Object.keys(v.skippedFeatureUids).sort();
        !g.prepareFrame(v, e) || !g.replayGroupChanged && S.equals(y, this.skippedFeatures_) || (_.canvas.width = v.size[0] * o, _.canvas.height = v.size[1] * o, g.composeFrame(v, e, _), this.image_ = new te(d, l, o, _.canvas), this.skippedFeatures_ = y);
    }
    else
        (n = u.getImage(d, l, o, p)) && this.loadImage(n) && (this.image_ = n);
} if (this.image_) {
    var m = (n = this.image_).getExtent(), x = n.getResolution(), E = n.getPixelRatio(), T = o * x / (l * E), C = tt.compose(this.imageTransform_, o * s[0] / 2, o * s[1] / 2, T, T, 0, E * (m[0] - h[0]) / x, E * (h[1] - m[3]) / x);
    tt.compose(this.coordinateToCanvasPixelTransform, o * s[0] / 2 - C[4], o * s[1] / 2 - C[5], o / l, -o / l, 0, -h[0], -h[1]), this.updateLogos(t, u), this.renderedResolution = x * o / E;
} return !!this.image_; }, pe.prototype.forEachFeatureAtCoordinate = function (t, e, i, n, r) { return this.vectorRenderer_ ? this.vectorRenderer_.forEachFeatureAtCoordinate(t, e, i, n, r) : de.prototype.forEachFeatureAtCoordinate.call(this, t, e, i, n, r); }, pe.prototype.setVectorRenderer = function (t) { this.vectorRenderer_ = t; }; var fe = function () { this.cache_ = {}, this.cacheSize_ = 0, this.maxCacheSize_ = 32; }; fe.getKey = function (t, e, i) { return e + ":" + t + ":" + (i ? se.asString(i) : "null"); }, fe.prototype.clear = function () { this.cache_ = {}, this.cacheSize_ = 0; }, fe.prototype.expire = function () { if (this.cacheSize_ > this.maxCacheSize_) {
    var t, e, i = 0;
    for (t in this.cache_)
        e = this.cache_[t], 0 != (3 & i++) || e.hasListener() || (delete this.cache_[t], --this.cacheSize_);
} }, fe.prototype.get = function (t, e, i) { var n = fe.getKey(t, e, i); return n in this.cache_ ? this.cache_[n] : null; }, fe.prototype.set = function (t, e, i, n) { var r = fe.getKey(t, e, i); this.cache_[r] = n, ++this.cacheSize_; }, fe.prototype.setSize = function (t) { this.maxCacheSize_ = t, this.expire(); }; var ge = {}; ge.iconImageCache = new fe; var _e = function (t, e) { s.call(this), this.map_ = e, this.layerRenderers_ = {}, this.layerRendererListeners_ = {}; }; i.inherits(_e, s), _e.prototype.calculateMatrices2D = function (t) { var e = t.viewState, i = t.coordinateToPixelTransform, n = t.pixelToCoordinateTransform; tt.compose(i, t.size[0] / 2, t.size[1] / 2, 1 / e.resolution, -1 / e.resolution, -e.rotation, -e.center[0], -e.center[1]), tt.invert(tt.setFromArray(n, i)); }, _e.prototype.removeLayerRenderers = function () { for (var t in this.layerRenderers_)
    this.removeLayerRendererByKey_(t).dispose(); }, _e.expireIconCache_ = function (t, e) { ge.iconImageCache.expire(); }, _e.prototype.forEachFeatureAtCoordinate = function (t, e, n, r, o, s, a) { var h, l = e.viewState, u = l.resolution; function c(t, n) { var s = i.getUid(t).toString(), a = e.layerStates[i.getUid(n)].managed; if (!(s in e.skippedFeatureUids) || a)
    return r.call(o, t, a ? n : null); } var d = l.projection, p = t; if (d.canWrapX()) {
    var f = d.getExtent(), g = B.getWidth(f), _ = t[0];
    (_ < f[0] || _ > f[2]) && (p = [_ + g * Math.ceil((f[0] - _) / g), t[1]]);
} var v, y = e.layerStatesArray; for (v = y.length - 1; v >= 0; --v) {
    var m = y[v], x = m.layer;
    if (Mt.visibleAtResolution(m, u) && s.call(a, x)) {
        var E = this.getLayerRenderer(x);
        if (x.getSource() && (h = E.forEachFeatureAtCoordinate(x.getSource().getWrapX() ? p : t, e, n, c, o)), h)
            return h;
    }
} }, _e.prototype.forEachLayerAtPixel = function (t, e, i, n, r, o) { }, _e.prototype.hasFeatureAtCoordinate = function (t, e, i, n, r) { return void 0 !== this.forEachFeatureAtCoordinate(t, e, i, N.TRUE, this, n, r); }, _e.prototype.getLayerRenderer = function (t) { var e = i.getUid(t).toString(); if (e in this.layerRenderers_)
    return this.layerRenderers_[e]; for (var n, r = Ct.getLayerRendererPlugins(), s = this.getType(), a = 0, h = r.length; a < h; ++a) {
    var l = r[a];
    if (l.handles(s, t)) {
        n = l.create(this, t);
        break;
    }
} if (!n)
    throw new Error("Unable to create renderer for layer: " + t.getType()); return this.layerRenderers_[e] = n, this.layerRendererListeners_[e] = o.listen(n, "change", this.handleLayerRendererChange_, this), n; }, _e.prototype.getLayerRendererByKey = function (t) { return this.layerRenderers_[t]; }, _e.prototype.getLayerRenderers = function () { return this.layerRenderers_; }, _e.prototype.getMap = function () { return this.map_; }, _e.prototype.getType = function () { }, _e.prototype.handleLayerRendererChange_ = function () { this.map_.render(); }, _e.prototype.removeLayerRendererByKey_ = function (t) { var e = this.layerRenderers_[t]; return delete this.layerRenderers_[t], o.unlistenByKey(this.layerRendererListeners_[t]), delete this.layerRendererListeners_[t], e; }, _e.prototype.renderFrame = i.nullFunction, _e.prototype.removeUnusedLayerRenderers_ = function (t, e) { var i; for (i in this.layerRenderers_)
    e && i in e.layerStates || this.removeLayerRendererByKey_(i).dispose(); }, _e.prototype.scheduleExpireIconCache = function (t) { t.postRenderFunctions.push(_e.expireIconCache_); }, _e.prototype.scheduleRemoveUnusedLayerRenderers = function (t) { var e; for (e in this.layerRenderers_)
    if (!(e in t.layerStates))
        return void t.postRenderFunctions.push(this.removeUnusedLayerRenderers_.bind(this)); }, _e.sortByZIndex = function (t, e) { return t.zIndex - e.zIndex; }; var ve = function (t, e) { _e.call(this, t, e), this.context_ = yt(), this.canvas_ = this.context_.canvas, this.canvas_.style.width = "100%", this.canvas_.style.height = "100%", this.canvas_.style.display = "block", this.canvas_.className = Ft.CLASS_UNSELECTABLE, t.insertBefore(this.canvas_, t.childNodes[0] || null), this.renderedVisible_ = !0, this.transform_ = tt.create(); }; i.inherits(ve, _e), ve.handles = function (t) { return "canvas" === t; }, ve.create = function (t, e) { return new ve(t, e); }, ve.prototype.dispatchComposeEvent_ = function (t, e) { var i = this.getMap(), n = this.context_; if (i.hasListener(t)) {
    var r = e.extent, o = e.pixelRatio, s = e.viewState.rotation, a = this.getTransform(e), h = new le(n, o, r, a, s), l = new ee(t, h, e, n, null);
    i.dispatchEvent(l);
} }, ve.prototype.getTransform = function (t) { var e = t.viewState, i = this.canvas_.width / 2, n = this.canvas_.height / 2, r = t.pixelRatio / e.resolution, o = -r, s = -e.rotation, a = -e.center[0], h = -e.center[1]; return tt.compose(this.transform_, i, n, r, o, s, a, h); }, ve.prototype.getType = function () { return "canvas"; }, ve.prototype.renderFrame = function (t) { if (t) {
    var e = this.context_, i = t.pixelRatio, n = Math.round(t.size[0] * i), r = Math.round(t.size[1] * i);
    this.canvas_.width != n || this.canvas_.height != r ? (this.canvas_.width = n, this.canvas_.height = r) : e.clearRect(0, 0, n, r);
    var o = t.viewState.rotation;
    this.calculateMatrices2D(t), this.dispatchComposeEvent_("precompose", t);
    var s = t.layerStatesArray;
    S.stableSort(s, _e.sortByZIndex), o && (e.save(), oe.rotateAtOffset(e, o, n / 2, r / 2));
    var a, h, l, u, c, d = t.viewState.resolution;
    for (a = 0, h = s.length; a < h; ++a)
        l = (c = s[a]).layer, u = this.getLayerRenderer(l), Mt.visibleAtResolution(c, d) && "ready" == c.sourceState && u.prepareFrame(t, c) && u.composeFrame(t, c, e);
    o && e.restore(), this.dispatchComposeEvent_("postcompose", t), this.renderedVisible_ || (this.canvas_.style.display = "", this.renderedVisible_ = !0), this.scheduleRemoveUnusedLayerRenderers(t), this.scheduleExpireIconCache(t);
}
else
    this.renderedVisible_ && (this.canvas_.style.display = "none", this.renderedVisible_ = !1); }, ve.prototype.forEachLayerAtPixel = function (t, e, i, n, r, o) { var s, a, h = e.viewState.resolution, l = e.layerStatesArray, u = l.length, c = tt.apply(e.pixelToCoordinateTransform, t.slice()); for (a = u - 1; a >= 0; --a) {
    var d = l[a], p = d.layer;
    if (Mt.visibleAtResolution(d, h) && r.call(o, p) && (s = this.getLayerRenderer(p).forEachLayerAtCoordinate(c, e, i, n)))
        return s;
} }; var ye = function (t, e, i, n) { this.minX = t, this.maxX = e, this.minY = i, this.maxY = n; }; ye.createOrUpdate = function (t, e, i, n, r) { return void 0 !== r ? (r.minX = t, r.maxX = e, r.minY = i, r.maxY = n, r) : new ye(t, e, i, n); }, ye.prototype.contains = function (t) { return this.containsXY(t[1], t[2]); }, ye.prototype.containsTileRange = function (t) { return this.minX <= t.minX && t.maxX <= this.maxX && this.minY <= t.minY && t.maxY <= this.maxY; }, ye.prototype.containsXY = function (t, e) { return this.minX <= t && t <= this.maxX && this.minY <= e && e <= this.maxY; }, ye.prototype.equals = function (t) { return this.minX == t.minX && this.minY == t.minY && this.maxX == t.maxX && this.maxY == t.maxY; }, ye.prototype.extend = function (t) { t.minX < this.minX && (this.minX = t.minX), t.maxX > this.maxX && (this.maxX = t.maxX), t.minY < this.minY && (this.minY = t.minY), t.maxY > this.maxY && (this.maxY = t.maxY); }, ye.prototype.getHeight = function () { return this.maxY - this.minY + 1; }, ye.prototype.getSize = function () { return [this.getWidth(), this.getHeight()]; }, ye.prototype.getWidth = function () { return this.maxX - this.minX + 1; }, ye.prototype.intersects = function (t) { return this.minX <= t.maxX && this.maxX >= t.minX && this.minY <= t.maxY && this.maxY >= t.minY; }; var me = function (t) { de.call(this, t), this.context = null === this.context ? null : yt(), this.oversampling_, this.renderedExtent_ = null, this.renderedRevision, this.renderedTiles = [], this.tmpExtent = B.createEmpty(), this.tmpTileRange_ = new ye(0, 0, 0, 0), this.imageTransform_ = tt.create(), this.zDirection = 0; }; i.inherits(me, de), me.handles = function (t, e) { return "canvas" === t && "TILE" === e.getType(); }, me.create = function (t, e) { return new me(e); }, me.prototype.isDrawableTile_ = function (t) { var e = t.getState(), i = this.getLayer().getUseInterimTilesOnError(); return 2 == e || 4 == e || 3 == e && !i; }, me.prototype.prepareFrame = function (t, e) { var n = t.pixelRatio, r = t.size, o = t.viewState, s = o.projection, a = o.resolution, h = o.center, l = this.getLayer(), u = l.getSource(), c = u.getRevision(), d = u.getTileGridForProjection(s), p = d.getZForResolution(a, this.zDirection), f = d.getResolution(p), g = Math.round(a / f) || 1, _ = t.extent; if (void 0 !== e.extent && (_ = B.getIntersection(_, e.extent)), B.isEmpty(_))
    return !1; var v = d.getTileRangeForExtentAndZ(_, p), y = d.getTileRangeExtent(p, v), m = u.getTilePixelRatio(n), x = {}; x[p] = {}; var E, T, C, S = this.createLoadedTileFinder(u, s, x), R = this.tmpExtent, I = this.tmpTileRange_, L = !1; for (T = v.minX; T <= v.maxX; ++T)
    for (C = v.minY; C <= v.maxY; ++C) {
        if (3 == (E = u.getTile(p, T, C, n, s)).getState() && (l.getUseInterimTilesOnError() ? l.getPreload() > 0 && (L = !0) : E.setState(2)), this.isDrawableTile_(E) || (E = E.getInterimTile()), this.isDrawableTile_(E)) {
            var w = i.getUid(this);
            if (2 == E.getState()) {
                x[p][E.tileCoord.toString()] = E;
                var A = E.inTransition(w);
                L || !A && -1 !== this.renderedTiles.indexOf(E) || (L = !0);
            }
            if (1 === E.getAlpha(w, t.time))
                continue;
        }
        var P = d.getTileCoordChildTileRange(E.tileCoord, I, R), F = !1;
        P && (F = S(p + 1, P)), F || d.forEachTileCoordParentTileRange(E.tileCoord, S, null, I, R);
    } var M = f * n / m * g, b = t.viewHints, D = b[0] || b[1]; if (!(this.renderedResolution && Date.now() - t.time > 16 && D) && (L || !this.renderedExtent_ || !B.containsExtent(this.renderedExtent_, _) || this.renderedRevision != c || g != this.oversampling_ || !D && M != this.renderedResolution)) {
    var O = this.context;
    if (O) {
        var k = u.getTilePixelSize(p, n, s), G = Math.round(v.getWidth() * k[0] / g), U = Math.round(v.getHeight() * k[1] / g), N = O.canvas;
        N.width != G || N.height != U ? (this.oversampling_ = g, N.width = G, N.height = U) : (this.renderedExtent_ && !B.equals(y, this.renderedExtent_) && O.clearRect(0, 0, G, U), g = this.oversampling_);
    }
    this.renderedTiles.length = 0;
    var W, X, V, j, z, Y, K, H, Z, q, J = Object.keys(x).map(Number);
    for (J.sort(function (t, e) { return t === p ? 1 : e === p ? -1 : t > e ? 1 : t < e ? -1 : 0; }), j = 0, z = J.length; j < z; ++j)
        for (var Q in V = J[j], X = u.getTilePixelSize(V, n, s), W = d.getResolution(V) / f, K = m * u.getGutter(s), H = x[V])
            E = H[Q], T = ((Y = d.getTileCoordExtent(E.getTileCoord(), R))[0] - y[0]) / f * m / g, C = (y[3] - Y[3]) / f * m / g, Z = X[0] * W / g, q = X[1] * W / g, this.drawTileImage(E, t, e, T, C, Z, q, K, p === V), this.renderedTiles.push(E);
    this.renderedRevision = c, this.renderedResolution = f * n / m * g, this.renderedExtent_ = y;
} var $ = this.renderedResolution / a, et = tt.compose(this.imageTransform_, n * r[0] / 2, n * r[1] / 2, $, $, 0, (this.renderedExtent_[0] - h[0]) / this.renderedResolution * n, (h[1] - this.renderedExtent_[3]) / this.renderedResolution * n); return tt.compose(this.coordinateToCanvasPixelTransform, n * r[0] / 2 - et[4], n * r[1] / 2 - et[5], n / a, -n / a, 0, -h[0], -h[1]), this.updateUsedTiles(t.usedTiles, u, p, v), this.manageTilePyramid(t, u, d, n, s, _, p, l.getPreload()), this.scheduleExpireCache(t, u), this.updateLogos(t, u), this.renderedTiles.length > 0; }, me.prototype.drawTileImage = function (t, e, n, r, o, s, a, h, l) { var u = t.getImage(this.getLayer()); if (u) {
    var c = i.getUid(this), d = l ? t.getAlpha(c, e.time) : 1;
    1 !== d || this.getLayer().getSource().getOpaque(e.viewState.projection) || this.context.clearRect(r, o, s, a);
    var p = d !== this.context.globalAlpha;
    p && (this.context.save(), this.context.globalAlpha = d), this.context.drawImage(u, h, h, u.width - 2 * h, u.height - 2 * h, r, o, s, a), p && this.context.restore(), 1 !== d ? e.animate = !0 : l && t.endTransition(c);
} }, me.prototype.getImage = function () { var t = this.context; return t ? t.canvas : null; }, me.prototype.getImageTransform = function () { return this.imageTransform_; }; var xe = e.createCommonjsModule(function (t, i) { e.commonjsGlobal, t.exports = function () { function t(t, e, i) { var n = t[e]; t[e] = t[i], t[i] = n; } function e(t, e) { return t < e ? -1 : t > e ? 1 : 0; } return function (i, n, r, o, s) { !function e(i, n, r, o, s) { for (; o > r;) {
    if (o - r > 600) {
        var a = o - r + 1, h = n - r + 1, l = Math.log(a), u = .5 * Math.exp(2 * l / 3), c = .5 * Math.sqrt(l * u * (a - u) / a) * (h - a / 2 < 0 ? -1 : 1);
        e(i, n, Math.max(r, Math.floor(n - h * u / a + c)), Math.min(o, Math.floor(n + (a - h) * u / a + c)), s);
    }
    var d = i[n], p = r, f = o;
    for (t(i, r, n), s(i[o], d) > 0 && t(i, r, o); p < f;) {
        for (t(i, p, f), p++, f--; s(i[p], d) < 0;)
            p++;
        for (; s(i[f], d) > 0;)
            f--;
    }
    0 === s(i[r], d) ? t(i, r, f) : t(i, ++f, o), f <= n && (r = f + 1), n <= f && (o = f - 1);
} }(i, n, r || 0, o || i.length - 1, s || e); }; }(); }), Ee = Object.freeze({ default: xe, __moduleExports: xe }), Te = Ee && xe || Ee, Ce = Se; function Se(t, e) { if (!(this instanceof Se))
    return new Se(t, e); this._maxEntries = Math.max(4, t || 9), this._minEntries = Math.max(2, Math.ceil(.4 * this._maxEntries)), e && this._initFormat(e), this.clear(); } function Re(t, e, i) { if (!i)
    return e.indexOf(t); for (var n = 0; n < e.length; n++)
    if (i(t, e[n]))
        return n; return -1; } function Ie(t, e) { Le(t, 0, t.children.length, e, t); } function Le(t, e, i, n, r) { r || (r = Oe(null)), r.minX = 1 / 0, r.minY = 1 / 0, r.maxX = -1 / 0, r.maxY = -1 / 0; for (var o, s = e; s < i; s++)
    o = t.children[s], we(r, t.leaf ? n(o) : o); return r; } function we(t, e) { return t.minX = Math.min(t.minX, e.minX), t.minY = Math.min(t.minY, e.minY), t.maxX = Math.max(t.maxX, e.maxX), t.maxY = Math.max(t.maxY, e.maxY), t; } function Ae(t, e) { return t.minX - e.minX; } function Pe(t, e) { return t.minY - e.minY; } function Fe(t) { return (t.maxX - t.minX) * (t.maxY - t.minY); } function Me(t) { return t.maxX - t.minX + (t.maxY - t.minY); } function be(t, e) { return t.minX <= e.minX && t.minY <= e.minY && e.maxX <= t.maxX && e.maxY <= t.maxY; } function De(t, e) { return e.minX <= t.maxX && e.minY <= t.maxY && e.maxX >= t.minX && e.maxY >= t.minY; } function Oe(t) { return { children: t, height: 1, leaf: !0, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 }; } function ke(t, e, i, n, r) { for (var o, s = [e, i]; s.length;)
    (i = s.pop()) - (e = s.pop()) <= n || (o = e + Math.ceil((i - e) / n / 2) * n, Te(t, o, e, i, r), s.push(e, o, o, i)); } Se.prototype = { all: function () { return this._all(this.data, []); }, search: function (t) { var e = this.data, i = [], n = this.toBBox; if (!De(t, e))
        return i; for (var r, o, s, a, h = []; e;) {
        for (r = 0, o = e.children.length; r < o; r++)
            s = e.children[r], De(t, a = e.leaf ? n(s) : s) && (e.leaf ? i.push(s) : be(t, a) ? this._all(s, i) : h.push(s));
        e = h.pop();
    } return i; }, collides: function (t) { var e = this.data, i = this.toBBox; if (!De(t, e))
        return !1; for (var n, r, o, s, a = []; e;) {
        for (n = 0, r = e.children.length; n < r; n++)
            if (o = e.children[n], De(t, s = e.leaf ? i(o) : o)) {
                if (e.leaf || be(t, s))
                    return !0;
                a.push(o);
            }
        e = a.pop();
    } return !1; }, load: function (t) { if (!t || !t.length)
        return this; if (t.length < this._minEntries) {
        for (var e = 0, i = t.length; e < i; e++)
            this.insert(t[e]);
        return this;
    } var n = this._build(t.slice(), 0, t.length - 1, 0); if (this.data.children.length)
        if (this.data.height === n.height)
            this._splitRoot(this.data, n);
        else {
            if (this.data.height < n.height) {
                var r = this.data;
                this.data = n, n = r;
            }
            this._insert(n, this.data.height - n.height - 1, !0);
        }
    else
        this.data = n; return this; }, insert: function (t) { return t && this._insert(t, this.data.height - 1), this; }, clear: function () { return this.data = Oe([]), this; }, remove: function (t, e) { if (!t)
        return this; for (var i, n, r, o, s = this.data, a = this.toBBox(t), h = [], l = []; s || h.length;) {
        if (s || (s = h.pop(), n = h[h.length - 1], i = l.pop(), o = !0), s.leaf && -1 !== (r = Re(t, s.children, e)))
            return s.children.splice(r, 1), h.push(s), this._condense(h), this;
        o || s.leaf || !be(s, a) ? n ? (i++, s = n.children[i], o = !1) : s = null : (h.push(s), l.push(i), i = 0, n = s, s = s.children[0]);
    } return this; }, toBBox: function (t) { return t; }, compareMinX: Ae, compareMinY: Pe, toJSON: function () { return this.data; }, fromJSON: function (t) { return this.data = t, this; }, _all: function (t, e) { for (var i = []; t;)
        t.leaf ? e.push.apply(e, t.children) : i.push.apply(i, t.children), t = i.pop(); return e; }, _build: function (t, e, i, n) { var r, o = i - e + 1, s = this._maxEntries; if (o <= s)
        return Ie(r = Oe(t.slice(e, i + 1)), this.toBBox), r; n || (n = Math.ceil(Math.log(o) / Math.log(s)), s = Math.ceil(o / Math.pow(s, n - 1))), (r = Oe([])).leaf = !1, r.height = n; var a, h, l, u, c = Math.ceil(o / s), d = c * Math.ceil(Math.sqrt(s)); for (ke(t, e, i, d, this.compareMinX), a = e; a <= i; a += d)
        for (ke(t, a, l = Math.min(a + d - 1, i), c, this.compareMinY), h = a; h <= l; h += c)
            u = Math.min(h + c - 1, l), r.children.push(this._build(t, h, u, n - 1)); return Ie(r, this.toBBox), r; }, _chooseSubtree: function (t, e, i, n) { for (var r, o, s, a, h, l, u, c, d, p; n.push(e), !e.leaf && n.length - 1 !== i;) {
        for (u = c = 1 / 0, r = 0, o = e.children.length; r < o; r++)
            h = Fe(s = e.children[r]), d = t, p = s, (l = (Math.max(p.maxX, d.maxX) - Math.min(p.minX, d.minX)) * (Math.max(p.maxY, d.maxY) - Math.min(p.minY, d.minY)) - h) < c ? (c = l, u = h < u ? h : u, a = s) : l === c && h < u && (u = h, a = s);
        e = a || e.children[0];
    } return e; }, _insert: function (t, e, i) { var n = this.toBBox, r = i ? t : n(t), o = [], s = this._chooseSubtree(r, this.data, e, o); for (s.children.push(t), we(s, r); e >= 0 && o[e].children.length > this._maxEntries;)
        this._split(o, e), e--; this._adjustParentBBoxes(r, o, e); }, _split: function (t, e) { var i = t[e], n = i.children.length, r = this._minEntries; this._chooseSplitAxis(i, r, n); var o = this._chooseSplitIndex(i, r, n), s = Oe(i.children.splice(o, i.children.length - o)); s.height = i.height, s.leaf = i.leaf, Ie(i, this.toBBox), Ie(s, this.toBBox), e ? t[e - 1].children.push(s) : this._splitRoot(i, s); }, _splitRoot: function (t, e) { this.data = Oe([t, e]), this.data.height = t.height + 1, this.data.leaf = !1, Ie(this.data, this.toBBox); }, _chooseSplitIndex: function (t, e, i) { var n, r, o, s, a, h, l, u, c, d, p, f, g, _; for (h = l = 1 / 0, n = e; n <= i - e; n++)
        c = r = Le(t, 0, n, this.toBBox), d = o = Le(t, n, i, this.toBBox), p = Math.max(c.minX, d.minX), f = Math.max(c.minY, d.minY), g = Math.min(c.maxX, d.maxX), _ = Math.min(c.maxY, d.maxY), s = Math.max(0, g - p) * Math.max(0, _ - f), a = Fe(r) + Fe(o), s < h ? (h = s, u = n, l = a < l ? a : l) : s === h && a < l && (l = a, u = n); return u; }, _chooseSplitAxis: function (t, e, i) { var n = t.leaf ? this.compareMinX : Ae, r = t.leaf ? this.compareMinY : Pe; this._allDistMargin(t, e, i, n) < this._allDistMargin(t, e, i, r) && t.children.sort(n); }, _allDistMargin: function (t, e, i, n) { t.children.sort(n); var r, o, s = this.toBBox, a = Le(t, 0, e, s), h = Le(t, i - e, i, s), l = Me(a) + Me(h); for (r = e; r < i - e; r++)
        o = t.children[r], we(a, t.leaf ? s(o) : o), l += Me(a); for (r = i - e - 1; r >= e; r--)
        o = t.children[r], we(h, t.leaf ? s(o) : o), l += Me(h); return l; }, _adjustParentBBoxes: function (t, e, i) { for (var n = i; n >= 0; n--)
        we(e[n], t); }, _condense: function (t) { for (var e, i = t.length - 1; i >= 0; i--)
        0 === t[i].children.length ? i > 0 ? (e = t[i - 1].children).splice(e.indexOf(t[i]), 1) : this.clear() : Ie(t[i], this.toBBox); }, _initFormat: function (t) { var e = ["return a", " - b", ";"]; this.compareMinX = new Function("a", "b", e.join(t[0])), this.compareMinY = new Function("a", "b", e.join(t[1])), this.toBBox = new Function("a", "return {minX: a" + t[0] + ", minY: a" + t[1] + ", maxX: a" + t[2] + ", maxY: a" + t[3] + "};"); } }; var Ge = function () { }; Ge.prototype.getReplay = function (t, e) { }, Ge.prototype.isEmpty = function () { }; var Ue = { CIRCLE: "Circle", DEFAULT: "Default", IMAGE: "Image", LINE_STRING: "LineString", POLYGON: "Polygon", TEXT: "Text" }, Be = { lineString: function (t, e, i, n) { var r, o = t[e], s = t[e + 1], a = 0; for (r = e + n; r < i; r += n) {
        var h = t[r], l = t[r + 1];
        a += Math.sqrt((h - o) * (h - o) + (l - s) * (l - s)), o = h, s = l;
    } return a; }, linearRing: function (t, e, i, n) { var r = Be.lineString(t, e, i, n), o = t[i - n] - t[e], s = t[i - n + 1] - t[e + 1]; return r + Math.sqrt(o * o + s * s); } }, Ne = function (t, e, i, n, r, o, s, a) { for (var h, l, u, c = [], d = t[e] > t[i - n], p = r.length, f = t[e], g = t[e + 1], _ = t[e += n], v = t[e + 1], y = 0, m = Math.sqrt(Math.pow(_ - f, 2) + Math.pow(v - g, 2)), x = "", E = 0, T = 0; T < p; ++T) {
    l = d ? p - T - 1 : T;
    var C = r.charAt(l), S = o(x = d ? C + x : x + C) - E;
    E += S;
    for (var R = s + S / 2; e < i - n && y + m < R;)
        f = _, g = v, _ = t[e += n], v = t[e + 1], y += m, m = Math.sqrt(Math.pow(_ - f, 2) + Math.pow(v - g, 2));
    var I = R - y, L = Math.atan2(v - g, _ - f);
    if (d && (L += L > 0 ? -Math.PI : Math.PI), void 0 !== u) {
        var w = L - u;
        if (w += w > Math.PI ? -2 * Math.PI : w < -Math.PI ? 2 * Math.PI : 0, Math.abs(w) > a)
            return null;
    }
    var A = I / m, P = F.lerp(f, _, A), M = F.lerp(g, v, A);
    u == L ? (d && (h[0] = P, h[1] = M, h[2] = S / 2), h[4] = x) : (E = S, h = [P, M, S / 2, L, x = C], d ? c.unshift(h) : c.push(h), u = L), s += S;
} return c; }, We = {}; We.ORDER = [Ue.POLYGON, Ue.CIRCLE, Ue.LINE_STRING, Ue.IMAGE, Ue.TEXT, Ue.DEFAULT], We.TEXT_ALIGN = {}, We.TEXT_ALIGN.left = 0, We.TEXT_ALIGN.end = 0, We.TEXT_ALIGN.center = .5, We.TEXT_ALIGN.right = 1, We.TEXT_ALIGN.start = 1, We.TEXT_ALIGN.top = 0, We.TEXT_ALIGN.middle = .5, We.TEXT_ALIGN.hanging = .2, We.TEXT_ALIGN.alphabetic = .8, We.TEXT_ALIGN.ideographic = .8, We.TEXT_ALIGN.bottom = 1; var Xe = function (t, e, i, n, r, o) { he.call(this), this.declutterTree = o, this.tmpExtent_ = B.createEmpty(), this.tolerance = t, this.maxExtent = e, this.overlaps = r, this.pixelRatio = n, this.maxLineWidth = 0, this.resolution = i, this.fillOrigin_, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_ = null, this.bufferedMaxExtent_ = null, this.instructions = [], this.coordinates = [], this.coordinateCache_ = {}, this.renderedTransform_ = tt.create(), this.hitDetectionInstructions = [], this.pixelCoordinates_ = null, this.state = {}, this.viewRotation_ = 0, this.tmpLocalTransform_ = tt.create(), this.resetTransform_ = tt.create(); }; i.inherits(Xe, he), Xe.prototype.replayTextBackground_ = function (t, e, i, n, r, o, s) { t.beginPath(), t.moveTo.apply(t, e), t.lineTo.apply(t, i), t.lineTo.apply(t, n), t.lineTo.apply(t, r), t.lineTo.apply(t, e), o && (this.fillOrigin_ = o[2], this.fill_(t)), s && (this.setStrokeStyle_(t, s), t.stroke()); }, Xe.prototype.replayImage_ = function (t, e, i, n, r, o, s, a, h, l, u, c, d, p, f, g, _, v) { var y = _ || v, m = this.tmpLocalTransform_; e -= r *= d, i -= o *= d, p && (e = Math.round(e), i = Math.round(i)); var x, E, T, C, S = f + l > n.width ? n.width - l : f, R = a + u > n.height ? n.height - u : a, I = this.tmpExtent_, L = g[3] + S * d + g[1], w = g[0] + R * d + g[2], A = e - g[3], P = i - g[0]; (y || 0 !== c) && (x = [A, P], E = [A + L, P], T = [A + L, P + w], C = [A, P + w]); var F = null; if (0 !== c) {
    var M = e + r, b = i + o;
    F = tt.compose(m, M, b, 1, 1, c, -M, -b), B.createOrUpdateEmpty(I), B.extendCoordinate(I, tt.apply(m, x)), B.extendCoordinate(I, tt.apply(m, E)), B.extendCoordinate(I, tt.apply(m, T)), B.extendCoordinate(I, tt.apply(m, C));
}
else
    B.createOrUpdate(A, P, A + L, P + w, I); var D = t.canvas, O = I[0] <= D.width && I[2] >= 0 && I[1] <= D.height && I[3] >= 0; if (s) {
    if (!O && 1 == s[4])
        return;
    B.extend(s, I);
    var k = O ? [t, F ? F.slice(0) : null, h, n, l, u, S, R, e, i, d] : null;
    k && y && k.push(_, v, x, E, T, C), s.push(k);
}
else
    O && (y && this.replayTextBackground_(t, x, E, T, C, _, v), oe.drawImage(t, F, h, n, l, u, S, R, e, i, d)); }, Xe.prototype.applyPixelRatio = function (t) { var e = this.pixelRatio; return 1 == e ? t : t.map(function (t) { return t * e; }); }, Xe.prototype.appendFlatCoordinates = function (t, e, i, n, r, o) { var s = this.coordinates.length, a = this.getBufferedMaxExtent(); o && (e += n); var h, l, u, c = [t[e], t[e + 1]], d = [NaN, NaN], p = !0; for (h = e + n; h < i; h += n)
    d[0] = t[h], d[1] = t[h + 1], (u = B.coordinateRelationship(a, d)) !== l ? (p && (this.coordinates[s++] = c[0], this.coordinates[s++] = c[1]), this.coordinates[s++] = d[0], this.coordinates[s++] = d[1], p = !1) : 1 === u ? (this.coordinates[s++] = d[0], this.coordinates[s++] = d[1], p = !1) : p = !0, c[0] = d[0], c[1] = d[1], l = u; return (r && p || h === e + n) && (this.coordinates[s++] = c[0], this.coordinates[s++] = c[1]), s; }, Xe.prototype.drawCustomCoordinates_ = function (t, e, i, n, r) { for (var o = 0, s = i.length; o < s; ++o) {
    var a = i[o], h = this.appendFlatCoordinates(t, e, a, n, !1, !1);
    r.push(h), e = a;
} return e; }, Xe.prototype.drawCustom = function (t, e, i) { this.beginGeometry(t, e); var n, r, o, s, a, h = t.getType(), l = t.getStride(), u = this.coordinates.length; if ("MultiPolygon" == h) {
    n = (t = t).getOrientedFlatCoordinates(), s = [];
    var c = t.getEndss();
    a = 0;
    for (var d = 0, p = c.length; d < p; ++d) {
        var f = [];
        a = this.drawCustomCoordinates_(n, a, c[d], l, f), s.push(f);
    }
    this.instructions.push([4, u, s, t, i, st.coordinatesss]);
}
else
    "Polygon" == h || "MultiLineString" == h ? (o = [], n = "Polygon" == h ? t.getOrientedFlatCoordinates() : t.getFlatCoordinates(), a = this.drawCustomCoordinates_(n, 0, t.getEnds(), l, o), this.instructions.push([4, u, o, t, i, st.coordinatess])) : "LineString" == h || "MultiPoint" == h ? (n = t.getFlatCoordinates(), r = this.appendFlatCoordinates(n, 0, n.length, l, !1, !1), this.instructions.push([4, u, r, t, i, st.coordinates])) : "Point" == h && (n = t.getFlatCoordinates(), this.coordinates.push(n[0], n[1]), r = this.coordinates.length, this.instructions.push([4, u, r, t, i])); this.endGeometry(t, e); }, Xe.prototype.beginGeometry = function (t, e) { this.beginGeometryInstruction1_ = [0, e, 0], this.instructions.push(this.beginGeometryInstruction1_), this.beginGeometryInstruction2_ = [0, e, 0], this.hitDetectionInstructions.push(this.beginGeometryInstruction2_); }, Xe.prototype.fill_ = function (t) { if (this.fillOrigin_) {
    var e = tt.apply(this.renderedTransform_, this.fillOrigin_.slice());
    t.translate(e[0], e[1]), t.rotate(this.viewRotation_);
} t.fill(), this.fillOrigin_ && t.setTransform.apply(t, oe.resetTransform_); }, Xe.prototype.setStrokeStyle_ = function (t, e) { t.strokeStyle = e[1], t.lineWidth = e[2], t.lineCap = e[3], t.lineJoin = e[4], t.miterLimit = e[5], g.CANVAS_LINE_DASH && (t.lineDashOffset = e[7], t.setLineDash(e[6])); }, Xe.prototype.renderDeclutter_ = function (t, e) { if (t && t.length > 5) {
    var i = t[4];
    if (1 == i || i == t.length - 5) {
        var n = { minX: t[0], minY: t[1], maxX: t[2], maxY: t[3], value: e };
        if (!this.declutterTree.collides(n)) {
            this.declutterTree.insert(n);
            for (var r = oe.drawImage, o = 5, s = t.length; o < s; ++o) {
                var a = t[o];
                a && (a.length > 11 && this.replayTextBackground_(a[0], a[13], a[14], a[15], a[16], a[11], a[12]), r.apply(void 0, a));
            }
        }
        t.length = 5, B.createOrUpdateEmpty(t);
    }
} }, Xe.prototype.replay_ = function (t, e, n, o, s, a) { var h; this.pixelCoordinates_ && S.equals(e, this.renderedTransform_) ? h = this.pixelCoordinates_ : (this.pixelCoordinates_ || (this.pixelCoordinates_ = []), h = W(this.coordinates, 0, this.coordinates.length, 2, e, this.pixelCoordinates_), tt.setFromArray(this.renderedTransform_, e)); for (var l, u, c, d, p, f, g, _, v, y = !r.isEmpty(n), m = 0, x = o.length, E = 0, T = 0, C = 0, R = null, I = null, L = this.coordinateCache_, w = this.viewRotation_, A = { context: t, pixelRatio: this.pixelRatio, resolution: this.resolution, rotation: w }, P = this.instructions != o || this.overlaps ? 0 : 200; m < x;) {
    var F, M, b, D = o[m];
    switch (D[0]) {
        case 0:
            F = D[1], y && n[i.getUid(F).toString()] || !F.getGeometry() ? m = D[2] : void 0 === a || B.intersects(a, F.getGeometry().getExtent()) ? ++m : m = D[2] + 1;
            break;
        case 1:
            T > P && (this.fill_(t), T = 0), C > P && (t.stroke(), C = 0), T || C || (t.beginPath(), d = p = NaN), ++m;
            break;
        case 2:
            var O = h[E = D[1]], k = h[E + 1], G = h[E + 2] - O, U = h[E + 3] - k, N = Math.sqrt(G * G + U * U);
            t.moveTo(O + N, k), t.arc(O, k, N, 0, 2 * Math.PI, !0), ++m;
            break;
        case 3:
            t.closePath(), ++m;
            break;
        case 4:
            E = D[1], l = D[2];
            var X = D[3], V = D[4], j = 6 == D.length ? D[5] : void 0;
            A.geometry = X, A.feature = F, m in L || (L[m] = []);
            var z = L[m];
            j ? j(h, E, l, 2, z) : (z[0] = h[E], z[1] = h[E + 1], z.length = 2), V(z, A), ++m;
            break;
        case 6:
            E = D[1], l = D[2], v = D[3], u = D[4], c = D[5], _ = s ? null : D[6];
            var Y, K, H, Z = D[7], q = D[8], J = D[9], Q = D[10], $ = D[11], et = D[12], it = D[13], nt = D[14], rt = D[15];
            for (D.length > 16 ? (Y = D[16], K = D[17], H = D[18]) : (Y = oe.defaultPadding, K = H = !1), $ && (et += w); E < l; E += 2)
                this.replayImage_(t, h[E], h[E + 1], v, u, c, _, Z, q, J, Q, et, it, nt, rt, Y, K ? R : null, H ? I : null);
            this.renderDeclutter_(_, F), ++m;
            break;
        case 5:
            var ot = D[1], st = D[2], at = D[3];
            _ = s ? null : D[4];
            var ht = D[5], lt = D[6], ut = D[7], ct = D[8], dt = D[9], pt = D[10], ft = D[11], gt = D[12], _t = D[13], vt = D[14], yt = Be.lineString(h, ot, st, 2), mt = ct(gt);
            if (ht || mt <= yt) {
                var xt = this.textStates[_t].textAlign, Et = (yt - mt) * We.TEXT_ALIGN[xt], Tt = Ne(h, ot, st, 2, gt, ct, Et, ut);
                if (Tt) {
                    var Ct, St, Rt, It, Lt;
                    if (pt)
                        for (Ct = 0, St = Tt.length; Ct < St; ++Ct)
                            Rt = (Lt = Tt[Ct])[4], It = this.getImage(Rt, _t, "", pt), u = Lt[2] + ft, c = at * It.height + 2 * (.5 - at) * ft - dt, this.replayImage_(t, Lt[0], Lt[1], It, u, c, _, It.height, 1, 0, 0, Lt[3], vt, !1, It.width, oe.defaultPadding, null, null);
                    if (lt)
                        for (Ct = 0, St = Tt.length; Ct < St; ++Ct)
                            Rt = (Lt = Tt[Ct])[4], It = this.getImage(Rt, _t, lt, ""), u = Lt[2], c = at * It.height - dt, this.replayImage_(t, Lt[0], Lt[1], It, u, c, _, It.height, 1, 0, 0, Lt[3], vt, !1, It.width, oe.defaultPadding, null, null);
                }
            }
            this.renderDeclutter_(_, F), ++m;
            break;
        case 7:
            if (void 0 !== s) {
                var wt = s(F = D[1]);
                if (wt)
                    return wt;
            }
            ++m;
            break;
        case 8:
            P ? T++ : this.fill_(t), ++m;
            break;
        case 9:
            for (E = D[1], l = D[2], M = h[E], g = (b = h[E + 1]) + .5 | 0, (f = M + .5 | 0) === d && g === p || (t.moveTo(M, b), d = f, p = g), E += 2; E < l; E += 2)
                f = (M = h[E]) + .5 | 0, g = (b = h[E + 1]) + .5 | 0, E != l - 2 && f === d && g === p || (t.lineTo(M, b), d = f, p = g);
            ++m;
            break;
        case 10:
            R = D, this.fillOrigin_ = D[2], T && (this.fill_(t), T = 0, C && (t.stroke(), C = 0)), t.fillStyle = D[1], ++m;
            break;
        case 11:
            I = D, C && (t.stroke(), C = 0), this.setStrokeStyle_(t, D), ++m;
            break;
        case 12:
            P ? C++ : t.stroke(), ++m;
            break;
        default: ++m;
    }
} T && this.fill_(t), C && t.stroke(); }, Xe.prototype.replay = function (t, e, i, n) { this.viewRotation_ = i, this.replay_(t, e, n, this.instructions, void 0, void 0); }, Xe.prototype.replayHitDetection = function (t, e, i, n, r, o) { return this.viewRotation_ = i, this.replay_(t, e, n, this.hitDetectionInstructions, r, o); }, Xe.prototype.reverseHitDetectionInstructions = function () { var t, e = this.hitDetectionInstructions; e.reverse(); var i, n, r = e.length, o = -1; for (t = 0; t < r; ++t)
    7 == (n = (i = e[t])[0]) ? o = t : 0 == n && (i[2] = t, S.reverseSubArray(this.hitDetectionInstructions, o, t), o = -1); }, Xe.prototype.setFillStrokeStyle = function (t, e) { var i = this.state; if (t) {
    var n = t.getColor();
    i.fillStyle = ae.asColorLike(n || oe.defaultFillStyle);
}
else
    i.fillStyle = void 0; if (e) {
    var r = e.getColor();
    i.strokeStyle = ae.asColorLike(r || oe.defaultStrokeStyle);
    var o = e.getLineCap();
    i.lineCap = void 0 !== o ? o : oe.defaultLineCap;
    var s = e.getLineDash();
    i.lineDash = s ? s.slice() : oe.defaultLineDash;
    var a = e.getLineDashOffset();
    i.lineDashOffset = a || oe.defaultLineDashOffset;
    var h = e.getLineJoin();
    i.lineJoin = void 0 !== h ? h : oe.defaultLineJoin;
    var l = e.getWidth();
    i.lineWidth = void 0 !== l ? l : oe.defaultLineWidth;
    var u = e.getMiterLimit();
    i.miterLimit = void 0 !== u ? u : oe.defaultMiterLimit, i.lineWidth > this.maxLineWidth && (this.maxLineWidth = i.lineWidth, this.bufferedMaxExtent_ = null);
}
else
    i.strokeStyle = void 0, i.lineCap = void 0, i.lineDash = null, i.lineDashOffset = void 0, i.lineJoin = void 0, i.lineWidth = void 0, i.miterLimit = void 0; }, Xe.prototype.applyFill = function (t, e) { var i = t.fillStyle, n = [10, i]; if ("string" != typeof i) {
    var r = e.getExtent();
    n.push([r[0], r[3]]);
} this.instructions.push(n); }, Xe.prototype.applyStroke = function (t) { this.instructions.push([11, t.strokeStyle, t.lineWidth * this.pixelRatio, t.lineCap, t.lineJoin, t.miterLimit, this.applyPixelRatio(t.lineDash), t.lineDashOffset * this.pixelRatio]); }, Xe.prototype.updateFillStyle = function (t, e, i) { var n = t.fillStyle; "string" == typeof n && t.currentFillStyle == n || (e.call(this, t, i), t.currentFillStyle = n); }, Xe.prototype.updateStrokeStyle = function (t, e) { var i = t.strokeStyle, n = t.lineCap, r = t.lineDash, o = t.lineDashOffset, s = t.lineJoin, a = t.lineWidth, h = t.miterLimit; (t.currentStrokeStyle != i || t.currentLineCap != n || r != t.currentLineDash && !S.equals(t.currentLineDash, r) || t.currentLineDashOffset != o || t.currentLineJoin != s || t.currentLineWidth != a || t.currentMiterLimit != h) && (e.call(this, t), t.currentStrokeStyle = i, t.currentLineCap = n, t.currentLineDash = r, t.currentLineDashOffset = o, t.currentLineJoin = s, t.currentLineWidth = a, t.currentMiterLimit = h); }, Xe.prototype.endGeometry = function (t, e) { this.beginGeometryInstruction1_[2] = this.instructions.length, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length, this.beginGeometryInstruction2_ = null; var i = [7, e]; this.instructions.push(i), this.hitDetectionInstructions.push(i); }, Xe.prototype.finish = i.nullFunction, Xe.prototype.getBufferedMaxExtent = function () { if (!this.bufferedMaxExtent_ && (this.bufferedMaxExtent_ = B.clone(this.maxExtent), this.maxLineWidth > 0)) {
    var t = this.resolution * (this.maxLineWidth + 1) / 2;
    B.buffer(this.bufferedMaxExtent_, t, this.bufferedMaxExtent_);
} return this.bufferedMaxExtent_; }; var Ve = function (t, e, i, n, r, o) { Xe.call(this, t, e, i, n, r, o), this.declutterGroup_ = null, this.hitDetectionImage_ = null, this.image_ = null, this.anchorX_ = void 0, this.anchorY_ = void 0, this.height_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.scale_ = void 0, this.snapToPixel_ = void 0, this.width_ = void 0; }; i.inherits(Ve, Xe), Ve.prototype.drawCoordinates_ = function (t, e, i, n) { return this.appendFlatCoordinates(t, e, i, n, !1, !1); }, Ve.prototype.drawPoint = function (t, e) { if (this.image_) {
    this.beginGeometry(t, e);
    var i = t.getFlatCoordinates(), n = t.getStride(), r = this.coordinates.length, o = this.drawCoordinates_(i, 0, i.length, n);
    this.instructions.push([6, r, o, this.image_, this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_ * this.pixelRatio, this.snapToPixel_, this.width_]), this.hitDetectionInstructions.push([6, r, o, this.hitDetectionImage_, this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_, this.snapToPixel_, this.width_]), this.endGeometry(t, e);
} }, Ve.prototype.drawMultiPoint = function (t, e) { if (this.image_) {
    this.beginGeometry(t, e);
    var i = t.getFlatCoordinates(), n = t.getStride(), r = this.coordinates.length, o = this.drawCoordinates_(i, 0, i.length, n);
    this.instructions.push([6, r, o, this.image_, this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_ * this.pixelRatio, this.snapToPixel_, this.width_]), this.hitDetectionInstructions.push([6, r, o, this.hitDetectionImage_, this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_, this.snapToPixel_, this.width_]), this.endGeometry(t, e);
} }, Ve.prototype.finish = function () { this.reverseHitDetectionInstructions(), this.anchorX_ = void 0, this.anchorY_ = void 0, this.hitDetectionImage_ = null, this.image_ = null, this.height_ = void 0, this.scale_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.snapToPixel_ = void 0, this.width_ = void 0; }, Ve.prototype.setImageStyle = function (t, e) { var i = t.getAnchor(), n = t.getSize(), r = t.getHitDetectionImage(1), o = t.getImage(1), s = t.getOrigin(); this.anchorX_ = i[0], this.anchorY_ = i[1], this.declutterGroup_ = e, this.hitDetectionImage_ = r, this.image_ = o, this.height_ = n[1], this.opacity_ = t.getOpacity(), this.originX_ = s[0], this.originY_ = s[1], this.rotateWithView_ = t.getRotateWithView(), this.rotation_ = t.getRotation(), this.scale_ = t.getScale(), this.snapToPixel_ = t.getSnapToPixel(), this.width_ = n[0]; }; var je = function (t, e, i, n, r, o) { Xe.call(this, t, e, i, n, r, o); }; i.inherits(je, Xe), je.prototype.drawFlatCoordinates_ = function (t, e, i, n) { var r = [9, this.coordinates.length, this.appendFlatCoordinates(t, e, i, n, !1, !1)]; return this.instructions.push(r), this.hitDetectionInstructions.push(r), i; }, je.prototype.drawLineString = function (t, e) { var i = this.state, n = i.strokeStyle, r = i.lineWidth; if (void 0 !== n && void 0 !== r) {
    this.updateStrokeStyle(i, this.applyStroke), this.beginGeometry(t, e), this.hitDetectionInstructions.push([11, i.strokeStyle, i.lineWidth, i.lineCap, i.lineJoin, i.miterLimit, i.lineDash, i.lineDashOffset], [1]);
    var o = t.getFlatCoordinates(), s = t.getStride();
    this.drawFlatCoordinates_(o, 0, o.length, s), this.hitDetectionInstructions.push([12]), this.endGeometry(t, e);
} }, je.prototype.drawMultiLineString = function (t, e) { var i = this.state, n = i.strokeStyle, r = i.lineWidth; if (void 0 !== n && void 0 !== r) {
    this.updateStrokeStyle(i, this.applyStroke), this.beginGeometry(t, e), this.hitDetectionInstructions.push([11, i.strokeStyle, i.lineWidth, i.lineCap, i.lineJoin, i.miterLimit, i.lineDash, i.lineDashOffset], [1]);
    var o, s, a = t.getEnds(), h = t.getFlatCoordinates(), l = t.getStride(), u = 0;
    for (o = 0, s = a.length; o < s; ++o)
        u = this.drawFlatCoordinates_(h, u, a[o], l);
    this.hitDetectionInstructions.push([12]), this.endGeometry(t, e);
} }, je.prototype.finish = function () { var t = this.state; void 0 != t.lastStroke && t.lastStroke != this.coordinates.length && this.instructions.push([12]), this.reverseHitDetectionInstructions(), this.state = null; }, je.prototype.applyStroke = function (t) { void 0 != t.lastStroke && t.lastStroke != this.coordinates.length && (this.instructions.push([12]), t.lastStroke = this.coordinates.length), t.lastStroke = 0, Xe.prototype.applyStroke.call(this, t), this.instructions.push([1]); }; var ze = function (t, e, i, n, r, o) { Xe.call(this, t, e, i, n, r, o); }; i.inherits(ze, Xe), ze.prototype.drawFlatCoordinatess_ = function (t, e, i, n) { var r = this.state, o = void 0 !== r.fillStyle, s = void 0 != r.strokeStyle, a = i.length, h = [1]; this.instructions.push(h), this.hitDetectionInstructions.push(h); for (var l = 0; l < a; ++l) {
    var u = i[l], c = [9, this.coordinates.length, this.appendFlatCoordinates(t, e, u, n, !0, !s)];
    if (this.instructions.push(c), this.hitDetectionInstructions.push(c), s) {
        var d = [3];
        this.instructions.push(d), this.hitDetectionInstructions.push(d);
    }
    e = u;
} var p = [8]; if (this.hitDetectionInstructions.push(p), o && this.instructions.push(p), s) {
    var f = [12];
    this.instructions.push(f), this.hitDetectionInstructions.push(f);
} return e; }, ze.prototype.drawCircle = function (t, e) { var i = this.state, n = i.fillStyle, r = i.strokeStyle; if (void 0 !== n || void 0 !== r) {
    this.setFillStrokeStyles_(t), this.beginGeometry(t, e), this.hitDetectionInstructions.push([10, se.asString(oe.defaultFillStyle)]), void 0 !== i.strokeStyle && this.hitDetectionInstructions.push([11, i.strokeStyle, i.lineWidth, i.lineCap, i.lineJoin, i.miterLimit, i.lineDash, i.lineDashOffset]);
    var o = t.getFlatCoordinates(), s = t.getStride(), a = this.coordinates.length;
    this.appendFlatCoordinates(o, 0, o.length, s, !1, !1);
    var h = [1], l = [2, a];
    this.instructions.push(h, l), this.hitDetectionInstructions.push(h, l);
    var u = [8];
    if (this.hitDetectionInstructions.push(u), void 0 !== i.fillStyle && this.instructions.push(u), void 0 !== i.strokeStyle) {
        var c = [12];
        this.instructions.push(c), this.hitDetectionInstructions.push(c);
    }
    this.endGeometry(t, e);
} }, ze.prototype.drawPolygon = function (t, e) { var i = this.state; this.setFillStrokeStyles_(t), this.beginGeometry(t, e), this.hitDetectionInstructions.push([10, se.asString(oe.defaultFillStyle)]), void 0 !== i.strokeStyle && this.hitDetectionInstructions.push([11, i.strokeStyle, i.lineWidth, i.lineCap, i.lineJoin, i.miterLimit, i.lineDash, i.lineDashOffset]); var n = t.getEnds(), r = t.getOrientedFlatCoordinates(), o = t.getStride(); this.drawFlatCoordinatess_(r, 0, n, o), this.endGeometry(t, e); }, ze.prototype.drawMultiPolygon = function (t, e) { var i = this.state, n = i.fillStyle, r = i.strokeStyle; if (void 0 !== n || void 0 !== r) {
    this.setFillStrokeStyles_(t), this.beginGeometry(t, e), this.hitDetectionInstructions.push([10, se.asString(oe.defaultFillStyle)]), void 0 !== i.strokeStyle && this.hitDetectionInstructions.push([11, i.strokeStyle, i.lineWidth, i.lineCap, i.lineJoin, i.miterLimit, i.lineDash, i.lineDashOffset]);
    var o, s, a = t.getEndss(), h = t.getOrientedFlatCoordinates(), l = t.getStride(), u = 0;
    for (o = 0, s = a.length; o < s; ++o)
        u = this.drawFlatCoordinatess_(h, u, a[o], l);
    this.endGeometry(t, e);
} }, ze.prototype.finish = function () { this.reverseHitDetectionInstructions(), this.state = null; var t = this.tolerance; if (0 !== t) {
    var e, i, n = this.coordinates;
    for (e = 0, i = n.length; e < i; ++e)
        n[e] = at.snap(n[e], t);
} }, ze.prototype.setFillStrokeStyles_ = function (t) { var e = this.state; void 0 !== e.fillStyle && this.updateFillStyle(e, this.applyFill, t), void 0 !== e.strokeStyle && this.updateStrokeStyle(e, this.applyStroke); }; var Ye = function (t, e, i, n, r) { var o, s, a, h, l, u, c, d, p, f = i, g = i, _ = 0, v = 0, y = i; for (o = i; o < n; o += r) {
    var m = e[o], x = e[o + 1];
    void 0 !== h && (d = m - h, p = x - l, a = Math.sqrt(d * d + p * p), void 0 !== u && (v += s, Math.acos((u * d + c * p) / (s * a)) > t && (v > _ && (_ = v, f = y, g = o), v = 0, y = o - r)), s = a, u = d, c = p), h = m, l = x;
} return (v += a) > _ ? [y, o] : [f, g]; }, Ke = function (t, e, i, n, r, o) { Xe.call(this, t, e, i, n, r, o), this.declutterGroup_, this.labels_ = null, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = void 0, this.textRotation_ = 0, this.textFillState_ = null, this.fillStates = {}, this.textStrokeState_ = null, this.strokeStates = {}, this.textState_ = {}, this.textStates = {}, this.textKey_ = "", this.fillKey_ = "", this.strokeKey_ = "", this.widths_ = {}, oe.labelCache.prune(); }; i.inherits(Ke, Xe), Ke.measureTextWidths = function (t, e, i) { var n, r, o = e.length, s = 0; for (r = 0; r < o; ++r)
    n = oe.measureTextWidth(t, e[r]), s = Math.max(s, n), i.push(n); return s; }, Ke.prototype.drawText = function (t, e) { var i = this.textFillState_, n = this.textStrokeState_, r = this.textState_; if ("" !== this.text_ && r && (i || n)) {
    var o, s, a = this.coordinates.length, h = t.getType(), l = null, u = 2, c = 2;
    if ("line" === r.placement) {
        if (!B.intersects(this.getBufferedMaxExtent(), t.getExtent()))
            return;
        var d;
        if (l = t.getFlatCoordinates(), c = t.getStride(), "LineString" == h)
            d = [l.length];
        else if ("MultiLineString" == h)
            d = t.getEnds();
        else if ("Polygon" == h)
            d = t.getEnds().slice(0, 1);
        else if ("MultiPolygon" == h) {
            var p = t.getEndss();
            for (d = [], o = 0, s = p.length; o < s; ++o)
                d.push(p[o][0]);
        }
        this.beginGeometry(t, e);
        for (var f, g = r.textAlign, _ = 0, v = 0, y = d.length; v < y; ++v) {
            if (void 0 == g) {
                var m = Ye(r.maxAngle, l, _, d[v], c);
                _ = m[0], f = m[1];
            }
            else
                f = d[v];
            for (o = _; o < f; o += c)
                this.coordinates.push(l[o], l[o + 1]);
            u = this.coordinates.length, _ = d[v], this.drawChars_(a, u, this.declutterGroup_), a = u;
        }
        this.endGeometry(t, e);
    }
    else {
        var x = this.getImage(this.text_, this.textKey_, this.fillKey_, this.strokeKey_), E = x.width / this.pixelRatio;
        switch (h) {
            case "Point":
            case "MultiPoint":
                u = (l = t.getFlatCoordinates()).length;
                break;
            case "LineString":
                l = t.getFlatMidpoint();
                break;
            case "Circle":
                l = t.getCenter();
                break;
            case "MultiLineString":
                u = (l = t.getFlatMidpoints()).length;
                break;
            case "Polygon":
                if (l = t.getFlatInteriorPoint(), !r.overflow && l[2] / this.resolution < E)
                    return;
                c = 3;
                break;
            case "MultiPolygon":
                var T = t.getFlatInteriorPoints();
                for (l = [], o = 0, s = T.length; o < s; o += 3)
                    (r.overflow || T[o + 2] / this.resolution >= E) && l.push(T[o], T[o + 1]);
                if (0 == (u = l.length))
                    return;
        }
        u = this.appendFlatCoordinates(l, 0, u, c, !1, !1), this.beginGeometry(t, e), (r.backgroundFill || r.backgroundStroke) && (this.setFillStrokeStyle(r.backgroundFill, r.backgroundStroke), this.updateFillStyle(this.state, this.applyFill, t), this.updateStrokeStyle(this.state, this.applyStroke)), this.drawTextImage_(x, a, u), this.endGeometry(t, e);
    }
} }, Ke.prototype.getImage = function (t, e, i, n) { var r, o = n + e + t + i + this.pixelRatio, s = oe.labelCache; if (!s.containsKey(o)) {
    var a = n ? this.strokeStates[n] || this.textStrokeState_ : null, h = i ? this.fillStates[i] || this.textFillState_ : null, l = this.textStates[e] || this.textState_, u = this.pixelRatio, c = l.scale * u, d = We.TEXT_ALIGN[l.textAlign || oe.defaultTextAlign], p = n && a.lineWidth ? a.lineWidth : 0, f = t.split("\n"), _ = f.length, v = [], y = Ke.measureTextWidths(l.font, f, v), m = oe.measureTextHeight(l.font), x = m * _, E = y + p, T = yt(Math.ceil(E * c), Math.ceil((x + p) * c));
    r = T.canvas, s.set(o, r), 1 != c && T.scale(c, c), T.font = l.font, n && (T.strokeStyle = a.strokeStyle, T.lineWidth = p * (g.SAFARI ? c : 1), T.lineCap = a.lineCap, T.lineJoin = a.lineJoin, T.miterLimit = a.miterLimit, g.CANVAS_LINE_DASH && a.lineDash.length && (T.setLineDash(a.lineDash), T.lineDashOffset = a.lineDashOffset)), i && (T.fillStyle = h.fillStyle), T.textBaseline = "middle", T.textAlign = "center";
    var C, S = .5 - d, R = d * r.width / c + S * p;
    if (n)
        for (C = 0; C < _; ++C)
            T.strokeText(f[C], R + S * v[C], .5 * (p + m) + C * m);
    if (i)
        for (C = 0; C < _; ++C)
            T.fillText(f[C], R + S * v[C], .5 * (p + m) + C * m);
} return s.get(o); }, Ke.prototype.drawTextImage_ = function (t, e, i) { var n = this.textState_, r = this.textStrokeState_, o = this.pixelRatio, s = We.TEXT_ALIGN[n.textAlign || oe.defaultTextAlign], a = We.TEXT_ALIGN[n.textBaseline], h = r && r.lineWidth ? r.lineWidth : 0, l = s * t.width / o + 2 * (.5 - s) * h, u = a * t.height / o + 2 * (.5 - a) * h; this.instructions.push([6, e, i, t, (l - this.textOffsetX_) * o, (u - this.textOffsetY_) * o, this.declutterGroup_, t.height, 1, 0, 0, this.textRotateWithView_, this.textRotation_, 1, !0, t.width, n.padding == oe.defaultPadding ? oe.defaultPadding : n.padding.map(function (t) { return t * o; }), !!n.backgroundFill, !!n.backgroundStroke]), this.hitDetectionInstructions.push([6, e, i, t, (l - this.textOffsetX_) * o, (u - this.textOffsetY_) * o, this.declutterGroup_, t.height, 1, 0, 0, this.textRotateWithView_, this.textRotation_, 1 / o, !0, t.width, n.padding, !!n.backgroundFill, !!n.backgroundStroke]); }, Ke.prototype.drawChars_ = function (t, e, i) { var n = this.textStrokeState_, r = this.textState_, o = this.textFillState_, s = this.strokeKey_; n && (s in this.strokeStates || (this.strokeStates[s] = { strokeStyle: n.strokeStyle, lineCap: n.lineCap, lineDashOffset: n.lineDashOffset, lineWidth: n.lineWidth, lineJoin: n.lineJoin, miterLimit: n.miterLimit, lineDash: n.lineDash })); var a = this.textKey_; this.textKey_ in this.textStates || (this.textStates[this.textKey_] = { font: r.font, textAlign: r.textAlign || oe.defaultTextAlign, scale: r.scale }); var h = this.fillKey_; o && (h in this.fillStates || (this.fillStates[h] = { fillStyle: o.fillStyle })); var l = this.pixelRatio, u = We.TEXT_ALIGN[r.textBaseline], c = this.textOffsetY_ * l, d = this.text_, p = r.font, f = r.scale, g = n ? n.lineWidth * f / 2 : 0, _ = this.widths_[p]; _ || (this.widths_[p] = _ = {}), this.instructions.push([5, t, e, u, i, r.overflow, h, r.maxAngle, function (t) { var e = _[t]; return e || (e = _[t] = oe.measureTextWidth(p, t)), e * f * l; }, c, s, g * l, d, a, 1]), this.hitDetectionInstructions.push([5, t, e, u, i, r.overflow, h, r.maxAngle, function (t) { var e = _[t]; return e || (e = _[t] = oe.measureTextWidth(p, t)), e * f; }, c, s, g, d, a, 1 / l]); }, Ke.prototype.setTextStyle = function (t, e) { var n, r, o; if (t) {
    this.declutterGroup_ = e;
    var s = t.getFill();
    s ? ((r = this.textFillState_) || (r = this.textFillState_ = {}), r.fillStyle = ae.asColorLike(s.getColor() || oe.defaultFillStyle)) : r = this.textFillState_ = null;
    var a = t.getStroke();
    if (a) {
        (o = this.textStrokeState_) || (o = this.textStrokeState_ = {});
        var h = a.getLineDash(), l = a.getLineDashOffset(), u = a.getWidth(), c = a.getMiterLimit();
        o.lineCap = a.getLineCap() || oe.defaultLineCap, o.lineDash = h ? h.slice() : oe.defaultLineDash, o.lineDashOffset = void 0 === l ? oe.defaultLineDashOffset : l, o.lineJoin = a.getLineJoin() || oe.defaultLineJoin, o.lineWidth = void 0 === u ? oe.defaultLineWidth : u, o.miterLimit = void 0 === c ? oe.defaultMiterLimit : c, o.strokeStyle = ae.asColorLike(a.getColor() || oe.defaultStrokeStyle);
    }
    else
        o = this.textStrokeState_ = null;
    n = this.textState_;
    var d = t.getFont() || oe.defaultFont;
    oe.checkFont(d);
    var p = t.getScale();
    n.overflow = t.getOverflow(), n.font = d, n.maxAngle = t.getMaxAngle(), n.placement = t.getPlacement(), n.textAlign = t.getTextAlign(), n.textBaseline = t.getTextBaseline() || oe.defaultTextBaseline, n.backgroundFill = t.getBackgroundFill(), n.backgroundStroke = t.getBackgroundStroke(), n.padding = t.getPadding() || oe.defaultPadding, n.scale = void 0 === p ? 1 : p;
    var f = t.getOffsetX(), g = t.getOffsetY(), _ = t.getRotateWithView(), v = t.getRotation();
    this.text_ = t.getText() || "", this.textOffsetX_ = void 0 === f ? 0 : f, this.textOffsetY_ = void 0 === g ? 0 : g, this.textRotateWithView_ = void 0 !== _ && _, this.textRotation_ = void 0 === v ? 0 : v, this.strokeKey_ = o ? ("string" == typeof o.strokeStyle ? o.strokeStyle : i.getUid(o.strokeStyle)) + o.lineCap + o.lineDashOffset + "|" + o.lineWidth + o.lineJoin + o.miterLimit + "[" + o.lineDash.join() + "]" : "", this.textKey_ = n.font + n.scale + (n.textAlign || "?"), this.fillKey_ = r ? "string" == typeof r.fillStyle ? r.fillStyle : "|" + i.getUid(r.fillStyle) : "";
}
else
    this.text_ = ""; }; var He = function (t, e, i, n, r, o, s) { Ge.call(this), this.declutterTree_ = o, this.declutterGroup_ = null, this.tolerance_ = t, this.maxExtent_ = e, this.overlaps_ = r, this.pixelRatio_ = n, this.resolution_ = i, this.renderBuffer_ = s, this.replaysByZIndex_ = {}, this.hitDetectionContext_ = yt(1, 1), this.hitDetectionTransform_ = tt.create(); }; i.inherits(He, Ge), He.circleArrayCache_ = { 0: [[!0]] }, He.fillCircleArrayRowToMiddle_ = function (t, e, i) { var n, r = Math.floor(t.length / 2); if (e >= r)
    for (n = r; n < e; n++)
        t[n][i] = !0;
else if (e < r)
    for (n = e + 1; n < r; n++)
        t[n][i] = !0; }, He.getCircleArray_ = function (t) { if (void 0 !== He.circleArrayCache_[t])
    return He.circleArrayCache_[t]; for (var e = 2 * t + 1, i = new Array(e), n = 0; n < e; n++)
    i[n] = new Array(e); for (var r = t, o = 0, s = 0; r >= o;)
    He.fillCircleArrayRowToMiddle_(i, t + r, t + o), He.fillCircleArrayRowToMiddle_(i, t + o, t + r), He.fillCircleArrayRowToMiddle_(i, t - o, t + r), He.fillCircleArrayRowToMiddle_(i, t - r, t + o), He.fillCircleArrayRowToMiddle_(i, t - r, t - o), He.fillCircleArrayRowToMiddle_(i, t - o, t - r), He.fillCircleArrayRowToMiddle_(i, t + o, t - r), He.fillCircleArrayRowToMiddle_(i, t + r, t - o), 2 * ((s += 1 + 2 * ++o) - r) + 1 > 0 && (s += 1 - 2 * (r -= 1)); return He.circleArrayCache_[t] = i, i; }, He.replayDeclutter = function (t, e, i) { for (var n = Object.keys(t).map(Number).sort(S.numberSafeCompareFunction), r = {}, o = 0, s = n.length; o < s; ++o)
    for (var a = t[n[o].toString()], h = 0, l = a.length; h < l;) {
        var u = a[h++], c = a[h++];
        u.replay(e, c, i, r);
    } }, He.prototype.addDeclutter = function (t) { var e = null; return this.declutterTree_ && (t ? (e = this.declutterGroup_)[4]++ : (e = this.declutterGroup_ = B.createEmpty()).push(1)), e; }, He.prototype.clip = function (t, e) { var i = this.getClipCoords(e); t.beginPath(), t.moveTo(i[0], i[1]), t.lineTo(i[2], i[3]), t.lineTo(i[4], i[5]), t.lineTo(i[6], i[7]), t.clip(); }, He.prototype.hasReplays = function (t) { for (var e in this.replaysByZIndex_)
    for (var i = this.replaysByZIndex_[e], n = 0, r = t.length; n < r; ++n)
        if (t[n] in i)
            return !0; return !1; }, He.prototype.finish = function () { var t; for (t in this.replaysByZIndex_) {
    var e, i = this.replaysByZIndex_[t];
    for (e in i)
        i[e].finish();
} }, He.prototype.forEachFeatureAtCoordinate = function (t, e, i, n, r, o, s) { var a, h = 2 * (n = Math.round(n)) + 1, l = tt.compose(this.hitDetectionTransform_, n + .5, n + .5, 1 / e, -1 / e, -i, -t[0], -t[1]), u = this.hitDetectionContext_; u.canvas.width !== h || u.canvas.height !== h ? (u.canvas.width = h, u.canvas.height = h) : u.clearRect(0, 0, h, h), void 0 !== this.renderBuffer_ && (a = B.createEmpty(), B.extendCoordinate(a, t), B.buffer(a, e * (this.renderBuffer_ + n), a)); var c, d, p = He.getCircleArray_(n); function f(t) { for (var e = u.getImageData(0, 0, h, h).data, i = 0; i < h; i++)
    for (var n = 0; n < h; n++) {
        var r;
        if (p[i][n] && e[4 * (n * h + i) + 3] > 0)
            return (!c || d != Ue.IMAGE && d != Ue.TEXT || -1 !== c.indexOf(t)) && (r = o(t)), r || void u.clearRect(0, 0, h, h);
    } } this.declutterTree_ && (c = this.declutterTree_.all().map(function (t) { return t.value; })); var g, _, v, y, m, x = Object.keys(this.replaysByZIndex_).map(Number); for (x.sort(S.numberSafeCompareFunction), g = x.length - 1; g >= 0; --g) {
    var E = x[g].toString();
    for (v = this.replaysByZIndex_[E], _ = We.ORDER.length - 1; _ >= 0; --_)
        if (void 0 !== (y = v[d = We.ORDER[_]]))
            if (!s || d != Ue.IMAGE && d != Ue.TEXT) {
                if (m = y.replayHitDetection(u, l, i, r, f, a))
                    return m;
            }
            else {
                var T = s[E];
                T ? T.push(y, l.slice(0)) : s[E] = [y, l.slice(0)];
            }
} }, He.prototype.getClipCoords = function (t) { var e = this.maxExtent_, i = e[0], n = e[1], r = e[2], o = e[3], s = [i, n, i, o, r, o, r, n]; return W(s, 0, 8, 2, t, s), s; }, He.prototype.getReplay = function (t, e) { var i = void 0 !== t ? t.toString() : "0", n = this.replaysByZIndex_[i]; void 0 === n && (n = {}, this.replaysByZIndex_[i] = n); var r = n[e]; return void 0 === r && (r = new (0, He.BATCH_CONSTRUCTORS_[e])(this.tolerance_, this.maxExtent_, this.resolution_, this.pixelRatio_, this.overlaps_, this.declutterTree_), n[e] = r), r; }, He.prototype.getReplays = function () { return this.replaysByZIndex_; }, He.prototype.isEmpty = function () { return r.isEmpty(this.replaysByZIndex_); }, He.prototype.replay = function (t, e, i, n, r, o) { var s = Object.keys(this.replaysByZIndex_).map(Number); s.sort(S.numberSafeCompareFunction), t.save(), this.clip(t, e); var a, h, l, u, c, d, p = r || We.ORDER; for (a = 0, h = s.length; a < h; ++a) {
    var f = s[a].toString();
    for (c = this.replaysByZIndex_[f], l = 0, u = p.length; l < u; ++l) {
        var g = p[l];
        if (void 0 !== (d = c[g]))
            if (!o || g != Ue.IMAGE && g != Ue.TEXT)
                d.replay(t, e, i, n);
            else {
                var _ = o[f];
                _ ? _.push(d, e.slice(0)) : o[f] = [d, e.slice(0)];
            }
    }
} t.restore(); }, He.BATCH_CONSTRUCTORS_ = { Circle: ze, Default: Xe, Image: Ve, LineString: je, Polygon: ze, Text: Ke }; var Ze = { defaultOrder: function (t, e) { return i.getUid(t) - i.getUid(e); }, getSquaredTolerance: function (t, e) { var i = Ze.getTolerance(t, e); return i * i; }, getTolerance: function (t, e) { return i.SIMPLIFY_TOLERANCE * t / e; }, renderCircleGeometry_: function (t, e, i, n) { var r = i.getFill(), o = i.getStroke(); if (r || o) {
        var s = t.getReplay(i.getZIndex(), Ue.CIRCLE);
        s.setFillStrokeStyle(r, o), s.drawCircle(e, n);
    } var a = i.getText(); if (a) {
        var h = t.getReplay(i.getZIndex(), Ue.TEXT);
        h.setTextStyle(a, t.addDeclutter(!1)), h.drawText(e, n);
    } }, renderFeature: function (t, e, i, n, r, o) { var s, a, h = !1; return (s = i.getImage()) && (2 == (a = s.getImageState()) || 3 == a ? s.unlistenImageChange(r, o) : (0 == a && s.load(), a = s.getImageState(), s.listenImageChange(r, o), h = !0)), Ze.renderFeature_(t, e, i, n), h; }, renderFeature_: function (t, e, i, n) { var r = i.getGeometryFunction()(e); if (r) {
        var o = r.getSimplifiedGeometry(n);
        i.getRenderer() ? Ze.renderGeometry_(t, o, i, e) : (0, Ze.GEOMETRY_RENDERERS_[o.getType()])(t, o, i, e);
    } }, renderGeometry_: function (t, e, i, n) { if ("GeometryCollection" != e.getType())
        t.getReplay(i.getZIndex(), Ue.DEFAULT).drawCustom(e, n, i.getRenderer());
    else
        for (var r = e.getGeometries(), o = 0, s = r.length; o < s; ++o)
            Ze.renderGeometry_(t, r[o], i, n); }, renderGeometryCollectionGeometry_: function (t, e, i, n) { var r, o, s = e.getGeometriesArray(); for (r = 0, o = s.length; r < o; ++r)
        (0, Ze.GEOMETRY_RENDERERS_[s[r].getType()])(t, s[r], i, n); }, renderLineStringGeometry_: function (t, e, i, n) { var r = i.getStroke(); if (r) {
        var o = t.getReplay(i.getZIndex(), Ue.LINE_STRING);
        o.setFillStrokeStyle(null, r), o.drawLineString(e, n);
    } var s = i.getText(); if (s) {
        var a = t.getReplay(i.getZIndex(), Ue.TEXT);
        a.setTextStyle(s, t.addDeclutter(!1)), a.drawText(e, n);
    } }, renderMultiLineStringGeometry_: function (t, e, i, n) { var r = i.getStroke(); if (r) {
        var o = t.getReplay(i.getZIndex(), Ue.LINE_STRING);
        o.setFillStrokeStyle(null, r), o.drawMultiLineString(e, n);
    } var s = i.getText(); if (s) {
        var a = t.getReplay(i.getZIndex(), Ue.TEXT);
        a.setTextStyle(s, t.addDeclutter(!1)), a.drawText(e, n);
    } }, renderMultiPolygonGeometry_: function (t, e, i, n) { var r = i.getFill(), o = i.getStroke(); if (o || r) {
        var s = t.getReplay(i.getZIndex(), Ue.POLYGON);
        s.setFillStrokeStyle(r, o), s.drawMultiPolygon(e, n);
    } var a = i.getText(); if (a) {
        var h = t.getReplay(i.getZIndex(), Ue.TEXT);
        h.setTextStyle(a, t.addDeclutter(!1)), h.drawText(e, n);
    } }, renderPointGeometry_: function (t, e, i, n) { var r = i.getImage(); if (r) {
        if (2 != r.getImageState())
            return;
        var o = t.getReplay(i.getZIndex(), Ue.IMAGE);
        o.setImageStyle(r, t.addDeclutter(!1)), o.drawPoint(e, n);
    } var s = i.getText(); if (s) {
        var a = t.getReplay(i.getZIndex(), Ue.TEXT);
        a.setTextStyle(s, t.addDeclutter(!!r)), a.drawText(e, n);
    } }, renderMultiPointGeometry_: function (t, e, i, n) { var r = i.getImage(); if (r) {
        if (2 != r.getImageState())
            return;
        var o = t.getReplay(i.getZIndex(), Ue.IMAGE);
        o.setImageStyle(r, t.addDeclutter(!1)), o.drawMultiPoint(e, n);
    } var s = i.getText(); if (s) {
        var a = t.getReplay(i.getZIndex(), Ue.TEXT);
        a.setTextStyle(s, t.addDeclutter(!!r)), a.drawText(e, n);
    } }, renderPolygonGeometry_: function (t, e, i, n) { var r = i.getFill(), o = i.getStroke(); if (r || o) {
        var s = t.getReplay(i.getZIndex(), Ue.POLYGON);
        s.setFillStrokeStyle(r, o), s.drawPolygon(e, n);
    } var a = i.getText(); if (a) {
        var h = t.getReplay(i.getZIndex(), Ue.TEXT);
        h.setTextStyle(a, t.addDeclutter(!1)), h.drawText(e, n);
    } } }; Ze.GEOMETRY_RENDERERS_ = { Point: Ze.renderPointGeometry_, LineString: Ze.renderLineStringGeometry_, Polygon: Ze.renderPolygonGeometry_, MultiPoint: Ze.renderMultiPointGeometry_, MultiLineString: Ze.renderMultiLineStringGeometry_, MultiPolygon: Ze.renderMultiPolygonGeometry_, GeometryCollection: Ze.renderGeometryCollectionGeometry_, Circle: Ze.renderCircleGeometry_ }; var qe = function (t) { ce.call(this, t), this.declutterTree_ = t.getDeclutter() ? Ce(9) : null, this.dirty_ = !1, this.renderedRevision_ = -1, this.renderedResolution_ = NaN, this.renderedExtent_ = B.createEmpty(), this.renderedRenderOrder_ = null, this.replayGroup_ = null, this.replayGroupChanged = !0, this.context = yt(), o.listen(oe.labelCache, "clear", this.handleFontsChanged_, this); }; i.inherits(qe, ce), qe.handles = function (t, e) { return "canvas" === t && "VECTOR" === e.getType(); }, qe.create = function (t, e) { return new qe(e); }, qe.prototype.disposeInternal = function () { o.unlisten(oe.labelCache, "clear", this.handleFontsChanged_, this), ce.prototype.disposeInternal.call(this); }, qe.prototype.composeFrame = function (t, e, i) { var n = t.extent, r = t.pixelRatio, o = e.managed ? t.skippedFeatureUids : {}, s = t.viewState, a = s.projection, h = s.rotation, l = a.getExtent(), u = this.getLayer().getSource(), c = this.getTransform(t, 0); this.preCompose(i, t, c); var d = e.extent, p = void 0 !== d; p && this.clip(i, t, d); var f = this.replayGroup_; if (f && !f.isEmpty()) {
    this.declutterTree_ && this.declutterTree_.clear();
    var g, _ = this.getLayer(), v = 0, y = 0, m = 1 !== e.opacity, x = _.hasListener("render");
    if (m || x) {
        var E = i.canvas.width, T = i.canvas.height;
        if (h) {
            var C = Math.round(Math.sqrt(E * E + T * T));
            v = (C - E) / 2, y = (C - T) / 2, E = T = C;
        }
        this.context.canvas.width = E, this.context.canvas.height = T, g = this.context;
    }
    else
        g = i;
    var S = g.globalAlpha;
    m || (g.globalAlpha = e.opacity), g != i && g.translate(v, y);
    var R = t.size[0] * r, I = t.size[1] * r;
    if (oe.rotateAtOffset(g, -h, R / 2, I / 2), f.replay(g, c, h, o), u.getWrapX() && a.canWrapX() && !B.containsExtent(l, n)) {
        for (var L, w = n[0], A = B.getWidth(l), P = 0; w < l[0];)
            L = A * --P, c = this.getTransform(t, L), f.replay(g, c, h, o), w += A;
        for (P = 0, w = n[2]; w > l[2];)
            L = A * ++P, c = this.getTransform(t, L), f.replay(g, c, h, o), w -= A;
        c = this.getTransform(t, 0);
    }
    if (oe.rotateAtOffset(g, h, R / 2, I / 2), g != i) {
        if (x && this.dispatchRenderEvent(g, t, c), m) {
            var F = i.globalAlpha;
            i.globalAlpha = e.opacity, i.drawImage(g.canvas, -v, -y), i.globalAlpha = F;
        }
        else
            i.drawImage(g.canvas, -v, -y);
        g.translate(-v, -y);
    }
    m || (g.globalAlpha = S);
} p && i.restore(), this.postCompose(i, t, e, c); }, qe.prototype.forEachFeatureAtCoordinate = function (t, e, n, r, o) { if (this.replayGroup_) {
    var s = e.viewState.resolution, a = e.viewState.rotation, h = this.getLayer(), l = {};
    return this.replayGroup_.forEachFeatureAtCoordinate(t, s, a, n, {}, function (t) { var e = i.getUid(t).toString(); if (!(e in l))
        return l[e] = !0, r.call(o, t, h); }, null);
} }, qe.prototype.handleFontsChanged_ = function (t) { var e = this.getLayer(); e.getVisible() && this.replayGroup_ && e.changed(); }, qe.prototype.handleStyleImageChange_ = function (t) { this.renderIfReadyAndVisible(); }, qe.prototype.prepareFrame = function (t, e) { var i = this.getLayer(), n = i.getSource(); this.updateLogos(t, n); var r = t.viewHints[0], o = t.viewHints[1], s = i.getUpdateWhileAnimating(), a = i.getUpdateWhileInteracting(); if (!this.dirty_ && !s && r || !a && o)
    return !0; var h = t.extent, l = t.viewState, u = l.projection, c = l.resolution, d = t.pixelRatio, p = i.getRevision(), f = i.getRenderBuffer(), g = i.getRenderOrder(); void 0 === g && (g = Ze.defaultOrder); var _ = B.buffer(h, f * c), v = l.projection.getExtent(); if (n.getWrapX() && l.projection.canWrapX() && !B.containsExtent(v, t.extent)) {
    var y = B.getWidth(v), m = Math.max(B.getWidth(_) / 2, y);
    _[0] = v[0] - m, _[2] = v[2] + m;
} if (!this.dirty_ && this.renderedResolution_ == c && this.renderedRevision_ == p && this.renderedRenderOrder_ == g && B.containsExtent(this.renderedExtent_, _))
    return this.replayGroupChanged = !1, !0; this.replayGroup_ = null, this.dirty_ = !1; var x = new He(Ze.getTolerance(c, d), _, c, d, n.getOverlaps(), this.declutterTree_, i.getRenderBuffer()); n.loadFeatures(_, c, u); var E = function (t) { var e, n = t.getStyleFunction(); if (n ? e = n.call(t, c) : (n = i.getStyleFunction()) && (e = n(t, c)), e) {
    var r = this.renderFeature(t, c, d, e, x);
    this.dirty_ = this.dirty_ || r;
} }.bind(this); if (g) {
    var T = [];
    n.forEachFeatureInExtent(_, function (t) { T.push(t); }, this), T.sort(g);
    for (var C = 0, S = T.length; C < S; ++C)
        E(T[C]);
}
else
    n.forEachFeatureInExtent(_, E, this); return x.finish(), this.renderedResolution_ = c, this.renderedRevision_ = p, this.renderedRenderOrder_ = g, this.renderedExtent_ = _, this.replayGroup_ = x, this.replayGroupChanged = !0, !0; }, qe.prototype.renderFeature = function (t, e, i, n, r) { if (!n)
    return !1; var o = !1; if (Array.isArray(n))
    for (var s = 0, a = n.length; s < a; ++s)
        o = Ze.renderFeature(r, t, n[s], Ze.getSquaredTolerance(e, i), this.handleStyleImageChange_, this) || o;
else
    o = Ze.renderFeature(r, t, n, Ze.getSquaredTolerance(e, i), this.handleStyleImageChange_, this); return o; }; var Je = function (t) { this.context = null, me.call(this, t), this.declutterTree_ = t.getDeclutter() ? Ce(9) : null, this.dirty_ = !1, this.renderedLayerRevision_, this.tmpTransform_ = tt.create(), this.zDirection = "vector" == t.getRenderMode() ? 1 : 0, o.listen(oe.labelCache, "clear", this.handleFontsChanged_, this); }; i.inherits(Je, me), Je.handles = function (t, e) { return "canvas" === t && "VECTOR_TILE" === e.getType(); }, Je.create = function (t, e) { return new Je(e); }, Je.IMAGE_REPLAYS = { image: [Ue.POLYGON, Ue.CIRCLE, Ue.LINE_STRING, Ue.IMAGE, Ue.TEXT], hybrid: [Ue.POLYGON, Ue.LINE_STRING] }, Je.VECTOR_REPLAYS = { image: [Ue.DEFAULT], hybrid: [Ue.IMAGE, Ue.TEXT, Ue.DEFAULT], vector: We.ORDER }, Je.prototype.disposeInternal = function () { o.unlisten(oe.labelCache, "clear", this.handleFontsChanged_, this), me.prototype.disposeInternal.call(this); }, Je.prototype.prepareFrame = function (t, e) { var i = this.getLayer(), n = i.getRevision(); if (this.renderedLayerRevision_ != n) {
    this.renderedTiles.length = 0;
    var r = i.getRenderMode();
    this.context || "vector" == r || (this.context = yt()), this.context && "vector" == r && (this.context = null);
} return this.renderedLayerRevision_ = n, me.prototype.prepareFrame.apply(this, arguments); }, Je.prototype.createReplayGroup_ = function (t, e) { var i = this.getLayer(), n = e.pixelRatio, r = e.viewState.projection, o = i.getRevision(), s = i.getRenderOrder() || null, a = t.getReplayState(i); if (a.dirty || a.renderedRevision != o || a.renderedRenderOrder != s) {
    for (var h = i.getSource(), l = h.getTileGrid(), u = h.getTileGridForProjection(r), c = u.getResolution(t.tileCoord[0]), d = u.getTileCoordExtent(t.wrappedTileCoord), p = 0, f = t.tileKeys.length; p < f; ++p) {
        var g = t.getTile(t.tileKeys[p]);
        if (3 != g.getState()) {
            var _ = g.tileCoord, v = l.getTileCoordExtent(_), y = B.getIntersection(d, v), m = B.equals(v, y) ? null : B.buffer(y, i.getRenderBuffer() * c), x = g.getProjection(), E = !1;
            $.equivalent(r, x) || (E = !0, g.setProjection(r)), a.dirty = !1;
            var T, C = new He(0, y, c, n, h.getOverlaps(), this.declutterTree_, i.getRenderBuffer()), S = Ze.getSquaredTolerance(c, n), R = function (t) { var e, n = t.getStyleFunction(); if (n ? e = n.call(t, c) : (n = i.getStyleFunction()) && (e = n(t, c)), e) {
                var r = this.renderFeature(t, S, e, C);
                this.dirty_ = this.dirty_ || r, a.dirty = a.dirty || r;
            } }, I = g.getFeatures();
            s && s !== a.renderedRenderOrder && I.sort(s);
            for (var L = 0, w = I.length; L < w; ++L)
                T = I[L], E && (x.getUnits() == Y.TILE_PIXELS && (x.setWorldExtent(v), x.setExtent(g.getExtent())), T.getGeometry().transform(x, r)), m && !B.intersects(m, T.getGeometry().getExtent()) || R.call(this, T);
            for (var A in C.finish(), C.getReplays())
                ;
            g.setReplayGroup(i, t.tileCoord.toString(), C);
        }
    }
    a.renderedRevision = o, a.renderedRenderOrder = s;
} }, Je.prototype.drawTileImage = function (t, e, i, n, r, o, s, a, h) { var l = t; this.createReplayGroup_(l, e), this.context && (this.renderTileImage_(l, e, i), me.prototype.drawTileImage.apply(this, arguments)); }, Je.prototype.forEachFeatureAtCoordinate = function (t, e, n, r, o) { var s = e.viewState.resolution, a = e.viewState.rotation; n = void 0 == n ? 0 : n; var h, l, u, c, d, p, f, g, _ = this.getLayer(), v = {}, y = this.renderedTiles, m = _.getSource().getTileGridForProjection(e.viewState.projection); for (u = 0, c = y.length; u < c; ++u)
    if (f = (p = y[u]).wrappedTileCoord, g = m.getTileCoordExtent(f, this.tmpExtent), h = B.buffer(g, n * s, h), B.containsCoordinate(h, t))
        for (var x = 0, E = p.tileKeys.length; x < E; ++x) {
            var T = p.getTile(p.tileKeys[x]);
            3 != T.getState() && (d = T.getReplayGroup(_, p.tileCoord.toString()), l = l || d.forEachFeatureAtCoordinate(t, s, a, n, {}, function (t) { var e = i.getUid(t).toString(); if (!(e in v))
                return v[e] = !0, r.call(o, t, _); }, null));
        } return l; }, Je.prototype.getReplayTransform_ = function (t, e) { var i = this.getLayer().getSource().getTileGrid(), n = t.tileCoord, r = i.getResolution(n[0]), o = e.viewState, s = e.pixelRatio, a = o.resolution / s, h = i.getTileCoordExtent(n, this.tmpExtent), l = o.center, u = B.getTopLeft(h), c = e.size, d = Math.round(s * c[0] / 2), p = Math.round(s * c[1] / 2); return tt.compose(this.tmpTransform_, d, p, r / a, r / a, o.rotation, (u[0] - l[0]) / r, (l[1] - u[1]) / r); }, Je.prototype.handleFontsChanged_ = function (t) { var e = this.getLayer(); e.getVisible() && void 0 !== this.renderedLayerRevision_ && e.changed(); }, Je.prototype.handleStyleImageChange_ = function (t) { this.renderIfReadyAndVisible(); }, Je.prototype.postCompose = function (t, e, i) { var n, r, o = this.getLayer(), s = o.getDeclutter() ? {} : null, a = o.getSource(), h = o.getRenderMode(), l = Je.VECTOR_REPLAYS[h], u = e.pixelRatio, c = e.viewState.rotation, d = e.size; c && (n = Math.round(u * d[0] / 2), r = Math.round(u * d[1] / 2), oe.rotateAtOffset(t, -c, n, r)), s && this.declutterTree_.clear(); for (var p = this.renderedTiles, f = a.getTileGridForProjection(e.viewState.projection), g = [], _ = [], v = p.length - 1; v >= 0; --v) {
    var y = p[v];
    if (5 != y.getState())
        for (var m = y.tileCoord, x = f.getTileCoordExtent(m)[0] - f.getTileCoordExtent(y.wrappedTileCoord)[0], E = void 0, T = 0, C = y.tileKeys.length; T < C; ++T) {
            var S = y.getTile(y.tileKeys[T]);
            if (3 != S.getState()) {
                var R = S.getReplayGroup(o, m.toString());
                if ("vector" == h || R.hasReplays(l)) {
                    E || (E = this.getTransform(e, x));
                    var I = S.tileCoord[0], L = R.getClipCoords(E);
                    t.save(), t.globalAlpha = i.opacity;
                    for (var w = 0, A = g.length; w < A; ++w) {
                        var P = g[w];
                        I < _[w] && (t.beginPath(), t.moveTo(L[0], L[1]), t.lineTo(L[2], L[3]), t.lineTo(L[4], L[5]), t.lineTo(L[6], L[7]), t.moveTo(P[6], P[7]), t.lineTo(P[4], P[5]), t.lineTo(P[2], P[3]), t.lineTo(P[0], P[1]), t.clip());
                    }
                    R.replay(t, E, c, {}, l, s), t.restore(), g.push(L), _.push(I);
                }
            }
        }
} s && He.replayDeclutter(s, t, c), c && oe.rotateAtOffset(t, c, n, r), me.prototype.postCompose.apply(this, arguments); }, Je.prototype.renderFeature = function (t, e, i, n) { if (!i)
    return !1; var r = !1; if (Array.isArray(i))
    for (var o = 0, s = i.length; o < s; ++o)
        r = Ze.renderFeature(n, t, i[o], e, this.handleStyleImageChange_, this) || r;
else
    r = Ze.renderFeature(n, t, i, e, this.handleStyleImageChange_, this); return r; }, Je.prototype.renderTileImage_ = function (t, e, i) { var n = this.getLayer(), r = t.getReplayState(n), o = n.getRevision(), s = Je.IMAGE_REPLAYS[n.getRenderMode()]; if (s && r.renderedTileRevision !== o) {
    r.renderedTileRevision = o;
    var a = t.wrappedTileCoord, h = a[0], l = e.pixelRatio, u = n.getSource(), c = u.getTileGridForProjection(e.viewState.projection), d = c.getResolution(h), p = t.getContext(n), f = u.getTilePixelSize(h, l, e.viewState.projection);
    p.canvas.width = f[0], p.canvas.height = f[1];
    for (var g = c.getTileCoordExtent(a), _ = 0, v = t.tileKeys.length; _ < v; ++_) {
        var y = t.getTile(t.tileKeys[_]);
        if (3 != y.getState()) {
            var m = l / d, x = tt.reset(this.tmpTransform_);
            tt.scale(x, m, -m), tt.translate(x, -g[0], -g[3]), y.getReplayGroup(n, t.tileCoord.toString()).replay(p, x, 0, {}, s);
        }
    }
} }; var Qe = function (t) { this.source_ = t; }; Qe.prototype.getType = function () { }, Qe.prototype.getSource = function () { return this.source_; }, Qe.prototype.isAnimated = N.FALSE; var $e = function (t) { Qe.call(this, t); }; i.inherits($e, Qe), $e.prototype.getType = function () { return f.FRAGMENT_SHADER; }; var ti = function (t) { Qe.call(this, t); }; i.inherits(ti, Qe), ti.prototype.getType = function () { return f.VERTEX_SHADER; }; var ei = {}; ei.fragment = new $e(i.DEBUG_WEBGL ? "precision mediump float;\nvarying vec2 v_center;\nvarying vec2 v_offset;\nvarying float v_halfWidth;\nvarying float v_pixelRatio;\n\n\n\nuniform float u_opacity;\nuniform vec4 u_fillColor;\nuniform vec4 u_strokeColor;\nuniform vec2 u_size;\n\nvoid main(void) {\n  vec2 windowCenter = vec2((v_center.x + 1.0) / 2.0 * u_size.x * v_pixelRatio,\n      (v_center.y + 1.0) / 2.0 * u_size.y * v_pixelRatio);\n  vec2 windowOffset = vec2((v_offset.x + 1.0) / 2.0 * u_size.x * v_pixelRatio,\n      (v_offset.y + 1.0) / 2.0 * u_size.y * v_pixelRatio);\n  float radius = length(windowCenter - windowOffset);\n  float dist = length(windowCenter - gl_FragCoord.xy);\n  if (dist > radius + v_halfWidth) {\n    if (u_strokeColor.a == 0.0) {\n      gl_FragColor = u_fillColor;\n    } else {\n      gl_FragColor = u_strokeColor;\n    }\n    gl_FragColor.a = gl_FragColor.a - (dist - (radius + v_halfWidth));\n  } else if (u_fillColor.a == 0.0) {\n    // Hooray, no fill, just stroke. We can use real antialiasing.\n    gl_FragColor = u_strokeColor;\n    if (dist < radius - v_halfWidth) {\n      gl_FragColor.a = gl_FragColor.a - (radius - v_halfWidth - dist);\n    }\n  } else {\n    gl_FragColor = u_fillColor;\n    float strokeDist = radius - v_halfWidth;\n    float antialias = 2.0 * v_pixelRatio;\n    if (dist > strokeDist) {\n      gl_FragColor = u_strokeColor;\n    } else if (dist >= strokeDist - antialias) {\n      float step = smoothstep(strokeDist - antialias, strokeDist, dist);\n      gl_FragColor = mix(u_fillColor, u_strokeColor, step);\n    }\n  }\n  gl_FragColor.a = gl_FragColor.a * u_opacity;\n  if (gl_FragColor.a <= 0.0) {\n    discard;\n  }\n}\n" : "precision mediump float;varying vec2 a;varying vec2 b;varying float c;varying float d;uniform float m;uniform vec4 n;uniform vec4 o;uniform vec2 p;void main(void){vec2 windowCenter=vec2((a.x+1.0)/2.0*p.x*d,(a.y+1.0)/2.0*p.y*d);vec2 windowOffset=vec2((b.x+1.0)/2.0*p.x*d,(b.y+1.0)/2.0*p.y*d);float radius=length(windowCenter-windowOffset);float dist=length(windowCenter-gl_FragCoord.xy);if(dist>radius+c){if(o.a==0.0){gl_FragColor=n;}else{gl_FragColor=o;}gl_FragColor.a=gl_FragColor.a-(dist-(radius+c));}else if(n.a==0.0){gl_FragColor=o;if(dist<radius-c){gl_FragColor.a=gl_FragColor.a-(radius-c-dist);}} else{gl_FragColor=n;float strokeDist=radius-c;float antialias=2.0*d;if(dist>strokeDist){gl_FragColor=o;}else if(dist>=strokeDist-antialias){float step=smoothstep(strokeDist-antialias,strokeDist,dist);gl_FragColor=mix(n,o,step);}} gl_FragColor.a=gl_FragColor.a*m;if(gl_FragColor.a<=0.0){discard;}}"), ei.vertex = new ti(i.DEBUG_WEBGL ? "varying vec2 v_center;\nvarying vec2 v_offset;\nvarying float v_halfWidth;\nvarying float v_pixelRatio;\n\n\nattribute vec2 a_position;\nattribute float a_instruction;\nattribute float a_radius;\n\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_offsetScaleMatrix;\nuniform mat4 u_offsetRotateMatrix;\nuniform float u_lineWidth;\nuniform float u_pixelRatio;\n\nvoid main(void) {\n  mat4 offsetMatrix = u_offsetScaleMatrix * u_offsetRotateMatrix;\n  v_center = vec4(u_projectionMatrix * vec4(a_position, 0.0, 1.0)).xy;\n  v_pixelRatio = u_pixelRatio;\n  float lineWidth = u_lineWidth * u_pixelRatio;\n  v_halfWidth = lineWidth / 2.0;\n  if (lineWidth == 0.0) {\n    lineWidth = 2.0 * u_pixelRatio;\n  }\n  vec2 offset;\n  // Radius with anitaliasing (roughly).\n  float radius = a_radius + 3.0 * u_pixelRatio;\n  // Until we get gl_VertexID in WebGL, we store an instruction.\n  if (a_instruction == 0.0) {\n    // Offsetting the edges of the triangle by lineWidth / 2 is necessary, however\n    // we should also leave some space for the antialiasing, thus we offset by lineWidth.\n    offset = vec2(-1.0, 1.0);\n  } else if (a_instruction == 1.0) {\n    offset = vec2(-1.0, -1.0);\n  } else if (a_instruction == 2.0) {\n    offset = vec2(1.0, -1.0);\n  } else {\n    offset = vec2(1.0, 1.0);\n  }\n\n  gl_Position = u_projectionMatrix * vec4(a_position + offset * radius, 0.0, 1.0) +\n      offsetMatrix * vec4(offset * lineWidth, 0.0, 0.0);\n  v_offset = vec4(u_projectionMatrix * vec4(a_position.x + a_radius, a_position.y,\n      0.0, 1.0)).xy;\n\n  if (distance(v_center, v_offset) > 20000.0) {\n    gl_Position = vec4(v_center, 0.0, 1.0);\n  }\n}\n\n\n" : "varying vec2 a;varying vec2 b;varying float c;varying float d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;uniform float k;uniform float l;void main(void){mat4 offsetMatrix=i*j;a=vec4(h*vec4(e,0.0,1.0)).xy;d=l;float lineWidth=k*l;c=lineWidth/2.0;if(lineWidth==0.0){lineWidth=2.0*l;}vec2 offset;float radius=g+3.0*l;//Until we get gl_VertexID in WebGL,we store an instruction.if(f==0.0){//Offsetting the edges of the triangle by lineWidth/2 is necessary,however//we should also leave some space for the antialiasing,thus we offset by lineWidth.offset=vec2(-1.0,1.0);}else if(f==1.0){offset=vec2(-1.0,-1.0);}else if(f==2.0){offset=vec2(1.0,-1.0);}else{offset=vec2(1.0,1.0);}gl_Position=h*vec4(e+offset*radius,0.0,1.0)+offsetMatrix*vec4(offset*lineWidth,0.0,0.0);b=vec4(h*vec4(e.x+g,e.y,0.0,1.0)).xy;if(distance(a,b)>20000.0){gl_Position=vec4(a,0.0,1.0);}}"); var ii = function () { return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; }, ni = function (t, e) { return t[0] = e[0], t[1] = e[1], t[4] = e[2], t[5] = e[3], t[12] = e[4], t[13] = e[5], t; }, ri = function (t, e) { he.call(this), this.tolerance = t, this.maxExtent = e, this.origin = B.getCenter(e), this.projectionMatrix_ = tt.create(), this.offsetRotateMatrix_ = tt.create(), this.offsetScaleMatrix_ = tt.create(), this.tmpMat4_ = ii(), this.indices = [], this.indicesBuffer = null, this.startIndices = [], this.startIndicesFeature = [], this.vertices = [], this.verticesBuffer = null, this.lineStringReplay = void 0; }; i.inherits(ri, he), ri.prototype.getDeleteResourcesFunction = function (t) { }, ri.prototype.finish = function (t) { }, ri.prototype.setUpProgram = function (t, e, i, n) { }, ri.prototype.shutDownProgram = function (t, e) { }, ri.prototype.drawReplay = function (t, e, i, n) { }, ri.prototype.drawHitDetectionReplayOneByOne = function (t, e, i, n, r) { }, ri.prototype.drawHitDetectionReplay = function (t, e, i, n, r, o) { return r ? this.drawHitDetectionReplayOneByOne(t, e, i, n, o) : this.drawHitDetectionReplayAll(t, e, i, n); }, ri.prototype.drawHitDetectionReplayAll = function (t, e, i, n) { return t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawReplay(t, e, i, !0), n(null) || void 0; }, ri.prototype.replay = function (t, e, i, n, r, o, s, a, h, l, u) { var c, d, p, g, _, v, y, m, x = t.getGL(); this.lineStringReplay && (c = x.isEnabled(x.STENCIL_TEST), d = x.getParameter(x.STENCIL_FUNC), p = x.getParameter(x.STENCIL_VALUE_MASK), g = x.getParameter(x.STENCIL_REF), _ = x.getParameter(x.STENCIL_WRITEMASK), v = x.getParameter(x.STENCIL_FAIL), y = x.getParameter(x.STENCIL_PASS_DEPTH_PASS), m = x.getParameter(x.STENCIL_PASS_DEPTH_FAIL), x.enable(x.STENCIL_TEST), x.clear(x.STENCIL_BUFFER_BIT), x.stencilMask(255), x.stencilFunc(x.ALWAYS, 1, 255), x.stencilOp(x.KEEP, x.KEEP, x.REPLACE), this.lineStringReplay.replay(t, e, i, n, r, o, s, a, h, l, u), x.stencilMask(0), x.stencilFunc(x.NOTEQUAL, 1, 255)), t.bindBuffer(f.ARRAY_BUFFER, this.verticesBuffer), t.bindBuffer(f.ELEMENT_ARRAY_BUFFER, this.indicesBuffer); var E = this.setUpProgram(x, t, r, o), T = tt.reset(this.projectionMatrix_); tt.scale(T, 2 / (i * r[0]), 2 / (i * r[1])), tt.rotate(T, -n), tt.translate(T, -(e[0] - this.origin[0]), -(e[1] - this.origin[1])); var C = tt.reset(this.offsetScaleMatrix_); tt.scale(C, 2 / r[0], 2 / r[1]); var S, R = tt.reset(this.offsetRotateMatrix_); return 0 !== n && tt.rotate(R, -n), x.uniformMatrix4fv(E.u_projectionMatrix, !1, ni(this.tmpMat4_, T)), x.uniformMatrix4fv(E.u_offsetScaleMatrix, !1, ni(this.tmpMat4_, C)), x.uniformMatrix4fv(E.u_offsetRotateMatrix, !1, ni(this.tmpMat4_, R)), x.uniform1f(E.u_opacity, s), void 0 === h ? this.drawReplay(x, t, a, !1) : S = this.drawHitDetectionReplay(x, t, a, h, l, u), this.shutDownProgram(x, E), this.lineStringReplay && (c || x.disable(x.STENCIL_TEST), x.clear(x.STENCIL_BUFFER_BIT), x.stencilFunc(d, g, p), x.stencilMask(_), x.stencilOp(v, m, y)), S; }, ri.prototype.drawElements = function (t, e, i, n) { var r = e.hasOESElementIndexUint ? f.UNSIGNED_INT : f.UNSIGNED_SHORT, o = n - i, s = i * (e.hasOESElementIndexUint ? 4 : 2); t.drawElements(f.TRIANGLES, o, r, s); }; var oi = { defaultFont: "10px sans-serif", defaultFillStyle: [0, 0, 0, 1], defaultLineCap: "round", defaultLineDash: [], defaultLineDashOffset: 0, defaultLineJoin: "round", defaultMiterLimit: 10, defaultStrokeStyle: [0, 0, 0, 1], defaultTextAlign: .5, defaultTextBaseline: .5, defaultLineWidth: 1, triangleIsCounterClockwise: function (t, e, i, n, r, o) { var s = (i - t) * (o - e) - (r - t) * (n - e); return s <= oi.EPSILON && s >= -oi.EPSILON ? void 0 : s > 0; } }; oi.EPSILON = Number.EPSILON || 2.220446049250313e-16; var si = function (t, e) { this.arr_ = void 0 !== t ? t : [], this.usage_ = void 0 !== e ? e : si.Usage_.STATIC_DRAW; }; si.prototype.getArray = function () { return this.arr_; }, si.prototype.getUsage = function () { return this.usage_; }, si.Usage_ = { STATIC_DRAW: f.STATIC_DRAW, STREAM_DRAW: f.STREAM_DRAW, DYNAMIC_DRAW: f.DYNAMIC_DRAW }; var ai = function (t, e) { ri.call(this, t, e), this.defaultLocations_ = null, this.styles_ = [], this.styleIndices_ = [], this.radius_ = 0, this.state_ = { fillColor: null, strokeColor: null, lineDash: null, lineDashOffset: void 0, lineWidth: void 0, changed: !1 }; }; i.inherits(ai, ri), ai.prototype.drawCoordinates_ = function (t, e, i, n) { var r, o, s = this.vertices.length, a = this.indices.length, h = s / 4; for (r = e, o = i; r < o; r += n)
    this.vertices[s++] = t[r], this.vertices[s++] = t[r + 1], this.vertices[s++] = 0, this.vertices[s++] = this.radius_, this.vertices[s++] = t[r], this.vertices[s++] = t[r + 1], this.vertices[s++] = 1, this.vertices[s++] = this.radius_, this.vertices[s++] = t[r], this.vertices[s++] = t[r + 1], this.vertices[s++] = 2, this.vertices[s++] = this.radius_, this.vertices[s++] = t[r], this.vertices[s++] = t[r + 1], this.vertices[s++] = 3, this.vertices[s++] = this.radius_, this.indices[a++] = h, this.indices[a++] = h + 1, this.indices[a++] = h + 2, this.indices[a++] = h + 2, this.indices[a++] = h + 3, this.indices[a++] = h, h += 4; }, ai.prototype.drawCircle = function (t, e) { var i = t.getRadius(), n = t.getStride(); if (i) {
    this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e), this.state_.changed && (this.styleIndices_.push(this.indices.length), this.state_.changed = !1), this.radius_ = i;
    var r = t.getFlatCoordinates();
    r = j(r, 0, 2, n, -this.origin[0], -this.origin[1]), this.drawCoordinates_(r, 0, 2, n);
}
else if (this.state_.changed && (this.styles_.pop(), this.styles_.length)) {
    var o = this.styles_[this.styles_.length - 1];
    this.state_.fillColor = o[0], this.state_.strokeColor = o[1], this.state_.lineWidth = o[2], this.state_.changed = !1;
} }, ai.prototype.finish = function (t) { this.verticesBuffer = new si(this.vertices), this.indicesBuffer = new si(this.indices), this.startIndices.push(this.indices.length), 0 === this.styleIndices_.length && this.styles_.length > 0 && (this.styles_ = []), this.vertices = null, this.indices = null; }, ai.prototype.getDeleteResourcesFunction = function (t) { var e = this.verticesBuffer, i = this.indicesBuffer; return function () { t.deleteBuffer(e), t.deleteBuffer(i); }; }, ai.prototype.setUpProgram = function (t, e, n, r) { var o, s; o = ei.fragment, s = ei.vertex; var a, h = e.getProgram(o, s); return this.defaultLocations_ ? a = this.defaultLocations_ : (a = new function (t, e) { this.u_projectionMatrix = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_projectionMatrix" : "h"), this.u_offsetScaleMatrix = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_offsetScaleMatrix" : "i"), this.u_offsetRotateMatrix = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_offsetRotateMatrix" : "j"), this.u_lineWidth = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_lineWidth" : "k"), this.u_pixelRatio = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_pixelRatio" : "l"), this.u_opacity = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_opacity" : "m"), this.u_fillColor = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_fillColor" : "n"), this.u_strokeColor = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_strokeColor" : "o"), this.u_size = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_size" : "p"), this.a_position = t.getAttribLocation(e, i.DEBUG_WEBGL ? "a_position" : "e"), this.a_instruction = t.getAttribLocation(e, i.DEBUG_WEBGL ? "a_instruction" : "f"), this.a_radius = t.getAttribLocation(e, i.DEBUG_WEBGL ? "a_radius" : "g"); }(t, h), this.defaultLocations_ = a), e.useProgram(h), t.enableVertexAttribArray(a.a_position), t.vertexAttribPointer(a.a_position, 2, f.FLOAT, !1, 16, 0), t.enableVertexAttribArray(a.a_instruction), t.vertexAttribPointer(a.a_instruction, 1, f.FLOAT, !1, 16, 8), t.enableVertexAttribArray(a.a_radius), t.vertexAttribPointer(a.a_radius, 1, f.FLOAT, !1, 16, 12), t.uniform2fv(a.u_size, n), t.uniform1f(a.u_pixelRatio, r), a; }, ai.prototype.shutDownProgram = function (t, e) { t.disableVertexAttribArray(e.a_position), t.disableVertexAttribArray(e.a_instruction), t.disableVertexAttribArray(e.a_radius); }, ai.prototype.drawReplay = function (t, e, i, n) { var o, s, a, h; if (r.isEmpty(i))
    for (a = this.startIndices[this.startIndices.length - 1], o = this.styleIndices_.length - 1; o >= 0; --o)
        s = this.styleIndices_[o], h = this.styles_[o], this.setFillStyle_(t, h[0]), this.setStrokeStyle_(t, h[1], h[2]), this.drawElements(t, e, s, a), a = s;
else
    this.drawReplaySkipping_(t, e, i); }, ai.prototype.drawHitDetectionReplayOneByOne = function (t, e, n, r, o) { var s, a, h, l, u, c, d; for (d = this.startIndices.length - 2, h = this.startIndices[d + 1], s = this.styleIndices_.length - 1; s >= 0; --s)
    for (l = this.styles_[s], this.setFillStyle_(t, l[0]), this.setStrokeStyle_(t, l[1], l[2]), u = this.styleIndices_[s]; d >= 0 && this.startIndices[d] >= u;) {
        if (a = this.startIndices[d], c = this.startIndicesFeature[d], void 0 === n[i.getUid(c).toString()] && c.getGeometry() && (void 0 === o || B.intersects(o, c.getGeometry().getExtent()))) {
            t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawElements(t, e, a, h);
            var p = r(c);
            if (p)
                return p;
        }
        d--, h = a;
    } }, ai.prototype.drawReplaySkipping_ = function (t, e, n) { var r, o, s, a, h, l, u, c; for (u = this.startIndices.length - 2, s = o = this.startIndices[u + 1], r = this.styleIndices_.length - 1; r >= 0; --r) {
    for (a = this.styles_[r], this.setFillStyle_(t, a[0]), this.setStrokeStyle_(t, a[1], a[2]), h = this.styleIndices_[r]; u >= 0 && this.startIndices[u] >= h;)
        c = this.startIndices[u], l = this.startIndicesFeature[u], n[i.getUid(l).toString()] && (o !== s && this.drawElements(t, e, o, s), s = c), u--, o = c;
    o !== s && this.drawElements(t, e, o, s), o = s = h;
} }, ai.prototype.setFillStyle_ = function (t, e) { t.uniform4fv(this.defaultLocations_.u_fillColor, e); }, ai.prototype.setStrokeStyle_ = function (t, e, i) { t.uniform4fv(this.defaultLocations_.u_strokeColor, e), t.uniform1f(this.defaultLocations_.u_lineWidth, i); }, ai.prototype.setFillStrokeStyle = function (t, e) { var i, n; if (e) {
    var r = e.getLineDash();
    this.state_.lineDash = r || oi.defaultLineDash;
    var o = e.getLineDashOffset();
    this.state_.lineDashOffset = o || oi.defaultLineDashOffset, i = (i = e.getColor()) instanceof CanvasGradient || i instanceof CanvasPattern ? oi.defaultStrokeStyle : se.asArray(i).map(function (t, e) { return 3 != e ? t / 255 : t; }) || oi.defaultStrokeStyle, n = void 0 !== (n = e.getWidth()) ? n : oi.defaultLineWidth;
}
else
    i = [0, 0, 0, 0], n = 0; var s = t ? t.getColor() : [0, 0, 0, 0]; s = s instanceof CanvasGradient || s instanceof CanvasPattern ? oi.defaultFillStyle : se.asArray(s).map(function (t, e) { return 3 != e ? t / 255 : t; }) || oi.defaultFillStyle, this.state_.strokeColor && S.equals(this.state_.strokeColor, i) && this.state_.fillColor && S.equals(this.state_.fillColor, s) && this.state_.lineWidth === n || (this.state_.changed = !0, this.state_.fillColor = s, this.state_.strokeColor = i, this.state_.lineWidth = n, this.styles_.push([s, i, n])); }; var hi = {}; hi.fragment = new $e(i.DEBUG_WEBGL ? "precision mediump float;\nvarying vec2 v_texCoord;\nvarying float v_opacity;\n\nuniform float u_opacity;\nuniform sampler2D u_image;\n\nvoid main(void) {\n  vec4 texColor = texture2D(u_image, v_texCoord);\n  gl_FragColor.rgb = texColor.rgb;\n  float alpha = texColor.a * v_opacity * u_opacity;\n  if (alpha == 0.0) {\n    discard;\n  }\n  gl_FragColor.a = alpha;\n}\n" : "precision mediump float;varying vec2 a;varying float b;uniform float k;uniform sampler2D l;void main(void){vec4 texColor=texture2D(l,a);gl_FragColor.rgb=texColor.rgb;float alpha=texColor.a*b*k;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"), hi.vertex = new ti(i.DEBUG_WEBGL ? "varying vec2 v_texCoord;\nvarying float v_opacity;\n\nattribute vec2 a_position;\nattribute vec2 a_texCoord;\nattribute vec2 a_offsets;\nattribute float a_opacity;\nattribute float a_rotateWithView;\n\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_offsetScaleMatrix;\nuniform mat4 u_offsetRotateMatrix;\n\nvoid main(void) {\n  mat4 offsetMatrix = u_offsetScaleMatrix;\n  if (a_rotateWithView == 1.0) {\n    offsetMatrix = u_offsetScaleMatrix * u_offsetRotateMatrix;\n  }\n  vec4 offsets = offsetMatrix * vec4(a_offsets, 0.0, 0.0);\n  gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0) + offsets;\n  v_texCoord = a_texCoord;\n  v_opacity = a_opacity;\n}\n\n\n" : "varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.0,0.0);gl_Position=h*vec4(c,0.0,1.0)+offsets;a=d;b=f;}"); var li = function (t, e) { this.canvas_ = t, this.gl_ = e, this.bufferCache_ = {}, this.shaderCache_ = {}, this.programCache_ = {}, this.currentProgram_ = null, this.hitDetectionFramebuffer_ = null, this.hitDetectionTexture_ = null, this.hitDetectionRenderbuffer_ = null, this.hasOESElementIndexUint = S.includes(i.WEBGL_EXTENSIONS, "OES_element_index_uint"), this.hasOESElementIndexUint && e.getExtension("OES_element_index_uint"), o.listen(this.canvas_, "webglcontextlost", this.handleWebGLContextLost, this), o.listen(this.canvas_, "webglcontextrestored", this.handleWebGLContextRestored, this); }; i.inherits(li, s), li.prototype.bindBuffer = function (t, e) { var n = this.getGL(), r = e.getArray(), o = String(i.getUid(e)); if (o in this.bufferCache_) {
    var s = this.bufferCache_[o];
    n.bindBuffer(t, s.buffer);
}
else {
    var a, h = n.createBuffer();
    n.bindBuffer(t, h), t == f.ARRAY_BUFFER ? a = new Float32Array(r) : t == f.ELEMENT_ARRAY_BUFFER && (a = this.hasOESElementIndexUint ? new Uint32Array(r) : new Uint16Array(r)), n.bufferData(t, a, e.getUsage()), this.bufferCache_[o] = { buf: e, buffer: h };
} }, li.prototype.deleteBuffer = function (t) { var e = this.getGL(), n = String(i.getUid(t)), r = this.bufferCache_[n]; e.isContextLost() || e.deleteBuffer(r.buffer), delete this.bufferCache_[n]; }, li.prototype.disposeInternal = function () { o.unlistenAll(this.canvas_); var t = this.getGL(); if (!t.isContextLost()) {
    var e;
    for (e in this.bufferCache_)
        t.deleteBuffer(this.bufferCache_[e].buffer);
    for (e in this.programCache_)
        t.deleteProgram(this.programCache_[e]);
    for (e in this.shaderCache_)
        t.deleteShader(this.shaderCache_[e]);
    t.deleteFramebuffer(this.hitDetectionFramebuffer_), t.deleteRenderbuffer(this.hitDetectionRenderbuffer_), t.deleteTexture(this.hitDetectionTexture_);
} }, li.prototype.getCanvas = function () { return this.canvas_; }, li.prototype.getGL = function () { return this.gl_; }, li.prototype.getHitDetectionFramebuffer = function () { return this.hitDetectionFramebuffer_ || this.initHitDetectionFramebuffer_(), this.hitDetectionFramebuffer_; }, li.prototype.getShader = function (t) { var e = String(i.getUid(t)); if (e in this.shaderCache_)
    return this.shaderCache_[e]; var n = this.getGL(), r = n.createShader(t.getType()); return n.shaderSource(r, t.getSource()), n.compileShader(r), this.shaderCache_[e] = r, r; }, li.prototype.getProgram = function (t, e) { var n = i.getUid(t) + "/" + i.getUid(e); if (n in this.programCache_)
    return this.programCache_[n]; var r = this.getGL(), o = r.createProgram(); return r.attachShader(o, this.getShader(t)), r.attachShader(o, this.getShader(e)), r.linkProgram(o), this.programCache_[n] = o, o; }, li.prototype.handleWebGLContextLost = function () { r.clear(this.bufferCache_), r.clear(this.shaderCache_), r.clear(this.programCache_), this.currentProgram_ = null, this.hitDetectionFramebuffer_ = null, this.hitDetectionTexture_ = null, this.hitDetectionRenderbuffer_ = null; }, li.prototype.handleWebGLContextRestored = function () { }, li.prototype.initHitDetectionFramebuffer_ = function () { var t = this.gl_, e = t.createFramebuffer(); t.bindFramebuffer(t.FRAMEBUFFER, e); var i = li.createEmptyTexture(t, 1, 1), n = t.createRenderbuffer(); t.bindRenderbuffer(t.RENDERBUFFER, n), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, 1, 1), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, i, 0), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, n), t.bindTexture(t.TEXTURE_2D, null), t.bindRenderbuffer(t.RENDERBUFFER, null), t.bindFramebuffer(t.FRAMEBUFFER, null), this.hitDetectionFramebuffer_ = e, this.hitDetectionTexture_ = i, this.hitDetectionRenderbuffer_ = n; }, li.prototype.useProgram = function (t) { return t != this.currentProgram_ && (this.getGL().useProgram(t), this.currentProgram_ = t, !0); }, li.createTexture_ = function (t, e, i) { var n = t.createTexture(); return t.bindTexture(t.TEXTURE_2D, n), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), void 0 !== e && t.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, e), void 0 !== i && t.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, i), n; }, li.createEmptyTexture = function (t, e, i, n, r) { var o = li.createTexture_(t, n, r); return t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, e, i, 0, t.RGBA, t.UNSIGNED_BYTE, null), o; }, li.createTexture = function (t, e, i, n) { var r = li.createTexture_(t, i, n); return t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e), r; }; var ui = function (t, e) { ri.call(this, t, e), this.anchorX = void 0, this.anchorY = void 0, this.groupIndices = [], this.hitDetectionGroupIndices = [], this.height = void 0, this.imageHeight = void 0, this.imageWidth = void 0, this.defaultLocations = null, this.opacity = void 0, this.originX = void 0, this.originY = void 0, this.rotateWithView = void 0, this.rotation = void 0, this.scale = void 0, this.width = void 0; }; i.inherits(ui, ri), ui.prototype.getDeleteResourcesFunction = function (t) { var e = this.verticesBuffer, i = this.indicesBuffer, n = this.getTextures(!0), r = t.getGL(); return function () { var o, s; if (!r.isContextLost())
    for (o = 0, s = n.length; o < s; ++o)
        r.deleteTexture(n[o]); t.deleteBuffer(e), t.deleteBuffer(i); }; }, ui.prototype.drawCoordinates = function (t, e, i, n) { var r, o, s, a, h, l, u = this.anchorX, c = this.anchorY, d = this.height, p = this.imageHeight, f = this.imageWidth, g = this.opacity, _ = this.originX, v = this.originY, y = this.rotateWithView ? 1 : 0, m = -this.rotation, x = this.scale, E = this.width, T = Math.cos(m), C = Math.sin(m), S = this.indices.length, R = this.vertices.length; for (r = e; r < i; r += n)
    h = t[r] - this.origin[0], l = t[r + 1] - this.origin[1], o = R / 8, s = -x * u, a = -x * (d - c), this.vertices[R++] = h, this.vertices[R++] = l, this.vertices[R++] = s * T - a * C, this.vertices[R++] = s * C + a * T, this.vertices[R++] = _ / f, this.vertices[R++] = (v + d) / p, this.vertices[R++] = g, this.vertices[R++] = y, s = x * (E - u), a = -x * (d - c), this.vertices[R++] = h, this.vertices[R++] = l, this.vertices[R++] = s * T - a * C, this.vertices[R++] = s * C + a * T, this.vertices[R++] = (_ + E) / f, this.vertices[R++] = (v + d) / p, this.vertices[R++] = g, this.vertices[R++] = y, s = x * (E - u), a = x * c, this.vertices[R++] = h, this.vertices[R++] = l, this.vertices[R++] = s * T - a * C, this.vertices[R++] = s * C + a * T, this.vertices[R++] = (_ + E) / f, this.vertices[R++] = v / p, this.vertices[R++] = g, this.vertices[R++] = y, s = -x * u, a = x * c, this.vertices[R++] = h, this.vertices[R++] = l, this.vertices[R++] = s * T - a * C, this.vertices[R++] = s * C + a * T, this.vertices[R++] = _ / f, this.vertices[R++] = v / p, this.vertices[R++] = g, this.vertices[R++] = y, this.indices[S++] = o, this.indices[S++] = o + 1, this.indices[S++] = o + 2, this.indices[S++] = o, this.indices[S++] = o + 2, this.indices[S++] = o + 3; return R; }, ui.prototype.createTextures = function (t, e, n, r) { var o, s, a, h, l = e.length; for (h = 0; h < l; ++h)
    s = e[h], (a = i.getUid(s).toString()) in n ? o = n[a] : (o = li.createTexture(r, s, f.CLAMP_TO_EDGE, f.CLAMP_TO_EDGE), n[a] = o), t[h] = o; }, ui.prototype.setUpProgram = function (t, e, n, r) { var o, s = hi.fragment, a = hi.vertex, h = e.getProgram(s, a); return this.defaultLocations ? o = this.defaultLocations : (o = new function (t, e) { this.u_projectionMatrix = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_projectionMatrix" : "h"), this.u_offsetScaleMatrix = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_offsetScaleMatrix" : "i"), this.u_offsetRotateMatrix = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_offsetRotateMatrix" : "j"), this.u_opacity = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_opacity" : "k"), this.u_image = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_image" : "l"), this.a_position = t.getAttribLocation(e, i.DEBUG_WEBGL ? "a_position" : "c"), this.a_texCoord = t.getAttribLocation(e, i.DEBUG_WEBGL ? "a_texCoord" : "d"), this.a_offsets = t.getAttribLocation(e, i.DEBUG_WEBGL ? "a_offsets" : "e"), this.a_opacity = t.getAttribLocation(e, i.DEBUG_WEBGL ? "a_opacity" : "f"), this.a_rotateWithView = t.getAttribLocation(e, i.DEBUG_WEBGL ? "a_rotateWithView" : "g"); }(t, h), this.defaultLocations = o), e.useProgram(h), t.enableVertexAttribArray(o.a_position), t.vertexAttribPointer(o.a_position, 2, f.FLOAT, !1, 32, 0), t.enableVertexAttribArray(o.a_offsets), t.vertexAttribPointer(o.a_offsets, 2, f.FLOAT, !1, 32, 8), t.enableVertexAttribArray(o.a_texCoord), t.vertexAttribPointer(o.a_texCoord, 2, f.FLOAT, !1, 32, 16), t.enableVertexAttribArray(o.a_opacity), t.vertexAttribPointer(o.a_opacity, 1, f.FLOAT, !1, 32, 24), t.enableVertexAttribArray(o.a_rotateWithView), t.vertexAttribPointer(o.a_rotateWithView, 1, f.FLOAT, !1, 32, 28), o; }, ui.prototype.shutDownProgram = function (t, e) { t.disableVertexAttribArray(e.a_position), t.disableVertexAttribArray(e.a_offsets), t.disableVertexAttribArray(e.a_texCoord), t.disableVertexAttribArray(e.a_opacity), t.disableVertexAttribArray(e.a_rotateWithView); }, ui.prototype.drawReplay = function (t, e, i, n) { var o, s, a, h = n ? this.getHitDetectionTextures() : this.getTextures(), l = n ? this.hitDetectionGroupIndices : this.groupIndices; if (r.isEmpty(i))
    for (o = 0, s = h.length, a = 0; o < s; ++o) {
        t.bindTexture(f.TEXTURE_2D, h[o]);
        var u = l[o];
        this.drawElements(t, e, a, u), a = u;
    }
else
    this.drawReplaySkipping(t, e, i, h, l); }, ui.prototype.drawReplaySkipping = function (t, e, n, r, o) { var s, a, h = 0; for (s = 0, a = r.length; s < a; ++s) {
    t.bindTexture(f.TEXTURE_2D, r[s]);
    for (var l = s > 0 ? o[s - 1] : 0, u = o[s], c = l, d = l; h < this.startIndices.length && this.startIndices[h] <= u;) {
        var p = this.startIndicesFeature[h];
        void 0 !== n[i.getUid(p).toString()] ? (c !== d && this.drawElements(t, e, c, d), d = c = h === this.startIndices.length - 1 ? u : this.startIndices[h + 1]) : d = h === this.startIndices.length - 1 ? u : this.startIndices[h + 1], h++;
    }
    c !== d && this.drawElements(t, e, c, d);
} }, ui.prototype.drawHitDetectionReplayOneByOne = function (t, e, n, r, o) { var s, a, h, l, u, c = this.startIndices.length - 1, d = this.getHitDetectionTextures(); for (s = d.length - 1; s >= 0; --s)
    for (t.bindTexture(f.TEXTURE_2D, d[s]), a = s > 0 ? this.hitDetectionGroupIndices[s - 1] : 0, l = this.hitDetectionGroupIndices[s]; c >= 0 && this.startIndices[c] >= a;) {
        if (h = this.startIndices[c], u = this.startIndicesFeature[c], void 0 === n[i.getUid(u).toString()] && u.getGeometry() && (void 0 === o || B.intersects(o, u.getGeometry().getExtent()))) {
            t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawElements(t, e, h, l);
            var p = r(u);
            if (p)
                return p;
        }
        l = h, c--;
    } }, ui.prototype.finish = function (t) { this.anchorX = void 0, this.anchorY = void 0, this.height = void 0, this.imageHeight = void 0, this.imageWidth = void 0, this.indices = null, this.opacity = void 0, this.originX = void 0, this.originY = void 0, this.rotateWithView = void 0, this.rotation = void 0, this.scale = void 0, this.vertices = null, this.width = void 0; }, ui.prototype.getTextures = function (t) { }, ui.prototype.getHitDetectionTextures = function () { }; var ci = function (t, e) { ui.call(this, t, e), this.images_ = [], this.hitDetectionImages_ = [], this.textures_ = [], this.hitDetectionTextures_ = []; }; i.inherits(ci, ui), ci.prototype.drawMultiPoint = function (t, e) { this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e); var i = t.getFlatCoordinates(), n = t.getStride(); this.drawCoordinates(i, 0, i.length, n); }, ci.prototype.drawPoint = function (t, e) { this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e); var i = t.getFlatCoordinates(), n = t.getStride(); this.drawCoordinates(i, 0, i.length, n); }, ci.prototype.finish = function (t) { var e = t.getGL(); this.groupIndices.push(this.indices.length), this.hitDetectionGroupIndices.push(this.indices.length), this.verticesBuffer = new si(this.vertices); var i = this.indices; this.indicesBuffer = new si(i); var n = {}; this.createTextures(this.textures_, this.images_, n, e), this.createTextures(this.hitDetectionTextures_, this.hitDetectionImages_, n, e), this.images_ = null, this.hitDetectionImages_ = null, ui.prototype.finish.call(this, t); }, ci.prototype.setImageStyle = function (t) { var e, n = t.getAnchor(), r = t.getImage(1), o = t.getImageSize(), s = t.getHitDetectionImage(1), a = t.getOpacity(), h = t.getOrigin(), l = t.getRotateWithView(), u = t.getRotation(), c = t.getSize(), d = t.getScale(); 0 === this.images_.length ? this.images_.push(r) : (e = this.images_[this.images_.length - 1], i.getUid(e) != i.getUid(r) && (this.groupIndices.push(this.indices.length), this.images_.push(r))), 0 === this.hitDetectionImages_.length ? this.hitDetectionImages_.push(s) : (e = this.hitDetectionImages_[this.hitDetectionImages_.length - 1], i.getUid(e) != i.getUid(s) && (this.hitDetectionGroupIndices.push(this.indices.length), this.hitDetectionImages_.push(s))), this.anchorX = n[0], this.anchorY = n[1], this.height = c[1], this.imageHeight = o[1], this.imageWidth = o[0], this.opacity = a, this.originX = h[0], this.originY = h[1], this.rotation = u, this.rotateWithView = l, this.scale = d, this.width = c[0]; }, ci.prototype.getTextures = function (t) { return t ? this.textures_.concat(this.hitDetectionTextures_) : this.textures_; }, ci.prototype.getHitDetectionTextures = function () { return this.hitDetectionTextures_; }; var di = function (t, e, i, n) { var r = i - n; return t[e] === t[r] && t[e + 1] === t[r + 1] && (i - e) / n > 3 && !!nt.linearRing(t, e, i, n); }, pi = {}; pi.fragment = new $e(i.DEBUG_WEBGL ? "precision mediump float;\nvarying float v_round;\nvarying vec2 v_roundVertex;\nvarying float v_halfWidth;\n\n\n\nuniform float u_opacity;\nuniform vec4 u_color;\nuniform vec2 u_size;\nuniform float u_pixelRatio;\n\nvoid main(void) {\n  if (v_round > 0.0) {\n    vec2 windowCoords = vec2((v_roundVertex.x + 1.0) / 2.0 * u_size.x * u_pixelRatio,\n        (v_roundVertex.y + 1.0) / 2.0 * u_size.y * u_pixelRatio);\n    if (length(windowCoords - gl_FragCoord.xy) > v_halfWidth * u_pixelRatio) {\n      discard;\n    }\n  }\n  gl_FragColor = u_color;\n  float alpha = u_color.a * u_opacity;\n  if (alpha == 0.0) {\n    discard;\n  }\n  gl_FragColor.a = alpha;\n}\n" : "precision mediump float;varying float a;varying vec2 aVertex;varying float c;uniform float m;uniform vec4 n;uniform vec2 o;uniform float p;void main(void){if(a>0.0){vec2 windowCoords=vec2((aVertex.x+1.0)/2.0*o.x*p,(aVertex.y+1.0)/2.0*o.y*p);if(length(windowCoords-gl_FragCoord.xy)>c*p){discard;}} gl_FragColor=n;float alpha=n.a*m;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"), pi.vertex = new ti(i.DEBUG_WEBGL ? "varying float v_round;\nvarying vec2 v_roundVertex;\nvarying float v_halfWidth;\n\n\nattribute vec2 a_lastPos;\nattribute vec2 a_position;\nattribute vec2 a_nextPos;\nattribute float a_direction;\n\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_offsetScaleMatrix;\nuniform mat4 u_offsetRotateMatrix;\nuniform float u_lineWidth;\nuniform float u_miterLimit;\n\nbool nearlyEquals(in float value, in float ref) {\n  float epsilon = 0.000000000001;\n  return value >= ref - epsilon && value <= ref + epsilon;\n}\n\nvoid alongNormal(out vec2 offset, in vec2 nextP, in float turnDir, in float direction) {\n  vec2 dirVect = nextP - a_position;\n  vec2 normal = normalize(vec2(-turnDir * dirVect.y, turnDir * dirVect.x));\n  offset = u_lineWidth / 2.0 * normal * direction;\n}\n\nvoid miterUp(out vec2 offset, out float round, in bool isRound, in float direction) {\n  float halfWidth = u_lineWidth / 2.0;\n  vec2 tangent = normalize(normalize(a_nextPos - a_position) + normalize(a_position - a_lastPos));\n  vec2 normal = vec2(-tangent.y, tangent.x);\n  vec2 dirVect = a_nextPos - a_position;\n  vec2 tmpNormal = normalize(vec2(-dirVect.y, dirVect.x));\n  float miterLength = abs(halfWidth / dot(normal, tmpNormal));\n  offset = normal * direction * miterLength;\n  round = 0.0;\n  if (isRound) {\n    round = 1.0;\n  } else if (miterLength > u_miterLimit + u_lineWidth) {\n    offset = halfWidth * tmpNormal * direction;\n  }\n}\n\nbool miterDown(out vec2 offset, in vec4 projPos, in mat4 offsetMatrix, in float direction) {\n  bool degenerate = false;\n  vec2 tangent = normalize(normalize(a_nextPos - a_position) + normalize(a_position - a_lastPos));\n  vec2 normal = vec2(-tangent.y, tangent.x);\n  vec2 dirVect = a_lastPos - a_position;\n  vec2 tmpNormal = normalize(vec2(-dirVect.y, dirVect.x));\n  vec2 longOffset, shortOffset, longVertex;\n  vec4 shortProjVertex;\n  float halfWidth = u_lineWidth / 2.0;\n  if (length(a_nextPos - a_position) > length(a_lastPos - a_position)) {\n    longOffset = tmpNormal * direction * halfWidth;\n    shortOffset = normalize(vec2(dirVect.y, -dirVect.x)) * direction * halfWidth;\n    longVertex = a_nextPos;\n    shortProjVertex = u_projectionMatrix * vec4(a_lastPos, 0.0, 1.0);\n  } else {\n    shortOffset = tmpNormal * direction * halfWidth;\n    longOffset = normalize(vec2(dirVect.y, -dirVect.x)) * direction * halfWidth;\n    longVertex = a_lastPos;\n    shortProjVertex = u_projectionMatrix * vec4(a_nextPos, 0.0, 1.0);\n  }\n  //Intersection algorithm based on theory by Paul Bourke (http://paulbourke.net/geometry/pointlineplane/).\n  vec4 p1 = u_projectionMatrix * vec4(longVertex, 0.0, 1.0) + offsetMatrix * vec4(longOffset, 0.0, 0.0);\n  vec4 p2 = projPos + offsetMatrix * vec4(longOffset, 0.0, 0.0);\n  vec4 p3 = shortProjVertex + offsetMatrix * vec4(-shortOffset, 0.0, 0.0);\n  vec4 p4 = shortProjVertex + offsetMatrix * vec4(shortOffset, 0.0, 0.0);\n  float denom = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);\n  float firstU = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denom;\n  float secondU = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denom;\n  float epsilon = 0.000000000001;\n  if (firstU > epsilon && firstU < 1.0 - epsilon && secondU > epsilon && secondU < 1.0 - epsilon) {\n    shortProjVertex.x = p1.x + firstU * (p2.x - p1.x);\n    shortProjVertex.y = p1.y + firstU * (p2.y - p1.y);\n    offset = shortProjVertex.xy;\n    degenerate = true;\n  } else {\n    float miterLength = abs(halfWidth / dot(normal, tmpNormal));\n    offset = normal * direction * miterLength;\n  }\n  return degenerate;\n}\n\nvoid squareCap(out vec2 offset, out float round, in bool isRound, in vec2 nextP,\n    in float turnDir, in float direction) {\n  round = 0.0;\n  vec2 dirVect = a_position - nextP;\n  vec2 firstNormal = normalize(dirVect);\n  vec2 secondNormal = vec2(turnDir * firstNormal.y * direction, -turnDir * firstNormal.x * direction);\n  vec2 hypotenuse = normalize(firstNormal - secondNormal);\n  vec2 normal = vec2(turnDir * hypotenuse.y * direction, -turnDir * hypotenuse.x * direction);\n  float length = sqrt(v_halfWidth * v_halfWidth * 2.0);\n  offset = normal * length;\n  if (isRound) {\n    round = 1.0;\n  }\n}\n\nvoid main(void) {\n  bool degenerate = false;\n  float direction = float(sign(a_direction));\n  mat4 offsetMatrix = u_offsetScaleMatrix * u_offsetRotateMatrix;\n  vec2 offset;\n  vec4 projPos = u_projectionMatrix * vec4(a_position, 0.0, 1.0);\n  bool round = nearlyEquals(mod(a_direction, 2.0), 0.0);\n\n  v_round = 0.0;\n  v_halfWidth = u_lineWidth / 2.0;\n  v_roundVertex = projPos.xy;\n\n  if (nearlyEquals(mod(a_direction, 3.0), 0.0) || nearlyEquals(mod(a_direction, 17.0), 0.0)) {\n    alongNormal(offset, a_nextPos, 1.0, direction);\n  } else if (nearlyEquals(mod(a_direction, 5.0), 0.0) || nearlyEquals(mod(a_direction, 13.0), 0.0)) {\n    alongNormal(offset, a_lastPos, -1.0, direction);\n  } else if (nearlyEquals(mod(a_direction, 23.0), 0.0)) {\n    miterUp(offset, v_round, round, direction);\n  } else if (nearlyEquals(mod(a_direction, 19.0), 0.0)) {\n    degenerate = miterDown(offset, projPos, offsetMatrix, direction);\n  } else if (nearlyEquals(mod(a_direction, 7.0), 0.0)) {\n    squareCap(offset, v_round, round, a_nextPos, 1.0, direction);\n  } else if (nearlyEquals(mod(a_direction, 11.0), 0.0)) {\n    squareCap(offset, v_round, round, a_lastPos, -1.0, direction);\n  }\n  if (!degenerate) {\n    vec4 offsets = offsetMatrix * vec4(offset, 0.0, 0.0);\n    gl_Position = projPos + offsets;\n  } else {\n    gl_Position = vec4(offset, 0.0, 1.0);\n  }\n}\n\n\n" : "varying float a;varying vec2 aVertex;varying float c;attribute vec2 d;attribute vec2 e;attribute vec2 f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;uniform float k;uniform float l;bool nearlyEquals(in float value,in float ref){float epsilon=0.000000000001;return value>=ref-epsilon&&value<=ref+epsilon;}void alongNormal(out vec2 offset,in vec2 nextP,in float turnDir,in float direction){vec2 dirVect=nextP-e;vec2 normal=normalize(vec2(-turnDir*dirVect.y,turnDir*dirVect.x));offset=k/2.0*normal*direction;}void miterUp(out vec2 offset,out float round,in bool isRound,in float direction){float halfWidth=k/2.0;vec2 tangent=normalize(normalize(f-e)+normalize(e-d));vec2 normal=vec2(-tangent.y,tangent.x);vec2 dirVect=f-e;vec2 tmpNormal=normalize(vec2(-dirVect.y,dirVect.x));float miterLength=abs(halfWidth/dot(normal,tmpNormal));offset=normal*direction*miterLength;round=0.0;if(isRound){round=1.0;}else if(miterLength>l+k){offset=halfWidth*tmpNormal*direction;}} bool miterDown(out vec2 offset,in vec4 projPos,in mat4 offsetMatrix,in float direction){bool degenerate=false;vec2 tangent=normalize(normalize(f-e)+normalize(e-d));vec2 normal=vec2(-tangent.y,tangent.x);vec2 dirVect=d-e;vec2 tmpNormal=normalize(vec2(-dirVect.y,dirVect.x));vec2 longOffset,shortOffset,longVertex;vec4 shortProjVertex;float halfWidth=k/2.0;if(length(f-e)>length(d-e)){longOffset=tmpNormal*direction*halfWidth;shortOffset=normalize(vec2(dirVect.y,-dirVect.x))*direction*halfWidth;longVertex=f;shortProjVertex=h*vec4(d,0.0,1.0);}else{shortOffset=tmpNormal*direction*halfWidth;longOffset=normalize(vec2(dirVect.y,-dirVect.x))*direction*halfWidth;longVertex=d;shortProjVertex=h*vec4(f,0.0,1.0);}vec4 p1=h*vec4(longVertex,0.0,1.0)+offsetMatrix*vec4(longOffset,0.0,0.0);vec4 p2=projPos+offsetMatrix*vec4(longOffset,0.0,0.0);vec4 p3=shortProjVertex+offsetMatrix*vec4(-shortOffset,0.0,0.0);vec4 p4=shortProjVertex+offsetMatrix*vec4(shortOffset,0.0,0.0);float denom=(p4.y-p3.y)*(p2.x-p1.x)-(p4.x-p3.x)*(p2.y-p1.y);float firstU=((p4.x-p3.x)*(p1.y-p3.y)-(p4.y-p3.y)*(p1.x-p3.x))/denom;float secondU=((p2.x-p1.x)*(p1.y-p3.y)-(p2.y-p1.y)*(p1.x-p3.x))/denom;float epsilon=0.000000000001;if(firstU>epsilon&&firstU<1.0-epsilon&&secondU>epsilon&&secondU<1.0-epsilon){shortProjVertex.x=p1.x+firstU*(p2.x-p1.x);shortProjVertex.y=p1.y+firstU*(p2.y-p1.y);offset=shortProjVertex.xy;degenerate=true;}else{float miterLength=abs(halfWidth/dot(normal,tmpNormal));offset=normal*direction*miterLength;}return degenerate;}void squareCap(out vec2 offset,out float round,in bool isRound,in vec2 nextP,in float turnDir,in float direction){round=0.0;vec2 dirVect=e-nextP;vec2 firstNormal=normalize(dirVect);vec2 secondNormal=vec2(turnDir*firstNormal.y*direction,-turnDir*firstNormal.x*direction);vec2 hypotenuse=normalize(firstNormal-secondNormal);vec2 normal=vec2(turnDir*hypotenuse.y*direction,-turnDir*hypotenuse.x*direction);float length=sqrt(c*c*2.0);offset=normal*length;if(isRound){round=1.0;}} void main(void){bool degenerate=false;float direction=float(sign(g));mat4 offsetMatrix=i*j;vec2 offset;vec4 projPos=h*vec4(e,0.0,1.0);bool round=nearlyEquals(mod(g,2.0),0.0);a=0.0;c=k/2.0;aVertex=projPos.xy;if(nearlyEquals(mod(g,3.0),0.0)||nearlyEquals(mod(g,17.0),0.0)){alongNormal(offset,f,1.0,direction);}else if(nearlyEquals(mod(g,5.0),0.0)||nearlyEquals(mod(g,13.0),0.0)){alongNormal(offset,d,-1.0,direction);}else if(nearlyEquals(mod(g,23.0),0.0)){miterUp(offset,a,round,direction);}else if(nearlyEquals(mod(g,19.0),0.0)){degenerate=miterDown(offset,projPos,offsetMatrix,direction);}else if(nearlyEquals(mod(g,7.0),0.0)){squareCap(offset,a,round,f,1.0,direction);}else if(nearlyEquals(mod(g,11.0),0.0)){squareCap(offset,a,round,d,-1.0,direction);}if(!degenerate){vec4 offsets=offsetMatrix*vec4(offset,0.0,0.0);gl_Position=projPos+offsets;}else{gl_Position=vec4(offset,0.0,1.0);}}"); var fi = function (t, e) { ri.call(this, t, e), this.defaultLocations_ = null, this.styles_ = [], this.styleIndices_ = [], this.state_ = { strokeColor: null, lineCap: void 0, lineDash: null, lineDashOffset: void 0, lineJoin: void 0, lineWidth: void 0, miterLimit: void 0, changed: !1 }; }; i.inherits(fi, ri), fi.prototype.drawCoordinates_ = function (t, e, i, n) { var r, o, s, a, h, l, u, c, d = this.vertices.length, p = this.indices.length, f = "bevel" === this.state_.lineJoin ? 0 : "miter" === this.state_.lineJoin ? 1 : 2, g = "butt" === this.state_.lineCap ? 0 : "square" === this.state_.lineCap ? 1 : 2, _ = di(t, e, i, n), v = p, y = 1; for (r = e, o = i; r < o; r += n) {
    if (h = d / 7, l = u, u = c || [t[r], t[r + 1]], r === e) {
        if (c = [t[r + n], t[r + n + 1]], i - e == 2 * n && S.equals(u, c))
            break;
        if (!_) {
            g && (d = this.addVertices_([0, 0], u, c, y * fi.Instruction_.BEGIN_LINE_CAP * g, d), d = this.addVertices_([0, 0], u, c, -y * fi.Instruction_.BEGIN_LINE_CAP * g, d), this.indices[p++] = h + 2, this.indices[p++] = h, this.indices[p++] = h + 1, this.indices[p++] = h + 1, this.indices[p++] = h + 3, this.indices[p++] = h + 2), d = this.addVertices_([0, 0], u, c, y * fi.Instruction_.BEGIN_LINE * (g || 1), d), v = (d = this.addVertices_([0, 0], u, c, -y * fi.Instruction_.BEGIN_LINE * (g || 1), d)) / 7 - 1;
            continue;
        }
        l = [t[i - 2 * n], t[i - 2 * n + 1]], s = c;
    }
    else {
        if (r === i - n) {
            if (_) {
                c = s;
                break;
            }
            l = l || [0, 0], d = this.addVertices_(l, u, [0, 0], y * fi.Instruction_.END_LINE * (g || 1), d), d = this.addVertices_(l, u, [0, 0], -y * fi.Instruction_.END_LINE * (g || 1), d), this.indices[p++] = h, this.indices[p++] = v - 1, this.indices[p++] = v, this.indices[p++] = v, this.indices[p++] = h + 1, this.indices[p++] = h, g && (d = this.addVertices_(l, u, [0, 0], y * fi.Instruction_.END_LINE_CAP * g, d), d = this.addVertices_(l, u, [0, 0], -y * fi.Instruction_.END_LINE_CAP * g, d), this.indices[p++] = h + 2, this.indices[p++] = h, this.indices[p++] = h + 1, this.indices[p++] = h + 1, this.indices[p++] = h + 3, this.indices[p++] = h + 2);
            break;
        }
        c = [t[r + n], t[r + n + 1]];
    }
    a = oi.triangleIsCounterClockwise(l[0], l[1], u[0], u[1], c[0], c[1]) ? -1 : 1, d = this.addVertices_(l, u, c, a * fi.Instruction_.BEVEL_FIRST * (f || 1), d), d = this.addVertices_(l, u, c, a * fi.Instruction_.BEVEL_SECOND * (f || 1), d), d = this.addVertices_(l, u, c, -a * fi.Instruction_.MITER_BOTTOM * (f || 1), d), r > e && (this.indices[p++] = h, this.indices[p++] = v - 1, this.indices[p++] = v, this.indices[p++] = h + 2, this.indices[p++] = h, this.indices[p++] = y * a > 0 ? v : v - 1), this.indices[p++] = h, this.indices[p++] = h + 2, this.indices[p++] = h + 1, v = h + 2, y = a, f && (d = this.addVertices_(l, u, c, a * fi.Instruction_.MITER_TOP * f, d), this.indices[p++] = h + 1, this.indices[p++] = h + 3, this.indices[p++] = h);
} _ && (h = h || d / 7, a = gt.linearRingIsClockwise([l[0], l[1], u[0], u[1], c[0], c[1]], 0, 6, 2) ? 1 : -1, d = this.addVertices_(l, u, c, a * fi.Instruction_.BEVEL_FIRST * (f || 1), d), d = this.addVertices_(l, u, c, -a * fi.Instruction_.MITER_BOTTOM * (f || 1), d), this.indices[p++] = h, this.indices[p++] = v - 1, this.indices[p++] = v, this.indices[p++] = h + 1, this.indices[p++] = h, this.indices[p++] = y * a > 0 ? v : v - 1); }, fi.prototype.addVertices_ = function (t, e, i, n, r) { return this.vertices[r++] = t[0], this.vertices[r++] = t[1], this.vertices[r++] = e[0], this.vertices[r++] = e[1], this.vertices[r++] = i[0], this.vertices[r++] = i[1], this.vertices[r++] = n, r; }, fi.prototype.isValid_ = function (t, e, i, n) { var r = i - e; if (r < 2 * n)
    return !1; if (r === 2 * n) {
    var o = [t[e], t[e + 1]], s = [t[e + n], t[e + n + 1]];
    return !S.equals(o, s);
} return !0; }, fi.prototype.drawLineString = function (t, e) { var i = t.getFlatCoordinates(), n = t.getStride(); this.isValid_(i, 0, i.length, n) && (i = j(i, 0, i.length, n, -this.origin[0], -this.origin[1]), this.state_.changed && (this.styleIndices_.push(this.indices.length), this.state_.changed = !1), this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e), this.drawCoordinates_(i, 0, i.length, n)); }, fi.prototype.drawMultiLineString = function (t, e) { var i = this.indices.length, n = t.getEnds(); n.unshift(0); var r, o, s = t.getFlatCoordinates(), a = t.getStride(); if (n.length > 1)
    for (r = 1, o = n.length; r < o; ++r)
        if (this.isValid_(s, n[r - 1], n[r], a)) {
            var h = j(s, n[r - 1], n[r], a, -this.origin[0], -this.origin[1]);
            this.drawCoordinates_(h, 0, h.length, a);
        } this.indices.length > i && (this.startIndices.push(i), this.startIndicesFeature.push(e), this.state_.changed && (this.styleIndices_.push(i), this.state_.changed = !1)); }, fi.prototype.drawPolygonCoordinates = function (t, e, i) { var n, r; if (di(t, 0, t.length, i) || (t.push(t[0]), t.push(t[1])), this.drawCoordinates_(t, 0, t.length, i), e.length)
    for (n = 0, r = e.length; n < r; ++n)
        di(e[n], 0, e[n].length, i) || (e[n].push(e[n][0]), e[n].push(e[n][1])), this.drawCoordinates_(e[n], 0, e[n].length, i); }, fi.prototype.setPolygonStyle = function (t, e) { var i = void 0 === e ? this.indices.length : e; this.startIndices.push(i), this.startIndicesFeature.push(t), this.state_.changed && (this.styleIndices_.push(i), this.state_.changed = !1); }, fi.prototype.getCurrentIndex = function () { return this.indices.length; }, fi.prototype.finish = function (t) { this.verticesBuffer = new si(this.vertices), this.indicesBuffer = new si(this.indices), this.startIndices.push(this.indices.length), 0 === this.styleIndices_.length && this.styles_.length > 0 && (this.styles_ = []), this.vertices = null, this.indices = null; }, fi.prototype.getDeleteResourcesFunction = function (t) { var e = this.verticesBuffer, i = this.indicesBuffer; return function () { t.deleteBuffer(e), t.deleteBuffer(i); }; }, fi.prototype.setUpProgram = function (t, e, n, r) { var o, s; o = pi.fragment, s = pi.vertex; var a, h = e.getProgram(o, s); return this.defaultLocations_ ? a = this.defaultLocations_ : (a = new function (t, e) { this.u_projectionMatrix = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_projectionMatrix" : "h"), this.u_offsetScaleMatrix = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_offsetScaleMatrix" : "i"), this.u_offsetRotateMatrix = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_offsetRotateMatrix" : "j"), this.u_lineWidth = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_lineWidth" : "k"), this.u_miterLimit = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_miterLimit" : "l"), this.u_opacity = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_opacity" : "m"), this.u_color = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_color" : "n"), this.u_size = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_size" : "o"), this.u_pixelRatio = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_pixelRatio" : "p"), this.a_lastPos = t.getAttribLocation(e, i.DEBUG_WEBGL ? "a_lastPos" : "d"), this.a_position = t.getAttribLocation(e, i.DEBUG_WEBGL ? "a_position" : "e"), this.a_nextPos = t.getAttribLocation(e, i.DEBUG_WEBGL ? "a_nextPos" : "f"), this.a_direction = t.getAttribLocation(e, i.DEBUG_WEBGL ? "a_direction" : "g"); }(t, h), this.defaultLocations_ = a), e.useProgram(h), t.enableVertexAttribArray(a.a_lastPos), t.vertexAttribPointer(a.a_lastPos, 2, f.FLOAT, !1, 28, 0), t.enableVertexAttribArray(a.a_position), t.vertexAttribPointer(a.a_position, 2, f.FLOAT, !1, 28, 8), t.enableVertexAttribArray(a.a_nextPos), t.vertexAttribPointer(a.a_nextPos, 2, f.FLOAT, !1, 28, 16), t.enableVertexAttribArray(a.a_direction), t.vertexAttribPointer(a.a_direction, 1, f.FLOAT, !1, 28, 24), t.uniform2fv(a.u_size, n), t.uniform1f(a.u_pixelRatio, r), a; }, fi.prototype.shutDownProgram = function (t, e) { t.disableVertexAttribArray(e.a_lastPos), t.disableVertexAttribArray(e.a_position), t.disableVertexAttribArray(e.a_nextPos), t.disableVertexAttribArray(e.a_direction); }, fi.prototype.drawReplay = function (t, e, i, n) { var o, s, a, h, l = t.getParameter(t.DEPTH_FUNC), u = t.getParameter(t.DEPTH_WRITEMASK); if (n || (t.enable(t.DEPTH_TEST), t.depthMask(!0), t.depthFunc(t.NOTEQUAL)), r.isEmpty(i))
    for (a = this.startIndices[this.startIndices.length - 1], o = this.styleIndices_.length - 1; o >= 0; --o)
        s = this.styleIndices_[o], h = this.styles_[o], this.setStrokeStyle_(t, h[0], h[1], h[2]), this.drawElements(t, e, s, a), t.clear(t.DEPTH_BUFFER_BIT), a = s;
else
    this.drawReplaySkipping_(t, e, i); n || (t.disable(t.DEPTH_TEST), t.clear(t.DEPTH_BUFFER_BIT), t.depthMask(u), t.depthFunc(l)); }, fi.prototype.drawReplaySkipping_ = function (t, e, n) { var r, o, s, a, h, l, u, c; for (u = this.startIndices.length - 2, s = o = this.startIndices[u + 1], r = this.styleIndices_.length - 1; r >= 0; --r) {
    for (a = this.styles_[r], this.setStrokeStyle_(t, a[0], a[1], a[2]), h = this.styleIndices_[r]; u >= 0 && this.startIndices[u] >= h;)
        c = this.startIndices[u], l = this.startIndicesFeature[u], n[i.getUid(l).toString()] && (o !== s && (this.drawElements(t, e, o, s), t.clear(t.DEPTH_BUFFER_BIT)), s = c), u--, o = c;
    o !== s && (this.drawElements(t, e, o, s), t.clear(t.DEPTH_BUFFER_BIT)), o = s = h;
} }, fi.prototype.drawHitDetectionReplayOneByOne = function (t, e, n, r, o) { var s, a, h, l, u, c, d; for (d = this.startIndices.length - 2, h = this.startIndices[d + 1], s = this.styleIndices_.length - 1; s >= 0; --s)
    for (l = this.styles_[s], this.setStrokeStyle_(t, l[0], l[1], l[2]), u = this.styleIndices_[s]; d >= 0 && this.startIndices[d] >= u;) {
        if (a = this.startIndices[d], c = this.startIndicesFeature[d], void 0 === n[i.getUid(c).toString()] && c.getGeometry() && (void 0 === o || B.intersects(o, c.getGeometry().getExtent()))) {
            t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawElements(t, e, a, h);
            var p = r(c);
            if (p)
                return p;
        }
        d--, h = a;
    } }, fi.prototype.setStrokeStyle_ = function (t, e, i, n) { t.uniform4fv(this.defaultLocations_.u_color, e), t.uniform1f(this.defaultLocations_.u_lineWidth, i), t.uniform1f(this.defaultLocations_.u_miterLimit, n); }, fi.prototype.setFillStrokeStyle = function (t, e) { var i = e.getLineCap(); this.state_.lineCap = void 0 !== i ? i : oi.defaultLineCap; var n = e.getLineDash(); this.state_.lineDash = n || oi.defaultLineDash; var r = e.getLineDashOffset(); this.state_.lineDashOffset = r || oi.defaultLineDashOffset; var o = e.getLineJoin(); this.state_.lineJoin = void 0 !== o ? o : oi.defaultLineJoin; var s = e.getColor(); s = s instanceof CanvasGradient || s instanceof CanvasPattern ? oi.defaultStrokeStyle : se.asArray(s).map(function (t, e) { return 3 != e ? t / 255 : t; }) || oi.defaultStrokeStyle; var a = e.getWidth(); a = void 0 !== a ? a : oi.defaultLineWidth; var h = e.getMiterLimit(); h = void 0 !== h ? h : oi.defaultMiterLimit, this.state_.strokeColor && S.equals(this.state_.strokeColor, s) && this.state_.lineWidth === a && this.state_.miterLimit === h || (this.state_.changed = !0, this.state_.strokeColor = s, this.state_.lineWidth = a, this.state_.miterLimit = h, this.styles_.push([s, a, h])); }, fi.Instruction_ = { ROUND: 2, BEGIN_LINE: 3, END_LINE: 5, BEGIN_LINE_CAP: 7, END_LINE_CAP: 11, BEVEL_FIRST: 13, BEVEL_SECOND: 17, MITER_BOTTOM: 19, MITER_TOP: 23 }; var gi = {}; gi.fragment = new $e(i.DEBUG_WEBGL ? "precision mediump float;\n\n\n\nuniform vec4 u_color;\nuniform float u_opacity;\n\nvoid main(void) {\n  gl_FragColor = u_color;\n  float alpha = u_color.a * u_opacity;\n  if (alpha == 0.0) {\n    discard;\n  }\n  gl_FragColor.a = alpha;\n}\n" : "precision mediump float;uniform vec4 e;uniform float f;void main(void){gl_FragColor=e;float alpha=e.a*f;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"), gi.vertex = new ti(i.DEBUG_WEBGL ? "\n\nattribute vec2 a_position;\n\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_offsetScaleMatrix;\nuniform mat4 u_offsetRotateMatrix;\n\nvoid main(void) {\n  gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0);\n}\n\n\n" : "attribute vec2 a;uniform mat4 b;uniform mat4 c;uniform mat4 d;void main(void){gl_Position=b*vec4(a,0.0,1.0);}"); var _i = function (t) { var e = t || {}; this.color_ = void 0 !== e.color ? e.color : null, this.lineCap_ = e.lineCap, this.lineDash_ = void 0 !== e.lineDash ? e.lineDash : null, this.lineDashOffset_ = e.lineDashOffset, this.lineJoin_ = e.lineJoin, this.miterLimit_ = e.miterLimit, this.width_ = e.width, this.checksum_ = void 0; }; _i.prototype.clone = function () { var t = this.getColor(); return new _i({ color: t && t.slice ? t.slice() : t || void 0, lineCap: this.getLineCap(), lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0, lineDashOffset: this.getLineDashOffset(), lineJoin: this.getLineJoin(), miterLimit: this.getMiterLimit(), width: this.getWidth() }); }, _i.prototype.getColor = function () { return this.color_; }, _i.prototype.getLineCap = function () { return this.lineCap_; }, _i.prototype.getLineDash = function () { return this.lineDash_; }, _i.prototype.getLineDashOffset = function () { return this.lineDashOffset_; }, _i.prototype.getLineJoin = function () { return this.lineJoin_; }, _i.prototype.getMiterLimit = function () { return this.miterLimit_; }, _i.prototype.getWidth = function () { return this.width_; }, _i.prototype.setColor = function (t) { this.color_ = t, this.checksum_ = void 0; }, _i.prototype.setLineCap = function (t) { this.lineCap_ = t, this.checksum_ = void 0; }, _i.prototype.setLineDash = function (t) { this.lineDash_ = t, this.checksum_ = void 0; }, _i.prototype.setLineDashOffset = function (t) { this.lineDashOffset_ = t, this.checksum_ = void 0; }, _i.prototype.setLineJoin = function (t) { this.lineJoin_ = t, this.checksum_ = void 0; }, _i.prototype.setMiterLimit = function (t) { this.miterLimit_ = t, this.checksum_ = void 0; }, _i.prototype.setWidth = function (t) { this.width_ = t, this.checksum_ = void 0; }, _i.prototype.getChecksum = function () { return void 0 === this.checksum_ && (this.checksum_ = "s", this.color_ ? "string" == typeof this.color_ ? this.checksum_ += this.color_ : this.checksum_ += i.getUid(this.color_).toString() : this.checksum_ += "-", this.checksum_ += "," + (void 0 !== this.lineCap_ ? this.lineCap_.toString() : "-") + "," + (this.lineDash_ ? this.lineDash_.toString() : "-") + "," + (void 0 !== this.lineDashOffset_ ? this.lineDashOffset_ : "-") + "," + (void 0 !== this.lineJoin_ ? this.lineJoin_ : "-") + "," + (void 0 !== this.miterLimit_ ? this.miterLimit_.toString() : "-") + "," + (void 0 !== this.width_ ? this.width_.toString() : "-")), this.checksum_; }; var vi = function (t) { this.first_ = void 0, this.last_ = void 0, this.head_ = void 0, this.circular_ = void 0 === t || t, this.length_ = 0; }; vi.prototype.insertItem = function (t) { var e = { prev: void 0, next: void 0, data: t }, i = this.head_; if (i) {
    var n = i.next;
    e.prev = i, e.next = n, i.next = e, n && (n.prev = e), i === this.last_ && (this.last_ = e);
}
else
    this.first_ = e, this.last_ = e, this.circular_ && (e.next = e, e.prev = e); this.head_ = e, this.length_++; }, vi.prototype.removeItem = function () { var t = this.head_; if (t) {
    var e = t.next, i = t.prev;
    e && (e.prev = i), i && (i.next = e), this.head_ = e || i, this.first_ === this.last_ ? (this.head_ = void 0, this.first_ = void 0, this.last_ = void 0) : this.first_ === t ? this.first_ = this.head_ : this.last_ === t && (this.last_ = i ? this.head_.prev : this.head_), this.length_--;
} }, vi.prototype.firstItem = function () { if (this.head_ = this.first_, this.head_)
    return this.head_.data; }, vi.prototype.lastItem = function () { if (this.head_ = this.last_, this.head_)
    return this.head_.data; }, vi.prototype.nextItem = function () { if (this.head_ && this.head_.next)
    return this.head_ = this.head_.next, this.head_.data; }, vi.prototype.getNextItem = function () { if (this.head_ && this.head_.next)
    return this.head_.next.data; }, vi.prototype.prevItem = function () { if (this.head_ && this.head_.prev)
    return this.head_ = this.head_.prev, this.head_.data; }, vi.prototype.getPrevItem = function () { if (this.head_ && this.head_.prev)
    return this.head_.prev.data; }, vi.prototype.getCurrItem = function () { if (this.head_)
    return this.head_.data; }, vi.prototype.setFirstItem = function () { this.circular_ && this.head_ && (this.first_ = this.head_, this.last_ = this.head_.prev); }, vi.prototype.concat = function (t) { if (t.head_) {
    if (this.head_) {
        var e = this.head_.next;
        this.head_.next = t.first_, t.first_.prev = this.head_, e.prev = t.last_, t.last_.next = e, this.length_ += t.length_;
    }
    else
        this.head_ = t.head_, this.first_ = t.first_, this.last_ = t.last_, this.length_ = t.length_;
    t.head_ = void 0, t.first_ = void 0, t.last_ = void 0, t.length_ = 0;
} }, vi.prototype.getLength = function () { return this.length_; }; var yi = function (t) { this.rbush_ = Ce(t), this.items_ = {}; }; yi.prototype.insert = function (t, e) { var n = { minX: t[0], minY: t[1], maxX: t[2], maxY: t[3], value: e }; this.rbush_.insert(n), this.items_[i.getUid(e)] = n; }, yi.prototype.load = function (t, e) { for (var n = new Array(e.length), r = 0, o = e.length; r < o; r++) {
    var s = t[r], a = e[r], h = { minX: s[0], minY: s[1], maxX: s[2], maxY: s[3], value: a };
    n[r] = h, this.items_[i.getUid(a)] = h;
} this.rbush_.load(n); }, yi.prototype.remove = function (t) { var e = i.getUid(t), n = this.items_[e]; return delete this.items_[e], null !== this.rbush_.remove(n); }, yi.prototype.update = function (t, e) { var n = this.items_[i.getUid(e)], r = [n.minX, n.minY, n.maxX, n.maxY]; B.equals(r, t) || (this.remove(e), this.insert(t, e)); }, yi.prototype.getAll = function () { return this.rbush_.all().map(function (t) { return t.value; }); }, yi.prototype.getInExtent = function (t) { var e = { minX: t[0], minY: t[1], maxX: t[2], maxY: t[3] }; return this.rbush_.search(e).map(function (t) { return t.value; }); }, yi.prototype.forEach = function (t, e) { return this.forEach_(this.getAll(), t, e); }, yi.prototype.forEachInExtent = function (t, e, i) { return this.forEach_(this.getInExtent(t), e, i); }, yi.prototype.forEach_ = function (t, e, i) { for (var n, r = 0, o = t.length; r < o; r++)
    if (n = e.call(i, t[r]))
        return n; return n; }, yi.prototype.isEmpty = function () { return r.isEmpty(this.items_); }, yi.prototype.clear = function () { this.rbush_.clear(), this.items_ = {}; }, yi.prototype.getExtent = function (t) { var e = this.rbush_.data; return B.createOrUpdate(e.minX, e.minY, e.maxX, e.maxY, t); }, yi.prototype.concat = function (t) { for (var e in this.rbush_.load(t.rbush_.all()), t.items_)
    this.items_[0 | e] = t.items_[0 | e]; }; var mi = function (t, e) { ri.call(this, t, e), this.lineStringReplay = new fi(t, e), this.defaultLocations_ = null, this.styles_ = [], this.styleIndices_ = [], this.state_ = { fillColor: null, changed: !1 }; }; i.inherits(mi, ri), mi.prototype.drawCoordinates_ = function (t, e, i) { var n = new vi, r = new yi; this.processFlatCoordinates_(t, i, n, r, !0); var o = this.getMaxCoords_(n); if (e.length) {
    var s, a, h = [];
    for (s = 0, a = e.length; s < a; ++s) {
        var l = { list: new vi, maxCoords: void 0, rtree: new yi };
        h.push(l), this.processFlatCoordinates_(e[s], i, l.list, l.rtree, !1), this.classifyPoints_(l.list, l.rtree, !0), l.maxCoords = this.getMaxCoords_(l.list);
    }
    for (h.sort(function (t, e) { return e.maxCoords[0] === t.maxCoords[0] ? t.maxCoords[1] - e.maxCoords[1] : e.maxCoords[0] - t.maxCoords[0]; }), s = 0; s < h.length; ++s) {
        var u, c = h[s].list, d = c.firstItem(), p = d;
        do {
            if (this.getIntersections_(p, r).length) {
                u = !0;
                break;
            }
            p = c.nextItem();
        } while (d !== p);
        u || this.bridgeHole_(c, h[s].maxCoords[0], n, o[0], r) && (r.concat(h[s].rtree), this.classifyPoints_(n, r, !1));
    }
}
else
    this.classifyPoints_(n, r, !1); this.triangulate_(n, r); }, mi.prototype.processFlatCoordinates_ = function (t, e, i, n, r) { var o, s, a, h, l, u = gt.linearRingIsClockwise(t, 0, t.length, e), c = this.vertices.length / 2, d = [], p = []; if (r === u) {
    for (h = a = this.createPoint_(t[0], t[1], c++), o = e, s = t.length; o < s; o += e)
        l = this.createPoint_(t[o], t[o + 1], c++), p.push(this.insertItem_(h, l, i)), d.push([Math.min(h.x, l.x), Math.min(h.y, l.y), Math.max(h.x, l.x), Math.max(h.y, l.y)]), h = l;
    p.push(this.insertItem_(l, a, i)), d.push([Math.min(h.x, l.x), Math.min(h.y, l.y), Math.max(h.x, l.x), Math.max(h.y, l.y)]);
}
else {
    var f = t.length - e;
    for (h = a = this.createPoint_(t[f], t[f + 1], c++), o = f - e, s = 0; o >= s; o -= e)
        l = this.createPoint_(t[o], t[o + 1], c++), p.push(this.insertItem_(h, l, i)), d.push([Math.min(h.x, l.x), Math.min(h.y, l.y), Math.max(h.x, l.x), Math.max(h.y, l.y)]), h = l;
    p.push(this.insertItem_(l, a, i)), d.push([Math.min(h.x, l.x), Math.min(h.y, l.y), Math.max(h.x, l.x), Math.max(h.y, l.y)]);
} n.load(d, p); }, mi.prototype.getMaxCoords_ = function (t) { var e = t.firstItem(), i = e, n = [i.p0.x, i.p0.y]; do {
    (i = t.nextItem()).p0.x > n[0] && (n = [i.p0.x, i.p0.y]);
} while (i !== e); return n; }, mi.prototype.classifyPoints_ = function (t, e, i) { var n = t.firstItem(), r = n, o = t.nextItem(), s = !1; do {
    var a = i ? oi.triangleIsCounterClockwise(o.p1.x, o.p1.y, r.p1.x, r.p1.y, r.p0.x, r.p0.y) : oi.triangleIsCounterClockwise(r.p0.x, r.p0.y, r.p1.x, r.p1.y, o.p1.x, o.p1.y);
    void 0 === a ? (this.removeItem_(r, o, t, e), s = !0, o === n && (n = t.getNextItem()), o = r, t.prevItem()) : r.p1.reflex !== a && (r.p1.reflex = a, s = !0), r = o, o = t.nextItem();
} while (r !== n); return s; }, mi.prototype.bridgeHole_ = function (t, e, i, n, r) { for (var o = t.firstItem(); o.p1.x !== e;)
    o = t.nextItem(); var s, a, h, l, u = o.p1, c = { x: n, y: u.y, i: -1 }, d = 1 / 0, p = this.getIntersections_({ p0: u, p1: c }, r, !0); for (s = 0, a = p.length; s < a; ++s) {
    var f = p[s], g = this.calculateIntersection_(u, c, f.p0, f.p1, !0), _ = Math.abs(u.x - g[0]);
    _ < d && void 0 !== oi.triangleIsCounterClockwise(u.x, u.y, f.p0.x, f.p0.y, f.p1.x, f.p1.y) && (d = _, l = { x: g[0], y: g[1], i: -1 }, o = f);
} if (d === 1 / 0)
    return !1; if (h = o.p1, d > 0) {
    var v = this.getPointsInTriangle_(u, l, o.p1, r);
    if (v.length) {
        var y = 1 / 0;
        for (s = 0, a = v.length; s < a; ++s) {
            var m = v[s], x = Math.atan2(u.y - m.y, c.x - m.x);
            (x < y || x === y && m.x < h.x) && (y = x, h = m);
        }
    }
} for (o = i.firstItem(); o.p1.x !== h.x || o.p1.y !== h.y;)
    o = i.nextItem(); var E = { x: u.x, y: u.y, i: u.i, reflex: void 0 }, T = { x: o.p1.x, y: o.p1.y, i: o.p1.i, reflex: void 0 }; return t.getNextItem().p0 = E, this.insertItem_(u, o.p1, t, r), this.insertItem_(T, E, t, r), o.p1 = T, t.setFirstItem(), i.concat(t), !0; }, mi.prototype.triangulate_ = function (t, e) { for (var i = !1, n = this.isSimple_(t, e); t.getLength() > 3;)
    if (n) {
        if (!this.clipEars_(t, e, n, i) && !this.classifyPoints_(t, e, i) && !this.resolveSelfIntersections_(t, e, !0))
            break;
    }
    else if (!this.clipEars_(t, e, n, i) && !this.classifyPoints_(t, e, i) && !this.resolveSelfIntersections_(t, e)) {
        if (!(n = this.isSimple_(t, e))) {
            this.splitPolygon_(t, e);
            break;
        }
        i = !this.isClockwise_(t), this.classifyPoints_(t, e, i);
    } if (3 === t.getLength()) {
    var r = this.indices.length;
    this.indices[r++] = t.getPrevItem().p0.i, this.indices[r++] = t.getCurrItem().p0.i, this.indices[r++] = t.getNextItem().p0.i;
} }, mi.prototype.clipEars_ = function (t, e, i, n) { var r, o, s, a = this.indices.length, h = t.firstItem(), l = t.getPrevItem(), u = h, c = t.nextItem(), d = t.getNextItem(), p = !1; do {
    var f;
    r = u.p0, o = u.p1, s = c.p1, !1 === o.reflex && (f = i ? 0 === this.getPointsInTriangle_(r, o, s, e, !0).length : n ? this.diagonalIsInside_(d.p1, s, o, r, l.p0) : this.diagonalIsInside_(l.p0, r, o, s, d.p1), (i || 0 === this.getIntersections_({ p0: r, p1: s }, e).length) && f && (i || !1 === r.reflex || !1 === s.reflex || gt.linearRingIsClockwise([l.p0.x, l.p0.y, r.x, r.y, o.x, o.y, s.x, s.y, d.p1.x, d.p1.y], 0, 10, 2) === !n) && (this.indices[a++] = r.i, this.indices[a++] = o.i, this.indices[a++] = s.i, this.removeItem_(u, c, t, e), c === h && (h = d), p = !0)), l = t.getPrevItem(), u = t.getCurrItem(), c = t.nextItem(), d = t.getNextItem();
} while (u !== h && t.getLength() > 3); return p; }, mi.prototype.resolveSelfIntersections_ = function (t, e, i) { var n = t.firstItem(); t.nextItem(); var r = n, o = t.nextItem(), s = !1; do {
    var a = this.calculateIntersection_(r.p0, r.p1, o.p0, o.p1, i);
    if (a) {
        var h, l = !1, u = this.vertices.length, c = this.indices.length, d = u / 2, p = t.prevItem();
        if (t.removeItem(), e.remove(p), l = p === n, i ? (a[0] === r.p0.x && a[1] === r.p0.y ? (t.prevItem(), h = r.p0, o.p0 = h, e.remove(r), l = l || r === n) : (h = o.p1, r.p1 = h, e.remove(o), l = l || o === n), t.removeItem()) : (h = this.createPoint_(a[0], a[1], d), r.p1 = h, o.p0 = h, e.update([Math.min(r.p0.x, r.p1.x), Math.min(r.p0.y, r.p1.y), Math.max(r.p0.x, r.p1.x), Math.max(r.p0.y, r.p1.y)], r), e.update([Math.min(o.p0.x, o.p1.x), Math.min(o.p0.y, o.p1.y), Math.max(o.p0.x, o.p1.x), Math.max(o.p0.y, o.p1.y)], o)), this.indices[c++] = p.p0.i, this.indices[c++] = p.p1.i, this.indices[c++] = h.i, s = !0, l)
            break;
    }
    r = t.getPrevItem(), o = t.nextItem();
} while (r !== n); return s; }, mi.prototype.isSimple_ = function (t, e) { var i = t.firstItem(), n = i; do {
    if (this.getIntersections_(n, e).length)
        return !1;
    n = t.nextItem();
} while (n !== i); return !0; }, mi.prototype.isClockwise_ = function (t) { var e = 2 * t.getLength(), i = new Array(e), n = t.firstItem(), r = n, o = 0; do {
    i[o++] = r.p0.x, i[o++] = r.p0.y, r = t.nextItem();
} while (r !== n); return gt.linearRingIsClockwise(i, 0, e, 2); }, mi.prototype.splitPolygon_ = function (t, e) { var i = t.firstItem(), n = i; do {
    var r = this.getIntersections_(n, e);
    if (r.length) {
        var o = r[0], s = this.vertices.length / 2, a = this.calculateIntersection_(n.p0, n.p1, o.p0, o.p1), h = this.createPoint_(a[0], a[1], s), l = new vi, u = new yi;
        this.insertItem_(h, n.p1, l, u), n.p1 = h, e.update([Math.min(n.p0.x, h.x), Math.min(n.p0.y, h.y), Math.max(n.p0.x, h.x), Math.max(n.p0.y, h.y)], n);
        for (var c = t.nextItem(); c !== o;)
            this.insertItem_(c.p0, c.p1, l, u), e.remove(c), t.removeItem(), c = t.getCurrItem();
        this.insertItem_(o.p0, h, l, u), o.p0 = h, e.update([Math.min(o.p1.x, h.x), Math.min(o.p1.y, h.y), Math.max(o.p1.x, h.x), Math.max(o.p1.y, h.y)], o), this.classifyPoints_(t, e, !1), this.triangulate_(t, e), this.classifyPoints_(l, u, !1), this.triangulate_(l, u);
        break;
    }
    n = t.nextItem();
} while (n !== i); }, mi.prototype.createPoint_ = function (t, e, i) { var n = this.vertices.length; return this.vertices[n++] = t, this.vertices[n++] = e, { x: t, y: e, i: i, reflex: void 0 }; }, mi.prototype.insertItem_ = function (t, e, i, n) { var r = { p0: t, p1: e }; return i.insertItem(r), n && n.insert([Math.min(t.x, e.x), Math.min(t.y, e.y), Math.max(t.x, e.x), Math.max(t.y, e.y)], r), r; }, mi.prototype.removeItem_ = function (t, e, i, n) { i.getCurrItem() === e && (i.removeItem(), t.p1 = e.p1, n.remove(e), n.update([Math.min(t.p0.x, t.p1.x), Math.min(t.p0.y, t.p1.y), Math.max(t.p0.x, t.p1.x), Math.max(t.p0.y, t.p1.y)], t)); }, mi.prototype.getPointsInTriangle_ = function (t, e, i, n, r) { var o, s, a, h, l = [], u = n.getInExtent([Math.min(t.x, e.x, i.x), Math.min(t.y, e.y, i.y), Math.max(t.x, e.x, i.x), Math.max(t.y, e.y, i.y)]); for (o = 0, s = u.length; o < s; ++o)
    for (a in u[o])
        "object" != typeof (h = u[o][a]) || r && !h.reflex || h.x === t.x && h.y === t.y || h.x === e.x && h.y === e.y || h.x === i.x && h.y === i.y || -1 !== l.indexOf(h) || !ut.linearRingContainsXY([t.x, t.y, e.x, e.y, i.x, i.y], 0, 6, 2, h.x, h.y) || l.push(h); return l; }, mi.prototype.getIntersections_ = function (t, e, i) { var n, r, o = t.p0, s = t.p1, a = e.getInExtent([Math.min(o.x, s.x), Math.min(o.y, s.y), Math.max(o.x, s.x), Math.max(o.y, s.y)]), h = []; for (n = 0, r = a.length; n < r; ++n) {
    var l = a[n];
    t !== l && (i || l.p0 !== s || l.p1 !== o) && this.calculateIntersection_(o, s, l.p0, l.p1, i) && h.push(l);
} return h; }, mi.prototype.calculateIntersection_ = function (t, e, i, n, r) { var o = (n.y - i.y) * (e.x - t.x) - (n.x - i.x) * (e.y - t.y); if (0 !== o) {
    var s = ((n.x - i.x) * (t.y - i.y) - (n.y - i.y) * (t.x - i.x)) / o, a = ((e.x - t.x) * (t.y - i.y) - (e.y - t.y) * (t.x - i.x)) / o;
    if (!r && s > oi.EPSILON && s < 1 - oi.EPSILON && a > oi.EPSILON && a < 1 - oi.EPSILON || r && s >= 0 && s <= 1 && a >= 0 && a <= 1)
        return [t.x + s * (e.x - t.x), t.y + s * (e.y - t.y)];
} }, mi.prototype.diagonalIsInside_ = function (t, e, i, n, r) { if (void 0 === e.reflex || void 0 === n.reflex)
    return !1; var o = (i.x - n.x) * (e.y - n.y) > (i.y - n.y) * (e.x - n.x), s = (r.x - n.x) * (e.y - n.y) < (r.y - n.y) * (e.x - n.x), a = (t.x - e.x) * (n.y - e.y) > (t.y - e.y) * (n.x - e.x), h = (i.x - e.x) * (n.y - e.y) < (i.y - e.y) * (n.x - e.x), l = n.reflex ? s || o : s && o, u = e.reflex ? h || a : h && a; return l && u; }, mi.prototype.drawMultiPolygon = function (t, e) { var i, n, r, o, s = t.getEndss(), a = t.getStride(), h = this.indices.length, l = this.lineStringReplay.getCurrentIndex(), u = t.getFlatCoordinates(), c = 0; for (i = 0, n = s.length; i < n; ++i) {
    var d = s[i];
    if (d.length > 0) {
        var p = j(u, c, d[0], a, -this.origin[0], -this.origin[1]);
        if (p.length) {
            var f, g = [];
            for (r = 1, o = d.length; r < o; ++r)
                d[r] !== d[r - 1] && (f = j(u, d[r - 1], d[r], a, -this.origin[0], -this.origin[1]), g.push(f));
            this.lineStringReplay.drawPolygonCoordinates(p, g, a), this.drawCoordinates_(p, g, a);
        }
    }
    c = d[d.length - 1];
} this.indices.length > h && (this.startIndices.push(h), this.startIndicesFeature.push(e), this.state_.changed && (this.styleIndices_.push(h), this.state_.changed = !1)), this.lineStringReplay.getCurrentIndex() > l && this.lineStringReplay.setPolygonStyle(e, l); }, mi.prototype.drawPolygon = function (t, e) { var i = t.getEnds(), n = t.getStride(); if (i.length > 0) {
    var r = t.getFlatCoordinates().map(Number), o = j(r, 0, i[0], n, -this.origin[0], -this.origin[1]);
    if (o.length) {
        var s, a, h, l = [];
        for (s = 1, a = i.length; s < a; ++s)
            i[s] !== i[s - 1] && (h = j(r, i[s - 1], i[s], n, -this.origin[0], -this.origin[1]), l.push(h));
        this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e), this.state_.changed && (this.styleIndices_.push(this.indices.length), this.state_.changed = !1), this.lineStringReplay.setPolygonStyle(e), this.lineStringReplay.drawPolygonCoordinates(o, l, n), this.drawCoordinates_(o, l, n);
    }
} }, mi.prototype.finish = function (t) { this.verticesBuffer = new si(this.vertices), this.indicesBuffer = new si(this.indices), this.startIndices.push(this.indices.length), this.lineStringReplay.finish(t), 0 === this.styleIndices_.length && this.styles_.length > 0 && (this.styles_ = []), this.vertices = null, this.indices = null; }, mi.prototype.getDeleteResourcesFunction = function (t) { var e = this.verticesBuffer, i = this.indicesBuffer, n = this.lineStringReplay.getDeleteResourcesFunction(t); return function () { t.deleteBuffer(e), t.deleteBuffer(i), n(); }; }, mi.prototype.setUpProgram = function (t, e, n, r) { var o, s; o = gi.fragment, s = gi.vertex; var a, h = e.getProgram(o, s); return this.defaultLocations_ ? a = this.defaultLocations_ : (a = new function (t, e) { this.u_projectionMatrix = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_projectionMatrix" : "b"), this.u_offsetScaleMatrix = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_offsetScaleMatrix" : "c"), this.u_offsetRotateMatrix = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_offsetRotateMatrix" : "d"), this.u_color = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_color" : "e"), this.u_opacity = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_opacity" : "f"), this.a_position = t.getAttribLocation(e, i.DEBUG_WEBGL ? "a_position" : "a"); }(t, h), this.defaultLocations_ = a), e.useProgram(h), t.enableVertexAttribArray(a.a_position), t.vertexAttribPointer(a.a_position, 2, f.FLOAT, !1, 8, 0), a; }, mi.prototype.shutDownProgram = function (t, e) { t.disableVertexAttribArray(e.a_position); }, mi.prototype.drawReplay = function (t, e, i, n) { var o, s, a, h, l = t.getParameter(t.DEPTH_FUNC), u = t.getParameter(t.DEPTH_WRITEMASK); if (n || (t.enable(t.DEPTH_TEST), t.depthMask(!0), t.depthFunc(t.NOTEQUAL)), r.isEmpty(i))
    for (a = this.startIndices[this.startIndices.length - 1], o = this.styleIndices_.length - 1; o >= 0; --o)
        s = this.styleIndices_[o], h = this.styles_[o], this.setFillStyle_(t, h), this.drawElements(t, e, s, a), a = s;
else
    this.drawReplaySkipping_(t, e, i); n || (t.disable(t.DEPTH_TEST), t.clear(t.DEPTH_BUFFER_BIT), t.depthMask(u), t.depthFunc(l)); }, mi.prototype.drawHitDetectionReplayOneByOne = function (t, e, n, r, o) { var s, a, h, l, u, c, d; for (d = this.startIndices.length - 2, h = this.startIndices[d + 1], s = this.styleIndices_.length - 1; s >= 0; --s)
    for (l = this.styles_[s], this.setFillStyle_(t, l), u = this.styleIndices_[s]; d >= 0 && this.startIndices[d] >= u;) {
        if (a = this.startIndices[d], c = this.startIndicesFeature[d], void 0 === n[i.getUid(c).toString()] && c.getGeometry() && (void 0 === o || B.intersects(o, c.getGeometry().getExtent()))) {
            t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawElements(t, e, a, h);
            var p = r(c);
            if (p)
                return p;
        }
        d--, h = a;
    } }, mi.prototype.drawReplaySkipping_ = function (t, e, n) { var r, o, s, a, h, l, u, c; for (u = this.startIndices.length - 2, s = o = this.startIndices[u + 1], r = this.styleIndices_.length - 1; r >= 0; --r) {
    for (a = this.styles_[r], this.setFillStyle_(t, a), h = this.styleIndices_[r]; u >= 0 && this.startIndices[u] >= h;)
        c = this.startIndices[u], l = this.startIndicesFeature[u], n[i.getUid(l).toString()] && (o !== s && (this.drawElements(t, e, o, s), t.clear(t.DEPTH_BUFFER_BIT)), s = c), u--, o = c;
    o !== s && (this.drawElements(t, e, o, s), t.clear(t.DEPTH_BUFFER_BIT)), o = s = h;
} }, mi.prototype.setFillStyle_ = function (t, e) { t.uniform4fv(this.defaultLocations_.u_color, e); }, mi.prototype.setFillStrokeStyle = function (t, e) { var i = t ? t.getColor() : [0, 0, 0, 0]; if (i = i instanceof CanvasGradient || i instanceof CanvasPattern ? oi.defaultFillStyle : se.asArray(i).map(function (t, e) { return 3 != e ? t / 255 : t; }) || oi.defaultFillStyle, this.state_.fillColor && S.equals(i, this.state_.fillColor) || (this.state_.fillColor = i, this.state_.changed = !0, this.styles_.push(i)), e)
    this.lineStringReplay.setFillStrokeStyle(null, e);
else {
    var n = new _i({ color: [0, 0, 0, 0], lineWidth: 0 });
    this.lineStringReplay.setFillStrokeStyle(null, n);
} }; var xi = function (t, e) { this.space_ = e, this.emptyBlocks_ = [{ x: 0, y: 0, width: t, height: t }], this.entries_ = {}, this.context_ = yt(t, t), this.canvas_ = this.context_.canvas; }; xi.prototype.get = function (t) { return this.entries_[t] || null; }, xi.prototype.add = function (t, e, i, n, r) { var o, s, a; for (s = 0, a = this.emptyBlocks_.length; s < a; ++s)
    if ((o = this.emptyBlocks_[s]).width >= e + this.space_ && o.height >= i + this.space_) {
        var h = { offsetX: o.x + this.space_, offsetY: o.y + this.space_, image: this.canvas_ };
        return this.entries_[t] = h, n.call(r, this.context_, o.x + this.space_, o.y + this.space_), this.split_(s, o, e + this.space_, i + this.space_), h;
    } return null; }, xi.prototype.split_ = function (t, e, i, n) { var r, o; e.width - i > e.height - n ? (r = { x: e.x + i, y: e.y, width: e.width - i, height: e.height }, o = { x: e.x, y: e.y + n, width: i, height: e.height - n }, this.updateBlocks_(t, r, o)) : (r = { x: e.x + i, y: e.y, width: e.width - i, height: n }, o = { x: e.x, y: e.y + n, width: e.width, height: e.height - n }, this.updateBlocks_(t, r, o)); }, xi.prototype.updateBlocks_ = function (t, e, i) { var n = [t, 1]; e.width > 0 && e.height > 0 && n.push(e), i.width > 0 && i.height > 0 && n.push(i), this.emptyBlocks_.splice.apply(this.emptyBlocks_, n); }; var Ei = function (t) { var e = t || {}; this.currentSize_ = void 0 !== e.initialSize ? e.initialSize : i.INITIAL_ATLAS_SIZE, this.maxSize_ = void 0 !== e.maxSize ? e.maxSize : -1 != i.MAX_ATLAS_SIZE ? i.MAX_ATLAS_SIZE : void 0 !== i.WEBGL_MAX_TEXTURE_SIZE ? i.WEBGL_MAX_TEXTURE_SIZE : 2048, this.space_ = void 0 !== e.space ? e.space : 1, this.atlases_ = [new xi(this.currentSize_, this.space_)], this.currentHitSize_ = this.currentSize_, this.hitAtlases_ = [new xi(this.currentHitSize_, this.space_)]; }; Ei.prototype.getInfo = function (t) { var e = this.getInfo_(this.atlases_, t); if (!e)
    return null; var i = this.getInfo_(this.hitAtlases_, t); return this.mergeInfos_(e, i); }, Ei.prototype.getInfo_ = function (t, e) { var i, n, r; for (n = 0, r = t.length; n < r; ++n)
    if (i = t[n].get(e))
        return i; return null; }, Ei.prototype.mergeInfos_ = function (t, e) { return { offsetX: t.offsetX, offsetY: t.offsetY, image: t.image, hitImage: e.image }; }, Ei.prototype.add = function (t, e, n, r, o, s) { if (e + this.space_ > this.maxSize_ || n + this.space_ > this.maxSize_)
    return null; var a = this.add_(!1, t, e, n, r, s); if (!a)
    return null; var h = void 0 !== o ? o : i.nullFunction, l = this.add_(!0, t, e, n, h, s); return this.mergeInfos_(a, l); }, Ei.prototype.add_ = function (t, e, i, n, r, o) { var s, a, h, l, u = t ? this.hitAtlases_ : this.atlases_; for (h = 0, l = u.length; h < l; ++h) {
    if (a = (s = u[h]).add(e, i, n, r, o))
        return a;
    var c;
    a || h !== l - 1 || (t ? (c = Math.min(2 * this.currentHitSize_, this.maxSize_), this.currentHitSize_ = c) : (c = Math.min(2 * this.currentSize_, this.maxSize_), this.currentSize_ = c), s = new xi(c, this.space_), u.push(s), ++l);
} return null; }; var Ti = function (t, e) { ui.call(this, t, e), this.images_ = [], this.textures_ = [], this.measureCanvas_ = yt(0, 0).canvas, this.state_ = { strokeColor: null, lineCap: void 0, lineDash: null, lineDashOffset: void 0, lineJoin: void 0, lineWidth: 0, miterLimit: void 0, fillColor: null, font: void 0, scale: void 0 }, this.text_ = "", this.textAlign_ = void 0, this.textBaseline_ = void 0, this.offsetX_ = void 0, this.offsetY_ = void 0, this.atlases_ = {}, this.currAtlas_ = void 0, this.scale = 1, this.opacity = 1; }; i.inherits(Ti, ui), Ti.prototype.drawText = function (t, e) { if (this.text_) {
    var n = null, r = 2, o = 2;
    switch (t.getType()) {
        case "Point":
        case "MultiPoint":
            r = (n = t.getFlatCoordinates()).length, o = t.getStride();
            break;
        case "Circle":
            n = t.getCenter();
            break;
        case "LineString":
            n = t.getFlatMidpoint();
            break;
        case "MultiLineString":
            r = (n = t.getFlatMidpoints()).length;
            break;
        case "Polygon":
            n = t.getFlatInteriorPoint();
            break;
        case "MultiPolygon": r = (n = t.getFlatInteriorPoints()).length;
    }
    this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e);
    var s, a, h, l, u, c, d, p, f = this.currAtlas_, g = this.text_.split("\n"), _ = this.getTextSize_(g), v = Math.round(_[0] * this.textAlign_ - this.offsetX_), y = Math.round(_[1] * this.textBaseline_ - this.offsetY_), m = this.state_.lineWidth / 2 * this.state_.scale;
    for (s = 0, a = g.length; s < a; ++s)
        for (u = 0, c = f.height * s, h = 0, l = (d = g[s].split("")).length; h < l; ++h) {
            if (p = f.atlas.getInfo(d[h])) {
                var x, E = p.image;
                this.anchorX = v - u, this.anchorY = y - c, this.originX = 0 === h ? p.offsetX - m : p.offsetX, this.originY = p.offsetY, this.height = f.height, this.width = 0 === h || h === d.length - 1 ? f.width[d[h]] + m : f.width[d[h]], this.imageHeight = E.height, this.imageWidth = E.width, 0 === this.images_.length ? this.images_.push(E) : (x = this.images_[this.images_.length - 1], i.getUid(x) != i.getUid(E) && (this.groupIndices.push(this.indices.length), this.images_.push(E))), this.drawText_(n, 0, r, o);
            }
            u += this.width;
        }
} }, Ti.prototype.getTextSize_ = function (t) { var e = this, i = this.currAtlas_, n = t.length * i.height; return [t.map(function (t) { var n, r, o = 0; for (n = 0, r = t.length; n < r; ++n) {
        var s = t[n];
        i.width[s] || e.addCharToAtlas_(s), o += i.width[s] ? i.width[s] : 0;
    } return o; }).reduce(function (t, e) { return Math.max(t, e); }), n]; }, Ti.prototype.drawText_ = function (t, e, i, n) { var r, o; for (r = e, o = i; r < o; r += n)
    this.drawCoordinates(t, e, i, n); }, Ti.prototype.addCharToAtlas_ = function (t) { if (1 === t.length) {
    var e = this.currAtlas_, i = this.state_, n = this.measureCanvas_.getContext("2d");
    n.font = i.font;
    var r = Math.ceil(n.measureText(t).width * i.scale);
    e.atlas.add(t, r, e.height, function (e, n, r) { e.font = i.font, e.fillStyle = i.fillColor, e.strokeStyle = i.strokeColor, e.lineWidth = i.lineWidth, e.lineCap = i.lineCap, e.lineJoin = i.lineJoin, e.miterLimit = i.miterLimit, e.textAlign = "left", e.textBaseline = "top", g.CANVAS_LINE_DASH && i.lineDash && (e.setLineDash(i.lineDash), e.lineDashOffset = i.lineDashOffset), 1 !== i.scale && e.setTransform(i.scale, 0, 0, i.scale, 0, 0), i.strokeColor && e.strokeText(t, n, r), i.fillColor && e.fillText(t, n, r); }) && (e.width[t] = r);
} }, Ti.prototype.finish = function (t) { var e = t.getGL(); this.groupIndices.push(this.indices.length), this.hitDetectionGroupIndices = this.groupIndices, this.verticesBuffer = new si(this.vertices), this.indicesBuffer = new si(this.indices), this.createTextures(this.textures_, this.images_, {}, e), this.state_ = { strokeColor: null, lineCap: void 0, lineDash: null, lineDashOffset: void 0, lineJoin: void 0, lineWidth: 0, miterLimit: void 0, fillColor: null, font: void 0, scale: void 0 }, this.text_ = "", this.textAlign_ = void 0, this.textBaseline_ = void 0, this.offsetX_ = void 0, this.offsetY_ = void 0, this.images_ = null, this.atlases_ = {}, this.currAtlas_ = void 0, ui.prototype.finish.call(this, t); }, Ti.prototype.setTextStyle = function (t) { var e = this.state_, i = t.getFill(), n = t.getStroke(); if (t && t.getText() && (i || n)) {
    if (i) {
        var r = i.getColor();
        e.fillColor = ae.asColorLike(r || oi.defaultFillStyle);
    }
    else
        e.fillColor = null;
    if (n) {
        var o = n.getColor();
        e.strokeColor = ae.asColorLike(o || oi.defaultStrokeStyle), e.lineWidth = n.getWidth() || oi.defaultLineWidth, e.lineCap = n.getLineCap() || oi.defaultLineCap, e.lineDashOffset = n.getLineDashOffset() || oi.defaultLineDashOffset, e.lineJoin = n.getLineJoin() || oi.defaultLineJoin, e.miterLimit = n.getMiterLimit() || oi.defaultMiterLimit;
        var s = n.getLineDash();
        e.lineDash = s ? s.slice() : oi.defaultLineDash;
    }
    else
        e.strokeColor = null, e.lineWidth = 0;
    e.font = t.getFont() || oi.defaultFont, e.scale = t.getScale() || 1, this.text_ = t.getText();
    var a = We.TEXT_ALIGN[t.getTextAlign()], h = We.TEXT_ALIGN[t.getTextBaseline()];
    this.textAlign_ = void 0 === a ? oi.defaultTextAlign : a, this.textBaseline_ = void 0 === h ? oi.defaultTextBaseline : h, this.offsetX_ = t.getOffsetX() || 0, this.offsetY_ = t.getOffsetY() || 0, this.rotateWithView = !!t.getRotateWithView(), this.rotation = t.getRotation() || 0, this.currAtlas_ = this.getAtlas_(e);
}
else
    this.text_ = ""; }, Ti.prototype.getAtlas_ = function (t) { var e, i = []; for (e in t)
    (t[e] || 0 === t[e]) && (Array.isArray(t[e]) ? i = i.concat(t[e]) : i.push(t[e])); var n = this.calculateHash_(i); if (!this.atlases_[n]) {
    var r = this.measureCanvas_.getContext("2d");
    r.font = t.font;
    var o = Math.ceil((1.5 * r.measureText("M").width + t.lineWidth / 2) * t.scale);
    this.atlases_[n] = { atlas: new Ei({ space: t.lineWidth + 1 }), width: {}, height: o };
} return this.atlases_[n]; }, Ti.prototype.calculateHash_ = function (t) { var e, i, n = ""; for (e = 0, i = t.length; e < i; ++e)
    n += t[e]; return n; }, Ti.prototype.getTextures = function (t) { return this.textures_; }, Ti.prototype.getHitDetectionTextures = function () { return this.textures_; }; var Ci = function (t, e, i) { Ge.call(this), this.maxExtent_ = e, this.tolerance_ = t, this.renderBuffer_ = i, this.replaysByZIndex_ = {}; }; i.inherits(Ci, Ge), Ci.prototype.addDeclutter = function (t, e) { }, Ci.prototype.getDeleteResourcesFunction = function (t) { var e, i = []; for (e in this.replaysByZIndex_) {
    var n, r = this.replaysByZIndex_[e];
    for (n in r)
        i.push(r[n].getDeleteResourcesFunction(t));
} return function () { for (var t, e = i.length, n = 0; n < e; n++)
    t = i[n].apply(this, arguments); return t; }; }, Ci.prototype.finish = function (t) { var e; for (e in this.replaysByZIndex_) {
    var i, n = this.replaysByZIndex_[e];
    for (i in n)
        n[i].finish(t);
} }, Ci.prototype.getReplay = function (t, e) { var i = void 0 !== t ? t.toString() : "0", n = this.replaysByZIndex_[i]; void 0 === n && (n = {}, this.replaysByZIndex_[i] = n); var r = n[e]; return void 0 === r && (r = new (0, Ci.BATCH_CONSTRUCTORS_[e])(this.tolerance_, this.maxExtent_), n[e] = r), r; }, Ci.prototype.isEmpty = function () { return r.isEmpty(this.replaysByZIndex_); }, Ci.prototype.replay = function (t, e, i, n, r, o, s, a) { var h, l, u, c, d, p, f = Object.keys(this.replaysByZIndex_).map(Number); for (f.sort(S.numberSafeCompareFunction), h = 0, l = f.length; h < l; ++h)
    for (d = this.replaysByZIndex_[f[h].toString()], u = 0, c = We.ORDER.length; u < c; ++u)
        void 0 !== (p = d[We.ORDER[u]]) && p.replay(t, e, i, n, r, o, s, a, void 0, !1); }, Ci.prototype.replayHitDetection_ = function (t, e, i, n, r, o, s, a, h, l, u) { var c, d, p, f, g, _, v = Object.keys(this.replaysByZIndex_).map(Number); for (v.sort(function (t, e) { return e - t; }), c = 0, d = v.length; c < d; ++c)
    for (f = this.replaysByZIndex_[v[c].toString()], p = We.ORDER.length - 1; p >= 0; --p)
        if (void 0 !== (g = f[We.ORDER[p]]) && (_ = g.replay(t, e, i, n, r, o, s, a, h, l, u)))
            return _; }, Ci.prototype.forEachFeatureAtCoordinate = function (t, e, i, n, r, o, s, a, h, l) { var u, c = e.getGL(); return c.bindFramebuffer(c.FRAMEBUFFER, e.getHitDetectionFramebuffer()), void 0 !== this.renderBuffer_ && (u = B.buffer(B.createOrUpdateFromCoordinate(t), n * this.renderBuffer_)), this.replayHitDetection_(e, t, n, r, Ci.HIT_DETECTION_SIZE_, s, a, h, function (t) { var e = new Uint8Array(4); if (c.readPixels(0, 0, 1, 1, c.RGBA, c.UNSIGNED_BYTE, e), e[3] > 0) {
    var i = l(t);
    if (i)
        return i;
} }, !0, u); }, Ci.prototype.hasFeatureAtCoordinate = function (t, e, i, n, r, o, s, a, h) { var l = e.getGL(); return l.bindFramebuffer(l.FRAMEBUFFER, e.getHitDetectionFramebuffer()), void 0 !== this.replayHitDetection_(e, t, n, r, Ci.HIT_DETECTION_SIZE_, s, a, h, function (t) { var e = new Uint8Array(4); return l.readPixels(0, 0, 1, 1, l.RGBA, l.UNSIGNED_BYTE, e), e[3] > 0; }, !1); }, Ci.HIT_DETECTION_SIZE_ = [1, 1], Ci.BATCH_CONSTRUCTORS_ = { Circle: ai, Image: ci, LineString: fi, Polygon: mi, Text: Ti }; var Si = function (t, e, i, n, r, o, s) { he.call(this), this.context_ = t, this.center_ = e, this.extent_ = o, this.pixelRatio_ = s, this.size_ = r, this.rotation_ = n, this.resolution_ = i, this.imageStyle_ = null, this.fillStyle_ = null, this.strokeStyle_ = null, this.textStyle_ = null; }; i.inherits(Si, he), Si.prototype.drawText_ = function (t, e) { var i = this.context_, n = t.getReplay(0, Ue.TEXT); n.setTextStyle(this.textStyle_), n.drawText(e, null), n.finish(i), n.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), n.getDeleteResourcesFunction(i)(); }, Si.prototype.setStyle = function (t) { this.setFillStrokeStyle(t.getFill(), t.getStroke()), this.setImageStyle(t.getImage()), this.setTextStyle(t.getText()); }, Si.prototype.drawGeometry = function (t) { switch (t.getType()) {
    case "Point":
        this.drawPoint(t, null);
        break;
    case "LineString":
        this.drawLineString(t, null);
        break;
    case "Polygon":
        this.drawPolygon(t, null);
        break;
    case "MultiPoint":
        this.drawMultiPoint(t, null);
        break;
    case "MultiLineString":
        this.drawMultiLineString(t, null);
        break;
    case "MultiPolygon":
        this.drawMultiPolygon(t, null);
        break;
    case "GeometryCollection":
        this.drawGeometryCollection(t, null);
        break;
    case "Circle": this.drawCircle(t, null);
} }, Si.prototype.drawFeature = function (t, e) { var i = e.getGeometryFunction()(t); i && B.intersects(this.extent_, i.getExtent()) && (this.setStyle(e), this.drawGeometry(i)); }, Si.prototype.drawGeometryCollection = function (t, e) { var i, n, r = t.getGeometriesArray(); for (i = 0, n = r.length; i < n; ++i)
    this.drawGeometry(r[i]); }, Si.prototype.drawPoint = function (t, e) { var i = this.context_, n = new Ci(1, this.extent_), r = n.getReplay(0, Ue.IMAGE); r.setImageStyle(this.imageStyle_), r.drawPoint(t, e), r.finish(i), r.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), r.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(n, t); }, Si.prototype.drawMultiPoint = function (t, e) { var i = this.context_, n = new Ci(1, this.extent_), r = n.getReplay(0, Ue.IMAGE); r.setImageStyle(this.imageStyle_), r.drawMultiPoint(t, e), r.finish(i), r.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), r.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(n, t); }, Si.prototype.drawLineString = function (t, e) { var i = this.context_, n = new Ci(1, this.extent_), r = n.getReplay(0, Ue.LINE_STRING); r.setFillStrokeStyle(null, this.strokeStyle_), r.drawLineString(t, e), r.finish(i), r.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), r.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(n, t); }, Si.prototype.drawMultiLineString = function (t, e) { var i = this.context_, n = new Ci(1, this.extent_), r = n.getReplay(0, Ue.LINE_STRING); r.setFillStrokeStyle(null, this.strokeStyle_), r.drawMultiLineString(t, e), r.finish(i), r.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), r.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(n, t); }, Si.prototype.drawPolygon = function (t, e) { var i = this.context_, n = new Ci(1, this.extent_), r = n.getReplay(0, Ue.POLYGON); r.setFillStrokeStyle(this.fillStyle_, this.strokeStyle_), r.drawPolygon(t, e), r.finish(i), r.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), r.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(n, t); }, Si.prototype.drawMultiPolygon = function (t, e) { var i = this.context_, n = new Ci(1, this.extent_), r = n.getReplay(0, Ue.POLYGON); r.setFillStrokeStyle(this.fillStyle_, this.strokeStyle_), r.drawMultiPolygon(t, e), r.finish(i), r.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), r.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(n, t); }, Si.prototype.drawCircle = function (t, e) { var i = this.context_, n = new Ci(1, this.extent_), r = n.getReplay(0, Ue.CIRCLE); r.setFillStrokeStyle(this.fillStyle_, this.strokeStyle_), r.drawCircle(t, e), r.finish(i), r.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), r.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(n, t); }, Si.prototype.setImageStyle = function (t) { this.imageStyle_ = t; }, Si.prototype.setFillStrokeStyle = function (t, e) { this.fillStyle_ = t, this.strokeStyle_ = e; }, Si.prototype.setTextStyle = function (t) { this.textStyle_ = t; }; var Ri = {}; Ri.fragment = new $e(i.DEBUG_WEBGL ? "precision mediump float;\nvarying vec2 v_texCoord;\n\n\nuniform float u_opacity;\nuniform sampler2D u_texture;\n\nvoid main(void) {\n  vec4 texColor = texture2D(u_texture, v_texCoord);\n  gl_FragColor.rgb = texColor.rgb;\n  gl_FragColor.a = texColor.a * u_opacity;\n}\n" : "precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}"), Ri.vertex = new ti(i.DEBUG_WEBGL ? "varying vec2 v_texCoord;\n\n\nattribute vec2 a_position;\nattribute vec2 a_texCoord;\n\nuniform mat4 u_texCoordMatrix;\nuniform mat4 u_projectionMatrix;\n\nvoid main(void) {\n  gl_Position = u_projectionMatrix * vec4(a_position, 0., 1.);\n  v_texCoord = (u_texCoordMatrix * vec4(a_texCoord, 0., 1.)).st;\n}\n\n\n" : "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}"); var Ii = function (t, e) { ue.call(this, e), this.mapRenderer = t, this.arrayBuffer_ = new si([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1]), this.texture = null, this.framebuffer = null, this.framebufferDimension = void 0, this.texCoordMatrix = tt.create(), this.projectionMatrix = tt.create(), this.tmpMat4_ = ii(), this.defaultLocations_ = null; }; i.inherits(Ii, ue), Ii.prototype.bindFramebuffer = function (t, e) { var i = this.mapRenderer.getGL(); if (void 0 === this.framebufferDimension || this.framebufferDimension != e) {
    var n = function (t, e, i) { t.isContextLost() || (t.deleteFramebuffer(e), t.deleteTexture(i)); }.bind(null, i, this.framebuffer, this.texture);
    t.postRenderFunctions.push(n);
    var r = li.createEmptyTexture(i, e, e), o = i.createFramebuffer();
    i.bindFramebuffer(f.FRAMEBUFFER, o), i.framebufferTexture2D(f.FRAMEBUFFER, f.COLOR_ATTACHMENT0, f.TEXTURE_2D, r, 0), this.texture = r, this.framebuffer = o, this.framebufferDimension = e;
}
else
    i.bindFramebuffer(f.FRAMEBUFFER, this.framebuffer); }, Ii.prototype.composeFrame = function (t, e, n) { this.dispatchComposeEvent_("precompose", n, t), n.bindBuffer(f.ARRAY_BUFFER, this.arrayBuffer_); var r, o = n.getGL(), s = Ri.fragment, a = Ri.vertex, h = n.getProgram(s, a); this.defaultLocations_ ? r = this.defaultLocations_ : (r = new function (t, e) { this.u_texCoordMatrix = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_texCoordMatrix" : "d"), this.u_projectionMatrix = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_projectionMatrix" : "e"), this.u_opacity = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_opacity" : "f"), this.u_texture = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_texture" : "g"), this.a_position = t.getAttribLocation(e, i.DEBUG_WEBGL ? "a_position" : "b"), this.a_texCoord = t.getAttribLocation(e, i.DEBUG_WEBGL ? "a_texCoord" : "c"); }(o, h), this.defaultLocations_ = r), n.useProgram(h) && (o.enableVertexAttribArray(r.a_position), o.vertexAttribPointer(r.a_position, 2, f.FLOAT, !1, 16, 0), o.enableVertexAttribArray(r.a_texCoord), o.vertexAttribPointer(r.a_texCoord, 2, f.FLOAT, !1, 16, 8), o.uniform1i(r.u_texture, 0)), o.uniformMatrix4fv(r.u_texCoordMatrix, !1, ni(this.tmpMat4_, this.getTexCoordMatrix())), o.uniformMatrix4fv(r.u_projectionMatrix, !1, ni(this.tmpMat4_, this.getProjectionMatrix())), o.uniform1f(r.u_opacity, e.opacity), o.bindTexture(f.TEXTURE_2D, this.getTexture()), o.drawArrays(f.TRIANGLE_STRIP, 0, 4), this.dispatchComposeEvent_("postcompose", n, t); }, Ii.prototype.dispatchComposeEvent_ = function (t, e, i) { var n = this.getLayer(); if (n.hasListener(t)) {
    var r = i.viewState, o = r.resolution, s = i.pixelRatio, a = i.extent, h = r.center, l = r.rotation, u = i.size, c = new Si(e, h, o, l, u, a, s), d = new ee(t, c, i, null, e);
    n.dispatchEvent(d);
} }, Ii.prototype.getTexCoordMatrix = function () { return this.texCoordMatrix; }, Ii.prototype.getTexture = function () { return this.texture; }, Ii.prototype.getProjectionMatrix = function () { return this.projectionMatrix; }, Ii.prototype.handleWebGLContextLost = function () { this.texture = null, this.framebuffer = null, this.framebufferDimension = void 0; }, Ii.prototype.prepareFrame = function (t, e, i) { }, Ii.prototype.forEachLayerAtPixel = function (t, e, i, n) { }; var Li = function (t, e) { Ii.call(this, t, e), this.image_ = null, this.hitCanvasContext_ = null, this.hitTransformationMatrix_ = null; }; i.inherits(Li, Ii), Li.handles = function (t, e) { return "webgl" === t && "IMAGE" === e.getType(); }, Li.create = function (t, e) { return new Li(t, e); }, Li.prototype.createTexture_ = function (t) { var e = t.getImage(), i = this.mapRenderer.getGL(); return li.createTexture(i, e, f.CLAMP_TO_EDGE, f.CLAMP_TO_EDGE); }, Li.prototype.forEachFeatureAtCoordinate = function (t, e, i, n, r) { var o = this.getLayer(), s = o.getSource(), a = e.viewState.resolution, h = e.viewState.rotation, l = e.skippedFeatureUids; return s.forEachFeatureAtCoordinate(t, a, h, i, l, function (t) { return n.call(r, t, o); }); }, Li.prototype.prepareFrame = function (t, e, n) { var r = this.mapRenderer.getGL(), o = t.pixelRatio, s = t.viewState, a = s.center, h = s.resolution, l = s.rotation, u = this.image_, c = this.texture, d = this.getLayer().getSource(), p = t.viewHints, f = t.extent; if (void 0 !== e.extent && (f = B.getIntersection(f, e.extent)), !p[0] && !p[1] && !B.isEmpty(f)) {
    var g = s.projection;
    if (!i.ENABLE_RASTER_REPROJECTION) {
        var _ = d.getProjection();
        _ && (g = _);
    }
    var v = d.getImage(f, h, o, g);
    if (v && this.loadImage(v) && (u = v, c = this.createTexture_(v), this.texture)) {
        var y = function (t, e) { t.isContextLost() || t.deleteTexture(e); }.bind(null, r, this.texture);
        t.postRenderFunctions.push(y);
    }
} if (u) {
    var m = this.mapRenderer.getContext().getCanvas();
    this.updateProjectionMatrix_(m.width, m.height, o, a, h, l, u.getExtent()), this.hitTransformationMatrix_ = null;
    var x = this.texCoordMatrix;
    tt.reset(x), tt.scale(x, 1, -1), tt.translate(x, 0, -1), this.image_ = u, this.texture = c, this.updateLogos(t, d);
} return !!u; }, Li.prototype.updateProjectionMatrix_ = function (t, e, i, n, r, o, s) { var a = t * r, h = e * r, l = this.projectionMatrix; tt.reset(l), tt.scale(l, 2 * i / a, 2 * i / h), tt.rotate(l, -o), tt.translate(l, s[0] - n[0], s[1] - n[1]), tt.scale(l, (s[2] - s[0]) / 2, (s[3] - s[1]) / 2), tt.translate(l, 1, 1); }, Li.prototype.hasFeatureAtCoordinate = function (t, e) { return void 0 !== this.forEachFeatureAtCoordinate(t, e, 0, N.TRUE, this); }, Li.prototype.forEachLayerAtPixel = function (t, e, n, r) { if (this.image_ && this.image_.getImage()) {
    if (this.getLayer().getSource().forEachFeatureAtCoordinate !== i.nullFunction) {
        var o = tt.apply(e.pixelToCoordinateTransform, t.slice());
        return this.forEachFeatureAtCoordinate(o, e, 0, N.TRUE, this) ? n.call(r, this.getLayer(), null) : void 0;
    }
    var s = [this.image_.getImage().width, this.image_.getImage().height];
    this.hitTransformationMatrix_ || (this.hitTransformationMatrix_ = this.getHitTransformationMatrix_(e.size, s));
    var a = tt.apply(this.hitTransformationMatrix_, t.slice());
    if (!(a[0] < 0 || a[0] > s[0] || a[1] < 0 || a[1] > s[1])) {
        this.hitCanvasContext_ || (this.hitCanvasContext_ = yt(1, 1)), this.hitCanvasContext_.clearRect(0, 0, 1, 1), this.hitCanvasContext_.drawImage(this.image_.getImage(), a[0], a[1], 1, 1, 0, 0, 1, 1);
        var h = this.hitCanvasContext_.getImageData(0, 0, 1, 1).data;
        return h[3] > 0 ? n.call(r, this.getLayer(), h) : void 0;
    }
} }, Li.prototype.getHitTransformationMatrix_ = function (t, e) { var i = tt.create(); tt.translate(i, -1, -1), tt.scale(i, 2 / t[0], 2 / t[1]), tt.translate(i, 0, t[1]), tt.scale(i, 1, -1); var n = tt.invert(this.projectionMatrix.slice()), r = tt.create(); return tt.translate(r, 0, e[1]), tt.scale(r, 1, -1), tt.scale(r, e[0] / 2, e[1] / 2), tt.translate(r, 1, 1), tt.multiply(r, n), tt.multiply(r, i), r; }; var wi = function (t, e) { _e.call(this, t, e), this.canvas_ = document.createElement("CANVAS"), this.canvas_.style.width = "100%", this.canvas_.style.height = "100%", this.canvas_.style.display = "block", this.canvas_.className = Ft.CLASS_UNSELECTABLE, t.insertBefore(this.canvas_, t.childNodes[0] || null), this.clipTileCanvasWidth_ = 0, this.clipTileCanvasHeight_ = 0, this.clipTileContext_ = yt(), this.renderedVisible_ = !0, this.gl_ = f.getContext(this.canvas_, { antialias: !0, depth: !0, failIfMajorPerformanceCaveat: !0, preserveDrawingBuffer: !1, stencil: !0 }), this.context_ = new li(this.canvas_, this.gl_), o.listen(this.canvas_, "webglcontextlost", this.handleWebGLContextLost, this), o.listen(this.canvas_, "webglcontextrestored", this.handleWebGLContextRestored, this), this.textureCache_ = new ie, this.focus_ = null, this.tileTextureQueue_ = new A(function (t) { var e = t[1], i = t[2], n = e[0] - this.focus_[0], r = e[1] - this.focus_[1]; return 65536 * Math.log(i) + Math.sqrt(n * n + r * r) / i; }.bind(this), function (t) { return t[0].getKey(); }), this.loadNextTileTexture_ = function (t, e) { if (!this.tileTextureQueue_.isEmpty()) {
    this.tileTextureQueue_.reprioritize();
    var i = this.tileTextureQueue_.dequeue(), n = i[0], r = i[3], o = i[4];
    this.bindTileTexture(n, r, o, f.LINEAR, f.LINEAR);
} return !1; }.bind(this), this.textureCacheFrameMarkerCount_ = 0, this.initializeGL_(); }; i.inherits(wi, _e), wi.handles = function (t) { return g.WEBGL && "webgl" === t; }, wi.create = function (t, e) { return new wi(t, e); }, wi.prototype.bindTileTexture = function (t, e, i, n, r) { var o = this.getGL(), s = t.getKey(); if (this.textureCache_.containsKey(s)) {
    var a = this.textureCache_.get(s);
    o.bindTexture(f.TEXTURE_2D, a.texture), a.magFilter != n && (o.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, n), a.magFilter = n), a.minFilter != r && (o.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, r), a.minFilter = r);
}
else {
    var h = o.createTexture();
    if (o.bindTexture(f.TEXTURE_2D, h), i > 0) {
        var l = this.clipTileContext_.canvas, u = this.clipTileContext_;
        this.clipTileCanvasWidth_ !== e[0] || this.clipTileCanvasHeight_ !== e[1] ? (l.width = e[0], l.height = e[1], this.clipTileCanvasWidth_ = e[0], this.clipTileCanvasHeight_ = e[1]) : u.clearRect(0, 0, e[0], e[1]), u.drawImage(t.getImage(), i, i, e[0], e[1], 0, 0, e[0], e[1]), o.texImage2D(f.TEXTURE_2D, 0, f.RGBA, f.RGBA, f.UNSIGNED_BYTE, l);
    }
    else
        o.texImage2D(f.TEXTURE_2D, 0, f.RGBA, f.RGBA, f.UNSIGNED_BYTE, t.getImage());
    o.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, n), o.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, r), o.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), o.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), this.textureCache_.set(s, { texture: h, magFilter: n, minFilter: r });
} }, wi.prototype.dispatchComposeEvent_ = function (t, e) { var i = this.getMap(); if (i.hasListener(t)) {
    var n = this.context_, r = e.extent, o = e.size, s = e.viewState, a = e.pixelRatio, h = s.resolution, l = s.center, u = s.rotation, c = new Si(n, l, h, u, o, r, a), d = new ee(t, c, e, null, n);
    i.dispatchEvent(d);
} }, wi.prototype.disposeInternal = function () { var t = this.getGL(); t.isContextLost() || this.textureCache_.forEach(function (e) { e && t.deleteTexture(e.texture); }), this.context_.dispose(), _e.prototype.disposeInternal.call(this); }, wi.prototype.expireCache_ = function (t, e) { for (var n, r = this.getGL(); this.textureCache_.getCount() - this.textureCacheFrameMarkerCount_ > i.WEBGL_TEXTURE_CACHE_HIGH_WATER_MARK;) {
    if (n = this.textureCache_.peekLast())
        r.deleteTexture(n.texture);
    else {
        if (+this.textureCache_.peekLastKey() == e.index)
            break;
        --this.textureCacheFrameMarkerCount_;
    }
    this.textureCache_.pop();
} }, wi.prototype.getContext = function () { return this.context_; }, wi.prototype.getGL = function () { return this.gl_; }, wi.prototype.getTileTextureQueue = function () { return this.tileTextureQueue_; }, wi.prototype.getType = function () { return "webgl"; }, wi.prototype.handleWebGLContextLost = function (t) { t.preventDefault(), this.textureCache_.clear(), this.textureCacheFrameMarkerCount_ = 0; var e = this.getLayerRenderers(); for (var i in e)
    e[i].handleWebGLContextLost(); }, wi.prototype.handleWebGLContextRestored = function () { this.initializeGL_(), this.getMap().render(); }, wi.prototype.initializeGL_ = function () { var t = this.gl_; t.activeTexture(f.TEXTURE0), t.blendFuncSeparate(f.SRC_ALPHA, f.ONE_MINUS_SRC_ALPHA, f.ONE, f.ONE_MINUS_SRC_ALPHA), t.disable(f.CULL_FACE), t.disable(f.DEPTH_TEST), t.disable(f.SCISSOR_TEST), t.disable(f.STENCIL_TEST); }, wi.prototype.isTileTextureLoaded = function (t) { return this.textureCache_.containsKey(t.getKey()); }, wi.prototype.renderFrame = function (t) { var e = this.getContext(), n = this.getGL(); if (n.isContextLost())
    return !1; if (!t)
    return this.renderedVisible_ && (this.canvas_.style.display = "none", this.renderedVisible_ = !1), !1; this.focus_ = t.focus, this.textureCache_.set((-t.index).toString(), null), ++this.textureCacheFrameMarkerCount_, this.dispatchComposeEvent_("precompose", t); var r = [], o = t.layerStatesArray; S.stableSort(o, _e.sortByZIndex); var s, a, h, l = t.viewState.resolution; for (s = 0, a = o.length; s < a; ++s)
    h = o[s], Mt.visibleAtResolution(h, l) && "ready" == h.sourceState && this.getLayerRenderer(h.layer).prepareFrame(t, h, e) && r.push(h); var u = t.size[0] * t.pixelRatio, c = t.size[1] * t.pixelRatio; for (this.canvas_.width == u && this.canvas_.height == c || (this.canvas_.width = u, this.canvas_.height = c), n.bindFramebuffer(f.FRAMEBUFFER, null), n.clearColor(0, 0, 0, 0), n.clear(f.COLOR_BUFFER_BIT), n.enable(f.BLEND), n.viewport(0, 0, this.canvas_.width, this.canvas_.height), s = 0, a = r.length; s < a; ++s)
    h = r[s], this.getLayerRenderer(h.layer).composeFrame(t, h, e); this.renderedVisible_ || (this.canvas_.style.display = "", this.renderedVisible_ = !0), this.calculateMatrices2D(t), this.textureCache_.getCount() - this.textureCacheFrameMarkerCount_ > i.WEBGL_TEXTURE_CACHE_HIGH_WATER_MARK && t.postRenderFunctions.push(this.expireCache_.bind(this)), this.tileTextureQueue_.isEmpty() || (t.postRenderFunctions.push(this.loadNextTileTexture_), t.animate = !0), this.dispatchComposeEvent_("postcompose", t), this.scheduleRemoveUnusedLayerRenderers(t), this.scheduleExpireIconCache(t); }, wi.prototype.forEachFeatureAtCoordinate = function (t, e, i, n, r, o, s) { var a; if (this.getGL().isContextLost())
    return !1; var h, l = e.viewState, u = e.layerStatesArray; for (h = u.length - 1; h >= 0; --h) {
    var c = u[h], d = c.layer;
    if (Mt.visibleAtResolution(c, l.resolution) && o.call(s, d) && (a = this.getLayerRenderer(d).forEachFeatureAtCoordinate(t, e, i, n, r)))
        return a;
} }, wi.prototype.hasFeatureAtCoordinate = function (t, e, i, n, r) { var o = !1; if (this.getGL().isContextLost())
    return !1; var s, a = e.viewState, h = e.layerStatesArray; for (s = h.length - 1; s >= 0; --s) {
    var l = h[s], u = l.layer;
    if (Mt.visibleAtResolution(l, a.resolution) && n.call(r, u) && (o = this.getLayerRenderer(u).hasFeatureAtCoordinate(t, e)))
        return !0;
} return o; }, wi.prototype.forEachLayerAtPixel = function (t, e, i, n, r, o) { if (this.getGL().isContextLost())
    return !1; var s, a, h = e.viewState, l = e.layerStatesArray; for (a = l.length - 1; a >= 0; --a) {
    var u = l[a], c = u.layer;
    if (Mt.visibleAtResolution(u, h.resolution) && r.call(n, c) && (s = this.getLayerRenderer(c).forEachLayerAtPixel(t, e, i, n)))
        return s;
} }; var Ai = {}; Ai.fragment = new $e(i.DEBUG_WEBGL ? "precision mediump float;\nvarying vec2 v_texCoord;\n\n\nuniform sampler2D u_texture;\n\nvoid main(void) {\n  gl_FragColor = texture2D(u_texture, v_texCoord);\n}\n" : "precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor=texture2D(e,a);}"), Ai.vertex = new ti(i.DEBUG_WEBGL ? "varying vec2 v_texCoord;\n\n\nattribute vec2 a_position;\nattribute vec2 a_texCoord;\nuniform vec4 u_tileOffset;\n\nvoid main(void) {\n  gl_Position = vec4(a_position * u_tileOffset.xy + u_tileOffset.zw, 0., 1.);\n  v_texCoord = a_texCoord;\n}\n\n\n" : "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position=vec4(b*d.xy+d.zw,0.,1.);a=c;}"); var Pi = function (t, e) { Ii.call(this, t, e), this.fragmentShader_ = Ai.fragment, this.vertexShader_ = Ai.vertex, this.locations_ = null, this.renderArrayBuffer_ = new si([0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0]), this.renderedTileRange_ = null, this.renderedFramebufferExtent_ = null, this.renderedRevision_ = -1, this.tmpSize_ = [0, 0]; }; i.inherits(Pi, Ii), Pi.handles = function (t, e) { return "webgl" === t && "TILE" === e.getType(); }, Pi.create = function (t, e) { return new Pi(t, e); }, Pi.prototype.disposeInternal = function () { this.mapRenderer.getContext().deleteBuffer(this.renderArrayBuffer_), Ii.prototype.disposeInternal.call(this); }, Pi.prototype.createLoadedTileFinder = function (t, e, i) { var n = this.mapRenderer; return function (r, o) { return t.forEachLoadedTile(e, r, o, function (t) { var e = n.isTileTextureLoaded(t); return e && (i[r] || (i[r] = {}), i[r][t.tileCoord.toString()] = t), e; }); }; }, Pi.prototype.handleWebGLContextLost = function () { Ii.prototype.handleWebGLContextLost.call(this), this.locations_ = null; }, Pi.prototype.prepareFrame = function (t, e, n) { var r, o = this.mapRenderer, s = n.getGL(), a = t.viewState, h = a.projection, l = this.getLayer(), u = l.getSource(), c = u.getTileGridForProjection(h), d = c.getZForResolution(a.resolution), p = c.getResolution(d), g = u.getTilePixelSize(d, t.pixelRatio, h), _ = g[0] / It(c.getTileSize(d), this.tmpSize_)[0], v = p / _, y = u.getTilePixelRatio(_) * u.getGutter(h), m = a.center, x = t.extent, E = c.getTileRangeForExtentAndZ(x, d); if (this.renderedTileRange_ && this.renderedTileRange_.equals(E) && this.renderedRevision_ == u.getRevision())
    r = this.renderedFramebufferExtent_;
else {
    var T = E.getSize(), C = Math.max(T[0] * g[0], T[1] * g[1]), R = F.roundUpToPowerOfTwo(C), I = v * R, L = c.getOrigin(d), w = L[0] + E.minX * g[0] * v, A = L[1] + E.minY * g[1] * v;
    r = [w, A, w + I, A + I], this.bindFramebuffer(t, R), s.viewport(0, 0, R, R), s.clearColor(0, 0, 0, 0), s.clear(f.COLOR_BUFFER_BIT), s.disable(f.BLEND);
    var P = n.getProgram(this.fragmentShader_, this.vertexShader_);
    n.useProgram(P), this.locations_ || (this.locations_ = new function (t, e) { this.u_tileOffset = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_tileOffset" : "d"), this.u_texture = t.getUniformLocation(e, i.DEBUG_WEBGL ? "u_texture" : "e"), this.a_position = t.getAttribLocation(e, i.DEBUG_WEBGL ? "a_position" : "b"), this.a_texCoord = t.getAttribLocation(e, i.DEBUG_WEBGL ? "a_texCoord" : "c"); }(s, P)), n.bindBuffer(f.ARRAY_BUFFER, this.renderArrayBuffer_), s.enableVertexAttribArray(this.locations_.a_position), s.vertexAttribPointer(this.locations_.a_position, 2, f.FLOAT, !1, 16, 0), s.enableVertexAttribArray(this.locations_.a_texCoord), s.vertexAttribPointer(this.locations_.a_texCoord, 2, f.FLOAT, !1, 16, 8), s.uniform1i(this.locations_.u_texture, 0);
    var M = {};
    M[d] = {};
    var b, D, O, k, G, U, N = this.createLoadedTileFinder(u, h, M), W = l.getUseInterimTilesOnError(), X = !0, V = B.createEmpty(), j = new ye(0, 0, 0, 0);
    for (k = E.minX; k <= E.maxX; ++k)
        for (G = E.minY; G <= E.maxY; ++G)
            if (D = u.getTile(d, k, G, _, h), void 0 === e.extent || (U = c.getTileCoordExtent(D.tileCoord, V), B.intersects(U, e.extent))) {
                if (2 == (O = D.getState()) || 4 == O || 3 == O && !W || (D = D.getInterimTile()), 2 == (O = D.getState())) {
                    if (o.isTileTextureLoaded(D)) {
                        M[d][D.tileCoord.toString()] = D;
                        continue;
                    }
                }
                else if (4 == O || 3 == O && !W)
                    continue;
                X = !1, c.forEachTileCoordParentTileRange(D.tileCoord, N, null, j, V) || (b = c.getTileCoordChildTileRange(D.tileCoord, j, V)) && N(d + 1, b);
            }
    var z = Object.keys(M).map(Number);
    z.sort(S.numberSafeCompareFunction);
    var Y, K, H, Z, q = new Float32Array(4);
    for (Y = 0, K = z.length; Y < K; ++Y)
        for (H in Z = M[z[Y]])
            D = Z[H], U = c.getTileCoordExtent(D.tileCoord, V), q[0] = 2 * (U[2] - U[0]) / I, q[1] = 2 * (U[3] - U[1]) / I, q[2] = 2 * (U[0] - r[0]) / I - 1, q[3] = 2 * (U[1] - r[1]) / I - 1, s.uniform4fv(this.locations_.u_tileOffset, q), o.bindTileTexture(D, g, y * _, f.LINEAR, f.LINEAR), s.drawArrays(f.TRIANGLE_STRIP, 0, 4);
    X ? (this.renderedTileRange_ = E, this.renderedFramebufferExtent_ = r, this.renderedRevision_ = u.getRevision()) : (this.renderedTileRange_ = null, this.renderedFramebufferExtent_ = null, this.renderedRevision_ = -1, t.animate = !0);
} this.updateUsedTiles(t.usedTiles, u, d, E); var J = o.getTileTextureQueue(); this.manageTilePyramid(t, u, c, _, h, x, d, l.getPreload(), function (t) { 2 != t.getState() || o.isTileTextureLoaded(t) || J.isKeyQueued(t.getKey()) || J.enqueue([t, c.getTileCoordCenter(t.tileCoord), c.getResolution(t.tileCoord[0]), g, y * _]); }, this), this.scheduleExpireCache(t, u), this.updateLogos(t, u); var Q = this.texCoordMatrix; return tt.reset(Q), tt.translate(Q, (Math.round(m[0] / p) * p - r[0]) / (r[2] - r[0]), (Math.round(m[1] / p) * p - r[1]) / (r[3] - r[1])), 0 !== a.rotation && tt.rotate(Q, a.rotation), tt.scale(Q, t.size[0] * a.resolution / (r[2] - r[0]), t.size[1] * a.resolution / (r[3] - r[1])), tt.translate(Q, -.5, -.5), !0; }, Pi.prototype.forEachLayerAtPixel = function (t, e, i, n) { if (this.framebuffer) {
    var r = [t[0] / e.size[0], (e.size[1] - t[1]) / e.size[1]], o = tt.apply(this.texCoordMatrix, r.slice()), s = [o[0] * this.framebufferDimension, o[1] * this.framebufferDimension], a = this.mapRenderer.getContext().getGL();
    a.bindFramebuffer(a.FRAMEBUFFER, this.framebuffer);
    var h = new Uint8Array(4);
    return a.readPixels(s[0], s[1], 1, 1, a.RGBA, a.UNSIGNED_BYTE, h), h[3] > 0 ? i.call(n, this.getLayer(), h) : void 0;
} }; var Fi = function (t, e) { Ii.call(this, t, e), this.dirty_ = !1, this.renderedRevision_ = -1, this.renderedResolution_ = NaN, this.renderedExtent_ = B.createEmpty(), this.renderedRenderOrder_ = null, this.replayGroup_ = null, this.layerState_ = null; }; i.inherits(Fi, Ii), Fi.handles = function (t, e) { return "webgl" === t && "VECTOR" === e.getType(); }, Fi.create = function (t, e) { return new Fi(t, e); }, Fi.prototype.composeFrame = function (t, e, i) { this.layerState_ = e; var n = t.viewState, r = this.replayGroup_, o = t.size, s = t.pixelRatio, a = this.mapRenderer.getGL(); r && !r.isEmpty() && (a.enable(a.SCISSOR_TEST), a.scissor(0, 0, o[0] * s, o[1] * s), r.replay(i, n.center, n.resolution, n.rotation, o, s, e.opacity, e.managed ? t.skippedFeatureUids : {}), a.disable(a.SCISSOR_TEST)); }, Fi.prototype.disposeInternal = function () { var t = this.replayGroup_; if (t) {
    var e = this.mapRenderer.getContext();
    t.getDeleteResourcesFunction(e)(), this.replayGroup_ = null;
} Ii.prototype.disposeInternal.call(this); }, Fi.prototype.forEachFeatureAtCoordinate = function (t, e, n, r, o) { if (this.replayGroup_ && this.layerState_) {
    var s = this.mapRenderer.getContext(), a = e.viewState, h = this.getLayer(), l = this.layerState_, u = {};
    return this.replayGroup_.forEachFeatureAtCoordinate(t, s, a.center, a.resolution, a.rotation, e.size, e.pixelRatio, l.opacity, {}, function (t) { var e = i.getUid(t).toString(); if (!(e in u))
        return u[e] = !0, r.call(o, t, h); });
} }, Fi.prototype.hasFeatureAtCoordinate = function (t, e) { if (this.replayGroup_ && this.layerState_) {
    var i = this.mapRenderer.getContext(), n = e.viewState, r = this.layerState_;
    return this.replayGroup_.hasFeatureAtCoordinate(t, i, n.center, n.resolution, n.rotation, e.size, e.pixelRatio, r.opacity, e.skippedFeatureUids);
} return !1; }, Fi.prototype.forEachLayerAtPixel = function (t, e, i, n) { var r = tt.apply(e.pixelToCoordinateTransform, t.slice()); return this.hasFeatureAtCoordinate(r, e) ? i.call(n, this.getLayer(), null) : void 0; }, Fi.prototype.handleStyleImageChange_ = function (t) { this.renderIfReadyAndVisible(); }, Fi.prototype.prepareFrame = function (t, e, i) { var n = this.getLayer(), r = n.getSource(); this.updateLogos(t, r); var o = t.viewHints[0], s = t.viewHints[1], a = n.getUpdateWhileAnimating(), h = n.getUpdateWhileInteracting(); if (!this.dirty_ && !a && o || !h && s)
    return !0; var l = t.extent, u = t.viewState, c = u.projection, d = u.resolution, p = t.pixelRatio, f = n.getRevision(), g = n.getRenderBuffer(), _ = n.getRenderOrder(); void 0 === _ && (_ = Ze.defaultOrder); var v = B.buffer(l, g * d); if (!this.dirty_ && this.renderedResolution_ == d && this.renderedRevision_ == f && this.renderedRenderOrder_ == _ && B.containsExtent(this.renderedExtent_, v))
    return !0; this.replayGroup_ && t.postRenderFunctions.push(this.replayGroup_.getDeleteResourcesFunction(i)), this.dirty_ = !1; var y = new Ci(Ze.getTolerance(d, p), v, n.getRenderBuffer()); r.loadFeatures(v, d, c); var m = function (t) { var e, i = t.getStyleFunction(); if (i ? e = i.call(t, d) : (i = n.getStyleFunction()) && (e = i(t, d)), e) {
    var r = this.renderFeature(t, d, p, e, y);
    this.dirty_ = this.dirty_ || r;
} }; if (_) {
    var x = [];
    r.forEachFeatureInExtent(v, function (t) { x.push(t); }, this), x.sort(_), x.forEach(m, this);
}
else
    r.forEachFeatureInExtent(v, m, this); return y.finish(i), this.renderedResolution_ = d, this.renderedRevision_ = f, this.renderedRenderOrder_ = _, this.renderedExtent_ = v, this.replayGroup_ = y, !0; }, Fi.prototype.renderFeature = function (t, e, i, n, r) { if (!n)
    return !1; var o = !1; if (Array.isArray(n))
    for (var s = n.length - 1; s >= 0; --s)
        o = Ze.renderFeature(r, t, n[s], Ze.getSquaredTolerance(e, i), this.handleStyleImageChange_, this) || o;
else
    o = Ze.renderFeature(r, t, n, Ze.getSquaredTolerance(e, i), this.handleStyleImageChange_, this) || o; return o; }, i.ENABLE_CANVAS && (Ct.register("MAP_RENDERER", ve), Ct.registerMultiple("LAYER_RENDERER", [pe, me, qe, Je])), i.ENABLE_WEBGL && (Ct.register("MAP_RENDERER", wi), Ct.registerMultiple("LAYER_RENDERER", [Li, Pi, Fi])); var Mi = function (t) { (t = r.assign({}, t)).controls || (t.controls = kt()), t.interactions || (t.interactions = Qt()), Lt.call(this, t); }; i.inherits(Mi, Lt); var bi = function (t) { var e = t || {}, i = r.assign({}, e); delete i.preload, delete i.useInterimTilesOnError, Mt.call(this, i), this.setPreload(void 0 !== e.preload ? e.preload : 0), this.setUseInterimTilesOnError(void 0 === e.useInterimTilesOnError || e.useInterimTilesOnError), this.type = "TILE"; }; i.inherits(bi, Mt), bi.prototype.getPreload = function () { return this.get("preload"); }, bi.prototype.setPreload = function (t) { this.set("preload", t); }, bi.prototype.getUseInterimTilesOnError = function () { return this.get("useInterimTilesOnError"); }, bi.prototype.setUseInterimTilesOnError = function (t) { this.set("useInterimTilesOnError", t); }; var Di = function (t, e, i) { h.call(this); var n = i || {}; this.tileCoord = t, this.state = e, this.interimTile = null, this.key = "", this.transition_ = void 0 === n.transition ? 250 : n.transition, this.transitionStarts_ = {}; }; i.inherits(Di, h), Di.prototype.changed = function () { this.dispatchEvent("change"); }, Di.prototype.getKey = function () { return this.key + "/" + this.tileCoord; }, Di.prototype.getInterimTile = function () { if (!this.interimTile)
    return this; var t = this.interimTile; do {
    if (2 == t.getState())
        return t;
    t = t.interimTile;
} while (t); return this; }, Di.prototype.refreshInterimChain = function () { if (this.interimTile) {
    var t = this.interimTile, e = this;
    do {
        if (2 == t.getState()) {
            t.interimTile = null;
            break;
        }
        1 == t.getState() ? e = t : 0 == t.getState() ? e.interimTile = t.interimTile : e = t, t = e.interimTile;
    } while (t);
} }, Di.prototype.getTileCoord = function () { return this.tileCoord; }, Di.prototype.getState = function () { return this.state; }, Di.prototype.setState = function (t) { this.state = t, this.changed(); }, Di.prototype.load = function () { }, Di.prototype.getAlpha = function (t, e) { if (!this.transition_)
    return 1; var i = this.transitionStarts_[t]; if (i) {
    if (-1 === i)
        return 1;
}
else
    i = e, this.transitionStarts_[t] = i; var n = e - i + 1e3 / 60; return n >= this.transition_ ? 1 : U.easeIn(n / this.transition_); }, Di.prototype.inTransition = function (t) { return !!this.transition_ && -1 !== this.transitionStarts_[t]; }, Di.prototype.endTransition = function (t) { this.transition_ && (this.transitionStarts_[t] = -1); }; var Oi = function (t, e, i, n, r, o) { Di.call(this, t, e, o), this.crossOrigin_ = n, this.src_ = i, this.image_ = new Image, null !== n && (this.image_.crossOrigin = n), this.imageListenerKeys_ = null, this.tileLoadFunction_ = r; }; i.inherits(Oi, Di), Oi.prototype.disposeInternal = function () { 1 == this.state && (this.unlistenImage_(), this.image_ = Oi.getBlankImage()), this.interimTile && this.interimTile.dispose(), this.state = 5, this.changed(), Di.prototype.disposeInternal.call(this); }, Oi.prototype.getImage = function () { return this.image_; }, Oi.prototype.getKey = function () { return this.src_; }, Oi.prototype.handleImageError_ = function () { this.state = 3, this.unlistenImage_(), this.image_ = Oi.getBlankImage(), this.changed(); }, Oi.prototype.handleImageLoad_ = function () { this.image_.naturalWidth && this.image_.naturalHeight ? this.state = 2 : this.state = 4, this.unlistenImage_(), this.changed(); }, Oi.prototype.load = function () { 3 == this.state && (this.state = 0, this.image_ = new Image, null !== this.crossOrigin_ && (this.image_.crossOrigin = this.crossOrigin_)), 0 == this.state && (this.state = 1, this.changed(), this.imageListenerKeys_ = [o.listenOnce(this.image_, "error", this.handleImageError_, this), o.listenOnce(this.image_, "load", this.handleImageLoad_, this)], this.tileLoadFunction_(this, this.src_)); }, Oi.prototype.unlistenImage_ = function () { this.imageListenerKeys_.forEach(o.unlistenByKey), this.imageListenerKeys_ = null; }, Oi.getBlankImage = function () { var t = yt(1, 1); return t.fillStyle = "rgba(0,0,0,0)", t.fillRect(0, 0, 1, 1), t.canvas; }; var ki = { createOrUpdate: function (t, e, i, n) { return void 0 !== n ? (n[0] = t, n[1] = e, n[2] = i, n) : [t, e, i]; }, getKeyZXY: function (t, e, i) { return t + "/" + e + "/" + i; }, getKey: function (t) { return ki.getKeyZXY(t[0], t[1], t[2]); }, fromKey: function (t) { return t.split("/").map(Number); }, hash: function (t) { return (t[1] << t[0]) + t[2]; }, quadKey: function (t) { var e, i, n = t[0], r = new Array(n), o = 1 << n - 1; for (e = 0; e < n; ++e)
        i = 48, t[1] & o && (i += 1), t[2] & o && (i += 2), r[e] = String.fromCharCode(i), o >>= 1; return r.join(""); }, withinExtentAndZ: function (t, e) { var i = t[0], n = t[1], r = t[2]; if (e.getMinZoom() > i || i > e.getMaxZoom())
        return !1; var o, s = e.getExtent(); return !(o = s ? e.getTileRangeForExtentAndZ(s, i) : e.getFullTileRange(i)) || o.containsXY(n, r); } }, Gi = function (t) { ie.call(this, t); }; i.inherits(Gi, ie), Gi.prototype.expireCache = function (t) { for (var e, i; this.canExpireCache() && !((i = (e = this.peekLast()).tileCoord[0].toString()) in t && t[i].contains(e.tileCoord));)
    this.pop().dispose(); }, Gi.prototype.pruneExceptNewestZ = function () { if (0 !== this.getCount()) {
    var t = this.peekFirstKey(), e = ki.fromKey(t)[0];
    this.forEach(function (t) { t.tileCoord[0] !== e && (this.remove(ki.getKey(t.tileCoord)), t.dispose()); }, this);
} }; var Ui = { calculateSourceResolution: function (t, e, i, n) { var r = $.transform(i, e, t), o = $.getPointResolution(e, n, i), s = e.getMetersPerUnit(); void 0 !== s && (o *= s); var a = t.getMetersPerUnit(); void 0 !== a && (o /= a); var h = t.getExtent(); if (!h || B.containsCoordinate(h, r)) {
        var l = $.getPointResolution(t, o, r) / o;
        isFinite(l) && l > 0 && (o /= l);
    } return o; }, enlargeClipPoint_: function (t, e, i, n) { var r = i - t, o = n - e, s = Math.sqrt(r * r + o * o); return [Math.round(i + r / s), Math.round(n + o / s)]; }, render: function (t, e, i, n, r, o, s, a, h, l, u) { var c = yt(Math.round(i * t), Math.round(i * e)); if (0 === h.length)
        return c.canvas; c.scale(i, i); var d = B.createEmpty(); h.forEach(function (t, e, i) { B.extend(d, t.extent); }); var p = B.getWidth(d), f = B.getHeight(d), g = yt(Math.round(i * p / n), Math.round(i * f / n)), _ = i / n; h.forEach(function (t, e, i) { var n = t.extent[0] - d[0], r = -(t.extent[3] - d[3]), o = B.getWidth(t.extent), s = B.getHeight(t.extent); g.drawImage(t.image, l, l, t.image.width - 2 * l, t.image.height - 2 * l, n * _, r * _, o * _, s * _); }); var v = B.getTopLeft(s); return a.getTriangles().forEach(function (t, e, r) { var s = t.source, a = t.target, h = s[0][0], l = s[0][1], u = s[1][0], p = s[1][1], f = s[2][0], _ = s[2][1], y = (a[0][0] - v[0]) / o, m = -(a[0][1] - v[1]) / o, x = (a[1][0] - v[0]) / o, E = -(a[1][1] - v[1]) / o, T = (a[2][0] - v[0]) / o, C = -(a[2][1] - v[1]) / o, S = h, R = l; h = 0, l = 0; var I = [[u -= S, p -= R, 0, 0, x - y], [f -= S, _ -= R, 0, 0, T - y], [0, 0, u, p, E - m], [0, 0, f, _, C - m]], L = F.solveLinearSystem(I); if (L) {
        c.save(), c.beginPath();
        var w = (y + x + T) / 3, A = (m + E + C) / 3, P = Ui.enlargeClipPoint_(w, A, y, m), M = Ui.enlargeClipPoint_(w, A, x, E), b = Ui.enlargeClipPoint_(w, A, T, C);
        c.moveTo(M[0], M[1]), c.lineTo(P[0], P[1]), c.lineTo(b[0], b[1]), c.clip(), c.transform(L[0], L[2], L[1], L[3], y, m), c.translate(d[0] - S, d[3] - R), c.scale(n / i, -n / i), c.drawImage(g.canvas, 0, 0), c.restore();
    } }), u && (c.save(), c.strokeStyle = "black", c.lineWidth = 1, a.getTriangles().forEach(function (t, e, i) { var n = t.target, r = (n[0][0] - v[0]) / o, s = -(n[0][1] - v[1]) / o, a = (n[1][0] - v[0]) / o, h = -(n[1][1] - v[1]) / o, l = (n[2][0] - v[0]) / o, u = -(n[2][1] - v[1]) / o; c.beginPath(), c.moveTo(a, h), c.lineTo(r, s), c.lineTo(l, u), c.closePath(), c.stroke(); }), c.restore()), c.canvas; } }, Bi = function (t, e, n, r, o) { this.sourceProj_ = t, this.targetProj_ = e; var s = {}, a = $.getTransform(this.targetProj_, this.sourceProj_); this.transformInv_ = function (t) { var e = t[0] + "/" + t[1]; return s[e] || (s[e] = a(t)), s[e]; }, this.maxSourceExtent_ = r, this.errorThresholdSquared_ = o * o, this.triangles_ = [], this.wrapsXInSource_ = !1, this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!r && !!this.sourceProj_.getExtent() && B.getWidth(r) == B.getWidth(this.sourceProj_.getExtent()), this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? B.getWidth(this.sourceProj_.getExtent()) : null, this.targetWorldWidth_ = this.targetProj_.getExtent() ? B.getWidth(this.targetProj_.getExtent()) : null; var h = B.getTopLeft(n), l = B.getTopRight(n), u = B.getBottomRight(n), c = B.getBottomLeft(n), d = this.transformInv_(h), p = this.transformInv_(l), f = this.transformInv_(u), g = this.transformInv_(c); if (this.addQuad_(h, l, u, c, d, p, f, g, i.RASTER_REPROJECTION_MAX_SUBDIVISION), this.wrapsXInSource_) {
    var _ = 1 / 0;
    this.triangles_.forEach(function (t, e, i) { _ = Math.min(_, t.source[0][0], t.source[1][0], t.source[2][0]); }), this.triangles_.forEach(function (t) { if (Math.max(t.source[0][0], t.source[1][0], t.source[2][0]) - _ > this.sourceWorldWidth_ / 2) {
        var e = [[t.source[0][0], t.source[0][1]], [t.source[1][0], t.source[1][1]], [t.source[2][0], t.source[2][1]]];
        e[0][0] - _ > this.sourceWorldWidth_ / 2 && (e[0][0] -= this.sourceWorldWidth_), e[1][0] - _ > this.sourceWorldWidth_ / 2 && (e[1][0] -= this.sourceWorldWidth_), e[2][0] - _ > this.sourceWorldWidth_ / 2 && (e[2][0] -= this.sourceWorldWidth_);
        var i = Math.min(e[0][0], e[1][0], e[2][0]);
        Math.max(e[0][0], e[1][0], e[2][0]) - i < this.sourceWorldWidth_ / 2 && (t.source = e);
    } }, this);
} s = {}; }; Bi.prototype.addTriangle_ = function (t, e, i, n, r, o) { this.triangles_.push({ source: [n, r, o], target: [t, e, i] }); }, Bi.prototype.addQuad_ = function (t, e, n, r, o, s, a, h, l) { var u = B.boundingExtent([o, s, a, h]), c = this.sourceWorldWidth_ ? B.getWidth(u) / this.sourceWorldWidth_ : null, d = this.sourceWorldWidth_, p = this.sourceProj_.canWrapX() && c > .5 && c < 1, f = !1; if (l > 0) {
    if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
        var g = B.boundingExtent([t, e, n, r]);
        f |= B.getWidth(g) / this.targetWorldWidth_ > i.RASTER_REPROJECTION_MAX_TRIANGLE_WIDTH;
    }
    !p && this.sourceProj_.isGlobal() && c && (f |= c > i.RASTER_REPROJECTION_MAX_TRIANGLE_WIDTH);
} if (f || !this.maxSourceExtent_ || B.intersects(u, this.maxSourceExtent_)) {
    if (!(f || isFinite(o[0]) && isFinite(o[1]) && isFinite(s[0]) && isFinite(s[1]) && isFinite(a[0]) && isFinite(a[1]) && isFinite(h[0]) && isFinite(h[1]))) {
        if (!(l > 0))
            return;
        f = !0;
    }
    if (l > 0) {
        if (!f) {
            var _, v = [(t[0] + n[0]) / 2, (t[1] + n[1]) / 2], y = this.transformInv_(v);
            _ = p ? (F.modulo(o[0], d) + F.modulo(a[0], d)) / 2 - F.modulo(y[0], d) : (o[0] + a[0]) / 2 - y[0];
            var m = (o[1] + a[1]) / 2 - y[1];
            f = _ * _ + m * m > this.errorThresholdSquared_;
        }
        if (f) {
            if (Math.abs(t[0] - n[0]) <= Math.abs(t[1] - n[1])) {
                var x = [(e[0] + n[0]) / 2, (e[1] + n[1]) / 2], E = this.transformInv_(x), T = [(r[0] + t[0]) / 2, (r[1] + t[1]) / 2], C = this.transformInv_(T);
                this.addQuad_(t, e, x, T, o, s, E, C, l - 1), this.addQuad_(T, x, n, r, C, E, a, h, l - 1);
            }
            else {
                var S = [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2], R = this.transformInv_(S), I = [(n[0] + r[0]) / 2, (n[1] + r[1]) / 2], L = this.transformInv_(I);
                this.addQuad_(t, S, I, r, o, R, L, h, l - 1), this.addQuad_(S, e, n, I, R, s, a, L, l - 1);
            }
            return;
        }
    }
    if (p) {
        if (!this.canWrapXInSource_)
            return;
        this.wrapsXInSource_ = !0;
    }
    this.addTriangle_(t, n, r, o, a, h), this.addTriangle_(t, e, n, o, s, a);
} }, Bi.prototype.calculateSourceExtent = function () { var t = B.createEmpty(); return this.triangles_.forEach(function (e, i, n) { var r = e.source; B.extendCoordinate(t, r[0]), B.extendCoordinate(t, r[1]), B.extendCoordinate(t, r[2]); }), t; }, Bi.prototype.getTriangles = function () { return this.triangles_; }; var Ni = function (t, e, n, r, o, s, a, h, l, u, c) { Di.call(this, o, 0), this.renderEdges_ = void 0 !== c && c, this.pixelRatio_ = a, this.gutter_ = h, this.canvas_ = null, this.sourceTileGrid_ = e, this.targetTileGrid_ = r, this.wrappedTileCoord_ = s || o, this.sourceTiles_ = [], this.sourcesListenerKeys_ = null, this.sourceZ_ = 0; var d = r.getTileCoordExtent(this.wrappedTileCoord_), p = this.targetTileGrid_.getExtent(), f = this.sourceTileGrid_.getExtent(), g = p ? B.getIntersection(d, p) : d; if (0 !== B.getArea(g)) {
    var _ = t.getExtent();
    _ && (f = f ? B.getIntersection(f, _) : _);
    var v = r.getResolution(this.wrappedTileCoord_[0]), y = B.getCenter(g), m = Ui.calculateSourceResolution(t, n, y, v);
    if (!isFinite(m) || m <= 0)
        this.state = 4;
    else {
        var x = void 0 !== u ? u : i.DEFAULT_RASTER_REPROJECTION_ERROR_THRESHOLD;
        if (this.triangulation_ = new Bi(t, n, g, f, m * x), 0 !== this.triangulation_.getTriangles().length) {
            this.sourceZ_ = e.getZForResolution(m);
            var E = this.triangulation_.calculateSourceExtent();
            if (f && (t.canWrapX() ? (E[1] = F.clamp(E[1], f[1], f[3]), E[3] = F.clamp(E[3], f[1], f[3])) : E = B.getIntersection(E, f)), B.getArea(E)) {
                for (var T = e.getTileRangeForExtentAndZ(E, this.sourceZ_), C = T.minX; C <= T.maxX; C++)
                    for (var S = T.minY; S <= T.maxY; S++) {
                        var R = l(this.sourceZ_, C, S, a);
                        R && this.sourceTiles_.push(R);
                    }
                0 === this.sourceTiles_.length && (this.state = 4);
            }
            else
                this.state = 4;
        }
        else
            this.state = 4;
    }
}
else
    this.state = 4; }; i.inherits(Ni, Di), Ni.prototype.disposeInternal = function () { 1 == this.state && this.unlistenSources_(), Di.prototype.disposeInternal.call(this); }, Ni.prototype.getImage = function () { return this.canvas_; }, Ni.prototype.reproject_ = function () { var t = []; if (this.sourceTiles_.forEach(function (e, i, n) { e && 2 == e.getState() && t.push({ extent: this.sourceTileGrid_.getTileCoordExtent(e.tileCoord), image: e.getImage() }); }, this), this.sourceTiles_.length = 0, 0 === t.length)
    this.state = 3;
else {
    var e = this.wrappedTileCoord_[0], i = this.targetTileGrid_.getTileSize(e), n = "number" == typeof i ? i : i[0], r = "number" == typeof i ? i : i[1], o = this.targetTileGrid_.getResolution(e), s = this.sourceTileGrid_.getResolution(this.sourceZ_), a = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
    this.canvas_ = Ui.render(n, r, this.pixelRatio_, s, this.sourceTileGrid_.getExtent(), o, a, this.triangulation_, t, this.gutter_, this.renderEdges_), this.state = 2;
} this.changed(); }, Ni.prototype.load = function () { if (0 == this.state) {
    this.state = 1, this.changed();
    var t = 0;
    this.sourcesListenerKeys_ = [], this.sourceTiles_.forEach(function (e, i, n) { var r, s = e.getState(); 0 != s && 1 != s || (t++, r = o.listen(e, "change", function (i) { var n = e.getState(); 2 != n && 3 != n && 4 != n || (o.unlistenByKey(r), 0 == --t && (this.unlistenSources_(), this.reproject_())); }, this), this.sourcesListenerKeys_.push(r)); }, this), this.sourceTiles_.forEach(function (t, e, i) { 0 == t.getState() && t.load(); }), 0 === t && setTimeout(this.reproject_.bind(this), 0);
} }, Ni.prototype.unlistenSources_ = function () { this.sourcesListenerKeys_.forEach(o.unlistenByKey), this.sourcesListenerKeys_ = null; }; var Wi = { createFromTemplate: function (t, e) { var i = /\{z\}/g, n = /\{x\}/g, r = /\{y\}/g, o = /\{-y\}/g; return function (s, a, h) { return s ? t.replace(i, s[0].toString()).replace(n, s[1].toString()).replace(r, function () { return (-s[2] - 1).toString(); }).replace(o, function () { var t = s[0], i = e.getFullTileRange(t); return w(i, 55), (i.getHeight() + s[2]).toString(); }) : void 0; }; }, createFromTemplates: function (t, e) { for (var i = t.length, n = new Array(i), r = 0; r < i; ++r)
        n[r] = Wi.createFromTemplate(t[r], e); return Wi.createFromTileUrlFunctions(n); }, createFromTileUrlFunctions: function (t) { return 1 === t.length ? t[0] : function (e, i, n) { if (e) {
        var r = ki.hash(e), o = F.modulo(r, t.length);
        return t[o](e, i, n);
    } }; }, nullTileUrlFunction: function (t, e, i) { }, expandUrl: function (t) { var e = [], i = /\{([a-z])-([a-z])\}/.exec(t); if (i) {
        var n, r = i[1].charCodeAt(0), o = i[2].charCodeAt(0);
        for (n = r; n <= o; ++n)
            e.push(t.replace(i[0], String.fromCharCode(n)));
        return e;
    } if (i = i = /\{(\d+)-(\d+)\}/.exec(t)) {
        for (var s = parseInt(i[2], 10), a = parseInt(i[1], 10); a <= s; a++)
            e.push(t.replace(i[0], a.toString()));
        return e;
    } return e.push(t), e; } }, Xi = function (t) { var e; if (this.minZoom = void 0 !== t.minZoom ? t.minZoom : 0, this.resolutions_ = t.resolutions, w(S.isSorted(this.resolutions_, function (t, e) { return e - t; }, !0), 17), !t.origins)
    for (var n = 0, r = this.resolutions_.length - 1; n < r; ++n)
        if (e) {
            if (this.resolutions_[n] / this.resolutions_[n + 1] !== e) {
                e = void 0;
                break;
            }
        }
        else
            e = this.resolutions_[n] / this.resolutions_[n + 1]; this.zoomFactor_ = e, this.maxZoom = this.resolutions_.length - 1, this.origin_ = void 0 !== t.origin ? t.origin : null, this.origins_ = null, void 0 !== t.origins && (this.origins_ = t.origins, w(this.origins_.length == this.resolutions_.length, 20)); var o = t.extent; void 0 === o || this.origin_ || this.origins_ || (this.origin_ = B.getTopLeft(o)), w(!this.origin_ && this.origins_ || this.origin_ && !this.origins_, 18), this.tileSizes_ = null, void 0 !== t.tileSizes && (this.tileSizes_ = t.tileSizes, w(this.tileSizes_.length == this.resolutions_.length, 19)), this.tileSize_ = void 0 !== t.tileSize ? t.tileSize : this.tileSizes_ ? null : i.DEFAULT_TILE_SIZE, w(!this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_, 22), this.extent_ = void 0 !== o ? o : null, this.fullTileRanges_ = null, this.tmpSize_ = [0, 0], void 0 !== t.sizes ? this.fullTileRanges_ = t.sizes.map(function (t, e) { return new ye(Math.min(0, t[0]), Math.max(t[0] - 1, -1), Math.min(0, t[1]), Math.max(t[1] - 1, -1)); }, this) : o && this.calculateTileRanges_(o); }; Xi.tmpTileCoord_ = [0, 0, 0], Xi.prototype.forEachTileCoord = function (t, e, i) { for (var n = this.getTileRangeForExtentAndZ(t, e), r = n.minX, o = n.maxX; r <= o; ++r)
    for (var s = n.minY, a = n.maxY; s <= a; ++s)
        i([e, r, s]); }, Xi.prototype.forEachTileCoordParentTileRange = function (t, e, i, n, r) { var o, s, a, h = null, l = t[0] - 1; for (2 === this.zoomFactor_ ? (s = t[1], a = t[2]) : h = this.getTileCoordExtent(t, r); l >= this.minZoom;) {
    if (2 === this.zoomFactor_ ? (s = Math.floor(s / 2), a = Math.floor(a / 2), o = ye.createOrUpdate(s, s, a, a, n)) : o = this.getTileRangeForExtentAndZ(h, l, n), e.call(i, l, o))
        return !0;
    --l;
} return !1; }, Xi.prototype.getExtent = function () { return this.extent_; }, Xi.prototype.getMaxZoom = function () { return this.maxZoom; }, Xi.prototype.getMinZoom = function () { return this.minZoom; }, Xi.prototype.getOrigin = function (t) { return this.origin_ ? this.origin_ : this.origins_[t]; }, Xi.prototype.getResolution = function (t) { return this.resolutions_[t]; }, Xi.prototype.getResolutions = function () { return this.resolutions_; }, Xi.prototype.getTileCoordChildTileRange = function (t, e, i) { if (t[0] < this.maxZoom) {
    if (2 === this.zoomFactor_) {
        var n = 2 * t[1], r = 2 * t[2];
        return ye.createOrUpdate(n, n + 1, r, r + 1, e);
    }
    var o = this.getTileCoordExtent(t, i);
    return this.getTileRangeForExtentAndZ(o, t[0] + 1, e);
} return null; }, Xi.prototype.getTileRangeExtent = function (t, e, i) { var n = this.getOrigin(t), r = this.getResolution(t), o = It(this.getTileSize(t), this.tmpSize_), s = n[0] + e.minX * o[0] * r, a = n[0] + (e.maxX + 1) * o[0] * r, h = n[1] + e.minY * o[1] * r, l = n[1] + (e.maxY + 1) * o[1] * r; return B.createOrUpdate(s, h, a, l, i); }, Xi.prototype.getTileRangeForExtentAndZ = function (t, e, i) { var n = Xi.tmpTileCoord_; this.getTileCoordForXYAndZ_(t[0], t[1], e, !1, n); var r = n[1], o = n[2]; return this.getTileCoordForXYAndZ_(t[2], t[3], e, !0, n), ye.createOrUpdate(r, n[1], o, n[2], i); }, Xi.prototype.getTileCoordCenter = function (t) { var e = this.getOrigin(t[0]), i = this.getResolution(t[0]), n = It(this.getTileSize(t[0]), this.tmpSize_); return [e[0] + (t[1] + .5) * n[0] * i, e[1] + (t[2] + .5) * n[1] * i]; }, Xi.prototype.getTileCoordExtent = function (t, e) { var i = this.getOrigin(t[0]), n = this.getResolution(t[0]), r = It(this.getTileSize(t[0]), this.tmpSize_), o = i[0] + t[1] * r[0] * n, s = i[1] + t[2] * r[1] * n, a = o + r[0] * n, h = s + r[1] * n; return B.createOrUpdate(o, s, a, h, e); }, Xi.prototype.getTileCoordForCoordAndResolution = function (t, e, i) { return this.getTileCoordForXYAndResolution_(t[0], t[1], e, !1, i); }, Xi.prototype.getTileCoordForXYAndResolution_ = function (t, e, i, n, r) { var o = this.getZForResolution(i), s = i / this.getResolution(o), a = this.getOrigin(o), h = It(this.getTileSize(o), this.tmpSize_), l = n ? .5 : 0, u = n ? 0 : .5, c = Math.floor((t - a[0]) / i + l), d = Math.floor((e - a[1]) / i + u), p = s * c / h[0], f = s * d / h[1]; return n ? (p = Math.ceil(p) - 1, f = Math.ceil(f) - 1) : (p = Math.floor(p), f = Math.floor(f)), ki.createOrUpdate(o, p, f, r); }, Xi.prototype.getTileCoordForXYAndZ_ = function (t, e, i, n, r) { var o = this.getOrigin(i), s = this.getResolution(i), a = It(this.getTileSize(i), this.tmpSize_), h = n ? .5 : 0, l = n ? 0 : .5, u = Math.floor((t - o[0]) / s + h), c = Math.floor((e - o[1]) / s + l), d = u / a[0], p = c / a[1]; return n ? (d = Math.ceil(d) - 1, p = Math.ceil(p) - 1) : (d = Math.floor(d), p = Math.floor(p)), ki.createOrUpdate(i, d, p, r); }, Xi.prototype.getTileCoordForCoordAndZ = function (t, e, i) { return this.getTileCoordForXYAndZ_(t[0], t[1], e, !1, i); }, Xi.prototype.getTileCoordResolution = function (t) { return this.resolutions_[t[0]]; }, Xi.prototype.getTileSize = function (t) { return this.tileSize_ ? this.tileSize_ : this.tileSizes_[t]; }, Xi.prototype.getFullTileRange = function (t) { return this.fullTileRanges_ ? this.fullTileRanges_[t] : null; }, Xi.prototype.getZForResolution = function (t, e) { var i = S.linearFindNearest(this.resolutions_, t, e || 0); return F.clamp(i, this.minZoom, this.maxZoom); }, Xi.prototype.calculateTileRanges_ = function (t) { for (var e = this.resolutions_.length, i = new Array(e), n = this.minZoom; n < e; ++n)
    i[n] = this.getTileRangeForExtentAndZ(t, n); this.fullTileRanges_ = i; }; var Vi = { getForProjection: function (t) { var e = t.getDefaultTileGrid(); return e || (e = Vi.createForProjection(t), t.setDefaultTileGrid(e)), e; }, wrapX: function (t, e, i) { var n = e[0], r = t.getTileCoordCenter(e), o = Vi.extentFromProjection(i); if (B.containsCoordinate(o, r))
        return e; var s = B.getWidth(o), a = Math.ceil((o[0] - r[0]) / s); return r[0] += s * a, t.getTileCoordForCoordAndZ(r, n); }, createForExtent: function (t, e, i, n) { var r = void 0 !== n ? n : "top-left", o = Vi.resolutionsFromExtent(t, e, i); return new Xi({ extent: t, origin: B.getCorner(t, r), resolutions: o, tileSize: i }); }, createXYZ: function (t) { var e = {}; return r.assign(e, void 0 !== t ? t : {}), void 0 === e.extent && (e.extent = $.get("EPSG:3857").getExtent()), e.resolutions = Vi.resolutionsFromExtent(e.extent, e.maxZoom, e.tileSize), delete e.maxZoom, new Xi(e); }, resolutionsFromExtent: function (t, e, n) { for (var r = void 0 !== e ? e : i.DEFAULT_MAX_ZOOM, o = B.getHeight(t), s = B.getWidth(t), a = It(void 0 !== n ? n : i.DEFAULT_TILE_SIZE), h = Math.max(s / a[0], o / a[1]), l = r + 1, u = new Array(l), c = 0; c < l; ++c)
        u[c] = h / Math.pow(2, c); return u; }, createForProjection: function (t, e, i, n) { var r = Vi.extentFromProjection(t); return Vi.createForExtent(r, e, i, n); }, extentFromProjection: function (t) { var e = (t = $.get(t)).getExtent(); if (!e) {
        var i = 180 * $.METERS_PER_UNIT[Y.DEGREES] / t.getMetersPerUnit();
        e = B.createOrUpdate(-i, -i, i, i);
    } return e; } }, ji = function (t) { this.html_ = t.html, this.tileRanges_ = t.tileRanges ? t.tileRanges : null; }; ji.prototype.getHTML = function () { return this.html_; }, ji.prototype.intersectsAnyTileRange = function (t, e, i) { if (!this.tileRanges_)
    return !0; var n, r, o, s; for (s in t) {
    var a;
    if (s in this.tileRanges_)
        for (o = t[s], n = 0, r = this.tileRanges_[s].length; n < r; ++n) {
            if ((a = this.tileRanges_[s][n]).intersects(o))
                return !0;
            var h = e.getTileRangeForExtentAndZ(Vi.extentFromProjection(i), parseInt(s, 10)), l = h.getWidth();
            if (o.minX < h.minX || o.maxX > h.maxX) {
                if (a.intersects(new ye(F.modulo(o.minX, l), F.modulo(o.maxX, l), o.minY, o.maxY)))
                    return !0;
                if (o.getWidth() > l && a.intersects(h))
                    return !0;
            }
        }
} return !1; }; var zi = function (t) { u.call(this), this.projection_ = $.get(t.projection), this.attributions_ = null, this.attributions2_ = this.adaptAttributions_(t.attributions), this.logo_ = t.logo, this.state_ = void 0 !== t.state ? t.state : "ready", this.wrapX_ = void 0 !== t.wrapX && t.wrapX; }; i.inherits(zi, u), zi.prototype.adaptAttributions_ = function (t) { if (!t)
    return null; if (t instanceof ji)
    return this.attributions_ = [t], function (e) { return [t.getHTML()]; }; if (Array.isArray(t)) {
    if (t[0] instanceof ji) {
        this.attributions_ = t;
        var e = t.map(function (t) { return t.getHTML(); });
        return function (t) { return e; };
    }
    return this.attributions_ = t.map(function (t) { return new ji({ html: t }); }), function (e) { return t; };
} return "function" == typeof t ? t : (this.attributions_ = [new ji({ html: t })], function (e) { return [t]; }); }, zi.prototype.forEachFeatureAtCoordinate = i.nullFunction, zi.prototype.getAttributions = function () { return this.attributions_; }, zi.prototype.getAttributions2 = function () { return this.attributions2_; }, zi.prototype.getLogo = function () { return this.logo_; }, zi.prototype.getProjection = function () { return this.projection_; }, zi.prototype.getResolutions = function () { }, zi.prototype.getState = function () { return this.state_; }, zi.prototype.getWrapX = function () { return this.wrapX_; }, zi.prototype.refresh = function () { this.changed(); }, zi.prototype.setAttributions = function (t) { this.attributions2_ = this.adaptAttributions_(t), this.changed(); }, zi.prototype.setLogo = function (t) { this.logo_ = t; }, zi.prototype.setState = function (t) { this.state_ = t, this.changed(); }; var Yi = function (t) { zi.call(this, { attributions: t.attributions, extent: t.extent, logo: t.logo, projection: t.projection, state: t.state, wrapX: t.wrapX }), this.opaque_ = void 0 !== t.opaque && t.opaque, this.tilePixelRatio_ = void 0 !== t.tilePixelRatio ? t.tilePixelRatio : 1, this.tileGrid = void 0 !== t.tileGrid ? t.tileGrid : null, this.tileCache = new Gi(t.cacheSize), this.tmpSize = [0, 0], this.key_ = "", this.tileOptions = { transition: t.transition }; }; i.inherits(Yi, zi), Yi.prototype.canExpireCache = function () { return this.tileCache.canExpireCache(); }, Yi.prototype.expireCache = function (t, e) { var i = this.getTileCacheForProjection(t); i && i.expireCache(e); }, Yi.prototype.forEachLoadedTile = function (t, e, i, n) { var r = this.getTileCacheForProjection(t); if (!r)
    return !1; for (var o, s, a, h = !0, l = i.minX; l <= i.maxX; ++l)
    for (var u = i.minY; u <= i.maxY; ++u)
        s = ki.getKeyZXY(e, l, u), a = !1, r.containsKey(s) && (a = 2 === (o = r.get(s)).getState()) && (a = !1 !== n(o)), a || (h = !1); return h; }, Yi.prototype.getGutter = function (t) { return 0; }, Yi.prototype.getKey = function () { return this.key_; }, Yi.prototype.setKey = function (t) { this.key_ !== t && (this.key_ = t, this.changed()); }, Yi.prototype.getOpaque = function (t) { return this.opaque_; }, Yi.prototype.getResolutions = function () { return this.tileGrid.getResolutions(); }, Yi.prototype.getTile = function (t, e, i, n, r) { }, Yi.prototype.getTileGrid = function () { return this.tileGrid; }, Yi.prototype.getTileGridForProjection = function (t) { return this.tileGrid ? this.tileGrid : Vi.getForProjection(t); }, Yi.prototype.getTileCacheForProjection = function (t) { var e = this.getProjection(); return e && !$.equivalent(e, t) ? null : this.tileCache; }, Yi.prototype.getTilePixelRatio = function (t) { return this.tilePixelRatio_; }, Yi.prototype.getTilePixelSize = function (t, e, i) { var n = this.getTileGridForProjection(i), r = this.getTilePixelRatio(e), o = It(n.getTileSize(t), this.tmpSize); return 1 == r ? o : Rt(o, r, this.tmpSize); }, Yi.prototype.getTileCoordForTileUrlFunction = function (t, e) { var i = void 0 !== e ? e : this.getProjection(), n = this.getTileGridForProjection(i); return this.getWrapX() && i.isGlobal() && (t = Vi.wrapX(n, t, i)), ki.withinExtentAndZ(t, n) ? t : null; }, Yi.prototype.refresh = function () { this.tileCache.clear(), this.changed(); }, Yi.prototype.useTile = i.nullFunction, Yi.Event = function (t, e) { a.call(this, t), this.tile = e; }, i.inherits(Yi.Event, a); var Ki = function (t) { Yi.call(this, { attributions: t.attributions, cacheSize: t.cacheSize, extent: t.extent, logo: t.logo, opaque: t.opaque, projection: t.projection, state: t.state, tileGrid: t.tileGrid, tilePixelRatio: t.tilePixelRatio, wrapX: t.wrapX, transition: t.transition }), this.tileLoadFunction = t.tileLoadFunction, this.tileUrlFunction = this.fixedTileUrlFunction ? this.fixedTileUrlFunction.bind(this) : Wi.nullTileUrlFunction, this.urls = null, t.urls ? this.setUrls(t.urls) : t.url && this.setUrl(t.url), t.tileUrlFunction && this.setTileUrlFunction(t.tileUrlFunction), this.tileLoadingKeys_ = {}; }; i.inherits(Ki, Yi), Ki.prototype.getTileLoadFunction = function () { return this.tileLoadFunction; }, Ki.prototype.getTileUrlFunction = function () { return this.tileUrlFunction; }, Ki.prototype.getUrls = function () { return this.urls; }, Ki.prototype.handleTileChange = function (t) { var e, n = t.target, r = i.getUid(n), o = n.getState(); 1 == o ? (this.tileLoadingKeys_[r] = !0, e = "tileloadstart") : r in this.tileLoadingKeys_ && (delete this.tileLoadingKeys_[r], e = 3 == o ? "tileloaderror" : 2 == o || 5 == o ? "tileloadend" : void 0), void 0 != e && this.dispatchEvent(new Yi.Event(e, n)); }, Ki.prototype.setTileLoadFunction = function (t) { this.tileCache.clear(), this.tileLoadFunction = t, this.changed(); }, Ki.prototype.setTileUrlFunction = function (t, e) { this.tileUrlFunction = t, this.tileCache.pruneExceptNewestZ(), void 0 !== e ? this.setKey(e) : this.changed(); }, Ki.prototype.setUrl = function (t) { var e = this.urls = Wi.expandUrl(t); this.setTileUrlFunction(this.fixedTileUrlFunction ? this.fixedTileUrlFunction.bind(this) : Wi.createFromTemplates(e, this.tileGrid), t); }, Ki.prototype.setUrls = function (t) { this.urls = t; var e = t.join("\n"); this.setTileUrlFunction(this.fixedTileUrlFunction ? this.fixedTileUrlFunction.bind(this) : Wi.createFromTemplates(t, this.tileGrid), e); }, Ki.prototype.useTile = function (t, e, i) { var n = ki.getKeyZXY(t, e, i); this.tileCache.containsKey(n) && this.tileCache.get(n); }; var Hi = function (t) { Ki.call(this, { attributions: t.attributions, cacheSize: t.cacheSize, extent: t.extent, logo: t.logo, opaque: t.opaque, projection: t.projection, state: t.state, tileGrid: t.tileGrid, tileLoadFunction: t.tileLoadFunction ? t.tileLoadFunction : Hi.defaultTileLoadFunction, tilePixelRatio: t.tilePixelRatio, tileUrlFunction: t.tileUrlFunction, url: t.url, urls: t.urls, wrapX: t.wrapX, transition: t.transition }), this.crossOrigin = void 0 !== t.crossOrigin ? t.crossOrigin : null, this.tileClass = void 0 !== t.tileClass ? t.tileClass : Oi, this.tileCacheForProjection = {}, this.tileGridForProjection = {}, this.reprojectionErrorThreshold_ = t.reprojectionErrorThreshold, this.renderReprojectionEdges_ = !1; }; i.inherits(Hi, Ki), Hi.prototype.canExpireCache = function () { if (!i.ENABLE_RASTER_REPROJECTION)
    return Ki.prototype.canExpireCache.call(this); if (this.tileCache.canExpireCache())
    return !0; for (var t in this.tileCacheForProjection)
    if (this.tileCacheForProjection[t].canExpireCache())
        return !0; return !1; }, Hi.prototype.expireCache = function (t, e) { if (i.ENABLE_RASTER_REPROJECTION) {
    var n = this.getTileCacheForProjection(t);
    for (var r in this.tileCache.expireCache(this.tileCache == n ? e : {}), this.tileCacheForProjection) {
        var o = this.tileCacheForProjection[r];
        o.expireCache(o == n ? e : {});
    }
}
else
    Ki.prototype.expireCache.call(this, t, e); }, Hi.prototype.getGutter = function (t) { return i.ENABLE_RASTER_REPROJECTION && this.getProjection() && t && !$.equivalent(this.getProjection(), t) ? 0 : this.getGutterInternal(); }, Hi.prototype.getGutterInternal = function () { return 0; }, Hi.prototype.getOpaque = function (t) { return !(i.ENABLE_RASTER_REPROJECTION && this.getProjection() && t && !$.equivalent(this.getProjection(), t)) && Ki.prototype.getOpaque.call(this, t); }, Hi.prototype.getTileGridForProjection = function (t) { if (!i.ENABLE_RASTER_REPROJECTION)
    return Ki.prototype.getTileGridForProjection.call(this, t); var e = this.getProjection(); if (!this.tileGrid || e && !$.equivalent(e, t)) {
    var n = i.getUid(t).toString();
    return n in this.tileGridForProjection || (this.tileGridForProjection[n] = Vi.getForProjection(t)), this.tileGridForProjection[n];
} return this.tileGrid; }, Hi.prototype.getTileCacheForProjection = function (t) { if (!i.ENABLE_RASTER_REPROJECTION)
    return Ki.prototype.getTileCacheForProjection.call(this, t); var e = this.getProjection(); if (!e || $.equivalent(e, t))
    return this.tileCache; var n = i.getUid(t).toString(); return n in this.tileCacheForProjection || (this.tileCacheForProjection[n] = new Gi(this.tileCache.highWaterMark)), this.tileCacheForProjection[n]; }, Hi.prototype.createTile_ = function (t, e, i, n, r, s) { var a = [t, e, i], h = this.getTileCoordForTileUrlFunction(a, r), l = h ? this.tileUrlFunction(h, n, r) : void 0, u = new this.tileClass(a, void 0 !== l ? 0 : 4, void 0 !== l ? l : "", this.crossOrigin, this.tileLoadFunction, this.tileOptions); return u.key = s, o.listen(u, "change", this.handleTileChange, this), u; }, Hi.prototype.getTile = function (t, e, n, r, o) { var s = this.getProjection(); if (i.ENABLE_RASTER_REPROJECTION && s && o && !$.equivalent(s, o)) {
    var a, h = this.getTileCacheForProjection(o), l = [t, e, n], u = ki.getKey(l);
    h.containsKey(u) && (a = h.get(u));
    var c = this.getKey();
    if (a && a.key == c)
        return a;
    var d = this.getTileGridForProjection(s), p = this.getTileGridForProjection(o), f = this.getTileCoordForTileUrlFunction(l, o), g = new Ni(s, d, o, p, l, f, this.getTilePixelRatio(r), this.getGutterInternal(), function (t, e, i, n) { return this.getTileInternal(t, e, i, n, s); }.bind(this), this.reprojectionErrorThreshold_, this.renderReprojectionEdges_);
    return g.key = c, a ? (g.interimTile = a, g.refreshInterimChain(), h.replace(u, g)) : h.set(u, g), g;
} return this.getTileInternal(t, e, n, r, s || o); }, Hi.prototype.getTileInternal = function (t, e, i, n, r) { var o = null, s = ki.getKeyZXY(t, e, i), a = this.getKey(); if (this.tileCache.containsKey(s)) {
    if ((o = this.tileCache.get(s)).key != a) {
        var h = o;
        o = this.createTile_(t, e, i, n, r, a), 0 == h.getState() ? o.interimTile = h.interimTile : o.interimTile = h, o.refreshInterimChain(), this.tileCache.replace(s, o);
    }
}
else
    o = this.createTile_(t, e, i, n, r, a), this.tileCache.set(s, o); return o; }, Hi.prototype.setRenderReprojectionEdges = function (t) { if (i.ENABLE_RASTER_REPROJECTION && this.renderReprojectionEdges_ != t) {
    for (var e in this.renderReprojectionEdges_ = t, this.tileCacheForProjection)
        this.tileCacheForProjection[e].clear();
    this.changed();
} }, Hi.prototype.setTileGridForProjection = function (t, e) { if (i.ENABLE_RASTER_REPROJECTION) {
    var n = $.get(t);
    if (n) {
        var r = i.getUid(n).toString();
        r in this.tileGridForProjection || (this.tileGridForProjection[r] = e);
    }
} }, Hi.defaultTileLoadFunction = function (t, e) { t.getImage().src = e; }; var Zi = function (t) { var e = t || {}, i = void 0 !== e.projection ? e.projection : "EPSG:3857", n = void 0 !== e.tileGrid ? e.tileGrid : Vi.createXYZ({ extent: Vi.extentFromProjection(i), maxZoom: e.maxZoom, minZoom: e.minZoom, tileSize: e.tileSize }); Hi.call(this, { attributions: e.attributions, cacheSize: e.cacheSize, crossOrigin: e.crossOrigin, logo: e.logo, opaque: e.opaque, projection: i, reprojectionErrorThreshold: e.reprojectionErrorThreshold, tileGrid: n, tileLoadFunction: e.tileLoadFunction, tilePixelRatio: e.tilePixelRatio, tileUrlFunction: e.tileUrlFunction, url: e.url, urls: e.urls, wrapX: void 0 === e.wrapX || e.wrapX, transition: e.transition }); }; i.inherits(Zi, Hi); var qi = function (t) { var e, i = t || {}; e = void 0 !== i.attributions ? i.attributions : [qi.ATTRIBUTION]; var n = void 0 !== i.crossOrigin ? i.crossOrigin : "anonymous", r = void 0 !== i.url ? i.url : "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"; Zi.call(this, { attributions: e, cacheSize: i.cacheSize, crossOrigin: n, opaque: void 0 === i.opaque || i.opaque, maxZoom: void 0 !== i.maxZoom ? i.maxZoom : 19, reprojectionErrorThreshold: i.reprojectionErrorThreshold, tileLoadFunction: i.tileLoadFunction, url: r, wrapX: i.wrapX }); }; i.inherits(qi, Zi), qi.ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'; var Ji = function (t) { Mt.call(this, t || {}), this.type = "IMAGE"; }; i.inherits(Ji, Mt); var Qi = function (t, e, i, n, r, o) { $t.call(this, t, e, i, 0), this.src_ = n, this.image_ = new Image, null !== r && (this.image_.crossOrigin = r), this.imageListenerKeys_ = null, this.state = 0, this.imageLoadFunction_ = o; }; i.inherits(Qi, $t), Qi.prototype.getImage = function () { return this.image_; }, Qi.prototype.handleImageError_ = function () { this.state = 3, this.unlistenImage_(), this.changed(); }, Qi.prototype.handleImageLoad_ = function () { void 0 === this.resolution && (this.resolution = B.getHeight(this.extent) / this.image_.height), this.state = 2, this.unlistenImage_(), this.changed(); }, Qi.prototype.load = function () { 0 != this.state && 3 != this.state || (this.state = 1, this.changed(), this.imageListenerKeys_ = [o.listenOnce(this.image_, "error", this.handleImageError_, this), o.listenOnce(this.image_, "load", this.handleImageLoad_, this)], this.imageLoadFunction_(this, this.src_)); }, Qi.prototype.setImage = function (t) { this.image_ = t; }, Qi.prototype.unlistenImage_ = function () { this.imageListenerKeys_.forEach(o.unlistenByKey), this.imageListenerKeys_ = null; }; var $i = function (t, e, n, r, o, s) { this.targetProj_ = e, this.maxSourceExtent_ = t.getExtent(); var a = e.getExtent(), h = a ? B.getIntersection(n, a) : n, l = B.getCenter(h), u = Ui.calculateSourceResolution(t, e, l, r), c = i.DEFAULT_RASTER_REPROJECTION_ERROR_THRESHOLD; this.triangulation_ = new Bi(t, e, h, this.maxSourceExtent_, u * c), this.targetResolution_ = r, this.targetExtent_ = n; var d = this.triangulation_.calculateSourceExtent(); this.sourceImage_ = s(d, u, o), this.sourcePixelRatio_ = this.sourceImage_ ? this.sourceImage_.getPixelRatio() : 1, this.canvas_ = null, this.sourceListenerKey_ = null; var p = 2; this.sourceImage_ && (p = 0), $t.call(this, n, r, this.sourcePixelRatio_, p); }; i.inherits($i, $t), $i.prototype.disposeInternal = function () { 1 == this.state && this.unlistenSource_(), $t.prototype.disposeInternal.call(this); }, $i.prototype.getImage = function () { return this.canvas_; }, $i.prototype.getProjection = function () { return this.targetProj_; }, $i.prototype.reproject_ = function () { var t = this.sourceImage_.getState(); if (2 == t) {
    var e = B.getWidth(this.targetExtent_) / this.targetResolution_, i = B.getHeight(this.targetExtent_) / this.targetResolution_;
    this.canvas_ = Ui.render(e, i, this.sourcePixelRatio_, this.sourceImage_.getResolution(), this.maxSourceExtent_, this.targetResolution_, this.targetExtent_, this.triangulation_, [{ extent: this.sourceImage_.getExtent(), image: this.sourceImage_.getImage() }], 0);
} this.state = t, this.changed(); }, $i.prototype.load = function () { if (0 == this.state) {
    this.state = 1, this.changed();
    var t = this.sourceImage_.getState();
    2 == t || 3 == t ? this.reproject_() : (this.sourceListenerKey_ = o.listen(this.sourceImage_, "change", function (t) { var e = this.sourceImage_.getState(); 2 != e && 3 != e || (this.unlistenSource_(), this.reproject_()); }, this), this.sourceImage_.load());
} }, $i.prototype.unlistenSource_ = function () { o.unlistenByKey(this.sourceListenerKey_), this.sourceListenerKey_ = null; }; var tn = function (t) { zi.call(this, { attributions: t.attributions, extent: t.extent, logo: t.logo, projection: t.projection, state: t.state }), this.resolutions_ = void 0 !== t.resolutions ? t.resolutions : null, this.reprojectedImage_ = null, this.reprojectedRevision_ = 0; }; i.inherits(tn, zi), tn.prototype.getResolutions = function () { return this.resolutions_; }, tn.prototype.findNearestResolution = function (t) { if (this.resolutions_) {
    var e = S.linearFindNearest(this.resolutions_, t, 0);
    t = this.resolutions_[e];
} return t; }, tn.prototype.getImage = function (t, e, n, r) { var o = this.getProjection(); if (i.ENABLE_RASTER_REPROJECTION && o && r && !$.equivalent(o, r)) {
    if (this.reprojectedImage_) {
        if (this.reprojectedRevision_ == this.getRevision() && $.equivalent(this.reprojectedImage_.getProjection(), r) && this.reprojectedImage_.getResolution() == e && B.equals(this.reprojectedImage_.getExtent(), t))
            return this.reprojectedImage_;
        this.reprojectedImage_.dispose(), this.reprojectedImage_ = null;
    }
    return this.reprojectedImage_ = new $i(o, r, t, e, n, function (t, e, i) { return this.getImageInternal(t, e, i, o); }.bind(this)), this.reprojectedRevision_ = this.getRevision(), this.reprojectedImage_;
} return o && (r = o), this.getImageInternal(t, e, n, r); }, tn.prototype.getImageInternal = function (t, e, i, n) { }, tn.prototype.handleImageChange = function (t) { var e = t.target; switch (e.getState()) {
    case 1:
        this.dispatchEvent(new tn.Event(tn.EventType_.IMAGELOADSTART, e));
        break;
    case 2:
        this.dispatchEvent(new tn.Event(tn.EventType_.IMAGELOADEND, e));
        break;
    case 3: this.dispatchEvent(new tn.Event(tn.EventType_.IMAGELOADERROR, e));
} }, tn.defaultImageLoadFunction = function (t, e) { t.getImage().src = e; }, tn.Event = function (t, e) { a.call(this, t), this.image = e; }, i.inherits(tn.Event, a), tn.EventType_ = { IMAGELOADSTART: "imageloadstart", IMAGELOADEND: "imageloadend", IMAGELOADERROR: "imageloaderror" }; var en = function (t) { var e = t.imageExtent, i = void 0 !== t.crossOrigin ? t.crossOrigin : null, n = void 0 !== t.imageLoadFunction ? t.imageLoadFunction : tn.defaultImageLoadFunction; tn.call(this, { attributions: t.attributions, logo: t.logo, projection: $.get(t.projection) }), this.image_ = new Qi(e, void 0, 1, t.url, i, n), this.imageSize_ = t.imageSize ? t.imageSize : null, o.listen(this.image_, "change", this.handleImageChange, this); }; i.inherits(en, tn), en.prototype.getImageInternal = function (t, e, i, n) { return B.intersects(t, this.image_.getExtent()) ? this.image_ : null; }, en.prototype.handleImageChange = function (t) { if (2 == this.image_.getState()) {
    var e, i, n = this.image_.getExtent(), r = this.image_.getImage();
    this.imageSize_ ? (e = this.imageSize_[0], i = this.imageSize_[1]) : (e = r.width, i = r.height);
    var o = B.getHeight(n) / i, s = Math.ceil(B.getWidth(n) / o);
    if (s != e) {
        var a = yt(s, i), h = a.canvas;
        a.drawImage(r, 0, 0, e, i, 0, 0, h.width, h.height), this.image_.setImage(h);
    }
} tn.prototype.handleImageChange.call(this, t); }, t.Map = Mi, t.View = vt, t.Tile = bi, t.OSM = qi, t.proj = $, t.Image = Ji, t.ImageStatic = en, Object.defineProperty(t, "__esModule", { value: !0 }); });
