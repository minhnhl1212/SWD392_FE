// src/contexts/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Khởi tạo `cartItems` từ `localStorage` nếu có, nếu không thì là mảng rỗng
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Lưu `cartItems` vào `localStorage` mỗi khi `cartItems` thay đổi
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            const productImage = Array.isArray(product.images) ? product.images[0] : product.images;

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [
                ...prevItems,
                {
                    ...product,
                    image: productImage,
                    quantity: 1,
                },
            ];
        });
    };

    // Hàm tăng số lượng sản phẩm
    const increaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Hàm giảm số lượng sản phẩm (số lượng tối thiểu là 1)
    const decreaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
            )
        );
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const removeItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity, removeItem }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
