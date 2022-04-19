import { cancleOrder } from 'actions/orderActions';
import noOrders from 'assets/svg/no-order.svg';
import axios from 'axios';
import { TOAST_OPTIONS } from 'constants/productConstants';
import { default as React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import numberWithCommas from 'utils/numberWithCommas';
import moment from 'moment';


const MyOrder = () => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [myOrders, setmyOrders] = useState();
    const dispatch = useDispatch();

    const today = new Date();

    useEffect(() => {
        const fetchUserOrder = async () => {
            const orders = await axios.get(`/api/orders/user/${userInfo._id}`);
            const data = orders.data || [];

            setmyOrders(data);
            return;
        }
        fetchUserOrder();

    }, [userInfo._id]);

    const handleCancleOrder = (id, status, date) => {
        toast.warn('Đang xử lý đơn hàng...', {
            ...TOAST_OPTIONS,
        });
        setTimeout(() => {

            dispatch(cancleOrder({ id, status, date }));
            const index = myOrders.findIndex(order => order._id === id);
            const ordersUpdated = [...myOrders];
            ordersUpdated[index].status = "cancle";
            setmyOrders(ordersUpdated);

            toast.success('Hủy đơn hàng thành công!', {
                ...TOAST_OPTIONS,
            });

            clearTimeout();
        }, 2000);
    }

    const [currentTab, setCurrentTab] = useState('all');

    const countStatus = (status) => {
        return myOrders?.filter(bill => bill.status === status).length;
    }

    const newOrders = [].concat(myOrders ? myOrders : [])
        .sort((a, b) => a.itemM > b.itemM ? 1 : -1)
        .filter(order => currentTab === "all" ?
            true : order.status === currentTab);

    return (
        <div className="my-order">
            <div className="my-order-title">
                Lịch Sử Mua Hàng
            </div>
            <div className="my-order-content">
                <div className="my-order-menu_top">
                    <div className="menu_top-items">
                        <div className={`menu_top-item ${currentTab === 'all' ? 'active' : ''} `}
                            onClick={() => setCurrentTab('all')}
                        >
                            {myOrders?.length ? <span className="menu_top-item-number">{myOrders.length}</span> : ''}
                            <i className="fas fa-border-all"></i> Tất Cả
                        </div>
                        <div className={`menu_top-item ${currentTab === 'pending' ? 'active' : ''} `}
                            onClick={() => setCurrentTab('pending')}
                        >
                            {
                                countStatus('pending') ?
                                    <span className="menu_top-item-number">
                                        {countStatus('pending')}
                                    </span> : ''
                            }
                            <i className="fas fa-tools"></i> Đang xử Lý
                        </div>
                        <div className={`menu_top-item ${currentTab === 'transport' ? 'active' : ''} `}
                            onClick={() => setCurrentTab('transport')}
                        >
                            {
                                countStatus('transport') ?
                                    <span className="menu_top-item-number">
                                        {countStatus("transport")}
                                    </span> : ''
                            }
                            <i className="fas fa-dolly-flatbed"></i> Đang vận chuyển
                        </div>
                        <div className={`menu_top-item ${currentTab === 'receved' ? 'active' : ''} `}
                            onClick={() => setCurrentTab('receved')}
                        >
                            {
                                countStatus('receved') ?
                                    <span className="menu_top-item-number">
                                        {countStatus("receved")}
                                    </span> : ''
                            }
                            <i className="fas fa-clipboard-check"></i> Đã Nhận
                        </div>
                        <div className={`menu_top-item ${currentTab === 'cancle' ? 'active' : ''} `}
                            onClick={() => setCurrentTab('cancle')}
                        >
                            {
                                countStatus('cancle') ?
                                    <span className="menu_top-item-number">
                                        {countStatus("cancle")}
                                    </span> : ''
                            }
                            <i className="fas fa-times-circle" ></i> Đã Hủy
                        </div>
                    </div>
                </div>
                <div className="my-order-list">
                    <div>
                        {
                            newOrders?.length > 0 ? newOrders?.map((order, index) => (
                                <div key={index} className="my-order-list-item">
                                    <div className="item-tag"
                                        style={{
                                            color:
                                                order.status === "receved" ? "green" :
                                                    order.status === "cancle" ? "#d40a25" :
                                                        "#ffc318"
                                        }}
                                    >
                                        <i className="fas fa-tag"></i>
                                    </div>
                                    <div className="item-top">
                                        <div className="item-top-left">
                                            <i className="far fa-clock"></i>
                                            <i> Ngày đặt hàng: {moment(order.createdAt).format("DD/MM/YYYY hh:mm")}</i>
                                        </div>
                                        <div className="item-top-status_right">
                                            {order.status === "pending" && <div className="btn item-pending">Đang xử lý</div>}
                                            {order.status === "transport" && <div className="btn item-transport">Đang vận chuyển</div>}
                                            {order.status === "receved" && <div className="btn item-receved">Đã nhận</div>}
                                            {order.status === "cancle" && <div className="btn item-cancle">Đã hủy</div>}
                                        </div>
                                    </div>
                                    {
                                        order.orderItems.map((item, index) => (
                                            <div key={index} className="item-content-items">
                                                <Link to={`/product/${item._id}`} className="item-content">
                                                    <img src={item.image} alt="" />
                                                    <div className="item-content-info">
                                                        <p>{item.name}</p>
                                                        <i>Số lượng: x{item.quantity}</i>
                                                    </div>
                                                    <div className="item-content-price">
                                                        <b>
                                                            {numberWithCommas(item.price * item.quantity)}₫
                                                        </b>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                    <div className="item-total">
                                        Total: <b>{numberWithCommas(order.totalPrice)} ₫</b>
                                    </div>
                                    {
                                        order.status === "pending"
                                        && <div
                                            className="item-cancle btn"
                                            onClick={() => handleCancleOrder(order._id, 'cancle', moment(today).format())}
                                        >
                                            Hủy đặt hàng</div>
                                    }
                                </div>
                            )) : <div className="item-order-empty">
                                <img src={noOrders} alt="" />
                                <p>NO ORDER HERE!</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyOrder;