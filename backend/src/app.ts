import express, { Request, Response } from 'express';
import itemRoutes from './routes/itemRoutes'
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler'
import { CONFIG } from './configs/config'

const app = express();

app.use(express.json());
app.use(logger);
app.use(errorHandler);

app.use('/api', itemRoutes);

app.get('/ping', (req: Request, res: Response) => {
    res.send('ownLog server standby!');
});

app.listen(CONFIG.SERVER_PORT, CONFIG.SERVER_HOST, () => {
    console.log(`Server running at http://${CONFIG.SERVER_HOST}:${CONFIG.SERVER_PORT}/`);
});

console.log("项目配置信息：", CONFIG)
