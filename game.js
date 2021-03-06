// Global player object (later this will no longer be global)
var player = {
	items: [],
	pickup: function(item){
		this.items.push(item);
	},
	drop: function(item){
		var pos = this.items.indexOf(item);
		if (pos >= 0) {
			this.items.splice(pos, 1);
		}
	}
}

// example of recognizing the need for a helper function and then writing it!
// we could set innerHTML to empty string - but this is better!
function clearContent(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
    }
}

// loop over each player method and add it to the Web page
function displayActions() {
    var field, action, actionList;

    actionList = document.querySelector("#help > ul");
    clearContent(actionList);

    for (field in player) {
        if (player[field] instanceof Function) {
            action = document.createElement("li");
            action.textContent = field;
            actionList.appendChild(action);
        }
    }
}

// loop over each inventory item and add it to the Web page
function displayInventory() {
    var i, item, inventory;

    inventory = document.querySelector("#inventory > ul");
    clearContent(inventory);

    for (i in player.items) {
        item = document.createElement("li");
        item.textContent = player.items[i];
        inventory.appendChild(item);
    }
}

function displayScene() {
    // Hmmm... need to implement this function...
}

// parse and normalize the user input string
function interpret (input) {
    console.log("calling interpret"); // remove when finished debugging

    var cmd = {}, tokens = input.trim().toLowerCase().split(" ");
    cmd.action = tokens.shift();
    cmd.target = tokens.join(" ");
	return cmd;
}

// perform the desired player action
function execute (command) {
	console.log("calling execute"); // remove when finished debugging

	player[command.action](command.target);
}

// display any results/changes on the page
function report (result) { // note: parameter not currently used
	console.log('calling report'); // remove when finished debugging
	
	displayActions();
	displayInventory();
	displayScene();
}

// run one pass of the game loop
function gameStep (input) {
	var cmd = interpret(input); // parse the user input
	var result = execute(cmd); // run the desired command
	report(result); // display the results on the screen
}

var gameStart = function() {
	var inputBox = document.querySelector("input");
	inputBox.addEventListener("keyup", function(event){
		if (event.keyCode === 13) {
			gameStep(this.value);
		}
	});
}

window.onload = gameStart; // game starts only after the page is loaded

