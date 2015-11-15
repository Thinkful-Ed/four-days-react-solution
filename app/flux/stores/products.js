import { get } from 'lodash';

class ProductsStore {

  static isSoldOut = (product) =>
    product.inventory < 1;

  static getQuantity = (product, cart) =>
    get(cart, `products.${product.id}`);

  constructor() {
    this.bindActions(this.alt.getActions('products'));
    this.inProgress = false;
    this.products = [
      { id: 0, price: 1.00, inventory: 1, title: 'T-shirt' },
      { id: 1, price: 1.00, inventory: 1, title: 'Sweater' },
      { id: 2, price: 1.00, inventory: 1, title: 'Vest' },
      { id: 3, price: 1.00, inventory: 0, title: 'Trousers' },
      { id: 4, price: 1.00, inventory: 1, title: 'Jeans' },
      { id: 5, price: 1.00, inventory: 0, title: 'Baseball' }
    ];
  }

  setProducts(products) {
    this.products = products;
    this.inProgress = false;
  }
}

export default ProductsStore;
