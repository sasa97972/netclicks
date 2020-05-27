export default class DBService {
    async getData(url) {
        const response = await fetch(url);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Error ${response.status}`);
        }
    }

    getTestData() {
        return this.getData('test.json');
    }

    async downloadAPIKey() {
        const response = await fetch('config/api.key');
        window.API_KEY = await response.text();
    }
}
