import { createContext, useContext, useMemo, useReducer, useEffect, useState } from "react";

// =================================================================================
// Initial values and context setup
// =================================================================================
const INITIAL_CART = [];
const INITIAL_STATE = {
  cart: INITIAL_CART,
  customerRequest: "",
};
const AppContext = createContext({
  state: INITIAL_STATE,
  dispatch: () => {},
  searchValue: "", setSearchValue: () => {},
  mainContent: "", setMainContent: () => {},
  selectedCategory: "", setSelectedCategory: () => {},
  selectedCategoryTitle: "", setSelectedCategoryTitle: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.id === cartItem.id);

      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
        return { ...state, cart: filteredCart };
      }

      if (exist) {
        const newCart = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, qty: cartItem.qty } : item
        );
        return { ...state, cart: newCart };
      }

      return { ...state, cart: [...cartList, cartItem] };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    case "UPDATE_SHIPPING":
      return {
        ...state,
        ...action.payload, // Update shipping fields
      };

    case "UPDATE_BILLING":
      return {
        ...state,
        ...action.payload, // Update billing fields
      };

    case "LOAD_STATE_FROM_STORAGE":
      return {
        ...state,
        ...action.payload, // Merge saved state with the current state
      };

    case "UPDATE_CUSTOMER_REQUEST":
      return {
        ...state,
        customerRequest: action.payload, // Update Customer Request
      };

    case "CLEAR_ALL_FIELDS":
      return {
        ...INITIAL_STATE, // Reset all fields to initial state
      };

    default: {
      return state;
    }
  }
};

// =======================================================
// AppProvider Component with localStorage integration
// =======================================================
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [searchValue, setSearchValue] = useState("");
  const [mainContent, setMainContent] = useState("HOME");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState("");

  // Load cart from localStorage on the client side
  useEffect(() => {
    const savedState = localStorage.getItem("appState");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: "LOAD_STATE_FROM_STORAGE", payload: parsedState });
        setSearchValue(parsedState.searchValue || "");
        setMainContent(parsedState.mainContent || "HOME");
        setSelectedCategory(parsedState.selectedCategory || "");
        setSelectedCategoryTitle(parsedState.selectedCategoryTitle || "");
      } catch (error) {
        console.error("Error parsing appState from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      searchValue, setSearchValue,
      mainContent, setMainContent,
      selectedCategory, setSelectedCategory,
      selectedCategoryTitle, setSelectedCategoryTitle,
    }),
    [state, dispatch, searchValue, selectedCategory, mainContent]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
