# Scissorscut Makeover Studio – Website

A static, mobile-first website (HTML, CSS, vanilla JS). No build step needed.

## Run locally
```bash
cd scissorscut-site
python3 -m http.server 8000
# open http://localhost:8000
```
Or just double-click `index.html`.

## Replace placeholders with real photos
Sample stock photos (Unsplash, free licence) are hotlinked from `https://images.unsplash.com`. To use real photos, drop them into `images/` using the paths in each `data-local` attribute and change that `<img>`'s `src` to the same path. Slots without a photo (Party Makeup, Professional Makeup, Facial) show a placeholder tile.
- `images/hero.jpg` (wide, ~1920px) and `images/about.jpg` (portrait)
- `images/services/*.jpg` (haircut, blowdry, spa, smoothening, straightening, coloring, highlights, bridal, party-makeup, makeup, facial, makeover)
- `images/gallery/*.jpg` (transform-1/2, styling-1/2, color-1/2, interior-1/2, inspo-1/2)

Until a photo exists, an elegant placeholder tile shows instead. Compress photos (e.g. squoosh.app) to under ~300 KB each. Only show real work as "Hair Transformations" and the real salon as "Salon Interior".

## Things to confirm with the owner
- **Service list** (draft only) – edit or delete cards in the `#services` section.
- **Reviews** – no reviews are shown. Add real Google reviews (with permission) later.
- **Google Map embed** – in Google Maps: Share > Embed a map, paste the iframe into the `.map-card` in `index.html`.
- **Domain** – replace `https://www.example.com/` in `index.html` (canonical, og:url, og:image, JSON-LD), `robots.txt` and `sitemap.xml`.
- **Opening hours** – not included; add `openingHours` to the JSON-LD once known.

## Deploy on Vercel
1. Push this folder to a GitHub repository.
2. Go to vercel.com, sign in, click **Add New > Project**, import the repo.
3. Framework preset: **Other**. Leave build command and output directory empty. Click **Deploy**.
(Alternative: `npx vercel` from this folder.)

## Connect a custom domain
1. In Vercel: Project > **Settings > Domains** > add your domain (e.g. `scissorscutstudio.in`).
2. At your registrar, add the DNS records Vercel shows: an **A record** `76.76.21.21` for the root domain and a **CNAME** `cname.vercel-dns.com` for `www` (use the exact values Vercel displays).
3. Wait for DNS to propagate (minutes to a few hours); Vercel issues HTTPS automatically.
4. Update the domain in the files listed above, then submit the site in Google Search Console.
5. Also add the website URL to the salon's Google Business Profile for local SEO.
