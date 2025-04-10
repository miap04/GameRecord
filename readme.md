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

**Step 5**
*Additions:*
Added a function to add a single game to the HTML. I did this by creating a gameEntry element, and then appending all the other elements to that element using appendChild. I had to create a CSS class to indent the text correctly as in the example provided. Then I created a function that adds all the games to the HTML by looping over the games array.

*Edits*
Removed console.log's that are no longer being used to test functions to clean up the code.

**Step 6**
*Additions:*
Used addEventListener to add 1 to the playcount every time it was clicked, then set the new playcount as the gameInfo value, and then saving the game again, overwriting the old games saved data. I did the same with the slider, making it so that every time the value is changed it sets the new value as the value for the current gameInfo, and then saves the game again.