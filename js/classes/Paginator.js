export default class Paginator {
    constructor() {
        this.pagination = document.querySelector('.pagination');
        this.currentPage = 1;
        this.maxPages = 10;
    }

    changePage(page) {
        this.currentPage = page;
    }

    renderPages(count) {
        this.pagination.innerHTML = '';

        if(count < 2) return;

        for (let i = 1; i <= count && i < this.maxPages; i++) {
            let link;
            if(i === this.currentPage) {
                link = document.createElement('span');
                link.classList.add('pages_active');
            } else {
                link = document.createElement('a');
                link.href = `#`;
            }
            link.classList.add('pages');
            link.textContent = i.toString();

            const container = document.createElement('li');
            container.append(link);

            this.pagination.append(container);
        }
    }
}