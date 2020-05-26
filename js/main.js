const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

document.body.addEventListener('click', (event) => {
    if (!event.target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu')
        hamburger.classList.remove('open');
    }
});

leftMenu.addEventListener('click', event => {
    const target = event.target;
    const dropdown = target.closest('.dropdown');

    if (dropdown) {
        dropdown.classList.toggle(('active'));
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }
});

const showsList = document.querySelector('.tv-shows__list');

const showCardBackdrop = ({ target }) => {
    const tvCard = target.closest('.tv-card');

    if(!tvCard) return;

    const image = tvCard.querySelector('.tv-card__img');
    const backdropLink = image.dataset.backdrop;

    if(backdropLink) {
        image.dataset.backdrop = image.src;
        image.src = backdropLink;
        image.classList.toggle('tv-card__img_back');
    }
}

showsList.addEventListener('mouseover', showCardBackdrop, false);
showsList.addEventListener('mouseout', showCardBackdrop, false);

