// localStorage.js

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;

    const parsedState = JSON.parse(serializedState);

    // Ensure the shape always has "orders"
    if (!parsedState.orders) {
      return { orders: { cartList: [] } };
    }

    return parsedState;
  } catch {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    // Only persist the orders slice
    const serializedState = JSON.stringify({ orders: state.orders });
    localStorage.setItem("reduxState", serializedState);
  } catch {
    // ignore write errors
  }
};
