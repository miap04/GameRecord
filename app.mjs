import Game from './models/gameClass.mjs';

const importSource = document.getElementById('importSource');
const fileContentDisplay = document.getElementById("fileContent");
const messageDisplay = document.getElementById("message");

const addGameForm = document.getElementById("addGameForm");
const addedGameTitle = document.getElementById("gameTitle");
const addedGameReleaseYear = document.getElementById("releaseYear");
const addedGameMaxPlayers = document.getElementById("playerCountMax");
const addedGameMinPlayers = document.getElementById("playerCountMin");
const addedGamePlayTime = document.getElementById("playTime");
const addedGameDifficulty = document.getElementById("difficulty");
const addedGameDesigner = document.getElementById("designer");
const addedGameArtist = document.getElementById("artist");
const addedGamePublisher = document.getElementById("publisher");
const addedGameUrl = document.getElementById("bggListing");
const addedGamePlayCount = document.getElementById("playCount");
const addedGameRating = document.getElementById("rating");
const ratingSliderValue = document.getElementById("ratingValue");
const sortBy = document.getElementById("sortBy");

if (localStorage.getItem("sortBy") === null) {
    localStorage.setItem("sortBy", "ratingHigh");
}
else {
    sortBy.value = localStorage.getItem("sortBy");
}




const gameIdentifier = "G-"

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
    localStorage.setItem(gameIdentifier + gameInfo.title, JSON.stringify(data));
}

function retrieveAllGamesFromLocalStorage() {
    let retrievedGames = [];
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).startsWith(gameIdentifier)) {
            let game = JSON.parse(localStorage.getItem(localStorage.key(i)));
            retrievedGames.push(game);
        }
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
    let deleteGameButton = document.createElement("button");
    deleteGameButton.textContent = "Delete Game";
    deleteGameButton.addEventListener("click", function () {
        localStorage.removeItem(gameIdentifier + gameInfo.title);
        for (let i = 0; i < games.length; i++) {
            if (games[i].title === gameIdentifier + gameInfo.title) {
                games.removeItem(i);
                break;
            }
        }
        gameEntries.removeChild(gameEntry);
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
    gameEntry.appendChild(document.createElement("br"));
    gameEntry.appendChild(deleteGameButton);
    gameEntries.appendChild(gameEntry);
    gameEntry.appendChild(document.createElement("br"));
    gameEntry.appendChild(document.createElement("br"));

}

function addAllGamesToHTML() {
    let difficultyOrder = ["Light", "Light-Medium", "Medium", "Medium-Heavy", "Heavy"];
    if (sortBy.value === "ratingHigh") {
        games.sort((b, a) => a.personalRating - b.personalRating);
    }
    else if (sortBy.value === "ratingLow") {
        games.sort((a, b) => a.personalRating - b.personalRating);
    }
    else if (sortBy.value === "playCountHigh") {
        games.sort((a, b) => a.playCount - b.playCount);
    }
    else if (sortBy.value === "playCountLow") {
        games.sort((b, a) => a.playCount - b.playCount);
    }
    else if (sortBy.value === "playerLow") {
        games.sort((a, b) => {
            let aPlayers = a.players.split("–");
            let bPlayers = b.players.split("–");
            if (aPlayers.length === 1) {
                aPlayers[1] = aPlayers[0];
            }
            if (bPlayers.length === 1) {
                bPlayers[1] = bPlayers[0];
            }
            return aPlayers[1] - bPlayers[1];
        });
    }
    else if (sortBy.value === "playerHigh") {
        games.sort((a, b) => {
            let aPlayers = a.players.split("–");
            let bPlayers = b.players.split("–");
            if (aPlayers.length === 1) {
                aPlayers[1] = aPlayers[0];
            }
            if (bPlayers.length === 1) {
                bPlayers[1] = bPlayers[0];
            }
            return bPlayers[1] - aPlayers[1];
        });
    }
    else if (sortBy.value === "difficultyLight") {
        games.sort((a, b) => {
            return difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty);
        });
    }
    else if (sortBy.value === "difficultyHeavy") {
        games.sort((a, b) => {
            return difficultyOrder.indexOf(b.difficulty) - difficultyOrder.indexOf(a.difficulty);
        });
    }
    gameEntries.innerHTML = "";
    for (let i = 0; i < games.length; i++) {
        addGameToHTML(games[i]);
    }
}

sortBy.addEventListener("change", function () {
    localStorage.setItem("sortBy", sortBy.value);
    location.reload();
});


addGameForm.addEventListener("submit", addGame);

function addGame(event) {
    event.preventDefault();
    let formattedPlayerCount;
    if (addedGameMaxPlayers.value === "") {
        formattedPlayerCount = addedGameMinPlayers.value;
    }
    else {
        formattedPlayerCount = addedGameMinPlayers.value + "–" + addedGameMaxPlayers.value;
    }
    let gameInfo = {
        title: addedGameTitle.value,
        designer: addedGameDesigner.value,
        artist: addedGameArtist.value,
        publisher: addedGamePublisher.value,
        year: addedGameReleaseYear.value,
        players: formattedPlayerCount,
        time: addedGamePlayTime.value + " mins",
        difficulty: addedGameDifficulty.value,
        url: addedGameUrl.value,
        playCount: addedGamePlayCount.value,
        personalRating: ratingSliderValue.textContent
    };
    saveGameToLocalStorage(gameInfo);
    addGameToHTML(gameInfo);
    addGameForm.reset();
    location.reload();
}

addedGameRating.addEventListener("input", function () {
    ratingSliderValue.textContent = addedGameRating.value;
});

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

addAllGamesToHTML();
