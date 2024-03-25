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

var normalEnemies = [];
var fastEnemies = [];
var wave = 1;
var screenSelector = "game";
var player;
var normalEnemyWaveSpawn = "true";
var fastEnemyWaveSpawn = "true";
var normalEnemyWaveSpawnCounter = [];

var enemyProjectileOneCooldown = 0;
var enemyProjectileDespawn = 0;

normalEnemyWaveSpawnCounter[1] = 0;
normalEnemyWaveSpawnCounter[2] = 0;
normalEnemyWaveSpawnCounter[3] = 0;
normalEnemyWaveSpawnCounter[4] = 0;
normalEnemyWaveSpawnCounter[5] = 0;

var playerSpawn = 0;

var normalFastWaveSpawnCounter = []
fastEnemyWaveSpawnCounter = [];

fastEnemyWaveSpawnCounter[1] = 0;
fastEnemyWaveSpawnCounter[2] = 0;

var projectileEnemySpawn = 0;

var fastEnemyCount = 1;
var lastEnemy = [];
var normalEnemyCount = 3;
lastEnemy[1] = 3;
lastEnemy[2] = 8;
lastEnemy[3] = 15;
lastEnemy[4] = 23;
lastEnemy[5] = 34;


/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    console.log("setup: ");

    cnv = new Canvas(windowWidth, windowHeight);
    player = new Sprite(windowWidth/2, windowHeight/2, PLAYER_WIDTH, PLAYER_HEIGHT, 'k');
    player.color = 'cyan';
 
    projectile = new Sprite(player.x, player.y, PROJECTILE_WIDTH, PROJECTILE_HEIGHT, 'd');
    projectile.remove();
    projectileGroup = new Group();

    enemyProjectileGroupOne = new Group();


    wallLH  = new Sprite(0, height/2, 8, windowHeight, 'k');
    wallRH  = new Sprite(windowWidth, windowHeight/2, 8, windowHeight, 'k');
    wallTop  = new Sprite(0, 0, windowWidth*2, 8, 'k');
    wallBot  = new Sprite(0, windowHeight, windowWidth*2, 8, 'k');
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    gameWaves();
    if (screenSelector == "end"){
        endScreen();   
    }
    console.log(projectileEnemySpawn);
}
   
function enemyHitPlayer(normalEnemies, player) {
    player.remove();
    screenSelector = "end"
}
    
function projectileHitNormalEnemy(normalEnemies, projectile) {
    normalEnemies.remove();
    lastEnemy[1]--;
    lastEnemy[2]--;
    lastEnemy[3]--;
    lastEnemy[4]--;
    lastEnemy[5]--;

}
function projectile_Hit_Fast_Enemy(fastEnemies, projectile) {
    fastEnemies.remove();
    lastEnemy[4]--;
    lastEnemy[5]--;

}
function projectileHitProjectileEnemyOne(projectileEnemyOne, projectile) {
    projectileEnemyOne.remove();
    console.log("hit");
}

function playerMechanics(){
    document.addEventListener("keydown", function(event) {
        if (event.code === 'KeyA') {
            player.vel.x = -4;
        }
        else if (event.code === 'KeyD')
            player.vel.x = 4;
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
            player.vel.y = -4;
        }
        else if (event.code === 'KeyS')
            player.vel.y = 4;
    });

    document.addEventListener("keyup", function(event) {
        if (event.code === 'KeyW') {
            player.vel.y = 0;
        }

        else if (event.code === 'KeyS')
            player.vel.y = 0;
    });



}
function playerSpawn() {
    player = new Sprite(windowWidth/2, windowHeight/2, PLAYER_WIDTH, PLAYER_HEIGHT, 'k');
    player.color = 'cyan';  
}

function playerProjectileMechanics() {
    if (mouse.presses() & frameCount > 50) {
            projectile = new Sprite(player.x, player.y, PROJECTILE_WIDTH, PROJECTILE_HEIGHT, 'k');
            projectile.color = 'cyan';
            projectile.moveTowards(mouseX, mouseY, 0.01);
            projectileGroup.add(projectile);
            frameCount = frameCount - frameCount;
            projectile.speed = 5;
    }
    if (frameCount > 100) {
            projectileGroup.removeAll();
        
   }
}

function fastEnemySpawn(){
    if (fastEnemyWaveSpawnCounter[1] > 1){
        return(fastEnemySpawn);
    }
    if (fastEnemyWaveSpawnCounter[2] > 1){
        return(fastEnemySpawn);
    }
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
        fastEnemies[i].moveTowards(player.x, player.y, 0.02)
        fastEnemies[i].speed = 8;
        fastEnemies[i].collide(projectile, projectile_Hit_Fast_Enemy)
    } 
}

function projectileEnemyOneSpawn(){
        if (projectileEnemySpawn > 1){
        return(projectileEnemyOneSpawn);
    }
    console.log(projectileEnemySpawn);
        projectileEnemyOne = new Sprite(25, 25, 25, 'k');
        projectileEnemyOne.color='yellow';   
        projectileEnemySpawn++;

}

function projectileEnemyOneMechanics(){
    enemyProjectileDespawn = enemyProjectileDespawn + 0.02;
    enemyProjectileOneCooldown = enemyProjectileOneCooldown + 0.02;
    if (enemyProjectileOneCooldown > 4) {
        enemyProjectileOneCooldown = enemyProjectileOneCooldown - enemyProjectileOneCooldown;
        enemyProjectile = new Sprite(projectileEnemyOne.x, projectileEnemyOne.y, PROJECTILE_WIDTH, PROJECTILE_HEIGHT, 'k');
        enemyProjectile.color = 'yellow';
        enemyProjectileGroupOne.add(enemyProjectile)
        enemyProjectile.moveTowards(player.x, player.y, 0.01);
        enemyProjectile.speed = 4;
        enemyProjectileDespawn = enemyProjectileDespawn - enemyProjectileDespawn;
    }
    if (enemyProjectileDespawn > 4) {
        enemyProjectileGroupOne.removeAll();
   }
}

function normalEnemySpawn(){
    if (normalEnemyWaveSpawnCounter[1] > 1){
        return(normalEnemySpawn);
    }
     if (normalEnemyWaveSpawnCounter[2] > 1){
        return(normalEnemySpawn);
    }
     if (normalEnemyWaveSpawnCounter[3] > 1){
        return(normalEnemySpawn);
    }
     if (normalEnemyWaveSpawnCounter[3] > 1){
        return(normalEnemySpawn);
    }
     if (normalEnemyWaveSpawnCounter[4] > 1){
        return(normalEnemySpawn);
    }
     if (normalEnemyWaveSpawnCounter[5] > 1){
        return(normalEnemySpawn);
    }
    
    
    for (i = 0; i < normalEnemyCount; i++) {
        var randomNumber= Math.random() * windowWidth;
        var randomNumberTwo= (Math.random() * windowHeight) ;

        normalEnemies[i] = new Sprite(randomNumber, randomNumberTwo, ENEMY_HEIGHT, ENEMY_WIDTH, 'd');
        normalEnemies[i].color = 'red';
        normalEnemyWaveSpawn = "false";
    } 
}
    
function normalEnemyMechanics(){
    for (i = 0; i < normalEnemyCount; i++) {
        normalEnemies[i].moveTowards(player.x, player.y, 0.01)
        normalEnemies[i].speed = 4.2;
        normalEnemies[i].collide(projectile, projectileHitNormalEnemy)
    } 
}
function gameWaves(){
    if (wave == 1){
        waveOne();
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
   if (lastEnemy[1] == 0){
        wave = wave + 1;
    } 
    if (wave == 2){
        waveTwo();
    }

function waveTwo(){
    background('black');
    lastEnemy[1] = 3;
    playerMechanics();
    playerProjectileMechanics();
    normalEnemyWaveSpawn = "true";
    if (normalEnemyWaveSpawn == "true") {
        normalEnemyWaveSpawnCounter[1] = normalEnemyWaveSpawnCounter[1] + 1;
        normalEnemyCount = 5;
        normalEnemySpawn();
    }
    normalEnemyMechanics();
    fill(255);
    textSize(32);
    text("wave:" + wave, windowWidth/2, 32);
}
    if (lastEnemy[2] == 0){
        wave = wave + 1;
    } 
    if (wave == 3){
        waveThree();
    }

function waveThree(){
    background('black');
    lastEnemy[1] = 3;
    lastEnemy[2] = 10;
    playerMechanics();
    playerProjectileMechanics();
    normalEnemyWaveSpawnCounter[1] = 0;
    normalEnemyWaveSpawn = "true";
    if (normalEnemyWaveSpawn == "true") {
        normalEnemyWaveSpawnCounter[2] = normalEnemyWaveSpawnCounter[2] + 1;
        normalEnemyCount = 7;
        normalEnemySpawn();
    }
    normalEnemyMechanics();
    fill(255);
    textSize(32);
    text("wave:" + wave, windowWidth/2, 32);
}

    if (lastEnemy[3] == 0){
        wave = wave + 1;
    } 
    if (wave == 4){
        waveFour();
    } 

function waveFour(){
    background('black'); 
    lastEnemy[1] = 3;
    lastEnemy[2] = 10;
    lastEnemy[3] = 17;
    normalEnemyWaveSpawnCounter[1] = 0;
    normalEnemyWaveSpawnCounter[2] = 0;
    playerProjectileMechanics();
    playerMechanics();
    normalEnemyWaveSpawn = "true";
    if (normalEnemyWaveSpawn == "true") {
        normalEnemyWaveSpawnCounter[3] = normalEnemyWaveSpawnCounter[3] + 1;
        normalEnemyCount = 7;
        normalEnemySpawn();
    }
    normalEnemyMechanics();

    if (fastEnemyWaveSpawn == "true"){
    fastEnemySpawn();
    }
    fastEnemyMechanics();

   fill(255);
    textSize(32);
    text("wave:" + wave, windowWidth/2, 32);

}
 if (lastEnemy[4] == 0){
        wave = wave + 1;
    } 
    if (wave == 5){
        waveFive();
    } 
    
function waveFive(){
    background('black'); 
    lastEnemy[1] = 3;
    lastEnemy[2] = 10;
    lastEnemy[3] = 17;
    lastEnemy[4] = 23;

    normalEnemyWaveSpawnCounter[1] = 0;
    normalEnemyWaveSpawnCounter[2] = 0;
    normalEnemyWaveSpawnCounter[3] = 0;

    playerProjectileMechanics();
    playerMechanics();
    normalEnemyWaveSpawn = "true";
    if (normalEnemyWaveSpawn == "true") {
        normalEnemyWaveSpawnCounter[4] = normalEnemyWaveSpawnCounter[4] + 1;
        normalEnemyCount = 9;
        normalEnemySpawn();
    }
    normalEnemyMechanics();
    fastEnemyWaveSpawn = "true";
    if (fastEnemyWaveSpawn == "true"){
    fastEnemyWaveSpawnCounter[1] = fastEnemyWaveSpawnCounter[1] + 1;
    fastEnemyCount = 2;
    fastEnemySpawn();
    }
    fastEnemyMechanics();

   fill(255);
    textSize(32);
    text("wave:" + wave, windowWidth/2, 32);

}
 if (lastEnemy[5] == 0){
        wave = wave + 1;
    } 
    if (wave == 6){
        waveSix();
    } 

function waveSix(){
    background('black'); 
    lastEnemy[1] = 3;
    lastEnemy[2] = 10;
    lastEnemy[3] = 17;
    lastEnemy[4] = 23;
    lastEnemy[5] = 34;

    normalEnemyWaveSpawnCounter[1] = 0;
    normalEnemyWaveSpawnCounter[2] = 0;
    normalEnemyWaveSpawnCounter[3] = 0;
    normalEnemyWaveSpawnCounter[4] = 0;
    
    fastEnemyWaveSpawnCounter[1] = 0;

    playerProjectileMechanics();
    playerMechanics();
    normalEnemyWaveSpawn = "true";
    if (normalEnemyWaveSpawn == "true") {
        normalEnemyWaveSpawnCounter[5] = normalEnemyWaveSpawnCounter[5] + 1;
        normalEnemyCount = 9;
        normalEnemySpawn();
    }
    normalEnemyMechanics();
    fastEnemyWaveSpawn = "true";
    if (fastEnemyWaveSpawn == "true"){
    fastEnemyWaveSpawnCounter[2] = fastEnemyWaveSpawnCounter[2] + 1;
    fastEnemyCount = 2;
    fastEnemySpawn();
    }
    fastEnemyMechanics();
    projectileEnemyOneSpawn();
    projectileEnemyOneMechanics();
   fill(255);
    textSize(32);
    text("wave:" + wave, windowWidth/2, 32);

}



}
function endScreen(){
    allSprites.visible = false;
}

/*******************************************************/
//  END OF APP
/*******************************************************/
