import React, { PropTypes } from 'react';
import { Grid, Col } from 'react-bootstrap';
import Products from './Products';
import Cart from './Cart';

export default class Shop extends React.Component {

  static contextTypes = { flux: PropTypes.object.isRequired };

  componentDidMount() {
    const { flux } = this.context;
    flux.getActions('products').fetch();
  }

  render() {
    return (
      <Grid className='tf-products'>
        <Col sm={ 8 }>
          <Products />
        </Col>
        <Col sm={ 4 }>
          <Cart />
        </Col>
      </Grid>
    );
  }
}
