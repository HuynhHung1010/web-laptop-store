import React from 'react';
import askquest from 'assets/images/askquestion.png';

const AskQuestion = () => {

    const data = [
        {
            id: 1,
            question: '[Thành viên mới] Làm sao để mua hàng / đặt hàng?',
            answer: 'Trước khi đặt mua sản phẩm, bạn cần: Đăng ký và đăng nhập thành công một tài khoản Shopee hợp lệ, đồng thời tài khoản này cần được xác minh/cập nhật các thông tin cá nhân cần thiết(số điện thoại, và hoặc địa chỉ nhận hàng hợp lệ trong lãnh thổ Việt Nam) để có thể đặt được hàng'
        },
        {
            id: 2,
            question: 'Mua Laptop được bảo hành như thế nào?',
            answer: 'Để đảm bảo quyền lợi của quý khách hàng khi mua sản phẩm tại các cửa hàng thuộc hệ thống cửa hàng LapTopStore. Chúng tôi cam kết tất cả các sản phẩm được tuân theo các điều khoản bảo hành của sản phẩm tại thời điểm xuất hóa đơn cho quý khách hàng. Các sản phẩm điện thoại sẽ có chính sách bảo hành khác nhau tùy thuộc vào hãng sản xuất. Khách hàng có thể bảo hành máy tại các cửa hàng LapTopStore trên toàn quốc cũng như các trung tâm bảo hành chính hãng sản phẩm.'
        },
        {
            id: 3,
            question: 'LapTopStore có chính sách giao hàng tận nhà không? Nếu giao hàng tại nhà mà không ưng sản phẩm có được trả lại không?',
            answer: 'LapTopStore cam kết giao hàng toàn bộ 63 tỉnh thành, LapTopStore nhận giao đơn hàng có thời gian hẹn giao tại nhà trước 20h00. Miễn phí giao hàng với các đơn hàng trong bán kính 20km có đặt shop (Với đơn hàng có giá trị nhỏ hơn 100.000đ sẽ thu phí 10.000đ) nhân viên LapTopStore sẽ tư vấn chi tiết về cách thức giao nhận thuận tiện nhất.'
        },
        {
            id: 4,
            question: 'Mua sản phẩm tại LaptopStore có được đổi trả không? Nếu được thì phí đổi trả sẽ được tính như thế nào?',
            answer: 'Đối với các sản phẩm ĐTDĐ, MTB, MTXT, SMARTWATCH (Áp dụng bao gồm các sản phẩm Apple), sản phẩm cùng model, cùng màu, cùng dung lượng. Trong tình huống sản phẩm đổi hết hàng, khách hàng có thể đổi sang một sản phẩm khác tương đương hoặc cao hơn về giá trị so với sản phẩm lỗi. Trường hợp khách hàng muốn trả sản phẩm: LaptopStore sẽ kiểm tra tình trạng máy và thông báo đến Khách hàng về giá trị thu lại sản phẩm ngay tại cửa hàng.'
        },
    ];

    return (
        <div className="ask-question">
            <div className="content-left">
                <h2>DANH MỤC</h2>
                <ul>
                    <li className="btn">Tài Khoản</li>
                    <li className="btn">Đơn Hàng và Thanh Toán</li>
                    <li className="btn">Đổi Trả</li>
                    <li className="btn">Vận Chuyển</li>
                </ul>
            </div>
            <div className="content-right">
                <h1>CÂU HỎI THƯỜNG GẶP</h1>
                <img src={askquest} alt="" />
                <div className="content">
                    {
                        data.map((item, index) => (

                            <div key={index} className="item">
                                <div className="item-title">
                                    <h3>{item.id}. {item.question}</h3>
                                </div>
                                <div className="item-body">
                                    <p>{item.answer}</p>
                                    <a
                                        target="_blank"
                                        href="https://fptshop.com.vn/ho-tro/cau-hoi-thuong-gap"
                                        rel="noreferrer"
                                    >
                                        <i class="far fa-hand-point-right"></i> Tham khảo thêm tại đây
                                    </a>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default AskQuestion;