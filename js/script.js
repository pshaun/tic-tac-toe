const gameboard = document.querySelector('.gameboard');
const resetBtn = document.querySelector('.resetBtn');


var gameFinished = false;
var moveCount = 0;
var draw = 0;

const playerOne = {
    mark: 'X',
    score: 0,
    currentTurn: true,
};

const playerTwo = {
    mark: 'O',
    score: 0,
    currentTurn: false,
};

let gameboardArr = [
    '', '', '',
    '', '', '', 
    '', '', '',
];


createBoard(gameboardArr);

function createBoard(arr){
    arr.forEach(function(item,index){
        const tile = generateTile(item, index);
        gameboard.append(tile);
    })
}

function generateTile(item, index){
    const tile = document.createElement('div');
    tile.textContent = item;
    tile.addEventListener('click', playMove);
    tile.setAttribute('data-index', index);
    tile.classList.add('tile');
    return tile;

}

function playMove(event){
    const index = event.target.getAttribute('data-index');
    if(playerOne.currentTurn && gameboardArr[index] === "" && !gameFinished){
        const index = event.target.getAttribute('data-index');
        console.log("Playing 'X' at " + index);
        event.target.textContent = "X";
        gameboardArr[index] = "X";
        moveCount++;
        playerOne.currentTurn = !playerOne.currentTurn;
        playerTwo.currentTurn = !playerTwo.currentTurn;
        checkBoard(gameboardArr);
        if(!gameFinished){
            setTimeout(function(){
                playComputerMove();
            }, 700); 
            
        }
    } else{
        console.log("Can't make move");
        console.log("P1 turn = " + playerOne.currentTurn);
        console.log("")
    } 
}

function playComputerMove(){
    //messy comp AI for testing purposes, need to rework later
    if(playerTwo.currentTurn){
        var arr = gameboardArr;
        var computerTile = "";
        for(var i = 0; i<winningRows.length; i++){
            var innerArrayLength = winningRows[i].length;
            for(var j = 0; j<innerArrayLength; j++){    
                    if(arr[winningRows[i][0]] === arr[winningRows[i][1]] && arr[winningRows[i][1]] != "" && arr[winningRows[i][2]] === ""){
                        
                        computerTile = winningRows[i][2];
                        console.log("1 Ai chooses = " + computerTile);
                        break;
                    } else if (arr[winningRows[i][0]] === arr[winningRows[i][2]] && arr[winningRows[i][2]] != "" && arr[winningRows[i][1]] === ""){
                        
                        computerTile = winningRows[i][1];
                        console.log("2 Ai chooses = " + computerTile);
                        break;
                    } else if (arr[winningRows[i][1]] === arr[winningRows[i][2]] && arr[winningRows[i][2]] != "" && arr[winningRows[i][0]] === ""){
                        
                        computerTile = winningRows[i][0];
                        console.log("3 Ai chooses = " + computerTile);
                        break;
                    } 
                }
            }
            if(computerTile == ""){
                while(playerTwo.currentTurn){
                    console.log("AI Playing rand move");
                    var computerTile = Math.floor(Math.random() * 9);
                    if(gameboardArr[computerTile] == ""){
                        computerTile = computerTile;
                        playerTwo.currentTurn = !playerTwo.currentTurn;
                        
                    } else {
                        randMove = Math.floor(Math.random() * 9);
                    }
                }
            }
            playerOne.currentTurn = true;
            playerTwo.currentTurn = false;
            document.querySelectorAll('.tile').forEach(function(element) {
                const tile = element.getAttribute('data-index');
                if(tile == computerTile){
                    element.textContent = "O";
                    
                }
            });
            console.log("Playing 'O' at " + computerTile);
            gameboardArr[computerTile] = "O";
            moveCount++;
            checkBoard(gameboardArr);
            console.table(gameboardArr);
            console.log("");
            
        }
    }

const winningRows = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];

function checkBoard(arr){
    var winner = "";
    for(var i = 0; i<winningRows.length; i++){
        var innerArrayLength = winningRows[i].length;
        for(var j = 0; j<innerArrayLength; j++){    
                if( arr[winningRows[i][0]] === arr[winningRows[i][1]] && 
                    arr[winningRows[i][1]] === arr[winningRows[i][2]] &&
                    arr[winningRows[i][2]] !== ""){
                    winner = arr[winningRows[i][0]];
                    endGame(winner, winningRows[i]);
                    return;
            }
        }
        
    }
    if(moveCount === 9){
        endGame("Draw", null);
    }
}

 function endGame(winner, winningRows){
     const playerOneScore = document.querySelector('.player1score');
     const playerTwoScore = document.querySelector('.player2score');
     const drawScore = document.querySelector('.drawscore');

     console.log("WINNER IS " + winner);

     if(winner === "X"){
        let winColor = "rgb(3, 252, 32)";
        playerOne.score++;
        playerOneScore.textContent = playerOne.score;
        highlightRow(winningRows, winColor);
        
    } else if(winner === "O"){
        let winColor = "rgb(255, 0, 0)"
        playerTwo.score++;
        playerTwoScore.textContent = playerTwo.score;
        highlightRow(winningRows, winColor);
    } else{
        draw++;
        drawScore.textContent = draw;
        console.log("Draw = " + draw);
    }
    
    gameFinished = true;
    console.log("Game finished");

 }

 function highlightRow(winningRow, winColor){
    document.querySelectorAll('.tile').forEach(function(element) {
        const tile = element.getAttribute('data-index');
        if(tile == winningRow[0] || tile == winningRow[1] || tile == winningRow[2]){
            element.style.color = winColor;
        }
    });

 }

 function clearGameboard(){
     while(gameboard.hasChildNodes()){
         gameboard.removeChild(gameboard.lastChild);
     }
 }

 resetBtn.addEventListener("click", function(){
    console.log("Clearing board");
    gameboardArr = [
        '', '', '',
        '', '', '', 
        '', '', '',
    ];
    clearGameboard();
    createBoard(gameboardArr);
    moveCount = 0;
    gameFinished = false;
    playerOne.currentTurn = true;
    playerTwo.currentTurn = false;
  });