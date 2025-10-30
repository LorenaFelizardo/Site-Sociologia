script 


// === ACESSIBILIDADE ===
let tamanhoFonte = 100;
const body = document.body;
const aumentarTexto = document.getElementById("aumentarTexto");
const diminuirTexto = document.getElementById("diminuirTexto");




aumentarTexto.addEventListener("click", () => {
  if (tamanhoFonte < 150) {
    tamanhoFonte += 10;
    body.style.fontSize = tamanhoFonte + "%";
  }
});




diminuirTexto.addEventListener("click", () => {
  if (tamanhoFonte > 80) {
    tamanhoFonte -= 10;
    body.style.fontSize = tamanhoFonte + "%";
  }
});




const contrasteBtn = document.getElementById("altoContraste");
let contrasteAtivo = false;




contrasteBtn.addEventListener("click", () => {
  contrasteAtivo = !contrasteAtivo;
  document.body.classList.toggle("alto-contraste", contrasteAtivo);
});




const leitorBtn = document.getElementById("leitorVoz");
let leituraAtiva = false;




leitorBtn.addEventListener("click", () => {
  if (!leituraAtiva) {
    leituraAtiva = true;
    const texto = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.rate = 1.0;
    speechSynthesis.speak(utterance);
    leitorBtn.textContent = "⏸️ Pausar";
  } else {
    leituraAtiva = false;
    speechSynthesis.cancel();
    leitorBtn.textContent = "🔊 Ouvir";
  }
});




// === ÁRVORE INTERATIVA ===
const canvas = document.getElementById("canvas-arvore");
const ctx = canvas.getContext("2d");
const form = document.getElementById("form-arvore");
const mensagens = [];




canvas.width = window.innerWidth * 0.8;
canvas.height = 600;




// Função para desenhar galhos estilo Guapuruvu
function desenharGalho(x1, y1, comprimento, angulo, profundidade, espessura) {
  if (profundidade === 0) return;




  const x2 = x1 + Math.cos(angulo) * comprimento;
  const y2 = y1 - Math.sin(angulo) * comprimento;




  // Gradiente do galho
  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, "#6b4226");
  grad.addColorStop(1, "#4e342e");




  ctx.lineWidth = espessura;
  ctx.strokeStyle = grad;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.bezierCurveTo(
    x1 + Math.cos(angulo) * comprimento / 3,
    y1 - Math.sin(angulo) * comprimento / 3,
    x1 + Math.cos(angulo + 0.15) * (2 * comprimento / 3),
    y1 - Math.sin(angulo + 0.15) * (2 * comprimento / 3),
    x2,
    y2
  );
  ctx.stroke();




  // Ramificação espaçada estilo Guapuruvu
  const numGalhos = 2; // menos galhos para mais espaço
  for (let i = 0; i < numGalhos; i++) {
    const novoAng = angulo + (i === 0 ? -0.5 : 0.5); // galhos abertos e espaçados
    const novoComp = comprimento * (0.8); // galhos longos
    const novaEsp = espessura * 0.7;
    desenharGalho(x2, y2, novoComp, novoAng, profundidade - 1, novaEsp);
  }
}




// Desenhar árvore estática estilo Guapuruvu
function desenharArvore() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);




  // Tronco principal longo e reto
  desenharGalho(canvas.width / 2, canvas.height, 180, Math.PI / 2, 5, 20);




  // Folhas (mensagens) estáticas
  mensagens.forEach(msg => {
    ctx.beginPath();
    ctx.fillStyle = msg.cor;
    ctx.arc(msg.x, msg.y, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px Poppins";
    ctx.textAlign = "center";
    ctx.fillText("💬", msg.x, msg.y + 4);
  });
}




// Adicionar mensagens de usuários
form.addEventListener("submit", e => {
  e.preventDefault();
  const texto = document.getElementById("mensagem").value.trim();
  if (!texto) return;




  const proibidas = ["palavrão", "idiota", "burro", "estúpido", "otário"];
  if (proibidas.some(p => texto.toLowerCase().includes(p))) {
    alert("Por favor, use uma linguagem respeitosa 💬");
    return;
  }




  mensagens.push({
    texto,
    x: canvas.width / 2 + (Math.random() - 0.5) * 500, // mais espaço lateral
    y: 100 + Math.random() * 400, // mais espaço vertical
    cor: `hsl(${Math.random() * 120}, 70%, 45%)`
  });




  document.getElementById("mensagem").value = "";
  desenharArvore();
});




// Inicializa árvore
desenharArvore();









