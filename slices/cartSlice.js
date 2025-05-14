import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    items: [],
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart: (state, action) => {
            const product = state.items.find((item) => item.product.id === action.payload.id);
            const item = action.payload;

            if (!product) {
                state.items.push({
                    product: item,
                    quantity: 1,
                })

            }
            else {

                product.quantity = product.quantity + 1;
            }
        },


        removeItem: (state, action) => {
            state.items = state.items.filter((item) => item.product.id !== action.payload);
        },
        addQuantity:(state,action)=>{
            const product = state.items.find((item) => item.product.id === action.payload);
            if (product) {
                product.quantity = product.quantity + 1;
            }

        },
        removeQuantity(state,action){
            const product=state.items.find((item)=>item.product.id===action.payload);
            if(product && product.quantity>1){
                product.quantity=product.quantity-1;
            }
            else if(product && product.quantity===1){
                state.items=state.items.filter((item)=>item.product.id!==action.payload);  //remove kr do bechare ko poor 
            }
        }
    }
})

export const { addToCart, removeItem ,addQuantity , removeQuantity} = cartSlice.actions;
export default cartSlice.reducer;