import express from 'express';
import routes from './src/routes';
import { json } from 'body-parser';
import helmet from 'helmet';

import { errorHandler } from './src/utils/customHandler';

const app = express();

app.use(json());
app.use(helmet());

app.use(routes);

app.use(errorHandler);

export { app };
