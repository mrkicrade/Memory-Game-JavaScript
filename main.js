let body = document.querySelector('body');
let flippedCards = [];
let counter = 0;
let level = 2;
let start = 2;
let timer = 20;

let text = "qwertyuiopasdfghjklzxcvbnm1234567890#$%^&*(){}=+[]".toUpperCase().split("");
// console.log(text); // array od 50 elemenata

startGame();

function startGame() {
    
    // moram prvo da izvucem dva elementa i da napravim array za igru od njih, pa onda 4...
    let gameIcons = text.slice(0, (level * start) / 2);
    console.log(gameIcons);
    
    
    let icons = gameIcons.concat(gameIcons);
    // console.log(icons);
    
    // kreiranje container-a
    let container = document.createElement('div');
    container.classList.add('container-' + level);
    body.appendChild(container);
    let timerDiv = document.createElement('div');
    timerDiv.classList.add('timer-' + level);
    body.appendChild(timerDiv)
    let line = document.createElement('div');
    line.classList.add('line-' + level);
    timerDiv.appendChild(line);

    let height = 1;
	let startTimer = setInterval(start1, 500);
    
    createCards();
    
    function createCards() {
        for (let i = 0; i < (start * level); i++) {    
            let rand = Math.floor(Math.random() * icons.length);
            
            let newCard = document.createElement('div');
            newCard.classList.add('card-' + level);
            
    
            let newBack = document.createElement('div');
            newBack.className = 'back-' + level;
            newBack.innerHTML = icons[rand];
            icons.splice(rand, 1);
    
            let newFront = document.createElement('div');
            newFront.className = 'front-' + level;
    
            newCard.appendChild(newBack);
            newCard.appendChild(newFront);
    
            container.appendChild(newCard);
        }
    }
    
    let allCards = document.querySelectorAll('.card-' + level);
    allCards.forEach(card => card.addEventListener('click', flipCard));
    
    function flipCard() {
        // console.log('radi');
        
        flippedCards.push(this);
        this.classList.add('flipped');
        if (flippedCards.length === 2) {
            checkCards();
        }
    }
    
    function stopAllClicks() {
        allCards.forEach( card => card.removeEventListener('click', flipCard));
    }
    
    function addAllClicks() {
        let allNotFlipped = document.querySelectorAll(`.card-${level}:not(.flipped)`);
        allNotFlipped.forEach(card => card.addEventListener('click', flipCard));
    }
    
    function checkCards() {
        stopAllClicks();
        let back1 = flippedCards[0].querySelector('.back-' + level);
        let back2 = flippedCards[1].querySelector('.back-' + level);
    
        if (back1.innerHTML === back2.innerHTML) {
            counter ++;
            flippedCards.length = 0;
            addAllClicks();
            if (counter === gameIcons.length) {
                start = start + 2;
                level = level + 2;
                counter = 0;
                setTimeout(() => {
                    container.remove();
                    timerDiv.remove();
                    clearInterval(startTimer);
                    alert('Uspešno ste završili igru. Prelazite na viši nivo.')
                    startGame();
                }, 1000)
            }
        } else {
            setTimeout(function(){ 
                flippedCards[0].classList.remove('flipped');
                flippedCards[1].classList.remove('flipped');
                flippedCards = [];
                addAllClicks();
            }, 1000)
        }
    }

    function start1() {
			if (height >= 100) {
				clearInterval(startTimer);
				alert("Vreme je isteklo!!! Igra je zavrsena!!!");
                alert('Pokrenite novu igru');
                startGame();
			} else {
				height++;
				line.style.height = height + '%';
			}
		}
}