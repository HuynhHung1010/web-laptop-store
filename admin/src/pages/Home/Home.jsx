import Chart from 'components/Chart/Chart'
import FeaturedInfo from 'components/FeaturedInfo/FeaturedInfo'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ProcessBar from 'components/ProcessBar';


const Home = () => {
    const [category, setCategory] = useState();
    const [price, setPrice] = useState();

    useEffect(() => {
        const fetchCategoryCount = async () => {
            const category = await axios.get('api/dashboard/category')
            const dataCate = category.data || [];

            const price = await axios.get('api/dashboard/price')
            const dataPrice = price.data || [];
            let priceOption = [];
            dataPrice.forEach(data => {
                if (data._id.status === 'receved') {
                    priceOption = [...priceOption,
                    {
                        name: data._id.month,
                        totalPrice: data.total
                    }
                    ]

                }
            })

            setCategory(dataCate);
            setPrice(priceOption);
        }
        fetchCategoryCount();
    }, []);

    document.title = "Admin - Home"
    return (

        <div className="home">
            <FeaturedInfo />
            <Chart data={price} title="Price Analytics " gird dataKey="totalPrice" />

            <div className="total__category">
                <div className="total__category-title">
                    <h1>Category Sales</h1>
                </div>
                {
                    category && category.result.map((item, index) => (
                        <div key={index} className="total__category-process">
                            <ProcessBar process={(item.value / category.total__category * 100).toFixed(2)} />
                            <p>{item.title}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home
