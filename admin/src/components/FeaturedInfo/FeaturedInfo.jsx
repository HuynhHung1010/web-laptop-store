import axios from 'axios';
import React, { useEffect, useState } from 'react'
import numberWithCommas from 'utils/numberWithCommas';

const FeaturedInfo = () => {
    const [totalSales, setTotalSales] = useState();
    const [totalPrice, setTotalPrice] = useState();


    useEffect(() => {
        const fetchDataHome = async () => {
            const sales = await axios.get("/api/dashboard/category");
            const price = await axios.get("/api/dashboard/price");

            const dataSales = sales.data || [];
            const dataPrice = price.data || [];

            setTotalSales(dataSales)
            setTotalPrice(dataPrice)
        };

        fetchDataHome();
    }, []);

    const totalPriceIncom = totalPrice?.reduce((sum, or) => (
        sum + or.total
    ), 0);

    return (
        <div className="featured">

            <div className="featured__item">
                <div className="featured__item-icon">
                    <i className="fas fa-shopping-bag"></i>
                </div>

                <div className="featured__item-content">
                    <span className="featured__item-content-title">
                        Total Sales
                    </span>
                    <span className="featured__item-content-money">{totalSales?.total__category}</span>
                </div>
            </div>

            <div className="featured__item">
                <div className="featured__item-icon">
                    <i className="fas fa-dollar-sign"></i>
                </div>

                <div className="featured__item-content">
                    <span className="featured__item-content-title">
                        Total Income
                    </span>
                    <span className="featured__item-content-money">
                        {totalPriceIncom ? numberWithCommas(totalPriceIncom) : '0'} VNĐ
                    </span>
                </div>
            </div>

            <div className="featured__item">
                <div className="featured__item-icon">
                    <i className="fas fa-shopping-basket"></i>
                </div>

                <div className="featured__item-content">
                    <span className="featured__item-content-title">
                        Total Orders
                    </span>
                    <span className="featured__item-content-money">{totalSales?.totalOrders}</span>
                </div>
            </div>

        </div>
    )
}

export default FeaturedInfo
