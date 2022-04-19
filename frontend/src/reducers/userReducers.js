import { USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_IMAGE_FAIL, USER_IMAGE_REQUEST, USER_IMAGE_RESET, USER_IMAGE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from "constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGNOUT:
            return {};
        default: return state;
    }
};


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const userDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:
            return { loading: true };
        case USER_DETAIL_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true };
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case USER_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};


export const userUpdateImageReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_IMAGE_REQUEST:
            return { loading: true };
        case USER_IMAGE_SUCCESS:
            return { loading: false, success: true };
        case USER_IMAGE_FAIL:
            return { loading: false, error: action.payload };
        case USER_IMAGE_RESET:
            return {};
        default:
            return state;
    }
};

