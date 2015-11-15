import React, { PropTypes } from 'react';
import { Button, Badge, Label, Table as BSTable } from 'react-bootstrap';

export const Row = ({ ...props }) =>
  <tr className='tf-products__table-row' { ...props } />;

export const Title = ({ product, isSoldOut, ...props }) =>
  <h5 className='tf-products__product-title' { ...props }>
    { product.title }
    &nbsp;
    { isSoldOut ? <Label bsStyle='warning'>Sold Out</Label> : null }
  </h5>;

export const Price = ({ product, ...props }) =>
  <p { ...props }>
    &#36;{ product.price }
  </p>;

export const Quantity = ({ quantity, ...props }) =>
  <p { ...props }>
    { quantity ? <Badge>x { quantity }</Badge> : null }
  </p>;

export const AddToCartButton = ({ isSoldOut, ...props }) =>
  <Button
    disabled={ isSoldOut }
    { ...props }
  />;

export const TableHead = () =>
  <thead>
    <tr>
      <td>Title</td>
      <td>Price</td>
      <td>Quantity</td>
      <td></td>
    </tr>
  </thead>;

export const Table = ({ ...props }) =>
  <BSTable striped bordered condensed
    className='tf-products__list' { ...props } />;

export class TableRow extends React.Component {
  static propTypes = {
    product: PropTypes.object,
    quantity: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    isSoldOut: PropTypes.bool
  };

  render() {
    const { product, quantity, isSoldOut } = this.props;
    return (
      <Row>
        <td>
          <Title
            product={ product }
            isSoldOut={ isSoldOut }
          />
        </td>
        <td>
          <Price product={ product } />
        </td>
        <td>
          <Quantity
            product={ product }
            quantity={ quantity }
          />
        </td>
        <td>
          <AddToCartButton
            product={ product }
            isSoldOut={ isSoldOut }>
            Add To Cart
          </AddToCartButton>
        </td>
      </Row>
    );
  }
}
