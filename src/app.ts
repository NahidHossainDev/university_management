import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import appRouter from './app/routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application router
app.use('/api/v1', appRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(500).send('Internal Server error!');
});

app.use(globalErrorHandler);

export default app;
