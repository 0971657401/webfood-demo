import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AllProduct from '../component/AllProduct';
import { addCartItem } from '../redux/productSlide';

const Menu = () => {
  const { id } = useParams();
  const productData = useSelector(state => state.product.productList);
  const productDisplay = productData.find(el => el._id === id); // Hoặc el._id nếu bạn sử dụng _id

  const dispatch = useDispatch();

  // Kiểm tra và log sản phẩm được tìm thấy
  console.log(productDisplay);

  // Xử lý thêm sản phẩm vào giỏ hàng
  const handleAddCartProduct = () => {
    if (productDisplay) {
      dispatch(addCartItem(productDisplay));
    }
  };

  // Xử lý trường hợp không tìm thấy sản phẩm
  if (!productDisplay) {
    return <p>Xin chờ trong giây lát...</p>; // Bạn có thể tùy chỉnh nội dung này
  }

  return (
    <div className='p-2 md:p-4'>
      <div className='w-full max-w-4xl m-auto md:flex bg-white'>
        <div className="max-w-sm overflow-hidden w-full p-5">
          <img src={productDisplay.image} className="hover:scale-105 transition-all h-full" alt={productDisplay.name} />
        </div>
        <div className='flex flex-col gap-1'>
          <h3 className="font-semibold text-slate-600 capitalize text-lg md:text-4xl">
            {productDisplay.name}
          </h3>
          <p className="text-slate-500 text-2xl font-medium">{productDisplay.category}</p>
          <p className="font-bold md:text-2xl">
            <span>{productDisplay.price}</span>
            <span className="text-red-500">VND</span>
            
          </p>
          <div className='flex gap-3'>
            <button className='bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full min-w-[100px]'>Mua</button>
            <button onClick={handleAddCartProduct} className='bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full min-w-[150px]'>Thêm vào giỏ</button>  
          </div>
          <div className='text-slate-600 font-medium'>
            <p>Mô tả: </p>
            <p>{productDisplay.description}</p>
          </div>
        </div>
      </div>
      <AllProduct heading={"Các sản phẩm liên quan"} />
    </div>
  );
};

export default Menu;
