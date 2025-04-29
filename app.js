import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { initSocket } from './socket.js'; // import our custom socket initializer
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

// Initialize Socket.io
const io = initSocket(httpServer);

const PORT = 8080;
const productsPath = path.join(__dirname, 'data', 'products.json');

// Handlebars setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
  res.render('home', { products });
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
