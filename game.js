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

const WAVE_TWO_NORMAL_ENEMY_COUNT = 5;
const WAVE_THREE_NORMAL_ENEMY_COUNT = 7;
const WAVE_FOUR_NORMAL_ENEMY_COUNT = 9;
const WAVE_FIVE_NORMAL_ENEMY_COUNT = 10;
const WAVE_SIX_NORMAL_ENEMY_COUNT = 11;

const WAVE_ONE = 1;
const WAVE_TWO = 2;
const WAVE_THEE = 3;
const WAVE_FOUR = 4;
const WAVE_FIVE = 5;
const WAVE_SIX = 6;
const WAVE_SEVEN = 7;
const WAVE_EIGHT = 8;
const WAVE_NINE = 9;
const WAVE_TEN = 10;

const WAVE_FIVE_FAST_ENEMY_COUNT = 2;
const WAVE_SIX_FAST_ENEMY_COUNT = 4;
const WAVE_SEVEN_FAST_ENEMY_COUNT = 5;

const WALL_WIDTH = 8;
const END_GAME_WAVE = 11;

const END_PROJECTILE_ENEMY_COOLDOWN = -1000;
const PLAYER_VELOCITY = 4;

const PLAYER_SHOOT_COOLDOWN = 75;
const PLAYER_PROJECTILE_DESPAWN_TIMER = 74;

const PLAYER_PROJECTILE_MOVE_TOWARDS_SPEED = 0.01;
const PLAYER_PROJECTILE_SPEED = 5;

const FAST_ENEMY_MOVE_TOWARDS_SPEED = 0.02;
const FAST_ENEMY_SPEED = 6;

const STOP_ENEMY_SPAWN = 1;
const STOP_WAVE_SPAWN_COUNTER = 0;
const PROJECTILE_ENEMY_DESPAWN_TIMER = 0.02;

const PROJECTILE_ENEMY_DESPAWN_TIMER = 0.02;
const PROJECTILE_ENEMY_COOLDOWN_TIMER = 0.02;
const PROJECTILE_ENEMY_COOLDOWN = 2;
const PROJECTILE_ENEMY_DESPAWN = 1.9;

const ENEMY_PROJECTILE_MOVE_TOWARDS_SPEED = 0.01;
const ENEMY_PROJECTILE_ONE_SPEED = 4;
const ENEMY_PROJECTILE_TWO_SPEED = 8;
const ENEMY_PROJECTILE_THREE_SPEED = 12;
const ENEMY_PROJECTILE_FOUR_SPEED = 25;

const NORMAL_ENEMY_SPEED = 3;
const NORMAL_ENEMY_MOVE_TOWARDS_SPEED = 0.01;

const TEXT_SIZE = 32;
const TEXT_POSITION_Y = 32;
const NAME_TEXT_POSITION_Y = 20;
const AGE_TEXT_POSITION_Y = 40;

const LAST_ENEMY_STOP_ENEMY_SPAWN = 121;
var name = sessionStorage.getItem('name');
var age = sessionStorage.getItem('age');

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

	player = new Sprite(windowWidth / 2, windowHeight / 2, PLAYER_WIDTH, PLAYER_HEIGHT, 'k');
	player.color = 'cyan';
	projectile = new Sprite(player.x, player.y, PROJECTILE_WIDTH, 'd');
	projectile.remove();
	projectileGroup = new Group();

	enemyProjectile = new Sprite(0, 0, PROJECTILE_WIDTH, 'd');
	enemyProjectile.remove();
	enemyProjectileGroupOne = new Group();

	enemyProjectileTwo = new Sprite(0, 0, PROJECTILE_WIDTH, 'd');
	enemyProjectileTwo.remove();
	enemyProjectileGroupTwo = new Group();

	enemyProjectileThree = new Sprite(0, 0, PROJECTILE_WIDTH, 'd');
	enemyProjectileThree.remove();
	enemyProjectileGroupThree = new Group();

	enemyProjectileFour = new Sprite(0, 0, PROJECTILE_WIDTH, 'd');
	enemyProjectileFour.remove();
	enemyProjectileGroupFour = new Group();

	wallLH = new Sprite(0, height / 2, WALL_WIDTH, windowHeight, 'k');
	wallRH = new Sprite(windowWidth, windowHeight / 2, WALL_WIDTH, windowHeight, 'k');
	wallTop = new Sprite(0, 0, windowWidth * 2, WALL_WIDTH, 'k');
	wallBot = new Sprite(0, windowHeight, windowWidth * 2, WALL_WIDTH, 'k');
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	gameWaves();
	boundary();
	console.log("Lives: " + lives);
	if (lives == 0) {
		allSprites.remove();
		background('black');
		text("Loading...", windowWidth / 2, windowHeight / 2, 32);
		sessionStorage.setItem('wave', wave);
		window.location = "/html/end_lose.html";
	}
	if (wave == END_GAME_WAVE) {
		allSprites.remove();
		background('black');
		text("Loading...", windowWidth / 2, windowHeight / 2, 32);
		window.location = "/html/end_win.html";
	}
	if (outOfBounds == "true") {
		allSprites.remove();
		background('black');
		text("Loading...", windowWidth / 2, windowHeight / 2, 32);
		sessionStorage.setItem('wave', wave);
		window.location = "/html/end_out_of_bounds.html";
	}

}

function boundary() {
	if (player.y >= wallBot.y) {
		outOfBounds = "true";
	}
	if (player.x >= wallRH.x) {
		outOfBounds = "true";
	}
	if (player.y <= wallTop.y) {
		outOfBounds = "true";
	}
	if (player.x <= wallLH.x) {
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

function projectileHitProjectileEnemy(projectileEnemyOne, projectile) {
	projectileEnemyOne.remove();
	enemyProjectileOneCooldown[1] = END_PROJECTILE_ENEMY_COOLDOWN;
	if (wave == WAVE_EIGHT) {
		enemyProjectileOneCooldown[2] = END_PROJECTILE_ENEMY_COOLDOWN;
	}
	if (wave == WAVE_NINE) {
		enemyProjectileOneCooldown[3] = END_PROJECTILE_ENEMY_COOLDOWN;
	}
	if (wave == WAVE_TEN) {
		enemyProjectileOneCooldown[4] = END_PROJECTILE_ENEMY_COOLDOWN;
	}
	lastEnemy[7]--;
	lastEnemy[8]--;
	lastEnemy[9]--;
	lastEnemy[10]--;
	enemyProjectileGroupOne.removeAll();
	projectile.remove();
}

function playerHitProjectileEnemy(projectileEnemyOne, player) {
	lives--;
}

function playerHitProjectileEnemyTwo(projectileEnemyTwo, player) {
	lives--;
}

function playerHitProjectileEnemyThree(projectileEnemyThree, player) {
	lives--;
}

function playerHitProjectileEnemyFour(projectileEnemyFour, player) {
	lives--;
}

function projectileHitProjectileEnemyTwo(projectileEnemyTwo, projectile) {
	projectileEnemyTwo.remove();
	enemyProjectileTwoCooldown[1] = END_PROJECTILE_ENEMY_COOLDOWN;
	if (wave == WAVE_NINE) {
		enemyProjectileTwoCooldown[2] = END_PROJECTILE_ENEMY_COOLDOWN;
	}
	if (wave == WAVE_TEN) {
		enemyProjectileTwoCooldown[3] = END_PROJECTILE_ENEMY_COOLDOWN;
	}
	lastEnemy[8]--;
	lastEnemy[9]--;
	lastEnemy[10]--;
	enemyProjectileGroupTwo.removeAll();
	projectile.remove();
}

function projectileHitProjectileEnemyThree(projectileEnemyThree, projectile) {
	projectileEnemyThree.remove();
	enemyProjectileThreeCooldown[1] = END_PROJECTILE_ENEMY_COOLDOWN;
	if (wave == 10) {
		enemyProjectileThreeCooldown[2] = END_PROJECTILE_ENEMY_COOLDOWN;
	}
	lastEnemy[9]--;
	lastEnemy[10]--;
	enemyProjectileGroupThree.removeAll();
	projectile.remove();
}

function projectileHitProjectileEnemyFour(projectileEnemyFour, projectile) {
	projectileEnemyFour.remove();
	enemyProjectileFourCooldown = END_PROJECTILE_ENEMY_COOLDOWN;
	lastEnemy[10]--;
	enemyProjectileGroupFour.removeAll();
	projectile.remove();
}

function playerMechanics() {
	document.addEventListener("keydown", function(event) {
		if (event.code === 'KeyA') {
			player.vel.x = -PLAYER_VELOCITY;
		} else if (event.code === 'KeyD')
			player.vel.x = PLAYER_VELOCITY;
	});

	document.addEventListener("keyup", function(event) {
		if (event.code === 'KeyA') {
			player.vel.x = 0;
		} else if (event.code === 'KeyD')
			player.vel.x = 0;
	});

	document.addEventListener("keydown", function(event) {
		if (event.code === 'KeyW') {
			player.vel.y = -PLAYER_VELOCITY;
		} else if (event.code === 'KeyS')
			player.vel.y = PLAYER_VELOCITY;
	});

	document.addEventListener("keyup", function(event) {
		if (event.code === 'KeyW') {
			player.vel.y = 0;
		} else if (event.code === 'KeyS')
			player.vel.y = 0;
	});



}

function playerSpawn() {
	player = new Sprite(windowWidth / 2, windowHeight / 2, PLAYER_WIDTH, PLAYER_HEIGHT, 'k');
	player.color = 'cyan';
}

function playerProjectileMechanics() {
	if (mouse.presses() & frameCount > PLAYER_SHOOT_COOLDOWN) {
		projectile = new Sprite(player.x, player.y, PROJECTILE_WIDTH, PROJECTILE_HEIGHT, 'k');
		projectile.color = 'cyan';
		projectile.moveTowards(mouseX, mouseY, PLAYER_PROJECTILE_MOVE_TOWARDS_SPEED);
		projectileGroup.add(projectile);
		frameCount = frameCount - frameCount;
		projectile.speed = PLAYER_PROJECTILE_SPEED;

	}
	if (frameCount > PLAYER_PROJECTILE_DESPAWN_TIMER) {
		projectileGroup.removeAll();

	}
}

function fastEnemySpawn() {
	if (fastEnemyWaveSpawnCounter[1] > STOP_ENEMY_SPAWN) {
		return (fastEnemySpawn);
	}
	if (fastEnemyWaveSpawnCounter[2] > STOP_ENEMY_SPAWN) {
		return (fastEnemySpawn);
	}
	if (fastEnemyWaveSpawnCounter[3] > STOP_ENEMY_SPAWN) {
		return (fastEnemySpawn);
	}
	if (fastEnemyWaveSpawnCounter[4] > STOP_ENEMY_SPAWN) {
		return (fastEnemySpawn);
	}
	if (fastEnemyWaveSpawnCounter[5] > STOP_ENEMY_SPAWN) {
		return (fastEnemySpawn);
	}
	if (fastEnemyWaveSpawnCounter[6] > STOP_ENEMY_SPAWN) {
		return (fastEnemySpawn);
	}
	for (i = 0; i < fastEnemyCount; i++) {
		var randomNumberThree = wallRH.x - windowWidth / 7;
		var randomNumberFour = Math.random() * windowHeight;

		fastEnemies[i] = new Sprite(randomNumberThree, randomNumberFour, ENEMY_WIDTH, 'd');
		fastEnemies[i].color = 'orange';
		fastEnemyWaveSpawn = "false";
	}
}

function fastEnemyMechanics() {
	for (i = 0; i < fastEnemyCount; i++) {
		fastEnemies[i].moveTowards(player.x, player.y, FAST_ENEMY_MOVE_TOWARDS_SPEED)
		fastEnemies[i].speed = FAST_ENEMY_SPEED;
		fastEnemies[i].collide(projectile, projectile_Hit_Fast_Enemy)
		fastEnemies[i].overlaps(player, fastEnemyHitPlayer)

	}
}

function projectileEnemyOneSpawn() {
	if (projectileEnemyOneSpawnCounter[1] > STOP_ENEMY_SPAWN) {
		return (projectileEnemyOneSpawn);
	}

	projectileEnemyOne = new Sprite(wallLH.x + ENEMY_WIDTH, wallTop.y + ENEMY_WIDTH, ENEMY_WIDTH, 'd');
	projectileEnemyOne.color = 'yellow';
	projectileEnemyOneSpawnCounter[1]++;
}

function projectileEnemyOneSpawnTwo() {
	if (projectileEnemyOneSpawnCounter[2] > STOP_ENEMY_SPAWN) {
		return (projectileEnemyOneSpawnTwo);
	}
	projectileEnemyOne = new Sprite(wallLH.x + ENEMY_WIDTH, wallTop.y + ENEMY_WIDTH, ENEMY_WIDTH, 'd');
	projectileEnemyOne.color = 'yellow';
	projectileEnemyOneSpawnCounter[2]++;
}

function projectileEnemyOneSpawnThree() {
	if (projectileEnemyOneSpawnCounter[3] > STOP_ENEMY_SPAWN) {
		return (projectileEnemyOneSpawnThree);
	}
	projectileEnemyOne = new Sprite(wallLH.x + ENEMY_WIDTH, wallTop.y + ENEMY_WIDTH, ENEMY_WIDTH, 'd');
	projectileEnemyOne.color = 'yellow';
	projectileEnemyOneSpawnCounter[3]++;
}

function projectileEnemyOneSpawnFour() {
	if (projectileEnemyOneSpawnCounter[4] > STOP_ENEMY_SPAWN) {
		return (projectileEnemyOneSpawnFour);
	}
	projectileEnemyOne = new Sprite(wallLH.x + ENEMY_WIDTH, wallTop.y + ENEMY_WIDTH, ENEMY_WIDTH, 'd');
	projectileEnemyOne.color = 'yellow';
	projectileEnemyOneSpawnCounter[4]++;
}

function projectileEnemyTwoSpawn() {
	if (projectileEnemyTwoSpawnCounter[1] > STOP_ENEMY_SPAWN) {
		return (projectileEnemyTwoSpawn);
	}
	projectileEnemyTwo = new Sprite(wallRH.x - ENEMY_WIDTH, wallTop.y + ENEMY_WIDTH, ENEMY_WIDTH, 'd');
	projectileEnemyTwo.color = 'yellow';
	projectileEnemyTwoSpawnCounter[1]++;
}

function projectileEnemyTwoSpawnTwo() {
	if (projectileEnemyTwoSpawnCounter[2] > STOP_ENEMY_SPAWN) {
		return (projectileEnemyTwoSpawn);
	}
	projectileEnemyTwo = new Sprite(wallRH.x - ENEMY_WIDTH, wallTop.y + ENEMY_WIDTH, ENEMY_WIDTH, 'd');
	projectileEnemyTwo.color = 'yellow';
	projectileEnemyTwoSpawnCounter[2]++;
}

function projectileEnemyTwoSpawnThree() {
	if (projectileEnemyTwoSpawnCounter[3] > STOP_ENEMY_SPAWN) {
		return (projectileEnemyTwoSpawnThree);
	}
	projectileEnemyTwo = new Sprite(wallRH.x - ENEMY_WIDTH, wallTop.y + ENEMY_WIDTH, ENEMY_WIDTH, 'd');
	projectileEnemyTwo.color = 'yellow';
	projectileEnemyTwoSpawnCounter[3]++;
}

function projectileEnemyThreeSpawn() {
	if (projectileEnemyThreeSpawnCounter[1] > STOP_ENEMY_SPAWN) {
		return (projectileEnemyThreeSpawn);
	}
	projectileEnemyThree = new Sprite(wallLH.x + ENEMY_WIDTH, wallBot.y - ENEMY_WIDTH, ENEMY_WIDTH, 'd');
	projectileEnemyThree.color = 'yellow';
	projectileEnemyThreeSpawnCounter[1]++;
}

function projectileEnemyThreeSpawnTwo() {
	if (projectileEnemyThreeSpawnCounter[2] > STOP_ENEMY_SPAWN) {
		return (projectileEnemyThreeSpawnTwo);
	}
	projectileEnemyThree = new Sprite(wallLH.x + ENEMY_WIDTH, wallBot.y - ENEMY_WIDTH, ENEMY_WIDTH, 'd');
	projectileEnemyThree.color = 'yellow';
	projectileEnemyThreeSpawnCounter[2]++;
}

function projectileEnemyFourSpawn() {
	if (projectileEnemyFourSpawnCounter > STOP_ENEMY_SPAWN) {
		return (projectileEnemyFourSpawn);
	}
	projectileEnemyFour = new Sprite(wallRH.x - ENEMY_WIDTH, wallBot.y - ENEMY_WIDTH, ENEMY_WIDTH, 'd');
	projectileEnemyFour.color = 'yellow';
	projectileEnemyFourSpawnCounter++;
}

function projectileEnemyOneMechanics() {
	enemyProjectileOneDespawn[1] = enemyProjectileOneDespawn[1] + PROJECTILE_ENEMY_DESPAWN_TIMER;
	enemyProjectileOneCooldown[1] = enemyProjectileOneCooldown[1] + PROJECTILE_ENEMY_COOLDOWN_TIMER;
	if (enemyProjectileOneCooldown[1] > PROJECTILE_ENEMY_COOLDOWN) {
		enemyProjectileOneCooldown[1] = enemyProjectileOneCooldown[1] - enemyProjectileOneCooldown[1];
		enemyProjectile = new Sprite(projectileEnemyOne.x + ENEMY_WIDTH, projectileEnemyOne.y + ENEMY_WIDTH, PROJECTILE_WIDTH, 'd');
		enemyProjectile.color = 'yellow';
		enemyProjectileGroupOne.add(enemyProjectile)
		enemyProjectile.moveTowards(player.x, player.y, ENEMY_PROJECTILE_MOVE_TOWARDS_SPEED);
		enemyProjectile.speed = ENEMY_PROJECTILE_ONE_SPEED;
		enemyProjectileOneDespawn[1] = enemyProjectileOneDespawn[1] - enemyProjectileOneDespawn[1];

	}
	projectileEnemyOne.collide(projectile, projectileHitProjectileEnemy)
	enemyProjectile.collide(player, enemyProjectileHitPlayer)
	player.overlaps(projectileEnemyOne, playerHitProjectileEnemy);

	if (enemyProjectileOneDespawn[1] > PROJECTILE_ENEMY_DESPAWN) {
		enemyProjectileGroupOne.removeAll();
	}
}

function projectileEnemyOneMechanicsTwo() {
	enemyProjectileOneDespawn[2] = enemyProjectileOneDespawn[2] + PROJECTILE_ENEMY_DESPAWN_TIMER;
	enemyProjectileOneCooldown[2] = enemyProjectileOneCooldown[2] + PROJECTILE_ENEMY_COOLDOWN_TIMER;
	if (enemyProjectileOneCooldown[2] > PROJECTILE_ENEMY_COOLDOWN) {
		enemyProjectileOneCooldown[2] = enemyProjectileOneCooldown[2] - enemyProjectileOneCooldown[2];
		enemyProjectile = new Sprite(projectileEnemyOne.x + ENEMY_WIDTH, projectileEnemyOne.y + ENEMY_WIDTH, PROJECTILE_WIDTH, 'd');
		enemyProjectile.color = 'yellow';
		enemyProjectileGroupOne.add(enemyProjectile)
		enemyProjectile.moveTowards(player.x, player.y, ENEMY_PROJECTILE_MOVE_TOWARDS_SPEED);
		enemyProjectile.speed = ENEMY_PROJECTILE_ONE_SPEED;
		enemyProjectileOneDespawn[2] = enemyProjectileOneDespawn[2] - enemyProjectileOneDespawn[2];

	}
	projectileEnemyOne.collide(projectile, projectileHitProjectileEnemy)
	enemyProjectile.collide(player, enemyProjectileHitPlayer)
	player.overlaps(projectileEnemyOne, playerHitProjectileEnemy);

	if (enemyProjectileOneDespawn[2] > PROJECTILE_ENEMY_DESPAWN) {
		enemyProjectileGroupOne.removeAll();
	}
}

function projectileEnemyOneMechanicsThree() {
	enemyProjectileOneDespawn[3] = enemyProjectileOneDespawn[3] + PROJECTILE_ENEMY_DESPAWN_TIMER;
	enemyProjectileOneCooldown[3] = enemyProjectileOneCooldown[3] + PROJECTILE_ENEMY_COOLDOWN_TIMER;
	if (enemyProjectileOneCooldown[3] > PROJECTILE_ENEMY_COOLDOWN) {
		enemyProjectileOneCooldown[3] = enemyProjectileOneCooldown[3] - enemyProjectileOneCooldown[3];
		enemyProjectile = new Sprite(projectileEnemyOne.x + ENEMY_WIDTH, projectileEnemyOne.y + ENEMY_WIDTH, PROJECTILE_WIDTH, 'd');
		enemyProjectile.color = 'yellow';
		enemyProjectileGroupOne.add(enemyProjectile)
		enemyProjectile.moveTowards(player.x, player.y, ENEMY_PROJECTILE_MOVE_TOWARDS_SPEED);
		enemyProjectile.speed = ENEMY_PROJECTILE_ONE_SPEED;
		enemyProjectileOneDespawn[3] = enemyProjectileOneDespawn[3] - enemyProjectileOneDespawn[3];

	}
	projectileEnemyOne.collide(projectile, projectileHitProjectileEnemy)
	enemyProjectile.collide(player, enemyProjectileHitPlayer)
	player.overlaps(projectileEnemyOne, playerHitProjectileEnemy);

	if (enemyProjectileOneDespawn[3] > PROJECTILE_ENEMY_DESPAWN) {
		enemyProjectileGroupOne.removeAll();
	}
}

function projectileEnemyOneMechanicsFour() {
	enemyProjectileOneDespawn[4] = enemyProjectileOneDespawn[4] + PROJECTILE_ENEMY_DESPAWN_TIMER;
	enemyProjectileOneCooldown[4] = enemyProjectileOneCooldown[4] + PROJECTILE_ENEMY_COOLDOWN_TIMER;
	if (enemyProjectileOneCooldown[4] > PROJECTILE_ENEMY_COOLDOWN) {
		enemyProjectileOneCooldown[4] = enemyProjectileOneCooldown[4] - enemyProjectileOneCooldown[4];
		enemyProjectile = new Sprite(projectileEnemyOne.x + ENEMY_WIDTH, projectileEnemyOne.y + ENEMY_WIDTH, PROJECTILE_WIDTH, 'd');
		enemyProjectile.color = 'yellow';
		enemyProjectileGroupOne.add(enemyProjectile)
		enemyProjectile.moveTowards(player.x, player.y, ENEMY_PROJECTILE_MOVE_TOWARDS_SPEED);
		enemyProjectile.speed = ENEMY_PROJECTILE_ONE_SPEED;
		enemyProjectileOneDespawn[4] = enemyProjectileOneDespawn[4] - enemyProjectileOneDespawn[4];

	}
	projectileEnemyOne.collide(projectile, projectileHitProjectileEnemy)
	player.overlaps(projectileEnemyOne, playerHitProjectileEnemy);

	if (enemyProjectileOneDespawn[4] > PROJECTILE_ENEMY_DESPAWN) {
		enemyProjectileGroupOne.removeAll();
	}
}

function projectileEnemyTwoMechanics() {
	enemyProjectileTwoDespawn[1] = enemyProjectileTwoDespawn[1] + PROJECTILE_ENEMY_DESPAWN_TIMER;
	enemyProjectileTwoCooldown[1] = enemyProjectileTwoCooldown[1] + PROJECTILE_ENEMY_COOLDOWN_TIMER;
	if (enemyProjectileTwoCooldown[1] > PROJECTILE_ENEMY_COOLDOWN) {
		enemyProjectileTwoCooldown[1] = enemyProjectileTwoCooldown[1] - enemyProjectileTwoCooldown[1];
		enemyProjectileTwo = new Sprite(projectileEnemyTwo.x - ENEMY_WIDTH, projectileEnemyTwo.y + ENEMY_WIDTH, PROJECTILE_WIDTH, 'd');
		enemyProjectileTwo.color = 'yellow';
		enemyProjectileGroupTwo.add(enemyProjectileTwo)
		enemyProjectileTwo.moveTowards(player.x, player.y, ENEMY_PROJECTILE_MOVE_TOWARDS_SPEED);
		enemyProjectileTwo.speed = ENEMY_PROJECTILE_TWO_SPEED;
		enemyProjectileTwoDespawn[1] = enemyProjectileTwoDespawn[1] - enemyProjectileTwoDespawn[1];

	}
	projectileEnemyTwo.collide(projectile, projectileHitProjectileEnemyTwo)
	enemyProjectileTwo.collide(player, enemyProjectileHitPlayer)
	player.overlaps(projectileEnemyTwo, playerHitProjectileEnemyTwo);

	if (enemyProjectileTwoDespawn[1] > PROJECTILE_ENEMY_DESPAWN) {
		enemyProjectileGroupTwo.removeAll();
	}
}

function projectileEnemyTwoMechanicsTwo() {
	enemyProjectileTwoDespawn[2] = enemyProjectileTwoDespawn[2] + PROJECTILE_ENEMY_DESPAWN_TIMER;
	enemyProjectileTwoCooldown[2] = enemyProjectileTwoCooldown[2] + PROJECTILE_ENEMY_COOLDOWN_TIMER;
	if (enemyProjectileTwoCooldown[2] > PROJECTILE_ENEMY_COOLDOWN) {
		enemyProjectileTwoCooldown[2] = enemyProjectileTwoCooldown[2] - enemyProjectileTwoCooldown[2];
		enemyProjectileTwo = new Sprite(projectileEnemyTwo.x - ENEMY_WIDTH, projectileEnemyTwo.y + ENEMY_WIDTH, PROJECTILE_WIDTH, 'd');
		enemyProjectileTwo.color = 'yellow';
		enemyProjectileGroupTwo.add(enemyProjectileTwo)
		enemyProjectileTwo.moveTowards(player.x, player.y, ENEMY_PROJECTILE_MOVE_TOWARDS_SPEED);
		enemyProjectileTwo.speed = ENEMY_PROJECTILE_TWO_SPEED;
		enemyProjectileTwoDespawn[2] = enemyProjectileTwoDespawn[2] - enemyProjectileTwoDespawn[2];

	}
	projectileEnemyTwo.collide(projectile, projectileHitProjectileEnemyTwo)
	enemyProjectileTwo.collide(player, enemyProjectileHitPlayer)
	player.overlaps(projectileEnemyTwo, playerHitProjectileEnemyTwo);

	if (enemyProjectileTwoDespawn[2] > PROJECTILE_ENEMY_DESPAWN) {
		enemyProjectileGroupTwo.removeAll();
	}
}

function projectileEnemyTwoMechanicsThree() {
	enemyProjectileTwoDespawn[3] = enemyProjectileTwoDespawn[3] + PROJECTILE_ENEMY_DESPAWN_TIMER;
	enemyProjectileTwoCooldown[3] = enemyProjectileTwoCooldown[3] + PROJECTILE_ENEMY_COOLDOWN_TIMER;
	if (enemyProjectileTwoCooldown[3] > PROJECTILE_ENEMY_COOLDOWN) {
		enemyProjectileTwoCooldown[3] = enemyProjectileTwoCooldown[3] - enemyProjectileTwoCooldown[3];
		enemyProjectileTwo = new Sprite(projectileEnemyTwo.x - ENEMY_WIDTH, projectileEnemyTwo.y + ENEMY_WIDTH, PROJECTILE_WIDTH, 'd');
		enemyProjectileTwo.color = 'yellow';
		enemyProjectileGroupTwo.add(enemyProjectileTwo)
		enemyProjectileTwo.moveTowards(player.x, player.y, ENEMY_PROJECTILE_MOVE_TOWARDS_SPEED);
		enemyProjectileTwo.speed = ENEMY_PROJECTILE_TWO_SPEED;
		enemyProjectileTwoDespawn[3] = enemyProjectileTwoDespawn[3] - enemyProjectileTwoDespawn[3];

	}
	projectileEnemyTwo.collide(projectile, projectileHitProjectileEnemyTwo)
	enemyProjectileTwo.collide(player, enemyProjectileHitPlayer)
	player.overlaps(projectileEnemyTwo, playerHitProjectileEnemyTwo);

	if (enemyProjectileTwoDespawn[3] > PROJECTILE_ENEMY_DESPAWN) {
		enemyProjectileGroupTwo.removeAll();
	}
}

function projectileEnemyThreeMechanics() {
	console.log(projectileEnemyThree.y);
	enemyProjectileThreeDespawn[1] = enemyProjectileThreeDespawn[1] + PROJECTILE_ENEMY_DESPAWN_TIMER;
	enemyProjectileThreeCooldown[1] = enemyProjectileThreeCooldown[1] + PROJECTILE_ENEMY_COOLDOWN_TIMER;
	if (enemyProjectileThreeCooldown[1] > PROJECTILE_ENEMY_COOLDOWN) {
		enemyProjectileThreeCooldown[1] = enemyProjectileThreeCooldown[1] - enemyProjectileThreeCooldown[1];
		enemyProjectileThree = new Sprite(projectileEnemyThree.x + ENEMY_WIDTH, projectileEnemyThree.y - ENEMY_WIDTH, PROJECTILE_WIDTH, 'd');
		enemyProjectileThree.color = 'yellow';
		enemyProjectileGroupThree.add(enemyProjectileThree)
		enemyProjectileThree.moveTowards(player.x, player.y, ENEMY_PROJECTILE_MOVE_TOWARDS_SPEED);
		enemyProjectileThree.speed = ENEMY_PROJECTILE_THREE_SPEED;
		enemyProjectileThreeDespawn[1] = enemyProjectileThreeDespawn[1] - enemyProjectileThreeDespawn[1];

	}
	projectileEnemyThree.collide(projectile, projectileHitProjectileEnemyThree)
	enemyProjectileThree.collide(player, enemyProjectileHitPlayer)
	player.overlaps(projectileEnemyThree, playerHitProjectileEnemyThree);

	if (enemyProjectileThreeDespawn[1] > PROJECTILE_ENEMY_DESPAWN) {
		enemyProjectileGroupThree.removeAll();
	}
}

function projectileEnemyThreeMechanicsTwo() {
	enemyProjectileThreeDespawn[2] = enemyProjectileThreeDespawn[2] + PROJECTILE_ENEMY_DESPAWN_TIMER;
	enemyProjectileThreeCooldown[2] = enemyProjectileThreeCooldown[2] + PROJECTILE_ENEMY_COOLDOWN_TIMER;
	if (enemyProjectileThreeCooldown[2] > PROJECTILE_ENEMY_COOLDOWN) {
		enemyProjectileThreeCooldown[2] = enemyProjectileThreeCooldown[2] - enemyProjectileThreeCooldown[2];
		enemyProjectileThree = new Sprite(projectileEnemyThree.x + ENEMY_WIDTH, projectileEnemyThree.y - ENEMY_WIDTH, PROJECTILE_WIDTH, 'd');
		enemyProjectileThree.color = 'yellow';
		enemyProjectileGroupThree.add(enemyProjectileThree)
		enemyProjectileThree.moveTowards(player.x, player.y, ENEMY_PROJECTILE_MOVE_TOWARDS_SPEED);
		enemyProjectileThree.speed = ENEMY_PROJECTILE_THREE_SPEED;
		enemyProjectileThreeDespawn[2] = enemyProjectileThreeDespawn[2] - enemyProjectileThreeDespawn[2];

	}
	projectileEnemyThree.collide(projectile, projectileHitProjectileEnemyThree)
	enemyProjectileThree.collide(player, enemyProjectileHitPlayer)
	player.overlaps(projectileEnemyThree, playerHitProjectileEnemyThree);

	if (enemyProjectileThreeDespawn[2] > PROJECTILE_ENEMY_DESPAWN) {
		enemyProjectileGroupThree.removeAll();
	}
}

function projectileEnemyFourMechanics() {
	enemyProjectileFourDespawn = enemyProjectileFourDespawn + PROJECTILE_ENEMY_DESPAWN_TIMER;
	enemyProjectileFourCooldown = enemyProjectileFourCooldown + PROJECTILE_ENEMY_COOLDOWN_TIMER;
	if (enemyProjectileFourCooldown > PROJECTILE_ENEMY_COOLDOWN) {
		enemyProjectileFourCooldown = enemyProjectileFourCooldown - enemyProjectileFourCooldown;
		enemyProjectileFour = new Sprite(projectileEnemyFour.x - ENEMY_WIDTH, projectileEnemyFour.y - ENEMY_WIDTH, PROJECTILE_WIDTH, 'd');
		enemyProjectileFour.color = 'yellow';
		enemyProjectileGroupFour.add(enemyProjectileFour)
		enemyProjectileFour.moveTowards(player.x, player.y, ENEMY_PROJECTILE_MOVE_TOWARDS_SPEED);
		enemyProjectileFour.speed = ENEMY_PROJECTILE_FOUR_SPEED;
		enemyProjectileFourDespawn = enemyProjectileFourDespawn - enemyProjectileFourDespawn;

	}
	projectileEnemyFour.collide(projectile, projectileHitProjectileEnemyFour)
	enemyProjectileFour.collide(player, enemyProjectileHitPlayer)
	player.overlaps(projectileEnemyFour, playerHitProjectileEnemyFour);

	if (enemyProjectileFourDespawn > PROJECTILE_ENEMY_DESPAWN) {
		enemyProjectileGroupFour.removeAll();
	}
}

function normalEnemySpawn() {
	if (normalEnemyWaveSpawnCounter[1] > STOP_ENEMY_SPAWN) {
		return (normalEnemySpawn);
	}
	if (normalEnemyWaveSpawnCounter[2] > STOP_ENEMY_SPAWN) {
		return (normalEnemySpawn);
	}
	if (normalEnemyWaveSpawnCounter[3] > STOP_ENEMY_SPAWN) {
		return (normalEnemySpawn);
	}
	if (normalEnemyWaveSpawnCounter[4] > STOP_ENEMY_SPAWN) {
		return (normalEnemySpawn);
	}
	if (normalEnemyWaveSpawnCounter[5] > STOP_ENEMY_SPAWN) {
		return (normalEnemySpawn);
	}
	if (normalEnemyWaveSpawnCounter[6] > STOP_ENEMY_SPAWN) {
		return (normalEnemySpawn);
	}
	if (normalEnemyWaveSpawnCounter[7] > STOP_ENEMY_SPAWN) {
		return (normalEnemySpawn);
	}
	if (normalEnemyWaveSpawnCounter[8] > STOP_ENEMY_SPAWN) {
		return (normalEnemySpawn);
	}
	if (normalEnemyWaveSpawnCounter[9] > STOP_ENEMY_SPAWN) {
		return (normalEnemySpawn);
	}

	for (i = 0; i < normalEnemyCount; i++) {
		var randomNumber = Math.random() * windowWidth / 7 + ENEMY_WIDTH;
		var randomNumberTwo = (Math.random() * windowHeight);

		normalEnemies[i] = new Sprite(randomNumber, randomNumberTwo, ENEMY_WIDTH, 'd');
		normalEnemies[i].color = 'red';
		normalEnemyWaveSpawn = "false";

	}
}

function normalEnemyMechanics() {
	for (i = 0; i < normalEnemyCount; i++) {
		normalEnemies[i].moveTowards(player.x, player.y, NORMAL_ENEMY_MOVE_TOWARDS_SPEED)
		normalEnemies[i].speed = NORMAL_ENEMY_SPEED;
		normalEnemies[i].collide(projectile, projectileHitNormalEnemy)
		normalEnemies[i].overlaps(player, normalEnemyHitPlayer)

	}
}

function gameWaves() {
	if (wave == WAVE_ONE) {
		waveOne();
	}

	function waveOne() {
		background('black');
		playerMechanics();
		playerProjectileMechanics();
		if (normalEnemyWaveSpawn == "true") {
			normalEnemySpawn();
		}
		normalEnemyMechanics();
		fill(255);
		textSize(14);
		text("Username: " + name, windowWidth / 6, NAME_TEXT_POSITION_Y);
		text("Age: " + age, windowWidth / 6, AGE_TEXT_POSITION_Y);

		textSize(32);
		text("wave: " + wave, windowWidth / 2.2, TEXT_POSITION_Y);
		text("lives: " + lives, windowWidth / 3.2, TEXT_POSITION_Y);
		text("Enemies Left: " + lastEnemy[1], windowWidth / 1.7, TEXT_POSITION_Y);

	}
	if (lastEnemy[1] == 0) {
		wave++;
	}
	
	if (wave == WAVE_TWO) {
		waveTwo();
	}

	function waveTwo() {
		background('black');
		lastEnemy[1] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		playerMechanics();
		playerProjectileMechanics();
		normalEnemyWaveSpawn = "true";
		if (normalEnemyWaveSpawn == "true") {
			normalEnemyWaveSpawnCounter[1]++;
			normalEnemyCount = WAVE_TWO_NORMAL_ENEMY_COUNT;
			normalEnemySpawn();
		}
		normalEnemyMechanics();
		fill(255);
		textSize(14);
		text("Username: " + name, windowWidth / 6, NAME_TEXT_POSITION_Y);
		text("Age: " + age, windowWidth / 6, AGE_TEXT_POSITION_Y);

		textSize(32);
		text("wave: " + wave, windowWidth / 2.2, TEXT_POSITION_Y);
		text("lives: " + lives, windowWidth / 3.2, TEXT_POSITION_Y);
		text("Enemies Left: " + lastEnemy[2], windowWidth / 1.7, TEXT_POSITION_Y);
	}
	if (lastEnemy[2] == 0) {
		wave++;
	}
	
	if (wave == WAVE_THREE) {
		waveThree();
	}

	function waveThree() {
		background('black');
		lastEnemy[1] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[2] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		playerMechanics();
		playerProjectileMechanics();
		normalEnemyWaveSpawnCounter[1] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawn = "true";
		if (normalEnemyWaveSpawn == "true") {
			normalEnemyWaveSpawnCounter[2]++;
			normalEnemyCount = WAVE_THREE_NORMAL_ENEMY_COUNT;
			normalEnemySpawn();

		}
		normalEnemyMechanics();
		fill(255);
		textSize(14);
		text("Username: " + name, windowWidth / 6, NAME_TEXT_POSITION_Y);
		text("Age: " + age, windowWidth / 6, AGE_TEXT_POSITION_Y);

		textSize(32);
		text("wave: " + wave, windowWidth / 2.2, TEXT_POSITION_Y);
		text("lives: " + lives, windowWidth / 3.2, TEXT_POSITION_Y);
		text("Enemies Left: " + lastEnemy[3], windowWidth / 1.7, TEXT_POSITION_Y);

	}

	if (lastEnemy[3] == 0) {
		wave++;
	}
	
	if (wave == WAVE_FOUR) {
		waveFour();
	}

	function waveFour() {
		background('black');
		lastEnemy[1] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[2] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[3] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		normalEnemyWaveSpawnCounter[1] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[2] = STOP_WAVE_SPAWN_COUNTER;
		playerProjectileMechanics();
		playerMechanics();
		normalEnemyWaveSpawn = "true";
		if (normalEnemyWaveSpawn == "true") {
			normalEnemyWaveSpawnCounter[3]++;
			normalEnemyCount = WAVE_THREE_NORMAL_ENEMY_COUNT;
			normalEnemySpawn();
		}
		normalEnemyMechanics();

		if (fastEnemyWaveSpawn == "true") {
			fastEnemySpawn();
		}
		fastEnemyMechanics();

		fill(255);
		textSize(14);
		text("Username: " + name, windowWidth / 6, NAME_TEXT_POSITION_Y);
		text("Age: " + age, windowWidth / 6, AGE_TEXT_POSITION_Y);

		textSize(32);
		text("wave: " + wave, windowWidth / 2.2, TEXT_POSITION_Y);
		text("lives: " + lives, windowWidth / 3.2, TEXT_POSITION_Y);
		text("Enemies Left: " + lastEnemy[4], windowWidth / 1.7, TEXT_POSITION_Y);


	}
	
	if (lastEnemy[4] == 0) {
		wave++;
	}
	
	if (wave == WAVE_FIVE) {
		waveFive();
	}

	function waveFive() {
		background('black');
		lastEnemy[1] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[2] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[3] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[4] = LAST_ENEMY_STOP_ENEMY_SPAWN;

		normalEnemyWaveSpawnCounter[1] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[2] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[3] = STOP_WAVE_SPAWN_COUNTER;

		playerProjectileMechanics();
		playerMechanics();
		normalEnemyWaveSpawn = "true";
		if (normalEnemyWaveSpawn == "true") {
			normalEnemyWaveSpawnCounter[4]++;
			normalEnemyCount = WAVE_FOUR_NORMAL_ENEMY_COUNT;
			normalEnemySpawn();
		}
		normalEnemyMechanics();
		fastEnemyWaveSpawn = "true";
		if (fastEnemyWaveSpawn == "true") {
			fastEnemyWaveSpawnCounter[1]++;
			fastEnemyCount = WAVE_FIVE_FAST_ENEMY_COUNT;
			fastEnemySpawn();
		}
		fastEnemyMechanics();

		fill(255);
		textSize(14);
		text("Username: " + name, windowWidth / 6, NAME_TEXT_POSITION_Y);
		text("Age: " + age, windowWidth / 6, AGE_TEXT_POSITION_Y);

		textSize(32);
		text("wave: " + wave, windowWidth / 2.2, TEXT_POSITION_Y);
		text("lives: " + lives, windowWidth / 3.2, TEXT_POSITION_Y);
		text("Enemies Left: " + lastEnemy[5], windowWidth / 1.7, TEXT_POSITION_Y);


	}
	
	if (lastEnemy[5] == 0) {
		wave++;
	}
	
	if (wave == WAVE_SIX) {
		waveSix();
	}

	function waveSix() {
		background('black');
		lastEnemy[1] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[2] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[3] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[4] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[5] = LAST_ENEMY_STOP_ENEMY_SPAWN;

		normalEnemyWaveSpawnCounter[1] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[2] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[3] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[4] = STOP_WAVE_SPAWN_COUNTER;

		fastEnemyWaveSpawnCounter[1] = STOP_WAVE_SPAWN_COUNTER;

		playerProjectileMechanics();
		playerMechanics();
		normalEnemyWaveSpawn = "true";
		if (normalEnemyWaveSpawn == "true") {
			normalEnemyWaveSpawnCounter[5]++;
			normalEnemyCount = WAVE_FIVE_NORMAL_ENEMY_COUNT;
			normalEnemySpawn();
		}
		normalEnemyMechanics();
		fastEnemyWaveSpawn = "true";
		if (fastEnemyWaveSpawn == "true") {
			fastEnemyWaveSpawnCounter[2]++;
			fastEnemyCount = WAVE_FIVE_FAST_ENEMY_COUNT;
			fastEnemySpawn();
		}
		fastEnemyMechanics();


		fill(255);
		textSize(14);
		text("Username: " + name, windowWidth / 6, NAME_TEXT_POSITION_Y);
		text("Age: " + age, windowWidth / 6, AGE_TEXT_POSITION_Y);

		textSize(32);
		text("wave: " + wave, windowWidth / 2.2, TEXT_POSITION_Y);
		text("lives: " + lives, windowWidth / 3.2, TEXT_POSITION_Y);
		text("Enemies Left: " + lastEnemy[6], windowWidth / 1.7, TEXT_POSITION_Y);

	}
	
	if (lastEnemy[6] == 0) {
		wave++;
	}
	
	if (wave == WAVE_SEVEN) {
		waveSeven();
	}


	function waveSeven() {
		background('black');
		lastEnemy[1] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[2] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[3] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[4] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[5] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[6] = LAST_ENEMY_STOP_ENEMY_SPAWN;

		normalEnemyWaveSpawnCounter[1] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[2] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[3] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[4] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[5] = STOP_WAVE_SPAWN_COUNTER;

		fastEnemyWaveSpawnCounter[1] = STOP_WAVE_SPAWN_COUNTER;
		fastEnemyWaveSpawnCounter[2] = STOP_WAVE_SPAWN_COUNTER;

		playerProjectileMechanics();
		playerMechanics();
		normalEnemyWaveSpawn = "true";
		if (normalEnemyWaveSpawn == "true") {
			normalEnemyWaveSpawnCounter[6]++;
			normalEnemyCount = WAVE_FIVE_NORMAL_ENEMY_COUNT;
			normalEnemySpawn();
		}
		normalEnemyMechanics();
		fastEnemyWaveSpawn = "true";
		if (fastEnemyWaveSpawn == "true") {
			fastEnemyWaveSpawnCounter[3]++;
			fastEnemyCount = WAVE_SIX_FAST_ENEMY_COUNT;
			fastEnemySpawn();
		}
		fastEnemyMechanics();
		projectileEnemyOneSpawn();
		projectileEnemyOneMechanics();

		fill(255);
		textSize(14);
		text("Username: " + name, windowWidth / 6, NAME_TEXT_POSITION_Y);
		text("Age: " + age, windowWidth / 6, AGE_TEXT_POSITION_Y);

		textSize(32);
		text("wave: " + wave, windowWidth / 2.2, TEXT_POSITION_Y);
		text("lives: " + lives, windowWidth / 3.2, TEXT_POSITION_Y);
		text("Enemies Left: " + lastEnemy[7], windowWidth / 1.7, TEXT_POSITION_Y);

	}

	if (lastEnemy[7] == 0) {
		wave++;
	}
	
	if (wave == WAVE_EIGHT) {
		waveEight();
	}

	function waveEight() {
		background('black');
		lastEnemy[1] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[2] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[3] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[4] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[5] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[6] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[7] = LAST_ENEMY_STOP_ENEMY_SPAWN;

		normalEnemyWaveSpawnCounter[1] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[2] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[3] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[4] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[5] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[6] = STOP_WAVE_SPAWN_COUNTER;

		fastEnemyWaveSpawnCounter[1] = STOP_WAVE_SPAWN_COUNTER;
		fastEnemyWaveSpawnCounter[2] = STOP_WAVE_SPAWN_COUNTER;
		fastEnemyWaveSpawnCounter[3] = STOP_WAVE_SPAWN_COUNTER;

		playerProjectileMechanics();
		playerMechanics();
		normalEnemyWaveSpawn = "true";
		if (normalEnemyWaveSpawn == "true") {
			normalEnemyWaveSpawnCounter[7]++;
			normalEnemyCount = WAVE_SIX_NORMAL_ENEMY_COUNT;
			normalEnemySpawn();
		}
		normalEnemyMechanics();
		fastEnemyWaveSpawn = "true";
		if (fastEnemyWaveSpawn == "true") {
			fastEnemyWaveSpawnCounter[4]++;
			fastEnemyCount = WAVE_SEVEN_FAST_ENEMY_COUNT;
			fastEnemySpawn();
		}
		fastEnemyMechanics();
		projectileEnemyOneSpawnTwo();
		projectileEnemyOneMechanicsTwo();

		projectileEnemyTwoSpawn();
		projectileEnemyTwoMechanics();
		fill(255);
		textSize(14);
		text("Username: " + name, windowWidth / 6, NAME_TEXT_POSITION_Y);
		text("Age: " + age, windowWidth / 6, AGE_TEXT_POSITION_Y);

		textSize(32);
		text("wave: " + wave, windowWidth / 2.2, TEXT_POSITION_Y);
		text("lives: " + lives, windowWidth / 3.2, TEXT_POSITION_Y);
		text("Enemies Left: " + lastEnemy[8], windowWidth / 1.7, TEXT_POSITION_Y);

	}
	
	if (lastEnemy[8] == 0) {
		wave++;
	}
	
	if (wave == WAVE_NINE) {
		waveNine();
	}

	function waveNine() {
		background('black');
		lastEnemy[1] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[2] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[3] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[4] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[5] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[6] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[7] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[8] = LAST_ENEMY_STOP_ENEMY_SPAWN;

		normalEnemyWaveSpawnCounter[1] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[2] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[3] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[4] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[5] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[6] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[7] = STOP_WAVE_SPAWN_COUNTER;

		fastEnemyWaveSpawnCounter[1] = STOP_WAVE_SPAWN_COUNTER;
		fastEnemyWaveSpawnCounter[2] = STOP_WAVE_SPAWN_COUNTER;
		fastEnemyWaveSpawnCounter[3] = STOP_WAVE_SPAWN_COUNTER;
		fastEnemyWaveSpawnCounter[4] = STOP_WAVE_SPAWN_COUNTER;

		playerProjectileMechanics();
		playerMechanics();
		normalEnemyWaveSpawn = "true";
		if (normalEnemyWaveSpawn == "true") {
			normalEnemyWaveSpawnCounter[8]++;
			normalEnemyCount = WAVE_SIX_NORMAL_ENEMY_COUNT;
			normalEnemySpawn();
		}
		normalEnemyMechanics();
		fastEnemyWaveSpawn = "true";
		if (fastEnemyWaveSpawn == "true") {
			fastEnemyWaveSpawnCounter[5]++;
			fastEnemyCount = WAVE_SEVEN_FAST_ENEMY_COUNT;
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
		textSize(14);
		text("Username: " + name, windowWidth / 6, NAME_TEXT_POSITION_Y);
		text("Age: " + age, windowWidth / 6, AGE_TEXT_POSITION_Y);

		textSize(32);
		text("wave: " + wave, windowWidth / 2.2, TEXT_POSITION_Y);
		text("lives: " + lives, windowWidth / 3.2, TEXT_POSITION_Y);
		text("Enemies Left: " + lastEnemy[9], windowWidth / 1.7, TEXT_POSITION_Y);

	}
	
	if (lastEnemy[9] == 0) {
		wave++;
	}
	
	if (wave == WAVE_TEN) {
		waveTen();
	}

	function waveTen() {
		background('black');
		lastEnemy[1] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[2] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[3] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[4] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[5] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[6] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[7] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[8] = LAST_ENEMY_STOP_ENEMY_SPAWN;
		lastEnemy[9] = LAST_ENEMY_STOP_ENEMY_SPAWN;

		normalEnemyWaveSpawnCounter[1] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[2] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[3] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[4] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[5] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[6] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[7] = STOP_WAVE_SPAWN_COUNTER;
		normalEnemyWaveSpawnCounter[8] = STOP_WAVE_SPAWN_COUNTER;

		fastEnemyWaveSpawnCounter[1] = STOP_WAVE_SPAWN_COUNTER;
		fastEnemyWaveSpawnCounter[2] = STOP_WAVE_SPAWN_COUNTER;
		fastEnemyWaveSpawnCounter[3] = STOP_WAVE_SPAWN_COUNTER;
		fastEnemyWaveSpawnCounter[4] = STOP_WAVE_SPAWN_COUNTER;
		fastEnemyWaveSpawnCounter[5] = STOP_WAVE_SPAWN_COUNTER;

		playerProjectileMechanics();
		playerMechanics();
		normalEnemyWaveSpawn = "true";
		if (normalEnemyWaveSpawn == "true") {
			normalEnemyWaveSpawnCounter[9]++;
			normalEnemyCount = WAVE_SIX_NORMAL_ENEMY_COUNT;
			normalEnemySpawn();
		}
		normalEnemyMechanics();
		fastEnemyWaveSpawn = "true";
		if (fastEnemyWaveSpawn == "true") {
			fastEnemyWaveSpawnCounter[6]++;
			fastEnemyCount = WAVE_SEVEN_FAST_ENEMY_COUNT;
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
		textSize(14);
		text("Username: " + name, windowWidth / 6, NAME_TEXT_POSITION_Y);
		text("Age: " + age, windowWidth / 6, AGE_TEXT_POSITION_Y);

		textSize(32);
		text("wave: " + wave, windowWidth / 2.2, TEXT_POSITION_Y);
		text("lives: " + lives, windowWidth / 3.2, TEXT_POSITION_Y);
		text("Enemies Left: " + lastEnemy[10], windowWidth / 1.7, TEXT_POSITION_Y);

	}
	if (lastEnemy[10] == 0) {
		wave++;
	}
}

/*******************************************************/
//  END OF APP
/*******************************************************/
