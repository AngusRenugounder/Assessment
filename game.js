/*******************************************************/
// P5.play: Assessment
// Move sprite based on keyboard input
// Written by Angus Renugounder
/*******************************************************/
const PLAYER_HEIGHT = 25;
const PLAYER_WIDTH = 25;

const ENEMY_HEIGHT = 25;
const ENEMY_WIDTH = 25;

const PROJECTILE_WIDTH = 17.5;
const PROJECTILE_HEIGHT = 17.5;

var enemyProjectileOneCooldown = 0;
var enemyProjectileTwoCooldown = 0;
var projectileDespawn = 0;
var enemyProjectileDespawn = 0;
var enemyProjectileDespawnTwo = 0;
var playerProjectileTimer = 0;

var normalEnemies = [];

var fastEnemies = [];
var wave = 1;
var screenSelector = "game";
var player;
var normalEnemyWaveSpawn = "true";
var fastEnemyWaveSpawn = "true";
var fastEnemyCount = 2;

var normalEnemyCount = 3;
var lastEnemy = 3;

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    console.log("setup: ");

    World.frameRate = 60;

    cnv = new Canvas(windowWidth, windowHeight);
    player = new Sprite(windowWidth/2, windowHeight/2, PLAYER_WIDTH, PLAYER_HEIGHT, 'k');
    player.color = 'cyan';
 
    projectile = new Sprite(player.x, player.y, PROJECTILE_WIDTH, PROJECTILE_HEIGHT, 'd');
    projectile.remove();
    projectileGroup = new Group();

    wallLH  = new Sprite(0, height/2, 8, windowHeight, 'k');
    wallLH.color = 'black';
    wallRH  = new Sprite(windowWidth, height*2, 8, windowHeight, 'k');
    wallTop  = new Sprite(0, 0, windowWidth*2, 8, 'k');
    wallBot  = new Sprite(0, windowHeight, windowWidth*2, 8, 'k');

    
    
    
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    playerProjectileTimer = playerProjectileTimer + 0.01;
    projectileDespawn = projectileDespawn + 0.01;
    waveOne();
    if (lastEnemy == 0){
        wave = wave + 1;
     }
    if (lastEnemy == 0 & wave == 2){
        waveTwo();
    }
       if (lastEnemy == 0 & wave == 3){
        waveThree();
     }
    if (lastEnemy == 0 & wave == 4){
        waveFour();
     }
console.log(normalEnemies)
     if (screenSelector == "end"){
     endScreen();   
    }
    console.log(normalEnemyCount);
    console.log(wave);

    }
   

    
function enemyHitPlayer(normalEnemies, player) {
    player.remove();
    screenSelector = "end"
}
    
function projectileHitNormalEnemy(normalEnemies, projectile) {
    normalEnemies.remove();
    lastEnemy = lastEnemy - 1;
}

function projectileHitFastEnemy(fastEnemies, projectile) {
    fastEnemies.remove();
    lastEnemy = lastEnemy - 1;

}

function playerMechanics(){
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

function playerProjectileMechanics() {
    if (mouse.presses() & playerProjectileTimer > 1) {
            projectile = new Sprite(player.x, player.y, PROJECTILE_WIDTH, PROJECTILE_HEIGHT, 'k');
            projectile.color = 'cyan';
            projectile.moveTo(mouseX, mouseY, 3);
            projectileGroup.add(projectile);
            projectileDespawn = projectileDespawn - projectileDespawn;
            playerProjectileTimer = playerProjectileTimer - playerProjectileTimer;
    }
    if (projectileDespawn > 1) {
        projectileGroup.removeAll();
        
   }
}

function fastEnemySpawn(){
    for (i = 0; i < fastEnemyCount; i++) {
        var randomNumberThree= Math.random() * windowWidth/3;
        var randomNumberFour= Math.random() * windowHeight;

        fastEnemies[i] = new Sprite(randomNumberThree, randomNumberFour, ENEMY_HEIGHT, ENEMY_WIDTH, 'd');
        fastEnemies[i].color = 'orange';
        fastEnemyWaveSpawn = "false";
    }   
}

function fastEnemyMechanics(){
    for (i = 0; i < fastEnemyCount; i++) {
        fastEnemies[i].moveTo(player.x, player.y, 4)
        fastEnemies[i].collide(projectile, projectileHitFastEnemy)
    } 
}


function normalEnemySpawn(){
    for (i = 0; i < normalEnemyCount; i++) {
        var randomNumber= Math.random() * windowWidth/3;
        var randomNumberTwo= (Math.random() * windowHeight) ;

        normalEnemies[i] = new Sprite(randomNumber, randomNumberTwo, ENEMY_HEIGHT, ENEMY_WIDTH, 'd');
        normalEnemies[i].color = 'red';
        normalEnemyWaveSpawn = "false";
    } 
}
    
function normalEnemyMechanics(){
    for (i = 0; i < normalEnemyCount; i++) {
        normalEnemies[i].moveTo(player.x, player.y, 2)
        normalEnemies[i].collide(projectile, projectileHitNormalEnemy)
    } 
}


function waveOne(){
    background('black');
    playerMechanics();
    playerProjectileMechanics();
    if (normalEnemyWaveSpawn == "true") {
        normalEnemySpawn();
    }
    normalEnemyMechanics();
    fill(255);
    textSize(32);
    text("wave:" + wave, windowWidth/2, 32);

}


function waveTwo(){
    background('black');
    lastEnemy = 5;
    normalEnemyWaveSpawn = "true";
    playerMechanics();
    playerProjectileMechanics();
        if (normalEnemyWaveSpawn == "true") {
        normalEnemyCount = 5;
        normalEnemySpawn();
        }
      
    normalEnemyMechanics();
    
}

function waveThree(){
    background('black');    
    lastEnemy = 7;
    normalEnemyWaveSpawn = "true";
    playerMechanics();
    playerProjectileMechanics();
        if (normalEnemyWaveSpawn == "true") {
        normalEnemyCount = 7;
        normalEnemySpawn();
        }
        normalEnemyMechanics();

}

function waveFour(){
    background('black');    
    lastEnemy = 8;
    normalEnemyWaveSpawn = "true";
    playerMechanics();
    playerProjectileMechanics();
    if (normalEnemyWaveSpawn == "true") {
        normalEnemyCount = 7;
        normalEnemySpawn();
    }
    normalEnemyMechanics();
        
    if (fastEnemyWaveSpawn == "true") {
        fastEnemySpawn();
    }
    fastEnemyMechanics();
}

function endScreen(){
    allSprites.visible = false;
}

/*******************************************************/
//  END OF APP
/*******************************************************/
