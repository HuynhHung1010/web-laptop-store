import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';


const Rating = () => {

    document.title = "Admin - rating";
    const { id } = useParams();
    const [rating, setRating] = useState();

    useEffect(() => {
        const fetchRating = async () => {
            const rate = await axios.get(`/api/rating/${id}`);
            setRating(rate.data);
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
            field: 'rating', headerName: 'Rating', width: 120, headerClassName: 'text', renderCell: (params) => {
                return (
                    <span className="text">{params.row.rating} <i className="fas fa-star rating-star"></i></span>
                )
            }
        },
        {
            field: 'note', headerName: 'Note', width: 600, headerClassName: 'text', renderCell: (params) => {
                return (
                    <span className="text">{params.row.note}</span>
                )
            }
        },
    ]




    return (
        <div className="rating">
            <div className="rating__header">
                Rating
            </div>
            {
                rating && rating.length > 0 ? (
                    <DataGrid
                        disableSelectionOnClick
                        rows={rating && rating.map((rating, index) => ({ id: rating._id, name: rating.userName, image: rating.image, rating: rating.rating, note: rating.note }))}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5]}
                        checkboxSelection

                    />

                ) : (
                    <div className="noRating">No Ratings</div>
                )
            }

        </div >
    )
}

export default Rating
