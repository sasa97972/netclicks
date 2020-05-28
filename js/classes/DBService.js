export default class DBService {
    static SERVER_URL = 'https://api.themoviedb.org/3';
    static LANGUAGE = 'ru-RU';

    static async getData(url) {
        const response = await fetch(url);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Error ${response.status}`);
        }
    }

    static getTestData() {
        return DBService.getData('test.json');
    }

    static async downloadAPIKey() {
        const response = await fetch('config/api.key');
        window.API_KEY = await response.text();
    }

    static getSearchResult(query) {
        return DBService.getData(`${DBService.SERVER_URL}/search/tv?api_key=${window.API_KEY}&query=${encodeURIComponent(query)}&language=${DBService.LANGUAGE}`);
    }

    static getDetailsData(id) {
        return DBService.getData(`${DBService.SERVER_URL}/tv/${id}?api_key=${window.API_KEY}&language=${DBService.LANGUAGE}`);
    }
}
