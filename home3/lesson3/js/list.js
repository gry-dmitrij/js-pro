/**
 * "Абстрактный" класс, необходимо переорпеделить часть методов
 */
class List {
    static API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
    constructor(
        options = {},
        container = '.product',
        url = '') {
        this._container = container;
        this._url = url;
        this._goods = [];
        this._filtered = [];
        // опции состоят из опций Item,
        // из собственных опций и переданых опций
        this._options = Object.assign(
            {},
            this.getDefaultItemOptions(),
            this.defaultOptions,
            options)
        this._init();
        this.getJson(url)
            .then(data => this._handleData(data))
            .then(() => {
                this.render()
            });
    }

    get defaultOptions() {
        throw new Error(`Необходимо переопределить геттер defaultOptions для класса ${this.constructor.name}`);
    }

    get options() {
        return Object.assign({}, this._options);
    }

    getDefaultItemOptions() {
        throw new Error(`Необходимо переопределить метод getDefaultItemOptions для класса ${this.constructor.name}`)
    }

    getJson(url) {
        return fetch(`${List.API_URL + url}`)
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            });
    }

    _handleData(data) {
        this._goods.length = 0;
        for (const item of data) {
            this._goods.push(this.createItem(item));
        }
    }

    /**
     * "Виртуальный" метод
     * @private
     */
    _init() {
       throw new Error(`Необходимо переопределить метод _init для класса ${this.constructor.name}`);
    }

    /**
     * Виртуальный фабричный метод создания элемента списка
     * @return {*}
     */
    createItem(data) {
        throw new Error(`Необходимо переопределить метод createItem для класса ${this.constructor.name}`);
    }

    render(products) {
        products = products ? products : this._goods;
        const container = document.querySelector(this._container);
        for (const item of products) {
            container.insertAdjacentHTML('beforeend', item.render());
        }
    }

    static selectorFromClass(classString) {
        return '.' + classString.trim().replace(/\s+/, '.');
    }
}