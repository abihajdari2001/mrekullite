import os
import glob

for fp in glob.glob('**/*.html', recursive=True):
    with open(fp, 'r', encoding='utf-8') as f:
        html = f.read()

    if '</footer>' in html:
        before_footer = html.split('</footer>')[0] + '</footer>\n'
        
        # Calculate depth correctly
        fp_forward = fp.replace('\\', '/')
        depth = fp_forward.count('/')
        root = '../' * depth
        
        bottom = f'''  <button class="top-btn" aria-label="Kthehu lart">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
  </button>
  <script>
    const y = document.getElementById('y');
    if (y) y.textContent = new Date().getFullYear();
  </script>
  <script src="{root}js/main.js"></script>
</body>
</html>'''
        
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(before_footer + bottom)
        print("Fixed:", fp)
