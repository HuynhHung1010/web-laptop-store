import SideBar from 'components/SideBar/SideBar';
import TopBar from 'components/TopBar/TopBar';
import Comment from 'pages/Comment/Comment';
import CreateProduct from 'pages/CreateProduct/CreateProduct';
import Home from 'pages/Home/Home';
import OrderList from 'pages/OrderList';
import Product from 'pages/Product/Product';
import ProductList from 'pages/ProductList/ProductList';
import Rating from 'pages/Rating/Rating';
import Register from 'pages/Register/Register';
import User from 'pages/User/User';
import UserList from 'pages/UserList/UserList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './sass/index.scss';



function App() {
  return (
    <BrowserRouter>


      <TopBar />
      <div className="container">
        <SideBar />
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/users" element={<UserList />} />
          <Route path="/orders" element={<OrderList />} />

          <Route path="/user/:id" element={<User />} />

          <Route path="/register" element={<Register />} />

          <Route path="/analytics" element={<div style={{ fontSize: '30px' }}>Comming Soon</div>} />
          <Route path="/sales" element={<div style={{ fontSize: '30px' }}>Comming Soon</div>} />


          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />

          <Route path="/createProduct" element={<CreateProduct />} />

          <Route path="/rating/:id" element={<Rating />} />

          <Route path="/comment/:id" element={<Comment />} />


        </Routes>

      </div>

      <ToastContainer style={{ fontSize: 15 }} />

    </BrowserRouter>
  );
}

export default App;
