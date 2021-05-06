let Goods = {
    props: {
        goods: {
            type: Array,
            default: [],
            required: true
        },
        filter: {
            type: String,
            default: '',
        }
    },
    components: {
        'goods-item': GoodsItem
    },
    template:
        `<div class="products">
            <goods-item v-for="item in filterGoods" v-bind="item" :key="item.id"></goods-item>
            <p v-if="goods.length === 0">Нет данных</p>
        </div>`,
    computed: {
        filterGoods() {
            let reg = new RegExp(this.filter, 'i');
            return this.goods.filter(item => reg.test(item.title));
        }
    }
}