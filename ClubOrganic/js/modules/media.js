function Media(){
    
let flag = false;
function MediaFunction(media) {
    if (media.matches) { // Если медиа запрос совпадает
        let hamburger = document.querySelector('.hamburger');
        hamburger.addEventListener('click', ()=>{
            document.querySelector('.header__wrapper').classList.toggle('header__wrapper__active');
        })
        let block = document.querySelector('.header__close');
        block.addEventListener("click", ()=>{
            document.querySelector('.header__wrapper').classList.toggle('header__wrapper__active');
        });

        let links = document.querySelectorAll('.header__nav__item__dropdown__dropdown-content li');
        links.forEach(link =>{
            link.addEventListener('click', ()=>{
                document.querySelector('.header__wrapper').classList.toggle('header__wrapper__active');
            })
        })
        
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
        window.addEventListener("resize", EditAreaAndWidthWithHeight);
        EditAreaAndWidthWithHeight();
    }
  }

  function EditAreaAndWidthWithHeight(){
    document.querySelector('.promo__navigation img').style.cssText = `width: ${document.documentElement.clientWidth -60}px; height: ${document.documentElement.clientWidth - 85}px`;
    let area = document.querySelectorAll('area');
    area[0].coords = `${125 + 125* ((document.documentElement.clientWidth - 320) / (576 - 320)) },${20 + 10* ((document.documentElement.clientWidth - 320) / (576 - 320))},${20 + 10* ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
    area[1].coords = `${205 + 185* ((document.documentElement.clientWidth - 320) / (576 - 320)) },${20 + 25* ((document.documentElement.clientWidth - 320) / (576 - 320))},${20 + 25* ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
    area[2].coords = `${18 + 22* ((document.documentElement.clientWidth - 320) / (576 - 320)) },${75 + 85* ((document.documentElement.clientWidth - 320) / (576 - 320))},${20 + 5* ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
    area[3].coords = `${220 + 230* ((document.documentElement.clientWidth - 320) / (576 - 320)) },${63 + 77* ((document.documentElement.clientWidth - 320) / (576 - 320))},${20 + 5* ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
    area[4].coords = `${40 + 40* ((document.documentElement.clientWidth - 320) / (576 - 320)) },${21 + 27* ((document.documentElement.clientWidth - 320) / (576 - 320))}, ${68 + 67* ((document.documentElement.clientWidth - 320) / (576 - 320))},${46 + 54* ((document.documentElement.clientWidth - 320) / (576 - 320))}`;
  }
}
module.exports = Media;
