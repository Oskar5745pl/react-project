// import React, { useState , useEffect} from 'react';
// import axios from 'axios';
// const PaymentForm: React.FC = () => {
//     type Product = {
//         Name: string;
//         Price: number;
//         Quantity: number;
//         Description: string;
//         Overview: string;
//         Nutrtion: string;
//         Details: string
//         // Add other prayer times properties here if needed
//     }
//     const [product, setProduct] = useState<Product>({
//         Name: 'string',
//         Price: 0,
//         Quantity: 0,
//         Description: 'string',
//         Overview: 'string',
//         Nutrtion: 'string',
//         Details: 'string'
//       });
//     const [productList, setProductList] = useState<Product[]>([])
//     const instance = axios.create({
//         baseURL: 'http://localhost:4000', // Replace with your actual server URL
//       });
//     const fetchProducts = async () => {
//         try {
//             const response = await instance.get('/products');
//             console.log('Form submitted successfully:', response.data);
//             // Optionally, handle any UI updates based on the submission result
//           } catch (error) {
//             console.log('Error submitting form:', error);
            
//           }
//     };

//     useEffect(() => {
//         fetchProducts(); // Fetch prayer times when the component mounts
//     }, []);
//     return (
//     <form onSubmit={handleSubmit}>
//       {/* Define payment form inputs */}
//       <button type="submit">Submit Payment</button>
//     </form>
//   );
// };

// export default PaymentForm;
