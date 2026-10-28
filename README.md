# Sunshine Convent Public School

A responsive, six-page school website with a warm cream palette, school branding, and GSAP motion. The active site uses HTML, CSS, and JavaScript and runs without installing Node dependencies.

## Pages

| Page | Content |
| --- | --- |
| [Home](index.html) | Welcome, school overview, learning stages, campus, admissions, FAQs, and contact |
| [About](about.html) | History, values, and facilities |
| [Admissions](admissions.html) | Enquiry guidance and a WhatsApp draft builder |
| [Faculty](faculty.html) | Principal profile and teaching approach |
| [Gallery](gallery.html) | Category filters and reserved photo areas |
| [Public Disclosure](disclosure.html) | Searchable, category-filtered school document links |

## Run locally

Requires Python 3. From the project directory:

```sh
python -m http.server 4173
```

Open [localhost:4173](http://localhost:4173/). Stop the server with `Ctrl+C`. No npm installation or build is required for the active pages.

## Features

- Responsive navigation, keyboard focus styles, and a skip link.
- Blue welcome lines, heading reveals, horizontal learning-text reveal, counters, and moving learning-card symbols.
- Full-screen opening Apple Hello handwriting intro in school green and orange, on the shared `#fffff0` cream background. Source credit and license are recorded in [MOTION.md](MOTION.md).
- The four-second welcome intro writes English “hello”, then Hindi “नमस्ते”, before revealing the homepage. Tap, click, or press Escape to skip it.
- Decorative motion in blank photo frames; no stock or generated student photographs.
- Animations start automatically on every page, without a motion toggle or saved pause preference.
- Admission enquiries prepare a WhatsApp draft for the visitor to send. There is no backend submission or stored personal information.
- Shared school logo in the header, footer, and favicon. The original supplied logo is retained alongside its transparent-background version.
- Larger supporting text: body copy generally starts at 14px, labels at 12px, and form controls at 16px. The brand subtitle uses a separate typography treatment.

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | Homepage and shared header, footer, and admissions dialog |
| `build_pages.py` | Content and generation of the five inner pages |
| `styles.css`, `pages.css` | Main design, inner-page layouts, and responsive styling |
| `readability.css` | Shared typography and readable mobile navigation |
| `motion.css`, `motion.js` | Animation styles, behavior, and visitor preferences |
| `app.js` | Navigation, enquiry drafts, gallery filters, and document search |
| `Logo/` | Original and transparent school logos |
| `vendor/` | Local libraries, optional component assets, and third-party notices |

After editing shared markup in `index.html` or page content in `build_pages.py`, regenerate the inner pages:

```sh
python build_pages.py
```

The five generated inner-page HTML files are committed so a static host can serve them directly. Edit their content in the generator; direct changes will be overwritten by regeneration. Update asset query versions in `index.html` and `build_pages.py` when an older preview remains cached.

### School photographs and faculty profiles

Each `.photo-space` reserves room for a future school photograph. Add an image with descriptive alternative text and preserve the frame dimensions. Remove that frame's placeholder label and decorative orbit when the photograph is ready; `motion.js` currently inserts the artwork. Individual teacher portraits and a confirmed current faculty directory are pending.

## School facts and sources

Facts were checked on **27 October 2026** against [CBSE SARAS](https://saras.cbse.gov.in/SARAS/AffiliatedList/AfflicationDetails/2730824) and the [school's published documents](http://www.scpsweb.com/PublicDocs.aspx).

The result footnote identifies the published 2022 Class X result and cohort. Campus and classroom figures follow the published disclosure. Unsupported staffing totals, the supplied UDISE code, and fixed office hours are not presented as confirmed facts.

See [SCHOOL_FACTS_VERIFICATION.md](SCHOOL_FACTS_VERIFICATION.md) for evidence, corrections, discrepancies, and items awaiting school confirmation. `Information.txt` preserves the original supplied reference and includes claims subsequently corrected; use the verification report when updating public copy.

Disclosure PDFs remain hosted on the existing school website. Checking a published record does not establish every certificate's authenticity, current validity, or future availability. No calls, emails, or WhatsApp messages were sent during verification.

The optional `scripts/verify_school_sources.py` downloads public evidence into `verification/sources/`. Downloaded PDFs and rendered evidence images are local working files, excluded from Git.

## Optional component sources

`components/`, `lib/`, `library.css`, `component-input.css`, and `build-components.mjs` retain React component experiments and source notices. They are **not loaded by the active pages**. To rebuild their optional assets:

```sh
npm ci
npm run build
```

This builds the optional bundle; it does not switch the website to React. See [MOTION.md](MOTION.md) for active motion behavior and component provenance.

## Validation

The active pages have been browser-checked at 320px, 390px, 923px, and 1440px content widths for horizontal overflow and small supporting text. Navigation, enquiry drafts, filters and the learning-text reveal have also been exercised. These checks are not a full accessibility audit or device performance benchmark.

## Hosting and third-party assets

Serve the repository root with any static host supporting HTML, CSS, JavaScript, and images. Keep `Logo/` and `vendor/` paths intact. No deployment is configured and no API keys are required.

Fonts load from Google Fonts with local fallbacks. GSAP and ScrollTrigger are served locally. Applicable third-party notices are in `vendor/COMPONENT-NOTICES.txt`, `vendor/GSAP-README.md`, `components/VENGEANCE-LICENSE`, and retained source headers. See the [GSAP terms](https://gsap.com/standard-license).

## License

Original project code is licensed under the [MIT License](LICENSE), copyright (c) 2026 Vineet Sharma. Third-party libraries and components retain their respective licenses. School branding, logos, photographs, and linked school documents are excluded from this code license.
