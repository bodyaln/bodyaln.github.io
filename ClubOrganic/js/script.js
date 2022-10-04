window.addEventListener('DOMContentLoaded', function() {

let lastScroll = 0;
const defaultOffset = 100;
const header = document.querySelector('.header');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('header__hide');

window.addEventListener('scroll', () => {
    if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        //scroll down
        header.classList.add('header__hide');
    }
    else if(scrollPosition() < lastScroll && containHide()){
        //scroll up
        header.classList.remove('header__hide');
    }

    lastScroll = scrollPosition();
})



slider(
    '.about__slider',
    '.about__slide',
    '.about__slider-next',
    '.about__slider-prev',
    '.about__slider-wrapper',
    '.about__slider-inner');
function slider(container, slide, nextArrow, prevArrow, wrapper, field) {
    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector(field);

    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';
    // console.log(width);  
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';


    next.addEventListener('click', () => {
        if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
    });


    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
} 

form('form');
function form(inputform) {
    const form = document.querySelector(inputform);
    const clear = document.querySelector('.btn-clear');
    let inputs = form.querySelectorAll('input');
    const message = {
        loading: 'icons/spinner.svg',
        success: "Дякую! Скоро ми з вами зв'яжемося",
        failure: 'Что-то пошло не так...'
    };
    clear.addEventListener('click', ()=>{
        ClearBorder(form, inputs);
    })
    bindPostData(form);
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            ClearBorder(form, inputs);
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                float: left;
            `;
            document.querySelector('.contacts__triggers').insertAdjacentElement('beforebegin', statusMessage);
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('https://jsonplaceholder.typicode.com/posts', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }
    function ClearBorder(form, inputs){
        const mess = document.querySelectorAll(".message");
        mess.forEach(element =>{
            if(element){
                element.remove();
            }
        });
        inputs.forEach(element => {
            element.style.border = 'none'; 
        });
        form.elements.text.style.border = 'none'; 
        form.elements.checkbox.style.border = 'none'; 
    }
}


function showThanksModal(message) {
    openModal('.modal');
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__title');
    thanksModal.innerText = `${message}`;
    document.querySelector('.modal__content').append(thanksModal);
    setTimeout(() => {
        closeModal('.modal');
    }, 4000);
}


function closeModal(modalSelector) {    
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}
modal('.modal');
function modal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal(modalSelector);
        }
    });
}




const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
};


function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    const NameElement = selector.replace(/#/g, '');
    input.addEventListener('input', () => {
        if(document.querySelector(`.message__${NameElement}`)){
            document.querySelector(`.message__${NameElement}`).remove();
        }
        let statusMessage = document.createElement('div');
        statusMessage.classList.add("message",`message__${NameElement}`);
        statusMessage.style.cssText = `
            padding-top: 3px;
            margin-left: 2%;
            color: #FEFAEC;
            text-shadow: red 1px 1px 0, red -1px -1px 0, 
            red -1px 1px 0, red 1px -1px 0;
        `;
        switch(selector){
            case '#name': 
                Emptyinput(input);
                if (input.value.match(/\d/g)) {
                    input.style.border = "2px solid red";
                    statusMessage.innerText = `${'\u{026a0}'} Введіть літери, а не числа`;
                    SendButton(false);
                }else{
                    SendButton(true);
                };
                break;
            case '#email':
                Emptyinput(input);
                if (input.value.length > 0 && (input.value.length < 6 || !(input.value.includes("@") && input.value.includes(".")))) {
                    input.style.border = "2px solid red";
                    statusMessage.innerText = `${'\u{026a0}'} Повинні бути символи '.' i '@' та кількість цифр більше 6`;
                    SendButton(false);
                }else{
                    SendButton(true);
                }
                break;
            case '#checkbox':
                Emptyinput(input);
                if (!(input.checked)) {
                    SendButton(false);
                }else{
                    SendButton(true);
                }
                break;
            case '#tel':
                Emptyinput(input);
                if(input.value.match(/\D/g)){
                    input.style.border = "2px solid red";
                    statusMessage.innerText = `${'\u{026a0}'} Введіть числа, а не літери чи символи`;
                    SendButton(false);
                }
                else if (input.value.length < 8  && input.value.length > 0) {
                    input.style.border = "2px solid red";
                    statusMessage.innerText = `${'\u{026a0}'} Кількість цифр повинна бути більше 8`;
                    SendButton(false);
                }else{
                    SendButton(true);
                };
                break;
            case '#text':
                Emptyinput(input);
                if (input.value.length < 50 && input.value.length > 0) {
                    input.style.border = "2px solid red";
                    statusMessage.innerText = `${'\u{026a0}'} Кількість цифр повинна бути більше 50, Залишилося: ${50 - input.value.length}`;
                    SendButton(false);
                }else{
                    SendButton(true);
                };
                break;
            default:
                Emptyinput(input);
                break;
        }
        if(statusMessage.innerText !== ""){
            input.insertAdjacentElement('afterend', statusMessage);
        }
    });
}

function Emptyinput(input){
    if(input.value === ""){
        input.style.border = 'none';
    }
    else {
        input.style.border = '2px solid #21a549';
    }
}

function SendButton(meaning){
    const cheackbox = document.querySelector('#checkbox');
    const btn = document.querySelector('.btn-send');
    if(!(cheackbox.checked) || !meaning ){
        btn.style.cursor = "not-allowed";
        btn.setAttribute('disabled', true);
    }
    else{
        btn.style.cursor = "pointer";
        btn.removeAttribute('disabled');
    }

}
getDynamicInformation('#checkbox');
getDynamicInformation('#name');
getDynamicInformation('#email');
getDynamicInformation('#tel');
getDynamicInformation('#topic');
getDynamicInformation('#text');


let types = document.querySelectorAll('[data-products-type]');
let products = document.querySelectorAll('.shop__products');
ActivePassive(types, products);
function ActivePassive(types, products){
    types.forEach(elem =>{
        if(elem.nodeName == "LI"){
            elem.addEventListener('click', ()=>{
                document.querySelectorAll('.shop__tab_active').forEach(item=>{
                    item.classList.remove('shop__tab_active');
                });
                products.forEach(product => {
                    product.classList.remove('shop__products_active');
                    if(elem.dataset.productsType === product.dataset.productsType){
                        document.querySelectorAll(`[data-products-type='${elem.dataset.productsType}']`).forEach(item=>{
                            if(item.nodeName == "LI" && item.classList.contains('shop__tab')){
                                item.classList.add('shop__tab_active');
                            }
                        });
                        product.classList.add('shop__products_active');
                    }
                })
            })
        }
    });
    
}



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
})
close.addEventListener('click',()=>{
    cart.classList.remove('cart__active');
})
continues.addEventListener('click',()=>{
    cart.classList.remove('cart__active');
})

const plusFullPrice = (currentPrice) => {
	return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
	return price -= currentPrice;
};


const printFullPrice = () => {
	fullPrice.textContent = `${price}`;
};
printFullPrice();
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
	
	let currentPrice = parseInt(productParent.querySelector('.cart-product__price span').textContent);
	minusFullPrice(currentPrice);
    productParent.remove();
	printFullPrice();
    updateStorage();

};

const Amount = (productParent) => {
        let input = productParent.querySelector('.cart-product__counter');
        let currentPrice = parseInt(productParent.querySelector('.cart-product__price span').textContent);
        let amoung = 1;
        input.addEventListener('input', () => {
            console.log(`INPUT: ${typeof(input.value)} AMOUNG ${amoung}`);
            if(parseInt(input.value) > amoung){
                plusFullPrice(currentPrice);
                printFullPrice();
                amoung = parseInt(input.value);
            }
            if(amoung > parseInt(input.value)){
                minusFullPrice(currentPrice);
                printFullPrice();
                amoung = parseInt(input.value);

            }
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
		plusFullPrice(priceNumber);
		printFullPrice();
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

btnOrder.addEventListener('click', ()=>{
    price = 0;
    printFullPrice();
    cartProductsList.querySelector('.simplebar-content').innerHTML = '';
    localStorage.removeItem("products");
    productsBtn.forEach(btn =>{
        btn.disabled = false;
    })
});



const countSumm = () => {
    document.querySelectorAll('.cart__item').forEach(el => {
        price += parseInt(el.querySelector('.cart-product__price span').textContent);
    });
};

const initialState = () => {
    if (localStorage.getItem('products') !== null) {
        cartProductsList.querySelector('.simplebar-content').innerHTML = localStorage.getItem('products');
        countSumm();
        printFullPrice();


        document.querySelectorAll('.cart-product').forEach(el => {
            let id = el.dataset.id;
            document.querySelector(`.shop__product[data-id="${id}"]`).querySelector('.btn-shop').disabled = true;
        });
    }
};

initialState();

const updateStorage = () => {
    let parent = cartProductsList.querySelector('.simplebar-content');
    let html = parent.innerHTML;
    html = html.trim();

    if (html.length) {
        localStorage.setItem('products', html);
    } else {
        localStorage.removeItem('products');
    }
};


 /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
    
    // var disqus_config = function () {
    // this.page.url = 'bodyaln.github.io/club';  // Replace PAGE_URL with your page's canonical URL variable
    // this.page.identifier = 'club'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    // };
  
    (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = 'https://club-organic-agriculture.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
        })();

    
});

// let number = 5
// let text = `qeqweqweqweqw ${number}`;
// console.log(typeof(text));