import os, re

base_dir = r'c:\Users\user\Desktop\mrekullite'
categories = ['astronomia', 'biologji', 'kimi', 'kozmologji', 'embriologji', 'gjeologji', 'fiziologji', 'zoologji']

total_count = 0
counts = {}

# Calculate counts
for cat in categories:
    cat_dir = os.path.join(base_dir, cat)
    if os.path.exists(cat_dir):
        files = [f for f in os.listdir(cat_dir) if f.endswith('.html') and f != 'index.html']
        counts[cat] = len(files)
        total_count += len(files)

print('Counts:', counts)
print('Total:', total_count)

# Update index.html
index_path = os.path.join(base_dir, 'index.html')
with open(index_path, 'r', encoding='utf-8') as f:
    index_html = f.read()

for cat, count in counts.items():
    pattern = r'(<h3>' + cat.capitalize() + r'</h3>\s*<p>[^<]*?)\d+( tema kryesore\.</p>)'
    index_html = re.sub(pattern, r'\g<1>' + str(count) + r'\g<2>', index_html, flags=re.IGNORECASE)

index_html = re.sub(r'data-count=\"\d+\">\d+</span><span>\+ tema</span>', f'data-count=\"{total_count}\">{total_count}</span><span>+ tema</span>', index_html)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(index_html)

# Update category/index.html files
for cat, count in counts.items():
    cat_index_path = os.path.join(base_dir, cat, 'index.html')
    if os.path.exists(cat_index_path):
        with open(cat_index_path, 'r', encoding='utf-8') as f:
            cat_html = f.read()
        
        cat_html = re.sub(r'<p>\d+ tema të përzgjedhura\.</p>', f'<p>{count} tema të përzgjedhura.</p>', cat_html)
        
        with open(cat_index_path, 'w', encoding='utf-8') as f:
            f.write(cat_html)

print('Updated counts successfully.')
