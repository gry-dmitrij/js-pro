class GoodsList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = []; // data
        this._allProducts = []; // массив экземпляров товаров на основе this._goods

        this._fetchGoods();
        this._render();
    }

    _fetchGoods() {
        this._goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }

    _render() {
        const block = document.querySelector(this.container);

        for (const product of this._goods) {
            const productObject = new GoodsItem(product);

            this._allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    calcSum() {
        let sum = 0;
        this._goods.forEach((item) => {
            sum += item.price;
        });
        return sum;
    }
}