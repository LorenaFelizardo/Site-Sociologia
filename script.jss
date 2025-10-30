// Espera o DOM carregar completamente
window.addEventListener("DOMContentLoaded", () => {

  // ==== ACESSIBILIDADE ====
  let tamanhoFonte = 100;
  let contrasteAtivo = false;
  let leituraAtiva = false;

  const body = document.body;
  const aumentarTexto = document.querySelector("#aumentarTexto");
  const diminuirTexto = document.querySelector("#diminuirTexto");
  const contrasteBtn = document.querySelector("#altoContraste");
  const leitorBtn = document.querySelector("#leitorVoz");

  // Função para alterar fonte
  const atualizarFonte = () => body.style.fontSize = tamanhoFonte + "%";

  // Botão Aumentar texto
  aumentarTexto.addEventListener("click", () => {
    if (tamanhoFonte < 150) {
      tamanhoFonte += 10;
      atualizarFonte();
    }
  });

  // Botão Diminuir texto
  diminuirTexto.addEventListener("click", () => {
    if (tamanhoFonte > 80) {
      tamanhoFonte -= 10;
      atualizarFonte();
    }
  });

  // Botão Contraste
  contrasteBtn.addEventListener("click", () => {
    contrasteAtivo = !contrasteAtivo;
    body.classList.toggle("alto-contraste", contrasteAtivo);
  });

  // Botão Leitura de voz
  leitorBtn.addEventListener("click", () => {
    if (!leituraAtiva) {
      leituraAtiva = true;
      const utterance = new SpeechSynthesisUtterance();
      // Só lê o conteúdo principal
      const texto = document.querySelector("body").innerText;
      utterance.text = texto;
      utterance.lang = "pt-BR";
      utterance.rate = 1.0;
      speechSynthesis.speak(utterance);
      leitorBtn.textContent = "⏸️ Pausar";

      // Quando terminar a leitura, reseta botão
      utterance.onend = () => {
        leituraAtiva = false;
        leitorBtn.textContent = "🔊 Ouvir";
      };
    } else {
      leituraAtiva = false;
      speechSynthesis.cancel();
      leitorBtn.textContent = "🔊 Ouvir";
    }
  });

});
