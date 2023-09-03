import express from 'express'
import userRoutes from './src/user/user-routes.js';
const app = express()
const port = 3000
app.use(express.json());

// Use the user routes under the '/api/users' path
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})