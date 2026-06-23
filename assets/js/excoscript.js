function gotoabout(){
    window.location.href="index.html#about";
}

document.addEventListener('DOMContentLoaded', function () {
    // Search functionality
    const searchInput = document.getElementById('excoSearch');
    const excoCards = Array.from(document.querySelectorAll('.exco-card'));

    function filterCards(query) {
        const q = query.trim().toLowerCase();
        excoCards.forEach(card => {
            const name = (card.querySelector('.exco-name')?.textContent || '').toLowerCase();
            const position = (card.querySelector('.exco-position')?.textContent || '').toLowerCase();
            const match = q === '' || name.includes(q) || position.includes(q);
            card.style.display = match ? '' : 'none';
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => filterCards(e.target.value));
    }

    // Clickable images -> modal
    const modal = document.getElementById('imgModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');

    function openModal(src, caption) {
        if (!modal) return;
        modalImg.src = src;
        modalImg.alt = caption || 'Executive image';
        modalCaption.textContent = caption || '';
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        modalImg.src = '';
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.exco-img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            const src = img.getAttribute('data-full') || img.src;
            // caption: look up the closest card name
            const card = img.closest('.exco-card');
            const name = card?.querySelector('.exco-name')?.textContent || '';
            openModal(src, name);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});
