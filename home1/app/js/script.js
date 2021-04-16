const goods = [
	{ title: 'Shirt', price: 150 },
	{ title: 'Socks', price: 50 },
	{ title: 'Jacket', price: 350 },
	{ title: 'Shoes', price: 250 },
];

const renderGoodsItem = ({title = 'Товар в пути', price= 0}) => {
	return `<div class="goods-item"><h3>${title}</h3>
		<img src="https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}">
		<p>Цена: ${price}</p></div>`;
};

const renderGoodsList = (list = [{}]) => {
	let goodsList = list.map(item => renderGoodsItem(item));
	document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

// при загрузке добавим слушателя кнопке
document.addEventListener('DOMContentLoaded', () => {
	const button = document.querySelector('.cart-button');
	button.addEventListener('click', function (event){
		renderGoodsList(goods);
	});
});
