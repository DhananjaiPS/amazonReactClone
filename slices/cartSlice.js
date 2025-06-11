import { createSlice } from "@reduxjs/toolkit";

// Helper functions for localStorage with user-specific keys
const getUserKey = (userId) => `user_${userId}_cart_state`;

const loadUserState = (userId) => {
  try {
    const userKey = getUserKey(userId);
    const serializedState = localStorage.getItem(userKey);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state for user", userId, err);
    return undefined;
  }
};

const saveUserState = (userId, state) => {
  try {
    const userKey = getUserKey(userId);
    const serializedState = JSON.stringify(state);
    localStorage.setItem(userKey, serializedState);
  } catch (err) {
    console.error("Could not save state for user", userId, err);
  }
};

// Modified to accept userId as part of the initial state
const createCartSlice = (userId) => {
  // Load initial state from localStorage for this specific user
  const persistedState = loadUserState(userId);

  const initialState = persistedState || {
    items: [],
    watchlist: [],
  };

  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      saveToWatchlist: (state, action) => {
        const product = action.payload;
        if (!product || !product.id) {
          console.error("Invalid product data:", product);
          return;
        }
        const itemIndex = state.watchlist.findIndex(
          item => String(item.product?.id) === String(product.id)
        );

        if (itemIndex !== -1) {
          state.watchlist[itemIndex].quantity += 1;
        } else {
          state.watchlist.push({ product, quantity: 1, heart: true });
        }
        saveUserState(userId, state);
      },
      removeItemWatchlist: (state, action) => {
        state.watchlist = state.watchlist.filter((item) => item.product.id !== action.payload);
        saveUserState(userId, state);
      },
      addToCart: (state, action) => {
        const product = action.payload;

        if (!product || !product.id) {
          console.error("Invalid product data:", product);
          return;
        }

        const itemIndex = state.items.findIndex(
          item => String(item.product?.id) === String(product.id)
        );

        if (itemIndex !== -1) {
          state.items[itemIndex].quantity += 1;
        } else {
          state.items.push({ product, quantity: 1 });
        }
        saveUserState(userId, state);
      },
      removeItem: (state, action) => {
        state.items = state.items.filter((item) => item.product.id !== action.payload);
        saveUserState(userId, state);
      },
      addQuantity: (state, action) => {
        const product = state.items.find((item) => item.product.id === action.payload);
        if (product) {
          product.quantity = product.quantity + 1;
          saveUserState(userId, state);
        }
      },
      removeQuantity(state, action) {
        const product = state.items.find((item) => item.product.id === action.payload);
        if (product && product.quantity > 1) {
          product.quantity = product.quantity - 1;
          saveUserState(userId, state);
        }
        else if (product && product.quantity === 1) {
          state.items = state.items.filter((item) => item.product.id !== action.payload);
          saveUserState(userId, state);
        }
      },
      clearCart: (state) => {
        state.items = [];
        saveUserState(userId, state);
      },
      // New reducer to switch users
      switchUser: (state, action) => {
        const newUserId = action.payload;
        // No need to modify state here, just return it
        // The actual user switching happens at the store level
        return state;
      },
      addQuantityWatchlist: (state, action) => {
        const product = state.watchlist.find((item) => item.product.id === action.payload);
        if (product) {
          product.quantity = product.quantity + 1;
          saveUserState(userId, state);
        }
      },
      removeQuantityWatchlist: (state, action) => {
        const product = state.watchlist.find((item) => item.product.id === action.payload);
        if (product && product.quantity > 1) {
          product.quantity = product.quantity - 1;
          saveUserState(userId, state);
        } else if (product && product.quantity === 1) {
          state.watchlist = state.watchlist.filter((item) => item.product.id !== action.payload);
          saveUserState(userId, state);
        }
      },
    }
  });

  return cartSlice;
};

// Utility function to get the cart slice for a specific user
export const getCartSlice = (userId) => {
  return createCartSlice(userId);
};

// Default export for backward compatibility (uses a default user)
const defaultCartSlice = createCartSlice('default_user');
export const {
  addToCart,
  removeItem,
  addQuantity,
  removeQuantity,
  clearCart,
  saveToWatchlist,
  removeItemWatchlist,
  switchUser,
  addQuantityWatchlist,
  removeQuantityWatchlist
} = defaultCartSlice.actions;
export default defaultCartSlice.reducer;