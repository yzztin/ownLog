import { readFile, writeFile, access } from "fs/promises";
import { constants } from "fs";
import { resolve } from 'path';
import { CONFIG } from '../configs/config'
import { Item } from "./Item";


export class CRUD {
    private path: string = resolve(CONFIG.SERVER_DATA_DIR, './items.json');
    private data: Item[] = [];

    constructor(filePath: string | null = null) {
        if (filePath) {
            this.path = filePath;
        }
    }

    /**
     * 检查文件是否存在，读取文件内容
     */
    private async initData(): Promise<boolean> {
        try {
            await access(this.path, constants.F_OK);

            if (this.data && this.data.length === 0) {
                const content = await readFile(this.path, "utf-8");
                this.data = JSON.parse(content || "[]");
            }

            return true;
        } catch {
            console.error(`文件 ${this.path} 初始化失败，可能不存在或读取错误！`);
            return false;
        }
    }

    /**
     * 写入数据到文件
     */

    private async writeData(): Promise<boolean> {
        const jsonContent = JSON.stringify(this.data ?? [], null, 4);
        await writeFile(this.path, jsonContent, "utf-8");

        return true;
    }

    /**
   * 根据 id 或 filter 筛选数据
   */
    async read(id: string[] = [], filter: Record<string, any> = {}): Promise<Item[]> {
        await this.initData();

        let data = []

        if (id.length > 0) {
            data = this.data.filter(item => id.includes(item.id));
        } else {
            data = this.data
        };

        // 循环 filter 中的每个属性并筛选
        if (filter && Object.keys(filter).length > 0) {
            for (const [key, value] of Object.entries(filter)) {
                if (value !== undefined && value !== '') {
                    data = data.filter(i => (key in i && i[key as keyof typeof i] === value));
                }
            }
        }

        return data;

    }

    /**
   * 添加新数据
   */
    async create(items: Item[]): Promise<boolean> {
        await this.initData();

        this.data.push(...items);
        await this.writeData();

        return true;
    }

    /**
     * 通过 id 更新数据
     */
    async update(id: string, newData: Partial<Item>): Promise<Item> {
        await this.initData();

        const index = this.data.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error(`未找到记录: ${id}`);
        }

        const updatedItem = { ...this.data[index], ...newData };
        this.data[index] = updatedItem;
        await this.writeData();

        return updatedItem;
    }

    /**
     * 通过 id 删除数据
     */
    async delete(id: string): Promise<boolean> {
        await this.initData();

        const index = this.data.findIndex(item => item.id === id);
        this.data.splice(index, 1);
        await this.writeData();

        return true;
    }
}



