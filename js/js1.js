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
    
    // Control para retroceso entre palabras
    if (key === 'Backspace' && $input.value === '') {
        const $previousWord = $currentword.previousElementSibling?.previousElementSibling;
        if ($previousWord && $previousWord.classList.contains('marked')) {
            event.preventDefault();
            
            // Remover clases de la palabra actual
            $currentword.classList.remove('active');
            $currentword.querySelectorAll('letra').forEach($letra => {
                $letra.classList.remove('active', 'correct', 'incorrect');
            });
            
            // Restaurar la palabra anterior
            $previousWord.classList.remove('marked', 'correct');
            $previousWord.classList.add('active');
            
            // Restaurar el estado de las letras
            const $letras = $previousWord.querySelectorAll('letra');
            const previousWord = $previousWord.textContent.trim();
            
            // Configurar el estado inicial de las letras
            $letras.forEach(($letra, index) => {
                $letra.classList.remove('active', 'correct', 'incorrect');
                if (index < $input.value.length) {
                    const isCorrect = $input.value[index] === previousWord[index];
                    $letra.classList.add(isCorrect ? 'correct' : 'incorrect');
                }
            });
            
            // Activar la última letra
            const lastIndex = previousWord.length - 1;
            if (lastIndex >= 0) {
                $letras[lastIndex].classList.add('active');
            }
            
            // Restaurar el texto en el input y actualizar maxLength
            $input.value = previousWord;
            $input.maxLength = previousWord.length;
            
            // Actualizar contadores
            totalWords--;
            totalChars -= $letras.length;
            return;
        }
        return;
    }

    // Control para borrado de letras individuales
    if (key === 'Backspace' && $input.value.length > 0) {
        const $allLetras = $currentword.querySelectorAll('letra');
        const currentIndex = $input.value.length - 1;
        const wordText = $currentword.textContent.trim();
        
        // Limpiar todas las letras después de la posición actual
        for (let i = currentIndex; i < $allLetras.length; i++) {
            $allLetras[i].classList.remove('correct', 'incorrect', 'active');
        }
        
        // Verificar y marcar las letras anteriores
        for (let i = 0; i < currentIndex; i++) {
            const isCorrect = $input.value[i] === wordText[i];
            $allLetras[i].classList.remove('active');
            $allLetras[i].classList.toggle('correct', isCorrect);
            $allLetras[i].classList.toggle('incorrect', !isCorrect);
        }
        
        // Activar la letra actual
        if ($allLetras[currentIndex]) {
            $allLetras[currentIndex].classList.add('active');
        }
        return;
    }

    if (key === ' ') {
        event.preventDefault();

        // Verificar si hay letras incorrectas antes de proceder
        const $letras = $currentword.querySelectorAll('letra');
        const wordText = $currentword.textContent.trim();
        const inputText = $input.value;
        
        // Solo proceder si la longitud del input coincide con la palabra
        if (inputText.length !== wordText.length) {
            return;
        }

        // Contar caracteres y verificar errores
        let hasErrors = false;
        $letras.forEach((letra, index) => {
            totalChars++;
            if (inputText[index] === wordText[index]) {
                correctChars++;
            } else {
                hasErrors = true;
            }
        });
        totalWords++;

        // Buscar la siguiente palabra
        const $wordSpace = $currentword.nextElementSibling;
        if (!$wordSpace) return;
        
        const $nextword = $wordSpace.nextElementSibling;
        if (!$nextword) return;

        // Actualizar clases de la palabra actual
        $currentword.classList.remove('active');
        $currentword.querySelectorAll('letra.active').forEach($letra => {
            $letra.classList.remove('active');
        });
        $currentword.classList.add(hasErrors ? 'marked' : 'correct');

        // Preparar la siguiente palabra
        $nextword.classList.add('active');
        const $nextletra = $nextword.querySelector('letra');
        if ($nextletra) {
            $nextletra.classList.add('active');
        }

        // Limpiar input y actualizar maxLength
        $input.value = '';
        $input.maxLength = $nextword.textContent.trim().length;
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


