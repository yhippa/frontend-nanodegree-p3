// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // diagnostic code below to outline hitboxes
    // ctx.rect(this.getLeftX(),this.getUpperY(),this.getRightX()-this.getLeftX(),this.getLowerY()-this.getUpperY());
    // ctx.stroke(); 
};

// getLeftX() and getRightX() get the leftmost or rightmost hitbox on the X axis
// getUpperY() and getLowerY() get the topmost or bottommost hitbox on the Y axis
Enemy.prototype.getLeftX = function() {
    return this.x + 1;
};

Enemy.prototype.getRightX = function() {
    return this.x + 1 + 99;
};

Enemy.prototype.getUpperY = function() {
    return this.y + 71;
};

Enemy.prototype.getLowerY = function() {
    return this.y + 71 + 77;
};

// Creates a new random speed between 20 and 150 and creates a random row for the enemy
var rowStartingPixels = [63, 146, 228];
Enemy.prototype.reset = function() { 
    this.speed = (Math.random() * 150) + 20;
    this.x = -101;
    this.y =  rowStartingPixels[Math.floor((Math.random() * 2) + 0)];
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    this.x = this.x;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // originial sprites are 101x171
};

Player.prototype.getLeftX = function() {
    return this.x + 1;
};

Player.prototype.getRightX = function() {
    return this.x + 1 + 99;
};

Player.prototype.getUpperY = function() {
    return this.y + 88;
};

Player.prototype.getLowerY = function() {
    return this.y + 88 + 75;
};

Player.prototype.reset = function() {
    this.x = this.xInit;
    this.y = this.yInit;
};

// Takes a string direction and updates the player position if it is within the bounds of the game
Player.prototype.handleInput = function(direction) {
    if (direction == 'left') {
        var nextX = this.x - 101;
        if (isObjectOutOfBounds(nextX, this.y)) return;
        this.x = this.x - 101;
    }
    if (direction == 'right') {
        var nextX = this.x + 101;
        if (isObjectOutOfBounds(nextX, this.y)) return;
        this.x = this.x + 101;
    }
    if (direction == 'up') {
        var nextY = this.y - 83;
        if (isObjectOutOfBounds(this.x, nextY)) return;
        this.y = this.y - 83;
    }
    if (direction == 'down') {
        var nextY = this.y + 83;
        if (isObjectOutOfBounds(this.x, nextY)) return;
        this.y = this.y + 83;
    }
};

// Helper function to determine if a given object is out of bounds
var isObjectOutOfBounds = function(xPos, yPos) {
    if (xPos < 0) return true;
    if (yPos < -50) return true;
    if (xPos > 405) return true;
    if (yPos > 400) return true;
    return false;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// enemies need to be -20 y to align with the stones
var enemy1 = new Enemy();
enemy1.reset();
var enemy2 = new Enemy();
enemy2.reset();
var enemy3 = new Enemy();
enemy3.reset();
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player();
player.xInit = 202;
player.yInit = 380;
player.reset();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});