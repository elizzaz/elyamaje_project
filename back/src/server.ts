import express from 'express';
import cors from 'cors';
import productRoutes from "./routes/productRoutes";
import { errorMiddleware } from './utils/errorMiddleware';
import logger from './utils/logger'

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, { 
    body: req.body,
    query: req.query,
    params: req.params 
  });
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Product API is running" });
});

app.use("/products", productRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
