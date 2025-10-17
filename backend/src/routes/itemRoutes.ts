import express, { Request, Response } from 'express';
import { Item } from '../models/Item';
import { getUUID, getTime } from '../utils/common';
import { CRUD } from '../models/crud'

const router = express.Router();
const crud = new CRUD();

router.get('/item/:id', async (req: Request, res: Response) => {
    const itemId = req.params.id;

    const item: Item[] = await crud.read([itemId]);

    res.json(item);
});

router.get('/item', async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1
    const pageSize = parseInt(req.query.pageSize as string) || 10
    const itemFilter = JSON.parse(req.query.filter as string) || {}

    const filterItems: Item[] = await crud.read(undefined, itemFilter);

    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const resItems = filterItems.slice(startIndex, endIndex);

    res.json(resItems);

})

router.post('/item', async (req: Request, res: Response) => {
    const item: Item = {
        id: getUUID(),
        name: req.body.name,
        is_wish: req.body.is_wish || false,
        is_favorite: req.body.is_favorite || false,
        tags: req.body.tags || [],
        price: req.body.price || null,
        create_time: getTime(),
        buy_time: req.body.buy_time || null,
        abandon_time: req.body.abandon_time || null,
        plan_abandon_time: req.body.plan_abandon_time || null,
        abandon_reason: req.body.abandon_reason || null,
        wish_buy_time: req.body.wish_buy_time || null,
        feelings: req.body.feelings || [],
    }

    await crud.create([item]);

    res.json(item)
});

router.put('/item', async (req: Request, res: Response) => {
    const itemId = req.body.id;
    // 排除字段 id, create_time
    const {
        id,
        create_time,
        ...partItem
    } = req.body

    res.json(await crud.update(itemId, partItem))
})



router.delete('/item/:id', async (req: Request, res: Response) => {
    const itemId = req.params.id;
    await crud.delete(itemId);

    res.json({
        message: `成功删除, id: ${itemId}`,
    })
});

export default router;
