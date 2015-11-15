import { get, reduce, findWhere } from 'lodash';

class CartStore {

  constructor() {
    this.inProgress = false;
    this.products = {
      '0': 1,
      '3': 2
    };
    this.bindActions(this.alt.getActions('cart'));
    this.exportPublicMethods({
      getQuantity: this.getQuantity.bind(this),
      getCartTotal: this.getCartTotal.bind(this),
      hasProducts: this.hasProducts.bind(this)
    });
  }

  addProductToCart(product) {
    const quantity = this.getQuantity(product);
    this.products[product.id] = quantity ? quantity + 1 : 1;
  }

  getQuantity(product) {
    return get(this, `products.${product.id}`);
  }

  getCartTotal(products) {
    return reduce(get(this, `products`), (total, quantity, id) => {
      const product = findWhere(products, { id: Number(id) });
      return total + (get(product, 'price') * quantity);
    }, 0) || 0;
  }

  hasProducts() {
    return reduce(get(this, `products`), (t, q) => t + q, 0) > 0;
  }
}

export default CartStore;
