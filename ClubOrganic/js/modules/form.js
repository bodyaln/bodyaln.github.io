
function Form(){
    

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
    close.addEventListener('click', ()=>{
        document.querySelector('.orders').style.display = "none";
    });
    console.log(clears);
    clears.forEach(elem=>{
        elem.addEventListener('click', ()=>{
            ClearBorder(form, inputs);
        })
    });

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
                if(inputform.includes('orders')){
                    document.querySelector('.orders').style.display = "none";
                }
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

module.exports = Form;

