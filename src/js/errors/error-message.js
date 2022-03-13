const renderErrorMessage = () => {
    const galeryGrid = document.querySelector('#galeryGrid');
    const errorTemplate = `<p>An error has ocurred...</p>
    <button id="tryAgainButton" class="galery-container__retry-button">Try again</button>`
    const divElement = document.createElement('div');
    divElement.innerHTML = errorTemplate;
    divElement.setAttribute('class', 'galery-container__error');
    galeryGrid.appendChild(divElement);
}

export { renderErrorMessage };

