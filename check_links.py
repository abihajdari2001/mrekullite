import os, re, urllib.request

base_dir = r'c:\Users\user\Desktop\mrekullite'
html_files = []
for root, dirs, files in os.walk(base_dir):
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

pattern = re.compile(r'src=\"(https://images\.unsplash\.com/photo-[^\"]+)\"')
bad_links = []

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    matches = pattern.findall(content)
    for url in matches:
        try:
            req = urllib.request.Request(url, method='HEAD')
            with urllib.request.urlopen(req) as response:
                if response.status != 200:
                    bad_links.append((filepath, url, response.status))
        except urllib.error.HTTPError as e:
            bad_links.append((filepath, url, e.code))
        except Exception as e:
            bad_links.append((filepath, url, str(e)))

print('Finished checking links. Bad links found:')
for b in bad_links:
    print(f'{b[0]} : {b[1]} - {b[2]}')
