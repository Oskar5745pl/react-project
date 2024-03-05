// import axios from "axios";
// import { useHistory } from 'react-router-dom';
// const instance = axios.create({
//   baseURL: 'http://localhost:5000', // Replace with your actual server URL
// });

// interface RegisterState {
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }
// interface LoginState {
//   email: string;
//   password: string;
// }

// const register = async (userData: RegisterState, ) => {
//   console.log(userData);
  
//   try {
//     const response = await instance.post('/register', userData);
//     console.log(response);
    
//     console.log('Form submitted successfully:', response.data);
//     // Return response data
//     if (response.status === 200) {
//       history.push('/dashboard'); // Redirect to dashboard route
//     }
//   } catch (error) {
//     // Handle error
//   }
// };
  
// const login = async (loginData: LoginState) => {
//   console.log(loginData);
  
//   try {
//     const response = await instance.post('/login', loginData);
//     console.log('Form submitted successfully:', response.data);
//     // Make POST request to login user
//     // Return response data
//     if (response.status === 200) {
//       history.push('/dashboard'); // Redirect to dashboard route
//     }
//   } catch (error) {
//     // Handle error
//   }
// };
  
// export { register, login };
  