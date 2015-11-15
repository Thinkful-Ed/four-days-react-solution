import { ProductsSource } from 'flux/sources';

class ProductsActions {

  constructor() {
    this.generateActions(
      'setProducts', 'startFetchProducts', 'fetchProductsFail'
    );
  }

  async fetch() {
    try {
      this.actions.startFetchProducts();
      const products = await ProductsSource.fetch();
      this.actions.setProducts(products);
    } catch (error) {
      this.actions.fetchProductsFail({ error });
    }
  }

  setProducts(products) {
    this.dispatch(products);
  }
}

export default ProductsActions;
