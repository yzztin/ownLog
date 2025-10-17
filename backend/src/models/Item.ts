export interface Item {
    id: string;
    name: string;
    is_wish: boolean;
    is_favorite: boolean | null;
    tags: string[] | null; // 标签，比如 ["手机", "数码电器"]
    price: number | null;
    create_time: string | null;
    buy_time: string | null;
    abandon_time: string | null;
    plan_abandon_time: string | null;
    abandon_reason: string | null;
    wish_buy_time: string | null;
    feelings: Feeling[] | null; // 心情记录
}

export interface Feeling {
    time: string | null;
    time_point: string | null; // 比如 "buy"
    keywords: string[] | null; // 比如 ["happy", "excited"]
    content: string | null;
}


export const testItems: Item[] = [
    {
        id: "111",
        name: "test-111",
        is_favorite: true,
        is_wish: false,
        tags: ["测试"],
        price: 100,
        create_time: "2023-01-01",
        buy_time: "2023-01-02",
        abandon_time: null,
        plan_abandon_time: null,
        abandon_reason: null,
        wish_buy_time: null,
        feelings: []
    },
    {
        id: "222",
        name: "test-222",
        is_favorite: true,
        is_wish: true,
        tags: ["心愿"],
        price: null,
        create_time: "2023-02-01",
        buy_time: null,
        abandon_time: null,
        plan_abandon_time: null,
        abandon_reason: null,
        wish_buy_time: "2023-12-01",
        feelings: []
    },
]