import React from 'react';
import { includes, get } from 'lodash';

export default class Products extends React.Component {
  render() {
    const props = {
      title: 'Products',
      products: [
        { id: 0, price: 1.00, inventory: 1, title: 'T-shirt' },
        { id: 1, price: 1.00, inventory: 1, title: 'Sweater' },
        { id: 2, price: 1.00, inventory: 1, title: 'Vest' },
        { id: 3, price: 1.00, inventory: 1, title: 'Trousers' },
        { id: 4, price: 1.00, inventory: 1, title: 'Jeans' },
        { id: 5, price: 1.00, inventory: 1, title: 'Baseball' }
      ],
      cart: {
        products: {
          '0': 1,
          '3': 2
        }
      }
    };
    const isInCart = (pId) => includes(Object.keys(props.cart.products), pId);
    const isSoldOut = (p) => p.inventory < 1;
    const getQuantity = (p) => get(props.cart, `products.${p.id}`);
    return (
      <div className='tf-products'>
        <h3>{ props.title }</h3>
        <div className='tf-products__list'>
          { props.products.map(p =>
            <div key={ p.id } className='tf-products__item'>
              { isSoldOut(p) && 'Sold Out' }
              <div className='tf-products__product-title'>
                { p.title } - &#36;{ p.price } { getQuantity(p) }
              </div>
              <button
                disabled={ isSoldOut(p) }>
                { isInCart(p.id) ? 'Remove from cart' : 'Add to cart' }
              </button>
            </div>
          ) }
        </div>
      </div>
    );
  }
}
