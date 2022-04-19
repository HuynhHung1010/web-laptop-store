import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    checkList: [],
};

const CheckSlice = createSlice({
    name: 'checkList',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, product } = action.payload;
            const index = state.checkList.findIndex((productList) => productList._id === id);

            if (index >= 0) {
                state.checkList[index].quantity = state.checkList[index].quantity + 1;
            }
            if (index < 0) {
                const newItem = {
                    _id: product._id,
                    name: product.name,
                    category: product.category,
                    image: product.image,
                    price: product.price,
                    quantity: 1,
                }
                state.checkList.push(newItem);
            }

        },
        selectQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const index = state.checkList.findIndex((productList) => productList._id === id);
            if (index < 0) return;
            state.checkList[index].quantity = quantity;
        },
        removeProduct: (state, action) => {
            const { id } = action.payload;
            const index = state.checkList.findIndex((productList) => productList._id === id);
            if (index < 0) return;
            state.checkList.splice(index, 1);
        },
        cartEmpty: (state, action) => {
            state.checkList = [];
        }

    }
})

const { reducer, actions } = CheckSlice;
export const {
    selectQuantity,
    removeProduct,
    addToCart,
    cartEmpty,
    saveCheckOutInfo,
    saveShippingAddress
} = actions;

export default reducer;