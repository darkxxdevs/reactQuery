import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await axios.get(url);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  }, []);
  return [products, error, loading];
};

export default useFetch;
