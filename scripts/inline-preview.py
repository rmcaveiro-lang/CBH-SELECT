"""Junta a home exportada (HTML, CSS, JS, fontes e logo) num único arquivo para prévia.
Uso: python3 scripts/inline-preview.py  ->  preview/index.html"""
import base64, re
OUT = "out"
html = open(f"{OUT}/index.html").read()
def data(path, mime): return f"data:{mime};base64," + base64.b64encode(open(OUT + path, "rb").read()).decode()

def css_inline(m):
    css = open(OUT + m.group(1)).read()
    css = re.sub(r"url\((/_next/static/media/[^)]+\.woff2)\)", lambda u: f"url({data(u.group(1), 'font/woff2')})", css)
    return f"<style>{css}</style>"
html = re.sub(r'<link rel="stylesheet" href="(/_next/static/css/[^"]+)"[^>]*/?>', css_inline, html)
html = re.sub(r'<link rel="preload"[^>]*/?>', "", html)

scripts = []
def take(m):
    src = m.group(1)
    if "polyfills" in src: return ""
    scripts.append(open(OUT + src).read().replace("</script", "<\\/script"))
    return ""
html = re.sub(r'<script src="(/_next/[^"]+)"[^>]*></script>', take, html)
# runtime do webpack primeiro, depois os demais
scripts.sort(key=lambda s: 0 if "webpackChunk" in s[:400] and "__webpack_require__" in s[:3000] else 1)
logo = data("/brand/cbh-logo-dark-bg.png", "image/png")
html = html.replace("/brand/cbh-logo-dark-bg.png", logo)
tail = "".join(f"<script>{s}</script>" for s in scripts)
html = html.replace("</body>", tail + "</body>")
# MEDIA: fotos de /media viram data URI (uma vez cada, reaproveitadas)
for name in sorted(set(re.findall(r"/media/([a-z0-9-]+\.jpg)", html))):
    html = html.replace(f"/media/{name}", data(f"/media/{name}", "image/jpeg"))
open("preview/index.html", "w").write(html)
print(len(html) // 1024, "KB,", len(scripts), "scripts")
