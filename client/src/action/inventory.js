function getInventoryAPI() {
    return fetch("http://localhost:3100/api/inventory")
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        });
}

export function getInventory() {
    return getInventoryAPI().then(res => {
        let response = [];
        for (let data in res) {
            const inventory = res[data];
            response.push(
                {
                    id: inventory._id,
                    thumbnail: inventory.thumbnail,
                    price: inventory.price,
                    title: inventory.name,
                    description: inventory.description,
                    quantity: inventory.quantity
                }
            );
        }
        return response;
    });
};