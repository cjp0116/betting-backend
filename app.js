import express from 'express';
import ExpressError from './ExpressError.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import logger from 'morgan';
import { validateToken } from './middleware/authMiddleware.js';

// create store for sessions to persist in database


const { json, urlencoded } = express;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')));

app.get("/", (req, res) => { res.send("hello") })

app.use(validateToken);
app.use((req, res, next) => {
  return next(new ExpressError('Not found', 404))
});

app.use((req, res, next, error) => {
  console.error(error);
  const status = error.status || 500;
  const message = error.message;
  res.locals.message = message;
  res.locals.error = req.app.get("env") === 'development' ? error : {};
  return res.status(status).json({
    error: { message, status },
  });
});

export default app;