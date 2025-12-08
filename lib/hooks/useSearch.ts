// features/camp/ui/useCampSearch.ts

"use client";

import { searchCampsites } from "@/features/camp/service/campService";
import { Camp, PaginatedResponse, SearchFilters } from "@/features/camp/types/CampTypes";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";


export function useCampSearch(initialFilters: SearchFilters = {}) {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<SearchFilters>({
    q: searchParams.get("q") || initialFilters.q || "",
    minPrice: Number(searchParams.get("minPrice")) || initialFilters.minPrice,
    maxPrice: Number(searchParams.get("maxPrice")) || initialFilters.maxPrice,
    checkIn: searchParams.get("checkIn") || initialFilters.checkIn,
    checkOut: searchParams.get("checkOut") || initialFilters.checkOut,
    facilityIds: searchParams.get("facilityIds")
      ? searchParams.get("facilityIds")!.split(",")
      : initialFilters.facilityIds,
    adults: Number(searchParams.get("adults")) || initialFilters.adults,
    children: Number(searchParams.get("children")) || initialFilters.children,
    pets: Number(searchParams.get("pets")) || initialFilters.pets,
    sort: searchParams.get("sort") || initialFilters.sort,
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 12,
  });

  const [results, setResults] = useState<Camp[]>([]);
  const [pagination, setPagination] = useState<Omit<PaginatedResponse<any>, "data"> | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // INITIAL + FILTER SEARCH
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);

      const res = await searchCampsites({ ...filters, page: 1 });

      setResults(res.data);
      setPagination(res);
      setLoading(false);
    }, 400);
  }, [
    filters.q,
    filters.minPrice,
    filters.maxPrice,
    filters.checkIn,
    filters.checkOut,
    filters.facilityIds,
    filters.adults,
    filters.children,
    filters.pets,
    filters.sort
  ]);

  // LOAD MORE (Infinity scroll)
  async function loadMore() {
    if (!pagination?.hasMore || loadingMore) return;

    setLoadingMore(true);

    const nextPage = (filters.page ?? 1) + 1;

    const res = await searchCampsites({ ...filters, page: nextPage });
    setResults((prev) => [...prev, ...res.data]);
    setPagination(res);

    setFilters((prev) => ({ ...prev, page: nextPage }));

    setLoadingMore(false);
  }

  return {
    filters,
    setFilters,
    results,
    pagination,
    loading,
    loadingMore,
    loadMore,
  };
}
