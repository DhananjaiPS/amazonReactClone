import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items: [],
    watchlist:[],
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        saveToWatchlist :(state,action)  =>{
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
                console.log("Product already in cart, incrementing qty",state.watchlist[itemIndex].quantity);
            } else {
                state.watchlist.push({ product, quantity: 1 ,heart : true});
                console.log("Product added to watchlist",state.watchlist);
                // console.log(state.watchlist[heart]);
            }

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
                // product already in cart, increment qty
                state.items[itemIndex].quantity += 1;
                console.log("Product already in cart, incrementing qty",state.items[itemIndex].quantity);
            } else {
                // new product, add to cart
                state.items.push({ product, quantity: 1 });
            }
        },


        removeItem: (state, action) => {
            state.items = state.items.filter((item) => item.product.id !== action.payload);
        },
        removeItemWatchlist: (state, action) => {
            state.watchlist = state.watchlist.filter((item) => item.product.id !== action.payload);
        },
        addQuantity: (state, action) => {
            const product = state.items.find((item) => item.product.id === action.payload);
            if (product) {
                product.quantity = product.quantity + 1;
            }

        },
        removeQuantity(state, action) {
            const product = state.items.find((item) => item.product.id === action.payload);
            if (product && product.quantity > 1) {
                product.quantity = product.quantity - 1;
            }
            else if (product && product.quantity === 1) {
                state.items = state.items.filter((item) => item.product.id !== action.payload);  //remove kr do bechare ko poor 
            }
        },


        clearCart: (state) => {
            state.items = [];
        }

    }
})

export const { addToCart, removeItem, addQuantity, removeQuantity, clearCart , saveToWatchlist,removeItemWatchlist} = cartSlice.actions;
export default cartSlice.reducer;