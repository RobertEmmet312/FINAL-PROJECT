var GAME = {};

function Player(name) {
  this.name = name;
  this.canRoll = true; 
  this.chips = 3;
}
GAME.players = [] 

//^this is creating a "template" object

// potValueCurrent: $$
//chipValue: 1
//potential: $18 

function Pot(money, numberPlayers) {
  this.chipValue = money;
  this.potValueCurrent = 0;
  this.potentialValue = (numberPlayers * money)*3; 
}

GAME.potValue = []

var gameSetupForm = document.querySelector('#game-setup');
//pretend there is an invisble robot doing things to your page. This is telling the robot that the form on your page is called gameSetupForm. You are creating a VOCAB for this robot, so when you say, gameSetupForm, it knows to go into the page and use the FORM. 
//THIS HAS NO ACTION Behind it 
 

gameSetupForm.addEventListener("submit", function(event) { 
  event.preventDefault();                                            
  var inputs = event.target.querySelectorAll('input[type=text]'); 
  for(var i = 0; i < inputs.length; i++) {
    GAME.players.push( new Player(inputs[i].value));
    console.log(inputs[i])
  }
  

  var hideModal = document.getElementById("gameSetupMain");
    hideModal.classList.add("hidden");

  updateScoreboard();
  nextTurn();
  addTo();
  updatePotValue();
});



// ADD value of the chips to an array

function addTo() {
  GAME.potValue.push(new Pot(document.getElementById("chipValueInput").value, GAME.players.length));
}


//_________________________________________

function updatePlayer(whichPlayer, thePlayerIWant) {
    var currentRoller = document.querySelector("." + whichPlayer);
    var currentRollerName = currentRoller.querySelector('h1')
    currentRollerName.innerText = thePlayerIWant.name; 
}



    
GAME.currentRoller = -1;


function nextTurn(){
  if(GAME.currentRoller >= GAME.players.length - 1) {
    GAME.currentRoller = 0;
  } else {
    GAME.currentRoller++;
  }
  if(GAME.currentRoller === 0){

    updatePlayer('playerLeft', GAME.players[GAME.currentRoller + 1])
    updatePlayer('playerRight', GAME.players[GAME.players.length - 1])
    updatePlayer('playerCurrent', GAME.players[GAME.currentRoller])

  } else if(GAME.currentRoller === GAME.players.length - 1)
 {
    updatePlayer('playerLeft', GAME.players[0])
    updatePlayer('playerRight', GAME.players[GAME.currentRoller - 1])
    updatePlayer('playerCurrent', GAME.players[GAME.currentRoller])
 } else {
  updatePlayer('playerLeft', GAME.players[GAME.currentRoller + 1])
  updatePlayer('playerRight', GAME.players[GAME.currentRoller - 1])
  updatePlayer('playerCurrent', GAME.players[GAME.currentRoller])
 }

}

//------------update pot value --------------
//I DID THIS ALL BY MY SELF!!
function updatePotValue(){
  var currentPot = document.getElementById('potValueJS');
  var newChipValue= document.getElementById('chipValueJS');
  currentPot.innerText=GAME.potValue[0].potValueCurrent;
  newChipValue.innerText=GAME.potValue[0].chipValue;
}

// ---------------------- update scoreboard ---------------------

function updateScoreboard() {
  var ol = document.getElementById("scoreBoard");
  ol.innerHTML = '';

  for(var i = 0; i < GAME.players.length; i++) {
    var li = document.createElement("li");
    var span = document.createElement("span")
    li.innerText = GAME.players[i].name;
    span.innerText= GAME.players[i].chips;
    li.appendChild(span);
    ol.appendChild(li);
    
  }
}

// -  --- - -- - - -  - - -- -  -- - - - - - - - - 
var dice = ["L", "C", "R", "*", "*", "*"]

function rollDice(){
    var randomIndex = Math.floor(Math.random()*dice.length);
  return dice[randomIndex] 
}

function rollallTheDice(){
    var firstDiceVal= rollDice();
    var secondDiceVal = rollDice();
    var thirdDiceVal = rollDice();

    var firstDice = document.querySelectorAll('.cube')[0]
    var secondDice = document.querySelectorAll('.cube')[1]
    var thirdDice = document.querySelectorAll('.cube')[2]

    if(firstDiceVal === 'L'){
        firstDice.className = 'cube show-left';
    } else if(firstDiceVal === 'R'){
      firstDice.className = 'cube show-right';
    } else if(firstDiceVal === 'C'){
      firstDice.className = 'cube show-top';
    } else if(firstDiceVal === '*'){
      var asterisks = ['show-bottom', 'show-front', 'show-back'];
      var random = Math.floor(Math.random()*asterisks.length)
      firstDice.className = 'cube ' + asterisks[random];
    }

    if(secondDiceVal === 'L'){
      secondDice.className = 'cube show-left';
  } else if(secondDiceVal === 'R'){
    secondDice.className = 'cube show-right';
  } else if(secondDiceVal === 'C'){
    secondDice.className = 'cube show-top';
  } else if(secondDiceVal === '*'){
    var asterisks = ['show-bottom', 'show-front', 'show-back'];
    var random = Math.floor(Math.random()*asterisks.length)
    secondDice.className = 'cube ' + asterisks[random];
  }
  if(thirdDiceVal === 'L'){
    thirdDice.className = 'cube show-left';
} else if(thirdDiceVal === 'R'){
  thirdDice.className = 'cube show-right';
} else if(thirdDiceVal === 'C'){
  thirdDice.className = 'cube show-top';
} else if(thirdDiceVal === '*'){
  var asterisks = ['show-bottom', 'show-front', 'show-back'];
  var random = Math.floor(Math.random()*asterisks.length)
  thirdDice.className = 'cube ' + asterisks[random];
}

var currentPlayer = GAME.players[GAME.currentRoller];
var playerToTheLeft;
var playerToTheRight;

if(GAME.currentRoller === 0){
  playerToTheLeft = GAME.players[GAME.currentRoller + 1]
  playerToTheRight = GAME.players[GAME.players.length - 1]

} else if(GAME.currentRoller === GAME.players.length - 1)
{
  playerToTheLeft = GAME.players[0]
  playerToTheRight = GAME.players[GAME.currentRoller - 1]
} else {
  playerToTheLeft = GAME.players[GAME.currentRoller + 1]
  playerToTheRight = GAME.players[GAME.currentRoller - 1]
}

if(firstDiceVal === 'L') {
  playerToTheLeft.chips++
  currentPlayer.chips--
} else if(firstDiceVal === 'R') {
  playerToTheRight.chips++
  currentPlayer.chips--
} else if(firstDiceVal === 'C') {
  currentPlayer.chips--
} 

if(secondDiceVal === 'L') {
  playerToTheLeft.chips++
  currentPlayer.chips--
} else if(secondDiceVal === 'R') {
  playerToTheRight.chips++
  currentPlayer.chips--
} else if(secondDiceVal === 'C') {
  currentPlayer.chips--
} 
if(thirdDiceVal === 'L') {
  playerToTheLeft.chips++
  currentPlayer.chips--
} else if(thirdDiceVal === 'R') {
  playerToTheRight.chips++
  currentPlayer.chips--
} else if(thirdDiceVal === 'C') {
  currentPlayer.chips--
} }

