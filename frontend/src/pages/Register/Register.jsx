import { register } from 'actions/userAction';
import Helmet from 'components/Helmet';
import LoadingBox from 'components/LoadingBox';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);

    const userRegister = useSelector((state) => state.userRegister);
    const { loading } = userRegister;


    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            // alert('Mật khẩu và Nhập lại mật khẩu không đúng');
            toast.warn('Mật khẩu nhập lại không đúng');
        } else {
            dispatch(register(name, email, password, image));
            props.history.push('/');
        }
    };

    const onAvatarChange = (e) => {
        e.preventDefault();
        setImage(e.target.files[0]);
    };

    return (
        <Helmet title="Đăng ký">
            <div className="signin">
                <form className="form" onSubmit={submitHandler}>

                    <div className="home-back">
                        <Link to="/">
                            <i className="fas fa-home home-back__icon"></i>
                        </Link>
                    </div>

                    <div className="form__item">
                        <h1 className="form__item__title">Đăng Ký</h1>
                    </div>
                    {loading && <LoadingBox></LoadingBox>}

                    <div className="form__item">
                        <label htmlFor="name" className="form__item__label">Tên hiển thị</label>
                        <input className="form__item__input" type="text" id="name" placeholder="Tên hiển thị" required
                            onChange={e => setName(e.target.value)} />
                    </div>

                    <div className="form__item">
                        <label htmlFor="email" className="form__item__label">Email</label>
                        <input className="form__item__input" type="email" id="email" placeholder="Email" required
                            onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="form__item">
                        <label htmlFor="password" className="form__item__label">Mật khẩu</label>
                        <input className="form__item__input" type="password" id="password" placeholder="Chọn mật khẩu" required
                            onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="form__item">
                        <label htmlFor="confirmPassword" className="form__item__label">Nhập lại mật khẩu</label>
                        <input className="form__item__input" type="password" id="confirmPassword" placeholder="Nhập lại mật khẩu" required
                            onChange={e => setConfirmPassword(e.target.value)} />
                    </div>

                    <div className="form__item">
                        <label htmlFor="image" className="form__item__label">Ảnh đại diện</label>
                        <input className="form__item__input" type="file" id="image" required
                            onChange={e => onAvatarChange(e)} />

                    </div>



                    <div className="form__item btn">
                        <button type="submit" className="form__item__submit">Đăng ký</button>
                    </div>

                    <div className="form__item">
                        <label htmlFor=""></label>
                        <div className="form__item__create-acc">
                            <Link to="/signin">Đăng nhập</Link>
                        </div>
                    </div>
                </form>
            </div>
        </Helmet>
    )
}

export default Register
