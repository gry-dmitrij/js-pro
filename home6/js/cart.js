let Cart = {
    mixins: [GetData],
    props: {
        url: {
            type: String,
            default: '/getBasket.json'
        },
        urlAddProduct: {
            type: String,
            default: '/addToBasket.json'
        },
        urlSubProduct: {
            type: String,
            default: '/deleteFromBasket.json'
        },
        isVisible:{
            type: Boolean,
            default: false,

        }
    },
    data() {
        return {
            goods: [],
        }
    },
    mounted() {
        this.getJson(this.url)
            .then(data => {
                for (const el of data.contents) {
                    this.goods.push(el);
                }
            });
    },
    components: {
        'cart-item': CartItem
    },
    template:
        `<div class="cart-block" :class="{invisible: !isVisible}">
            <cart-item v-for="item in goods" v-bind="item" :key="item.id_product" v-on:delete-me="deleteItem"></cart-item>
        </div>`,
    methods: {
        deleteItem(id) {
            const index = this.goods.findIndex(item => item.id_product === id);
            if (index >= 0) {
                this.goods.splice(index, 1);
            }
        },
        addProduct(prod) {
            this.getJson(this.urlAddProduct)
                .then(data => {
                    if  (data.result === 1) {
                        let product = this.$children.find(item => item.id_product === prod.id_product)
                        if (product) {
                            product.addProduct();
                        } else {
                            prod.quantity = 1;
                            this.goods.push(prod);
                        }
                    }

                })
        }
    }
}