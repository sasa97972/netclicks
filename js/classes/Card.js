import {DEFAULT_IMG, IMG_URL} from "../constants.js";

export default class Card {
    static buildCard({
                         vote_average: vote,
                         poster_path: poster,
                         backdrop_path: backdrop,
                         name: title,
                         id
                     }) {
        const posterURI = poster ? `${IMG_URL + poster}` : DEFAULT_IMG;
        const backdropURI = backdrop ? `${IMG_URL + backdrop}` : '';
        const voteEl = vote ? `<span class="tv-card__vote">${vote}</span>` : '';

        const card = document.createElement('li');
        card.classList.add('tv-shows__item');
        card.showId = id;
        card.innerHTML = `
            <a href="#" class="tv-card" data-show-id="${poster ? id: ''}">
                ${voteEl}
                <img class="tv-card__img"
                     src="${posterURI}"
                     data-backdrop="${backdropURI}"
                     alt="${title}">
                <h4 class="tv-card__head">${title}</h4>
            </a>
        `;

        return card;
    }
}