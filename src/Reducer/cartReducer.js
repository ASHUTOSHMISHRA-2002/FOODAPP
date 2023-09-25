import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  SAVE_DELIVERY_INFO,
} from "../Constants/cartConstant";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isItemExists = state.cartItems.find(
        (i) => i.fooditem === item.fooditem
      );
      if (isItemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.fooditem === isItemExists.fooditem ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.fooditem === action.payload.foodItemId
            ? {
                ...item,
                quantity: action.payload.quantity,
              }
            : item
        ),
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.fooditem !== action.payload),
      };

    case SAVE_DELIVERY_INFO:
      return {
        ...state,
        deliveryInfo: action.payload,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};