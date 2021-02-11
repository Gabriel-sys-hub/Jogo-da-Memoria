const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false; // deixar as cartas trancadas enquanto estiver flipado;


function flipCard() {
    if(lockBoard) return
    if(this === firstCard) return;
    this.classList.add('flip'); //ADD so adiciona uma vez n tira toggle tira e  Adiciona a classe da "carta" selecionada;
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards();
        return;
    }

    unflipCard();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCard() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500)
}

function resetBoard () {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);//numeros random. math.floor e math random
        card.style.order = ramdomPosition; //quando começar o jogo sempre vai ter a posição diferente
    })
})(); // invoca a função sem precisar chamala ( começa sempre no inicio do programa )

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
    
});