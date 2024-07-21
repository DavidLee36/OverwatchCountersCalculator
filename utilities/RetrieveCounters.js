import heroesData from "./heroesData.js";

let countersList = [];

const getCounters = (heroName, role) => {

    if(!heroName) return;

    const hero = heroesData.find(hero => hero.hero === heroName);

    if(hero) {
        countersList.push(hero[role]);
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

//Adjust counters list to account for the fact that a suggested counter
//might be countered by an enemy
const getAntiCounters = (countersObj, enemyTeam) => {
    let countersArray = Object.entries(countersObj); // Convert countersObj into key-value pair array

    // Adjust counters based on anti-counters
    countersArray = countersArray.map(([counter, count]) => {
        const counterObj = heroesData.find(hero => hero.hero === counter); // Retrieve counter object from heroesData
        
        // For each enemy hero, check if they appear on the suggested counter's counter list
        enemyTeam.forEach(enemy => {
            if((counterObj.tank.includes(enemy) || counterObj.damage.includes(enemy) || counterObj.support.includes(enemy)) && enemy) {
                count--;
            }
        });
        return [counter, count];
    }).filter(([_, count]) => count > 0); //Filter out counters with a score of 0 or less

    // Sort the array by count in descending order
    countersArray.sort((a, b) => b[1] - a[1]);

    // Convert the sorted array back into an object
    const sortedCountersObj = countersArray.reduce((obj, [counter, count]) => {
        obj[counter] = count;
        return obj;
    }, {});

    return sortedCountersObj;
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

    const antiCounters = getAntiCounters(counters, characters, role);
    console.log('with anti counters: ', antiCounters);

    const topFive = getTopFive(antiCounters);
    //const topFiveNames = topFive.map(i => i[0]);

    return topFive;
}

export {retrieveCountersDriver};