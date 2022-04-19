import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import LoadingBox from 'components/LoadingBox';
import OrderDetailModal from 'components/OrderDetailModal';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { removeOrder } from 'actions/orderActions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { TOAST_OPTIONS } from 'constants/productConstants';

OrderList.propTypes = {};

function OrderList(props) {

    const [data, setData] = useState();
    const [detailModal, setdetailModal] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOrderList = async () => {
            const orders = await axios.get('/api/orders');
            const orderList = orders.data || [];

            setData(orderList);
        }
        fetchOrderList();
    }, []);

    const [curId, setCurId] = useState();

    const handleDetailOrder = (id) => {
        setdetailModal(true);
        setCurId(id)
    }

    const handleDelOrder = (id) => {
        const newData = data.filter(x => x._id !== id)
        setData(newData);
        dispatch(removeOrder({ id }));

        toast.success("Delete success", {
            ...TOAST_OPTIONS,
        })
    }

    const columns = [
        {
            field: 'id', headerName: 'ID', width: 250, headerClassName: 'text', renderCell: (params) => {
                return (
                    <span className="text">{params.row.id}</span>
                )
            }
        },
        {
            field: 'userId', headerName: 'USER ID', width: 250, headerClassName: 'text', renderCell: (params) => {
                return (
                    <span className="text">{params.row.userId}</span>
                )
            }
        },
        {
            field: 'oder_date', headerName: 'Order Date', width: 180, headerClassName: 'text', renderCell: (params) => {
                return (
                    <span className="text">{moment(params.row.createdAt).format('DD-MM-YYYY hh:mm A')}</span>
                )
            }
        },
        {
            field: 'update_date', headerName: 'DATE UPDATE', width: 180, headerClassName: 'text', renderCell: (params) => {
                return (
                    <span className="text">{moment(params.row.updatedAt).format('DD-MM-YYYY hh:mm A')}</span>
                )
            }
        },
        {
            field: 'totalPrice', headerName: 'TOTAL PRICE', width: 150, headerClassName: 'text', renderCell: (params) => {
                return (
                    <span className="text">{params.row.totalPrice}</span>

                )
            }
        },
        {
            field: 'ship', headerName: 'SHIP', width: 110, headerClassName: 'text', renderCell: (params) => {
                return (<>
                    {params.row.shipingAddress.ship === "home" ?
                        (<div className="btn item-home">
                            <i className="fas fa-home"></i> Home
                        </div>) :
                        (<div className="btn item-store">
                            <i className="fas fa-store"></i> Store
                        </div>)
                    }
                </>
                )
            }
        },
        {
            field: 'status', headerName: 'STATUS', width: 120, headerClassName: 'text', renderCell: (params) => {
                return (

                    <span className="text">
                        {params.row.status === "pending" && <div className="btn item-pending">Pending</div>}
                        {params.row.status === "transport" && <div className="btn item-transport">Transport</div>}
                        {params.row.status === "receved" && <div className="btn item-receved">Revieced</div>}
                        {params.row.status === "cancle" && <div className="btn item-cancle">Cancled</div>}
                    </span>
                )
            }
        },
        {
            field: 'admin', headerName: 'Admin', width: 150, headerClassName: 'text', renderCell: (params) => {
                return (
                    <>
                        <button
                            className="detail-order"
                            onClick={() => handleDetailOrder(params.row.id)}
                        >
                            <i className="fas fa-info-circle"></i> Detail
                        </button>
                        <div
                            className="btn del-order"
                            onClick={() => {
                                if (window.confirm('Delete the item?')) {
                                    handleDelOrder(params.row.id)
                                };
                            }}
                        >
                            <i className="fas fa-trash"></i>
                        </div>
                    </>
                )
            }
        },
    ]
    return (
        <div className="order">
            {detailModal &&
                <OrderDetailModal
                    setdetailModal={setdetailModal}
                    curId={curId}
                    orderList={data}
                    setData={setData}
                />}
            <div className="userlist__main">
                {data ?
                    <DataGrid
                        disableSelectionOnClick
                        rows={data.map((order, index) => ({
                            id: order._id,
                            userId: order.userId,
                            totalPrice: order.totalPrice,
                            status: order.status,
                            shipingAddress: order.shipingAddress,
                            createdAt: order.createdAt,
                            updatedAt: order.updatedAt,
                        }))}

                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                    /> : <LoadingBox />
                }

            </div>
        </div>
    );
}

export default OrderList;