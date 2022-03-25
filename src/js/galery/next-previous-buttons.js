import { getModifierClass, toggleModifierClass } from "@dom/modifier-class";
import { removeGaleryContent } from "@galery/galery";
import { renderLoading } from "../loading";
import { updatePage } from "../..";

const toggleButton = (url, buttonElement, modifier) => {
    if( !!url === !!getModifierClass(buttonElement, modifier) ) {
        toggleModifierClass(buttonElement, modifier);
    }
}

const updateButtonEvent = (url, buttonElement) => {
    if(!url) {
        buttonElement.onclick = null;
    } else {
        buttonElement.onclick = () => {
            removeGaleryContent();
            updatePreviousAndNextButtons(null, null);
            renderLoading('galeryGrid');
            updatePage(url);    
        }
    }
}

const updatePreviousAndNextButtons = (previousUrl, nextUrl) => {
    const previousButton = document.querySelector('#previousButton');
    const nextButton = document.querySelector('#nextButton');
    const buttonsModifier = 'inactive';
    
    toggleButton(previousUrl, previousButton, buttonsModifier)
    toggleButton(nextUrl, nextButton, buttonsModifier)

    updateButtonEvent(previousUrl, previousButton);
    updateButtonEvent(nextUrl, nextButton);
}

export { updatePreviousAndNextButtons }