import { findWhere } from 'lodash';

class ProductsStore {

  static isSoldOut = (product) =>
    product.inventory < 1;

  constructor() {
    this.bindActions(this.alt.getActions('products'));
    this.inProgress = false;
    this.products = [];
    this.exportPublicMethods({
      getProduct: this.getProduct.bind(this)
    });
  }

  getProduct(id) {
    return findWhere(this.products, { id });
  }

  startFetchProducts() {
    this.inProgress = true;
  }

  setProducts(products) {
    this.products = products;
    this.inProgress = false;
  }
}

export default ProductsStore;
