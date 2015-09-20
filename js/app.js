var ROWS = 5,
    COLUMNS = 5,
    FIRST_ROW_OFFSET_TOP = 68,
    TILE_WIDTH = 101,
    TILE_HEIGHT = 83,
    CANVAS_WIDTH = TILE_WIDTH * COLUMNS;

// Enemies our player must avoid
var Enemy = function(speed, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 0 - TILE_WIDTH;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // Update position
    this.x += this.speed * dt;
    
    // Goto starting position
    if (this.x > CANVAS_WIDTH){
        this.x = 0 - TILE_WIDTH;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.reset();
    this.sprite = 'images/char-boy.png';
};

Player.prototype.reset = function (x, y){

    this.x = TILE_WIDTH * 2;
    this.y = FIRST_ROW_OFFSET_TOP + (TILE_HEIGHT * 4);

};

Player.prototype.update = function (x, y){

    // Disallow player to go offscreen
    if (x >= 0 && x <= TILE_WIDTH * 4 && y >= FIRST_ROW_OFFSET_TOP && y <= FIRST_ROW_OFFSET_TOP + (TILE_HEIGHT * 4)) {
        this.x = x;
        this.y = y;
    }
};

Player.prototype.render = function (){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyCode) {
    switch (keyCode) {
        case 'up':
            this.update(this.x, this.y - TILE_HEIGHT);
            break;
        case 'down':
            this.update(this.x, this.y + TILE_HEIGHT);
            break;
        case 'left':
            this.update(this.x - TILE_WIDTH, this.y);
            break;
        case 'right':
            this.update(this.x + TILE_WIDTH, this.y);
            break;

    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
for (var row = 1; row < ROWS; row++) {
    var enemy = new Enemy( (Math.random() * 200) + 100, FIRST_ROW_OFFSET_TOP + (TILE_HEIGHT * (row - 1) ));
    allEnemies.push(enemy);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (allowedKeys[e.keyCode]) {
        player.handleInput(allowedKeys[e.keyCode]);
    }

});
