import cartEmty from 'assets/images/empty-cart.png';
import { Link } from 'react-router-dom';
import numberWithCommas from 'utils/numberWithCommas';
import HCartList from './HCartList';

const HeaderPCR = (props) => {
    const {
        userInfo,
        checkList,
        total,
        signoutHandler,

    } = props;








    return (
        <ul className="header__nav-menu-right">
            <li>
                <div className="header__nav-menu-right-item">
                    <Link to="/">
                        <box-icon name='notification' type='solid' color='#434242' ></box-icon>
                    </Link>
                </div>
            </li>
            <li>
                <div className="header__nav-menu-right-item">
                    <Link to="/cart">
                        <span className="header__nav-menu-right-item-sm">{checkList.length}</span>
                        <box-icon name='cart-alt' color='#434242' ></box-icon>
                    </Link>
                    <div className="dropdown-cart">
                        {
                            checkList.length >= 1 && (
                                <div>
                                    <h3>có {checkList.length} sản phẩm trong giỏ hàng</h3>
                                    <HCartList checkList={checkList} />
                                    <p className="txt-center">
                                        <button className="btn-addtocart">
                                            <Link to="/cart" >Giỏ hàng: {numberWithCommas(total)} ₫</Link>
                                        </button>
                                    </p>
                                </div>
                            )}
                        {
                            checkList.length === 0 && (
                                <div className="cart-empty">
                                    <img src={cartEmty} alt="" />
                                    <i>Giỏ hàng của bạn hiện chưa có sản phẩm nào</i>
                                </div>
                            )}
                    </div>
                </div>
            </li>
            <li>
                <div className="header__nav-menu-right-item logged">

                    {
                        userInfo ?
                            (

                                <div>
                                    <div className="btn account btn-avatar">
                                        <Link to="/userinfo">
                                            <img className="avatar" src={userInfo.isAdmin ? userInfo.image : userInfo.image.split('\\').join('/')} alt="" />

                                        </Link>
                                    </div>


                                    <ul className="dropdown-account">
                                        <Link to="/userinfo">
                                            <li>
                                                <p>
                                                    <i className="fas fa-user-cog"></i>
                                                    Tài khoản
                                                </p>
                                            </li>
                                        </Link>
                                        <Link to="/myorder">
                                            <li>
                                                <p>
                                                    <i className="fas fa-history"></i>
                                                    Lịch sử mua hàng
                                                </p>
                                            </li>
                                        </Link>
                                        <Link to="/" onClick={signoutHandler}>
                                            <li>
                                                <p>
                                                    <i className="fas fa-sign-out-alt"></i>
                                                    Đăng xuất
                                                </p>
                                            </li>
                                        </Link>
                                    </ul>
                                </div>
                            ) :
                            (<div>
                                <div className="btn account">
                                    <i><box-icon name='user-circle' color='#434242' ></box-icon></i>
                                </div>

                                <ul className="dropdown-account">
                                    <Link to="/signin">
                                        <li>
                                            <p>
                                                <i className="fas fa-sign-in-alt"></i>
                                                Đăng nhập
                                            </p>
                                        </li>
                                    </Link>
                                    <Link to="/register">
                                        <li>
                                            <p>
                                                <i className="fas fa-user-plus"></i>
                                                Tạo tài khoản
                                            </p>
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                            )
                    }

                </div>
            </li>
        </ul>
    );
};

export default HeaderPCR;