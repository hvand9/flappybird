// getting our canvas in the database 
var cvs = document.getElementById("canvas");
// getting the context
var ctx = cvs.getContext("2d");

// loading the images for our game

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var scary = new Image();

// now I will give the pictures a source so I can use them in my code
bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";
scary.src = "images/1606368.png";


// some variables which will be used in the functions

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;



// audio files

var fly = new Audio();
var scor = new Audio();
var ok = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/bruh.mp3";
ok.src = "sounds/score.mp3";


// if the player press the down button on the keyboard the bird will moveup

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
    fly.play();
}



// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// Now we will draw the images 

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload
            scor.play();
            ctx.drawImage(scary,1,1); // reload the page
        }
        
        if(pipe[i].x == 5){
            score++;
            ok.play();
            ctx.drawImage(bg,0,0);

        
        }

        
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Poppins";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();





















