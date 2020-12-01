const grid = document.querySelector(".grid");
const starButton = document.querySelector(".start");
const scoreDisplay = document.getElementById("score");
let squares = []; 
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 20;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.8;
let timerId = 0;

function createGrid() {
    //create 100 of these elements with a for loop
    for(let n = 0; n < 400; n++){
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        //push into a new square array
        squares.push(square);
    }                    
    
}    
createGrid();
currentSnake.forEach(x => squares[x].classList.add("snake"));



function startGame() {

    //remove the snake using forEach method as the snake is across many squares
    currentSnake.forEach(n => squares[n].classList.remove("snake"));
    //remove the apple
    squares[appleIndex].classList.remove("apple");
    
    clearInterval(timerId);
    currentSnake = [2, 1, 0];
    score = 0;
    // re-add news score to browser
    scoreDisplay.textContent = score;
    direction = 1;
    intervalTime = 1000;
    generateApples();
    // re-add the class of snake to our new currentSnake
    currentSnake.forEach(n => squares[n].classList.add("snake"));

    timerId = setInterval(move, intervalTime);
}


function move() {

    if (
        (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width)  || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
    // when snake hits obstacle
    return clearInterval(timerId);


    //remove last element from our currentSnake array
    const tail = currentSnake.pop();
    //remove styling from last element 
    squares[tail].classList.remove("snake");
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction);
    
    //add styling so we can see it
    squares[currentSnake[0]].classList.add('snake');

    //deal with snake head gets apple
    if(squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple");
         //grow our snake by adding class of snake to it
         squares[tail].classList.add('snake');
         //grow our snake array
         currentSnake.push(tail);
        
        //generate new apple
        generateApples();
        
        //add one to the score
        score++
        
        //display our score
        scoreDisplay.textContent = score;
        //speed up our snake
        intervalTime = intervalTime * speed;
        timerId = setInterval(move, intervalTime); 

    }
    squares[currentSnake[0]].classList.add('snake');
}




function generateApples() {
    do{
        //generate a random number
        appleIndex = Math.floor((Math.random() * squares.length));
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
    
}
generateApples();

function control(e) {
    if(e.keyCode === 39) {
        direction = 1;
    } else if (
        e.keyCode === 38) {
        direction = -width;
    } else if (
        e.keyCode === 37) {
        direction = -1;
    } else if (
        e.keyCode === 40) {
        direction = +width;
    }
        
}
// control(e);
document.addEventListener("keydown", control); 
starButton.addEventListener("click", startGame);

// // Project - checklists
// // Style: Retro, MODERN LOOKS
// // PUBLISH PROJECTS: PORTFOLIO CV GITHUB(VER CLEAR README)
// // Portfolio update , readme and description of the game available.
// // App new features: game over splash//bang/snake vibration when head touches wall/body of snake etc...
// // code around moving snake fast by pressing and holding key
// //introducing level and reducing speed after score === 15 may be!!! 🤷🏾‍♂️



// function pause() {
//     window.addEventListener('keydown', function (e) {
//     var key = e.keyCode;
//     if (key === 80)// p key
//     {
//         togglePause();
//     }
//     });
// }