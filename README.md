# Godlyx — Premium Parent Company Homepage

A responsive, search-engine-readable static homepage with a custom SVG logo, CSS-created 3D artwork, product showcase, source-linked quotations, SEO metadata, and a generated Open Graph image.

## View locally

Open `index.html` directly, or for a local HTTP server:

```bash
python3 -m http.server 8080
# visit http://localhost:8080/
```

Deploy the folder as a static site with Vercel, Netlify, Cloudflare Pages, GitHub Pages, or an Nginx server. No build step or backend is required.

## Before deploying to a real domain (important)

1. **Confirm name rights.** Check Godlyx company-name, trademark, and domain availability in relevant countries before launching; this package does not establish exclusive naming rights.
2. After confirming your production HTTPS domain, run `python3 configure_site.py https://YOUR-VERIFIED-DOMAIN.com`. This sets canonical, Open Graph URL, absolute image URLs, JSON-LD logo and site URL, and generates `sitemap.xml` / `robots.txt`. Do **not** run it with a fictional domain.
3. Check the generated metadata on the public site using a social-preview validator and search-engine tooling.
4. Submit `sitemap.xml` once the domain is verified and live.
5. Verify each product's current release status and links. Only Bharatiya Pathshala and the Template Builder preview link to user-provided URLs. Other products are descriptions of concepts/initiatives, not claims that standalone apps have shipped.
6. Add a privacy policy and contact page once you have the appropriate business details. No fake addresses, certifications, testimonials, or traffic statistics are included.
7. Make product copy match their actual availability before indexing.

## Files

- `index.html` — semantic, server-renderable static HTML with meta tags and JSON-LD
- `styles.css` — responsive layout, dark cinematic aesthetics, animated CSS 3D effects
- `script.js` — mobile menu, product category filters, lazy reveal
- `assets/godlyx-symbol.svg` — fully editable SVG G logo, gradient shading
- `assets/godlyx-wordmark.svg` — standalone horizontal Godlyx SVG lockup
- `assets/favicon.svg` — vector browser icon
- `assets/og-image.png` — 1200x630 social preview image
- `assets/og-image.svg` — editable source of the social preview
- `robots.txt` — crawl directives (sitemap added by configuration script)
- `configure_site.py` — final-domain SEO metadata and sitemap configuration

## Verified quote source links

- Srinivasa Ramanujan: recounted by S. R. Ranganathan in *Ramanujan, the Man and the Mathematician* (1967), p. 88: https://en.wikiquote.org/wiki/Srinivasa_Ramanujan
- Swami Vivekananda: *The Complete Works*, Volume 3, "The Vedanta": https://en.wikisource.org/wiki/The_Complete_Works_of_Swami_Vivekananda/Volume_3/Lectures_from_Colombo_to_Almora/The_Vedanta
- J. Robert Oppenheimer: "Both the man of science and the man of art...", Columbia address (1954): https://news.columbia.edu/news/seen-oppenheimer-learn-about-columbias-role-building-first-atom-bomb
- Albert Einstein: George Sylvester Viereck interview (1929): https://en.wikiquote.org/wiki/Albert_Einstein

## SEO notes

The site is static, has one unique H1, a descriptive page title, meta description, Open Graph/Twitter cards, meaningful HTML text for each product, descriptive alt / SVG accessibility info, headings, accessible nav, and Organization JSON-LD. Static HTML is fully crawlable without JS.

Google does not promise rankings or a Lighthouse score; run Lighthouse and check Core Web Vitals after deploying on real infrastructure. Google Fonts in CSS are optional; removing the font import reduces external requests and improves privacy/performance.
