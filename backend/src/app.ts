import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes'
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler'

const app = express();
const port = 7000;

app.use(express.json());
app.use(logger);
app.use(errorHandler)

app.use('/api', userRoutes);

app.get('/ping', (req: Request, res: Response) => {
    res.send('ownLog server standby!');
});

app.listen(port, () => {
    console.log(`Server running at http://0.0.0.0:${port}/`);
});
