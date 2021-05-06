const CartItem = {
    mixins: [Item],
    props: {
        // id: {
        //     type: Number,
        //     default: 0,
        //     required: true
        // },
        // title: {
        //     type: String,
        //     default: '',
        //     required: true
        // },
        // price: {
        //     type: Number,
        //     default: 0,
        //     required: true
        // },
        count: {
            type: Number,
            default: 1,
            required: false
        }

    },
    data: function () {
        return {
            countItem: this.count
        }
    },
    template:
        `<div class="cart-item" :data-id="id">
            <div class="product-bio">
                <img src="https://via.placeholder.com/50x100" alt="Some img">
                <div class="product-desc">
                    <p class="product-title">{{title}}</p>
                    <p class="product-quantity">Количество: {{countItem}}</p>
                    <p class="product-single-price">{{price}} за ед.</p>
                </div>
                <div class="right-block">
                    <p class="product-price">{{sumPrice}} ₽</p>
                    <button class="del-btn" :data-id="id" v-on:click="subProduct">×</button>
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
                this.$emit('delete-me', this.id);
            }
        }
    }
}