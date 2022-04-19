import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signin } from 'actions/userAction';
import Helmet from 'components/Helmet';
import LoadingBox from 'components/LoadingBox';

const Signin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    };
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    useEffect(() => {
        if (typeof (error) === 'string') {
            toast.warn(error);
        }
    }, [error])

    return (
        <Helmet title="Đăng nhập">
            <div className="signin">

                <form className="form" onSubmit={submitHandler}>

                    <div className="home-back">
                        <Link to="/">
                            <i className="fas fa-home home-back__icon"></i>
                        </Link>
                    </div>

                    <div className="form__item">
                        <h1 className="form__item__title">Đăng Nhập</h1>
                    </div>

                    {loading && <LoadingBox></LoadingBox>}

                    <div className="form__item">
                        <label htmlFor="email" className="form__item__label">Email</label>
                        <input className="form__item__input" type="email" id="email" placeholder="Email" required
                            onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="form__item">
                        <label htmlFor="password" className="form__item__label">Mật khẩu</label>
                        <input className="form__item__input" type="password" id="password" placeholder="Nhập mật khẩu" required
                            onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="form__item btn">
                        <button type="submit" className="form__item__submit">Đăng nhập</button>
                    </div>

                    <div className="form__item">
                        <div className="form__item__create-acc">
                            <Link to="/register">Tạo tài khoản</Link>
                        </div>
                    </div>
                </form>
            </div>
        </Helmet>
    )
}

export default Signin
