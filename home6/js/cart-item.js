const CartItem = {
    mixins: [Item],
    props: {
        quantity: {
            type: Number,
            default: 1,
            required: false
        }

    },
    data: function () {
        return {
            countItem: this.quantity
        }
    },
    template:
        `<div class="cart-item" :data-id="id_product">
            <div class="product-bio">
                <img src="https://via.placeholder.com/50x100" alt="Some img">
                <div class="product-desc">
                    <p class="product-title">{{product_name}}</p>
                    <p class="product-quantity">Количество: {{countItem}}</p>
                    <p class="product-single-price">{{price}} за ед.</p>
                </div>
                <div class="right-block">
                    <p class="product-price">{{sumPrice}} ₽</p>
                    <button class="del-btn" :data-id="id_product" v-on:click="subProduct">×</button>
                </div>
            </div>
        </div>`,
    computed: {
        sumPrice: function () {
            return this.price * this.countItem;
        }
    },
    methods: {
        subProduct() {
            this.countItem--;
            if (this.countItem <= 0) {
                this.$emit('delete-me', this.id_product);
            }
        },
        addProduct(amount = 1) {
            this.countItem += amount;
        }
    }
}