/*******************************************************/
// P5.play: Assessment
// Move sprite based on keyboard input
// Written by Angus Renugounder
/*******************************************************/

/*******************************************************/
// preload()
// Called by P5 before setup
/*******************************************************/
function preload() {
    gameTitleImage = loadImage('gameTitle.png');

}

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    console.log("setup: ");
    gameTitle = new Sprite(windowWidth/2, windowHeight/3, 100, 50, 'd');
    gameTitle.addImage(gameTitleImage);
    gameTitleImage.resize(400, 200);

    cnv = new Canvas(windowWidth, windowHeight);
     
    start = new Sprite(windowWidth/2, windowHeight/1.75, 100, 50, 'd');
    start.color = 'cyan';
    start.text = "Start";
    
    leaderboard = new Sprite(windowWidth/2, windowHeight/1.5, 100, 50, 'd');
    leaderboard.color = 'cyan';
    leaderboard.text = "Leaderboard";
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    background('black');
    
    if(start.mouse.presses()){
        window.location = "game.html";
    }
    if(leaderboard.mouse.presses()){
        window.location = "leaderboard.html";
    }
}


/*******************************************************/
//  END OF APP
/*******************************************************/
