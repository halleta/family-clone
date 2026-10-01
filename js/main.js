/* ============================================================
   Family — design-study clone · shared behavior
   100% original code. No libraries.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- top loading bar ---------- */
  var bar = document.getElementById("loadbar");
  if (bar) {
    requestAnimationFrame(function () { bar.classList.add("run"); });
    setTimeout(function () { bar.style.display = "none"; }, 1100);
  }

  /* ---------- header hairline on scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- hero per-word stagger (rise + rotateX) ---------- */
  document.querySelectorAll("[data-words]").forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(function (w) { return '<span class="w">' + w + "</span>"; }).join(" ");
    var spans = el.querySelectorAll(".w");
    // trigger after loadbar starts, staggered 90ms per word
    spans.forEach(function (s, i) {
      setTimeout(function () { s.classList.add("in"); }, 250 + i * 95);
    });
  });

  /* ---------- scroll fade+rise reveals ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    if (!q) return;
    q.addEventListener("click", function () {
      var open = item.classList.contains("open");
      // single-open within the same list
      var list = item.closest(".faq-list");
      if (list) list.querySelectorAll(".faq-item.open").forEach(function (o) { o.classList.remove("open"); });
      if (!open) item.classList.add("open");
    });
  });

  /* ---------- mobile burger ---------- */
  var burger = document.querySelector(".burger");
  var navLinks = document.querySelector(".nav-links");
  if (burger && navLinks) {
    burger.addEventListener("click", function () { navLinks.classList.toggle("mobile-open"); });
  }

  /* ---------- modal (spring card + blurred backdrop) ---------- */
  document.querySelectorAll("[data-modal-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var m = document.getElementById(btn.getAttribute("data-modal-open"));
      if (m) { m.classList.add("open"); document.body.style.overflow = "hidden"; }
    });
  });
  document.querySelectorAll(".modal").forEach(function (m) {
    function close() { m.classList.remove("open"); document.body.style.overflow = ""; }
    m.querySelector(".modal-bg").addEventListener("click", close);
    var x = m.querySelector(".modal-x");
    if (x) x.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  });

  /* ---------- animated wallet UI (the "little videos", as code) ---------- */
  document.querySelectorAll(".wallet-ui").forEach(function (wallet, wi) {
    var balEl = wallet.querySelector(".wallet-bal");
    var txList = wallet.querySelector(".tx-list");
    if (!balEl || !txList) return; // static mock phone — no animation
    var TARGET = 24382.10;
    var txPool = [
      { n: "Maya Chen", s: "Received · ETH", amt: "+0.42 ETH", pos: true, bg: "#DFF5E7", e: "💸" },
      { n: "Swap", s: "ETH → USDC", amt: "-1.20 ETH", pos: false, bg: "#D8ECFC", e: "🔁" },
      { n: "Leo Park", s: "Sent · USDC", amt: "-$250.00", pos: false, bg: "#FFE8DC", e: "💌" },
      { n: "Rewards", s: "Family points", amt: "+120 pts", pos: true, bg: "#FFF3D6", e: "⭐" },
      { n: "Nia Okafor", s: "Received · BTC", amt: "+0.011 BTC", pos: true, bg: "#ECE4FD", e: "🎁" },
      { n: "Top up", s: "Card · USD", amt: "+$500.00", pos: true, bg: "#DFF5E7", e: "💳" }
    ];
    var txIdx = 0;

    function fmt(n) {
      return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    // balance count-up loop
    function countUp() {
      var start = null, dur = 2600;
      function step(t) {
        if (!start) start = t;
        var p = Math.min((t - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        balEl.textContent = fmt(TARGET * eased);
        if (p < 1) requestAnimationFrame(step);
        else setTimeout(function () { balEl.textContent = fmt(0); countUp(); }, 4200);
      }
      requestAnimationFrame(step);
    }
    // transaction rows sliding in on loop
    function pushTx() {
      var tx = txPool[txIdx % txPool.length]; txIdx++;
      var row = document.createElement("div");
      row.className = "tx-row";
      row.innerHTML =
        '<div class="tx-ico" style="background:' + tx.bg + '">' + tx.e + "</div>" +
        '<div class="tx-meta"><div class="tx-name">' + tx.n + '</div><div class="tx-sub">' + tx.s + "</div></div>" +
        '<div class="tx-amt' + (tx.pos ? " pos" : "") + '">' + tx.amt + "</div>";
      txList.prepend(row);
      requestAnimationFrame(function () { requestAnimationFrame(function () { row.classList.add("show"); }); });
      while (txList.children.length > 4) txList.removeChild(txList.lastChild);
    }
    countUp();
    pushTx(); pushTx();
    setInterval(pushTx, 3000 + wi * 700);
  });

  /* ---------- blog filter pills ---------- */
  var pills = document.querySelectorAll(".filter-row .pill");
  var posts = document.querySelectorAll(".post-row");
  if (pills.length && posts.length) {
    pills.forEach(function (p) {
      p.addEventListener("click", function () {
        pills.forEach(function (x) { x.classList.remove("active"); });
        p.classList.add("active");
        var f = p.getAttribute("data-filter");
        posts.forEach(function (post) {
          var show = f === "all" || post.getAttribute("data-cat") === f;
          post.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------- support search filter ---------- */
  var sInput = document.querySelector(".search-big input");
  var artRows = document.querySelectorAll(".support-articles .art-row");
  if (sInput && artRows.length) {
    sInput.addEventListener("input", function () {
      var q = sInput.value.trim().toLowerCase();
      artRows.forEach(function (r) {
        r.style.display = r.textContent.toLowerCase().indexOf(q) !== -1 ? "" : "none";
      });
    });
  }

  /* ---------- send / receive / swap tab switcher ---------- */
  var tabs = document.querySelectorAll(".tab");
  if (tabs.length) {
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        tabs.forEach(function (x) { x.classList.remove("on"); x.setAttribute("aria-selected", "false"); });
        t.classList.add("on");
        t.setAttribute("aria-selected", "true");
        var key = t.getAttribute("data-tab");
        document.querySelectorAll(".srs-phone").forEach(function (p) {
          p.classList.toggle("on", p.getAttribute("data-phone") === key);
        });
      });
    });
  }

  /* ---------- footer year ---------- */
  document.querySelectorAll(".js-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
