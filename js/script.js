// Raccolgo gli elementi dal DOM
const grid = document.getElementById('grid');
const playButton = document.getElementById("play-button");
const difficulty = document.getElementById('difficulty');
const scoreDisplay = document.getElementById('display-score');


function play() {

    // Funzioni interne al gioco
    const createCell = (number, className) => {
        const cell = document.createElement('div');
        cell.classList.add('cell', className);
        cell.append(number);

        return cell;
    }

    /**
     * 
     * @param {number} maxNumber numero massimo da randomizzare
     * @param {number} totalNumber totale dei numeri nell'array da restituire
     * @returns {number[]} un array con TOT numeri casuali diversi tra loro
     */


    const generateBombs = (maxNumber, totalNumber) => {
        const bombs = [];

        // Finchè l'array non raggiunge 16
        while (bombs.length < totalNumber) {
            let random;
            do {
                random = Math.floor(Math.random() * maxNumber) + 1;
            } while (bombs.includes(random));  // per evitare che il numero cliccato si trovi già nell'array

            bombs.push(random);
        }

        return bombs;
    }


    const gameOver = (score, hasHitBomb) => {
        const message = hasHitBomb ? `Hai perso! Hai ottenuto : ${score} ` : `Hai vinto! Hai ottenuto : ${score} punti! `;
        alert(message);

    }

    // Cambio il testo button in 'Ricomincia'
    playButton.innerText = 'Ricomincia';

    // Svuotiamo la griglia
    grid.innerHTML = '';

    // Recupero valore delle tandina
    const level = difficulty.value;


    // Calcolo righe e colonne 
    let cols;
    let rows;

    switch (level) {
        case '2':
            cols = rows = 9;
            break;
        case '3':
            cols = rows = 7;
            break;
        case '1':
        default:
            cols = rows = 10;
    }

    // Setto il valore corretto
    const root = document.querySelector(':root');
    root.style.setProperty('--cells-per-row', cols);

    // Calcolo totale celle 
    const totalCells = rows * cols;

    // Preparo la variabile
    let score = 0;

    // Numero delle Bombe
    const totalBombs = 16;

    // Punteggio finale 
    const maxPoints = totalCells - totalBombs;

    // Genero le bombe 
    const bombs = generateBombs(totalCells, totalBombs);
    console.log(bombs);

    /*
    console.log(++score);
    console.log(score);
    */

    // Svolgimento 
    for (let i = 1; i <= totalCells; i++) {
        const cell = createCell(i);

        cell.addEventListener('click', function () {
            // Controlo se era stata già cliccata
            if (cell.classList.contains('clicked')) {
                return;
            }
            // Metto classe clicked
            cell.classList.add('clicked');
            
            // Controllo se ho beccato una bomba
            const cellNumber = parseInt(cell.innerText);
            const hasHitBomb = bombs.includes(cellNumber);
            if (hasHitBomb) {
                cell.classList.add('bomb');
                gameOver(score, hasHitBomb);
            } else {
                // Incremento il punteggio
                scoreDisplay.innerText = ++score;

                // Verifico se ha vinto 
                if (score === maxPoints) {
                    gameOver(score, hasHitBomb);
                }
            }

        })

        grid.appendChild(cell);
    }
}

playButton.addEventListener('click', play);