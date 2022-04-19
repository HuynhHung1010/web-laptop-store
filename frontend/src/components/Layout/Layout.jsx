import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from 'components/Header';
import Footer from 'components/Footer';
import Routes from 'routes/Routes';
import Signin from 'pages/Signin/Signin';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Register from 'pages/Register/Register';

function Layout() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/signin" component={Signin} />
                <Route path="/register" component={Register} />
                <Route render={props => (
                    <div>
                        <div className="container">
                            <Header {...props} />
                            <div className="main">
                                <Routes />
                            </div>
                        </div>
                        <Footer />
                    </div>
                )} />
            </Switch>

            <ToastContainer style={{ fontSize: 15 }} />
        </BrowserRouter>

    );
}

export default Layout;