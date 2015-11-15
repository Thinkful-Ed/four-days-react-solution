import { reduce, findWhere, get } from 'lodash';

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
  },
  getCartTotal: () =>
      reduce(products.cart.products, (total, quantity, id) => {
        const product = findWhere(products.products, { id: Number(id) });
        return total + (get(product, 'price') * quantity);
      }, 0),
  hasProducts: () => reduce(products.cart.products, (t, q) => t + q, 0) > 0,
  isSoldOut: (p) => p.inventory < 1,
  getQuantity: (p) => get(products.cart, `products.${p.id}`)
};
