import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const path = './data/carts.json';

export default class CartManager {
  async getAll() {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
  }

  async createCart() {
    const carts = await this.getAll();
    const newCart = { id: uuidv4(), products: [] };
    carts.push(newCart);
    await fs.writeFile(path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async getCartById(cid) {
    const carts = await this.getAll();
    return carts.find(c => c.id === cid);
  }

  async addProductToCart(cid, pid) {
    const carts = await this.getAll();
    const cart = carts.find(c => c.id === cid);
    if (!cart) return null;

    const existing = cart.products.find(p => p.product === pid);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await fs.writeFile(path, JSON.stringify(carts, null, 2));
    return cart;
  }
}
