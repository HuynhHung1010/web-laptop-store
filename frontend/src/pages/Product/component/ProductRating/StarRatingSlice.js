import axios from 'axios';
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {};

const StarRatingSlice = createSlice({
    name: "starRating",
    initialState,
    reducers: {
        addStarRating: (state, action) => {
            const { productId, rating, comment, userInfo } = action.payload;
            const newStarRating = {
                productId,
                userName: userInfo.name,
                image: userInfo.image,
                rating,
                note: comment,
            }
            axios.post('/api/rating', newStarRating);
        },
        addComment: (state, action) => {
            const { productId, comment, userInfo } = action.payload;
            const newUserComment = {
                productId,
                userName: userInfo.name,
                image: userInfo.image,
                comment,
            }
            axios.post('/api/usercmts', newUserComment);
        }
    }
})

const { reducer, actions } = StarRatingSlice;
export const {
    addStarRating,
    addComment,
} = actions;

export default reducer;
