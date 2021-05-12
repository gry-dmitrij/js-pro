const add = (cart, req) => {
  cart.contents.push(req.body);
  calc(cart);
  return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  if (find) {
    find.quantity += req.body.quantity;
    calc(cart);
  }
  return JSON.stringify(cart, null, 4);
};
const del = (cart, req) => {
  const index = cart.contents.findIndex(el => el.id_product === +req.params.id);
  if (index >= 0) {
      cart.contents.splice(index, 1);
      calc(cart);
  }
  return JSON.stringify(cart, null, 4);
};

const calc = (cart) => {
  let sum = 0;
  for (const content of cart.contents)  {
      sum += content.quantity * content.price;
  }
  cart.amount = sum;
  cart.countGoods = cart.contents.length;
}

module.exports = {
  add,
  change,
  del
};
