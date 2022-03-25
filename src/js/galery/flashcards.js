import fetchData from '@helpers/fetchData';
import capitalizeString from '@helpers/capitalizeString';
import { renderModal } from '@dom/modal';
import defaultData from '../../../pkmn-data';
import { renderLoading, removeLoading } from  '../loading';
import { catchFlashcardFetchError } from '@errors/error-handlers';

const processFlashcardData = (flashcardData) => {
    const { pokemon_data, pokemon_species_data } = flashcardData;
    let { id, gender_rate, egg_groups, generation, names } = pokemon_species_data;
    let { height, weight, abilities, sprites, stats, types } = pokemon_data;
    
    let femaleRate = null;
    let maleRate = null;
    let firstEggGroup = null;
    let secondEggGroup = null;
    let firstAbility = null;
    let secondAbility = null;
    let hiddenAbility = null;
    let firstType = null;
    let secondType = null;

    if (gender_rate !== -1) {
        femaleRate = gender_rate * 12.5;
        maleRate = 100 - femaleRate;
    }

    const eggGroupNames = egg_groups.map(eggGroup => {
        const eggGroupUrl = eggGroup.url;
        const eggGroupId = +eggGroupUrl[eggGroupUrl.length - 2];
        const eggGroupsArray = defaultData['egg-groups'];
        const { title: eggGroupName } = eggGroupsArray.find(eggGroup => eggGroup.id === eggGroupId);
        return eggGroupName;
    });

    firstEggGroup = eggGroupNames[0];
    secondEggGroup = eggGroupNames[1];

    const generationUrl = generation.url;
    const generationId = +generationUrl[generationUrl.length - 2];
    const { title: generationName } = defaultData.generations.find(gen => gen.id === generationId);

    const { name: pkmnName} = names.find(name => name.language.name === 'en');

    height /= 10;
    weight /= 10;

    abilities.map(({slot, ability}) => {
        switch (slot) {
            case 1:
                firstAbility = capitalizeString(ability.name);
                break;
            case 2:
                secondAbility = capitalizeString(ability.name);
                break;
            case 3:
                hiddenAbility = capitalizeString(ability.name);
                break;
        }
    });

    const spriteUrl = sprites.other['official-artwork'].front_default;
    
    const baseStats = stats.map(({base_stat}) => base_stat);
    const [pkmnHP, pkmnAttack, pkmnDefense, pkmnSpAttack, pkmnSpDefense, pkmnSpeed] = baseStats;

    types.map(({slot, type}) => {
        switch (slot) {
            case 1:
                firstType = type.name;
                break;
            case 2:
                secondType = type.name;
                break;
        }
    });

    return {id, femaleRate, maleRate, firstEggGroup, secondEggGroup, generationName,
        pkmnName, height, weight, firstAbility, secondAbility, hiddenAbility, spriteUrl, 
        pkmnHP, pkmnAttack, pkmnDefense, pkmnSpAttack, pkmnSpDefense, pkmnSpeed, firstType, secondType}  

}

const createFlashcard = (processedFlashcardData) => {
    const {id, femaleRate, maleRate, firstEggGroup, secondEggGroup, generationName,
        pkmnName, height, weight, firstAbility, secondAbility, hiddenAbility,
        spriteUrl, pkmnHP, pkmnAttack, pkmnDefense, pkmnSpAttack,
        pkmnSpDefense, pkmnSpeed, firstType, secondType} = processedFlashcardData;

    return `<div id="flashcard" class="flashcard">
    <h1 class="flashcard__title">N° ${id} - ${pkmnName}</h1>
    <div class="flashcard__header">
        <img class="flashcard__image" src="${spriteUrl}" alt="An image of Bulbasaur">
        <div class="flashcard__header-right">
            <h2 class="flashcard__generation">${generationName}</h2>
            <div class="flashcard__types-container">
                <h3 class="flashcard__types-title">Types: </h3>
                ${(secondType !== null) ? '<img class="flashcard__first-type-slot" src="assets/types-logos/'+firstType+'.png" alt="'+firstType+' type image"><img class="flashcard__second-type-slot" src="assets/types-logos/'+secondType+'.png" alt="'+secondType+' type image">' : '<img class="flashcard__second-type-slot" src="assets/types-logos/'+firstType+'.png" alt="'+firstType+' type image">'}
            </div>
            <p class="flashcard__height">Height: <b>${height} m</b></p>
            <p class="flashcard__weight">Weight: <b>${weight} kg</b></p>
            <div class="flashcard__gender-container">
                <span class="flashcard__gender-title">Gender:</span>
                ${(maleRate !== null) ? ('<span class="flashcard__gender-male">♂'+maleRate+'%</span><span class="flashcard__gender-female">♀'+femaleRate+'%</span>') : '<span class="flashcard__gender-none">None</span>'}
            </div>
        </div>
    </div>

    <div class="flashcard__middle-container">
        <div class="flashcard__stats-container">
            <h3>Base Stats</h3>
            <span class="flashcard__stat-title">HP: ${pkmnHP}</span>
            <div id="hpMeter" class="flashcard__stat-meter">
                <div class="flashcard__filled-meter" style="width: ${pkmnHP}px;"></div>
            </div>
            <span class="flashcard__stat-title">Attack: ${pkmnAttack}</span>
            <div id="atkMeter" class="flashcard__stat-meter">
                <div class="flashcard__filled-meter" style="width: ${pkmnAttack}px;"></div>
            </div>
            <span class="flashcard__stat-title">Defense: ${pkmnDefense}</span>
            <div id="defMeter" class="flashcard__stat-meter">
                <div class="flashcard__filled-meter" style="width: ${pkmnDefense}px;"></div>
            </div>
            <span class="flashcard__stat-title">Special Attack: ${pkmnSpAttack}</span>
            <div id="spAtkMeter" class="flashcard__stat-meter">
                <div class="flashcard__filled-meter" style="width: ${pkmnSpAttack}px;"></div>
            </div>
            <span class="flashcard__stat-title">Special Defense: ${pkmnSpDefense}</span>
            <div id="spDefMeter" class="flashcard__stat-meter">
                <div class="flashcard__filled-meter" style="width: ${pkmnSpDefense}px;"></div>
            </div>
            <span class="flashcard__stat-title">Speed: ${pkmnSpeed}</span>
            <div id="spdMeter" class="flashcard__stat-meter">
                <div class="flashcard__filled-meter" style="width: ${pkmnSpeed}px;"></div>
            </div>
        </div>
        <div class="flashcard__middle-right">
            <div class="flashcard__egg-container">
                <h3 class="flashcard__egg-title">Egg Groups</h3>
                <p class="flashcard__first-egg-slot">${firstEggGroup}</p>
                <p class="flashcard__second-egg-slot">${secondEggGroup ?? 'None'}</p>
            </div>
            <div class="flashcard__abilities-container">
                <h3 class="flashcard__abilities-title">Abilities</h3>
                <div class="flashcard__ability-body">
                    <div class="flashcard__ability-slot">
                        <p>${firstAbility}</p>
                    </div>
                    <div class="flashcard__ability-slot">
                        <p>${secondAbility ?? 'None'}</p>
                    </div>
                    <div class="flashcard__ability-slot">
                        <p>${hiddenAbility ?? 'None'}<br><i class="flashcard__hidden-marker">(hidden)</i></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`
}


const renderFlashcard = (flashcardTemplate) => {
    const modal = document.querySelector('#modal');
    modal.innerHTML = flashcardTemplate;
}

const initFlashcard = (pkmnSpeciesUrl) => {
    let flashcardData = {
        pokemon_data: null,
        pokemon_species_data: null, 
    };

    renderModal();
    renderLoading('modal');
    
    fetchData(pkmnSpeciesUrl)
    .then(pkmnSpeciesData => {
        flashcardData.pokemon_species_data = JSON.parse(JSON.stringify(pkmnSpeciesData));
        let pkmnUrl = pkmnSpeciesUrl.replace('-species', '');
        return fetchData(pkmnUrl);
    })
    .then(pkmnData => {
        flashcardData.pokemon_data = JSON.parse(JSON.stringify(pkmnData));
        const processedFlashcardData = processFlashcardData(flashcardData);
        const flashcardTemplate = createFlashcard(processedFlashcardData);
        removeLoading();
        renderFlashcard(flashcardTemplate);
    })
    .catch(([errorMsg]) => {
        catchFlashcardFetchError();
        console.log(errorMsg)
    })
}

export { initFlashcard };