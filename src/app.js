/* Progressive enhancement: the book is readable without JavaScript. */
const form = document.querySelector('.toolbar');
if (form) {
  const search = document.querySelector('#search');
  const shelf = document.querySelector('#shelf');
  const role = document.querySelector('#role');
  const rows = [...document.querySelectorAll('[data-concept]')];
  // Match common y/ies forms, such as retry/retries and policy/policies.
  const normalizeSearch = value => value.toLocaleLowerCase().replace(/\b([a-z]{3,})ies\b/g, '$1y');
  const searchable = new Map(rows.map(row => [row, row.dataset.search + ' ' + normalizeSearch(row.dataset.search)]));
  function filter() {
    const terms = normalizeSearch(search.value.trim()).split(/\s+/).filter(Boolean);
    let count = 0;
    for (const row of rows) {
      row.hidden = !terms.every(term => searchable.get(row).includes(term)) ||
        (shelf.value !== 'all' && row.dataset.shelf !== shelf.value) ||
        (role.value !== 'all' && !row.dataset.roles.split('|').includes(role.value));
      if (!row.hidden) count++;
    }
    document.querySelector('#count').textContent = `${count} ${count === 1 ? 'concept' : 'concepts'}`;
    document.querySelector('.empty').hidden = count !== 0;
    form.querySelector('[type=reset]').hidden = !search.value && shelf.value === 'all' && role.value === 'all';
    const params = new URLSearchParams();
    if (search.value.trim()) params.set('q', search.value.trim());
    if (shelf.value !== 'all') params.set('shelf', shelf.value);
    if (role.value !== 'all') params.set('role', role.value);
    history.replaceState(null, '', `${location.pathname}${params.size ? '?' + params : ''}`);
  }
  const params = new URLSearchParams(location.search);
  search.value = params.get('q') || '';
  if ([...shelf.options].some(o => o.value === params.get('shelf'))) shelf.value = params.get('shelf');
  if ([...role.options].some(o => o.value === params.get('role'))) role.value = params.get('role');
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', filter);
  form.addEventListener('change', filter);
  form.addEventListener('reset', () => requestAnimationFrame(filter));
  document.querySelector('#clear-empty').addEventListener('click', () => { form.reset(); search.focus(); });
  // Support links copied from the original prototype.
  let legacyId = '';
  try { legacyId = decodeURIComponent(location.hash.slice(1)); } catch { /* Invalid hashes keep the index usable. */ }
  const legacy = rows.find(row => row.dataset.concept === legacyId);
  if (legacy) location.replace(legacy.href);
  else filter();
}

const videos = [...document.querySelectorAll('video')];
for (const video of videos) {
  video.addEventListener('play', () => {
    for (const other of videos) if (other !== video) other.pause();
  });
  const showMediaError = () => {
    if (video.nextElementSibling?.classList.contains('media-error')) return;
    const note = document.createElement('p');
    note.className = 'media-error';
    note.setAttribute('role', 'status');
    note.append('This video could not load. ');
    const link = document.createElement('a');
    link.href = video.querySelector('source').src;
    link.textContent = 'Open the video file';
    note.append(link, ' or continue with the written guide.');
    video.after(note);
  };
  video.addEventListener('error', showMediaError);
  video.querySelector('source')?.addEventListener('error', showMediaError);
}

// With no JavaScript, all lessons and their anchor links remain usable.
for (const sequence of document.querySelectorAll('.lesson-sequence')) {
  const panels = [...sequence.querySelectorAll('.lesson-panel')];
  const links = [...sequence.querySelectorAll('[data-lesson-link]')];
  const status = sequence.querySelector('.lesson-status');
  function show(id, focus = false) {
    const selected = panels.find(panel => panel.id === id) || panels[0];
    for (const panel of panels) {
      const current = panel === selected;
      panel.hidden = !current;
      if (!current) panel.querySelector('video').pause();
    }
    for (const link of links) {
      if (link.hash === '#' + selected.id) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    }
    const number = panels.indexOf(selected) + 1;
    status.hidden = false;
    status.textContent = `Lesson ${number} of ${panels.length}: ${selected.querySelector('h3').textContent}`;
    if (focus) {
      selected.querySelector('h3').focus({preventScroll: true});
      selected.scrollIntoView({block: 'start', behavior: 'instant'});
    }
  }
  for (const link of links) link.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    history.pushState(null, '', link.hash);
    show(link.hash.slice(1), true);
  });
  for (const panel of panels) {
    const video = panel.querySelector('video');
    video.addEventListener('ended', () => {
      panel.querySelector('.lesson-ended').hidden = false;
      status.textContent = `${panel.querySelector('h3').textContent} finished. ${panel === panels.at(-1) ? 'Sequence complete. Continue with the guide when ready.' : 'Continue to the next lesson when ready.'}`;
    });
    video.addEventListener('play', () => { panel.querySelector('.lesson-ended').hidden = true; });
  }
  window.addEventListener('hashchange', () => {
    if (panels.some(panel => '#' + panel.id === location.hash)) show(location.hash.slice(1));
  });
  window.addEventListener('popstate', () => show(location.hash.slice(1)));
  show(location.hash.slice(1));
}
