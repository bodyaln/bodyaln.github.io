window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.head__menu'),
          menuItem = document.querySelectorAll('.head__menu_item'),
          hamburger = document.querySelector('.hamburger');
  
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('head__menu_active');
    });
  
    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('head__menu_active');
        });
    });
  });

  $(window).scroll(function() {
    if($(this).scrollTop() > 800){
        $('.pageup').fadeIn();
    } else{
      $('.pageup').fadeOut();
    }
  });