let cart = []; // Khởi tạo giỏ hàng

function order(name, image) {
    // Ẩn thông báo thành công nếu bắt đầu đặt hàng mới
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'none';

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++; // Tăng số lượng nếu sản phẩm đã có trong giỏ hàng
    } else {
        cart.push({ name, image, quantity: 1 }); // Thêm sản phẩm mới vào giỏ hàng
    }
    updateCartDisplay(); // Cập nhật hiển thị giỏ hàng
}

function updateCartDisplay() {
    const orderCartContainer = document.getElementById('order-cart-items');
    orderCartContainer.innerHTML = ''; // Xóa nội dung hiện tại

    cart.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; vertical-align: middle;"/> 
            ${item.name} - Số lượng: <button onclick="updateQuantity('${item.name}', -1)">-</button> 
            <span>${item.quantity}</span> 
            <button onclick="updateQuantity('${item.name}', 1)">+</button>
        `;
        orderCartContainer.appendChild(itemElement);
    });
}

function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change; // Cập nhật số lượng
        if (item.quantity <= 0) {
            removeItem(name); // Xóa sản phẩm nếu số lượng là 0
        }
        updateCartDisplay(); // Cập nhật hiển thị giỏ hàng
    }
}

function removeItem(name) {
    cart = cart.filter(item => item.name !== name); // Xóa món ăn khỏi giỏ hàng
    updateCartDisplay(); // Cập nhật hiển thị giỏ hàng
}

window.addEventListener('scroll', function() {
    const cartElement = document.getElementById('cart');
    const offset = window.pageYOffset;
    const topOffset = 10 + offset;
    cartElement.style.top = topOffset + 'px';
});

function scrollToOrderForm() {
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.style.display = 'block'; // Hiển thị form đặt hàng
        orderForm.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Cuộn tới form đặt hàng
    }
}

function submitOrder(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    const customerName = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();

    // Xóa thông báo lỗi cũ
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';
    errorMessage.innerText = '';

    // Kiểm tra thông tin đặt hàng
    if (customerName === '' || phone === '' || address === '') {
        errorMessage.style.display = 'block';
        errorMessage.innerText = 'Vui lòng nhập đầy đủ thông tin!';
        return;
    }

    // Hiển thị thông báo thành công
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';

    // Ẩn form đặt hàng
    const orderForm = document.getElementById('order-form');
    orderForm.style.display = 'none';

    // Làm trống giỏ hàng
    cart = [];
    updateCartDisplay();
}

function toggleDetails(id) {
    const detailsElement = document.getElementById(id);
    if (detailsElement.style.display === 'none' || detailsElement.style.display === '') {
        detailsElement.style.display = 'block';
    } else {
        detailsElement.style.display = 'none';
    }
}


function showImage(img) {
    var lightbox = document.getElementById('lightbox');
    var lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.src = img.src; // Lấy src của hình ảnh clicked
    lightbox.style.display = 'flex'; // Hiển thị lightbox
}

document.querySelectorAll('.baked-slider img').forEach(img => {
    img.addEventListener('click', event => {
      // Ngăn chặn hành động mặc định (như phóng to hình ảnh)
      event.preventDefault();
  
      // Lấy thông tin từ thuộc tính data-info
      const info = event.target.getAttribute('data-info');
  
      // Hiển thị thông tin trong info-box
      const infoBox = document.getElementById('info-box');
      infoBox.innerText = info;
      infoBox.style.display = 'block';
    });
  });
  

function toggleDetails(id) {
    var details = document.getElementById(id);
    if (details.style.display === 'none') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}
