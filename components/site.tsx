import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import { LightLines } from './ui/light-lines';
import { NotchNavbar } from './ui/notch-navbar';
import StatsCounter from './ui/stats-counter';
import { FlipFadeText } from './ui/flip-fade-text';
import TextAnimation from './ui/staggerText';
import { GooeySearch } from './ui/gooey-search';
import { ShareSheet } from './ui/share-sheet';
import { AnimatedTooltip } from './ui/animated-tooltip';
import { CylinderCarousel } from './ui/cylinder-carousel';
import { VerseCards } from './ui/verse-cards';
import { TestimonialsCard } from './ui/testimonials-card';
import { TeamRevealGrid } from './ui/team-reveal-grid';
import { FaqAccordion } from './ui/faq-accordion';
import { Link000 } from './ui/skiper40';
import { LinePath } from './ui/skiper19';

// Follow the same site-level opt-in and pause setting as the GSAP layer.
function useSiteMotion() {
  const [enabled, setEnabled] = useState(document.documentElement.classList.contains('motion-enabled'));
  useEffect(() => {
    const observer = new MutationObserver(() => setEnabled(document.documentElement.classList.contains('motion-enabled')));
    observer.observe(document.documentElement, { attributes:true, attributeFilter:['class'] });
    return () => observer.disconnect();
  }, []);
  return enabled;
}
function Boundary({ children }: { children: React.ReactNode }) {
  const enabled = useSiteMotion();
  return <MotionConfig reducedMotion={enabled ? 'never' : 'always'}>{children}</MotionConfig>;
}
function mount(element: HTMLElement, component: React.ReactNode) {
  element.dataset.libraryMounted = 'true';
  createRoot(element).render(<Boundary>{component}</Boundary>);
}
function section(id: string, label: string, title: string, before: Element) {
  const el = document.createElement('section');
  el.id = id; el.className = 'library-section wrap';
  const heading = document.createElement('div');
  heading.className = 'library-section-heading';
  const eyebrow = document.createElement('p'); eyebrow.className = 'eyebrow'; eyebrow.textContent = label;
  const h2 = document.createElement('h2'); h2.textContent = title;
  heading.append(eyebrow,h2); el.append(heading);
  const host = document.createElement('div'); el.append(host); before.before(el);
  return host;
}

const staticHeader = document.querySelector('.header') as HTMLElement;
const navHost = document.createElement('div');
navHost.className = 'library-nav-host';
staticHeader.before(navHost);
function SchoolNav() {
  useEffect(() => { staticHeader.hidden = true; }, []);
  return <NotchNavbar className="school-notch" logo={<a className="brand" href="index.html"><span className="brand-sun" aria-hidden="true">☀</span><span>Sunshine Convent<small>PUBLIC SCHOOL · NEW DELHI</small></span></a>} />;
}
mount(navHost,<SchoolNav/>);

const hero = document.querySelector('.hero') as HTMLElement;
if (hero) {
  hero.classList.add('light-lines-hero');
  const background = document.createElement('div'); background.className = 'light-lines-host';
  hero.prepend(background);
  function LandingLines() {
    const enabled = useSiteMotion();
    return enabled ? <LightLines gradientFrom="#fffff2" gradientTo="#fffff2" lineColor="#225bdc" lightColor="#225bdc" linesOpacity={.08} lightsOpacity={.9} speedMultiplier={1.2}/> : <div className="static-light-lines"/>;
  }
  mount(background,<LandingLines/>);
  const subtitle = document.querySelector('.hero-foot small') as HTMLElement;
  subtitle.classList.remove('flip-message');
  function SchoolFlip(){const enabled=useSiteMotion();return enabled ? <FlipFadeText words={['Curiosity.','Creativity.','Confidence.']} interval={3000} className="school-flip" textClassName="school-flip-text" staggerDelay={.025} letterDuration={.3}/> : <span>Curiosity. Creativity. Confidence.</span>;}
  mount(subtitle,<SchoolFlip/>);
}

// Use the actual text component without disturbing the heading's em/br layout.
document.querySelectorAll('h1 .motion-word').forEach(word => {
  word.removeAttribute('style');
  word.classList.remove('motion-word');
  const text = word.textContent || '';
  function Word(){const enabled=useSiteMotion();return enabled ? <TextAnimation>{text}</TextAnimation> : <>{text}</>;}
  mount(word as HTMLElement,<Word/>);
});
document.querySelectorAll('.stats [data-count]').forEach(node => {
  const value = Number((node as HTMLElement).dataset.count);
  if(value === 2009) return;
  function Count(){const enabled=useSiteMotion();return enabled ? <StatsCounter value={value}/> : <>{value}</>;}
  mount(node as HTMLElement,<Count/>);
});

const shareHost = document.createElement('div'); shareHost.className = 'school-share';
document.querySelector('.footer-top')?.append(shareHost);
mount(shareHost,<ShareSheet url={location.href} title="Sunshine Convent Public School" theme="light" variant="default"/>);
const tooltipHost = document.createElement('div'); tooltipHost.className = 'school-tooltip-row';
document.querySelector('.footer-bottom')?.after(tooltipHost);
mount(tooltipHost,<><AnimatedTooltip content="Central Board of Secondary Education · Affiliation 2730824" accentColor="#225bdc" shapeColor="#173f36" textColor="#fffff2">CBSE affiliated ⓘ</AnimatedTooltip><Link000 href="admissions.html" className="school-css-link">Explore admissions ↗</Link000><a className="component-credit" href="https://skiper-ui.com" target="_blank" rel="noopener">Interactions with Skiper UI</a></>);

document.querySelectorAll('.faq').forEach(faq => {
  const items = [...faq.querySelectorAll('details')].map(detail=>({question:detail.querySelector('summary')?.childNodes[0]?.textContent?.trim() || '',answer:detail.querySelector('p')?.textContent || ''}));
  mount(faq as HTMLElement,<FaqAccordion title="" items={items} className="school-faq"/>);
});

const gallery = document.querySelector('.gallery-section');
if (gallery) {
  const host = section('gallery-carousel','LIFE IN MOTION','A new perspective on school life.',gallery);
  function SchoolCylinder(){const enabled=useSiteMotion();return <div className={!enabled ? 'cylinder-paused' : ''}><CylinderCarousel className="school-cylinder" cardWidth={180} animationDuration={26} images={['Campus','Classrooms','Sports','Science','Creative arts','Library'].map(alt=>({src:'',alt}))}/><p className="library-caption">Photo spaces reserved for the school’s own photographs.</p></div>;}
  mount(host,<SchoolCylinder/>);
}

const about = document.querySelector('.story-grid:not(.faculty-lead)');
if(hero || about){
  const before = hero ? document.querySelector('#learning')! : document.querySelector('.learning')!;
  const host=section('school-highlights','ROOM FOR EVERY KIND OF LEARNER','Different discoveries. One Sunshine.',before);
  mount(host,<TestimonialsCard width={900} className="school-highlights" autoPlay={false} items={[
    {id:'learning',title:'Learning by doing.',description:'Interactive teaching, practical science, and computer labs help bring classroom ideas to life.',image:''},
    {id:'creativity',title:'A little room for imagination.',description:'Reading, art, music, dance, and drama make space for creative expression.',image:''},
    {id:'play',title:'Movement. Play. Possibility.',description:'A two-acre campus makes room for sports, yoga, and discoveries beyond the classroom.',image:''},
  ]}/>);
}
if(hero){
  const host=section('discover-cards','A FEW THINGS TO DISCOVER','Get to know your Sunshine.',document.querySelector('#campus')!);
  function SchoolDeck(){const enabled=useSiteMotion();return enabled ? <VerseCards className="school-verse" navItems={[{label:'Discover Sunshine',icon:<span aria-hidden="true">✳</span>,isTrigger:true}]} cards={[{label:'Curiosity in every classroom',className:'verse-sage'},{label:'Two acres to explore',className:'verse-peach'},{label:'Learning together since 2009',className:'verse-lavender'}]} footerText="Select the front card to discover the next."/> : <ul className="static-school-facts"><li>Curiosity in every classroom</li><li>Two acres to explore</li><li>Learning together since 2009</li></ul>;}
  mount(host,<SchoolDeck/>);
}

const faculty = document.querySelector('.faculty-lead');
if(faculty){
  const host = document.createElement('div'); host.className='faculty-library-grid';
  faculty.replaceWith(host);
  mount(host,<TeamRevealGrid title="Guidance for a brighter beginning." eyebrow="OUR SCHOOL LEADERSHIP" description="Meet our principal. Individual teacher profiles will follow when the current school directory is supplied." autoPlay={false} className="school-team wrap" members={[{id:'principal',name:'Mr. Sandeep Yadav',role:'Principal',expertise:'Interactive and experiential learning, with room for every child to grow.',accent:'#225bdc'}]}/>);
}

if (document.querySelector('.document-tools')) {
  const host=document.createElement('div');host.className='school-gooey-search';
  document.querySelector('.document-tools')!.before(host);
  const titles=[...document.querySelectorAll('[data-document-category] th')].map(x=>x.textContent || '');
  mount(host,<><p className="eyebrow">QUICK DOCUMENT SEARCH</p><GooeySearch items={titles} buttonLabel="Find a school document" placeholder="Try fees, safety, calendar…" debounceMs={150} maxResults={4} onSelect={value=>{const input=document.querySelector('#document-search') as HTMLInputElement; input.value=value;input.dispatchEvent(new Event('input'));document.querySelector('.document-table')?.scrollIntoView({behavior:'smooth',block:'start'});}}/></>);
}

function LearningJourney(){
  const ref=useRef<HTMLDivElement>(null);
  const {scrollYProgress}=useScroll({target:ref,offset:['start 85%','end 30%']});
  const enabled=useSiteMotion();
  return <div ref={ref} className="school-journey"><LinePath className="school-scroll-art" scrollYProgress={scrollYProgress}/><p className="eyebrow">THEIR JOURNEY, ONE DISCOVERY AT A TIME</p><p className="horizontal-text" aria-label="A little curiosity today. A world of possibility tomorrow.">{'A little curiosity today. A world of possibility tomorrow.'.split(' ').map((word,index)=><JourneyWord key={index} word={word} progress={scrollYProgress} index={index} enabled={enabled}/>)}</p><p className="library-caption">A foundation for learning. Space for imagination. Confidence for what comes next.</p></div>;
}
function JourneyWord({word,progress,index,enabled}:any){
  const x=useTransform(progress,[index*.055,index*.055+.2],[35,0]);
  const opacity=useTransform(progress,[index*.055,index*.055+.2],[.2,1]);
  const skewX=useTransform(progress,[index*.055,index*.055+.2],[8,0]);
  return <motion.span aria-hidden="true" style={enabled?{x,opacity,skewX}:{}}>{word} </motion.span>;
}
if(hero || document.querySelector('.admission-layout')){
  const before=document.querySelector('.admission-help') || document.querySelector('#admissions');
  if(before){const host=document.createElement('section');host.className='wrap';before.before(host);mount(host,<LearningJourney/>);}
}
