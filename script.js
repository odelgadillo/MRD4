let puntajeGanador = 5;
const segundosParaResponder = 3;

// Selección de elementos
const startButton = document.getElementById('start-game');
const welcomeSection = document.getElementById('welcome');
const setupSection = document.getElementById('player-setup');
const gameSection = document.getElementById('game');
const playerList = document.getElementById('player-list');
const addPlayerButton = document.getElementById('add-player');
const startPlayButton = document.getElementById('start-play');
const instruccionElem = document.getElementById('instruccion');

const instructionsBtn = document.querySelector('#welcome button:first-of-type');
const backToWelcomeBtn = document.getElementById('back-to-welcome');
const instructionsSection = document.getElementById('instructions');

let players = []; // Almacenará los nombres de los jugadores

// Mostrar las instrucciones
instructionsBtn.addEventListener('click', () => {
    welcomeSection.classList.remove('active');
    instructionsSection.classList.add('active');
});

// Regresar a la página de bienvenida
backToWelcomeBtn.addEventListener('click', () => {
    instructionsSection.classList.remove('active');
    welcomeSection.classList.add('active');
});

// Cambiar de bienvenida a configuración
startButton.addEventListener('click', () => {
    welcomeSection.classList.remove('active');
    setupSection.classList.add('active');
    generateInitialFields();
});

// Generar campos iniciales
function generateInitialFields() {
    for (let i = 1; i <= 5; i++) {
        createPlayerInput(i);
    }
}

// Crear campos de texto para registrar juagadores
function createPlayerInput(index) {
    // Crear contenedor del grupo
    const div = document.createElement('div');
    div.className = 'input-group';

    // Crear el campo de entrada
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `Jugador ${index}`;
    input.id = `player-${index}`;
    input.className = 'form-control';

    // Agregar el campo al contenedor
    div.appendChild(input);

    // Añadir el contenedor al DOM
    playerList.appendChild(div);
}

// Agregar un nuevo campo de texto para registrar un jugador
addPlayerButton.addEventListener('click', () => {
    const newIndex = playerList.children.length + 1;
    createPlayerInput(newIndex);
});


const playerScoresContainer = document.getElementById('player-scores');

// Mostrar jugadores con puntajes iniciales
function renderPlayerScores() {
    playerScoresContainer.innerHTML = ''; // Limpiar contenido previo
    const ul = document.createElement('ul');
    ul.classList.add('list-group');

    players.forEach(player => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `${player.name} <span class="badge text-bg-primary rounded-pill">${player.score}</span>`;
        ul.appendChild(li);
    });

    playerScoresContainer.appendChild(ul);
}

// Escucha los cambios en el input de puntaje ganador
const puntajeGanadorInput = document.getElementById('puntaje-ganador');
puntajeGanadorInput.addEventListener('input', () => {
    const nuevoValor = parseInt(puntajeGanadorInput.value, 10);
    if (!isNaN(nuevoValor) && nuevoValor > 0) {
        puntajeGanador = nuevoValor; // Actualiza el valor global
    } else {
        puntajeGanadorInput.value = puntajeGanador; // Mantén el valor actual si la entrada no es válida
    }
});

// Iniciar el juego
startPlayButton.addEventListener('click', () => {
    players = []; // Reiniciar jugadores
    const inputs = playerList.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.value.trim() !== '') {
            players.push({ name: input.value.trim(), score: 0 });
        }
    });

    if (players.length > 0) {
        setupSection.classList.remove('active');
        gameSection.classList.add('active');
        renderPlayerScores(); // Mostrar puntajes iniciales
    } else {
        alert('Por favor ingresa al menos un jugador.');
    }
});

const winnerSelectionContainer = document.getElementById('winner-selection');
const winnerButtonsContainer = document.getElementById('winner-buttons');
const winnerMessage = document.getElementById('winner-message');

// Mostrar botones para seleccionar ganador
function showWinnerSelection() {
    winnerButtonsContainer.innerHTML = ''; // Limpiar botones previos

    players.forEach((player, index) => {
        const button = document.createElement('button');
        button.textContent = player.name;
        button.className = 'btn btn-success';
        button.addEventListener('click', () => {
            updatePlayerScore(index, 1); // Sumar un punto al jugador seleccionado
            winnerSelectionContainer.style.display = 'none'; // Ocultar botones

            preguntaElem.classList.remove("visible"); // Ocultar pregunta
            instruccionElem.textContent = 'Seleccioná otra carta.';
        });
        winnerButtonsContainer.appendChild(button);
    });

    winnerSelectionContainer.style.display = 'block'; // Mostrar contenedor
}

// Temporizador finaliza
function onTimerEnd() {
    instruccionElem.textContent = 'Seleccioná al mas votado.';
    showWinnerSelection(); // Mostrar opciones de ganador
}

// Función para actualizar puntaje
function updatePlayerScore(playerIndex, points) {
    players[playerIndex].score += points;
    renderPlayerScores(); // Actualizar lista de puntajes
    checkForWinner(); // Verificar si hay un ganador
}

// Verificar si hay un ganador
function checkForWinner() {
    const winner = players.find(player => player.score >= puntajeGanador);
    if (winner) {
        showWinnerMessage(winner);
    }
}

// Resetear juego (puedes personalizar esto más adelante)
function resetGame() {
    // Reiniciar los puntajes de los jugadores
    players = players.map(player => ({ ...player, score: 0 }));

    // Limpiar la pantalla del juego
    playerScoresContainer.innerHTML = '';
    winnerSelectionContainer.style.display = 'none';
    winnerMessage.style.display = 'none';

    // Volver a mostrar la pantalla de inicio del juego
    setupSection.classList.add('active');
    gameSection.classList.remove('active');
}

function showWinnerMessage(winner) {
    const winnerMessageContainer = document.getElementById('winner-message');
    const winnerNameElem = document.getElementById('winner-name');
    winnerNameElem.textContent = winner.name;
    winnerMessageContainer.style.display = 'block';
    gameSection.classList.remove('active');
    confetti();
}



// Lista de preguntas
// const preguntas2 = [
//     "¿Qué es lo más vergonzoso que te ha pasado en público?",
//     "¿Qué es lo más raro que has buscado en Internet?",
// ];

const mazo = document.getElementById("mazo");
const preguntaElem = document.getElementById("pregunta");
const iniciarBtn = document.getElementById("iniciar");

let temporizador;

mazo.addEventListener("click", () => {
    // Seleccionar una pregunta aleatoria
    const indice = Math.floor(Math.random() * preguntas.length);
    const preguntaSeleccionada = preguntas[indice];

    // Mostrar la pregunta
    preguntaElem.textContent = preguntaSeleccionada;

    // Añadir la clase visible para activar el efecto de desenfoque
    preguntaElem.classList.remove("visible"); // Asegurarse de que el efecto no se duplique

    setTimeout(() => { preguntaElem.classList.add("visible"); }, 100);  // Esto da un pequeño retraso antes de iniciar la animación

    // Mostrar efecto de escritura
    //mostrarEfectoEscritura(preguntaSeleccionada);

    // Indicar al usuario que debe leer en vos alta
    instruccionElem.textContent = `Lee en vos alta.`;

    iniciarBtn.style.display = "inline-block";
});

iniciarBtn.addEventListener("click", () => {
    let tiempoRestante = segundosParaResponder;
    iniciarBtn.style.display = "none";
    instruccionElem.textContent = `Señalen su respuesta en... ${tiempoRestante}`;

    temporizador = setInterval(() => {
        tiempoRestante--;
        if (tiempoRestante > 0) {
            instruccionElem.textContent = `Señalen su respuesta en... ${tiempoRestante}`;
        } else {
            clearInterval(temporizador);
            onTimerEnd();
        }
    }, 1000);
});

// Función para mostrar el efecto de escritura
function mostrarEfectoEscritura(texto) {
    const theLetters = "abcdefghijklmnopqrstuvwxyz"; // Letras aleatorias

    var speed = 20; // ms por frame
    var increment = 4; // frames por paso. Debe ser > 2

    let clen = texto.length;
    let si = 0;
    let stri = 0;
    let block = "";
    let fixed = "";

    (function rustle(i) {
        setTimeout(function () {
            if (--i) { rustle(i); }
            nextFrame(i);
            si = si + 1;
        }, speed); // Velocidad del efecto
    })(clen * increment + 1);

    function nextFrame(pos) {
        for (let i = 0; i < clen - stri; i++) {
            // Número aleatorio
            let num = Math.floor(theLetters.length * Math.random());
            // Letra aleatoria
            let letter = theLetters.charAt(num);
            block = block + letter;
        }
        if (si == (increment - 1)) {
            stri++;
        }
        if (si == increment) {
            // Añadir letra
            fixed = fixed + texto.charAt(stri - 1);
            si = 0;
        }
        preguntaElem.innerHTML = fixed + block; // Actualizar el contenido del div
        block = "";
    }
}

const handIndicator = document.getElementById('hand-indicator');

// Detectar clic en el mazo
mazo.addEventListener('click', () => {
    handIndicator.style.display = 'none'; // Ocultar el dedo
});
