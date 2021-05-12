let GoodsItem = {
    mixins: [Item],
    template:
        `<div class="product-item" :data-id="id_product">
            <img src="https://via.placeholder.com/200x150" alt="Some img">
            <div class="desc">
                <h3 class="title">{{product_name}}</h3>
                <p class="text">{{price}} \u20bd</p>
                <button class="buy-btn"
                  @click="addProduct">Купить</button>
            </div>
        </div>`,
    methods: {
        addProduct: function () {
            const product = {
                id_product: this.id_product,
                product_name: this.product_name,
                price: this.price
            };
            this.$emit('add-product', product);
        }
    }
}