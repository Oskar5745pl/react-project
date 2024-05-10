import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";
// interface Product {
//   name: {
//     type: string;
//     required: true;
//   };
//   price: {
//     type: number;
//     required: true;
//   };
//   quantity: {
//     type: number;
//     required: true;
//   };
//   description: string;
//   overview: string;
//   nutrtion: string;
//   details: string;
// }
// { products }
const ProductList: React.FC = () => {
  const [sections, setSections] = useState<
    { text: string; href: string; DB_Name: string; min_price: string }[]
  >([]);

  useEffect(() => {
    // Fetch sections from server
    // You can fetch this data using Axios, Fetch, or any other method
    // Example: axios.get('/sections').then(response => setSections(response.data));
    // For demonstration, using dummy data
    setSections([
      {
        text: "Bestseller Bundle",
        min_price: "$45.00",
        href: `/products/65e848eb5e756e612b64e6f8`,
        DB_Name: "Bestseller Bundle",
      },
      {
        text: "Instant Meals",
        min_price: "$45.00",
        href: `/products/65e848eb5e756e612b64e6f9`,
        DB_Name: "Instant Meals",
      },
      {
        text: "Ready to drink Meal",
        min_price: "$45.00",
        href: `/products/65e848eb5e756e612b64e6fa`,
        DB_Name: "Ready to drink Meal",
      },
      {
        text: "Daily A-Z Vitamins",
        min_price: "$45.00",
        href: `/products/65e848eb5e756e612b64e6fb`,
        DB_Name: "Daily A-Z Vitamins",
      },
      {
        text: "Complete Nutrition Bar",
        min_price: "$45.00",
        href: `/products/65e848eb5e756e612b64e6fc`,
        DB_Name: "Complete Nutrition Bar",
      },
      {
        text: "Daily Greens",
        min_price: "$45.00",
        href: `/products/65e848eb5e756e612b64e6fd`,
        DB_Name: "Daily Greens",
      },
      {
        text: "Accessories",
        min_price: "$45.00",
        href: `/products/65e848eb5e756e612b64e6fe`,
        DB_Name: "Accesories",
      },
      {
        text: "Huel Powder",
        min_price: "$45.00",
        href: `/products/65e848eb5e756e612b64e6ff`,
        DB_Name: "Huel Powder",
      },
    ]);
  }, []);
  return (
    <div className="sections">
      Nature's Radiance
      <div className="wrapperList">
        {sections.map((section) => (
          <div key={section.text} className="section">
            <div className="sectionPicture">
              <Link to={section.href}></Link>
            </div>
            <div className="sectionContent">
              <div className="sectionText">
                <Link to={section.href}>{section.text}</Link>
                <h3>From {section.min_price}</h3>
              </div>
            </div>
            <button className="sectionButton">
              <Link to={section.href}>Shop {section.text}</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
