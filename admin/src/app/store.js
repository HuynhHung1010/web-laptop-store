import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";

import { orderCreateReducer } from './../reducers/orderReduces';
import { UpdateConfigReducer } from "reducers/configReducers";

import {
        productCreateReducer,
        productDetailsReducer,
        productListReducer,
        productUpdateImageReducer,
        productUpdateReducer
} from 'reducers/productReducers';
import {
        userDetailsReducer,
        userListReducer,
        userRegisterReducer,
        userSigninReducer,
        userUpdateImageReducer,
        userUpdateReducer
} from "reducers/userReducers";
import {
        FLUSH,
        PAUSE,
        PERSIST,
        persistReducer,
        persistStore,
        PURGE,
        REGISTER,
        REHYDRATE
} from "redux-persist";


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
        productList: productListReducer,
        productDetail: productDetailsReducer,
        orderCreate: orderCreateReducer,
        userSignin: userSigninReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdate: userUpdateReducer,
        userUpdateImage: userUpdateImageReducer,
        userList: userListReducer,
        config: UpdateConfigReducer,
        productUpdate: productUpdateReducer,
        productUpdateImage: productUpdateImageReducer,
        productCreate: productCreateReducer,
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