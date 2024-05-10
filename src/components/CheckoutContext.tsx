import React, { createContext, useContext, useState, useEffect } from "react";
interface Address {
  firstName: string;
  lastName: string;
  addressLineNo1: string;
  addressLineNo2: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
}
const initialAddressInput: Address = {
  firstName: "",
  lastName: "",
  addressLineNo1: "",
  addressLineNo2: "",
  city: "",
  state: "",
  country: "",
  postcode: "",
};
interface billingAddress {
  firstName: string;
  lastName: string;
  addressLineNo1: string;
  addressLineNo2: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
}
const initialBillingAddressInput: billingAddress = {
  firstName: "",
  lastName: "",
  addressLineNo1: "",
  addressLineNo2: "",
  city: "",
  state: "",
  country: "",
  postcode: "",
};
interface DebitCard {
  fullName: string;
  cardNumber: string | undefined;
  securityCode: string | undefined;
  expiryDate: string | undefined;
}
const initialDebitInput: DebitCard = {
  fullName: "",
  cardNumber: "",
  securityCode: "",
  expiryDate: "",
};
interface StandardCheckout {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface GuestCheckout {
  email: string;
}

type FormState = StandardCheckout | GuestCheckout;

const initialGuestCheckout: GuestCheckout = {
  email: "",
};

const initialStandardCheckout: StandardCheckout = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
interface StateContextType {
  address: Address;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
  debitCard: DebitCard;
  setDebitCard: React.Dispatch<React.SetStateAction<DebitCard>>;
  billingAddress: billingAddress;
  setBillingAddress: React.Dispatch<React.SetStateAction<billingAddress>>;
  isGuest: boolean;
  setIsGuest: React.Dispatch<React.SetStateAction<boolean>>;
  userForm: FormState;
  setUserForm: React.Dispatch<React.SetStateAction<FormState>>;
  deliveryType: string;
  setDeliveryType: React.Dispatch<React.SetStateAction<string>>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const [address, setAddress] = useState<Address>(initialAddressInput);
  const [debitCard, setDebitCard] = useState<DebitCard>(initialDebitInput);
  const [billingAddress, setBillingAddress] = useState<billingAddress>(
    initialBillingAddressInput
  );
  const [deliveryType, setDeliveryType] = useState<string>("");
  const [isGuest, setIsGuest] = useState(false);
  const [userForm, setUserForm] = useState<FormState>(initialStandardCheckout);
  useEffect(() => {
    // Save debit card state in history
    setUserForm(isGuest ? initialGuestCheckout : initialStandardCheckout);
  }, [isGuest]);
  useEffect(() => {
    const savedState = localStorage.getItem("checkoutState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setAddress(parsedState.address);
      setDebitCard(parsedState.debitCard);
      setBillingAddress(parsedState.billingAddress);
      setIsGuest(parsedState.isGuest);
      setUserForm(parsedState.userForm);
      setDeliveryType(parsedState.deliveryType);
    }
  }, []);

  // Save state data to local storage when it changes
  useEffect(() => {
    localStorage.setItem(
      "checkoutState",
      JSON.stringify({
        address,
        debitCard,
        billingAddress,
        isGuest,
        userForm,
        deliveryType,
      })
    );
  }, [address, debitCard, billingAddress, isGuest, userForm, deliveryType]);
  return (
    <StateContext.Provider
      value={{
        address,
        setAddress,
        debitCard,
        setDebitCard,
        billingAddress,
        setBillingAddress,
        isGuest,
        setIsGuest,
        userForm,
        setUserForm,
        deliveryType,
        setDeliveryType,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
