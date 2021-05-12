let vm = new Vue({
    el: '#app',
    data: {
        cartItems: [
          {id: 123, title: 'Товар1', price: 100, count: 1},
          {id: 321, title: 'Товар2', price: 200, count: 2}
        ],
        isVisibleCart: false,
        filterLine: '',
    },
    components: {
        'cart': Cart,
        'goods': Goods,
        'search': Search
    },
    methods:{
        filterGoods(data) {
            this.filterLine = data;
        },
        addProduct(product) {
            this.$refs.cart.addProduct(product);
        }
    }
})