class GoodsList extends List{
    constructor(
        cart,
        options = {},
        container = '.products',
        url = '/catalogData.json') {
        super(options, container, url)
        this._cart = cart;
    }

    /**
     * Опции по умолчанию
     * @returns {Object}
     */
    get defaultOptions() {
        return {
            searchFieldClass: 'search-field'
        }
    }

    /**
     * Опции по умолчанию для элемента списка
     * @returns {Object}
     */
    getDefaultItemOptions() {
        return GoodsItem.defaultOptions;
    }

    /**
     * Создает элемент списка
     * @param {Object} data - опции для элемента списка
     * @returns {GoodsItem}
     */
    createItem(data) {
        return new GoodsItem(data, this);
    }

    /**
     * Инициализация списка
     * @private
     */
    _init() {
        document.querySelector(this._container).addEventListener('click', e => {
            if (e.target.classList.multipleContains(this.options.btnBuyClass)) {
                this._cart.addProduct(e.target);
            }
        });
        const searchField = document.querySelector(
            List.selectorFromClass(this.options.searchFieldClass));
        if (searchField) {
            searchField.addEventListener('input', e => {
                e.preventDefault();
                this.filter(searchField.value)
            })
        }

    }

    /**
     * Фильтрация элементов
     * @param {string} value - строка поиска
     */
    filter(value){
        const regexp = new RegExp(value, 'i'); //
        this.filtered = this._goods.filter(product => regexp.test(product.title));
        this._goods.forEach(el => {
            const block = document.querySelector(
                `${List.selectorFromClass(this.options.itemClass)}[data-id="${el.id}"]`);
            if(!this.filtered.includes(el)){
                block.classList.add('invisible');
            } else {
                block.classList.remove('invisible');
            }
        })
    }
}