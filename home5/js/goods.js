let Goods = {
    props: {
        goods: {
            type: Array,
            default: [],
            required: true
        },
    },
    components: {
        'goods-item': GoodsItem
    },
    template:
        `<div class="products">
            <goods-item v-for="item in goods" v-bind="item" :key="item.id"></goods-item>
            <p v-if="goods.length === 0">Нет данных</p>
        </div>`,
}