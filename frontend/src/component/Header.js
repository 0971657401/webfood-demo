import React, { useState } from 'react';
import logo from '../assest/logo.png';
import { Link } from 'react-router-dom';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { BsCartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import toast from 'react-hot-toast';
import Product from '../page/Product';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast('Đăng xuất thành công');
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
        <Link to="/">
          <div className="h-40">
            <img src={logo} alt="Logo" className="h-full" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
        <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
          <Link to="/">Trang chủ </Link>
          <Link to="/product">Sản phẩm</Link> {/* Đảm bảo liên kết đúng */}
          <Link to="/about">Giới thiệu </Link>
          <Link to="/contact">Liên hệ</Link>
        </nav>

          <div className="text-2xl text-slate-600 relative">
            <Link to="/cart">
              <BsCartFill />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                {cartItemNumber.length.toLocaleString()}
              </div>
            </Link>
          </div>
          <div className="text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} alt="User" className="h-full w-full" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link to="/newproduct" className="whitespace-nowrap cursor-pointer">
                    Sản phẩm mới
                  </Link>
                )}
                {userData.image ? (
                  <p
                    className="cursor-pointer text-white px-2 py-1 bg-red-500"
                    onClick={handleLogout}
                  >
                    Đăng xuất ({userData.firstName})
                  </p>
                ) : (
                  <Link to="/login" className="whitespace-nowrap cursor-pointer">
                    Đăng nhập
                  </Link>
                )}
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to="/" className="px-2 py-1">
                    Trang chủ
                  </Link>
                  <Link to="/product" className="px-2 py-1">
                    Sản phẩm
                  </Link>
                  <Link to="/about" className="px-2 py-1">
                    Giới thiệu
                  </Link>
                  <Link to="/contact" className="px-2 py-1">
                    Liên hệ
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
