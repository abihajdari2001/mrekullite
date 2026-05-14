import os
import re

categories = ['astronomia', 'biologji', 'embriologji', 'fiziologji', 'gjeologji', 'kimi', 'kozmologji', 'zoologji']
base_dir = r"c:\Users\user\Desktop\mrekullite"

for cat in categories:
    cat_dir = os.path.join(base_dir, cat)
    if not os.path.exists(cat_dir):
        continue
    
    files = [f for f in os.listdir(cat_dir) if f.endswith('.html') and f != 'index.html']
    
    cards_html = ""
    for f in files:
        filepath = os.path.join(cat_dir, f)
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
            title_match = re.search(r'<h1>(.*?)</h1>', content)
            title = title_match.group(1) if title_match else f.replace('.html', '').replace('_', ' ').title()
            
            desc_match = re.search(r'<p class="lead">(.*?)</p>', content)
            desc = desc_match.group(1) if desc_match else ""
            
            img_match = re.search(r'<figure class="article-visual[^>]*>.*?<img src="(.*?)" alt="(.*?)"', content, re.DOTALL)
            if img_match:
                img_src = img_match.group(1)
                img_alt = img_match.group(2)
                img_html = f'\n        <div class="card-media">\n          <img src="{img_src}" alt="{img_alt}" loading="lazy">\n        </div>'
            else:
                img_html = ""
            
            cards_html += f'''
      <article class="card" data-card>{img_html}
        <h3>{title}</h3>
        <p>{desc}</p>
        <a class="btn" href="{f}">Lexo Artikullin</a>
      </article>'''

    if not cards_html:
        cards_html = "<p>Së shpejti do të shtohen artikuj të rinj në këtë kategori.</p>"

    # Update the category index.html
    idx_path = os.path.join(cat_dir, 'index.html')
    if os.path.exists(idx_path):
        with open(idx_path, 'r', encoding='utf-8') as idx_file:
            idx_content = idx_file.read()
            
        # Replace everything inside <div class="grid">...</div> with the new cards
        # using </main> as boundary to avoid nested </div> issues
        new_content = re.sub(r'<div class="grid">.*?</main>', f'<div class="grid">{cards_html}\n    </div>\n</main>', idx_content, flags=re.DOTALL)
        
        with open(idx_path, 'w', encoding='utf-8') as idx_file:
            idx_file.write(new_content)
        print(f"Updated {cat}/index.html with {len(files)} articles.")
