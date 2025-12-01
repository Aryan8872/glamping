import { create } from 'zustand';
import { Camp, SearchFilters, PaginatedResponse } from '@/features/camp/types/CampTypes';
import { searchCampsites } from '@/features/camp/service/campService';

interface SearchState {
    // Filters
    filters: SearchFilters;

    // Results
    results: Camp[];
    pagination: Omit<PaginatedResponse<any>, 'data'> | null;

    // Loading states
    loading: boolean;
    loadingMore: boolean;

    // Actions
    setFilters: (filters: SearchFilters) => void;
    updateFilter: (key: keyof SearchFilters, value: any) => void;
    search: () => Promise<void>;
    loadMore: () => Promise<void>;
    reset: () => void;
}

const initialFilters: SearchFilters = {
    q: '',
    page: 1,
    limit: 12,
};

export const useSearchStore = create<SearchState>((set, get) => ({
    // Initial state
    filters: initialFilters,
    results: [],
    pagination: null,
    loading: false,
    loadingMore: false,

    // Set all filters at once
    setFilters: (filters) => {
        set({ filters: { ...filters, page: 1 } });
        get().search();
    },

    // Update a single filter
    updateFilter: (key, value) => {
        set((state) => ({
            filters: { ...state.filters, [key]: value, page: 1 },
        }));
        get().search();
    },

    // Perform search
    search: async () => {
        const { filters } = get();
        set({ loading: true });

        try {
            const res = await searchCampsites({ ...filters, page: 1 });
            set({
                results: res.data,
                pagination: {
                    page: res.page,
                    limit: res.limit,
                    total: res.total,
                    totalPages: res.totalPages,
                    hasMore: res.hasMore,
                },
                loading: false,
            });
        } catch (error) {
            console.error('Search failed:', error);
            set({ loading: false });
        }
    },

    // Load more results (pagination)
    loadMore: async () => {
        const { filters, pagination, loadingMore } = get();

        if (!pagination?.hasMore || loadingMore) return;

        set({ loadingMore: true });

        const nextPage = (filters.page ?? 1) + 1;

        try {
            const res = await searchCampsites({ ...filters, page: nextPage });
            set((state) => ({
                results: [...state.results, ...res.data],
                pagination: {
                    page: res.page,
                    limit: res.limit,
                    total: res.total,
                    totalPages: res.totalPages,
                    hasMore: res.hasMore,
                },
                filters: { ...state.filters, page: nextPage },
                loadingMore: false,
            }));
        } catch (error) {
            console.error('Load more failed:', error);
            set({ loadingMore: false });
        }
    },

    // Reset to initial state
    reset: () => {
        set({
            filters: initialFilters,
            results: [],
            pagination: null,
            loading: false,
            loadingMore: false,
        });
    },
}));
