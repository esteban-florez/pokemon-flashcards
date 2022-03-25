import { updatePreviousAndNextButtons } from "@galery/next-previous-buttons";

const loadingId = 'loading';

const renderLoading = (parentElementId) => {
    const loadingElement = document.createElement('div');
    loadingElement.id = loadingId;
    loadingElement.classList.add('galery-container__loading');
    loadingElement.innerText = 'Loading...'

    const parentElement = document.querySelector(`#${parentElementId}`);
    parentElement.appendChild(loadingElement);
}

const removeLoading = () => {
    const loadingElement = document.querySelector(`#${loadingId}`);
    loadingElement.remove();
}

export { renderLoading, removeLoading };