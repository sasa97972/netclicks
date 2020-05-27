import DBService from "./DBService.js";
import {IMG_URL, DEFAULT_IMG} from "../constants.js";

export default class Modal {
    constructor() {
        this.ui = {
            modal: document.querySelector('.modal'),
            image: document.querySelector('.tv-card__img'),
            title: document.querySelector('.modal__title'),
            genres: document.querySelector('.genres-list'),
            rating: document.querySelector('.rating'),
            description: document.querySelector('.description'),
            link: document.querySelector('.modal__link'),
        }
    }

    showModal(id) {
        new DBService().getDetailsData(id)
            .then(response => this.renderModal(response))
            .then(() => {
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
        this.ui.description.textContent = overview;
        this.ui.link.href = homepage;
    }
}