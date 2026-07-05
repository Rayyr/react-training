import React, { useState, useEffect } from "react";

export default function useFetch(url, method = "GET", options = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(url, {
          method: method,
          ...options,
        });
        if (!res.ok) {
          throw new Error("Failed to fetch students from DB!");
        }

        const result = await res.json();
        setData(result);
      } catch (error) {
        setError(() => error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, method]);

  return { data, isLoading, error };
}
