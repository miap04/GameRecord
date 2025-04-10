import Game from './models/gameClass.mjs';

const importSource = document.getElementById('importSource');
const fileContentDisplay = document.getElementById("fileContent");
const messageDisplay = document.getElementById("message");
let gameEntries = document.getElementById("gameEntries");


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

function addGameToHTML(gameInfo) {
    let gameEntry = document.createElement("div");
    let gameEntryTitle = document.createElement("h2");
    gameEntryTitle.textContent = gameInfo.title;
    let gameYearPlayersTimeDifficulty = document.createElement("div");
    gameYearPlayersTimeDifficulty.textContent = `Year: ${gameInfo.year}  Players:${gameInfo.players}   Time:${gameInfo.time}   Difficulty: ${gameInfo.difficulty}`;
    let gameDesigner = document.createElement("div");
    gameDesigner.textContent = `Designer: ${gameInfo.designer}`;
    gameDesigner.classList.add("indent");
    let gameArtist = document.createElement("div");
    gameArtist.textContent = `Artist: ${gameInfo.artist}`;
    gameArtist.classList.add("indent");
    let gamePublisher = document.createElement("div");
    gamePublisher.textContent = `Publisher: ${gameInfo.publisher}`;
    gamePublisher.classList.add("indent");
    let gameListingText = document.createElement("div");
    gameListingText.textContent = `BGG Listing: `;
    gameListingText.classList.add("indent");
    let gameListingUrl = document.createElement("a");
    gameListingUrl.href = gameInfo.url;
    gameListingUrl.textContent = gameInfo.url;
    let gamePlayCountText = document.createElement("div");
    let gamePlayCountButton = document.createElement("button");
    gamePlayCountButton.textContent = "+";
    gamePlayCountText.textContent = `Playcount: ${gameInfo.playCount}`;
    let gamePersonalRatingText = document.createElement("div");
    gamePersonalRatingText.textContent = `Rating: `;
    let gamePersonalRatingScore = document.createElement("span");
    gamePersonalRatingScore.textContent = gameInfo.personalRating;
    let gamePersonalRatingSlider = document.createElement("input");
    gamePersonalRatingSlider.type = "range";
    gamePersonalRatingSlider.min = 1;
    gamePersonalRatingSlider.max = 10;
    gamePersonalRatingSlider.value = gameInfo.personalRating;
    gameEntry.appendChild(gameEntryTitle);
    gameEntry.appendChild(gameYearPlayersTimeDifficulty);
    gameEntry.appendChild(document.createElement("br"));
    gameEntry.appendChild(gameDesigner);
    gameEntry.appendChild(gameArtist);
    gameEntry.appendChild(gamePublisher);
    gameListingText.appendChild(gameListingUrl);
    gameEntry.appendChild(gameListingText);
    gameEntry.appendChild(document.createElement("br"));
    gamePlayCountText.appendChild(gamePlayCountButton);
    gameEntry.appendChild(gamePlayCountText);
    gamePersonalRatingText.appendChild(gamePersonalRatingSlider);
    gamePersonalRatingText.appendChild(gamePersonalRatingScore);
    gameEntry.appendChild(gamePersonalRatingText);
    gameEntries.appendChild(gameEntry);
}

function addAllGamesToHTML() {
    for (let i = 0; i < games.length; i++) {
        addGameToHTML(games[i]);
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

addAllGamesToHTML();