const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open menu');
  navigation.classList.remove('open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menu.focus();
  }
});

const enquiry = document.querySelector('#enquiry');
document.querySelectorAll('[data-enquiry]').forEach(button => button.addEventListener('click', () => {
  closeMenu();
  enquiry.showModal();
}));
document.querySelector('.close-dialog').addEventListener('click', () => enquiry.close());
enquiry.addEventListener('click', event => {
  if (event.target === enquiry) {
    const bounds = enquiry.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) enquiry.close();
  }
});
document.querySelector('#enquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const schoolClass = document.querySelector('#child-class').value;
  const message = `Hello Sunshine Convent Public School, I would like to enquire about ${schoolClass} admissions for the 2026–27 session. Please share the availability and next steps.`;
  window.open(`https://wa.me/919599475360?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

// The full admission page prepares an enquiry; the visitor sends it in WhatsApp.
document.querySelector('#admission-page-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const schoolClass = document.querySelector('#admission-class').value;
  const question = document.querySelector('#admission-question').value.trim();
  const message = `Hello Sunshine Convent Public School, I would like to enquire about ${schoolClass} admissions for the 2026–27 session. Please share the availability and next steps.${question ? ` My question: ${question}` : ''}`;
  const url = `https://wa.me/919599475360?text=${encodeURIComponent(message)}`;
  const fallback = document.querySelector('#admission-fallback');
  fallback.href = url;
  fallback.hidden = false;
  window.open(url, '_blank', 'noopener,noreferrer');
});

document.querySelectorAll('[data-gallery-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.galleryFilter;
    document.querySelectorAll('[data-gallery-filter]').forEach(filter => {
      filter.setAttribute('aria-pressed', String(filter === button));
    });
    let visible = 0;
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.hidden = category !== 'all' && item.dataset.category !== category;
      if (!item.hidden) visible++;
    });
    document.querySelector('#gallery-status').textContent = `Showing ${visible} photo spaces.`;
  });
});

const documentSearch = document.querySelector('#document-search');
const documentCategory = document.querySelector('#document-category');
function filterDocuments() {
  const query = documentSearch.value.trim().toLowerCase();
  const category = documentCategory.value;
  let count = 0;
  document.querySelectorAll('[data-document-category]').forEach(row => {
    row.hidden = !row.textContent.toLowerCase().includes(query) ||
      (category !== 'all' && row.dataset.documentCategory !== category);
    if (!row.hidden) count++;
  });
  document.querySelector('#document-status').textContent = `Showing ${count} document${count === 1 ? '' : 's'}`;
  document.querySelector('#document-empty').hidden = count > 0;
}
documentSearch?.addEventListener('input', filterDocuments);
documentCategory?.addEventListener('change', filterDocuments);
