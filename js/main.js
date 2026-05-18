const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const scriptSrc = $("script[src$='js/main.js']")?.getAttribute("src") || "";
const rootPrefix = scriptSrc.replace(/js\/main\.js(?:\?.*)?$/, "");

// Real photographic images from Unsplash for each topic
const topicImages = {
  // Astronomy
  "meteoritët": "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80",
  "magnetosfera": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
  "drita e hënës": "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&q=80",
  "orbitat": "https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?w=800&q=80",
  "ekzoplanetet": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
  "flares diellore": "https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&q=80",
  "zgjatja e ditës": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "animi boshtor": "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80",
  "bllokimi baticor": "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=800&q=80",
  "yjet lëkunden": "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
  "vrimat e zeza": "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=800&q=80",
  "qielli si çati": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
  "pulsaret": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  "lëvizja e diellit": "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&q=80",
  "forma e tokës": "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80",
  "orbita e henes": "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=800&q=80",
  // Biology
  "adn": "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=900&q=80",
  "kodi gjenetik": "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=900&q=80",
  "fotosinteza": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
  "sistemi imunitar": "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80",
  "qelizat staminale": "https://images.pexels.com/photos/8917462/pexels-photo-8917462.jpeg?auto=compress&cs=tinysrgb&w=900",
  "mitoza": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
  "mikrobioma": "https://images.unsplash.com/photo-1583912086096-8c60d75a53f9?w=800&q=80",
  "homeostaza": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
  "neuroplasticiteti": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80",
  "respiracioni qelizor": "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
  "endokrini": "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80",
  "percaktimi i gjinise": "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=900&q=80",
  "fabrika e gjelber": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=900&q=80",
  "merimanga": "https://images.unsplash.com/photo-1570036322622-a2858047b011?w=900&q=80",
  "qumështi": "https://images.unsplash.com/photo-1601436423474-51738541c1b1?w=900&q=80",
  "komunikimi i milingonave": "https://images.unsplash.com/photo-1518014529339-1662c1ca91fb?w=900&q=80",
  "dëgjimi": "https://images.pexels.com/photos/8720351/pexels-photo-8720351.jpeg?auto=compress&cs=tinysrgb&w=900",
  // Cosmology
  "zgjerimi i universit": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=900&q=80",
  "big bang": "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
  "energji e errët": "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=800&q=80",
  "lëndë e errët": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
  "multiversi": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  "inflacioni kozmik": "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=800&q=80",
  "rrezatimi kozmik": "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&q=80",
  "fati i universit": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
  "epokat kozmike": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
  "horizonti kozmik": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
  "struktura në shkallë": "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&q=80",
  "fundi i universit": "https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?w=800&q=80",
  // Embryology
  "alaqah": "https://images.pexels.com/photos/8917462/pexels-photo-8917462.jpeg?auto=compress&cs=tinysrgb&w=900",
  "mudghah": "https://images.pexels.com/photos/8720351/pexels-photo-8720351.jpeg?auto=compress&cs=tinysrgb&w=900",
  "nutfah": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80",
  "lindja": "https://images.pexels.com/photos/8917462/pexels-photo-8917462.jpeg?auto=compress&cs=tinysrgb&w=900",
  "lëngu amniotik": "https://images.pexels.com/photos/8917462/pexels-photo-8917462.jpeg?auto=compress&cs=tinysrgb&w=900",
  "determinimi seksual": "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=900&q=80",
  "ossifikimi": "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=800&q=80",
  "placenta": "https://images.pexels.com/photos/8720351/pexels-photo-8720351.jpeg?auto=compress&cs=tinysrgb&w=900",
  "rritja fetale": "https://images.pexels.com/photos/8917462/pexels-photo-8917462.jpeg?auto=compress&cs=tinysrgb&w=900",
  "zhv i organeve": "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
  "fazat embriologjike": "https://images.pexels.com/photos/8917462/pexels-photo-8917462.jpeg?auto=compress&cs=tinysrgb&w=900",
  // Geology
  "malet si kunja": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  "plakat tektonike": "https://images.unsplash.com/photo-1527824404775-dce343118ebc?w=800&q=80",
  "vullkanet": "https://images.unsplash.com/photo-1534531173927-aeb928d54385?w=800&q=80",
  "tërmetet": "https://images.unsplash.com/photo-1747122450139-6363248ec01f?w=900&q=80",
  "erozioni": "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
  "cikli i shkëmbinjve": "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800&q=80",
  "burimet nëntokësore": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
  "pllaja oqeanike": "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",
  "datimi radiometrik": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  "magnetiteti": "https://images.unsplash.com/photo-1747122450139-6363248ec01f?w=900&q=80",
  "detet qe nuk perzihen": `${rootPrefix}images/topics/seas-barrier.svg`,
  "dallgët e brendshme": "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&q=80",
  "shtresat e tokes": `${rootPrefix}images/topics/earth-layers.svg`,
  "lëvizja e maleve": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  "cikli i ujit": "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&q=80",
  "pika më e ulët": "https://images.unsplash.com/photo-1544085311-11a028465b03?w=800&q=80",
  "ererat pllenuese": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
  "eret pllenuese": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
  "rete dhe procesi i shiut": "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80",
  "carjet e tokes": "https://images.unsplash.com/photo-1747122450139-6363248ec01f?w=900&q=80",
  "alaqah varja ne murin e mitres": "https://images.pexels.com/photos/8917462/pexels-photo-8917462.jpeg?auto=compress&cs=tinysrgb&w=900",
  "krijimi ne tre erresira": "https://images.pexels.com/photos/8720351/pexels-photo-8720351.jpeg?auto=compress&cs=tinysrgb&w=900",
  "njeriu nga balta dhe uji": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80",
  "toka qe gjallerohet pas shiut": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80",
  "njeriu dhe ndotja": "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=900&q=80",
  "bleta femer dhe arkitektura e kosheres": "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?w=900&q=80",
  "relativiteti i kohes": "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=900&q=80",
  "numri atomik i hekurit": `${rootPrefix}images/topics/iron-atomic-number.svg`,
  "cdo gje e gjalle nga uji": "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=900&q=80",
  "krijimi ne cifte": "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=900&q=80",
  "sperma eshte perberje": "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=900&q=80",
  "kockat dhe veshja me mish": "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=900&q=80",
  "materia ne cifte": "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=900&q=80",
  "pesha e atomit": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80",
  "karkalecet dhe dalja nga toka": "https://images.unsplash.com/photo-1689126086601-6717701d05ef?w=900&q=80",
  "gjithcka noton ne orbite": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&q=80",
  "terheqja dhe levizja": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&q=80",
  "universi ne gjendje gazore": "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=900&q=80",
  // Chemistry
  "default_kimi": "https://images.unsplash.com/photo-1743537010961-f3cb4fbbdb1d?w=900&q=80",
  "hekuri": "https://images.unsplash.com/photo-1743537010961-f3cb4fbbdb1d?w=900&q=80",
  "atomi": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80",
  "zjarri nga druri": "https://images.unsplash.com/photo-1497910091122-9f8a7746eb33?w=900&q=80",
  // Physiology
  "default_fiziologji": "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=800&q=80",
  "pjesa ballore": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=900&q=80",
  "receptorët e dhimbjes": "https://images.unsplash.com/photo-1662973417989-1f30d1b0a462?w=900&q=80",
  "veshtiresia e ngjitjes": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
  "ngjitjes ne qiell": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
  "mungesa e oksigjenit": "https://images.unsplash.com/photo-1522120691812-dcdfb62a15cb?w=900&q=80",
  "gjurmët e gishtave": "https://images.unsplash.com/photo-1559281205-095bb66318fa?w=900&q=80",
  // Zoology
  "default_zoologji": "https://images.unsplash.com/photo-1689126086601-6717701d05ef?w=900&q=80",
};

// Category fallback images
const categoryImages = {
  astronomia: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
  astronomi: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
  biologji: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&q=80",
  kimi: "https://images.unsplash.com/photo-1743537010961-f3cb4fbbdb1d?w=900&q=80",
  kozmologji: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
  embriologji: "https://images.pexels.com/photos/8720351/pexels-photo-8720351.jpeg?auto=compress&cs=tinysrgb&w=900",
  gjeologji: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  fiziologji: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=800&q=80",
  zoologji: "https://images.unsplash.com/photo-1689126086601-6717701d05ef?w=900&q=80",
};

const categories = {
  astronomia: { label: "Astronomia", colors: ["#102447", "#3fb8ff", "#f2b84b"], motif: "orbit" },
  astronomi: { label: "Astronomia", colors: ["#102447", "#3fb8ff", "#f2b84b"], motif: "orbit" },
  biologji: { label: "Biologji", colors: ["#153c2a", "#37d67a", "#86efac"], motif: "cells" },
  kimi: { label: "Kimi", colors: ["#172a3b", "#3fb8ff", "#f97316"], motif: "molecule" },
  kozmologji: { label: "Kozmologji", colors: ["#211a44", "#9f7aea", "#3fb8ff"], motif: "cosmos" },
  embriologji: { label: "Embriologji", colors: ["#3a1f2b", "#e66a8a", "#37d67a"], motif: "embryo" },
  gjeologji: { label: "Gjeologji", colors: ["#372a1c", "#f2b84b", "#7dd3fc"], motif: "layers" },
  fiziologji: { label: "Fiziologji", colors: ["#351b25", "#e66a8a", "#37d67a"], motif: "pulse" },
  zoologji: { label: "Zoologji", colors: ["#1e3421", "#37d67a", "#f2b84b"], motif: "tracks" }
};

const fallbackCategory = { label: "Shkence", colors: ["#1c2430", "#3fb8ff", "#37d67a"], motif: "molecule" };

function normalizeText(value) {
  return (value || "").toString().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function slugFromHref(href) {
  const clean = (href || "").replace(rootPrefix, "").replace(/^(\.\.\/)+/, "");
  return clean.split("/").filter(Boolean)[0] || "";
}

function categoryFromText(value) {
  const key = normalizeText(value).replace(/\s+/g, "_");
  return categories[key] ? key : "";
}

function inferCardCategory(card) {
  const link = $("a[href]", card);
  const fromHref = slugFromHref(link?.getAttribute("href"));
  if (categories[fromHref]) return fromHref;
  const heading = $("h3", card)?.textContent || "";
  const fromHeading = categoryFromText(heading);
  if (fromHeading) return fromHeading;
  const pageTitle = $(".page-hero h1")?.textContent || "";
  return categoryFromText(pageTitle) || "shkence";
}

function currentArticleCategory() {
  const chip = $(".chips .chip")?.textContent;
  const heroSub = $(".page-hero p")?.textContent;
  const title = $(".page-hero h1")?.textContent;
  return categoryFromText(chip) || categoryFromText(heroSub) || categoryFromText(title) || "shkence";
}

function getTopicImageUrl(title, categoryKey) {
  const titleNorm = normalizeText(title || "");
  // Match the article/category title against known topic keys without broad
  // reverse matching, so short category names like "Kimi" do not hit
  // unrelated words such as "bllokimi".
  for (const [key, url] of Object.entries(topicImages)) {
    if (titleNorm === key || titleNorm.includes(key)) {
      return url;
    }
  }
  // Fall back to category image
  return categoryImages[categoryKey] || categoryImages["astronomia"];
}

function escapeXml(value) {
  return (value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;"
  })[char]);
}

function enhanceNavigation() {
  const nav = $(".nav-links");
  if (!nav) return;
  const existing = new Set($$("a[href]", nav).map((link) => link.getAttribute("href")));
  const about = $$("a", nav).find((link) => /about\.html$/.test(link.getAttribute("href") || ""));
  const needed = [
    ["Kimi", `${rootPrefix}kimi/index.html`],
    ["Kozmologji", `${rootPrefix}kozmologji/index.html`],
    ["Gjeologji", `${rootPrefix}gjeologji/index.html`],
    ["Zoologji", `${rootPrefix}zoologji/index.html`]
  ];
  needed.forEach(([label, href]) => {
    if (existing.has(href) || $$("a", nav).some((link) => link.textContent.trim() === label)) return;
    const link = document.createElement("a");
    link.href = href;
    link.textContent = label;
    nav.insertBefore(link, about || $("[data-theme]", nav));
  });
}

function enhanceCards() {
  $$("[data-card]").forEach((card, index) => {
    card.classList.add("reveal");
    card.style.setProperty("--delay", `${Math.min(index, 10) * 40}ms`);
    if (card.querySelector(".card-media")) return;

    const heading = $("h3", card);
    const title = heading?.textContent.trim() || "Artikull";
    const category = inferCardCategory(card);
    const mediaDiv = document.createElement("div");
    mediaDiv.className = "card-media";

    const img = document.createElement("img");
    img.src = getTopicImageUrl(title, category);
    img.alt = `Ilustrim per ${title}`;
    img.loading = "lazy";
    img.onerror = function() {
      this.src = categoryImages[category] || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80";
    };

    mediaDiv.appendChild(img);
    card.insertBefore(mediaDiv, card.firstChild);
  });
}

function enhanceArticleVisuals() {
  const articleHero = $(".page-hero");
  const mainHero = $(".hero");
  
  if (articleHero) {
    const title = $("h1", articleHero)?.textContent.trim();
    if (title) {
      const category = currentArticleCategory();
      const imgUrl = getTopicImageUrl(title, category);

      // Set hero background to real photo
      articleHero.style.backgroundImage = `linear-gradient(180deg, rgba(8,10,15,0.45), rgba(8,10,15,0.85)), url("${imgUrl}")`;
      articleHero.style.backgroundSize = "cover";
      articleHero.style.backgroundPosition = "center";

      const content = $("main.content");
      if (content && $(".lead", content) && !$(".article-visual", content)) {
        const figure = document.createElement("figure");
        figure.className = "article-visual reveal";
        const img = document.createElement("img");
        img.src = imgUrl;
        img.alt = `Ilustrim per ${title}`;
        img.loading = "lazy";
        img.onerror = function() {
          this.src = categoryImages[category] || "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80";
        };
        figure.appendChild(img);

        const quote = $(".quote", content);
        if (quote) quote.after(figure);
        else $(".lead", content).after(figure);
      }
    }
  }

  if (mainHero) document.body.classList.add("has-main-hero");
}

function setupRevealEffects() {
  const revealItems = $$(".reveal");
  if (!revealItems.length) return;
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach((item) => observer.observe(item));
}

function setupNavigation() {
  const burger = $(".burger");
  const header = $(".header");
  if (burger) {
    burger.setAttribute("aria-expanded", "false");
    burger.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", String(isOpen));
    });
  }
  $$(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      burger?.setAttribute("aria-expanded", "false");
    });
  });
  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const currentPath = window.location.pathname;
  $$(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const isAbout = href.includes("about.html");
    const isCategory = href.match(/([a-z]+)\/index\.html$/);
    const isRoot = href === "index.html" || href === "../index.html" || href.includes("Ballina");
    
    if (isAbout && currentPath.includes("about.html")) {
      link.classList.add("active");
    } else if (isCategory && currentPath.includes(`/${isCategory[1]}/`)) {
      link.classList.add("active");
    } else if (isRoot && (currentPath.endsWith("/") || currentPath.endsWith("index.html") && !currentPath.match(/\/[a-z]+\/index\.html$/))) {
      link.classList.add("active");
    }
  });
}

function setupTopButton() {
  const topBtn = $(".top-btn");
  if (!topBtn) return;
  const update = () => topBtn.classList.toggle("is-visible", window.scrollY > 420);
  topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function setupTheme() {
  const buttons = $$("[data-theme]");
  const stored = localStorage.getItem("theme");
  if (stored) document.documentElement.dataset.theme = stored;
  const sync = () => {
    const isLight = document.documentElement.dataset.theme === "light";
    buttons.forEach((button) => {
      button.textContent = isLight ? "Errësirë" : "Dritë";
      button.setAttribute("aria-pressed", String(isLight));
    });
  };
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
      sync();
    });
  });
  sync();
}

function setupLocalCardSearch() {
  const searchInput = $("#search");
  if (!searchInput) return;
  searchInput.addEventListener("input", (event) => {
    const q = normalizeText(event.target.value);
    $$("[data-card]").forEach((card) => {
      const hay = normalizeText(card.textContent || "");
      card.classList.toggle("hidden", !hay.includes(q));
    });
  });
}

function sharePage(title) {
  if (navigator.share) {
    navigator.share({ title, url: location.href }).catch(() => {});
    return;
  }
  navigator.clipboard?.writeText(location.href).then(() => {
    window.alert("Linku u kopjua.");
  }).catch(() => {
    window.prompt("Kopjo linkun:", location.href);
  });
}
window.sharePage = sharePage;

function setupProgressBar() {
  const prog = $("#progress");
  if (!prog) return;
  const update = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const scrolled = max > 0 ? h.scrollTop / max : 0;
    prog.style.transform = `scaleX(${Math.max(0, Math.min(1, scrolled))})`;
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function setupVerseCopy() {
  $$(".verse").forEach((verse) => {
    if ($(".copy-verse", verse)) return;
    const btn = document.createElement("button");
    btn.className = "copy-verse";
    btn.type = "button";
    btn.textContent = "📋 Kopjo ajetin";
    btn.addEventListener("click", () => {
      const clone = verse.cloneNode(true);
      $(".copy-verse", clone)?.remove();
      const text = clone.innerText.trim();
      navigator.clipboard?.writeText(text).then(() => {
        btn.textContent = "✓ U kopjua!";
        setTimeout(() => { btn.textContent = "📋 Kopjo ajetin"; }, 1500);
      });
    });
    verse.appendChild(btn);
  });
}

function ensureSearchModal() {
  let modal = $("#searchModal");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "searchModal";
  modal.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true" aria-label="Kerko ne sajt">
      <div class="modal-head">
        <div class="search-input-wrapper">
          <span class="search-icon">⌕</span>
          <input id="searchModalInput" placeholder="Kërko tema, ajete, shkencë…" autocomplete="off">
        </div>
        <button class="theme-toggle" type="button" data-close-search>✕ Mbylle</button>
      </div>
      <div class="modal-results" id="searchModalResults">
        <div class="search-initial-state"><p>Fillo të shkruash për të kërkuar…</p></div>
      </div>
    </div>`;
  document.body.appendChild(modal);
  return modal;
}

let searchIndex = [];
let searchReady = false;

function resultHref(href) {
  if (!href || /^(https?:|#|\/)/i.test(href)) return href || "#";
  return `${rootPrefix}${href}`;
}

function renderResults(q = "") {
  const modalResults = $("#searchModalResults");
  if (!modalResults) return;
  const needle = normalizeText(q);
  if (!needle) {
    modalResults.innerHTML = '<div class="search-initial-state"><p>Fillo të shkruash për të kërkuar…</p></div>';
    return;
  }
  const items = searchIndex
    .filter((item) => normalizeText(`${item.title} ${(item.tags || []).join(" ")} ${item.excerpt}`).includes(needle))
    .slice(0, 60);
  modalResults.innerHTML = "";
  if (!searchReady) {
    const empty = document.createElement("div");
    empty.className = "modal-empty";
    empty.textContent = "Kerkimi po ngarkohet…";
    modalResults.appendChild(empty);
    return;
  }
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "modal-empty";
    empty.textContent = "Nuk u gjet asnjë rezultat.";
    modalResults.appendChild(empty);
    return;
  }
  items.forEach((item) => {
    const a = document.createElement("a");
    a.href = resultHref(item.href);
    const title = document.createElement("strong");
    title.textContent = item.title;
    const excerpt = document.createElement("span");
    excerpt.textContent = item.excerpt;
    a.append(title, excerpt);
    modalResults.appendChild(a);
  });
}

function setupGlobalSearch() {
  const modal = ensureSearchModal();
  const input = $("#searchModalInput");
  const openModal = () => {
    modal.classList.add("open");
    if (input) { input.value = ""; setTimeout(() => input.focus(), 0); }
    renderResults("");
  };
  const closeModal = () => modal.classList.remove("open");
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault(); openModal();
    }
    if (event.key === "Escape") closeModal();
  });
  $$("[data-open-search]").forEach((button) => button.addEventListener("click", openModal));
  $$("[data-close-search]").forEach((button) => button.addEventListener("click", closeModal));
  modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
  input?.addEventListener("input", (event) => renderResults(event.target.value));

  fetch(`${rootPrefix}search-index.json`)
    .then((r) => r.ok ? r.json() : Promise.reject())
    .then((data) => { searchIndex = Array.isArray(data) ? data : []; searchReady = true; })
    .catch(() => {
      searchIndex = $$("[data-card]").map((card) => ({
        title: $("h3", card)?.textContent.trim() || "Artikull",
        href: $("a[href]", card)?.getAttribute("href") || "#",
        tags: [],
        excerpt: $("p", card)?.textContent.trim() || ""
      }));
      searchReady = true;
    });
}

function setupCounters() {
  const counters = $$('.trust-num');
  if (!counters.length) return;
  if (!("IntersectionObserver" in window)) {
    counters.forEach(c => c.textContent = c.getAttribute('data-count'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-count') || "0", 10);
        let current = 0;
        const increment = Math.max(1, Math.floor(countTo / 30));
        const timer = setInterval(() => {
          current += increment;
          if (current >= countTo) {
            target.textContent = countTo;
            clearInterval(timer);
          } else {
            target.textContent = current;
          }
        }, 30);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// Reading time estimator for articles
function setupReadingTime() {
  const content = $("main.content");
  if (!content) return;
  const text = content.textContent || "";
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  const hero = $(".page-hero");
  if (!hero) return;
  const rt = document.createElement("div");
  rt.className = "reading-time";
  rt.innerHTML = `<span>📖 ${minutes} min lexim</span>`;
  hero.appendChild(rt);
}

// Init
enhanceNavigation();
enhanceCards();
enhanceArticleVisuals();
setupNavigation();
setupTopButton();
setupTheme();
setupLocalCardSearch();
setupProgressBar();
setupVerseCopy();
setupGlobalSearch();
setupRevealEffects();
setupCounters();
setupReadingTime();
