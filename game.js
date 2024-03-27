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

var projectileEnemyOneSpawnCounter = 1;

var enemyProjectileOneCooldown = [];
enemyProjectileOneCooldown[1] = 0;
enemyProjectileOneCooldown[2] = 0;
enemyProjectileOneCooldown[3] = 0;
enemyProjectileOneCooldown[4] = 0;

var enemyProjectileTwoCooldown = [];
enemyProjectileTwoCooldown[1] = 0;

var enemyProjectileOneDespawn = [];
enemyProjectileOneDespawn[1] = 0;
enemyProjectileOneDespawn[2] = 0;

normalEnemyWaveSpawnCounter[1] = 0;
normalEnemyWaveSpawnCounter[2] = 0;
normalEnemyWaveSpawnCounter[3] = 0;
normalEnemyWaveSpawnCounter[4] = 0;
normalEnemyWaveSpawnCounter[5] = 0;
normalEnemyWaveSpawnCounter[6] = 0;
normalEnemyWaveSpawnCounter[7] = 0;
normalEnemyWaveSpawnCounter[8] = 0;
normalEnemyWaveSpawnCounter[9] = 0;

var playerSpawn = 0;

var normalFastWaveSpawnCounter = []
fastEnemyWaveSpawnCounter = [];

fastEnemyWaveSpawnCounter[1] = 0;
fastEnemyWaveSpawnCounter[2] = 0;
fastEnemyWaveSpawnCounter[3] = 0;
fastEnemyWaveSpawnCounter[4] = 0;
fastEnemyWaveSpawnCounter[5] = 0;


var fastEnemyCount = 1;
var lastEnemy = [];
var normalEnemyCount = 3;
lastEnemy[1] = 3;
lastEnemy[2] = 8;
lastEnemy[3] = 15;
lastEnemy[4] = 23;
lastEnemy[5] = 34;
lastEnemy[6] = 48;
lastEnemy[7] = 63;

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    console.log("setup: ");

    cnv = new Canvas(windowWidth, windowHeight);
    player = new Sprite(windowWidth/2, windowHeight/2, PLAYER_WIDTH, 'k');
    player.color = 'cyan';
 
    projectile = new Sprite(player.x, player.y, PROJECTILE_WIDTH, 'd');
    projectile.remove();
    projectileGroup = new Group();
    
    enemyProjectile = new Sprite(0 , 0, PROJECTILE_WIDTH, 'd');
    enemyProjectile.remove();
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
    console.log(lastEnemy[7]);
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
    lastEnemy[6]--;
    lastEnemy[7]--;

}
function projectile_Hit_Fast_Enemy(fastEnemies, projectile) {
    fastEnemies.remove();
    lastEnemy[4]--;
    lastEnemy[5]--;
    lastEnemy[6]--;
    lastEnemy[7]--;

}
 function projectileHitProjectileEnemy(projectileEnemyOne, projectile){
    projectileEnemyOne.remove();
    enemyProjectileOneCooldown = -10000000000000;
    lastEnemy[7]--;
 }
 function enemyProjectileHitProjectileEnemy(enemyProjectile, projectileEnemyOne){
    projectileEnemyOne.remove();
    enemyProjectileOneCooldown = -10000000000000;
    lastEnemy[7]--;

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
            projectile = new Sprite(player.x, player.y, PROJECTILE_WIDTH, 'k');
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
    if (fastEnemyWaveSpawnCounter[3] > 1){
        return(fastEnemySpawn);
    }
    if (fastEnemyWaveSpawnCounter[4] > 1){
        return(fastEnemySpawn);
    }
    if (fastEnemyWaveSpawnCounter[5] > 1){
        return(fastEnemySpawn);
    }
    for (i = 0; i < fastEnemyCount; i++) {
        var randomNumberThree = wallRH.x - windowWidth/3;
        var randomNumberFour= Math.random() * windowHeight;
        console.log(randomNumberThree);

        fastEnemies[i] = new Sprite(randomNumberThree, randomNumberFour, ENEMY_WIDTH, 'd');
        fastEnemies[i].color = 'orange';
        fastEnemyWaveSpawn = "false";
    }   
}

function fastEnemyMechanics(){
    for (i = 0; i < fastEnemyCount; i++) {
        fastEnemies[i].moveTowards(player.x, player.y, 0.02)
        fastEnemies[i].speed = 6;
        fastEnemies[i].collide(projectile, projectile_Hit_Fast_Enemy)
    } 
}

function projectileEnemyOneSpawn(){
        if (projectileEnemyOneSpawnCounter > 1){
        return(projectileEnemyOneSpawn);
    }
        projectileEnemyOne = new Sprite(25, 25, 25, 'd');
        projectileEnemyOne.color='yellow';   
        projectileEnemyOneSpawnCounter++;

}

function projectileEnemyOneMechanics(){
    enemyProjectileOneDespawn[1] = enemyProjectileOneDespawn[1] + 0.02;
    enemyProjectileOneCooldown[1] = enemyProjectileOneCooldown[1] + 0.02;
    if (enemyProjectileOneCooldown[1] > 4) {
        enemyProjectileOneCooldown[1] = enemyProjectileOneCooldown[1] - enemyProjectileOneCooldown[1];
        enemyProjectile = new Sprite(projectileEnemyOne.x + 25, projectileEnemyOne.y + 25, PROJECTILE_WIDTH, 'd');
        enemyProjectile.color = 'yellow';
        enemyProjectileGroupOne.add(enemyProjectile)
        enemyProjectile.moveTowards(player.x, player.y, 0.01);
        enemyProjectile.speed = 4;
        enemyProjectileOneDespawn[1] = enemyProjectileOneDespawn[1] - enemyProjectileOneDespawn[1];
    }
    projectileEnemyOne.collide(projectile, projectileHitProjectileEnemy)
    enemyProjectile.collide(projectileEnemyOne, enemyProjectileHitProjectileEnemy)

    if (enemyProjectileOneDespawn[1] > 3.9) {
        enemyProjectileGroupOne.removeAll();
    }
}

function projectileEnemyOneMechanicsTwo(){
    enemyProjectileOneDespawn[2] = enemyProjectileOneDespawn[2] + 0.02;
    enemyProjectileOneCooldown[2] = enemyProjectileOneCooldown[2] + 0.02;
    if (enemyProjectileOneCooldown[2] > 4) {
        enemyProjectileOneCooldown[2] = enemyProjectileOneCooldown[2] - enemyProjectileOneCooldown[2];
        enemyProjectile = new Sprite(projectileEnemyOne.x + 25, projectileEnemyOne.y + 25, PROJECTILE_WIDTH, 'd');
        enemyProjectile.color = 'yellow';
        enemyProjectileGroupOne.add(enemyProjectile)
        enemyProjectile.moveTowards(player.x, player.y, 0.01);
        enemyProjectile.speed = 4;
        enemyProjectileOneDespawn[2] = enemyProjectileOneDespawn[2] - enemyProjectileOneDespawn[2];
    }
    if (enemyProjectileOneDespawn[2] > 3.9) {
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
     if (normalEnemyWaveSpawnCounter[4] > 1){
        return(normalEnemySpawn);
    }
     if (normalEnemyWaveSpawnCounter[5] > 1){
        return(normalEnemySpawn);
    }
     if (normalEnemyWaveSpawnCounter[6] > 1){
        return(normalEnemySpawn);
    }
     if (normalEnemyWaveSpawnCounter[7] > 1){
        return(normalEnemySpawn);
    }
     if (normalEnemyWaveSpawnCounter[8] > 1){
        return(normalEnemySpawn);
    }
     if (normalEnemyWaveSpawnCounter[9] > 1){
        return(normalEnemySpawn);
    }

    for (i = 0; i < normalEnemyCount; i++) {
        var randomNumber= Math.random() * windowWidth/3;
        var randomNumberTwo= (Math.random() * windowHeight) ;

        normalEnemies[i] = new Sprite(randomNumber, randomNumberTwo, ENEMY_WIDTH, 'd');
        normalEnemies[i].color = 'red';
        normalEnemyWaveSpawn = "false";
    } 
}
    
function normalEnemyMechanics(){
    for (i = 0; i < normalEnemyCount; i++) {
        normalEnemies[i].moveTowards(player.x, player.y, 0.01)
        normalEnemies[i].speed = 3;
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
        normalEnemyWaveSpawnCounter[1]++;
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
    normalEnemyWaveSpawnCounter[1] = 1;
    normalEnemyWaveSpawn = "true";
    if (normalEnemyWaveSpawn == "true") {
        normalEnemyWaveSpawnCounter[2]++;
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
        normalEnemyWaveSpawnCounter[3]++;
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
        normalEnemyWaveSpawnCounter[4]++;
        normalEnemyCount = 9;
        normalEnemySpawn();
    }
    normalEnemyMechanics();
    fastEnemyWaveSpawn = "true";
    if (fastEnemyWaveSpawn == "true"){
    fastEnemyWaveSpawnCounter[1]++;
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
        normalEnemyWaveSpawnCounter[5]++;
        normalEnemyCount = 10;
        normalEnemySpawn();
    }
    normalEnemyMechanics();
    fastEnemyWaveSpawn = "true";
    if (fastEnemyWaveSpawn == "true"){
    fastEnemyWaveSpawnCounter[2]++;
    fastEnemyCount = 4;
    fastEnemySpawn();
    }
    fastEnemyMechanics();

    
    fill(255);
    textSize(32);
    text("wave:" + wave, windowWidth/2, 32);

}
    if (lastEnemy[6] == 0){
        wave = wave + 1;
    } 
    if (wave == 7){
        waveSeven();
    } 


function waveSeven(){
    background('black'); 
    lastEnemy[1] = 3;
    lastEnemy[2] = 10;
    lastEnemy[3] = 17;
    lastEnemy[4] = 23;
    lastEnemy[5] = 34;
    lastEnemy[6] = 48;

    normalEnemyWaveSpawnCounter[1] = 0;
    normalEnemyWaveSpawnCounter[2] = 0;
    normalEnemyWaveSpawnCounter[3] = 0;
    normalEnemyWaveSpawnCounter[4] = 0;
    normalEnemyWaveSpawnCounter[5] = 0;

    fastEnemyWaveSpawnCounter[1] = 0;
    fastEnemyWaveSpawnCounter[2] = 0;

    playerProjectileMechanics();
    playerMechanics();
    normalEnemyWaveSpawn = "true";
    if (normalEnemyWaveSpawn == "true") {
        normalEnemyWaveSpawnCounter[6]++;
        normalEnemyCount = 10;
        normalEnemySpawn();
    }
    normalEnemyMechanics();
    fastEnemyWaveSpawn = "true";
    if (fastEnemyWaveSpawn == "true"){
    fastEnemyWaveSpawnCounter[3]++;
    fastEnemyCount = 4;
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
