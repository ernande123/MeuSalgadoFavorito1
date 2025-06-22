let carrinho = [];

function fazerPedido(item, preco) {
  carrinho.push({ item, preco });
  alert(`Você pediu: ${item} adicionado ao carrinho!`);
}

function mostrarCarrinho() {
  const divCarrinho = document.getElementById("carrinho");
  const lista = document.getElementById("lista-carrinho");
  const totalSpan = document.getElementById("total");
  lista.innerHTML = "";

  let total = 0;

  carrinho.forEach(produto => {
    const li = document.createElement("li");
    li.textContent = `${produto.item} - R$ ${produto.preco.toFixed(2)}`;
    lista.appendChild(li);
    total += produto.preco;
  });

  totalSpan.textContent = total.toFixed(2);
  divCarrinho.style.display = "block";
}

function finalizarPedido() {
  document.getElementById("form-finalizar").style.display = "block";
}

function confirmarPedido() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const endereco = document.getElementById("endereco").value.trim();
  const pagamento = document.getElementById("pagamento").value;
  const celular = document.getElementById("celular").value.trim();

  if (!endereco) {
    alert("Por favor, preencha o endereço!");
    return;
  }

  let mensagem = "Olá! Gostaria de fazer o seguinte pedido:\n\n";

  carrinho.forEach(produto => {
    mensagem += `- ${produto.item} - R$ ${produto.preco.toFixed(2)}\n`;
  });

  const total = carrinho.reduce((sum, produto) => sum + produto.preco, 0);
  mensagem += `\nTotal: R$ ${total.toFixed(2)}\n`;
  mensagem += `Endereço: ${endereco}\n`;
  mensagem += `Forma de Pagamento: ${pagamento}\n`;

  if (celular) {
    mensagem += `Celular para contato: ${celular}\n`;
  }

  const telefone = "5582991084029"; // Seu número com DDI + DDD
  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");

  // ✅ Limpar carrinho e esconder formulários após envio
  carrinho = [];
  document.getElementById("carrinho").style.display = "none";
  document.getElementById("form-finalizar").style.display = "none";
}

