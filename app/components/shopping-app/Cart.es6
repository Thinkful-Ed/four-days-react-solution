import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import * as Product from './Product';
import { products } from 'data/fakeState';

export default class Cart extends React.Component {

  render() {
    return (
      <div className='tf-cart'>
        <h3>Your Cart</h3>
        <ListGroup>
          { products.products.map(p =>
            <ListGroupItem bsSize={ 'xs' } key={ p.id }>
              <Product.Quantity
                style={ { float: 'right' } }
                quantity={ products.getQuantity(p) }
              />
              <Product.Title
                style={ { margin: 0 } }
                product={ p }
              />
            </ListGroupItem>
          ) }
        </ListGroup>
        <span className='text-warning'>
          { !products.hasProducts() && 'Please add some products to cart.' }
        </span>
        <p>Total: &#36;{ products.getCartTotal() }</p>
        <Button
          disabled={ !products.hasProducts() }>
          { products.hasProducts() ? 'Checkout' : 'No products' }
        </Button>
      </div>
    );
  }

}
