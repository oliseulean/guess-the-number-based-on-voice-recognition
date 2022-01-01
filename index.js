import { lowNumbersMap } from "./lowerNumbers.js";
import { randomNumber } from "./generateRandNumber.js";

const scoreContainer = document.getElementById('bestScore');
const triesContainer = document.getElementById('tries');
const historyContainer = document.getElementById('history');
const numberContainer = document.getElementById('number');
const messageContainer = document.getElementById('message');

// initialise best score

let currentScore = 0;
const bestScore = localStorage.getItem("score");
scoreContainer.innerHTML = bestScore || '-';

// initialise number of tries

const numberOfTries = 10;
triesContainer.innerHTML = numberOfTries;

// initialise speech recognition

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.lang = 'ro-RO';
recognition.start();

// waiting for speech results

recognition.addEventListener('result', (e) => {
    const transcriptMessage = e.results[0][0].transcript;
    const numberValue = lowNumbersMap.get(transcriptMessage) || transcriptMessage;
    numberContainer.innerHTML = numberValue;
    checkNumber(numberValue);
})

recognition.addEventListener('end', () => recognition.start());

const checkNumber = value => {
    if (isNaN(value)) {
        messageContainer.innerHTML = `<b>${value}</b> the value you said isn't a number`;
        return;
    }

    const integerValue = parseInt(value);

    if (integerValue < 1 || integerValue > 100) {
        messageContainer.innerHTML = "The number should be in the interval 1 - 100";
        return;
    }

    currentScore += 1;

    if (historyContainer.textContent.length > 0) {
        historyContainer.innerHTML += ", ";
    }

    // add values to the history number array
    historyContainer.innerHTML += integerValue;

    if (integerValue === randomNumber) {
        document.body.innerHTML = '<h1 class="title">Congrats, you guessed the number </h1>';
        document.body.innerHTML += `<p class="subtitle">Your score is: ${currentScore}</p>`;
        document.body.innerHTML += "<button id='playButton'>Play again:</button>";

        if (bestScore === null || currentScore < bestScore) { // write on the localStorage
            localStorage.setItem("score", currentScore);
        }
    } else if (integerValue < randomNumber) {
        messageContainer.innerHTML = 'Try a higher number';
    } else {
        messageContainer.innerHTML = 'Try a lower number';
    }

    triesContainer.innerHTML = numberOfTries - currentScore;

    if (numberOfTries === currentScore) {
        document.body.innerHTML = '<h1 class="title">I\'m sorry, your tries are over, please play again</h1>';
        document.body.innerHTML += "<button id='playButton'>Play again:</button>";
    }
}

const refreshPage = () => {
    document.addEventListener('click', (e) => {
        // play again ;)
        if (e.target.id === 'playButton') {
            window.location.reload();
        }
    })
};


refreshPage();