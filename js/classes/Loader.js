export default class Loader {
    constructor() {
        const loaderContainer = document.createElement('div');
        loaderContainer.className = 'loadingContainer';
        const loader = document.createElement('div');
        loader.className = 'loading';
        loaderContainer.append(loader);
        this.loader = loaderContainer;
    }

    showLoader(container) {
        container.append(this.loader);
    }

    hideLoader() {
        this.loader.remove();
    }
}