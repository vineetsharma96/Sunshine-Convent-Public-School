"""Generate static inner pages using the homepage's shared header and footer."""
from pathlib import Path
from html import escape
from urllib.parse import quote
import re

ROOT = Path(__file__).resolve().parent
home_path = ROOT / 'index.html'
home = home_path.read_text(encoding='utf-8')
nav_items = [('about.html', 'Our school'), ('admissions.html', 'Admissions'),
             ('faculty.html', 'Faculty'), ('gallery.html', 'Gallery'),
             ('disclosure.html', 'Public disclosure')]
nav = '<nav id="navigation" aria-label="Main navigation">' + ''.join(
    f'<a href="{url}">{label}</a>' for url, label in nav_items
) + '<button class="button small" data-enquiry>Let’s connect <b aria-hidden="true">↗</b></button></nav>'
home = re.sub(r'<nav id="navigation".*?</nav>', lambda _: nav, home, flags=re.S)
home = home.replace('href="#"', 'href="index.html"')
home = home.replace('href="http://www.scpsweb.com/PublicDocs.aspx" target="_blank" rel="noopener"', 'href="disclosure.html"')
home = home.replace('Opens the school’s existing document page.', 'Browse the school’s published documents.')
if 'pages.css' not in home:
    home = home.replace('<script src="app.js" defer></script>', '<link rel="stylesheet" href="pages.css"><script src="app.js" defer></script>')
if 'motion.js' not in home:
    home = home.replace('<script src="app.js" defer></script>', '<link rel="stylesheet" href="motion.css"><script src="vendor/gsap.min.js" defer></script><script src="vendor/ScrollTrigger.min.js" defer></script><script src="app.js" defer></script><script src="motion.js" defer></script>')
# Version motion assets so existing preview tabs fetch the latest behaviour.
home = re.sub(r'motion\.js(?:\?v=[^\"]*)?', 'motion.js?v=8', home)
home = re.sub(r'motion\.css(?:\?v=[^\"]*)?', 'motion.css?v=8', home)
home_path.write_text(home, encoding='utf-8')
head = home.split('<main id="main">')[0]
tail = home.split('</main>', 1)[1]
# This qualification belongs only to the homepage result highlight.
tail = re.sub(r'<p class="source-note">.*?</p>', '', tail)

def photo(label, cls=''):
    return f'<div class="photo-space {cls}" role="img" aria-label="Blank space reserved for {escape(label.lower())} photograph"><span class="photo-label">{escape(label.upper())} · PHOTO COMING SOON</span></div>'

def hero(eyebrow, title, description):
    return f'<section class="page-hero wrap"><a class="breadcrumb" href="index.html">Home <span> / {eyebrow}</span></a><p class="eyebrow">{eyebrow}</p><h1>{title}</h1><p class="page-intro">{description}</p></section>'

def cta():
    return '<section class="page-cta wrap"><div><p class="eyebrow">A BRIGHTER BEGINNING / 2026–27</p><h2>Let’s start a conversation.</h2><p>We’d love to help you find the right beginning for your child.</p></div><button class="button" data-enquiry>Talk to admissions <b aria-hidden="true">↗</b></button></section>'

def write_page(name, title, content):
    page_head = re.sub(r'<title>.*?</title>', f'<title>{title} · Sunshine Convent Public School</title>', head)
    page_head = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{escape(title)} at Sunshine Convent Public School, Vikas Nagar, New Delhi.">', page_head)
    page_head = page_head.replace(f'<a href="{name}.html">', f'<a href="{name}.html" aria-current="page">')
    (ROOT / f'{name}.html').write_text(page_head + '<main id="main">' + content + '</main>' + tail, encoding='utf-8')

about = hero('OUR SCHOOL', 'Rooted in values.<br>Open to <em>possibility.</em>', 'A community where curiosity is welcomed, individuality is encouraged, and every child has room to grow.')
about += '<section class="wrap story-grid">' + photo('Our school', 'story-photo') + '<div><p class="eyebrow">OUR STORY / SINCE 2009</p><h2>A place to learn.<br><span>A place to belong.</span></h2><p>Sunshine Convent Public School was established in 2009 by Baba Singh Ram Memorial Welfare Society.</p><p class="muted">Based in Vikas Nagar, New Delhi, we are an independent, CBSE-affiliated secondary school. Our approach brings together academic learning, practical experiences, creative expression, and the values that help children become responsible members of their community.</p><a class="text-link" href="faculty.html">Meet our educators <span>↗</span></a></div></section>'
about += '<section class="learning section"><div class="wrap"><div class="section-top"><div><p class="eyebrow">WHAT GUIDES US</p><h2>Growing minds.<br><span>Grounded hearts.</span></h2></div><p>Learning that reaches beyond a textbook.</p></div><div class="learning-grid">'
for number, color, title, description in [
    ('01', 'peach', 'Curiosity, always.', 'Interactive and experiential teaching gives children opportunities to ask questions and explore ideas for themselves.'),
    ('02', 'sage', 'Every child belongs.', 'We welcome learners from all communities and encourage respect, participation, and a sense of belonging.'),
    ('03', 'lavender', 'Learning for life.', 'Physical, intellectual, creative, and social development help students grow alongside their academic learning.')]:
    about += f'<article class="learning-card {color}"><span class="card-number">{number} / OUR VALUES</span><h3>{title}</h3><p>{description}</p></article>'
about += '</div></div></section><section class="section wrap"><div class="section-top"><div><p class="eyebrow">SPACE TO EXPLORE</p><h2>Made for discovery.</h2></div><p>5,719 m² of campus, with 16 classrooms, as listed in the school’s published disclosure.</p></div><div class="fact-grid"><article><h3>Hands-on learning</h3><p>Science laboratories and a computer lab support practical exploration.</p></article><article><h3>Stories & creativity</h3><p>A library, reading room, art, and cultural activities make space for imagination.</p></article><article><h3>Movement & play</h3><p>Football, karate, cricket, badminton, and a preschool toy library make room for activity and play.</p></article><article><h3>A shared journey</h3><p>CBSE and NCERT-aligned learning, from the foundational years through Class X.</p></article></div></section>' + cta()
write_page('about', 'Our school', about)

admissions = hero('ADMISSIONS / 2026–27', 'Their next chapter.<br>A brighter <em>beginning.</em>', 'Admissions are open for the 2026–27 session. Let’s talk about your child, their class, and the next step in their learning journey.')
admissions += '<section class="wrap admission-layout"><div><p class="eyebrow">YOUR FIRST STEPS</p><h2>A little guidance.<br><span>Every step of the way.</span></h2><ol class="process-list"><li><h3>Connect with our team</h3><p>Tell us which class you’re considering. Our team can help with availability, eligibility, and your questions.</p></li><li><h3>Get to know Sunshine</h3><p>Call the office to arrange a visit and learn more about classrooms, learning, and campus life.</p></li><li><h3>Prepare your application</h3><p>Confirm the required documents, fee details, and registration process with the admissions team.</p></li></ol></div><aside class="enquiry-card"><p class="eyebrow">LET’S FIND THEIR BEGINNING</p><h3>Enquire about a place.</h3><p>Connect directly with our admissions team on WhatsApp.</p><form id="admission-page-form"><label for="admission-class">Class you’re interested in</label><select id="admission-class" required><option value="">Select a class</option>'
classes = ['Nursery', 'LKG', 'UKG'] + ['Class ' + value for value in ['I','II','III','IV','V','VI','VII','VIII','IX','X']]
admissions += ''.join(f'<option>{value}</option>' for value in classes)
admissions += '</select><label for="admission-question">What would you like to know? <span>(optional)</span></label><textarea id="admission-question" maxlength="600" rows="3" placeholder="Class availability, a school visit, or another question…"></textarea><button class="button" type="submit">Continue on WhatsApp <b aria-hidden="true">↗</b></button><p class="form-note">Your selection opens in WhatsApp as a draft. Send it there to contact the school.</p><a id="admission-fallback" class="text-link" hidden target="_blank" rel="noopener">Open your enquiry in WhatsApp ↗</a></form><div class="office-details"><a href="tel:+919599475360">+91 95994 75360 ↗</a><a href="tel:+919599475361">+91 95994 75361 ↗</a><span>Please call to confirm office hours.</span></div></aside></section>'
admissions += '<section class="section wrap admission-help"><div><p class="eyebrow">BEFORE YOU APPLY</p><h2>Useful things<br><span>to have at hand.</span></h2><p class="muted">Age criteria, class availability, required documents, and fees should be confirmed with the office before registration.</p></div><div class="faq"><details open><summary>How do I check the fee structure?<span></span></summary><p>The published 2026–27 fee structure is available in our <a href="disclosure.html">public disclosure documents</a>. The office can clarify the charges applicable to your child’s class.</p></details><details><summary>Which documents will I need?<span></span></summary><p>Please ask the admissions team for the current, class-specific document list. They will guide you through registration and any supporting records required.</p></details><details><summary>Can we visit the school?<span></span></summary><p>Yes, contact the office on +91 9599475360 or +91 9599475361 to arrange a suitable time. Please call ahead to confirm office hours.</p></details><details><summary>How do we confirm transport availability?<span></span></summary><p>Share your locality with the office so the team can confirm routes, availability, and charges.</p></details></div></section>' + cta()
write_page('admissions', 'Admissions 2026–27', admissions)

faculty = hero('OUR EDUCATORS', 'People who see<br>the <em>possibility.</em>', 'Patient guidance. Practical discovery. A teaching community that helps children grow in confidence, understanding, and independence.')
faculty += '<section class="wrap story-grid faculty-lead">' + photo('Principal portrait', 'portrait-space') + '<div><p class="eyebrow">SCHOOL LEADERSHIP</p><h2>Mr. Sandeep Yadav</h2><span class="role-label">PRINCIPAL</span><p>Our school’s teaching approach centres on interactive and experiential learning, supported by qualified educators.</p><p class="muted">Our teachers encourage children to participate, ask questions, explore practical ideas, and develop their own voice.</p><a class="text-link" href="mailto:sunshine.manager@gmail.com">Contact the school office <span>↗</span></a></div></section>'
faculty += '<section class="wrap verified-panel"><p>Principal: Mr. Sandeep Yadav, as listed in CBSE SARAS.</p><a class="text-link" href="https://saras.cbse.gov.in/SARAS/AffiliatedList/AfflicationDetails/2730824" target="_blank" rel="noopener">View CBSE school record ↗</a></section><section class="section wrap"><div class="section-top"><div><p class="eyebrow">IN EVERY CLASSROOM</p><h2>Teaching that<br><span>makes room to grow.</span></h2></div><p>Our approach, across the school.</p></div><div class="fact-grid"><article><h3>Learning through experience</h3><p>Practical work and interactive teaching connect ideas to the world around us.</p></article><article><h3>Building confidence</h3><p>Discussion, creative expression, and participation give students opportunities to find their voice.</p></article></div><div class="pending-note"><span aria-hidden="true">✳</span><div><h3>More familiar faces, coming soon.</h3><p>Individual portraits and a confirmed current faculty directory will be added when available.</p></div></div></section>' + cta()
write_page('faculty', 'Faculty & leadership', faculty)

gallery = hero('LIFE AT SUNSHINE', 'Every day, a new<br>reason to <em>discover.</em>', 'A space for the moments that make school life special—from classroom discoveries to creativity, sport, and celebrations.')
gallery += '<section class="wrap gallery-section"><div class="gallery-notice"><span aria-hidden="true">✳</span><p>Our photo story is on its way. The spaces below are reserved for photographs from the school.</p></div><div class="filter-bar" role="group" aria-label="Filter gallery">'
for key, label in [('all','All spaces'),('campus','Campus'),('learning','Learning'),('activities','Activities')]:
    gallery += f'<button data-gallery-filter="{key}" aria-pressed="{"true" if key == "all" else "false"}">{label}</button>'
gallery += '</div><p class="sr-only" id="gallery-status" role="status">Showing 6 photo spaces.</p><div class="gallery-grid">'
for number, category, title, description in [
    ('01','campus','A place to belong','Our school and campus'),
    ('02','learning','Questions become discoveries','Classroom learning'),
    ('03','activities','Room to run, space to play','Sports and physical education'),
    ('04','learning','Ideas come to life','Science and computer labs'),
    ('05','activities','A little imagination goes a long way','Art, music, and cultural activities'),
    ('06','campus','One more chapter','Library and reading room')]:
    gallery += f'<figure class="gallery-item" data-category="{category}">{photo(description)}<figcaption><span>{number} / {category.upper()}</span><h3>{title}</h3><p>{description}</p></figcaption></figure>'
gallery += '</div></section>' + cta()
write_page('gallery', 'Gallery', gallery)

documents = [
    ('General information','School information','GENERAL-INFO.pdf'),
    ('Mandatory public disclosure','School information','Mandatory-Disclosure.pdf'),
    ('CBSE affiliation letter','Affiliation & recognition','AffilationLetter.pdf'),
    ('Society registration certificate','Affiliation & recognition','SocietyRegisterationCertificate.pdf'),
    ('Recognition & upgradation / extension','Affiliation & recognition','RecognitionLetter.pdf'),
    ('Land certificate','Campus & safety','LandCertificate.pdf'),
    ('Building safety certificate','Campus & safety','BUILDING SAFETY CERTIFICATE.pdf'),
    ('Fire safety certificate','Campus & safety','Fire-Noc.pdf'),
    ('Self certification','School information','SELF CERTIFICATION.pdf'),
    ('Water & health certificates','Campus & safety','Water-HealthCertificates.pdf'),
    ('Fee structure · 2026–27','Academics & fees','FEESTRUCTURE-2026-27.pdf'),
    ('Academic calendar · 2026–27','Academics & fees','Academic-Calendar2026-27.pdf'),
    ('School management committee','Committees','SMC-LIST.pdf'),
    ('Parent Teacher Association','Committees','PTA.pdf'),
    ('Published Class X results · 2021','Academics & fees','LAST3YEAR-RESULT.pdf'),
    ('PTA nomination notification · 2025–26','Committees','CircularSLFRC.pdf')]
disclosure = hero('MANDATORY PUBLIC DISCLOSURE', 'School information.<br>Clearly <em>accessible.</em>', 'Find the school’s published affiliation, safety, academic, and committee documents in one place.')
disclosure += '<section class="wrap disclosure-section"><dl class="identity-grid"><div><dt>CBSE AFFILIATION</dt><dd>2730824</dd></div><div><dt>CBSE SCHOOL CODE</dt><dd>86703</dd></div><div><dt>MANAGING SOCIETY</dt><dd>Baba Singh Ram Memorial Welfare Society</dd></div></dl><div class="document-tools"><div><label for="document-search">Find a document</label><input id="document-search" type="search" placeholder="Search by name or category…"></div><div><label for="document-category">Category</label><select id="document-category"><option value="all">All documents</option>'
for category in dict.fromkeys(row[1] for row in documents):
    disclosure += f'<option>{escape(category)}</option>'
disclosure += '</select></div></div><p class="document-count" id="document-status" role="status">Showing 16 documents</p><div class="document-table-wrap"><table class="document-table"><caption class="sr-only">Published school documents</caption><thead><tr><th scope="col">DOCUMENT</th><th scope="col">CATEGORY</th><th scope="col">FILE</th></tr></thead><tbody>'
for title, category, filename in documents:
    url = 'http://www.scpsweb.com/docs/' + quote(filename)
    disclosure += f'<tr data-document-category="{escape(category)}"><th scope="row">{escape(title)}</th><td>{escape(category)}</td><td><a href="{url}" target="_blank" rel="noopener" aria-label="Open {escape(title)} PDF in a new tab">PDF <span aria-hidden="true">↗</span></a></td></tr>'
disclosure += '</tbody></table></div><p id="document-empty" class="empty-state" hidden>No documents match your search. Try another term or category.</p><div class="document-note"><p>CBSE SARAS lists affiliation from 1 April 2023 to 31 March 2028. <a href="https://saras.cbse.gov.in/SARAS/AffiliatedList/AfflicationDetails/2730824" target="_blank" rel="noopener">View CBSE record ↗</a></p><p>Documents open in a new tab from the school’s existing website. Some documents contain historical information. For updated copies or help opening a file, please contact the school office.</p><a class="text-link" href="http://www.scpsweb.com/PublicDocs.aspx" target="_blank" rel="noopener">View original document listing <span>↗</span></a></div></section>' + cta()
write_page('disclosure', 'Mandatory public disclosure', disclosure)
print('Generated About, Admissions, Faculty, Gallery, and Public Disclosure pages.')
