import { useState, useEffect } from "react";
import { getProduct } from "./productApi";
import type { Product } from "./productApi";

function ProductPage({ productId }: { productId: string }) {
  // your implementation
  // goal -> display the product as JSX
  // call productAPI using the productId
  // useEffect to call API
  // useState for product
  // handle error if unsuccessful
  // show loading 
  // cleanup 

  // variables needed: isLoading, product, ignore, error (string)
  // dependency array -> [productId]
  
  // order: 
  // declare variables
  // call API
  //   toggle isLoading
  //   set error
  //   set product
  //   toggle isLoading   
  //   return 
  //   display 

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setProduct(null);
    setError("");
    getProduct(productId)
      .then((data) => setProduct(data))
      .catch((err) => {
        const message = err instanceof Error ? err.message : "Something went wrong.";
        setError(message);
      })
      .finally(() => setLoading(false))

      return () => { ignore = true }
  })

  
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }
  
  return (
    <div>
      <p>{product?.name}</p>
      <p>{product?.name}</p>
      <p>{product?.isAvailable}</p>
    </div>
  )

}