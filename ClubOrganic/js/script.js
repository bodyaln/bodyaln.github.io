require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';
window.addEventListener('DOMContentLoaded', function() {

    const Additional = require('./modules/additional'),
    Buttons = require('./modules/buttons'),
    Cart = require('./modules/cart'),
    cheackForm = require('./modules/cheackForm'),
    Form = require('./modules/form'),
    Media = require('./modules/media'),
    Modal = require('./modules/modal'),
    Slider = require('./modules/slider'),
    sliderSwap = require('./modules/sliderSwap');

Additional();
Buttons();
Cart();
cheackForm();
Form();
Media();
Modal();
Slider();  
sliderSwap();
});