import express from 'express';
import userRoutes from './src/user/user-routes.js';
import authRoutes from './src/auth/auth-routes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import bodyParser from 'body-parser';
import { middlewareValidarJWT } from './src/middlewares/authMiddleware.js';


const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/users',middlewareValidarJWT, userRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});