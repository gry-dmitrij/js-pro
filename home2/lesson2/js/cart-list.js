class CartList {
    /**
     * Конструктор
     * @param {CartItem[]} goods
     */
    constructor(goods = []) {
        this._goods = goods;
    }

    // отрисовать
    render() {

    }

    /**
     * Добавить товар в корзину
     * @param {CartItem} product
     */
    addProduct(product) {

    }

    /**
     * удалить товар из корзины
     * @param {CartItem} product
     */
    removeProduct(product) {

    }

    /**
     * увеличить кол-во товара
     * @param {CartItem} product
     * @param {number} count - кол-во добавляемого товара
     */
    increaseProductCount(product, count = 1) {

    }

    /**
     * уменьшить кол-во товара
     * @param {CartItem} product
     * @param {number} count - кол-во уменьшаемого товара
     */
    decreaseProductCount(product, count = 1) {

    }

    /**
     *
     * @returns {number} - стоимость
     */
    calcSum() {
        let sum = 0;
        //...forEach
        return sum;
    }
}