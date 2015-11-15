const mockData = [
  { id: '1', price: 1.00, inventory: 1, title: 'T-shirt' },
  { id: '2', price: 1.00, inventory: 1, title: 'Sweater' },
  { id: '3', price: 1.00, inventory: 1, title: 'Vest' },
  { id: '4', price: 1.00, inventory: 0, title: 'Trousers' },
  { id: '5', price: 1.00, inventory: 1, title: 'Jeans' },
  { id: '6', price: 1.00, inventory: 0, title: 'Baseball' }
];

const ProductsSource = {
  fetch: () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 2000);
  })
};

export default ProductsSource;
