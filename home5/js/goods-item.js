let GoodsItem = {
    mixins: [Item],
    template:
        `<div class="product-item" :data-id="id">
            <img src="https://via.placeholder.com/200x150" alt="Some img">
            <div class="desc">
                <h3 class="title">{{title}}</h3>
                <p class="text">{{price}} \u20bd</p>
                <button class="buy-btn"
                    :data-id="id"
                    :data-name="title"
                  :data-price="price">Купить</button>
            </div>
        </div>`,
}