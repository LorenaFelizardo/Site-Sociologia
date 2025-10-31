// === GARANTIR QUE O CÓDIGO RODE APÓS O CARREGAMENTO ===
document.addEventListener("DOMContentLoaded", () => {

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
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const form = document.getElementById("form-arvore");

  // Carregar mensagens salvas
  const mensagens = JSON.parse(localStorage.getItem("mensagensArvore")) || [];

  canvas.width = window.innerWidth * 0.8;
  canvas.height = 600;

  function desenharGalho(x1, y1, comprimento, angulo, profundidade, espessura) {
    if (profundidade === 0) return;

    const x2 = x1 + Math.cos(angulo) * comprimento;
    const y2 = y1 - Math.sin(angulo) * comprimento;

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

    const numGalhos = 2;
    for (let i = 0; i < numGalhos; i++) {
      const novoAng = angulo + (i === 0 ? -0.5 : 0.5);
      const novoComp = comprimento * 0.8;
      const novaEsp = espessura * 0.7;
      desenharGalho(x2, y2, novoComp, novoAng, profundidade - 1, novaEsp);
    }
  }

  function desenharArvore() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    desenharGalho(canvas.width / 2, canvas.height, 180, Math.PI / 2, 5, 20);

    mensagens.forEach(msg => {
      ctx.beginPath();
      ctx.fillStyle = msg.cor;
      ctx.arc(msg.x, msg.y, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 1;
      ctx.strokeStyle = "#2e7d32";
      ctx.stroke();

      ctx.fillStyle = "#fff";
      ctx.font = "bold 10px Poppins";
      ctx.textAlign = "center";

      const palavras = msg.texto.split(" ");
      let linha1 = palavras.slice(0, 2).join(" ");
      let linha2 = palavras.slice(2).join(" ");
      ctx.fillText(linha1, msg.x, msg.y - 2);
      if (linha2) ctx.fillText(linha2, msg.x, msg.y + 10);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const texto = document.getElementById("mensagem").value.trim();
    if (!texto) return;

    const proibidas = ["palavrão", "idiota", "burro", "estúpido", "otário"];
    if (proibidas.some(p => texto.toLowerCase().includes(p))) {
      alert("Por favor, use uma linguagem respeitosa 💬");
      return;
    }

    const novaMensagem = {
      texto,
      x: canvas.width / 2 + (Math.random() - 0.5) * 500,
      y: 100 + Math.random() * 400,
      cor: `hsl(${Math.random() * 120}, 70%, 45%)`
    };

    mensagens.push(novaMensagem);

    // Salvar localmente
    localStorage.setItem("mensagensArvore", JSON.stringify(mensagens));

    document.getElementById("mensagem").value = "";
    desenharArvore();
  });

  desenharArvore();
});
