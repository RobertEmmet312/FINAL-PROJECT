/* You could use this snippet as is to build your GAME object with new players using your start game form where a user can type in a player name and click a button that says "Create player", and we could build up our game object that way with new players. */

var GAME = GAME || {};

GAME.scoreboard = [];
GAME.updateScoreboard = function(){
  if(!this.scoreboard.length) {
    for (let i = 0; i < this.players.length; i++) {
      this.scoreboard.push(this.players[i])
    }
    return;
  }

  // this needs to be refactored
}

GAME.showScoreboard = function(){
  console.log(GAME.scoreboard);
}

GAME.players = [
  {
    name: "Player 1",
    canRoll: true,
    chips: 3,
    score: 0
  },
  {
    name: "Player 2",
    canRoll: true,
    chips: 3,
    score: 0
  },
  {
    name: "Player 3",
    canRoll: true,
    chips: 3,
    score: 0
  }
]


GAME.determineLeftRight = function() {
  for (let i = 0; i < this.players.length; i++) {
    const player = this.players[i];
    const r = i === this.players.length - 1 ? 0 : i + 1;
    const l = i === 0 ? this.players.length - 1 : i - 1;
    player.left = this.players[l];
    player.right = this.players[r]
  }
}

GAME.Player = function(name){
  this.name = name;
  this.canRoll = true;
  this.chips = 3;
  this.score = 0;
}

GAME.addPlayer = function(name) {
  this.players.push(new this.Player(name));
  this.determineLeftRight();
}