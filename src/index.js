'use strict';
import '@styles/styles.css';
// import { filters } from './pkmn-data';
import fetchData from '@helpers/fetchData.js';
import { removeGaleryContent, makeGaleryItem, renderGalery } from '@galery/galery';
import { removeLoading, renderLoading } from './js/loading';
import { updatePreviousAndNextButtons } from '@galery/next-previous-buttons';

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
    return fetchData(fetchUrl)
        .then(
            ({ results, previous: previousUrl, next: nextUrl }) => {
                removeGaleryContent();
                renderLoading();
                updatePreviousAndNextButtons(previousUrl, nextUrl);

                const pkmnUrlList = results.map(pkmn => pkmn.url)
                let galeryItems = [];

                pkmnUrlList.map((pkmnUrl) => {
                    return fetchData(pkmnUrl)
                        .then(
                            ({ id, name, sprites }) => {
                                let spriteUrl =  sprites.other['official-artwork'].front_default;
                                let galeryItem = makeGaleryItem(id, name, spriteUrl);
                                galeryItems.push(galeryItem);

                                if (galeryItems.length === 18) {
                                    removeLoading();
                                    renderGalery(galeryItems);
                                }
                            })
                        .catch(err => console.log(err));
                });
            }
        ).catch(err => console.log(err));
}

const initApp = () => {
    updatePage(`${API}pokemon?limit=${FETCH_LIMIT}`);
}

initApp();

export { updatePage }