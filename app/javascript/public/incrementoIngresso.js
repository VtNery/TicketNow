document.addEventListener("DOMContentLoaded", function () {
    // Função de total
    const botoesAdicionar = document.querySelectorAll(".adicionaringresso");
    const botoesSubtrair = document.querySelectorAll(".subtrairingresso");
    const totalDisplay = document.querySelector(".totalIngresso");
  
    function atualizarTotal() {
      let total = 0;
      const cards = document.querySelectorAll(".precoIngresso");
  
      cards.forEach((precoEl, index) => {
        const preco = parseFloat(precoEl.textContent.replace(",", "."));
        const counter = document.querySelectorAll(".counter")[index];
        const quantidade = parseInt(counter.textContent);
        total += preco * quantidade;
      });
  
      totalDisplay.textContent = total.toFixed(2).replace(".", ",");
      localStorage.setItem("totalIngresso", total.toFixed(2));
    }
  
    botoesAdicionar.forEach((botao, index) => {
      botao.addEventListener("click", function () {
        const counter = document.querySelectorAll(".counter")[index];
        counter.textContent = parseInt(counter.textContent) + 1;
        atualizarTotal();
      });
    });
  
    botoesSubtrair.forEach((botao, index) => {
      botao.addEventListener("click", function () {
        const counter = document.querySelectorAll(".counter")[index];
        let valorAtual = parseInt(counter.textContent);
        if (valorAtual > 0) {
          counter.textContent = valorAtual - 1;
          atualizarTotal();
        }
      });
    }); 
    
});