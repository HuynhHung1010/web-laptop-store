// import { useDispatch } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Comment = () => {

    document.title = "Admin - comment";
    const { id } = useParams();
    const [data, setData] = useState();
    // const dispatch = useDispatch();

    useEffect(() => {
        const fetchRating = async () => {
            const data = await axios.get(`/api/usercmts/${id}`);
            setData(data.data);
        }
        fetchRating();
    }, [id]);

    const columns = [

        {
            field: 'id', headerName: 'ID', width: 220, headerClassName: 'text', renderCell: (params) => {
                return (
                    <span className="text">{params.row.id}</span>
                )
            }
        },

        {
            field: 'name', headerName: 'User', width: 200, headerClassName: 'text', renderCell: (params) => {
                return (
                    <div className="columnUser">
                        <img className="columnUser__img" src={params.row.isAdmin ? params.row.image : params.row.image.split('\\').join('/')} alt="" />
                        <span>
                            {params.row.name}
                        </span>
                    </div>
                )
            }
        },
        {
            field: 'datetime', headerName: 'Date', width: 150, headerClassName: 'text', renderCell: (params) => {
                return (
                    <span className="text">{params.row.datetime}</span>
                )
            }
        },
        {
            field: 'comment', headerName: 'Comment', width: 550, headerClassName: 'text', renderCell: (params) => {
                return (
                    <span className="text">{params.row.comment}</span>
                )
            }
        },
    ]

    return (
        <div className="rating">
            <div className="rating__header">
                Comment
            </div>
            {
                data && data.length > 0 ? (
                    <DataGrid
                        disableSelectionOnClick
                        rows={data && data.map((data, index) => ({ id: data._id, name: data.userName, image: data.image, datetime: data.datetime, comment: data.comment }))}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5]}
                        checkboxSelection

                    />

                ) : (
                    <div className="noRating">No Comments</div>
                )
            }

        </div >
    )
}

export default Comment
