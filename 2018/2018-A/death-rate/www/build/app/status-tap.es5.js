/*! Built with http://stenciljs.com */
App.loadBundle("status-tap.js", ["exports"], function (e) { window.App.h, e.startStatusTap = function (e, n) { n.read(function () { var t = e.innerWidth, o = e.innerWidth, i = e.document.elementFromPoint(t / 2, o / 2); if (!i)
    return; var r = i.closest("ion-scroll"); r && r.componentOnReady().then(function () { n.write(function () { r.scrollToTop(300); }); }); }); }, Object.defineProperty(e, "__esModule", { value: !0 }); });
