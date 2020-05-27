export default class Loader {
    constructor() {
        const loader = document.createElement('div');
        loader.className = ('loading');
        this.loader = loader;
    }

    showLoader(container) {
        container.append(this.loader);
    }

    hideLoader() {
        this.loader.remove();
    }
}