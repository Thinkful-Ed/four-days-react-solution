import React from 'react';
import { get } from 'lodash';
import * as Product from './Product';
import { products } from 'data/fakeState';

export default class Products extends React.Component {
  render() {
    const isSoldOut = (p) => p.inventory < 1;
    const getQuantity = (p) => get(products.cart, `products.${p.id}`);
    return (
      <div className='tf-products'>
        <h3>{ products.title }</h3>
        <Product.Table>
          <Product.TableHead />
          <tbody>
            { products.products.map(p =>
              <Product.TableRow
                key={ p.id }
                product={ p }
                quantity={ getQuantity(p) }
                isSoldOut={ isSoldOut(p) }
              />
            ) }
          </tbody>
        </Product.Table>
      </div>
    );
  }
}
