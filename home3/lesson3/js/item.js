/**
 * "Абстрактный" класс, необходимо переорпеделить часть методов
 */
class Item {
    /**
     *
     * @param {Object} el - объект с параметрами товара
     * @param {string} el.product_name - название товара
     * @param {number} el.price - цена товара
     * @param {number} el.id_product - идентификатор товара (целое число больше 0)
     * @param {List} list - ссылка на родительский список
     * @param {string} img - ссылка на картинку
     */
    constructor(el, list, img = 'https://via.placeholder.com/200x150') {
        this.title = el.product_name;
        this.price = el.price;
        this.id = el.id_product;
        this._list = list;
        this.img = img;
    }

    /**
     * "Виртуальный" геттер, возвращающий опции по умолчанию,
     * должен быть переопределен в потомке
     * @returns {Object}
     */
    static get defaultOptions() {
        throw new Error(`Необходимо переопределить геттер defaultOptions для класса ${this.name}`)
    }

    /**
     * Геттер, возвращающий опции объекта,
     * опции берет из родительского списка
     * @returns {Object}
     */
    get options() {
        return Object.assign({}, this._list.options);
    }

    /**
     * "Виртуальный" метод отрисовывает элемент,
     * должен быть переопределен в потомке
     */
    render() {
        throw new Error(`Необходимо переопределить метод render для класса ${this.constructor.name}`);
    }
}