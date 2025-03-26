/*! Built with http://stenciljs.com */
App.loadBundle("maps.js", ["exports", "./chunk-85279000.js", "./chunk-12ee72ee.js"], function (t, e, i) { window.App.h; var o = function (t, i, o) { e._ol_events_Event_.call(this, t), this.map = i, this.frameState = void 0 !== o ? o : null; }; e._ol_.inherits(o, e._ol_events_Event_); var n = function (t, e, i, n, r) { o.call(this, t, e, r), this.originalEvent = i, this.pixel = e.getEventPixel(i), this.coordinate = e.getCoordinateFromPixel(this.pixel), this.dragging = void 0 !== n && n; }; e._ol_.inherits(n, o), n.prototype.preventDefault = function () { o.prototype.preventDefault.call(this), this.originalEvent.preventDefault(); }, n.prototype.stopPropagation = function () { o.prototype.stopPropagation.call(this), this.originalEvent.stopPropagation(); }; var r = { SINGLECLICK: "singleclick", CLICK: e._ol_events_EventType_.CLICK, DBLCLICK: e._ol_events_EventType_.DBLCLICK, POINTERDRAG: "pointerdrag", POINTERMOVE: "pointermove", POINTERDOWN: "pointerdown", POINTERUP: "pointerup", POINTEROVER: "pointerover", POINTEROUT: "pointerout", POINTERENTER: "pointerenter", POINTERLEAVE: "pointerleave", POINTERCANCEL: "pointercancel" }, s = function (t, e, i, o, r) { n.call(this, t, e, i.originalEvent, o, r), this.pointerEvent = i; }; e._ol_.inherits(s, n); var a = function (t, e) { this.dispatcher = t, this.mapping_ = e; }; a.prototype.getEvents = function () { return Object.keys(this.mapping_); }, a.prototype.getHandlerForEvent = function (t) { return this.mapping_[t]; }; var l = function (t) { var e = { mousedown: this.mousedown, mousemove: this.mousemove, mouseup: this.mouseup, mouseover: this.mouseover, mouseout: this.mouseout }; a.call(this, t, e), this.pointerMap = t.pointerMap, this.lastTouches = []; }; e._ol_.inherits(l, a), l.POINTER_ID = 1, l.POINTER_TYPE = "mouse", l.DEDUP_DIST = 25, l.prototype.isEventSimulatedFromTouch_ = function (t) { for (var e, i = this.lastTouches, o = t.clientX, n = t.clientY, r = 0, s = i.length; r < s && (e = i[r]); r++) {
    var a = Math.abs(o - e[0]), _ = Math.abs(n - e[1]);
    if (a <= l.DEDUP_DIST && _ <= l.DEDUP_DIST)
        return !0;
} return !1; }, l.prepareEvent = function (t, e) { var i = e.cloneEvent(t, t), o = i.preventDefault; return i.preventDefault = function () { t.preventDefault(), o(); }, i.pointerId = l.POINTER_ID, i.isPrimary = !0, i.pointerType = l.POINTER_TYPE, i; }, l.prototype.mousedown = function (t) { if (!this.isEventSimulatedFromTouch_(t)) {
    l.POINTER_ID.toString() in this.pointerMap && this.cancel(t);
    var e = l.prepareEvent(t, this.dispatcher);
    this.pointerMap[l.POINTER_ID.toString()] = t, this.dispatcher.down(e, t);
} }, l.prototype.mousemove = function (t) { if (!this.isEventSimulatedFromTouch_(t)) {
    var e = l.prepareEvent(t, this.dispatcher);
    this.dispatcher.move(e, t);
} }, l.prototype.mouseup = function (t) { if (!this.isEventSimulatedFromTouch_(t)) {
    var e = this.pointerMap[l.POINTER_ID.toString()];
    if (e && e.button === t.button) {
        var i = l.prepareEvent(t, this.dispatcher);
        this.dispatcher.up(i, t), this.cleanupMouse();
    }
} }, l.prototype.mouseover = function (t) { if (!this.isEventSimulatedFromTouch_(t)) {
    var e = l.prepareEvent(t, this.dispatcher);
    this.dispatcher.enterOver(e, t);
} }, l.prototype.mouseout = function (t) { if (!this.isEventSimulatedFromTouch_(t)) {
    var e = l.prepareEvent(t, this.dispatcher);
    this.dispatcher.leaveOut(e, t);
} }, l.prototype.cancel = function (t) { var e = l.prepareEvent(t, this.dispatcher); this.dispatcher.cancel(e, t), this.cleanupMouse(); }, l.prototype.cleanupMouse = function () { delete this.pointerMap[l.POINTER_ID.toString()]; }; var _ = function (t) { var e = { MSPointerDown: this.msPointerDown, MSPointerMove: this.msPointerMove, MSPointerUp: this.msPointerUp, MSPointerOut: this.msPointerOut, MSPointerOver: this.msPointerOver, MSPointerCancel: this.msPointerCancel, MSGotPointerCapture: this.msGotPointerCapture, MSLostPointerCapture: this.msLostPointerCapture }; a.call(this, t, e), this.pointerMap = t.pointerMap, this.POINTER_TYPES = ["", "unavailable", "touch", "pen", "mouse"]; }; e._ol_.inherits(_, a), _.prototype.prepareEvent_ = function (t) { var e = t; return "number" == typeof t.pointerType && ((e = this.dispatcher.cloneEvent(t, t)).pointerType = this.POINTER_TYPES[t.pointerType]), e; }, _.prototype.cleanup = function (t) { delete this.pointerMap[t.toString()]; }, _.prototype.msPointerDown = function (t) { this.pointerMap[t.pointerId.toString()] = t; var e = this.prepareEvent_(t); this.dispatcher.down(e, t); }, _.prototype.msPointerMove = function (t) { var e = this.prepareEvent_(t); this.dispatcher.move(e, t); }, _.prototype.msPointerUp = function (t) { var e = this.prepareEvent_(t); this.dispatcher.up(e, t), this.cleanup(t.pointerId); }, _.prototype.msPointerOut = function (t) { var e = this.prepareEvent_(t); this.dispatcher.leaveOut(e, t); }, _.prototype.msPointerOver = function (t) { var e = this.prepareEvent_(t); this.dispatcher.enterOver(e, t); }, _.prototype.msPointerCancel = function (t) { var e = this.prepareEvent_(t); this.dispatcher.cancel(e, t), this.cleanup(t.pointerId); }, _.prototype.msLostPointerCapture = function (t) { var e = this.dispatcher.makeEvent("lostpointercapture", t, t); this.dispatcher.dispatchEvent(e); }, _.prototype.msGotPointerCapture = function (t) { var e = this.dispatcher.makeEvent("gotpointercapture", t, t); this.dispatcher.dispatchEvent(e); }; var h = function (t) { var e = { pointerdown: this.pointerDown, pointermove: this.pointerMove, pointerup: this.pointerUp, pointerout: this.pointerOut, pointerover: this.pointerOver, pointercancel: this.pointerCancel, gotpointercapture: this.gotPointerCapture, lostpointercapture: this.lostPointerCapture }; a.call(this, t, e); }; e._ol_.inherits(h, a), h.prototype.pointerDown = function (t) { this.dispatcher.fireNativeEvent(t); }, h.prototype.pointerMove = function (t) { this.dispatcher.fireNativeEvent(t); }, h.prototype.pointerUp = function (t) { this.dispatcher.fireNativeEvent(t); }, h.prototype.pointerOut = function (t) { this.dispatcher.fireNativeEvent(t); }, h.prototype.pointerOver = function (t) { this.dispatcher.fireNativeEvent(t); }, h.prototype.pointerCancel = function (t) { this.dispatcher.fireNativeEvent(t); }, h.prototype.lostPointerCapture = function (t) { this.dispatcher.fireNativeEvent(t); }, h.prototype.gotPointerCapture = function (t) { this.dispatcher.fireNativeEvent(t); }; var c = function (t, i, o) { e._ol_events_Event_.call(this, t), this.originalEvent = i; var n = o || {}; this.buttons = this.getButtons_(n), this.pressure = this.getPressure_(n, this.buttons), this.bubbles = "bubbles" in n && n.bubbles, this.cancelable = "cancelable" in n && n.cancelable, this.view = "view" in n ? n.view : null, this.detail = "detail" in n ? n.detail : null, this.screenX = "screenX" in n ? n.screenX : 0, this.screenY = "screenY" in n ? n.screenY : 0, this.clientX = "clientX" in n ? n.clientX : 0, this.clientY = "clientY" in n ? n.clientY : 0, this.ctrlKey = "ctrlKey" in n && n.ctrlKey, this.altKey = "altKey" in n && n.altKey, this.shiftKey = "shiftKey" in n && n.shiftKey, this.metaKey = "metaKey" in n && n.metaKey, this.button = "button" in n ? n.button : 0, this.relatedTarget = "relatedTarget" in n ? n.relatedTarget : null, this.pointerId = "pointerId" in n ? n.pointerId : 0, this.width = "width" in n ? n.width : 0, this.height = "height" in n ? n.height : 0, this.tiltX = "tiltX" in n ? n.tiltX : 0, this.tiltY = "tiltY" in n ? n.tiltY : 0, this.pointerType = "pointerType" in n ? n.pointerType : "", this.hwTimestamp = "hwTimestamp" in n ? n.hwTimestamp : 0, this.isPrimary = "isPrimary" in n && n.isPrimary, i.preventDefault && (this.preventDefault = function () { i.preventDefault(); }); }; e._ol_.inherits(c, e._ol_events_Event_), c.prototype.getButtons_ = function (t) { var e; if (t.buttons || c.HAS_BUTTONS)
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
    } return e; }, c.prototype.getPressure_ = function (t, e) { return t.pressure ? t.pressure : e ? .5 : 0; }, c.HAS_BUTTONS = !1, function () { try {
    var t = new MouseEvent("click", { buttons: 1 });
    c.HAS_BUTTONS = 1 === t.buttons;
}
catch (t) { } }(); var u = function (t, e) { var i = { touchstart: this.touchstart, touchmove: this.touchmove, touchend: this.touchend, touchcancel: this.touchcancel }; a.call(this, t, i), this.pointerMap = t.pointerMap, this.mouseSource = e, this.firstTouchId_ = void 0, this.clickCount_ = 0, this.resetId_ = void 0; }; e._ol_.inherits(u, a), u.DEDUP_TIMEOUT = 2500, u.CLICK_COUNT_TIMEOUT = 200, u.POINTER_TYPE = "touch", u.prototype.isPrimaryTouch_ = function (t) { return this.firstTouchId_ === t.identifier; }, u.prototype.setPrimaryTouch_ = function (t) { var e = Object.keys(this.pointerMap).length; (0 === e || 1 === e && l.POINTER_ID.toString() in this.pointerMap) && (this.firstTouchId_ = t.identifier, this.cancelResetClickCount_()); }, u.prototype.removePrimaryPointer_ = function (t) { t.isPrimary && (this.firstTouchId_ = void 0, this.resetClickCount_()); }, u.prototype.resetClickCount_ = function () { this.resetId_ = setTimeout(this.resetClickCountHandler_.bind(this), u.CLICK_COUNT_TIMEOUT); }, u.prototype.resetClickCountHandler_ = function () { this.clickCount_ = 0, this.resetId_ = void 0; }, u.prototype.cancelResetClickCount_ = function () { void 0 !== this.resetId_ && clearTimeout(this.resetId_); }, u.prototype.touchToPointer_ = function (t, e) { var i = this.dispatcher.cloneEvent(t, e); return i.pointerId = e.identifier + 2, i.bubbles = !0, i.cancelable = !0, i.detail = this.clickCount_, i.button = 0, i.buttons = 1, i.width = e.webkitRadiusX || e.radiusX || 0, i.height = e.webkitRadiusY || e.radiusY || 0, i.pressure = e.webkitForce || e.force || .5, i.isPrimary = this.isPrimaryTouch_(e), i.pointerType = u.POINTER_TYPE, i.clientX = e.clientX, i.clientY = e.clientY, i.screenX = e.screenX, i.screenY = e.screenY, i; }, u.prototype.processTouches_ = function (t, e) { var i, o, n = Array.prototype.slice.call(t.changedTouches), r = n.length; function s() { t.preventDefault(); } for (i = 0; i < r; ++i)
    (o = this.touchToPointer_(t, n[i])).preventDefault = s, e.call(this, t, o); }, u.prototype.findTouch_ = function (t, e) { for (var i = t.length, o = 0; o < i; o++)
    if (t[o].identifier === e)
        return !0; return !1; }, u.prototype.vacuumTouches_ = function (t) { var e = t.touches, i = Object.keys(this.pointerMap), o = i.length; if (o >= e.length) {
    var n, r, s, a = [];
    for (n = 0; n < o; ++n)
        r = i[n], s = this.pointerMap[r], r == l.POINTER_ID || this.findTouch_(e, r - 2) || a.push(s.out);
    for (n = 0; n < a.length; ++n)
        this.cancelOut_(t, a[n]);
} }, u.prototype.touchstart = function (t) { this.vacuumTouches_(t), this.setPrimaryTouch_(t.changedTouches[0]), this.dedupSynthMouse_(t), this.clickCount_++, this.processTouches_(t, this.overDown_); }, u.prototype.overDown_ = function (t, e) { this.pointerMap[e.pointerId] = { target: e.target, out: e, outTarget: e.target }, this.dispatcher.over(e, t), this.dispatcher.enter(e, t), this.dispatcher.down(e, t); }, u.prototype.touchmove = function (t) { t.preventDefault(), this.processTouches_(t, this.moveOverOut_); }, u.prototype.moveOverOut_ = function (t, e) { var i = e, o = this.pointerMap[i.pointerId]; if (o) {
    var n = o.out, r = o.outTarget;
    this.dispatcher.move(i, t), n && r !== i.target && (n.relatedTarget = i.target, i.relatedTarget = r, n.target = r, i.target ? (this.dispatcher.leaveOut(n, t), this.dispatcher.enterOver(i, t)) : (i.target = r, i.relatedTarget = null, this.cancelOut_(t, i))), o.out = i, o.outTarget = i.target;
} }, u.prototype.touchend = function (t) { this.dedupSynthMouse_(t), this.processTouches_(t, this.upOut_); }, u.prototype.upOut_ = function (t, e) { this.dispatcher.up(e, t), this.dispatcher.out(e, t), this.dispatcher.leave(e, t), this.cleanUpPointer_(e); }, u.prototype.touchcancel = function (t) { this.processTouches_(t, this.cancelOut_); }, u.prototype.cancelOut_ = function (t, e) { this.dispatcher.cancel(e, t), this.dispatcher.out(e, t), this.dispatcher.leave(e, t), this.cleanUpPointer_(e); }, u.prototype.cleanUpPointer_ = function (t) { delete this.pointerMap[t.pointerId], this.removePrimaryPointer_(t); }, u.prototype.dedupSynthMouse_ = function (t) { var i = this.mouseSource.lastTouches, o = t.changedTouches[0]; if (this.isPrimaryTouch_(o)) {
    var n = [o.clientX, o.clientY];
    i.push(n), setTimeout(function () { e._ol_array_.remove(i, n); }, u.DEDUP_TIMEOUT);
} }; var d = function (t) { e._ol_events_EventTarget_.call(this), this.element_ = t, this.pointerMap = {}, this.eventMap_ = {}, this.eventSourceList_ = [], this.registerSources(); }; e._ol_.inherits(d, e._ol_events_EventTarget_), d.prototype.registerSources = function () { if (e._ol_has_.POINTER)
    this.registerSource("native", new h(this));
else if (e._ol_has_.MSPOINTER)
    this.registerSource("ms", new _(this));
else {
    var t = new l(this);
    this.registerSource("mouse", t), e._ol_has_.TOUCH && this.registerSource("touch", new u(this, t));
} this.register_(); }, d.prototype.registerSource = function (t, e) { var i = e, o = i.getEvents(); o && (o.forEach(function (t) { var e = i.getHandlerForEvent(t); e && (this.eventMap_[t] = e.bind(i)); }, this), this.eventSourceList_.push(i)); }, d.prototype.register_ = function () { for (var t, e = this.eventSourceList_.length, i = 0; i < e; i++)
    t = this.eventSourceList_[i], this.addEvents_(t.getEvents()); }, d.prototype.unregister_ = function () { for (var t, e = this.eventSourceList_.length, i = 0; i < e; i++)
    t = this.eventSourceList_[i], this.removeEvents_(t.getEvents()); }, d.prototype.eventHandler_ = function (t) { var e = t.type, i = this.eventMap_[e]; i && i(t); }, d.prototype.addEvents_ = function (t) { t.forEach(function (t) { e._ol_events_.listen(this.element_, t, this.eventHandler_, this); }, this); }, d.prototype.removeEvents_ = function (t) { t.forEach(function (t) { e._ol_events_.unlisten(this.element_, t, this.eventHandler_, this); }, this); }, d.prototype.cloneEvent = function (t, e) { for (var i, o = {}, n = 0, r = d.CLONE_PROPS.length; n < r; n++)
    o[i = d.CLONE_PROPS[n][0]] = t[i] || e[i] || d.CLONE_PROPS[n][1]; return o; }, d.prototype.down = function (t, e) { this.fireEvent("pointerdown", t, e); }, d.prototype.move = function (t, e) { this.fireEvent("pointermove", t, e); }, d.prototype.up = function (t, e) { this.fireEvent("pointerup", t, e); }, d.prototype.enter = function (t, e) { t.bubbles = !1, this.fireEvent("pointerenter", t, e); }, d.prototype.leave = function (t, e) { t.bubbles = !1, this.fireEvent("pointerleave", t, e); }, d.prototype.over = function (t, e) { t.bubbles = !0, this.fireEvent("pointerover", t, e); }, d.prototype.out = function (t, e) { t.bubbles = !0, this.fireEvent("pointerout", t, e); }, d.prototype.cancel = function (t, e) { this.fireEvent("pointercancel", t, e); }, d.prototype.leaveOut = function (t, e) { this.out(t, e), this.contains_(t.target, t.relatedTarget) || this.leave(t, e); }, d.prototype.enterOver = function (t, e) { this.over(t, e), this.contains_(t.target, t.relatedTarget) || this.enter(t, e); }, d.prototype.contains_ = function (t, e) { return !(!t || !e) && t.contains(e); }, d.prototype.makeEvent = function (t, e, i) { return new c(t, i, e); }, d.prototype.fireEvent = function (t, e, i) { var o = this.makeEvent(t, e, i); this.dispatchEvent(o); }, d.prototype.fireNativeEvent = function (t) { var e = this.makeEvent(t.type, t, t); this.dispatchEvent(e); }, d.prototype.wrapMouseEvent = function (t, e) { return this.makeEvent(t, l.prepareEvent(e, this), e); }, d.prototype.disposeInternal = function () { this.unregister_(), e._ol_events_EventTarget_.prototype.disposeInternal.call(this); }, d.CLONE_PROPS = [["bubbles", !1], ["cancelable", !1], ["view", null], ["detail", null], ["screenX", 0], ["screenY", 0], ["clientX", 0], ["clientY", 0], ["ctrlKey", !1], ["altKey", !1], ["shiftKey", !1], ["metaKey", !1], ["button", 0], ["relatedTarget", null], ["buttons", 0], ["pointerId", 0], ["width", 0], ["height", 0], ["pressure", 0], ["tiltX", 0], ["tiltY", 0], ["pointerType", ""], ["hwTimestamp", 0], ["isPrimary", !1], ["type", ""], ["target", null], ["currentTarget", null], ["which", 0]]; var p = function (t, i) { e._ol_events_EventTarget_.call(this), this.map_ = t, this.clickTimeoutId_ = 0, this.dragging_ = !1, this.dragListenerKeys_ = [], this.moveTolerance_ = i ? i * e._ol_has_.DEVICE_PIXEL_RATIO : e._ol_has_.DEVICE_PIXEL_RATIO, this.down_ = null; var o = this.map_.getViewport(); this.activePointers_ = 0, this.trackedTouches_ = {}, this.pointerEventHandler_ = new d(o), this.documentPointerEventHandler_ = null, this.pointerdownListenerKey_ = e._ol_events_.listen(this.pointerEventHandler_, "pointerdown", this.handlePointerDown_, this), this.relayedListenerKey_ = e._ol_events_.listen(this.pointerEventHandler_, "pointermove", this.relayEvent_, this); }; e._ol_.inherits(p, e._ol_events_EventTarget_), p.prototype.emulateClick_ = function (t) { var e = new s(r.CLICK, this.map_, t); this.dispatchEvent(e), 0 !== this.clickTimeoutId_ ? (clearTimeout(this.clickTimeoutId_), this.clickTimeoutId_ = 0, e = new s(r.DBLCLICK, this.map_, t), this.dispatchEvent(e)) : this.clickTimeoutId_ = setTimeout(function () { this.clickTimeoutId_ = 0; var e = new s(r.SINGLECLICK, this.map_, t); this.dispatchEvent(e); }.bind(this), 250); }, p.prototype.updateActivePointers_ = function (t) { var e = t; e.type == r.POINTERUP || e.type == r.POINTERCANCEL ? delete this.trackedTouches_[e.pointerId] : e.type == r.POINTERDOWN && (this.trackedTouches_[e.pointerId] = !0), this.activePointers_ = Object.keys(this.trackedTouches_).length; }, p.prototype.handlePointerUp_ = function (t) { this.updateActivePointers_(t); var i = new s(r.POINTERUP, this.map_, t); this.dispatchEvent(i), i.propagationStopped || this.dragging_ || !this.isMouseActionButton_(t) || this.emulateClick_(this.down_), 0 === this.activePointers_ && (this.dragListenerKeys_.forEach(e._ol_events_.unlistenByKey), this.dragListenerKeys_.length = 0, this.dragging_ = !1, this.down_ = null, this.documentPointerEventHandler_.dispose(), this.documentPointerEventHandler_ = null); }, p.prototype.isMouseActionButton_ = function (t) { return 0 === t.button; }, p.prototype.handlePointerDown_ = function (t) { this.updateActivePointers_(t); var i = new s(r.POINTERDOWN, this.map_, t); this.dispatchEvent(i), this.down_ = t, 0 === this.dragListenerKeys_.length && (this.documentPointerEventHandler_ = new d(document), this.dragListenerKeys_.push(e._ol_events_.listen(this.documentPointerEventHandler_, r.POINTERMOVE, this.handlePointerMove_, this), e._ol_events_.listen(this.documentPointerEventHandler_, r.POINTERUP, this.handlePointerUp_, this), e._ol_events_.listen(this.pointerEventHandler_, r.POINTERCANCEL, this.handlePointerUp_, this))); }, p.prototype.handlePointerMove_ = function (t) { if (this.isMoving_(t)) {
    this.dragging_ = !0;
    var e = new s(r.POINTERDRAG, this.map_, t, this.dragging_);
    this.dispatchEvent(e);
} t.preventDefault(); }, p.prototype.relayEvent_ = function (t) { var e = !(!this.down_ || !this.isMoving_(t)); this.dispatchEvent(new s(t.type, this.map_, t, e)); }, p.prototype.isMoving_ = function (t) { return Math.abs(t.clientX - this.down_.clientX) > this.moveTolerance_ || Math.abs(t.clientY - this.down_.clientY) > this.moveTolerance_; }, p.prototype.disposeInternal = function () { this.relayedListenerKey_ && (e._ol_events_.unlistenByKey(this.relayedListenerKey_), this.relayedListenerKey_ = null), this.pointerdownListenerKey_ && (e._ol_events_.unlistenByKey(this.pointerdownListenerKey_), this.pointerdownListenerKey_ = null), this.dragListenerKeys_.forEach(e._ol_events_.unlistenByKey), this.dragListenerKeys_.length = 0, this.documentPointerEventHandler_ && (this.documentPointerEventHandler_.dispose(), this.documentPointerEventHandler_ = null), this.pointerEventHandler_ && (this.pointerEventHandler_.dispose(), this.pointerEventHandler_ = null), e._ol_events_EventTarget_.prototype.disposeInternal.call(this); }; var f = function (t, e) { this.priorityFunction_ = t, this.keyFunction_ = e, this.elements_ = [], this.priorities_ = [], this.queuedElements_ = {}; }; f.DROP = 1 / 0, f.prototype.clear = function () { this.elements_.length = 0, this.priorities_.length = 0, e._ol_obj_.clear(this.queuedElements_); }, f.prototype.dequeue = function () { var t = this.elements_, e = this.priorities_, i = t[0]; 1 == t.length ? (t.length = 0, e.length = 0) : (t[0] = t.pop(), e[0] = e.pop(), this.siftUp_(0)); var o = this.keyFunction_(i); return delete this.queuedElements_[o], i; }, f.prototype.enqueue = function (t) { e._ol_asserts_.assert(!(this.keyFunction_(t) in this.queuedElements_), 31); var i = this.priorityFunction_(t); return i != f.DROP && (this.elements_.push(t), this.priorities_.push(i), this.queuedElements_[this.keyFunction_(t)] = !0, this.siftDown_(0, this.elements_.length - 1), !0); }, f.prototype.getCount = function () { return this.elements_.length; }, f.prototype.getLeftChildIndex_ = function (t) { return 2 * t + 1; }, f.prototype.getRightChildIndex_ = function (t) { return 2 * t + 2; }, f.prototype.getParentIndex_ = function (t) { return t - 1 >> 1; }, f.prototype.heapify_ = function () { var t; for (t = (this.elements_.length >> 1) - 1; t >= 0; t--)
    this.siftUp_(t); }, f.prototype.isEmpty = function () { return 0 === this.elements_.length; }, f.prototype.isKeyQueued = function (t) { return t in this.queuedElements_; }, f.prototype.isQueued = function (t) { return this.isKeyQueued(this.keyFunction_(t)); }, f.prototype.siftUp_ = function (t) { for (var e = this.elements_, i = this.priorities_, o = e.length, n = e[t], r = i[t], s = t; t < o >> 1;) {
    var a = this.getLeftChildIndex_(t), l = this.getRightChildIndex_(t), _ = l < o && i[l] < i[a] ? l : a;
    e[t] = e[_], i[t] = i[_], t = _;
} e[t] = n, i[t] = r, this.siftDown_(s, t); }, f.prototype.siftDown_ = function (t, e) { for (var i = this.elements_, o = this.priorities_, n = i[e], r = o[e]; e > t;) {
    var s = this.getParentIndex_(e);
    if (!(o[s] > r))
        break;
    i[e] = i[s], o[e] = o[s], e = s;
} i[e] = n, o[e] = r; }, f.prototype.reprioritize = function () { var t, e, i, o = this.priorityFunction_, n = this.elements_, r = this.priorities_, s = 0, a = n.length; for (e = 0; e < a; ++e)
    (i = o(t = n[e])) == f.DROP ? delete this.queuedElements_[this.keyFunction_(t)] : (r[s] = i, n[s++] = t); n.length = s, r.length = s, this.heapify_(); }; var g = function (t, e) { f.call(this, function (e) { return t.apply(null, e); }, function (t) { return t[0].getKey(); }), this.tileChangeCallback_ = e, this.tilesLoading_ = 0, this.tilesLoadingKeys_ = {}; }; e._ol_.inherits(g, f), g.prototype.enqueue = function (t) { var i = f.prototype.enqueue.call(this, t); if (i) {
    var o = t[0];
    e._ol_events_.listen(o, e._ol_events_EventType_.CHANGE, this.handleTileChange, this);
} return i; }, g.prototype.getTilesLoading = function () { return this.tilesLoading_; }, g.prototype.handleTileChange = function (t) { var i = t.target, o = i.getState(); if (2 === o || 3 === o || 4 === o || 5 === o) {
    e._ol_events_.unlisten(i, e._ol_events_EventType_.CHANGE, this.handleTileChange, this);
    var n = i.getKey();
    n in this.tilesLoadingKeys_ && (delete this.tilesLoadingKeys_[n], --this.tilesLoading_), this.tileChangeCallback_();
} }, g.prototype.loadMoreTiles = function (t, e) { for (var i, o, n, r = 0, s = !1; this.tilesLoading_ < t && r < e && this.getCount() > 0;)
    n = (o = this.dequeue()[0]).getKey(), 5 === (i = o.getState()) ? s = !0 : 0 !== i || n in this.tilesLoadingKeys_ || (this.tilesLoadingKeys_[n] = !0, ++this.tilesLoading_, ++r, o.load()); 0 === r && s && this.tileChangeCallback_(); }; var v = { createExtent: function (t) { return function (i) { return i ? [e._ol_math_.clamp(i[0], t[0], t[2]), e._ol_math_.clamp(i[1], t[1], t[3])] : void 0; }; }, none: function (t) { return t; } }, y = function (t) { return function (i, o, n) { if (void 0 !== i) {
    var r = e._ol_array_.linearFindNearest(t, i, n);
    r = e._ol_math_.clamp(r + o, 0, t.length - 1);
    var s = Math.floor(r);
    if (r != s && s < t.length - 1) {
        var a = t[s] / t[s + 1];
        return t[s] / Math.pow(a, r - s);
    }
    return t[s];
} }; }, m = function (t, e, i) { return function (o, n, r) { if (void 0 !== o) {
    var s = -r / 2 + .5, a = Math.floor(Math.log(e / o) / Math.log(t) + s), l = Math.max(a + n, 0);
    return void 0 !== i && (l = Math.min(l, i)), e / Math.pow(t, l);
} }; }, x = { disable: function (t, e) { return void 0 !== t ? 0 : void 0; }, none: function (t, e) { return void 0 !== t ? t + e : void 0; }, createSnapToN: function (t) { var e = 2 * Math.PI / t; return function (t, i) { return void 0 !== t ? t = Math.floor((t + i) / e + .5) * e : void 0; }; }, createSnapToZero: function (t) { var i = t || e._ol_math_.toRadians(5); return function (t, e) { return void 0 !== t ? Math.abs(t + e) <= i ? 0 : t + e : void 0; }; } }, E = function (t, e, i) { var o = void 0 !== i ? t.toFixed(i) : "" + t, n = o.indexOf("."); return (n = -1 === n ? o.length : n) > e ? o : new Array(1 + e - n).join("0") + o; }, T = { add: function (t, e) { return t[0] += e[0], t[1] += e[1], t; }, closestOnCircle: function (t, e) { var i = e.getRadius(), o = e.getCenter(), n = o[0], r = o[1], s = t[0] - n, a = t[1] - r; 0 === s && 0 === a && (s = 1); var l = Math.sqrt(s * s + a * a); return [n + i * s / l, r + i * a / l]; }, closestOnSegment: function (t, e) { var i, o, n = t[0], r = t[1], s = e[0], a = e[1], l = s[0], _ = s[1], h = a[0], c = a[1], u = h - l, d = c - _, p = 0 === u && 0 === d ? 0 : (u * (n - l) + d * (r - _)) / (u * u + d * d || 0); return p <= 0 ? (i = l, o = _) : p >= 1 ? (i = h, o = c) : (i = l + p * u, o = _ + p * d), [i, o]; }, createStringXY: function (t) { return function (e) { return T.toStringXY(e, t); }; }, degreesToStringHDMS: function (t, i, o) { var n = e._ol_math_.modulo(i + 180, 360) - 180, r = Math.abs(3600 * n), s = o || 0, a = Math.pow(10, s), l = Math.floor(r / 3600), _ = Math.floor((r - 3600 * l) / 60), h = r - 3600 * l - 60 * _; return (h = Math.ceil(h * a) / a) >= 60 && (h = 0, _ += 1), _ >= 60 && (_ = 0, l += 1), l + "° " + E(_, 2) + "′ " + E(h, 2, s) + "″" + (0 == n ? "" : " " + t.charAt(n < 0 ? 1 : 0)); }, format: function (t, e, i) { return t ? e.replace("{x}", t[0].toFixed(i)).replace("{y}", t[1].toFixed(i)) : ""; }, equals: function (t, e) { for (var i = !0, o = t.length - 1; o >= 0; --o)
        if (t[o] != e[o]) {
            i = !1;
            break;
        } return i; }, rotate: function (t, e) { var i = Math.cos(e), o = Math.sin(e), n = t[0] * i - t[1] * o, r = t[1] * i + t[0] * o; return t[0] = n, t[1] = r, t; }, scale: function (t, e) { return t[0] *= e, t[1] *= e, t; }, sub: function (t, e) { return t[0] -= e[0], t[1] -= e[1], t; }, squaredDistance: function (t, e) { var i = t[0] - e[0], o = t[1] - e[1]; return i * i + o * o; }, distance: function (t, e) { return Math.sqrt(T.squaredDistance(t, e)); }, squaredDistanceToSegment: function (t, e) { return T.squaredDistance(t, T.closestOnSegment(t, e)); }, toStringHDMS: function (t, e) { return t ? T.degreesToStringHDMS("NS", t[1], e) + " " + T.degreesToStringHDMS("EW", t[0], e) : ""; }, toStringXY: function (t, e) { return T.format(t, "{x}, {y}", e); } }, C = { easeIn: function (t) { return Math.pow(t, 3); }, easeOut: function (t) { return 1 - C.easeIn(1 - t); }, inAndOut: function (t) { return 3 * t * t - 2 * t * t * t; }, linear: function (t) { return t; }, upAndDown: function (t) { return t < .5 ? C.inAndOut(2 * t) : 1 - C.inAndOut(2 * (t - .5)); } }, R = { linearRing: function (t, e, i, o) { for (var n = 0, r = t[i - o], s = t[i - o + 1]; e < i; e += o) {
        var a = t[e], l = t[e + 1];
        n += s * a - r * l, r = a, s = l;
    } return n / 2; }, linearRings: function (t, e, i, o) { var n, r, s = 0; for (n = 0, r = i.length; n < r; ++n) {
        var a = i[n];
        s += R.linearRing(t, e, a, o), e = a;
    } return s; }, linearRingss: function (t, e, i, o) { var n, r, s = 0; for (n = 0, r = i.length; n < r; ++n) {
        var a = i[n];
        s += R.linearRings(t, e, a, o), e = a[a.length - 1];
    } return s; } }, S = { point: function (t, i, o, n, r, s, a) { var l, _, h = t[i], c = t[i + 1], u = t[o] - h, d = t[o + 1] - c; if (0 === u && 0 === d)
        _ = i;
    else {
        var p = ((r - h) * u + (s - c) * d) / (u * u + d * d);
        if (p > 1)
            _ = o;
        else {
            if (p > 0) {
                for (l = 0; l < n; ++l)
                    a[l] = e._ol_math_.lerp(t[i + l], t[o + l], p);
                return void (a.length = n);
            }
            _ = i;
        }
    } for (l = 0; l < n; ++l)
        a[l] = t[_ + l]; a.length = n; }, getMaxSquaredDelta: function (t, i, o, n, r) { var s = t[i], a = t[i + 1]; for (i += n; i < o; i += n) {
        var l = t[i], _ = t[i + 1], h = e._ol_math_.squaredDistance(s, a, l, _);
        h > r && (r = h), s = l, a = _;
    } return r; }, getsMaxSquaredDelta: function (t, e, i, o, n) { var r, s; for (r = 0, s = i.length; r < s; ++r) {
        var a = i[r];
        n = S.getMaxSquaredDelta(t, e, a, o, n), e = a;
    } return n; }, getssMaxSquaredDelta: function (t, e, i, o, n) { var r, s; for (r = 0, s = i.length; r < s; ++r) {
        var a = i[r];
        n = S.getsMaxSquaredDelta(t, e, a, o, n), e = a[a.length - 1];
    } return n; }, getClosestPoint: function (t, i, o, n, r, s, a, l, _, h, c) { if (i == o)
        return h; var u, d; if (0 === r) {
        if ((d = e._ol_math_.squaredDistance(a, l, t[i], t[i + 1])) < h) {
            for (u = 0; u < n; ++u)
                _[u] = t[i + u];
            return _.length = n, d;
        }
        return h;
    } for (var p = c || [NaN, NaN], f = i + n; f < o;)
        if (S.point(t, f - n, f, n, a, l, p), (d = e._ol_math_.squaredDistance(a, l, p[0], p[1])) < h) {
            for (h = d, u = 0; u < n; ++u)
                _[u] = p[u];
            _.length = n, f += n;
        }
        else
            f += n * Math.max((Math.sqrt(d) - Math.sqrt(h)) / r | 0, 1); if (s && (S.point(t, o - n, i, n, a, l, p), (d = e._ol_math_.squaredDistance(a, l, p[0], p[1])) < h)) {
        for (h = d, u = 0; u < n; ++u)
            _[u] = p[u];
        _.length = n;
    } return h; }, getsClosestPoint: function (t, e, i, o, n, r, s, a, l, _, h) { var c, u, d = h || [NaN, NaN]; for (c = 0, u = i.length; c < u; ++c) {
        var p = i[c];
        _ = S.getClosestPoint(t, e, p, o, n, r, s, a, l, _, d), e = p;
    } return _; }, getssClosestPoint: function (t, e, i, o, n, r, s, a, l, _, h) { var c, u, d = h || [NaN, NaN]; for (c = 0, u = i.length; c < u; ++c) {
        var p = i[c];
        _ = S.getsClosestPoint(t, e, p, o, n, r, s, a, l, _, d), e = p[p.length - 1];
    } return _; } }, I = { coordinates: function (t, e, i, o, n) { var r, s = void 0 !== n ? n : [], a = 0; for (r = e; r < i; r += o)
        s[a++] = t.slice(r, r + o); return s.length = a, s; }, coordinatess: function (t, e, i, o, n) { var r, s, a = void 0 !== n ? n : [], l = 0; for (r = 0, s = i.length; r < s; ++r) {
        var _ = i[r];
        a[l++] = I.coordinates(t, e, _, o, a[l]), e = _;
    } return a.length = l, a; }, coordinatesss: function (t, e, i, o, n) { var r, s, a = void 0 !== n ? n : [], l = 0; for (r = 0, s = i.length; r < s; ++r) {
        var _ = i[r];
        a[l++] = I.coordinatess(t, e, _, o, a[l]), e = _[_.length - 1];
    } return a.length = l, a; } }, L = { lineString: function (t, e, i, o, n, r, s) { var a = void 0 !== s ? s : []; return r || (i = L.radialDistance(t, e, i, o, n, a, 0), t = a, e = 0, o = 2), a.length = L.douglasPeucker(t, e, i, o, n, a, 0), a; }, douglasPeucker: function (t, i, o, n, r, s, a) { var l = (o - i) / n; if (l < 3) {
        for (; i < o; i += n)
            s[a++] = t[i], s[a++] = t[i + 1];
        return a;
    } var _ = new Array(l); _[0] = 1, _[l - 1] = 1; for (var h, c = [i, o - n], u = 0; c.length > 0;) {
        var d = c.pop(), p = c.pop(), f = 0, g = t[p], v = t[p + 1], y = t[d], m = t[d + 1];
        for (h = p + n; h < d; h += n) {
            var x = t[h], E = t[h + 1], T = e._ol_math_.squaredSegmentDistance(x, E, g, v, y, m);
            T > f && (u = h, f = T);
        }
        f > r && (_[(u - i) / n] = 1, p + n < u && c.push(p, u), u + n < d && c.push(u, d));
    } for (h = 0; h < l; ++h)
        _[h] && (s[a++] = t[i + h * n], s[a++] = t[i + h * n + 1]); return a; }, douglasPeuckers: function (t, e, i, o, n, r, s, a) { var l, _; for (l = 0, _ = i.length; l < _; ++l) {
        var h = i[l];
        s = L.douglasPeucker(t, e, h, o, n, r, s), a.push(s), e = h;
    } return s; }, douglasPeuckerss: function (t, e, i, o, n, r, s, a) { var l, _; for (l = 0, _ = i.length; l < _; ++l) {
        var h = i[l], c = [];
        s = L.douglasPeuckers(t, e, h, o, n, r, s, c), a.push(c), e = h[h.length - 1];
    } return s; }, radialDistance: function (t, i, o, n, r, s, a) { if (o <= i + n) {
        for (; i < o; i += n)
            s[a++] = t[i], s[a++] = t[i + 1];
        return a;
    } var l = t[i], _ = t[i + 1]; s[a++] = l, s[a++] = _; var h = l, c = _; for (i += n; i < o; i += n)
        h = t[i], c = t[i + 1], e._ol_math_.squaredDistance(l, _, h, c) > r && (s[a++] = h, s[a++] = c, l = h, _ = c); return h == l && c == _ || (s[a++] = h, s[a++] = c), a; }, snap: function (t, e) { return e * Math.round(t / e); }, quantize: function (t, e, i, o, n, r, s) { if (e == i)
        return s; var a, l, _ = L.snap(t[e], n), h = L.snap(t[e + 1], n); e += o, r[s++] = _, r[s++] = h; do {
        if (a = L.snap(t[e], n), l = L.snap(t[e + 1], n), (e += o) == i)
            return r[s++] = a, r[s++] = l, s;
    } while (a == _ && l == h); for (; e < i;) {
        var c, u;
        if (c = L.snap(t[e], n), u = L.snap(t[e + 1], n), e += o, c != a || u != l) {
            var d = a - _, p = l - h, f = c - _, g = u - h;
            d * g == p * f && (d < 0 && f < d || d == f || d > 0 && f > d) && (p < 0 && g < p || p == g || p > 0 && g > p) ? (a = c, l = u) : (r[s++] = a, r[s++] = l, _ = a, h = l, a = c, l = u);
        }
    } return r[s++] = a, r[s++] = l, s; }, quantizes: function (t, e, i, o, n, r, s, a) { var l, _; for (l = 0, _ = i.length; l < _; ++l) {
        var h = i[l];
        s = L.quantize(t, e, h, o, n, r, s), a.push(s), e = h;
    } return s; }, quantizess: function (t, e, i, o, n, r, s, a) { var l, _; for (l = 0, _ = i.length; l < _; ++l) {
        var h = i[l], c = [];
        s = L.quantizes(t, e, h, o, n, r, s, c), a.push(c), e = h[h.length - 1];
    } return s; } }, w = function (t, i) { e._ol_geom_SimpleGeometry_.call(this), this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.setCoordinates(t, i); }; e._ol_.inherits(w, e._ol_geom_SimpleGeometry_), w.prototype.clone = function () { var t = new w(null); return t.setFlatCoordinates(this.layout, this.flatCoordinates.slice()), t; }, w.prototype.closestPointXY = function (t, i, o, n) { return n < e._ol_extent_.closestSquaredDistanceXY(this.getExtent(), t, i) ? n : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(S.getMaxSquaredDelta(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0)), this.maxDeltaRevision_ = this.getRevision()), S.getClosestPoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, !0, t, i, o, n)); }, w.prototype.getArea = function () { return R.linearRing(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride); }, w.prototype.getCoordinates = function () { return I.coordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride); }, w.prototype.getSimplifiedGeometryInternal = function (t) { var i = []; i.length = L.douglasPeucker(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t, i, 0); var o = new w(null); return o.setFlatCoordinates(e._ol_geom_GeometryLayout_.XY, i), o; }, w.prototype.getType = function () { return e._ol_geom_GeometryType_.LINEAR_RING; }, w.prototype.intersectsExtent = function (t) { }, w.prototype.setCoordinates = function (t, i) { t ? (this.setLayout(i, t, 1), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = e._ol_geom_flat_deflate_.coordinates(this.flatCoordinates, 0, t, this.stride), this.changed()) : this.setFlatCoordinates(e._ol_geom_GeometryLayout_.XY, null); }, w.prototype.setFlatCoordinates = function (t, e) { this.setFlatCoordinatesInternal(t, e), this.changed(); }; var b = function (t, i) { e._ol_geom_SimpleGeometry_.call(this), this.setCoordinates(t, i); }; e._ol_.inherits(b, e._ol_geom_SimpleGeometry_), b.prototype.clone = function () { var t = new b(null); return t.setFlatCoordinates(this.layout, this.flatCoordinates.slice()), t; }, b.prototype.closestPointXY = function (t, i, o, n) { var r = this.flatCoordinates, s = e._ol_math_.squaredDistance(t, i, r[0], r[1]); if (s < n) {
    var a, l = this.stride;
    for (a = 0; a < l; ++a)
        o[a] = r[a];
    return o.length = l, s;
} return n; }, b.prototype.getCoordinates = function () { return this.flatCoordinates ? this.flatCoordinates.slice() : []; }, b.prototype.computeExtent = function (t) { return e._ol_extent_.createOrUpdateFromCoordinate(this.flatCoordinates, t); }, b.prototype.getType = function () { return e._ol_geom_GeometryType_.POINT; }, b.prototype.intersectsExtent = function (t) { return e._ol_extent_.containsXY(t, this.flatCoordinates[0], this.flatCoordinates[1]); }, b.prototype.setCoordinates = function (t, i) { t ? (this.setLayout(i, t, 0), this.flatCoordinates || (this.flatCoordinates = []), this.flatCoordinates.length = e._ol_geom_flat_deflate_.coordinate(this.flatCoordinates, 0, t, this.stride), this.changed()) : this.setFlatCoordinates(e._ol_geom_GeometryLayout_.XY, null); }, b.prototype.setFlatCoordinates = function (t, e) { this.setFlatCoordinatesInternal(t, e), this.changed(); }; var A = { linearRingContainsExtent: function (t, i, o, n, r) { return !e._ol_extent_.forEachCorner(r, function (e) { return !A.linearRingContainsXY(t, i, o, n, e[0], e[1]); }); }, linearRingContainsXY: function (t, e, i, o, n, r) { for (var s = 0, a = t[i - o], l = t[i - o + 1]; e < i; e += o) {
        var _ = t[e], h = t[e + 1];
        l <= r ? h > r && (_ - a) * (r - l) - (n - a) * (h - l) > 0 && s++ : h <= r && (_ - a) * (r - l) - (n - a) * (h - l) < 0 && s--, a = _, l = h;
    } return 0 !== s; }, linearRingsContainsXY: function (t, e, i, o, n, r) { if (0 === i.length)
        return !1; if (!A.linearRingContainsXY(t, e, i[0], o, n, r))
        return !1; var s, a; for (s = 1, a = i.length; s < a; ++s)
        if (A.linearRingContainsXY(t, i[s - 1], i[s], o, n, r))
            return !1; return !0; }, linearRingssContainsXY: function (t, e, i, o, n, r) { if (0 === i.length)
        return !1; var s, a; for (s = 0, a = i.length; s < a; ++s) {
        var l = i[s];
        if (A.linearRingsContainsXY(t, e, l, o, n, r))
            return !0;
        e = l[l.length - 1];
    } return !1; } }, P = { linearRings: function (t, i, o, n, r, s, a) { for (var l, _, h, c, u, d, p, f = r[s + 1], g = [], v = 0, y = o.length; v < y; ++v) {
        var m = o[v];
        for (c = t[m - n], d = t[m - n + 1], l = i; l < m; l += n)
            u = t[l], p = t[l + 1], (f <= d && p <= f || d <= f && f <= p) && (h = (f - d) / (p - d) * (u - c) + c, g.push(h)), c = u, d = p;
    } var x = NaN, E = -1 / 0; for (g.sort(e._ol_array_.numberSafeCompareFunction), c = g[0], l = 1, _ = g.length; l < _; ++l) {
        u = g[l];
        var T = Math.abs(u - c);
        T > E && (h = (c + u) / 2, A.linearRingsContainsXY(t, i, o, n, h, f) && (x = h, E = T)), c = u;
    } return isNaN(x) && (x = r[s]), a ? (a.push(x, f, E), a) : [x, f, E]; }, linearRingss: function (t, e, i, o, n) { var r, s, a = []; for (r = 0, s = i.length; r < s; ++r) {
        var l = i[r];
        a = P.linearRings(t, e, l, o, n, 2 * r, a), e = l[l.length - 1];
    } return a; } }, D = function (t, e, i, o, n, r) { for (var s, a = [t[e], t[e + 1]], l = []; e + o < i; e += o) {
    if (l[0] = t[e + o], l[1] = t[e + o + 1], s = n.call(r, a, l))
        return s;
    a[0] = l[0], a[1] = l[1];
} return !1; }, F = { lineString: function (t, i, o, n, r) { var s = e._ol_extent_.extendFlatCoordinates(e._ol_extent_.createEmpty(), t, i, o, n); return !!e._ol_extent_.intersects(r, s) && (!!e._ol_extent_.containsExtent(r, s) || s[0] >= r[0] && s[2] <= r[2] || s[1] >= r[1] && s[3] <= r[3] || D(t, i, o, n, function (t, i) { return e._ol_extent_.intersectsSegment(r, t, i); })); }, lineStrings: function (t, e, i, o, n) { var r, s; for (r = 0, s = i.length; r < s; ++r) {
        if (F.lineString(t, e, i[r], o, n))
            return !0;
        e = i[r];
    } return !1; }, linearRing: function (t, e, i, o, n) { return !!(F.lineString(t, e, i, o, n) || A.linearRingContainsXY(t, e, i, o, n[0], n[1]) || A.linearRingContainsXY(t, e, i, o, n[0], n[3]) || A.linearRingContainsXY(t, e, i, o, n[2], n[1]) || A.linearRingContainsXY(t, e, i, o, n[2], n[3])); }, linearRings: function (t, e, i, o, n) { if (!F.linearRing(t, e, i[0], o, n))
        return !1; if (1 === i.length)
        return !0; var r, s; for (r = 1, s = i.length; r < s; ++r)
        if (A.linearRingContainsExtent(t, i[r - 1], i[r], o, n))
            return !1; return !0; }, linearRingss: function (t, e, i, o, n) { var r, s; for (r = 0, s = i.length; r < s; ++r) {
        var a = i[r];
        if (F.linearRings(t, e, a, o, n))
            return !0;
        e = a[a.length - 1];
    } return !1; } }, O = function (t, e, i, o) { for (; e < i - o;) {
    var n;
    for (n = 0; n < o; ++n) {
        var r = t[e + n];
        t[e + n] = t[i - o + n], t[i - o + n] = r;
    }
    e += o, i -= o;
} }, M = { linearRingIsClockwise: function (t, e, i, o) { for (var n = 0, r = t[i - o], s = t[i - o + 1]; e < i; e += o) {
        var a = t[e], l = t[e + 1];
        n += (a - r) * (l + s), r = a, s = l;
    } return n > 0; }, linearRingsAreOriented: function (t, e, i, o, n) { var r, s, a = void 0 !== n && n; for (r = 0, s = i.length; r < s; ++r) {
        var l = i[r], _ = M.linearRingIsClockwise(t, e, l, o);
        if (0 === r) {
            if (a && _ || !a && !_)
                return !1;
        }
        else if (a && !_ || !a && _)
            return !1;
        e = l;
    } return !0; }, linearRingssAreOriented: function (t, e, i, o, n) { var r, s; for (r = 0, s = i.length; r < s; ++r)
        if (!M.linearRingsAreOriented(t, e, i[r], o, n))
            return !1; return !0; }, orientLinearRings: function (t, e, i, o, n) { var r, s, a = void 0 !== n && n; for (r = 0, s = i.length; r < s; ++r) {
        var l = i[r], _ = M.linearRingIsClockwise(t, e, l, o);
        (0 === r ? a && _ || !a && !_ : a && !_ || !a && _) && O(t, e, l, o), e = l;
    } return e; }, orientLinearRingss: function (t, e, i, o, n) { var r, s; for (r = 0, s = i.length; r < s; ++r)
        e = M.orientLinearRings(t, e, i[r], o, n); return e; } }, G = function (t, i) { e._ol_geom_SimpleGeometry_.call(this), this.ends_ = [], this.flatInteriorPointRevision_ = -1, this.flatInteriorPoint_ = null, this.maxDelta_ = -1, this.maxDeltaRevision_ = -1, this.orientedRevision_ = -1, this.orientedFlatCoordinates_ = null, this.setCoordinates(t, i); }; e._ol_.inherits(G, e._ol_geom_SimpleGeometry_), G.prototype.appendLinearRing = function (t) { this.flatCoordinates ? e._ol_array_.extend(this.flatCoordinates, t.getFlatCoordinates()) : this.flatCoordinates = t.getFlatCoordinates().slice(), this.ends_.push(this.flatCoordinates.length), this.changed(); }, G.prototype.clone = function () { var t = new G(null); return t.setFlatCoordinates(this.layout, this.flatCoordinates.slice(), this.ends_.slice()), t; }, G.prototype.closestPointXY = function (t, i, o, n) { return n < e._ol_extent_.closestSquaredDistanceXY(this.getExtent(), t, i) ? n : (this.maxDeltaRevision_ != this.getRevision() && (this.maxDelta_ = Math.sqrt(S.getsMaxSquaredDelta(this.flatCoordinates, 0, this.ends_, this.stride, 0)), this.maxDeltaRevision_ = this.getRevision()), S.getsClosestPoint(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, !0, t, i, o, n)); }, G.prototype.containsXY = function (t, e) { return A.linearRingsContainsXY(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, t, e); }, G.prototype.getArea = function () { return R.linearRings(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride); }, G.prototype.getCoordinates = function (t) { var e; return void 0 !== t ? (e = this.getOrientedFlatCoordinates().slice(), M.orientLinearRings(e, 0, this.ends_, this.stride, t)) : e = this.flatCoordinates, I.coordinatess(e, 0, this.ends_, this.stride); }, G.prototype.getEnds = function () { return this.ends_; }, G.prototype.getFlatInteriorPoint = function () { if (this.flatInteriorPointRevision_ != this.getRevision()) {
    var t = e._ol_extent_.getCenter(this.getExtent());
    this.flatInteriorPoint_ = P.linearRings(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, t, 0), this.flatInteriorPointRevision_ = this.getRevision();
} return this.flatInteriorPoint_; }, G.prototype.getInteriorPoint = function () { return new b(this.getFlatInteriorPoint(), e._ol_geom_GeometryLayout_.XYM); }, G.prototype.getLinearRingCount = function () { return this.ends_.length; }, G.prototype.getLinearRing = function (t) { if (t < 0 || this.ends_.length <= t)
    return null; var e = new w(null); return e.setFlatCoordinates(this.layout, this.flatCoordinates.slice(0 === t ? 0 : this.ends_[t - 1], this.ends_[t])), e; }, G.prototype.getLinearRings = function () { var t, e, i = this.layout, o = this.flatCoordinates, n = this.ends_, r = [], s = 0; for (t = 0, e = n.length; t < e; ++t) {
    var a = n[t], l = new w(null);
    l.setFlatCoordinates(i, o.slice(s, a)), r.push(l), s = a;
} return r; }, G.prototype.getOrientedFlatCoordinates = function () { if (this.orientedRevision_ != this.getRevision()) {
    var t = this.flatCoordinates;
    M.linearRingsAreOriented(t, 0, this.ends_, this.stride) ? this.orientedFlatCoordinates_ = t : (this.orientedFlatCoordinates_ = t.slice(), this.orientedFlatCoordinates_.length = M.orientLinearRings(this.orientedFlatCoordinates_, 0, this.ends_, this.stride)), this.orientedRevision_ = this.getRevision();
} return this.orientedFlatCoordinates_; }, G.prototype.getSimplifiedGeometryInternal = function (t) { var i = [], o = []; i.length = L.quantizes(this.flatCoordinates, 0, this.ends_, this.stride, Math.sqrt(t), i, 0, o); var n = new G(null); return n.setFlatCoordinates(e._ol_geom_GeometryLayout_.XY, i, o), n; }, G.prototype.getType = function () { return e._ol_geom_GeometryType_.POLYGON; }, G.prototype.intersectsExtent = function (t) { return F.linearRings(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, t); }, G.prototype.setCoordinates = function (t, i) { if (t) {
    this.setLayout(i, t, 2), this.flatCoordinates || (this.flatCoordinates = []);
    var o = e._ol_geom_flat_deflate_.coordinatess(this.flatCoordinates, 0, t, this.stride, this.ends_);
    this.flatCoordinates.length = 0 === o.length ? 0 : o[o.length - 1], this.changed();
}
else
    this.setFlatCoordinates(e._ol_geom_GeometryLayout_.XY, null, this.ends_); }, G.prototype.setFlatCoordinates = function (t, e, i) { this.setFlatCoordinatesInternal(t, e), this.ends_ = i, this.changed(); }, G.circular = function (t, i, o, n) { var r, s = n || 32, a = []; for (r = 0; r < s; ++r)
    e._ol_array_.extend(a, t.offset(i, o, 2 * Math.PI * r / s)); a.push(a[0], a[1]); var l = new G(null); return l.setFlatCoordinates(e._ol_geom_GeometryLayout_.XY, a, [a.length]), l; }, G.fromExtent = function (t) { var i = t[0], o = t[1], n = t[2], r = t[3], s = [i, o, i, r, n, r, n, o, i, o], a = new G(null); return a.setFlatCoordinates(e._ol_geom_GeometryLayout_.XY, s, [s.length]), a; }, G.fromCircle = function (t, e, i) { for (var o = e || 32, n = t.getStride(), r = t.getLayout(), s = new G(null, r), a = n * (o + 1), l = new Array(a), _ = 0; _ < a; _++)
    l[_] = 0; var h = [l.length]; return s.setFlatCoordinates(r, l, h), G.makeRegular(s, t.getCenter(), t.getRadius(), i), s; }, G.makeRegular = function (t, i, o, n) { for (var r, s, a = t.getFlatCoordinates(), l = t.getLayout(), _ = t.getStride(), h = t.getEnds(), c = a.length / _ - 1, u = n || 0, d = 0; d <= c; ++d)
    s = d * _, r = u + 2 * e._ol_math_.modulo(d, c) * Math.PI / c, a[s] = i[0] + o * Math.cos(r), a[s + 1] = i[1] + o * Math.sin(r); t.setFlatCoordinates(l, a, h); }; var k = function (t) { e._ol_Object_.call(this); var i = e._ol_obj_.assign({}, t); this.hints_ = [0, 0], this.animations_ = [], this.updateAnimationKey_, this.updateAnimations_ = this.updateAnimations_.bind(this), this.projection_ = e._ol_proj_.createProjection(i.projection, "EPSG:3857"), this.applyOptions_(i); }; e._ol_.inherits(k, e._ol_Object_), k.prototype.applyOptions_ = function (t) { var i = {}; i.center = void 0 !== t.center ? t.center : null; var o = k.createResolutionConstraint_(t); this.maxResolution_ = o.maxResolution, this.minResolution_ = o.minResolution, this.zoomFactor_ = o.zoomFactor, this.resolutions_ = t.resolutions, this.minZoom_ = o.minZoom; var n = k.createCenterConstraint_(t), r = o.constraint, s = k.createRotationConstraint_(t); this.constraints_ = { center: n, resolution: r, rotation: s }, void 0 !== t.resolution ? i.resolution = t.resolution : void 0 !== t.zoom && (i.resolution = this.constrainResolution(this.maxResolution_, t.zoom - this.minZoom_), this.resolutions_ && (i.resolution = e._ol_math_.clamp(Number(this.getResolution() || i.resolution), this.minResolution_, this.maxResolution_))), i.rotation = void 0 !== t.rotation ? t.rotation : 0, this.setProperties(i), this.options_ = t; }, k.prototype.getUpdatedOptions_ = function (t) { var i = e._ol_obj_.assign({}, this.options_); return void 0 !== i.resolution ? i.resolution = this.getResolution() : i.zoom = this.getZoom(), i.center = this.getCenter(), i.rotation = this.getRotation(), e._ol_obj_.assign({}, i, t); }, k.prototype.animate = function (t) { var i, o = arguments.length; if (o > 1 && "function" == typeof arguments[o - 1] && (i = arguments[o - 1], --o), !this.isDef()) {
    var n = arguments[o - 1];
    return n.center && this.setCenter(n.center), void 0 !== n.zoom && this.setZoom(n.zoom), void 0 !== n.rotation && this.setRotation(n.rotation), void (i && i(!0));
} for (var r = Date.now(), s = this.getCenter().slice(), a = this.getResolution(), l = this.getRotation(), _ = [], h = 0; h < o; ++h) {
    var c = arguments[h], u = { start: r, complete: !1, anchor: c.anchor, duration: void 0 !== c.duration ? c.duration : 1e3, easing: c.easing || C.inAndOut };
    if (c.center && (u.sourceCenter = s, u.targetCenter = c.center, s = u.targetCenter), void 0 !== c.zoom ? (u.sourceResolution = a, u.targetResolution = this.constrainResolution(this.maxResolution_, c.zoom - this.minZoom_, 0), a = u.targetResolution) : c.resolution && (u.sourceResolution = a, u.targetResolution = c.resolution, a = u.targetResolution), void 0 !== c.rotation) {
        u.sourceRotation = l;
        var d = e._ol_math_.modulo(c.rotation - l + Math.PI, 2 * Math.PI) - Math.PI;
        u.targetRotation = l + d, l = u.targetRotation;
    }
    u.callback = i, k.isNoopAnimation(u) ? u.complete = !0 : r += u.duration, _.push(u);
} this.animations_.push(_), this.setHint(0, 1), this.updateAnimations_(); }, k.prototype.getAnimating = function () { return this.hints_[0] > 0; }, k.prototype.getInteracting = function () { return this.hints_[1] > 0; }, k.prototype.cancelAnimations = function () { this.setHint(0, -this.hints_[0]); for (var t = 0, e = this.animations_.length; t < e; ++t) {
    var i = this.animations_[t];
    i[0].callback && i[0].callback(!1);
} this.animations_.length = 0; }, k.prototype.updateAnimations_ = function () { if (void 0 !== this.updateAnimationKey_ && (cancelAnimationFrame(this.updateAnimationKey_), this.updateAnimationKey_ = void 0), this.getAnimating()) {
    for (var t = Date.now(), i = !1, o = this.animations_.length - 1; o >= 0; --o) {
        for (var n = this.animations_[o], r = !0, s = 0, a = n.length; s < a; ++s) {
            var l = n[s];
            if (!l.complete) {
                var _ = t - l.start, h = l.duration > 0 ? _ / l.duration : 1;
                h >= 1 ? (l.complete = !0, h = 1) : r = !1;
                var c = l.easing(h);
                if (l.sourceCenter) {
                    var u = l.sourceCenter[0], d = l.sourceCenter[1], p = u + c * (l.targetCenter[0] - u), f = d + c * (l.targetCenter[1] - d);
                    this.set("center", [p, f]);
                }
                if (l.sourceResolution && l.targetResolution) {
                    var g = 1 === c ? l.targetResolution : l.sourceResolution + c * (l.targetResolution - l.sourceResolution);
                    l.anchor && this.set("center", this.calculateCenterZoom(g, l.anchor)), this.set("resolution", g);
                }
                if (void 0 !== l.sourceRotation && void 0 !== l.targetRotation) {
                    var v = 1 === c ? e._ol_math_.modulo(l.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : l.sourceRotation + c * (l.targetRotation - l.sourceRotation);
                    l.anchor && this.set("center", this.calculateCenterRotate(v, l.anchor)), this.set("rotation", v);
                }
                if (i = !0, !l.complete)
                    break;
            }
        }
        if (r) {
            this.animations_[o] = null, this.setHint(0, -1);
            var y = n[0].callback;
            y && y(!0);
        }
    }
    this.animations_ = this.animations_.filter(Boolean), i && void 0 === this.updateAnimationKey_ && (this.updateAnimationKey_ = requestAnimationFrame(this.updateAnimations_));
} }, k.prototype.calculateCenterRotate = function (t, e) { var i, o = this.getCenter(); return void 0 !== o && (i = [o[0] - e[0], o[1] - e[1]], T.rotate(i, t - this.getRotation()), T.add(i, e)), i; }, k.prototype.calculateCenterZoom = function (t, e) { var i, o = this.getCenter(), n = this.getResolution(); return void 0 !== o && void 0 !== n && (i = [e[0] - t * (e[0] - o[0]) / n, e[1] - t * (e[1] - o[1]) / n]), i; }, k.prototype.getSizeFromViewport_ = function () { var t = [100, 100], i = '.ol-viewport[data-view="' + e._ol_.getUid(this) + '"]', o = document.querySelector(i); if (o) {
    var n = getComputedStyle(o);
    t[0] = parseInt(n.width, 10), t[1] = parseInt(n.height, 10);
} return t; }, k.prototype.constrainCenter = function (t) { return this.constraints_.center(t); }, k.prototype.constrainResolution = function (t, e, i) { var o = e || 0, n = i || 0; return this.constraints_.resolution(t, o, n); }, k.prototype.constrainRotation = function (t, e) { var i = e || 0; return this.constraints_.rotation(t, i); }, k.prototype.getCenter = function () { return this.get("center"); }, k.prototype.getConstraints = function () { return this.constraints_; }, k.prototype.getHints = function (t) { return void 0 !== t ? (t[0] = this.hints_[0], t[1] = this.hints_[1], t) : this.hints_.slice(); }, k.prototype.calculateExtent = function (t) { var i = t || this.getSizeFromViewport_(), o = this.getCenter(); e._ol_asserts_.assert(o, 1); var n = this.getResolution(); e._ol_asserts_.assert(void 0 !== n, 2); var r = this.getRotation(); return e._ol_asserts_.assert(void 0 !== r, 3), e._ol_extent_.getForViewAndSize(o, n, r, i); }, k.prototype.getMaxResolution = function () { return this.maxResolution_; }, k.prototype.getMinResolution = function () { return this.minResolution_; }, k.prototype.getMaxZoom = function () { return this.getZoomForResolution(this.minResolution_); }, k.prototype.setMaxZoom = function (t) { this.applyOptions_(this.getUpdatedOptions_({ maxZoom: t })); }, k.prototype.getMinZoom = function () { return this.getZoomForResolution(this.maxResolution_); }, k.prototype.setMinZoom = function (t) { this.applyOptions_(this.getUpdatedOptions_({ minZoom: t })); }, k.prototype.getProjection = function () { return this.projection_; }, k.prototype.getResolution = function () { return this.get("resolution"); }, k.prototype.getResolutions = function () { return this.resolutions_; }, k.prototype.getResolutionForExtent = function (t, i) { var o = i || this.getSizeFromViewport_(), n = e._ol_extent_.getWidth(t) / o[0], r = e._ol_extent_.getHeight(t) / o[1]; return Math.max(n, r); }, k.prototype.getResolutionForValueFunction = function (t) { var e = t || 2, i = this.maxResolution_, o = this.minResolution_, n = Math.log(i / o) / Math.log(e); return function (t) { return i / Math.pow(e, t * n); }; }, k.prototype.getRotation = function () { return this.get("rotation"); }, k.prototype.getValueForResolutionFunction = function (t) { var e = t || 2, i = this.maxResolution_, o = this.minResolution_, n = Math.log(i / o) / Math.log(e); return function (t) { return Math.log(i / t) / Math.log(e) / n; }; }, k.prototype.getState = function () { var t = this.getCenter(), e = this.getProjection(), i = this.getResolution(), o = this.getRotation(); return { center: t.slice(), projection: void 0 !== e ? e : null, resolution: i, rotation: o, zoom: this.getZoom() }; }, k.prototype.getZoom = function () { var t, e = this.getResolution(); return void 0 !== e && (t = this.getZoomForResolution(e)), t; }, k.prototype.getZoomForResolution = function (t) { var i, o, n = this.minZoom_ || 0; if (this.resolutions_) {
    var r = e._ol_array_.linearFindNearest(this.resolutions_, t, 1);
    n = r, i = this.resolutions_[r], o = r == this.resolutions_.length - 1 ? 2 : i / this.resolutions_[r + 1];
}
else
    i = this.maxResolution_, o = this.zoomFactor_; return n + Math.log(i / t) / Math.log(o); }, k.prototype.getResolutionForZoom = function (t) { return this.constrainResolution(this.maxResolution_, t - this.minZoom_, 0); }, k.prototype.fit = function (t, i) { var o, n = i || {}, r = n.size; r || (r = this.getSizeFromViewport_()), t instanceof e._ol_geom_SimpleGeometry_ ? t.getType() === e._ol_geom_GeometryType_.CIRCLE ? (t = t.getExtent(), (o = G.fromExtent(t)).rotate(this.getRotation(), e._ol_extent_.getCenter(t))) : o = t : (e._ol_asserts_.assert(Array.isArray(t), 24), e._ol_asserts_.assert(!e._ol_extent_.isEmpty(t), 25), o = G.fromExtent(t)); var s, a = void 0 !== n.padding ? n.padding : [0, 0, 0, 0], l = void 0 === n.constrainResolution || n.constrainResolution, _ = void 0 !== n.nearest && n.nearest; s = void 0 !== n.minResolution ? n.minResolution : void 0 !== n.maxZoom ? this.constrainResolution(this.maxResolution_, n.maxZoom - this.minZoom_, 0) : 0; for (var h = o.getFlatCoordinates(), c = this.getRotation(), u = Math.cos(-c), d = Math.sin(-c), p = 1 / 0, f = 1 / 0, g = -1 / 0, v = -1 / 0, y = o.getStride(), m = 0, x = h.length; m < x; m += y) {
    var E = h[m] * u - h[m + 1] * d, T = h[m] * d + h[m + 1] * u;
    p = Math.min(p, E), f = Math.min(f, T), g = Math.max(g, E), v = Math.max(v, T);
} var C = this.getResolutionForExtent([p, f, g, v], [r[0] - a[1] - a[3], r[1] - a[0] - a[2]]); if (C = isNaN(C) ? s : Math.max(C, s), l) {
    var R = this.constrainResolution(C, 0, 0);
    !_ && R < C && (R = this.constrainResolution(R, -1, 0)), C = R;
} d = -d; var S = (p + g) / 2, I = (f + v) / 2, L = [(S += (a[1] - a[3]) / 2 * C) * u - (I += (a[0] - a[2]) / 2 * C) * d, I * u + S * d], w = n.callback ? n.callback : e._ol_.nullFunction; void 0 !== n.duration ? this.animate({ resolution: C, center: L, duration: n.duration, easing: n.easing }, w) : (this.setResolution(C), this.setCenter(L), setTimeout(w.bind(void 0, !0), 0)); }, k.prototype.centerOn = function (t, e, i) { var o = this.getRotation(), n = Math.cos(-o), r = Math.sin(-o), s = t[0] * n - t[1] * r, a = t[1] * n + t[0] * r, l = this.getResolution(), _ = (s += (e[0] / 2 - i[0]) * l) * n - (a += (i[1] - e[1] / 2) * l) * (r = -r), h = a * n + s * r; this.setCenter([_, h]); }, k.prototype.isDef = function () { return !!this.getCenter() && void 0 !== this.getResolution(); }, k.prototype.rotate = function (t, e) { if (void 0 !== e) {
    var i = this.calculateCenterRotate(t, e);
    this.setCenter(i);
} this.setRotation(t); }, k.prototype.setCenter = function (t) { this.set("center", t), this.getAnimating() && this.cancelAnimations(); }, k.prototype.setHint = function (t, e) { return this.hints_[t] += e, this.changed(), this.hints_[t]; }, k.prototype.setResolution = function (t) { this.set("resolution", t), this.getAnimating() && this.cancelAnimations(); }, k.prototype.setRotation = function (t) { this.set("rotation", t), this.getAnimating() && this.cancelAnimations(); }, k.prototype.setZoom = function (t) { this.setResolution(this.getResolutionForZoom(t)); }, k.createCenterConstraint_ = function (t) { return void 0 !== t.extent ? v.createExtent(t.extent) : v.none; }, k.createResolutionConstraint_ = function (t) { var i, o, n, r = void 0 !== t.minZoom ? t.minZoom : e._ol_.DEFAULT_MIN_ZOOM, s = void 0 !== t.maxZoom ? t.maxZoom : 28, a = void 0 !== t.zoomFactor ? t.zoomFactor : 2; if (void 0 !== t.resolutions) {
    var l = t.resolutions;
    o = l[r], n = void 0 !== l[s] ? l[s] : l[l.length - 1], i = y(l);
}
else {
    var _ = e._ol_proj_.createProjection(t.projection, "EPSG:3857"), h = _.getExtent(), c = (h ? Math.max(e._ol_extent_.getWidth(h), e._ol_extent_.getHeight(h)) : 360 * e._ol_proj_.METERS_PER_UNIT[e._ol_proj_Units_.DEGREES] / _.getMetersPerUnit()) / e._ol_.DEFAULT_TILE_SIZE / Math.pow(2, e._ol_.DEFAULT_MIN_ZOOM), u = c / Math.pow(2, 28 - e._ol_.DEFAULT_MIN_ZOOM);
    void 0 !== (o = t.maxResolution) ? r = 0 : o = c / Math.pow(a, r), void 0 === (n = t.minResolution) && (n = void 0 !== t.maxZoom ? void 0 !== t.maxResolution ? o / Math.pow(a, s) : c / Math.pow(a, s) : u), s = r + Math.floor(Math.log(o / n) / Math.log(a)), n = o / Math.pow(a, s - r), i = m(a, o, s - r);
} return { constraint: i, maxResolution: o, minResolution: n, minZoom: r, zoomFactor: a }; }, k.createRotationConstraint_ = function (t) { if (void 0 === t.enableRotation || t.enableRotation) {
    var e = t.constrainRotation;
    return void 0 === e || !0 === e ? x.createSnapToZero() : !1 === e ? x.none : "number" == typeof e ? x.createSnapToN(e) : x.none;
} return x.disable; }, k.isNoopAnimation = function (t) { return !(t.sourceCenter && t.targetCenter && !T.equals(t.sourceCenter, t.targetCenter)) && t.sourceResolution === t.targetResolution && t.sourceRotation === t.targetRotation; }; var N = function (t) { var i = t || {}, o = e._ol_obj_.assign({}, i); delete o.layers; var n = i.layers; e._ol_layer_Base_.call(this, o), this.layersListenerKeys_ = [], this.listenerKeys_ = {}, e._ol_events_.listen(this, e._ol_Object_.getChangeEventType(N.Property_.LAYERS), this.handleLayersChanged_, this), n ? Array.isArray(n) ? n = new e._ol_Collection_(n.slice(), { unique: !0 }) : (e._ol_asserts_.assert(n instanceof e._ol_Collection_, 43), n = n) : n = new e._ol_Collection_(void 0, { unique: !0 }), this.setLayers(n); }; e._ol_.inherits(N, e._ol_layer_Base_), N.prototype.handleLayerChange_ = function () { this.changed(); }, N.prototype.handleLayersChanged_ = function (t) { this.layersListenerKeys_.forEach(e._ol_events_.unlistenByKey), this.layersListenerKeys_.length = 0; var i = this.getLayers(); for (var o in this.layersListenerKeys_.push(e._ol_events_.listen(i, e._ol_CollectionEventType_.ADD, this.handleLayersAdd_, this), e._ol_events_.listen(i, e._ol_CollectionEventType_.REMOVE, this.handleLayersRemove_, this)), this.listenerKeys_)
    this.listenerKeys_[o].forEach(e._ol_events_.unlistenByKey); e._ol_obj_.clear(this.listenerKeys_); var n, r, s, a = i.getArray(); for (n = 0, r = a.length; n < r; n++)
    s = a[n], this.listenerKeys_[e._ol_.getUid(s).toString()] = [e._ol_events_.listen(s, e._ol_ObjectEventType_.PROPERTYCHANGE, this.handleLayerChange_, this), e._ol_events_.listen(s, e._ol_events_EventType_.CHANGE, this.handleLayerChange_, this)]; this.changed(); }, N.prototype.handleLayersAdd_ = function (t) { var i = t.element, o = e._ol_.getUid(i).toString(); this.listenerKeys_[o] = [e._ol_events_.listen(i, e._ol_ObjectEventType_.PROPERTYCHANGE, this.handleLayerChange_, this), e._ol_events_.listen(i, e._ol_events_EventType_.CHANGE, this.handleLayerChange_, this)], this.changed(); }, N.prototype.handleLayersRemove_ = function (t) { var i = t.element, o = e._ol_.getUid(i).toString(); this.listenerKeys_[o].forEach(e._ol_events_.unlistenByKey), delete this.listenerKeys_[o], this.changed(); }, N.prototype.getLayers = function () { return this.get(N.Property_.LAYERS); }, N.prototype.setLayers = function (t) { this.set(N.Property_.LAYERS, t); }, N.prototype.getLayersArray = function (t) { var e = void 0 !== t ? t : []; return this.getLayers().forEach(function (t) { t.getLayersArray(e); }), e; }, N.prototype.getLayerStatesArray = function (t) { var i = void 0 !== t ? t : [], o = i.length; this.getLayers().forEach(function (t) { t.getLayerStatesArray(i); }); var n, r, s, a = this.getLayerState(); for (n = o, r = i.length; n < r; n++)
    (s = i[n]).opacity *= a.opacity, s.visible = s.visible && a.visible, s.maxResolution = Math.min(s.maxResolution, a.maxResolution), s.minResolution = Math.max(s.minResolution, a.minResolution), void 0 !== a.extent && (void 0 !== s.extent ? s.extent = e._ol_extent_.getIntersection(s.extent, a.extent) : s.extent = a.extent); return i; }, N.prototype.getSourceState = function () { return e._ol_source_State_.READY; }, N.Property_ = { LAYERS: "layers" }; var U = { mapRendererPlugins_: [], getMapRendererPlugins: function () { return U.mapRendererPlugins_; }, layerRendererPlugins_: [], getLayerRendererPlugins: function () { return U.layerRendererPlugins_; }, register: function (t, e) { switch (t) {
        case "MAP_RENDERER":
            U.mapRendererPlugins_.push(e);
            break;
        case "LAYER_RENDERER":
            U.layerRendererPlugins_.push(e);
            break;
        default: throw new Error("Unsupported plugin type: " + t);
    } }, registerMultiple: function (t, e) { for (var i = 0, o = e.length; i < o; ++i)
        U.register(t, e[i]); } }, B = function (t) { e._ol_Object_.call(this); var i = B.createOptionsInternal(t); this.loadTilesWhileAnimating_ = void 0 !== t.loadTilesWhileAnimating && t.loadTilesWhileAnimating, this.loadTilesWhileInteracting_ = void 0 !== t.loadTilesWhileInteracting && t.loadTilesWhileInteracting, this.pixelRatio_ = void 0 !== t.pixelRatio ? t.pixelRatio : e._ol_has_.DEVICE_PIXEL_RATIO, this.logos_ = i.logos, this.animationDelayKey_, this.animationDelay_ = function () { this.animationDelayKey_ = void 0, this.renderFrame_.call(this, Date.now()); }.bind(this), this.coordinateToPixelTransform_ = e._ol_transform_.create(), this.pixelToCoordinateTransform_ = e._ol_transform_.create(), this.frameIndex_ = 0, this.frameState_ = null, this.previousExtent_ = null, this.viewPropertyListenerKey_ = null, this.viewChangeListenerKey_ = null, this.layerGroupPropertyListenerKeys_ = null, this.viewport_ = document.createElement("DIV"), this.viewport_.className = "ol-viewport" + (e._ol_has_.TOUCH ? " ol-touch" : ""), this.viewport_.style.position = "relative", this.viewport_.style.overflow = "hidden", this.viewport_.style.width = "100%", this.viewport_.style.height = "100%", this.viewport_.style.msTouchAction = "none", this.viewport_.style.touchAction = "none", this.overlayContainer_ = document.createElement("DIV"), this.overlayContainer_.className = "ol-overlaycontainer", this.viewport_.appendChild(this.overlayContainer_), this.overlayContainerStopEvent_ = document.createElement("DIV"), this.overlayContainerStopEvent_.className = "ol-overlaycontainer-stopevent"; for (var o = [e._ol_events_EventType_.CLICK, e._ol_events_EventType_.DBLCLICK, e._ol_events_EventType_.MOUSEDOWN, e._ol_events_EventType_.TOUCHSTART, e._ol_events_EventType_.MSPOINTERDOWN, r.POINTERDOWN, e._ol_events_EventType_.MOUSEWHEEL, e._ol_events_EventType_.WHEEL], n = 0, s = o.length; n < s; ++n)
    e._ol_events_.listen(this.overlayContainerStopEvent_, o[n], e._ol_events_Event_.stopPropagation); for (var a in this.viewport_.appendChild(this.overlayContainerStopEvent_), this.mapBrowserEventHandler_ = new p(this, t.moveTolerance), r)
    e._ol_events_.listen(this.mapBrowserEventHandler_, r[a], this.handleMapBrowserEvent, this); this.keyboardEventTarget_ = i.keyboardEventTarget, this.keyHandlerKeys_ = null, e._ol_events_.listen(this.viewport_, e._ol_events_EventType_.WHEEL, this.handleBrowserEvent, this), e._ol_events_.listen(this.viewport_, e._ol_events_EventType_.MOUSEWHEEL, this.handleBrowserEvent, this), this.controls = i.controls || new e._ol_Collection_, this.interactions = i.interactions || new e._ol_Collection_, this.overlays_ = i.overlays, this.overlayIdIndex_ = {}, this.renderer_ = i.mapRendererPlugin.create(this.viewport_, this), this.handleResize_, this.focus_ = null, this.postRenderFunctions_ = [], this.tileQueue_ = new g(this.getTilePriority.bind(this), this.handleTileChange_.bind(this)), this.skippedFeatureUids_ = {}, e._ol_events_.listen(this, e._ol_Object_.getChangeEventType("layergroup"), this.handleLayerGroupChanged_, this), e._ol_events_.listen(this, e._ol_Object_.getChangeEventType("view"), this.handleViewChanged_, this), e._ol_events_.listen(this, e._ol_Object_.getChangeEventType("size"), this.handleSizeChanged_, this), e._ol_events_.listen(this, e._ol_Object_.getChangeEventType("target"), this.handleTargetChanged_, this), this.setProperties(i.values), this.controls.forEach(function (t) { t.setMap(this); }, this), e._ol_events_.listen(this.controls, e._ol_CollectionEventType_.ADD, function (t) { t.element.setMap(this); }, this), e._ol_events_.listen(this.controls, e._ol_CollectionEventType_.REMOVE, function (t) { t.element.setMap(null); }, this), this.interactions.forEach(function (t) { t.setMap(this); }, this), e._ol_events_.listen(this.interactions, e._ol_CollectionEventType_.ADD, function (t) { t.element.setMap(this); }, this), e._ol_events_.listen(this.interactions, e._ol_CollectionEventType_.REMOVE, function (t) { t.element.setMap(null); }, this), this.overlays_.forEach(this.addOverlayInternal_, this), e._ol_events_.listen(this.overlays_, e._ol_CollectionEventType_.ADD, function (t) { this.addOverlayInternal_(t.element); }, this), e._ol_events_.listen(this.overlays_, e._ol_CollectionEventType_.REMOVE, function (t) { var e = t.element.getId(); void 0 !== e && delete this.overlayIdIndex_[e.toString()], t.element.setMap(null); }, this); }; e._ol_.inherits(B, e._ol_Object_), B.prototype.addControl = function (t) { this.getControls().push(t); }, B.prototype.addInteraction = function (t) { this.getInteractions().push(t); }, B.prototype.addLayer = function (t) { this.getLayerGroup().getLayers().push(t); }, B.prototype.addOverlay = function (t) { this.getOverlays().push(t); }, B.prototype.addOverlayInternal_ = function (t) { var e = t.getId(); void 0 !== e && (this.overlayIdIndex_[e.toString()] = t), t.setMap(this); }, B.prototype.disposeInternal = function () { this.mapBrowserEventHandler_.dispose(), e._ol_events_.unlisten(this.viewport_, e._ol_events_EventType_.WHEEL, this.handleBrowserEvent, this), e._ol_events_.unlisten(this.viewport_, e._ol_events_EventType_.MOUSEWHEEL, this.handleBrowserEvent, this), void 0 !== this.handleResize_ && (window.removeEventListener(e._ol_events_EventType_.RESIZE, this.handleResize_, !1), this.handleResize_ = void 0), this.animationDelayKey_ && (cancelAnimationFrame(this.animationDelayKey_), this.animationDelayKey_ = void 0), this.setTarget(null), e._ol_Object_.prototype.disposeInternal.call(this); }, B.prototype.forEachFeatureAtPixel = function (t, i, o) { if (this.frameState_) {
    var n = this.getCoordinateFromPixel(t), r = void 0 !== (o = void 0 !== o ? o : {}).hitTolerance ? o.hitTolerance * this.frameState_.pixelRatio : 0, s = void 0 !== o.layerFilter ? o.layerFilter : e._ol_functions_.TRUE;
    return this.renderer_.forEachFeatureAtCoordinate(n, this.frameState_, r, i, null, s, null);
} }, B.prototype.getFeaturesAtPixel = function (t, e) { var i = null; return this.forEachFeatureAtPixel(t, function (t) { i || (i = []), i.push(t); }, e), i; }, B.prototype.forEachLayerAtPixel = function (t, i, o, n, r) { if (this.frameState_) {
    var s = void 0 !== o ? o : null, a = void 0 !== n ? n : e._ol_functions_.TRUE, l = void 0 !== r ? r : null;
    return this.renderer_.forEachLayerAtPixel(t, this.frameState_, i, s, a, l);
} }, B.prototype.hasFeatureAtPixel = function (t, i) { if (!this.frameState_)
    return !1; var o = this.getCoordinateFromPixel(t), n = void 0 !== (i = void 0 !== i ? i : {}).layerFilter ? i.layerFilter : e._ol_functions_.TRUE, r = void 0 !== i.hitTolerance ? i.hitTolerance * this.frameState_.pixelRatio : 0; return this.renderer_.hasFeatureAtCoordinate(o, this.frameState_, r, n, null); }, B.prototype.getEventCoordinate = function (t) { return this.getCoordinateFromPixel(this.getEventPixel(t)); }, B.prototype.getEventPixel = function (t) { var e = this.viewport_.getBoundingClientRect(), i = t.changedTouches ? t.changedTouches[0] : t; return [i.clientX - e.left, i.clientY - e.top]; }, B.prototype.getTarget = function () { return this.get("target"); }, B.prototype.getTargetElement = function () { var t = this.getTarget(); return void 0 !== t ? "string" == typeof t ? document.getElementById(t) : t : null; }, B.prototype.getCoordinateFromPixel = function (t) { var i = this.frameState_; return i ? e._ol_transform_.apply(i.pixelToCoordinateTransform, t.slice()) : null; }, B.prototype.getControls = function () { return this.controls; }, B.prototype.getOverlays = function () { return this.overlays_; }, B.prototype.getOverlayById = function (t) { var e = this.overlayIdIndex_[t.toString()]; return void 0 !== e ? e : null; }, B.prototype.getInteractions = function () { return this.interactions; }, B.prototype.getLayerGroup = function () { return this.get("layergroup"); }, B.prototype.getLayers = function () { return this.getLayerGroup().getLayers(); }, B.prototype.getPixelFromCoordinate = function (t) { var i = this.frameState_; return i ? e._ol_transform_.apply(i.coordinateToPixelTransform, t.slice(0, 2)) : null; }, B.prototype.getRenderer = function () { return this.renderer_; }, B.prototype.getSize = function () { return this.get("size"); }, B.prototype.getView = function () { return this.get("view"); }, B.prototype.getViewport = function () { return this.viewport_; }, B.prototype.getOverlayContainer = function () { return this.overlayContainer_; }, B.prototype.getOverlayContainerStopEvent = function () { return this.overlayContainerStopEvent_; }, B.prototype.getTilePriority = function (t, e, i, o) { var n = this.frameState_; if (!(n && e in n.wantedTiles))
    return f.DROP; if (!n.wantedTiles[e][t.getKey()])
    return f.DROP; var r = i[0] - n.focus[0], s = i[1] - n.focus[1]; return 65536 * Math.log(o) + Math.sqrt(r * r + s * s) / o; }, B.prototype.handleBrowserEvent = function (t, e) { var i = e || t.type, o = new n(i, this, t); this.handleMapBrowserEvent(o); }, B.prototype.handleMapBrowserEvent = function (t) { if (this.frameState_) {
    this.focus_ = t.coordinate, t.frameState = this.frameState_;
    var e, i = this.getInteractions().getArray();
    if (!1 !== this.dispatchEvent(t))
        for (e = i.length - 1; e >= 0; e--) {
            var o = i[e];
            if (o.getActive() && !o.handleEvent(t))
                break;
        }
} }, B.prototype.handlePostRender = function () { var t = this.frameState_, e = this.tileQueue_; if (!e.isEmpty()) {
    var i = 16, o = i;
    if (t) {
        var n = t.viewHints;
        n[0] && (i = this.loadTilesWhileAnimating_ ? 8 : 0, o = 2), n[1] && (i = this.loadTilesWhileInteracting_ ? 8 : 0, o = 2);
    }
    e.getTilesLoading() < i && (e.reprioritize(), e.loadMoreTiles(i, o));
} var r, s, a = this.postRenderFunctions_; for (r = 0, s = a.length; r < s; ++r)
    a[r](this, t); a.length = 0; }, B.prototype.handleSizeChanged_ = function () { this.render(); }, B.prototype.handleTargetChanged_ = function () { var t; if (this.getTarget() && (t = this.getTargetElement()), this.keyHandlerKeys_) {
    for (var i = 0, o = this.keyHandlerKeys_.length; i < o; ++i)
        e._ol_events_.unlistenByKey(this.keyHandlerKeys_[i]);
    this.keyHandlerKeys_ = null;
} if (t) {
    t.appendChild(this.viewport_);
    var n = this.keyboardEventTarget_ ? this.keyboardEventTarget_ : t;
    this.keyHandlerKeys_ = [e._ol_events_.listen(n, e._ol_events_EventType_.KEYDOWN, this.handleBrowserEvent, this), e._ol_events_.listen(n, e._ol_events_EventType_.KEYPRESS, this.handleBrowserEvent, this)], this.handleResize_ || (this.handleResize_ = this.updateSize.bind(this), window.addEventListener(e._ol_events_EventType_.RESIZE, this.handleResize_, !1));
}
else
    this.renderer_.removeLayerRenderers(), e._ol_dom_.removeNode(this.viewport_), void 0 !== this.handleResize_ && (window.removeEventListener(e._ol_events_EventType_.RESIZE, this.handleResize_, !1), this.handleResize_ = void 0); this.updateSize(); }, B.prototype.handleTileChange_ = function () { this.render(); }, B.prototype.handleViewPropertyChanged_ = function () { this.render(); }, B.prototype.handleViewChanged_ = function () { this.viewPropertyListenerKey_ && (e._ol_events_.unlistenByKey(this.viewPropertyListenerKey_), this.viewPropertyListenerKey_ = null), this.viewChangeListenerKey_ && (e._ol_events_.unlistenByKey(this.viewChangeListenerKey_), this.viewChangeListenerKey_ = null); var t = this.getView(); t && (this.viewport_.setAttribute("data-view", e._ol_.getUid(t)), this.viewPropertyListenerKey_ = e._ol_events_.listen(t, e._ol_ObjectEventType_.PROPERTYCHANGE, this.handleViewPropertyChanged_, this), this.viewChangeListenerKey_ = e._ol_events_.listen(t, e._ol_events_EventType_.CHANGE, this.handleViewPropertyChanged_, this)), this.render(); }, B.prototype.handleLayerGroupChanged_ = function () { this.layerGroupPropertyListenerKeys_ && (this.layerGroupPropertyListenerKeys_.forEach(e._ol_events_.unlistenByKey), this.layerGroupPropertyListenerKeys_ = null); var t = this.getLayerGroup(); t && (this.layerGroupPropertyListenerKeys_ = [e._ol_events_.listen(t, e._ol_ObjectEventType_.PROPERTYCHANGE, this.render, this), e._ol_events_.listen(t, e._ol_events_EventType_.CHANGE, this.render, this)]), this.render(); }, B.prototype.isRendered = function () { return !!this.frameState_; }, B.prototype.renderSync = function () { this.animationDelayKey_ && cancelAnimationFrame(this.animationDelayKey_), this.animationDelay_(); }, B.prototype.render = function () { void 0 === this.animationDelayKey_ && (this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_)); }, B.prototype.removeControl = function (t) { return this.getControls().remove(t); }, B.prototype.removeInteraction = function (t) { return this.getInteractions().remove(t); }, B.prototype.removeLayer = function (t) { return this.getLayerGroup().getLayers().remove(t); }, B.prototype.removeOverlay = function (t) { return this.getOverlays().remove(t); }, B.prototype.renderFrame_ = function (t) { var i, n, r, s = this.getSize(), a = this.getView(), l = e._ol_extent_.createEmpty(), _ = this.frameState_, h = null; if (void 0 !== s && e._ol_size_.hasArea(s) && a && a.isDef()) {
    var c = a.getHints(this.frameState_ ? this.frameState_.viewHints : void 0), u = this.getLayerGroup().getLayerStatesArray(), d = {};
    for (i = 0, n = u.length; i < n; ++i)
        d[e._ol_.getUid(u[i].layer)] = u[i];
    var p = (r = a.getState()).center, f = r.resolution / this.pixelRatio_;
    p[0] = Math.round(p[0] / f) * f, p[1] = Math.round(p[1] / f) * f, h = { animate: !1, coordinateToPixelTransform: this.coordinateToPixelTransform_, extent: l, focus: this.focus_ ? this.focus_ : p, index: this.frameIndex_++, layerStates: d, layerStatesArray: u, logos: e._ol_obj_.assign({}, this.logos_), pixelRatio: this.pixelRatio_, pixelToCoordinateTransform: this.pixelToCoordinateTransform_, postRenderFunctions: [], size: s, skippedFeatureUids: this.skippedFeatureUids_, tileQueue: this.tileQueue_, time: t, usedTiles: {}, viewState: r, viewHints: c, wantedTiles: {} };
} h && (h.extent = e._ol_extent_.getForViewAndSize(r.center, r.resolution, r.rotation, h.size, l)), this.frameState_ = h, this.renderer_.renderFrame(h), h && (h.animate && this.render(), Array.prototype.push.apply(this.postRenderFunctions_, h.postRenderFunctions), _ && (!this.previousExtent_ || !e._ol_extent_.isEmpty(this.previousExtent_) && !e._ol_extent_.equals(h.extent, this.previousExtent_)) && (this.dispatchEvent(new o("movestart", this, _)), this.previousExtent_ = e._ol_extent_.createOrUpdateEmpty(this.previousExtent_)), this.previousExtent_ && !h.viewHints[0] && !h.viewHints[1] && !e._ol_extent_.equals(h.extent, this.previousExtent_) && (this.dispatchEvent(new o("moveend", this, h)), e._ol_extent_.clone(h.extent, this.previousExtent_))), this.dispatchEvent(new o("postrender", this, h)), setTimeout(this.handlePostRender.bind(this), 0); }, B.prototype.setLayerGroup = function (t) { this.set("layergroup", t); }, B.prototype.setSize = function (t) { this.set("size", t); }, B.prototype.setTarget = function (t) { this.set("target", t); }, B.prototype.setView = function (t) { this.set("view", t); }, B.prototype.skipFeature = function (t) { var i = e._ol_.getUid(t).toString(); this.skippedFeatureUids_[i] = !0, this.render(); }, B.prototype.updateSize = function () { var t = this.getTargetElement(); if (t) {
    var e = getComputedStyle(t);
    this.setSize([t.offsetWidth - parseFloat(e.borderLeftWidth) - parseFloat(e.paddingLeft) - parseFloat(e.paddingRight) - parseFloat(e.borderRightWidth), t.offsetHeight - parseFloat(e.borderTopWidth) - parseFloat(e.paddingTop) - parseFloat(e.paddingBottom) - parseFloat(e.borderBottomWidth)]);
}
else
    this.setSize(void 0); }, B.prototype.unskipFeature = function (t) { var i = e._ol_.getUid(t).toString(); delete this.skippedFeatureUids_[i], this.render(); }, B.DEFAULT_RENDERER_TYPES = ["canvas", "webgl"], B.LOGO_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC", B.createOptionsInternal = function (t) { var i = null; void 0 !== t.keyboardEventTarget && (i = "string" == typeof t.keyboardEventTarget ? document.getElementById(t.keyboardEventTarget) : t.keyboardEventTarget); var o = {}, n = {}; if (void 0 === t.logo || "boolean" == typeof t.logo && t.logo)
    n[B.LOGO_URL] = "https://openlayers.org/";
else {
    var r = t.logo;
    "string" == typeof r ? n[r] = "" : r instanceof HTMLElement ? n[e._ol_.getUid(r).toString()] = r : r && (e._ol_asserts_.assert("string" == typeof r.href, 44), e._ol_asserts_.assert("string" == typeof r.src, 45), n[r.src] = r.href);
} var s, a, l = t.layers instanceof N ? t.layers : new N({ layers: t.layers }); o.layergroup = l, o.target = t.target, o.view = void 0 !== t.view ? t.view : new k, void 0 !== t.renderer ? (Array.isArray(t.renderer) ? s = t.renderer : "string" == typeof t.renderer ? s = [t.renderer] : e._ol_asserts_.assert(!1, 46), s.indexOf("dom") >= 0 && (s = s.concat(B.DEFAULT_RENDERER_TYPES))) : s = B.DEFAULT_RENDERER_TYPES; var _, h, c, u = U.getMapRendererPlugins(); t: for (var d = 0, p = s.length; d < p; ++d)
    for (var f = s[d], g = 0, v = u.length; g < v; ++g) {
        var y = u[g];
        if (y.handles(f)) {
            a = y;
            break t;
        }
    } if (!a)
    throw new Error("Unable to create a map renderer for types: " + s.join(", ")); return void 0 !== t.controls && (Array.isArray(t.controls) ? _ = new e._ol_Collection_(t.controls.slice()) : (e._ol_asserts_.assert(t.controls instanceof e._ol_Collection_, 47), _ = t.controls)), void 0 !== t.interactions && (Array.isArray(t.interactions) ? h = new e._ol_Collection_(t.interactions.slice()) : (e._ol_asserts_.assert(t.interactions instanceof e._ol_Collection_, 48), h = t.interactions)), void 0 !== t.overlays ? Array.isArray(t.overlays) ? c = new e._ol_Collection_(t.overlays.slice()) : (e._ol_asserts_.assert(t.overlays instanceof e._ol_Collection_, 49), c = t.overlays) : c = new e._ol_Collection_, { controls: _, interactions: h, keyboardEventTarget: i, logos: n, overlays: c, mapRendererPlugin: a, values: o }; }; var W = function (t) { e._ol_Object_.call(this), this.element = t.element ? t.element : null, this.target_ = null, this.map_ = null, this.listenerKeys = [], this.render = t.render ? t.render : e._ol_.nullFunction, t.target && this.setTarget(t.target); }; e._ol_.inherits(W, e._ol_Object_), W.prototype.disposeInternal = function () { e._ol_dom_.removeNode(this.element), e._ol_Object_.prototype.disposeInternal.call(this); }, W.prototype.getMap = function () { return this.map_; }, W.prototype.setMap = function (t) { this.map_ && e._ol_dom_.removeNode(this.element); for (var i = 0, o = this.listenerKeys.length; i < o; ++i)
    e._ol_events_.unlistenByKey(this.listenerKeys[i]); this.listenerKeys.length = 0, this.map_ = t, this.map_ && ((this.target_ ? this.target_ : t.getOverlayContainerStopEvent()).appendChild(this.element), this.render !== e._ol_.nullFunction && this.listenerKeys.push(e._ol_events_.listen(t, "postrender", this.render, this)), t.render()); }, W.prototype.setTarget = function (t) { this.target_ = "string" == typeof t ? document.getElementById(t) : t; }; var j = function (t) { var i = t || {}; this.ulElement_ = document.createElement("UL"), this.logoLi_ = document.createElement("LI"), this.ulElement_.appendChild(this.logoLi_), this.logoLi_.style.display = "none", this.collapsed_ = void 0 === i.collapsed || i.collapsed, this.collapsible_ = void 0 === i.collapsible || i.collapsible, this.collapsible_ || (this.collapsed_ = !1); var o = void 0 !== i.className ? i.className : "ol-attribution", n = void 0 !== i.tipLabel ? i.tipLabel : "Attributions", r = void 0 !== i.collapseLabel ? i.collapseLabel : "»"; "string" == typeof r ? (this.collapseLabel_ = document.createElement("span"), this.collapseLabel_.textContent = r) : this.collapseLabel_ = r; var s = void 0 !== i.label ? i.label : "i"; "string" == typeof s ? (this.label_ = document.createElement("span"), this.label_.textContent = s) : this.label_ = s; var a = this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_, l = document.createElement("button"); l.setAttribute("type", "button"), l.title = n, l.appendChild(a), e._ol_events_.listen(l, e._ol_events_EventType_.CLICK, this.handleClick_, this); var _ = o + " " + e._ol_css_.CLASS_UNSELECTABLE + " " + e._ol_css_.CLASS_CONTROL + (this.collapsed_ && this.collapsible_ ? " ol-collapsed" : "") + (this.collapsible_ ? "" : " ol-uncollapsible"), h = document.createElement("div"); h.className = _, h.appendChild(this.ulElement_), h.appendChild(l); var c = i.render ? i.render : j.render; W.call(this, { element: h, render: c, target: i.target }), this.renderedAttributions_ = [], this.renderedVisible_ = !0, this.logoElements_ = {}; }; e._ol_.inherits(j, W), j.prototype.getSourceAttributions_ = function (t) { for (var i = {}, o = [], n = t.layerStatesArray, r = t.viewState.resolution, s = 0, a = n.length; s < a; ++s) {
    var l = n[s];
    if (e._ol_layer_Layer_.visibleAtResolution(l, r)) {
        var _ = l.layer.getSource();
        if (_) {
            var h = _.getAttributions2();
            if (h) {
                var c = h(t);
                if (c)
                    if (Array.isArray(c))
                        for (var u = 0, d = c.length; u < d; ++u)
                            c[u] in i || (o.push(c[u]), i[c[u]] = !0);
                    else
                        c in i || (o.push(c), i[c] = !0);
            }
        }
    }
} return o; }, j.render = function (t) { this.updateElement_(t.frameState); }, j.prototype.updateElement_ = function (t) { if (t) {
    var i = this.getSourceAttributions_(t);
    if (!e._ol_array_.equals(i, this.renderedAttributions_)) {
        for (; this.ulElement_.lastChild !== this.logoLi_;)
            this.ulElement_.removeChild(this.ulElement_.lastChild);
        for (var o = 0, n = i.length; o < n; ++o) {
            var r = document.createElement("LI");
            r.innerHTML = i[o], this.ulElement_.appendChild(r);
        }
        0 === i.length && this.renderedAttributions_.length > 0 ? this.element.classList.add("ol-logo-only") : 0 === this.renderedAttributions_.length && i.length > 0 && this.element.classList.remove("ol-logo-only");
        var s = i.length > 0 || !e._ol_obj_.isEmpty(t.logos);
        this.renderedVisible_ != s && (this.element.style.display = s ? "" : "none", this.renderedVisible_ = s), this.renderedAttributions_ = i, this.insertLogos_(t);
    }
}
else
    this.renderedVisible_ && (this.element.style.display = "none", this.renderedVisible_ = !1); }, j.prototype.insertLogos_ = function (t) { var i, o, n, r, s = t.logos, a = this.logoElements_; for (i in a)
    i in s || (e._ol_dom_.removeNode(a[i]), delete a[i]); for (r in s) {
    var l = s[r];
    l instanceof HTMLElement && (this.logoLi_.appendChild(l), a[r] = l), r in a || ((o = new Image).src = r, "" === l ? n = o : ((n = document.createElement("a")).href = l, n.appendChild(o)), this.logoLi_.appendChild(n), a[r] = n);
} this.logoLi_.style.display = e._ol_obj_.isEmpty(s) ? "none" : ""; }, j.prototype.handleClick_ = function (t) { t.preventDefault(), this.handleToggle_(); }, j.prototype.handleToggle_ = function () { this.element.classList.toggle("ol-collapsed"), this.collapsed_ ? e._ol_dom_.replaceNode(this.collapseLabel_, this.label_) : e._ol_dom_.replaceNode(this.label_, this.collapseLabel_), this.collapsed_ = !this.collapsed_; }, j.prototype.getCollapsible = function () { return this.collapsible_; }, j.prototype.setCollapsible = function (t) { this.collapsible_ !== t && (this.collapsible_ = t, this.element.classList.toggle("ol-uncollapsible"), !t && this.collapsed_ && this.handleToggle_()); }, j.prototype.setCollapsed = function (t) { this.collapsible_ && this.collapsed_ !== t && this.handleToggle_(); }, j.prototype.getCollapsed = function () { return this.collapsed_; }; var V = function (t) { var i = t || {}, o = void 0 !== i.className ? i.className : "ol-rotate", n = void 0 !== i.label ? i.label : "⇧"; this.label_ = null, "string" == typeof n ? (this.label_ = document.createElement("span"), this.label_.className = "ol-compass", this.label_.textContent = n) : (this.label_ = n, this.label_.classList.add("ol-compass")); var r = i.tipLabel ? i.tipLabel : "Reset rotation", s = document.createElement("button"); s.className = o + "-reset", s.setAttribute("type", "button"), s.title = r, s.appendChild(this.label_), e._ol_events_.listen(s, e._ol_events_EventType_.CLICK, V.prototype.handleClick_, this); var a = o + " " + e._ol_css_.CLASS_UNSELECTABLE + " " + e._ol_css_.CLASS_CONTROL, l = document.createElement("div"); l.className = a, l.appendChild(s); var _ = i.render ? i.render : V.render; this.callResetNorth_ = i.resetNorth ? i.resetNorth : void 0, W.call(this, { element: l, render: _, target: i.target }), this.duration_ = void 0 !== i.duration ? i.duration : 250, this.autoHide_ = void 0 === i.autoHide || i.autoHide, this.rotation_ = void 0, this.autoHide_ && this.element.classList.add(e._ol_css_.CLASS_HIDDEN); }; e._ol_.inherits(V, W), V.prototype.handleClick_ = function (t) { t.preventDefault(), void 0 !== this.callResetNorth_ ? this.callResetNorth_() : this.resetNorth_(); }, V.prototype.resetNorth_ = function () { var t = this.getMap().getView(); t && void 0 !== t.getRotation() && (this.duration_ > 0 ? t.animate({ rotation: 0, duration: this.duration_, easing: C.easeOut }) : t.setRotation(0)); }, V.render = function (t) { var i = t.frameState; if (i) {
    var o = i.viewState.rotation;
    if (o != this.rotation_) {
        var n = "rotate(" + o + "rad)";
        if (this.autoHide_) {
            var r = this.element.classList.contains(e._ol_css_.CLASS_HIDDEN);
            r || 0 !== o ? r && 0 !== o && this.element.classList.remove(e._ol_css_.CLASS_HIDDEN) : this.element.classList.add(e._ol_css_.CLASS_HIDDEN);
        }
        this.label_.style.msTransform = n, this.label_.style.webkitTransform = n, this.label_.style.transform = n;
    }
    this.rotation_ = o;
} }; var X = function (t) { var i = t || {}, o = void 0 !== i.className ? i.className : "ol-zoom", n = void 0 !== i.delta ? i.delta : 1, r = void 0 !== i.zoomInLabel ? i.zoomInLabel : "+", s = void 0 !== i.zoomOutLabel ? i.zoomOutLabel : "−", a = void 0 !== i.zoomInTipLabel ? i.zoomInTipLabel : "Zoom in", l = void 0 !== i.zoomOutTipLabel ? i.zoomOutTipLabel : "Zoom out", _ = document.createElement("button"); _.className = o + "-in", _.setAttribute("type", "button"), _.title = a, _.appendChild("string" == typeof r ? document.createTextNode(r) : r), e._ol_events_.listen(_, e._ol_events_EventType_.CLICK, X.prototype.handleClick_.bind(this, n)); var h = document.createElement("button"); h.className = o + "-out", h.setAttribute("type", "button"), h.title = l, h.appendChild("string" == typeof s ? document.createTextNode(s) : s), e._ol_events_.listen(h, e._ol_events_EventType_.CLICK, X.prototype.handleClick_.bind(this, -n)); var c = o + " " + e._ol_css_.CLASS_UNSELECTABLE + " " + e._ol_css_.CLASS_CONTROL, u = document.createElement("div"); u.className = c, u.appendChild(_), u.appendChild(h), W.call(this, { element: u, target: i.target }), this.duration_ = void 0 !== i.duration ? i.duration : 250; }; e._ol_.inherits(X, W), X.prototype.handleClick_ = function (t, e) { e.preventDefault(), this.zoomByDelta_(t); }, X.prototype.zoomByDelta_ = function (t) { var e = this.getMap().getView(); if (e) {
    var i = e.getResolution();
    if (i) {
        var o = e.constrainResolution(i, t);
        this.duration_ > 0 ? (e.getAnimating() && e.cancelAnimations(), e.animate({ resolution: o, duration: this.duration_, easing: C.easeOut })) : e.setResolution(o);
    }
} }; var K = function (t) { var i = t || {}, o = new e._ol_Collection_; return (void 0 === i.zoom || i.zoom) && o.push(new X(i.zoomOptions)), (void 0 === i.rotate || i.rotate) && o.push(new V(i.rotateOptions)), (void 0 === i.attribution || i.attribution) && o.push(new j(i.attributionOptions)), o; }, z = function (t, e, i) { this.decay_ = t, this.minVelocity_ = e, this.delay_ = i, this.points_ = [], this.angle_ = 0, this.initialVelocity_ = 0; }; z.prototype.begin = function () { this.points_.length = 0, this.angle_ = 0, this.initialVelocity_ = 0; }, z.prototype.update = function (t, e) { this.points_.push(t, e, Date.now()); }, z.prototype.end = function () { if (this.points_.length < 6)
    return !1; var t = Date.now() - this.delay_, e = this.points_.length - 3; if (this.points_[e + 2] < t)
    return !1; for (var i = e - 3; i > 0 && this.points_[i + 2] > t;)
    i -= 3; var o = this.points_[e + 2] - this.points_[i + 2]; if (o < 1e3 / 60)
    return !1; var n = this.points_[e] - this.points_[i], r = this.points_[e + 1] - this.points_[i + 1]; return this.angle_ = Math.atan2(r, n), this.initialVelocity_ = Math.sqrt(n * n + r * r) / o, this.initialVelocity_ > this.minVelocity_; }, z.prototype.getDistance = function () { return (this.minVelocity_ - this.initialVelocity_) / this.decay_; }, z.prototype.getAngle = function () { return this.angle_; }; var H = function (t) { e._ol_Object_.call(this), this.map_ = null, this.setActive(!0), this.handleEvent = t.handleEvent; }; e._ol_.inherits(H, e._ol_Object_), H.prototype.getActive = function () { return this.get("active"); }, H.prototype.getMap = function () { return this.map_; }, H.prototype.setActive = function (t) { this.set("active", t); }, H.prototype.setMap = function (t) { this.map_ = t; }, H.pan = function (t, e, i) { var o = t.getCenter(); if (o) {
    var n = t.constrainCenter([o[0] + e[0], o[1] + e[1]]);
    i ? t.animate({ duration: i, easing: C.linear, center: n }) : t.setCenter(n);
} }, H.rotate = function (t, e, i, o) { e = t.constrainRotation(e, 0), H.rotateWithoutConstraints(t, e, i, o); }, H.rotateWithoutConstraints = function (t, e, i, o) { if (void 0 !== e) {
    var n = t.getRotation(), r = t.getCenter();
    void 0 !== n && r && o > 0 ? t.animate({ rotation: e, anchor: i, duration: o, easing: C.easeOut }) : t.rotate(e, i);
} }, H.zoom = function (t, e, i, o, n) { e = t.constrainResolution(e, 0, n), H.zoomWithoutConstraints(t, e, i, o); }, H.zoomByDelta = function (t, i, o, n) { var r = t.getResolution(), s = t.constrainResolution(r, i, 0); if (void 0 !== s) {
    var a = t.getResolutions();
    s = e._ol_math_.clamp(s, t.getMinResolution() || a[a.length - 1], t.getMaxResolution() || a[0]);
} if (o && void 0 !== s && s !== r) {
    var l = t.getCenter(), _ = t.calculateCenterZoom(s, o);
    _ = t.constrainCenter(_), o = [(s * l[0] - r * _[0]) / (s - r), (s * l[1] - r * _[1]) / (s - r)];
} H.zoomWithoutConstraints(t, s, o, n); }, H.zoomWithoutConstraints = function (t, e, i, o) { if (e) {
    var n = t.getResolution(), r = t.getCenter();
    if (void 0 !== n && r && e !== n && o)
        t.animate({ resolution: e, anchor: i, duration: o, easing: C.easeOut });
    else {
        if (i) {
            var s = t.calculateCenterZoom(e, i);
            t.setCenter(s);
        }
        t.setResolution(e);
    }
} }; var Y = function (t) { var e = t || {}; this.delta_ = e.delta ? e.delta : 1, H.call(this, { handleEvent: Y.handleEvent }), this.duration_ = void 0 !== e.duration ? e.duration : 250; }; e._ol_.inherits(Y, H), Y.handleEvent = function (t) { var e = !1, i = t.originalEvent; if (t.type == r.DBLCLICK) {
    var o = t.map, n = t.coordinate, s = i.shiftKey ? -this.delta_ : this.delta_, a = o.getView();
    H.zoomByDelta(a, s, n, this.duration_), t.preventDefault(), e = !0;
} return !e; }; var q = { altKeyOnly: function (t) { var e = t.originalEvent; return e.altKey && !(e.metaKey || e.ctrlKey) && !e.shiftKey; }, altShiftKeysOnly: function (t) { var e = t.originalEvent; return e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey; } }; q.always = e._ol_functions_.TRUE, q.click = function (t) { return t.type == r.CLICK; }, q.mouseActionButton = function (t) { var i = t.originalEvent; return 0 == i.button && !(e._ol_has_.WEBKIT && e._ol_has_.MAC && i.ctrlKey); }, q.never = e._ol_functions_.FALSE, q.pointerMove = function (t) { return "pointermove" == t.type; }, q.singleClick = function (t) { return t.type == r.SINGLECLICK; }, q.doubleClick = function (t) { return t.type == r.DBLCLICK; }, q.noModifierKeys = function (t) { var e = t.originalEvent; return !e.altKey && !(e.metaKey || e.ctrlKey) && !e.shiftKey; }, q.platformModifierKeyOnly = function (t) { var i = t.originalEvent; return !i.altKey && (e._ol_has_.MAC ? i.metaKey : i.ctrlKey) && !i.shiftKey; }, q.shiftKeyOnly = function (t) { var e = t.originalEvent; return !e.altKey && !(e.metaKey || e.ctrlKey) && e.shiftKey; }, q.targetNotEditable = function (t) { var e = t.originalEvent.target.tagName; return "INPUT" !== e && "SELECT" !== e && "TEXTAREA" !== e; }, q.mouseOnly = function (t) { return e._ol_asserts_.assert(t.pointerEvent, 56), "mouse" == t.pointerEvent.pointerType; }, q.primaryAction = function (t) { var e = t.pointerEvent; return e.isPrimary && 0 === e.button; }; var Z = function (t) { var e = t || {}, i = e.handleEvent ? e.handleEvent : Z.handleEvent; H.call(this, { handleEvent: i }), this.handleDownEvent_ = e.handleDownEvent ? e.handleDownEvent : Z.handleDownEvent, this.handleDragEvent_ = e.handleDragEvent ? e.handleDragEvent : Z.handleDragEvent, this.handleMoveEvent_ = e.handleMoveEvent ? e.handleMoveEvent : Z.handleMoveEvent, this.handleUpEvent_ = e.handleUpEvent ? e.handleUpEvent : Z.handleUpEvent, this.handlingDownUpSequence = !1, this.trackedPointers_ = {}, this.targetPointers = []; }; e._ol_.inherits(Z, H), Z.centroid = function (t) { for (var e = t.length, i = 0, o = 0, n = 0; n < e; n++)
    i += t[n].clientX, o += t[n].clientY; return [i / e, o / e]; }, Z.prototype.isPointerDraggingEvent_ = function (t) { var e = t.type; return e === r.POINTERDOWN || e === r.POINTERDRAG || e === r.POINTERUP; }, Z.prototype.updateTrackedPointers_ = function (t) { if (this.isPointerDraggingEvent_(t)) {
    var i = t.pointerEvent, o = i.pointerId.toString();
    t.type == r.POINTERUP ? delete this.trackedPointers_[o] : t.type == r.POINTERDOWN ? this.trackedPointers_[o] = i : o in this.trackedPointers_ && (this.trackedPointers_[o] = i), this.targetPointers = e._ol_obj_.getValues(this.trackedPointers_);
} }, Z.handleDragEvent = e._ol_.nullFunction, Z.handleUpEvent = e._ol_functions_.FALSE, Z.handleDownEvent = e._ol_functions_.FALSE, Z.handleMoveEvent = e._ol_.nullFunction, Z.handleEvent = function (t) { if (!(t instanceof s))
    return !0; var e = !1; if (this.updateTrackedPointers_(t), this.handlingDownUpSequence) {
    if (t.type == r.POINTERDRAG)
        this.handleDragEvent_(t);
    else if (t.type == r.POINTERUP) {
        var i = this.handleUpEvent_(t);
        this.handlingDownUpSequence = i && this.targetPointers.length > 0;
    }
}
else if (t.type == r.POINTERDOWN) {
    var o = this.handleDownEvent_(t);
    this.handlingDownUpSequence = o, e = this.shouldStopEvent(o);
}
else
    t.type == r.POINTERMOVE && this.handleMoveEvent_(t); return !e; }, Z.prototype.shouldStopEvent = function (t) { return t; }; var J = function (t) { Z.call(this, { handleDownEvent: J.handleDownEvent_, handleDragEvent: J.handleDragEvent_, handleUpEvent: J.handleUpEvent_ }); var e = t || {}; this.kinetic_ = e.kinetic, this.lastCentroid = null, this.lastPointersCount_, this.condition_ = e.condition ? e.condition : q.noModifierKeys, this.noKinetic_ = !1; }; e._ol_.inherits(J, Z), J.handleDragEvent_ = function (t) { var e = this.targetPointers, i = Z.centroid(e); if (e.length == this.lastPointersCount_) {
    if (this.kinetic_ && this.kinetic_.update(i[0], i[1]), this.lastCentroid) {
        var o = this.lastCentroid[0] - i[0], n = i[1] - this.lastCentroid[1], r = t.map.getView(), s = r.getState(), a = [o, n];
        T.scale(a, s.resolution), T.rotate(a, s.rotation), T.add(a, s.center), a = r.constrainCenter(a), r.setCenter(a);
    }
}
else
    this.kinetic_ && this.kinetic_.begin(); this.lastCentroid = i, this.lastPointersCount_ = e.length; }, J.handleUpEvent_ = function (t) { var e = t.map, i = e.getView(); if (0 === this.targetPointers.length) {
    if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
        var o = this.kinetic_.getDistance(), n = this.kinetic_.getAngle(), r = i.getCenter(), s = e.getPixelFromCoordinate(r), a = e.getCoordinateFromPixel([s[0] - o * Math.cos(n), s[1] - o * Math.sin(n)]);
        i.animate({ center: i.constrainCenter(a), duration: 500, easing: C.easeOut });
    }
    return i.setHint(1, -1), !1;
} return this.kinetic_ && this.kinetic_.begin(), this.lastCentroid = null, !0; }, J.handleDownEvent_ = function (t) { if (this.targetPointers.length > 0 && this.condition_(t)) {
    var e = t.map.getView();
    return this.lastCentroid = null, this.handlingDownUpSequence || e.setHint(1, 1), e.getAnimating() && e.setCenter(t.frameState.viewState.center), this.kinetic_ && this.kinetic_.begin(), this.noKinetic_ = this.targetPointers.length > 1, !0;
} return !1; }, J.prototype.shouldStopEvent = e._ol_functions_.FALSE; var Q = function (t) { var e = t || {}; Z.call(this, { handleDownEvent: Q.handleDownEvent_, handleDragEvent: Q.handleDragEvent_, handleUpEvent: Q.handleUpEvent_ }), this.condition_ = e.condition ? e.condition : q.altShiftKeysOnly, this.lastAngle_ = void 0, this.duration_ = void 0 !== e.duration ? e.duration : 250; }; e._ol_.inherits(Q, Z), Q.handleDragEvent_ = function (t) { if (q.mouseOnly(t)) {
    var e = t.map, i = e.getView();
    if (i.getConstraints().rotation !== x.disable) {
        var o = e.getSize(), n = t.pixel, r = Math.atan2(o[1] / 2 - n[1], n[0] - o[0] / 2);
        if (void 0 !== this.lastAngle_) {
            var s = r - this.lastAngle_, a = i.getRotation();
            H.rotateWithoutConstraints(i, a - s);
        }
        this.lastAngle_ = r;
    }
} }, Q.handleUpEvent_ = function (t) { if (!q.mouseOnly(t))
    return !0; var e = t.map.getView(); e.setHint(1, -1); var i = e.getRotation(); return H.rotate(e, i, void 0, this.duration_), !1; }, Q.handleDownEvent_ = function (t) { return !(!q.mouseOnly(t) || !q.mouseActionButton(t) || !this.condition_(t) || (t.map.getView().setHint(1, 1), this.lastAngle_ = void 0, 0)); }, Q.prototype.shouldStopEvent = e._ol_functions_.FALSE; var $ = function (t) { this.geometry_ = null, this.element_ = document.createElement("div"), this.element_.style.position = "absolute", this.element_.className = "ol-box " + t, this.map_ = null, this.startPixel_ = null, this.endPixel_ = null; }; e._ol_.inherits($, e._ol_Disposable_), $.prototype.disposeInternal = function () { this.setMap(null); }, $.prototype.render_ = function () { var t = this.startPixel_, e = this.endPixel_, i = this.element_.style; i.left = Math.min(t[0], e[0]) + "px", i.top = Math.min(t[1], e[1]) + "px", i.width = Math.abs(e[0] - t[0]) + "px", i.height = Math.abs(e[1] - t[1]) + "px"; }, $.prototype.setMap = function (t) { if (this.map_) {
    this.map_.getOverlayContainer().removeChild(this.element_);
    var e = this.element_.style;
    e.left = e.top = e.width = e.height = "inherit";
} this.map_ = t, this.map_ && this.map_.getOverlayContainer().appendChild(this.element_); }, $.prototype.setPixels = function (t, e) { this.startPixel_ = t, this.endPixel_ = e, this.createOrUpdateGeometry(), this.render_(); }, $.prototype.createOrUpdateGeometry = function () { var t = this.startPixel_, e = this.endPixel_, i = [t, [t[0], e[1]], e, [e[0], t[1]]].map(this.map_.getCoordinateFromPixel, this.map_); i[4] = i[0].slice(), this.geometry_ ? this.geometry_.setCoordinates([i]) : this.geometry_ = new G([i]); }, $.prototype.getGeometry = function () { return this.geometry_; }; var tt = function (t) { Z.call(this, { handleDownEvent: tt.handleDownEvent_, handleDragEvent: tt.handleDragEvent_, handleUpEvent: tt.handleUpEvent_ }); var e = t || {}; this.box_ = new $(e.className || "ol-dragbox"), this.minArea_ = void 0 !== e.minArea ? e.minArea : 64, this.startPixel_ = null, this.condition_ = e.condition ? e.condition : q.always, this.boxEndCondition_ = e.boxEndCondition ? e.boxEndCondition : tt.defaultBoxEndCondition; }; e._ol_.inherits(tt, Z), tt.defaultBoxEndCondition = function (t, e, i) { var o = i[0] - e[0], n = i[1] - e[1]; return o * o + n * n >= this.minArea_; }, tt.handleDragEvent_ = function (t) { q.mouseOnly(t) && (this.box_.setPixels(this.startPixel_, t.pixel), this.dispatchEvent(new tt.Event(tt.EventType_.BOXDRAG, t.coordinate, t))); }, tt.prototype.getGeometry = function () { return this.box_.getGeometry(); }, tt.prototype.onBoxEnd = e._ol_.nullFunction, tt.handleUpEvent_ = function (t) { return !q.mouseOnly(t) || (this.box_.setMap(null), this.boxEndCondition_(t, this.startPixel_, t.pixel) && (this.onBoxEnd(t), this.dispatchEvent(new tt.Event(tt.EventType_.BOXEND, t.coordinate, t))), !1); }, tt.handleDownEvent_ = function (t) { return !(!q.mouseOnly(t) || !q.mouseActionButton(t) || !this.condition_(t) || (this.startPixel_ = t.pixel, this.box_.setMap(t.map), this.box_.setPixels(this.startPixel_, this.startPixel_), this.dispatchEvent(new tt.Event(tt.EventType_.BOXSTART, t.coordinate, t)), 0)); }, tt.EventType_ = { BOXSTART: "boxstart", BOXDRAG: "boxdrag", BOXEND: "boxend" }, tt.Event = function (t, i, o) { e._ol_events_Event_.call(this, t), this.coordinate = i, this.mapBrowserEvent = o; }, e._ol_.inherits(tt.Event, e._ol_events_Event_); var et = function (t) { var e = t || {}, i = e.condition ? e.condition : q.shiftKeyOnly; this.duration_ = void 0 !== e.duration ? e.duration : 200, this.out_ = void 0 !== e.out && e.out, tt.call(this, { condition: i, className: e.className || "ol-dragzoom" }); }; e._ol_.inherits(et, tt), et.prototype.onBoxEnd = function () { var t = this.getMap(), i = t.getView(), o = t.getSize(), n = this.getGeometry().getExtent(); if (this.out_) {
    var r = i.calculateExtent(o), s = e._ol_extent_.createOrUpdateFromCoordinates([t.getPixelFromCoordinate(e._ol_extent_.getBottomLeft(n)), t.getPixelFromCoordinate(e._ol_extent_.getTopRight(n))]), a = i.getResolutionForExtent(s, o);
    e._ol_extent_.scaleFromCenter(r, 1 / a), n = r;
} var l = i.constrainResolution(i.getResolutionForExtent(n, o)), _ = e._ol_extent_.getCenter(n); _ = i.constrainCenter(_), i.animate({ resolution: l, center: _, duration: this.duration_, easing: C.easeOut }); }; var it = function (t) { H.call(this, { handleEvent: it.handleEvent }); var e = t || {}; this.defaultCondition_ = function (t) { return q.noModifierKeys(t) && q.targetNotEditable(t); }, this.condition_ = void 0 !== e.condition ? e.condition : this.defaultCondition_, this.duration_ = void 0 !== e.duration ? e.duration : 100, this.pixelDelta_ = void 0 !== e.pixelDelta ? e.pixelDelta : 128; }; e._ol_.inherits(it, H), it.handleEvent = function (t) { var i = !1; if (t.type == e._ol_events_EventType_.KEYDOWN) {
    var o = t.originalEvent.keyCode;
    if (this.condition_(t) && (40 == o || 37 == o || 39 == o || 38 == o)) {
        var n = t.map.getView(), r = n.getResolution() * this.pixelDelta_, s = 0, a = 0;
        40 == o ? a = -r : 37 == o ? s = -r : 39 == o ? s = r : a = r;
        var l = [s, a];
        T.rotate(l, n.getRotation()), H.pan(n, l, this.duration_), t.preventDefault(), i = !0;
    }
} return !i; }; var ot = function (t) { H.call(this, { handleEvent: ot.handleEvent }); var e = t || {}; this.condition_ = e.condition ? e.condition : q.targetNotEditable, this.delta_ = e.delta ? e.delta : 1, this.duration_ = void 0 !== e.duration ? e.duration : 100; }; e._ol_.inherits(ot, H), ot.handleEvent = function (t) { var i = !1; if (t.type == e._ol_events_EventType_.KEYDOWN || t.type == e._ol_events_EventType_.KEYPRESS) {
    var o = t.originalEvent.charCode;
    if (this.condition_(t) && (o == "+".charCodeAt(0) || o == "-".charCodeAt(0))) {
        var n = t.map, r = o == "+".charCodeAt(0) ? this.delta_ : -this.delta_, s = n.getView();
        H.zoomByDelta(s, r, void 0, this.duration_), t.preventDefault(), i = !0;
    }
} return !i; }; var nt = function (t) { H.call(this, { handleEvent: nt.handleEvent }); var e = t || {}; this.delta_ = 0, this.duration_ = void 0 !== e.duration ? e.duration : 250, this.timeout_ = void 0 !== e.timeout ? e.timeout : 80, this.useAnchor_ = void 0 === e.useAnchor || e.useAnchor, this.constrainResolution_ = e.constrainResolution || !1, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_ = void 0, this.mode_ = void 0, this.trackpadEventGap_ = 400, this.trackpadTimeoutId_ = void 0, this.trackpadDeltaPerZoom_ = 300, this.trackpadZoomBuffer_ = 1.5; }; e._ol_.inherits(nt, H), nt.handleEvent = function (t) { var i = t.type; if (i !== e._ol_events_EventType_.WHEEL && i !== e._ol_events_EventType_.MOUSEWHEEL)
    return !0; t.preventDefault(); var o, n = t.map, r = t.originalEvent; if (this.useAnchor_ && (this.lastAnchor_ = t.coordinate), t.type == e._ol_events_EventType_.WHEEL ? (o = r.deltaY, e._ol_has_.FIREFOX && r.deltaMode === WheelEvent.DOM_DELTA_PIXEL && (o /= e._ol_has_.DEVICE_PIXEL_RATIO), r.deltaMode === WheelEvent.DOM_DELTA_LINE && (o *= 40)) : t.type == e._ol_events_EventType_.MOUSEWHEEL && (o = -r.wheelDeltaY, e._ol_has_.SAFARI && (o /= 3)), 0 === o)
    return !1; var s = Date.now(); if (void 0 === this.startTime_ && (this.startTime_ = s), (!this.mode_ || s - this.startTime_ > this.trackpadEventGap_) && (this.mode_ = Math.abs(o) < 4 ? nt.Mode_.TRACKPAD : nt.Mode_.WHEEL), this.mode_ === nt.Mode_.TRACKPAD) {
    var a = n.getView();
    this.trackpadTimeoutId_ ? clearTimeout(this.trackpadTimeoutId_) : a.setHint(1, 1), this.trackpadTimeoutId_ = setTimeout(this.decrementInteractingHint_.bind(this), this.trackpadEventGap_);
    var l = a.getResolution() * Math.pow(2, o / this.trackpadDeltaPerZoom_), _ = a.getMinResolution(), h = a.getMaxResolution(), c = 0;
    if (l < _ ? (l = Math.max(l, _ / this.trackpadZoomBuffer_), c = 1) : l > h && (l = Math.min(l, h * this.trackpadZoomBuffer_), c = -1), this.lastAnchor_) {
        var u = a.calculateCenterZoom(l, this.lastAnchor_);
        a.setCenter(a.constrainCenter(u));
    }
    return a.setResolution(l), 0 === c && this.constrainResolution_ && a.animate({ resolution: a.constrainResolution(l, o > 0 ? -1 : 1), easing: C.easeOut, anchor: this.lastAnchor_, duration: this.duration_ }), c > 0 ? a.animate({ resolution: _, easing: C.easeOut, anchor: this.lastAnchor_, duration: 500 }) : c < 0 && a.animate({ resolution: h, easing: C.easeOut, anchor: this.lastAnchor_, duration: 500 }), this.startTime_ = s, !1;
} this.delta_ += o; var d = Math.max(this.timeout_ - (s - this.startTime_), 0); return clearTimeout(this.timeoutId_), this.timeoutId_ = setTimeout(this.handleWheelZoom_.bind(this, n), d), !1; }, nt.prototype.decrementInteractingHint_ = function () { this.trackpadTimeoutId_ = void 0, this.getMap().getView().setHint(1, -1); }, nt.prototype.handleWheelZoom_ = function (t) { var i = t.getView(); i.getAnimating() && i.cancelAnimations(); var o = e._ol_.MOUSEWHEELZOOM_MAXDELTA, n = e._ol_math_.clamp(this.delta_, -o, o); H.zoomByDelta(i, -n, this.lastAnchor_, this.duration_), this.mode_ = void 0, this.delta_ = 0, this.lastAnchor_ = null, this.startTime_ = void 0, this.timeoutId_ = void 0; }, nt.prototype.setMouseAnchor = function (t) { this.useAnchor_ = t, t || (this.lastAnchor_ = null); }, nt.Mode_ = { TRACKPAD: "trackpad", WHEEL: "wheel" }; var rt = function (t) { Z.call(this, { handleDownEvent: rt.handleDownEvent_, handleDragEvent: rt.handleDragEvent_, handleUpEvent: rt.handleUpEvent_ }); var e = t || {}; this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.threshold_ = void 0 !== e.threshold ? e.threshold : .3, this.duration_ = void 0 !== e.duration ? e.duration : 250; }; e._ol_.inherits(rt, Z), rt.handleDragEvent_ = function (t) { var e = 0, i = this.targetPointers[0], o = this.targetPointers[1], n = Math.atan2(o.clientY - i.clientY, o.clientX - i.clientX); if (void 0 !== this.lastAngle_) {
    var r = n - this.lastAngle_;
    this.rotationDelta_ += r, !this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_ && (this.rotating_ = !0), e = r;
} this.lastAngle_ = n; var s = t.map, a = s.getView(); if (a.getConstraints().rotation !== x.disable) {
    var l = s.getViewport().getBoundingClientRect(), _ = Z.centroid(this.targetPointers);
    if (_[0] -= l.left, _[1] -= l.top, this.anchor_ = s.getCoordinateFromPixel(_), this.rotating_) {
        var h = a.getRotation();
        s.render(), H.rotateWithoutConstraints(a, h + e, this.anchor_);
    }
} }, rt.handleUpEvent_ = function (t) { if (this.targetPointers.length < 2) {
    var e = t.map.getView();
    if (e.setHint(1, -1), this.rotating_) {
        var i = e.getRotation();
        H.rotate(e, i, this.anchor_, this.duration_);
    }
    return !1;
} return !0; }, rt.handleDownEvent_ = function (t) { if (this.targetPointers.length >= 2) {
    var e = t.map;
    return this.anchor_ = null, this.lastAngle_ = void 0, this.rotating_ = !1, this.rotationDelta_ = 0, this.handlingDownUpSequence || e.getView().setHint(1, 1), !0;
} return !1; }, rt.prototype.shouldStopEvent = e._ol_functions_.FALSE; var st = function (t) { Z.call(this, { handleDownEvent: st.handleDownEvent_, handleDragEvent: st.handleDragEvent_, handleUpEvent: st.handleUpEvent_ }); var e = t || {}; this.constrainResolution_ = e.constrainResolution || !1, this.anchor_ = null, this.duration_ = void 0 !== e.duration ? e.duration : 400, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1; }; e._ol_.inherits(st, Z), st.handleDragEvent_ = function (t) { var e = 1, i = this.targetPointers[0], o = this.targetPointers[1], n = i.clientX - o.clientX, r = i.clientY - o.clientY, s = Math.sqrt(n * n + r * r); void 0 !== this.lastDistance_ && (e = this.lastDistance_ / s), this.lastDistance_ = s; var a = t.map, l = a.getView(), _ = l.getResolution(), h = l.getMaxResolution(), c = l.getMinResolution(), u = _ * e; u > h ? (e = h / _, u = h) : u < c && (e = c / _, u = c), 1 != e && (this.lastScaleDelta_ = e); var d = a.getViewport().getBoundingClientRect(), p = Z.centroid(this.targetPointers); p[0] -= d.left, p[1] -= d.top, this.anchor_ = a.getCoordinateFromPixel(p), a.render(), H.zoomWithoutConstraints(l, u, this.anchor_); }, st.handleUpEvent_ = function (t) { if (this.targetPointers.length < 2) {
    var e = t.map.getView();
    e.setHint(1, -1);
    var i = e.getResolution();
    if (this.constrainResolution_ || i < e.getMinResolution() || i > e.getMaxResolution()) {
        var o = this.lastScaleDelta_ - 1;
        H.zoom(e, i, this.anchor_, this.duration_, o);
    }
    return !1;
} return !0; }, st.handleDownEvent_ = function (t) { if (this.targetPointers.length >= 2) {
    var e = t.map;
    return this.anchor_ = null, this.lastDistance_ = void 0, this.lastScaleDelta_ = 1, this.handlingDownUpSequence || e.getView().setHint(1, 1), !0;
} return !1; }, st.prototype.shouldStopEvent = e._ol_functions_.FALSE; var at = function (t) { var i = t || {}, o = new e._ol_Collection_, n = new z(-.005, .05, 100); return (void 0 === i.altShiftDragRotate || i.altShiftDragRotate) && o.push(new Q), (void 0 === i.doubleClickZoom || i.doubleClickZoom) && o.push(new Y({ delta: i.zoomDelta, duration: i.zoomDuration })), (void 0 === i.dragPan || i.dragPan) && o.push(new J({ kinetic: n })), (void 0 === i.pinchRotate || i.pinchRotate) && o.push(new rt), (void 0 === i.pinchZoom || i.pinchZoom) && o.push(new st({ constrainResolution: i.constrainResolution, duration: i.zoomDuration })), (void 0 === i.keyboard || i.keyboard) && (o.push(new it), o.push(new ot({ delta: i.zoomDelta, duration: i.zoomDuration }))), (void 0 === i.mouseWheelZoom || i.mouseWheelZoom) && o.push(new nt({ constrainResolution: i.constrainResolution, duration: i.zoomDuration })), (void 0 === i.shiftDragZoom || i.shiftDragZoom) && o.push(new et({ duration: i.zoomDuration })), o; }, lt = function (t, i, o, n) { e._ol_events_EventTarget_.call(this), this.extent = t, this.pixelRatio_ = o, this.resolution = i, this.state = n; }; e._ol_.inherits(lt, e._ol_events_EventTarget_), lt.prototype.changed = function () { this.dispatchEvent(e._ol_events_EventType_.CHANGE); }, lt.prototype.getExtent = function () { return this.extent; }, lt.prototype.getImage = function () { }, lt.prototype.getPixelRatio = function () { return this.pixelRatio_; }, lt.prototype.getResolution = function () { return this.resolution; }, lt.prototype.getState = function () { return this.state; }, lt.prototype.load = function () { }; var _t = function (t, i, o, n, r) { this.loader_ = void 0 !== r ? r : null; var s = void 0 !== r ? e._ol_ImageState_.IDLE : e._ol_ImageState_.LOADED; lt.call(this, t, i, o, s), this.canvas_ = n, this.error_ = null; }; e._ol_.inherits(_t, lt), _t.prototype.getError = function () { return this.error_; }, _t.prototype.handleLoad_ = function (t) { t ? (this.error_ = t, this.state = e._ol_ImageState_.ERROR) : this.state = e._ol_ImageState_.LOADED, this.changed(); }, _t.prototype.load = function () { this.state == e._ol_ImageState_.IDLE && (this.state = e._ol_ImageState_.LOADING, this.changed(), this.loader_(this.handleLoad_.bind(this))); }, _t.prototype.getImage = function () { return this.canvas_; }; var ht = function (t, i, o, n, r) { e._ol_events_Event_.call(this, t), this.vectorContext = i, this.frameState = o, this.context = n, this.glContext = r; }; e._ol_.inherits(ht, e._ol_events_Event_); var ct = function () { }; ct.prototype.drawCustom = function (t, e, i) { }, ct.prototype.drawGeometry = function (t) { }, ct.prototype.setStyle = function (t) { }, ct.prototype.drawCircle = function (t, e) { }, ct.prototype.drawFeature = function (t, e) { }, ct.prototype.drawGeometryCollection = function (t, e) { }, ct.prototype.drawLineString = function (t, e) { }, ct.prototype.drawMultiLineString = function (t, e) { }, ct.prototype.drawMultiPoint = function (t, e) { }, ct.prototype.drawMultiPolygon = function (t, e) { }, ct.prototype.drawPoint = function (t, e) { }, ct.prototype.drawPolygon = function (t, e) { }, ct.prototype.drawText = function (t, e) { }, ct.prototype.setFillStrokeStyle = function (t, e) { }, ct.prototype.setImageStyle = function (t, e) { }, ct.prototype.setTextStyle = function (t, e) { }; var ut = function (t, i, o, n, r) { ct.call(this), this.context_ = t, this.pixelRatio_ = i, this.extent_ = o, this.transform_ = n, this.viewRotation_ = r, this.contextFillState_ = null, this.contextStrokeState_ = null, this.contextTextState_ = null, this.fillState_ = null, this.strokeState_ = null, this.image_ = null, this.imageAnchorX_ = 0, this.imageAnchorY_ = 0, this.imageHeight_ = 0, this.imageOpacity_ = 0, this.imageOriginX_ = 0, this.imageOriginY_ = 0, this.imageRotateWithView_ = !1, this.imageRotation_ = 0, this.imageScale_ = 0, this.imageSnapToPixel_ = !1, this.imageWidth_ = 0, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = !1, this.textRotation_ = 0, this.textScale_ = 0, this.textFillState_ = null, this.textStrokeState_ = null, this.textState_ = null, this.pixelCoordinates_ = [], this.tmpLocalTransform_ = e._ol_transform_.create(); }; e._ol_.inherits(ut, ct), ut.prototype.drawImages_ = function (t, i, o, n) { if (this.image_) {
    var r = e._ol_geom_flat_transform_.transform2D(t, i, o, 2, this.transform_, this.pixelCoordinates_), s = this.context_, a = this.tmpLocalTransform_, l = s.globalAlpha;
    1 != this.imageOpacity_ && (s.globalAlpha = l * this.imageOpacity_);
    var _, h, c = this.imageRotation_;
    for (this.imageRotateWithView_ && (c += this.viewRotation_), _ = 0, h = r.length; _ < h; _ += 2) {
        var u = r[_] - this.imageAnchorX_, d = r[_ + 1] - this.imageAnchorY_;
        if (this.imageSnapToPixel_ && (u = Math.round(u), d = Math.round(d)), 0 !== c || 1 != this.imageScale_) {
            var p = u + this.imageAnchorX_, f = d + this.imageAnchorY_;
            e._ol_transform_.compose(a, p, f, this.imageScale_, this.imageScale_, c, -p, -f), s.setTransform.apply(s, a);
        }
        s.drawImage(this.image_, this.imageOriginX_, this.imageOriginY_, this.imageWidth_, this.imageHeight_, u, d, this.imageWidth_, this.imageHeight_);
    }
    0 === c && 1 == this.imageScale_ || s.setTransform(1, 0, 0, 1, 0, 0), 1 != this.imageOpacity_ && (s.globalAlpha = l);
} }, ut.prototype.drawText_ = function (t, i, o, n) { if (this.textState_ && "" !== this.text_) {
    this.textFillState_ && this.setContextFillState_(this.textFillState_), this.textStrokeState_ && this.setContextStrokeState_(this.textStrokeState_), this.setContextTextState_(this.textState_);
    var r = e._ol_geom_flat_transform_.transform2D(t, i, o, n, this.transform_, this.pixelCoordinates_), s = this.context_, a = this.textRotation_;
    for (this.textRotateWithView_ && (a += this.viewRotation_); i < o; i += n) {
        var l = r[i] + this.textOffsetX_, _ = r[i + 1] + this.textOffsetY_;
        if (0 !== a || 1 != this.textScale_) {
            var h = e._ol_transform_.compose(this.tmpLocalTransform_, l, _, this.textScale_, this.textScale_, a, -l, -_);
            s.setTransform.apply(s, h);
        }
        this.textStrokeState_ && s.strokeText(this.text_, l, _), this.textFillState_ && s.fillText(this.text_, l, _);
    }
    0 === a && 1 == this.textScale_ || s.setTransform(1, 0, 0, 1, 0, 0);
} }, ut.prototype.moveToLineTo_ = function (t, i, o, n, r) { var s = this.context_, a = e._ol_geom_flat_transform_.transform2D(t, i, o, n, this.transform_, this.pixelCoordinates_); s.moveTo(a[0], a[1]); var l = a.length; r && (l -= 2); for (var _ = 2; _ < l; _ += 2)
    s.lineTo(a[_], a[_ + 1]); return r && s.closePath(), o; }, ut.prototype.drawRings_ = function (t, e, i, o) { var n, r; for (n = 0, r = i.length; n < r; ++n)
    e = this.moveToLineTo_(t, e, i[n], o, !0); return e; }, ut.prototype.drawCircle = function (t) { if (e._ol_extent_.intersects(this.extent_, t.getExtent())) {
    if (this.fillState_ || this.strokeState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        var i = e._ol_geom_SimpleGeometry_.transform2D(t, this.transform_, this.pixelCoordinates_), o = i[2] - i[0], n = i[3] - i[1], r = Math.sqrt(o * o + n * n), s = this.context_;
        s.beginPath(), s.arc(i[0], i[1], r, 0, 2 * Math.PI), this.fillState_ && s.fill(), this.strokeState_ && s.stroke();
    }
    "" !== this.text_ && this.drawText_(t.getCenter(), 0, 2, 2);
} }, ut.prototype.setStyle = function (t) { this.setFillStrokeStyle(t.getFill(), t.getStroke()), this.setImageStyle(t.getImage()), this.setTextStyle(t.getText()); }, ut.prototype.drawGeometry = function (t) { switch (t.getType()) {
    case e._ol_geom_GeometryType_.POINT:
        this.drawPoint(t);
        break;
    case e._ol_geom_GeometryType_.LINE_STRING:
        this.drawLineString(t);
        break;
    case e._ol_geom_GeometryType_.POLYGON:
        this.drawPolygon(t);
        break;
    case e._ol_geom_GeometryType_.MULTI_POINT:
        this.drawMultiPoint(t);
        break;
    case e._ol_geom_GeometryType_.MULTI_LINE_STRING:
        this.drawMultiLineString(t);
        break;
    case e._ol_geom_GeometryType_.MULTI_POLYGON:
        this.drawMultiPolygon(t);
        break;
    case e._ol_geom_GeometryType_.GEOMETRY_COLLECTION:
        this.drawGeometryCollection(t);
        break;
    case e._ol_geom_GeometryType_.CIRCLE: this.drawCircle(t);
} }, ut.prototype.drawFeature = function (t, i) { var o = i.getGeometryFunction()(t); o && e._ol_extent_.intersects(this.extent_, o.getExtent()) && (this.setStyle(i), this.drawGeometry(o)); }, ut.prototype.drawGeometryCollection = function (t) { var e, i, o = t.getGeometriesArray(); for (e = 0, i = o.length; e < i; ++e)
    this.drawGeometry(o[e]); }, ut.prototype.drawPoint = function (t) { var e = t.getFlatCoordinates(), i = t.getStride(); this.image_ && this.drawImages_(e, 0, e.length, i), "" !== this.text_ && this.drawText_(e, 0, e.length, i); }, ut.prototype.drawMultiPoint = function (t) { var e = t.getFlatCoordinates(), i = t.getStride(); this.image_ && this.drawImages_(e, 0, e.length, i), "" !== this.text_ && this.drawText_(e, 0, e.length, i); }, ut.prototype.drawLineString = function (t) { if (e._ol_extent_.intersects(this.extent_, t.getExtent())) {
    if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        var i = this.context_, o = t.getFlatCoordinates();
        i.beginPath(), this.moveToLineTo_(o, 0, o.length, t.getStride(), !1), i.stroke();
    }
    if ("" !== this.text_) {
        var n = t.getFlatMidpoint();
        this.drawText_(n, 0, 2, 2);
    }
} }, ut.prototype.drawMultiLineString = function (t) { var i = t.getExtent(); if (e._ol_extent_.intersects(this.extent_, i)) {
    if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
        var o, n, r = this.context_, s = t.getFlatCoordinates(), a = 0, l = t.getEnds(), _ = t.getStride();
        for (r.beginPath(), o = 0, n = l.length; o < n; ++o)
            a = this.moveToLineTo_(s, a, l[o], _, !1);
        r.stroke();
    }
    if ("" !== this.text_) {
        var h = t.getFlatMidpoints();
        this.drawText_(h, 0, h.length, 2);
    }
} }, ut.prototype.drawPolygon = function (t) { if (e._ol_extent_.intersects(this.extent_, t.getExtent())) {
    if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        var i = this.context_;
        i.beginPath(), this.drawRings_(t.getOrientedFlatCoordinates(), 0, t.getEnds(), t.getStride()), this.fillState_ && i.fill(), this.strokeState_ && i.stroke();
    }
    if ("" !== this.text_) {
        var o = t.getFlatInteriorPoint();
        this.drawText_(o, 0, 2, 2);
    }
} }, ut.prototype.drawMultiPolygon = function (t) { if (e._ol_extent_.intersects(this.extent_, t.getExtent())) {
    if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_), this.strokeState_ && this.setContextStrokeState_(this.strokeState_);
        var i, o, n = this.context_, r = t.getOrientedFlatCoordinates(), s = 0, a = t.getEndss(), l = t.getStride();
        for (n.beginPath(), i = 0, o = a.length; i < o; ++i) {
            var _ = a[i];
            s = this.drawRings_(r, s, _, l);
        }
        this.fillState_ && n.fill(), this.strokeState_ && n.stroke();
    }
    if ("" !== this.text_) {
        var h = t.getFlatInteriorPoints();
        this.drawText_(h, 0, h.length, 2);
    }
} }, ut.prototype.setContextFillState_ = function (t) { var e = this.context_, i = this.contextFillState_; i ? i.fillStyle != t.fillStyle && (i.fillStyle = e.fillStyle = t.fillStyle) : (e.fillStyle = t.fillStyle, this.contextFillState_ = { fillStyle: t.fillStyle }); }, ut.prototype.setContextStrokeState_ = function (t) { var i = this.context_, o = this.contextStrokeState_; o ? (o.lineCap != t.lineCap && (o.lineCap = i.lineCap = t.lineCap), e._ol_has_.CANVAS_LINE_DASH && (e._ol_array_.equals(o.lineDash, t.lineDash) || i.setLineDash(o.lineDash = t.lineDash), o.lineDashOffset != t.lineDashOffset && (o.lineDashOffset = i.lineDashOffset = t.lineDashOffset)), o.lineJoin != t.lineJoin && (o.lineJoin = i.lineJoin = t.lineJoin), o.lineWidth != t.lineWidth && (o.lineWidth = i.lineWidth = t.lineWidth), o.miterLimit != t.miterLimit && (o.miterLimit = i.miterLimit = t.miterLimit), o.strokeStyle != t.strokeStyle && (o.strokeStyle = i.strokeStyle = t.strokeStyle)) : (i.lineCap = t.lineCap, e._ol_has_.CANVAS_LINE_DASH && (i.setLineDash(t.lineDash), i.lineDashOffset = t.lineDashOffset), i.lineJoin = t.lineJoin, i.lineWidth = t.lineWidth, i.miterLimit = t.miterLimit, i.strokeStyle = t.strokeStyle, this.contextStrokeState_ = { lineCap: t.lineCap, lineDash: t.lineDash, lineDashOffset: t.lineDashOffset, lineJoin: t.lineJoin, lineWidth: t.lineWidth, miterLimit: t.miterLimit, strokeStyle: t.strokeStyle }); }, ut.prototype.setContextTextState_ = function (t) { var i = this.context_, o = this.contextTextState_, n = t.textAlign ? t.textAlign : e._ol_render_canvas_.defaultTextAlign; o ? (o.font != t.font && (o.font = i.font = t.font), o.textAlign != n && (o.textAlign = n), o.textBaseline != t.textBaseline && (o.textBaseline = i.textBaseline = t.textBaseline)) : (i.font = t.font, i.textAlign = n, i.textBaseline = t.textBaseline, this.contextTextState_ = { font: t.font, textAlign: n, textBaseline: t.textBaseline }); }, ut.prototype.setFillStrokeStyle = function (t, i) { if (t) {
    var o = t.getColor();
    this.fillState_ = { fillStyle: e._ol_colorlike_.asColorLike(o || e._ol_render_canvas_.defaultFillStyle) };
}
else
    this.fillState_ = null; if (i) {
    var n = i.getColor(), r = i.getLineCap(), s = i.getLineDash(), a = i.getLineDashOffset(), l = i.getLineJoin(), _ = i.getWidth(), h = i.getMiterLimit();
    this.strokeState_ = { lineCap: void 0 !== r ? r : e._ol_render_canvas_.defaultLineCap, lineDash: s || e._ol_render_canvas_.defaultLineDash, lineDashOffset: a || e._ol_render_canvas_.defaultLineDashOffset, lineJoin: void 0 !== l ? l : e._ol_render_canvas_.defaultLineJoin, lineWidth: this.pixelRatio_ * (void 0 !== _ ? _ : e._ol_render_canvas_.defaultLineWidth), miterLimit: void 0 !== h ? h : e._ol_render_canvas_.defaultMiterLimit, strokeStyle: e._ol_colorlike_.asColorLike(n || e._ol_render_canvas_.defaultStrokeStyle) };
}
else
    this.strokeState_ = null; }, ut.prototype.setImageStyle = function (t) { if (t) {
    var e = t.getAnchor(), i = t.getImage(1), o = t.getOrigin(), n = t.getSize();
    this.imageAnchorX_ = e[0], this.imageAnchorY_ = e[1], this.imageHeight_ = n[1], this.image_ = i, this.imageOpacity_ = t.getOpacity(), this.imageOriginX_ = o[0], this.imageOriginY_ = o[1], this.imageRotateWithView_ = t.getRotateWithView(), this.imageRotation_ = t.getRotation(), this.imageScale_ = t.getScale() * this.pixelRatio_, this.imageSnapToPixel_ = t.getSnapToPixel(), this.imageWidth_ = n[0];
}
else
    this.image_ = null; }, ut.prototype.setTextStyle = function (t) { if (t) {
    var i = t.getFill();
    if (i) {
        var o = i.getColor();
        this.textFillState_ = { fillStyle: e._ol_colorlike_.asColorLike(o || e._ol_render_canvas_.defaultFillStyle) };
    }
    else
        this.textFillState_ = null;
    var n = t.getStroke();
    if (n) {
        var r = n.getColor(), s = n.getLineCap(), a = n.getLineDash(), l = n.getLineDashOffset(), _ = n.getLineJoin(), h = n.getWidth(), c = n.getMiterLimit();
        this.textStrokeState_ = { lineCap: void 0 !== s ? s : e._ol_render_canvas_.defaultLineCap, lineDash: a || e._ol_render_canvas_.defaultLineDash, lineDashOffset: l || e._ol_render_canvas_.defaultLineDashOffset, lineJoin: void 0 !== _ ? _ : e._ol_render_canvas_.defaultLineJoin, lineWidth: void 0 !== h ? h : e._ol_render_canvas_.defaultLineWidth, miterLimit: void 0 !== c ? c : e._ol_render_canvas_.defaultMiterLimit, strokeStyle: e._ol_colorlike_.asColorLike(r || e._ol_render_canvas_.defaultStrokeStyle) };
    }
    else
        this.textStrokeState_ = null;
    var u = t.getFont(), d = t.getOffsetX(), p = t.getOffsetY(), f = t.getRotateWithView(), g = t.getRotation(), v = t.getScale(), y = t.getText(), m = t.getTextAlign(), x = t.getTextBaseline();
    this.textState_ = { font: void 0 !== u ? u : e._ol_render_canvas_.defaultFont, textAlign: void 0 !== m ? m : e._ol_render_canvas_.defaultTextAlign, textBaseline: void 0 !== x ? x : e._ol_render_canvas_.defaultTextBaseline }, this.text_ = void 0 !== y ? y : "", this.textOffsetX_ = void 0 !== d ? this.pixelRatio_ * d : 0, this.textOffsetY_ = void 0 !== p ? this.pixelRatio_ * p : 0, this.textRotateWithView_ = void 0 !== f && f, this.textRotation_ = void 0 !== g ? g : 0, this.textScale_ = this.pixelRatio_ * (void 0 !== v ? v : 1);
}
else
    this.text_ = ""; }; var dt = function (t) { e._ol_Observable_.call(this), this.layer_ = t; }; e._ol_.inherits(dt, e._ol_Observable_), dt.prototype.forEachFeatureAtCoordinate = e._ol_.nullFunction, dt.prototype.hasFeatureAtCoordinate = e._ol_functions_.FALSE, dt.prototype.createLoadedTileFinder = function (t, e, i) { return function (o, n) { return t.forEachLoadedTile(e, o, n, function (t) { i[o] || (i[o] = {}), i[o][t.tileCoord.toString()] = t; }); }; }, dt.prototype.getLayer = function () { return this.layer_; }, dt.prototype.handleImageChange_ = function (t) { t.target.getState() === e._ol_ImageState_.LOADED && this.renderIfReadyAndVisible(); }, dt.prototype.loadImage = function (t) { var i = t.getState(); return i != e._ol_ImageState_.LOADED && i != e._ol_ImageState_.ERROR && e._ol_events_.listen(t, e._ol_events_EventType_.CHANGE, this.handleImageChange_, this), i == e._ol_ImageState_.IDLE && (t.load(), i = t.getState()), i == e._ol_ImageState_.LOADED; }, dt.prototype.renderIfReadyAndVisible = function () { var t = this.getLayer(); t.getVisible() && t.getSourceState() == e._ol_source_State_.READY && this.changed(); }, dt.prototype.scheduleExpireCache = function (t, i) { if (i.canExpireCache()) {
    var o = function (t, i, o) { var n = e._ol_.getUid(t).toString(); n in o.usedTiles && t.expireCache(o.viewState.projection, o.usedTiles[n]); }.bind(null, i);
    t.postRenderFunctions.push(o);
} }, dt.prototype.updateLogos = function (t, i) { var o = i.getLogo(); void 0 !== o && ("string" == typeof o ? t.logos[o] = "" : o && (e._ol_asserts_.assert("string" == typeof o.href, 44), e._ol_asserts_.assert("string" == typeof o.src, 45), t.logos[o.src] = o.href)); }, dt.prototype.updateUsedTiles = function (t, i, o, n) { var r = e._ol_.getUid(i).toString(), s = o.toString(); r in t ? s in t[r] ? t[r][s].extend(n) : t[r][s] = n : (t[r] = {}, t[r][s] = n); }, dt.prototype.manageTilePyramid = function (t, i, o, n, r, s, a, l, _, h) { var c = e._ol_.getUid(i).toString(); c in t.wantedTiles || (t.wantedTiles[c] = {}); var u, d, p, f, g, v, y = t.wantedTiles[c], m = t.tileQueue; for (v = o.getMinZoom(); v <= a; ++v)
    for (d = o.getTileRangeForExtentAndZ(s, v, d), p = o.getResolution(v), f = d.minX; f <= d.maxX; ++f)
        for (g = d.minY; g <= d.maxY; ++g)
            a - v <= l ? (0 == (u = i.getTile(v, f, g, n, r)).getState() && (y[u.getKey()] = !0, m.isKeyQueued(u.getKey()) || m.enqueue([u, c, o.getTileCoordCenter(u.tileCoord), p])), void 0 !== _ && _.call(h, u)) : i.useTile(v, f, g, r); }; var pt = function (t) { dt.call(this, t), this.renderedResolution, this.transform_ = e._ol_transform_.create(); }; e._ol_.inherits(pt, dt), pt.prototype.clip = function (t, i, o) { var n = i.pixelRatio, r = i.size[0] * n, s = i.size[1] * n, a = i.viewState.rotation, l = e._ol_extent_.getTopLeft(o), _ = e._ol_extent_.getTopRight(o), h = e._ol_extent_.getBottomRight(o), c = e._ol_extent_.getBottomLeft(o); e._ol_transform_.apply(i.coordinateToPixelTransform, l), e._ol_transform_.apply(i.coordinateToPixelTransform, _), e._ol_transform_.apply(i.coordinateToPixelTransform, h), e._ol_transform_.apply(i.coordinateToPixelTransform, c), t.save(), e._ol_render_canvas_.rotateAtOffset(t, -a, r / 2, s / 2), t.beginPath(), t.moveTo(l[0] * n, l[1] * n), t.lineTo(_[0] * n, _[1] * n), t.lineTo(h[0] * n, h[1] * n), t.lineTo(c[0] * n, c[1] * n), t.clip(), e._ol_render_canvas_.rotateAtOffset(t, a, r / 2, s / 2); }, pt.prototype.dispatchComposeEvent_ = function (t, i, o, n) { var r = this.getLayer(); if (r.hasListener(t)) {
    var s = o.size[0] * o.pixelRatio, a = o.size[1] * o.pixelRatio, l = o.viewState.rotation;
    e._ol_render_canvas_.rotateAtOffset(i, -l, s / 2, a / 2);
    var _ = void 0 !== n ? n : this.getTransform(o, 0), h = new ut(i, o.pixelRatio, o.extent, _, o.viewState.rotation), c = new ht(t, h, o, i, null);
    r.dispatchEvent(c), e._ol_render_canvas_.rotateAtOffset(i, l, s / 2, a / 2);
} }, pt.prototype.forEachLayerAtCoordinate = function (t, i, o, n) { return this.forEachFeatureAtCoordinate(t, i, 0, e._ol_functions_.TRUE, this) ? o.call(n, this.getLayer(), null) : void 0; }, pt.prototype.postCompose = function (t, i, o, n) { this.dispatchComposeEvent_(e._ol_render_EventType_.POSTCOMPOSE, t, i, n); }, pt.prototype.preCompose = function (t, i, o) { this.dispatchComposeEvent_(e._ol_render_EventType_.PRECOMPOSE, t, i, o); }, pt.prototype.dispatchRenderEvent = function (t, i, o) { this.dispatchComposeEvent_(e._ol_render_EventType_.RENDER, t, i, o); }, pt.prototype.getTransform = function (t, i) { var o = t.viewState, n = t.pixelRatio, r = n * t.size[0] / 2, s = n * t.size[1] / 2, a = n / o.resolution, l = -a, _ = -o.rotation, h = -o.center[0] + i, c = -o.center[1]; return e._ol_transform_.compose(this.transform_, r, s, a, l, _, h, c); }, pt.prototype.composeFrame = function (t, e, i) { }, pt.prototype.prepareFrame = function (t, e) { }; var ft = function (t) { pt.call(this, t), this.coordinateToCanvasPixelTransform = e._ol_transform_.create(), this.hitCanvasContext_ = null; }; e._ol_.inherits(ft, pt), ft.prototype.composeFrame = function (t, i, o) { this.preCompose(o, t); var n = this.getImage(); if (n) {
    var r = i.extent, s = void 0 !== r && !e._ol_extent_.containsExtent(r, t.extent) && e._ol_extent_.intersects(r, t.extent);
    s && this.clip(o, t, r);
    var a = this.getImageTransform(), l = o.globalAlpha;
    o.globalAlpha = i.opacity;
    var _ = a[4], h = a[5], c = n.width * a[0], u = n.height * a[3];
    o.drawImage(n, 0, 0, +n.width, +n.height, Math.round(_), Math.round(h), Math.round(c), Math.round(u)), o.globalAlpha = l, s && o.restore();
} this.postCompose(o, t, i); }, ft.prototype.getImage = function () { }, ft.prototype.getImageTransform = function () { }, ft.prototype.forEachFeatureAtCoordinate = function (t, e, i, o, n) { var r = this.getLayer(), s = r.getSource(), a = e.viewState.resolution, l = e.viewState.rotation, _ = e.skippedFeatureUids; return s.forEachFeatureAtCoordinate(t, a, l, i, _, function (t) { return o.call(n, t, r); }); }, ft.prototype.forEachLayerAtCoordinate = function (t, i, o, n) { if (this.getImage()) {
    if (this.getLayer().getSource().forEachFeatureAtCoordinate !== e._ol_.nullFunction)
        return pt.prototype.forEachLayerAtCoordinate.apply(this, arguments);
    var r = e._ol_transform_.apply(this.coordinateToCanvasPixelTransform, t.slice());
    T.scale(r, i.viewState.resolution / this.renderedResolution), this.hitCanvasContext_ || (this.hitCanvasContext_ = e._ol_dom_.createCanvasContext2D(1, 1)), this.hitCanvasContext_.clearRect(0, 0, 1, 1), this.hitCanvasContext_.drawImage(this.getImage(), r[0], r[1], 1, 1, 0, 0, 1, 1);
    var s = this.hitCanvasContext_.getImageData(0, 0, 1, 1).data;
    return s[3] > 0 ? o.call(n, this.getLayer(), s) : void 0;
} }; var gt = function (t) { ft.call(this, t), this.image_ = null, this.imageTransform_ = e._ol_transform_.create(), this.skippedFeatures_ = [], this.vectorRenderer_ = null; }; e._ol_.inherits(gt, ft), gt.handles = function (t, i) { return "canvas" === t && (i.getType() === e._ol_LayerType_.IMAGE || i.getType() === e._ol_LayerType_.VECTOR && i.getRenderMode() === e._ol_layer_VectorRenderType_.IMAGE); }, gt.create = function (t, i) { var o = new gt(i); if (i.getType() === e._ol_LayerType_.VECTOR)
    for (var n = U.getLayerRendererPlugins(), r = 0, s = n.length; r < s; ++r) {
        var a = n[r];
        a !== gt && a.handles("canvas", i) && o.setVectorRenderer(a.create(t, i));
    } return o; }, gt.prototype.getImage = function () { return this.image_ ? this.image_.getImage() : null; }, gt.prototype.getImageTransform = function () { return this.imageTransform_; }, gt.prototype.prepareFrame = function (t, i) { var o, n = t.pixelRatio, r = t.size, s = t.viewState, a = s.center, l = s.resolution, _ = this.getLayer().getSource(), h = t.viewHints, c = t.extent; if (void 0 !== i.extent && (c = e._ol_extent_.getIntersection(c, i.extent)), !h[0] && !h[1] && !e._ol_extent_.isEmpty(c)) {
    var u = s.projection;
    if (!e._ol_.ENABLE_RASTER_REPROJECTION) {
        var d = _.getProjection();
        d && (u = d);
    }
    var p = this.vectorRenderer_;
    if (p) {
        var f = p.context, g = e._ol_obj_.assign({}, t, { size: [e._ol_extent_.getWidth(c) / l, e._ol_extent_.getHeight(c) / l], viewState: e._ol_obj_.assign({}, t.viewState, { rotation: 0 }) }), v = Object.keys(g.skippedFeatureUids).sort();
        !p.prepareFrame(g, i) || !p.replayGroupChanged && e._ol_array_.equals(v, this.skippedFeatures_) || (f.canvas.width = g.size[0] * n, f.canvas.height = g.size[1] * n, p.composeFrame(g, i, f), this.image_ = new _t(c, l, n, f.canvas), this.skippedFeatures_ = v);
    }
    else
        (o = _.getImage(c, l, n, u)) && this.loadImage(o) && (this.image_ = o);
} if (this.image_) {
    var y = (o = this.image_).getExtent(), m = o.getResolution(), x = o.getPixelRatio(), E = n * m / (l * x), T = e._ol_transform_.compose(this.imageTransform_, n * r[0] / 2, n * r[1] / 2, E, E, 0, x * (y[0] - a[0]) / m, x * (a[1] - y[3]) / m);
    e._ol_transform_.compose(this.coordinateToCanvasPixelTransform, n * r[0] / 2 - T[4], n * r[1] / 2 - T[5], n / l, -n / l, 0, -a[0], -a[1]), this.updateLogos(t, _), this.renderedResolution = m * n / x;
} return !!this.image_; }, gt.prototype.forEachFeatureAtCoordinate = function (t, e, i, o, n) { return this.vectorRenderer_ ? this.vectorRenderer_.forEachFeatureAtCoordinate(t, e, i, o, n) : ft.prototype.forEachFeatureAtCoordinate.call(this, t, e, i, o, n); }, gt.prototype.setVectorRenderer = function (t) { this.vectorRenderer_ = t; }; var vt = function (t, i) { e._ol_Disposable_.call(this), this.map_ = i, this.layerRenderers_ = {}, this.layerRendererListeners_ = {}; }; e._ol_.inherits(vt, e._ol_Disposable_), vt.prototype.calculateMatrices2D = function (t) { var i = t.viewState, o = t.coordinateToPixelTransform, n = t.pixelToCoordinateTransform; e._ol_transform_.compose(o, t.size[0] / 2, t.size[1] / 2, 1 / i.resolution, -1 / i.resolution, -i.rotation, -i.center[0], -i.center[1]), e._ol_transform_.invert(e._ol_transform_.setFromArray(n, o)); }, vt.prototype.removeLayerRenderers = function () { for (var t in this.layerRenderers_)
    this.removeLayerRendererByKey_(t).dispose(); }, vt.expireIconCache_ = function (t, i) { e._ol_style_.iconImageCache.expire(); }, vt.prototype.forEachFeatureAtCoordinate = function (t, i, o, n, r, s, a) { var l, _ = i.viewState, h = _.resolution; function c(t, o) { var s = e._ol_.getUid(t).toString(), a = i.layerStates[e._ol_.getUid(o)].managed; if (!(s in i.skippedFeatureUids) || a)
    return n.call(r, t, a ? o : null); } var u = _.projection, d = t; if (u.canWrapX()) {
    var p = u.getExtent(), f = e._ol_extent_.getWidth(p), g = t[0];
    (g < p[0] || g > p[2]) && (d = [g + f * Math.ceil((p[0] - g) / f), t[1]]);
} var v, y = i.layerStatesArray; for (v = y.length - 1; v >= 0; --v) {
    var m = y[v], x = m.layer;
    if (e._ol_layer_Layer_.visibleAtResolution(m, h) && s.call(a, x)) {
        var E = this.getLayerRenderer(x);
        if (x.getSource() && (l = E.forEachFeatureAtCoordinate(x.getSource().getWrapX() ? d : t, i, o, c, r)), l)
            return l;
    }
} }, vt.prototype.forEachLayerAtPixel = function (t, e, i, o, n, r) { }, vt.prototype.hasFeatureAtCoordinate = function (t, i, o, n, r) { return void 0 !== this.forEachFeatureAtCoordinate(t, i, o, e._ol_functions_.TRUE, this, n, r); }, vt.prototype.getLayerRenderer = function (t) { var i = e._ol_.getUid(t).toString(); if (i in this.layerRenderers_)
    return this.layerRenderers_[i]; for (var o, n = U.getLayerRendererPlugins(), r = this.getType(), s = 0, a = n.length; s < a; ++s) {
    var l = n[s];
    if (l.handles(r, t)) {
        o = l.create(this, t);
        break;
    }
} if (!o)
    throw new Error("Unable to create renderer for layer: " + t.getType()); return this.layerRenderers_[i] = o, this.layerRendererListeners_[i] = e._ol_events_.listen(o, e._ol_events_EventType_.CHANGE, this.handleLayerRendererChange_, this), o; }, vt.prototype.getLayerRendererByKey = function (t) { return this.layerRenderers_[t]; }, vt.prototype.getLayerRenderers = function () { return this.layerRenderers_; }, vt.prototype.getMap = function () { return this.map_; }, vt.prototype.getType = function () { }, vt.prototype.handleLayerRendererChange_ = function () { this.map_.render(); }, vt.prototype.removeLayerRendererByKey_ = function (t) { var i = this.layerRenderers_[t]; return delete this.layerRenderers_[t], e._ol_events_.unlistenByKey(this.layerRendererListeners_[t]), delete this.layerRendererListeners_[t], i; }, vt.prototype.renderFrame = e._ol_.nullFunction, vt.prototype.removeUnusedLayerRenderers_ = function (t, e) { var i; for (i in this.layerRenderers_)
    e && i in e.layerStates || this.removeLayerRendererByKey_(i).dispose(); }, vt.prototype.scheduleExpireIconCache = function (t) { t.postRenderFunctions.push(vt.expireIconCache_); }, vt.prototype.scheduleRemoveUnusedLayerRenderers = function (t) { var e; for (e in this.layerRenderers_)
    if (!(e in t.layerStates))
        return void t.postRenderFunctions.push(this.removeUnusedLayerRenderers_.bind(this)); }, vt.sortByZIndex = function (t, e) { return t.zIndex - e.zIndex; }; var yt = function (t, i) { vt.call(this, t, i), this.context_ = e._ol_dom_.createCanvasContext2D(), this.canvas_ = this.context_.canvas, this.canvas_.style.width = "100%", this.canvas_.style.height = "100%", this.canvas_.style.display = "block", this.canvas_.className = e._ol_css_.CLASS_UNSELECTABLE, t.insertBefore(this.canvas_, t.childNodes[0] || null), this.renderedVisible_ = !0, this.transform_ = e._ol_transform_.create(); }; e._ol_.inherits(yt, vt), yt.handles = function (t) { return "canvas" === t; }, yt.create = function (t, e) { return new yt(t, e); }, yt.prototype.dispatchComposeEvent_ = function (t, e) { var i = this.getMap(), o = this.context_; if (i.hasListener(t)) {
    var n = e.extent, r = e.pixelRatio, s = e.viewState.rotation, a = this.getTransform(e), l = new ut(o, r, n, a, s), _ = new ht(t, l, e, o, null);
    i.dispatchEvent(_);
} }, yt.prototype.getTransform = function (t) { var i = t.viewState, o = this.canvas_.width / 2, n = this.canvas_.height / 2, r = t.pixelRatio / i.resolution, s = -r, a = -i.rotation, l = -i.center[0], _ = -i.center[1]; return e._ol_transform_.compose(this.transform_, o, n, r, s, a, l, _); }, yt.prototype.getType = function () { return "canvas"; }, yt.prototype.renderFrame = function (t) { if (t) {
    var i = this.context_, o = t.pixelRatio, n = Math.round(t.size[0] * o), r = Math.round(t.size[1] * o);
    this.canvas_.width != n || this.canvas_.height != r ? (this.canvas_.width = n, this.canvas_.height = r) : i.clearRect(0, 0, n, r);
    var s = t.viewState.rotation;
    this.calculateMatrices2D(t), this.dispatchComposeEvent_(e._ol_render_EventType_.PRECOMPOSE, t);
    var a = t.layerStatesArray;
    e._ol_array_.stableSort(a, vt.sortByZIndex), s && (i.save(), e._ol_render_canvas_.rotateAtOffset(i, s, n / 2, r / 2));
    var l, _, h, c, u, d = t.viewState.resolution;
    for (l = 0, _ = a.length; l < _; ++l)
        h = (u = a[l]).layer, c = this.getLayerRenderer(h), e._ol_layer_Layer_.visibleAtResolution(u, d) && u.sourceState == e._ol_source_State_.READY && c.prepareFrame(t, u) && c.composeFrame(t, u, i);
    s && i.restore(), this.dispatchComposeEvent_(e._ol_render_EventType_.POSTCOMPOSE, t), this.renderedVisible_ || (this.canvas_.style.display = "", this.renderedVisible_ = !0), this.scheduleRemoveUnusedLayerRenderers(t), this.scheduleExpireIconCache(t);
}
else
    this.renderedVisible_ && (this.canvas_.style.display = "none", this.renderedVisible_ = !1); }, yt.prototype.forEachLayerAtPixel = function (t, i, o, n, r, s) { var a, l, _ = i.viewState.resolution, h = i.layerStatesArray, c = h.length, u = e._ol_transform_.apply(i.pixelToCoordinateTransform, t.slice()); for (l = c - 1; l >= 0; --l) {
    var d = h[l], p = d.layer;
    if (e._ol_layer_Layer_.visibleAtResolution(d, _) && r.call(s, p) && (a = this.getLayerRenderer(p).forEachLayerAtCoordinate(u, i, o, n)))
        return a;
} }; var mt = function (t) { ft.call(this, t), this.context = null === this.context ? null : e._ol_dom_.createCanvasContext2D(), this.oversampling_, this.renderedExtent_ = null, this.renderedRevision, this.renderedTiles = [], this.tmpExtent = e._ol_extent_.createEmpty(), this.tmpTileRange_ = new e._ol_TileRange_(0, 0, 0, 0), this.imageTransform_ = e._ol_transform_.create(), this.zDirection = 0; }; e._ol_.inherits(mt, ft), mt.handles = function (t, i) { return "canvas" === t && i.getType() === e._ol_LayerType_.TILE; }, mt.create = function (t, e) { return new mt(e); }, mt.prototype.isDrawableTile_ = function (t) { var e = t.getState(), i = this.getLayer().getUseInterimTilesOnError(); return 2 == e || 4 == e || 3 == e && !i; }, mt.prototype.prepareFrame = function (t, i) { var o = t.pixelRatio, n = t.size, r = t.viewState, s = r.projection, a = r.resolution, l = r.center, _ = this.getLayer(), h = _.getSource(), c = h.getRevision(), u = h.getTileGridForProjection(s), d = u.getZForResolution(a, this.zDirection), p = u.getResolution(d), f = Math.round(a / p) || 1, g = t.extent; if (void 0 !== i.extent && (g = e._ol_extent_.getIntersection(g, i.extent)), e._ol_extent_.isEmpty(g))
    return !1; var v = u.getTileRangeForExtentAndZ(g, d), y = u.getTileRangeExtent(d, v), m = h.getTilePixelRatio(o), x = {}; x[d] = {}; var E, T, C, R = this.createLoadedTileFinder(h, s, x), S = this.tmpExtent, I = this.tmpTileRange_, L = !1; for (T = v.minX; T <= v.maxX; ++T)
    for (C = v.minY; C <= v.maxY; ++C) {
        if (3 == (E = h.getTile(d, T, C, o, s)).getState() && (_.getUseInterimTilesOnError() ? _.getPreload() > 0 && (L = !0) : E.setState(2)), this.isDrawableTile_(E) || (E = E.getInterimTile()), this.isDrawableTile_(E)) {
            var w = e._ol_.getUid(this);
            if (2 == E.getState()) {
                x[d][E.tileCoord.toString()] = E;
                var b = E.inTransition(w);
                L || !b && -1 !== this.renderedTiles.indexOf(E) || (L = !0);
            }
            if (1 === E.getAlpha(w, t.time))
                continue;
        }
        var A = u.getTileCoordChildTileRange(E.tileCoord, I, S), P = !1;
        A && (P = R(d + 1, A)), P || u.forEachTileCoordParentTileRange(E.tileCoord, R, null, I, S);
    } var D = p * o / m * f, F = t.viewHints, O = F[0] || F[1]; if (!(this.renderedResolution && Date.now() - t.time > 16 && O) && (L || !this.renderedExtent_ || !e._ol_extent_.containsExtent(this.renderedExtent_, g) || this.renderedRevision != c || f != this.oversampling_ || !O && D != this.renderedResolution)) {
    var M = this.context;
    if (M) {
        var G = h.getTilePixelSize(d, o, s), k = Math.round(v.getWidth() * G[0] / f), N = Math.round(v.getHeight() * G[1] / f), U = M.canvas;
        U.width != k || U.height != N ? (this.oversampling_ = f, U.width = k, U.height = N) : (this.renderedExtent_ && !e._ol_extent_.equals(y, this.renderedExtent_) && M.clearRect(0, 0, k, N), f = this.oversampling_);
    }
    this.renderedTiles.length = 0;
    var B, W, j, V, X, K, z, H, Y, q, Z = Object.keys(x).map(Number);
    for (Z.sort(function (t, e) { return t === d ? 1 : e === d ? -1 : t > e ? 1 : t < e ? -1 : 0; }), V = 0, X = Z.length; V < X; ++V)
        for (var J in j = Z[V], W = h.getTilePixelSize(j, o, s), B = u.getResolution(j) / p, z = m * h.getGutter(s), H = x[j])
            E = H[J], T = ((K = u.getTileCoordExtent(E.getTileCoord(), S))[0] - y[0]) / p * m / f, C = (y[3] - K[3]) / p * m / f, Y = W[0] * B / f, q = W[1] * B / f, this.drawTileImage(E, t, i, T, C, Y, q, z, d === j), this.renderedTiles.push(E);
    this.renderedRevision = c, this.renderedResolution = p * o / m * f, this.renderedExtent_ = y;
} var Q = this.renderedResolution / a, $ = e._ol_transform_.compose(this.imageTransform_, o * n[0] / 2, o * n[1] / 2, Q, Q, 0, (this.renderedExtent_[0] - l[0]) / this.renderedResolution * o, (l[1] - this.renderedExtent_[3]) / this.renderedResolution * o); return e._ol_transform_.compose(this.coordinateToCanvasPixelTransform, o * n[0] / 2 - $[4], o * n[1] / 2 - $[5], o / a, -o / a, 0, -l[0], -l[1]), this.updateUsedTiles(t.usedTiles, h, d, v), this.manageTilePyramid(t, h, u, o, s, g, d, _.getPreload()), this.scheduleExpireCache(t, h), this.updateLogos(t, h), this.renderedTiles.length > 0; }, mt.prototype.drawTileImage = function (t, i, o, n, r, s, a, l, _) { var h = t.getImage(this.getLayer()); if (h) {
    var c = e._ol_.getUid(this), u = _ ? t.getAlpha(c, i.time) : 1;
    1 !== u || this.getLayer().getSource().getOpaque(i.viewState.projection) || this.context.clearRect(n, r, s, a);
    var d = u !== this.context.globalAlpha;
    d && (this.context.save(), this.context.globalAlpha = u), this.context.drawImage(h, l, l, h.width - 2 * l, h.height - 2 * l, n, r, s, a), d && this.context.restore(), 1 !== u ? i.animate = !0 : _ && t.endTransition(c);
} }, mt.prototype.getImage = function () { var t = this.context; return t ? t.canvas : null; }, mt.prototype.getImageTransform = function () { return this.imageTransform_; }; var xt = function () { }; xt.prototype.getReplay = function (t, e) { }, xt.prototype.isEmpty = function () { }; var Et = { CIRCLE: "Circle", DEFAULT: "Default", IMAGE: "Image", LINE_STRING: "LineString", POLYGON: "Polygon", TEXT: "Text" }, Tt = { lineString: function (t, e, i, o) { var n, r = t[e], s = t[e + 1], a = 0; for (n = e + o; n < i; n += o) {
        var l = t[n], _ = t[n + 1];
        a += Math.sqrt((l - r) * (l - r) + (_ - s) * (_ - s)), r = l, s = _;
    } return a; }, linearRing: function (t, e, i, o) { var n = Tt.lineString(t, e, i, o), r = t[i - o] - t[e], s = t[i - o + 1] - t[e + 1]; return n + Math.sqrt(r * r + s * s); } }, Ct = function (t, i, o, n, r, s, a, l) { for (var _, h, c, u = [], d = t[i] > t[o - n], p = r.length, f = t[i], g = t[i + 1], v = t[i += n], y = t[i + 1], m = 0, x = Math.sqrt(Math.pow(v - f, 2) + Math.pow(y - g, 2)), E = "", T = 0, C = 0; C < p; ++C) {
    h = d ? p - C - 1 : C;
    var R = r.charAt(h), S = s(E = d ? R + E : E + R) - T;
    T += S;
    for (var I = a + S / 2; i < o - n && m + x < I;)
        f = v, g = y, v = t[i += n], y = t[i + 1], m += x, x = Math.sqrt(Math.pow(v - f, 2) + Math.pow(y - g, 2));
    var L = I - m, w = Math.atan2(y - g, v - f);
    if (d && (w += w > 0 ? -Math.PI : Math.PI), void 0 !== c) {
        var b = w - c;
        if (b += b > Math.PI ? -2 * Math.PI : b < -Math.PI ? 2 * Math.PI : 0, Math.abs(b) > l)
            return null;
    }
    var A = L / x, P = e._ol_math_.lerp(f, v, A), D = e._ol_math_.lerp(g, y, A);
    c == w ? (d && (_[0] = P, _[1] = D, _[2] = S / 2), _[4] = E) : (T = S, _ = [P, D, S / 2, w, E = R], d ? u.unshift(_) : u.push(_), c = w), a += S;
} return u; }, Rt = {}; Rt.ORDER = [Et.POLYGON, Et.CIRCLE, Et.LINE_STRING, Et.IMAGE, Et.TEXT, Et.DEFAULT], Rt.TEXT_ALIGN = {}, Rt.TEXT_ALIGN.left = 0, Rt.TEXT_ALIGN.end = 0, Rt.TEXT_ALIGN.center = .5, Rt.TEXT_ALIGN.right = 1, Rt.TEXT_ALIGN.start = 1, Rt.TEXT_ALIGN.top = 0, Rt.TEXT_ALIGN.middle = .5, Rt.TEXT_ALIGN.hanging = .2, Rt.TEXT_ALIGN.alphabetic = .8, Rt.TEXT_ALIGN.ideographic = .8, Rt.TEXT_ALIGN.bottom = 1; var St = function (t, i, o, n, r, s) { ct.call(this), this.declutterTree = s, this.tmpExtent_ = e._ol_extent_.createEmpty(), this.tolerance = t, this.maxExtent = i, this.overlaps = r, this.pixelRatio = n, this.maxLineWidth = 0, this.resolution = o, this.fillOrigin_, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_ = null, this.bufferedMaxExtent_ = null, this.instructions = [], this.coordinates = [], this.coordinateCache_ = {}, this.renderedTransform_ = e._ol_transform_.create(), this.hitDetectionInstructions = [], this.pixelCoordinates_ = null, this.state = {}, this.viewRotation_ = 0, this.tmpLocalTransform_ = e._ol_transform_.create(), this.resetTransform_ = e._ol_transform_.create(); }; e._ol_.inherits(St, ct), St.prototype.replayTextBackground_ = function (t, e, i, o, n, r, s) { t.beginPath(), t.moveTo.apply(t, e), t.lineTo.apply(t, i), t.lineTo.apply(t, o), t.lineTo.apply(t, n), t.lineTo.apply(t, e), r && (this.fillOrigin_ = r[2], this.fill_(t)), s && (this.setStrokeStyle_(t, s), t.stroke()); }, St.prototype.replayImage_ = function (t, i, o, n, r, s, a, l, _, h, c, u, d, p, f, g, v, y) { var m = v || y, x = this.tmpLocalTransform_; i -= r *= d, o -= s *= d, p && (i = Math.round(i), o = Math.round(o)); var E, T, C, R, S = f + h > n.width ? n.width - h : f, I = l + c > n.height ? n.height - c : l, L = this.tmpExtent_, w = g[3] + S * d + g[1], b = g[0] + I * d + g[2], A = i - g[3], P = o - g[0]; (m || 0 !== u) && (E = [A, P], T = [A + w, P], C = [A + w, P + b], R = [A, P + b]); var D = null; if (0 !== u) {
    var F = i + r, O = o + s;
    D = e._ol_transform_.compose(x, F, O, 1, 1, u, -F, -O), e._ol_extent_.createOrUpdateEmpty(L), e._ol_extent_.extendCoordinate(L, e._ol_transform_.apply(x, E)), e._ol_extent_.extendCoordinate(L, e._ol_transform_.apply(x, T)), e._ol_extent_.extendCoordinate(L, e._ol_transform_.apply(x, C)), e._ol_extent_.extendCoordinate(L, e._ol_transform_.apply(x, R));
}
else
    e._ol_extent_.createOrUpdate(A, P, A + w, P + b, L); var M = t.canvas, G = L[0] <= M.width && L[2] >= 0 && L[1] <= M.height && L[3] >= 0; if (a) {
    if (!G && 1 == a[4])
        return;
    e._ol_extent_.extend(a, L);
    var k = G ? [t, D ? D.slice(0) : null, _, n, h, c, S, I, i, o, d] : null;
    k && m && k.push(v, y, E, T, C, R), a.push(k);
}
else
    G && (m && this.replayTextBackground_(t, E, T, C, R, v, y), e._ol_render_canvas_.drawImage(t, D, _, n, h, c, S, I, i, o, d)); }, St.prototype.applyPixelRatio = function (t) { var e = this.pixelRatio; return 1 == e ? t : t.map(function (t) { return t * e; }); }, St.prototype.appendFlatCoordinates = function (t, i, o, n, r, s) { var a = this.coordinates.length, l = this.getBufferedMaxExtent(); s && (i += n); var _, h, c, u = [t[i], t[i + 1]], d = [NaN, NaN], p = !0; for (_ = i + n; _ < o; _ += n)
    d[0] = t[_], d[1] = t[_ + 1], (c = e._ol_extent_.coordinateRelationship(l, d)) !== h ? (p && (this.coordinates[a++] = u[0], this.coordinates[a++] = u[1]), this.coordinates[a++] = d[0], this.coordinates[a++] = d[1], p = !1) : c === e._ol_extent_Relationship_.INTERSECTING ? (this.coordinates[a++] = d[0], this.coordinates[a++] = d[1], p = !1) : p = !0, u[0] = d[0], u[1] = d[1], h = c; return (r && p || _ === i + n) && (this.coordinates[a++] = u[0], this.coordinates[a++] = u[1]), a; }, St.prototype.drawCustomCoordinates_ = function (t, e, i, o, n) { for (var r = 0, s = i.length; r < s; ++r) {
    var a = i[r], l = this.appendFlatCoordinates(t, e, a, o, !1, !1);
    n.push(l), e = a;
} return e; }, St.prototype.drawCustom = function (t, i, o) { this.beginGeometry(t, i); var n, r, s, a, l, _ = t.getType(), h = t.getStride(), c = this.coordinates.length; if (_ == e._ol_geom_GeometryType_.MULTI_POLYGON) {
    n = (t = t).getOrientedFlatCoordinates(), a = [];
    var u = t.getEndss();
    l = 0;
    for (var d = 0, p = u.length; d < p; ++d) {
        var f = [];
        l = this.drawCustomCoordinates_(n, l, u[d], h, f), a.push(f);
    }
    this.instructions.push([4, c, a, t, o, I.coordinatesss]);
}
else
    _ == e._ol_geom_GeometryType_.POLYGON || _ == e._ol_geom_GeometryType_.MULTI_LINE_STRING ? (s = [], n = _ == e._ol_geom_GeometryType_.POLYGON ? t.getOrientedFlatCoordinates() : t.getFlatCoordinates(), l = this.drawCustomCoordinates_(n, 0, t.getEnds(), h, s), this.instructions.push([4, c, s, t, o, I.coordinatess])) : _ == e._ol_geom_GeometryType_.LINE_STRING || _ == e._ol_geom_GeometryType_.MULTI_POINT ? (n = t.getFlatCoordinates(), r = this.appendFlatCoordinates(n, 0, n.length, h, !1, !1), this.instructions.push([4, c, r, t, o, I.coordinates])) : _ == e._ol_geom_GeometryType_.POINT && (n = t.getFlatCoordinates(), this.coordinates.push(n[0], n[1]), r = this.coordinates.length, this.instructions.push([4, c, r, t, o])); this.endGeometry(t, i); }, St.prototype.beginGeometry = function (t, e) { this.beginGeometryInstruction1_ = [0, e, 0], this.instructions.push(this.beginGeometryInstruction1_), this.beginGeometryInstruction2_ = [0, e, 0], this.hitDetectionInstructions.push(this.beginGeometryInstruction2_); }, St.prototype.fill_ = function (t) { if (this.fillOrigin_) {
    var i = e._ol_transform_.apply(this.renderedTransform_, this.fillOrigin_.slice());
    t.translate(i[0], i[1]), t.rotate(this.viewRotation_);
} t.fill(), this.fillOrigin_ && t.setTransform.apply(t, e._ol_render_canvas_.resetTransform_); }, St.prototype.setStrokeStyle_ = function (t, i) { t.strokeStyle = i[1], t.lineWidth = i[2], t.lineCap = i[3], t.lineJoin = i[4], t.miterLimit = i[5], e._ol_has_.CANVAS_LINE_DASH && (t.lineDashOffset = i[7], t.setLineDash(i[6])); }, St.prototype.renderDeclutter_ = function (t, i) { if (t && t.length > 5) {
    var o = t[4];
    if (1 == o || o == t.length - 5) {
        var n = { minX: t[0], minY: t[1], maxX: t[2], maxY: t[3], value: i };
        if (!this.declutterTree.collides(n)) {
            this.declutterTree.insert(n);
            for (var r = e._ol_render_canvas_.drawImage, s = 5, a = t.length; s < a; ++s) {
                var l = t[s];
                l && (l.length > 11 && this.replayTextBackground_(l[0], l[13], l[14], l[15], l[16], l[11], l[12]), r.apply(void 0, l));
            }
        }
        t.length = 5, e._ol_extent_.createOrUpdateEmpty(t);
    }
} }, St.prototype.replay_ = function (t, i, o, n, r, s) { var a; this.pixelCoordinates_ && e._ol_array_.equals(i, this.renderedTransform_) ? a = this.pixelCoordinates_ : (this.pixelCoordinates_ || (this.pixelCoordinates_ = []), a = e._ol_geom_flat_transform_.transform2D(this.coordinates, 0, this.coordinates.length, 2, i, this.pixelCoordinates_), e._ol_transform_.setFromArray(this.renderedTransform_, i)); for (var l, _, h, c, u, d, p, f, g, v = !e._ol_obj_.isEmpty(o), y = 0, m = n.length, x = 0, E = 0, T = 0, C = null, R = null, S = this.coordinateCache_, I = this.viewRotation_, L = { context: t, pixelRatio: this.pixelRatio, resolution: this.resolution, rotation: I }, w = this.instructions != n || this.overlaps ? 0 : 200; y < m;) {
    var b, A, P, D = n[y];
    switch (D[0]) {
        case 0:
            b = D[1], v && o[e._ol_.getUid(b).toString()] || !b.getGeometry() ? y = D[2] : void 0 === s || e._ol_extent_.intersects(s, b.getGeometry().getExtent()) ? ++y : y = D[2] + 1;
            break;
        case 1:
            E > w && (this.fill_(t), E = 0), T > w && (t.stroke(), T = 0), E || T || (t.beginPath(), c = u = NaN), ++y;
            break;
        case 2:
            var F = a[x = D[1]], O = a[x + 1], M = a[x + 2] - F, G = a[x + 3] - O, k = Math.sqrt(M * M + G * G);
            t.moveTo(F + k, O), t.arc(F, O, k, 0, 2 * Math.PI, !0), ++y;
            break;
        case 3:
            t.closePath(), ++y;
            break;
        case 4:
            x = D[1], l = D[2];
            var N = D[3], U = D[4], B = 6 == D.length ? D[5] : void 0;
            L.geometry = N, L.feature = b, y in S || (S[y] = []);
            var W = S[y];
            B ? B(a, x, l, 2, W) : (W[0] = a[x], W[1] = a[x + 1], W.length = 2), U(W, L), ++y;
            break;
        case 6:
            x = D[1], l = D[2], g = D[3], _ = D[4], h = D[5], f = r ? null : D[6];
            var j, V, X, K = D[7], z = D[8], H = D[9], Y = D[10], q = D[11], Z = D[12], J = D[13], Q = D[14], $ = D[15];
            for (D.length > 16 ? (j = D[16], V = D[17], X = D[18]) : (j = e._ol_render_canvas_.defaultPadding, V = X = !1), q && (Z += I); x < l; x += 2)
                this.replayImage_(t, a[x], a[x + 1], g, _, h, f, K, z, H, Y, Z, J, Q, $, j, V ? C : null, X ? R : null);
            this.renderDeclutter_(f, b), ++y;
            break;
        case 5:
            var tt = D[1], et = D[2], it = D[3];
            f = r ? null : D[4];
            var ot = D[5], nt = D[6], rt = D[7], st = D[8], at = D[9], lt = D[10], _t = D[11], ht = D[12], ct = D[13], ut = D[14], dt = Tt.lineString(a, tt, et, 2), pt = st(ht);
            if (ot || pt <= dt) {
                var ft = this.textStates[ct].textAlign, gt = (dt - pt) * Rt.TEXT_ALIGN[ft], vt = Ct(a, tt, et, 2, ht, st, gt, rt);
                if (vt) {
                    var yt, mt, xt, Et, St;
                    if (lt)
                        for (yt = 0, mt = vt.length; yt < mt; ++yt)
                            xt = (St = vt[yt])[4], Et = this.getImage(xt, ct, "", lt), _ = St[2] + _t, h = it * Et.height + 2 * (.5 - it) * _t - at, this.replayImage_(t, St[0], St[1], Et, _, h, f, Et.height, 1, 0, 0, St[3], ut, !1, Et.width, e._ol_render_canvas_.defaultPadding, null, null);
                    if (nt)
                        for (yt = 0, mt = vt.length; yt < mt; ++yt)
                            xt = (St = vt[yt])[4], Et = this.getImage(xt, ct, nt, ""), _ = St[2], h = it * Et.height - at, this.replayImage_(t, St[0], St[1], Et, _, h, f, Et.height, 1, 0, 0, St[3], ut, !1, Et.width, e._ol_render_canvas_.defaultPadding, null, null);
                }
            }
            this.renderDeclutter_(f, b), ++y;
            break;
        case 7:
            if (void 0 !== r) {
                var It = r(b = D[1]);
                if (It)
                    return It;
            }
            ++y;
            break;
        case 8:
            w ? E++ : this.fill_(t), ++y;
            break;
        case 9:
            for (x = D[1], l = D[2], A = a[x], p = (P = a[x + 1]) + .5 | 0, (d = A + .5 | 0) === c && p === u || (t.moveTo(A, P), c = d, u = p), x += 2; x < l; x += 2)
                d = (A = a[x]) + .5 | 0, p = (P = a[x + 1]) + .5 | 0, x != l - 2 && d === c && p === u || (t.lineTo(A, P), c = d, u = p);
            ++y;
            break;
        case 10:
            C = D, this.fillOrigin_ = D[2], E && (this.fill_(t), E = 0, T && (t.stroke(), T = 0)), t.fillStyle = D[1], ++y;
            break;
        case 11:
            R = D, T && (t.stroke(), T = 0), this.setStrokeStyle_(t, D), ++y;
            break;
        case 12:
            w ? T++ : t.stroke(), ++y;
            break;
        default: ++y;
    }
} E && this.fill_(t), T && t.stroke(); }, St.prototype.replay = function (t, e, i, o) { this.viewRotation_ = i, this.replay_(t, e, o, this.instructions, void 0, void 0); }, St.prototype.replayHitDetection = function (t, e, i, o, n, r) { return this.viewRotation_ = i, this.replay_(t, e, o, this.hitDetectionInstructions, n, r); }, St.prototype.reverseHitDetectionInstructions = function () { var t, i = this.hitDetectionInstructions; i.reverse(); var o, n, r = i.length, s = -1; for (t = 0; t < r; ++t)
    7 == (n = (o = i[t])[0]) ? s = t : 0 == n && (o[2] = t, e._ol_array_.reverseSubArray(this.hitDetectionInstructions, s, t), s = -1); }, St.prototype.setFillStrokeStyle = function (t, i) { var o = this.state; if (t) {
    var n = t.getColor();
    o.fillStyle = e._ol_colorlike_.asColorLike(n || e._ol_render_canvas_.defaultFillStyle);
}
else
    o.fillStyle = void 0; if (i) {
    var r = i.getColor();
    o.strokeStyle = e._ol_colorlike_.asColorLike(r || e._ol_render_canvas_.defaultStrokeStyle);
    var s = i.getLineCap();
    o.lineCap = void 0 !== s ? s : e._ol_render_canvas_.defaultLineCap;
    var a = i.getLineDash();
    o.lineDash = a ? a.slice() : e._ol_render_canvas_.defaultLineDash;
    var l = i.getLineDashOffset();
    o.lineDashOffset = l || e._ol_render_canvas_.defaultLineDashOffset;
    var _ = i.getLineJoin();
    o.lineJoin = void 0 !== _ ? _ : e._ol_render_canvas_.defaultLineJoin;
    var h = i.getWidth();
    o.lineWidth = void 0 !== h ? h : e._ol_render_canvas_.defaultLineWidth;
    var c = i.getMiterLimit();
    o.miterLimit = void 0 !== c ? c : e._ol_render_canvas_.defaultMiterLimit, o.lineWidth > this.maxLineWidth && (this.maxLineWidth = o.lineWidth, this.bufferedMaxExtent_ = null);
}
else
    o.strokeStyle = void 0, o.lineCap = void 0, o.lineDash = null, o.lineDashOffset = void 0, o.lineJoin = void 0, o.lineWidth = void 0, o.miterLimit = void 0; }, St.prototype.applyFill = function (t, e) { var i = t.fillStyle, o = [10, i]; if ("string" != typeof i) {
    var n = e.getExtent();
    o.push([n[0], n[3]]);
} this.instructions.push(o); }, St.prototype.applyStroke = function (t) { this.instructions.push([11, t.strokeStyle, t.lineWidth * this.pixelRatio, t.lineCap, t.lineJoin, t.miterLimit, this.applyPixelRatio(t.lineDash), t.lineDashOffset * this.pixelRatio]); }, St.prototype.updateFillStyle = function (t, e, i) { var o = t.fillStyle; "string" == typeof o && t.currentFillStyle == o || (e.call(this, t, i), t.currentFillStyle = o); }, St.prototype.updateStrokeStyle = function (t, i) { var o = t.strokeStyle, n = t.lineCap, r = t.lineDash, s = t.lineDashOffset, a = t.lineJoin, l = t.lineWidth, _ = t.miterLimit; (t.currentStrokeStyle != o || t.currentLineCap != n || r != t.currentLineDash && !e._ol_array_.equals(t.currentLineDash, r) || t.currentLineDashOffset != s || t.currentLineJoin != a || t.currentLineWidth != l || t.currentMiterLimit != _) && (i.call(this, t), t.currentStrokeStyle = o, t.currentLineCap = n, t.currentLineDash = r, t.currentLineDashOffset = s, t.currentLineJoin = a, t.currentLineWidth = l, t.currentMiterLimit = _); }, St.prototype.endGeometry = function (t, e) { this.beginGeometryInstruction1_[2] = this.instructions.length, this.beginGeometryInstruction1_ = null, this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length, this.beginGeometryInstruction2_ = null; var i = [7, e]; this.instructions.push(i), this.hitDetectionInstructions.push(i); }, St.prototype.finish = e._ol_.nullFunction, St.prototype.getBufferedMaxExtent = function () { if (!this.bufferedMaxExtent_ && (this.bufferedMaxExtent_ = e._ol_extent_.clone(this.maxExtent), this.maxLineWidth > 0)) {
    var t = this.resolution * (this.maxLineWidth + 1) / 2;
    e._ol_extent_.buffer(this.bufferedMaxExtent_, t, this.bufferedMaxExtent_);
} return this.bufferedMaxExtent_; }; var It = function (t, e, i, o, n, r) { St.call(this, t, e, i, o, n, r), this.declutterGroup_ = null, this.hitDetectionImage_ = null, this.image_ = null, this.anchorX_ = void 0, this.anchorY_ = void 0, this.height_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.scale_ = void 0, this.snapToPixel_ = void 0, this.width_ = void 0; }; e._ol_.inherits(It, St), It.prototype.drawCoordinates_ = function (t, e, i, o) { return this.appendFlatCoordinates(t, e, i, o, !1, !1); }, It.prototype.drawPoint = function (t, e) { if (this.image_) {
    this.beginGeometry(t, e);
    var i = t.getFlatCoordinates(), o = t.getStride(), n = this.coordinates.length, r = this.drawCoordinates_(i, 0, i.length, o);
    this.instructions.push([6, n, r, this.image_, this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_ * this.pixelRatio, this.snapToPixel_, this.width_]), this.hitDetectionInstructions.push([6, n, r, this.hitDetectionImage_, this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_, this.snapToPixel_, this.width_]), this.endGeometry(t, e);
} }, It.prototype.drawMultiPoint = function (t, e) { if (this.image_) {
    this.beginGeometry(t, e);
    var i = t.getFlatCoordinates(), o = t.getStride(), n = this.coordinates.length, r = this.drawCoordinates_(i, 0, i.length, o);
    this.instructions.push([6, n, r, this.image_, this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_ * this.pixelRatio, this.snapToPixel_, this.width_]), this.hitDetectionInstructions.push([6, n, r, this.hitDetectionImage_, this.anchorX_, this.anchorY_, this.declutterGroup_, this.height_, this.opacity_, this.originX_, this.originY_, this.rotateWithView_, this.rotation_, this.scale_, this.snapToPixel_, this.width_]), this.endGeometry(t, e);
} }, It.prototype.finish = function () { this.reverseHitDetectionInstructions(), this.anchorX_ = void 0, this.anchorY_ = void 0, this.hitDetectionImage_ = null, this.image_ = null, this.height_ = void 0, this.scale_ = void 0, this.opacity_ = void 0, this.originX_ = void 0, this.originY_ = void 0, this.rotateWithView_ = void 0, this.rotation_ = void 0, this.snapToPixel_ = void 0, this.width_ = void 0; }, It.prototype.setImageStyle = function (t, e) { var i = t.getAnchor(), o = t.getSize(), n = t.getHitDetectionImage(1), r = t.getImage(1), s = t.getOrigin(); this.anchorX_ = i[0], this.anchorY_ = i[1], this.declutterGroup_ = e, this.hitDetectionImage_ = n, this.image_ = r, this.height_ = o[1], this.opacity_ = t.getOpacity(), this.originX_ = s[0], this.originY_ = s[1], this.rotateWithView_ = t.getRotateWithView(), this.rotation_ = t.getRotation(), this.scale_ = t.getScale(), this.snapToPixel_ = t.getSnapToPixel(), this.width_ = o[0]; }; var Lt = function (t, e, i, o, n, r) { St.call(this, t, e, i, o, n, r); }; e._ol_.inherits(Lt, St), Lt.prototype.drawFlatCoordinates_ = function (t, e, i, o) { var n = [9, this.coordinates.length, this.appendFlatCoordinates(t, e, i, o, !1, !1)]; return this.instructions.push(n), this.hitDetectionInstructions.push(n), i; }, Lt.prototype.drawLineString = function (t, e) { var i = this.state, o = i.strokeStyle, n = i.lineWidth; if (void 0 !== o && void 0 !== n) {
    this.updateStrokeStyle(i, this.applyStroke), this.beginGeometry(t, e), this.hitDetectionInstructions.push([11, i.strokeStyle, i.lineWidth, i.lineCap, i.lineJoin, i.miterLimit, i.lineDash, i.lineDashOffset], [1]);
    var r = t.getFlatCoordinates(), s = t.getStride();
    this.drawFlatCoordinates_(r, 0, r.length, s), this.hitDetectionInstructions.push([12]), this.endGeometry(t, e);
} }, Lt.prototype.drawMultiLineString = function (t, e) { var i = this.state, o = i.strokeStyle, n = i.lineWidth; if (void 0 !== o && void 0 !== n) {
    this.updateStrokeStyle(i, this.applyStroke), this.beginGeometry(t, e), this.hitDetectionInstructions.push([11, i.strokeStyle, i.lineWidth, i.lineCap, i.lineJoin, i.miterLimit, i.lineDash, i.lineDashOffset], [1]);
    var r, s, a = t.getEnds(), l = t.getFlatCoordinates(), _ = t.getStride(), h = 0;
    for (r = 0, s = a.length; r < s; ++r)
        h = this.drawFlatCoordinates_(l, h, a[r], _);
    this.hitDetectionInstructions.push([12]), this.endGeometry(t, e);
} }, Lt.prototype.finish = function () { var t = this.state; void 0 != t.lastStroke && t.lastStroke != this.coordinates.length && this.instructions.push([12]), this.reverseHitDetectionInstructions(), this.state = null; }, Lt.prototype.applyStroke = function (t) { void 0 != t.lastStroke && t.lastStroke != this.coordinates.length && (this.instructions.push([12]), t.lastStroke = this.coordinates.length), t.lastStroke = 0, St.prototype.applyStroke.call(this, t), this.instructions.push([1]); }; var wt = function (t, e, i, o, n, r) { St.call(this, t, e, i, o, n, r); }; e._ol_.inherits(wt, St), wt.prototype.drawFlatCoordinatess_ = function (t, e, i, o) { var n = this.state, r = void 0 !== n.fillStyle, s = void 0 != n.strokeStyle, a = i.length, l = [1]; this.instructions.push(l), this.hitDetectionInstructions.push(l); for (var _ = 0; _ < a; ++_) {
    var h = i[_], c = [9, this.coordinates.length, this.appendFlatCoordinates(t, e, h, o, !0, !s)];
    if (this.instructions.push(c), this.hitDetectionInstructions.push(c), s) {
        var u = [3];
        this.instructions.push(u), this.hitDetectionInstructions.push(u);
    }
    e = h;
} var d = [8]; if (this.hitDetectionInstructions.push(d), r && this.instructions.push(d), s) {
    var p = [12];
    this.instructions.push(p), this.hitDetectionInstructions.push(p);
} return e; }, wt.prototype.drawCircle = function (t, i) { var o = this.state, n = o.fillStyle, r = o.strokeStyle; if (void 0 !== n || void 0 !== r) {
    this.setFillStrokeStyles_(t), this.beginGeometry(t, i), this.hitDetectionInstructions.push([10, e._ol_color_.asString(e._ol_render_canvas_.defaultFillStyle)]), void 0 !== o.strokeStyle && this.hitDetectionInstructions.push([11, o.strokeStyle, o.lineWidth, o.lineCap, o.lineJoin, o.miterLimit, o.lineDash, o.lineDashOffset]);
    var s = t.getFlatCoordinates(), a = t.getStride(), l = this.coordinates.length;
    this.appendFlatCoordinates(s, 0, s.length, a, !1, !1);
    var _ = [1], h = [2, l];
    this.instructions.push(_, h), this.hitDetectionInstructions.push(_, h);
    var c = [8];
    if (this.hitDetectionInstructions.push(c), void 0 !== o.fillStyle && this.instructions.push(c), void 0 !== o.strokeStyle) {
        var u = [12];
        this.instructions.push(u), this.hitDetectionInstructions.push(u);
    }
    this.endGeometry(t, i);
} }, wt.prototype.drawPolygon = function (t, i) { var o = this.state; this.setFillStrokeStyles_(t), this.beginGeometry(t, i), this.hitDetectionInstructions.push([10, e._ol_color_.asString(e._ol_render_canvas_.defaultFillStyle)]), void 0 !== o.strokeStyle && this.hitDetectionInstructions.push([11, o.strokeStyle, o.lineWidth, o.lineCap, o.lineJoin, o.miterLimit, o.lineDash, o.lineDashOffset]); var n = t.getEnds(), r = t.getOrientedFlatCoordinates(), s = t.getStride(); this.drawFlatCoordinatess_(r, 0, n, s), this.endGeometry(t, i); }, wt.prototype.drawMultiPolygon = function (t, i) { var o = this.state, n = o.fillStyle, r = o.strokeStyle; if (void 0 !== n || void 0 !== r) {
    this.setFillStrokeStyles_(t), this.beginGeometry(t, i), this.hitDetectionInstructions.push([10, e._ol_color_.asString(e._ol_render_canvas_.defaultFillStyle)]), void 0 !== o.strokeStyle && this.hitDetectionInstructions.push([11, o.strokeStyle, o.lineWidth, o.lineCap, o.lineJoin, o.miterLimit, o.lineDash, o.lineDashOffset]);
    var s, a, l = t.getEndss(), _ = t.getOrientedFlatCoordinates(), h = t.getStride(), c = 0;
    for (s = 0, a = l.length; s < a; ++s)
        c = this.drawFlatCoordinatess_(_, c, l[s], h);
    this.endGeometry(t, i);
} }, wt.prototype.finish = function () { this.reverseHitDetectionInstructions(), this.state = null; var t = this.tolerance; if (0 !== t) {
    var e, i, o = this.coordinates;
    for (e = 0, i = o.length; e < i; ++e)
        o[e] = L.snap(o[e], t);
} }, wt.prototype.setFillStrokeStyles_ = function (t) { var e = this.state; void 0 !== e.fillStyle && this.updateFillStyle(e, this.applyFill, t), void 0 !== e.strokeStyle && this.updateStrokeStyle(e, this.applyStroke); }; var bt = function (t, e, i, o, n) { var r, s, a, l, _, h, c, u, d, p = i, f = i, g = 0, v = 0, y = i; for (r = i; r < o; r += n) {
    var m = e[r], x = e[r + 1];
    void 0 !== l && (u = m - l, d = x - _, a = Math.sqrt(u * u + d * d), void 0 !== h && (v += s, Math.acos((h * u + c * d) / (s * a)) > t && (v > g && (g = v, p = y, f = r), v = 0, y = r - n)), s = a, h = u, c = d), l = m, _ = x;
} return (v += a) > g ? [y, r] : [p, f]; }, At = function (t, i, o, n, r, s) { St.call(this, t, i, o, n, r, s), this.declutterGroup_, this.labels_ = null, this.text_ = "", this.textOffsetX_ = 0, this.textOffsetY_ = 0, this.textRotateWithView_ = void 0, this.textRotation_ = 0, this.textFillState_ = null, this.fillStates = {}, this.textStrokeState_ = null, this.strokeStates = {}, this.textState_ = {}, this.textStates = {}, this.textKey_ = "", this.fillKey_ = "", this.strokeKey_ = "", this.widths_ = {}, e._ol_render_canvas_.labelCache.prune(); }; e._ol_.inherits(At, St), At.measureTextWidths = function (t, i, o) { var n, r, s = i.length, a = 0; for (r = 0; r < s; ++r)
    n = e._ol_render_canvas_.measureTextWidth(t, i[r]), a = Math.max(a, n), o.push(n); return a; }, At.prototype.drawText = function (t, i) { var o = this.textFillState_, n = this.textStrokeState_, r = this.textState_; if ("" !== this.text_ && r && (o || n)) {
    var s, a, l = this.coordinates.length, _ = t.getType(), h = null, c = 2, u = 2;
    if ("line" === r.placement) {
        if (!e._ol_extent_.intersects(this.getBufferedMaxExtent(), t.getExtent()))
            return;
        var d;
        if (h = t.getFlatCoordinates(), u = t.getStride(), _ == e._ol_geom_GeometryType_.LINE_STRING)
            d = [h.length];
        else if (_ == e._ol_geom_GeometryType_.MULTI_LINE_STRING)
            d = t.getEnds();
        else if (_ == e._ol_geom_GeometryType_.POLYGON)
            d = t.getEnds().slice(0, 1);
        else if (_ == e._ol_geom_GeometryType_.MULTI_POLYGON) {
            var p = t.getEndss();
            for (d = [], s = 0, a = p.length; s < a; ++s)
                d.push(p[s][0]);
        }
        this.beginGeometry(t, i);
        for (var f, g = r.textAlign, v = 0, y = 0, m = d.length; y < m; ++y) {
            if (void 0 == g) {
                var x = bt(r.maxAngle, h, v, d[y], u);
                v = x[0], f = x[1];
            }
            else
                f = d[y];
            for (s = v; s < f; s += u)
                this.coordinates.push(h[s], h[s + 1]);
            c = this.coordinates.length, v = d[y], this.drawChars_(l, c, this.declutterGroup_), l = c;
        }
        this.endGeometry(t, i);
    }
    else {
        var E = this.getImage(this.text_, this.textKey_, this.fillKey_, this.strokeKey_), T = E.width / this.pixelRatio;
        switch (_) {
            case e._ol_geom_GeometryType_.POINT:
            case e._ol_geom_GeometryType_.MULTI_POINT:
                c = (h = t.getFlatCoordinates()).length;
                break;
            case e._ol_geom_GeometryType_.LINE_STRING:
                h = t.getFlatMidpoint();
                break;
            case e._ol_geom_GeometryType_.CIRCLE:
                h = t.getCenter();
                break;
            case e._ol_geom_GeometryType_.MULTI_LINE_STRING:
                c = (h = t.getFlatMidpoints()).length;
                break;
            case e._ol_geom_GeometryType_.POLYGON:
                if (h = t.getFlatInteriorPoint(), !r.overflow && h[2] / this.resolution < T)
                    return;
                u = 3;
                break;
            case e._ol_geom_GeometryType_.MULTI_POLYGON:
                var C = t.getFlatInteriorPoints();
                for (h = [], s = 0, a = C.length; s < a; s += 3)
                    (r.overflow || C[s + 2] / this.resolution >= T) && h.push(C[s], C[s + 1]);
                if (0 == (c = h.length))
                    return;
        }
        c = this.appendFlatCoordinates(h, 0, c, u, !1, !1), this.beginGeometry(t, i), (r.backgroundFill || r.backgroundStroke) && (this.setFillStrokeStyle(r.backgroundFill, r.backgroundStroke), this.updateFillStyle(this.state, this.applyFill, t), this.updateStrokeStyle(this.state, this.applyStroke)), this.drawTextImage_(E, l, c), this.endGeometry(t, i);
    }
} }, At.prototype.getImage = function (t, i, o, n) { var r, s = n + i + t + o + this.pixelRatio, a = e._ol_render_canvas_.labelCache; if (!a.containsKey(s)) {
    var l = n ? this.strokeStates[n] || this.textStrokeState_ : null, _ = o ? this.fillStates[o] || this.textFillState_ : null, h = this.textStates[i] || this.textState_, c = this.pixelRatio, u = h.scale * c, d = Rt.TEXT_ALIGN[h.textAlign || e._ol_render_canvas_.defaultTextAlign], p = n && l.lineWidth ? l.lineWidth : 0, f = t.split("\n"), g = f.length, v = [], y = At.measureTextWidths(h.font, f, v), m = e._ol_render_canvas_.measureTextHeight(h.font), x = m * g, E = y + p, T = e._ol_dom_.createCanvasContext2D(Math.ceil(E * u), Math.ceil((x + p) * u));
    r = T.canvas, a.set(s, r), 1 != u && T.scale(u, u), T.font = h.font, n && (T.strokeStyle = l.strokeStyle, T.lineWidth = p * (e._ol_has_.SAFARI ? u : 1), T.lineCap = l.lineCap, T.lineJoin = l.lineJoin, T.miterLimit = l.miterLimit, e._ol_has_.CANVAS_LINE_DASH && l.lineDash.length && (T.setLineDash(l.lineDash), T.lineDashOffset = l.lineDashOffset)), o && (T.fillStyle = _.fillStyle), T.textBaseline = "middle", T.textAlign = "center";
    var C, R = .5 - d, S = d * r.width / u + R * p;
    if (n)
        for (C = 0; C < g; ++C)
            T.strokeText(f[C], S + R * v[C], .5 * (p + m) + C * m);
    if (o)
        for (C = 0; C < g; ++C)
            T.fillText(f[C], S + R * v[C], .5 * (p + m) + C * m);
} return a.get(s); }, At.prototype.drawTextImage_ = function (t, i, o) { var n = this.textState_, r = this.textStrokeState_, s = this.pixelRatio, a = Rt.TEXT_ALIGN[n.textAlign || e._ol_render_canvas_.defaultTextAlign], l = Rt.TEXT_ALIGN[n.textBaseline], _ = r && r.lineWidth ? r.lineWidth : 0, h = a * t.width / s + 2 * (.5 - a) * _, c = l * t.height / s + 2 * (.5 - l) * _; this.instructions.push([6, i, o, t, (h - this.textOffsetX_) * s, (c - this.textOffsetY_) * s, this.declutterGroup_, t.height, 1, 0, 0, this.textRotateWithView_, this.textRotation_, 1, !0, t.width, n.padding == e._ol_render_canvas_.defaultPadding ? e._ol_render_canvas_.defaultPadding : n.padding.map(function (t) { return t * s; }), !!n.backgroundFill, !!n.backgroundStroke]), this.hitDetectionInstructions.push([6, i, o, t, (h - this.textOffsetX_) * s, (c - this.textOffsetY_) * s, this.declutterGroup_, t.height, 1, 0, 0, this.textRotateWithView_, this.textRotation_, 1 / s, !0, t.width, n.padding, !!n.backgroundFill, !!n.backgroundStroke]); }, At.prototype.drawChars_ = function (t, i, o) { var n = this.textStrokeState_, r = this.textState_, s = this.textFillState_, a = this.strokeKey_; n && (a in this.strokeStates || (this.strokeStates[a] = { strokeStyle: n.strokeStyle, lineCap: n.lineCap, lineDashOffset: n.lineDashOffset, lineWidth: n.lineWidth, lineJoin: n.lineJoin, miterLimit: n.miterLimit, lineDash: n.lineDash })); var l = this.textKey_; this.textKey_ in this.textStates || (this.textStates[this.textKey_] = { font: r.font, textAlign: r.textAlign || e._ol_render_canvas_.defaultTextAlign, scale: r.scale }); var _ = this.fillKey_; s && (_ in this.fillStates || (this.fillStates[_] = { fillStyle: s.fillStyle })); var h = this.pixelRatio, c = Rt.TEXT_ALIGN[r.textBaseline], u = this.textOffsetY_ * h, d = this.text_, p = r.font, f = r.scale, g = n ? n.lineWidth * f / 2 : 0, v = this.widths_[p]; v || (this.widths_[p] = v = {}), this.instructions.push([5, t, i, c, o, r.overflow, _, r.maxAngle, function (t) { var i = v[t]; return i || (i = v[t] = e._ol_render_canvas_.measureTextWidth(p, t)), i * f * h; }, u, a, g * h, d, l, 1]), this.hitDetectionInstructions.push([5, t, i, c, o, r.overflow, _, r.maxAngle, function (t) { var i = v[t]; return i || (i = v[t] = e._ol_render_canvas_.measureTextWidth(p, t)), i * f; }, u, a, g, d, l, 1 / h]); }, At.prototype.setTextStyle = function (t, i) { var o, n, r; if (t) {
    this.declutterGroup_ = i;
    var s = t.getFill();
    s ? ((n = this.textFillState_) || (n = this.textFillState_ = {}), n.fillStyle = e._ol_colorlike_.asColorLike(s.getColor() || e._ol_render_canvas_.defaultFillStyle)) : n = this.textFillState_ = null;
    var a = t.getStroke();
    if (a) {
        (r = this.textStrokeState_) || (r = this.textStrokeState_ = {});
        var l = a.getLineDash(), _ = a.getLineDashOffset(), h = a.getWidth(), c = a.getMiterLimit();
        r.lineCap = a.getLineCap() || e._ol_render_canvas_.defaultLineCap, r.lineDash = l ? l.slice() : e._ol_render_canvas_.defaultLineDash, r.lineDashOffset = void 0 === _ ? e._ol_render_canvas_.defaultLineDashOffset : _, r.lineJoin = a.getLineJoin() || e._ol_render_canvas_.defaultLineJoin, r.lineWidth = void 0 === h ? e._ol_render_canvas_.defaultLineWidth : h, r.miterLimit = void 0 === c ? e._ol_render_canvas_.defaultMiterLimit : c, r.strokeStyle = e._ol_colorlike_.asColorLike(a.getColor() || e._ol_render_canvas_.defaultStrokeStyle);
    }
    else
        r = this.textStrokeState_ = null;
    o = this.textState_;
    var u = t.getFont() || e._ol_render_canvas_.defaultFont;
    e._ol_render_canvas_.checkFont(u);
    var d = t.getScale();
    o.overflow = t.getOverflow(), o.font = u, o.maxAngle = t.getMaxAngle(), o.placement = t.getPlacement(), o.textAlign = t.getTextAlign(), o.textBaseline = t.getTextBaseline() || e._ol_render_canvas_.defaultTextBaseline, o.backgroundFill = t.getBackgroundFill(), o.backgroundStroke = t.getBackgroundStroke(), o.padding = t.getPadding() || e._ol_render_canvas_.defaultPadding, o.scale = void 0 === d ? 1 : d;
    var p = t.getOffsetX(), f = t.getOffsetY(), g = t.getRotateWithView(), v = t.getRotation();
    this.text_ = t.getText() || "", this.textOffsetX_ = void 0 === p ? 0 : p, this.textOffsetY_ = void 0 === f ? 0 : f, this.textRotateWithView_ = void 0 !== g && g, this.textRotation_ = void 0 === v ? 0 : v, this.strokeKey_ = r ? ("string" == typeof r.strokeStyle ? r.strokeStyle : e._ol_.getUid(r.strokeStyle)) + r.lineCap + r.lineDashOffset + "|" + r.lineWidth + r.lineJoin + r.miterLimit + "[" + r.lineDash.join() + "]" : "", this.textKey_ = o.font + o.scale + (o.textAlign || "?"), this.fillKey_ = n ? "string" == typeof n.fillStyle ? n.fillStyle : "|" + e._ol_.getUid(n.fillStyle) : "";
}
else
    this.text_ = ""; }; var Pt = function (t, i, o, n, r, s, a) { xt.call(this), this.declutterTree_ = s, this.declutterGroup_ = null, this.tolerance_ = t, this.maxExtent_ = i, this.overlaps_ = r, this.pixelRatio_ = n, this.resolution_ = o, this.renderBuffer_ = a, this.replaysByZIndex_ = {}, this.hitDetectionContext_ = e._ol_dom_.createCanvasContext2D(1, 1), this.hitDetectionTransform_ = e._ol_transform_.create(); }; e._ol_.inherits(Pt, xt), Pt.circleArrayCache_ = { 0: [[!0]] }, Pt.fillCircleArrayRowToMiddle_ = function (t, e, i) { var o, n = Math.floor(t.length / 2); if (e >= n)
    for (o = n; o < e; o++)
        t[o][i] = !0;
else if (e < n)
    for (o = e + 1; o < n; o++)
        t[o][i] = !0; }, Pt.getCircleArray_ = function (t) { if (void 0 !== Pt.circleArrayCache_[t])
    return Pt.circleArrayCache_[t]; for (var e = 2 * t + 1, i = new Array(e), o = 0; o < e; o++)
    i[o] = new Array(e); for (var n = t, r = 0, s = 0; n >= r;)
    Pt.fillCircleArrayRowToMiddle_(i, t + n, t + r), Pt.fillCircleArrayRowToMiddle_(i, t + r, t + n), Pt.fillCircleArrayRowToMiddle_(i, t - r, t + n), Pt.fillCircleArrayRowToMiddle_(i, t - n, t + r), Pt.fillCircleArrayRowToMiddle_(i, t - n, t - r), Pt.fillCircleArrayRowToMiddle_(i, t - r, t - n), Pt.fillCircleArrayRowToMiddle_(i, t + r, t - n), Pt.fillCircleArrayRowToMiddle_(i, t + n, t - r), 2 * ((s += 1 + 2 * ++r) - n) + 1 > 0 && (s += 1 - 2 * (n -= 1)); return Pt.circleArrayCache_[t] = i, i; }, Pt.replayDeclutter = function (t, i, o) { for (var n = Object.keys(t).map(Number).sort(e._ol_array_.numberSafeCompareFunction), r = {}, s = 0, a = n.length; s < a; ++s)
    for (var l = t[n[s].toString()], _ = 0, h = l.length; _ < h;) {
        var c = l[_++], u = l[_++];
        c.replay(i, u, o, r);
    } }, Pt.prototype.addDeclutter = function (t) { var i = null; return this.declutterTree_ && (t ? (i = this.declutterGroup_)[4]++ : (i = this.declutterGroup_ = e._ol_extent_.createEmpty()).push(1)), i; }, Pt.prototype.clip = function (t, e) { var i = this.getClipCoords(e); t.beginPath(), t.moveTo(i[0], i[1]), t.lineTo(i[2], i[3]), t.lineTo(i[4], i[5]), t.lineTo(i[6], i[7]), t.clip(); }, Pt.prototype.hasReplays = function (t) { for (var e in this.replaysByZIndex_)
    for (var i = this.replaysByZIndex_[e], o = 0, n = t.length; o < n; ++o)
        if (t[o] in i)
            return !0; return !1; }, Pt.prototype.finish = function () { var t; for (t in this.replaysByZIndex_) {
    var e, i = this.replaysByZIndex_[t];
    for (e in i)
        i[e].finish();
} }, Pt.prototype.forEachFeatureAtCoordinate = function (t, i, o, n, r, s, a) { var l, _ = 2 * (n = Math.round(n)) + 1, h = e._ol_transform_.compose(this.hitDetectionTransform_, n + .5, n + .5, 1 / i, -1 / i, -o, -t[0], -t[1]), c = this.hitDetectionContext_; c.canvas.width !== _ || c.canvas.height !== _ ? (c.canvas.width = _, c.canvas.height = _) : c.clearRect(0, 0, _, _), void 0 !== this.renderBuffer_ && (l = e._ol_extent_.createEmpty(), e._ol_extent_.extendCoordinate(l, t), e._ol_extent_.buffer(l, i * (this.renderBuffer_ + n), l)); var u, d, p = Pt.getCircleArray_(n); function f(t) { for (var e = c.getImageData(0, 0, _, _).data, i = 0; i < _; i++)
    for (var o = 0; o < _; o++) {
        var n;
        if (p[i][o] && e[4 * (o * _ + i) + 3] > 0)
            return (!u || d != Et.IMAGE && d != Et.TEXT || -1 !== u.indexOf(t)) && (n = s(t)), n || void c.clearRect(0, 0, _, _);
    } } this.declutterTree_ && (u = this.declutterTree_.all().map(function (t) { return t.value; })); var g, v, y, m, x, E = Object.keys(this.replaysByZIndex_).map(Number); for (E.sort(e._ol_array_.numberSafeCompareFunction), g = E.length - 1; g >= 0; --g) {
    var T = E[g].toString();
    for (y = this.replaysByZIndex_[T], v = Rt.ORDER.length - 1; v >= 0; --v)
        if (void 0 !== (m = y[d = Rt.ORDER[v]]))
            if (!a || d != Et.IMAGE && d != Et.TEXT) {
                if (x = m.replayHitDetection(c, h, o, r, f, l))
                    return x;
            }
            else {
                var C = a[T];
                C ? C.push(m, h.slice(0)) : a[T] = [m, h.slice(0)];
            }
} }, Pt.prototype.getClipCoords = function (t) { var i = this.maxExtent_, o = i[0], n = i[1], r = i[2], s = i[3], a = [o, n, o, s, r, s, r, n]; return e._ol_geom_flat_transform_.transform2D(a, 0, 8, 2, t, a), a; }, Pt.prototype.getReplay = function (t, e) { var i = void 0 !== t ? t.toString() : "0", o = this.replaysByZIndex_[i]; void 0 === o && (o = {}, this.replaysByZIndex_[i] = o); var n = o[e]; return void 0 === n && (n = new (0, Pt.BATCH_CONSTRUCTORS_[e])(this.tolerance_, this.maxExtent_, this.resolution_, this.pixelRatio_, this.overlaps_, this.declutterTree_), o[e] = n), n; }, Pt.prototype.getReplays = function () { return this.replaysByZIndex_; }, Pt.prototype.isEmpty = function () { return e._ol_obj_.isEmpty(this.replaysByZIndex_); }, Pt.prototype.replay = function (t, i, o, n, r, s) { var a = Object.keys(this.replaysByZIndex_).map(Number); a.sort(e._ol_array_.numberSafeCompareFunction), t.save(), this.clip(t, i); var l, _, h, c, u, d, p = r || Rt.ORDER; for (l = 0, _ = a.length; l < _; ++l) {
    var f = a[l].toString();
    for (u = this.replaysByZIndex_[f], h = 0, c = p.length; h < c; ++h) {
        var g = p[h];
        if (void 0 !== (d = u[g]))
            if (!s || g != Et.IMAGE && g != Et.TEXT)
                d.replay(t, i, o, n);
            else {
                var v = s[f];
                v ? v.push(d, i.slice(0)) : s[f] = [d, i.slice(0)];
            }
    }
} t.restore(); }, Pt.BATCH_CONSTRUCTORS_ = { Circle: wt, Default: St, Image: It, LineString: Lt, Polygon: wt, Text: At }; var Dt = { defaultOrder: function (t, i) { return e._ol_.getUid(t) - e._ol_.getUid(i); }, getSquaredTolerance: function (t, e) { var i = Dt.getTolerance(t, e); return i * i; }, getTolerance: function (t, i) { return e._ol_.SIMPLIFY_TOLERANCE * t / i; }, renderCircleGeometry_: function (t, e, i, o) { var n = i.getFill(), r = i.getStroke(); if (n || r) {
        var s = t.getReplay(i.getZIndex(), Et.CIRCLE);
        s.setFillStrokeStyle(n, r), s.drawCircle(e, o);
    } var a = i.getText(); if (a) {
        var l = t.getReplay(i.getZIndex(), Et.TEXT);
        l.setTextStyle(a, t.addDeclutter(!1)), l.drawText(e, o);
    } }, renderFeature: function (t, i, o, n, r, s) { var a, l, _ = !1; return (a = o.getImage()) && ((l = a.getImageState()) == e._ol_ImageState_.LOADED || l == e._ol_ImageState_.ERROR ? a.unlistenImageChange(r, s) : (l == e._ol_ImageState_.IDLE && a.load(), l = a.getImageState(), a.listenImageChange(r, s), _ = !0)), Dt.renderFeature_(t, i, o, n), _; }, renderFeature_: function (t, e, i, o) { var n = i.getGeometryFunction()(e); if (n) {
        var r = n.getSimplifiedGeometry(o);
        i.getRenderer() ? Dt.renderGeometry_(t, r, i, e) : (0, Dt.GEOMETRY_RENDERERS_[r.getType()])(t, r, i, e);
    } }, renderGeometry_: function (t, i, o, n) { if (i.getType() != e._ol_geom_GeometryType_.GEOMETRY_COLLECTION)
        t.getReplay(o.getZIndex(), Et.DEFAULT).drawCustom(i, n, o.getRenderer());
    else
        for (var r = i.getGeometries(), s = 0, a = r.length; s < a; ++s)
            Dt.renderGeometry_(t, r[s], o, n); }, renderGeometryCollectionGeometry_: function (t, e, i, o) { var n, r, s = e.getGeometriesArray(); for (n = 0, r = s.length; n < r; ++n)
        (0, Dt.GEOMETRY_RENDERERS_[s[n].getType()])(t, s[n], i, o); }, renderLineStringGeometry_: function (t, e, i, o) { var n = i.getStroke(); if (n) {
        var r = t.getReplay(i.getZIndex(), Et.LINE_STRING);
        r.setFillStrokeStyle(null, n), r.drawLineString(e, o);
    } var s = i.getText(); if (s) {
        var a = t.getReplay(i.getZIndex(), Et.TEXT);
        a.setTextStyle(s, t.addDeclutter(!1)), a.drawText(e, o);
    } }, renderMultiLineStringGeometry_: function (t, e, i, o) { var n = i.getStroke(); if (n) {
        var r = t.getReplay(i.getZIndex(), Et.LINE_STRING);
        r.setFillStrokeStyle(null, n), r.drawMultiLineString(e, o);
    } var s = i.getText(); if (s) {
        var a = t.getReplay(i.getZIndex(), Et.TEXT);
        a.setTextStyle(s, t.addDeclutter(!1)), a.drawText(e, o);
    } }, renderMultiPolygonGeometry_: function (t, e, i, o) { var n = i.getFill(), r = i.getStroke(); if (r || n) {
        var s = t.getReplay(i.getZIndex(), Et.POLYGON);
        s.setFillStrokeStyle(n, r), s.drawMultiPolygon(e, o);
    } var a = i.getText(); if (a) {
        var l = t.getReplay(i.getZIndex(), Et.TEXT);
        l.setTextStyle(a, t.addDeclutter(!1)), l.drawText(e, o);
    } }, renderPointGeometry_: function (t, i, o, n) { var r = o.getImage(); if (r) {
        if (r.getImageState() != e._ol_ImageState_.LOADED)
            return;
        var s = t.getReplay(o.getZIndex(), Et.IMAGE);
        s.setImageStyle(r, t.addDeclutter(!1)), s.drawPoint(i, n);
    } var a = o.getText(); if (a) {
        var l = t.getReplay(o.getZIndex(), Et.TEXT);
        l.setTextStyle(a, t.addDeclutter(!!r)), l.drawText(i, n);
    } }, renderMultiPointGeometry_: function (t, i, o, n) { var r = o.getImage(); if (r) {
        if (r.getImageState() != e._ol_ImageState_.LOADED)
            return;
        var s = t.getReplay(o.getZIndex(), Et.IMAGE);
        s.setImageStyle(r, t.addDeclutter(!1)), s.drawMultiPoint(i, n);
    } var a = o.getText(); if (a) {
        var l = t.getReplay(o.getZIndex(), Et.TEXT);
        l.setTextStyle(a, t.addDeclutter(!!r)), l.drawText(i, n);
    } }, renderPolygonGeometry_: function (t, e, i, o) { var n = i.getFill(), r = i.getStroke(); if (n || r) {
        var s = t.getReplay(i.getZIndex(), Et.POLYGON);
        s.setFillStrokeStyle(n, r), s.drawPolygon(e, o);
    } var a = i.getText(); if (a) {
        var l = t.getReplay(i.getZIndex(), Et.TEXT);
        l.setTextStyle(a, t.addDeclutter(!1)), l.drawText(e, o);
    } } }; Dt.GEOMETRY_RENDERERS_ = { Point: Dt.renderPointGeometry_, LineString: Dt.renderLineStringGeometry_, Polygon: Dt.renderPolygonGeometry_, MultiPoint: Dt.renderMultiPointGeometry_, MultiLineString: Dt.renderMultiLineStringGeometry_, MultiPolygon: Dt.renderMultiPolygonGeometry_, GeometryCollection: Dt.renderGeometryCollectionGeometry_, Circle: Dt.renderCircleGeometry_ }; var Ft = function (t) { pt.call(this, t), this.declutterTree_ = t.getDeclutter() ? e._ol_ext_rbush_(9) : null, this.dirty_ = !1, this.renderedRevision_ = -1, this.renderedResolution_ = NaN, this.renderedExtent_ = e._ol_extent_.createEmpty(), this.renderedRenderOrder_ = null, this.replayGroup_ = null, this.replayGroupChanged = !0, this.context = e._ol_dom_.createCanvasContext2D(), e._ol_events_.listen(e._ol_render_canvas_.labelCache, e._ol_events_EventType_.CLEAR, this.handleFontsChanged_, this); }; e._ol_.inherits(Ft, pt), Ft.handles = function (t, i) { return "canvas" === t && i.getType() === e._ol_LayerType_.VECTOR; }, Ft.create = function (t, e) { return new Ft(e); }, Ft.prototype.disposeInternal = function () { e._ol_events_.unlisten(e._ol_render_canvas_.labelCache, e._ol_events_EventType_.CLEAR, this.handleFontsChanged_, this), pt.prototype.disposeInternal.call(this); }, Ft.prototype.composeFrame = function (t, i, o) { var n = t.extent, r = t.pixelRatio, s = i.managed ? t.skippedFeatureUids : {}, a = t.viewState, l = a.projection, _ = a.rotation, h = l.getExtent(), c = this.getLayer().getSource(), u = this.getTransform(t, 0); this.preCompose(o, t, u); var d = i.extent, p = void 0 !== d; p && this.clip(o, t, d); var f = this.replayGroup_; if (f && !f.isEmpty()) {
    this.declutterTree_ && this.declutterTree_.clear();
    var g, v = this.getLayer(), y = 0, m = 0, x = 1 !== i.opacity, E = v.hasListener(e._ol_render_EventType_.RENDER);
    if (x || E) {
        var T = o.canvas.width, C = o.canvas.height;
        if (_) {
            var R = Math.round(Math.sqrt(T * T + C * C));
            y = (R - T) / 2, m = (R - C) / 2, T = C = R;
        }
        this.context.canvas.width = T, this.context.canvas.height = C, g = this.context;
    }
    else
        g = o;
    var S = g.globalAlpha;
    x || (g.globalAlpha = i.opacity), g != o && g.translate(y, m);
    var I = t.size[0] * r, L = t.size[1] * r;
    if (e._ol_render_canvas_.rotateAtOffset(g, -_, I / 2, L / 2), f.replay(g, u, _, s), c.getWrapX() && l.canWrapX() && !e._ol_extent_.containsExtent(h, n)) {
        for (var w, b = n[0], A = e._ol_extent_.getWidth(h), P = 0; b < h[0];)
            w = A * --P, u = this.getTransform(t, w), f.replay(g, u, _, s), b += A;
        for (P = 0, b = n[2]; b > h[2];)
            w = A * ++P, u = this.getTransform(t, w), f.replay(g, u, _, s), b -= A;
        u = this.getTransform(t, 0);
    }
    if (e._ol_render_canvas_.rotateAtOffset(g, _, I / 2, L / 2), g != o) {
        if (E && this.dispatchRenderEvent(g, t, u), x) {
            var D = o.globalAlpha;
            o.globalAlpha = i.opacity, o.drawImage(g.canvas, -y, -m), o.globalAlpha = D;
        }
        else
            o.drawImage(g.canvas, -y, -m);
        g.translate(-y, -m);
    }
    x || (g.globalAlpha = S);
} p && o.restore(), this.postCompose(o, t, i, u); }, Ft.prototype.forEachFeatureAtCoordinate = function (t, i, o, n, r) { if (this.replayGroup_) {
    var s = i.viewState.resolution, a = i.viewState.rotation, l = this.getLayer(), _ = {};
    return this.replayGroup_.forEachFeatureAtCoordinate(t, s, a, o, {}, function (t) { var i = e._ol_.getUid(t).toString(); if (!(i in _))
        return _[i] = !0, n.call(r, t, l); }, null);
} }, Ft.prototype.handleFontsChanged_ = function (t) { var e = this.getLayer(); e.getVisible() && this.replayGroup_ && e.changed(); }, Ft.prototype.handleStyleImageChange_ = function (t) { this.renderIfReadyAndVisible(); }, Ft.prototype.prepareFrame = function (t, i) { var o = this.getLayer(), n = o.getSource(); this.updateLogos(t, n); var r = t.viewHints[0], s = t.viewHints[1], a = o.getUpdateWhileAnimating(), l = o.getUpdateWhileInteracting(); if (!this.dirty_ && !a && r || !l && s)
    return !0; var _ = t.extent, h = t.viewState, c = h.projection, u = h.resolution, d = t.pixelRatio, p = o.getRevision(), f = o.getRenderBuffer(), g = o.getRenderOrder(); void 0 === g && (g = Dt.defaultOrder); var v = e._ol_extent_.buffer(_, f * u), y = h.projection.getExtent(); if (n.getWrapX() && h.projection.canWrapX() && !e._ol_extent_.containsExtent(y, t.extent)) {
    var m = e._ol_extent_.getWidth(y), x = Math.max(e._ol_extent_.getWidth(v) / 2, m);
    v[0] = y[0] - x, v[2] = y[2] + x;
} if (!this.dirty_ && this.renderedResolution_ == u && this.renderedRevision_ == p && this.renderedRenderOrder_ == g && e._ol_extent_.containsExtent(this.renderedExtent_, v))
    return this.replayGroupChanged = !1, !0; this.replayGroup_ = null, this.dirty_ = !1; var E = new Pt(Dt.getTolerance(u, d), v, u, d, n.getOverlaps(), this.declutterTree_, o.getRenderBuffer()); n.loadFeatures(v, u, c); var T = function (t) { var e, i = t.getStyleFunction(); if (i ? e = i.call(t, u) : (i = o.getStyleFunction()) && (e = i(t, u)), e) {
    var n = this.renderFeature(t, u, d, e, E);
    this.dirty_ = this.dirty_ || n;
} }.bind(this); if (g) {
    var C = [];
    n.forEachFeatureInExtent(v, function (t) { C.push(t); }, this), C.sort(g);
    for (var R = 0, S = C.length; R < S; ++R)
        T(C[R]);
}
else
    n.forEachFeatureInExtent(v, T, this); return E.finish(), this.renderedResolution_ = u, this.renderedRevision_ = p, this.renderedRenderOrder_ = g, this.renderedExtent_ = v, this.replayGroup_ = E, this.replayGroupChanged = !0, !0; }, Ft.prototype.renderFeature = function (t, e, i, o, n) { if (!o)
    return !1; var r = !1; if (Array.isArray(o))
    for (var s = 0, a = o.length; s < a; ++s)
        r = Dt.renderFeature(n, t, o[s], Dt.getSquaredTolerance(e, i), this.handleStyleImageChange_, this) || r;
else
    r = Dt.renderFeature(n, t, o, Dt.getSquaredTolerance(e, i), this.handleStyleImageChange_, this); return r; }; var Ot = function (t) { this.context = null, mt.call(this, t), this.declutterTree_ = t.getDeclutter() ? e._ol_ext_rbush_(9) : null, this.dirty_ = !1, this.renderedLayerRevision_, this.tmpTransform_ = e._ol_transform_.create(), this.zDirection = "vector" == t.getRenderMode() ? 1 : 0, e._ol_events_.listen(e._ol_render_canvas_.labelCache, e._ol_events_EventType_.CLEAR, this.handleFontsChanged_, this); }; e._ol_.inherits(Ot, mt), Ot.handles = function (t, i) { return "canvas" === t && i.getType() === e._ol_LayerType_.VECTOR_TILE; }, Ot.create = function (t, e) { return new Ot(e); }, Ot.IMAGE_REPLAYS = { image: [Et.POLYGON, Et.CIRCLE, Et.LINE_STRING, Et.IMAGE, Et.TEXT], hybrid: [Et.POLYGON, Et.LINE_STRING] }, Ot.VECTOR_REPLAYS = { image: [Et.DEFAULT], hybrid: [Et.IMAGE, Et.TEXT, Et.DEFAULT], vector: Rt.ORDER }, Ot.prototype.disposeInternal = function () { e._ol_events_.unlisten(e._ol_render_canvas_.labelCache, e._ol_events_EventType_.CLEAR, this.handleFontsChanged_, this), mt.prototype.disposeInternal.call(this); }, Ot.prototype.prepareFrame = function (t, i) { var o = this.getLayer(), n = o.getRevision(); if (this.renderedLayerRevision_ != n) {
    this.renderedTiles.length = 0;
    var r = o.getRenderMode();
    this.context || "vector" == r || (this.context = e._ol_dom_.createCanvasContext2D()), this.context && "vector" == r && (this.context = null);
} return this.renderedLayerRevision_ = n, mt.prototype.prepareFrame.apply(this, arguments); }, Ot.prototype.createReplayGroup_ = function (t, i) { var o = this.getLayer(), n = i.pixelRatio, r = i.viewState.projection, s = o.getRevision(), a = o.getRenderOrder() || null, l = t.getReplayState(o); if (l.dirty || l.renderedRevision != s || l.renderedRenderOrder != a) {
    for (var _ = o.getSource(), h = _.getTileGrid(), c = _.getTileGridForProjection(r), u = c.getResolution(t.tileCoord[0]), d = c.getTileCoordExtent(t.wrappedTileCoord), p = 0, f = t.tileKeys.length; p < f; ++p) {
        var g = t.getTile(t.tileKeys[p]);
        if (3 != g.getState()) {
            var v = g.tileCoord, y = h.getTileCoordExtent(v), m = e._ol_extent_.getIntersection(d, y), x = e._ol_extent_.equals(y, m) ? null : e._ol_extent_.buffer(m, o.getRenderBuffer() * u), E = g.getProjection(), T = !1;
            e._ol_proj_.equivalent(r, E) || (T = !0, g.setProjection(r)), l.dirty = !1;
            var C, R = new Pt(0, m, u, n, _.getOverlaps(), this.declutterTree_, o.getRenderBuffer()), S = Dt.getSquaredTolerance(u, n), I = function (t) { var e, i = t.getStyleFunction(); if (i ? e = i.call(t, u) : (i = o.getStyleFunction()) && (e = i(t, u)), e) {
                var n = this.renderFeature(t, S, e, R);
                this.dirty_ = this.dirty_ || n, l.dirty = l.dirty || n;
            } }, L = g.getFeatures();
            a && a !== l.renderedRenderOrder && L.sort(a);
            for (var w = 0, b = L.length; w < b; ++w)
                C = L[w], T && (E.getUnits() == e._ol_proj_Units_.TILE_PIXELS && (E.setWorldExtent(y), E.setExtent(g.getExtent())), C.getGeometry().transform(E, r)), x && !e._ol_extent_.intersects(x, C.getGeometry().getExtent()) || I.call(this, C);
            for (var A in R.finish(), R.getReplays())
                ;
            g.setReplayGroup(o, t.tileCoord.toString(), R);
        }
    }
    l.renderedRevision = s, l.renderedRenderOrder = a;
} }, Ot.prototype.drawTileImage = function (t, e, i, o, n, r, s, a, l) { var _ = t; this.createReplayGroup_(_, e), this.context && (this.renderTileImage_(_, e, i), mt.prototype.drawTileImage.apply(this, arguments)); }, Ot.prototype.forEachFeatureAtCoordinate = function (t, i, o, n, r) { var s = i.viewState.resolution, a = i.viewState.rotation; o = void 0 == o ? 0 : o; var l, _, h, c, u, d, p, f, g = this.getLayer(), v = {}, y = this.renderedTiles, m = g.getSource().getTileGridForProjection(i.viewState.projection); for (h = 0, c = y.length; h < c; ++h)
    if (p = (d = y[h]).wrappedTileCoord, f = m.getTileCoordExtent(p, this.tmpExtent), l = e._ol_extent_.buffer(f, o * s, l), e._ol_extent_.containsCoordinate(l, t))
        for (var x = 0, E = d.tileKeys.length; x < E; ++x) {
            var T = d.getTile(d.tileKeys[x]);
            3 != T.getState() && (u = T.getReplayGroup(g, d.tileCoord.toString()), _ = _ || u.forEachFeatureAtCoordinate(t, s, a, o, {}, function (t) { var i = e._ol_.getUid(t).toString(); if (!(i in v))
                return v[i] = !0, n.call(r, t, g); }, null));
        } return _; }, Ot.prototype.getReplayTransform_ = function (t, i) { var o = this.getLayer().getSource().getTileGrid(), n = t.tileCoord, r = o.getResolution(n[0]), s = i.viewState, a = i.pixelRatio, l = s.resolution / a, _ = o.getTileCoordExtent(n, this.tmpExtent), h = s.center, c = e._ol_extent_.getTopLeft(_), u = i.size, d = Math.round(a * u[0] / 2), p = Math.round(a * u[1] / 2); return e._ol_transform_.compose(this.tmpTransform_, d, p, r / l, r / l, s.rotation, (c[0] - h[0]) / r, (h[1] - c[1]) / r); }, Ot.prototype.handleFontsChanged_ = function (t) { var e = this.getLayer(); e.getVisible() && void 0 !== this.renderedLayerRevision_ && e.changed(); }, Ot.prototype.handleStyleImageChange_ = function (t) { this.renderIfReadyAndVisible(); }, Ot.prototype.postCompose = function (t, i, o) { var n, r, s = this.getLayer(), a = s.getDeclutter() ? {} : null, l = s.getSource(), _ = s.getRenderMode(), h = Ot.VECTOR_REPLAYS[_], c = i.pixelRatio, u = i.viewState.rotation, d = i.size; u && (n = Math.round(c * d[0] / 2), r = Math.round(c * d[1] / 2), e._ol_render_canvas_.rotateAtOffset(t, -u, n, r)), a && this.declutterTree_.clear(); for (var p = this.renderedTiles, f = l.getTileGridForProjection(i.viewState.projection), g = [], v = [], y = p.length - 1; y >= 0; --y) {
    var m = p[y];
    if (5 != m.getState())
        for (var x = m.tileCoord, E = f.getTileCoordExtent(x)[0] - f.getTileCoordExtent(m.wrappedTileCoord)[0], T = void 0, C = 0, R = m.tileKeys.length; C < R; ++C) {
            var S = m.getTile(m.tileKeys[C]);
            if (3 != S.getState()) {
                var I = S.getReplayGroup(s, x.toString());
                if ("vector" == _ || I.hasReplays(h)) {
                    T || (T = this.getTransform(i, E));
                    var L = S.tileCoord[0], w = I.getClipCoords(T);
                    t.save(), t.globalAlpha = o.opacity;
                    for (var b = 0, A = g.length; b < A; ++b) {
                        var P = g[b];
                        L < v[b] && (t.beginPath(), t.moveTo(w[0], w[1]), t.lineTo(w[2], w[3]), t.lineTo(w[4], w[5]), t.lineTo(w[6], w[7]), t.moveTo(P[6], P[7]), t.lineTo(P[4], P[5]), t.lineTo(P[2], P[3]), t.lineTo(P[0], P[1]), t.clip());
                    }
                    I.replay(t, T, u, {}, h, a), t.restore(), g.push(w), v.push(L);
                }
            }
        }
} a && Pt.replayDeclutter(a, t, u), u && e._ol_render_canvas_.rotateAtOffset(t, u, n, r), mt.prototype.postCompose.apply(this, arguments); }, Ot.prototype.renderFeature = function (t, e, i, o) { if (!i)
    return !1; var n = !1; if (Array.isArray(i))
    for (var r = 0, s = i.length; r < s; ++r)
        n = Dt.renderFeature(o, t, i[r], e, this.handleStyleImageChange_, this) || n;
else
    n = Dt.renderFeature(o, t, i, e, this.handleStyleImageChange_, this); return n; }, Ot.prototype.renderTileImage_ = function (t, i, o) { var n = this.getLayer(), r = t.getReplayState(n), s = n.getRevision(), a = Ot.IMAGE_REPLAYS[n.getRenderMode()]; if (a && r.renderedTileRevision !== s) {
    r.renderedTileRevision = s;
    var l = t.wrappedTileCoord, _ = l[0], h = i.pixelRatio, c = n.getSource(), u = c.getTileGridForProjection(i.viewState.projection), d = u.getResolution(_), p = t.getContext(n), f = c.getTilePixelSize(_, h, i.viewState.projection);
    p.canvas.width = f[0], p.canvas.height = f[1];
    for (var g = u.getTileCoordExtent(l), v = 0, y = t.tileKeys.length; v < y; ++v) {
        var m = t.getTile(t.tileKeys[v]);
        if (3 != m.getState()) {
            var x = h / d, E = e._ol_transform_.reset(this.tmpTransform_);
            e._ol_transform_.scale(E, x, -x), e._ol_transform_.translate(E, -g[0], -g[3]), m.getReplayGroup(n, t.tileCoord.toString()).replay(p, E, 0, {}, a);
        }
    }
} }; var Mt = function (t) { this.source_ = t; }; Mt.prototype.getType = function () { }, Mt.prototype.getSource = function () { return this.source_; }, Mt.prototype.isAnimated = e._ol_functions_.FALSE; var Gt = function (t) { Mt.call(this, t); }; e._ol_.inherits(Gt, Mt), Gt.prototype.getType = function () { return e._ol_webgl_.FRAGMENT_SHADER; }; var kt = function (t) { Mt.call(this, t); }; e._ol_.inherits(kt, Mt), kt.prototype.getType = function () { return e._ol_webgl_.VERTEX_SHADER; }; var Nt = {}; Nt.fragment = new Gt(e._ol_.DEBUG_WEBGL ? "precision mediump float;\nvarying vec2 v_center;\nvarying vec2 v_offset;\nvarying float v_halfWidth;\nvarying float v_pixelRatio;\n\n\n\nuniform float u_opacity;\nuniform vec4 u_fillColor;\nuniform vec4 u_strokeColor;\nuniform vec2 u_size;\n\nvoid main(void) {\n  vec2 windowCenter = vec2((v_center.x + 1.0) / 2.0 * u_size.x * v_pixelRatio,\n      (v_center.y + 1.0) / 2.0 * u_size.y * v_pixelRatio);\n  vec2 windowOffset = vec2((v_offset.x + 1.0) / 2.0 * u_size.x * v_pixelRatio,\n      (v_offset.y + 1.0) / 2.0 * u_size.y * v_pixelRatio);\n  float radius = length(windowCenter - windowOffset);\n  float dist = length(windowCenter - gl_FragCoord.xy);\n  if (dist > radius + v_halfWidth) {\n    if (u_strokeColor.a == 0.0) {\n      gl_FragColor = u_fillColor;\n    } else {\n      gl_FragColor = u_strokeColor;\n    }\n    gl_FragColor.a = gl_FragColor.a - (dist - (radius + v_halfWidth));\n  } else if (u_fillColor.a == 0.0) {\n    // Hooray, no fill, just stroke. We can use real antialiasing.\n    gl_FragColor = u_strokeColor;\n    if (dist < radius - v_halfWidth) {\n      gl_FragColor.a = gl_FragColor.a - (radius - v_halfWidth - dist);\n    }\n  } else {\n    gl_FragColor = u_fillColor;\n    float strokeDist = radius - v_halfWidth;\n    float antialias = 2.0 * v_pixelRatio;\n    if (dist > strokeDist) {\n      gl_FragColor = u_strokeColor;\n    } else if (dist >= strokeDist - antialias) {\n      float step = smoothstep(strokeDist - antialias, strokeDist, dist);\n      gl_FragColor = mix(u_fillColor, u_strokeColor, step);\n    }\n  }\n  gl_FragColor.a = gl_FragColor.a * u_opacity;\n  if (gl_FragColor.a <= 0.0) {\n    discard;\n  }\n}\n" : "precision mediump float;varying vec2 a;varying vec2 b;varying float c;varying float d;uniform float m;uniform vec4 n;uniform vec4 o;uniform vec2 p;void main(void){vec2 windowCenter=vec2((a.x+1.0)/2.0*p.x*d,(a.y+1.0)/2.0*p.y*d);vec2 windowOffset=vec2((b.x+1.0)/2.0*p.x*d,(b.y+1.0)/2.0*p.y*d);float radius=length(windowCenter-windowOffset);float dist=length(windowCenter-gl_FragCoord.xy);if(dist>radius+c){if(o.a==0.0){gl_FragColor=n;}else{gl_FragColor=o;}gl_FragColor.a=gl_FragColor.a-(dist-(radius+c));}else if(n.a==0.0){gl_FragColor=o;if(dist<radius-c){gl_FragColor.a=gl_FragColor.a-(radius-c-dist);}} else{gl_FragColor=n;float strokeDist=radius-c;float antialias=2.0*d;if(dist>strokeDist){gl_FragColor=o;}else if(dist>=strokeDist-antialias){float step=smoothstep(strokeDist-antialias,strokeDist,dist);gl_FragColor=mix(n,o,step);}} gl_FragColor.a=gl_FragColor.a*m;if(gl_FragColor.a<=0.0){discard;}}"), Nt.vertex = new kt(e._ol_.DEBUG_WEBGL ? "varying vec2 v_center;\nvarying vec2 v_offset;\nvarying float v_halfWidth;\nvarying float v_pixelRatio;\n\n\nattribute vec2 a_position;\nattribute float a_instruction;\nattribute float a_radius;\n\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_offsetScaleMatrix;\nuniform mat4 u_offsetRotateMatrix;\nuniform float u_lineWidth;\nuniform float u_pixelRatio;\n\nvoid main(void) {\n  mat4 offsetMatrix = u_offsetScaleMatrix * u_offsetRotateMatrix;\n  v_center = vec4(u_projectionMatrix * vec4(a_position, 0.0, 1.0)).xy;\n  v_pixelRatio = u_pixelRatio;\n  float lineWidth = u_lineWidth * u_pixelRatio;\n  v_halfWidth = lineWidth / 2.0;\n  if (lineWidth == 0.0) {\n    lineWidth = 2.0 * u_pixelRatio;\n  }\n  vec2 offset;\n  // Radius with anitaliasing (roughly).\n  float radius = a_radius + 3.0 * u_pixelRatio;\n  // Until we get gl_VertexID in WebGL, we store an instruction.\n  if (a_instruction == 0.0) {\n    // Offsetting the edges of the triangle by lineWidth / 2 is necessary, however\n    // we should also leave some space for the antialiasing, thus we offset by lineWidth.\n    offset = vec2(-1.0, 1.0);\n  } else if (a_instruction == 1.0) {\n    offset = vec2(-1.0, -1.0);\n  } else if (a_instruction == 2.0) {\n    offset = vec2(1.0, -1.0);\n  } else {\n    offset = vec2(1.0, 1.0);\n  }\n\n  gl_Position = u_projectionMatrix * vec4(a_position + offset * radius, 0.0, 1.0) +\n      offsetMatrix * vec4(offset * lineWidth, 0.0, 0.0);\n  v_offset = vec4(u_projectionMatrix * vec4(a_position.x + a_radius, a_position.y,\n      0.0, 1.0)).xy;\n\n  if (distance(v_center, v_offset) > 20000.0) {\n    gl_Position = vec4(v_center, 0.0, 1.0);\n  }\n}\n\n\n" : "varying vec2 a;varying vec2 b;varying float c;varying float d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;uniform float k;uniform float l;void main(void){mat4 offsetMatrix=i*j;a=vec4(h*vec4(e,0.0,1.0)).xy;d=l;float lineWidth=k*l;c=lineWidth/2.0;if(lineWidth==0.0){lineWidth=2.0*l;}vec2 offset;float radius=g+3.0*l;//Until we get gl_VertexID in WebGL,we store an instruction.if(f==0.0){//Offsetting the edges of the triangle by lineWidth/2 is necessary,however//we should also leave some space for the antialiasing,thus we offset by lineWidth.offset=vec2(-1.0,1.0);}else if(f==1.0){offset=vec2(-1.0,-1.0);}else if(f==2.0){offset=vec2(1.0,-1.0);}else{offset=vec2(1.0,1.0);}gl_Position=h*vec4(e+offset*radius,0.0,1.0)+offsetMatrix*vec4(offset*lineWidth,0.0,0.0);b=vec4(h*vec4(e.x+g,e.y,0.0,1.0)).xy;if(distance(a,b)>20000.0){gl_Position=vec4(a,0.0,1.0);}}"); var Ut = function () { return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; }, Bt = function (t, e) { return t[0] = e[0], t[1] = e[1], t[4] = e[2], t[5] = e[3], t[12] = e[4], t[13] = e[5], t; }, Wt = function (t, i) { ct.call(this), this.tolerance = t, this.maxExtent = i, this.origin = e._ol_extent_.getCenter(i), this.projectionMatrix_ = e._ol_transform_.create(), this.offsetRotateMatrix_ = e._ol_transform_.create(), this.offsetScaleMatrix_ = e._ol_transform_.create(), this.tmpMat4_ = Ut(), this.indices = [], this.indicesBuffer = null, this.startIndices = [], this.startIndicesFeature = [], this.vertices = [], this.verticesBuffer = null, this.lineStringReplay = void 0; }; e._ol_.inherits(Wt, ct), Wt.prototype.getDeleteResourcesFunction = function (t) { }, Wt.prototype.finish = function (t) { }, Wt.prototype.setUpProgram = function (t, e, i, o) { }, Wt.prototype.shutDownProgram = function (t, e) { }, Wt.prototype.drawReplay = function (t, e, i, o) { }, Wt.prototype.drawHitDetectionReplayOneByOne = function (t, e, i, o, n) { }, Wt.prototype.drawHitDetectionReplay = function (t, e, i, o, n, r) { return n ? this.drawHitDetectionReplayOneByOne(t, e, i, o, r) : this.drawHitDetectionReplayAll(t, e, i, o); }, Wt.prototype.drawHitDetectionReplayAll = function (t, e, i, o) { return t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawReplay(t, e, i, !0), o(null) || void 0; }, Wt.prototype.replay = function (t, i, o, n, r, s, a, l, _, h, c) { var u, d, p, f, g, v, y, m, x = t.getGL(); this.lineStringReplay && (u = x.isEnabled(x.STENCIL_TEST), d = x.getParameter(x.STENCIL_FUNC), p = x.getParameter(x.STENCIL_VALUE_MASK), f = x.getParameter(x.STENCIL_REF), g = x.getParameter(x.STENCIL_WRITEMASK), v = x.getParameter(x.STENCIL_FAIL), y = x.getParameter(x.STENCIL_PASS_DEPTH_PASS), m = x.getParameter(x.STENCIL_PASS_DEPTH_FAIL), x.enable(x.STENCIL_TEST), x.clear(x.STENCIL_BUFFER_BIT), x.stencilMask(255), x.stencilFunc(x.ALWAYS, 1, 255), x.stencilOp(x.KEEP, x.KEEP, x.REPLACE), this.lineStringReplay.replay(t, i, o, n, r, s, a, l, _, h, c), x.stencilMask(0), x.stencilFunc(x.NOTEQUAL, 1, 255)), t.bindBuffer(e._ol_webgl_.ARRAY_BUFFER, this.verticesBuffer), t.bindBuffer(e._ol_webgl_.ELEMENT_ARRAY_BUFFER, this.indicesBuffer); var E = this.setUpProgram(x, t, r, s), T = e._ol_transform_.reset(this.projectionMatrix_); e._ol_transform_.scale(T, 2 / (o * r[0]), 2 / (o * r[1])), e._ol_transform_.rotate(T, -n), e._ol_transform_.translate(T, -(i[0] - this.origin[0]), -(i[1] - this.origin[1])); var C = e._ol_transform_.reset(this.offsetScaleMatrix_); e._ol_transform_.scale(C, 2 / r[0], 2 / r[1]); var R, S = e._ol_transform_.reset(this.offsetRotateMatrix_); return 0 !== n && e._ol_transform_.rotate(S, -n), x.uniformMatrix4fv(E.u_projectionMatrix, !1, Bt(this.tmpMat4_, T)), x.uniformMatrix4fv(E.u_offsetScaleMatrix, !1, Bt(this.tmpMat4_, C)), x.uniformMatrix4fv(E.u_offsetRotateMatrix, !1, Bt(this.tmpMat4_, S)), x.uniform1f(E.u_opacity, a), void 0 === _ ? this.drawReplay(x, t, l, !1) : R = this.drawHitDetectionReplay(x, t, l, _, h, c), this.shutDownProgram(x, E), this.lineStringReplay && (u || x.disable(x.STENCIL_TEST), x.clear(x.STENCIL_BUFFER_BIT), x.stencilFunc(d, f, p), x.stencilMask(g), x.stencilOp(v, m, y)), R; }, Wt.prototype.drawElements = function (t, i, o, n) { var r = i.hasOESElementIndexUint ? e._ol_webgl_.UNSIGNED_INT : e._ol_webgl_.UNSIGNED_SHORT, s = n - o, a = o * (i.hasOESElementIndexUint ? 4 : 2); t.drawElements(e._ol_webgl_.TRIANGLES, s, r, a); }; var jt = { defaultFont: "10px sans-serif", defaultFillStyle: [0, 0, 0, 1], defaultLineCap: "round", defaultLineDash: [], defaultLineDashOffset: 0, defaultLineJoin: "round", defaultMiterLimit: 10, defaultStrokeStyle: [0, 0, 0, 1], defaultTextAlign: .5, defaultTextBaseline: .5, defaultLineWidth: 1, triangleIsCounterClockwise: function (t, e, i, o, n, r) { var s = (i - t) * (r - e) - (n - t) * (o - e); return s <= jt.EPSILON && s >= -jt.EPSILON ? void 0 : s > 0; } }; jt.EPSILON = Number.EPSILON || 2.220446049250313e-16; var Vt = function (t, e) { this.arr_ = void 0 !== t ? t : [], this.usage_ = void 0 !== e ? e : Vt.Usage_.STATIC_DRAW; }; Vt.prototype.getArray = function () { return this.arr_; }, Vt.prototype.getUsage = function () { return this.usage_; }, Vt.Usage_ = { STATIC_DRAW: e._ol_webgl_.STATIC_DRAW, STREAM_DRAW: e._ol_webgl_.STREAM_DRAW, DYNAMIC_DRAW: e._ol_webgl_.DYNAMIC_DRAW }; var Xt = function (t, e) { Wt.call(this, t, e), this.defaultLocations_ = null, this.styles_ = [], this.styleIndices_ = [], this.radius_ = 0, this.state_ = { fillColor: null, strokeColor: null, lineDash: null, lineDashOffset: void 0, lineWidth: void 0, changed: !1 }; }; e._ol_.inherits(Xt, Wt), Xt.prototype.drawCoordinates_ = function (t, e, i, o) { var n, r, s = this.vertices.length, a = this.indices.length, l = s / 4; for (n = e, r = i; n < r; n += o)
    this.vertices[s++] = t[n], this.vertices[s++] = t[n + 1], this.vertices[s++] = 0, this.vertices[s++] = this.radius_, this.vertices[s++] = t[n], this.vertices[s++] = t[n + 1], this.vertices[s++] = 1, this.vertices[s++] = this.radius_, this.vertices[s++] = t[n], this.vertices[s++] = t[n + 1], this.vertices[s++] = 2, this.vertices[s++] = this.radius_, this.vertices[s++] = t[n], this.vertices[s++] = t[n + 1], this.vertices[s++] = 3, this.vertices[s++] = this.radius_, this.indices[a++] = l, this.indices[a++] = l + 1, this.indices[a++] = l + 2, this.indices[a++] = l + 2, this.indices[a++] = l + 3, this.indices[a++] = l, l += 4; }, Xt.prototype.drawCircle = function (t, i) { var o = t.getRadius(), n = t.getStride(); if (o) {
    this.startIndices.push(this.indices.length), this.startIndicesFeature.push(i), this.state_.changed && (this.styleIndices_.push(this.indices.length), this.state_.changed = !1), this.radius_ = o;
    var r = t.getFlatCoordinates();
    r = e._ol_geom_flat_transform_.translate(r, 0, 2, n, -this.origin[0], -this.origin[1]), this.drawCoordinates_(r, 0, 2, n);
}
else if (this.state_.changed && (this.styles_.pop(), this.styles_.length)) {
    var s = this.styles_[this.styles_.length - 1];
    this.state_.fillColor = s[0], this.state_.strokeColor = s[1], this.state_.lineWidth = s[2], this.state_.changed = !1;
} }, Xt.prototype.finish = function (t) { this.verticesBuffer = new Vt(this.vertices), this.indicesBuffer = new Vt(this.indices), this.startIndices.push(this.indices.length), 0 === this.styleIndices_.length && this.styles_.length > 0 && (this.styles_ = []), this.vertices = null, this.indices = null; }, Xt.prototype.getDeleteResourcesFunction = function (t) { var e = this.verticesBuffer, i = this.indicesBuffer; return function () { t.deleteBuffer(e), t.deleteBuffer(i); }; }, Xt.prototype.setUpProgram = function (t, i, o, n) { var r, s; r = Nt.fragment, s = Nt.vertex; var a, l = i.getProgram(r, s); return this.defaultLocations_ ? a = this.defaultLocations_ : (a = new function (t, i) { this.u_projectionMatrix = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_projectionMatrix" : "h"), this.u_offsetScaleMatrix = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_offsetScaleMatrix" : "i"), this.u_offsetRotateMatrix = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_offsetRotateMatrix" : "j"), this.u_lineWidth = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_lineWidth" : "k"), this.u_pixelRatio = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_pixelRatio" : "l"), this.u_opacity = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_opacity" : "m"), this.u_fillColor = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_fillColor" : "n"), this.u_strokeColor = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_strokeColor" : "o"), this.u_size = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_size" : "p"), this.a_position = t.getAttribLocation(i, e._ol_.DEBUG_WEBGL ? "a_position" : "e"), this.a_instruction = t.getAttribLocation(i, e._ol_.DEBUG_WEBGL ? "a_instruction" : "f"), this.a_radius = t.getAttribLocation(i, e._ol_.DEBUG_WEBGL ? "a_radius" : "g"); }(t, l), this.defaultLocations_ = a), i.useProgram(l), t.enableVertexAttribArray(a.a_position), t.vertexAttribPointer(a.a_position, 2, e._ol_webgl_.FLOAT, !1, 16, 0), t.enableVertexAttribArray(a.a_instruction), t.vertexAttribPointer(a.a_instruction, 1, e._ol_webgl_.FLOAT, !1, 16, 8), t.enableVertexAttribArray(a.a_radius), t.vertexAttribPointer(a.a_radius, 1, e._ol_webgl_.FLOAT, !1, 16, 12), t.uniform2fv(a.u_size, o), t.uniform1f(a.u_pixelRatio, n), a; }, Xt.prototype.shutDownProgram = function (t, e) { t.disableVertexAttribArray(e.a_position), t.disableVertexAttribArray(e.a_instruction), t.disableVertexAttribArray(e.a_radius); }, Xt.prototype.drawReplay = function (t, i, o, n) { var r, s, a, l; if (e._ol_obj_.isEmpty(o))
    for (a = this.startIndices[this.startIndices.length - 1], r = this.styleIndices_.length - 1; r >= 0; --r)
        s = this.styleIndices_[r], l = this.styles_[r], this.setFillStyle_(t, l[0]), this.setStrokeStyle_(t, l[1], l[2]), this.drawElements(t, i, s, a), a = s;
else
    this.drawReplaySkipping_(t, i, o); }, Xt.prototype.drawHitDetectionReplayOneByOne = function (t, i, o, n, r) { var s, a, l, _, h, c, u; for (u = this.startIndices.length - 2, l = this.startIndices[u + 1], s = this.styleIndices_.length - 1; s >= 0; --s)
    for (_ = this.styles_[s], this.setFillStyle_(t, _[0]), this.setStrokeStyle_(t, _[1], _[2]), h = this.styleIndices_[s]; u >= 0 && this.startIndices[u] >= h;) {
        if (a = this.startIndices[u], c = this.startIndicesFeature[u], void 0 === o[e._ol_.getUid(c).toString()] && c.getGeometry() && (void 0 === r || e._ol_extent_.intersects(r, c.getGeometry().getExtent()))) {
            t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawElements(t, i, a, l);
            var d = n(c);
            if (d)
                return d;
        }
        u--, l = a;
    } }, Xt.prototype.drawReplaySkipping_ = function (t, i, o) { var n, r, s, a, l, _, h, c; for (h = this.startIndices.length - 2, s = r = this.startIndices[h + 1], n = this.styleIndices_.length - 1; n >= 0; --n) {
    for (a = this.styles_[n], this.setFillStyle_(t, a[0]), this.setStrokeStyle_(t, a[1], a[2]), l = this.styleIndices_[n]; h >= 0 && this.startIndices[h] >= l;)
        c = this.startIndices[h], _ = this.startIndicesFeature[h], o[e._ol_.getUid(_).toString()] && (r !== s && this.drawElements(t, i, r, s), s = c), h--, r = c;
    r !== s && this.drawElements(t, i, r, s), r = s = l;
} }, Xt.prototype.setFillStyle_ = function (t, e) { t.uniform4fv(this.defaultLocations_.u_fillColor, e); }, Xt.prototype.setStrokeStyle_ = function (t, e, i) { t.uniform4fv(this.defaultLocations_.u_strokeColor, e), t.uniform1f(this.defaultLocations_.u_lineWidth, i); }, Xt.prototype.setFillStrokeStyle = function (t, i) { var o, n; if (i) {
    var r = i.getLineDash();
    this.state_.lineDash = r || jt.defaultLineDash;
    var s = i.getLineDashOffset();
    this.state_.lineDashOffset = s || jt.defaultLineDashOffset, o = (o = i.getColor()) instanceof CanvasGradient || o instanceof CanvasPattern ? jt.defaultStrokeStyle : e._ol_color_.asArray(o).map(function (t, e) { return 3 != e ? t / 255 : t; }) || jt.defaultStrokeStyle, n = void 0 !== (n = i.getWidth()) ? n : jt.defaultLineWidth;
}
else
    o = [0, 0, 0, 0], n = 0; var a = t ? t.getColor() : [0, 0, 0, 0]; a = a instanceof CanvasGradient || a instanceof CanvasPattern ? jt.defaultFillStyle : e._ol_color_.asArray(a).map(function (t, e) { return 3 != e ? t / 255 : t; }) || jt.defaultFillStyle, this.state_.strokeColor && e._ol_array_.equals(this.state_.strokeColor, o) && this.state_.fillColor && e._ol_array_.equals(this.state_.fillColor, a) && this.state_.lineWidth === n || (this.state_.changed = !0, this.state_.fillColor = a, this.state_.strokeColor = o, this.state_.lineWidth = n, this.styles_.push([a, o, n])); }; var Kt = {}; Kt.fragment = new Gt(e._ol_.DEBUG_WEBGL ? "precision mediump float;\nvarying vec2 v_texCoord;\nvarying float v_opacity;\n\nuniform float u_opacity;\nuniform sampler2D u_image;\n\nvoid main(void) {\n  vec4 texColor = texture2D(u_image, v_texCoord);\n  gl_FragColor.rgb = texColor.rgb;\n  float alpha = texColor.a * v_opacity * u_opacity;\n  if (alpha == 0.0) {\n    discard;\n  }\n  gl_FragColor.a = alpha;\n}\n" : "precision mediump float;varying vec2 a;varying float b;uniform float k;uniform sampler2D l;void main(void){vec4 texColor=texture2D(l,a);gl_FragColor.rgb=texColor.rgb;float alpha=texColor.a*b*k;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"), Kt.vertex = new kt(e._ol_.DEBUG_WEBGL ? "varying vec2 v_texCoord;\nvarying float v_opacity;\n\nattribute vec2 a_position;\nattribute vec2 a_texCoord;\nattribute vec2 a_offsets;\nattribute float a_opacity;\nattribute float a_rotateWithView;\n\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_offsetScaleMatrix;\nuniform mat4 u_offsetRotateMatrix;\n\nvoid main(void) {\n  mat4 offsetMatrix = u_offsetScaleMatrix;\n  if (a_rotateWithView == 1.0) {\n    offsetMatrix = u_offsetScaleMatrix * u_offsetRotateMatrix;\n  }\n  vec4 offsets = offsetMatrix * vec4(a_offsets, 0.0, 0.0);\n  gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0) + offsets;\n  v_texCoord = a_texCoord;\n  v_opacity = a_opacity;\n}\n\n\n" : "varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.0,0.0);gl_Position=h*vec4(c,0.0,1.0)+offsets;a=d;b=f;}"); var zt = function (t, i) { this.canvas_ = t, this.gl_ = i, this.bufferCache_ = {}, this.shaderCache_ = {}, this.programCache_ = {}, this.currentProgram_ = null, this.hitDetectionFramebuffer_ = null, this.hitDetectionTexture_ = null, this.hitDetectionRenderbuffer_ = null, this.hasOESElementIndexUint = e._ol_array_.includes(e._ol_.WEBGL_EXTENSIONS, "OES_element_index_uint"), this.hasOESElementIndexUint && i.getExtension("OES_element_index_uint"), e._ol_events_.listen(this.canvas_, "webglcontextlost", this.handleWebGLContextLost, this), e._ol_events_.listen(this.canvas_, "webglcontextrestored", this.handleWebGLContextRestored, this); }; e._ol_.inherits(zt, e._ol_Disposable_), zt.prototype.bindBuffer = function (t, i) { var o = this.getGL(), n = i.getArray(), r = String(e._ol_.getUid(i)); if (r in this.bufferCache_) {
    var s = this.bufferCache_[r];
    o.bindBuffer(t, s.buffer);
}
else {
    var a, l = o.createBuffer();
    o.bindBuffer(t, l), t == e._ol_webgl_.ARRAY_BUFFER ? a = new Float32Array(n) : t == e._ol_webgl_.ELEMENT_ARRAY_BUFFER && (a = this.hasOESElementIndexUint ? new Uint32Array(n) : new Uint16Array(n)), o.bufferData(t, a, i.getUsage()), this.bufferCache_[r] = { buf: i, buffer: l };
} }, zt.prototype.deleteBuffer = function (t) { var i = this.getGL(), o = String(e._ol_.getUid(t)), n = this.bufferCache_[o]; i.isContextLost() || i.deleteBuffer(n.buffer), delete this.bufferCache_[o]; }, zt.prototype.disposeInternal = function () { e._ol_events_.unlistenAll(this.canvas_); var t = this.getGL(); if (!t.isContextLost()) {
    var i;
    for (i in this.bufferCache_)
        t.deleteBuffer(this.bufferCache_[i].buffer);
    for (i in this.programCache_)
        t.deleteProgram(this.programCache_[i]);
    for (i in this.shaderCache_)
        t.deleteShader(this.shaderCache_[i]);
    t.deleteFramebuffer(this.hitDetectionFramebuffer_), t.deleteRenderbuffer(this.hitDetectionRenderbuffer_), t.deleteTexture(this.hitDetectionTexture_);
} }, zt.prototype.getCanvas = function () { return this.canvas_; }, zt.prototype.getGL = function () { return this.gl_; }, zt.prototype.getHitDetectionFramebuffer = function () { return this.hitDetectionFramebuffer_ || this.initHitDetectionFramebuffer_(), this.hitDetectionFramebuffer_; }, zt.prototype.getShader = function (t) { var i = String(e._ol_.getUid(t)); if (i in this.shaderCache_)
    return this.shaderCache_[i]; var o = this.getGL(), n = o.createShader(t.getType()); return o.shaderSource(n, t.getSource()), o.compileShader(n), this.shaderCache_[i] = n, n; }, zt.prototype.getProgram = function (t, i) { var o = e._ol_.getUid(t) + "/" + e._ol_.getUid(i); if (o in this.programCache_)
    return this.programCache_[o]; var n = this.getGL(), r = n.createProgram(); return n.attachShader(r, this.getShader(t)), n.attachShader(r, this.getShader(i)), n.linkProgram(r), this.programCache_[o] = r, r; }, zt.prototype.handleWebGLContextLost = function () { e._ol_obj_.clear(this.bufferCache_), e._ol_obj_.clear(this.shaderCache_), e._ol_obj_.clear(this.programCache_), this.currentProgram_ = null, this.hitDetectionFramebuffer_ = null, this.hitDetectionTexture_ = null, this.hitDetectionRenderbuffer_ = null; }, zt.prototype.handleWebGLContextRestored = function () { }, zt.prototype.initHitDetectionFramebuffer_ = function () { var t = this.gl_, e = t.createFramebuffer(); t.bindFramebuffer(t.FRAMEBUFFER, e); var i = zt.createEmptyTexture(t, 1, 1), o = t.createRenderbuffer(); t.bindRenderbuffer(t.RENDERBUFFER, o), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, 1, 1), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, i, 0), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, o), t.bindTexture(t.TEXTURE_2D, null), t.bindRenderbuffer(t.RENDERBUFFER, null), t.bindFramebuffer(t.FRAMEBUFFER, null), this.hitDetectionFramebuffer_ = e, this.hitDetectionTexture_ = i, this.hitDetectionRenderbuffer_ = o; }, zt.prototype.useProgram = function (t) { return t != this.currentProgram_ && (this.getGL().useProgram(t), this.currentProgram_ = t, !0); }, zt.createTexture_ = function (t, i, o) { var n = t.createTexture(); return t.bindTexture(t.TEXTURE_2D, n), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), void 0 !== i && t.texParameteri(e._ol_webgl_.TEXTURE_2D, e._ol_webgl_.TEXTURE_WRAP_S, i), void 0 !== o && t.texParameteri(e._ol_webgl_.TEXTURE_2D, e._ol_webgl_.TEXTURE_WRAP_T, o), n; }, zt.createEmptyTexture = function (t, e, i, o, n) { var r = zt.createTexture_(t, o, n); return t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, e, i, 0, t.RGBA, t.UNSIGNED_BYTE, null), r; }, zt.createTexture = function (t, e, i, o) { var n = zt.createTexture_(t, i, o); return t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e), n; }; var Ht = function (t, e) { Wt.call(this, t, e), this.anchorX = void 0, this.anchorY = void 0, this.groupIndices = [], this.hitDetectionGroupIndices = [], this.height = void 0, this.imageHeight = void 0, this.imageWidth = void 0, this.defaultLocations = null, this.opacity = void 0, this.originX = void 0, this.originY = void 0, this.rotateWithView = void 0, this.rotation = void 0, this.scale = void 0, this.width = void 0; }; e._ol_.inherits(Ht, Wt), Ht.prototype.getDeleteResourcesFunction = function (t) { var e = this.verticesBuffer, i = this.indicesBuffer, o = this.getTextures(!0), n = t.getGL(); return function () { var r, s; if (!n.isContextLost())
    for (r = 0, s = o.length; r < s; ++r)
        n.deleteTexture(o[r]); t.deleteBuffer(e), t.deleteBuffer(i); }; }, Ht.prototype.drawCoordinates = function (t, e, i, o) { var n, r, s, a, l, _, h = this.anchorX, c = this.anchorY, u = this.height, d = this.imageHeight, p = this.imageWidth, f = this.opacity, g = this.originX, v = this.originY, y = this.rotateWithView ? 1 : 0, m = -this.rotation, x = this.scale, E = this.width, T = Math.cos(m), C = Math.sin(m), R = this.indices.length, S = this.vertices.length; for (n = e; n < i; n += o)
    l = t[n] - this.origin[0], _ = t[n + 1] - this.origin[1], r = S / 8, s = -x * h, a = -x * (u - c), this.vertices[S++] = l, this.vertices[S++] = _, this.vertices[S++] = s * T - a * C, this.vertices[S++] = s * C + a * T, this.vertices[S++] = g / p, this.vertices[S++] = (v + u) / d, this.vertices[S++] = f, this.vertices[S++] = y, s = x * (E - h), a = -x * (u - c), this.vertices[S++] = l, this.vertices[S++] = _, this.vertices[S++] = s * T - a * C, this.vertices[S++] = s * C + a * T, this.vertices[S++] = (g + E) / p, this.vertices[S++] = (v + u) / d, this.vertices[S++] = f, this.vertices[S++] = y, s = x * (E - h), a = x * c, this.vertices[S++] = l, this.vertices[S++] = _, this.vertices[S++] = s * T - a * C, this.vertices[S++] = s * C + a * T, this.vertices[S++] = (g + E) / p, this.vertices[S++] = v / d, this.vertices[S++] = f, this.vertices[S++] = y, s = -x * h, a = x * c, this.vertices[S++] = l, this.vertices[S++] = _, this.vertices[S++] = s * T - a * C, this.vertices[S++] = s * C + a * T, this.vertices[S++] = g / p, this.vertices[S++] = v / d, this.vertices[S++] = f, this.vertices[S++] = y, this.indices[R++] = r, this.indices[R++] = r + 1, this.indices[R++] = r + 2, this.indices[R++] = r, this.indices[R++] = r + 2, this.indices[R++] = r + 3; return S; }, Ht.prototype.createTextures = function (t, i, o, n) { var r, s, a, l, _ = i.length; for (l = 0; l < _; ++l)
    s = i[l], (a = e._ol_.getUid(s).toString()) in o ? r = o[a] : (r = zt.createTexture(n, s, e._ol_webgl_.CLAMP_TO_EDGE, e._ol_webgl_.CLAMP_TO_EDGE), o[a] = r), t[l] = r; }, Ht.prototype.setUpProgram = function (t, i, o, n) { var r, s = Kt.fragment, a = Kt.vertex, l = i.getProgram(s, a); return this.defaultLocations ? r = this.defaultLocations : (r = new function (t, i) { this.u_projectionMatrix = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_projectionMatrix" : "h"), this.u_offsetScaleMatrix = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_offsetScaleMatrix" : "i"), this.u_offsetRotateMatrix = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_offsetRotateMatrix" : "j"), this.u_opacity = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_opacity" : "k"), this.u_image = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_image" : "l"), this.a_position = t.getAttribLocation(i, e._ol_.DEBUG_WEBGL ? "a_position" : "c"), this.a_texCoord = t.getAttribLocation(i, e._ol_.DEBUG_WEBGL ? "a_texCoord" : "d"), this.a_offsets = t.getAttribLocation(i, e._ol_.DEBUG_WEBGL ? "a_offsets" : "e"), this.a_opacity = t.getAttribLocation(i, e._ol_.DEBUG_WEBGL ? "a_opacity" : "f"), this.a_rotateWithView = t.getAttribLocation(i, e._ol_.DEBUG_WEBGL ? "a_rotateWithView" : "g"); }(t, l), this.defaultLocations = r), i.useProgram(l), t.enableVertexAttribArray(r.a_position), t.vertexAttribPointer(r.a_position, 2, e._ol_webgl_.FLOAT, !1, 32, 0), t.enableVertexAttribArray(r.a_offsets), t.vertexAttribPointer(r.a_offsets, 2, e._ol_webgl_.FLOAT, !1, 32, 8), t.enableVertexAttribArray(r.a_texCoord), t.vertexAttribPointer(r.a_texCoord, 2, e._ol_webgl_.FLOAT, !1, 32, 16), t.enableVertexAttribArray(r.a_opacity), t.vertexAttribPointer(r.a_opacity, 1, e._ol_webgl_.FLOAT, !1, 32, 24), t.enableVertexAttribArray(r.a_rotateWithView), t.vertexAttribPointer(r.a_rotateWithView, 1, e._ol_webgl_.FLOAT, !1, 32, 28), r; }, Ht.prototype.shutDownProgram = function (t, e) { t.disableVertexAttribArray(e.a_position), t.disableVertexAttribArray(e.a_offsets), t.disableVertexAttribArray(e.a_texCoord), t.disableVertexAttribArray(e.a_opacity), t.disableVertexAttribArray(e.a_rotateWithView); }, Ht.prototype.drawReplay = function (t, i, o, n) { var r, s, a, l = n ? this.getHitDetectionTextures() : this.getTextures(), _ = n ? this.hitDetectionGroupIndices : this.groupIndices; if (e._ol_obj_.isEmpty(o))
    for (r = 0, s = l.length, a = 0; r < s; ++r) {
        t.bindTexture(e._ol_webgl_.TEXTURE_2D, l[r]);
        var h = _[r];
        this.drawElements(t, i, a, h), a = h;
    }
else
    this.drawReplaySkipping(t, i, o, l, _); }, Ht.prototype.drawReplaySkipping = function (t, i, o, n, r) { var s, a, l = 0; for (s = 0, a = n.length; s < a; ++s) {
    t.bindTexture(e._ol_webgl_.TEXTURE_2D, n[s]);
    for (var _ = s > 0 ? r[s - 1] : 0, h = r[s], c = _, u = _; l < this.startIndices.length && this.startIndices[l] <= h;) {
        var d = this.startIndicesFeature[l];
        void 0 !== o[e._ol_.getUid(d).toString()] ? (c !== u && this.drawElements(t, i, c, u), u = c = l === this.startIndices.length - 1 ? h : this.startIndices[l + 1]) : u = l === this.startIndices.length - 1 ? h : this.startIndices[l + 1], l++;
    }
    c !== u && this.drawElements(t, i, c, u);
} }, Ht.prototype.drawHitDetectionReplayOneByOne = function (t, i, o, n, r) { var s, a, l, _, h, c = this.startIndices.length - 1, u = this.getHitDetectionTextures(); for (s = u.length - 1; s >= 0; --s)
    for (t.bindTexture(e._ol_webgl_.TEXTURE_2D, u[s]), a = s > 0 ? this.hitDetectionGroupIndices[s - 1] : 0, _ = this.hitDetectionGroupIndices[s]; c >= 0 && this.startIndices[c] >= a;) {
        if (l = this.startIndices[c], h = this.startIndicesFeature[c], void 0 === o[e._ol_.getUid(h).toString()] && h.getGeometry() && (void 0 === r || e._ol_extent_.intersects(r, h.getGeometry().getExtent()))) {
            t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawElements(t, i, l, _);
            var d = n(h);
            if (d)
                return d;
        }
        _ = l, c--;
    } }, Ht.prototype.finish = function (t) { this.anchorX = void 0, this.anchorY = void 0, this.height = void 0, this.imageHeight = void 0, this.imageWidth = void 0, this.indices = null, this.opacity = void 0, this.originX = void 0, this.originY = void 0, this.rotateWithView = void 0, this.rotation = void 0, this.scale = void 0, this.vertices = null, this.width = void 0; }, Ht.prototype.getTextures = function (t) { }, Ht.prototype.getHitDetectionTextures = function () { }; var Yt = function (t, e) { Ht.call(this, t, e), this.images_ = [], this.hitDetectionImages_ = [], this.textures_ = [], this.hitDetectionTextures_ = []; }; e._ol_.inherits(Yt, Ht), Yt.prototype.drawMultiPoint = function (t, e) { this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e); var i = t.getFlatCoordinates(), o = t.getStride(); this.drawCoordinates(i, 0, i.length, o); }, Yt.prototype.drawPoint = function (t, e) { this.startIndices.push(this.indices.length), this.startIndicesFeature.push(e); var i = t.getFlatCoordinates(), o = t.getStride(); this.drawCoordinates(i, 0, i.length, o); }, Yt.prototype.finish = function (t) { var e = t.getGL(); this.groupIndices.push(this.indices.length), this.hitDetectionGroupIndices.push(this.indices.length), this.verticesBuffer = new Vt(this.vertices); var i = this.indices; this.indicesBuffer = new Vt(i); var o = {}; this.createTextures(this.textures_, this.images_, o, e), this.createTextures(this.hitDetectionTextures_, this.hitDetectionImages_, o, e), this.images_ = null, this.hitDetectionImages_ = null, Ht.prototype.finish.call(this, t); }, Yt.prototype.setImageStyle = function (t) { var i, o = t.getAnchor(), n = t.getImage(1), r = t.getImageSize(), s = t.getHitDetectionImage(1), a = t.getOpacity(), l = t.getOrigin(), _ = t.getRotateWithView(), h = t.getRotation(), c = t.getSize(), u = t.getScale(); 0 === this.images_.length ? this.images_.push(n) : (i = this.images_[this.images_.length - 1], e._ol_.getUid(i) != e._ol_.getUid(n) && (this.groupIndices.push(this.indices.length), this.images_.push(n))), 0 === this.hitDetectionImages_.length ? this.hitDetectionImages_.push(s) : (i = this.hitDetectionImages_[this.hitDetectionImages_.length - 1], e._ol_.getUid(i) != e._ol_.getUid(s) && (this.hitDetectionGroupIndices.push(this.indices.length), this.hitDetectionImages_.push(s))), this.anchorX = o[0], this.anchorY = o[1], this.height = c[1], this.imageHeight = r[1], this.imageWidth = r[0], this.opacity = a, this.originX = l[0], this.originY = l[1], this.rotation = h, this.rotateWithView = _, this.scale = u, this.width = c[0]; }, Yt.prototype.getTextures = function (t) { return t ? this.textures_.concat(this.hitDetectionTextures_) : this.textures_; }, Yt.prototype.getHitDetectionTextures = function () { return this.hitDetectionTextures_; }; var qt = function (t, e, i, o) { var n = i - o; return t[e] === t[n] && t[e + 1] === t[n + 1] && (i - e) / o > 3 && !!R.linearRing(t, e, i, o); }, Zt = {}; Zt.fragment = new Gt(e._ol_.DEBUG_WEBGL ? "precision mediump float;\nvarying float v_round;\nvarying vec2 v_roundVertex;\nvarying float v_halfWidth;\n\n\n\nuniform float u_opacity;\nuniform vec4 u_color;\nuniform vec2 u_size;\nuniform float u_pixelRatio;\n\nvoid main(void) {\n  if (v_round > 0.0) {\n    vec2 windowCoords = vec2((v_roundVertex.x + 1.0) / 2.0 * u_size.x * u_pixelRatio,\n        (v_roundVertex.y + 1.0) / 2.0 * u_size.y * u_pixelRatio);\n    if (length(windowCoords - gl_FragCoord.xy) > v_halfWidth * u_pixelRatio) {\n      discard;\n    }\n  }\n  gl_FragColor = u_color;\n  float alpha = u_color.a * u_opacity;\n  if (alpha == 0.0) {\n    discard;\n  }\n  gl_FragColor.a = alpha;\n}\n" : "precision mediump float;varying float a;varying vec2 aVertex;varying float c;uniform float m;uniform vec4 n;uniform vec2 o;uniform float p;void main(void){if(a>0.0){vec2 windowCoords=vec2((aVertex.x+1.0)/2.0*o.x*p,(aVertex.y+1.0)/2.0*o.y*p);if(length(windowCoords-gl_FragCoord.xy)>c*p){discard;}} gl_FragColor=n;float alpha=n.a*m;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"), Zt.vertex = new kt(e._ol_.DEBUG_WEBGL ? "varying float v_round;\nvarying vec2 v_roundVertex;\nvarying float v_halfWidth;\n\n\nattribute vec2 a_lastPos;\nattribute vec2 a_position;\nattribute vec2 a_nextPos;\nattribute float a_direction;\n\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_offsetScaleMatrix;\nuniform mat4 u_offsetRotateMatrix;\nuniform float u_lineWidth;\nuniform float u_miterLimit;\n\nbool nearlyEquals(in float value, in float ref) {\n  float epsilon = 0.000000000001;\n  return value >= ref - epsilon && value <= ref + epsilon;\n}\n\nvoid alongNormal(out vec2 offset, in vec2 nextP, in float turnDir, in float direction) {\n  vec2 dirVect = nextP - a_position;\n  vec2 normal = normalize(vec2(-turnDir * dirVect.y, turnDir * dirVect.x));\n  offset = u_lineWidth / 2.0 * normal * direction;\n}\n\nvoid miterUp(out vec2 offset, out float round, in bool isRound, in float direction) {\n  float halfWidth = u_lineWidth / 2.0;\n  vec2 tangent = normalize(normalize(a_nextPos - a_position) + normalize(a_position - a_lastPos));\n  vec2 normal = vec2(-tangent.y, tangent.x);\n  vec2 dirVect = a_nextPos - a_position;\n  vec2 tmpNormal = normalize(vec2(-dirVect.y, dirVect.x));\n  float miterLength = abs(halfWidth / dot(normal, tmpNormal));\n  offset = normal * direction * miterLength;\n  round = 0.0;\n  if (isRound) {\n    round = 1.0;\n  } else if (miterLength > u_miterLimit + u_lineWidth) {\n    offset = halfWidth * tmpNormal * direction;\n  }\n}\n\nbool miterDown(out vec2 offset, in vec4 projPos, in mat4 offsetMatrix, in float direction) {\n  bool degenerate = false;\n  vec2 tangent = normalize(normalize(a_nextPos - a_position) + normalize(a_position - a_lastPos));\n  vec2 normal = vec2(-tangent.y, tangent.x);\n  vec2 dirVect = a_lastPos - a_position;\n  vec2 tmpNormal = normalize(vec2(-dirVect.y, dirVect.x));\n  vec2 longOffset, shortOffset, longVertex;\n  vec4 shortProjVertex;\n  float halfWidth = u_lineWidth / 2.0;\n  if (length(a_nextPos - a_position) > length(a_lastPos - a_position)) {\n    longOffset = tmpNormal * direction * halfWidth;\n    shortOffset = normalize(vec2(dirVect.y, -dirVect.x)) * direction * halfWidth;\n    longVertex = a_nextPos;\n    shortProjVertex = u_projectionMatrix * vec4(a_lastPos, 0.0, 1.0);\n  } else {\n    shortOffset = tmpNormal * direction * halfWidth;\n    longOffset = normalize(vec2(dirVect.y, -dirVect.x)) * direction * halfWidth;\n    longVertex = a_lastPos;\n    shortProjVertex = u_projectionMatrix * vec4(a_nextPos, 0.0, 1.0);\n  }\n  //Intersection algorithm based on theory by Paul Bourke (http://paulbourke.net/geometry/pointlineplane/).\n  vec4 p1 = u_projectionMatrix * vec4(longVertex, 0.0, 1.0) + offsetMatrix * vec4(longOffset, 0.0, 0.0);\n  vec4 p2 = projPos + offsetMatrix * vec4(longOffset, 0.0, 0.0);\n  vec4 p3 = shortProjVertex + offsetMatrix * vec4(-shortOffset, 0.0, 0.0);\n  vec4 p4 = shortProjVertex + offsetMatrix * vec4(shortOffset, 0.0, 0.0);\n  float denom = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);\n  float firstU = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denom;\n  float secondU = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denom;\n  float epsilon = 0.000000000001;\n  if (firstU > epsilon && firstU < 1.0 - epsilon && secondU > epsilon && secondU < 1.0 - epsilon) {\n    shortProjVertex.x = p1.x + firstU * (p2.x - p1.x);\n    shortProjVertex.y = p1.y + firstU * (p2.y - p1.y);\n    offset = shortProjVertex.xy;\n    degenerate = true;\n  } else {\n    float miterLength = abs(halfWidth / dot(normal, tmpNormal));\n    offset = normal * direction * miterLength;\n  }\n  return degenerate;\n}\n\nvoid squareCap(out vec2 offset, out float round, in bool isRound, in vec2 nextP,\n    in float turnDir, in float direction) {\n  round = 0.0;\n  vec2 dirVect = a_position - nextP;\n  vec2 firstNormal = normalize(dirVect);\n  vec2 secondNormal = vec2(turnDir * firstNormal.y * direction, -turnDir * firstNormal.x * direction);\n  vec2 hypotenuse = normalize(firstNormal - secondNormal);\n  vec2 normal = vec2(turnDir * hypotenuse.y * direction, -turnDir * hypotenuse.x * direction);\n  float length = sqrt(v_halfWidth * v_halfWidth * 2.0);\n  offset = normal * length;\n  if (isRound) {\n    round = 1.0;\n  }\n}\n\nvoid main(void) {\n  bool degenerate = false;\n  float direction = float(sign(a_direction));\n  mat4 offsetMatrix = u_offsetScaleMatrix * u_offsetRotateMatrix;\n  vec2 offset;\n  vec4 projPos = u_projectionMatrix * vec4(a_position, 0.0, 1.0);\n  bool round = nearlyEquals(mod(a_direction, 2.0), 0.0);\n\n  v_round = 0.0;\n  v_halfWidth = u_lineWidth / 2.0;\n  v_roundVertex = projPos.xy;\n\n  if (nearlyEquals(mod(a_direction, 3.0), 0.0) || nearlyEquals(mod(a_direction, 17.0), 0.0)) {\n    alongNormal(offset, a_nextPos, 1.0, direction);\n  } else if (nearlyEquals(mod(a_direction, 5.0), 0.0) || nearlyEquals(mod(a_direction, 13.0), 0.0)) {\n    alongNormal(offset, a_lastPos, -1.0, direction);\n  } else if (nearlyEquals(mod(a_direction, 23.0), 0.0)) {\n    miterUp(offset, v_round, round, direction);\n  } else if (nearlyEquals(mod(a_direction, 19.0), 0.0)) {\n    degenerate = miterDown(offset, projPos, offsetMatrix, direction);\n  } else if (nearlyEquals(mod(a_direction, 7.0), 0.0)) {\n    squareCap(offset, v_round, round, a_nextPos, 1.0, direction);\n  } else if (nearlyEquals(mod(a_direction, 11.0), 0.0)) {\n    squareCap(offset, v_round, round, a_lastPos, -1.0, direction);\n  }\n  if (!degenerate) {\n    vec4 offsets = offsetMatrix * vec4(offset, 0.0, 0.0);\n    gl_Position = projPos + offsets;\n  } else {\n    gl_Position = vec4(offset, 0.0, 1.0);\n  }\n}\n\n\n" : "varying float a;varying vec2 aVertex;varying float c;attribute vec2 d;attribute vec2 e;attribute vec2 f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;uniform float k;uniform float l;bool nearlyEquals(in float value,in float ref){float epsilon=0.000000000001;return value>=ref-epsilon&&value<=ref+epsilon;}void alongNormal(out vec2 offset,in vec2 nextP,in float turnDir,in float direction){vec2 dirVect=nextP-e;vec2 normal=normalize(vec2(-turnDir*dirVect.y,turnDir*dirVect.x));offset=k/2.0*normal*direction;}void miterUp(out vec2 offset,out float round,in bool isRound,in float direction){float halfWidth=k/2.0;vec2 tangent=normalize(normalize(f-e)+normalize(e-d));vec2 normal=vec2(-tangent.y,tangent.x);vec2 dirVect=f-e;vec2 tmpNormal=normalize(vec2(-dirVect.y,dirVect.x));float miterLength=abs(halfWidth/dot(normal,tmpNormal));offset=normal*direction*miterLength;round=0.0;if(isRound){round=1.0;}else if(miterLength>l+k){offset=halfWidth*tmpNormal*direction;}} bool miterDown(out vec2 offset,in vec4 projPos,in mat4 offsetMatrix,in float direction){bool degenerate=false;vec2 tangent=normalize(normalize(f-e)+normalize(e-d));vec2 normal=vec2(-tangent.y,tangent.x);vec2 dirVect=d-e;vec2 tmpNormal=normalize(vec2(-dirVect.y,dirVect.x));vec2 longOffset,shortOffset,longVertex;vec4 shortProjVertex;float halfWidth=k/2.0;if(length(f-e)>length(d-e)){longOffset=tmpNormal*direction*halfWidth;shortOffset=normalize(vec2(dirVect.y,-dirVect.x))*direction*halfWidth;longVertex=f;shortProjVertex=h*vec4(d,0.0,1.0);}else{shortOffset=tmpNormal*direction*halfWidth;longOffset=normalize(vec2(dirVect.y,-dirVect.x))*direction*halfWidth;longVertex=d;shortProjVertex=h*vec4(f,0.0,1.0);}vec4 p1=h*vec4(longVertex,0.0,1.0)+offsetMatrix*vec4(longOffset,0.0,0.0);vec4 p2=projPos+offsetMatrix*vec4(longOffset,0.0,0.0);vec4 p3=shortProjVertex+offsetMatrix*vec4(-shortOffset,0.0,0.0);vec4 p4=shortProjVertex+offsetMatrix*vec4(shortOffset,0.0,0.0);float denom=(p4.y-p3.y)*(p2.x-p1.x)-(p4.x-p3.x)*(p2.y-p1.y);float firstU=((p4.x-p3.x)*(p1.y-p3.y)-(p4.y-p3.y)*(p1.x-p3.x))/denom;float secondU=((p2.x-p1.x)*(p1.y-p3.y)-(p2.y-p1.y)*(p1.x-p3.x))/denom;float epsilon=0.000000000001;if(firstU>epsilon&&firstU<1.0-epsilon&&secondU>epsilon&&secondU<1.0-epsilon){shortProjVertex.x=p1.x+firstU*(p2.x-p1.x);shortProjVertex.y=p1.y+firstU*(p2.y-p1.y);offset=shortProjVertex.xy;degenerate=true;}else{float miterLength=abs(halfWidth/dot(normal,tmpNormal));offset=normal*direction*miterLength;}return degenerate;}void squareCap(out vec2 offset,out float round,in bool isRound,in vec2 nextP,in float turnDir,in float direction){round=0.0;vec2 dirVect=e-nextP;vec2 firstNormal=normalize(dirVect);vec2 secondNormal=vec2(turnDir*firstNormal.y*direction,-turnDir*firstNormal.x*direction);vec2 hypotenuse=normalize(firstNormal-secondNormal);vec2 normal=vec2(turnDir*hypotenuse.y*direction,-turnDir*hypotenuse.x*direction);float length=sqrt(c*c*2.0);offset=normal*length;if(isRound){round=1.0;}} void main(void){bool degenerate=false;float direction=float(sign(g));mat4 offsetMatrix=i*j;vec2 offset;vec4 projPos=h*vec4(e,0.0,1.0);bool round=nearlyEquals(mod(g,2.0),0.0);a=0.0;c=k/2.0;aVertex=projPos.xy;if(nearlyEquals(mod(g,3.0),0.0)||nearlyEquals(mod(g,17.0),0.0)){alongNormal(offset,f,1.0,direction);}else if(nearlyEquals(mod(g,5.0),0.0)||nearlyEquals(mod(g,13.0),0.0)){alongNormal(offset,d,-1.0,direction);}else if(nearlyEquals(mod(g,23.0),0.0)){miterUp(offset,a,round,direction);}else if(nearlyEquals(mod(g,19.0),0.0)){degenerate=miterDown(offset,projPos,offsetMatrix,direction);}else if(nearlyEquals(mod(g,7.0),0.0)){squareCap(offset,a,round,f,1.0,direction);}else if(nearlyEquals(mod(g,11.0),0.0)){squareCap(offset,a,round,d,-1.0,direction);}if(!degenerate){vec4 offsets=offsetMatrix*vec4(offset,0.0,0.0);gl_Position=projPos+offsets;}else{gl_Position=vec4(offset,0.0,1.0);}}"); var Jt = function (t, e) { Wt.call(this, t, e), this.defaultLocations_ = null, this.styles_ = [], this.styleIndices_ = [], this.state_ = { strokeColor: null, lineCap: void 0, lineDash: null, lineDashOffset: void 0, lineJoin: void 0, lineWidth: void 0, miterLimit: void 0, changed: !1 }; }; e._ol_.inherits(Jt, Wt), Jt.prototype.drawCoordinates_ = function (t, i, o, n) { var r, s, a, l, _, h, c, u, d = this.vertices.length, p = this.indices.length, f = "bevel" === this.state_.lineJoin ? 0 : "miter" === this.state_.lineJoin ? 1 : 2, g = "butt" === this.state_.lineCap ? 0 : "square" === this.state_.lineCap ? 1 : 2, v = qt(t, i, o, n), y = p, m = 1; for (r = i, s = o; r < s; r += n) {
    if (_ = d / 7, h = c, c = u || [t[r], t[r + 1]], r === i) {
        if (u = [t[r + n], t[r + n + 1]], o - i == 2 * n && e._ol_array_.equals(c, u))
            break;
        if (!v) {
            g && (d = this.addVertices_([0, 0], c, u, m * Jt.Instruction_.BEGIN_LINE_CAP * g, d), d = this.addVertices_([0, 0], c, u, -m * Jt.Instruction_.BEGIN_LINE_CAP * g, d), this.indices[p++] = _ + 2, this.indices[p++] = _, this.indices[p++] = _ + 1, this.indices[p++] = _ + 1, this.indices[p++] = _ + 3, this.indices[p++] = _ + 2), d = this.addVertices_([0, 0], c, u, m * Jt.Instruction_.BEGIN_LINE * (g || 1), d), y = (d = this.addVertices_([0, 0], c, u, -m * Jt.Instruction_.BEGIN_LINE * (g || 1), d)) / 7 - 1;
            continue;
        }
        h = [t[o - 2 * n], t[o - 2 * n + 1]], a = u;
    }
    else {
        if (r === o - n) {
            if (v) {
                u = a;
                break;
            }
            h = h || [0, 0], d = this.addVertices_(h, c, [0, 0], m * Jt.Instruction_.END_LINE * (g || 1), d), d = this.addVertices_(h, c, [0, 0], -m * Jt.Instruction_.END_LINE * (g || 1), d), this.indices[p++] = _, this.indices[p++] = y - 1, this.indices[p++] = y, this.indices[p++] = y, this.indices[p++] = _ + 1, this.indices[p++] = _, g && (d = this.addVertices_(h, c, [0, 0], m * Jt.Instruction_.END_LINE_CAP * g, d), d = this.addVertices_(h, c, [0, 0], -m * Jt.Instruction_.END_LINE_CAP * g, d), this.indices[p++] = _ + 2, this.indices[p++] = _, this.indices[p++] = _ + 1, this.indices[p++] = _ + 1, this.indices[p++] = _ + 3, this.indices[p++] = _ + 2);
            break;
        }
        u = [t[r + n], t[r + n + 1]];
    }
    l = jt.triangleIsCounterClockwise(h[0], h[1], c[0], c[1], u[0], u[1]) ? -1 : 1, d = this.addVertices_(h, c, u, l * Jt.Instruction_.BEVEL_FIRST * (f || 1), d), d = this.addVertices_(h, c, u, l * Jt.Instruction_.BEVEL_SECOND * (f || 1), d), d = this.addVertices_(h, c, u, -l * Jt.Instruction_.MITER_BOTTOM * (f || 1), d), r > i && (this.indices[p++] = _, this.indices[p++] = y - 1, this.indices[p++] = y, this.indices[p++] = _ + 2, this.indices[p++] = _, this.indices[p++] = m * l > 0 ? y : y - 1), this.indices[p++] = _, this.indices[p++] = _ + 2, this.indices[p++] = _ + 1, y = _ + 2, m = l, f && (d = this.addVertices_(h, c, u, l * Jt.Instruction_.MITER_TOP * f, d), this.indices[p++] = _ + 1, this.indices[p++] = _ + 3, this.indices[p++] = _);
} v && (_ = _ || d / 7, l = M.linearRingIsClockwise([h[0], h[1], c[0], c[1], u[0], u[1]], 0, 6, 2) ? 1 : -1, d = this.addVertices_(h, c, u, l * Jt.Instruction_.BEVEL_FIRST * (f || 1), d), d = this.addVertices_(h, c, u, -l * Jt.Instruction_.MITER_BOTTOM * (f || 1), d), this.indices[p++] = _, this.indices[p++] = y - 1, this.indices[p++] = y, this.indices[p++] = _ + 1, this.indices[p++] = _, this.indices[p++] = m * l > 0 ? y : y - 1); }, Jt.prototype.addVertices_ = function (t, e, i, o, n) { return this.vertices[n++] = t[0], this.vertices[n++] = t[1], this.vertices[n++] = e[0], this.vertices[n++] = e[1], this.vertices[n++] = i[0], this.vertices[n++] = i[1], this.vertices[n++] = o, n; }, Jt.prototype.isValid_ = function (t, i, o, n) { var r = o - i; if (r < 2 * n)
    return !1; if (r === 2 * n) {
    var s = [t[i], t[i + 1]], a = [t[i + n], t[i + n + 1]];
    return !e._ol_array_.equals(s, a);
} return !0; }, Jt.prototype.drawLineString = function (t, i) { var o = t.getFlatCoordinates(), n = t.getStride(); this.isValid_(o, 0, o.length, n) && (o = e._ol_geom_flat_transform_.translate(o, 0, o.length, n, -this.origin[0], -this.origin[1]), this.state_.changed && (this.styleIndices_.push(this.indices.length), this.state_.changed = !1), this.startIndices.push(this.indices.length), this.startIndicesFeature.push(i), this.drawCoordinates_(o, 0, o.length, n)); }, Jt.prototype.drawMultiLineString = function (t, i) { var o = this.indices.length, n = t.getEnds(); n.unshift(0); var r, s, a = t.getFlatCoordinates(), l = t.getStride(); if (n.length > 1)
    for (r = 1, s = n.length; r < s; ++r)
        if (this.isValid_(a, n[r - 1], n[r], l)) {
            var _ = e._ol_geom_flat_transform_.translate(a, n[r - 1], n[r], l, -this.origin[0], -this.origin[1]);
            this.drawCoordinates_(_, 0, _.length, l);
        } this.indices.length > o && (this.startIndices.push(o), this.startIndicesFeature.push(i), this.state_.changed && (this.styleIndices_.push(o), this.state_.changed = !1)); }, Jt.prototype.drawPolygonCoordinates = function (t, e, i) { var o, n; if (qt(t, 0, t.length, i) || (t.push(t[0]), t.push(t[1])), this.drawCoordinates_(t, 0, t.length, i), e.length)
    for (o = 0, n = e.length; o < n; ++o)
        qt(e[o], 0, e[o].length, i) || (e[o].push(e[o][0]), e[o].push(e[o][1])), this.drawCoordinates_(e[o], 0, e[o].length, i); }, Jt.prototype.setPolygonStyle = function (t, e) { var i = void 0 === e ? this.indices.length : e; this.startIndices.push(i), this.startIndicesFeature.push(t), this.state_.changed && (this.styleIndices_.push(i), this.state_.changed = !1); }, Jt.prototype.getCurrentIndex = function () { return this.indices.length; }, Jt.prototype.finish = function (t) { this.verticesBuffer = new Vt(this.vertices), this.indicesBuffer = new Vt(this.indices), this.startIndices.push(this.indices.length), 0 === this.styleIndices_.length && this.styles_.length > 0 && (this.styles_ = []), this.vertices = null, this.indices = null; }, Jt.prototype.getDeleteResourcesFunction = function (t) { var e = this.verticesBuffer, i = this.indicesBuffer; return function () { t.deleteBuffer(e), t.deleteBuffer(i); }; }, Jt.prototype.setUpProgram = function (t, i, o, n) { var r, s; r = Zt.fragment, s = Zt.vertex; var a, l = i.getProgram(r, s); return this.defaultLocations_ ? a = this.defaultLocations_ : (a = new function (t, i) { this.u_projectionMatrix = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_projectionMatrix" : "h"), this.u_offsetScaleMatrix = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_offsetScaleMatrix" : "i"), this.u_offsetRotateMatrix = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_offsetRotateMatrix" : "j"), this.u_lineWidth = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_lineWidth" : "k"), this.u_miterLimit = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_miterLimit" : "l"), this.u_opacity = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_opacity" : "m"), this.u_color = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_color" : "n"), this.u_size = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_size" : "o"), this.u_pixelRatio = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_pixelRatio" : "p"), this.a_lastPos = t.getAttribLocation(i, e._ol_.DEBUG_WEBGL ? "a_lastPos" : "d"), this.a_position = t.getAttribLocation(i, e._ol_.DEBUG_WEBGL ? "a_position" : "e"), this.a_nextPos = t.getAttribLocation(i, e._ol_.DEBUG_WEBGL ? "a_nextPos" : "f"), this.a_direction = t.getAttribLocation(i, e._ol_.DEBUG_WEBGL ? "a_direction" : "g"); }(t, l), this.defaultLocations_ = a), i.useProgram(l), t.enableVertexAttribArray(a.a_lastPos), t.vertexAttribPointer(a.a_lastPos, 2, e._ol_webgl_.FLOAT, !1, 28, 0), t.enableVertexAttribArray(a.a_position), t.vertexAttribPointer(a.a_position, 2, e._ol_webgl_.FLOAT, !1, 28, 8), t.enableVertexAttribArray(a.a_nextPos), t.vertexAttribPointer(a.a_nextPos, 2, e._ol_webgl_.FLOAT, !1, 28, 16), t.enableVertexAttribArray(a.a_direction), t.vertexAttribPointer(a.a_direction, 1, e._ol_webgl_.FLOAT, !1, 28, 24), t.uniform2fv(a.u_size, o), t.uniform1f(a.u_pixelRatio, n), a; }, Jt.prototype.shutDownProgram = function (t, e) { t.disableVertexAttribArray(e.a_lastPos), t.disableVertexAttribArray(e.a_position), t.disableVertexAttribArray(e.a_nextPos), t.disableVertexAttribArray(e.a_direction); }, Jt.prototype.drawReplay = function (t, i, o, n) { var r, s, a, l, _ = t.getParameter(t.DEPTH_FUNC), h = t.getParameter(t.DEPTH_WRITEMASK); if (n || (t.enable(t.DEPTH_TEST), t.depthMask(!0), t.depthFunc(t.NOTEQUAL)), e._ol_obj_.isEmpty(o))
    for (a = this.startIndices[this.startIndices.length - 1], r = this.styleIndices_.length - 1; r >= 0; --r)
        s = this.styleIndices_[r], l = this.styles_[r], this.setStrokeStyle_(t, l[0], l[1], l[2]), this.drawElements(t, i, s, a), t.clear(t.DEPTH_BUFFER_BIT), a = s;
else
    this.drawReplaySkipping_(t, i, o); n || (t.disable(t.DEPTH_TEST), t.clear(t.DEPTH_BUFFER_BIT), t.depthMask(h), t.depthFunc(_)); }, Jt.prototype.drawReplaySkipping_ = function (t, i, o) { var n, r, s, a, l, _, h, c; for (h = this.startIndices.length - 2, s = r = this.startIndices[h + 1], n = this.styleIndices_.length - 1; n >= 0; --n) {
    for (a = this.styles_[n], this.setStrokeStyle_(t, a[0], a[1], a[2]), l = this.styleIndices_[n]; h >= 0 && this.startIndices[h] >= l;)
        c = this.startIndices[h], _ = this.startIndicesFeature[h], o[e._ol_.getUid(_).toString()] && (r !== s && (this.drawElements(t, i, r, s), t.clear(t.DEPTH_BUFFER_BIT)), s = c), h--, r = c;
    r !== s && (this.drawElements(t, i, r, s), t.clear(t.DEPTH_BUFFER_BIT)), r = s = l;
} }, Jt.prototype.drawHitDetectionReplayOneByOne = function (t, i, o, n, r) { var s, a, l, _, h, c, u; for (u = this.startIndices.length - 2, l = this.startIndices[u + 1], s = this.styleIndices_.length - 1; s >= 0; --s)
    for (_ = this.styles_[s], this.setStrokeStyle_(t, _[0], _[1], _[2]), h = this.styleIndices_[s]; u >= 0 && this.startIndices[u] >= h;) {
        if (a = this.startIndices[u], c = this.startIndicesFeature[u], void 0 === o[e._ol_.getUid(c).toString()] && c.getGeometry() && (void 0 === r || e._ol_extent_.intersects(r, c.getGeometry().getExtent()))) {
            t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawElements(t, i, a, l);
            var d = n(c);
            if (d)
                return d;
        }
        u--, l = a;
    } }, Jt.prototype.setStrokeStyle_ = function (t, e, i, o) { t.uniform4fv(this.defaultLocations_.u_color, e), t.uniform1f(this.defaultLocations_.u_lineWidth, i), t.uniform1f(this.defaultLocations_.u_miterLimit, o); }, Jt.prototype.setFillStrokeStyle = function (t, i) { var o = i.getLineCap(); this.state_.lineCap = void 0 !== o ? o : jt.defaultLineCap; var n = i.getLineDash(); this.state_.lineDash = n || jt.defaultLineDash; var r = i.getLineDashOffset(); this.state_.lineDashOffset = r || jt.defaultLineDashOffset; var s = i.getLineJoin(); this.state_.lineJoin = void 0 !== s ? s : jt.defaultLineJoin; var a = i.getColor(); a = a instanceof CanvasGradient || a instanceof CanvasPattern ? jt.defaultStrokeStyle : e._ol_color_.asArray(a).map(function (t, e) { return 3 != e ? t / 255 : t; }) || jt.defaultStrokeStyle; var l = i.getWidth(); l = void 0 !== l ? l : jt.defaultLineWidth; var _ = i.getMiterLimit(); _ = void 0 !== _ ? _ : jt.defaultMiterLimit, this.state_.strokeColor && e._ol_array_.equals(this.state_.strokeColor, a) && this.state_.lineWidth === l && this.state_.miterLimit === _ || (this.state_.changed = !0, this.state_.strokeColor = a, this.state_.lineWidth = l, this.state_.miterLimit = _, this.styles_.push([a, l, _])); }, Jt.Instruction_ = { ROUND: 2, BEGIN_LINE: 3, END_LINE: 5, BEGIN_LINE_CAP: 7, END_LINE_CAP: 11, BEVEL_FIRST: 13, BEVEL_SECOND: 17, MITER_BOTTOM: 19, MITER_TOP: 23 }; var Qt = {}; Qt.fragment = new Gt(e._ol_.DEBUG_WEBGL ? "precision mediump float;\n\n\n\nuniform vec4 u_color;\nuniform float u_opacity;\n\nvoid main(void) {\n  gl_FragColor = u_color;\n  float alpha = u_color.a * u_opacity;\n  if (alpha == 0.0) {\n    discard;\n  }\n  gl_FragColor.a = alpha;\n}\n" : "precision mediump float;uniform vec4 e;uniform float f;void main(void){gl_FragColor=e;float alpha=e.a*f;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"), Qt.vertex = new kt(e._ol_.DEBUG_WEBGL ? "\n\nattribute vec2 a_position;\n\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_offsetScaleMatrix;\nuniform mat4 u_offsetRotateMatrix;\n\nvoid main(void) {\n  gl_Position = u_projectionMatrix * vec4(a_position, 0.0, 1.0);\n}\n\n\n" : "attribute vec2 a;uniform mat4 b;uniform mat4 c;uniform mat4 d;void main(void){gl_Position=b*vec4(a,0.0,1.0);}"); var $t = function (t) { this.first_ = void 0, this.last_ = void 0, this.head_ = void 0, this.circular_ = void 0 === t || t, this.length_ = 0; }; $t.prototype.insertItem = function (t) { var e = { prev: void 0, next: void 0, data: t }, i = this.head_; if (i) {
    var o = i.next;
    e.prev = i, e.next = o, i.next = e, o && (o.prev = e), i === this.last_ && (this.last_ = e);
}
else
    this.first_ = e, this.last_ = e, this.circular_ && (e.next = e, e.prev = e); this.head_ = e, this.length_++; }, $t.prototype.removeItem = function () { var t = this.head_; if (t) {
    var e = t.next, i = t.prev;
    e && (e.prev = i), i && (i.next = e), this.head_ = e || i, this.first_ === this.last_ ? (this.head_ = void 0, this.first_ = void 0, this.last_ = void 0) : this.first_ === t ? this.first_ = this.head_ : this.last_ === t && (this.last_ = i ? this.head_.prev : this.head_), this.length_--;
} }, $t.prototype.firstItem = function () { if (this.head_ = this.first_, this.head_)
    return this.head_.data; }, $t.prototype.lastItem = function () { if (this.head_ = this.last_, this.head_)
    return this.head_.data; }, $t.prototype.nextItem = function () { if (this.head_ && this.head_.next)
    return this.head_ = this.head_.next, this.head_.data; }, $t.prototype.getNextItem = function () { if (this.head_ && this.head_.next)
    return this.head_.next.data; }, $t.prototype.prevItem = function () { if (this.head_ && this.head_.prev)
    return this.head_ = this.head_.prev, this.head_.data; }, $t.prototype.getPrevItem = function () { if (this.head_ && this.head_.prev)
    return this.head_.prev.data; }, $t.prototype.getCurrItem = function () { if (this.head_)
    return this.head_.data; }, $t.prototype.setFirstItem = function () { this.circular_ && this.head_ && (this.first_ = this.head_, this.last_ = this.head_.prev); }, $t.prototype.concat = function (t) { if (t.head_) {
    if (this.head_) {
        var e = this.head_.next;
        this.head_.next = t.first_, t.first_.prev = this.head_, e.prev = t.last_, t.last_.next = e, this.length_ += t.length_;
    }
    else
        this.head_ = t.head_, this.first_ = t.first_, this.last_ = t.last_, this.length_ = t.length_;
    t.head_ = void 0, t.first_ = void 0, t.last_ = void 0, t.length_ = 0;
} }, $t.prototype.getLength = function () { return this.length_; }; var te = function (t, e) { Wt.call(this, t, e), this.lineStringReplay = new Jt(t, e), this.defaultLocations_ = null, this.styles_ = [], this.styleIndices_ = [], this.state_ = { fillColor: null, changed: !1 }; }; e._ol_.inherits(te, Wt), te.prototype.drawCoordinates_ = function (t, i, o) { var n = new $t, r = new e._ol_structs_RBush_; this.processFlatCoordinates_(t, o, n, r, !0); var s = this.getMaxCoords_(n); if (i.length) {
    var a, l, _ = [];
    for (a = 0, l = i.length; a < l; ++a) {
        var h = { list: new $t, maxCoords: void 0, rtree: new e._ol_structs_RBush_ };
        _.push(h), this.processFlatCoordinates_(i[a], o, h.list, h.rtree, !1), this.classifyPoints_(h.list, h.rtree, !0), h.maxCoords = this.getMaxCoords_(h.list);
    }
    for (_.sort(function (t, e) { return e.maxCoords[0] === t.maxCoords[0] ? t.maxCoords[1] - e.maxCoords[1] : e.maxCoords[0] - t.maxCoords[0]; }), a = 0; a < _.length; ++a) {
        var c, u = _[a].list, d = u.firstItem(), p = d;
        do {
            if (this.getIntersections_(p, r).length) {
                c = !0;
                break;
            }
            p = u.nextItem();
        } while (d !== p);
        c || this.bridgeHole_(u, _[a].maxCoords[0], n, s[0], r) && (r.concat(_[a].rtree), this.classifyPoints_(n, r, !1));
    }
}
else
    this.classifyPoints_(n, r, !1); this.triangulate_(n, r); }, te.prototype.processFlatCoordinates_ = function (t, e, i, o, n) { var r, s, a, l, _, h = M.linearRingIsClockwise(t, 0, t.length, e), c = this.vertices.length / 2, u = [], d = []; if (n === h) {
    for (l = a = this.createPoint_(t[0], t[1], c++), r = e, s = t.length; r < s; r += e)
        _ = this.createPoint_(t[r], t[r + 1], c++), d.push(this.insertItem_(l, _, i)), u.push([Math.min(l.x, _.x), Math.min(l.y, _.y), Math.max(l.x, _.x), Math.max(l.y, _.y)]), l = _;
    d.push(this.insertItem_(_, a, i)), u.push([Math.min(l.x, _.x), Math.min(l.y, _.y), Math.max(l.x, _.x), Math.max(l.y, _.y)]);
}
else {
    var p = t.length - e;
    for (l = a = this.createPoint_(t[p], t[p + 1], c++), r = p - e, s = 0; r >= s; r -= e)
        _ = this.createPoint_(t[r], t[r + 1], c++), d.push(this.insertItem_(l, _, i)), u.push([Math.min(l.x, _.x), Math.min(l.y, _.y), Math.max(l.x, _.x), Math.max(l.y, _.y)]), l = _;
    d.push(this.insertItem_(_, a, i)), u.push([Math.min(l.x, _.x), Math.min(l.y, _.y), Math.max(l.x, _.x), Math.max(l.y, _.y)]);
} o.load(u, d); }, te.prototype.getMaxCoords_ = function (t) { var e = t.firstItem(), i = e, o = [i.p0.x, i.p0.y]; do {
    (i = t.nextItem()).p0.x > o[0] && (o = [i.p0.x, i.p0.y]);
} while (i !== e); return o; }, te.prototype.classifyPoints_ = function (t, e, i) { var o = t.firstItem(), n = o, r = t.nextItem(), s = !1; do {
    var a = i ? jt.triangleIsCounterClockwise(r.p1.x, r.p1.y, n.p1.x, n.p1.y, n.p0.x, n.p0.y) : jt.triangleIsCounterClockwise(n.p0.x, n.p0.y, n.p1.x, n.p1.y, r.p1.x, r.p1.y);
    void 0 === a ? (this.removeItem_(n, r, t, e), s = !0, r === o && (o = t.getNextItem()), r = n, t.prevItem()) : n.p1.reflex !== a && (n.p1.reflex = a, s = !0), n = r, r = t.nextItem();
} while (n !== o); return s; }, te.prototype.bridgeHole_ = function (t, e, i, o, n) { for (var r = t.firstItem(); r.p1.x !== e;)
    r = t.nextItem(); var s, a, l, _, h = r.p1, c = { x: o, y: h.y, i: -1 }, u = 1 / 0, d = this.getIntersections_({ p0: h, p1: c }, n, !0); for (s = 0, a = d.length; s < a; ++s) {
    var p = d[s], f = this.calculateIntersection_(h, c, p.p0, p.p1, !0), g = Math.abs(h.x - f[0]);
    g < u && void 0 !== jt.triangleIsCounterClockwise(h.x, h.y, p.p0.x, p.p0.y, p.p1.x, p.p1.y) && (u = g, _ = { x: f[0], y: f[1], i: -1 }, r = p);
} if (u === 1 / 0)
    return !1; if (l = r.p1, u > 0) {
    var v = this.getPointsInTriangle_(h, _, r.p1, n);
    if (v.length) {
        var y = 1 / 0;
        for (s = 0, a = v.length; s < a; ++s) {
            var m = v[s], x = Math.atan2(h.y - m.y, c.x - m.x);
            (x < y || x === y && m.x < l.x) && (y = x, l = m);
        }
    }
} for (r = i.firstItem(); r.p1.x !== l.x || r.p1.y !== l.y;)
    r = i.nextItem(); var E = { x: h.x, y: h.y, i: h.i, reflex: void 0 }, T = { x: r.p1.x, y: r.p1.y, i: r.p1.i, reflex: void 0 }; return t.getNextItem().p0 = E, this.insertItem_(h, r.p1, t, n), this.insertItem_(T, E, t, n), r.p1 = T, t.setFirstItem(), i.concat(t), !0; }, te.prototype.triangulate_ = function (t, e) { for (var i = !1, o = this.isSimple_(t, e); t.getLength() > 3;)
    if (o) {
        if (!this.clipEars_(t, e, o, i) && !this.classifyPoints_(t, e, i) && !this.resolveSelfIntersections_(t, e, !0))
            break;
    }
    else if (!this.clipEars_(t, e, o, i) && !this.classifyPoints_(t, e, i) && !this.resolveSelfIntersections_(t, e)) {
        if (!(o = this.isSimple_(t, e))) {
            this.splitPolygon_(t, e);
            break;
        }
        i = !this.isClockwise_(t), this.classifyPoints_(t, e, i);
    } if (3 === t.getLength()) {
    var n = this.indices.length;
    this.indices[n++] = t.getPrevItem().p0.i, this.indices[n++] = t.getCurrItem().p0.i, this.indices[n++] = t.getNextItem().p0.i;
} }, te.prototype.clipEars_ = function (t, e, i, o) { var n, r, s, a = this.indices.length, l = t.firstItem(), _ = t.getPrevItem(), h = l, c = t.nextItem(), u = t.getNextItem(), d = !1; do {
    var p;
    n = h.p0, r = h.p1, s = c.p1, !1 === r.reflex && (p = i ? 0 === this.getPointsInTriangle_(n, r, s, e, !0).length : o ? this.diagonalIsInside_(u.p1, s, r, n, _.p0) : this.diagonalIsInside_(_.p0, n, r, s, u.p1), (i || 0 === this.getIntersections_({ p0: n, p1: s }, e).length) && p && (i || !1 === n.reflex || !1 === s.reflex || M.linearRingIsClockwise([_.p0.x, _.p0.y, n.x, n.y, r.x, r.y, s.x, s.y, u.p1.x, u.p1.y], 0, 10, 2) === !o) && (this.indices[a++] = n.i, this.indices[a++] = r.i, this.indices[a++] = s.i, this.removeItem_(h, c, t, e), c === l && (l = u), d = !0)), _ = t.getPrevItem(), h = t.getCurrItem(), c = t.nextItem(), u = t.getNextItem();
} while (h !== l && t.getLength() > 3); return d; }, te.prototype.resolveSelfIntersections_ = function (t, e, i) { var o = t.firstItem(); t.nextItem(); var n = o, r = t.nextItem(), s = !1; do {
    var a = this.calculateIntersection_(n.p0, n.p1, r.p0, r.p1, i);
    if (a) {
        var l, _ = !1, h = this.vertices.length, c = this.indices.length, u = h / 2, d = t.prevItem();
        if (t.removeItem(), e.remove(d), _ = d === o, i ? (a[0] === n.p0.x && a[1] === n.p0.y ? (t.prevItem(), l = n.p0, r.p0 = l, e.remove(n), _ = _ || n === o) : (l = r.p1, n.p1 = l, e.remove(r), _ = _ || r === o), t.removeItem()) : (l = this.createPoint_(a[0], a[1], u), n.p1 = l, r.p0 = l, e.update([Math.min(n.p0.x, n.p1.x), Math.min(n.p0.y, n.p1.y), Math.max(n.p0.x, n.p1.x), Math.max(n.p0.y, n.p1.y)], n), e.update([Math.min(r.p0.x, r.p1.x), Math.min(r.p0.y, r.p1.y), Math.max(r.p0.x, r.p1.x), Math.max(r.p0.y, r.p1.y)], r)), this.indices[c++] = d.p0.i, this.indices[c++] = d.p1.i, this.indices[c++] = l.i, s = !0, _)
            break;
    }
    n = t.getPrevItem(), r = t.nextItem();
} while (n !== o); return s; }, te.prototype.isSimple_ = function (t, e) { var i = t.firstItem(), o = i; do {
    if (this.getIntersections_(o, e).length)
        return !1;
    o = t.nextItem();
} while (o !== i); return !0; }, te.prototype.isClockwise_ = function (t) { var e = 2 * t.getLength(), i = new Array(e), o = t.firstItem(), n = o, r = 0; do {
    i[r++] = n.p0.x, i[r++] = n.p0.y, n = t.nextItem();
} while (n !== o); return M.linearRingIsClockwise(i, 0, e, 2); }, te.prototype.splitPolygon_ = function (t, i) { var o = t.firstItem(), n = o; do {
    var r = this.getIntersections_(n, i);
    if (r.length) {
        var s = r[0], a = this.vertices.length / 2, l = this.calculateIntersection_(n.p0, n.p1, s.p0, s.p1), _ = this.createPoint_(l[0], l[1], a), h = new $t, c = new e._ol_structs_RBush_;
        this.insertItem_(_, n.p1, h, c), n.p1 = _, i.update([Math.min(n.p0.x, _.x), Math.min(n.p0.y, _.y), Math.max(n.p0.x, _.x), Math.max(n.p0.y, _.y)], n);
        for (var u = t.nextItem(); u !== s;)
            this.insertItem_(u.p0, u.p1, h, c), i.remove(u), t.removeItem(), u = t.getCurrItem();
        this.insertItem_(s.p0, _, h, c), s.p0 = _, i.update([Math.min(s.p1.x, _.x), Math.min(s.p1.y, _.y), Math.max(s.p1.x, _.x), Math.max(s.p1.y, _.y)], s), this.classifyPoints_(t, i, !1), this.triangulate_(t, i), this.classifyPoints_(h, c, !1), this.triangulate_(h, c);
        break;
    }
    n = t.nextItem();
} while (n !== o); }, te.prototype.createPoint_ = function (t, e, i) { var o = this.vertices.length; return this.vertices[o++] = t, this.vertices[o++] = e, { x: t, y: e, i: i, reflex: void 0 }; }, te.prototype.insertItem_ = function (t, e, i, o) { var n = { p0: t, p1: e }; return i.insertItem(n), o && o.insert([Math.min(t.x, e.x), Math.min(t.y, e.y), Math.max(t.x, e.x), Math.max(t.y, e.y)], n), n; }, te.prototype.removeItem_ = function (t, e, i, o) { i.getCurrItem() === e && (i.removeItem(), t.p1 = e.p1, o.remove(e), o.update([Math.min(t.p0.x, t.p1.x), Math.min(t.p0.y, t.p1.y), Math.max(t.p0.x, t.p1.x), Math.max(t.p0.y, t.p1.y)], t)); }, te.prototype.getPointsInTriangle_ = function (t, e, i, o, n) { var r, s, a, l, _ = [], h = o.getInExtent([Math.min(t.x, e.x, i.x), Math.min(t.y, e.y, i.y), Math.max(t.x, e.x, i.x), Math.max(t.y, e.y, i.y)]); for (r = 0, s = h.length; r < s; ++r)
    for (a in h[r])
        "object" != typeof (l = h[r][a]) || n && !l.reflex || l.x === t.x && l.y === t.y || l.x === e.x && l.y === e.y || l.x === i.x && l.y === i.y || -1 !== _.indexOf(l) || !A.linearRingContainsXY([t.x, t.y, e.x, e.y, i.x, i.y], 0, 6, 2, l.x, l.y) || _.push(l); return _; }, te.prototype.getIntersections_ = function (t, e, i) { var o, n, r = t.p0, s = t.p1, a = e.getInExtent([Math.min(r.x, s.x), Math.min(r.y, s.y), Math.max(r.x, s.x), Math.max(r.y, s.y)]), l = []; for (o = 0, n = a.length; o < n; ++o) {
    var _ = a[o];
    t !== _ && (i || _.p0 !== s || _.p1 !== r) && this.calculateIntersection_(r, s, _.p0, _.p1, i) && l.push(_);
} return l; }, te.prototype.calculateIntersection_ = function (t, e, i, o, n) { var r = (o.y - i.y) * (e.x - t.x) - (o.x - i.x) * (e.y - t.y); if (0 !== r) {
    var s = ((o.x - i.x) * (t.y - i.y) - (o.y - i.y) * (t.x - i.x)) / r, a = ((e.x - t.x) * (t.y - i.y) - (e.y - t.y) * (t.x - i.x)) / r;
    if (!n && s > jt.EPSILON && s < 1 - jt.EPSILON && a > jt.EPSILON && a < 1 - jt.EPSILON || n && s >= 0 && s <= 1 && a >= 0 && a <= 1)
        return [t.x + s * (e.x - t.x), t.y + s * (e.y - t.y)];
} }, te.prototype.diagonalIsInside_ = function (t, e, i, o, n) { if (void 0 === e.reflex || void 0 === o.reflex)
    return !1; var r = (i.x - o.x) * (e.y - o.y) > (i.y - o.y) * (e.x - o.x), s = (n.x - o.x) * (e.y - o.y) < (n.y - o.y) * (e.x - o.x), a = (t.x - e.x) * (o.y - e.y) > (t.y - e.y) * (o.x - e.x), l = (i.x - e.x) * (o.y - e.y) < (i.y - e.y) * (o.x - e.x), _ = o.reflex ? s || r : s && r, h = e.reflex ? l || a : l && a; return _ && h; }, te.prototype.drawMultiPolygon = function (t, i) { var o, n, r, s, a = t.getEndss(), l = t.getStride(), _ = this.indices.length, h = this.lineStringReplay.getCurrentIndex(), c = t.getFlatCoordinates(), u = 0; for (o = 0, n = a.length; o < n; ++o) {
    var d = a[o];
    if (d.length > 0) {
        var p = e._ol_geom_flat_transform_.translate(c, u, d[0], l, -this.origin[0], -this.origin[1]);
        if (p.length) {
            var f, g = [];
            for (r = 1, s = d.length; r < s; ++r)
                d[r] !== d[r - 1] && (f = e._ol_geom_flat_transform_.translate(c, d[r - 1], d[r], l, -this.origin[0], -this.origin[1]), g.push(f));
            this.lineStringReplay.drawPolygonCoordinates(p, g, l), this.drawCoordinates_(p, g, l);
        }
    }
    u = d[d.length - 1];
} this.indices.length > _ && (this.startIndices.push(_), this.startIndicesFeature.push(i), this.state_.changed && (this.styleIndices_.push(_), this.state_.changed = !1)), this.lineStringReplay.getCurrentIndex() > h && this.lineStringReplay.setPolygonStyle(i, h); }, te.prototype.drawPolygon = function (t, i) { var o = t.getEnds(), n = t.getStride(); if (o.length > 0) {
    var r = t.getFlatCoordinates().map(Number), s = e._ol_geom_flat_transform_.translate(r, 0, o[0], n, -this.origin[0], -this.origin[1]);
    if (s.length) {
        var a, l, _, h = [];
        for (a = 1, l = o.length; a < l; ++a)
            o[a] !== o[a - 1] && (_ = e._ol_geom_flat_transform_.translate(r, o[a - 1], o[a], n, -this.origin[0], -this.origin[1]), h.push(_));
        this.startIndices.push(this.indices.length), this.startIndicesFeature.push(i), this.state_.changed && (this.styleIndices_.push(this.indices.length), this.state_.changed = !1), this.lineStringReplay.setPolygonStyle(i), this.lineStringReplay.drawPolygonCoordinates(s, h, n), this.drawCoordinates_(s, h, n);
    }
} }, te.prototype.finish = function (t) { this.verticesBuffer = new Vt(this.vertices), this.indicesBuffer = new Vt(this.indices), this.startIndices.push(this.indices.length), this.lineStringReplay.finish(t), 0 === this.styleIndices_.length && this.styles_.length > 0 && (this.styles_ = []), this.vertices = null, this.indices = null; }, te.prototype.getDeleteResourcesFunction = function (t) { var e = this.verticesBuffer, i = this.indicesBuffer, o = this.lineStringReplay.getDeleteResourcesFunction(t); return function () { t.deleteBuffer(e), t.deleteBuffer(i), o(); }; }, te.prototype.setUpProgram = function (t, i, o, n) { var r, s; r = Qt.fragment, s = Qt.vertex; var a, l = i.getProgram(r, s); return this.defaultLocations_ ? a = this.defaultLocations_ : (a = new function (t, i) { this.u_projectionMatrix = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_projectionMatrix" : "b"), this.u_offsetScaleMatrix = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_offsetScaleMatrix" : "c"), this.u_offsetRotateMatrix = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_offsetRotateMatrix" : "d"), this.u_color = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_color" : "e"), this.u_opacity = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_opacity" : "f"), this.a_position = t.getAttribLocation(i, e._ol_.DEBUG_WEBGL ? "a_position" : "a"); }(t, l), this.defaultLocations_ = a), i.useProgram(l), t.enableVertexAttribArray(a.a_position), t.vertexAttribPointer(a.a_position, 2, e._ol_webgl_.FLOAT, !1, 8, 0), a; }, te.prototype.shutDownProgram = function (t, e) { t.disableVertexAttribArray(e.a_position); }, te.prototype.drawReplay = function (t, i, o, n) { var r, s, a, l, _ = t.getParameter(t.DEPTH_FUNC), h = t.getParameter(t.DEPTH_WRITEMASK); if (n || (t.enable(t.DEPTH_TEST), t.depthMask(!0), t.depthFunc(t.NOTEQUAL)), e._ol_obj_.isEmpty(o))
    for (a = this.startIndices[this.startIndices.length - 1], r = this.styleIndices_.length - 1; r >= 0; --r)
        s = this.styleIndices_[r], l = this.styles_[r], this.setFillStyle_(t, l), this.drawElements(t, i, s, a), a = s;
else
    this.drawReplaySkipping_(t, i, o); n || (t.disable(t.DEPTH_TEST), t.clear(t.DEPTH_BUFFER_BIT), t.depthMask(h), t.depthFunc(_)); }, te.prototype.drawHitDetectionReplayOneByOne = function (t, i, o, n, r) { var s, a, l, _, h, c, u; for (u = this.startIndices.length - 2, l = this.startIndices[u + 1], s = this.styleIndices_.length - 1; s >= 0; --s)
    for (_ = this.styles_[s], this.setFillStyle_(t, _), h = this.styleIndices_[s]; u >= 0 && this.startIndices[u] >= h;) {
        if (a = this.startIndices[u], c = this.startIndicesFeature[u], void 0 === o[e._ol_.getUid(c).toString()] && c.getGeometry() && (void 0 === r || e._ol_extent_.intersects(r, c.getGeometry().getExtent()))) {
            t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), this.drawElements(t, i, a, l);
            var d = n(c);
            if (d)
                return d;
        }
        u--, l = a;
    } }, te.prototype.drawReplaySkipping_ = function (t, i, o) { var n, r, s, a, l, _, h, c; for (h = this.startIndices.length - 2, s = r = this.startIndices[h + 1], n = this.styleIndices_.length - 1; n >= 0; --n) {
    for (a = this.styles_[n], this.setFillStyle_(t, a), l = this.styleIndices_[n]; h >= 0 && this.startIndices[h] >= l;)
        c = this.startIndices[h], _ = this.startIndicesFeature[h], o[e._ol_.getUid(_).toString()] && (r !== s && (this.drawElements(t, i, r, s), t.clear(t.DEPTH_BUFFER_BIT)), s = c), h--, r = c;
    r !== s && (this.drawElements(t, i, r, s), t.clear(t.DEPTH_BUFFER_BIT)), r = s = l;
} }, te.prototype.setFillStyle_ = function (t, e) { t.uniform4fv(this.defaultLocations_.u_color, e); }, te.prototype.setFillStrokeStyle = function (t, i) { var o = t ? t.getColor() : [0, 0, 0, 0]; if (o = o instanceof CanvasGradient || o instanceof CanvasPattern ? jt.defaultFillStyle : e._ol_color_.asArray(o).map(function (t, e) { return 3 != e ? t / 255 : t; }) || jt.defaultFillStyle, this.state_.fillColor && e._ol_array_.equals(o, this.state_.fillColor) || (this.state_.fillColor = o, this.state_.changed = !0, this.styles_.push(o)), i)
    this.lineStringReplay.setFillStrokeStyle(null, i);
else {
    var n = new e._ol_style_Stroke_({ color: [0, 0, 0, 0], lineWidth: 0 });
    this.lineStringReplay.setFillStrokeStyle(null, n);
} }; var ee = function (t, i) { this.space_ = i, this.emptyBlocks_ = [{ x: 0, y: 0, width: t, height: t }], this.entries_ = {}, this.context_ = e._ol_dom_.createCanvasContext2D(t, t), this.canvas_ = this.context_.canvas; }; ee.prototype.get = function (t) { return this.entries_[t] || null; }, ee.prototype.add = function (t, e, i, o, n) { var r, s, a; for (s = 0, a = this.emptyBlocks_.length; s < a; ++s)
    if ((r = this.emptyBlocks_[s]).width >= e + this.space_ && r.height >= i + this.space_) {
        var l = { offsetX: r.x + this.space_, offsetY: r.y + this.space_, image: this.canvas_ };
        return this.entries_[t] = l, o.call(n, this.context_, r.x + this.space_, r.y + this.space_), this.split_(s, r, e + this.space_, i + this.space_), l;
    } return null; }, ee.prototype.split_ = function (t, e, i, o) { var n, r; e.width - i > e.height - o ? (n = { x: e.x + i, y: e.y, width: e.width - i, height: e.height }, r = { x: e.x, y: e.y + o, width: i, height: e.height - o }, this.updateBlocks_(t, n, r)) : (n = { x: e.x + i, y: e.y, width: e.width - i, height: o }, r = { x: e.x, y: e.y + o, width: e.width, height: e.height - o }, this.updateBlocks_(t, n, r)); }, ee.prototype.updateBlocks_ = function (t, e, i) { var o = [t, 1]; e.width > 0 && e.height > 0 && o.push(e), i.width > 0 && i.height > 0 && o.push(i), this.emptyBlocks_.splice.apply(this.emptyBlocks_, o); }; var ie = function (t) { var i = t || {}; this.currentSize_ = void 0 !== i.initialSize ? i.initialSize : e._ol_.INITIAL_ATLAS_SIZE, this.maxSize_ = void 0 !== i.maxSize ? i.maxSize : -1 != e._ol_.MAX_ATLAS_SIZE ? e._ol_.MAX_ATLAS_SIZE : void 0 !== e._ol_.WEBGL_MAX_TEXTURE_SIZE ? e._ol_.WEBGL_MAX_TEXTURE_SIZE : 2048, this.space_ = void 0 !== i.space ? i.space : 1, this.atlases_ = [new ee(this.currentSize_, this.space_)], this.currentHitSize_ = this.currentSize_, this.hitAtlases_ = [new ee(this.currentHitSize_, this.space_)]; }; ie.prototype.getInfo = function (t) { var e = this.getInfo_(this.atlases_, t); if (!e)
    return null; var i = this.getInfo_(this.hitAtlases_, t); return this.mergeInfos_(e, i); }, ie.prototype.getInfo_ = function (t, e) { var i, o, n; for (o = 0, n = t.length; o < n; ++o)
    if (i = t[o].get(e))
        return i; return null; }, ie.prototype.mergeInfos_ = function (t, e) { return { offsetX: t.offsetX, offsetY: t.offsetY, image: t.image, hitImage: e.image }; }, ie.prototype.add = function (t, i, o, n, r, s) { if (i + this.space_ > this.maxSize_ || o + this.space_ > this.maxSize_)
    return null; var a = this.add_(!1, t, i, o, n, s); if (!a)
    return null; var l = void 0 !== r ? r : e._ol_.nullFunction, _ = this.add_(!0, t, i, o, l, s); return this.mergeInfos_(a, _); }, ie.prototype.add_ = function (t, e, i, o, n, r) { var s, a, l, _, h = t ? this.hitAtlases_ : this.atlases_; for (l = 0, _ = h.length; l < _; ++l) {
    if (a = (s = h[l]).add(e, i, o, n, r))
        return a;
    var c;
    a || l !== _ - 1 || (t ? (c = Math.min(2 * this.currentHitSize_, this.maxSize_), this.currentHitSize_ = c) : (c = Math.min(2 * this.currentSize_, this.maxSize_), this.currentSize_ = c), s = new ee(c, this.space_), h.push(s), ++_);
} return null; }; var oe = function (t, i) { Ht.call(this, t, i), this.images_ = [], this.textures_ = [], this.measureCanvas_ = e._ol_dom_.createCanvasContext2D(0, 0).canvas, this.state_ = { strokeColor: null, lineCap: void 0, lineDash: null, lineDashOffset: void 0, lineJoin: void 0, lineWidth: 0, miterLimit: void 0, fillColor: null, font: void 0, scale: void 0 }, this.text_ = "", this.textAlign_ = void 0, this.textBaseline_ = void 0, this.offsetX_ = void 0, this.offsetY_ = void 0, this.atlases_ = {}, this.currAtlas_ = void 0, this.scale = 1, this.opacity = 1; }; e._ol_.inherits(oe, Ht), oe.prototype.drawText = function (t, i) { if (this.text_) {
    var o = null, n = 2, r = 2;
    switch (t.getType()) {
        case e._ol_geom_GeometryType_.POINT:
        case e._ol_geom_GeometryType_.MULTI_POINT:
            n = (o = t.getFlatCoordinates()).length, r = t.getStride();
            break;
        case e._ol_geom_GeometryType_.CIRCLE:
            o = t.getCenter();
            break;
        case e._ol_geom_GeometryType_.LINE_STRING:
            o = t.getFlatMidpoint();
            break;
        case e._ol_geom_GeometryType_.MULTI_LINE_STRING:
            n = (o = t.getFlatMidpoints()).length;
            break;
        case e._ol_geom_GeometryType_.POLYGON:
            o = t.getFlatInteriorPoint();
            break;
        case e._ol_geom_GeometryType_.MULTI_POLYGON: n = (o = t.getFlatInteriorPoints()).length;
    }
    this.startIndices.push(this.indices.length), this.startIndicesFeature.push(i);
    var s, a, l, _, h, c, u, d, p = this.currAtlas_, f = this.text_.split("\n"), g = this.getTextSize_(f), v = Math.round(g[0] * this.textAlign_ - this.offsetX_), y = Math.round(g[1] * this.textBaseline_ - this.offsetY_), m = this.state_.lineWidth / 2 * this.state_.scale;
    for (s = 0, a = f.length; s < a; ++s)
        for (h = 0, c = p.height * s, l = 0, _ = (u = f[s].split("")).length; l < _; ++l) {
            if (d = p.atlas.getInfo(u[l])) {
                var x, E = d.image;
                this.anchorX = v - h, this.anchorY = y - c, this.originX = 0 === l ? d.offsetX - m : d.offsetX, this.originY = d.offsetY, this.height = p.height, this.width = 0 === l || l === u.length - 1 ? p.width[u[l]] + m : p.width[u[l]], this.imageHeight = E.height, this.imageWidth = E.width, 0 === this.images_.length ? this.images_.push(E) : (x = this.images_[this.images_.length - 1], e._ol_.getUid(x) != e._ol_.getUid(E) && (this.groupIndices.push(this.indices.length), this.images_.push(E))), this.drawText_(o, 0, n, r);
            }
            h += this.width;
        }
} }, oe.prototype.getTextSize_ = function (t) { var e = this, i = this.currAtlas_, o = t.length * i.height; return [t.map(function (t) { var o, n, r = 0; for (o = 0, n = t.length; o < n; ++o) {
        var s = t[o];
        i.width[s] || e.addCharToAtlas_(s), r += i.width[s] ? i.width[s] : 0;
    } return r; }).reduce(function (t, e) { return Math.max(t, e); }), o]; }, oe.prototype.drawText_ = function (t, e, i, o) { var n, r; for (n = e, r = i; n < r; n += o)
    this.drawCoordinates(t, e, i, o); }, oe.prototype.addCharToAtlas_ = function (t) { if (1 === t.length) {
    var i = this.currAtlas_, o = this.state_, n = this.measureCanvas_.getContext("2d");
    n.font = o.font;
    var r = Math.ceil(n.measureText(t).width * o.scale);
    i.atlas.add(t, r, i.height, function (i, n, r) { i.font = o.font, i.fillStyle = o.fillColor, i.strokeStyle = o.strokeColor, i.lineWidth = o.lineWidth, i.lineCap = o.lineCap, i.lineJoin = o.lineJoin, i.miterLimit = o.miterLimit, i.textAlign = "left", i.textBaseline = "top", e._ol_has_.CANVAS_LINE_DASH && o.lineDash && (i.setLineDash(o.lineDash), i.lineDashOffset = o.lineDashOffset), 1 !== o.scale && i.setTransform(o.scale, 0, 0, o.scale, 0, 0), o.strokeColor && i.strokeText(t, n, r), o.fillColor && i.fillText(t, n, r); }) && (i.width[t] = r);
} }, oe.prototype.finish = function (t) { var e = t.getGL(); this.groupIndices.push(this.indices.length), this.hitDetectionGroupIndices = this.groupIndices, this.verticesBuffer = new Vt(this.vertices), this.indicesBuffer = new Vt(this.indices), this.createTextures(this.textures_, this.images_, {}, e), this.state_ = { strokeColor: null, lineCap: void 0, lineDash: null, lineDashOffset: void 0, lineJoin: void 0, lineWidth: 0, miterLimit: void 0, fillColor: null, font: void 0, scale: void 0 }, this.text_ = "", this.textAlign_ = void 0, this.textBaseline_ = void 0, this.offsetX_ = void 0, this.offsetY_ = void 0, this.images_ = null, this.atlases_ = {}, this.currAtlas_ = void 0, Ht.prototype.finish.call(this, t); }, oe.prototype.setTextStyle = function (t) { var i = this.state_, o = t.getFill(), n = t.getStroke(); if (t && t.getText() && (o || n)) {
    if (o) {
        var r = o.getColor();
        i.fillColor = e._ol_colorlike_.asColorLike(r || jt.defaultFillStyle);
    }
    else
        i.fillColor = null;
    if (n) {
        var s = n.getColor();
        i.strokeColor = e._ol_colorlike_.asColorLike(s || jt.defaultStrokeStyle), i.lineWidth = n.getWidth() || jt.defaultLineWidth, i.lineCap = n.getLineCap() || jt.defaultLineCap, i.lineDashOffset = n.getLineDashOffset() || jt.defaultLineDashOffset, i.lineJoin = n.getLineJoin() || jt.defaultLineJoin, i.miterLimit = n.getMiterLimit() || jt.defaultMiterLimit;
        var a = n.getLineDash();
        i.lineDash = a ? a.slice() : jt.defaultLineDash;
    }
    else
        i.strokeColor = null, i.lineWidth = 0;
    i.font = t.getFont() || jt.defaultFont, i.scale = t.getScale() || 1, this.text_ = t.getText();
    var l = Rt.TEXT_ALIGN[t.getTextAlign()], _ = Rt.TEXT_ALIGN[t.getTextBaseline()];
    this.textAlign_ = void 0 === l ? jt.defaultTextAlign : l, this.textBaseline_ = void 0 === _ ? jt.defaultTextBaseline : _, this.offsetX_ = t.getOffsetX() || 0, this.offsetY_ = t.getOffsetY() || 0, this.rotateWithView = !!t.getRotateWithView(), this.rotation = t.getRotation() || 0, this.currAtlas_ = this.getAtlas_(i);
}
else
    this.text_ = ""; }, oe.prototype.getAtlas_ = function (t) { var e, i = []; for (e in t)
    (t[e] || 0 === t[e]) && (Array.isArray(t[e]) ? i = i.concat(t[e]) : i.push(t[e])); var o = this.calculateHash_(i); if (!this.atlases_[o]) {
    var n = this.measureCanvas_.getContext("2d");
    n.font = t.font;
    var r = Math.ceil((1.5 * n.measureText("M").width + t.lineWidth / 2) * t.scale);
    this.atlases_[o] = { atlas: new ie({ space: t.lineWidth + 1 }), width: {}, height: r };
} return this.atlases_[o]; }, oe.prototype.calculateHash_ = function (t) { var e, i, o = ""; for (e = 0, i = t.length; e < i; ++e)
    o += t[e]; return o; }, oe.prototype.getTextures = function (t) { return this.textures_; }, oe.prototype.getHitDetectionTextures = function () { return this.textures_; }; var ne = function (t, e, i) { xt.call(this), this.maxExtent_ = e, this.tolerance_ = t, this.renderBuffer_ = i, this.replaysByZIndex_ = {}; }; e._ol_.inherits(ne, xt), ne.prototype.addDeclutter = function (t, e) { }, ne.prototype.getDeleteResourcesFunction = function (t) { var e, i = []; for (e in this.replaysByZIndex_) {
    var o, n = this.replaysByZIndex_[e];
    for (o in n)
        i.push(n[o].getDeleteResourcesFunction(t));
} return function () { for (var t, e = i.length, o = 0; o < e; o++)
    t = i[o].apply(this, arguments); return t; }; }, ne.prototype.finish = function (t) { var e; for (e in this.replaysByZIndex_) {
    var i, o = this.replaysByZIndex_[e];
    for (i in o)
        o[i].finish(t);
} }, ne.prototype.getReplay = function (t, e) { var i = void 0 !== t ? t.toString() : "0", o = this.replaysByZIndex_[i]; void 0 === o && (o = {}, this.replaysByZIndex_[i] = o); var n = o[e]; return void 0 === n && (n = new (0, ne.BATCH_CONSTRUCTORS_[e])(this.tolerance_, this.maxExtent_), o[e] = n), n; }, ne.prototype.isEmpty = function () { return e._ol_obj_.isEmpty(this.replaysByZIndex_); }, ne.prototype.replay = function (t, i, o, n, r, s, a, l) { var _, h, c, u, d, p, f = Object.keys(this.replaysByZIndex_).map(Number); for (f.sort(e._ol_array_.numberSafeCompareFunction), _ = 0, h = f.length; _ < h; ++_)
    for (d = this.replaysByZIndex_[f[_].toString()], c = 0, u = Rt.ORDER.length; c < u; ++c)
        void 0 !== (p = d[Rt.ORDER[c]]) && p.replay(t, i, o, n, r, s, a, l, void 0, !1); }, ne.prototype.replayHitDetection_ = function (t, e, i, o, n, r, s, a, l, _, h) { var c, u, d, p, f, g, v = Object.keys(this.replaysByZIndex_).map(Number); for (v.sort(function (t, e) { return e - t; }), c = 0, u = v.length; c < u; ++c)
    for (p = this.replaysByZIndex_[v[c].toString()], d = Rt.ORDER.length - 1; d >= 0; --d)
        if (void 0 !== (f = p[Rt.ORDER[d]]) && (g = f.replay(t, e, i, o, n, r, s, a, l, _, h)))
            return g; }, ne.prototype.forEachFeatureAtCoordinate = function (t, i, o, n, r, s, a, l, _, h) { var c, u = i.getGL(); return u.bindFramebuffer(u.FRAMEBUFFER, i.getHitDetectionFramebuffer()), void 0 !== this.renderBuffer_ && (c = e._ol_extent_.buffer(e._ol_extent_.createOrUpdateFromCoordinate(t), n * this.renderBuffer_)), this.replayHitDetection_(i, t, n, r, ne.HIT_DETECTION_SIZE_, a, l, _, function (t) { var e = new Uint8Array(4); if (u.readPixels(0, 0, 1, 1, u.RGBA, u.UNSIGNED_BYTE, e), e[3] > 0) {
    var i = h(t);
    if (i)
        return i;
} }, !0, c); }, ne.prototype.hasFeatureAtCoordinate = function (t, e, i, o, n, r, s, a, l) { var _ = e.getGL(); return _.bindFramebuffer(_.FRAMEBUFFER, e.getHitDetectionFramebuffer()), void 0 !== this.replayHitDetection_(e, t, o, n, ne.HIT_DETECTION_SIZE_, s, a, l, function (t) { var e = new Uint8Array(4); return _.readPixels(0, 0, 1, 1, _.RGBA, _.UNSIGNED_BYTE, e), e[3] > 0; }, !1); }, ne.HIT_DETECTION_SIZE_ = [1, 1], ne.BATCH_CONSTRUCTORS_ = { Circle: Xt, Image: Yt, LineString: Jt, Polygon: te, Text: oe }; var re = function (t, e, i, o, n, r, s) { ct.call(this), this.context_ = t, this.center_ = e, this.extent_ = r, this.pixelRatio_ = s, this.size_ = n, this.rotation_ = o, this.resolution_ = i, this.imageStyle_ = null, this.fillStyle_ = null, this.strokeStyle_ = null, this.textStyle_ = null; }; e._ol_.inherits(re, ct), re.prototype.drawText_ = function (t, e) { var i = this.context_, o = t.getReplay(0, Et.TEXT); o.setTextStyle(this.textStyle_), o.drawText(e, null), o.finish(i), o.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), o.getDeleteResourcesFunction(i)(); }, re.prototype.setStyle = function (t) { this.setFillStrokeStyle(t.getFill(), t.getStroke()), this.setImageStyle(t.getImage()), this.setTextStyle(t.getText()); }, re.prototype.drawGeometry = function (t) { switch (t.getType()) {
    case e._ol_geom_GeometryType_.POINT:
        this.drawPoint(t, null);
        break;
    case e._ol_geom_GeometryType_.LINE_STRING:
        this.drawLineString(t, null);
        break;
    case e._ol_geom_GeometryType_.POLYGON:
        this.drawPolygon(t, null);
        break;
    case e._ol_geom_GeometryType_.MULTI_POINT:
        this.drawMultiPoint(t, null);
        break;
    case e._ol_geom_GeometryType_.MULTI_LINE_STRING:
        this.drawMultiLineString(t, null);
        break;
    case e._ol_geom_GeometryType_.MULTI_POLYGON:
        this.drawMultiPolygon(t, null);
        break;
    case e._ol_geom_GeometryType_.GEOMETRY_COLLECTION:
        this.drawGeometryCollection(t, null);
        break;
    case e._ol_geom_GeometryType_.CIRCLE: this.drawCircle(t, null);
} }, re.prototype.drawFeature = function (t, i) { var o = i.getGeometryFunction()(t); o && e._ol_extent_.intersects(this.extent_, o.getExtent()) && (this.setStyle(i), this.drawGeometry(o)); }, re.prototype.drawGeometryCollection = function (t, e) { var i, o, n = t.getGeometriesArray(); for (i = 0, o = n.length; i < o; ++i)
    this.drawGeometry(n[i]); }, re.prototype.drawPoint = function (t, e) { var i = this.context_, o = new ne(1, this.extent_), n = o.getReplay(0, Et.IMAGE); n.setImageStyle(this.imageStyle_), n.drawPoint(t, e), n.finish(i), n.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(o, t); }, re.prototype.drawMultiPoint = function (t, e) { var i = this.context_, o = new ne(1, this.extent_), n = o.getReplay(0, Et.IMAGE); n.setImageStyle(this.imageStyle_), n.drawMultiPoint(t, e), n.finish(i), n.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(o, t); }, re.prototype.drawLineString = function (t, e) { var i = this.context_, o = new ne(1, this.extent_), n = o.getReplay(0, Et.LINE_STRING); n.setFillStrokeStyle(null, this.strokeStyle_), n.drawLineString(t, e), n.finish(i), n.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(o, t); }, re.prototype.drawMultiLineString = function (t, e) { var i = this.context_, o = new ne(1, this.extent_), n = o.getReplay(0, Et.LINE_STRING); n.setFillStrokeStyle(null, this.strokeStyle_), n.drawMultiLineString(t, e), n.finish(i), n.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(o, t); }, re.prototype.drawPolygon = function (t, e) { var i = this.context_, o = new ne(1, this.extent_), n = o.getReplay(0, Et.POLYGON); n.setFillStrokeStyle(this.fillStyle_, this.strokeStyle_), n.drawPolygon(t, e), n.finish(i), n.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(o, t); }, re.prototype.drawMultiPolygon = function (t, e) { var i = this.context_, o = new ne(1, this.extent_), n = o.getReplay(0, Et.POLYGON); n.setFillStrokeStyle(this.fillStyle_, this.strokeStyle_), n.drawMultiPolygon(t, e), n.finish(i), n.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(o, t); }, re.prototype.drawCircle = function (t, e) { var i = this.context_, o = new ne(1, this.extent_), n = o.getReplay(0, Et.CIRCLE); n.setFillStrokeStyle(this.fillStyle_, this.strokeStyle_), n.drawCircle(t, e), n.finish(i), n.replay(this.context_, this.center_, this.resolution_, this.rotation_, this.size_, this.pixelRatio_, 1, {}, void 0, !1), n.getDeleteResourcesFunction(i)(), this.textStyle_ && this.drawText_(o, t); }, re.prototype.setImageStyle = function (t) { this.imageStyle_ = t; }, re.prototype.setFillStrokeStyle = function (t, e) { this.fillStyle_ = t, this.strokeStyle_ = e; }, re.prototype.setTextStyle = function (t) { this.textStyle_ = t; }; var se = {}; se.fragment = new Gt(e._ol_.DEBUG_WEBGL ? "precision mediump float;\nvarying vec2 v_texCoord;\n\n\nuniform float u_opacity;\nuniform sampler2D u_texture;\n\nvoid main(void) {\n  vec4 texColor = texture2D(u_texture, v_texCoord);\n  gl_FragColor.rgb = texColor.rgb;\n  gl_FragColor.a = texColor.a * u_opacity;\n}\n" : "precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}"), se.vertex = new kt(e._ol_.DEBUG_WEBGL ? "varying vec2 v_texCoord;\n\n\nattribute vec2 a_position;\nattribute vec2 a_texCoord;\n\nuniform mat4 u_texCoordMatrix;\nuniform mat4 u_projectionMatrix;\n\nvoid main(void) {\n  gl_Position = u_projectionMatrix * vec4(a_position, 0., 1.);\n  v_texCoord = (u_texCoordMatrix * vec4(a_texCoord, 0., 1.)).st;\n}\n\n\n" : "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}"); var ae = function (t, i) { dt.call(this, i), this.mapRenderer = t, this.arrayBuffer_ = new Vt([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1]), this.texture = null, this.framebuffer = null, this.framebufferDimension = void 0, this.texCoordMatrix = e._ol_transform_.create(), this.projectionMatrix = e._ol_transform_.create(), this.tmpMat4_ = Ut(), this.defaultLocations_ = null; }; e._ol_.inherits(ae, dt), ae.prototype.bindFramebuffer = function (t, i) { var o = this.mapRenderer.getGL(); if (void 0 === this.framebufferDimension || this.framebufferDimension != i) {
    var n = function (t, e, i) { t.isContextLost() || (t.deleteFramebuffer(e), t.deleteTexture(i)); }.bind(null, o, this.framebuffer, this.texture);
    t.postRenderFunctions.push(n);
    var r = zt.createEmptyTexture(o, i, i), s = o.createFramebuffer();
    o.bindFramebuffer(e._ol_webgl_.FRAMEBUFFER, s), o.framebufferTexture2D(e._ol_webgl_.FRAMEBUFFER, e._ol_webgl_.COLOR_ATTACHMENT0, e._ol_webgl_.TEXTURE_2D, r, 0), this.texture = r, this.framebuffer = s, this.framebufferDimension = i;
}
else
    o.bindFramebuffer(e._ol_webgl_.FRAMEBUFFER, this.framebuffer); }, ae.prototype.composeFrame = function (t, i, o) { this.dispatchComposeEvent_(e._ol_render_EventType_.PRECOMPOSE, o, t), o.bindBuffer(e._ol_webgl_.ARRAY_BUFFER, this.arrayBuffer_); var n, r = o.getGL(), s = se.fragment, a = se.vertex, l = o.getProgram(s, a); this.defaultLocations_ ? n = this.defaultLocations_ : (n = new function (t, i) { this.u_texCoordMatrix = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_texCoordMatrix" : "d"), this.u_projectionMatrix = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_projectionMatrix" : "e"), this.u_opacity = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_opacity" : "f"), this.u_texture = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_texture" : "g"), this.a_position = t.getAttribLocation(i, e._ol_.DEBUG_WEBGL ? "a_position" : "b"), this.a_texCoord = t.getAttribLocation(i, e._ol_.DEBUG_WEBGL ? "a_texCoord" : "c"); }(r, l), this.defaultLocations_ = n), o.useProgram(l) && (r.enableVertexAttribArray(n.a_position), r.vertexAttribPointer(n.a_position, 2, e._ol_webgl_.FLOAT, !1, 16, 0), r.enableVertexAttribArray(n.a_texCoord), r.vertexAttribPointer(n.a_texCoord, 2, e._ol_webgl_.FLOAT, !1, 16, 8), r.uniform1i(n.u_texture, 0)), r.uniformMatrix4fv(n.u_texCoordMatrix, !1, Bt(this.tmpMat4_, this.getTexCoordMatrix())), r.uniformMatrix4fv(n.u_projectionMatrix, !1, Bt(this.tmpMat4_, this.getProjectionMatrix())), r.uniform1f(n.u_opacity, i.opacity), r.bindTexture(e._ol_webgl_.TEXTURE_2D, this.getTexture()), r.drawArrays(e._ol_webgl_.TRIANGLE_STRIP, 0, 4), this.dispatchComposeEvent_(e._ol_render_EventType_.POSTCOMPOSE, o, t); }, ae.prototype.dispatchComposeEvent_ = function (t, e, i) { var o = this.getLayer(); if (o.hasListener(t)) {
    var n = i.viewState, r = n.resolution, s = i.pixelRatio, a = i.extent, l = n.center, _ = n.rotation, h = i.size, c = new re(e, l, r, _, h, a, s), u = new ht(t, c, i, null, e);
    o.dispatchEvent(u);
} }, ae.prototype.getTexCoordMatrix = function () { return this.texCoordMatrix; }, ae.prototype.getTexture = function () { return this.texture; }, ae.prototype.getProjectionMatrix = function () { return this.projectionMatrix; }, ae.prototype.handleWebGLContextLost = function () { this.texture = null, this.framebuffer = null, this.framebufferDimension = void 0; }, ae.prototype.prepareFrame = function (t, e, i) { }, ae.prototype.forEachLayerAtPixel = function (t, e, i, o) { }; var le = function (t, e) { ae.call(this, t, e), this.image_ = null, this.hitCanvasContext_ = null, this.hitTransformationMatrix_ = null; }; e._ol_.inherits(le, ae), le.handles = function (t, i) { return "webgl" === t && i.getType() === e._ol_LayerType_.IMAGE; }, le.create = function (t, e) { return new le(t, e); }, le.prototype.createTexture_ = function (t) { var i = t.getImage(), o = this.mapRenderer.getGL(); return zt.createTexture(o, i, e._ol_webgl_.CLAMP_TO_EDGE, e._ol_webgl_.CLAMP_TO_EDGE); }, le.prototype.forEachFeatureAtCoordinate = function (t, e, i, o, n) { var r = this.getLayer(), s = r.getSource(), a = e.viewState.resolution, l = e.viewState.rotation, _ = e.skippedFeatureUids; return s.forEachFeatureAtCoordinate(t, a, l, i, _, function (t) { return o.call(n, t, r); }); }, le.prototype.prepareFrame = function (t, i, o) { var n = this.mapRenderer.getGL(), r = t.pixelRatio, s = t.viewState, a = s.center, l = s.resolution, _ = s.rotation, h = this.image_, c = this.texture, u = this.getLayer().getSource(), d = t.viewHints, p = t.extent; if (void 0 !== i.extent && (p = e._ol_extent_.getIntersection(p, i.extent)), !d[0] && !d[1] && !e._ol_extent_.isEmpty(p)) {
    var f = s.projection;
    if (!e._ol_.ENABLE_RASTER_REPROJECTION) {
        var g = u.getProjection();
        g && (f = g);
    }
    var v = u.getImage(p, l, r, f);
    if (v && this.loadImage(v) && (h = v, c = this.createTexture_(v), this.texture)) {
        var y = function (t, e) { t.isContextLost() || t.deleteTexture(e); }.bind(null, n, this.texture);
        t.postRenderFunctions.push(y);
    }
} if (h) {
    var m = this.mapRenderer.getContext().getCanvas();
    this.updateProjectionMatrix_(m.width, m.height, r, a, l, _, h.getExtent()), this.hitTransformationMatrix_ = null;
    var x = this.texCoordMatrix;
    e._ol_transform_.reset(x), e._ol_transform_.scale(x, 1, -1), e._ol_transform_.translate(x, 0, -1), this.image_ = h, this.texture = c, this.updateLogos(t, u);
} return !!h; }, le.prototype.updateProjectionMatrix_ = function (t, i, o, n, r, s, a) { var l = t * r, _ = i * r, h = this.projectionMatrix; e._ol_transform_.reset(h), e._ol_transform_.scale(h, 2 * o / l, 2 * o / _), e._ol_transform_.rotate(h, -s), e._ol_transform_.translate(h, a[0] - n[0], a[1] - n[1]), e._ol_transform_.scale(h, (a[2] - a[0]) / 2, (a[3] - a[1]) / 2), e._ol_transform_.translate(h, 1, 1); }, le.prototype.hasFeatureAtCoordinate = function (t, i) { return void 0 !== this.forEachFeatureAtCoordinate(t, i, 0, e._ol_functions_.TRUE, this); }, le.prototype.forEachLayerAtPixel = function (t, i, o, n) { if (this.image_ && this.image_.getImage()) {
    if (this.getLayer().getSource().forEachFeatureAtCoordinate !== e._ol_.nullFunction) {
        var r = e._ol_transform_.apply(i.pixelToCoordinateTransform, t.slice());
        return this.forEachFeatureAtCoordinate(r, i, 0, e._ol_functions_.TRUE, this) ? o.call(n, this.getLayer(), null) : void 0;
    }
    var s = [this.image_.getImage().width, this.image_.getImage().height];
    this.hitTransformationMatrix_ || (this.hitTransformationMatrix_ = this.getHitTransformationMatrix_(i.size, s));
    var a = e._ol_transform_.apply(this.hitTransformationMatrix_, t.slice());
    if (!(a[0] < 0 || a[0] > s[0] || a[1] < 0 || a[1] > s[1])) {
        this.hitCanvasContext_ || (this.hitCanvasContext_ = e._ol_dom_.createCanvasContext2D(1, 1)), this.hitCanvasContext_.clearRect(0, 0, 1, 1), this.hitCanvasContext_.drawImage(this.image_.getImage(), a[0], a[1], 1, 1, 0, 0, 1, 1);
        var l = this.hitCanvasContext_.getImageData(0, 0, 1, 1).data;
        return l[3] > 0 ? o.call(n, this.getLayer(), l) : void 0;
    }
} }, le.prototype.getHitTransformationMatrix_ = function (t, i) { var o = e._ol_transform_.create(); e._ol_transform_.translate(o, -1, -1), e._ol_transform_.scale(o, 2 / t[0], 2 / t[1]), e._ol_transform_.translate(o, 0, t[1]), e._ol_transform_.scale(o, 1, -1); var n = e._ol_transform_.invert(this.projectionMatrix.slice()), r = e._ol_transform_.create(); return e._ol_transform_.translate(r, 0, i[1]), e._ol_transform_.scale(r, 1, -1), e._ol_transform_.scale(r, i[0] / 2, i[1] / 2), e._ol_transform_.translate(r, 1, 1), e._ol_transform_.multiply(r, n), e._ol_transform_.multiply(r, o), r; }; var _e = function (t, i) { vt.call(this, t, i), this.canvas_ = document.createElement("CANVAS"), this.canvas_.style.width = "100%", this.canvas_.style.height = "100%", this.canvas_.style.display = "block", this.canvas_.className = e._ol_css_.CLASS_UNSELECTABLE, t.insertBefore(this.canvas_, t.childNodes[0] || null), this.clipTileCanvasWidth_ = 0, this.clipTileCanvasHeight_ = 0, this.clipTileContext_ = e._ol_dom_.createCanvasContext2D(), this.renderedVisible_ = !0, this.gl_ = e._ol_webgl_.getContext(this.canvas_, { antialias: !0, depth: !0, failIfMajorPerformanceCaveat: !0, preserveDrawingBuffer: !1, stencil: !0 }), this.context_ = new zt(this.canvas_, this.gl_), e._ol_events_.listen(this.canvas_, "webglcontextlost", this.handleWebGLContextLost, this), e._ol_events_.listen(this.canvas_, "webglcontextrestored", this.handleWebGLContextRestored, this), this.textureCache_ = new e._ol_structs_LRUCache_, this.focus_ = null, this.tileTextureQueue_ = new f(function (t) { var e = t[1], i = t[2], o = e[0] - this.focus_[0], n = e[1] - this.focus_[1]; return 65536 * Math.log(i) + Math.sqrt(o * o + n * n) / i; }.bind(this), function (t) { return t[0].getKey(); }), this.loadNextTileTexture_ = function (t, i) { if (!this.tileTextureQueue_.isEmpty()) {
    this.tileTextureQueue_.reprioritize();
    var o = this.tileTextureQueue_.dequeue(), n = o[0], r = o[3], s = o[4];
    this.bindTileTexture(n, r, s, e._ol_webgl_.LINEAR, e._ol_webgl_.LINEAR);
} return !1; }.bind(this), this.textureCacheFrameMarkerCount_ = 0, this.initializeGL_(); }; e._ol_.inherits(_e, vt), _e.handles = function (t) { return e._ol_has_.WEBGL && "webgl" === t; }, _e.create = function (t, e) { return new _e(t, e); }, _e.prototype.bindTileTexture = function (t, i, o, n, r) { var s = this.getGL(), a = t.getKey(); if (this.textureCache_.containsKey(a)) {
    var l = this.textureCache_.get(a);
    s.bindTexture(e._ol_webgl_.TEXTURE_2D, l.texture), l.magFilter != n && (s.texParameteri(e._ol_webgl_.TEXTURE_2D, e._ol_webgl_.TEXTURE_MAG_FILTER, n), l.magFilter = n), l.minFilter != r && (s.texParameteri(e._ol_webgl_.TEXTURE_2D, e._ol_webgl_.TEXTURE_MIN_FILTER, r), l.minFilter = r);
}
else {
    var _ = s.createTexture();
    if (s.bindTexture(e._ol_webgl_.TEXTURE_2D, _), o > 0) {
        var h = this.clipTileContext_.canvas, c = this.clipTileContext_;
        this.clipTileCanvasWidth_ !== i[0] || this.clipTileCanvasHeight_ !== i[1] ? (h.width = i[0], h.height = i[1], this.clipTileCanvasWidth_ = i[0], this.clipTileCanvasHeight_ = i[1]) : c.clearRect(0, 0, i[0], i[1]), c.drawImage(t.getImage(), o, o, i[0], i[1], 0, 0, i[0], i[1]), s.texImage2D(e._ol_webgl_.TEXTURE_2D, 0, e._ol_webgl_.RGBA, e._ol_webgl_.RGBA, e._ol_webgl_.UNSIGNED_BYTE, h);
    }
    else
        s.texImage2D(e._ol_webgl_.TEXTURE_2D, 0, e._ol_webgl_.RGBA, e._ol_webgl_.RGBA, e._ol_webgl_.UNSIGNED_BYTE, t.getImage());
    s.texParameteri(e._ol_webgl_.TEXTURE_2D, e._ol_webgl_.TEXTURE_MAG_FILTER, n), s.texParameteri(e._ol_webgl_.TEXTURE_2D, e._ol_webgl_.TEXTURE_MIN_FILTER, r), s.texParameteri(e._ol_webgl_.TEXTURE_2D, e._ol_webgl_.TEXTURE_WRAP_S, e._ol_webgl_.CLAMP_TO_EDGE), s.texParameteri(e._ol_webgl_.TEXTURE_2D, e._ol_webgl_.TEXTURE_WRAP_T, e._ol_webgl_.CLAMP_TO_EDGE), this.textureCache_.set(a, { texture: _, magFilter: n, minFilter: r });
} }, _e.prototype.dispatchComposeEvent_ = function (t, e) { var i = this.getMap(); if (i.hasListener(t)) {
    var o = this.context_, n = e.extent, r = e.size, s = e.viewState, a = e.pixelRatio, l = s.resolution, _ = s.center, h = s.rotation, c = new re(o, _, l, h, r, n, a), u = new ht(t, c, e, null, o);
    i.dispatchEvent(u);
} }, _e.prototype.disposeInternal = function () { var t = this.getGL(); t.isContextLost() || this.textureCache_.forEach(function (e) { e && t.deleteTexture(e.texture); }), this.context_.dispose(), vt.prototype.disposeInternal.call(this); }, _e.prototype.expireCache_ = function (t, i) { for (var o, n = this.getGL(); this.textureCache_.getCount() - this.textureCacheFrameMarkerCount_ > e._ol_.WEBGL_TEXTURE_CACHE_HIGH_WATER_MARK;) {
    if (o = this.textureCache_.peekLast())
        n.deleteTexture(o.texture);
    else {
        if (+this.textureCache_.peekLastKey() == i.index)
            break;
        --this.textureCacheFrameMarkerCount_;
    }
    this.textureCache_.pop();
} }, _e.prototype.getContext = function () { return this.context_; }, _e.prototype.getGL = function () { return this.gl_; }, _e.prototype.getTileTextureQueue = function () { return this.tileTextureQueue_; }, _e.prototype.getType = function () { return "webgl"; }, _e.prototype.handleWebGLContextLost = function (t) { t.preventDefault(), this.textureCache_.clear(), this.textureCacheFrameMarkerCount_ = 0; var e = this.getLayerRenderers(); for (var i in e)
    e[i].handleWebGLContextLost(); }, _e.prototype.handleWebGLContextRestored = function () { this.initializeGL_(), this.getMap().render(); }, _e.prototype.initializeGL_ = function () { var t = this.gl_; t.activeTexture(e._ol_webgl_.TEXTURE0), t.blendFuncSeparate(e._ol_webgl_.SRC_ALPHA, e._ol_webgl_.ONE_MINUS_SRC_ALPHA, e._ol_webgl_.ONE, e._ol_webgl_.ONE_MINUS_SRC_ALPHA), t.disable(e._ol_webgl_.CULL_FACE), t.disable(e._ol_webgl_.DEPTH_TEST), t.disable(e._ol_webgl_.SCISSOR_TEST), t.disable(e._ol_webgl_.STENCIL_TEST); }, _e.prototype.isTileTextureLoaded = function (t) { return this.textureCache_.containsKey(t.getKey()); }, _e.prototype.renderFrame = function (t) { var i = this.getContext(), o = this.getGL(); if (o.isContextLost())
    return !1; if (!t)
    return this.renderedVisible_ && (this.canvas_.style.display = "none", this.renderedVisible_ = !1), !1; this.focus_ = t.focus, this.textureCache_.set((-t.index).toString(), null), ++this.textureCacheFrameMarkerCount_, this.dispatchComposeEvent_(e._ol_render_EventType_.PRECOMPOSE, t); var n = [], r = t.layerStatesArray; e._ol_array_.stableSort(r, vt.sortByZIndex); var s, a, l, _ = t.viewState.resolution; for (s = 0, a = r.length; s < a; ++s)
    l = r[s], e._ol_layer_Layer_.visibleAtResolution(l, _) && l.sourceState == e._ol_source_State_.READY && this.getLayerRenderer(l.layer).prepareFrame(t, l, i) && n.push(l); var h = t.size[0] * t.pixelRatio, c = t.size[1] * t.pixelRatio; for (this.canvas_.width == h && this.canvas_.height == c || (this.canvas_.width = h, this.canvas_.height = c), o.bindFramebuffer(e._ol_webgl_.FRAMEBUFFER, null), o.clearColor(0, 0, 0, 0), o.clear(e._ol_webgl_.COLOR_BUFFER_BIT), o.enable(e._ol_webgl_.BLEND), o.viewport(0, 0, this.canvas_.width, this.canvas_.height), s = 0, a = n.length; s < a; ++s)
    l = n[s], this.getLayerRenderer(l.layer).composeFrame(t, l, i); this.renderedVisible_ || (this.canvas_.style.display = "", this.renderedVisible_ = !0), this.calculateMatrices2D(t), this.textureCache_.getCount() - this.textureCacheFrameMarkerCount_ > e._ol_.WEBGL_TEXTURE_CACHE_HIGH_WATER_MARK && t.postRenderFunctions.push(this.expireCache_.bind(this)), this.tileTextureQueue_.isEmpty() || (t.postRenderFunctions.push(this.loadNextTileTexture_), t.animate = !0), this.dispatchComposeEvent_(e._ol_render_EventType_.POSTCOMPOSE, t), this.scheduleRemoveUnusedLayerRenderers(t), this.scheduleExpireIconCache(t); }, _e.prototype.forEachFeatureAtCoordinate = function (t, i, o, n, r, s, a) { var l; if (this.getGL().isContextLost())
    return !1; var _, h = i.viewState, c = i.layerStatesArray; for (_ = c.length - 1; _ >= 0; --_) {
    var u = c[_], d = u.layer;
    if (e._ol_layer_Layer_.visibleAtResolution(u, h.resolution) && s.call(a, d) && (l = this.getLayerRenderer(d).forEachFeatureAtCoordinate(t, i, o, n, r)))
        return l;
} }, _e.prototype.hasFeatureAtCoordinate = function (t, i, o, n, r) { var s = !1; if (this.getGL().isContextLost())
    return !1; var a, l = i.viewState, _ = i.layerStatesArray; for (a = _.length - 1; a >= 0; --a) {
    var h = _[a], c = h.layer;
    if (e._ol_layer_Layer_.visibleAtResolution(h, l.resolution) && n.call(r, c) && (s = this.getLayerRenderer(c).hasFeatureAtCoordinate(t, i)))
        return !0;
} return s; }, _e.prototype.forEachLayerAtPixel = function (t, i, o, n, r, s) { if (this.getGL().isContextLost())
    return !1; var a, l, _ = i.viewState, h = i.layerStatesArray; for (l = h.length - 1; l >= 0; --l) {
    var c = h[l], u = c.layer;
    if (e._ol_layer_Layer_.visibleAtResolution(c, _.resolution) && r.call(n, u) && (a = this.getLayerRenderer(u).forEachLayerAtPixel(t, i, o, n)))
        return a;
} }; var he = {}; he.fragment = new Gt(e._ol_.DEBUG_WEBGL ? "precision mediump float;\nvarying vec2 v_texCoord;\n\n\nuniform sampler2D u_texture;\n\nvoid main(void) {\n  gl_FragColor = texture2D(u_texture, v_texCoord);\n}\n" : "precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor=texture2D(e,a);}"), he.vertex = new kt(e._ol_.DEBUG_WEBGL ? "varying vec2 v_texCoord;\n\n\nattribute vec2 a_position;\nattribute vec2 a_texCoord;\nuniform vec4 u_tileOffset;\n\nvoid main(void) {\n  gl_Position = vec4(a_position * u_tileOffset.xy + u_tileOffset.zw, 0., 1.);\n  v_texCoord = a_texCoord;\n}\n\n\n" : "varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position=vec4(b*d.xy+d.zw,0.,1.);a=c;}"); var ce = function (t, e) { ae.call(this, t, e), this.fragmentShader_ = he.fragment, this.vertexShader_ = he.vertex, this.locations_ = null, this.renderArrayBuffer_ = new Vt([0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0]), this.renderedTileRange_ = null, this.renderedFramebufferExtent_ = null, this.renderedRevision_ = -1, this.tmpSize_ = [0, 0]; }; e._ol_.inherits(ce, ae), ce.handles = function (t, i) { return "webgl" === t && i.getType() === e._ol_LayerType_.TILE; }, ce.create = function (t, e) { return new ce(t, e); }, ce.prototype.disposeInternal = function () { this.mapRenderer.getContext().deleteBuffer(this.renderArrayBuffer_), ae.prototype.disposeInternal.call(this); }, ce.prototype.createLoadedTileFinder = function (t, e, i) { var o = this.mapRenderer; return function (n, r) { return t.forEachLoadedTile(e, n, r, function (t) { var e = o.isTileTextureLoaded(t); return e && (i[n] || (i[n] = {}), i[n][t.tileCoord.toString()] = t), e; }); }; }, ce.prototype.handleWebGLContextLost = function () { ae.prototype.handleWebGLContextLost.call(this), this.locations_ = null; }, ce.prototype.prepareFrame = function (t, i, o) { var n, r = this.mapRenderer, s = o.getGL(), a = t.viewState, l = a.projection, _ = this.getLayer(), h = _.getSource(), c = h.getTileGridForProjection(l), u = c.getZForResolution(a.resolution), d = c.getResolution(u), p = h.getTilePixelSize(u, t.pixelRatio, l), f = p[0] / e._ol_size_.toSize(c.getTileSize(u), this.tmpSize_)[0], g = d / f, v = h.getTilePixelRatio(f) * h.getGutter(l), y = a.center, m = t.extent, x = c.getTileRangeForExtentAndZ(m, u); if (this.renderedTileRange_ && this.renderedTileRange_.equals(x) && this.renderedRevision_ == h.getRevision())
    n = this.renderedFramebufferExtent_;
else {
    var E = x.getSize(), T = Math.max(E[0] * p[0], E[1] * p[1]), C = e._ol_math_.roundUpToPowerOfTwo(T), R = g * C, S = c.getOrigin(u), I = S[0] + x.minX * p[0] * g, L = S[1] + x.minY * p[1] * g;
    n = [I, L, I + R, L + R], this.bindFramebuffer(t, C), s.viewport(0, 0, C, C), s.clearColor(0, 0, 0, 0), s.clear(e._ol_webgl_.COLOR_BUFFER_BIT), s.disable(e._ol_webgl_.BLEND);
    var w = o.getProgram(this.fragmentShader_, this.vertexShader_);
    o.useProgram(w), this.locations_ || (this.locations_ = new function (t, i) { this.u_tileOffset = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_tileOffset" : "d"), this.u_texture = t.getUniformLocation(i, e._ol_.DEBUG_WEBGL ? "u_texture" : "e"), this.a_position = t.getAttribLocation(i, e._ol_.DEBUG_WEBGL ? "a_position" : "b"), this.a_texCoord = t.getAttribLocation(i, e._ol_.DEBUG_WEBGL ? "a_texCoord" : "c"); }(s, w)), o.bindBuffer(e._ol_webgl_.ARRAY_BUFFER, this.renderArrayBuffer_), s.enableVertexAttribArray(this.locations_.a_position), s.vertexAttribPointer(this.locations_.a_position, 2, e._ol_webgl_.FLOAT, !1, 16, 0), s.enableVertexAttribArray(this.locations_.a_texCoord), s.vertexAttribPointer(this.locations_.a_texCoord, 2, e._ol_webgl_.FLOAT, !1, 16, 8), s.uniform1i(this.locations_.u_texture, 0);
    var b = {};
    b[u] = {};
    var A, P, D, F, O, M, G = this.createLoadedTileFinder(h, l, b), k = _.getUseInterimTilesOnError(), N = !0, U = e._ol_extent_.createEmpty(), B = new e._ol_TileRange_(0, 0, 0, 0);
    for (F = x.minX; F <= x.maxX; ++F)
        for (O = x.minY; O <= x.maxY; ++O)
            if (P = h.getTile(u, F, O, f, l), void 0 === i.extent || (M = c.getTileCoordExtent(P.tileCoord, U), e._ol_extent_.intersects(M, i.extent))) {
                if (2 == (D = P.getState()) || 4 == D || 3 == D && !k || (P = P.getInterimTile()), 2 == (D = P.getState())) {
                    if (r.isTileTextureLoaded(P)) {
                        b[u][P.tileCoord.toString()] = P;
                        continue;
                    }
                }
                else if (4 == D || 3 == D && !k)
                    continue;
                N = !1, c.forEachTileCoordParentTileRange(P.tileCoord, G, null, B, U) || (A = c.getTileCoordChildTileRange(P.tileCoord, B, U)) && G(u + 1, A);
            }
    var W = Object.keys(b).map(Number);
    W.sort(e._ol_array_.numberSafeCompareFunction);
    var j, V, X, K, z = new Float32Array(4);
    for (j = 0, V = W.length; j < V; ++j)
        for (X in K = b[W[j]])
            P = K[X], M = c.getTileCoordExtent(P.tileCoord, U), z[0] = 2 * (M[2] - M[0]) / R, z[1] = 2 * (M[3] - M[1]) / R, z[2] = 2 * (M[0] - n[0]) / R - 1, z[3] = 2 * (M[1] - n[1]) / R - 1, s.uniform4fv(this.locations_.u_tileOffset, z), r.bindTileTexture(P, p, v * f, e._ol_webgl_.LINEAR, e._ol_webgl_.LINEAR), s.drawArrays(e._ol_webgl_.TRIANGLE_STRIP, 0, 4);
    N ? (this.renderedTileRange_ = x, this.renderedFramebufferExtent_ = n, this.renderedRevision_ = h.getRevision()) : (this.renderedTileRange_ = null, this.renderedFramebufferExtent_ = null, this.renderedRevision_ = -1, t.animate = !0);
} this.updateUsedTiles(t.usedTiles, h, u, x); var H = r.getTileTextureQueue(); this.manageTilePyramid(t, h, c, f, l, m, u, _.getPreload(), function (t) { 2 != t.getState() || r.isTileTextureLoaded(t) || H.isKeyQueued(t.getKey()) || H.enqueue([t, c.getTileCoordCenter(t.tileCoord), c.getResolution(t.tileCoord[0]), p, v * f]); }, this), this.scheduleExpireCache(t, h), this.updateLogos(t, h); var Y = this.texCoordMatrix; return e._ol_transform_.reset(Y), e._ol_transform_.translate(Y, (Math.round(y[0] / d) * d - n[0]) / (n[2] - n[0]), (Math.round(y[1] / d) * d - n[1]) / (n[3] - n[1])), 0 !== a.rotation && e._ol_transform_.rotate(Y, a.rotation), e._ol_transform_.scale(Y, t.size[0] * a.resolution / (n[2] - n[0]), t.size[1] * a.resolution / (n[3] - n[1])), e._ol_transform_.translate(Y, -.5, -.5), !0; }, ce.prototype.forEachLayerAtPixel = function (t, i, o, n) { if (this.framebuffer) {
    var r = [t[0] / i.size[0], (i.size[1] - t[1]) / i.size[1]], s = e._ol_transform_.apply(this.texCoordMatrix, r.slice()), a = [s[0] * this.framebufferDimension, s[1] * this.framebufferDimension], l = this.mapRenderer.getContext().getGL();
    l.bindFramebuffer(l.FRAMEBUFFER, this.framebuffer);
    var _ = new Uint8Array(4);
    return l.readPixels(a[0], a[1], 1, 1, l.RGBA, l.UNSIGNED_BYTE, _), _[3] > 0 ? o.call(n, this.getLayer(), _) : void 0;
} }; var ue = function (t, i) { ae.call(this, t, i), this.dirty_ = !1, this.renderedRevision_ = -1, this.renderedResolution_ = NaN, this.renderedExtent_ = e._ol_extent_.createEmpty(), this.renderedRenderOrder_ = null, this.replayGroup_ = null, this.layerState_ = null; }; e._ol_.inherits(ue, ae), ue.handles = function (t, i) { return "webgl" === t && i.getType() === e._ol_LayerType_.VECTOR; }, ue.create = function (t, e) { return new ue(t, e); }, ue.prototype.composeFrame = function (t, e, i) { this.layerState_ = e; var o = t.viewState, n = this.replayGroup_, r = t.size, s = t.pixelRatio, a = this.mapRenderer.getGL(); n && !n.isEmpty() && (a.enable(a.SCISSOR_TEST), a.scissor(0, 0, r[0] * s, r[1] * s), n.replay(i, o.center, o.resolution, o.rotation, r, s, e.opacity, e.managed ? t.skippedFeatureUids : {}), a.disable(a.SCISSOR_TEST)); }, ue.prototype.disposeInternal = function () { var t = this.replayGroup_; if (t) {
    var e = this.mapRenderer.getContext();
    t.getDeleteResourcesFunction(e)(), this.replayGroup_ = null;
} ae.prototype.disposeInternal.call(this); }, ue.prototype.forEachFeatureAtCoordinate = function (t, i, o, n, r) { if (this.replayGroup_ && this.layerState_) {
    var s = this.mapRenderer.getContext(), a = i.viewState, l = this.getLayer(), _ = this.layerState_, h = {};
    return this.replayGroup_.forEachFeatureAtCoordinate(t, s, a.center, a.resolution, a.rotation, i.size, i.pixelRatio, _.opacity, {}, function (t) { var i = e._ol_.getUid(t).toString(); if (!(i in h))
        return h[i] = !0, n.call(r, t, l); });
} }, ue.prototype.hasFeatureAtCoordinate = function (t, e) { if (this.replayGroup_ && this.layerState_) {
    var i = this.mapRenderer.getContext(), o = e.viewState, n = this.layerState_;
    return this.replayGroup_.hasFeatureAtCoordinate(t, i, o.center, o.resolution, o.rotation, e.size, e.pixelRatio, n.opacity, e.skippedFeatureUids);
} return !1; }, ue.prototype.forEachLayerAtPixel = function (t, i, o, n) { var r = e._ol_transform_.apply(i.pixelToCoordinateTransform, t.slice()); return this.hasFeatureAtCoordinate(r, i) ? o.call(n, this.getLayer(), null) : void 0; }, ue.prototype.handleStyleImageChange_ = function (t) { this.renderIfReadyAndVisible(); }, ue.prototype.prepareFrame = function (t, i, o) { var n = this.getLayer(), r = n.getSource(); this.updateLogos(t, r); var s = t.viewHints[0], a = t.viewHints[1], l = n.getUpdateWhileAnimating(), _ = n.getUpdateWhileInteracting(); if (!this.dirty_ && !l && s || !_ && a)
    return !0; var h = t.extent, c = t.viewState, u = c.projection, d = c.resolution, p = t.pixelRatio, f = n.getRevision(), g = n.getRenderBuffer(), v = n.getRenderOrder(); void 0 === v && (v = Dt.defaultOrder); var y = e._ol_extent_.buffer(h, g * d); if (!this.dirty_ && this.renderedResolution_ == d && this.renderedRevision_ == f && this.renderedRenderOrder_ == v && e._ol_extent_.containsExtent(this.renderedExtent_, y))
    return !0; this.replayGroup_ && t.postRenderFunctions.push(this.replayGroup_.getDeleteResourcesFunction(o)), this.dirty_ = !1; var m = new ne(Dt.getTolerance(d, p), y, n.getRenderBuffer()); r.loadFeatures(y, d, u); var x = function (t) { var e, i = t.getStyleFunction(); if (i ? e = i.call(t, d) : (i = n.getStyleFunction()) && (e = i(t, d)), e) {
    var o = this.renderFeature(t, d, p, e, m);
    this.dirty_ = this.dirty_ || o;
} }; if (v) {
    var E = [];
    r.forEachFeatureInExtent(y, function (t) { E.push(t); }, this), E.sort(v), E.forEach(x, this);
}
else
    r.forEachFeatureInExtent(y, x, this); return m.finish(o), this.renderedResolution_ = d, this.renderedRevision_ = f, this.renderedRenderOrder_ = v, this.renderedExtent_ = y, this.replayGroup_ = m, !0; }, ue.prototype.renderFeature = function (t, e, i, o, n) { if (!o)
    return !1; var r = !1; if (Array.isArray(o))
    for (var s = o.length - 1; s >= 0; --s)
        r = Dt.renderFeature(n, t, o[s], Dt.getSquaredTolerance(e, i), this.handleStyleImageChange_, this) || r;
else
    r = Dt.renderFeature(n, t, o, Dt.getSquaredTolerance(e, i), this.handleStyleImageChange_, this) || r; return r; }, e._ol_.ENABLE_CANVAS && (U.register("MAP_RENDERER", yt), U.registerMultiple("LAYER_RENDERER", [gt, mt, Ft, Ot])), e._ol_.ENABLE_WEBGL && (U.register("MAP_RENDERER", _e), U.registerMultiple("LAYER_RENDERER", [le, ce, ue])); var de = function (t) { (t = e._ol_obj_.assign({}, t)).controls || (t.controls = K()), t.interactions || (t.interactions = at()), B.call(this, t); }; e._ol_.inherits(de, B); var pe = function (t) { var i = t || {}, o = e._ol_obj_.assign({}, i); delete o.preload, delete o.useInterimTilesOnError, e._ol_layer_Layer_.call(this, o), this.setPreload(void 0 !== i.preload ? i.preload : 0), this.setUseInterimTilesOnError(void 0 === i.useInterimTilesOnError || i.useInterimTilesOnError), this.type = e._ol_LayerType_.TILE; }; e._ol_.inherits(pe, e._ol_layer_Layer_), pe.prototype.getPreload = function () { return this.get("preload"); }, pe.prototype.setPreload = function (t) { this.set("preload", t); }, pe.prototype.getUseInterimTilesOnError = function () { return this.get("useInterimTilesOnError"); }, pe.prototype.setUseInterimTilesOnError = function (t) { this.set("useInterimTilesOnError", t); }; var fe = function (t, i, o) { e._ol_events_EventTarget_.call(this); var n = o || {}; this.tileCoord = t, this.state = i, this.interimTile = null, this.key = "", this.transition_ = void 0 === n.transition ? 250 : n.transition, this.transitionStarts_ = {}; }; e._ol_.inherits(fe, e._ol_events_EventTarget_), fe.prototype.changed = function () { this.dispatchEvent(e._ol_events_EventType_.CHANGE); }, fe.prototype.getKey = function () { return this.key + "/" + this.tileCoord; }, fe.prototype.getInterimTile = function () { if (!this.interimTile)
    return this; var t = this.interimTile; do {
    if (2 == t.getState())
        return t;
    t = t.interimTile;
} while (t); return this; }, fe.prototype.refreshInterimChain = function () { if (this.interimTile) {
    var t = this.interimTile, e = this;
    do {
        if (2 == t.getState()) {
            t.interimTile = null;
            break;
        }
        1 == t.getState() ? e = t : 0 == t.getState() ? e.interimTile = t.interimTile : e = t, t = e.interimTile;
    } while (t);
} }, fe.prototype.getTileCoord = function () { return this.tileCoord; }, fe.prototype.getState = function () { return this.state; }, fe.prototype.setState = function (t) { this.state = t, this.changed(); }, fe.prototype.load = function () { }, fe.prototype.getAlpha = function (t, e) { if (!this.transition_)
    return 1; var i = this.transitionStarts_[t]; if (i) {
    if (-1 === i)
        return 1;
}
else
    i = e, this.transitionStarts_[t] = i; var o = e - i + 1e3 / 60; return o >= this.transition_ ? 1 : C.easeIn(o / this.transition_); }, fe.prototype.inTransition = function (t) { return !!this.transition_ && -1 !== this.transitionStarts_[t]; }, fe.prototype.endTransition = function (t) { this.transition_ && (this.transitionStarts_[t] = -1); }; var ge = function (t, e, i, o, n, r) { fe.call(this, t, e, r), this.crossOrigin_ = o, this.src_ = i, this.image_ = new Image, null !== o && (this.image_.crossOrigin = o), this.imageListenerKeys_ = null, this.tileLoadFunction_ = n; }; e._ol_.inherits(ge, fe), ge.prototype.disposeInternal = function () { 1 == this.state && (this.unlistenImage_(), this.image_ = ge.getBlankImage()), this.interimTile && this.interimTile.dispose(), this.state = 5, this.changed(), fe.prototype.disposeInternal.call(this); }, ge.prototype.getImage = function () { return this.image_; }, ge.prototype.getKey = function () { return this.src_; }, ge.prototype.handleImageError_ = function () { this.state = 3, this.unlistenImage_(), this.image_ = ge.getBlankImage(), this.changed(); }, ge.prototype.handleImageLoad_ = function () { this.image_.naturalWidth && this.image_.naturalHeight ? this.state = 2 : this.state = 4, this.unlistenImage_(), this.changed(); }, ge.prototype.load = function () { 3 == this.state && (this.state = 0, this.image_ = new Image, null !== this.crossOrigin_ && (this.image_.crossOrigin = this.crossOrigin_)), 0 == this.state && (this.state = 1, this.changed(), this.imageListenerKeys_ = [e._ol_events_.listenOnce(this.image_, e._ol_events_EventType_.ERROR, this.handleImageError_, this), e._ol_events_.listenOnce(this.image_, e._ol_events_EventType_.LOAD, this.handleImageLoad_, this)], this.tileLoadFunction_(this, this.src_)); }, ge.prototype.unlistenImage_ = function () { this.imageListenerKeys_.forEach(e._ol_events_.unlistenByKey), this.imageListenerKeys_ = null; }, ge.getBlankImage = function () { var t = e._ol_dom_.createCanvasContext2D(1, 1); return t.fillStyle = "rgba(0,0,0,0)", t.fillRect(0, 0, 1, 1), t.canvas; }; var ve = function (t) { e._ol_structs_LRUCache_.call(this, t); }; e._ol_.inherits(ve, e._ol_structs_LRUCache_), ve.prototype.expireCache = function (t) { for (var e, i; this.canExpireCache() && !((i = (e = this.peekLast()).tileCoord[0].toString()) in t && t[i].contains(e.tileCoord));)
    this.pop().dispose(); }, ve.prototype.pruneExceptNewestZ = function () { if (0 !== this.getCount()) {
    var t = this.peekFirstKey(), i = e._ol_tilecoord_.fromKey(t)[0];
    this.forEach(function (t) { t.tileCoord[0] !== i && (this.remove(e._ol_tilecoord_.getKey(t.tileCoord)), t.dispose()); }, this);
} }; var ye = { calculateSourceResolution: function (t, i, o, n) { var r = e._ol_proj_.transform(o, i, t), s = e._ol_proj_.getPointResolution(i, n, o), a = i.getMetersPerUnit(); void 0 !== a && (s *= a); var l = t.getMetersPerUnit(); void 0 !== l && (s /= l); var _ = t.getExtent(); if (!_ || e._ol_extent_.containsCoordinate(_, r)) {
        var h = e._ol_proj_.getPointResolution(t, s, r) / s;
        isFinite(h) && h > 0 && (s /= h);
    } return s; }, enlargeClipPoint_: function (t, e, i, o) { var n = i - t, r = o - e, s = Math.sqrt(n * n + r * r); return [Math.round(i + n / s), Math.round(o + r / s)]; }, render: function (t, i, o, n, r, s, a, l, _, h, c) { var u = e._ol_dom_.createCanvasContext2D(Math.round(o * t), Math.round(o * i)); if (0 === _.length)
        return u.canvas; u.scale(o, o); var d = e._ol_extent_.createEmpty(); _.forEach(function (t, i, o) { e._ol_extent_.extend(d, t.extent); }); var p = e._ol_extent_.getWidth(d), f = e._ol_extent_.getHeight(d), g = e._ol_dom_.createCanvasContext2D(Math.round(o * p / n), Math.round(o * f / n)), v = o / n; _.forEach(function (t, i, o) { var n = t.extent[0] - d[0], r = -(t.extent[3] - d[3]), s = e._ol_extent_.getWidth(t.extent), a = e._ol_extent_.getHeight(t.extent); g.drawImage(t.image, h, h, t.image.width - 2 * h, t.image.height - 2 * h, n * v, r * v, s * v, a * v); }); var y = e._ol_extent_.getTopLeft(a); return l.getTriangles().forEach(function (t, i, r) { var a = t.source, l = t.target, _ = a[0][0], h = a[0][1], c = a[1][0], p = a[1][1], f = a[2][0], v = a[2][1], m = (l[0][0] - y[0]) / s, x = -(l[0][1] - y[1]) / s, E = (l[1][0] - y[0]) / s, T = -(l[1][1] - y[1]) / s, C = (l[2][0] - y[0]) / s, R = -(l[2][1] - y[1]) / s, S = _, I = h; _ = 0, h = 0; var L = [[c -= S, p -= I, 0, 0, E - m], [f -= S, v -= I, 0, 0, C - m], [0, 0, c, p, T - x], [0, 0, f, v, R - x]], w = e._ol_math_.solveLinearSystem(L); if (w) {
        u.save(), u.beginPath();
        var b = (m + E + C) / 3, A = (x + T + R) / 3, P = ye.enlargeClipPoint_(b, A, m, x), D = ye.enlargeClipPoint_(b, A, E, T), F = ye.enlargeClipPoint_(b, A, C, R);
        u.moveTo(D[0], D[1]), u.lineTo(P[0], P[1]), u.lineTo(F[0], F[1]), u.clip(), u.transform(w[0], w[2], w[1], w[3], m, x), u.translate(d[0] - S, d[3] - I), u.scale(n / o, -n / o), u.drawImage(g.canvas, 0, 0), u.restore();
    } }), c && (u.save(), u.strokeStyle = "black", u.lineWidth = 1, l.getTriangles().forEach(function (t, e, i) { var o = t.target, n = (o[0][0] - y[0]) / s, r = -(o[0][1] - y[1]) / s, a = (o[1][0] - y[0]) / s, l = -(o[1][1] - y[1]) / s, _ = (o[2][0] - y[0]) / s, h = -(o[2][1] - y[1]) / s; u.beginPath(), u.moveTo(a, l), u.lineTo(n, r), u.lineTo(_, h), u.closePath(), u.stroke(); }), u.restore()), u.canvas; } }, me = function (t, i, o, n, r) { this.sourceProj_ = t, this.targetProj_ = i; var s = {}, a = e._ol_proj_.getTransform(this.targetProj_, this.sourceProj_); this.transformInv_ = function (t) { var e = t[0] + "/" + t[1]; return s[e] || (s[e] = a(t)), s[e]; }, this.maxSourceExtent_ = n, this.errorThresholdSquared_ = r * r, this.triangles_ = [], this.wrapsXInSource_ = !1, this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!n && !!this.sourceProj_.getExtent() && e._ol_extent_.getWidth(n) == e._ol_extent_.getWidth(this.sourceProj_.getExtent()), this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? e._ol_extent_.getWidth(this.sourceProj_.getExtent()) : null, this.targetWorldWidth_ = this.targetProj_.getExtent() ? e._ol_extent_.getWidth(this.targetProj_.getExtent()) : null; var l = e._ol_extent_.getTopLeft(o), _ = e._ol_extent_.getTopRight(o), h = e._ol_extent_.getBottomRight(o), c = e._ol_extent_.getBottomLeft(o), u = this.transformInv_(l), d = this.transformInv_(_), p = this.transformInv_(h), f = this.transformInv_(c); if (this.addQuad_(l, _, h, c, u, d, p, f, e._ol_.RASTER_REPROJECTION_MAX_SUBDIVISION), this.wrapsXInSource_) {
    var g = 1 / 0;
    this.triangles_.forEach(function (t, e, i) { g = Math.min(g, t.source[0][0], t.source[1][0], t.source[2][0]); }), this.triangles_.forEach(function (t) { if (Math.max(t.source[0][0], t.source[1][0], t.source[2][0]) - g > this.sourceWorldWidth_ / 2) {
        var e = [[t.source[0][0], t.source[0][1]], [t.source[1][0], t.source[1][1]], [t.source[2][0], t.source[2][1]]];
        e[0][0] - g > this.sourceWorldWidth_ / 2 && (e[0][0] -= this.sourceWorldWidth_), e[1][0] - g > this.sourceWorldWidth_ / 2 && (e[1][0] -= this.sourceWorldWidth_), e[2][0] - g > this.sourceWorldWidth_ / 2 && (e[2][0] -= this.sourceWorldWidth_);
        var i = Math.min(e[0][0], e[1][0], e[2][0]);
        Math.max(e[0][0], e[1][0], e[2][0]) - i < this.sourceWorldWidth_ / 2 && (t.source = e);
    } }, this);
} s = {}; }; me.prototype.addTriangle_ = function (t, e, i, o, n, r) { this.triangles_.push({ source: [o, n, r], target: [t, e, i] }); }, me.prototype.addQuad_ = function (t, i, o, n, r, s, a, l, _) { var h = e._ol_extent_.boundingExtent([r, s, a, l]), c = this.sourceWorldWidth_ ? e._ol_extent_.getWidth(h) / this.sourceWorldWidth_ : null, u = this.sourceWorldWidth_, d = this.sourceProj_.canWrapX() && c > .5 && c < 1, p = !1; if (_ > 0) {
    if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
        var f = e._ol_extent_.boundingExtent([t, i, o, n]);
        p |= e._ol_extent_.getWidth(f) / this.targetWorldWidth_ > e._ol_.RASTER_REPROJECTION_MAX_TRIANGLE_WIDTH;
    }
    !d && this.sourceProj_.isGlobal() && c && (p |= c > e._ol_.RASTER_REPROJECTION_MAX_TRIANGLE_WIDTH);
} if (p || !this.maxSourceExtent_ || e._ol_extent_.intersects(h, this.maxSourceExtent_)) {
    if (!(p || isFinite(r[0]) && isFinite(r[1]) && isFinite(s[0]) && isFinite(s[1]) && isFinite(a[0]) && isFinite(a[1]) && isFinite(l[0]) && isFinite(l[1]))) {
        if (!(_ > 0))
            return;
        p = !0;
    }
    if (_ > 0) {
        if (!p) {
            var g, v = [(t[0] + o[0]) / 2, (t[1] + o[1]) / 2], y = this.transformInv_(v);
            g = d ? (e._ol_math_.modulo(r[0], u) + e._ol_math_.modulo(a[0], u)) / 2 - e._ol_math_.modulo(y[0], u) : (r[0] + a[0]) / 2 - y[0];
            var m = (r[1] + a[1]) / 2 - y[1];
            p = g * g + m * m > this.errorThresholdSquared_;
        }
        if (p) {
            if (Math.abs(t[0] - o[0]) <= Math.abs(t[1] - o[1])) {
                var x = [(i[0] + o[0]) / 2, (i[1] + o[1]) / 2], E = this.transformInv_(x), T = [(n[0] + t[0]) / 2, (n[1] + t[1]) / 2], C = this.transformInv_(T);
                this.addQuad_(t, i, x, T, r, s, E, C, _ - 1), this.addQuad_(T, x, o, n, C, E, a, l, _ - 1);
            }
            else {
                var R = [(t[0] + i[0]) / 2, (t[1] + i[1]) / 2], S = this.transformInv_(R), I = [(o[0] + n[0]) / 2, (o[1] + n[1]) / 2], L = this.transformInv_(I);
                this.addQuad_(t, R, I, n, r, S, L, l, _ - 1), this.addQuad_(R, i, o, I, S, s, a, L, _ - 1);
            }
            return;
        }
    }
    if (d) {
        if (!this.canWrapXInSource_)
            return;
        this.wrapsXInSource_ = !0;
    }
    this.addTriangle_(t, o, n, r, a, l), this.addTriangle_(t, i, o, r, s, a);
} }, me.prototype.calculateSourceExtent = function () { var t = e._ol_extent_.createEmpty(); return this.triangles_.forEach(function (i, o, n) { var r = i.source; e._ol_extent_.extendCoordinate(t, r[0]), e._ol_extent_.extendCoordinate(t, r[1]), e._ol_extent_.extendCoordinate(t, r[2]); }), t; }, me.prototype.getTriangles = function () { return this.triangles_; }; var xe = function (t, i, o, n, r, s, a, l, _, h, c) { fe.call(this, r, 0), this.renderEdges_ = void 0 !== c && c, this.pixelRatio_ = a, this.gutter_ = l, this.canvas_ = null, this.sourceTileGrid_ = i, this.targetTileGrid_ = n, this.wrappedTileCoord_ = s || r, this.sourceTiles_ = [], this.sourcesListenerKeys_ = null, this.sourceZ_ = 0; var u = n.getTileCoordExtent(this.wrappedTileCoord_), d = this.targetTileGrid_.getExtent(), p = this.sourceTileGrid_.getExtent(), f = d ? e._ol_extent_.getIntersection(u, d) : u; if (0 !== e._ol_extent_.getArea(f)) {
    var g = t.getExtent();
    g && (p = p ? e._ol_extent_.getIntersection(p, g) : g);
    var v = n.getResolution(this.wrappedTileCoord_[0]), y = e._ol_extent_.getCenter(f), m = ye.calculateSourceResolution(t, o, y, v);
    if (!isFinite(m) || m <= 0)
        this.state = 4;
    else {
        var x = void 0 !== h ? h : e._ol_.DEFAULT_RASTER_REPROJECTION_ERROR_THRESHOLD;
        if (this.triangulation_ = new me(t, o, f, p, m * x), 0 !== this.triangulation_.getTriangles().length) {
            this.sourceZ_ = i.getZForResolution(m);
            var E = this.triangulation_.calculateSourceExtent();
            if (p && (t.canWrapX() ? (E[1] = e._ol_math_.clamp(E[1], p[1], p[3]), E[3] = e._ol_math_.clamp(E[3], p[1], p[3])) : E = e._ol_extent_.getIntersection(E, p)), e._ol_extent_.getArea(E)) {
                for (var T = i.getTileRangeForExtentAndZ(E, this.sourceZ_), C = T.minX; C <= T.maxX; C++)
                    for (var R = T.minY; R <= T.maxY; R++) {
                        var S = _(this.sourceZ_, C, R, a);
                        S && this.sourceTiles_.push(S);
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
    this.state = 4; }; e._ol_.inherits(xe, fe), xe.prototype.disposeInternal = function () { 1 == this.state && this.unlistenSources_(), fe.prototype.disposeInternal.call(this); }, xe.prototype.getImage = function () { return this.canvas_; }, xe.prototype.reproject_ = function () { var t = []; if (this.sourceTiles_.forEach(function (e, i, o) { e && 2 == e.getState() && t.push({ extent: this.sourceTileGrid_.getTileCoordExtent(e.tileCoord), image: e.getImage() }); }, this), this.sourceTiles_.length = 0, 0 === t.length)
    this.state = 3;
else {
    var e = this.wrappedTileCoord_[0], i = this.targetTileGrid_.getTileSize(e), o = "number" == typeof i ? i : i[0], n = "number" == typeof i ? i : i[1], r = this.targetTileGrid_.getResolution(e), s = this.sourceTileGrid_.getResolution(this.sourceZ_), a = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
    this.canvas_ = ye.render(o, n, this.pixelRatio_, s, this.sourceTileGrid_.getExtent(), r, a, this.triangulation_, t, this.gutter_, this.renderEdges_), this.state = 2;
} this.changed(); }, xe.prototype.load = function () { if (0 == this.state) {
    this.state = 1, this.changed();
    var t = 0;
    this.sourcesListenerKeys_ = [], this.sourceTiles_.forEach(function (i, o, n) { var r, s = i.getState(); 0 != s && 1 != s || (t++, r = e._ol_events_.listen(i, e._ol_events_EventType_.CHANGE, function (o) { var n = i.getState(); 2 != n && 3 != n && 4 != n || (e._ol_events_.unlistenByKey(r), 0 == --t && (this.unlistenSources_(), this.reproject_())); }, this), this.sourcesListenerKeys_.push(r)); }, this), this.sourceTiles_.forEach(function (t, e, i) { 0 == t.getState() && t.load(); }), 0 === t && setTimeout(this.reproject_.bind(this), 0);
} }, xe.prototype.unlistenSources_ = function () { this.sourcesListenerKeys_.forEach(e._ol_events_.unlistenByKey), this.sourcesListenerKeys_ = null; }; var Ee = { createFromTemplate: function (t, i) { var o = /\{z\}/g, n = /\{x\}/g, r = /\{y\}/g, s = /\{-y\}/g; return function (a, l, _) { return a ? t.replace(o, a[0].toString()).replace(n, a[1].toString()).replace(r, function () { return (-a[2] - 1).toString(); }).replace(s, function () { var t = a[0], o = i.getFullTileRange(t); return e._ol_asserts_.assert(o, 55), (o.getHeight() + a[2]).toString(); }) : void 0; }; }, createFromTemplates: function (t, e) { for (var i = t.length, o = new Array(i), n = 0; n < i; ++n)
        o[n] = Ee.createFromTemplate(t[n], e); return Ee.createFromTileUrlFunctions(o); }, createFromTileUrlFunctions: function (t) { return 1 === t.length ? t[0] : function (i, o, n) { if (i) {
        var r = e._ol_tilecoord_.hash(i), s = e._ol_math_.modulo(r, t.length);
        return t[s](i, o, n);
    } }; }, nullTileUrlFunction: function (t, e, i) { }, expandUrl: function (t) { var e = [], i = /\{([a-z])-([a-z])\}/.exec(t); if (i) {
        var o, n = i[1].charCodeAt(0), r = i[2].charCodeAt(0);
        for (o = n; o <= r; ++o)
            e.push(t.replace(i[0], String.fromCharCode(o)));
        return e;
    } if (i = i = /\{(\d+)-(\d+)\}/.exec(t)) {
        for (var s = parseInt(i[2], 10), a = parseInt(i[1], 10); a <= s; a++)
            e.push(t.replace(i[0], a.toString()));
        return e;
    } return e.push(t), e; } }, Te = function (t) { e._ol_source_Source_.call(this, { attributions: t.attributions, extent: t.extent, logo: t.logo, projection: t.projection, state: t.state, wrapX: t.wrapX }), this.opaque_ = void 0 !== t.opaque && t.opaque, this.tilePixelRatio_ = void 0 !== t.tilePixelRatio ? t.tilePixelRatio : 1, this.tileGrid = void 0 !== t.tileGrid ? t.tileGrid : null, this.tileCache = new ve(t.cacheSize), this.tmpSize = [0, 0], this.key_ = "", this.tileOptions = { transition: t.transition }; }; e._ol_.inherits(Te, e._ol_source_Source_), Te.prototype.canExpireCache = function () { return this.tileCache.canExpireCache(); }, Te.prototype.expireCache = function (t, e) { var i = this.getTileCacheForProjection(t); i && i.expireCache(e); }, Te.prototype.forEachLoadedTile = function (t, i, o, n) { var r = this.getTileCacheForProjection(t); if (!r)
    return !1; for (var s, a, l, _ = !0, h = o.minX; h <= o.maxX; ++h)
    for (var c = o.minY; c <= o.maxY; ++c)
        a = e._ol_tilecoord_.getKeyZXY(i, h, c), l = !1, r.containsKey(a) && (l = 2 === (s = r.get(a)).getState()) && (l = !1 !== n(s)), l || (_ = !1); return _; }, Te.prototype.getGutter = function (t) { return 0; }, Te.prototype.getKey = function () { return this.key_; }, Te.prototype.setKey = function (t) { this.key_ !== t && (this.key_ = t, this.changed()); }, Te.prototype.getOpaque = function (t) { return this.opaque_; }, Te.prototype.getResolutions = function () { return this.tileGrid.getResolutions(); }, Te.prototype.getTile = function (t, e, i, o, n) { }, Te.prototype.getTileGrid = function () { return this.tileGrid; }, Te.prototype.getTileGridForProjection = function (t) { return this.tileGrid ? this.tileGrid : e._ol_tilegrid_.getForProjection(t); }, Te.prototype.getTileCacheForProjection = function (t) { var i = this.getProjection(); return i && !e._ol_proj_.equivalent(i, t) ? null : this.tileCache; }, Te.prototype.getTilePixelRatio = function (t) { return this.tilePixelRatio_; }, Te.prototype.getTilePixelSize = function (t, i, o) { var n = this.getTileGridForProjection(o), r = this.getTilePixelRatio(i), s = e._ol_size_.toSize(n.getTileSize(t), this.tmpSize); return 1 == r ? s : e._ol_size_.scale(s, r, this.tmpSize); }, Te.prototype.getTileCoordForTileUrlFunction = function (t, i) { var o = void 0 !== i ? i : this.getProjection(), n = this.getTileGridForProjection(o); return this.getWrapX() && o.isGlobal() && (t = e._ol_tilegrid_.wrapX(n, t, o)), e._ol_tilecoord_.withinExtentAndZ(t, n) ? t : null; }, Te.prototype.refresh = function () { this.tileCache.clear(), this.changed(); }, Te.prototype.useTile = e._ol_.nullFunction, Te.Event = function (t, i) { e._ol_events_Event_.call(this, t), this.tile = i; }, e._ol_.inherits(Te.Event, e._ol_events_Event_); var Ce = function (t) { Te.call(this, { attributions: t.attributions, cacheSize: t.cacheSize, extent: t.extent, logo: t.logo, opaque: t.opaque, projection: t.projection, state: t.state, tileGrid: t.tileGrid, tilePixelRatio: t.tilePixelRatio, wrapX: t.wrapX, transition: t.transition }), this.tileLoadFunction = t.tileLoadFunction, this.tileUrlFunction = this.fixedTileUrlFunction ? this.fixedTileUrlFunction.bind(this) : Ee.nullTileUrlFunction, this.urls = null, t.urls ? this.setUrls(t.urls) : t.url && this.setUrl(t.url), t.tileUrlFunction && this.setTileUrlFunction(t.tileUrlFunction), this.tileLoadingKeys_ = {}; }; e._ol_.inherits(Ce, Te), Ce.prototype.getTileLoadFunction = function () { return this.tileLoadFunction; }, Ce.prototype.getTileUrlFunction = function () { return this.tileUrlFunction; }, Ce.prototype.getUrls = function () { return this.urls; }, Ce.prototype.handleTileChange = function (t) { var i, o = t.target, n = e._ol_.getUid(o), r = o.getState(); 1 == r ? (this.tileLoadingKeys_[n] = !0, i = "tileloadstart") : n in this.tileLoadingKeys_ && (delete this.tileLoadingKeys_[n], i = 3 == r ? "tileloaderror" : 2 == r || 5 == r ? "tileloadend" : void 0), void 0 != i && this.dispatchEvent(new Te.Event(i, o)); }, Ce.prototype.setTileLoadFunction = function (t) { this.tileCache.clear(), this.tileLoadFunction = t, this.changed(); }, Ce.prototype.setTileUrlFunction = function (t, e) { this.tileUrlFunction = t, this.tileCache.pruneExceptNewestZ(), void 0 !== e ? this.setKey(e) : this.changed(); }, Ce.prototype.setUrl = function (t) { var e = this.urls = Ee.expandUrl(t); this.setTileUrlFunction(this.fixedTileUrlFunction ? this.fixedTileUrlFunction.bind(this) : Ee.createFromTemplates(e, this.tileGrid), t); }, Ce.prototype.setUrls = function (t) { this.urls = t; var e = t.join("\n"); this.setTileUrlFunction(this.fixedTileUrlFunction ? this.fixedTileUrlFunction.bind(this) : Ee.createFromTemplates(t, this.tileGrid), e); }, Ce.prototype.useTile = function (t, i, o) { var n = e._ol_tilecoord_.getKeyZXY(t, i, o); this.tileCache.containsKey(n) && this.tileCache.get(n); }; var Re = function (t) { Ce.call(this, { attributions: t.attributions, cacheSize: t.cacheSize, extent: t.extent, logo: t.logo, opaque: t.opaque, projection: t.projection, state: t.state, tileGrid: t.tileGrid, tileLoadFunction: t.tileLoadFunction ? t.tileLoadFunction : Re.defaultTileLoadFunction, tilePixelRatio: t.tilePixelRatio, tileUrlFunction: t.tileUrlFunction, url: t.url, urls: t.urls, wrapX: t.wrapX, transition: t.transition }), this.crossOrigin = void 0 !== t.crossOrigin ? t.crossOrigin : null, this.tileClass = void 0 !== t.tileClass ? t.tileClass : ge, this.tileCacheForProjection = {}, this.tileGridForProjection = {}, this.reprojectionErrorThreshold_ = t.reprojectionErrorThreshold, this.renderReprojectionEdges_ = !1; }; e._ol_.inherits(Re, Ce), Re.prototype.canExpireCache = function () { if (!e._ol_.ENABLE_RASTER_REPROJECTION)
    return Ce.prototype.canExpireCache.call(this); if (this.tileCache.canExpireCache())
    return !0; for (var t in this.tileCacheForProjection)
    if (this.tileCacheForProjection[t].canExpireCache())
        return !0; return !1; }, Re.prototype.expireCache = function (t, i) { if (e._ol_.ENABLE_RASTER_REPROJECTION) {
    var o = this.getTileCacheForProjection(t);
    for (var n in this.tileCache.expireCache(this.tileCache == o ? i : {}), this.tileCacheForProjection) {
        var r = this.tileCacheForProjection[n];
        r.expireCache(r == o ? i : {});
    }
}
else
    Ce.prototype.expireCache.call(this, t, i); }, Re.prototype.getGutter = function (t) { return e._ol_.ENABLE_RASTER_REPROJECTION && this.getProjection() && t && !e._ol_proj_.equivalent(this.getProjection(), t) ? 0 : this.getGutterInternal(); }, Re.prototype.getGutterInternal = function () { return 0; }, Re.prototype.getOpaque = function (t) { return !(e._ol_.ENABLE_RASTER_REPROJECTION && this.getProjection() && t && !e._ol_proj_.equivalent(this.getProjection(), t)) && Ce.prototype.getOpaque.call(this, t); }, Re.prototype.getTileGridForProjection = function (t) { if (!e._ol_.ENABLE_RASTER_REPROJECTION)
    return Ce.prototype.getTileGridForProjection.call(this, t); var i = this.getProjection(); if (!this.tileGrid || i && !e._ol_proj_.equivalent(i, t)) {
    var o = e._ol_.getUid(t).toString();
    return o in this.tileGridForProjection || (this.tileGridForProjection[o] = e._ol_tilegrid_.getForProjection(t)), this.tileGridForProjection[o];
} return this.tileGrid; }, Re.prototype.getTileCacheForProjection = function (t) { if (!e._ol_.ENABLE_RASTER_REPROJECTION)
    return Ce.prototype.getTileCacheForProjection.call(this, t); var i = this.getProjection(); if (!i || e._ol_proj_.equivalent(i, t))
    return this.tileCache; var o = e._ol_.getUid(t).toString(); return o in this.tileCacheForProjection || (this.tileCacheForProjection[o] = new ve(this.tileCache.highWaterMark)), this.tileCacheForProjection[o]; }, Re.prototype.createTile_ = function (t, i, o, n, r, s) { var a = [t, i, o], l = this.getTileCoordForTileUrlFunction(a, r), _ = l ? this.tileUrlFunction(l, n, r) : void 0, h = new this.tileClass(a, void 0 !== _ ? 0 : 4, void 0 !== _ ? _ : "", this.crossOrigin, this.tileLoadFunction, this.tileOptions); return h.key = s, e._ol_events_.listen(h, e._ol_events_EventType_.CHANGE, this.handleTileChange, this), h; }, Re.prototype.getTile = function (t, i, o, n, r) { var s = this.getProjection(); if (e._ol_.ENABLE_RASTER_REPROJECTION && s && r && !e._ol_proj_.equivalent(s, r)) {
    var a, l = this.getTileCacheForProjection(r), _ = [t, i, o], h = e._ol_tilecoord_.getKey(_);
    l.containsKey(h) && (a = l.get(h));
    var c = this.getKey();
    if (a && a.key == c)
        return a;
    var u = this.getTileGridForProjection(s), d = this.getTileGridForProjection(r), p = this.getTileCoordForTileUrlFunction(_, r), f = new xe(s, u, r, d, _, p, this.getTilePixelRatio(n), this.getGutterInternal(), function (t, e, i, o) { return this.getTileInternal(t, e, i, o, s); }.bind(this), this.reprojectionErrorThreshold_, this.renderReprojectionEdges_);
    return f.key = c, a ? (f.interimTile = a, f.refreshInterimChain(), l.replace(h, f)) : l.set(h, f), f;
} return this.getTileInternal(t, i, o, n, s || r); }, Re.prototype.getTileInternal = function (t, i, o, n, r) { var s = null, a = e._ol_tilecoord_.getKeyZXY(t, i, o), l = this.getKey(); if (this.tileCache.containsKey(a)) {
    if ((s = this.tileCache.get(a)).key != l) {
        var _ = s;
        s = this.createTile_(t, i, o, n, r, l), 0 == _.getState() ? s.interimTile = _.interimTile : s.interimTile = _, s.refreshInterimChain(), this.tileCache.replace(a, s);
    }
}
else
    s = this.createTile_(t, i, o, n, r, l), this.tileCache.set(a, s); return s; }, Re.prototype.setRenderReprojectionEdges = function (t) { if (e._ol_.ENABLE_RASTER_REPROJECTION && this.renderReprojectionEdges_ != t) {
    for (var i in this.renderReprojectionEdges_ = t, this.tileCacheForProjection)
        this.tileCacheForProjection[i].clear();
    this.changed();
} }, Re.prototype.setTileGridForProjection = function (t, i) { if (e._ol_.ENABLE_RASTER_REPROJECTION) {
    var o = e._ol_proj_.get(t);
    if (o) {
        var n = e._ol_.getUid(o).toString();
        n in this.tileGridForProjection || (this.tileGridForProjection[n] = i);
    }
} }, Re.defaultTileLoadFunction = function (t, e) { t.getImage().src = e; }; var Se = function (t) { var i = t || {}, o = void 0 !== i.projection ? i.projection : "EPSG:3857", n = void 0 !== i.tileGrid ? i.tileGrid : e._ol_tilegrid_.createXYZ({ extent: e._ol_tilegrid_.extentFromProjection(o), maxZoom: i.maxZoom, minZoom: i.minZoom, tileSize: i.tileSize }); Re.call(this, { attributions: i.attributions, cacheSize: i.cacheSize, crossOrigin: i.crossOrigin, logo: i.logo, opaque: i.opaque, projection: o, reprojectionErrorThreshold: i.reprojectionErrorThreshold, tileGrid: n, tileLoadFunction: i.tileLoadFunction, tilePixelRatio: i.tilePixelRatio, tileUrlFunction: i.tileUrlFunction, url: i.url, urls: i.urls, wrapX: void 0 === i.wrapX || i.wrapX, transition: i.transition }); }; e._ol_.inherits(Se, Re); var Ie = function (t) { var e, i = t || {}; e = void 0 !== i.attributions ? i.attributions : [Ie.ATTRIBUTION]; var o = void 0 !== i.crossOrigin ? i.crossOrigin : "anonymous", n = void 0 !== i.url ? i.url : "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"; Se.call(this, { attributions: e, cacheSize: i.cacheSize, crossOrigin: o, opaque: void 0 === i.opaque || i.opaque, maxZoom: void 0 !== i.maxZoom ? i.maxZoom : 19, reprojectionErrorThreshold: i.reprojectionErrorThreshold, tileLoadFunction: i.tileLoadFunction, url: n, wrapX: i.wrapX }); }; e._ol_.inherits(Ie, Se), Ie.ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'; var Le = function (t) { var i = t || {}; e._ol_layer_Layer_.call(this, i), this.type = e._ol_LayerType_.IMAGE; }; e._ol_.inherits(Le, e._ol_layer_Layer_); var we = function (t, i, o, n, r, s) { lt.call(this, t, i, o, e._ol_ImageState_.IDLE), this.src_ = n, this.image_ = new Image, null !== r && (this.image_.crossOrigin = r), this.imageListenerKeys_ = null, this.state = e._ol_ImageState_.IDLE, this.imageLoadFunction_ = s; }; e._ol_.inherits(we, lt), we.prototype.getImage = function () { return this.image_; }, we.prototype.handleImageError_ = function () { this.state = e._ol_ImageState_.ERROR, this.unlistenImage_(), this.changed(); }, we.prototype.handleImageLoad_ = function () { void 0 === this.resolution && (this.resolution = e._ol_extent_.getHeight(this.extent) / this.image_.height), this.state = e._ol_ImageState_.LOADED, this.unlistenImage_(), this.changed(); }, we.prototype.load = function () { this.state != e._ol_ImageState_.IDLE && this.state != e._ol_ImageState_.ERROR || (this.state = e._ol_ImageState_.LOADING, this.changed(), this.imageListenerKeys_ = [e._ol_events_.listenOnce(this.image_, e._ol_events_EventType_.ERROR, this.handleImageError_, this), e._ol_events_.listenOnce(this.image_, e._ol_events_EventType_.LOAD, this.handleImageLoad_, this)], this.imageLoadFunction_(this, this.src_)); }, we.prototype.setImage = function (t) { this.image_ = t; }, we.prototype.unlistenImage_ = function () { this.imageListenerKeys_.forEach(e._ol_events_.unlistenByKey), this.imageListenerKeys_ = null; }; var be = function (t, i, o, n, r, s) { this.targetProj_ = i, this.maxSourceExtent_ = t.getExtent(); var a = i.getExtent(), l = a ? e._ol_extent_.getIntersection(o, a) : o, _ = e._ol_extent_.getCenter(l), h = ye.calculateSourceResolution(t, i, _, n), c = e._ol_.DEFAULT_RASTER_REPROJECTION_ERROR_THRESHOLD; this.triangulation_ = new me(t, i, l, this.maxSourceExtent_, h * c), this.targetResolution_ = n, this.targetExtent_ = o; var u = this.triangulation_.calculateSourceExtent(); this.sourceImage_ = s(u, h, r), this.sourcePixelRatio_ = this.sourceImage_ ? this.sourceImage_.getPixelRatio() : 1, this.canvas_ = null, this.sourceListenerKey_ = null; var d = e._ol_ImageState_.LOADED; this.sourceImage_ && (d = e._ol_ImageState_.IDLE), lt.call(this, o, n, this.sourcePixelRatio_, d); }; e._ol_.inherits(be, lt), be.prototype.disposeInternal = function () { this.state == e._ol_ImageState_.LOADING && this.unlistenSource_(), lt.prototype.disposeInternal.call(this); }, be.prototype.getImage = function () { return this.canvas_; }, be.prototype.getProjection = function () { return this.targetProj_; }, be.prototype.reproject_ = function () { var t = this.sourceImage_.getState(); if (t == e._ol_ImageState_.LOADED) {
    var i = e._ol_extent_.getWidth(this.targetExtent_) / this.targetResolution_, o = e._ol_extent_.getHeight(this.targetExtent_) / this.targetResolution_;
    this.canvas_ = ye.render(i, o, this.sourcePixelRatio_, this.sourceImage_.getResolution(), this.maxSourceExtent_, this.targetResolution_, this.targetExtent_, this.triangulation_, [{ extent: this.sourceImage_.getExtent(), image: this.sourceImage_.getImage() }], 0);
} this.state = t, this.changed(); }, be.prototype.load = function () { if (this.state == e._ol_ImageState_.IDLE) {
    this.state = e._ol_ImageState_.LOADING, this.changed();
    var t = this.sourceImage_.getState();
    t == e._ol_ImageState_.LOADED || t == e._ol_ImageState_.ERROR ? this.reproject_() : (this.sourceListenerKey_ = e._ol_events_.listen(this.sourceImage_, e._ol_events_EventType_.CHANGE, function (t) { var i = this.sourceImage_.getState(); i != e._ol_ImageState_.LOADED && i != e._ol_ImageState_.ERROR || (this.unlistenSource_(), this.reproject_()); }, this), this.sourceImage_.load());
} }, be.prototype.unlistenSource_ = function () { e._ol_events_.unlistenByKey(this.sourceListenerKey_), this.sourceListenerKey_ = null; }; var Ae = function (t) { e._ol_source_Source_.call(this, { attributions: t.attributions, extent: t.extent, logo: t.logo, projection: t.projection, state: t.state }), this.resolutions_ = void 0 !== t.resolutions ? t.resolutions : null, this.reprojectedImage_ = null, this.reprojectedRevision_ = 0; }; e._ol_.inherits(Ae, e._ol_source_Source_), Ae.prototype.getResolutions = function () { return this.resolutions_; }, Ae.prototype.findNearestResolution = function (t) { if (this.resolutions_) {
    var i = e._ol_array_.linearFindNearest(this.resolutions_, t, 0);
    t = this.resolutions_[i];
} return t; }, Ae.prototype.getImage = function (t, i, o, n) { var r = this.getProjection(); if (e._ol_.ENABLE_RASTER_REPROJECTION && r && n && !e._ol_proj_.equivalent(r, n)) {
    if (this.reprojectedImage_) {
        if (this.reprojectedRevision_ == this.getRevision() && e._ol_proj_.equivalent(this.reprojectedImage_.getProjection(), n) && this.reprojectedImage_.getResolution() == i && e._ol_extent_.equals(this.reprojectedImage_.getExtent(), t))
            return this.reprojectedImage_;
        this.reprojectedImage_.dispose(), this.reprojectedImage_ = null;
    }
    return this.reprojectedImage_ = new be(r, n, t, i, o, function (t, e, i) { return this.getImageInternal(t, e, i, r); }.bind(this)), this.reprojectedRevision_ = this.getRevision(), this.reprojectedImage_;
} return r && (n = r), this.getImageInternal(t, i, o, n); }, Ae.prototype.getImageInternal = function (t, e, i, o) { }, Ae.prototype.handleImageChange = function (t) { var i = t.target; switch (i.getState()) {
    case e._ol_ImageState_.LOADING:
        this.dispatchEvent(new Ae.Event(Ae.EventType_.IMAGELOADSTART, i));
        break;
    case e._ol_ImageState_.LOADED:
        this.dispatchEvent(new Ae.Event(Ae.EventType_.IMAGELOADEND, i));
        break;
    case e._ol_ImageState_.ERROR: this.dispatchEvent(new Ae.Event(Ae.EventType_.IMAGELOADERROR, i));
} }, Ae.defaultImageLoadFunction = function (t, e) { t.getImage().src = e; }, Ae.Event = function (t, i) { e._ol_events_Event_.call(this, t), this.image = i; }, e._ol_.inherits(Ae.Event, e._ol_events_Event_), Ae.EventType_ = { IMAGELOADSTART: "imageloadstart", IMAGELOADEND: "imageloadend", IMAGELOADERROR: "imageloaderror" }; var Pe = function (t) { var i = t.imageExtent, o = void 0 !== t.crossOrigin ? t.crossOrigin : null, n = void 0 !== t.imageLoadFunction ? t.imageLoadFunction : Ae.defaultImageLoadFunction; Ae.call(this, { attributions: t.attributions, logo: t.logo, projection: e._ol_proj_.get(t.projection) }), this.image_ = new we(i, void 0, 1, t.url, o, n), this.imageSize_ = t.imageSize ? t.imageSize : null, e._ol_events_.listen(this.image_, e._ol_events_EventType_.CHANGE, this.handleImageChange, this); }; e._ol_.inherits(Pe, Ae), Pe.prototype.getImageInternal = function (t, i, o, n) { return e._ol_extent_.intersects(t, this.image_.getExtent()) ? this.image_ : null; }, Pe.prototype.handleImageChange = function (t) { if (this.image_.getState() == e._ol_ImageState_.LOADED) {
    var i, o, n = this.image_.getExtent(), r = this.image_.getImage();
    this.imageSize_ ? (i = this.imageSize_[0], o = this.imageSize_[1]) : (i = r.width, o = r.height);
    var s = e._ol_extent_.getHeight(n) / o, a = Math.ceil(e._ol_extent_.getWidth(n) / s);
    if (a != i) {
        var l = e._ol_dom_.createCanvasContext2D(a, o), _ = l.canvas;
        l.drawImage(r, 0, 0, i, o, 0, 0, _.width, _.height), this.image_.setImage(_);
    }
} Ae.prototype.handleImageChange.call(this, t); }, t.proj = e._ol_proj_, t.Map = de, t.View = k, t.Tile = pe, t.OSM = Ie, t.Image = Le, t.ImageStatic = Pe, Object.defineProperty(t, "__esModule", { value: !0 }); });
