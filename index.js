var GAME = {};

function Player(name) {
  this.name = name;
  this.canRoll = true; 
  this.chips = 3;
}
//^this is creating a "template" object



GAME.players = [] 
//this makes an array

var gameSetupForm = document.querySelector('#game-setup');
//pretend there is an invisble robot doing things to your page. This is telling the robot that the form on your page is called gameSetupForm. You are creating a VOCAB for this robot, so when you say, gameSetupForm, it knows to go into the page and use the FORM. 
//THIS HAS NO ACTION Behind it 


  //"HEY ROBOT, pay attention to the gameSetupFrom, if I click the submit button on that form, DO THIS"
gameSetupForm.addEventListener("submit", function(event) { 
  event.preventDefault();                                            
  
  var inputs = event.target.querySelectorAll('input[type=text]'); 
  //when the submit (AN EVENT) button is pressed, the broswer creates an attribute called target
  //when the submit button is clicked (submit is an Event), Go to the "Target" attribute that was just created by clicking submit and grab(queryselectorAll) the input type input type of TEXT
  // when you have done the frist twp steps, you are call the data you have inputs. 
  //console.log(inputs) <<< do this with all lines 


  for(var i = 0; i < inputs.length; i++) {
    GAME.players.push( new Player(inputs[i].value));
    console.log(inputs[i])
  }


  //^^ this adds the players names from the form to the NEWLY CREATED GAME.players Array, this will loop 6times for all players names. 

  var hideModal = document.getElementById("gameSetupMain");
    hideModal.classList.add("hidden");
    //hides modal when play game button is clicked [DONE]

});


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

// _---------------- JS for dice roll -------------

var cube = document.querySelector('.cube');
var radioGroup = document.querySelector('.radio-group');
var currentClass = '';

function changeSide() {
  var checkedRadio = radioGroup.querySelector(':checked');
  var showClass = 'show-' + checkedRadio.value;
  if ( currentClass ) {
    cube.classList.remove( currentClass );
  }
  cube.classList.add( showClass );
  currentClass = showClass;
}
// set initial side
changeSide();

radioGroup.addEventListener( 'change', changeSide );



function updateScoreboard() {
  for(var i = 0; i < GAME.players.length; i++) {
    var ol = document.getElementById("scoreBoard");
    var li = document.createElement("li");
    ol.appendChild(li);
  }}


