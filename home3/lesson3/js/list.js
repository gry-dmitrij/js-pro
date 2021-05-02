/**
 * "Абстрактный" класс, необходимо переорпеделить часть методов
 */
class List {
    static API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

    /**
     *
     * @param {Object} options - опции для списка и элементов
     * @param {string} container - селектор для контейнера товаров
     * @param {string} url - адрес API
     */
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
            .then(data => this.handleData(data))
            .then(() => {
                this.render()
            });
    }

    /**
     * "Виртуальный" метод возвращает опции по умолчанию,
     * должен быть переопределен в потомках
     */
    get defaultOptions() {
        throw new Error(`Необходимо переопределить геттер defaultOptions для класса ${this.constructor.name}`);
    }

    /**
     * Возвращает опции списка
     * @returns {Object}
     */
    get options() {
        return Object.assign({}, this._options);
    }

    /**
     * Возвращает опции по умолчанию для элемента списка
     * "Виртуальный" метод должен быть переопределен в потомках
     */
    getDefaultItemOptions() {
        throw new Error(`Необходимо переопределить метод getDefaultItemOptions для класса ${this.constructor.name}`)
    }

    /**
     * Запрашивает данные с сервера
     * @param {string} url - адрес запроса
     * @returns {Promise<Object>}
     */
    getJson(url) {
        return fetch(`${List.API_URL + url}`)
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            });
    }

    /**
     * Обрабатывает полученные от сервера данные
     * @param data
     */
    handleData(data) {
        this._goods.length = 0;
        for (const item of data) {
            this._goods.push(this.createItem(item));
        }
    }

    /**
     * "Виртуальный" метод инициализурует объект
     * @private
     */
    _init() {
       throw new Error(`Необходимо переопределить метод _init для класса ${this.constructor.name}`);
    }

    /**
     * Виртуальный фабричный метод создания элемента списка
     * @return {Item}
     */
    createItem(data) {
        throw new Error(`Необходимо переопределить метод createItem для класса ${this.constructor.name}`);
    }

    /**
     * Отрисовывает товары
     * @param {?Item[]}products
     */
    render(products) {
        products = products ? products : this._goods;
        const container = document.querySelector(this._container);
        for (const item of products) {
            container.insertAdjacentHTML('beforeend', item.render());
        }
    }

    /**
     * Преобразует строку классов в селектор
     * @param {string} classString - строка классов
     * @returns {string}
     */
    static selectorFromClass(classString) {
        return '.' + classString.trim().replace(/\s+/, '.');
    }
}