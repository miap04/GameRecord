import Game from './models/gameClass.mjs';

localStorage.clear();

let savedGameTitles = [];

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

function retrieveGameFromLocalStorage(title) {
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
    let games = [];
    for (let i = 0; i < savedGameTitles.length; i++) {
        let game = retrieveGameFromLocalStorage(savedGameTitles[i]);
        games.push(game);
    }
    return games;
}

function outputGamesAsJSON() {
    let games = retrieveAllGamesFromLocalStorage();
    let json = JSON.stringify(games, null, 2);
    return json;
}

function importGamesFromJSON(json) {
    let games = JSON.parse(json);
    for (let i = 0; i < games.length; i++) {
        saveGameToLocalStorage(games[i]);
    }
}

let concordiaExample = new Game(
    "Concordia",
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
    "Terraforming Mars",
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

let exampleJson = JSON.stringify([concordiaExample, terraformingMarsExample], null, 2);
importGamesFromJSON(exampleJson);


console.log(savedGameTitles);
console.log(retrieveAllGamesFromLocalStorage());
console.log(outputGamesAsJSON());