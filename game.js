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
var lives = 3;
var player;
var normalEnemyWaveSpawn = "true";
var fastEnemyWaveSpawn = "true";
var normalEnemyWaveSpawnCounter = [];
var outOfBounds = "false";

var projectileEnemyFourSpawnCounter = 1;

var enemyProjectileFourCooldown = 0;

var enemyProjectileFourDespawn = 0;

var projectileEnemyThreeSpawnCounter = [];
projectileEnemyThreeSpawnCounter[1] = 1;
projectileEnemyThreeSpawnCounter[2] = 1;

var enemyProjectileThreeCooldown = [];
enemyProjectileThreeCooldown[1] = 0;
enemyProjectileThreeCooldown[2] = 0;

var enemyProjectileThreeDespawn = [];
enemyProjectileThreeDespawn[1] = 0;
enemyProjectileThreeDespawn[2] = 0;

var projectileEnemyTwoSpawnCounter = [];
projectileEnemyTwoSpawnCounter[1] = 1;
projectileEnemyTwoSpawnCounter[2] = 1;
projectileEnemyTwoSpawnCounter[3] = 1;
projectileEnemyTwoSpawnCounter[4] = 1;

var enemyProjectileTwoCooldown = [];
enemyProjectileTwoCooldown[1] = 0;
enemyProjectileTwoCooldown[2] = 0;
enemyProjectileTwoCooldown[3] = 0;

var enemyProjectileTwoDespawn = [];
enemyProjectileTwoDespawn[1] = 0;
enemyProjectileTwoDespawn[2] = 0;
enemyProjectileTwoDespawn[3] = 0;

var projectileEnemyOneSpawnCounter = [];
projectileEnemyOneSpawnCounter[1] = 1;
projectileEnemyOneSpawnCounter[2] = 1;
projectileEnemyOneSpawnCounter[3] = 1;
projectileEnemyOneSpawnCounter[4] = 1;

var enemyProjectileOneCooldown = [];
enemyProjectileOneCooldown[1] = 0;
enemyProjectileOneCooldown[2] = 0;
enemyProjectileOneCooldown[3] = 0;
enemyProjectileOneCooldown[4] = 0;

var enemyProjectileOneDespawn = [];
enemyProjectileOneDespawn[1] = 0;
enemyProjectileOneDespawn[2] = 0;
enemyProjectileOneDespawn[3] = 0;
enemyProjectileOneDespawn[4] = 0;

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
fastEnemyWaveSpawnCounter[6] = 0;


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
lastEnemy[8] = 81;
lastEnemy[9] = 100;
lastEnemy[10] = 120;

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    console.log("setup: ");

    cnv = new Canvas(windowWidth, windowHeight);
    player = new Sprite(windowWidth/2, windowHeight/2, PLAYER_WIDTH, PLAYER_HEIGHT, 'k');
    player.color = 'cyan';

    projectile = new Sprite(player.x, player.y, PROJECTILE_WIDTH, 'd');
    projectile.remove();
    projectileGroup = new Group();
    
    enemyProjectile = new Sprite(0 , 0, PROJECTILE_WIDTH, 'd');
    enemyProjectile.remove();
    enemyProjectileGroupOne = new Group();
    
    enemyProjectileTwo = new Sprite(0 , 0, PROJECTILE_WIDTH, 'd');
    enemyProjectileTwo.remove();
    enemyProjectileGroupTwo = new Group();
    
    enemyProjectileThree = new Sprite(0 , 0, PROJECTILE_WIDTH, 'd');
    enemyProjectileThree.remove();
    enemyProjectileGroupThree = new Group();
    
    enemyProjectileFour = new Sprite(0 , 0, PROJECTILE_WIDTH, 'd');
    enemyProjectileFour.remove();
    enemyProjectileGroupFour = new Group();

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
    boundary();
    if (lives == 0){
        allSprites.remove();
        background('black');
        text("Loading...", windowWidth/2, windowHeight/2, 32);
        sessionStorage.setItem('wave', wave);
        window.location = "end_lose.html";
    }  
    if (wave == 11){
        allSprites.remove();
        background('black');
        text("Loading...", windowWidth/2, windowHeight/2, 32);
        window.location = "end_win.html";
    }  
    if (outOfBounds == "true"){
        allSprites.remove();
        background('black');
        text("Loading...", windowWidth/2, windowHeight/2, 32);
        sessionStorage.setItem('wave', wave);
        window.location = "end_out_of_bounds.html";
    } 
  
}
function boundary() {
    if (player.y >= wallBot.y){
        outOfBounds = "true";
    } 
    if (player.x >= wallRH.x){
        outOfBounds = "true";
    } 
    if (player.y <= wallTop.y){
        outOfBounds = "true";
    }
    if (player.x <= wallLH.x){
        outOfBounds = "true";
    }
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
    lastEnemy[8]--;
    lastEnemy[9]--;
    lastEnemy[10]--;
}
function normalEnemyHitPlayer(player, normalEnemies) {
    lives--;
}
function fastEnemyHitPlayer(player, fastEnemies) {
    lives--;
}
function enemyProjectileHitPlayer(player, enemyProjectile) {
    lives--;
}
function projectile_Hit_Fast_Enemy(fastEnemies, projectile) {
    fastEnemies.remove();
    lastEnemy[4]--;
    lastEnemy[5]--;
    lastEnemy[6]--;
    lastEnemy[7]--;
    lastEnemy[8]--;
    lastEnemy[9]--;
    lastEnemy[10]--;
}
function projectileHitProjectileEnemy(projectileEnemyOne, projectile){
    projectileEnemyOne.remove();
    enemyProjectileOneCooldown[1] = -1000;
    if (wave == 8){
        enemyProjectileOneCooldown[2] = -1000;
    }
     if (wave == 9){
        enemyProjectileOneCooldown[3] = -1000;
    }
    if (wave == 10){
        enemyProjectileOneCooldown[4] = -1000;
    }
    lastEnemy[7]--;
    lastEnemy[8]--;
    lastEnemy[9]--;
    lastEnemy[10]--;
    enemyProjectileGroupOne.removeAll();
    projectile.remove();
}
function projectileHitProjectileEnemyTwo(projectileEnemyTwo, projectile){
    projectileEnemyTwo.remove();
    enemyProjectileTwoCooldown[1] = -1000;
    if (wave == 9){
        enemyProjectileTwoCooldown[2] = -1000;
    }
     if (wave == 10){
        enemyProjectileTwoCooldown[3] = -1000;
    }
    lastEnemy[8]--;
    lastEnemy[9]--;
    lastEnemy[10]--;
    enemyProjectileGroupTwo.removeAll();
    projectile.remove();
}

function projectileHitProjectileEnemyThree(projectileEnemyThree, projectile){
    projectileEnemyThree.remove();
    enemyProjectileThreeCooldown[1] = -1000;
    if (wave == 10){
        enemyProjectileThreeCooldown[2] = -1000;
    }
    lastEnemy[9]--;
    lastEnemy[10]--;
    enemyProjectileGroupThree.removeAll();
    projectile.remove();
}

function projectileHitProjectileEnemyFour(projectileEnemyFour, projectile){
    projectileEnemyFour.remove();
    enemyProjectileFourCooldown = -1000;
    lastEnemy[10]--;
    enemyProjectileGroupFour.removeAll();
    projectile.remove();
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
            projectile = new Sprite(player.x, player.y, PROJECTILE_WIDTH, PROJECTILE_HEIGHT,  'k');
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
     if (fastEnemyWaveSpawnCounter[6] > 1){
        return(fastEnemySpawn);
    }
    for (i = 0; i < fastEnemyCount; i++) {
        var randomNumberThree = wallRH.x - windowWidth/7;
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
        fastEnemies[i].overlaps(player, fastEnemyHitPlayer)

    } 
}

function projectileEnemyOneSpawn(){
    if (projectileEnemyOneSpawnCounter[1] > 1){
        return(projectileEnemyOneSpawn);
    }
   
    projectileEnemyOne = new Sprite(25, 25, 25, 'd');
    projectileEnemyOne.color='yellow';   
    projectileEnemyOneSpawnCounter[1]++;
}

function projectileEnemyOneSpawnTwo(){
    if (projectileEnemyOneSpawnCounter[2] > 1){
        return(projectileEnemyOneSpawnTwo);
    }
    projectileEnemyOne = new Sprite(25, 25, 25, 'd');
    projectileEnemyOne.color='yellow';   
    projectileEnemyOneSpawnCounter[2]++;
}

function projectileEnemyOneSpawnThree(){
    if (projectileEnemyOneSpawnCounter[3] > 1){
        return(projectileEnemyOneSpawnThree);
    }
    projectileEnemyOne = new Sprite(25, 25, 25, 'd');
    projectileEnemyOne.color='yellow';   
    projectileEnemyOneSpawnCounter[3]++;
}

function projectileEnemyOneSpawnFour(){
    if (projectileEnemyOneSpawnCounter[4] > 1){
        return(projectileEnemyOneSpawnFour);
    }
    projectileEnemyOne = new Sprite(25, 25, 25, 'd');
    projectileEnemyOne.color='yellow';   
    projectileEnemyOneSpawnCounter[4]++;
}

function projectileEnemyTwoSpawn(){
    if (projectileEnemyTwoSpawnCounter[1] > 1){
        return(projectileEnemyTwoSpawn);
    }
    projectileEnemyTwo = new Sprite(windowWidth - PLAYER_WIDTH, 25, PLAYER_WIDTH, 'd');
    projectileEnemyTwo.color='yellow';   
    projectileEnemyTwoSpawnCounter[1]++;
}

function projectileEnemyTwoSpawnTwo(){
    if (projectileEnemyTwoSpawnCounter[2] > 1){
        return(projectileEnemyTwoSpawn);
    }
    projectileEnemyTwo = new Sprite(windowWidth - PLAYER_WIDTH, 25, PLAYER_WIDTH, 'd');
    projectileEnemyTwo.color='yellow';   
    projectileEnemyTwoSpawnCounter[2]++;
}

function projectileEnemyTwoSpawnThree(){
    if (projectileEnemyTwoSpawnCounter[3] > 1){
        return(projectileEnemyTwoSpawnThree);
    }
    projectileEnemyTwo = new Sprite(windowWidth - PLAYER_WIDTH, 25, PLAYER_WIDTH, 'd');
    projectileEnemyTwo.color='yellow';   
    projectileEnemyTwoSpawnCounter[3]++;
}

function projectileEnemyThreeSpawn(){
    if (projectileEnemyThreeSpawnCounter[1] > 1){
        return(projectileEnemyThreeSpawn);
    }
    projectileEnemyThree = new Sprite(25, windowHeight - 25, PLAYER_WIDTH, 'd');
    projectileEnemyThree.color='yellow';   
    projectileEnemyThreeSpawnCounter[1]++;
}
function projectileEnemyThreeSpawnTwo(){
    if (projectileEnemyThreeSpawnCounter[2] > 1){
        return(projectileEnemyThreeSpawnTwo);
    }
    projectileEnemyThree = new Sprite(25, windowHeight - 25, PLAYER_WIDTH, 'd');
    projectileEnemyThree.color='yellow';   
    projectileEnemyThreeSpawnCounter[2]++;
}

function projectileEnemyFourSpawn(){
    if (projectileEnemyFourSpawnCounter > 1){
        return(projectileEnemyFourSpawn);
    }
    projectileEnemyFour = new Sprite(windowWidth - 25, windowHeight - 25, PLAYER_WIDTH, 'd');
    projectileEnemyFour.color='yellow';   
    projectileEnemyFourSpawnCounter++;
}

function projectileEnemyOneMechanics(){
    enemyProjectileOneDespawn[1] = enemyProjectileOneDespawn[1] + 0.02;
    enemyProjectileOneCooldown[1] = enemyProjectileOneCooldown[1] + 0.02;
    if (enemyProjectileOneCooldown[1] > 2) {
        enemyProjectileOneCooldown[1] = enemyProjectileOneCooldown[1] - enemyProjectileOneCooldown[1];
        enemyProjectile = new Sprite(projectileEnemyOne.x + 25, projectileEnemyOne.y + 25, PROJECTILE_WIDTH, 'd');
        enemyProjectile.color = 'yellow';
        enemyProjectileGroupOne.add(enemyProjectile)
        enemyProjectile.moveTowards(player.x, player.y, 0.01);
        enemyProjectile.speed = 4;
        enemyProjectileOneDespawn[1] = enemyProjectileOneDespawn[1] - enemyProjectileOneDespawn[1];

    }
    projectileEnemyOne.collide(projectile, projectileHitProjectileEnemy)
    enemyProjectile.collide(player, enemyProjectileHitPlayer)

    if (enemyProjectileOneDespawn[1] > 1.9) {
        enemyProjectileGroupOne.removeAll();
    }
}

function projectileEnemyOneMechanicsTwo(){
    enemyProjectileOneDespawn[2] = enemyProjectileOneDespawn[2] + 0.02;
    enemyProjectileOneCooldown[2] = enemyProjectileOneCooldown[2] + 0.02;
    if (enemyProjectileOneCooldown[2] > 2) {
        enemyProjectileOneCooldown[2] = enemyProjectileOneCooldown[2] - enemyProjectileOneCooldown[2];
        enemyProjectile = new Sprite(projectileEnemyOne.x + 25, projectileEnemyOne.y + 25, PROJECTILE_WIDTH, 'd');
        enemyProjectile.color = 'yellow';
        enemyProjectileGroupOne.add(enemyProjectile)
        enemyProjectile.moveTowards(player.x, player.y, 0.01);
        enemyProjectile.speed = 4;
        enemyProjectileOneDespawn[2] = enemyProjectileOneDespawn[2] - enemyProjectileOneDespawn[2];

    }
    projectileEnemyOne.collide(projectile, projectileHitProjectileEnemy)
    enemyProjectile.collide(player, enemyProjectileHitPlayer)

    if (enemyProjectileOneDespawn[2] > 1.9) {
        enemyProjectileGroupOne.removeAll();
    }
}
function projectileEnemyOneMechanicsThree(){
    enemyProjectileOneDespawn[3] = enemyProjectileOneDespawn[3] + 0.02;
    enemyProjectileOneCooldown[3] = enemyProjectileOneCooldown[3] + 0.02;
    if (enemyProjectileOneCooldown[3] > 2) {
        enemyProjectileOneCooldown[3] = enemyProjectileOneCooldown[3] - enemyProjectileOneCooldown[3];
        enemyProjectile = new Sprite(projectileEnemyOne.x + 25, projectileEnemyOne.y + 25, PROJECTILE_WIDTH, 'd');
        enemyProjectile.color = 'yellow';
        enemyProjectileGroupOne.add(enemyProjectile)
        enemyProjectile.moveTowards(player.x, player.y, 0.01);
        enemyProjectile.speed = 4;
        enemyProjectileOneDespawn[3] = enemyProjectileOneDespawn[3] - enemyProjectileOneDespawn[3];

    }
    projectileEnemyOne.collide(projectile, projectileHitProjectileEnemy)
    enemyProjectile.collide(player, enemyProjectileHitPlayer)

    if (enemyProjectileOneDespawn[3] > 1.9) {
        enemyProjectileGroupOne.removeAll();
    }
}

function projectileEnemyOneMechanicsFour(){
    enemyProjectileOneDespawn[4] = enemyProjectileOneDespawn[4] + 0.02;
    enemyProjectileOneCooldown[4] = enemyProjectileOneCooldown[4] + 0.02;
    if (enemyProjectileOneCooldown[4] > 2) {
        enemyProjectileOneCooldown[4] = enemyProjectileOneCooldown[4] - enemyProjectileOneCooldown[4];
        enemyProjectile = new Sprite(projectileEnemyOne.x + 25, projectileEnemyOne.y + 25, PROJECTILE_WIDTH, 'd');
        enemyProjectile.color = 'yellow';
        enemyProjectileGroupOne.add(enemyProjectile)
        enemyProjectile.moveTowards(player.x, player.y, 0.01);
        enemyProjectile.speed = 4;
        enemyProjectileOneDespawn[4] = enemyProjectileOneDespawn[4] - enemyProjectileOneDespawn[4];

    }
    projectileEnemyOne.collide(projectile, projectileHitProjectileEnemy)

    if (enemyProjectileOneDespawn[4] > 1.9) {
        enemyProjectileGroupOne.removeAll();
    }
}

function projectileEnemyTwoMechanics(){
    enemyProjectileTwoDespawn[1] = enemyProjectileTwoDespawn[1] + 0.02;
    enemyProjectileTwoCooldown[1] = enemyProjectileTwoCooldown[1] + 0.02;
    if (enemyProjectileTwoCooldown[1] > 2) {
        enemyProjectileTwoCooldown[1] = enemyProjectileTwoCooldown[1] - enemyProjectileTwoCooldown[1];
        enemyProjectileTwo = new Sprite(projectileEnemyTwo.x - 25, projectileEnemyTwo.y + 25, PROJECTILE_WIDTH, 'd');
        enemyProjectileTwo.color = 'yellow';
        enemyProjectileGroupTwo.add(enemyProjectileTwo)
        enemyProjectileTwo.moveTowards(player.x, player.y, 0.01);
        enemyProjectileTwo.speed = 8;
        enemyProjectileTwoDespawn[1] = enemyProjectileTwoDespawn[1] - enemyProjectileTwoDespawn[1];

    }
    projectileEnemyTwo.collide(projectile, projectileHitProjectileEnemyTwo)
    enemyProjectileTwo.collide(player, enemyProjectileHitPlayer)

    if (enemyProjectileTwoDespawn[1] > 1.9) {
        enemyProjectileGroupTwo.removeAll();
    }
}
function projectileEnemyTwoMechanicsTwo(){
    enemyProjectileTwoDespawn[2] = enemyProjectileTwoDespawn[2] + 0.02;
    enemyProjectileTwoCooldown[2] = enemyProjectileTwoCooldown[2] + 0.02;
    if (enemyProjectileTwoCooldown[2] > 2) {
        enemyProjectileTwoCooldown[2] = enemyProjectileTwoCooldown[2] - enemyProjectileTwoCooldown[2];
        enemyProjectileTwo = new Sprite(projectileEnemyTwo.x - 25, projectileEnemyTwo.y + 25, PROJECTILE_WIDTH, 'd');
        enemyProjectileTwo.color = 'yellow';
        enemyProjectileGroupTwo.add(enemyProjectileTwo)
        enemyProjectileTwo.moveTowards(player.x, player.y, 0.01);
        enemyProjectileTwo.speed = 8;
        enemyProjectileTwoDespawn[2] = enemyProjectileTwoDespawn[2] - enemyProjectileTwoDespawn[2];

    }
    projectileEnemyTwo.collide(projectile, projectileHitProjectileEnemyTwo)
    enemyProjectileTwo.collide(player, enemyProjectileHitPlayer)

    if (enemyProjectileTwoDespawn[2] > 1.9) {
        enemyProjectileGroupTwo.removeAll();
    }
}

function projectileEnemyTwoMechanicsThree(){
    enemyProjectileTwoDespawn[3] = enemyProjectileTwoDespawn[3] + 0.02;
    enemyProjectileTwoCooldown[3] = enemyProjectileTwoCooldown[3] + 0.02;
    if (enemyProjectileTwoCooldown[3] > 2) {
        enemyProjectileTwoCooldown[3] = enemyProjectileTwoCooldown[3] - enemyProjectileTwoCooldown[3];
        enemyProjectileTwo = new Sprite(projectileEnemyTwo.x - 25, projectileEnemyTwo.y + 25, PROJECTILE_WIDTH, 'd');
        enemyProjectileTwo.color = 'yellow';
        enemyProjectileGroupTwo.add(enemyProjectileTwo)
        enemyProjectileTwo.moveTowards(player.x, player.y, 0.01);
        enemyProjectileTwo.speed = 8;
        enemyProjectileTwoDespawn[3] = enemyProjectileTwoDespawn[3] - enemyProjectileTwoDespawn[3];

    }
    projectileEnemyTwo.collide(projectile, projectileHitProjectileEnemyTwo)
    enemyProjectileTwo.collide(player, enemyProjectileHitPlayer)

    if (enemyProjectileTwoDespawn[3] > 1.9) {
        enemyProjectileGroupTwo.removeAll();
    }
}

function projectileEnemyThreeMechanics(){
    enemyProjectileThreeDespawn[1] = enemyProjectileThreeDespawn[1] + 0.02;
    enemyProjectileThreeCooldown[1] = enemyProjectileThreeCooldown[1] + 0.02;
    if (enemyProjectileThreeCooldown[1] > 2) {
        enemyProjectileThreeCooldown[1] = enemyProjectileThreeCooldown[1] - enemyProjectileThreeCooldown[1];
        enemyProjectileThree = new Sprite(50, windowHeight - 50, PROJECTILE_WIDTH, 'd');
        enemyProjectileThree.color = 'yellow';
        enemyProjectileGroupThree.add(enemyProjectileThree)
        enemyProjectileThree.moveTowards(player.x, player.y, 0.01);
        enemyProjectileThree.speed = 12;
        enemyProjectileThreeDespawn[1] = enemyProjectileThreeDespawn[1] - enemyProjectileThreeDespawn[1];

    }
    projectileEnemyThree.collide(projectile, projectileHitProjectileEnemyThree)
    enemyProjectileThree.collide(player, enemyProjectileHitPlayer)

    if (enemyProjectileThreeDespawn[1] > 1.9) {
        enemyProjectileGroupThree.removeAll();
    }
}
function projectileEnemyThreeMechanicsTwo(){
    enemyProjectileThreeDespawn[2] = enemyProjectileThreeDespawn[2] + 0.02;
    enemyProjectileThreeCooldown[2] = enemyProjectileThreeCooldown[2] + 0.02;
    if (enemyProjectileThreeCooldown[2] > 2) {
        enemyProjectileThreeCooldown[2] = enemyProjectileThreeCooldown[2] - enemyProjectileThreeCooldown[2];
        enemyProjectileThree = new Sprite(50, windowHeight - 50, PROJECTILE_WIDTH, 'd');
        enemyProjectileThree.color = 'yellow';
        enemyProjectileGroupThree.add(enemyProjectileThree)
        enemyProjectileThree.moveTowards(player.x, player.y, 0.01);
        enemyProjectileThree.speed = 12;
        enemyProjectileThreeDespawn[2] = enemyProjectileThreeDespawn[2] - enemyProjectileThreeDespawn[2];

    }
    projectileEnemyThree.collide(projectile, projectileHitProjectileEnemyThree)
    enemyProjectileThree.collide(player, enemyProjectileHitPlayer)

    if (enemyProjectileThreeDespawn[2] > 1.9) {
        enemyProjectileGroupThree.removeAll();
    }
}
function projectileEnemyFourMechanics(){
    enemyProjectileFourDespawn = enemyProjectileFourDespawn + 0.02;
    enemyProjectileFourCooldown = enemyProjectileFourCooldown + 0.02;
    if (enemyProjectileFourCooldown > 2) {
        enemyProjectileFourCooldown = enemyProjectileFourCooldown - enemyProjectileFourCooldown;
        enemyProjectileFour = new Sprite(windowWidth - 50, windowHeight - 50, PROJECTILE_WIDTH, 'd');
        enemyProjectileFour.color = 'yellow';
        enemyProjectileGroupFour.add(enemyProjectileFour)
        enemyProjectileFour.moveTowards(player.x, player.y, 0.01);
        enemyProjectileFour.speed = 25;
        enemyProjectileFourDespawn = enemyProjectileFourDespawn - enemyProjectileFourDespawn;

    }
    projectileEnemyFour.collide(projectile, projectileHitProjectileEnemyFour)
    enemyProjectileFour.collide(player, enemyProjectileHitPlayer)

    if (enemyProjectileFourDespawn > 1.9) {
        enemyProjectileGroupFour.removeAll();
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
        var randomNumber= Math.random() * windowWidth/7 + 25;
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
        normalEnemies[i].overlaps(player, normalEnemyHitPlayer)

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
    text("wave: " + wave, windowWidth/2.2, 32);
    text("lives: " + lives, windowWidth/3.2, 32);
    text("Enemies Left: " + lastEnemy[1], windowWidth/1.7, 32);

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
    text("wave: " + wave, windowWidth/2.2, 32);
    text("lives: " + lives, windowWidth/3.2, 32);
    text("Enemies Left: " + lastEnemy[2], windowWidth/1.7, 32);
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
    text("wave: " + wave, windowWidth/2.2, 32);
    text("lives: " + lives, windowWidth/3.2, 32);
    text("Enemies Left: " + lastEnemy[3], windowWidth/1.7, 32);

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
    text("wave: " + wave, windowWidth/2.2, 32);
    text("lives: " + lives, windowWidth/3.2, 32);
    text("Enemies Left: " + lastEnemy[4], windowWidth/1.7, 32);


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
    text("wave: " + wave, windowWidth/2.2, 32);
    text("lives: " + lives, windowWidth/3.2, 32);
    text("Enemies Left: " + lastEnemy[5], windowWidth/1.7, 32);


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
    text("wave: " + wave, windowWidth/2.2, 32);
    text("lives: " + lives, windowWidth/3.2, 32);
    text("Enemies Left: " + lastEnemy[6], windowWidth/1.7, 32);

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
    text("wave: " + wave, windowWidth/2.2, 32);
    text("lives: " + lives, windowWidth/3.2, 32);
    text("Enemies Left: " + lastEnemy[7], windowWidth/1.7, 32);

}
 
    if (lastEnemy[7] == 0){
        wave = wave + 1;
    } 
    if (wave == 8){
        waveEight();
    } 
function waveEight(){
    background('black'); 
    lastEnemy[1] = 3;
    lastEnemy[2] = 10;
    lastEnemy[3] = 17;
    lastEnemy[4] = 23;
    lastEnemy[5] = 34;
    lastEnemy[6] = 48;
    lastEnemy[7] = 48;

    normalEnemyWaveSpawnCounter[1] = 0;
    normalEnemyWaveSpawnCounter[2] = 0;
    normalEnemyWaveSpawnCounter[3] = 0;
    normalEnemyWaveSpawnCounter[4] = 0;
    normalEnemyWaveSpawnCounter[5] = 0;
    normalEnemyWaveSpawnCounter[6] = 0;

    fastEnemyWaveSpawnCounter[1] = 0;
    fastEnemyWaveSpawnCounter[2] = 0;
    fastEnemyWaveSpawnCounter[3] = 0;

    playerProjectileMechanics();
    playerMechanics();
    normalEnemyWaveSpawn = "true";
    if (normalEnemyWaveSpawn == "true") {
        normalEnemyWaveSpawnCounter[7]++;
        normalEnemyCount = 11;
        normalEnemySpawn();
    }
    normalEnemyMechanics();
    fastEnemyWaveSpawn = "true";
    if (fastEnemyWaveSpawn == "true"){
    fastEnemyWaveSpawnCounter[4]++;
    fastEnemyCount = 5;
    fastEnemySpawn();
    }
    fastEnemyMechanics();
    projectileEnemyOneSpawnTwo();
    projectileEnemyOneMechanicsTwo();
    
    projectileEnemyTwoSpawn();
    projectileEnemyTwoMechanics();
    fill(255);
    textSize(32);
    text("wave: " + wave, windowWidth/2.2, 32);
    text("lives: " + lives, windowWidth/3.2, 32);
    text("Enemies Left: " + lastEnemy[8], windowWidth/1.7, 32);

}
  if (lastEnemy[8] == 0){
        wave = wave + 1;
    } 
    if (wave == 9){
        waveNine();
    }

function waveNine(){
    background('black'); 
    lastEnemy[1] = 3;
    lastEnemy[2] = 10;
    lastEnemy[3] = 17;
    lastEnemy[4] = 23;
    lastEnemy[5] = 34;
    lastEnemy[6] = 48;
    lastEnemy[7] = 63;
    lastEnemy[8] = 81;

    normalEnemyWaveSpawnCounter[1] = 0;
    normalEnemyWaveSpawnCounter[2] = 0;
    normalEnemyWaveSpawnCounter[3] = 0;
    normalEnemyWaveSpawnCounter[4] = 0;
    normalEnemyWaveSpawnCounter[5] = 0;
    normalEnemyWaveSpawnCounter[6] = 0;
    normalEnemyWaveSpawnCounter[7] = 0;

    fastEnemyWaveSpawnCounter[1] = 0;
    fastEnemyWaveSpawnCounter[2] = 0;
    fastEnemyWaveSpawnCounter[3] = 0;
    fastEnemyWaveSpawnCounter[4] = 0;

    playerProjectileMechanics();
    playerMechanics();
    normalEnemyWaveSpawn = "true";
    if (normalEnemyWaveSpawn == "true") {
        normalEnemyWaveSpawnCounter[8]++;
        normalEnemyCount = 11;
        normalEnemySpawn();
    }
    normalEnemyMechanics();
    fastEnemyWaveSpawn = "true";
    if (fastEnemyWaveSpawn == "true"){
    fastEnemyWaveSpawnCounter[5]++;
    fastEnemyCount = 5;
    fastEnemySpawn();
    }
    fastEnemyMechanics();
    projectileEnemyOneSpawnThree();
    projectileEnemyOneMechanicsThree();
    
    projectileEnemyTwoSpawnTwo();
    projectileEnemyTwoMechanicsTwo();
    
    projectileEnemyThreeSpawn();
    projectileEnemyThreeMechanics();
    fill(255);
    textSize(32);
    text("wave: " + wave, windowWidth/2.2, 32);
    text("lives: " + lives, windowWidth/3.2, 32);
    text("Enemies Left: " + lastEnemy[9], windowWidth/1.7, 32);

}
  if (lastEnemy[9] == 0){
        wave = wave + 1;
    } 
    if (wave == 10){
        waveTen();
    }
function waveTen(){
    background('black'); 
    lastEnemy[1] = 3;
    lastEnemy[2] = 10;
    lastEnemy[3] = 17;
    lastEnemy[4] = 23;
    lastEnemy[5] = 34;
    lastEnemy[6] = 48;
    lastEnemy[7] = 63;
    lastEnemy[8] = 81;
    lastEnemy[9] = 100;

    normalEnemyWaveSpawnCounter[1] = 0;
    normalEnemyWaveSpawnCounter[2] = 0;
    normalEnemyWaveSpawnCounter[3] = 0;
    normalEnemyWaveSpawnCounter[4] = 0;
    normalEnemyWaveSpawnCounter[5] = 0;
    normalEnemyWaveSpawnCounter[6] = 0;
    normalEnemyWaveSpawnCounter[7] = 0;
    normalEnemyWaveSpawnCounter[8] = 0;

    fastEnemyWaveSpawnCounter[1] = 0;
    fastEnemyWaveSpawnCounter[2] = 0;
    fastEnemyWaveSpawnCounter[3] = 0;
    fastEnemyWaveSpawnCounter[4] = 0;
    fastEnemyWaveSpawnCounter[5] = 0;

    playerProjectileMechanics();
    playerMechanics();
    normalEnemyWaveSpawn = "true";
    if (normalEnemyWaveSpawn == "true") {
        normalEnemyWaveSpawnCounter[9]++;
        normalEnemyCount = 11;
        normalEnemySpawn();
    }
    normalEnemyMechanics();
    fastEnemyWaveSpawn = "true";
    if (fastEnemyWaveSpawn == "true"){
    fastEnemyWaveSpawnCounter[6]++;
    fastEnemyCount = 5;
    fastEnemySpawn();
    }
    fastEnemyMechanics();
    
    projectileEnemyOneSpawnFour();
    projectileEnemyOneMechanicsFour();
    
    projectileEnemyTwoSpawnThree();
    projectileEnemyTwoMechanicsThree();
    
    projectileEnemyThreeSpawnTwo();
    projectileEnemyThreeMechanicsTwo();
    
    projectileEnemyFourSpawn();
    projectileEnemyFourMechanics();
    fill(255);
    textSize(32);
    text("wave: " + wave, windowWidth/2.2, 32);
    text("lives: " + lives, windowWidth/3.2, 32);
    text("Enemies Left: " + lastEnemy[10], windowWidth/1.7, 32);

}
  if (lastEnemy[10] == 0){
        wave = wave + 1;
    } 
}

/*******************************************************/
//  END OF APP
/*******************************************************/
