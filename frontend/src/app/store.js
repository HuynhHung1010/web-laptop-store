import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";

import CheckSlice from "pages/CheckOut/CheckSlice";
import StarRatingSlice from "pages/Product/component/ProductRating/StarRatingSlice";
import { orderCreateReducer } from './../reducers/orderReduces';

import {
        FLUSH,
        PAUSE,
        PERSIST, persistReducer, persistStore, PURGE,
        REGISTER,
        REHYDRATE
} from 'redux-persist';

import {
        productDetailsReducer,
        productListReducer
} from 'reducers/productReducers';

import {
        userDetailsReducer,
        userRegisterReducer,
        userSigninReducer,
        userUpdateImageReducer,
        userUpdateReducer
} from "reducers/userReducers";


const persistConfig = {
        key: 'root',
        storage,
}

const initialState = {
        userSignin: {
                userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
        },
}

const rootReducer = combineReducers({
        checkList: CheckSlice,
        productList: productListReducer,
        productDetail: productDetailsReducer,
        orderCreate: orderCreateReducer,
        starRating: StarRatingSlice,
        userSignin: userSigninReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdate: userUpdateReducer,
        userUpdateImage: userUpdateImageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
        reducer: persistedReducer,
        initialState,
        middleware: getDefaultMiddleware({
                serializableCheck: {
                        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
        }),
});

export const persistor = persistStore(store);
export default store;