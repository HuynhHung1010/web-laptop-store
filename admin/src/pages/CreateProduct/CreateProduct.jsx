import { createProduct } from 'actions/productActions';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const CreateProduct = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();
    const [note, setNote] = useState();
    const [countInStock, setCountInStock] = useState();
    const [image, setImage] = useState(null);
    // console.log(name, price, category, note, countInStock, image);


    const onImageChange = (e) => {
        e.preventDefault();
        setImage(e.target.files[0]);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProduct({ name, price, category, note, countInStock, image }));
        toast.success('Thêm sản phẩm thành công');

    };

    return (
        <div className="create">
            <div className="create__title">
                Create Product
            </div>

            <div className="create__content">
                <form className="updateForm" onSubmit={submitHandler}>
                    {/* left */}
                    <div className="updateForm__left">

                        <div className="updateForm__left-item">
                            <label className="item__label">Product Name</label>
                            <input className="item__input" type="text" required value={name} onChange={e => setName(e.target.value)} />
                        </div>

                        <div className="updateForm__left-item">
                            <label className="item__label">Price</label>
                            <input className="item__input" type="text" required value={price} onChange={e => setPrice(e.target.value)} />
                        </div>



                        <div className="updateForm__left-item fileImage">
                            <span className="uploadImg">Tải ảnh lên</span>
                            <div className="choose">
                                <input className="leftFile" type="file" required onChange={e => onImageChange(e)} />
                                <i className="fas fa-upload"></i>
                            </div>
                        </div>

                    </div>


                    {/* right  */}

                    <div className="updateForm__right">

                        <div className="updateForm__left-item">
                            <label className="item__label">Category</label>
                            <input className="item__input" type="text" required value={category} onChange={e => setCategory(e.target.value)} />
                        </div>



                        <div className="updateForm__right-item">
                            <label className="item__label">Note</label>
                            <input className="item__input" type="text" value={note} onChange={e => setNote(e.target.value)} />
                        </div>

                        <div className="updateForm__right-item">
                            <label className="item__label">Count In Stock</label>
                            <input className="item__input" type="text" required value={countInStock} onChange={e => setCountInStock(e.target.value)} />
                        </div>


                        <button type="submit" className="rightUpdate">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct
