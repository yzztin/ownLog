import express, { Request, Response } from 'express';
import { Item } from '../models/Item';

const router = express.Router();

// const items: Item[] = []
const items = [
    { id: "111", name: "test-111" },
    { id: "222", name: "test-222" },
]

router.get('/items', (req: Request, res: Response) => {
    res.json(items);
});

router.post('/items', (req: Request, res: Response) => {
    const itemIds = req.body.ids

    const item = items.filter(i => itemIds.includes(i.id))
    res.json(item)
});

router.post('/users', (req: Request, res: Response) => {
    const newUser = req.body;
    items.push(newUser);
    res.status(201).json(newUser);
});

// router.put('/users/:id', (req: Request, res: Response) => {
//     const userId = parseInt(req.params.id);
//     const updatedUser = req.body;
//     const userIndex = items.findIndex(u => u.id === userId);
//     if (userIndex !== -1) {
//         items[userIndex] = updatedUser;
//         res.json(updatedUser);
//     } else {
//         res.status(404).send('User not found');
//     }
// });

// router.delete('/users/:id', (req: Request, res: Response) => {
//     const userId = parseInt(req.params.id);
//     users = users.filter(u => u.id !== userId);
//     res.status(204).send();
// });

export default router;
