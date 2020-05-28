import DBService from "./classes/DBService.js";
import Modal from "./classes/Modal.js";
import Loader from "./classes/Loader.js";
import Card from "./classes/Card.js";

const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    showsList = document.querySelector('.tv-shows__list'),
    showContainer = document.querySelector('.tv-shows'),
    searchForm = document.querySelector('.search__form'),
    searchInput = document.querySelector('.search__form-input');

const modal = new Modal();
const loader = new Loader();

window.API_KEY = null;

const openMenu = () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
}

const closeMenu = ({target}) => {
    if (!target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
        leftMenu.querySelectorAll('.dropdown.active').forEach(item => {
            item.classList.remove('active');
        });
    }
};

const openDropdown = e => {
    e.preventDefault();

    const {target} = e;
    const dropdown = target.closest('.dropdown');

    if (dropdown) {
        dropdown.classList.toggle(('active'));
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }
};

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

const showModal = e => {
    e.preventDefault();

    const {target} = e,
        tvCard = target.closest('.tv-card'),
        showID = tvCard.dataset.showId;

    if (tvCard && showID) {
        modal.showModal(showID);
    }
};

const closeModal = ({target}) => {
    const isModal = target.classList.contains('modal'),
        isCross = target.closest('.cross');

    if (isModal || isCross) {
        modal.hideModal();
    }
};

const renderCards = ({results}) => {
    showsList.innerHTML = '';

    results.forEach(item => {
        showsList.append(Card.buildCard(item));
    });

    if(!results.length) {
        showsList.innerHTML = '<li><h2>Ничего не найдно</h2></li>';
    }

    loader.hideLoader();
}

const searchResults = e => {
    e.preventDefault();
    const value = searchInput.value.trim();

    if(!value) return;

    loader.showLoader(showContainer);
    new DBService().getSearchResult(value).then(renderCards);
    searchInput.value = '';
};

const registerListeners = () => {
    hamburger.addEventListener('click', openMenu, false);
    document.body.addEventListener('click', closeMenu, false);
    leftMenu.addEventListener('click', openDropdown, false);
    showsList.addEventListener('mouseover', showCardBackdrop, false);
    showsList.addEventListener('mouseout', showCardBackdrop, false);
    showsList.addEventListener('click', showModal, false);
    modal.ui.modal.addEventListener('click', closeModal, false);
    searchForm.addEventListener('submit', searchResults, false);
};

const main = () => {
    registerListeners();
    loader.showLoader(showContainer);
    new DBService().getTestData().then(renderCards);
};

new DBService().downloadAPIKey().then(main);
