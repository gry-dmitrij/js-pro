const basket = new CartList();
const catalog = new GoodsList(basket);

function _getRequest(url, timeout = 10000) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.timeout = timeout;

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status >= 200
                && xhr.status <= 299) {
                resolve(xhr.responseText);
            } else {
                reject(xhr.statusText);
            }
        }
        xhr.ontimeout = () => {
            reject('Timeout!');
        }

        xhr.send();
    } );
}


