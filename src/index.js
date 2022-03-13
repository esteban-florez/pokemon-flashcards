'use strict';
import '@styles/styles.css';
// import { filters } from './pkmn-data';
import fetchData from '@helpers/fetchData.js';
import { removeGaleryContent, makeGaleryItem, renderGalery } from '@galery/galery';
import { removeLoading, renderLoading } from './js/loading';
import { updatePreviousAndNextButtons } from '@galery/next-previous-buttons';
import { pokemonsFetchErrorHandler } from '@errors/error-handlers';

const API = 'https://pokeapi.co/api/v2/';
const FETCH_LIMIT = 18;
const SORT_OPTIONS = [
    'byPokedexOption',
    'byName',
    'byWeight',
    'byHeight',
];
// const FILTERS = filters;

const updatePage = (fetchUrl) => {
    removeGaleryContent();
    renderLoading();
    fetchData(fetchUrl)
        .then(({ results, previous: previousUrl, next: nextUrl }) => {
            updatePreviousAndNextButtons(previousUrl, nextUrl);
            const pkmnUrlList = results.map(pkmn => pkmn.url);
            let pkmnPromises = pkmnUrlList.map(pkmnUrl => fetchData(pkmnUrl + "asd"));
            return Promise.all(pkmnPromises);
        })
        .then(pkmnsData => {
                let galeryItems = pkmnsData.map(({ id, name, sprites }) => {
                    let spriteUrl =  sprites.other['official-artwork'].front_default;
                    let galeryItem = makeGaleryItem(id, name, spriteUrl);
                    return galeryItem;
                })
            return galeryItems;
        })
        .then(galeryItems => {
            removeLoading();
            renderGalery(galeryItems);
        })
        .catch(( [errorMsg, errorUrl] ) => {
            (errorUrl.includes('limit')) 
            ? pokemonsFetchErrorHandler(errorUrl)
            : pokemonsFetchErrorHandler(fetchUrl);
            console.log(errorMsg);
        });
}

const initApp = () => {
    updatePage(`${API}pokemon?limit=${FETCH_LIMIT}`);
}

initApp();

export { updatePage }