import { listProducts } from 'actions/productActions'
import category from 'assets/fake-data/category'
import price from 'assets/fake-data/price'
import CheckBox from 'components/CheckBox'
import Helmet from 'components/Helmet'
import LoadingBox from 'components/LoadingBox'
import MessageBox from 'components/MessageBox'
import ProductCard from 'components/ProductCard'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'



const Catalog = (props) => {

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    const initFilter = {
        category: [],
        price: [],
    }


    const [productCate, setProductCate] = useState([]);
    // useEffect(() => {
    //     setProductCate(products);
    // }, [products]);

    const [filter, setFilter] = useState(initFilter);

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case "CATEGORY":
                    //set brand vào filter
                    setFilter({ ...filter, category: [...filter.category, item.brand] })
                    break
                case "PRICE":
                    setFilter({ ...filter, price: [item.start_price, item.end_price] })
                    break
                default:
            }
        }
        else {
            switch (type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter(e => e !== item.brand)
                    setFilter({ ...filter, category: newCategory })
                    break
                case "PRICE":
                    const newPrice = filter.price.filter(e => e !== item.start_price, item.end_price)
                    setFilter({ ...filter, price: newPrice })
                    break
                default:

            }
        }
    }


    useEffect(() => {
        let temp = products
        // console.log(temp);

        if (filter.category.length > 0) {
            //duyệt qua từng phần tử
            // console.log(filter.category)
            temp = temp.filter(e => filter.category.includes(e.category))
        }
        if (filter.price.length === 2 && filter.price[0] > 0 && filter.price[1] > 1) {
            let [start, end] = filter.price;

            // console.log(start, end)
            temp = temp.filter(e => (e.price > start && e.price <= end))
            // console.log(filter.price.length)
        }
        else {
            filter.price = []
        }

        if (filter.category.length === 0 && filter.price.length === 0) {
            temp = products
        }

        setProductCate(temp);
    }, [filter, products])


    return (
        <Helmet title="Sản phẩm">
            <div>
                {
                    loading ? (<LoadingBox></LoadingBox>) : error ?
                        (<MessageBox variant="danger">{error}</MessageBox>) :
                        (
                            <div className="catalog">

                                <div className="catalog__filter">

                                    <div className="catalog__filter__widget">
                                        <div className="catalog__filter__widget__title">
                                            Thương hiệu
                                        </div>

                                        <div className="catalog__filter__widget__content">
                                            {
                                                category.map((item, index) => (
                                                    <div key={index} className="catalog__filter__widget__content__item">
                                                        <CheckBox label={item.brand}
                                                            onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    <div className="catalog__filter__widget">
                                        <div className="catalog__filter__widget__title">
                                            Mức giá
                                        </div>

                                        <div className="catalog__filter__widget__content">
                                            {
                                                price.map((item, index) => (
                                                    <div key={index} className="catalog__filter__widget__content__item">
                                                        <CheckBox label={item.display}
                                                            onChange={(input) => filterSelect("PRICE", input.checked, item)} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>

                                </div>

                                <div className="catalog__content">
                                    {
                                        productCate &&
                                        <ProductCard
                                            products={productCate}
                                            col={3}
                                            currentPage={0}
                                            postsPerPage={0}
                                        />
                                    }
                                </div>
                            </div>
                        )
                }
            </div>
        </Helmet>
    )

}

export default Catalog
