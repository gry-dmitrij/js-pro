class GoodsItem extends Item{

    /**
     * Опции по умолчанию
     * @returns {Object}
     */
    static get defaultOptions() {
        return {
            itemClass: 'product-item',
            descBoxClass: 'desc',
            titleClass: 'title',
            textClass: 'text',
            btnBuyClass: 'buy-btn'
        };
    }

    /**
     * Отрисовка товара
     * @returns {string}
     */
    render() {
        return `<div class=${this.options.itemClass} data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <div class="${this.options.descBoxClass}">
                        <h3 class="${this.options.titleClass}">${this.title}</h3>
                        <p class="${this.options.textClass}">${this.price} \u20bd</p>
                        <button class="${this.options.btnBuyClass}"
                            data-id="${this.id}"
                            data-name="${this.title}"
                          data-price="${this.price}">Купить</button>
                    </div>
                </div>`;
    }
}