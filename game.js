/*******************************************************/
// P5.play: t22_keyboard
// Move sprite based on keyboard input
// Written by ???
/*******************************************************/
const PLAYER_HEIGHT = 25;
const PLAYER_WIDTH = 25;

const PROJECTILESHOOTER_HEIGHT = 30;
const PROJECTILESHOOTER_WIDTH = 30;

const PROJECTILE_WIDTH = 17.5;
const PROJECTILE_HEIGHT = 17.5;
/*******************************************************/
// setup()
/*******************************************************/
function setup() {
  console.log("setup: ");

cnv = new Canvas(windowWidth, windowHeight);
player = new Sprite(windowWidth/2, windowHeight/2, PLAYER_WIDTH, PLAYER_HEIGHT, 'k');
player.color = 'cyan';

enemy = new Sprite(windowWidth/4, windowHeight/4, PLAYER_WIDTH, PLAYER_HEIGHT, 'd');
enemy.color = 'red';


  wallLH  = new Sprite(0, height/2, 8, windowHeight, 'k');
  wallLH.color = 'black';
wallRH  = new Sprite(windowWidth, height*2, 8, windowHeight, 'k');
wallTop  = new Sprite(0, 0, windowWidth*2, 8, 'k');
wallBot  = new Sprite(0, windowHeight, windowWidth*2, 8, 'k');

document.addEventListener("keydown", function(event) {
 if (event.code === 'KeyA') {
player.vel.x = -6;
 }
else if (event.code === 'KeyD')
player.vel.x = 6;
});

document.addEventListener("keyup", function(event) {
if (event.code === 'KeyA') {
   player.vel.x = 0;
 }

else if (event.code === 'KeyD')
player.vel.x = 0;
});

document.addEventListener("keydown", function(event) {
 if (event.code === 'KeyW') {
player.vel.y = -6;
 }
else if (event.code === 'KeyS')
player.vel.y = 6;
});

document.addEventListener("keyup", function(event) {
if (event.code === 'KeyW') {
   player.vel.y = 0;
 }

else if (event.code === 'KeyS')
player.vel.y = 0;
});



}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
background('white'); 
enemy.moveTo(player.x, player.y, 1);
console.log("rectangle " + player.x)
if (mouse.presses()) {
projectile = new Sprite(player.x, player.y, PROJECTILE_WIDTH, PROJECTILE_HEIGHT, 'k');
projectile.moveTo(mouseX, mouseY, 5);


}
function ballHitAlien(enemy, projectile) {

// Delete the alien which was hit
enemy.remove();

}
}


/*******************************************************/
//  END OF APP
/*******************************************************/
