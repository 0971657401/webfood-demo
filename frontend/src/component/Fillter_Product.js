import React from 'react';
import { CiForkAndKnife } from 'react-icons/ci';

const Fillter_Product = ({ category, onClick, isActive }) => {
  return (
    <div onClick={onClick}>
      <div className={`text-3xl p-5 rounded-full cursor-pointer ${isActive ? "bg-red-500 text-white" : "bg-yellow-500"}`}>
        <CiForkAndKnife />
      </div>
      <p className='text-center font-medium my-1 capitalize'>{category}</p>
    </div>
  );
};

export default Fillter_Product;
