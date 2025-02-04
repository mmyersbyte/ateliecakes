//zapzap
    const whatsAppButton = document.createElement('div');
    whatsAppButton.innerHTML = `
        <a href="https://wa.me/+5585996693878" target="_blank" style="text-decoration: none;">
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #FF69B4, #FFC0CB);
                border-radius: 50%;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                animation: float 3s ease-in-out infinite;
                z-index: 1000;
                cursor: pointer;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="iconeZap" style="width: 30px; height: 30px;">
            </div>
        </a>
    `;

    document.body.appendChild(whatsAppButton);
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);


    function toggleMenu() {
        var menu = document.getElementById("menu");
        menu.classList.toggle("ativo");
    }
    




//carinhoo

const cartItemsMobile = document.getElementById('cart-items-mobile');
const cartTotalMobile = document.getElementById('cart-total-mobile');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const clearCartButton = document.getElementById('clear-cart');


let cart = [];

function addItemToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1; // Aumenta a quantidade 
  } else {
    cart.push({ name, price, quantity: 1 }); // Adiciona o item com quantidade 1 se não existir
  }

  updateCartMobile();
}

// remover item do carrinho
function removeItemFromCart(name) {
  const itemIndex = cart.findIndex(item => item.name === name);

  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1); // Remove o item do carrinho
    updateCartMobile();
  }
}

// att
function updateItemQuantity(name, newQuantity) {
  const item = cart.find(item => item.name === name);

  if (item) {
    if (newQuantity > 0) {
      item.quantity = newQuantity; // Atualiza a quantidade
    } else {
      removeItemFromCart(name); // Remove o item se a quantidade for 0
    }
    updateCartMobile();
  }
}

// delete
function clearCart() {
  cart = []; // Limpa o carrinho
  updateCartMobile();
}

//att
function updateCartMobile() {
  cartItemsMobile.innerHTML = '';

  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'cart-item d-flex justify-content-between align-items-center mb-2';

    // Nome e vlr do boloo
    li.innerHTML = `
      <span>${item.name} - R$${item.price.toFixed(2)}</span>
      <div class="quantity-controls">
        <button class="btn btn-sm btn-outline-secondary decrease-quantity" data-name="${item.name}">-</button>
        <span class="mx-2">${item.quantity}</span>
        <button class="btn btn-sm btn-outline-secondary increase-quantity" data-name="${item.name}">+</button>
        <button class="btn btn-sm btn-danger remove-item" data-name="${item.name}">Remover</button>
      </div>
    `;

    cartItemsMobile.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotalMobile.textContent = `R$${total.toFixed(2)}`;

  // Adiciona eventos aos botoes de controle de quantidade e remoçao
  document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const item = cart.find(item => item.name === name);
      if (item) {
        updateItemQuantity(name, item.quantity - 1);
      }
    });
  });

  document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const item = cart.find(item => item.name === name);
      if (item) {
        updateItemQuantity(name, item.quantity + 1);
      }
    });
  });

  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      removeItemFromCart(name);
    });
  });
}

// Add evento de click aos botoes "Adicionar ao Carrinhl
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.card');
    const name = card.querySelector('.card-header').textContent;
    const price = parseFloat(card.querySelector('.price strong').textContent.replace('R$', '').trim());
    addItemToCart(name, price);
  });
});

// Add evento de click ao botao "Limpar Carrinho" 
clearCartButton.addEventListener('click', clearCart);



///////// checkouttttttttttttttttttttttttttttttttttttttttt
const checkoutMobileButton = document.getElementById('checkout-mobile');
checkoutMobileButton.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.');
    return;
  }

  
  const itemsList = cart.map(item => `${item.name} (${item.quantity}x)`).join(', ');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const message = `Eu escolhi os seguintes bolos: ${itemsList}. O valor total deu R$${total.toFixed(2)}. Há disponibilidade? Como será o pagamento?`;
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/+5585996693878?text=${encodedMessage}`, '_blank');
});