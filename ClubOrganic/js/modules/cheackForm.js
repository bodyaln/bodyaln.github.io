function cheackForm(){
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        const NameElement = selector.replace(/#/g, '');
        input.addEventListener('input', () => {
            if(document.querySelector(`.message__${NameElement}`)){
                document.querySelector(`.message__${NameElement}`).remove();
            }
            let statusMessage = document.createElement('div');
            statusMessage.classList.add("message",`message__${NameElement}`);
            statusMessage.style.cssText = `
                padding-top: 3px;
                margin-left: 2%;
                color: #FEFAEC;
                text-shadow: red 1px 1px 0, red -1px -1px 0, 
                red -1px 1px 0, red 1px -1px 0;
            `;
            switch(selector){
                case '#name': 
                    Emptyinput(input);
                    if (input.value.match(/\d/g)) {
                        input.style.border = "2px solid red";
                        statusMessage.innerText = `${'\u{026a0}'} Введіть літери, а не числа`;
                        SendButton(false);
                    }else{
                        SendButton(true);
                    };
                    break;
                case '#email':
                    Emptyinput(input);
                    if (input.value.length > 0 && (input.value.length < 6 || !(input.value.includes("@") && input.value.includes(".")))) {
                        input.style.border = "2px solid red";
                        statusMessage.innerText = `${'\u{026a0}'} Повинні бути символи '.' i '@' та кількість цифр більше 6`;
                        SendButton(false);
                    }else{
                        SendButton(true);
                    }
                    break;
                case '#checkbox':
                    Emptyinput(input);
                    if (!(input.checked)) {
                        SendButton(false);
                    }else{
                        SendButton(true);
                    }
                    break;
                case '#tel':
                    Emptyinput(input);
                    if(input.value.match(/\D/g)){
                        input.style.border = "2px solid red";
                        statusMessage.innerText = `${'\u{026a0}'} Введіть числа, а не літери чи символи`;
                        SendButton(false);
                    }
                    else if (input.value.length < 8  && input.value.length > 0) {
                        input.style.border = "2px solid red";
                        statusMessage.innerText = `${'\u{026a0}'} Кількість цифр повинна бути більше 8`;
                        SendButton(false);
                    }else{
                        SendButton(true);
                    };
                    break;
                case '#text':
                    Emptyinput(input);
                    if (input.value.length < 50 && input.value.length > 0) {
                        input.style.border = "2px solid red";
                        statusMessage.innerText = `${'\u{026a0}'} Кількість цифр повинна бути більше 50, Залишилося: ${50 - input.value.length}`;
                        SendButton(false);
                    }else{
                        SendButton(true);
                    };
                    break;
                default:
                    Emptyinput(input);
                    break;
            }
            if(statusMessage.innerText !== ""){
                input.insertAdjacentElement('afterend', statusMessage);
            }
        });
    }
    
    function Emptyinput(input){
        if(input.value === ""){
            input.style.border = 'none';
        }
        else {
            input.style.border = '2px solid #21a549';
        }
    }
    
    function SendButton(meaning){
        const cheackbox = document.querySelector('#checkbox');
        const btn = document.querySelector('.btn-send');
        if(!(cheackbox.checked) || !meaning ){
            btn.style.cursor = "not-allowed";
            btn.setAttribute('disabled', true);
        }
        else{
            btn.style.cursor = "pointer";
            btn.removeAttribute('disabled');
        }
    
    }
    getDynamicInformation('#checkbox');
    getDynamicInformation('#name');
    getDynamicInformation('#email');
    getDynamicInformation('#tel');
    getDynamicInformation('#topic');
    getDynamicInformation('#text');
}
module.exports = cheackForm;