import "./App.css";
import Home from "./Home";
import Nav from "./Nav";
import Contact from "./components/Contact.tsx";
import SearchPage from "./components/SearchPage.tsx";
// import PaymentForm from './components/PaymentForm.tsx'
import LoginForm from "./components/LoginForm.tsx";
// import Dashboard from './components/Dashboard.tsx'
// import { UserProvider } from "./UserContext.tsx";
import ProductList from "./components/ProductList.tsx";
import ProductPage from "./components/ProductPage.tsx";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/UserDashboard.tsx";
import Cart from "./components/Cart.tsx";
import Checkout from "./components/Checkout.tsx";
import Delivery from "./components/checkout-Steps/Delivery.tsx";
import Payment from "./components/checkout-Steps/Payment.tsx";
import Confirmation from "./components/checkout-Steps/Confirmation.tsx";
import OrderReview from "./components/checkout-Steps/OrderReview.tsx";
import UserOrders from "./components/UserOrders.tsx";
import ForgetPassword from "./components/ForgetPassword.tsx";
import ResetPassword from "./components/ResetPassword.tsx";
function App() {
  return (
    <>
      <div className="main">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SearchPage" element={<SearchPage />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/products/:productID" element={<ProductPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/delivery" element={<Delivery />} />
          <Route path="/checkout/payment" element={<Payment />} />
          <Route path="/checkout/confirmation" element={<Confirmation />} />
          <Route path="/orderReview" element={<OrderReview />} />
          <Route path="/userOrders" element={<UserOrders />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPassword />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
