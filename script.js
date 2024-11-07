let cart = [];
let cartCount = document.getElementById('cart-count');
let cartPopup = document.getElementById('cart-popup');
let cartItemsContainer = document.getElementById('cart-items');
let totalPriceElement = document.getElementById('total-price');

function addToCart(id, name, price) {
    const existingProductIndex = cart.findIndex(item => item.id === id);
    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    cartCount.textContent = cart.length;
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = `${item.name} - Rp.${item.price} x ${item.quantity} <button onclick="removeFromCart(${item.id})">Remove</button>`;

        cartItemsContainer.appendChild(cartItemElement);
    });

    totalPriceElement.textContent = totalPrice.toLocaleString('id-ID');
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function toggleCart() {
    cartPopup.style.display = cartPopup.style.display === 'none' || cartPopup.style.display === '' ? 'block' : 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    alert('Checkout successful!');
    cart = [];
    updateCart();
    toggleCart();
}


let users = JSON.parse(localStorage.getItem('users')) || [];


function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (users.find(user => user.username === username)) {
        alert('Username sudah terdaftar!');
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registrasi berhasil! Silakan login.');
    window.location.href = 'login.html';
    toggleForms('login');
}

function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert('Login berhasil!');
        currentUser = username; // Simpan nama pengguna yang berhasil login
        window.location.href = 'index.html';

        // Logika tambahan jika pengguna berhasil login
    } else {
        alert('Username atau password salah!');
    }
}

function toggleForms(formType) {
    document.getElementById('register-form').style.display = formType === 'register' ? 'block' : 'none';
    document.getElementById('login-form').style.display = formType === 'login' ? 'block' : 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    

    let message = 'Terima kasih ${currentUser}, telah berbelanja di Tokopesia!\nBerikut rincian pesanan Anda:\n';
    let totalPrice = 0;

    cart.forEach(item => {
        message += `- ${item.name} x ${item.quantity} = Rp.${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
        totalPrice += item.price * item.quantity;
    });

    message += `Total harga: Rp.${totalPrice.toLocaleString('id-ID')}`;
    
    // Encode URL untuk pesan
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '6281382926147';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    alert('Checkout successful! Anda akan diarahkan ke WhatsApp.');
    window.open(whatsappURL, '_blank');

    cart = [];
    updateCart();
    toggleCart();
}

