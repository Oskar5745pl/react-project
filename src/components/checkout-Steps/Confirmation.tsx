import { CheckoutStepper } from "../CheckoutStepper";
import { useStateContext } from "../CheckoutContext";
import { useUser } from "../UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Confirmation() {
  // You can access state values from the previous steps here
  // For example, const [address, setAddress] = useState('');
  // You can pass these values as props when rendering Confirmation
  const { debitCard, address, deliveryType, userForm, billingAddress } =
    useStateContext();
  const navigate = useNavigate();
  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
  });
  // const removeProduct = async (productId: string) => {
  //   try {
  //     const jwtToken = localStorage.getItem("token");
  //     const user = jwtToken;
  //     const response = await instance.post("/removeProduct", {
  //       productId: productId,
  //       user: user,
  //     });

  //     if (response.status != 200) {
  //       throw new Error(
  //         `Failed to fetch user cart: ${response.status} - ${response.statusText}`
  //       );
  //     }
  //     setCartLength(response.data.cart.length);
  //     setLoading(false);
  //     setSuccessAlert(true);
  //     setCart(response.data.cart);
  //     setSession((prevState) => ({ ...prevState, cart: response.data.cart }));
  //     // Update your cart state or UI with the fetched cart data
  //   } catch (error) {
  //     console.error("Error fetching user cart:", error);
  //     setErrorAlert(true);
  //     // Handle the error (e.g., show an error message to the user)
  //   }
  // };
  const productsOfCart = () => {
    // Create a map to group cart items by product _id and calculate total quantity
    const cartMap = new Map<string, number>();

    session.cart?.forEach((item) => {
      const productId = item._id;
      const quantity = cartMap.get(productId) || 0;
      cartMap.set(productId, quantity + item.quantity);
    });

    // Render cart products from the map
    return Array.from(cartMap.entries()).map(([productId, quantity]) => {
      const cartItem = session.cart.find((item) => item._id === productId);
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
  const { session, user } = useUser();
  const token = localStorage.getItem("token");

  const handleNext = () => {
    // Validate billing billingAddress and debit card information if necessary
  };
  const calculateCartTotal = () => {
    let total = 0;

    session.cart?.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    return total;
  };
  const calculatePostageTotal = () => {
    let total = 0;

    if (deliveryType == "Standard") {
      total += 0 * session.cart.length;
    } else if (deliveryType == "Express") {
      total += 3.5 * session.cart.length;
    } else deliveryType == "Next Day";
    {
      total += 5 * session.cart.length;
    }
    return total;
  };
  const calculateCheckoutTotal = () => {
    let total = 0;
    total += calculatePostageTotal();
    total += calculateCartTotal();
    return total;
  };
  function getLastFourDigits(cardNumber: string | undefined): string {
    // Remove non-numeric characters
    const cleanedCardNumber = cardNumber.replace(/\D/g, "");

    // Get the last 4 digits
    const lastFourDigits = cleanedCardNumber.slice(-4);

    // Format the last 4 digits with a space after every 4 characters
    const formattedLastFourDigits = lastFourDigits.replace(/(\d{4})/g, "$1 ");

    return formattedLastFourDigits;
  }
  const handleCheckout = async () => {
    // Validate billing billingAddress and debit card information if necessary
    if (token) {
      console.log("User Checkout");
      try {
        const response = await instance.post("/userCheckout", {
          address: address,
          billingAddress: billingAddress,
          debitCard: debitCard,
          deliveryType: deliveryType,
          userForm: userForm,
          session: session,
          user: user,
        });

        if (response.status != 200) {
          console.log(response.data.message);
        }
        if (response.status == 200) {
          navigate("/dashboard");
        }
        console.log();
      } catch (error) {
        console.error("Error fetching user cart:", error);
        // setErrorAlert(true);
        // Handle the error (e.g., show an error message to the user)
      }
      console.log("Guest Checkout");
      try {
        const response = await instance.post("/guestCheckout", {
          address: address,
          billingAddress: billingAddress,
          debitCard: debitCard,
          deliveryType: deliveryType,
          userForm: userForm,
          session: session,
        });

        if (response.status != 200) {
          console.log(response.data.message);
        }
        if (response.status == 200) {
          navigate("/dashboard");
        }
        console.log();

        // setCartLength(response.data.cart.length);
        // setLoading(false);
        // setSuccessAlert(true);
        // setCart(response.data.cart);
        // setSession((prevState) => ({ ...prevState, cart: response.data.cart }));
        // Update your cart state or UI with the fetched cart data
      } catch (error) {
        console.error("Error fetching user cart:", error);
        // setErrorAlert(true);
        // Handle the error (e.g., show an error message to the user)
      }
    }
  };

  console.log(userForm);
  return (
    <div className="outerWrapper">
      <div className="titleWrapper">
        <CheckoutStepper />
      </div>
      <div className="containerOfCheckout">
        <h2>Place Your Order</h2>
        <div
          style={{
            display: "flex",
            // justifyContent: "start",
            flexDirection: "column",
            borderBottom: "2px solid #1C402E",
            borderTop: "2px solid #1C402E",
            marginBottom: "20px",
            marginTop: "20px",
            paddingBottom: "10px",
            paddingTop: "10px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Items:</h3>
            <h3>${calculateCartTotal()}</h3>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Postage & Packing:</h3>
            <h3>${calculatePostageTotal()}</h3>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 style={{ fontWeight: "900", fontSize: "24px" }}>Order Total</h3>
            <h3 style={{ fontWeight: "900", fontSize: "24px" }}>
              ${calculateCheckoutTotal()}
            </h3>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "start",
            flexDirection: "column",
            marginBottom: "20px",
            marginTop: "20px",
            paddingBottom: "30px",
            paddingTop: "10px",
            borderBottom: "2px solid #1C402E",
          }}
        >
          <h3 style={{ fontWeight: "900", fontSize: "24px" }}>
            Delivering to {address.firstName} {address.lastName}
          </h3>
          <h3>
            {address.addressLineNo1}, {address.city}, {address.postcode},{" "}
            {address.country}
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            flexDirection: "column",
          }}
        >
          <h3 style={{ fontWeight: "900", fontSize: "24px" }}>
            Paying with Visa ending {getLastFourDigits(debitCard.cardNumber)}
          </h3>
        </div>
        <h4>{productsOfCart()}</h4>

        {/* Display overview of user information */}
        <div className="checkoutNavButtons" style={{ marginTop: "40px" }}>
          <Link to={"/checkout/delivery"}>
            <button onClick={handleNext} className="nextButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
              Back{" "}
            </button>
          </Link>
          <Link to={"/orderReview"}>
            <button onClick={handleCheckout} className="nextButton">
              Buy Now{" "}
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                />
              </svg> */}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
