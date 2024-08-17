import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CardFeature from './CardFeature';
import Fillter_Product from './Fillter_Product';

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  // Đảm bảo `productData` đã được khai báo trước khi sử dụng
  const categoryList = [...new Set(productData.map(el => el.category))];
  const [filterBy, setFilterBy] = useState('');
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);
  const handleFilterProduct = (category) => {
    setFilterBy(category)
    const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase());
    setDataFilter(filter);
  };
  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl text-slate-800 mb-4'>
        {heading}
      </h2>
      <div className='flex gap-4 justify-center overflow-scroll scrollbar-none'>
        {categoryList.length > 0 ? (
          categoryList.map((el, index) => (
            // eslint-disable-next-line react/jsx-pascal-case
            <Fillter_Product
              key={index}
              category={el}
              isActive={el.toLowerCase() === filterBy.toLowerCase() }

              onClick={() => handleFilterProduct(el)}
            />
          ))
        ):(
          <div className='min-h-[150px] flex justify-center items-center'>
            <p>Đang tải...</p>
          </div>
        )}
      </div>
      <div className='flex flex-wrap justify-center gap-4'>
        {dataFilter[0] ? dataFilter.map(el => (
          <CardFeature
            key={el._id}
            id={el._id}
            name={el.name}
            category={el.category}
            price={el.price}
            image={el.image}
          />
        ))
        : 
        loadingArrayFeature.map((el, index) => (
          <CardFeature loading='Đang tải...'key={index + "allProduct"} />
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
