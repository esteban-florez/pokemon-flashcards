import { updatePreviousAndNextButtons } from "./galery/next-previous-buttons";

const loadingId = 'loading';
const galeryGridElement = document.querySelector('#galeryGrid');

const renderLoading = () => {
    updatePreviousAndNextButtons(null, null);
    const loadingElement = document.createElement('div');
    loadingElement.id = loadingId;
    loadingElement.classList.add('galery-container__loading');
    loadingElement.innerText = 'Loading...'

    galeryGridElement.appendChild(loadingElement);
}

const removeLoading = () => {
    const loadingElement = document.querySelector(`#${loadingId}`);
    loadingElement.remove();
}

export { renderLoading, removeLoading };