class CartList {
    static API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
    /**
     * Конструктор
     * @param {string} container - контейнер для товаров корзины
     */
    constructor(container = '.products') {
        this._goods = [];
        this._container = container;
        this._fetchGoods()
            .then(() => {
                this.render();
            })
    }

    /**
     * Получает товары корзины
     * @returns {Promise<any>}
     * @private
     */
    _fetchGoods() {
        return fetch(`${CartList.API_URL}/getBasket.json`)
            .then((response) => response.json())
            .then((data) => {
                data.contents.forEach(item => {
                   this._goods.push(
                       new CartItem(item.id_product,
                           item.product_name,
                           item.price,
                           item.quantity));
                });
            });
    }

    // отрисовать
    render() {
        console.log(this._goods);
    }

    /**
     * Добавить товар в корзину
     * @param {CartItem} product
     */
    addProduct(product) {
        if (!(product instanceof CartItem)) return;
        fetch(`${CartList.API_URL}/addToBasket.json`)
            .then((response) => response.json())
            .then(data => {
                if (data.result === 1) {
                    this._goods.push(product);
                    this.render();
                }
            });

    }

    /**
     * удалить товар из корзины
     * @param {number} productId - id товара
     */
    removeProduct(productId) {
        let index = this._goods.findIndex((item) => item.id === productId);
        if (index < 0) return;
        fetch(`${CartList.API_URL}/deleteFromBasket.json`)
            .then((response) => response.json())
            .then(data =>  {
                if (data.result === 1) {
                    this._goods.splice(index, 1);
                    this.render();
                }
            })
    }

    // не стал переделывать, так как нет ответа от сервера
    // /**
    //  * увеличить кол-во товара
    //  * @param {number} productId - id товара
    //  * @param {number} count - кол-во добавляемого товара
    //  */
    // increaseProductCount(productId, count = 1) {
    //     let product = this._getProduct(productId);
    //     if (!product) return;
    //     product.add(count)
    // }
    //
    // /**
    //  * уменьшить кол-во товара
    //  * @param {number} productId - id товара
    //  * @param {number} count - кол-во уменьшаемого товара
    //  */
    // decreaseProductCount(productId, count = 1) {
    //     let product = this._getProduct(productId);
    //     if (!product) return;
    //     product.sub(count)
    // }

    // _getProduct(productId) {
    //     return this._goods.find((item) => item.id === productId);
    // }

    /**
     *
     * @returns {number} - стоимость
     */
    calcSum() {
        let sum = 0;
        this._goods.forEach(item => {
            sum += item.price * item.count;
        })
        return sum;
    }
}