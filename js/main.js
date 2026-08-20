/* ============================================================
   main.js — behavior layer
   - SEO injection from data.js config
   - navigation + scrollspy
   - renders services, project cards, timeline, stack, process,
     ownership, contact from data.js
   ============================================================ */

(function () {
  "use strict";

  var data = window.PORTFOLIO;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function pad2(n) { return n < 10 ? "0" + n : String(n); }

  /* ---------- SEO: canonical, Open Graph, JSON-LD ---------- */
  function injectSeo() {
    var url = data.config.siteUrl;
    if (url) {
      var canonical = $('link[rel="canonical"]');
      var ogUrl = $('meta[property="og:url"]');
      if (canonical) canonical.setAttribute("href", url);
      if (ogUrl) ogUrl.setAttribute("content", url);
    }

    var sameAs = [data.person.links.github, data.person.links.linkedin].filter(Boolean);
    var jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": data.person.name,
      "jobTitle": data.person.role,
      "url": url,
      "description": data.person.tagline
    };
    if (sameAs.length) jsonLd.sameAs = sameAs;

    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }

  /* ---------- Footer year ---------- */
  function setYear() {
    var el = $("#footer-year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- Contact links + GitHub CTA ---------- */
  function renderContact() {
    var links = data.person.links;
    var container = $("#contact-links");
    if (container) {
      var items = [];
      if (links.email) {
        items.push(contactLink(links.email, "Email", true));
      }
      if (links.github) {
        items.push(contactLink(links.github, "GitHub", false));
      }
      if (links.linkedin) {
        items.push(contactLink(links.linkedin, "LinkedIn", false));
      }
      container.innerHTML = items.join("");
    }

    var codeCta = $("#github-cta");
    if (links.github && codeCta) {
      codeCta.setAttribute("href", links.github);
    }
  }

  function contactLink(href, label, primary) {
    return '<a class="pill contact-link' + (primary ? " pill-accent" : " pill-ghost") + '" href="' + href + '"' +
      (primary ? "" : ' target="_blank" rel="noopener"') + ">" +
      '<span class="cl-label">' + label + "</span>" +
      '<span class="cl-arrow" aria-hidden="true">→</span></a>';
  }

  /* ---------- Navigation: mobile toggle ---------- */
  function initNav() {
    var toggle = $("#nav-toggle");
    var nav = $("#site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
      toggle.querySelector(".sr-only").textContent = open ? "Close menu" : "Open menu";
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest(".nav-link")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !e.target.closest("#site-nav") && !e.target.closest("#nav-toggle")) {
        setOpen(false);
      }
    });
  }

  /* ---------- Scrollspy ---------- */
  function initScrollspy() {
    var links = $$(".nav-link");
    var map = {};
    links.forEach(function (link) {
      map[link.getAttribute("href").slice(1)] = link;
    });

    var sections = $$("section[id]").filter(function (s) { return map[s.id]; });
    if (!("IntersectionObserver" in window)) return;

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove("is-active"); });
        if (map[entry.target.id]) {
          map[entry.target.id].classList.add("is-active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- What I do → service cards ---------- */
  function renderSystems() {
    var grid = $("#systems-grid");
    if (!grid) return;

    grid.innerHTML = data.systems.map(function (s, i) {
      return '<article class="service-card reveal">' +
        '<div class="service-top">' +
        '<span class="service-num">' + pad2(i + 1) + "</span>" +
        '<span class="service-arrow" aria-hidden="true">↗</span>' +
        "</div>" +
        "<h3 class=\"service-title\">" + s.title + "</h3>" +
        '<p class="service-desc">' + s.desc + "</p>" +
        '<div class="service-tags">' +
        s.tags.map(function (t) {
          return '<span class="tag">' + t + "</span>";
        }).join("") +
        "</div>" +
        "</article>";
    }).join("");
  }

  /* ---------- Work → project cards ---------- */
  function renderProjectDetailField(label, value) {
    if (!value) return "";
    return '<div class="project-detail">' +
      '<span class="project-detail-label">' + label + "</span>" +
      '<p>' + value + "</p>" +
      "</div>";
  }

  function renderProjectDetails(p) {
    var problem = p.problem || p.engineeringChallenge || "";
    var approach = p.approach || "";
    var result = p.result || "";

    return [
      renderProjectDetailField("Problem", problem),
      renderProjectDetailField("Approach", approach),
      renderProjectDetailField("Result", result)
    ].filter(Boolean).join("");
  }

  function renderProjects() {
    var grid = $("#projects-grid");
    if (!grid) return;

    grid.innerHTML = data.projects.map(function (p, i) {
      return '<article class="project-card reveal" tabindex="0">' +
        '<div class="project-cover">' +
        '<span class="cover-num">' + pad2(i + 1) + "</span>" +
        '<span class="cover-cat">' + p.category + "</span>" +
        "</div>" +
        '<div class="project-info">' +
        '<h3 class="project-title">' + p.title + "</h3>" +
        '<p class="project-short">' + p.short + "</p>" +
        '<div class="project-details">' + renderProjectDetails(p) + "</div>" +
        '<div class="project-tech">' +
        p.technologies.map(function (t) {
          return '<span class="tag">' + t + "</span>";
        }).join("") +
        "</div>" +
        "</div>" +
        "</article>";
    }).join("");

    var cards = $$(".project-card");
    cards.forEach(function (card) {
      card.addEventListener("click", function (event) {
        if (event.target.closest("a, button")) return;
        card.classList.toggle("is-expanded");
      });

      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          card.classList.toggle("is-expanded");
        }
      });
    });
  }

  /* ---------- Experience → timeline ---------- */
  function renderExperience() {
    var timeline = $("#experience-timeline");
    if (!timeline) return;

    timeline.innerHTML = data.experience.map(function (e, i) {
      var isHead = i === data.experience.length - 1;
      return '<li class="timeline-item' + (isHead ? " is-head" : "") + '">' +
        '<span class="tl-dot" aria-hidden="true"></span>' +
        '<div class="tl-meta">' +
        '<span class="tag' + (isHead ? " tag-accent" : "") + '">' + e.tag + "</span>" +
        (isHead ? '<span class="tl-now">Present</span>' : "") +
        "</div>" +
        '<h3 class="tl-role">' + e.role + "</h3>" +
        '<p class="tl-org">' + e.org + "</p>" +
        '<p class="tl-desc">' + e.desc + "</p>" +
        '<div class="tl-focus">' +
        e.focus.map(function (f) { return '<span class="tag">' + f + "</span>"; }).join("") +
        "</div>" +
        "</li>";
    }).join("");
  }

  /* ---------- Stack ---------- */
  function initStack() {
    var groups = $("#stack-groups");
    var flowEl = $("#stack-flow");
    if (!groups || !flowEl) return;

    groups.innerHTML = data.stack.map(function (g) {
      return '<div class="stack-group reveal">' +
        '<h3 class="stack-group-title">' + g.group + "</h3>" +
        '<div class="stack-list">' +
        g.items.map(function (item) {
          return '<button type="button" class="stack-item" aria-pressed="false">' +
            '<span class="si-name">' + item.name + "</span>" +
            '<span class="si-hint" aria-hidden="true">→</span>' +
            "</button>";
        }).join("") +
        "</div>" +
        "</div>";
    }).join("");

    var items = $$(".stack-item");

    function showFlow(item) {
      var name = item.querySelector(".si-name").textContent;
      var g = data.stack.find(function (grp) {
        return grp.items.some(function (it) { return it.name === name; });
      });
      var entry = g.items.find(function (it) { return it.name === name; });

      flowEl.innerHTML =
        '<span class="sf-lead">' + entry.name + "</span>" +
        entry.flow.map(function (step) {
          return '<span class="sf-arrow">→</span><span class="sf-step">' + step + "</span>";
        }).join("");

      items.forEach(function (it) {
        var on = it === item;
        it.classList.toggle("is-active", on);
        it.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }

    function clearFlow() {
      items.forEach(function (it) {
        it.classList.remove("is-active");
        it.setAttribute("aria-pressed", "false");
      });
      flowEl.innerHTML = '<span class="sf-lead">Select a tool</span><span class="sf-arrow">→</span><span class="sf-step">See how it is used</span>';
    }

    groups.addEventListener("click", function (e) {
      var item = e.target.closest(".stack-item");
      if (!item) return;
      if (item.classList.contains("is-active")) { clearFlow(); return; }
      showFlow(item);
    });

    groups.addEventListener("pointerenter", function (e) {
      var item = e.target.closest(".stack-item");
      if (item) showFlow(item);
    });

    clearFlow();
  }

  /* ---------- How I work → FAQ accordion ---------- */
  function initProcess() {
    var list = $("#process-list");
    if (!list) return;

    list.innerHTML = data.process.map(function (p, i) {
      return '<li class="faq-row reveal">' +
        '<button type="button" class="faq-head" aria-expanded="false" aria-controls="faq-panel-' + i + '">' +
        '<span class="faq-num">' + pad2(i + 1) + "</span>" +
        '<span class="faq-title">' + p.title + "</span>" +
        '<span class="faq-plus" aria-hidden="true">+</span>' +
        "</button>" +
        '<div class="faq-body" id="faq-panel-' + i + '">' +
        "<p>" + p.desc + "</p>" +
        "</div>" +
        "</li>";
    }).join("");

    list.addEventListener("click", function (e) {
      var head = e.target.closest(".faq-head");
      if (!head) return;
      var row = head.closest(".faq-row");
      var body = row.querySelector(".faq-body");
      var isOpen = head.getAttribute("aria-expanded") === "true";

      $$(".faq-row", list).forEach(function (other) {
        if (other === row) return;
        var ob = other.querySelector(".faq-body");
        var oh = other.querySelector(".faq-head");
        ob.style.maxHeight = "0";
        oh.setAttribute("aria-expanded", "false");
      });

      if (isOpen) {
        body.style.maxHeight = "0";
        head.setAttribute("aria-expanded", "false");
      } else {
        body.style.maxHeight = body.scrollHeight + "px";
        head.setAttribute("aria-expanded", "true");
      }
    });
  }

  /* ---------- Contribution ---------- */
  function renderOwnership() {
    var grid = $("#ownership-grid");
    if (!grid) return;

    grid.innerHTML = data.ownership.map(function (o, i) {
      return '<div class="contrib-item reveal">' +
        '<span class="o-num">' + pad2(i + 1) + "</span>" +
        '<div class="o-body">' +
        "<h4>" + o.title + "</h4>" +
        "<p>" + o.desc + "</p>" +
        "</div>" +
        "</div>";
    }).join("");
  }

  /* ---------- Scroll progress ---------- */
  function initScrollProgress() {
    var bar = $("#scroll-progress");
    if (!bar) return;

    var ticking = false;

    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var p = max > 0 ? doc.scrollTop / max : 0;
      bar.style.transform = "scaleX(" + p + ")";
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  /* ---------- Init ---------- */
  function init() {
    injectSeo();
    setYear();
    renderContact();
    initNav();
    initScrollspy();
    renderSystems();
    renderProjects();
    renderExperience();
    initStack();
    initProcess();
    renderOwnership();
    initScrollProgress();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();