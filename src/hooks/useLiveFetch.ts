"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom hook to fetch data from an API endpoint.
 * Re-fetches automatically when the browser tab regains focus,
 * ensuring admin changes are always reflected on the storefront.
 */
export function useLiveFetch<T>(
  url: string | null,
  options?: { enabled?: boolean }
) {
  const [data, setData] = useState<T[]>([]);
  const enabled = options?.enabled !== false;
  const mountedRef = useRef(true);

  const doFetch = useCallback((fetchUrl: string) => {
    fetch(fetchUrl)
      .then((r) => r.json())
      .then((result) => {
        if (mountedRef.current) {
          setData(Array.isArray(result) ? result : []);
        }
      })
      .catch(() => {
        if (mountedRef.current) {
          setData([]);
        }
      });
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    if (!url || !enabled) return;

    doFetch(url);

    return () => {
      mountedRef.current = false;
    };
  }, [url, enabled, doFetch]);

  useEffect(() => {
    if (!url || !enabled) return;

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        doFetch(url);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [url, enabled, doFetch]);

  return { data, loading: data.length === 0 };
}
