export const products = {
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
