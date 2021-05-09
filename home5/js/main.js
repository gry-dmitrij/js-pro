let vm = new Vue({
    el: '#app',
    data: {
        cartItems: [
          {id: 123, title: 'Товар1', price: 100, count: 1},
          {id: 321, title: 'Товар2', price: 200, count: 2}
        ],
        goodsItems: [
          {id: 123, title: 'Товар1', price: 100},
          {id: 321, title: 'Товар2', price: 200}
        ],
        isVisibleCart: false,
        searchLine: '',
        filterLine: '',
    },
    components: {
        'cart': Cart,
        'goods': Goods
    },
    methods:{
        filterGoods() {
            this.filterLine = this.searchLine;
        }
    }
})