var celulas = document.querySelectorAll('.cell');
var resuldado = document.querySelector('.resuldado');
var modalGanhador = document.querySelector('.modal-ganhador');
var userMsgGanhador = document.querySelector('.msg');
var reiniciarJogo = document.querySelector('.reset');

var isCirculo = false;
var moves = 0;

var playX = 0;
var playCirculo = 0;

const possibilities = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const addUser = (currentPlayer, user) => {
    currentPlayer.classList.add(user);
}

const swapUser = () => {
    isCirculo = !isCirculo;
}

const verifyWinner = (currentUser) => {
    return  possibilities.some(combinations => {
        return combinations.every(index => {
            return celulas[index].classList.contains(currentUser);
        });
    });
};

const printWinner = (winner) =>{
    if(winner == 'x'){
        userMsgGanhador.innerHTML = `
        <h2>Jogador 1 Ganhou</h2>
        `;
    }else {
        userMsgGanhador.innerHTML = `
        <h2>Jogador 2 Ganhou</h2>
        `;
    };
 
    modalGanhador.classList.add('visibility');
};

const printTie = () => {
    userMsgGanhador.innerHTML = `
    <h2>Jogo Deu Empate</h2>
    `;
    modalGanhador.classList.add('visibility');
}

reiniciarJogo.addEventListener('click', (e) => {
    modalGanhador.classList.remove('visibility');
    celulas.forEach(element => {
        element.classList.remove('x');
        element.classList.remove('circle');
        element.removeEventListener('click', handeClick);
        element.addEventListener('click', handeClick, {once: true});
    });
    
});

const restarGameAfterTie = () => {
    celulas.forEach(element => {
        element.classList.remove('x');
        element.classList.remove('circle');
        element.removeEventListener('click', handeClick);
        element.addEventListener('click', handeClick, {once: true});
    });
    moves = 0; //atualiza o número de jogadas

};

const updateScore = (winner) => {
    if (winner == 'x'){
        playX++;
        resuldado.innerHTML = `
        <h2>JogadorX -- ${playX} x  ${playCirculo} -- Jogador O</h2>
        `
    }else{
        playCirculo++;
        resuldado.innerHTML = `
        <h2>JogadorX -- ${playX} x  ${playCirculo} -- Jogador O</h2>
        `
    };
    moves = 0; //atualiza o número de jogadas
};

const handeClick = (e) => {
    moves++;
    const move = e.target; //selecionando a div;
    
    const currentUser = isCirculo ? 'circle' : 'x'; //verificando a jogada;

    //adicionando a classe;
    addUser(move,currentUser);

    const verify = verifyWinner(currentUser);
    if (moves >= 5){
        if (verify) {
            printWinner(currentUser);
            updateScore(currentUser);

        }
        if (moves == 9){
            printTie();
            restarGameAfterTie();
        };
    };

    //mudar player
    swapUser();
    ;
}

function stratGame() {
    celulas.forEach((cell, id) => {
        cell.addEventListener('click', handeClick, {once: true});
    });
};

//iniciar game
stratGame();