export class Product {
    constructor(id = "", name = "", desc = "", price = 0, stock = 0) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.stock = stock;
    }
}

export class Stock {
    constructor() {
        this.list_product = [];
        this.init();
    }

    get_list_product() {
        return this.list_product;
    }

    get_prod_by_id(id) {
        return this.list_product.find(product => product.id === id) || null;
    }

    init() {
        this.list_product.push(new Product("1", "Germinal 1", "description germinal 1", 10, 5));
        this.list_product.push(new Product("2", "Germinal 2", "description germinal 2", 20, 10));
        this.list_product.push(new Product("3", "Germinal 3", "description germinal 3", 30, 21));
        this.list_product.push(new Product("4", "Germinal 4", "description germinal 4", 40, 41));
        this.list_product.push(new Product("5", "Germinal 5", "description germinal 5", 50, 2));
        this.list_product.push(new Product("6", "Germinal 6", "description germinal 6", 60, 14));
        this.list_product.push(new Product("7", "Germinal 7", "description germinal 7", 70, 32));
        this.list_product.push(new Product("8", "Germinal 8", "description germinal 8", 80, 41));
        this.list_product.push(new Product("9", "Germinal 9", "description germinal 9", 90, 74));
        this.list_product.push(new Product("10", "Germinal 10", "description germinal 10", 100, 1));
    }
}

export class Cart {
    constructor() {
        this.cart = {};
    }

    addInCart(id, quantity) {
        if (this.cart[id]) {
            this.cart[id] += quantity;
        } else {
            this.cart[id] = quantity;
        }
    }

    removeFromCart(id) {
        if (this.cart[id]) {
            if (this.cart[id] > 1) {
                this.cart[id]--;
            } else {
                delete this.cart[id];
            }
        }
    }

    removeAllFromCart(id) {
        if (this.cart[id]) {
            delete this.cart[id];
        }
    }

    clearCart() {
        this.cart = {};
    }

    get_list_cart() {
        return this.cart;
    }

    get_nbr_product() {
        return Object.values(this.cart).reduce((acc, qty) => acc + qty, 0);
    }

    get_total_price(stock) {
        return Object.entries(this.cart).reduce((acc, [id, qty]) => {
            const product = stock.get_prod_by_id(id);
            return product ? acc + product.price * qty : acc;
        }, 0);
    }
}