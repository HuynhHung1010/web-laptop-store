import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {

    const [active, setActive] = useState('home')


    return (
        <div className="sidebar">
            <div className="sidebar__wrapper">
                <div className="sidebar__wrapper__menu">
                    <div className="menuTitle">Dashboard</div>
                    <ul className="menuList">
                        <Link to="/">
                            <li className={`menuList__item ${active === 'home' ? 'active' : ''}`} onClick={() => setActive('home')}>
                                <i className="fas fa-home menuList__item-icon"></i>
                                <span className="menuList__item-name">Home</span>
                            </li>
                        </Link>
                        <Link to="/users">
                            <li className={`menuList__item ${active === 'users' ? 'active' : ''}`} onClick={() => setActive('users')}>
                                <i className="fas fa-user menuList__item-icon"></i>
                                <span className="menuList__item-name">Users</span>
                            </li>
                        </Link>
                        <Link to="/products">
                            <li className={`menuList__item ${active === 'product' ? 'active' : ''}`} onClick={() => setActive('product')}>
                                <i className="fas fa-store menuList__item-icon"></i>
                                <span className="menuList__item-name">Products</span>
                            </li>
                        </Link>
                        <Link to="/orders">
                            <li className={`menuList__item ${active === 'orders' ? 'active' : ''}`} onClick={() => setActive('orders')}>
                                <i className="fas fa-shopping-cart menuList__item-icon"></i>
                                <span className="menuList__item-name">Orders</span>
                            </li>
                        </Link>
                        <Link to="/analytics">
                            <li className={`menuList__item ${active === 'analytics' ? 'active' : ''}`} onClick={() => setActive('analytics')}>
                                <i className="far fa-chart-bar menuList__item-icon"></i>
                                <span className="menuList__item-name">Analytics</span>
                            </li>
                        </Link>
                        <Link to="/sales">
                            <li className={`menuList__item ${active === 'sales' ? 'active' : ''}`} onClick={() => setActive('sales')}>
                                <i className="fas fa-chart-line menuList__item-icon"></i>
                                <span className="menuList__item-name">Sales</span>
                            </li>
                        </Link>
                    </ul>
                </div>


            </div>
        </div>
    )
}

export default SideBar
