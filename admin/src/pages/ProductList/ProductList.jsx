import { DataGrid } from '@material-ui/data-grid';
import { deleteProduct } from 'actions/productActions';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import numberWithCommas from 'utils/numberWithCommas';

const ProductList = () => {

    document.title = "Admin - Products"

    const [data, setData] = useState();

    useEffect(() => {
        const fetchOrderList = async () => {
            const products = await axios.get('/api/products');
            const ProductList = products.data || [];
            setData(ProductList);
        }
        fetchOrderList();
    }, []);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(listUsers());
    // }, [dispatch]);


    const handleDelete = (id) => {
        setData(data.filter((item) => item._id !== id))
        dispatch(deleteProduct(id))
        window.location.reload();
    }


    const columns = [
        {
            field: 'id', headerName: 'ID', width: 220, headerClassName: 'text', renderCell: (params) => {
                return (
                    <span className="text">{params.row.id}</span>
                )
            }
        },
        {
            field: 'name', headerName: 'Product', width: 220, headerClassName: 'text', renderCell: (params) => {
                return (
                    <div className="columnImg">
                        <img className="columnImg__img" src={params.row.image} alt="" />
                        <span>
                            {params.row.name}
                        </span>
                    </div>
                )
            }
        },
        {
            field: 'category', headerName: 'Category', width: 130, headerClassName: 'text', renderCell: (params) => {
                return (
                    <span className="text">{params.row.category}</span>
                )
            }
        },
        {
            field: 'price', headerName: 'Price', width: 130, headerClassName: 'text', renderCell: (params) => {
                return (
                    <span className="text">
                        {numberWithCommas(params.row.price)}₫
                    </span>
                )
            }
        },

        {
            field: 'note', headerName: 'Note', width: 200, headerClassName: 'text', renderCell: (params) => {
                return (
                    <span className="text">{params.row.note}</span>
                )
            }
        },

        {
            field: 'isAdmin', headerName: 'Admin', width: 200, headerClassName: 'text', renderCell: (params) => {
                return (
                    <div className="behavior">
                        <Link to={`/product/${params.row.id}`}>
                            <button className="behavior__edit">Detail</button>
                        </Link>
                        <button className="behavior__delete" onClick={() => handleDelete(params.row.id)}><i className="fas fa-trash"></i></button>
                    </div>
                )
            }
        },
    ]



    return (
        <div className="productlist">
            <div className="productlist__header">
                <span className="productlist__header-title">Product List</span>
                <Link to='/createProduct' >
                    <button className="productlist__header-create">Create Product</button>
                </Link>
            </div>
            {
                data &&
                <DataGrid
                    disableSelectionOnClick
                    rows={data && data.map((item, index) => ({ id: item._id, name: item.name, image: item.image, category: item.category, price: item.price, note: item.note }))}
                    columns={columns}
                    pageSize={10}
                    // rowsPerPageOptions={[5]}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                />
            }
        </div>
    )
}

export default ProductList
