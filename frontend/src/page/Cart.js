import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../component/cartProduct'
import emptyCartImage from "../assest/empty.gif"

const Cart = () => {
    const productCartItem = useSelector((state)=>state.product.cartItem)
    const totalPrice = productCartItem.reduce(
        (acc, curr) => acc + parseInt(curr.total),
        0
      );
      const totalQty = productCartItem.reduce(
        (acc, curr) => acc + parseInt(curr.qty),
        0
      );
  return (
    <>
        <div className='p-2 md:p-4'>
            <h2 className='text-lg md:text-2xl font-bold text-slate-600'> Giỏ hàng của bạn </h2>
            {productCartItem[0] ?
            <div className='my-4 flex gap-3'>
                {/* display cart items */}
                <div className='w-full max-w-3xl'> 
                    {
                        productCartItem.map(el => {
                            return(
                                <CartProduct 
                                    key = {el.id}
                                    id = {el.id}
                                    name = {el.name}
                                    image = {el.image}
                                    category = {el.category}
                                    price = {el.price}
                                    qty = {el.qty}
                                    total = {el.total}
                                />
                            )
                        })
                    }
                </div>
                {/* total cart items */}
                <div className='w-full max-w-md  ml-auto'>
                    <h2 className='bg-blue-500 text-white p-2 text-lg'>Chi tiết hóa đơn</h2>

                    <div className="flex w-full py-2 text-lg border-b">
                        <p>Tổng số lượng</p>
                        <p className="ml-auto w-32 font-bold">
                            {totalQty}
                        </p>
                    </div>
                    <div className='flex w-full py-2 text-lg border-b'>
                        <p>Tổng tiền</p>
                        <p className="ml-auto w-32 font-bold">
                            {totalPrice}
                            <span className="text-red-500">VND</span>
                        </p>
                    </div>
                    <button className="bg-red-500 w-full text-lg font-bold py-2 text-white">
                        Thanh toán
                    </button>
                </div>
            </div>
            :
            <>
                <div className="flex w-full justify-center items-center flex-col">
                    <img src={emptyCartImage} className="w-full max-w-sm"/>
                    <p className="text-slate-500 text-3xl font-bold py-5">
                        Giỏ hàng trống
                    </p>
                </div>
            </>
            }
        </div>
    </>
  )
}

export default Cart