import DBService from "./DBService.js";
import {IMG_URL, DEFAULT_IMG} from "../constants.js";

export default class Modal {
    constructor() {
        this.ui = {
            modal: document.querySelector('.modal'),
            image: document.querySelector('.modal .tv-card__img'),
            title: document.querySelector('.modal__title'),
            genres: document.querySelector('.modal .genres-list'),
            rating: document.querySelector('.modal .rating'),
            description: document.querySelector('.modal .description'),
            link: document.querySelector('.modal__link'),
        }

        this.modalLoader = document.querySelector('.preloader');
    }

    showModal(id) {
        this.modalLoader.style.display = 'block';
        new DBService().getDetailsData(id)
            .then(response => this.renderModal(response))
            .then(() => {
                this.modalLoader.style.display = 'none';
                document.body.style.overflow = 'hidden';
                this.ui.modal.classList.remove('hide');
            });
    }

    hideModal() {
        document.body.style.overflow = '';
        this.ui.modal.classList.add('hide');
    }

    renderModal({
                    poster_path: posterPath,
                    name: title,
                    genres,
                    vote_average: voteAverage,
                    overview,
                    homepage,
                }) {
        this.ui.image.src = posterPath ? IMG_URL + posterPath : DEFAULT_IMG;
        this.ui.image.alt = title;
        this.ui.title.textContent = title;
        this.ui.genres.innerHTML = genres.reduce((html, item) => `${html} <li>${item.name}</li>`, '');
        this.ui.rating.textContent = voteAverage;
        this.ui.description.textContent = overview || 'Отсутствует';
        this.ui.link.href = homepage;
    }
}