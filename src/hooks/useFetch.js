import   { useState, useEffect } from "react";

export default function useFetch(url, method = "GET", options = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

   /*eslint-disable react-hooks/exhaustive-deps */
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
 /*eslint-enable react-hooks/exhaustive-deps */

  return { data, isLoading, error };
}
