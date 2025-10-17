import { randomUUID } from 'crypto';

export function getUUID(): string {
    return randomUUID();
}

export function getTime(): string {
    return new Date().toLocaleString('zh-CN', { hour12: false });
}
