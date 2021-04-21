class CartItem {
    constructor(productName, price, count = 1, img = null) {
        this.productName = productName;
        this.price = price;
        this.count = count;
        this.img = img;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        // валидация
        this._price = value;
    }

    get count() {
        return this._count;
    }

    set count(value) {
        // валидация
        this._count = value
    }

    /**
     * Отрисовать
     */
    render() {

    }

    /**
     * Стоимость товара в количестве count
     */
    calcSum() {

    }
}