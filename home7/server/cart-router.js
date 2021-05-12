const express = require('express');
const fs = require('fs');
const router = express.Router();
const cart = require('./cart');
const handler = require('./handler');

router.get('/', (req, res) => {
    fs.readFile('./db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404).send(JSON.stringify({result: 0, text: err}));
        } else {
            if (data === '') data = '{}';
            res.send(data);
        }
    });
});

router.post('/', (req, res) => {
    check(req, () => {
        handler(req, res, cart.add, './db/userCart.json');
    })

});
// localhost:3000/api/cart/123 // req.params.id
// localhost:3000/api/cart/?var1='sfsf'&var2='ada' // req.query
router.put('/:id', (req, res) => {
    handler(req, res, cart.change, './db/userCart.json');
});

router.delete('/:id', (req, res) => {
    handler(req, res, cart.del, './db/userCart.json');
});

// проверяем, что от пользователя пришел верный товар
const check = (request, ok, notOk) => {
    // заглушки, если функцию не передали
    if (!ok || typeof ok !== 'function') {
        ok = () => null;
    };
    if (!notOk || typeof notOk !== 'function')
        notOk = () => null;
    try {
        const prod = request.body;
        fs.readFile('./db/products.json', 'utf-8', (err, data) => {
            if (err) notOk(err)
            else {
                const products = JSON.parse(data);
                const product = products.find(item => item.id_product === prod.id_product);
                let match = product !== undefined;
                for (const key in product) {
                    match &= prod[key] === product[key];
                }
                if (match) ok()
                else notOk('Товар не найден');
            }
        });
    } catch (e) {
        notOk(e);
    }
};

module.exports = router;