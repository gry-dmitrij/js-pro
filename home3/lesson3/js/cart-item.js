class CartItem extends Item{
    constructor(
        el,
        list,
        img = 'https://via.placeholder.com/50x100') {
        super(el, list, img);
        this._count = el.quantity;
    }

    static get defaultOptions() {
        return {
            itemClass: 'cart-item',
            leftBlock: 'product-bio',
            rightBlock: 'right-block',
            descBoxClass: 'product-desc',
            titleClass: 'product-title',
            countClass: 'product-quantity',
            priceClass: 'product-single-price',
            sumPriceClass: 'product-price',
            delBtnClass: 'del-btn'
        }
    }

    render(){
        return `<div class="${this.options.itemClass}" data-id="${this.id}">
                    <div class="${this.options.leftBlock}">
                        <img src="${this.img}" alt="Some image">
                        <div class="${this.options.descBoxClass}">
                            <p class="${this.options.titleClass}">${this.title}</p>
                            <p class="${this.options.countClass}">Количество: ${this._count}</p>
                            <p class="${this.options.priceClass}">${this.price} за ед.</p>
                        </div>
                    </div>
                    <div class="${this.options.rightBlock}">
                        <p class="${this.options.sumPriceClass}">${this._count*this.price} ₽</p>
                        <button class="${this.options.delBtnClass}" data-id="${this.id}">&times;</button>
                    </div>
                </div>`;
    }
}