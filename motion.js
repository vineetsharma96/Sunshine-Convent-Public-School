/* Vanilla adaptations of the motion patterns selected in libary.txt.
 * GSAP is the animation engine used by Vengeance UI's Verse Cards.
 * See MOTION.md for component mapping and dependency provenance.
 */
(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  const root = document.documentElement;
  // Keep the welcome treatment without reloading the rejected library layout.
  const welcome = document.querySelector('.hero');
  if (welcome) {
    welcome.classList.add('welcome-hero');
    const lines = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    lines.setAttribute('class', 'welcome-lines');
    lines.setAttribute('viewBox', '0 0 1200 700');
    lines.setAttribute('preserveAspectRatio', 'none');
    lines.setAttribute('aria-hidden', 'true');
    for (let index = 0; index < 12; index++) {
      const x = 40 + index * 103;
      const track = document.createElementNS(lines.namespaceURI, 'path');
      track.setAttribute('d', `M${x} 0V700`);
      track.setAttribute('class', 'welcome-line-track');
      const light = document.createElementNS(lines.namespaceURI, 'path');
      light.setAttribute('d', `M${x} -65V-15`);
      light.setAttribute('class', 'welcome-line-light');
      lines.append(track, light);
    }
    welcome.prepend(lines);
  }
  const letters = document.querySelector('.peach .line-art');
  if (letters) {
    const characters = [...letters.textContent.trim()].map(character => {
      const span = document.createElement('span');
      span.className = 'learning-letter';
      span.textContent = character;
      return span;
    });
    letters.replaceChildren(...characters);
  }
  document.querySelectorAll('.learning-card .line-art:not(.peach .line-art)').forEach(art => {
    const symbol = document.createElement('span');
    symbol.className = art.classList.contains('orbit') ? 'learning-star' : 'learning-arrow';
    symbol.textContent = art.textContent;
    art.replaceChildren(symbol);
  });

  // Preserve each heading's accessible name and its em/br markup.
  document.querySelectorAll('h1, h2').forEach(heading => {
    heading.setAttribute('aria-label', heading.innerText.replace(/\s+/g, ' ').trim());
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(word => {
        if (!word.trim()) fragment.append(document.createTextNode(word));
        else {
          const span = document.createElement('span');
          span.className = 'motion-word';
          span.setAttribute('aria-hidden', 'true');
          span.textContent = word;
          fragment.append(span);
        }
      });
      node.replaceWith(fragment);
    });
  });

  const learningHeading = document.querySelector('#learning .section-top');
  if (learningHeading) {
    learningHeading.querySelectorAll('h2 .motion-word').forEach(word => word.classList.add('horizontal-reveal-word'));
    const description = learningHeading.querySelector(':scope > p');
    if (description) {
      const walker = document.createTreeWalker(description, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        const fragment = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(word => {
          if (!word.trim()) fragment.append(document.createTextNode(word));
          else {
            const span = document.createElement('span');
            span.className = 'horizontal-reveal-word';
            span.textContent = word;
            fragment.append(span);
          }
        });
        node.replaceWith(fragment);
      });
    }
  }

  document.querySelectorAll('.photo-space').forEach((photo, index) => {
    const art = document.createElement('span');
    art.className = 'photo-motion-art';
    art.setAttribute('aria-hidden', 'true');
    art.innerHTML = '<svg viewBox="0 0 180 180"><g class="photo-orbit"><circle cx="90" cy="90" r="57"/><ellipse cx="90" cy="90" rx="82" ry="30" transform="rotate(-35 90 90)"/><circle class="orbit-dot" cx="147" cy="90" r="4"/><circle cx="90" cy="90" r="7"/><path d="M90 68v-7m0 58v-7M68 90h-7m58 0h-7"/></g></svg>';
    photo.prepend(art);
    const shutter = document.createElement('span');
    shutter.className = 'photo-motion-shutter';
    shutter.setAttribute('aria-hidden', 'true');
    shutter.hidden = true;
    photo.append(shutter);
    photo.dataset.motionIndex = index;
  });

  const message = document.querySelector('.hero-foot small');
  if (message) message.classList.add('flip-message');
  const process = document.querySelector('.process-list');
  if (process) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'scroll-trace');
    svg.setAttribute('viewBox', '0 0 14 300');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = '<path d="M7 0 C-1 60 15 90 7 150 S7 240 7 300"/>';
    process.prepend(svg);
  }

  let context;
  function setup() {
    context?.revert();
    root.classList.add('motion-enabled');
    root.classList.remove('motion-disabled');
    document.querySelectorAll('.photo-motion-shutter').forEach(element => { element.hidden = false; });

    context = gsap.context(self => {
      const cleanups = [];
      function listen(element, type, callback) {
        const handler = (...args) => self.add(() => callback(...args));
        element.addEventListener(type, handler);
        cleanups.push(() => element.removeEventListener(type, handler));
      }
      function playInView(element, timeline) {
        const trigger = ScrollTrigger.create({
          trigger: element, start: 'top bottom', end: 'bottom top',
          onToggle: self => self.isActive ? timeline.play() : timeline.pause(),
        });
        if (trigger.isActive) timeline.play();
      }
      if (welcome) {
        const flowing = gsap.timeline({ paused: true });
        welcome.querySelectorAll('.welcome-line-light').forEach((light, index) => {
          flowing.fromTo(light, { y: -80 }, { y: 850, duration: 5 + index % 4, repeat: -1, ease: 'none' }, index * .22);
        });
        playInView(welcome, flowing);
      }
      document.querySelectorAll('.learning-card .line-art').forEach(art => {
        const loop = gsap.timeline({ paused: true });
        if (art.querySelector('.learning-letter')) {
          art.querySelectorAll('.learning-letter').forEach((letter, index) => {
            loop.fromTo(letter, { y: 0, rotation: index === 1 ? -10 : 0 }, {
              y: -11, rotation: index === 1 ? 8 : -7, duration: 1.05,
              repeat: -1, yoyo: true, ease: 'sine.inOut',
            }, index * .22);
          });
        } else if (art.querySelector('.learning-star')) {
          loop.to(art.querySelector('.learning-star'), { rotation: 360, duration: 12, repeat: -1, ease: 'none' });
        } else {
          loop.to(art.querySelector('.learning-arrow'), { x: 13, y: -11, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        }
        playInView(art, loop);
      });
      // Stagger Text: a short, word-by-word reveal with a shared easing curve.
      document.querySelectorAll('h1, h2').forEach(heading => {
        if (heading.closest('#learning')) return;
        if (!heading.querySelector('.motion-word')) return;
        gsap.from(heading.querySelectorAll('.motion-word'), {
          yPercent: 45, rotationX: -20, autoAlpha: 0, duration: .8,
          stagger: { amount: .26 }, ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 95%', once: true },
        });
      });
      if (learningHeading) {
        gsap.fromTo(learningHeading.querySelectorAll('.horizontal-reveal-word'), {
          x: 45, skewX: 7, autoAlpha: .15,
        }, {
          x: 0, skewX: 0, autoAlpha: 1, stagger: { amount: .3 }, ease: 'none',
          scrollTrigger: {
            id: 'learning-horizontal-text', trigger: learningHeading,
            start: 'top 90%', end: 'bottom 50%', scrub: .5, invalidateOnRefresh: true,
          },
        });
      }
      const revealTargets = '.page-hero .eyebrow, .page-intro, .story-grid>div:not(.photo-space), .enquiry-card, .resource-heading, .gallery-notice, .identity-grid, .document-tools, .pending-note';
      gsap.utils.toArray(revealTargets).forEach(element => {
        gsap.from(element, { y: 22, autoAlpha: 0, duration: .65, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 96%', once: true } });
      });
      document.querySelectorAll('.learning-grid, .fact-grid, .gallery-grid, .photo-strip, .campus-details, .admission-steps, .process-list').forEach(group => {
        const cards = [...group.children].filter(child => !child.matches('svg'));
        gsap.from(cards, { y: 24, autoAlpha: 0, duration: .65, stagger: .09, ease: 'power3.out', scrollTrigger: { trigger: group, start: 'top 92%', once: true } });
      });
      // Empty photo frames get an entrance and an ambient orbit; no fake imagery.
      document.querySelectorAll('.photo-space').forEach(photo => {
        const shutter = photo.querySelector('.photo-motion-shutter');
        gsap.to(shutter, { scaleY: 0, duration: 1.05, ease: 'power3.inOut', scrollTrigger: { trigger: photo, start: 'top 94%', once: true } });
        const orbit = gsap.to(photo.querySelector('.photo-orbit'), { rotation: 360, svgOrigin: '90 90', duration: 30 + Number(photo.dataset.motionIndex) * 2, ease: 'none', repeat: -1, paused: true });
        ScrollTrigger.create({ trigger: photo, start: 'top bottom', end: 'bottom top', onToggle: self => self.isActive ? orbit.play() : orbit.pause() });
        if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
          listen(photo, 'pointermove', event => {
            const rect = photo.getBoundingClientRect();
            gsap.to(photo.querySelector('.photo-motion-art'), { x: ((event.clientX - rect.left) / rect.width - .5) * 16, y: ((event.clientY - rect.top) / rect.height - .5) * 16, duration: .7, ease: 'power3.out', overwrite: true });
          });
          listen(photo, 'pointerleave', () => gsap.to(photo.querySelector('.photo-motion-art'), { x: 0, y: 0, duration: .7, overwrite: true }));
        }
      });
      const sun = document.querySelector('.sun-doodle');
      if (sun) gsap.to(sun, { rotation: 8, y: -7, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      const note = document.querySelector('.result-note');
      if (note) gsap.from(note, { y: 25, rotation: 1, opacity: 0, duration: .9, delay: .4, ease: 'back.out(1.15)' });

      // Flip Fade Text: supplementary copy only; essential details stay static.
      if (message) {
        const words = ['CBSE affiliated · Vikas Nagar, New Delhi', 'Curiosity. Creativity. Confidence.', 'Learning together, since 2009.'];
        let index = 0;
        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 3.5 });
        timeline.to(message, { opacity: 0, y: -5, rotationX: 55, duration: .25, delay: 3.5 })
          .call(() => { index = (index + 1) % words.length; message.textContent = words[index]; })
          .fromTo(message, { y: 5, rotationX: -55 }, { opacity: 1, y: 0, rotationX: 0, duration: .4, ease: 'power3.out' });
        cleanups.push(() => { message.textContent = words[0]; });
      }
      // Stats Counter: keep the founding year and its meaning stable.
      document.querySelectorAll('.stats strong').forEach(strong => {
        const target = strong.querySelector('[data-count]') || strong;
        const text = target.textContent.trim();
        if (!/^\d+$/.test(text) || text === '2009') return;
        const counter = { value: 0 };
        gsap.to(counter, { value: Number(text), duration: 1.3, ease: 'power2.out', scrollTrigger: { trigger: strong, start: 'top 95%', once: true }, onUpdate: () => { target.textContent = Math.round(counter.value); } });
        cleanups.push(() => { target.textContent = text; });
      });
      document.querySelectorAll('.faq details').forEach(detail => {
        listen(detail, 'toggle', () => {
          if (detail.open) gsap.fromTo(detail.querySelector('p'), { y: -7, opacity: 0 }, { y: 0, opacity: 1, duration: .3, ease: 'power2.out', overwrite: true });
          ScrollTrigger.refresh();
        });
      });
      listen(menu, 'click', () => {
        if (menu.getAttribute('aria-expanded') === 'true') gsap.fromTo(navigation.children, { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: .3, stagger: .035, overwrite: true });
      });
      document.querySelectorAll('[data-gallery-filter]').forEach(button => listen(button, 'click', () => {
        gsap.fromTo('.gallery-item:not([hidden])', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .4, stagger: .06, overwrite: true });
        ScrollTrigger.refresh();
      }));
      document.querySelectorAll('#document-search, #document-category').forEach(field => {
        listen(field, field.matches('select') ? 'change' : 'input', () => ScrollTrigger.refresh());
      });
      if (process) {
        const path = process.querySelector('.scroll-trace path');
        const length = path.getTotalLength();
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: process, start: 'top 80%', end: 'bottom 60%', scrub: .6 } });
      }
      return () => cleanups.forEach(cleanup => cleanup());
    });
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  setup();
})();
