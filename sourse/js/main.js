let canvas = document.getElementById('main_canvas');
let ctx = canvas.getContext('2d');

var mas = [];
var mas_2 = [];
var count = 0;
var timer;
// size variables
var n = 8;  
var canvas_width = 400;
var size = canvas_width / n;
var score = 0;

//create an empty array, because the dimensions of Canvas 400x400 1 cell 50 total 8
function goGame() {
    for (let i = 0; i < n; i++) {
        mas[i] = [];
        mas_2[i] = [];
        for (let j = 0; j < n; j++) {
            mas[i][j] = 0;
            mas_2[i][j] = 0;
        }
    }
}

// Check a player's loss
function CheckDead() {
    // variable sum of all filled cells
    let iterItem = 0;

    // loop that goes through the entire list
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // если mas[i][j] равно 1 ( Filled cell )
            if (mas[i][j] == 1) {
                // then the variable plus 1
                iterItem += 1;
            }
        }
        // if the variable is greater than or equal to the area of the playing field
        if (iterItem >= n * n) {
            // then it displays the message you have lost
            alert("Вы проиграли");
        }
    }    
}

let flag_Win = false;


function CloseWindow() {
    document.getElementById("pWindow").style.display = "none";
}

// player winnings check
function CheckWin() {
    // loop that goes through the entire list
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // если mas_2[i][j] равно 2048 ( то победа )
            if (mas_2[i][j] == 2048) {
                if (flag_Win == false) {
                    flag_Win = true;
                    document.getElementById("pWindow").style.display = "block";
                }

            }
        }
    }    
}


// random numbers
function randomNumbers(){
    let x = Math.floor((Math.random() * n)); 
    let y = Math.floor((Math.random() * n)); 
    let number = 2 ** Math.floor((Math.random() * 4)); 


    if (mas[y][x] == 1) {
        return randomNumbers()
    } else {
        mas_2[y][x] = number; // number
        mas[y][x] = 1;    
    }
    

    CheckDead();
    CheckWin();
    drawField();    
}


// complexity adjustment
function ChangeDifficulty(i) {
    // changing how many random numbers from the beginning of the game
    let x;
    
    // if the passed string i equals hard
    if (i == "hard") {
        n = 8;
        x = 10;
    }

    // if the passed string i is equal to easy
    if (i == "easy") {
        n = 4;
        x = 1;
    }

    size = canvas_width / n;
    goGame();
    
    
    for (let j = 0; j < x; j++) {
        randomNumbers();        
    }
}


// clearing fields 
function NewGame() {
    mas = [];
    mas_2 = [];
    score = 0;
    flag_Win = false;
    drawField();
}


function drawField() {
    // вывод score
    document.getElementById("score").textContent = score;

    // clearing fields
	ctx.clearRect(0, 0, canvas_width, canvas_width);
    // loop through each value of the two-dimensional array
    // width
	for (var i = 0; i < n; i++) {
        // height
		for (var j = 0; j < n; j++) {
            // If the number in the list of cells is 1, then continue
            if (mas[i][j] == 1) {
                // if the number in the list with numbers is not 0
                if (mas_2[i][j] != 0) {

                    // start filling in
                    ctx.beginPath();

                    // color
                    if (mas_2[i][j] == 1) {ctx.fillStyle = "#EDE0C8";}
                    if (mas_2[i][j] == 2) {ctx.fillStyle = "#EEE4DA";}
                    if (mas_2[i][j] == 4) {ctx.fillStyle =  "#EDE0C8";}
                    if (mas_2[i][j] == 8) {ctx.fillStyle = "#F2B179"}
                    if (mas_2[i][j] == 16) {ctx.fillStyle =  "#F59563";}
                    if (mas_2[i][j] == 32) {ctx.fillStyle =  "#F67C5F";}
                    if (mas_2[i][j] >= 64) {ctx.fillStyle =  "#F65E3B";}
                    if (mas_2[i][j] == 2048) {ctx.fillStyle =  "gold";}

                    // draw this square
                    ctx.fillRect(j * size, i * size, size - 2.5, size - 2.5);
                    ctx.closePath();

                    // start filling in
                    ctx.beginPath();

                    // hind color   
                    if (mas_2[i][j] < 16) {ctx.fillStyle =  "#806441";}
                    if (mas_2[i][j] == 8) {ctx.fillStyle = "white"}
                    if (mas_2[i][j] >= 16) {ctx.fillStyle =  "white";}     
                        

                    // if the number of cells is less than 8, then the font is 30px
                    if (n < 8) {ctx.font = "30px Verdana";} 
                    // if the number of cells is 8, then the font is 20px
                    if (n >= 8) {ctx.font = "20px Verdana";} 

                    ctx.textAlign = "center";

                    ctx.fillText(mas_2[i][j], (j*size) + (size/2), (i*size) + (size/2) + 5);
                    ctx.stroke();
                    ctx.closePath();
                } 
		    }

            if (mas_2[i][j] == 0) {
                ctx.beginPath();
                ctx.fillStyle =  "#CDC1B4";
                ctx.fillRect(j * size, i * size, size - 2.5, size - 2.5);
                ctx.closePath();
            }         
	    }
    }
}


function ArrowUp(i, j) {
    // check for an error, if there is an error, then break the loop
    try {if (mas[i - 1][j] < n) {}
    } catch(e){return;}

    // check if the cell is empty, then put a value there
    if (mas[i - 1][j] === 0) {
        mas[i][j] = 0;
        mas[i - 1][j] = 1;
        
        mas_2[i - 1][j] = mas_2[i][j];
        mas_2[i][j] = 0;
    
    } else {
        // Check if there are two zeros, not interested
        if (mas_2[i - 1][j] == 0 && mas_2[i][j] == 0) {return;}
        
        // I add numbers if they are equal to each other
        if (mas_2[i][j] == mas_2[i - 1][j]) {
            mas[i][j] = 0;
            
            mas_2[i - 1][j] += mas_2[i][j];
            score += mas_2[i - 1][j];

            mas_2[i][j] = 0;                                          
        }                                            
    }
}


function ArrowDown(i, j) {
    // check for an error, if there is an error, then break the loop
    try {if (mas[i + 1][j] < n) {}
    } catch(e){return;}

    // check if the cell is empty, then put a value there
    if (mas[i + 1][j] === 0) {
        mas[i][j] = 0;
        mas[i + 1][j] = 1;
        
        mas_2[i + 1][j] = mas_2[i][j];
        mas_2[i][j] = 0;
    
    } else {
        // Check if there are two zeros, not interested
        if (mas_2[i + 1][j] == 0 && mas_2[i][j] == 0) {return;}
        
        // I add numbers if they are equal to each other
        if (mas_2[i][j] == mas_2[i + 1][j]) {
            mas[i][j] = 0;
            
            mas_2[i + 1][j] += mas_2[i][j];
            score += mas_2[i + 1][j];

            mas_2[i][j] = 0;                                          
        }                                            
    }
}


function ArrowRight(i, j) {
    // check for an error, if there is an error, then break the loop
    try {if (mas[i][j + 1] < n) {}
    }catch(e){return;}

    // check if the cell is empty, then put a value there
    if (mas[i][j + 1] === 0) {
        mas[i][j] = 0;
        mas[i][j + 1] = 1;
        
        mas_2[i][j + 1] = mas_2[i][j];
        mas_2[i][j] = 0;
    
    } else {
        // Check if there are two zeros, not interested
        if (mas_2[i][j + 1] == 0 && mas_2[i][j] == 0) {return;}
        
        // I add numbers if they are equal to each other
        if (mas_2[i][j] == mas_2[i][j + 1]) {
            mas[i][j] = 0;
            
            mas_2[i][j + 1] += mas_2[i][j];
            score += mas_2[i][j + 1];

            mas_2[i][j] = 0;                                          
        }                                            
    }
}


function ArrowLeft(i, j) {
    // check for an error, if there is an error, then break the loop
    try {if (mas[i][j - 1] < n) {}
    } catch(e){return;}         

    // check if the cell is empty, then put a value there
    if (mas[i][j - 1] === 0) {
        mas[i][j] = 0;
        mas[i][j - 1] = 1;
        
        mas_2[i][j - 1] = mas_2[i][j];
        mas_2[i][j] = 0;
    
    } else {
        // Check if there are two zeros, not interested
        if (mas_2[i][j - 1] == 0 && mas_2[i][j] == 0) {return;}
        
        // I add numbers if they are equal to each other
        if (mas_2[i][j] == mas_2[i][j - 1]) {
            mas[i][j] = 0;
            
            mas_2[i][j - 1] += mas_2[i][j];
            score += mas_2[i][j - 1];

            mas_2[i][j] = 0;                                          
        }                                            
    }
}


document.body.addEventListener("keydown", function(event) {

    for(var p = 0; p < n; p++) {

        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                // Logic        
                if (mas[i][j] == 1) {
                    if (mas_2[i][j] != 0) {
                        // Event by pressing the up arrow key
                        if (event.key == "ArrowUp") {
                            ArrowUp(i, j);
                        }

                        // Event by pressing the down arrow key
                        if (event.key == "ArrowDown") {
                            ArrowDown(i, j);
                        }

                        // Event by pressing the left arrow key
                        if (event.key == "ArrowRight") {
                            ArrowRight(i, j);
                        }

                        // Event by pressing the left arrow key
                        if (event.key == "ArrowLeft") {
                            ArrowLeft(i, j);

                        }            
                    }                                                                          
                }
            }
            drawField();              
        }
    }
    if (event.key == "ArrowUp" || 
        event.key == "ArrowDown" || 
        event.key == "ArrowRight" || 
        event.key == "ArrowLeft") {randomNumbers();}           
})    
