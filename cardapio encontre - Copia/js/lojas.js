const lojas = {
  lanchonete: {
    nome: "Lanchonete Bom Lanche",
    categoria: "Lanchonetes",
    descricao: "Os melhores lanches artesanais de São Carlos!",
    endereco: "Rua Central, 123, São Carlos, SP",
    imagem_loja:
      "https://cdn6.campograndenews.com.br/uploads/noticias/2023/01/25/44032e0d3e4dc9306b28360cadb0abade7cb5481.jpeg",
    whatsapp: "5516994392545",
    horario_abre: "18:00",
    horario_fecha: "23:30",
    produtos: {
      Lanches: [
        {
          id: "lz_xb",
          nome: "combo duplo",
          preco: 15,
          imagem:
            "https://midias.agazeta.com.br/2023/02/13/hamburguer-da-hamburgueria-tt-burger-do-chef-thomas-troisgros-991150.jpg",
        },
        {
          id: "lz_xs",
          nome: "X-Salada",
          preco: 17,
          imagem: "https://cms-blog.saipos.com/hamburguer3.jpg",
        },
      ],
      Porções: [
        {
          id: "lz_fm1",
          nome: "Fritas Média",
          preco: 8,
          imagem:
            "https://folhago.com.br/blogs/receitas-faceis/wp-content/uploads/2022/08/Batata-frita-crocante-1024x683.jpg",
        },
        {
          id: "lz_fm2",
          nome: "Fritas com chedar",
          preco: 8,
          imagem:
            "https://receitinhas.com.br/wp-content/uploads/2017/06/Batatosa-scaled.jpg",
        },
      ],
      Bebidas: [
        {
          id: "lz_refri1",
          nome: "Coca-Cola",
          preco: 6,
          imagem:
            "https://savegnagoio.vtexassets.com/arquivos/ids/435100/REFRIGERANTECOCACOLA350MLLATA.jpg?v=638424126581970000",
        },
        {
          id: "lz_refri2",
          nome: "Coca zero",
          preco: 6,
          imagem:
            "https://io.convertiez.com.br/m/drogaven/shop/products/images/393/medium/refrigerante-coca-cola-zero-lata-350ml_10884.jpg",
        },
      ],
    },
  },
  pizzaria: {
    nome: "Pizzaria da Maria",
    categoria: "Pizzarias",
    descricao: "Sabores incríveis direto do forno!",
    endereco: "Av. Principal, 456, São Carlos, SP",
    imagem_loja:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/4a/82/50/baggio-pizzaria-moema.jpg?w=600&h=-1&s=1",
    whatsapp: "5516994392545",
    horario_abre: "17:00",
    horario_fecha: "22:00",
    produtos: {
      "Pizzas Salgadas": [
        {
          id: "pm_pizza",
          nome: "Pizza Salgada",
          tipo: "pizza",
          imagem:
            "https://invexo.com.br/blog/wp-content/uploads/2022/10/pizza-inteira-pizzaria-barra-da-tijuca-rio-de-janeiro-768x461.jpg.webp",
          opcoes: {
            tamanhos: [
              { nome: "Média (6 fatias)", preco: 35.0, max_sabores: 2 },
              { nome: "Grande (8 fatias)", preco: 45.0, max_sabores: 3 },
            ],
            sabores: [
              { nome: "Calabresa", preco_adicional: 0 },
              { nome: "4 Queijos", preco_adicional: 2 },
              { nome: "Frango c/ Catupiry", preco_adicional: 3 },
              { nome: "Portuguesa", preco_adicional: 1 },
              { nome: "Marguerita", preco_adicional: 0 },
              { nome: "Pepperoni", preco_adicional: 4 },
            ],
          },
        },
      ],
      "Pizzas Doces": [
        {
          id: "pm_pizza_doce",
          nome: "Pizza Doce",
          tipo: "pizza",
          imagem:
            "https://anamariabrogui.com.br/assets/uploads/receitas/fotos/usuario-1932-5a1a95399763e176d63495a822004555.jpg",
          opcoes: {
            tamanhos: [
              { nome: "Broto (4 fatias)", preco: 30.0, max_sabores: 1 },
              { nome: "Média (6 fatias)", preco: 40.0, max_sabores: 1 },
            ],
            sabores: [
              { nome: "Chocolate com Morango", preco_adicional: 0 },
              { nome: "Romeu e Julieta", preco_adicional: 0 },
              { nome: "Banana com Canela", preco_adicional: 0 },
            ],
          },
        },
      ],
      Bebidas: [
        {
          id: "pm_refri2l1",
          nome: "Coca-Cola 2L",
          preco: 10,
          imagem:
            "https://prezunic.vtexassets.com/arquivos/ids/184447-800-auto?v=638368820890300000&width=800&height=auto&aspect=true",
        },
        {
          id: "pm_refri2l2",
          nome: "Coca Zero 2L",
          preco: 10,
          imagem:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZYEaDqlTZB4LjCHDMVv6RO8qaKbmehy3vCg&s",
        },
      ],
    },
  },
  pizzaria_2: {
    nome: "La Bella Pizza",
    categoria: "Pizzarias",
    descricao: "Autênticas pizzas italianas assadas no forno à lenha.",
    endereco: "Rua Itália, 89, São Carlos, SP",
    imagem_loja:
      "https://static.vecteezy.com/ti/vetor-gratis/p1/3689653-pizza-logo-vetor.jpg",
    whatsapp: "5516994392545",
    horario_abre: "18:30",
    horario_fecha: "23:45",
    produtos: {
      "Pizzas Tradicionais": [
        {
          id: "lbp_pizza",
          nome: "Pizza Especial",
          tipo: "pizza",
          imagem:
            "https://www.gov.br/turismo/pt-br/assuntos/noticias/tres-pizzarias-brasileiras-estao-entre-as-melhores-do-mundo/MTur1.png/@@images/17f74bd0-a223-4848-858c-a5cbe88fa552.png",
          opcoes: {
            tamanhos: [
              { nome: "Broto (4 fatias)", preco: 25, max_sabores: 1 },
              { nome: "Grande (8 fatias)", preco: 48, max_sabores: 2 },
            ],
            sabores: [
              { nome: "Napolitana", preco_adicional: 0 },
              { nome: "Calabresa com cebola", preco_adicional: 1 },
              { nome: "Brócolis com bacon", preco_adicional: 2 },
              { nome: "Palmito", preco_adicional: 1.5 },
            ],
          },
        },
      ],
    },
  },
  hotdog_1: {
    nome: "Dogão da Esquina",
    categoria: "Hot Dogs",
    descricao: "Cachorro-quente completo e turbinado, do jeitinho brasileiro!",
    endereco: "Rua das Flores, 321, São Carlos, SP",
    imagem_loja:
      "https://static.vecteezy.com/ti/vetor-gratis/t1/5417663-logotipo-de-designial-de-cachorro-quente-fresco-e-saboroso-vetor.jpg",
    whatsapp: "5516994392545",
    horario_abre: "17:00",
    horario_fecha: "00:00",
    produtos: {
      "Cachorro-Quente": [
        {
          id: "dog_tradicional",
          nome: "Dog Tradicional",
          preco: 10,
          imagem:
            "https://mirassolconectada.com.br/wp-content/uploads/2023/04/Imagem-do-WhatsApp-de-2023-04-17-as-15.41.31.jpg",
        },
        {
          id: "dog_completo",
          nome: "Dogão Completo",
          preco: 15,
          imagem:
            "https://agendasorocaba.com.br/wp-content/uploads/2021/09/dogao-da-21-1.jpg",
        },
      ],
    },
  },
};
