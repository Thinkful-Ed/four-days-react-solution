import React, { PropTypes } from 'react';
import { get } from 'lodash';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import connect from 'connect-alt';
import * as Product from './Product';

@connect((state) => ({
  products: get(state, 'products.products')
}))
export default class Cart extends React.Component {

  static propTypes = {
    products: PropTypes.array
  };

  static contextTypes = { flux: PropTypes.object.isRequired };

  render() {
    const CartStore = this.context.flux.getStore('cart');
    const { products } = this.props;
    const hasProducts = CartStore.hasProducts();
    return (
      <div className='tf-cart'>
        <h3>Your Cart</h3>
        <ListGroup>
          { products.map(p =>
            <ListGroupItem bsSize={ 'xs' } key={ p.id }>
              <Product.Quantity
                quantity={ CartStore.getQuantity(p) }
                style={ { float: 'right' } }
              />
              <Product.Title
                style={ { margin: 0 } }
                product={ p }
              />
            </ListGroupItem>
          ) }
        </ListGroup>
        <span className='text-warning'>
          { !hasProducts && 'Please add some products to cart.' }
        </span>
        <p>Total: &#36;{ CartStore.getCartTotal(products) }</p>
        <Button
          onClick={ e => console.log(e) }
          disabled={ !hasProducts }>
          { hasProducts ? 'Checkout' : 'No products' }
        </Button>
      </div>
    );
  }

}
