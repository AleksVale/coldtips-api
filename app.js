import express from 'express';
import userRoutes from './src/user/user-routes.js';
import authRoutes from './src/auth/auth-routes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { middlewareValidarJWT } from './src/middlewares/authMiddleware.js';


const app = express();

app.use(express.json());
app.use('/api/users',middlewareValidarJWT, userRoutes);
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errorHandler);


app.listen();