// productApi.ts — pretend this hits a real server
export interface Product {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
}

const FAKE_PRODUCTS: Record<string, Product> = {
  '1': { id: '1', name: 'Wireless Mouse', price: 29.99, isAvailable: true },
  '2': { id: '2', name: 'Mechanical Keyboard', price: 89.99, isAvailable: false },
  '3': { id: '3', name: 'USB-C Hub', price: 45.5, isAvailable: true },
};

export function getProduct(id: string): Promise<Product> {
  return new Promise((resolve, reject) => {
    const delay = 300 + Math.random() * 1200; // now variable, 300–1500ms
    setTimeout(() => {
      const product = FAKE_PRODUCTS[id];
      if (!product) {
        reject(new Error(`Product ${id} not found`));
        return;
      }
      if (Math.random() < 0.2) {
        reject(new Error('Network error — please try again'));
        return;
      }
      resolve(product);
    }, delay);
  });
}