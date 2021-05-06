let Item = {
    props: {
        id: {
            type: Number,
            default: 0,
            required: true
        },
        title: {
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