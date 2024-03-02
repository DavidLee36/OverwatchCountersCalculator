import { retrieveCountersDriver } from './utilities/RetrieveCounters.js';

const calculateBtn = document.querySelector('.calculate');
const selectors = document.querySelectorAll('.select-hero');
const roleSelector = document.getElementById('select-role');
const roleSelectorParent = document.querySelector('.role-select-wrapper');

calculateBtn.addEventListener('click', () => { //Calculate and display counters

    //Retrieve the 5 selected heroes from the HTML selectors
    let selectedHeroes =[];
    selectors.forEach(selector => selectedHeroes.push(selector.value))
    selectedHeroes = selectedHeroes.map(hero => hero.replace(/-/g, ' '));

    const selectedRole = roleSelector.value;
    if(selectedRole === 'none') {
        roleSelectorParent.classList.add('please-select');
        setTimeout(() => {
            alert('Please select a role');
        }, 10);
        return;
    }

    roleSelectorParent.classList.remove('please-select');

    const counters = retrieveCountersDriver(selectedRole, selectedHeroes)
    
    displayCounters(counters);
})

selectors.forEach(selector => {
    selector.addEventListener('change', (e) => {
        const parentHeroCard = e.target.closest('.hero-card');
        const heroImg = parentHeroCard.querySelector('img');
        let heroName = selector.value;
        if(heroName) {
            if(heroName === 'Soldier:76') heroName = 'Soldier-76';
            if(heroName === 'D.Va') heroName = 'Dva';
            heroName = heroName.toLowerCase();
            heroImg.src = `./assets/hero_icons/${heroName}.png`;
            heroImg.alt = heroName;
        }else { //No character chosen
            heroName = 'default-icon';
            heroImg.src = './assets/overwatch-logo.png';
            heroImg.alt = 'overwatch-logo';
        }
    })
})

const displayCounters = (counters) => {
    const displayCounterEl = document.querySelector('.display-counters');
    
    displayCounterEl.classList.remove('no-show')

    if(counters.length < 1) {
        displayCounterEl.innerHTML = '<h1>No counters found</h1>';
        return;
    }

    // Generate the inner HTML string for counters
    const countersHTML = counters.map(counter => {
        const counterAlt = counter[0]; //Counter name before editing used for display
        let counterName = counter[0];
        counterName = counterName.replace(' ', '-');
        if(counterName === 'D.Va') counterName = 'dva';
        if(counterName === 'Soldier:76') counterName = 'soldier-76';

        return `
            <div class="hero-card">
                <img src="./assets/hero_icons/${counterName.toLowerCase()}.png" alt="${counterAlt}">
                <h3>${counterAlt}</h3>
                <h3>Score: ${counter[1]}</h3>
            </div>
        `;
    }).join(''); // Join the array elements into a single string without commas

    displayCounterEl.innerHTML = `
    <div class="cards-container">
        ${countersHTML}
    </div>
    `;
}

const imgHeroNames = ["ana", "ashe", "baptiste", "bastion", "brigitte", "cassidy", "dva", "doomfist", "echo", "genji", "hanzo", "illari", "junker-queen", "junkrat", "kiriko", "lifeweaver", "lucio", "mauga", "mei", "mercy", "moira", "orisa", "pharah", "ramattra", "reaper", "reinhardt", "roadhog", "sigma", "soldier-76", "sombra", "symmetra", "torbjorn", "tracer", "widowmaker", "winston", "wrecking-ball", "zarya", "zenyatta"];

const preloadHeroImages = () => {
    imgHeroNames.forEach(heroName => {
        const src = `./assets/hero_icons/${heroName}.png`;
        const img = new Image();
        img.src = src;
    });
}

document.addEventListener('DOMContentLoaded', preloadHeroImages);