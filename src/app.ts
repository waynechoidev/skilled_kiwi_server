import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import 'dotenv/config';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import authRouter from './auth/router';
import { db } from './common/db/mysql';
import jobsRouter from './jobs/router';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('connect');
});

app.use('/jobs', jobsRouter);
app.use('/auth', authRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(500);
});

db.getConnection()
  .then((c) => console.log('db loaded'))
  .catch((e) => console.error(e));

app.listen(process.env.PORT || 8080);
