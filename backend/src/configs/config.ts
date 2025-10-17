import dotenv from 'dotenv'
import { resolve } from 'node:path'


// 加载 .env 文件
dotenv.config()

export interface Config {
    SERVER_HOST: string,
    SERVER_PORT: number,
    SERVER_ROOT_DIR: string,
    SERVER_DATA_DIR: string,
}

export const ROOT_DIR = resolve(__dirname, '../../')

export const CONFIG: Config = {
    SERVER_HOST: process.env.SERVER_HOST || '0.0.0.0',
    SERVER_PORT: Number(process.env.SERVER_PORT) || 7000,
    SERVER_ROOT_DIR: ROOT_DIR,
    SERVER_DATA_DIR: resolve(ROOT_DIR, './data'),
}
