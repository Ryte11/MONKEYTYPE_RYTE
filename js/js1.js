const words_list = [
  "a",
  "again",
  "all",
  "also",
  "and",
  "another",
  "any",
  "around",
  "as",
  "ask",
  "at",
  "back",
  "because",
  "become",
  "before",
  "begin",
  "both",
  "but",
  "by",
  "call",
  "can",
  "change",
  "child",
  "come",
  "could",
  "course",
  "day",
  "develop",
  "each",
  "early",
  "end",
  "even",
  "eye",
  "face",
  "fact",
  "few",
  "first",
  "follow",
  "from",
  "general",
  "get",
  "give",
  "good",
  "govern",
  "group",
  "hand",
  "have",
  "he",
  "head",
  "help",
  "here",
  "high",
  "hold",
  "home",
  "how",
  "however",
  "if",
  "increase",
  "interest",
  "it",
  "know",
  "large",
  "last",
  "lead",
  "leave",
  "life",
  "like",
  "line",
  "little",
  "look",
  "make",
  "man",
  "may",
  "mean",
  "might",
  "more",
  "must",
  "need",
  "never",
  "new",
  "no",
  "now",
  "number",
  "of",
  "off",
  "old",
  "on",
  "one",
  "open",
  "or",
  "order",
  "out",
  "over",
  "own",
  "part",
  "people",
  "person",
  "place",
  "plan",
  "play",
  "point",
  "possible",
  "present",
  "problem",
  "program",
  "public",
  "real",
  "right",
  "run",
  "say",
  "see",
  "seem",
  "show",
  "small",
  "some",
  "stand",
  "state",
  "still",
  "such",
  "system",
  "take",
  "than",
  "that",
  "the",
  "then",
  "there",
  "these",
  "they",
  "thing",
  "think",
  "this",
  "those",
  "time",
  "to",
  "under",
  "up",
  "use",
  "very",
  "way",
  "what",
  "when",
  "where",
  "while",
  "will",
  "with",
  "without",
  "work",
  "world",
  "would",
  "write",
  "you",
  "she",
  "set",
  "we",
  "long",
  "in",
  "many",
  "do",
  "after",
  "which",
  "so",
  "same",
  "other",
  "house",
  "during",
  "much",
  "just",
  "consider",
  "since",
  "should",
  "only",
  "tell",
  "about"
]


function getRandomWords(count) {
    const selectedWords = [];
    const wordsCopy = [...words_list];
    
    for(let i = 0; i < count && wordsCopy.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * wordsCopy.length);
        selectedWords.push(wordsCopy.splice(randomIndex, 1)[0]);
    }
    
    return selectedWords;
}

const $time = document.querySelector('time');
const $parrafo = document.querySelector('p');
const $input = document.querySelector('input'); 

let words = [];
const Intitial_time = 30;
let correctChars = 0;
let totalChars = 0;
let totalWords = 0;
let currentTime = Intitial_time;
let intervalId;

initGame();
initEvents();

function initGame() {
    words = getRandomWords(25);
    currentTime = Intitial_time;
    correctChars = 0;
    totalChars = 0;
    totalWords = 0;

    $time.textContent = currentTime;
  
    $parrafo.innerHTML = words.map((word, index) => {
        const letras = word.split('');
        return `<word>
            ${letras
                .map(letra => `<letra>${letra}</letra>`)
                .join('')
            }
        </word><span class="word-space"> </span>`;
    }).join('');

    const $PrimeraPalabra = $parrafo.querySelector('word');
    if ($PrimeraPalabra) {
        $PrimeraPalabra.classList.add('active');
        const $PrimeraLetra = $PrimeraPalabra.querySelector('letra');
        if ($PrimeraLetra) {
            $PrimeraLetra.classList.add('active');
        }
    }

    if (intervalId) {
        clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
        currentTime--;
        $time.textContent = currentTime;
        
        if (currentTime === 0) {
            clearInterval(intervalId);
            gameOver();
        }
    }, 1000);
}

function initEvents() {
    document.addEventListener('keydown', () => {
        $input.focus();
    });
    $input.addEventListener('keydown', onkeydown);
    $input.addEventListener('keyup', onkeyup);
}

function onkeyup() {
    const $currentword = $parrafo.querySelector('word.active');

    if (!$currentword) return;

    const $currentLetra = $currentword.querySelector('letra.active');
    
    if (!$currentLetra) return;

    $input.maxLength = $currentword.innerText.trim().length;
    const currentword = $currentword.innerText.trim();
    
    const $TodasLetras = $currentword.querySelectorAll('letra');
    $TodasLetras.forEach($letra => $letra.classList.remove('correct', 'incorrect'));

    $input.value.split('').forEach((char, index) => {
        const $letra = $TodasLetras[index];   
        if ($letra) {
            const letraToCheck = currentword[index];
            const iscorrect = char === letraToCheck;
            const letraclass = iscorrect ? 'correct' : 'incorrect';
            $letra.classList.add(letraclass);
        }
    });
    
    $currentLetra.classList.remove('active', 'is-last');
    const inputLenght = $input.value.length;
    const $nextactiveletra = $TodasLetras[inputLenght];

    if ($nextactiveletra) {
        $nextactiveletra.classList.add('active');
    } else {
        $currentLetra.classList.add('active', 'is-last');
    }
}

function onkeydown(event) {
    const $currentword = $parrafo.querySelector('word.active');
    if (!$currentword) return;

    const key = event.key;

    if (key === 'Backspace') {
        const $allLetras = $currentword.querySelectorAll('letra');
        const $currentLetra = $currentword.querySelector('letra.active');
        if (!$currentLetra) return;

        const currentIndex = Array.from($allLetras).findIndex(letra => 
            letra.classList.contains('active')
        );

        if (currentIndex > 0) {
            $allLetras[currentIndex].classList.remove('active');
            $allLetras[currentIndex - 1].classList.add('active');
            $allLetras[currentIndex - 1].classList.remove('correct', 'incorrect');
        }
        return;
    }

    if (key === ' ') {
        event.preventDefault();

        // Contar caracteres correctos e incorrectos
        const $letras = $currentword.querySelectorAll('letra');
        $letras.forEach(letra => {
            totalChars++;
            if (letra.classList.contains('correct')) {
                correctChars++;
            }
        });
        totalWords++;

        // Buscar la siguiente palabra después del span
        const $wordSpace = $currentword.nextElementSibling;
        if (!$wordSpace) return;
        
        const $nextword = $wordSpace.nextElementSibling;
        if (!$nextword) return;

        // Limpiar clases de la palabra actual
        $currentword.classList.remove('active');
        const $currentLetra = $currentword.querySelector('letra.active');
        if ($currentLetra) {
            $currentLetra.classList.remove('active');
        }

        // Activar la siguiente palabra y su primera letra
        $nextword.classList.add('active');
        const $nextletra = $nextword.querySelector('letra');
        if ($nextletra) {
            $nextletra.classList.add('active');
        }

        // Verificar si hay letras incorrectas
        const hasMissedLetters = $currentword.querySelectorAll('letra:not(.correct)').length > 0;
        const classToAdd = hasMissedLetters ? 'marked' : 'correct';
        $currentword.classList.add(classToAdd);

        // Limpiar el input
        $input.value = '';
    }
}

function gameOver() {
    const timeInMinutes = Intitial_time / 60;
    const wpm = Math.round(totalWords / timeInMinutes);
    const accuracy = Math.round((correctChars / totalChars) * 100) || 0;

    const resultsHTML = `
        <div id="results" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--black);
            padding: 20px;
            border-radius: 8px;
            border: 2px solid var(--yellow);
            text-align: center;
            z-index: 1000;
        ">
            <h2 style="color: var(--yellow);">¡Tiempo terminado!</h2>
            <p style="color: var(--green);">WPM: ${wpm}</p>
            <p style="color: var(--green);">Precisión: ${accuracy}%</p>
            <button onclick="restartGame()" style="
                background: var(--yellow);
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 10px;
            ">Jugar de nuevo</button>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', resultsHTML);
    $input.disabled = true;
}

function restartGame() {
    const resultsElement = document.getElementById('results');
    if (resultsElement) {
        resultsElement.remove();
    }

    correctChars = 0;
    totalChars = 0;
    totalWords = 0;

    $input.disabled = false;
    $input.value = '';

    initGame();
}


