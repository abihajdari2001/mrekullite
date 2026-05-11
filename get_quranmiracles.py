import urllib.request
import ssl
import re


ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request('https://quranmiracles.com/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')

links = re.findall(r'href="(https?://[^"]+)"', html)
# find an article link
article_links = [l for l in links if 'quranmiracles.com' in l and len(l.split('/')) > 4 and 'category' not in l]

print("Links:", article_links[:2])

if article_links:
    article_html = urllib.request.urlopen(urllib.request.Request(article_links[0], headers={'User-Agent': 'Mozilla/5.0'}), context=ctx).read().decode('utf-8')
    # strip html tags for first 2000 chars of body
    text = re.sub(r'<[^>]+>', ' ', article_html)
    text = re.sub(r'\s+', ' ', text)
    print("Content snippet:", text[1000:3000])
