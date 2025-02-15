import { create, createStore } from 'zustand';
import { persist } from 'zustand/middleware';
const defaultLimit: number = Number(process.env.NEXT_PUBLIC_DEFAULT_LIMIT) || 20;

interface BookQuery{
    title: string;
    limit: number;
    offset: number;
}
interface BookQueryState {
    query: BookQuery,
    setQuery: (query: Partial<BookQueryState["query"]>) => void;

}

export const BookQueryStore = createStore<BookQueryState>()(
    persist(
        (set) => ({
            query: {
                title: '',
                limit: defaultLimit,
                offset: 0,
            },
            setQuery: (query) => set((state) => ({
                query: { 
                    title: query.title ?? state.query.title,
                    limit: query.limit ?? state.query.limit,
                    offset: query.offset ?? state.query.offset,
                }
            })),
        }),
        {
            name: 'book-query', // 状態を永続化するためのキー
            storage: {
                getItem: (name) => {
                    const item = sessionStorage.getItem(name);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
                removeItem: (name) => sessionStorage.removeItem(name),
            },
        }
    )
)
