import { useState, useEffect } from 'react';

export default function useFetch(api) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch(api)
      .then((response) => {
        if (!response.ok) {
          setError(true);
        }
        return response.json();
      })
      .then((fetchedData) => {
        setLoading(false);
        setData(fetchedData);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    fetchData();
  }, [api]);

  return { data, loading, error, fetchData };
}