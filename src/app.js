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

// Load only the explanation the reader chose. Returning to video tears down WebGL.
for (const media of document.querySelectorAll('.chapter-media')) {
  const modes = [...media.querySelectorAll('[data-media-mode]')];
  const panels = [...media.querySelectorAll('[data-media-panel]')];
  const grid = media.closest('.article-grid');
  const mount = media.querySelector('.spatial-mount');
  media.querySelector('.media-modes').hidden = false;
  for (const button of modes) button.addEventListener('click', () => {
    const spatial = button.dataset.mediaMode === 'spatial';
    for (const option of modes) option.setAttribute('aria-pressed', String(option === button));
    for (const panel of panels) panel.hidden = panel.dataset.mediaPanel !== button.dataset.mediaMode;
    grid.classList.toggle('spatial-open', spatial);
    if (spatial) {
      for (const video of videos) video.pause();
      if (!mount.firstChild) {
        const frame = document.createElement('iframe');
        frame.src = media.dataset.spatialSrc;
        frame.title = `${document.querySelector('h1').textContent} — interactive investigation`;
        frame.setAttribute('loading', 'eager');
        mount.append(frame);
      }
    } else mount.replaceChildren();
    // The wider 3D stage changes the grid: keep the chosen explanation in view.
    media.scrollIntoView({block:'start', behavior:'instant'});
  });
}
