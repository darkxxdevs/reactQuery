import { useEffect, useState } from 'react';
// import useFetch from '../hooks/useFetch';
import axios from 'axios';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  // const [products, isError, loading] = useFetch('http://localhost:3000/api/products?search' + search);

  // if (loading) {
  //   return <h2>Loading......</h2>
  // }
  // if (error) {
  //   return <h1>Something went wrong !</h1>
  // }
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController()
    ;(
      async () => {
        try {
          setError(false);
          setLoading(true);
          const response = await axios.get(`http://localhost:3000/api/products?search=${search}` , {
            signal : controller.signal
          });
          setProducts(response.data);
          setError(false)
          setLoading(false);
        } catch (error) {
          setError(true);
          setLoading(false);
        }
      }
    )();
    setError(false);
      // cleanup ==> code 
    return (()=>{
      controller.abort()
    })
  }, [search]);

  return (
    <>
      <h1>--Products Details--</h1>
      {/* Input field for searching */}
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Display loading message if loading */}
      {loading && (<h1>Loading....</h1>)}
      {/* Display error message if there's an error */}
      {error && (<h1>error fetching data !</h1>)}
      {/* Display the number of products */}
      <h3>Number of products are : {products.length}</h3>
      <ol>
        {products.map((product) => {
          return <li key={product.product_id}>{product.product_name}</li>;
        })}
      </ol>
    </>
  );
}

export default App;
