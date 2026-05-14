#!/usr/bin/env python3
"""
Update all HTML navbars in the mrekullite project to be consistent.
"""

import re
import sys
from pathlib import Path

ROOT_DIR = Path(r"c:\Users\user\Desktop\mrekullite")

NAV_ITEMS = [
    ("Astronomia", "astronomia/index.html"),
    ("Biologji", "biologji/index.html"),
    ("Kimi", "kimi/index.html"),
    ("Kozmologji", "kozmologji/index.html"),
    ("Embriologji", "embriologji/index.html"),
    ("Gjeologji", "gjeologji/index.html"),
    ("Fiziologji", "fiziologji/index.html"),
    ("Rreth nesh", "about.html"),
]

def get_file_type(file_path):
    """Determine file type and required prefix."""
    relative = file_path.relative_to(ROOT_DIR)
    parts = relative.parts
    
    # Root files
    if len(parts) == 1:
        return "root", ""
    
    # Category index or article files
    if len(parts) == 2:
        if parts[1] == "index.html":
            return "category_index", "../"
        else:
            return "article", "../"
    
    return "other", "../"

def generate_nav_html(file_path):
    """Generate navbar HTML."""
    _, prefix = get_file_type(file_path)
    lines = []
    for label, href in NAV_ITEMS:
        lines.append(f'        <a href="{prefix}{href}">{label}</a>')
    return "\n".join(lines)

def update_file(file_path):
    """Update navbar in a single file."""
    content = file_path.read_text(encoding='utf-8')
    original_content = content
    
    # Pattern to find and replace navbar
    pattern = r'(<nav class="nav-links"[^>]*>)\s*(.*?)(\s*<button class="theme-toggle")'
    
    def replacer(match):
        nav_start = match.group(1)
        nav_html = generate_nav_html(file_path)
        button_start = match.group(3)
        return f"{nav_start}\n{nav_html}\n{button_start}"
    
    updated_content = re.sub(pattern, replacer, content, flags=re.DOTALL)
    
    if updated_content != original_content:
        file_path.write_text(updated_content, encoding='utf-8')
        return True
    return False

def verify_file(file_path):
    """Check if file has all navbar items."""
    content = file_path.read_text(encoding='utf-8')
    nav_match = re.search(r'<nav class="nav-links"[^>]*>(.*?)<button class="theme-toggle"', content, re.DOTALL)
    
    if not nav_match:
        return False, []
    
    nav_section = nav_match.group(1)
    missing = []
    for label, _ in NAV_ITEMS:
        if label not in nav_section:
            missing.append(label)
    
    return len(missing) == 0, missing

def main():
    """Main function."""
    # Find all HTML files
    html_files = sorted(ROOT_DIR.rglob("*.html"))
    
    print(f"Found {len(html_files)} HTML files")
    print("=" * 70)
    
    updated_files = []
    checked_files = []
    
    for file_path in html_files:
        relative = file_path.relative_to(ROOT_DIR)
        was_updated = update_file(file_path)
        
        if was_updated:
            updated_files.append(relative)
            print(f"✓ Updated: {relative}")
        else:
            checked_files.append(relative)
    
    print("=" * 70)
    print(f"\nUpdate Summary:")
    print(f"  Updated: {len(updated_files)} files")
    print(f"  Already correct: {len(checked_files)} files")
    print(f"  Total processed: {len(html_files)} files")
    
    # Verification
    print("\n" + "=" * 70)
    print("Verification Results:")
    print("=" * 70)
    
    all_valid = True
    invalid_files = []
    
    for file_path in html_files:
        is_valid, missing = verify_file(file_path)
        relative = file_path.relative_to(ROOT_DIR)
        
        if not is_valid:
            all_valid = False
            invalid_files.append((relative, missing))
            print(f"✗ {relative}")
            print(f"  Missing: {', '.join(missing)}")
        else:
            print(f"✓ {relative}")
    
    print("=" * 70)
    if all_valid:
        print("\n✅ SUCCESS! All {0} files have complete, consistent navbars!".format(len(html_files)))
        return 0
    else:
        print(f"\n❌ FAILED! {len(invalid_files)} files have incomplete navbars:")
        for path, missing in invalid_files:
            print(f"  - {path}: Missing {missing}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
