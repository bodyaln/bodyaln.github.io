
let slideIndex = 1;
const slides = document.querySelectorAll('.works__slide'),
    prev = document.querySelector('.works__previos'),
    next = document.querySelector('.works__next');

showSlides(slideIndex);


function showSlides(n) {
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    slides.forEach((item) => item.style.display = 'none');

    slides[slideIndex - 1].style.display = 'block';
}

function plusSlides (n) {
    showSlides(slideIndex += n);
}

prev.addEventListener('click', function(){
    plusSlides(-1);
});

next.addEventListener('click', function(){
    plusSlides(1);
});


//Sliders next
Sliders('.rendering__slide_1', '.rendering__slider-prev_1', '.rendering__slider-next_1','#total-first','#current-first', '.rendering__slider-wrapper_1', '.rendering__slider-inner_1');
Sliders('.rendering__slide_2', '.rendering__slider-prev_2', '.rendering__slider-next_2','#total-second','#current-second', '.rendering__slider-wrapper_2', '.rendering__slider-inner_2');


function Sliders(slidesselector, prevselector, nextselector, totalselector, currentselector, slidesWrapperselector, slidesFieldselector) {
let offset = 0;
let slideIndex = 1;

const slides = document.querySelectorAll(slidesselector),
    prev = document.querySelector(prevselector),
    next = document.querySelector(nextselector),
    total = document.querySelector(totalselector),
    current = document.querySelector(currentselector),
    slidesWrapper = document.querySelector(slidesWrapperselector,),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector(slidesFieldselector);

    total.textContent = slides.length;
    current.textContent =  slideIndex;

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
    slide.style.width = width;
});

next.addEventListener('click', () => {
    if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
        offset = 0;
    } else {
        offset += +width.slice(0, width.length - 2); 
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }
    current.textContent =  slideIndex;
});

prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
        offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }
    current.textContent =  slideIndex;
});
}



//3d-Animation
const image3d = Atropos({
    el: '.my-atropos',
    // rest of parameters
    rotateLock: true,

     rotateXMax: 10,
     rotateYMax: 10,

     shadow: false,
    // shadowOffset: 50,
    // shadowScale: 5,
    // highlight: false,
    // durationEnter: 1000,
    // activeOffset: 560
});

const teams = Atropos({
    el: '.about__photo',
    // rest of parameters
    rotateLock: true,

     rotateXMax: 15,
     rotateYMax: 15,

     shadow: false,
    // shadowOffset: 50,
    // shadowScale: 5,
    // highlight: false,
    // durationEnter: 1000,
    activeOffset: 70
});

const person = Atropos({
    el: '.priority__images__man',
    // rest of parameters
    rotateLock: true,

     rotateXMax: 15,
     rotateYMax: 15,

     shadow: false,
    // shadowOffset: 50,
    // shadowScale: 5,
    // highlight: false,
    // durationEnter: 1000,
    activeOffset: 70
});




const menu = document.querySelector('.menu'),
hamburger = document.querySelector('.hamburger'),
closes = document.querySelector('.menu__close'),
menuItem = document.querySelectorAll('.menu__link');

closes.addEventListener('click', ()=>{
    hamburger.classList.toggle('hamburger_active');
    menu.classList.toggle('menu_active');
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger_active');
    menu.classList.toggle('menu_active');
});

menuItem.forEach(item =>{
    item.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });
});


// menuItem.forEach(item => {
//     item.addEventListener('click', () => {
//         hamburger.classList.toggle('hamburger_active');
//         menu.classList.toggle('menu_active');
//     });
// });

function SliderTeam(slidesselector, prevselector, nextselector, slidesWrapperselector, slidesFieldselector) {
    let offset = 0;
    let slideIndex = 1;
    
    const slides = document.querySelectorAll(slidesselector),
        prev = document.querySelector(prevselector),
        next = document.querySelector(nextselector),
        slidesWrapper = document.querySelector(slidesWrapperselector),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector(slidesFieldselector);

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    
    slidesWrapper.style.overflow = 'hidden';
    
    slides.forEach(slide => {
        slide.style.width = width;
    });
    
    next.addEventListener('click', () => {
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2); 
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
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
    
        slidesField.style.transform = `translateX(-${offset}px)`;
    
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
    });
    }

    const mediaQuery = window.matchMedia('(max-width: 480px)');
    if (mediaQuery.matches) {
        SliderTeam('.team__person','.team__slider-prev', '.team__slider-next', '.team__wrapper', '.team__slider-inner');
    }

    window.addEventListener('scroll', () => { 
        let scrollTop = window.pageYOffset;
    
    let arrowup = document.querySelector('#toTop');

    if(scrollTop >= 800 && scrollTop <= 10300){
        arrowup.style.display ="block";
    }
    else{    
        arrowup.style.display ="none";
    }
});