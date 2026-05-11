import urllib.request
import ssl
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request('https://quranmiracles.com/sitemap_index.xml', headers={'User-Agent': 'Mozilla/5.0'})
try:
    sitemap_index = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
    print("Sitemap index found!")
except Exception as e:
    print("No sitemap_index.xml", e)
    try:
        req = urllib.request.Request('https://quranmiracles.com/post-sitemap.xml', headers={'User-Agent': 'Mozilla/5.0'})
        sitemap = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
        urls = re.findall(r'<loc>(https?://[^<]+)</loc>', sitemap)
        print("Urls:", urls[:10])
    except Exception as e2:
        print("No post-sitemap.xml", e2)
