import { detailProduct } from 'actions/productActions';
import FEcredit from 'assets/logo/fecredit.png';
import VNpay from 'assets/logo/vnpay.png';
import axios from 'axios';
import 'boxicons';
import Helmet from 'components/Helmet';
import LoadingBox from 'components/LoadingBox';
import MessageBox from 'components/MessageBox';
import { TOAST_OPTIONS } from 'constants/productConstants';
import { addToCart } from 'pages/CheckOut/CheckSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import numberWithCommas from 'utils/numberWithCommas';
import ProductCheck from '../CheckOut';
import CommentsList from './component/ProductComments';
import ProductConfig from './component/ProductConfig';
import ProductRating from './component/ProductRating';
import StarRating from './component/ProductRating/StarRating';
import StarRatingList from './component/ProductRating/StarRatingList';
import { addComment } from './component/ProductRating/StarRatingSlice';















const Product = (props) => {
    const dispatch = useDispatch();
    // get id inside URl
    const { id } = useParams();
    const productDetail = useSelector((state) => state.productDetail);
    const { loading, error, product } = productDetail;
    const [isComment, setIsComment] = useState(false);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(null);

    const [configModal, setConfigModal] = useState(false);
    const [checkOutModal, setcheckOutModal] = useState(false);

    const [starRating, setStarRating] = useState([]);
    const [userComments, setUserComments] = useState([]);

    const today = new Date();

    const handleAddProduct = (id, product) => {
        dispatch(addToCart({ id, product }));
        toast.success('Đã thêm sản phẩm vào giỏ hàng', {
            ...TOAST_OPTIONS,
        });
    }

    useEffect(() => {
        dispatch(detailProduct(id));
    }, [dispatch, id]);


    const handleOpenRating = () => {
        const ratingValue = true;
        setRating(ratingValue);
    }

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;


    const handleOnChange = (e) => {
        setComment(e.target.value);
    }
    const handleClickCommet = (productId, comment, userInfo) => {
        if (userInfo) {
            if (comment === '') {
                toast.warn("Comment is null 👌👌");
            } else {
                setIsComment(true);
                return new Promise((resolve) => {
                    setTimeout(() => {
                        dispatch(addComment({ productId, comment, userInfo }))
                        toast.success("Đã thêm bình luận");

                        const cmtAdd = [...userComments];
                        const newUserComment = {
                            productId,
                            userName: userInfo.name,
                            image: userInfo.image,
                            datetime: today,
                            comment,
                        }
                        cmtAdd.push(newUserComment);
                        setUserComments(cmtAdd);
                        resolve(true);
                        setComment('');
                        setIsComment(false);

                        clearTimeout();
                    }, 1000);
                })
            }
        } else {
            toast.warn('Vui lòng đăng nhập để đặt câu hỏi!!', {
                ...TOAST_OPTIONS,
            })
        }
    }

    const [loadingcheckbox, setLoadingcheckbox] = useState(true);

    const ModalCheckOpen = (id, product) => {
        setcheckOutModal(true);
        dispatch(addToCart({ id, product }));
        setTimeout(() => {
            setLoadingcheckbox(false);
            toast.success('Đã thêm sản phẩm vào giỏ hàng', {
                ...TOAST_OPTIONS,
            });

            clearTimeout();
        }, 1000);
    }


    useEffect(() => {
        const fetchStarRating = async () => {
            const rating = await axios.get(`http://localhost:5000/api/rating/${product?._id}`);
            const data = rating.data || [];

            const usercomments = await axios.get(`http://localhost:5000/api/usercmts/${product?._id}`);
            const datacomment = usercomments.data || [];

            setUserComments(datacomment);
            setStarRating(data);
        };

        fetchStarRating();
    }, [product?._id])

    const ratingSum = starRating.reduce(
        (avg, rating) =>
            avg +
            rating.rating
        , 0
    );
    const ratingAvg = ratingSum / starRating.length;

    return (
        <Helmet title="Chi tiết">
            <div>
                {
                    loading ? (<LoadingBox></LoadingBox>) : error ?
                        (<MessageBox variant="danger">{error}</MessageBox>) :
                        (
                            <div className="product">
                                {configModal && <ProductConfig product={product} setConfigModal={setConfigModal} />}
                                {checkOutModal && <ProductCheck setcheckOutModal={setcheckOutModal} loadingcheckbox={loadingcheckbox} setLoadingcheckbox={setLoadingcheckbox} />}
                                <div className="product__detail">
                                    <div className="product__detail-top">
                                        <div className="product__detail-top-name">
                                            <p>
                                                {product.name}
                                                <span>(No.00762458)</span>
                                            </p >
                                        </div >
                                        <a href="#rating">
                                            <div className="product__detail-top-ratting">
                                                <div className="product__detail-top-ratting-star">
                                                    <ProductRating rating={ratingAvg.toFixed(1)} />
                                                </div>
                                                <div className="product__detail-top-ratting-number">
                                                    <i>{starRating.length} đánh giá</i> <br />
                                                    <i>{userComments.length} bình luận </i>
                                                </div>
                                            </div>
                                        </a>
                                    </div >
                                    <div className="product__detail-content">
                                        <div className="product__detail-content-left">
                                            <div className="product__detail-content-left-img">
                                                <img src={product.image} alt="" />
                                            </div>
                                            <div className="product__detail-content-left-config">
                                                <ul>
                                                    <li>
                                                        <box-icon name='laptop' color="#b6bfc7"></box-icon>
                                                        <p>15.6", 1920 x 1080 Pixel, IPS, 144 Hz, Acer ComfyView LED-backlit</p>
                                                    </li>
                                                    <li>
                                                        <box-icon type='solid' name='chip' color="#b6bfc7"></box-icon>
                                                        <p>Intel Core i5-11400H</p>
                                                    </li>
                                                    <li>
                                                        <box-icon type='solid' name='microchip' color="#b6bfc7"></box-icon>
                                                        <p>8 GB, DDR4, 3200 MHz</p>
                                                    </li>
                                                    <li>
                                                        <box-icon name='hdd' color="#b6bfc7"></box-icon>
                                                        <p>SSD 512 GB</p>
                                                    </li>
                                                    <li>
                                                        <box-icon name='barcode-reader' color="#b6bfc7"></box-icon>
                                                        <p>NVIDIA GeForce RTX3050 4GB</p>
                                                    </li>
                                                </ul>
                                                <p className="btn config-detail-modal" onClick={() => setConfigModal(true)}>Xem chi tiết thông số kỹ thuật</p>
                                            </div>
                                        </div>
                                        <div className="product__detail-content-right">
                                            <div className="product__detail-content-right-price">{numberWithCommas(product.price)} ₫</div>
                                            <div className="product__detail-content-right-uudai">
                                                <p>
                                                    <span><box-icon name='check-circle' type='solid' color='#03fd1e' ></box-icon></span>
                                                    Tặng PMH 200.000đ mua máy in Brother
                                                </p>
                                                <p>
                                                    <span><box-icon name='check-circle' type='solid' color='#03fd1e' ></box-icon></span>
                                                    Giảm đến 300.000đ khi mua bảo hành (rơi vỡ + vào nước) kèm máy
                                                </p>
                                                <p>
                                                    <span><box-icon name='check-circle' type='solid' color='#03fd1e' ></box-icon></span>
                                                    Tặng PMH 100.000đ mua Microsoft 365 Personal/Family/Home & Student khi mua Online đến 31/10
                                                </p>
                                                <p>
                                                    <span><box-icon name='check-circle' type='solid' color='#03fd1e' ></box-icon></span>
                                                    Tặng thêm 1 năm bảo hành chính hãng Acer
                                                </p>
                                            </div>
                                            <h3>Ưu đãi khi thanh toán</h3>
                                            <div className="product__detail-content-right-uudaithanhtoan">
                                                <div>
                                                    <img src={VNpay} alt="" />
                                                    <p>Giảm: 300.000đ</p>
                                                    <i>sản phẩm từ 2Tr</i>
                                                </div>
                                                <div>
                                                    <img src={FEcredit} alt="" />
                                                    <p>Giảm: 200.000đ</p>
                                                    <i>sản phẩm từ 1Tr</i>
                                                </div>
                                            </div>
                                            <div className="product__detail-content-right-pay">
                                                <button
                                                    id="btn-check"
                                                    onClick={() => { ModalCheckOpen(product._id, product) }}
                                                    className="btn-muangay"
                                                >
                                                    Mua ngay
                                                </button>
                                                <button
                                                    to="/product/1"
                                                    className="btn-addtocart"
                                                    onClick={() => { handleAddProduct(product._id, product) }}
                                                >
                                                    Thêm vào giỏ hàng
                                                </button>
                                            </div>
                                            <div className="product__detail-content-right-paygop">
                                                <div>
                                                    <b>TRẢ GÓP 0%</b>
                                                    <p>Duyệt nhanh qua điện thoại</p>
                                                </div>
                                                <div>
                                                    <b>TRẢ GÓP Qua thẻ</b>
                                                    <p>Visa, Master Card, JCB</p>
                                                </div>
                                            </div>
                                        </div >
                                    </div >
                                </div >
                                <div className="product__tongquan">
                                    <h2>Đánh giá chi tiết</h2>
                                    <p>Với ngoại hình tạo nên từ hàng loạt đường nét gai góc, hầm hố; Acer Predator Helios 300 2021 sẽ phù hợp với các bạn game thủ cá tính, muốn khẳng định phong cách mọi lúc mọi nơi. Kết hợp với sức mạnh từ vi xử lý Intel 11th Gen cùng card đồ hoạ RTX 3000 đời mới; sản phẩm sẽ là một cỗ máy chiến đấu thực thụ trên mặt trận tác vụ hiệu năng cao.
                                        Thiết kế gai góc, hoàn thiện cứng cáp
                                        Tuy sở hữu form dáng tổng thể khá tương đồng
                                        với Nitro 5 – một dòng máy phổ thông nổi tiếng của Acer,
                                        nhưng Predator Helios 300 2021 không
                                        vì vậy mà trở nên mờ nhạt. Với những đường nét góc cạnh ở khe
                                        tản nhiệt, nắp máy, v.v. được làm nổi nhờ lớp sơn Xanh Biển,
                                        chiếc máy trông tựa một con robot chiến đấu mà ta thường thấy trong các bộ phim khoa học – viễn tưởng. Cũng nhờ cách thiết kế và phối màu này mà khác với Nitro, Predator Helios 300 2021 tỏ ra nổi bật dù được đặt ở bất kỳ đâu. Với những game thủ không ngại khoe cá tính, ngoại hình của máy sẽ là yếu tố rất đáng cân nhắc.
                                    </p>
                                    <img src={product.image} alt="" />
                                    <p>Với ngoại hình tạo nên từ hàng loạt đường nét gai góc, hầm hố; Acer Predator Helios 300 2021 sẽ phù hợp với các bạn game thủ cá tính, muốn khẳng định phong cách mọi lúc mọi nơi. Kết hợp với sức mạnh từ vi xử lý Intel 11th Gen cùng card đồ hoạ RTX 3000 đời mới; sản phẩm sẽ là một cỗ máy chiến đấu thực thụ trên mặt trận tác vụ hiệu năng cao.
                                        Thiết kế gai góc, hoàn thiện cứng cáp
                                        Tuy sở hữu form dáng tổng thể khá tương đồng
                                        với Nitro 5 – một dòng máy phổ thông nổi tiếng của Acer,
                                        nhưng Predator Helios 300 2021 không
                                        vì vậy mà trở nên mờ nhạt. Với những đường nét góc cạnh ở khe
                                        tản nhiệt, nắp máy, v.v. được làm nổi nhờ lớp sơn Xanh Biển,
                                        chiếc máy trông tựa một con robot chiến đấu mà ta thường thấy trong các bộ phim khoa học – viễn tưởng. Cũng nhờ cách thiết kế và phối màu này mà khác với Nitro, Predator Helios 300 2021 tỏ ra nổi bật dù được đặt ở bất kỳ đâu. Với những game thủ không ngại khoe cá tính, ngoại hình của máy sẽ là yếu tố rất đáng cân nhắc.
                                    </p>
                                    <img src={product.image} alt="" />
                                    <div id="rating"></div>
                                </div>

                                <div className="product__box-vote">
                                    <div className="box-vote-head">
                                        <div className="box-vote-head-left">
                                            <div className="vote-title">
                                                <h1>Đánh giá của khách hàng</h1>
                                                <span className="numbers">{starRating.length}</span>
                                            </div>
                                            <div className="vote-tb">
                                                <p>Đánh giá trung bình</p>
                                                <div className="vote">
                                                    <div className="star-number">{ratingAvg ? ratingAvg.toFixed(1) : 0}</div>
                                                    <ProductRating rating={ratingAvg} />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-vote" onClick={handleOpenRating}>Viết đánh giá</button>
                                    </div>

                                    {rating && <StarRating productId={product._id} userInfo={userInfo} dateTime={today} starRating={starRating} setStarRating={setStarRating} />}
                                    <div className="product__box-vote-list">
                                        <StarRatingList starRating={starRating} />
                                    </div>
                                </div>
                                <div id="comment" className="product__comment">
                                    <div className="product__comment-top">
                                        <div className="product__comment-top-head">
                                            <h1>Bình luận</h1>
                                            <span className="numbers">{userComments.length}</span>
                                        </div>
                                        <div className="product__comment-top-write">
                                            <textarea type="text" placeholder="Viết câu hỏi của bạn" value={comment} onChange={handleOnChange} />
                                            <button onClick={() => handleClickCommet(product._id, comment, userInfo)}>
                                                {isComment && <i className="fas fa-spinner fa-spin"></i>} Gửi
                                            </button>
                                        </div>
                                    </div>
                                    <CommentsList userComments={userComments} />
                                </div>
                            </div >
                        )
                }

            </div >
        </Helmet >

    )
}


export default Product



