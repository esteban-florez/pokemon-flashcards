import capitalizeString from "@helpers/capitalizeString";
import { sortByPkmnId } from "@sorting/sorting-functions";
import { initFlashcard } from '@galery/flashcards';

const handleGaleryItemClick = (pkmnSpeciesUrl) => {
    initFlashcard(pkmnSpeciesUrl);
}

const removeGaleryContent = () => {
    const galeryGrid = document.querySelector('#galeryGrid');
    galeryGrid.innerHTML = '';
}

const renderGalery = (galeryItems) => {
    galeryItems.sort(sortByPkmnId);
    galeryItems.forEach(item => galeryGrid.appendChild(item));
}

const makeGaleryItem = (id, name, spriteUrl, API) => {
    name = capitalizeString(name);
    const clickEventUrl = `${API}pokemon-species/${id}`;
    const galeryItemTemplate = `<figure class="little-card__container">
    <img class="little-card__image" src="${spriteUrl}" alt="A ${name} image">
    <figcaption class="little-card__title">${name}</figcaption>
</figure>`;

    let divElement = document.createElement('div');
    divElement.setAttribute('data-pkmnid', id)
    divElement.classList.add('little-card');
    divElement.onclick = handleGaleryItemClick.bind(null, clickEventUrl);
    
    divElement.innerHTML = galeryItemTemplate;
    return divElement;
}

export { removeGaleryContent, makeGaleryItem, renderGalery };