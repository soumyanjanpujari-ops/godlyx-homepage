#!/usr/bin/env python3
"""Configure absolute SEO URLs after you own and verify the production domain.

Usage: python configure_site.py https://your-verified-domain.com
"""
import re
import sys
from html import escape
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit('Usage: python configure_site.py https://your-verified-domain.com')
    value = sys.argv[1].strip().rstrip('/')
    parsed = urlparse(value)
    if parsed.scheme != 'https' or not parsed.hostname or parsed.path not in ('', '/') or parsed.query or parsed.fragment or parsed.username or parsed.password:
        raise SystemExit('Provide an HTTPS site origin without a path, query, credentials, or fragment.')
    origin = f'https://{parsed.netloc.lower()}'
    page = ROOT / 'index.html'
    html = page.read_text(encoding='utf-8')

    html = re.sub(
        r'  <!-- Set the real production URL[^\n]*\n  <!-- <link rel="canonical"[^\n]*\n  <!-- <meta property="og:url"[^\n]*',
        f'  <link rel="canonical" href="{escape(origin)}/" />\n  <meta property="og:url" content="{escape(origin)}/" />',
        html,
    )
    html = re.sub(r'<link rel="canonical" href="[^"]*" />', f'<link rel="canonical" href="{escape(origin)}/" />', html)
    html = re.sub(r'<meta property="og:url" content="[^"]*" />', f'<meta property="og:url" content="{escape(origin)}/" />', html)
    html = re.sub(r'(<meta property="og:image" content=")[^"]+', rf'\g<1>{origin}/assets/og-image.png', html)
    html = re.sub(r'(<meta name="twitter:image" content=")[^"]+', rf'\g<1>{origin}/assets/og-image.png', html)
    html = re.sub(r'("logo":")[^"]+', rf'\g<1>{origin}/assets/godlyx-symbol.svg', html)
    html = html.replace('"name":"Godlyx",\n    "description"',f'"name":"Godlyx",\n    "url":"{origin}/",\n    "description"') if '"url":"' not in html.split('</script>')[0] else html
    page.write_text(html, encoding='utf-8')

    (ROOT / 'sitemap.xml').write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f'  <url><loc>{escape(origin)}/</loc></url>\n'
        '</urlset>\n', encoding='utf-8',
    )
    (ROOT / 'robots.txt').write_text(
        'User-agent: *\nAllow: /\n' + f'Sitemap: {origin}/sitemap.xml\n', encoding='utf-8',
    )
    print(f'Configured canonical, Open Graph, JSON-LD, robots.txt, sitemap.xml for {origin}')


if __name__ == '__main__':
    main()
