import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { CheckoutStepper } from "./CheckoutStepper";

const CheckoutPage: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <CheckoutStepper />
      <Routes></Routes>
    </div>
  );
};

export default CheckoutPage;
