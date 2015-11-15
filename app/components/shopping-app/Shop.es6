import React from 'react';
import { Grid, Col } from 'react-bootstrap';
import Products from './Products';
import Cart from './Cart';

export default class Shop extends React.Component {
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
