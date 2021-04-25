class GoodsList {
    static API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
    constructor(container = '.products') {
        this.container = container;
        this._goods = []; // data
        this._allProducts = []; // массив экземпляров товаров на основе this._goods

        this._fetchGoods()
            .then(() => {
                this._render();
            });
        this._render();
    }

    _fetchGoods() {
        return this._getRequest(`${GoodsList.API_URL}/catalogData.json`)
            .then((data) => {
                this._goods = JSON.parse(data);
            });
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

    _getRequest(url, timeout = 10000) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.timeout = timeout;

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (xhr.status >= 200
                    && xhr.status <= 299) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.statusText);
                }
            }
            xhr.ontimeout = () => {
                reject('Timeout!');
            }

            xhr.send();
        } );
    }
}