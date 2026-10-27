const embedParams = new URLSearchParams(location.search);
if (embedParams.get('embed') === '1') {
  document.documentElement.classList.add('demo-embed');

  const filters = document.body.classList.contains('stock-app') && document.getElementById('filters');
  if (filters) {
    const mobile = matchMedia('(max-width:700px)');
    let disclosure;
    function arrangeFilters() {
      if (mobile.matches && !disclosure) {
        const focused = filters.contains(document.activeElement);
        disclosure = document.createElement('details');
        disclosure.className = 'embed-filters';
        const summary = document.createElement('summary');
        summary.textContent = embedParams.get('lang') === 'en' ? 'Search and filter' : 'Rechercher et filtrer';
        filters.before(disclosure);
        disclosure.append(summary, filters);
        if (focused) summary.focus();
      } else if (!mobile.matches && disclosure) {
        const focused = disclosure.contains(document.activeElement) ? document.activeElement : null;
        const target = focused === disclosure.firstElementChild ? filters.querySelector('input') : focused;
        disclosure.before(filters);
        disclosure.remove();
        disclosure = undefined;
        target?.focus();
      }
    }
    document.getElementById('metrics').addEventListener('click', event => {
      if (disclosure && event.target.closest('button')) disclosure.open = true;
    }, true);
    mobile.addEventListener('change', arrangeFilters);
    arrangeFilters();
  }
}
