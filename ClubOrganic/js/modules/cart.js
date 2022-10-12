function Cart() {
    const productsBtn = document.querySelectorAll('.btn-shop');
const btnOrder = document.querySelector('.btn-order');
const cartProductsList = document.querySelector('.cart__list');
const cart = document.querySelector('.cart');
const continues = document.querySelector('.btn-continue');
const fullPrice = document.querySelector('.fullprice');
const close = document.querySelector('.cart__close');
const basket = document.querySelector('#basket');
let price = 0;
let randomId = 0;

basket.addEventListener('click', ()=>{
    cart.classList.add('cart__active');
    document.querySelector('body').style.overflowY = "hidden";
})
close.addEventListener('click',()=>{
    cart.classList.remove('cart__active');
    document.querySelector('body').style.overflowY = "scroll";
})
continues.addEventListener('click',()=>{
    cart.classList.remove('cart__active');
    document.querySelector('body').style.overflowY = "scroll";
})


// const plusFullPrice = (currentPrice) => {
// 	return price += currentPrice;
// };

// const minusFullPrice = (currentPrice) => {
// 	return price -= currentPrice;
// };


// const printFullPrice = () => {
// 	fullPrice.textContent = `${price}`;
// };

const updateStorage = () => {
    let total =0;
    let parent = cartProductsList.querySelector('.simplebar-content');

    let items = parent.querySelectorAll('.cart__item');

    for (let i = 0; i < items.length; i++) {
        let BeginPrice = parseInt(items[i].querySelector('.cart-product__price span').textContent);
        let InputPrice = parseInt(items[i].querySelector('.cart-product__counter').value);
        total = total + (BeginPrice * InputPrice);
    }
    fullPrice.textContent = `${total}`;


    let html = parent.innerHTML;
    html = html.trim();

    if (html.length) {
        localStorage.setItem('products', html);
    } else {
        localStorage.removeItem('products');
    }
};


const generateCartProduct = (img, title, price, id) => {
	return `
    <li class="cart__item">
    <article class="cart-product" data-id="${id}">
        <img src="${img}" alt="" class="cart-product__img">
        <div class="cart-product__text">
            <h3 class="cart-product__title">${title}</h3>
            <input type="number" class="cart-product__counter" value="1" name="amount" min="1" max="10">
            <span class="cart-product__price">Ціна: <span>${price}</span> грн</span>
        </div>
        <button class="cart-product__delete" aria-label="Удалить товар"></button>
    </article>
</li>
	`;
};

const deleteProducts = (productParent) => {
	let id = productParent.querySelector('.cart-product').dataset.id;
	document.querySelector(`.shop__product[data-id="${id}"]`).querySelector('.btn-shop').disabled = false;
    productParent.remove();
    updateStorage();

};

const Amount = (productParent) => {
        let input = productParent.querySelector('.cart-product__counter');
        input.addEventListener('change', () => {
            updateStorage();
        });
};

productsBtn.forEach(el => {
	el.closest('.shop__product').setAttribute('data-id', randomId++);

	el.addEventListener('click', (e) => {
		let self = e.currentTarget;
		let parent = self.closest('.shop__product');
		let id = parent.dataset.id;
		let img = parent.querySelector('.shop__img').getAttribute('src');
		let title = parent.querySelector('.shop__name').textContent;
		let priceNumber = parseInt(parent.querySelector('.shop__price span').textContent);
        cart.classList.add('cart__active');
		cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceNumber, id));
        updateStorage();
		
		self.disabled = true;
	});
});

cartProductsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-product__counter')) {
		Amount(e.target.closest('.cart__item'));
        console.log('click');
	}
	if (e.target.classList.contains('cart-product__delete')) {
		deleteProducts(e.target.closest('.cart__item'));
	}
});
const initialState = () => {
    if (localStorage.getItem('products') !== null) {
        cartProductsList.querySelector('.simplebar-content').innerHTML = localStorage.getItem('products');

        document.querySelectorAll('.cart-product').forEach(el => {
            let id = el.dataset.id;
            document.querySelector(`.shop__product[data-id="${id}"]`).querySelector('.btn-shop').disabled = true;
        });
        updateStorage();
    }
};
initialState();
updateStorage();
      
}
module.exports = Cart;

