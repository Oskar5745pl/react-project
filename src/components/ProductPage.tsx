import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductPage.css";
interface Section {
  productName: string;
  minPrice: number;
  products: [
    {
      _id: string;
      name: string;
      price: number;
      quantity: string;
      nutrition: string;
      servings: number;
      displayName: string;
      hexColor: string;
    }
  ];
  description: string;
  overview: string;
  details: string;
}
const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});
// { products }
const ProductPage: React.FC = () => {
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState<Section>();
  const [loading, setLoading] = useState<boolean>(true);

  // Extract productID from URL params
  const { productID } = useParams<{ productID: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Display loader while fetching product
        setLoading(true);
        // Fetch product data from the server
        await instance.get(`/products/populate/${productID}`);
        // Set product data
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      try {
        // Fetch product data from the server
        const response = await instance.get(`/products/${productID}`);
        // Set product data
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("error fetching products");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productID]);
  const addToCart = async (product: object) => {
    try {
      let userObject;
      if (token) {
        userObject = token;
      }
      const sessionId = localStorage.getItem("sessionId");

      const response = await instance.post("/addToCart", {
        product,
        userObject,
        sessionId,
      });
      console.log(response);

      alert("Product added to cart");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  const productsOfSection = () =>
    product?.products.map((product) => (
      <div className="sectionProductWrapper" key={product._id}>
        <div className="sectionProductCard">
          <div className="productInfo">
            <svg
              width="13"
              height="69"
              viewBox="0 0 13 69"
              fill={product.hexColor}
              xmlns="http://www.w3.org/2000/svg"
              className="productTag"
            >
              <path
                d="M12.5 13V56C12.5 62.7361 7.17177 68.2277 0.5 68.4902V0.509817C7.17177 0.772269 12.5 6.2639 12.5 13Z"
                stroke="#ADADAD"
              />
            </svg>

            <div>
              <h3>{product.displayName} </h3>
              <div className="productPricing">
                <h4>${product.price} total</h4>
                <h4>
                  ${(product.price / product.servings).toFixed(2)} per meal
                </h4>
              </div>
            </div>
          </div>
          <button onClick={() => addToCart(product)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart-plus-fill"
              viewBox="0 0 16 16"
            >
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0" />
            </svg>
          </button>
        </div>
      </div>
    ));
  const [openNutritionInfo, setOpenNutritionInfo] = useState([false, false]);
  const toggleNutritionInfo = (index: number) => {
    const updatedDropdowns = [...openNutritionInfo];
    updatedDropdowns[index] = !updatedDropdowns[index];
    setOpenNutritionInfo(updatedDropdowns);
  };
  const closeNutritionInfoMeno = () => {
    setOpenNutritionInfo([false]);
  };
  const [openNutritionDropdowns, setOpenNutritionDropdowns] =
    useState<boolean>(false);
  const toggleNutritionDropdown = () => {
    setOpenNutritionDropdowns(!openNutritionDropdowns);
  };
  const closeNutritionDropdownMeno = () => {
    setOpenNutritionDropdowns(false);
  };
  const [openDetailDropdowns, setOpenDetailDropdowns] =
    useState<boolean>(false);
  const toggleDetailDropdown = () => {
    setOpenDetailDropdowns(!openDetailDropdowns);
  };
  const closeDetailDropdownMeno = () => {
    setOpenDetailDropdowns(false);
  };
  const dropdownContents = [
    {
      name: "More Details",
      details: [product?.details],
    },
  ];

  const nutritionContents = [
    {
      name: "Nutrition",
      nutritionInfo: product?.products.map((eachProduct) => ({
        nameOfProduct: eachProduct.displayName,
        nutritionOfProduct: eachProduct.nutrition,
      })),
    },
  ];

  return (
    <div className="wrapper">
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
          <h3>Fetching product...</h3>
        </div>
      ) : (
        <div className="inner-wrapper">
          {/* Display product details */}

          {product && (
            <div className="productWrapper">
              <div className="productHeroSection">
                <div className="productImage">
                  <div className="productTitle">
                    <h2>{product.productName}</h2>
                    <h4>From ${product.minPrice} per bag</h4>
                  </div>
                </div>
                <div className="productDescription">
                  <h5>{product.description}</h5>
                </div>
              </div>
              <div className="sectionProducts">{productsOfSection()}</div>

              <div className="productNutritionDropdown">
                {nutritionContents.map((dropdown, index) => (
                  <div className="dropdown" key={index}>
                    <button
                      className="dropbtn"
                      onClick={
                        openNutritionDropdowns
                          ? () => closeNutritionDropdownMeno()
                          : () => toggleNutritionDropdown()
                      }
                    >
                      {dropdown.name}{" "}
                      {openNutritionDropdowns ? (
                        <i className="bi bi-caret-up"></i>
                      ) : (
                        <i className="bi bi-caret-down"></i>
                      )}
                    </button>
                    {openNutritionDropdowns && (
                      <div className="dropdownMenus">
                        {dropdown?.nutritionInfo!.map((link, linkIndex) => (
                          <div className="dropdown " key={linkIndex}>
                            <button
                              className="dropbtn"
                              onClick={
                                openNutritionDropdowns
                                  ? () => closeNutritionInfoMeno()
                                  : () => toggleNutritionInfo(linkIndex)
                              }
                            >
                              {link.nameOfProduct}
                              {openNutritionInfo[linkIndex] ? (
                                <i className="bi bi-caret-up"></i>
                              ) : (
                                <i className="bi bi-caret-down"></i>
                              )}
                            </button>
                            {openNutritionInfo[linkIndex] && (
                              <div>{link.nutritionOfProduct}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="productDetailsDropdown">
                {dropdownContents.map((dropdown, index) => (
                  <div className="dropdown " key={index}>
                    <button
                      className="dropbtn"
                      onClick={
                        openDetailDropdowns
                          ? () => closeDetailDropdownMeno()
                          : () => toggleDetailDropdown()
                      }
                    >
                      {dropdown.name}{" "}
                      {openDetailDropdowns ? (
                        <i className="bi bi-caret-up"></i>
                      ) : (
                        <i className="bi bi-caret-down"></i>
                      )}
                    </button>
                    {openDetailDropdowns && (
                      <div className="dropdown-content ">
                        {dropdown.details}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
