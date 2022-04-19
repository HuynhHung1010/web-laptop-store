import axios from "axios";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "constants/orderConstants";


export const createCheckOut = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.post('http://localhost:5000/api/orders/add', order
            , {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            }
        )
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const cancleOrder = (order) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post('/api/orders/status', order)
        dispatch({ payload: data.order });

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}