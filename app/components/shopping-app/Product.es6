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
  <span { ...props }>
    { quantity ? <Badge>x { quantity }</Badge> : null }
  </span>;

export const AddToCartButton = ({ isSoldOut, onClick, ...props }) =>
  <Button
    disabled={ isSoldOut }
    onClick={ onClick }
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

// some prop validation
export class TableRow extends React.Component {

  static propTypes = {
    product: PropTypes.object,
    quantity: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    isSoldOut: PropTypes.bool,
    onClick: PropTypes.func
  };

  render() {
    const { product, quantity, isSoldOut, onClick } = this.props;
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
            onClick={ onClick }
            product={ product }
            isSoldOut={ isSoldOut }>
            Add To Cart
          </AddToCartButton>
        </td>
      </Row>
    );
  }
}
