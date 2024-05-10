import "./Cart.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useUser } from "./UserContext";
const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

interface Product {
  // Define the properties of the product object
  name: string;
  price: number;
  quantity: number;
  nutrition: string;
  sectionId: string;
  servings: number;
  hexColor: string;
  displayName: string;
  productType: string;
}

interface Cart {
  // Define the structure of a cart item
  product: Product;
  quantity: number;
  _id: string; // Assuming _id is included in each cart item
}
export default function Cart() {
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<Cart[]>([]);
  const [cartLength, setCartLength] = useState<number>();
  const [successAlert, setSuccessAlert] = useState<boolean>(false);
  const [errorAlert, setErrorAlert] = useState<boolean>(false);
  const { setSession } = useUser();
  useEffect(() => {
    async function fetchUserCart() {
      try {
        const sessionId = localStorage.getItem("sessionId");
        const jwtToken = localStorage.getItem("token");
        if (!jwtToken) {
          console.error("JWT token not found.");
          try {
            const response = await instance.get(
              `/getSessionCart?sessionId=${sessionId}`
            );
            setCartLength(response.data.session.cart.length);
            setLoading(false);
            setCart(response.data.session.cart);
            setSession(response.data.session);
            return; // Handle the case where JWT token is not available
          } catch (error) {
            console.error("Error fetching Session cart:", error);
          }
        } else {
          const response = await instance.get("/getUserCart", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
          });

          if (response.status != 200) {
            throw new Error(
              `Failed to fetch user cart: ${response.status} - ${response.statusText}`
            );
          }
          setCartLength(response.data.cart.length);
          setLoading(false);
          setCart(response.data.cart);
          // Update your cart state or UI with the fetched cart data
        }
      } catch (error) {
        console.error("Error fetching user cart:", error);
        // Handle the error (e.g., show an error message to the user)
      }
    }
    fetchUserCart(); // Call fetchUserCart when the component mounts
  }, []); // Empty dependency array means this effect runs only once after the component mounts
  console.log(cart);
  // Assuming cart is an array of CartProduct objects
  // interface CartItem {
  //   product: {
  //     _id: string;
  //     displayName: string;
  //     productType: string;
  //     price: number;
  //     nutrition: string;
  //     sectionId: string;
  //     servings: number;
  //     hexColor: string;
  //     quantity: number;
  //     name: string;
  //     // Add other product properties as needed
  //   };
  //   quantity: number;
  // }
  const removeProduct = async (productId: string) => {
    try {
      const jwtToken = localStorage.getItem("token");
      const user = jwtToken;
      const response = await instance.post("/removeProduct", {
        productId: productId,
        user: user,
      });

      if (response.status != 200) {
        throw new Error(
          `Failed to fetch user cart: ${response.status} - ${response.statusText}`
        );
      }
      setCartLength(response.data.cart.length);
      setLoading(false);
      setSuccessAlert(true);
      setCart(response.data.cart);
      setSession((prevState) => ({ ...prevState, cart: response.data.cart }));
      // Update your cart state or UI with the fetched cart data
    } catch (error) {
      console.error("Error fetching user cart:", error);
      setErrorAlert(true);
      // Handle the error (e.g., show an error message to the user)
    }
  };
  const productsOfCart = () => {
    // Create a map to group cart items by product _id and calculate total quantity
    const cartMap = new Map<string, number>();

    cart?.forEach((item) => {
      const productId = item._id;
      const quantity = cartMap.get(productId) || 0;
      cartMap.set(productId, quantity + item.quantity);
    });

    // Render cart products from the map
    return Array.from(cartMap.entries()).map(([productId, quantity]) => {
      const cartItem = cart.find((item) => item._id === productId);
      if (!cartItem) return null; // Handle case where cart item is not found
      const borderColour = cartItem.product.hexColor;
      return (
        <div
          className="cartProductWrapper"
          key={productId}
          style={{ borderColor: borderColour }}
        >
          <div className="cartProductInnerWrapper">
            <div className="cartProductImage"></div>
            <div className="cartProductInfo">
              <div className="cartProductName">
                <h3>{cartItem.product.displayName}</h3>
              </div>
              {/* <div className="cartProductType">
                <h3>{cartItem.product.productType}</h3>
              </div> */}
              <div className="cartProductPriceTotal">
                <h4>Price:</h4>
                <div className="priceTotalBox">
                  <h3>${cartItem.product.price * quantity} total</h3>
                </div>
              </div>
              <div className="cartProductQuantity">
                <h4>Quantity:</h4>
                <input type="number" value={quantity} readOnly />
              </div>
              <div
                className="cartDeleteProductButton"
                onClick={() => removeProduct(productId)}
              >
                <h4>Remove</h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="black"
                  className="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  const calculateCartTotal = () => {
    let total = 0;

    cart?.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    return total;
  };
  return (
    <>
      <div className="itemListWrapper">
        {successAlert && (
          <Alert severity="success" variant="filled">
            Product successfully removed from your cart
          </Alert>
        )}
        {errorAlert && (
          <Alert severity="error" variant="filled">
            Your booking was unsuccessful. Please try again.
          </Alert>
        )}
        {loading ? (
          <div
            style={{
              marginTop: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="dot-spinner">
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
            </div>
            <h3>Fetching cart...</h3>
          </div>
        ) : (
          <>
            {cartLength! > 0 ? (
              <>
                <div className="itemList">{productsOfCart()}</div>
                <div className="checkOutButton">
                  <button>
                    <div className="cartTotal">
                      <h3>Total</h3>
                      <h2>${calculateCartTotal()}</h2>
                    </div>

                    <div className="checkoutArrow">
                      <Link className="checkoutLink" to={"/checkout/delivery"}>
                        <h3>Checkout</h3>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="white"
                          className="bi bi-arrow-right"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                          />
                        </svg>
                      </Link>
                    </div>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    marginTop: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h3>Your Cart is Empty</h3>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
