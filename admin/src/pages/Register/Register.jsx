import { register } from 'actions/userAction';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import { Redirect } from 'react-router-dom';



const Register = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.warn('Mật khẩu nhập lại không đúng');

        } else {
            dispatch(register(name, email, password, image));
            toast.success('Tạo tài khoản thành công');
            // props.history.push('/');
        }
    };


    const onAvatarChange = (e) => {
        e.preventDefault();
        setImage(e.target.files[0]);
    };



    return (
        <div className="register">
            <form className="form" onSubmit={submitHandler}>

                <div className="form__item">
                    <div className="form__item__title">Create Account</div>
                </div>

                <div className="form__item">
                    <label htmlFor="name" className="form__item__label">Username</label>
                    <input className="form__item__input" type="text" id="name" placeholder="Username" required
                        onChange={e => setName(e.target.value)} />
                </div>

                <div className="form__item">
                    <label htmlFor="email" className="form__item__label">Email</label>
                    <input className="form__item__input" type="email" id="email" placeholder="Email" required
                        onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="form__item">
                    <label htmlFor="password" className="form__item__label">Password</label>
                    <input className="form__item__input" type="password" id="password" placeholder="Password" required
                        onChange={e => setPassword(e.target.value)} />
                </div>

                <div className="form__item">
                    <label htmlFor="confirmPassword" className="form__item__label">Retype Password</label>
                    <input className="form__item__input" type="password" id="confirmPassword" placeholder="Retype Password" required
                        onChange={e => setConfirmPassword(e.target.value)} />
                </div>

                <div className="form__item">
                    <label htmlFor="image" className="form__item__label">Avatar</label>
                    <input className="form__item__input" type="file" id="image" required
                        onChange={e => onAvatarChange(e)} />

                </div>

                <div className="form__item btn">
                    <button type="submit" className="form__item__submit">Create</button>
                </div>

            </form>
        </div>
    )
}

export default Register
