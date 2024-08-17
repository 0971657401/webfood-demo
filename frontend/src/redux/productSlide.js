import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    productList: [],
    cartItem: []
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            state.productList = [...action.payload];
        },
        addCartItem: (state, action) => {
            console.log("Adding item to cart:", action.payload);

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa dựa trên `name`
            const existingProduct = state.cartItem.find(item => item.name === action.payload.name);

            if (!existingProduct) {
                // Tạo id duy nhất nếu không tồn tại
                const product = {
                    ...action.payload,
                    id: action.payload.id || uuidv4()
                };
                // console.log("Processed product:", product);
                const total = product.price;
                state.cartItem = [
                    ...state.cartItem,
                    {
                        ...product,
                        qty: 1,
                        total: total
                    }
                ];
                toast("Đã thêm sản phẩm thành công!");
            } else {
                toast("Bạn đã thêm sản phẩm này rồi! ");
            }
        },
        deleteCartItem: (state, action) => {
            toast("Một sản phẩm đã được xóa");
            const index = state.cartItem.findIndex(el => el.id === action.payload);
            if (index >= 0) {
                state.cartItem.splice(index, 1);
                console.log(index);
            }
        },
        increaseQty: (state, action) => {
            const index = state.cartItem.findIndex(el => el.id === action.payload);
            if (index >= 0) {
                let item = state.cartItem[index];
                item.qty += 1;
                item.total = item.qty * item.price; // Cập nhật tổng tiền dựa trên số lượng mới
            }
        },
        decreaseQty: (state, action) => {
            const index = state.cartItem.findIndex(el => el.id === action.payload);
            if (index >= 0) {
                let item = state.cartItem[index];
                if (item.qty > 1) {
                    item.qty -= 1;
                    item.total = item.qty * item.price; // Cập nhật tổng tiền dựa trên số lượng mới
                }
            }
        }
    }
});

export const { setDataProduct, addCartItem, deleteCartItem, increaseQty, decreaseQty } = productSlice.actions;
export default productSlice.reducer;
