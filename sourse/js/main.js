let canvas = document.getElementById('main_canvas');
let ctx = canvas.getContext('2d');

var mas = [];
var mas_2 = [];
var count = 0;
var timer;
// переменные размера
var n = 8;  
var canvas_width = 400;
var size = canvas_width / n;
var score = 0;

//создаём пустой массив, так-как размеры Canvas 400x400 1 клетка 50 всего 8
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

// проверка проигрыша игрока
function CheckDead() {
    // переменная сумма всех заполенных клеток
    let iterItem = 0;

    // цикл который перебирает весь список
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // если mas[i][j] равно 1 ( Заполненная клетка )
            if (mas[i][j] == 1) {
                // то переменная плюс 1
                iterItem += 1;
            }
        }
        // если перменая больше или равно площадь игрового поля
        if (iterItem >= n * n) {
            // то выводиться надпись вы проиграли
            alert("Вы проиграли");
        }
    }    
}

let flag_Win = false;


function CloseWindow() {
    document.getElementById("pWindow").style.display = "none";
}

// проверка выигрыша игрока
function CheckWin() {
    // цикл который перебирает весь список
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


// рандомные числа
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


// настройка сложности
function ChangeDifficulty(i) {
    // переменая сколько рандомных чисел с начало игры
    let x;
    
    // если переданная строка i равно hard
    if (i == "hard") {
        n = 8;
        x = 10;
    }

    // если переданная строка i равно easy
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


// очищаем поля 
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

    // очищаем поля
	ctx.clearRect(0, 0, canvas_width, canvas_width);
    // перебираем каждое значение двумерного массивва
    // ширина
	for (var i = 0; i < n; i++) {
        // высота
		for (var j = 0; j < n; j++) {
            // если число в списке с клетками равно 1 то продолжаем
            if (mas[i][j] == 1) {
                // если число в списке с числами не равно 0
                if (mas_2[i][j] != 0) {

                    // начинаем заполнять
                    ctx.beginPath();

                    // задаём цвет
                    if (mas_2[i][j] == 1) {ctx.fillStyle = "#EDE0C8";}
                    if (mas_2[i][j] == 2) {ctx.fillStyle = "#EEE4DA";}
                    if (mas_2[i][j] == 4) {ctx.fillStyle =  "#EDE0C8";}
                    if (mas_2[i][j] == 8) {ctx.fillStyle = "#F2B179"}
                    if (mas_2[i][j] == 16) {ctx.fillStyle =  "#F59563";}
                    if (mas_2[i][j] == 32) {ctx.fillStyle =  "#F67C5F";}
                    if (mas_2[i][j] >= 64) {ctx.fillStyle =  "#F65E3B";}
                    if (mas_2[i][j] == 2048) {ctx.fillStyle =  "gold";}

                    // рисуем этот квадрат
                    ctx.fillRect(j * size, i * size, size - 2.5, size - 2.5);
                    ctx.closePath();

                    // начинаем заполнять
                    ctx.beginPath();

                    // задём цвет   
                    if (mas_2[i][j] < 16) {ctx.fillStyle =  "#806441";}
                    if (mas_2[i][j] == 8) {ctx.fillStyle = "white"}
                    if (mas_2[i][j] >= 16) {ctx.fillStyle =  "white";}     
                        

                    // если количество клеток меньше 8 то шрифт 30px
                    if (n < 8) {ctx.font = "30px Verdana";} 
                    // если количество клеток 8 то шрифт 20px
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
    // проверка на ошибку, если ошибка то ломаем цикл
    try {if (mas[i - 1][j] < n) {}
    } catch(e){return;}

    // проверка если клетка пустая то поставим туда значение
    if (mas[i - 1][j] === 0) {
        mas[i][j] = 0;
        mas[i - 1][j] = 1;
        
        mas_2[i - 1][j] = mas_2[i][j];
        mas_2[i][j] = 0;
    
    } else {
        // проверка если два нуля то не интересует
        if (mas_2[i - 1][j] == 0 && mas_2[i][j] == 0) {return;}
        
        // складываю числа если они равны между собой
        if (mas_2[i][j] == mas_2[i - 1][j]) {
            mas[i][j] = 0;
            
            mas_2[i - 1][j] += mas_2[i][j];
            score += mas_2[i - 1][j];

            mas_2[i][j] = 0;                                          
        }                                            
    }
}


function ArrowDown(i, j) {
    // проверка на ошибку, если ошибка то ломаем цикл
    try {if (mas[i + 1][j] < n) {}
    } catch(e){return;}

    // проверка если клетка пустая то поставим туда значение
    if (mas[i + 1][j] === 0) {
        mas[i][j] = 0;
        mas[i + 1][j] = 1;
        
        mas_2[i + 1][j] = mas_2[i][j];
        mas_2[i][j] = 0;
    
    } else {
        // проверка если два нуля то не интересует
        if (mas_2[i + 1][j] == 0 && mas_2[i][j] == 0) {return;}
        
        // складываю числа если они равны между собой
        if (mas_2[i][j] == mas_2[i + 1][j]) {
            mas[i][j] = 0;
            
            mas_2[i + 1][j] += mas_2[i][j];
            score += mas_2[i + 1][j];

            mas_2[i][j] = 0;                                          
        }                                            
    }
}


function ArrowRight(i, j) {
    // проверка на ошибку, если ошибка то ломаем цикл
    try {if (mas[i][j + 1] < n) {}
    }catch(e){return;}

    // проверка если клетка пустая то поставим туда значение
    if (mas[i][j + 1] === 0) {
        mas[i][j] = 0;
        mas[i][j + 1] = 1;
        
        mas_2[i][j + 1] = mas_2[i][j];
        mas_2[i][j] = 0;
    
    } else {
        // проверка если два нуля то не интересует
        if (mas_2[i][j + 1] == 0 && mas_2[i][j] == 0) {return;}
        
        // складываю числа если они равны между собой
        if (mas_2[i][j] == mas_2[i][j + 1]) {
            mas[i][j] = 0;
            
            mas_2[i][j + 1] += mas_2[i][j];
            score += mas_2[i][j + 1];

            mas_2[i][j] = 0;                                          
        }                                            
    }
}


function ArrowLeft(i, j) {
    // проверка на ошибку, если ошибка то ломаем цикл
    try {if (mas[i][j - 1] < n) {}
    } catch(e){return;}         

    // проверка если клетка пустая то поставим туда значение
    if (mas[i][j - 1] === 0) {
        mas[i][j] = 0;
        mas[i][j - 1] = 1;
        
        mas_2[i][j - 1] = mas_2[i][j];
        mas_2[i][j] = 0;
    
    } else {
        // проверка если два нуля то не интересует
        if (mas_2[i][j - 1] == 0 && mas_2[i][j] == 0) {return;}
        
        // складываю числа если они равны между собой
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
                // Логика        
                if (mas[i][j] == 1) {
                    if (mas_2[i][j] != 0) {
                        // ивент нажатие на клавищу стрелка верх
                        if (event.key == "ArrowUp") {
                            ArrowUp(i, j);
                        }

                        // ивент нажатие на клавищу стрелка вниз
                        if (event.key == "ArrowDown") {
                            ArrowDown(i, j);
                        }

                        // ивент нажатие на клавищу стрелка влево
                        if (event.key == "ArrowRight") {
                            ArrowRight(i, j);
                        }

                        // ивент нажатие на клавищу стрелка влево
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
