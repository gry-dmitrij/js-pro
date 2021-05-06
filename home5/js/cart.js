let Cart = {
    props: {
        goods: {
            type: Array,
            default: [],
            required: true
        },
        isVisible:{
            type: Boolean,
            default: false,

        }
    },
    // data: function () {
    //     return {
    //         isVisibleCart: true,
    //     }
    // },
    components: {
        'cart-item': CartItem
    },
    template:
        `<div class="cart-block" :class="{invisible: !isVisible}">
            <cart-item v-for="item in goods" v-bind="item" :key="item.id" v-on:delete-me="deleteItem"></cart-item>
        </div>`,
    methods: {
        deleteItem(id) {
            const index = this.goods.findIndex(item => item.id === id);
            if (index >= 0) {
                this.goods.splice(index, 1);
            }
        }
    }
}