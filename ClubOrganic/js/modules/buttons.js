function Buttons(){
    let types = document.querySelectorAll('[data-products-type]');
    let products = document.querySelectorAll('.shop__products');
    ActivePassive(types, products);
    function ActivePassive(types, products){
        types.forEach(elem =>{
            if(elem.nodeName == "LI"){
                elem.addEventListener('click', ()=>{
                    document.querySelectorAll('.shop__tab_active').forEach(item=>{
                        item.classList.remove('shop__tab_active');
                    });
                    products.forEach(product => {
                        product.classList.remove('shop__products_active');
                        if(elem.dataset.productsType === product.dataset.productsType){
                            document.querySelectorAll(`[data-products-type='${elem.dataset.productsType}']`).forEach(item=>{
                                if(item.nodeName == "LI" && item.classList.contains('shop__tab')){
                                    item.classList.add('shop__tab_active');
                                }
                            });
                            product.classList.add('shop__products_active');
                        }
                    })
                })
            }
        });
        
    }
}
module.exports = Buttons;
