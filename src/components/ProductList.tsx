import React from 'react';

interface Product {
  // Define product interface
}
// { products }
const ProductList: React.FC<{ products: Product[] }> = () => {
  return (
    <div>
      {/* {products.map((product) => (
        <div key={product?.id}>
          
        </div>
      ))} */}
    </div>
  );
};

export default ProductList;
