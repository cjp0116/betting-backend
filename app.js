import express from 'express';
import ExpressError from './ExpressError.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import logger from 'morgan';
import { validateToken } from './middleware/authMiddleware.js';
import authRoute from './routes/auth.js';
import { errorHandler } from './controller/errorController.js';

const { json, urlencoded } = express;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')));

app.get("/", (req, res, next) => {
  res.sendStatus(200);
  next();
})

app.use("/auth", authRoute);

app.use(validateToken);
app.use((req, res, next) => {
  throw new ExpressError('Not found', 404)
});
app.use(errorHandler);

export default app;