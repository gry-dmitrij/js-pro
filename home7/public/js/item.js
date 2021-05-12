let Item = {
    props: {
        id_product: {
            type: Number,
            default: 0,
            required: true
        },
        product_name: {
            type: String,
            default: '',
            required: true
        },
        price: {
            type: Number,
            default: 0,
            required: true
        }
    }
}