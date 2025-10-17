import { randomUUID } from 'crypto';

export function getUUID(): string {
    return randomUUID();
}

export function getTime(locale: string = 'zh-CN'): string {
    return new Date().toLocaleString(locale, { hour12: false });
}
