//////////////////////////////////////
//** Version 1 - No Tanstack Query  */
//////////////////////////////////////

// // useProduct.ts — new file: caching + dedup + the hook
// import { useState, useEffect } from "react";
// import { getProduct as fetchProduct } from "./productApi";
// import type { Product } from "./productApi";

// interface CacheEntry {
//   promise: Promise<Product>;
//   data?: Product;
//   timestamp: number;
//   isFetching: boolean;
// }

// const cache = new Map<string, CacheEntry>();
// const STALE_TIME = 30_000; // 30s

// function getProduct(id: string): Promise<Product> {
//   const entry = cache.get(id);
//   const isStale = entry?.data !== undefined && Date.now() - entry.timestamp > STALE_TIME;
  
//   if (entry?.isFetching || (entry && !isStale)) {
//     return entry.promise
//   }

//   const promise = fetchProduct(id)
//     .then((data) => {
//       cache.set(id, { promise, data, timestamp: Date.now(), isFetching: false });
//       return data;
//     })
//     .catch((err) => {
//       cache.delete(id);
//       throw err;
//     });

//   cache.set(id, { promise, data: entry?.data, timestamp: entry?.timestamp ?? 0, isFetching: true });
//   return promise;
// }

// export function useProduct(id: string) {
//   const [data, setData] = useState<Product | null>(() => cache.get(id)?.data ?? null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(!cache.get(id)?.data);

//   useEffect(() => {
//     let ignore = false;
//     const entry = cache.get(id);

//     if (entry?.data) {
//       setData(entry.data); // show stale/cached data immediately, no flicker
//       setIsLoading(false);
//     } else {
//       setIsLoading(true);
//       setData(null);
//     }
//     setError(null);

//     getProduct(id)
//       .then((result) => {
//         if (!ignore) setData(result);
//       })
//       .catch((err) => {
//         if (!ignore) setError(err.message);
//       })
//       .finally(() => {
//         if (!ignore) setIsLoading(false);
//       });

//     return () => {
//       ignore = true;
//     };
//   }, [id]);

//   return { product: data, error, isLoading };
// }

//////////////////////////////////////
//** Version 2 - With Tanstack Query  */
//////////////////////////////////////

// useProduct.ts — this is the whole file now
import { useQuery } from '@tanstack/react-query';
import { getProduct } from './productApi';

export function useProduct(id: string) {
  const { data, error, isPending } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  });

  return {
    product: data ?? null,
    error: error instanceof Error ? error.message : null,
    isLoading: isPending,
  };
}