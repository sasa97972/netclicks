import DBService from "./classes/DBService.js";
import Modal from "./classes/Modal.js";
import Loader from "./classes/Loader.js";
import { IMG_URL, DEFAULT_IMG } from "./constants.js";

const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    showsList = document.querySelector('.tv-shows__list'),
    showContainer = document.querySelector('.tv-shows'),
    searchForm = document.querySelector('.search__form'),
    searchInput = document.querySelector('.search__form-input');

const modal = new Modal();
const loader = new Loader();

window.API_KEY = null;

hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

document.body.addEventListener('click', ({target}) => {
    if (!target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
        leftMenu.querySelectorAll('.dropdown.active').forEach(item => {
            item.classList.remove('active');
        });
    }
});

leftMenu.addEventListener('click', e => {
    e.preventDefault();

    const {target} = e;
    const dropdown = target.closest('.dropdown');

    if (dropdown) {
        dropdown.classList.toggle(('active'));
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }
});

const showCardBackdrop = ({target}) => {
    const tvCard = target.closest('.tv-card');

    if (!tvCard) return;

    const image = tvCard.querySelector('.tv-card__img');
    const backdropLink = image.dataset.backdrop;

    if (backdropLink) {
        [image.src, image.dataset.backdrop] = [backdropLink, image.src];
        image.classList.toggle('tv-card__img_back');
    }
}

showsList.addEventListener('mouseover', showCardBackdrop, false);
showsList.addEventListener('mouseout', showCardBackdrop, false);

showsList.addEventListener('click', e => {
    e.preventDefault();

    const {target} = e;
    const tvCard = target.closest('.tv-card');

    if (tvCard) {
        modal.showModal(tvCard.dataset.showId);
    }
}, false);

modal.ui.modal.addEventListener('click', ({target}) => {
    const isModal = target.classList.contains('modal'),
        isCross = target.closest('.cross');

    if (isModal || isCross) {
        modal.hideModal();
    }
});

const renderCards = ({results}) => {
    showsList.innerHTML = '';

    results.forEach(({
                         vote_average: vote,
                         poster_path: poster,
                         backdrop_path: backdrop,
                         name: title,
                         id
                     }) => {

        const posterURI = poster ? `${IMG_URL + poster}` : DEFAULT_IMG;
        const backdropURI = backdrop ? `${IMG_URL + backdrop}` : '';
        const voteEl = vote ? `<span class="tv-card__vote">${vote}</span>` : '';

        const card = document.createElement('li');
        card.classList.add('tv-shows__item');
        card.showId = id;
        card.innerHTML = `
            <a href="#" class="tv-card" data-show-id="${id}">
                ${voteEl}
                <img class="tv-card__img"
                     src="${posterURI}"
                     data-backdrop="${backdropURI}"
                     alt="${title}">
                <h4 class="tv-card__head">${title}</h4>
            </a>
        `;

        showsList.append(card);
    });

    if(!results.length) {
        showsList.innerHTML = '<li><h2>Ничего не найдно</h2></li>';
    }

    loader.hideLoader();
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = searchInput.value.trim();

    if(!value) return;

    loader.showLoader(showContainer);
    new DBService().getSearchResult(value).then(renderCards);
    searchInput.value = '';
});

const main = () => {
    loader.showLoader(showContainer);
    new DBService().getTestData().then(renderCards);
};

new DBService().downloadAPIKey().then(main);
