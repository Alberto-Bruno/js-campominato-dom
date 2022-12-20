// Raccolgo gli elementi dal DOM
const grid = document.getElementById('grid');
const playButton = document.getElementById("play-button");
const difficulty = document.getElementById('difficulty');
const scoreDisplay = document.getElementById('display-score');

function play() {
    const createCell = (number, className) => {
        const cell = document.createElement('div');
        cell.classList.add('cell', className);
        cell.append(number);

        return cell;
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

    console.log(++score);
    console.log(score);

    // Svolgimento 
    for (let i = 1; i <= totalCells; i++) {
        const cell = createCell(i);

        cell.addEventListener('click', function () {
            cell.classList.add('clicked');
            scoreDisplay.innerText = ++score;
            console.log(score);
        })

        grid.appendChild(cell);
    }
}

playButton.addEventListener('click', play);