import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartList: [] };

const Orders = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (state.cartList.find((order) => order.id === action.payload.id)) {
        const item = state.cartList.find(
          (order) => order.id === action.payload.id,
        );
        item.count += 1;
      } else {
        state.cartList.push(action.payload);
      }
    },
    deleteItem: (state, action) => {
      if (state.cartList.find((order) => order.id === action.payload.id)) {
        const item = state.cartList.find(
          (order) => order.id === action.payload.id,
        );
        if (item.count === 1) {
          const updatedList = state.cartList.filter(
            (order) => order.id !== action.payload.id,
          );
          return {
            ...state,
            cartList: updatedList,
          };
        } else {
          item.count -= 1;
        }
      }
    },
    clearCart: (state) => {
      state.cartList = [];
    },
  },
});

export const { addItem, deleteItem, clearCart } = Orders.actions;
const Cartreducer = Orders.reducer;

export default Cartreducer;
