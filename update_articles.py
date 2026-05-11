#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os, re

BASE = r'c:\Users\user\Desktop\mrekullite'

HEADER = '''  <header class="header">
    <div class="container navbar">
      <a class="brand" href="{root}index.html">
        <img src="{root}assets/logo.svg" alt="Logo" loading="lazy">
        <span class="brand-title">Mrekullitë e Kuranit</span>
      </a>
      <nav class="nav-links" id="mainNav">
        <a href="{root}index.html">Ballina</a>
        <a href="{root}astronomia/index.html">Astronomia</a>
        <a href="{root}biologji/index.html">Biologji</a>
        <a href="{root}kozmologji/index.html">Kozmologji</a>
        <a href="{root}embriologji/index.html">Embriologji</a>
        <a href="{root}gjeologji/index.html">Gjeologji</a>
        <a href="{root}about.html">Rreth nesh</a>
        <button class="theme-toggle" data-theme aria-label="Ndrysho temën">☀ Ndrico</button>
        <button class="theme-toggle" data-open-search aria-label="Kërko">⌕ Kërko</button>
      </nav>
      <button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="mainNav">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div id="progress"></div>
  </header>'''

FOOTER = '''  <footer class="footer">
    <div class="container">
      <div class="cols">
        <div class="footer-brand">
          <a class="brand" href="{root}index.html">
            <img src="{root}assets/logo.svg" alt="Logo" loading="lazy">
            <span class="brand-title">Mrekullitë e Kuranit</span>
          </a>
          <p>Arkivë shkencore e dedikuar për të ndriçuar harmoninë mes shkencës moderne dhe shpalljes hyjnore.</p>
        </div>
        <div>
          <h4>Kategoritë</h4>
          <div class="kicker">
            <a href="{root}astronomia/index.html">Astronomia</a>
            <a href="{root}biologji/index.html">Biologji</a>
            <a href="{root}gjeologji/index.html">Gjeologji</a>
            <a href="{root}kimi/index.html">Kimi</a>
            <a href="{root}kozmologji/index.html">Kozmologji</a>
            <a href="{root}zoologji/index.html">Zoologji</a>
            <a href="{root}fiziologji/index.html">Fiziologji</a>
            <a href="{root}embriologji/index.html">Embriologji</a>
          </div>
        </div>
        <div>
          <h4>Eksploro</h4>
          <ul>
            <li><a href="{root}index.html">Ballina</a></li>
            <li><a href="{root}about.html">Rreth Nesh</a></li>
            <li><button class="text-btn" data-open-search>Kërko (Ctrl+K)</button></li>
          </ul>
        </div>
        <div>
          <h4>Ndaj Dijen</h4>
          <p>Telegram: <a href="https://t.me/mrekullite">@mrekullite</a></p>
          <div class="footer-actions">
            <button class="btn btn-sm" onclick="sharePage('Mrekullitë e Kuranit')">Shpërndaje</button>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="copy">© <span id="y"></span> Mrekullitë e Kuranit — <span class="license">Pa të drejta autori. Lirisht kopjo, ngjit dhe ndaj dijen.</span></p>
      </div>
    </div>
  </footer>
  <button class="top-btn" aria-label="Kthehu lart">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
  </button>
  <script>document.getElementById('y').textContent = new Date().getFullYear();</script>
  <script src="{root}js/main.js"></script>
  <div class="modal" id="searchModal">
    <div class="modal-card">
      <div class="modal-head">
        <div class="search-input-wrapper">
          <span class="search-icon">⌕</span>
          <input id="searchModalInput" placeholder="Kërko në të gjithë sajtin…" autocomplete="off">
        </div>
        <button class="theme-toggle" data-close-search>✕ Mbylle</button>
      </div>
      <div class="modal-results" id="searchModalResults">
        <div class="search-initial-state"><p>Fillo të shkruash për të kërkuar…</p></div>
      </div>
    </div>
  </div>'''

def fix_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Determine root prefix
    relpath = os.path.relpath(filepath, BASE).replace('\\','/')
    depth = relpath.count('/')
    root = '../' * depth

    new_header = HEADER.format(root=root)
    new_footer = FOOTER.format(root=root)

    # Replace header
    html = re.sub(r'<header[\s\S]*?</header>', new_header, html, count=1)

    # Fix old burger button with ☰
    html = html.replace('<button class="burger" aria-label="Menu">☰</button>', '')

    # Replace old footer block
    html = re.sub(r'<footer[\s\S]*?</footer>', new_footer, html, count=1)

    # Remove old top-btn and script duplicates after new footer
    html = re.sub(r'<button class="top-btn"[^>]*>.*?</button>', '', html)
    html = re.sub(r"<script>document\.getElementById\('y'\)[^<]+</script>", '', html)
    html = re.sub(r'<script src="[^"]*main\.js[^"]*"></script>', '', html)

    # Remove old search modal duplicates
    html = re.sub(r'<div class="modal"[^>]*id="searchModal"[\s\S]*?</div>\s*</div>\s*</div>', '', html)

    # Fix old inline progress bar style
    html = re.sub(
        r'<div id="progress"[^>]*style="[^"]*"[^>]*></div>',
        '<div id="progress"></div>',
        html
    )

    # Fix page-hero: add eyebrow category if missing, ensure proper structure
    html = re.sub(
        r'<section class="page-hero"[^>]*style="[^"]*"[^>]*>',
        '<section class="page-hero">',
        html
    )

    # Add has-topic-art class handled by JS now, just remove inline style from page-hero
    # Ensure data-theme button has proper aria
    html = html.replace(
        '<button class="theme-toggle" data-theme>Ndrysho temën</button>',
        '<button class="theme-toggle" data-theme aria-label="Ndrysho temën">☀ Ndrico</button>'
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f'Fixed: {relpath}')

count = 0
for dirpath, dirs, files in os.walk(BASE):
    for fn in files:
        if fn.endswith('.html'):
            fp = os.path.join(dirpath, fn)
            try:
                fix_html_file(fp)
                count += 1
            except Exception as e:
                print(f'ERROR {fp}: {e}')

print(f'\nDone. Fixed {count} files.')
