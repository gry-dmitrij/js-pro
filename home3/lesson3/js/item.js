class Item {
    constructor(el, list, img = 'https://via.placeholder.com/200x150') {
        this.title = el.product_name;
        this.price = el.price;
        this.id = el.id_product;
        this._list = list;
        this.img = img;
    }

    static get defaultOptions() {
        throw new Error(`Необходимо переопределить геттер defaultOptions для класса ${this.name}`)
    }

    get options() {
        return Object.assign({}, this._list.options);
    }

    render() {
        throw new Error(`Необходимо переопределить метод render для класса ${this.constructor.name}`);
    }
}