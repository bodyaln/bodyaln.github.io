function Slider(){
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
