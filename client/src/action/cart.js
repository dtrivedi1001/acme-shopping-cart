function getCartCountAPI() {
    return fetch("http://localhost:3100/api/cart/count")
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        });
}

function getCartAPI() {
    return fetch("http://localhost:3100/api/cart")
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        });
}

function clearCartAPI() {
    return fetch("http://localhost:3100/api/cart",  { method: 'delete' })
        .then(res => {
            if (res.status === 200) {
                return res.text();
            }
        });
}

function addItemsToCartAPI(id) {
    return fetch("http://localhost:3100/api/cart/product/" + id, { method: 'post' })
        .then(res => {
            if (res.status === 201) {
                return res.text();
            }
        });
}

function removeItemsFromCartAPI(id) {
    return fetch("http://localhost:3100/api/cart/product/" + id, { method: 'delete' })
        .then(res => {
            if (res.status === 200) {
                return res.text();
            }
        });
}

export function clearCart() {
    return clearCartAPI().then(res => {
        return res;
    });
};

export function getCart() {
    return getCartAPI().then(res => {
        return res;
    });
};

export function getCartCount() {
    return getCartCountAPI().then(res => {
        return res.count;
    });
};

export function addItemsToCart(id) {
    if (id === undefined) {
        return "ERROR - Product Id must be specified";
    }
    return addItemsToCartAPI(id).then(res => {
        console.log(res);
        return res;
    });
};

export function removeItemsFromCart(id) {
    if (id === undefined) {
        return "ERROR - Product Id must be specified";
    }
    return removeItemsFromCartAPI(id).then(res => {
        console.log(res);
        return res;
    });
};