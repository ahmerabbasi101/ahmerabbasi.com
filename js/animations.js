/* ============================================================
   animations.js — scroll reveals + body ready state
   ============================================================ */

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  /* ---------- Release scroll lock once interactive ---------- */
  function ready() {
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-ready");
  }

  /* ---------- Scroll reveals ---------- */
  function initReveals() {
    var reveals = document.querySelectorAll(".reveal");
    var stagers = document.querySelectorAll(".stagger");

    if (window.__portfolioRevealObserver) {
      window.__portfolioRevealObserver.disconnect();
      window.__portfolioRevealObserver = null;
    }

    if (!("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-visible"); });
      stagers.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    window.__portfolioRevealObserver = io;

    reveals.forEach(function (el) { io.observe(el); });
    stagers.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Run ---------- */
  onReady(function () {
    ready();
    initReveals();
  });
})();
