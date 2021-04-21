class Hamburger {
    _sizes = ['big', 'small'];
    _prices = {
        big: 100,
        small: 50,
        cheese: 10,
        salad: 20,
        potatoes: 15,
    }
    _filings = ['cheese', 'salad', 'potatoes']
    _calories = {
        big: 40,
        small: 20,
        cheese: 20,
        salad: 5,
        potatoes: 10,
    }
    constructor(size = 'big', filling = 'cheese') {

        if (!this._sizes.includes(size))
            throw new Error('Указан неверный размер');
        if (!this._filings.includes(filling))
            throw new Error('Указана неверная начинка');

        this._size = size;
        this._filing = filling;
    }

    calcPrice() {
        return this._prices[this._size] + this._prices[this._filing];
    }

    calcCalories() {
        return this._calories[this._size] + this._prices[this._filing];
    }
}

let hamburger = new Hamburger('big', 'salad');
console.log('Цена: ' + hamburger.calcPrice());
console.log('Калории: ' + hamburger.calcCalories());
hamburger = new Hamburger('medium', 'cheese');