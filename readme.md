**Step 3**
*Additions:*
Used a seperate array to store the title of the game being saved, this way they can be saved as seperate objects and that array can be looped over to retrieve every game from the localStorage. Also when saving the games I used a function created in step 2 that getsGameInfo corresponding to the class structure.
For retrieving the games from the localStorage I first created a function that retrieves a specific game from the localStorage, and then i created another function with a for loop that loops from the savedGameTitles array to find every game saved in the localStorage as a seperata object.
For outputting games as json I simply retrieved every game in the localStorage, and then used JSON.Stringify to turn the info into JSON
For importing games from JSON i simply parsed the JSON and then looped over it with a for loop
All the functions worked when tested using games from the example.json

*Edits*
Changed the getGameInfo function in the gameClass to format the data in the same structure as the json.