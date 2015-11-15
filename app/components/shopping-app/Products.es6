import React from 'react';
import * as Product from './Product';
import { products } from 'data/fakeState';

export default class Products extends React.Component {
  render() {
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
                quantity={ products.getQuantity(p) }
                isSoldOut={ products.isSoldOut(p) }
                onClick={ (prod) => console.log({ prod }) }
              />
            ) }
          </tbody>
        </Product.Table>
      </div>
    );
  }
}
