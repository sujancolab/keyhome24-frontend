import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  initialPage?: number;
  itemsPerPage?: number;
  threshold?: number;
}

export function useInfiniteScroll<T>({
  initialPage = 1,
  itemsPerPage = 12,
  threshold = 100
}: UseInfiniteScrollOptions = {}) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async (fetchFn: (page: number) => Promise<T[]>) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newItems = await fetchFn(page);
      if (newItems.length < itemsPerPage) {
        setHasMore(false);
      }
      setItems(prev => [...prev, ...newItems]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading more items:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, itemsPerPage]);

  const reset = useCallback(() => {
    setItems([]);
    setPage(initialPage);
    setHasMore(true);
    setLoading(false);
  }, [initialPage]);

  return {
    items,
    loading,
    hasMore,
    loadMore,
    reset,
    setItems
  };
}

export default useInfiniteScroll;