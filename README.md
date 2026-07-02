# Lumiere Landing

Static landing page for Lumiere, built as plain HTML/CSS/JavaScript and deployed directly from the repository root.

## Project Structure

- `index.html` - entry page.
- `desktop.html` - desktop English landing page.
- `mobile.html` - mobile English landing page.
- `desktop-cn.html` - desktop Chinese landing page.
- `mobile-cn.html` - mobile Chinese landing page.
- `*.mp4` - landing page video assets.
- `flyer/` - flyer HTML concepts, still images, generator script, and exported PDF.
- `docs/` - supporting documentation.
- `vercel.json` - Vercel config for static deployment with no build step.

## Local Preview

No package install is required. Open `index.html` directly in a browser, or serve the folder locally:

```bash
python -m http.server 3000
```

Then open:

```text
http://localhost:3000
```

## Development Notes

- Keep the site dependency-free unless a feature clearly needs a build step.
- Update desktop and mobile variants together when changing shared content.
- Update English and Chinese variants together when changing copy.
- Keep large media files compressed enough for web delivery.
- If routing changes, update `robots.txt`, `sitemap.xml`, and `vercel.json` as needed.

## Deployment

The project is configured for static Vercel deployment:

```json
{
  "buildCommand": "",
  "outputDirectory": ".",
  "framework": null
}
```

Vercel should publish the repository root directly.
