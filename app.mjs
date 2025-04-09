import Game from './models/gameClass.mjs';

const importSource = document.getElementById('importSource');
const fileContentDisplay = document.getElementById("file-content");
const messageDisplay = document.getElementById("message");


let savedGameTitles = [];
let games = [];
games = retrieveAllGamesFromLocalStorage();


function saveGameToLocalStorage(gameInfo) {
    let game = new Game(
        gameInfo.title,
        gameInfo.designer,
        gameInfo.artist,
        gameInfo.publisher,
        gameInfo.year,
        gameInfo.players,
        gameInfo.time,
        gameInfo.difficulty,
        gameInfo.url,
        gameInfo.playCount,
        gameInfo.personalRating
    );
    let data = game.getGameInfo();
    localStorage.setItem(gameInfo.title, JSON.stringify(data));
    savedGameTitles.push(gameInfo.title);
}

function retrieveGameFromLocalStorageByTitle(title) {
    let data = localStorage.getItem(title);
    let game = JSON.parse(data);
    return new Game(
        game.title,
        game.designer,
        game.artist,
        game.publisher,
        game.year,
        game.players,
        game.time,
        game.difficulty,
        game.url,
        game.playCount,
        game.personalRating
    );
}

function retrieveAllGamesFromLocalStorage() {
    let retrievedGames = [];
    for (let i = 0; i < localStorage.length; i++) {
        let game = JSON.parse(localStorage.getItem(localStorage.key(i)));
        retrievedGames.push(game);
    }
    return retrievedGames;
}

function outputGamesAsJSON() {
    let retrievedGames = retrieveAllGamesFromLocalStorage();
    let json = JSON.stringify(retrievedGames, null, 2);
    return json;
}

function importGamesFromJSON(json) {
    let importedGames = JSON.parse(json);
    for (let i = 0; i < importedGames.length; i++) {
        saveGameToLocalStorage(importedGames[i]);
    }
}

let concordiaExample = new Game(
    "Concordia Duplicate For Testing",
    "Mac Gerdts",
    "Marina Fahrenbach",
    "PD-Verlag",
    2013,
    "2–5",
    "90 mins",
    "Medium",
    "https://boardgamegeek.com/boardgame/124361/concordia",
    44,
    9
);

let terraformingMarsExample = new Game(
    "Terraforming Mars Duplicate For Testing",
    "Jacob Fryxelius",
    "Isaac Fryxelius",
    "FryxGames",
    2016,
    "1–5",
    "120 mins",
    "Medium-Heavy",
    "https://boardgamegeek.com/boardgame/167791/terraforming-mars",
    136,
    8
);

importSource.addEventListener('change', handleFileSelection);

function handleFileSelection(event) {
    const file = event.target.files[0];
    fileContentDisplay.textContent = "";
    messageDisplay.textContent = "";
    const reader = new FileReader();
    reader.onload = () => {
        const json = JSON.parse(reader.result);
        importGamesFromJSON(JSON.stringify(json));
        showMessage("Games imported successfully!", "success");

        console.log(games);
        console.log(retrieveAllGamesFromLocalStorage());
        console.log(outputGamesAsJSON());

    };
    reader.onerror = () => {
        showMessage("Error reading the file. Please try again.", "error");
    };
    reader.readAsText(file);
};

function showMessage(message, type) {
    messageDisplay.textContent = message;
    messageDisplay.style.color = type === "error" ? "red" : "green";
}

let exampleJson = JSON.stringify([concordiaExample, terraformingMarsExample], null, 2);
importGamesFromJSON(exampleJson);


console.log(games);
console.log(retrieveAllGamesFromLocalStorage());
console.log(outputGamesAsJSON());

