function Modal(){
    
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

}
module.exports = Modal;
