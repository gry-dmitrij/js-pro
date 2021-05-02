class CartList extends List{
    constructor(
        options = {},
        container = '.cart-block',
        url = '/getBasket.json') {
        super(options, container, url);
    }

    /**
     * Опции по умолчанию
     * @returns {Object}
     */
    get defaultOptions() {
        return {
            cartButtonClass: 'btn-cart',
            hideClass: 'invisible'
        }
    }

    /**
     * Инициализация списка
     * @private
     */
    _init(){
        document.querySelector(
            List.selectorFromClass(this.options.cartButtonClass))
                .addEventListener('click', () => {
                    document.querySelector(this._container)
                        .classList.toggle(this.options.hideClass);
        });
        document.querySelector(this._container)
            .addEventListener('click', e => {
                if(e.target.classList.multipleContains(this.options.delBtnClass)){
                    this.removeProduct(e.target);
                }
            });
    }

    /**
     * Создает элемент списка
     * @param {Object} data - опции для элемента списка
     * @returns {CartItem}
     */
    createItem(data) {
        return new CartItem(data, this);
    }

    /**
     * Опции по умолчанию для элемента списка
     * @returns {Object}
     */
    getDefaultItemOptions() {
        return CartItem.defaultOptions;
    }

    /**
     * Обрабатывает полученные от сервера данные
     * @param data
     */
    handleData(data) {
        data = data.contents;
        super.handleData(data);
    }

    /**
     * Обновляет данные товара
     * @param {CartItem} product
     * @private
     */
    _updateCart(product){
        let block = document.querySelector(
            `${List.selectorFromClass(this.options.itemClass)}[data-id="${product.id}"]`);
        block.querySelector(
            List.selectorFromClass(this.options.countClass)).textContent = `Количество: ${product._count}`;
        block.querySelector(
            List.selectorFromClass(this.options.sumPriceClass)).textContent = `${product._count * product.price} ₽`;
    }

    /**
     * Добавляет товар в корзину
     * @param {Node} element
     */
    addProduct(element) {
        this.getJson('/addToBasket.json')
            .then(data => {
               if (data.result === 1) {
                   let productId = +element.dataset.id;
                   let product = this._goods.find(product => product.id === productId);
                   if (product) {
                       product._count++;
                       this._updateCart(product);
                   } else  {
                       let product = this.createItem({
                           id_product: productId,
                           price: +element.dataset['price'],
                           product_name: element.dataset['name'],
                           quantity: 1
                       });
                       this._goods.push(product);
                       this.render([product]);
                   }
               } else {
                   alert('Ошибка!')
               }
            });
    }

    /**
     * Удаляет товар из корзины
     * @param {Node} el
     */
    removeProduct(el) {
        let index = this._goods.findIndex((item) => item.id === +el.dataset.id);
        if (index < 0) {
            alert('Ошибка');
            return;
        }
        this.getJson('/deleteFromBasket.json')
            .then(data => {
                if (data.result === 1) {
                    let product = this._goods[index];
                    if (product._count > 1){
                        product._count--;
                        this._updateCart(product);
                    } else {
                        this._goods.splice(index, 1);
                        document.querySelector(
                            `${List.selectorFromClass(this.options.itemClass)}[data-id="${product.id}"]`).remove();
                    }
                }
            });
    }
}