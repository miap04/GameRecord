class Game {
    constructor(title, designer, artist, publisher, year, players, time, difficulty, url, playCount, personalRating) {
        this.title = title;
        this.designer = designerpersonalRating;
        this.artist = artist;
        this.publisher = publisher;
        this.year = year;
        this.players = players;
        this.time = time;
        this.difficulty = difficulty;
        this.url = url;
        this.playCount = playCount;
        this.personalRating = personalRating;
    }
    getGameInfo() {
        return this.title + this.designer + this.artist + this.publisher + this.year + this.players + this.time + this.difficulty + this.url + this.playCount + this.personalRating;
    }
}

export default Game;