/*******************************************************/
// P5.play: Assessment
// Move sprite based on keyboard input
// Written by Angus Renugounder
/*******************************************************/
var wave = sessionStorage.getItem('wave');
wave = wave - 1;
var name = sessionStorage.getItem('name');

/*******************************************************/
// preload()
// Called by P5 before setup
/*******************************************************/
function preload() {
    gameOverImage = loadImage('/Assets/ss_assets/ss_images/gameOver.png');

}
/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    console.log("setup: ");
    cnv = new Canvas(windowWidth, windowHeight);

    gameOver = new Sprite(windowWidth/2, windowHeight/3, 100, 50, 'd');
    gameOver.addImage(gameOverImage);
    gameOverImage.resize(400, 150);

    retry = new Sprite(windowWidth/2, windowHeight/1.75, 100, 50, 'd');
    retry.color = 'cyan';
    retry.text = "Retry";
    
    mainMenu = new Sprite(windowWidth/2, windowHeight/1.5, 100, 50, 'd');
    mainMenu.color = 'cyan';
    mainMenu.text = "Main Menu";
    
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    background('black');
    textSize(15);
    fill(255, 255, 255);
    text("You survived " + wave + " waves " + name, windowWidth/2.2, windowHeight/2);
    text("You Died!", windowWidth/2.2, windowHeight/2.1);

    if(retry.mouse.presses()){
        window.location.assign("/html/game.html");
    }
    if(mainMenu.mouse.presses()){
        window.location.assign("/html/start.html");
    }
}


/*******************************************************/
//  END OF APP
/*******************************************************/
