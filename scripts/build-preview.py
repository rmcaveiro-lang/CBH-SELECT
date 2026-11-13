"""Gera uma prévia autocontida (um único HTML) a partir dos snapshots do site.
Uso: python3 scripts/build-preview.py  ->  preview/cbh-select.html"""
import base64, glob, json, re

parts = json.load(open("preview/parts.json"))
css = open(glob.glob("out/_next/static/css/*.css")[0]).read()

def datauri(path, mime):
    return f"data:{mime};base64," + base64.b64encode(open(path, "rb").read()).decode()

# fontes: mantém latin e latin-ext embutidas, descarta as demais
def font(m):
    block = m.group(0)
    u = re.search(r"url\((/_next/static/media/[^)]+\.woff2)\)", block)
    if not u or not re.search(r"latin-(ext-)?wght", u.group(1)) or "latin-ext" not in u.group(1) and "-latin-wght" not in u.group(1):
        return ""
    return block.replace(u.group(1), datauri("out" + u.group(1), "font/woff2"))
css = re.sub(r"@font-face\{[^}]*\}", font, css)

logo = datauri("out/brand/cbh-logo-dark-bg.png", "image/png")
ROUTES = {"/": "home", "/explore/": "explore", "/sport/": "sport", "/events/": "events", "/experiences/": "experiences",
          "/casa-cbh/": "casa-cbh", "/premio-hipismo-brasil/": "premio-hipismo-brasil",
          "/events/circuito-senior-top/": "circuito-senior-top", "/select/": "select", "/selection/": "selection"}

def fix(html):
    html = re.sub(r"<script\b.*?</script>", "", html, flags=re.S)
    html = html.replace("/brand/cbh-logo-dark-bg.png", logo)
    def href(m):
        path = m.group(1).split("?")[0].split("#")[0]
        if not path.endswith("/"): path += "/"
        return f'href="#{ROUTES.get(path, "home")}"'
    return re.sub(r'href="(/[^"]*)"', href, html)

header = fix(parts["headerWithSel"])
footer = fix(parts["footer"])
drawer = fix(parts["drawer"]).replace("drawer tone-paper on", "drawer tone-paper").replace(' hidden=""', "")
routes = "".join(f'<div class="route" data-route="{k}" hidden>{fix(v)}</div>' for k, v in parts["routes"].items())
panels = "".join(f"<template class=\"modtpl\">{fix(p)}</template>" for p in parts["panels"])

js = r"""
(function () {
  var routes = document.querySelectorAll(".route");
  function show() {
    var h = (location.hash || "#home").slice(1), hit = false;
    routes.forEach(function (r) { var on = r.dataset.route === h; r.hidden = !on; if (on) hit = true; });
    if (!hit) routes[0].hidden = false;
    document.querySelectorAll(".mainnav a").forEach(function (a) {
      if (a.getAttribute("href") === "#" + h) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    document.querySelector(".mainnav").classList.remove("open");
    window.scrollTo(0, 0);
  }
  addEventListener("hashchange", show); show();

  var drawer = document.querySelector(".drawer"), scrim = document.querySelector(".scrim");
  function setDrawer(on) { drawer.classList.toggle("on", on); scrim.classList.toggle("on", on); drawer.inert = !on; }
  setDrawer(false);
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button, a"); if (!t) return;
    if (t.classList.contains("selbtn")) return setDrawer(true);
    if (t.closest(".drawer") && (t.classList.contains("x") && t.textContent.trim() === "Fechar" || t.tagName === "A")) setDrawer(false);
    if (t.classList.contains("menubtn")) { var n = document.querySelector(".mainnav"); n.classList.toggle("open"); t.textContent = n.classList.contains("open") ? "Fechar" : "Menu"; }
    if (t.classList.contains("addsel")) {
      var on = t.getAttribute("aria-pressed") !== "true"; t.setAttribute("aria-pressed", on);
      t.lastChild.textContent = on ? "Na seleção" : "Adicionar à seleção";
    }
    if (t.classList.contains("opt")) t.setAttribute("aria-pressed", t.getAttribute("aria-pressed") !== "true");
    if (t.closest(".builder-bar") && t === t.parentNode.lastElementChild) location.hash = "#select-result";
    if (/Solicitar proposta/.test(t.textContent)) location.hash = "#selection";
    if (/Revisar respostas/.test(t.textContent)) location.hash = "#select";
    // abas de modalidade
    if (t.closest(".modtabs")) {
      var tabs = Array.prototype.slice.call(t.parentNode.children), i = tabs.indexOf(t);
      tabs.forEach(function (b, j) { b.setAttribute("aria-selected", j === i); b.tabIndex = j === i ? 0 : -1; });
      var panel = t.closest(".modx").querySelector(".modpanel");
      panel.outerHTML = document.querySelectorAll(".modtpl")[i].innerHTML;
    }
    // filtros por chip: compara com o rótulo de cada card
    if (t.closest(".chips")) {
      var group = t.parentNode; group.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", b === t); });
      var want = t.textContent.replace(/\s+/g, " ").trim(), all = /^(Tudo|Todas)$/.test(want);
      var cards = group.closest("section").querySelectorAll(".card"), n = 0;
      cards.forEach(function (c) { var l = c.querySelector(".meta .label"); var ok = all || (l && l.textContent.replace(/\s+/g, " ").trim() === want); c.hidden = !ok; if (ok) n++; });
      var cnt = group.closest("section").querySelector(".fsels .label.num"); if (cnt) cnt.textContent = String(n).padStart(2, "0") + " resultados";
    }
  });
  scrim.addEventListener("click", function () { setDrawer(false); });
  addEventListener("keydown", function (e) { if (e.key === "Escape") setDrawer(false); });
  document.addEventListener("submit", function (e) {
    e.preventDefault();
    var b = e.target.querySelector("button[type=submit]"); b.textContent = "No site publicado, isto abre o WhatsApp";
  });
})();
"""

page = f"""<title>CBH SELECT</title>
<style>{css}
.route[hidden], .card[hidden] {{ display: none !important; }}
html {{ scroll-behavior: auto; }}
</style>
<a class="sr-only" href="#home">Início</a>
{header}
<main id="conteudo">{routes}</main>
{footer}
<div class="scrim" aria-hidden="true"></div>
{drawer}
{panels}
<script>{js}</script>
"""
open("preview/cbh-select.html", "w").write(page)
print(len(page) // 1024, "KB")
