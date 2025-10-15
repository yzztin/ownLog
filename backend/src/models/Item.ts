export interface Item {
    id: string;
    name: string;
    is_wish: boolean;
    tags: string[] | null; // 标签数组，比如 ["手机", "数码电器"]
    price: number | null;
    create_time: string | null;
    buy_time: string | null;
    abandon_time: string | null;
    plan_abandon_time: string | null;
    abandon_reason: string | null;
    wish_buy_time: string | null;
    feelings: Feeling[] | null; // 心情记录数组
}

export interface Feeling {
    time: string | null;
    time_point: string | null; // 比如 "buy"
    keywords: string[] | null; // 比如 ["happy", "excited"]
    content: string | null;
}
