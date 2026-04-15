/* =========================================
   SESIÓN: DISTRIBUCIÓN BINOMIAL LÓGICA
   Identificador: -binom
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    
	// --- 1. MODO MAESTRO (Contraseña 1983) ---
	const titleBinom = document.getElementById("title-binom");
	if(titleBinom) {
					titleBinom.addEventListener("dblclick", () => {
									const pwd = prompt("Ingrese código de acceso docente:");
									if (pwd === "1983") {
													document.querySelectorAll(".teacher-note-binom").forEach(note => {
																	note.style.display = "block";
													});
													alert("Modo Maestro Desbloqueado. Notas pedagógicas visibles.");
									} else if (pwd !== null) {
													alert("Código incorrecto.");
									}
					});
	}

	// --- 2. LÓGICA DEL SIMULADOR BINOMIAL ---
	const inputN = document.getElementById("input-n-binom");
	const inputP = document.getElementById("input-p-binom");
	const inputX = document.getElementById("input-x-binom");
	
	const valN = document.getElementById("val-n-binom");
	const valP = document.getElementById("val-p-binom");
	const valX = document.getElementById("val-x-binom");
	const resultBox = document.getElementById("calc-result-binom");

	// Función Factorial
	function factorial(num) {
					if (num === 0 || num === 1) return 1;
					let res = 1;
					for (let i = 2; i <= num; i++) res *= i;
					return res;
	}

	// Calcular Combinatoria
	function combinatoria(n, x) {
					return factorial(n) / (factorial(x) * factorial(n - x));
	}

	function actualizarSimulador() {
					if(!inputN) return; // Prevención si no está en la página
					
					let n = parseInt(inputN.value);
					let p = parseFloat(inputP.value);
					let x = parseInt(inputX.value);

					// Limitar x para que no sea mayor que n
					if (x > n) {
									x = n;
									inputX.value = n;
					}
					inputX.max = n;

					valN.innerText = n;
					valP.innerText = p.toFixed(1);
					valX.innerText = x;

					let q = 1 - p;
					let comb = combinatoria(n, x);
					let prob = comb * Math.pow(p, x) * Math.pow(q, n - x);
					let porcentaje = (prob * 100).toFixed(2);

					resultBox.innerText = `P(X = ${x}) = ${porcentaje}%`;
	}

	if(inputN && inputP && inputX) {
					inputN.addEventListener("input", actualizarSimulador);
					inputP.addEventListener("input", actualizarSimulador);
					inputX.addEventListener("input", actualizarSimulador);
					actualizarSimulador(); // Llamada inicial
	}
});

// --- 3. LÓGICA DEL QUIZ KAHOOT ---
const quizDataBinom = [
	{ q: "¿Cuántos resultados posibles tiene cada ensayo en una binomial?", a: ["Uno", "Dos (Éxito y Fracaso)", "Tres o más", "Infinitos"], c: 1 },
	{ q: "Si la probabilidad de éxito (p) es 0.3, ¿cuál es la probabilidad de fracaso (q)?", a: ["0.3", "0.5", "0.7", "1.0"], c: 2 },
	{ q: "¿Qué representa 'n' en la fórmula de la distribución binomial?", a: ["Número de éxitos", "Probabilidad total", "Variable aleatoria", "Número total de ensayos"], c: 3 },
	{ q: "¿Qué condición es estrictamente obligatoria?", a: ["Ensayos dependientes", "Ensayos independientes", "p debe ser mayor a q", "n debe ser infinito"], c: 1 },
	{ q: "¿Cuál es la fórmula de la Media (esperanza) en una Binomial?", a: ["n*p*q", "n*p", "p*q", "n/p"], c: 1 },
	{ q: "Si lanzo una moneda justa 10 veces, ¿cuál es la media de águilas esperadas?", a: ["10", "2", "5", "0.5"], c: 2 },
	{ q: "¿Qué significa X en la ecuación P(X=x)?", a: ["La variable aleatoria discreta", "La probabilidad de fracaso", "El número de ensayos", "La combinatoria"], c: 0 },
	{ q: "En control de calidad, sacar piezas defectuosas de un lote infinito es un ejemplo de...", a: ["Distribución Continua", "Distribución Binomial", "Teorema de Pitágoras", "Distribución Uniforme"], c: 1 },
	{ q: "¿Cuál es el valor de 0! (cero factorial)?", a: ["0", "1", "Infinito", "Error Matemático"], c: 1 },
	{ q: "¿Cómo se calcula la varianza en una distribución binomial?", a: ["n*p*q", "n*p", "n/q", "p/q"], c: 0 }
];

let currentQBinom = 0;
let scoreBinom = 0;

function startQuizBinom() {
	currentQBinom = 0;
	scoreBinom = 0;
	renderQuestionBinom();
}

function renderQuestionBinom() {
	const board = document.getElementById("kahoot-board-binom");
	if (currentQBinom >= quizDataBinom.length) {
					board.innerHTML = `<h2>¡Reto Completado!</h2>
																								<p class="quiz-question-binom">Tu puntuación es: ${scoreBinom} de 10</p>
																								<button class="btn-start-binom" onclick="startQuizBinom()">Reintentar</button>`;
					return;
	}

	const data = quizDataBinom[currentQBinom];
	const colors = ['c1', 'c2', 'c3', 'c4'];
	
	let html = `<div class="quiz-question-binom">Pregunta ${currentQBinom + 1}: ${data.q}</div>`;
	html += `<div class="quiz-grid-binom">`;
	data.a.forEach((ans, index) => {
					html += `<button class="ans-btn-binom ${colors[index]}" onclick="checkAnswerBinom(${index})">${ans}</button>`;
	});
	html += `</div>`;
	
	board.innerHTML = html;
}

function checkAnswerBinom(selectedIndex) {
	const correctIndex = quizDataBinom[currentQBinom].c;
	if (selectedIndex === correctIndex) {
					scoreBinom++;
					// Aquí podrías agregar un sonido de éxito
	} else {
					// Aquí podrías agregar un sonido de error
	}
	currentQBinom++;
	renderQuestionBinom();
}