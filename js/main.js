import DBService from "./classes/DBService.js";
import Modal from "./classes/Modal.js";
import Loader from "./classes/Loader.js";
import Card from "./classes/Card.js";
import Paginator from "./classes/Paginator.js";
import {DEFAULT_CATEGORY} from './constants.js';

const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    showsList = document.querySelector('.tv-shows__list'),
    showContainer = document.querySelector('.tv-shows'),
    searchForm = document.querySelector('.search__form'),
    searchInput = document.querySelector('.search__form-input'),
    tvShowsHead = document.querySelector('.tv-shows__head');

const modal = new Modal();
const loader = new Loader();
const paginator = new Paginator();

window.API_KEY = null;

const closeDropdown = () => {
    leftMenu.querySelectorAll('.dropdown.active').forEach(item => {
        item.classList.remove('active');
    });
}

const openMenu = () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
    closeDropdown();
}

const closeMenu = () => {
    leftMenu.classList.remove('openMenu');
    hamburger.classList.remove('open');
    closeDropdown();
}

const closeMenuHandler = ({target}) => {
    if (!target.closest('.left-menu')) closeMenu();
};

const openDropdown = dropdown => {
    dropdown.classList.toggle(('active'));
    leftMenu.classList.add('openMenu');
    hamburger.classList.add('open');
};

const downloadTvCategory = (category, title) => {
    loader.showLoader(showContainer);
    DBService
        .getCategory(category)
        .then(response => renderCards(response, title));
};

const searchLinkHandler = () => {
    closeMenu();
    window.scrollTo(0, 0);
    searchInput.focus();
};

const leftMenuHandler = e => {
    e.preventDefault();

    const {target} = e;
    const dropdown = target.closest('.dropdown');
    const menuLink = target.closest('.menu__link');
    const search = target.closest('#search');

    if(dropdown) openDropdown(dropdown);
    if(menuLink) downloadTvCategory(menuLink.dataset.category, menuLink.textContent);
    if(search) searchLinkHandler();
}

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

const renderCards = ({results, total_pages}, title) => {
    showsList.innerHTML = '';

    results.forEach(item => {
        showsList.append(Card.buildCard(item));
    });

    tvShowsHead.textContent = title ? title : results.length ? 'Результат поиска' : 'По вашему запросу ничего не найдено';
    results.length ? tvShowsHead.classList.remove('tv-shows__head_danger') : tvShowsHead.classList.add('tv-shows__head_danger');

    paginator.renderPages(total_pages);

    loader.hideLoader();
}

const searchResults = e => {
    e.preventDefault();
    const value = searchInput.value.trim();

    if(!value) return;

    loader.showLoader(showContainer);
    DBService.getSearchResult(value).then(renderCards);
    searchInput.value = '';
};

const changePage = e => {
    e.preventDefault();
    const {target} = e;

    if(!target.matches('a.pages')) return;

    const page = Number(target.textContent);

    loader.showLoader(showContainer);
    DBService.getNextPage(page).then(response => {
        paginator.changePage(page);
        renderCards(response, null);
        window.scrollTo(0, 0);
    });
};

const registerListeners = () => {
    hamburger.addEventListener('click', openMenu, false);
    document.body.addEventListener('click', closeMenuHandler, false);
    leftMenu.addEventListener('click', leftMenuHandler, false);
    showsList.addEventListener('mouseover', showCardBackdrop, false);
    showsList.addEventListener('mouseout', showCardBackdrop, false);
    showsList.addEventListener('click', showModal, false);
    modal.ui.modal.addEventListener('click', closeModal, false);
    searchForm.addEventListener('submit', searchResults, false);
    paginator.pagination.addEventListener('click', changePage, false);
};

const main = () => {
    registerListeners();
    loader.showLoader(showContainer);
    downloadTvCategory(DEFAULT_CATEGORY.category, DEFAULT_CATEGORY.title);
};

DBService.downloadAPIKey().then(main);
