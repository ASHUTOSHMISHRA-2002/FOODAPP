import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  SAVE_DELIVERY_INFO,
  UPDATE_DELIVERY_INFO,
} from "../Constants/cartConstant";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/v1/eats/item/${id}`);
    const foodItemData = data.data;
    const image =
      foodItemData.images && foodItemData.images.length > 0
        ? foodItemData.images[0].url
        : "";
    dispatch({
      type: ADD_TO_CART,
      payload: {
        fooditem: foodItemData._id,
        name: foodItemData.name,
        price: foodItemData.price,
        image,
        stock: foodItemData.stock,
        quantity,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    alert.error("Failed to add Item to Cart. Please try again...");
  }
};

export const updateCartQuantity =
  (foodItemId, quantity) => async (dispatch) => {
    dispatch({
      type: UPDATE_CART_QUANTITY,
      payload: { foodItemId, quantity },
    });
  };

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
  localStorage.removeItem("cartItems");
};

export const saveDeliveryInfo = (deliveryInfo) => (dispatch, getState) => {
  try {
    const existingDeliveryInfo = getState().cart.deliveryInfo;
    if (existingDeliveryInfo) {
      dispatch({
        type: UPDATE_DELIVERY_INFO,
        payload: deliveryInfo,
      });
    } else {
      dispatch({
        type: SAVE_DELIVERY_INFO,
        payload: deliveryInfo,
      });
    }
  } catch (error) {}
};

export const updateDeliveryInfo = (deliveryInfo) => (dispatch) => {
  try {
    dispatch({
      type: UPDATE_DELIVERY_INFO,
      payload: deliveryInfo,
    });
  } catch (error) {}
};