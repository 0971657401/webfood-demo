import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './component/Header'; // Đảm bảo đường dẫn đúng với vị trí của Header.js
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setDataProduct } from './redux/productSlide'; // Đảm bảo đường dẫn đúng với vị trí của productSlide.js
import Home from './page/Home'; // Cập nhật đường dẫn nếu cần
import Product from './page/Product'; // Cập nhật đường dẫn nếu cần
import Menu from './page/Menu'; // Cập nhật đường dẫn nếu cần
import Contact from './page/Contact'; // Cập nhật đường dẫn nếu cần
import About from './page/About'; // Cập nhật đường dẫn nếu cần
import Cart from './page/Cart'; // Cập nhật đường dẫn nếu cần
import Login from './page/Login';
import NewProduct from './page/Newproduct'
import SignUp from './page/Signup'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
        if (!res.ok) {
          throw new Error('Failed to fetch product data');
        }
        const resData = await res.json();
        console.log('Fetched Product Data:', resData);
        dispatch(setDataProduct(resData));
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu/:id" element={<Menu />} />
            <Route path="/product" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/newproduct" element={<NewProduct />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<h1>404 - Not Found</h1>} /> {/* Route cho trang 404 */}
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
