class ProductsStore {

  static isSoldOut = (product) =>
    product.inventory < 1;

  constructor() {
    this.bindActions(this.alt.getActions('products'));
    this.inProgress = false;
    this.products = [];
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
