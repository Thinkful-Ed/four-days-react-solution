import React from 'react';
import { reduce, findWhere, get } from 'lodash';
import { Button } from 'react-bootstrap';

export default class Cart extends React.Component {
  render() {
    const props = {
      title: 'Products',
      products: [
        { id: 0, price: 1.00, inventory: 1, title: 'T-shirt' },
        { id: 1, price: 1.00, inventory: 1, title: 'Sweater' },
        { id: 2, price: 1.00, inventory: 1, title: 'Vest' },
        { id: 3, price: 10.00, inventory: 0, title: 'Trousers' },
        { id: 4, price: 1.00, inventory: 1, title: 'Jeans' },
        { id: 5, price: 1.00, inventory: 0, title: 'Baseball' }
      ],
      cart: {
        products: {
          '0': 3,
          '4': 5
        }
      }
    };
    const getTotal = ()=>
      reduce(props.cart.products, (total, quantity, id) => {
        const product = findWhere(props.products, { id: Number(id) });
        return total + (get(product, 'price') * quantity);
      }, 0);
    const hasProducts = reduce(props.cart.products, (t, q) => t + q, 0) > 0;
    return (
      <div className='tf-cart'>
        <h3>Your Cart</h3>
        <span className='text-warning'>
          { !hasProducts && 'Please add some products to cart.' }
        </span>
        <p>Total: &#36;{ getTotal() }</p>
        <Button
          disabled={ !hasProducts }>
          { hasProducts ? 'Checkout' : 'No products' }
        </Button>
      </div>
    );
  }
}
