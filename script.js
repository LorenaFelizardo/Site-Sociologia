document.addEventListener("DOMContentLoaded", () => {
  // Acessibilidade
  const aumentarTexto = document.getElementById("aumentarTexto");
  const diminuirTexto = document.getElementById("diminuirTexto");
  const leitorVoz = document.getElementById("leitorVoz");
  const altoContraste = document.getElementById("altoContraste");

  let tamanhoFonte = 100;
  let contrasteAtivo = false;

  if (aumentarTexto) {
    aumentarTexto.addEventListener("click", () => {
      tamanhoFonte += 10;
      document.body.style.fontSize = `${tamanhoFonte}%`;
    });
  }

  if (diminuirTexto) {
    diminuirTexto.addEventListener("click", () => {
      tamanhoFonte -= 10;
      if (tamanhoFonte < 50) tamanhoFonte = 50;
      document.body.style.fontSize = `${tamanhoFonte}%`;
    });
  }

  if (leitorVoz) {
    leitorVoz.addEventListener("click", () => {
      const texto = document.body.innerText;
      const fala = new SpeechSynthesisUtterance(texto);
      fala.lang = "pt-BR";
      window.speechSynthesis.speak(fala);
    });
  }

  if (altoContraste) {
    altoContraste.addEventListener("click", () => {
      contrasteAtivo = !contrasteAtivo;
      document.body.style.backgroundColor = contrasteAtivo ? "black" : "white";
      document.body.style.color = contrasteAtivo ? "yellow" : "black";
    });
  }

  // Árvore interativa
  const canvas = document.getElementById("treeCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const folhas = [];

    canvas.width = (window.innerWidth || 800) * 0.8;
    canvas.height = 400;

    // Tronco
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(canvas.width / 2 - 10, canvas.height - 100, 20, 100);

    function desenharFolha(x, y, cor) {
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = cor;
      ctx.fill();
    }

    function novaFolha() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height - 120);
      const cor = `hsl(${Math.random() * 120}, 80%, 45%)`;
      folhas.push({ x, y, cor });
      desenharFolha(x, y, cor);
    }

    const botaoOpiniao = document.getElementById("adicionarOpiniao");
    if (botaoOpiniao) {
      botaoOpiniao.addEventListener("click", () => novaFolha());
    }
  }
});
