import { Router } from 'express';
import ProductManager from '../managers/products.manager.js'

const router = Router();
const manager = new ProductManager();

router.get('/', async (req, res) => {
  try {
    const products = await manager.getAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const product = await manager.getById(req.params.pid);
    product ? res.json(product) : res.status(404).send('Producto no encontrado');
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar producto' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const newProduct = await manager.addProduct({ title, description, code, price, status, stock, category, thumbnails });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const updated = await manager.updateProduct(req.params.pid, req.body);
    updated ? res.json(updated) : res.status(404).send('Producto no encontrado');
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    await manager.deleteProduct(req.params.pid);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

export default router;
