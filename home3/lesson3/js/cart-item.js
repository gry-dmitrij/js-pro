class CartItem {
    constructor(id, name, price, count = 1, img = null) {
        this._id = id;
        this.name = name;
        this.price = price;
        this._count = count;
        this.img = img;
    }

    get id() {
        return this._id;
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

    add(number) {
        if (!Number.isInteger(number)) return;
        this._count += number;
    }

    sub(number) {
        this._count -= number;
        if (this._count < 0) {
            this._count = 0;
        }
    }

    /**
     * Отрисовать
     */
    render() {

    }
}