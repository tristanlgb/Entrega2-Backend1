import { Router } from 'express';
import CartManager from '../managers/cart.manager.js';

const router = Router();
const manager = new CartManager();

router.post('/', async (req, res) => {
  const newCart = await manager.createCart();
  res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
  const cart = await manager.getCartById(req.params.cid);
  cart ? res.json(cart) : res.status(404).send('Carrito no encontrado');
});

router.post('/:cid/product/:pid', async (req, res) => {
  const updated = await manager.addProductToCart(req.params.cid, req.params.pid);
  updated ? res.json(updated) : res.status(404).send('Carrito no encontrado');
});

router.get('/', async (req, res) => {
  try {
    const carts = await manager.getAll();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener carritos' });
  }
});

export default router;

