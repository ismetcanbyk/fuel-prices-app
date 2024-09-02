import stateCodes from '../data/stateCodes.json';

function getStateCodeByName(stateName) {
    const state = stateCodes.find((item) => item.name.toLowerCase() === stateName.toLowerCase());
    if (state) {
        return state.abbreviation;
    } else {
        console.error(`State not found for name: ${stateName}`);
        return stateName.substring(0, 2).toUpperCase();
    }
}

function getStateName() {
    return stateCodes.map((item) => item.name);
}


export { getStateCodeByName, getStateName };