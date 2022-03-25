'use strict';
import '@styles/styles.css';
// import { filters } from './pkmn-data';
import fetchData from '@helpers/fetchData.js';
import { removeGaleryContent, makeGaleryItem, renderGalery } from '@galery/galery';
import { removeLoading, renderLoading } from './js/loading';
import { updatePreviousAndNextButtons } from '@galery/next-previous-buttons';
import { catchPokemonsFetchError } from '@errors/error-handlers';

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
    updatePreviousAndNextButtons(null, null);
    renderLoading('galeryGrid');
    fetchData(fetchUrl)
    .then(({ results, previous: previousUrl, next: nextUrl }) => {
        const pkmnUrlList = results.map(pkmn => pkmn.url);
        let pkmnPromises = pkmnUrlList.map(pkmnUrl => fetchData(pkmnUrl));
        return Promise.all([...pkmnPromises, previousUrl, nextUrl]);
    })
    .then(pkmnsData => {
        const nextUrl = pkmnsData.pop();
        const previousUrl = pkmnsData.pop();
        let galeryItems = pkmnsData.map(({ id, name, sprites }) => {
                let spriteUrl = sprites.other['official-artwork'].front_default;
                let galeryItem = makeGaleryItem(id, name, spriteUrl, API);
                return galeryItem;
            })
            return [...galeryItems, previousUrl, nextUrl];
        })
        .then(galeryItems => {
            const nextUrl = galeryItems.pop()
            const previousUrl = galeryItems.pop();
            removeLoading();
            renderGalery(galeryItems);
            updatePreviousAndNextButtons(previousUrl, nextUrl);
        })
        .catch(( [errorMsg, errorUrl] ) => {
            (errorUrl.includes('limit')) 
            ? catchPokemonsFetchError(errorUrl)
            : catchPokemonsFetchError(fetchUrl);
            console.log(errorMsg);
        });
    }

const initApp = () => {
    //initSearch(API);

    updatePage(`${API}pokemon?limit=${FETCH_LIMIT}`);
}

initApp();

export { updatePage }