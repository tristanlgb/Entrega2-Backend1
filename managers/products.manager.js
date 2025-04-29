import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const path = './data/products.json';

export default class ProductManager {
  async getAll() {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
  }

  async getById(id) {
    const products = await this.getAll();
    return products.find(p => p.id === id);
  }

  async addProduct(productData) {
    const products = await this.getAll();
    const newProduct = { id: uuidv4(), ...productData };
    products.push(newProduct);
    await fs.writeFile(path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async updateProduct(id, updates) {
    const products = await this.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updates, id: products[index].id };
    await fs.writeFile(path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async deleteProduct(id) {
    const products = await this.getAll();
    const updated = products.filter(p => p.id !== id);
    await fs.writeFile(path, JSON.stringify(updated, null, 2));
    return true;
  }
}
