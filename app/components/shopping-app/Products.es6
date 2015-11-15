import React, { PropTypes } from 'react';
import { get } from 'lodash';
import * as Product from './Product';
import connect from 'connect-alt';

@connect((state) => ({
  products: get(state, 'products.products')
}))
export default class Products extends React.Component {

  static propTypes = {
    products: PropTypes.array
  };

  static contextTypes = { flux: PropTypes.object.isRequired };

  render() {
    const ProductStore = this.context.flux.getStore('products');
    const CartStore = this.context.flux.getStore('cart');
    const { products } = this.props;
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
                onClick={ () => console.log({ p }) }
              />
            ) }
          </tbody>
        </Product.Table>
      </div>
    );
  }
}
