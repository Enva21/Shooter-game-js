# Shooter-game-js

## This JavaScript code implements a simple shooting game called "Galactic Defender." Below is an analysis of the code:

## The code comprises HTML and JavaScript components:

### HTML Structure:
The game's main structure is defined in the HTML file. It consists of various sections, including buttons for difficulty levels, score display, and a display area for the game boxes. <br>

### JavaScript Variables:
Several variables are declared using const to store references to different elements in the HTML, such as score display, buttons, and select boxes. <br>

### Game Configuration:
gameConfig is an object that holds important game-related variables like score, count, time, missed count, and maximum allowed misses. <br>

### Select Box Generation:
A loop generates options for a <select> element with IDs ranging from 1 to 100. The default selected option is 10. <br>

### Event Listeners:
Buttons for different difficulty levels (easy, medium, hard, extreme) have event listeners attached to them. When clicked, these buttons initialize the game with the respective difficulty level. <br>

### Click Event on Display Boxes:
When a click event occurs on the display area, the function checks if the game is still active (not lost or won). If so, it increments the missed count and updates the display accordingly. <br>

### Game Initialization:
The initGame function is called when a difficulty button is clicked. It sets up the game based on the chosen difficulty level. <br>

### Box Generation:
This function populates the display area with random boxes. The number and maximum misses are determined by the selected difficulty level. <br>

### Box Removal:
When a box is clicked, the removeBox function is called. It increments the score, removes the box from the display, and checks if the game is won. <br>

### Win/Loss Conditions:
If the score matches the number of boxes, the player wins, and a success message is displayed. If the maximum allowed misses are reached, the player loses, and an information message is displayed. <br>

### Time Handling:
The game keeps track of time using intervals, which increment the time count every second. <br>

### Sound Initialization:
Depending on the option ("shoot" or "win"), the audio source and volume are set for the game sounds. <br>

### Style Initialization:
The cursor style is set for the display area and individual boxes, depending on the game state. <br>

### Swal (SweetAlert2):
The game uses SweetAlert2 for displaying success and information messages. <br>

Overall, this code provides the logic and functionality for a basic shooting game where the player's objective is to clear a certain number of boxes within a specified time limit while avoiding a maximum number of misses. The game difficulty can be adjusted by selecting different levels.
