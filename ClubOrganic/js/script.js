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
});


const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
}
window.addEventListener('resize', appHeight);
appHeight();

let flag = false;
function MediaFunction(media) {
    if (media.matches) { // Если медиа запрос совпадает
        let hamburger = document.querySelector('.hamburger');
        hamburger.addEventListener('click', ()=>{
            document.querySelector('.header__wrapper').classList.toggle('header__wrapper__active');
        })
        let block = document.querySelector('.header__close');
        block.addEventListener("click", ()=>{
            header.querySelector('.header__wrapper').classList.toggle('header__wrapper__active');
        });
        
        let dropdowns = document.querySelectorAll('.header__nav__item__dropdown');
        
        dropdowns.forEach(elem =>{
            for (const child of elem.children) {
                switch (child.tagName) {
                    case "UL":
                        if(!(child.classList.contains('back'))){
                            let back = document.createElement('li');
                            back.classList.add("back");
                            back.innerHTML = `<a> Назад ${'\u{25B2}'}</a>`;
                            child.append(back);
                        }
                        break;
                    case "BUTTON":
                        child.addEventListener('click', ()=>{
                            document.querySelector('nav').classList.remove('header__nav__active');
                            elem.querySelector('.header__nav__item__dropdown__dropdown-content').style.top = "50%";
                        });
                    default:
                        break;
                }
            }
            elem.querySelector('.back').addEventListener('click', ()=>{
                document.querySelector('nav').classList.add('header__nav__active');
                elem.querySelector('.header__nav__item__dropdown__dropdown-content').style.top = "200%";
            });
        });
        flag = true;
    }
    else if (flag == true){
        window.location.reload();
    }
  }
  
  let media576 = window.matchMedia("(max-width: 576px)");
  MediaFunction(media576);
  media576.addEventListener("change", MediaFunction);

//   let media992 =  window.matchMedia('(min-width: 992px)')
//    let media1200 = window.matchMedia("(max-width: 1200px)");

  let mediaPromo =  window.matchMedia('(min-width: 992px) and (max-width: 1200px)');
  let mediaPromoMobile = window.matchMedia('(min-width: 320px) and (max-width: 576px)');


  MediaFunctionPromo(mediaPromo);
  mediaPromo.addEventListener("change", MediaFunctionPromo);

  MediaFunctionPromoMobile(mediaPromoMobile);
  mediaPromoMobile.addEventListener("change", MediaFunctionPromoMobile );

  function  MediaFunctionPromo(mediaPromo){
    if (mediaPromo.matches) { 
        document.querySelector('.promo__navigation img').style.cssText = "width: 400px; height: 375px";
        let area = document.querySelectorAll('area');
        area[0].coords = "190,30,30";
        area[1].coords = "310,34,30";
        area[2].coords = "28,124,25";
        area[3].coords = "360,110,25";
        area[4].coords = "65,23, 110,75"
    }
    else{
        document.querySelector('.promo__navigation img').style.cssText = "";
        let area = document.querySelectorAll('area');
        area[0].coords = "240,37,40";
        area[1].coords = "385,40,40";
        area[2].coords = "38,160,30";
        area[3].coords = "450,135,30";
        area[4].coords = "56,20, 140,102"
    }
  }

  function MediaFunctionPromoMobile(mediaMobile){
    if (mediaMobile.matches) { 
        window.addEventListener("resize", ()=>{
            document.querySelector('.promo__navigation img').style.cssText = `width: ${document.documentElement.clientWidth -60}px; height: ${document.documentElement.clientWidth - 85}px`;
            let area = document.querySelectorAll('area');
            area[0].coords = `${125 + 125* ((document.documentElement.clientWidth - 320) / (576 - 320)) },${20 + 10* ((document.documentElement.clientWidth - 320) / (576 - 320))},${20 + 10* ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
            area[1].coords = `${205 + 185* ((document.documentElement.clientWidth - 320) / (576 - 320)) },${20 + 25* ((document.documentElement.clientWidth - 320) / (576 - 320))},${20 + 25* ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
            area[2].coords = `${18 + 22* ((document.documentElement.clientWidth - 320) / (576 - 320)) },${75 + 85* ((document.documentElement.clientWidth - 320) / (576 - 320))},${20 + 5* ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
            area[3].coords = `${220 + 230* ((document.documentElement.clientWidth - 320) / (576 - 320)) },${63 + 77* ((document.documentElement.clientWidth - 320) / (576 - 320))},${20 + 5* ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
            area[4].coords = `${40 + 40* ((document.documentElement.clientWidth - 320) / (576 - 320)) },${21 + 27* ((document.documentElement.clientWidth - 320) / (576 - 320))}, ${68 + 67* ((document.documentElement.clientWidth - 320) / (576 - 320))},${46 + 54* ((document.documentElement.clientWidth - 320) / (576 - 320))}`;


          });
          document.querySelector('.promo__navigation img').style.cssText = `width: ${document.documentElement.clientWidth -60}px; height: ${document.documentElement.clientWidth - 85}px`;
          let area = document.querySelectorAll('area');
          area[0].coords = `${125 + 125* ((document.documentElement.clientWidth - 320) / (576 - 320)) },${20 + 10* ((document.documentElement.clientWidth - 320) / (576 - 320))},${20 + 10* ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
          area[1].coords = `${205 + 185* ((document.documentElement.clientWidth - 320) / (576 - 320)) },${20 + 25* ((document.documentElement.clientWidth - 320) / (576 - 320))},${20 + 25* ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
          area[2].coords = `${18 + 22* ((document.documentElement.clientWidth - 320) / (576 - 320)) },${75 + 85* ((document.documentElement.clientWidth - 320) / (576 - 320))},${20 + 5* ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
          area[3].coords = `${225 + 230* ((document.documentElement.clientWidth - 320) / (576 - 320)) },${63 + 77* ((document.documentElement.clientWidth - 320) / (576 - 320))},${18 + 5* ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
          area[4].coords = `${40 + 40* ((document.documentElement.clientWidth - 320) / (576 - 320)) },${21 + 27* ((document.documentElement.clientWidth - 320) / (576 - 320))}, ${68 + 67* ((document.documentElement.clientWidth - 320) / (576 - 320))},${46 + 54* ((document.documentElement.clientWidth - 320) / (576 - 320))}`;

        // area[0].coords = `${ calc(145 + 125* ((document.documentElement.clientWidth - 320) / (1200 - 320))) },30,30`;
        // area[1].coords = "310,34,30";
        // area[2].coords = "28,124,25";
        // area[3].coords = "360,110,25";
        // area[4].coords = "65,23, 110,75";
    }
  }

//   function EditAreaAndWidthWithHeight(){

//   }

const images = document.querySelectorAll('.about__slide');
const sliderLine = document.querySelector('.about__slider-inner');
let count = 0;
let width;

function init() {
    width = document.querySelector('.about__slider-wrapper').offsetWidth;
    sliderLine.style.width = width * images.length + 'px';
    images.forEach(item => {
        item.style.width = width + 'px';
    });
    rollSlider();
}

init();
window.addEventListener('resize', init);

document.querySelector('.about__slider-next').addEventListener('click', function () {
    count++;
    if (count >= images.length) {
        count = 0;
    }
    rollSlider();
});

document.querySelector('.about__slider-prev').addEventListener('click', function () {
    count--;
    if (count < 0) {
        count = images.length - 1;
    }
    rollSlider();
});

function rollSlider() {
    sliderLine.style.transform = 'translate(-' + count * width + 'px)';

}

//------------------------------------------------------------------------------------------------------------------------------


let slider = document.querySelector('.about__slider'),
  sliderList = slider.querySelector('.about__slider-wrapper'),
  sliderTrack = slider.querySelector('.about__slider-inner'),
  slides = slider.querySelectorAll('.about__slide'),
  arrows = slider.querySelector('.about__slider__arrows'),
  prev = arrows.children[0],
  next = arrows.children[1],
  slideWidth = slides[0].offsetWidth,
  slideIndex = 0,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  posY1 = 0,
  posY2 = 0,
  posFinal = 0,
  isSwipe = false,
  isScroll = false,
  allowSwipe = true,
  transition = true,
  nextTrf = 0,
  prevTrf = 0,
  lastTrf = --slides.length * slideWidth,
  posThreshold = slides[0].offsetWidth * 0.35,
  trfRegExp = /([-0-9.]+(?=px))/,
  swipeStartTime,
  swipeEndTime,
  getEvent = function() {
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
  },
  slide = function() {
    if (transition) {
      sliderTrack.style.transition = 'transform .5s';
    }
    sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

    prev.classList.toggle('disabled', slideIndex === 0);
    next.classList.toggle('disabled', slideIndex === --slides.length);
  },
  swipeStart = function() {
    let evt = getEvent();

    if (allowSwipe) {

      swipeStartTime = Date.now();
      
      transition = true;

      nextTrf = (slideIndex + 1) * -slideWidth;
      prevTrf = (slideIndex - 1) * -slideWidth;

      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;

      sliderTrack.style.transition = '';

      document.addEventListener('touchmove', swipeAction);
      document.addEventListener('mousemove', swipeAction);
      document.addEventListener('touchend', swipeEnd);
      document.addEventListener('mouseup', swipeEnd);

      sliderList.classList.remove('grab');
      sliderList.classList.add('grabbing');
    }
  },
  swipeAction = function() {

    let evt = getEvent(),
      style = sliderTrack.style.transform,
      transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      if (slideIndex === 0) {
        if (posInit < posX1) {
          setTransform(transform, 0);
          return;
        } else {
          allowSwipe = true;
        }
      }

      // запрет ухода вправо на последнем слайде
      if (slideIndex === --slides.length) {
        if (posInit > posX1) {
          setTransform(transform, lastTrf);
          return;
        } else {
          allowSwipe = true;
        }
      }

      if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
        reachEdge();
        return;
      }

      sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }

  },
  swipeEnd = function() {
    posFinal = posInit - posX1;

    isScroll = false;
    isSwipe = false;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    sliderList.classList.add('grab');
    sliderList.classList.remove('grabbing');

    if (allowSwipe) {
      swipeEndTime = Date.now();
      if (Math.abs(posFinal) > posThreshold || swipeEndTime - swipeStartTime < 300) {
        if (posInit < posX1) {
          slideIndex--;
        } else if (posInit > posX1) {
          slideIndex++;
        }
      }

      if (posInit !== posX1) {
        allowSwipe = false;
        slide();
      } else {
        allowSwipe = true;
      }

    } else {
      allowSwipe = true;
    }

  },
  setTransform = function(transform, comapreTransform) {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    allowSwipe = false;
  },
  reachEdge = function() {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  };

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
sliderList.classList.add('grab');

sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);

arrows.addEventListener('click', function() {
  let target = event.target;

  if (target.classList.contains('next')) {
    slideIndex++;
  } else if (target.classList.contains('prev')) {
    slideIndex--;
  } else {
    return;
  }

  slide();
});




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
// btnOrder.addEventListener('click', ()=>{
//     price = 0;
//     printFullPrice();
//     cartProductsList.querySelector('.simplebar-content').innerHTML = '';
//     localStorage.removeItem("products");
//     productsBtn.forEach(btn =>{
//         btn.disabled = false;
//     })
// });



// const countSumm = () => {
//     document.querySelectorAll('.cart__item').forEach(el => {
//         price += parseInt(el.querySelector('.cart-product__price span').textContent);
//     });
// };



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