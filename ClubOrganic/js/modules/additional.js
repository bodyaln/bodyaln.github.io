function Additional() {
    let lastScroll = 0;
const defaultOffset = 100;
const header = document.querySelector('.header');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('header__hide');

window.addEventListener('scroll', () => {
    if(!(window.matchMedia("(max-width: 576px)").matches) || !(document.querySelector('.header__wrapper').classList.contains('header__wrapper__active'))){
        if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
            //scroll down
            header.classList.add('header__hide');
        }
        else if(scrollPosition() < lastScroll && containHide()){
            //scroll up
            header.classList.remove('header__hide');
        }
    }
    lastScroll = scrollPosition();
});


const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
}
window.addEventListener('resize', appHeight);
appHeight();

(function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://club-organic-agriculture.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();

    window.addEventListener('scroll', () => { 
        let scrollTop = window.pageYOffset;
    
    let arrowup = document.querySelector('#toTop');
    
    if(scrollTop >= 700 ){
        arrowup.style.display ="block";
    }
    else{    
        arrowup.style.display ="none";
    }
});
}

module.exports = Additional;


