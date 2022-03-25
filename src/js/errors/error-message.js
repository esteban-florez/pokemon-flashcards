const renderErrorMessage = (parentElementId, btnText) => {
    const errorTemplate = `<p>An error has ocurred...</p>
    <button id="tryAgainButton" class="galery-container__retry-button">${btnText}</button>`
    const divElement = document.createElement('div');
    divElement.innerHTML = errorTemplate;
    divElement.setAttribute('class', 'galery-container__error');

    const parentElement = document.querySelector(`#${parentElementId}`);
    parentElement.appendChild(divElement);
}

export { renderErrorMessage };

