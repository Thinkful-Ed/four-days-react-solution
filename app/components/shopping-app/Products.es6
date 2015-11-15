import React from 'react';
import { get } from 'lodash';
import { Button, Badge, Label, Table } from 'react-bootstrap';

export default class Products extends React.Component {
  render() {
    const props = {
      title: 'Products',
      products: [
        { id: 0, price: 1.00, inventory: 1, title: 'T-shirt' },
        { id: 1, price: 1.00, inventory: 1, title: 'Sweater' },
        { id: 2, price: 1.00, inventory: 1, title: 'Vest' },
        { id: 3, price: 1.00, inventory: 0, title: 'Trousers' },
        { id: 4, price: 1.00, inventory: 1, title: 'Jeans' },
        { id: 5, price: 1.00, inventory: 0, title: 'Baseball' }
      ],
      cart: {
        products: {
          '0': 1,
          '3': 2
        }
      }
    };
    const isSoldOut = (p) => p.inventory < 1;
    const getQuantity = (p) => get(props.cart, `products.${p.id}`);
    return (
      <div className='tf-products'>
        <h3>{ props.title }</h3>
        <Table striped bordered condensed className='tf-products__list'>
          <thead>
            <tr>
              <td>Title</td>
              <td>Price</td>
              <td>Quantity</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            { props.products.map(p =>
              <tr key={ p.id } className='tf-products__item'>
                <td>
                  <h5 className='tf-products__product-title'>
                    { p.title }
                    &nbsp;
                    { isSoldOut(p) ? <Label bsStyle='warning'>Sold Out</Label> : null }
                  </h5>
                </td>
                <td>
                  <p>
                    &#36;{ p.price }
                  </p>
                </td>
                <td>
                  { getQuantity(p) ? <Badge>x { getQuantity(p) }</Badge> : null }
                </td>
                <td>
                  <Button
                    disabled={ isSoldOut(p) }>
                    Add to cart
                  </Button>
                </td>
              </tr>
            ) }
          </tbody>
        </Table>
      </div>
    );
  }
}
