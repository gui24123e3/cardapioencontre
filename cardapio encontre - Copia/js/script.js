// Objeto 'lojas' foi removido daqui

let lojaAtual = null;
let carrinho = {};
let isSharedLink = false;

function getBaseUrl() {
  return window.location.origin + window.location.pathname;
}

function filtrarLojas(categoria) {
  carregarLojas(categoria);
  document.querySelectorAll("#categorias-lojas button").forEach((btn) => {
    btn.classList.remove("active", "bg-red-600", "text-white");
    btn.classList.add("bg-gray-200", "text-gray-800");
    if (btn.textContent === categoria) {
      btn.classList.add("active", "bg-red-600", "text-white");
      btn.classList.remove("bg-gray-200", "text-gray-800");
    }
  });
}

function carregarLojas(categoria = "Todas") {
  const containerLojas = document.getElementById("lojas");
  containerLojas.innerHTML = "";
  let count = 0;
  // Agora 'lojas' é acessado globalmente pois foi definido em lojas.js
  Object.keys(lojas).forEach((id) => {
    const loja = lojas[id];
    if (categoria === "Todas" || loja.categoria === categoria) {
      count++;
      const div = document.createElement("div");
      div.className =
        "cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300";
      div.onclick = () => abrirLoja(id);
      div.innerHTML = `
                <img src="${loja.imagem_loja}" class="rounded-t-xl w-full h-52 object-cover" alt="${loja.nome}">
                <div class="p-4">
                    <h3 class="text-lg font-semibold">🍽️ ${loja.nome}</h3>
                    <span class="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">${loja.categoria}</span>
                    <p class="text-sm text-gray-600 mt-1">⭐ 4.8 · ${loja.horario_abre}-${loja.horario_fecha}</p>
                    <p class="text-xs mt-2 text-gray-500">${loja.descricao}</p>
                </div>
            `;
      containerLojas.appendChild(div);
    }
  });
  if (count === 0) {
    containerLojas.innerHTML = `<p class="text-center text-gray-500 col-span-1 sm:col-span-2">Nenhuma loja encontrada nesta categoria.</p>`;
  }
}

function lojaEstaAberta(abre, fecha) {
  const agora = new Date();
  const [horaAbre, minAbre] = abre.split(":").map(Number);
  const [horaFecha, minFecha] = fecha.split(":").map(Number);
  const dataAbre = new Date();
  dataAbre.setHours(horaAbre, minAbre, 0, 0);
  const dataFecha = new Date();
  dataFecha.setHours(horaFecha, minFecha, 0, 0);
  if (dataFecha < dataAbre) {
    dataFecha.setDate(dataFecha.getDate() + 1);
  }
  if (
    agora < dataAbre &&
    agora < dataFecha &&
    dataFecha.getDate() > dataAbre.getDate()
  ) {
    const dataAbreOntem = new Date(dataAbre);
    dataAbreOntem.setDate(dataAbreOntem.getDate() - 1);
    return agora >= dataAbreOntem && agora <= dataFecha;
  }
  return agora >= dataAbre && agora <= dataFecha;
}

function abrirLoja(id) {
  if (!lojas[id]) {
    console.error("Loja não encontrada:", id);
    voltarInicio();
    return;
  }
  lojaAtual = { ...lojas[id], id: id };
  carrinho = {}; // Resetar carrinho ao abrir uma nova loja
  const aberta = lojaEstaAberta(
    lojaAtual.horario_abre,
    lojaAtual.horario_fecha
  );

  document.getElementById("imagemLojaTela").src = lojaAtual.imagem_loja;
  document.getElementById("nomeLoja").innerText = lojaAtual.nome;
  document.getElementById("descLoja").innerText = lojaAtual.descricao;
  document.getElementById("statusLoja").innerText = aberta
    ? "Aberto agora"
    : "Fechado no momento";
  document.getElementById("enderecoLoja").innerText = lojaAtual.endereco;

  const produtosDiv = document.getElementById("produtos");
  produtosDiv.innerHTML = "";

  Object.keys(lojaAtual.produtos).forEach((secaoNome) => {
    const secaoDiv = document.createElement("div");
    secaoDiv.className = "product-section";
    secaoDiv.innerHTML = `<h3 class="product-section-title">${secaoNome}</h3>`;
    let pizzaItemsToUpdate = [];

    lojaAtual.produtos[secaoNome].forEach((item) => {
      const div = document.createElement("div");

      if (item.tipo === "pizza") {
        div.className =
          "product-item flex-col bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition mb-3";
        div.id = `pizza-item-${item.id}`;

        let tamanhosHTML = "";
        item.opcoes.tamanhos.forEach((t, index) => {
          const isChecked = index === 0 ? "checked" : ""; // Seleciona o primeiro tamanho por padrão
          tamanhosHTML += `
                        <div>
                            <input type="radio" id="tamanho-${
                              item.id
                            }-${index}" name="tamanho-${
            item.id
          }" value="${index}" ${isChecked}
                                   onchange="updatePizzaOptions('${item.id}')">
                            <label for="tamanho-${item.id}-${index}">${
            t.nome
          } - R$ ${t.preco.toFixed(2)}</label>
                        </div>
                    `;
        });

        let saboresHTML = "";
        item.opcoes.sabores.forEach((s, index) => {
          saboresHTML += `
                        <div>
                            <input type="checkbox" id="sabor-${
                              item.id
                            }-${index}" name="sabor-${item.id}" value="${index}"
                                   data-preco="${
                                     s.preco_adicional
                                   }" onchange="updatePizzaOptions('${
            item.id
          }')">
                            <label for="sabor-${item.id}-${index}">${
            s.nome
          } (+ R$ ${s.preco_adicional.toFixed(2)})</label>
                        </div>
                    `;
        });

        div.innerHTML = `
                    <div class="flex items-start space-x-4">
                        <img src="${
                          item.imagem || "https://via.placeholder.com/64"
                        }" alt="${
          item.nome
        }" class="w-16 h-16 rounded object-cover border border-gray-200" />
                        <div class="flex-1">
                            <h4 class="font-semibold">${item.nome}</h4>
                            <p class="text-sm text-gray-500">Monte a sua!</p>
                        </div>
                        <p id="price-${
                          item.id
                        }" class="pizza-price">R$ 0.00</p> </div>
                    <div class="pizza-options mt-3">
                        <h5 class="text-sm font-medium text-gray-700">Tamanho:</h5>
                        <div id="tamanhos-${
                          item.id
                        }" class="space-y-1 mt-1">${tamanhosHTML}</div>
                    </div>
                    <div class="pizza-options mt-3">
                        <h5 class="text-sm font-medium text-gray-700">Sabores (<span id="max-sabores-${
                          item.id
                        }"></span>):</h5>
                        <div id="sabores-${
                          item.id
                        }" class="space-y-1 mt-1 max-h-40 overflow-y-auto">${saboresHTML}</div>
                    </div>
                     <button onclick="adicionarPizzaConfiguradaAoCarrinho('${
                       item.id
                     }')" class="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Adicionar ao Pedido</button>
                 `;
        pizzaItemsToUpdate.push(item.id); // Adiciona para atualização inicial
      } else {
        div.className =
          "product-item flex items-center bg-white rounded-lg shadow-sm p-3 space-x-4 hover:shadow-md transition mb-3";
        div.innerHTML = `
                     <img src="${
                       item.imagem || "https://via.placeholder.com/64"
                     }" alt="${
          item.nome
        }" class="w-16 h-16 rounded object-cover border border-gray-200" />
                     <div class="flex-1">
                         <h4 class="font-semibold">${item.nome}</h4>
                         <p class="text-sm text-gray-500">R$ ${item.preco.toFixed(
                           2
                         )}</p>
                     </div>
                     <div class="flex items-center">
                         <button onclick="changeQuantity('${
                           item.id
                         }', -1)" class="bg-gray-200 text-gray-700 px-2 py-1 rounded-l hover:bg-gray-300">-</button>
                         <input type="number" id="qnt-${
                           item.id
                         }" value="0" min="0" class="quantity-input border-t border-b border-gray-300 p-1 text-center" readonly>
                         <button onclick="changeQuantity('${
                           item.id
                         }', 1)" class="bg-gray-200 text-gray-700 px-2 py-1 rounded-r hover:bg-gray-300">+</button>
                     </div>
                 `;
      }
      secaoDiv.appendChild(div);
    });
    produtosDiv.appendChild(secaoDiv);

    // Chamar updatePizzaOptions para cada item de pizza após serem adicionados ao DOM
    pizzaItemsToUpdate.forEach((pizzaId) => {
      setTimeout(() => updatePizzaOptions(pizzaId), 0); // Pequeno delay para garantir que o DOM está pronto
    });
  });

  document.getElementById("lojas").classList.add("hidden");
  document.getElementById("categorias-lojas").classList.add("hidden");
  document.getElementById("tela-loja").classList.remove("hidden");
  document.getElementById("tela-pagamento").classList.add("hidden");
  atualizarCarrinhoVisual();
  calcularTotal();
}

function findProductById(productId) {
  for (const secao in lojaAtual.produtos) {
    const produto = lojaAtual.produtos[secao].find((p) => p.id === productId);
    if (produto) return produto;
  }
  return null;
}

function updatePizzaOptions(pizzaId) {
  const pizzaData = findProductById(pizzaId);
  if (!pizzaData || pizzaData.tipo !== "pizza") return 0;

  const tamanhosDiv = document.getElementById(`tamanhos-${pizzaId}`);
  const saboresDiv = document.getElementById(`sabores-${pizzaId}`);
  const selectedTamanhoInput = tamanhosDiv.querySelector(
    'input[type="radio"]:checked'
  );

  if (!selectedTamanhoInput) return 0; // Nenhum tamanho selecionado, não deveria acontecer com default

  const tamanhoIndex = selectedTamanhoInput.value;
  const tamanho = pizzaData.opcoes.tamanhos[tamanhoIndex];
  const maxSabores = tamanho.max_sabores;

  document.getElementById(
    `max-sabores-${pizzaId}`
  ).innerText = `Escolha até ${maxSabores} sabor(es)`;

  const checkboxes = saboresDiv.querySelectorAll('input[type="checkbox"]');
  let selecionados = 0;
  checkboxes.forEach((cb) => {
    if (cb.checked) selecionados++;
  });

  checkboxes.forEach((cb) => {
    cb.disabled = selecionados >= maxSabores && !cb.checked;
  });

  // Calcular preço
  let precoTotal = tamanho.preco;
  let maiorAdicional = 0;
  checkboxes.forEach((cb) => {
    if (cb.checked) {
      const adicional = parseFloat(cb.dataset.preco);
      if (adicional > maiorAdicional) maiorAdicional = adicional;
    }
  });
  precoTotal += maiorAdicional; // LÓGICA: Adiciona o maior valor adicional dos sabores selecionados

  document.getElementById(
    `price-${pizzaId}`
  ).innerText = `R$ ${precoTotal.toFixed(2)}`;
  return precoTotal;
}

function adicionarPizzaConfiguradaAoCarrinho(pizzaId) {
  const pizzaData = findProductById(pizzaId);
  if (!pizzaData || pizzaData.tipo !== "pizza") return;

  const tamanhoIndex = document.querySelector(
    `input[name="tamanho-${pizzaId}"]:checked`
  ).value;
  const tamanho = pizzaData.opcoes.tamanhos[tamanhoIndex];
  const checkboxes = document.querySelectorAll(
    `#sabores-${pizzaId} input[type="checkbox"]:checked`
  );

  if (checkboxes.length === 0) {
    alert("Por favor, escolha pelo menos um sabor!");
    return;
  }
  if (checkboxes.length > tamanho.max_sabores) {
    alert(
      `Você só pode escolher até ${tamanho.max_sabores} sabor(es) para este tamanho.`
    );
    return;
  }

  let saboresNomes = [];
  checkboxes.forEach((cb) => {
    const saborIndex = cb.value;
    saboresNomes.push(pizzaData.opcoes.sabores[saborIndex].nome);
  });

  const precoFinal = updatePizzaOptions(pizzaId); // Pega o preço já calculado
  const nomePizza = `Pizza ${pizzaData.nome} ${
    tamanho.nome
  } (${saboresNomes.join(" / ")})`;
  const cartPizzaId = `pizza_${pizzaData.id}_${Date.now()}`; // ID único para cada pizza configurada no carrinho

  carrinho[cartPizzaId] = {
    nome: nomePizza,
    preco: precoFinal,
    quantidade: 1,
    tipo: "pizza", // Tipo especial para tratar no carrinho se necessário
  };

  // Opcional: desmarcar checkboxes após adicionar
  checkboxes.forEach((cb) => (cb.checked = false));
  updatePizzaOptions(pizzaId); // Re-renderiza as opções (e preço) para o estado inicial

  atualizarCarrinhoVisual();
  calcularTotal();
  alert("Pizza adicionada ao carrinho!");
}

function changeQuantity(itemId, delta) {
  const input = document.getElementById(`qnt-${itemId}`);
  let currentItem = carrinho[itemId];
  if (!currentItem) {
    const produto = findProductById(itemId);
    // Só adiciona ao carrinho se for um produto simples e delta for positivo
    if (produto && produto.tipo !== "pizza" && delta > 0) {
      carrinho[itemId] = {
        nome: produto.nome,
        preco: produto.preco,
        quantidade: delta,
        tipo: "simples",
      };
    }
  } else {
    currentItem.quantidade += delta;
    if (currentItem.quantidade <= 0) {
      delete carrinho[itemId];
    }
  }
  // Atualiza o valor do input se ele existir e o item ainda estiver no carrinho
  if (input) {
    input.value = carrinho[itemId] ? carrinho[itemId].quantidade : 0;
  }
  atualizarCarrinhoVisual();
  calcularTotal();
}

function removerItemCarrinho(itemId) {
  delete carrinho[itemId];
  // Se for um item simples (não pizza configurada), resetar o input de quantidade
  const input = document.getElementById(`qnt-${itemId}`);
  if (input) input.value = 0;
  atualizarCarrinhoVisual();
  calcularTotal();
}

function atualizarCarrinhoVisual() {
  const carrinhoDiv = document.getElementById("carrinho-itens");
  carrinhoDiv.innerHTML = "";
  const isEmpty = Object.keys(carrinho).length === 0;

  const finalizarPedidoBtn = document.getElementById("btnFinalizarPedido");

  if (isEmpty) {
    carrinhoDiv.innerHTML =
      '<p class="text-gray-500 text-center">Seu carrinho está vazio.</p>';
    finalizarPedidoBtn.disabled = true;
  } else {
    Object.keys(carrinho).forEach((itemId) => {
      const item = carrinho[itemId];
      const itemDiv = document.createElement("div");
      itemDiv.className = "flex justify-between items-center py-1";
      itemDiv.innerHTML = `
                <span class="text-sm">${item.quantidade}x ${
        item.nome
      } (R$ ${item.preco.toFixed(2)})</span>
                <button onclick="removerItemCarrinho('${itemId}')" class="text-red-500 hover:text-red-700 text-xs">×</button>
            `;
      carrinhoDiv.appendChild(itemDiv);
    });
    finalizarPedidoBtn.disabled = false;
  }
}

function calcularTotal() {
  if (!lojaAtual) return; // Se nenhuma loja estiver selecionada, não faz nada
  let subtotal = 0;
  Object.keys(carrinho).forEach((itemId) => {
    subtotal += carrinho[itemId].preco * carrinho[itemId].quantidade;
  });

  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("frete").innerText = "A combinar"; // Ou lógica de frete
  document.getElementById("total").innerText = subtotal.toFixed(2); // Adicionar frete se aplicável
  document.getElementById("btnFinalizarPedido").disabled = subtotal <= 0;
}

function irPagamento() {
  document.getElementById("valorFinalPagamento").innerText =
    document.getElementById("subtotal").innerText;
  document.getElementById("tela-loja").classList.add("hidden");
  document.getElementById("tela-pagamento").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function enviarWhatsApp() {
  const nomeCliente = document.getElementById("nomeCliente").value.trim();
  const enderecoCliente = document
    .getElementById("enderecoCliente")
    .value.trim();
  const total = document.getElementById("subtotal").innerText;
  const formaPagamentoElement = document.querySelector(
    'input[name="pagamento"]:checked'
  );
  const troco = document.getElementById("troco").value;
  const observacao = document.getElementById("observacao").value.trim();

  if (!nomeCliente) {
    alert("Por favor, digite seu nome.");
    document.getElementById("nomeCliente").focus();
    return;
  }
  if (!enderecoCliente) {
    alert("Por favor, digite seu endereço.");
    document.getElementById("enderecoCliente").focus();
    return;
  }
  if (!formaPagamentoElement) {
    alert("Por favor, selecione uma forma de pagamento.");
    return;
  }

  const formaPagamento = formaPagamentoElement.value;
  let itensPedido = "";
  Object.keys(carrinho).forEach((itemId) => {
    const item = carrinho[itemId];
    itensPedido += `   ${item.quantidade}x ${item.nome} (R$ ${(
      item.preco * item.quantidade
    ).toFixed(2)})\n`;
  });
  if (itensPedido === "") {
    alert("Seu carrinho está vazio!");
    return;
  }

  let msg = `*Novo Pedido - ${lojaAtual.nome}*\n`;
  msg += "-------------------------\n";
  msg += `*Cliente:* ${nomeCliente}\n`;
  msg += `*Endereço:* ${enderecoCliente}\n`;
  msg += "-------------------------\n";
  msg += "*Itens do Pedido:*\n";
  msg += itensPedido;
  msg += "-------------------------\n";
  if (observacao) {
    msg += `*Observação:* ${observacao}\n`;
    msg += "-------------------------\n";
  }
  msg += `*Subtotal:* R$ ${total}\n`;
  msg += `*Taxa de Entrega:* A combinar\n`;
  msg += `*Total:* R$ ${total} + Taxa\n`;
  msg += "-------------------------\n";
  msg += `*Forma de Pagamento:* ${formaPagamento}\n`;

  if (formaPagamento === "Dinheiro" && parseFloat(troco) > 0) {
    msg += `*Precisa de troco para:* R$ ${parseFloat(troco).toFixed(2)}\n`;
  } else if (formaPagamento === "Dinheiro") {
    msg += `*Não precisa de troco.*\n`;
  }
  msg += "-------------------------\n";
  msg += "*Aviso:* Pagamento será realizado na entrega.\n";

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/${lojaAtual.whatsapp}?text=${encoded}`, "_blank");
}

function voltarInicio() {
  // Limpa a URL query se não for um link compartilhado originalmente
  if (
    !isSharedLink ||
    (isSharedLink && window.location.search.includes("loja="))
  ) {
    history.pushState(null, "", getBaseUrl());
  }
  isSharedLink = false; // Resetar para comportamento padrão
  document.getElementById("tela-loja").classList.add("hidden");
  document.getElementById("tela-pagamento").classList.add("hidden");
  document.getElementById("lojas").classList.remove("hidden");
  document.getElementById("categorias-lojas").classList.remove("hidden");
  lojaAtual = null;
  carrinho = {};
  filtrarLojas("Todas"); // Volta para a visualização de todas as lojas
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function abrirMapa() {
  if (lojaAtual && lojaAtual.endereco) {
    // Tenta abrir no app Google Maps, senão abre no navegador
    // Usar uma URL mais genérica para direcionamento
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      lojaAtual.endereco
    )}`;
    window.open(url, "_blank");
  }
}

function showShareFeedback() {
  const feedback = document.getElementById("share-feedback");
  feedback.classList.add("show");
  setTimeout(() => {
    feedback.classList.remove("show");
  }, 2000);
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showShareFeedback();
    })
    .catch((err) => {
      console.error("Erro ao copiar: ", err);
      alert("Erro ao copiar o link.");
    });
}

function compartilharLoja() {
  if (lojaAtual) {
    const link = `${getBaseUrl()}?loja=${lojaAtual.id}`;
    if (navigator.share) {
      navigator
        .share({
          title: `Peça em ${lojaAtual.nome}`,
          text: `Confira os produtos de ${lojaAtual.nome} aqui!`,
          url: link,
        })
        .then(() => console.log("Compartilhado com sucesso!"))
        .catch((error) => console.log("Erro ao compartilhar:", error));
    } else {
      // Fallback para copiar para a área de transferência
      copyToClipboard(link);
    }
  }
}

function handleURLParams() {
  const params = new URLSearchParams(window.location.search);
  const lojaId = params.get("loja");
  if (lojaId && lojas[lojaId]) {
    isSharedLink = true; // Marca que a página foi carregada com um parâmetro de loja
    abrirLoja(lojaId);
  } else {
    isSharedLink = false;
    filtrarLojas("Todas"); // Carrega a visualização padrão
  }
}

// Mostrar/ocultar campo de troco
document.querySelectorAll('input[name="pagamento"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    const trocoDiv = document.getElementById("troco-div");
    if (this.value === "Dinheiro") {
      trocoDiv.classList.remove("hidden");
    } else {
      trocoDiv.classList.add("hidden");
      document.getElementById("troco").value = ""; // Limpa o campo de troco se outra opção for selecionada
    }
  });
});

// Carregar lojas ou loja específica ao carregar a página
document.addEventListener("DOMContentLoaded", handleURLParams);
