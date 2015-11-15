import React, { PropTypes } from 'react';
import { get } from 'lodash';
import * as Product from './Product';
import connect from 'connect-alt';

@connect((state) => ({
  products: get(state, 'products.products'),
  inProgress: get(state, 'products.inProgress')
}))
export default class Products extends React.Component {

  static propTypes = {
    products: PropTypes.array,
    inProgress: PropTypes.bool
  };

  static contextTypes = { flux: PropTypes.object.isRequired };

  render() {
    const ProductStore = this.context.flux.getStore('products');
    const CartStore = this.context.flux.getStore('cart');
    const { products, inProgress } = this.props;
    const title = 'Products';
    return (
      <div className='tf-products'>
        <h3>{ title }</h3>
        <Product.Table>
          <Product.TableHead />
          <tbody>
            { products.map(p =>
              <Product.TableRow
                key={ p.id }
                product={ p }
                quantity={ CartStore.getQuantity(p) }
                isSoldOut={ ProductStore.isSoldOut(p) }
                onClick={ this.addProductToCart.bind(this, p) }
              />
            ) }
          </tbody>
        </Product.Table>
        { inProgress && 'loading...' }
      </div>
    );
  }

  addProductToCart(product) {
    this.context.flux.getActions('cart').addProductToCart(product);
  }
}
