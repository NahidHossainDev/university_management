import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { UserRouter } from './app/module/user.router';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application router
app.use('/api/v1/users', UserRouter);

app.get('/', (req: Request, res: Response) => {
  // console.log(x)
  // Promise.reject(new Error('Unhandle promise rejection!'))
  res.status(500).send('Internal Server error!');
});

app.use(globalErrorHandler);

export default app;
