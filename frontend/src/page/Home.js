import React, { useRef } from 'react';
import HomeCard from '../component/HomeCard';
import { useSelector } from 'react-redux';
import CardFeature from '../component/CardFeature';
import { GrPrevious, GrNext } from 'react-icons/gr';
import AllProduct from '../component/AllProduct';

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  console.log(productData); // Thêm dòng này để kiểm tra dữ liệu  
  const homProductCartList = productData.slice(1, 5);
  const homProductCartListVegetables = productData ? productData.filter(el => el.category === 'vegetable') : [];
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);
  const slideProductRef = useRef();

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 500;
  };

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 500;
  };

  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>
        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Giao nhanh</p>
            <img src='https://cdn-icons-png.flaticon.com/512/2972/2972185.png' className='h-7' alt='Bike Delivery' />
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-3'>Giao hàng nhanh đến tận <span className='text-red-600'>nhà bạn</span></h2>
          <p className='py-3 text-base'>
          Một trang web giao đồ ăn có tác động không nhỏ đến cuộc sống hiện đại. Trước hết,
          nó mang lại sự tiện lợi và tiết kiệm thời gian rất lớn, cho phép người tiêu dùng dễ dàng đặt hàng bất cứ lúc nào,
          mọi nơi mà không cần phải đến cửa hàng thực tế, cùng với dịch vụ giao hàng nhanh chóng. Ngoài ra,
            trang web cung cấp nhiều lựa chọn ẩm thực đa dạng, từ các món ăn địa phương đến quốc tế,
            đồng thời cho phép khách hàng tùy chỉnh đơn đặt hàng theo sở thích cá nhân của họ.
          </p>
          <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md'>
            Đặt hàng ngay
          </button>
        </div>
        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
          {homProductCartList.length > 0 ? homProductCartList.map(el => (
            <HomeCard
              key={el._id}            // Sửa từ `el.id` thành `el._id`
              id={el._id}             // Đảm bảo id truyền đúng từ API
              image={el.image}
              name={el.name}
              price={el.price}
              category={el.category}
            />
          )) 
          : 
          loadingArray.map((_, index) => {
            return <HomeCard key={index} loading='Đang tải...'/>
          })}
        </div>
      </div>
      {/* <div className=''>
        <div className='flex w-full items-center'>
          <h2 className='font-bold text-2xl text-slate-800 mb-4'>
            Rau tươi - Rau sạch
          </h2>
          <div className='ml-auto flex gap-4'>
            <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious /></button>
            <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext /></button>
          </div>
        </div>
        <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
          {homProductCartListVegetables.length > 0 ? homProductCartListVegetables.map(el => (
            <CardFeature
              key={el._id + "vegetable"}  // Sửa từ `el.id` thành `el._id`
              id={el._id}                 // Đảm bảo id truyền đúng từ API
              image={el.image}
              name={el.name}
              price={el.price}
              category={el.category}
            />
          )) 
          : 
          loadingArrayFeature.map((_, index) => (
            <CardFeature loading='Đang tải...' key={index + "cartLoading"} />
          ))}
        </div>
      </div> */}
      <AllProduct heading={"Sản phẩm dành cho bạn"} />
    </div>
  );
};

export default Home;
