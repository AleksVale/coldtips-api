import express from 'express';
import userRoutes from './src/user/user-routes.js';
import authRoutes from './src/auth/auth-routes.js';
import perfectpayRoutes from './src/perfectpay/perfectpay-routes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { middlewareValidarJWT } from './src/middlewares/authMiddleware.js';
import cors from 'cors';


const app = express();
const port = Number(process.env.PORT) || 3000;
app.use(cors());

app.use(express.json());
app.use('/api/users',middlewareValidarJWT, userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/perfectpay', perfectpayRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!');
}); 

app.use(errorHandler);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});