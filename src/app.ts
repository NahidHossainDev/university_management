import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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

// handle not found
app.use((req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not Found!',
    errorMessage: [
      {
        message: 'Api Not found',
        path: req.originalUrl,
      },
    ],
  });
});

// async function something() {
//   const id = await generateFacultyID();
//   console.log({ id });
// }
// something();
export default app;
