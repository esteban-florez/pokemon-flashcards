import { renderErrorMessage } from '@errors/error-message';
import { removeGaleryContent } from '@galery/galery';
import { renderLoading } from '../loading';
import { updatePage  } from '../..';

const pokemonsFetchErrorHandler = (errorUrl) => {
    removeGaleryContent();
    renderErrorMessage();

    const tryAgainButton = document.getElementById('tryAgainButton');
    tryAgainButton.onclick = () => {
        removeGaleryContent();
        renderLoading();
        updatePage(errorUrl);
    }
}

export { pokemonsFetchErrorHandler };