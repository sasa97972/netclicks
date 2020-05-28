export default class DBService {
    static SERVER_URL = 'https://api.themoviedb.org/3';
    static LANGUAGE = 'ru-RU';
    static lastQuery = null;

    static async getData(url) {
        const response = await fetch(url);
        this.lastQuery = url;
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Error ${response.status}`);
        }
    }

    static getTestData() {
        return this.getData('test.json');
    }

    static async downloadAPIKey() {
        const response = await fetch('config/api.key');
        window.API_KEY = await response.text();
    }

    static getSearchResult(query) {
        return this.getData(`${this.SERVER_URL}/search/tv?api_key=${window.API_KEY}&query=${encodeURIComponent(query)}&language=${this.LANGUAGE}`);
    }

    static getDetailsData(id) {
        return this.getData(`${this.SERVER_URL}/tv/${id}?api_key=${window.API_KEY}&language=${this.LANGUAGE}`);
    }

    static getCategory(category) {
        return this.getData(`${this.SERVER_URL}/tv/${category}?api_key=${window.API_KEY}&language=${this.LANGUAGE}`);
    }

    static getNextPage(page) {
        return this.getData(`${this.lastQuery}&page=${page}`);
    }
}
