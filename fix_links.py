import os, re

def fix_links():
    count = 0
    for dirpath, _, files in os.walk('.'):
        for fn in files:
            if fn.endswith('.html'):
                fp = os.path.join(dirpath, fn)
                with open(fp, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace any 'ë' in href="..." ending with .html
                def replacer(match):
                    return 'href="' + match.group(1).replace('ë', 'e') + '.html"'
                
                new_content = re.sub(r'href="([^"]*?ë[^"]*?)\.html"', replacer, content)
                
                if new_content != content:
                    with open(fp, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    count += 1
    print(f"Fixed links in {count} files")

fix_links()
