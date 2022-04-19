import Axios from "axios";
import { USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_IMAGE_FAIL, USER_IMAGE_REQUEST, USER_IMAGE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "constants/userConstants";

export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {

        const { data } = await Axios.post('/api/users/signin', { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const register = (name, email, password, image) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    const fd = new FormData();
    fd.append('name', name);
    fd.append('email', email);
    fd.append('password', password);
    fd.append('image', image, image.name);
    try {
        const { data } = await Axios.post('/api/users/register', fd);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAIL_REQUEST, payload: userId });
    const { userSignin: { userInfo } } = getState();

    try {
        const { data } = await Axios.get(`/api/users/${userId}`, {
            headers: { Authorization: userInfo.token }
        })
        dispatch({ type: USER_DETAIL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_DETAIL_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: user });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.put('/api/users/profile', user,
            {
                headers: { Authorization: userInfo.token }
            }
        );
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const updateUserImage = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_IMAGE_REQUEST, payload: user });
    const { userSignin: { userInfo } } = getState();
    const fd = new FormData();
    fd.append('userId', user.userId);
    fd.append('name', user.name);
    fd.append('email', user.email);
    fd.append('currentPassword', user.currentPassword);
    fd.append('newPassword', user.newPassword);
    fd.append('phone', user.phone);
    fd.append('image', user.image, user.image.name);

    try {
        const { data } = await Axios.put('/api/users/profileImage', fd,
            {
                headers: { Authorization: userInfo.token }
            }
        );
        dispatch({ type: USER_IMAGE_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_IMAGE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}




export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_SIGNOUT })
};