**Step 3**
*Additions:*
Used a seperate array to store the title of the game being saved, this way they can be saved as seperate objects and that array can be looped over to retrieve every game from the localStorage. Also when saving the games I used a function created in step 2 that getsGameInfo corresponding to the class structure.
For retrieving the games from the localStorage I first created a function that retrieves a specific game from the localStorage, and then i created another function with a for loop that loops from the savedGameTitles array to find every game saved in the localStorage as a seperata object.
For outputting games as json I simply retrieved every game in the localStorage, and then used JSON.Stringify to turn the info into JSON
For importing games from JSON i simply parsed the JSON and then looped over it with a for loop
All the functions worked when tested using games from the example.json

*Edits*
Changed the getGameInfo function in the gameClass to format the data in the same structure as the json.


**Step 4**
*Additions:*
Added the function from the FileReader resource provided in the task. Had to make some changes to the input type due to it originally being intended for text files. Also had to JSON.Parse the result of the reader and then i could import it as JSON to the localStorage using the function i created in Step 3.
Also added the showMessage function from the FileReader resource as it may be useful for improving the visuals of the app later on.

*Edits*
Changed name of placeholder arrays that were previously called games to make way for the new array that was required in Step 4.
Made the retrieveAllGamesFromLocalStorage use a for loop that is based on the localStorage.length and localStorage.key commands once i learned that they were a thing from: https://medium.com/@joeylee08/localstorage-101-persisting-browser-data-on-the-client-694cea0981b3#:~:text=localStorage%20is%20a%20global%20browser,and%20close%20the%20browser%20window.
Kept the old function that retrieved games based on title in case it will be useful later for retrieving specific games.