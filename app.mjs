import Game from './models/gameClass.mjs';

const importSource = document.getElementById('importSource');
const fileContentDisplay = document.getElementById("fileContent");
const messageDisplay = document.getElementById("message");

const addGameForm = document.getElementById("addGameForm");
const addedGameTitle = document.getElementById("gameTitle");
const addedGameReleaseYear = document.getElementById("releaseYear");
const addedGamePlayerCount = document.getElementById("playerCount");
const addedGamePlayTime = document.getElementById("playTime");
const addedGameDifficulty = document.getElementById("difficulty");
const addedGameDesigner = document.getElementById("designer");
const addedGameArtist = document.getElementById("artist");
const addedGamePublisher = document.getElementById("publisher");
const addedGameUrl = document.getElementById("bggListing");
const addedGamePlayCount = document.getElementById("playCount");
const addedGameRating = document.getElementById("rating");
const ratingSliderValue = document.getElementById("ratingValue");




let savedGameTitles = [];
let games = [];
games = retrieveAllGamesFromLocalStorage();
let gameEntries = document.getElementById("gameEntries");


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
    gamePlayCountText.textContent = `Playcount: ${gameInfo.playCount} `;
    gamePlayCountButton.addEventListener("click", function () {
        gameInfo.playCount++;
        gamePlayCountText.textContent = `Playcount: ${gameInfo.playCount} `;
        gamePlayCountText.appendChild(gamePlayCountButton);
        gamePlayCountButton.textContent = "+";
        saveGameToLocalStorage(gameInfo);
    });
    let gamePersonalRatingText = document.createElement("div");
    gamePersonalRatingText.textContent = `Rating: `;
    let gamePersonalRatingScore = document.createElement("span");
    gamePersonalRatingScore.textContent = gameInfo.personalRating;
    let gamePersonalRatingSlider = document.createElement("input");
    gamePersonalRatingSlider.type = "range";
    gamePersonalRatingSlider.min = 1;
    gamePersonalRatingSlider.max = 10;
    gamePersonalRatingSlider.step = 1;
    gamePersonalRatingSlider.value = gameInfo.personalRating;
    gamePersonalRatingSlider.addEventListener("input", function () {
        gameInfo.personalRating = gamePersonalRatingSlider.value;
        gamePersonalRatingScore.textContent = gameInfo.personalRating;
        saveGameToLocalStorage(gameInfo);
    });
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


addGameForm.addEventListener("submit", addGame);

function addGame(event) {
    event.preventDefault();
    let gameInfo = {
        title: addedGameTitle.value,
        designer: addedGameDesigner.value,
        artist: addedGameArtist.value,
        publisher: addedGamePublisher.value,
        year: addedGameReleaseYear.value,
        players: addedGamePlayerCount.value,
        time: addedGamePlayTime.value + " mins",
        difficulty: addedGameDifficulty.value,
        url: addedGameUrl.value,
        playCount: addedGamePlayCount.value,
        personalRating: ratingSliderValue.textContent
    };
    saveGameToLocalStorage(gameInfo);
    addGameToHTML(gameInfo);
    addGameForm.reset();
    ratingSliderValue.textContent = addedGameRating.value;
}

addedGameRating.addEventListener("input", function () {
    ratingSliderValue.textContent = addedGameRating.value;
});

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
