const fs = require('fs');

const handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404).send(JSON.stringify({result: 0, text: err}));
        } else {
            if (data === '') data = '{"contents":[]}';
            const newCart = action(JSON.parse(data), req);
            stat(action.name, req, data);
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    });
};

const stat = (name, req, data) => {
    let productName = req.body.product_name;
    if (!productName) {
        let id = +req.params.id;
        if (id) {
            let products = JSON.parse(data);
            let product = products.contents.find(item => item.id_product === id);
            if (product) {
                productName = product.product_name;
            }
        }
    }
    let statRec = {
        action: name,
        date: new Date(),
        product: productName
    }
    addStatRecord(statRec);
}

const addStatRecord = (statRec) => {
    const statFile = './db/stats.json';
    fs.readFile(statFile, 'utf-8', (err, data) => {
        let actions = [];
        if (err) {
            if (err.code !== 'ENOENT') return;
        } else {
            if (data !== '') actions = JSON.parse(data);
        }
        actions.push(statRec);
        fs.writeFile(statFile, JSON.stringify(actions, null, 4), (err) => {
            if (err) console.log(err);
        });
    });
}

module.exports = handler;