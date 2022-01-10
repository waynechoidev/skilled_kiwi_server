import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import jobsRouter from './jobs/router';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/jobs', jobsRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log(`server is on with port ${port}!`);
});
