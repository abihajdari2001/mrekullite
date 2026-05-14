#!/usr/bin/env python3
import re
from pathlib import Path

# Define the root directory
ROOT_DIR = Path("c:\\Users\\user\\Desktop\\mrekullite")

# Define navbar links for different file locations
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

def get_prefix_and_items(file_path):
    """Determine the prefix and nav items based on file location."""
    relative_path = file_path.relative_to(ROOT_DIR)
    parts = relative_path.parts
    
    # Root index.html and about.html
    if len(parts) == 1:
        prefix = ""
        return prefix, NAV_ITEMS
    
    # Category index files (e.g., astronomia/index.html)
    if len(parts) == 2 and parts[1] == "index.html":
        prefix = "../"
        return prefix, NAV_ITEMS
    
    # Article files in category (e.g., astronomia/forma_e_tokes.html)
    if len(parts) == 2:
        prefix = "../"
        return prefix, NAV_ITEMS
    
    # Fallback
    prefix = "../" * (len(parts) - 1)
    return prefix, NAV_ITEMS

def generate_navbar_html(file_path):
    """Generate the navbar HTML for a given file."""
    prefix, items = get_prefix_and_items(file_path)
    
    nav_links = []
    for label, href in items:
        nav_links.append(f'        <a href="{prefix}{href}">{label}</a>')
    
    return "\n".join(nav_links)

def update_html_file(file_path):
    """Update the navbar in an HTML file."""
    try:
        content = file_path.read_text(encoding='utf-8')
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return False
    
    # Find the nav-links section between <nav class="nav-links"> and <button class="theme-toggle">
    # Pattern: <nav class="nav-links"...>...content...</nav> but we need to preserve button
    # Actually, pattern is: <nav class="nav-links" ...> ... <button class="theme-toggle"
    
    pattern = r'(<nav class="nav-links"[^>]*>)\s*(.*?)(\s*<button class="theme-toggle")'
    
    def replace_nav(match):
        nav_opening = match.group(1)
        # Keep the opening tag on same line or with whitespace
        new_nav_content = generate_navbar_html(file_path)
        button_start = match.group(3)
        return f"{nav_opening}\n{new_nav_content}\n{button_start}"
    
    # Replace the navbar content
    new_content = re.sub(pattern, replace_nav, content, flags=re.DOTALL)
    
    # Check if content actually changed
    if new_content == content:
        return False
    
    # Write back
    try:
        file_path.write_text(new_content, encoding='utf-8')
        return True
    except Exception as e:
        print(f"Error writing {file_path}: {e}")
        return False

def verify_navbar(file_path):
    """Verify that a file has all required navbar links."""
    try:
        content = file_path.read_text(encoding='utf-8')
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return False, []
    
    _, items = get_prefix_and_items(file_path)
    missing = []
    
    for label, _ in items:
        # Check if label exists in navbar section
        nav_match = re.search(r'<nav class="nav-links"[^>]*>(.*?)<button class="theme-toggle"', content, re.DOTALL)
        if nav_match:
            nav_content = nav_match.group(1)
            if label not in nav_content:
                missing.append(label)
        else:
            missing.append(label)
    
    return len(missing) == 0, missing

def main():
    # Find all HTML files
    html_files = sorted(ROOT_DIR.rglob("*.html"))
    
    print(f"Found {len(html_files)} HTML files")
    print("-" * 70)
    
    updated_count = 0
    issues = []
    
    for file_path in html_files:
        is_updated = update_html_file(file_path)
        relative_path = file_path.relative_to(ROOT_DIR)
        
        if is_updated:
            updated_count += 1
            print(f"✓ Updated: {relative_path}")
        else:
            print(f"  Checked: {relative_path}")
    
    print("-" * 70)
    print(f"\nUpdated {updated_count} HTML files")
    
    # Verify all files have complete navbars
    print("\nVerifying all files have complete navbars...")
    print("-" * 70)
    
    verification_issues = 0
    for file_path in html_files:
        is_valid, missing = verify_navbar(file_path)
        relative_path = file_path.relative_to(ROOT_DIR)
        
        if not is_valid:
            verification_issues += 1
            print(f"✗ Missing links in {relative_path}: {', '.join(missing)}")
        else:
            print(f"✓ Valid: {relative_path}")
    
    print("-" * 70)
    if verification_issues == 0:
        print("\n✓ All files have complete and consistent navbars!")
    else:
        print(f"\n✗ {verification_issues} files have incomplete navbars")
        return False
    
    return True

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
