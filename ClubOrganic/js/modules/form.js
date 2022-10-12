function Form(){
    

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

}

module.exports = Form;

