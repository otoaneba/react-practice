// import { useState, useEffect } from "react";
// import { getProduct } from "./productApi";
// import type { Product } from "./productApi";

// function ProductPage({ productId }: { productId: string }) {
  
//   const [product, setProduct] = useState<Product | null>(null);
//   const [error, setError] = useState<String | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   useEffect(() => {
//     let ignore = false;
//     setIsLoading(true);
//     setProduct(null);
//     setError(null);
//     getProduct(productId)
//     .then((data) => {
//       if (!ignore) {setProduct(data)}
//     })
//     .catch((error) => (setError(error.message)))
//     .finally(() => setIsLoading(false))

//     return () => { ignore = true }
//   }, [productId])


//   if (isLoading) {
//     return <p>loading...</p>
//   }
//   if (error) {
//     return <p>error</p>
//   }
//   return (
//     <div>
//       <p>{product?.name}</p>
//       <p>{product?.price}</p>
//     </div>
//   )
  
// }

// export default ProductPage;
// productPage.tsx — now just consumes the hook
// productPage.tsx
import { useProduct } from "./useProduct";

function ProductPage({ productId }: { productId: string }) {
  const { product, error, isLoading } = useProduct(productId);

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (!product && error) {
    return <p>error</p>;
  }

  return (
    <div>
      {product?.imageUrl && (
        <img src={product.imageUrl} alt={product.name} width={480} height={320} />
      )}
      <h2>{product?.name}</h2>
      <p>{product?.description}</p>
      <p>${product?.price.toFixed(2)}</p>
      <p>{product?.isAvailable ? "In stock" : "Out of stock"}</p>
    </div>
  );
}

export default ProductPage;