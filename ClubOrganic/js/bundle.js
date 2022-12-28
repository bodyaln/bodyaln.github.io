/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/additional.js":
/*!**************************************!*\
  !*** ./src/js/modules/additional.js ***!
  \**************************************/
/***/ (function(module) {

function Additional() {
  let lastScroll = 0;
  const defaultOffset = 100;
  const header = document.querySelector('.header');
  const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
  const containHide = () => header.classList.contains('header__hide');
  window.addEventListener('scroll', () => {
    if (!window.matchMedia("(max-width: 576px)").matches || !document.querySelector('.header__wrapper').classList.contains('header__wrapper__active')) {
      if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        //scroll down
        header.classList.add('header__hide');
      } else if (scrollPosition() < lastScroll && containHide()) {
        //scroll up
        header.classList.remove('header__hide');
      }
    }
    lastScroll = scrollPosition();
  });
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };
  window.addEventListener('resize', appHeight);
  appHeight();
  (function () {
    // DON'T EDIT BELOW THIS LINE
    var d = document,
      s = d.createElement('script');
    s.src = 'https://club-organic-agriculture.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset;
    let arrowup = document.querySelector('#toTop');
    if (scrollTop >= 700) {
      arrowup.style.display = "block";
    } else {
      arrowup.style.display = "none";
    }
  });
}
module.exports = Additional;

/***/ }),

/***/ "./src/js/modules/buttons.js":
/*!***********************************!*\
  !*** ./src/js/modules/buttons.js ***!
  \***********************************/
/***/ (function(module) {

function Buttons() {
  let types = document.querySelectorAll('[data-products-type]');
  let products = document.querySelectorAll('.shop__products');
  ActivePassive(types, products);
  function ActivePassive(types, products) {
    types.forEach(elem => {
      if (elem.nodeName == "LI") {
        elem.addEventListener('click', () => {
          document.querySelectorAll('.shop__tab_active').forEach(item => {
            item.classList.remove('shop__tab_active');
          });
          products.forEach(product => {
            product.classList.remove('shop__products_active');
            if (elem.dataset.productsType === product.dataset.productsType) {
              document.querySelectorAll(`[data-products-type='${elem.dataset.productsType}']`).forEach(item => {
                if (item.nodeName == "LI" && item.classList.contains('shop__tab')) {
                  item.classList.add('shop__tab_active');
                }
              });
              product.classList.add('shop__products_active');
            }
          });
        });
      }
    });
  }
}
module.exports = Buttons;

/***/ }),

/***/ "./src/js/modules/cart.js":
/*!********************************!*\
  !*** ./src/js/modules/cart.js ***!
  \********************************/
/***/ (function(module) {

function Cart() {
  const productsBtn = document.querySelectorAll('.btn-shop');
  const btnOrder = document.querySelector('.cart .btn-order');
  const cartProductsList = document.querySelector('.cart__list');
  const cart = document.querySelector('.cart');
  const continues = document.querySelector('.btn-continue');
  const fullPrice = document.querySelector('.fullprice');
  const close = document.querySelector('.cart__close');
  const basket = document.querySelector('#basket');
  let price = 0;
  let randomId = 0;
  basket.addEventListener('click', () => {
    cart.classList.add('cart__active');
    document.querySelector('body').style.overflowY = "hidden";
  });
  close.addEventListener('click', () => {
    cart.classList.remove('cart__active');
    document.querySelector('body').style.overflowY = "scroll";
  });
  continues.addEventListener('click', () => {
    cart.classList.remove('cart__active');
    document.querySelector('body').style.overflowY = "scroll";
  });

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
    let total = 0;
    let parent = cartProductsList.querySelector('.simplebar-content');
    let items = parent.querySelectorAll('.cart__item');
    for (let i = 0; i < items.length; i++) {
      let BeginPrice = parseInt(items[i].querySelector('.cart-product__price span').textContent);
      let InputPrice = parseInt(items[i].querySelector('.cart-product__counter').value);
      total = total + BeginPrice * InputPrice;
    }
    fullPrice.textContent = `${total}`;
    let html = parent.innerHTML;
    html = html.trim();
    if (html.length) {
      localStorage.setItem('products', html);
    } else {
      localStorage.removeItem('products');
    }
    if (localStorage.getItem('products') == null) {
      btnOrder.style.cursor = "not-allowed";
      btnOrder.setAttribute('disabled', true);
    } else {
      btnOrder.style.cursor = "pointer";
      btnOrder.removeAttribute('disabled');
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
  const deleteProducts = productParent => {
    let id = productParent.querySelector('.cart-product').dataset.id;
    document.querySelector(`.shop__product[data-id="${id}"]`).querySelector('.btn-shop').disabled = false;
    productParent.remove();
    updateStorage();
  };
  const Amount = productParent => {
    let input = productParent.querySelector('.cart-product__counter');
    input.addEventListener('change', () => {
      updateStorage();
    });
  };
  productsBtn.forEach(el => {
    el.closest('.shop__product').setAttribute('data-id', randomId++);
    el.addEventListener('click', e => {
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
  cartProductsList.addEventListener('click', e => {
    if (e.target.classList.contains('cart-product__counter')) {
      Amount(e.target.closest('.cart__item'));
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
  btnOrder.addEventListener('click', () => {
    document.querySelector('.orders').style.display = "block";
    cart.classList.remove('cart__active');
    document.querySelector('body').style.overflowY = "scroll";
    localStorage.setItem('products', "");
    document.querySelectorAll('.btn-shop').forEach(elem => {
      elem.disabled = false;
      initialState();
      updateStorage();
    });
  });
  initialState();
  updateStorage();
}
module.exports = Cart;

/***/ }),

/***/ "./src/js/modules/cheackForm.js":
/*!**************************************!*\
  !*** ./src/js/modules/cheackForm.js ***!
  \**************************************/
/***/ (function(module) {

function cheackForm() {
  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    const NameElement = selector.replace(/#/g, '');
    const btn2 = document.querySelector('.btn-send-orders');
    input.addEventListener('input', () => {
      if (document.querySelector(`.message__${NameElement}`)) {
        document.querySelector(`.message__${NameElement}`).remove();
      }
      let statusMessage = document.createElement('div');
      statusMessage.classList.add("message", `message__${NameElement}`);
      statusMessage.style.cssText = `
                padding-top: 3px;
                margin-left: 2%;
                color: #FEFAEC;
                text-shadow: red 1px 1px 0, red -1px -1px 0, 
                red -1px 1px 0, red 1px -1px 0;
                grid-column: 1/3
            `;
      switch (selector) {
        case '#name':
          Emptyinput(input);
          if (input.value.match(/\d/g)) {
            input.style.border = "2px solid red";
            statusMessage.innerText = `${'\u{026a0}'} Введіть літери, а не числа`;
            SendButton(false, "#cheackbox");
          } else {
            SendButton(true, "#cheackbox");
          }
          ;
          break;
        case '#nameorder':
          Emptyinput(input);
          if (input.value.match(/\d/g)) {
            input.style.border = "2px solid red";
            statusMessage.innerText = `${'\u{026a0}'} Введіть літери, а не числа`;
            btn2.style.cursor = "not-allowed";
            btn2.setAttribute('disabled', true);
          } else {
            btn2.style.cursor = "pointer";
            btn2.removeAttribute('disabled');
          }
          ;
          break;
        case '#email':
          Emptyinput(input);
          if (input.value.length > 0 && (input.value.length < 6 || !(input.value.includes("@") && input.value.includes(".")))) {
            input.style.border = "2px solid red";
            statusMessage.innerText = `${'\u{026a0}'} Повинні бути символи '.' i '@' та кількість цифр більше 6`;
            SendButton(false, "#cheackbox");
          } else {
            SendButton(true, "#cheackbox");
          }
          break;
        case '#emailorder':
          Emptyinput(input);
          if (input.value.length > 0 && (input.value.length < 6 || !(input.value.includes("@") && input.value.includes(".")))) {
            input.style.border = "2px solid red";
            statusMessage.innerText = `${'\u{026a0}'} Повинні бути символи '.' i '@' та кількість цифр більше 6`;
            btn2.style.cursor = "not-allowed";
            btn2.setAttribute('disabled', true);
          } else {
            btn2.style.cursor = "pointer";
            btn2.removeAttribute('disabled');
          }
          break;
        case '#checkbox':
          Emptyinput(input);
          if (!input.checked) {
            SendButton(false, "#cheackbox");
          } else {
            SendButton(true, "#cheackbox");
          }
          break;
        case '#cheackboxorder':
          Emptyinput(input);
          if (!input.checked) {
            btn2.style.cursor = "not-allowed";
            btn2.setAttribute('disabled', true);
          } else {
            btn2.style.cursor = "pointer";
            btn2.removeAttribute('disabled');
          }
          break;
        case '#tel':
          Emptyinput(input);
          if (input.value.match(/\D/g)) {
            input.style.border = "2px solid red";
            statusMessage.innerText = `${'\u{026a0}'} Введіть числа, а не літери чи символи`;
            SendButton(false, "#cheackbox");
          } else if (input.value.length < 8 && input.value.length > 0) {
            input.style.border = "2px solid red";
            statusMessage.innerText = `${'\u{026a0}'} Кількість цифр повинна бути більше 8`;
            SendButton(false, "#cheackbox");
          } else {
            SendButton(true, "#cheackbox");
          }
          ;
          break;
        case '#telorder':
          Emptyinput(input);
          if (input.value.match(/\D/g)) {
            input.style.border = "2px solid red";
            statusMessage.innerText = `${'\u{026a0}'} Введіть числа, а не літери чи символи`;
            SendButton(false, "#cheackboxorder");
          } else if (input.value.length < 8 && input.value.length > 0) {
            input.style.border = "2px solid red";
            statusMessage.innerText = `${'\u{026a0}'} Кількість цифр повинна бути більше 8`;
            btn2.style.cursor = "not-allowed";
            btn2.setAttribute('disabled', true);
          } else {
            btn2.style.cursor = "pointer";
            btn2.removeAttribute('disabled');
          }
          ;
          break;
        case '#text':
          Emptyinput(input);
          if (input.value.length < 50 && input.value.length > 0) {
            input.style.border = "2px solid red";
            statusMessage.innerText = `${'\u{026a0}'} Кількість цифр повинна бути більше 50, Залишилося: ${50 - input.value.length}`;
            SendButton(false, "#cheackbox");
          } else {
            SendButton(true, "#cheackbox");
          }
          ;
          break;
        default:
          Emptyinput(input);
          break;
      }
      if (statusMessage.innerText !== "") {
        input.insertAdjacentElement('afterend', statusMessage);
      }
    });
  }
  function Emptyinput(input) {
    if (input.value === "") {
      input.style.border = '1px solid black';
    } else {
      input.style.border = '2px solid #21a549';
    }
  }
  function SendButton(meaning, namebox) {
    const cheackbox = document.querySelector(`${namebox}`);
    const btn = document.querySelector('.btn-send-contacts');
    if (!cheackbox.checked || !meaning) {
      btn.style.cursor = "not-allowed";
      btn.setAttribute('disabled', true);
    } else {
      btn.style.cursor = "pointer";
      btn.removeAttribute('disabled');
    }
  }
  getDynamicInformation('#cheackbox');
  getDynamicInformation('#name');
  getDynamicInformation('#email');
  getDynamicInformation('#tel');
  getDynamicInformation('#topic');
  getDynamicInformation('#text');
  getDynamicInformation('#nameorder');
  getDynamicInformation('#emailorder');
  getDynamicInformation('#telorder');
  getDynamicInformation('#cheackboxorder');
}
module.exports = cheackForm;

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/***/ (function(module) {

function Form() {
  form('.contacts__form');
  form('.orders__form');
  function form(inputform) {
    const form = document.querySelector(inputform);
    const clears = document.querySelectorAll('.btn-clear');
    const close = document.querySelector('.orders__close');
    let inputs = form.querySelectorAll('input');
    const message = {
      loading: 'icons/spinner.svg',
      success: "Дякую! Скоро ми з вами зв'яжемося",
      failure: 'Что-то пошло не так...'
    };
    close.addEventListener('click', () => {
      document.querySelector('.orders').style.display = "none";
    });
    clears.forEach(elem => {
      elem.addEventListener('click', () => {
        ClearBorder(form, inputs);
      });
    });
    bindPostData(form);
    function bindPostData(form) {
      form.addEventListener('submit', e => {
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
        postData('https://jsonplaceholder.typicode.com/posts', json).then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(message.failure);
        }).finally(() => {
          if (inputform.includes('orders')) {
            document.querySelector('.orders').style.display = "none";
          }
          form.reset();
        });
      });
    }
    function ClearBorder(form, inputs) {
      const mess = document.querySelectorAll(".message");
      mess.forEach(element => {
        if (element) {
          element.remove();
        }
      });
      inputs.forEach(element => {
        element.style.border = 'none';
      });
      // form.elements.text.style.border = 'none'; 
      // form.elements.checkbox.style.border = 'none'; 
    }
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
    modal.querySelector('.modal__title').remove();
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
    modal.addEventListener('click', e => {
      if (e.target === modal || e.target.getAttribute('data-close') == "") {
        closeModal(modalSelector);
      }
    });
    document.addEventListener('keydown', e => {
      if (e.code === "Escape" && modal.classList.contains('show')) {
        closeModal(modalSelector);
      }
    });
  }
}
module.exports = Form;

/***/ }),

/***/ "./src/js/modules/media.js":
/*!*********************************!*\
  !*** ./src/js/modules/media.js ***!
  \*********************************/
/***/ (function(module) {

function Media() {
  let flag = false;
  function MediaFunction(media) {
    if (media.matches) {
      // Если медиа запрос совпадает
      let hamburger = document.querySelector('.hamburger');
      hamburger.addEventListener('click', () => {
        document.querySelector('.header__wrapper').classList.toggle('header__wrapper__active');
      });
      let block = document.querySelector('.header__close');
      block.addEventListener("click", () => {
        document.querySelector('.header__wrapper').classList.toggle('header__wrapper__active');
      });
      let links = document.querySelectorAll('.header__nav__item__dropdown__dropdown-content li');
      links.forEach(link => {
        link.addEventListener('click', () => {
          document.querySelector('.header__wrapper').classList.toggle('header__wrapper__active');
        });
      });
      let dropdowns = document.querySelectorAll('.header__nav__item__dropdown');
      dropdowns.forEach(elem => {
        for (const child of elem.children) {
          switch (child.tagName) {
            case "UL":
              if (!child.classList.contains('back')) {
                let back = document.createElement('li');
                back.classList.add("back");
                back.innerHTML = `<a> Назад ${'\u{25B2}'}</a>`;
                child.append(back);
              }
              break;
            case "BUTTON":
              child.addEventListener('click', () => {
                document.querySelector('nav').classList.remove('header__nav__active');
                elem.querySelector('.header__nav__item__dropdown__dropdown-content').style.top = "50%";
              });
            default:
              break;
          }
        }
        elem.querySelector('.back').addEventListener('click', () => {
          document.querySelector('nav').classList.add('header__nav__active');
          elem.querySelector('.header__nav__item__dropdown__dropdown-content').style.top = "200%";
        });
      });
      flag = true;
    } else if (flag == true) {
      window.location.reload();
    }
  }
  let media576 = window.matchMedia("(max-width: 576px)");
  MediaFunction(media576);
  media576.addEventListener("change", MediaFunction);

  //   let media992 =  window.matchMedia('(min-width: 992px)')
  //    let media1200 = window.matchMedia("(max-width: 1200px)");

  let mediaPromo = window.matchMedia('(min-width: 992px) and (max-width: 1200px)');
  let mediaPromoMobile = window.matchMedia('(min-width: 320px) and (max-width: 576px)');
  MediaFunctionPromo(mediaPromo);
  mediaPromo.addEventListener("change", MediaFunctionPromo);
  MediaFunctionPromoMobile(mediaPromoMobile);
  mediaPromoMobile.addEventListener("change", MediaFunctionPromoMobile);
  function MediaFunctionPromo(mediaPromo) {
    if (mediaPromo.matches) {
      document.querySelector('.promo__navigation img').style.cssText = "width: 400px; height: 375px";
      let area = document.querySelectorAll('area');
      area[0].coords = "190,30,30";
      area[1].coords = "310,34,30";
      area[2].coords = "28,124,25";
      area[3].coords = "360,110,25";
      area[4].coords = "65,23, 110,75";
    } else {
      document.querySelector('.promo__navigation img').style.cssText = "";
      let area = document.querySelectorAll('area');
      area[0].coords = "240,37,40";
      area[1].coords = "385,40,40";
      area[2].coords = "38,160,30";
      area[3].coords = "450,135,30";
      area[4].coords = "56,20, 140,102";
    }
  }
  function MediaFunctionPromoMobile(mediaMobile) {
    if (mediaMobile.matches) {
      window.addEventListener("resize", EditAreaAndWidthWithHeight);
      EditAreaAndWidthWithHeight();
    }
  }
  function EditAreaAndWidthWithHeight() {
    document.querySelector('.promo__navigation img').style.cssText = `width: ${document.documentElement.clientWidth - 60}px; height: ${document.documentElement.clientWidth - 85}px`;
    let area = document.querySelectorAll('area');
    area[0].coords = `${125 + 125 * ((document.documentElement.clientWidth - 320) / (576 - 320))},${20 + 10 * ((document.documentElement.clientWidth - 320) / (576 - 320))},${20 + 10 * ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
    area[1].coords = `${205 + 185 * ((document.documentElement.clientWidth - 320) / (576 - 320))},${20 + 25 * ((document.documentElement.clientWidth - 320) / (576 - 320))},${20 + 25 * ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
    area[2].coords = `${18 + 22 * ((document.documentElement.clientWidth - 320) / (576 - 320))},${75 + 85 * ((document.documentElement.clientWidth - 320) / (576 - 320))},${20 + 5 * ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
    area[3].coords = `${220 + 230 * ((document.documentElement.clientWidth - 320) / (576 - 320))},${63 + 77 * ((document.documentElement.clientWidth - 320) / (576 - 320))},${20 + 5 * ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
    area[4].coords = `${40 + 40 * ((document.documentElement.clientWidth - 320) / (576 - 320))},${21 + 27 * ((document.documentElement.clientWidth - 320) / (576 - 320))}, ${68 + 67 * ((document.documentElement.clientWidth - 320) / (576 - 320))},${46 + 54 * ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
  }
}
module.exports = Media;

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ (function(module) {

function Slider() {
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
}
module.exports = Slider;

/***/ }),

/***/ "./src/js/modules/sliderSwap.js":
/*!**************************************!*\
  !*** ./src/js/modules/sliderSwap.js ***!
  \**************************************/
/***/ (function(module) {

function sliderSwap() {
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
    getEvent = function () {
      return event.type.search('touch') !== -1 ? event.touches[0] : event;
    },
    slide = function () {
      if (transition) {
        sliderTrack.style.transition = 'transform .5s';
      }
      sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;
      prev.classList.toggle('disabled', slideIndex === 0);
      next.classList.toggle('disabled', slideIndex === --slides.length);
    },
    swipeStart = function () {
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
    swipeAction = function () {
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
    swipeEnd = function () {
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
    setTransform = function (transform, comapreTransform) {
      if (transform >= comapreTransform) {
        if (transform > comapreTransform) {
          sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
        }
      }
      allowSwipe = false;
    },
    reachEdge = function () {
      transition = false;
      swipeEnd();
      allowSwipe = true;
    };
  sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
  sliderList.classList.add('grab');
  sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
  slider.addEventListener('touchstart', swipeStart);
  slider.addEventListener('mousedown', swipeStart);
  arrows.addEventListener('click', function () {
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
}
module.exports = sliderSwap;

/***/ }),

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	0;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof __webpack_require__.g !== 'undefined') {
    local = __webpack_require__.g;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map


/***/ }),

/***/ "./node_modules/nodelist-foreach-polyfill/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/nodelist-foreach-polyfill/index.js ***!
  \*********************************************************/
/***/ (function() {

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodelist-foreach-polyfill */ "./node_modules/nodelist-foreach-polyfill/index.js");
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__);
(__webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js").polyfill)();

window.addEventListener('DOMContentLoaded', function () {
  const Additional = __webpack_require__(/*! ./modules/additional */ "./src/js/modules/additional.js"),
    Buttons = __webpack_require__(/*! ./modules/buttons */ "./src/js/modules/buttons.js"),
    Cart = __webpack_require__(/*! ./modules/cart */ "./src/js/modules/cart.js"),
    cheackForm = __webpack_require__(/*! ./modules/cheackForm */ "./src/js/modules/cheackForm.js"),
    Form = __webpack_require__(/*! ./modules/form */ "./src/js/modules/form.js"),
    Media = __webpack_require__(/*! ./modules/media */ "./src/js/modules/media.js"),
    Slider = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js"),
    sliderSwap = __webpack_require__(/*! ./modules/sliderSwap */ "./src/js/modules/sliderSwap.js");
  Additional();
  Buttons();
  Cart();
  cheackForm();
  Form();
  Media();
  Slider();
  sliderSwap();
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map