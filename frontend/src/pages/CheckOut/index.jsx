import { createCheckOut } from 'actions/orderActions';
import cartEmty from 'assets/images/empty-cart.png';
import axios from 'axios';
import LoadingBox from 'components/LoadingBox';
import { ORDER_CREATE_RESET } from 'constants/orderConstants';
import { TOAST_OPTIONS } from 'constants/productConstants';
import InputField from 'custom-field/InputField';
import RadioField from 'custom-field/RadioField';
import SelectField from 'custom-field/SelectField';
import moment from 'moment';
import CheckoutList from 'pages/CheckOut/CheckoutList';
import { cartEmpty, removeProduct, selectQuantity } from 'pages/CheckOut/CheckSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import numberWithCommas from 'utils/numberWithCommas';






const CheckOut = (props) => {
    const { setcheckOutModal, loadingcheckbox, setLoadingcheckbox } = props;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [isPending, setIsPending] = useState(false);

    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [commune, setCommune] = useState([]);
    const dispatch = useDispatch();


    // Set filter when change
    const [filter, setFilter] = useState({
        cityCode: null,
        districtCode: null,
    });

    // Fetch city on Province page
    useEffect(() => {
        const fetchCity = async () => {
            const City = await axios.get("https://provinces.open-api.vn/api/");
            const data = City.data || [];
            const cityOptions = data.map((ct) => ({
                label: ct.name,
                value: ct.code,
            }));

            setCity(cityOptions);
        };
        fetchCity();
    }, []);
    // Fetch district when city change
    useEffect(() => {
        const fetchDistrict = async () => {
            if (filter.cityCode === null) return;
            const District = await axios.get(
                `https://provinces.open-api.vn/api/p/${filter.cityCode}/?depth=2`
            );

            const data = District.data.districts || [];
            const districtOptions = data.map((ct) => ({
                label: ct.name,
                value: ct.code,
            }));

            setDistrict(districtOptions);
        };
        fetchDistrict();
    }, [filter]);

    // Fetch commune when district change
    useEffect(() => {
        const fetchCommune = async () => {
            if (filter.districtCode === null) return;
            const Commune = await axios.get(
                `https://provinces.open-api.vn/api/d/${filter.districtCode}/?depth=2`
            );

            const data = Commune.data.wards || [];
            const communeOptions = data.map((ct) => ({
                label: ct.name,
                value: ct.code,
            }));

            setCommune(communeOptions);
        };
        fetchCommune();
    }, [filter]);



    const { checkList } = useSelector((state) => state.checkList);
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loadding, success, order } = orderCreate;

    const handleQuantityChange = (id, quantity) => {
        dispatch(selectQuantity({ id, quantity }));
    };

    // handle remove product
    const handleRemoveProduct = (id) => {
        dispatch(removeProduct({ id }));
    };

    const [userOrder, setUserOrder] = useState()


    const [shipState, setshipState] = useState({
        fullName: userInfo?.name,
        phone: userInfo?.phone,
        ship: 'store',
        city: 'Thành Phố Cần Thơ',
        district: 'Ninh Kiều',
        commune: 'Hưng Lợi',
        address: 'Tòa nhà LaptopStore, 30/4',
    })

    const [shipOptions, setShipOption] = useState('store');

    const [checkFrom, setCheckFrom] = useState({
        fullname: {
            value: '',
            isInputValid: true,
            errorMessage: ''
        },
        phone: {
            value: '',
            isInputValid: true,
            errorMessage: ''
        },
        email: {
            value: '',
            isInputValid: true,
            errorMessage: ''
        },
        ship: {
            value: '',
            isInputValid: true,
            errorMessage: ''
        },
        city: {
            value: '',
            isInputValid: true,
            errorMessage: ''
        },
        district: {
            value: '',
            isInputValid: true,
            errorMessage: ''
        },
        commune: {
            value: '',
            isInputValid: true,
            errorMessage: ''
        },
        address: {
            value: '',
            isInputValid: true,
            errorMessage: ''
        },

    });
    const [check, setCheck] = useState({
        fullname: '' || userInfo?.name,
        phone: '' || userInfo?.phone,
        email: '' || userInfo?.email,
        ship: shipOptions,
        city: true,
        district: true,
        commune: true,
        address: true,
    });

    useEffect(() => {
        const fetchUserOrder = async () => {
            const order = await axios.get(`http://localhost:5000/api/orders/user/${userInfo?._id}`);
            const index = order.data.length;
            if (order.data[index - 1].shipingAddress.ship === 'home') {
                const data = order.data[index - 1].shipingAddress || [];
                setUserOrder(data);
            }
        }
        fetchUserOrder();
    }, [userInfo?._id]);




    function FormError(props) {
        if (props.isHidden) { return null; }
        return (<div className="form-error">{props.errorMessage}</div>)
    }

    const validateInput = (type, checkingText, id) => {
        if (type === "phone") {
            const regexp = /^\d{9}$/;
            const checkingResult = regexp.exec(checkingText);
            if (checkingResult) {
                setshipState({ ...shipState, phone: checkingText })
                setCheckFrom({
                    ...checkFrom,
                    phone: {
                        isInputValid: true,
                        errorMessage: '',
                    }
                })
                setCheck({ ...check, phone: true, });
            } else {
                setCheckFrom({
                    ...checkFrom,
                    phone: {
                        isInputValid: false,
                        errorMessage: 'SĐT gồm 9 chữ số sau 0...'
                    }
                })
                setCheck({ ...check, phone: false });
            }
        }
        if (type === "email") {
            const regexp = /([a-zA-Z0-9_/./-])+@gmail.com/g;
            const checkingResult = regexp.exec(checkingText);
            if (checkingResult) {
                setshipState({ ...shipState, email: checkingText })
                setCheckFrom({
                    ...checkFrom,
                    email: {
                        isInputValid: true,
                        errorMessage: '',
                    }
                })
                setCheck({ ...check, email: true });
            } else {
                setCheckFrom({
                    ...checkFrom,
                    email: {
                        isInputValid: false,
                        errorMessage: 'Email không đúng định dạng'
                    }
                })
                setCheck({ ...check, email: false });
            }
        }
        if (type === "checknull") {
            if (checkingText) {
                setshipState({ ...shipState, [id]: checkingText })
                setCheckFrom({
                    ...checkFrom,
                    [id]: {
                        isInputValid: true,
                        errorMessage: '',
                    }
                })
                setCheck({ ...check, [id]: true });
            } else {
                setCheckFrom({
                    ...checkFrom,
                    [id]: {
                        isInputValid: false,
                        errorMessage: 'Vui lòng điền ở đây'
                    }
                })
                setCheck({ ...check, [id]: false });
            }
        }
    }

    const handleShipStore = () => {
        setShipOption('store');
        setCheck({
            ...check,
            city: true,
            district: true,
            commune: true,
            address: true,
        });

        setshipState({
            ...shipState,
            ship: 'store',
            city: 'Thành Phố Cần Thơ',
            district: 'Ninh Kiều',
            commune: 'Hưng Lợi',
            address: 'Tòa nhà LaptopStore, 30/4',
        })
    }

    const handleShipHome = () => {
        setShipOption('home');
        setCheck({
            ...check,
            city: '' || userOrder?.city,
            district: '' || userOrder?.district,
            commune: '' || userOrder?.commune,
            address: '' || userOrder?.address,
        });
        setshipState({
            ...shipState,
            ship: 'home',
            city: '' || userOrder?.city,
            district: '' || userOrder?.district,
            commune: '' || userOrder?.commune,
            address: '' || userOrder?.address,
        })
    }
    const today = new Date();

    const handelFormSubmit = (e) => {
        e.preventDefault();
        if (userInfo) {

            let checkKey = 0;

            for (const [key, value] of Object.entries(check)) {
                if (!value) {
                    setCheckFrom({
                        ...checkFrom,
                        [key]: {
                            isInputValid: false,
                            errorMessage: 'Vui lòng điền ở đây!'
                        }
                    });
                }
                if (value) {
                    checkKey += 1;
                }
            }
            if (checkKey === 8) {
                setIsPending(true);
                setTimeout(() => {
                    dispatch(createCheckOut({
                        orderItems: checkList,
                        shipingAddress: {
                            ...shipState,
                        },
                        totalPrice: total,
                        status: 'pending',
                        userId: userInfo?._id,
                        createdAt: moment(today).format(),
                        updatedAt: moment(today).format(),
                    }));

                    toast.success('Đã đặt hàng thành công 👌👌', {
                        ...TOAST_OPTIONS,
                    });
                    setIsPending(false);
                    setcheckOutModal(false);
                    dispatch(cartEmpty());
                    checkKey = 0;
                    clearTimeout();
                }, 2000);
            }
        } else {
            toast.warn('Vui lòng đăng nhập để đặt hàng!!', {
                ...TOAST_OPTIONS,
            })
        }

    }

    const onCityFilter = ({ target }) => {
        const obj = JSON.parse(target.value);
        setFilter({ ...filter, cityCode: obj.value });
        validateInput("checknull", obj.label, "city")
        // setshipState({ ...shipState, city: obj.label });
    }
    const onDistrictFilter = ({ target }) => {
        const obj = JSON.parse(target.value);
        setFilter({ ...filter, districtCode: obj.value });
        validateInput("checknull", obj.label, "district");
        // setshipState({ ...shipState, district: obj.label });
    }
    const total = checkList.reduce(
        (sum, product) =>
            sum +
            product.price *
            product.quantity,
        0
    );

    useEffect(() => {
        if (success) {
            // props.history.push('/');
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);

    const handleCloseModal = () => {
        setLoadingcheckbox(true);
        setcheckOutModal(false)
    }

    return (
        <div className="modal__product-check">
            <div className="modal__wrapper">
                <div className="modal__box">
                    {loadingcheckbox ? <LoadingBox /> :
                        <div className="modal__card">
                            <div className="card-title">
                                Có {checkList.length} sản phẩm trong giỏ hàng
                                <span onClick={handleCloseModal} id="modal__close" className="modal-close">X</span>
                            </div>

                            {
                                checkList.length === 0 && (
                                    <div className="txt-center">
                                        <img src={cartEmty} alt="" />
                                    </div>
                                )
                            }{
                                checkList.length > 0 && (
                                    <div className="card-body">
                                        <div className="card-product">
                                            <CheckoutList
                                                checkList={checkList}
                                                onQuantityChange={handleQuantityChange}
                                                onProductRemove={handleRemoveProduct}
                                            />
                                        </div>

                                        <div className="card-center">
                                            <div className="card-total">
                                                <div className="cart-total-normal">
                                                    <p>Tạm tính:</p>
                                                    <p>{numberWithCommas(total)} ₫</p>
                                                </div>
                                                <div className="cart-total-price">
                                                    <p>Cần thanh toán: </p>
                                                    <p>{numberWithCommas(total)} ₫</p>
                                                </div>
                                            </div>
                                        </div>
                                        <form className="form" onSubmit={handelFormSubmit}>
                                            <div className="card-form">
                                                <div className="card-form-block">
                                                    <h1>Thông tin khách hàng</h1>
                                                    <div className="card-form-center">
                                                        <div className="card-form-info">
                                                            <div>
                                                                <InputField
                                                                    type="text"
                                                                    name="fullname"
                                                                    placeholder="Nhập Họ và Tên*"
                                                                    defaultValue={'' || userInfo?.name}
                                                                    className="mr-10"
                                                                    onChange={(e) => validateInput("checknull", e.target.value, "fullname")}

                                                                />
                                                                <FormError
                                                                    isHidden={checkFrom.fullname.isInputValid}
                                                                    errorMessage={checkFrom.fullname.errorMessage}
                                                                />
                                                            </div>
                                                            <div>
                                                                <InputField
                                                                    type="text"
                                                                    name="phone"
                                                                    placeholder="Nhập Số điện thoại"
                                                                    defaultValue={'' || userInfo?.phone}
                                                                    onChange={(e) => validateInput("phone", e.target.value, "phone")}
                                                                />
                                                                <FormError
                                                                    isHidden={checkFrom.phone.isInputValid}
                                                                    errorMessage={checkFrom.phone.errorMessage}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <InputField
                                                                type="email"
                                                                name="email"
                                                                placeholder="Nhập Email"
                                                                defaultValue={'' || userInfo?.email}
                                                                onChange={(e) => validateInput("email", e.target.value, "email")}
                                                            />
                                                            <FormError
                                                                isHidden={checkFrom.email.isInputValid}
                                                                errorMessage={checkFrom.email.errorMessage}
                                                            />
                                                        </div>

                                                    </div>
                                                    <h2>Chọn hình thức giao hàng</h2>
                                                    <div className="card-form-ship">
                                                        <div className="form-box-radio">
                                                            <RadioField
                                                                id="shiphome"
                                                                title="Giao hàng tận nơi, miễn phí"
                                                                name="ship"
                                                                type="radio"
                                                                onChange={handleShipHome}
                                                            />
                                                        </div>
                                                        <div className="form-box-radio">
                                                            <RadioField
                                                                id="shipshop"
                                                                title="Nhận tại cửa hàng"
                                                                name="ship"
                                                                type="radio"
                                                                defaultChecked={true}
                                                                onChange={handleShipStore}
                                                            />
                                                        </div>
                                                    </div>
                                                    {shipOptions === 'home' && (
                                                        <div className="card-form-ship-address">
                                                            <div className="card-form-inner">
                                                                <div className="box__select ship-address-city">
                                                                    <SelectField
                                                                        label
                                                                        name="Thành Phố" //lable name
                                                                        id="city"
                                                                        options={city}
                                                                        defaultOption={userOrder?.city || "--Chọn Thành Phố--"}
                                                                        onChange={onCityFilter}
                                                                    />
                                                                    <FormError
                                                                        isHidden={checkFrom.city.isInputValid}
                                                                        errorMessage={checkFrom.city.errorMessage}
                                                                    />
                                                                </div>
                                                                <div className=" box__select ship-address-district">
                                                                    <SelectField
                                                                        label
                                                                        name="Quận/Huyện" //lable name
                                                                        id="district"
                                                                        options={district}
                                                                        defaultOption={userOrder?.district || "--Chọn Quận/Huyện--"}
                                                                        onChange={onDistrictFilter}
                                                                    />
                                                                    <FormError
                                                                        isHidden={checkFrom.district.isInputValid}
                                                                        errorMessage={checkFrom.district.errorMessage}
                                                                    />
                                                                </div>
                                                            </div>


                                                            <div className="box__select ship-address-commune">
                                                                <SelectField
                                                                    label
                                                                    name="Xã/Phường"
                                                                    id="commune"
                                                                    defaultOption={userOrder?.commune || "--Chọn Xã/Phường--"}
                                                                    options={commune}
                                                                    onChange={(e) => validateInput("checknull", JSON.parse(e.target.value).label, "commune")}
                                                                />
                                                                <FormError
                                                                    isHidden={checkFrom.commune.isInputValid}
                                                                    errorMessage={checkFrom.commune.errorMessage}
                                                                />
                                                            </div>

                                                            <div className="ship-address-specific">
                                                                <InputField
                                                                    type="text"
                                                                    name="ship-address"
                                                                    placeholder="Nhập địa chỉ cụ thể*"
                                                                    defaultValue={userOrder?.address || ''}
                                                                    onChange={(e) => validateInput("checknull", e.target.value, "address")}
                                                                />
                                                                <FormError
                                                                    isHidden={checkFrom.address.isInputValid}
                                                                    errorMessage={checkFrom.address.errorMessage}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                    {shipOptions === 'store' &&
                                                        <div className="ship-address-specific">
                                                            <p>
                                                                <b>Địa chỉ cửa hàng: </b>
                                                                <i> Tòa nhà LaptopStore, 30/4, Hưng Lợi, Ninh Kiều, TP. Cần Thơ</i>
                                                            </p>
                                                        </div>
                                                    }

                                                </div>
                                            </div>
                                            <div className="card-checkout">
                                                <button
                                                    type="submit"
                                                >
                                                    {
                                                        isPending ?
                                                            <div className="btn btn-pending"><i className="fas fa-spinner fa-spin"></i> Đang tạo đơn hàng... </div> :
                                                            <div className="btn btn-checkout">Hoàn tất đặt hàng</div>
                                                    }
                                                </button>
                                                <p>Cảm ơn bạn đã đến với cửa hàng của chúng tôi</p>
                                                {loadding && <LoadingBox />}
                                            </div>
                                        </form>
                                    </div>
                                )
                            }

                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default CheckOut;