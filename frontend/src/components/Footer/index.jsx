import React from 'react';
import { Link } from 'react-router-dom';

import logo from 'assets/logo/logo_footer.png'
import checkedWeb from 'assets/logo/checked-website.png'

import iconFacebook from 'assets/svg/icon-fb.svg'
import iconYoutube from 'assets/svg/icon-youtube.svg'
import iconTwitter from 'assets/svg/icon-twitter.svg'
import iconInstagram from 'assets/svg/icon-ins.svg'


function Footer(props) {
    const media = [
        {
            _id: 1,
            name: "youtube",
            icon: iconYoutube,
            link: 'http://www.youtube.com'
        },
        {
            _id: 2,
            name: "facebook",
            icon: iconFacebook,
            link: 'http://www.facebook.com'
        },
        {
            _id: 3,
            name: "twitter",
            icon: iconTwitter,
            link: 'http://www.twitter.com'
        },
        {
            _id: 4,
            name: "instagram",
            icon: iconInstagram,
            link: 'http://www.instagrarm.com'
        },

    ]

    const contentFooter = [
        {
            _id: 1,
            title: "Chăm sóc khách hàng",
            list: [
                { name: "Gửi yêu cầu hổ trợ" },
                { name: "Hướng dẫn đặt hàng" },
                { name: "Phương thức vận chuyển" },
                { name: "Hỗ trợ khách hàng: hotro@laptopstore.vn" },
            ]
        },
        {
            _id: 2,
            title: "Chính sách",
            list: [
                { name: "Bảo hành" },
                { name: "Vận chuyển" },
                { name: "Thanh toán" },
                { name: "Chính sách đổi trả" },
            ]
        },
        {
            _id: 3,
            title: "Về LaptopStore",
            list: [
                { name: "Giới thiệu về LaptopStore" },
                { name: "Tuyển dụng" },
                { name: "Điều khoản" }
            ]
        },
        {
            _id: 4,
            title: "Họp tác cùng LaptopStore"
            ,
            list: [
                { name: "Quy chế hoạt động Sàn GDTMĐT" },
                { name: "Bán hàng cùng LaptopStore" },
            ]
        },
    ]


    return (
        <div className="footer">
            <div className="container">
                <div className="footer__top">
                    <div className="footer__top-logo">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div className="footer__top-right">
                        <div className="footer__top-right-hotline">
                            <i>Hotline</i>
                            <p>1900.60.1234</p>
                        </div>
                        <div className="footer__top-right-media">
                            {
                                media.map(media => (
                                    <span key={media._id}>
                                        <a
                                            href={media.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                className="footer__top-right-media-icon"
                                                src={media.icon} alt={media.name} />
                                        </a>
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="footer__content">
                    {
                        contentFooter.map((content, index) => (
                            <div
                                key={index}
                                className="footer__content-items"
                            >
                                <div className="footer__content-items-title">
                                    {content.title}
                                </div>
                                <div className="footer__content-items-list">
                                    <Link to="/askquestion" >
                                        <div

                                            className="footer__content-items-list-item"
                                        >
                                            Câu hỏi thường gặp
                                        </div>
                                    </Link>
                                    {content.list.map((item, index) => (
                                        <Link to="/" key={index}>
                                            <div

                                                className="footer__content-items-list-item"
                                            >
                                                {item.name}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
            <div className="footer__bottom">
                <div className="footer__bottom-content">
                    <div className="footer__bottom-content-checkedweb">
                        <img src={checkedWeb} alt="checked" />
                        <p>Công ty TNHH LaptopStore</p>
                    </div>
                    <div className="footer__bottom-content-info">
                        <p>Địa chỉ: Tầng 6,7,8, Tòa nhà trụ sở LaptopStore, Đường 3/2, Quận Nink Kiều, Thành Phố Cần Thơ, Việt Nam. Tổng đài: 1900.60.1234 </p>
                        <p>Chịu Trách Nhiệm Quản Lý Nội Dung: Trần Thái Minh Trí và Nguyễn Thành Tới</p>
                    </div>
                </div>
                <p className="footer__bottom-coppyright">
                    © 2021 LaptopStore. Tất cả các quyền được bảo lưu.
                </p>
            </div>
        </div>
    );
}

export default Footer;
