import { cardsList, createRandomNumbers } from './card-properties-module.js';

let numberOfCards = 5;

let openedCardCount = 0;
let openedCards = {
    first: { divElement: null, value: null, valueSpan: null },
    second: { divElement: null, value: null, valueSpan: null }
}

function listenToEventsOnDomContentLoad() {
    document.addEventListener('DOMContentLoaded', () => {
        startGame();
    })
}

listenToEventsOnDomContentLoad();

function startGame() {
    changeDifficultyAfterReload();
    createRandomNumbers(numberOfCards);
    createCards();
}

function changeDifficultyAfterReload() {
    const newDifficulty = localStorage.getItem('difficulty');
    const difficultyList = [];

    if (!newDifficulty) {
        difficultyList.push('Medium', 'Hard');
        appendDifficultyButtons(difficultyList);
        return;
    }

    const difficultyLevels = {
        'Easy': 5,
        'Medium': 10,
        'Hard': 20
    };

    numberOfCards = difficultyLevels[newDifficulty];

    for (let item of Object.keys(difficultyLevels)) {
        if (item !== newDifficulty) {
            difficultyList.push(item);
        }
    }

    appendDifficultyButtons(difficultyList);
}

function appendDifficultyButtons(difficultyList) {
    const difficultyButtonWrapper = document.querySelector('.difficulty-button-wrapper');
    for (let i = 0; i < 2; i++) {
        const button = document.createElement('button');
        button.classList.add('difficulty-button', 'button');

        if (difficultyList) {
            button.innerHTML = difficultyList[i];
        } else {
            button.innerHTML = ['Medium', 'Hard'][i];
        }

        button.id = button.innerText;
        difficultyButtonWrapper.append(button);
    }
}

function createCards() {
    const wrapperDiv = document.querySelector('.wrapper');

    cardsList.forEach((cardProperties) => {
        const cardDiv = document.createElement('div');
        const cardValueSpan = document.createElement('span');

        cardDiv.classList.add('card');
        cardValueSpan.classList.add('card-value');
        cardValueSpan.innerHTML = cardProperties.value;

        cardDiv.append(cardValueSpan);
        wrapperDiv.append(cardDiv);

        cardDiv.addEventListener('click', () => {
            if (cardProperties.isOpened) return;
            openCard(cardDiv, cardProperties, cardValueSpan);
        })
    })
}

function openCard(cardDiv, cardProperties, cardValueSpan) {
    cardProperties.isOpened = true;
    openedCardCount++;

    cardDiv.style.transform = 'rotateY(180deg)';
    cardDiv.style.background = cardProperties.background;
    cardValueSpan.style.opacity = 1;

    if (openedCardCount % 2 !== 0) {
        openedCards.first.divElement = cardDiv;
        openedCards.first.value = cardProperties.value;
        openedCards.first.valueSpan = cardValueSpan;
    } else if (openedCardCount % 2 === 0) {
        openedCards.second.divElement = cardDiv;
        openedCards.second.value = cardProperties.value;
        openedCards.second.valueSpan = cardValueSpan;
    }

    if (openedCardCount === 2 && openedCards.first.value !== openedCards.second.value) {
        setTimeout(() => {
            closeCards();
        }, 1000);
    } else if (openedCardCount === 2 && openedCards.first.value === openedCards.second.value) {
        openedCards.first.divElement.classList.add('completed');
        openedCards.second.divElement.classList.add('completed');
        openedCards.first.valueSpan.classList.add('completed');
        openedCards.second.valueSpan.classList.add('completed');

        openedCardCount = 0;

        checkForVictory();
    }
}

function closeCards() {
    openedCardCount = 0;
    openedCards = {
        first: { divElement: null, value: null, valueSpan: null },
        second: { divElement: null, value: null, valueSpan: null },
    };

    const openedCardsList = cardsList.filter((element) => element.isOpened === true);
    const cardValueSpanList = Array.from(document.querySelectorAll('[style*="opacity: 1"]')).filter((element) => !element.className.includes('completed'));
    const openedDivList = Array.from(document.querySelectorAll('[style*="transform: rotateY(180deg)"]')).filter((element) => !element.className.includes('completed'))

    openedCardsList.forEach((element) => {
        cardsList[cardsList.indexOf(element)].isOpened = false;
    })

    cardValueSpanList.forEach((element) => {
        element.style.opacity = 0;
    })

    openedDivList.forEach((element) => {
        if (element.className.includes('completed-div')) return;
        element.style.transform = '';
        element.style.backgroundImage = 'url(https://png.pngtree.com/thumb_back/fh260/background/20211106/pngtree-golden-green-mandala-art-background-with-border-invitation-card-wedding-islamic-image_915033.png)';
        element.style.backgroundRepeat = 'no-repeat';
        element.style.backgroundSize = 'cover';
    })
}

function checkForVictory() {
    const isGameWon = Array.from(document.querySelectorAll('.card')).every((item) => item.className.includes('completed'));

    if (isGameWon) {
        const victoryModalDiv = document.querySelector('.victory-modal');
        victoryModalDiv.style.zIndex = 10;
        victoryModalDiv.style.opacity = 1;

        listenToDifficultyChange();
        listenToRestart();
    }
}

function listenToDifficultyChange() {
    const buttonsList = Array.from(document.querySelectorAll('.difficulty-button'));
    for (let button of buttonsList) {
        button.addEventListener('click', () => {
            localStorage.setItem('difficulty', button.innerText);
            location.reload();
        })
    }
}

function listenToRestart() {
    document.querySelector('.restart-button').addEventListener('click', () => {
        location.reload();
    })
}