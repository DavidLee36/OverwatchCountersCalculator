import heroesData from "./heroesData.js";

let countersList = [];

const getCounters = (heroName, role) => {

    if(!heroName) return;

    const hero = heroesData.find(hero => hero.hero === heroName);

    if(hero) {
        //Push counters to countersList based on selected role
        switch (role) {
            case 'tank':
                countersList.push(hero.tank);
                break;
            case 'damage':
                countersList.push(hero.damage);
                break;
            case 'support':
                countersList.push(hero.healer);
                break;
            default:
                console.log('Error: role not defined');
                break;
        }
    }else {
        console.log(`${heroName} not found`);
    }
}

const calculateOccurences = (charactersList) => {
    const flatList = charactersList.flat();
    const nameOccurrences = {}; //dictionary

    flatList.forEach(name => { //Populate dictionary
        if(nameOccurrences[name]) {
            nameOccurrences[name] += 1;
        }else if(name !== '') { //Don't add empty string
            nameOccurrences[name] = 1;
        }
    });

    // Convert the object into an array of [key, value] pairs
    const items = Object.entries(nameOccurrences);

    // Sort the array by the value (occurrence), in descending order
    const sortedItems = items.sort((a, b) => b[1] - a[1]);

    const sortedCharacters = Object.fromEntries(sortedItems);

    return sortedCharacters;
}

const getTopFive = (countersObj) => {
    const items = Object.entries(countersObj);
    return items.slice(0,5);
}

//Driver function to handle calling all other functions and calculating data
const retrieveCountersDriver = (role, characters) => {
    countersList = [];
    characters.forEach(heroName => getCounters(heroName, role));
    
    const counters = calculateOccurences(countersList);
    console.log('all counters: ', counters);
    const topFive = getTopFive(counters);
    //const topFiveNames = topFive.map(i => i[0]);

    return topFive;
}

export {retrieveCountersDriver};