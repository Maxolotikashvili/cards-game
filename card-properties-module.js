export const cardsList = [];

const numbersList = [];
const backgroundColorList = [
    'linear-gradient(-180deg, rgba(99,138,255,1) 0%, rgba(0,64,255,1) 100%)',
    'linear-gradient(-180deg, rgba(156,247,255,1) 0%, rgba(0,255,254,1) 100%)',
    'linear-gradient(-180deg, rgba(114,255,152,1) 0%, rgba(0,255,70,1) 100%)',
    'linear-gradient(-180deg, rgba(239,255,151,1) 0%, rgba(217,255,0,1) 100%)',
    'linear-gradient(-180deg, rgba(255,216,136,1) 0%, rgba(255,172,0,1) 100%)',
    'linear-gradient(-180deg, rgba(255,128,128,1) 0%, rgba(255,0,0,1) 100%)',
    'linear-gradient(-180deg, #bdc3c7 0%, #2c3e50 100%)',
    'linear-gradient(-180deg, #06beb6 0%, #48b1bf 100%)',
    'linear-gradient(-180deg, #eb3349 0%, #f45c43 100%)',
    'linear-gradient(-180deg, #56ab2f 0%, #a8e063 100%)',
    'linear-gradient(-180deg, #614385 0%, #516395 100%)',
    'linear-gradient(-180deg, #eacda3 0%, #d6ae7b 100%)',
    'linear-gradient(-180deg, #02aab0 0%, #00cdac 100%)',
    'linear-gradient(-180deg, #000428 0%, #004e92 100%)',
    'linear-gradient(-180deg, #ddd6f3 0%, #faaca8 100%)',
    'linear-gradient(-180deg, #7b4397 0%, #dc2430 100%)',
    'linear-gradient(-180deg, #43cea2 0%, #185a9d 100%)',
    'linear-gradient(-180deg, #ff512f 0%, #dd2476 100%)',
    'linear-gradient(-180deg, #4568dc 0%, #b06ab3 100%)',
    'linear-gradient(-180deg, #ec6f66 0%, #f3a183 100%)',
    'linear-gradient(-180deg, #ffd89b 0%, #19547b 100%)',
    'linear-gradient(-180deg, #4ca1af 0%, #c4e0e5 100%)',
    'linear-gradient(-180deg, #ff5f6d 0%, #ffc371 100%)',
    'linear-gradient(-180deg, #36d1dc 0%, #5b86e5 100%)',
    'linear-gradient(-180deg, #c33764 0%, #1d2671 100%)',
    'linear-gradient(-180deg, #141e30 0%, #243b55 100%)',
    'linear-gradient(-180deg, #ff7e5f 0%, #feb47b 100%)',
    'linear-gradient(-180deg, #ed4264 0%, #ffedbc 100%)',
    'linear-gradient(-180deg, #2b5876 0%, #4e4376 100%)',
    'linear-gradient(-180deg, #aa076b 0%, #61045f 100%)',
];

export function createRandomNumbers(numberOfCards) {
    numbersList.length = 0;

    for (let i = 0; i < numberOfCards; i++) {
        let newNumber = Math.floor(Math.random() * numberOfCards);

        while (numbersList.includes(newNumber)) {
            newNumber = Math.floor(Math.random() * numberOfCards);
        }

        numbersList.push(newNumber);
    }

    assembleCardsList(numberOfCards)
}

function assembleCardsList(numberOfCards) {
    cardsList.length = 0;

    for (let i = 0; i < numberOfCards; i++) {
        cardsList.push({
            value: numbersList[i],
            background: backgroundColorList[i],
            isOpened: false
        });
    }

    createSimilarCards();
    shuffle(cardsList);
}

function createSimilarCards() {
    const cardsListOriginalLength = cardsList.length;

    for (let i = 0; i < cardsListOriginalLength; i++) {
        cardsList.push({...cardsList[i]});
    }
}

function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

createRandomNumbers();
assembleCardsList();