import { renderErrorMessage } from '@errors/error-message';
import { removeGaleryContent } from '@galery/galery';
import { renderLoading } from '../loading';
import { updatePage  } from '../..';

const catchPokemonsFetchError = (errorUrl) => {
    removeGaleryContent();
    renderErrorMessage('galeryGrid', 'Try again');

    const tryAgainButton = document.getElementById('tryAgainButton');
    tryAgainButton.onclick = () => {
        removeGaleryContent();
        updatePreviousAndNextButtons(null, null);
        renderLoading('galeryGrid');
        updatePage(errorUrl);
    }
}

const catchFlashcardFetchError = () => {
    renderErrorMessage('modal', 'Close');
    document.querySelector('#tryAgainButton').onclick = () => {
        removeModal();
    }
    console.log(errorMsg);
}


export { catchPokemonsFetchError, catchFlashcardFetchError };