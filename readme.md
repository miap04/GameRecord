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

**Step 7**
*Additions:*
Added a form with a required input field for every piece of game info needed. Wasnt able to make the rating value number after the slider change within HTML, so I will have to add that on the next step as this step wasnt supposed to add code to app.mjs

**Step 8**
*Additions:*
First i got all the form elements by their id. Then I added an eventListener for the submit on the form. Then I simply created a gameInfo array with the values that could then be sent to my saveGameToLocalStorage where it will be stored as an instance of the class into the localstorage. Afterwards it was then added to the HTML and i reset the form to add more games.

*Edits*
Change the difficulty from a text input to a drop down menu for better user experience

**Step 9**
*Additions:*
Added a delete game button to each game entry by appending it as a child. Then i added an eventListener which when the button is clicked, will remove the current game entry from the localStorage and will then loop through the games array where it will remove the title. Also added a linebreak after the delete button to make the UI more spread out

*Edits*
Removed the savedGameTitles array as it was redundant and replaced by the games array. Also removed the retrieveGameFromLocalStorageByTitle function as it serves no purpose.

**Step 10**
*Additions:*
Added a select option above the game entries to choose the sorting order, defaulted to sorting by the highest rating first. To make the choice of order persist accross refreshes I made an eventlistener that saved to sortBy value to the localStorage if it is changed and reload the page to apply the sort order. I also had to add a condition in the program to get the sortBy value upon loading the page.
This broke the code for retrieving the games as it attempted to retrieve anything in the localStorage, therefore I had to add an identifier for the games and make it only retrieve objects starting with the identifier.
To allow for sorting the games I used the .sort function to rearrange the games array before looping through it and adding all the games (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort). Sorting by playcount and rating was simple as they were already numerical values. For sorting by players I decided it made the most sense to sort by maximum amount of players, and thus i split the string which turned them into numbers and sorted them as numbers. However some games might not have a varying player count so I had to add a condition that checked if there were no maximum amount of players and thus treat the minimum as the maximum as they would functionally be the same. I also changed the addGame form to only accept numbers for player count and then the program adds the '-' in between to not allow for wrong inputs.
Sorting by difficulty also proved difficult so I added an array displaying the difficulty order, then I used the indexOf command to convert the difficulties into numbers based on their position in the order (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf).
Lastly I added basic CSS from the To-Do list task to improve the visuals.

*Edits*
Removed the example games from the code as this is the final commit.