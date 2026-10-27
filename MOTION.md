# Motion and component provenance

## Active website

The HTML pages use local GSAP 3.15.0 and ScrollTrigger with `motion.js`, `motion.css`, and `app.js`.

- Blue welcome lines and word-level heading reveals.
- Scroll-linked horizontal reveal for the homepage learning heading and supporting copy.
- Orbits and entrance shutters in blank photo frames.
- Numeric school counters; the founding year stays static.
- Flip/fade supplementary homepage text.
- Bobbing letters, a rotating star, and a floating arrow on learning cards.
- FAQ answers, navigation links, gallery-filter transitions, and the admissions process path.

Observed ambient effects pause outside the viewport. Pointer movement is limited to fine pointing devices. Motion starts automatically on every page, including when the browser prefers reduced motion. There is no motion toggle, and legacy saved pause preferences are ignored.

GSAP distribution files retain their upstream banners. See [GSAP terms](https://gsap.com/standard-license), `vendor/GSAP-README.md`, and `vendor/COMPONENT-NOTICES.txt`.

## Retained optional React components

Sources in `components/ui/`, registry snapshots in `components/registry/`, and the optional `vendor/school-components.js` bundle remain for reference. Active pages do not load the bundle or `library.css`.

Public Vengeance UI sources include Stats Counter, Flip Fade Text, Stagger Text, Share Sheet, Cylinder Carousel, Verse Cards, Testimonials Card, Team Reveal Grid, FAQ Accordion, Notch Navbar, Animated Tooltip, Gooey Search, and Light Lines. The public Skiper registry supplied Skiper19 and Skiper40. School-specific adaptations and keyboard improvements are retained in these files.

Cylinder Carousel's listed registry URL returned 404; its source came from the same library's public repository. Its renderer and Testimonials Card were adapted for blank photo slots. Next.js-only links were adapted to native anchors. No parent reviews or teacher identities were invented.

Skiper72 requires a Pro key and was not downloaded. An independent scroll-text effect was explored; no paid source was copied.

Vengeance UI is MIT-licensed; see `components/VENGEANCE-LICENSE`. Skiper's free components require attribution. Their notices are preserved, and the optional integration includes a footer credit. Check [Skiper usage documentation](https://skiper-ui.com/docs/quick-start) before reuse.

Rebuild optional assets with `npm ci` and `npm run build`. Rebuilding does not enable them on the active website.
