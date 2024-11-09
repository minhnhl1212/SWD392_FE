import React, { useState, useRef } from "react";
import "./../Cart/Cart.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import { useCart } from "../../../context/CartContext";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import CryptoJS from 'crypto-js';


import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,

    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";

import P21 from '/src/assets/Product/21.jpg';

// Dữ liệu giả cho sản phẩm trong giỏ hàng
const fakeData = [
    {
        id: 1,
        name: "Combo xe điều khiển từ xa có camera giám sát",
        description: "DIY",
        quantity: 1,
        price: 5600000000,
        image: P21,
    },
    {
        id: 2,
        name: "Samsung galaxy Note 10",
        description: "256GB, Navy Blue",
        quantity: 1,
        price: 900000, // Sửa lại giá để thử nghiệm
        image: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp"
    },
    // Thêm các sản phẩm khác tại đây
];

const additionalProducts = [
    {
        id: 3,
        quantity : 1,
        title: "Máy tính xách tay ASUS ROG",
        description: "Core i7, 16GB RAM, 512GB SSD",
        price: 25000000,
        image: P21,
    },
    {
        id: 4,
        quantity : 1,
        title: "Tai nghe Sony WH-1000XM4",
        description: "Khử tiếng ồn, Bluetooth",
        price: 7500000,
        image: P21,
    },
    {
        id: 5,
        quantity : 1,
        title: "Máy tính xách tay ASUS ROG",
        description: "Core i7, 16GB RAM, 512GB SSD",
        price: 25000000,
        image: P21,
    },
    {
        id: 6,
        quantity : 1,
        title: "Tai nghe Sony WH-1000XM4",
        description: "Khử tiếng ồn, Bluetooth",
        price: 7500000,
        image: P21,
    },
    {
        id: 7,
        quantity : 1,
        title: "Máy tính xách tay ASUS ROG",
        description: "Core i7, 16GB RAM, 512GB SSD",
        price: 25000000,
        image: P21,
    },
    {
        id: 8,
        quantity : 1,
        title: "Tai nghe Sony WH-1000XM4",
        description: "Khử tiếng ồn, Bluetooth",
        price: 7500000,
        image: P21,
    },
    {
        id: 9,
        quantity : 1,
        title: "Máy tính xách tay ASUS ROG",
        description: "Core i7, 16GB RAM, 512GB SSD",
        price: 25000000,
        image: P21,
    },
    {
        id: 10,
        quantity : 1,
        title: "Tai nghe Sony WH-1000XM4",
        description: "Khử tiếng ồn, Bluetooth",
        price: 7500000,
        image: P21,
    },

    // Thêm sản phẩm khác tại đây
];

// Hàm định dạng giá tiền
const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫";
};

export default function Cart() {
    const { cartItems, increaseQuantity, decreaseQuantity, removeItem, addToCart } = useCart();
    const [sortOption, setSortOption] = useState(""); // State cho lựa chọn sắp xếp

    // const increaseQuantity = (id) => {
    //     setCartItems(cartItems.map(item =>
    //         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    //     ));
    // };

    // const decreaseQuantity = (id) => {
    //     setCartItems(cartItems.map(item =>
    //         item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    //     ));
    // };

    // const handleRemoveItem = (id) => {
    //     setCartItems(cartItems.filter(item => item.id !== id));
    // };

    const productRowRef = useRef(null);

    const scrollProductRow = (direction) => {
        const scrollAmount = 300;
        if (direction === 'left') {
            productRowRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else if (direction === 'right') {
            productRowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };
     // Hàm xử lý thanh toán trực tiếp với VNPay demo
    const handlePayment = () => {
        if (cartItems.length === 0) {
            // Hiển thị thông báo nếu giỏ hàng trống
            alert("Please select items before payment.");
            return;
        }
        const vnpayDemoUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        const date = new Date();
        const vnpCreateDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}`;
        
        const expireDate = new Date(date.getTime() + 15 * 60 * 1000);
        const vnpExpireDate = `${expireDate.getFullYear()}${String(expireDate.getMonth() + 1).padStart(2, '0')}${String(expireDate.getDate()).padStart(2, '0')}${String(expireDate.getHours()).padStart(2, '0')}${String(expireDate.getMinutes()).padStart(2, '0')}${String(expireDate.getSeconds()).padStart(2, '0')}`;
    

        // Tham số thanh toán
        const params = {
            vnp_Version: "2.1.0",
            vnp_Command: "pay",
            vnp_TmnCode: "ME8MTL4P", // Thay YOUR_TMNCODE bằng mã TmnCode bạn nhận từ VNPay
            vnp_Amount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 100, // Tổng tiền tính bằng đồng\127.0.0.1
            vnp_BankCode : "VNBANK",
            vnp_CreateDate: vnpCreateDate,
            vnp_CurrCode: "VND",
            vnp_IpAddr: "10.87.0.1",
            vnp_Locale: "vn",
            vnp_OrderInfo: "Thanh toán đơn hàng tại cửa hàng XYZ",
            vnp_OrderType: "other",
            vnp_ReturnUrl: "http://localhost:5173/checkout-success", // URL trả về sau khi thanh toán thành công
            vnp_ExpireDate : vnpExpireDate,
            vnp_TxnRef: vnpExpireDate.toString(), // Mã đơn hàng (mỗi đơn hàng một mã duy nhất)
            // vnp_SecureHash : "NY4ZISFPPI1HP81EQ4K46MQJ2DYD128Y",
        };

        // Khóa bí mật từ VNPay
    const vnp_HashSecret = "NY4ZISFPPI1HP81EQ4K46MQJ2DYD128Y";
        // Sắp xếp các tham số theo thứ tự từ điển (alphabetical order)
    const sortedParams = Object.keys(params)
    .sort()
    .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
    }, {});

// Tạo chuỗi query từ các tham số đã sắp xếp
const queryString = new URLSearchParams(sortedParams).toString();

// Tạo chữ ký HMAC SHA-512 từ chuỗi query và khóa bí mật
const vnp_SecureHash = CryptoJS.HmacSHA512(queryString, vnp_HashSecret).toString(CryptoJS.enc.Hex);

// Thêm `vnp_SecureHash` vào params
params.vnp_SecureHash = vnp_SecureHash;

        // Tạo chuỗi query từ params
        // const queryString = new URLSearchParams(params).toString();
        const paymentUrl = `${vnpayDemoUrl}?${new URLSearchParams(params).toString()}`;

        // Chuyển hướng đến trang thanh toán VNPay
        window.location.href = paymentUrl;
    };

    // Hàm sắp xếp sản phẩm
    const sortProducts = (items) => {
        switch (sortOption) {
            case "price-asc":
                return [...items].sort((a, b) => a.price - b.price); // Giá tăng dần
            case "price-desc":
                return [...items].sort((a, b) => b.price - a.price); // Giá giảm dần
            case "name-asc":
                return [...items].sort((a, b) => a.name.localeCompare(b.name)); // Tên A-Z
            default:
                return items; // Mặc định không sắp xếp
        }
    };

    // Sản phẩm sau khi sắp xếp
    const sortedCartItems = sortProducts(cartItems);

    return (
        <div id="Cart-Container">
            <div className="Cart-Container-01">
                <section className="h-100 h-custom" style={{ backgroundColor: "whitesmoke" }}>
                    <MDBContainer className="py-5 h-100">
                        <MDBRow className="justify-content-center align-items-center h-100">
                            <MDBCol>
                                <MDBCard>
                                    <MDBCardBody className="p-4">
                                        <MDBRow>
                                            <MDBCol lg="7">
                                                <MDBTypography tag="h5">
                                                    <a href="/Product" className="text-body">
                                                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue shopping
                                                    </a>
                                                </MDBTypography>

                                                <hr />

                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <div>
                                                        <p className="mb-1">Shopping cart</p>
                                                        <p className="mb-0">You have {cartItems.length} items in your cart</p>
                                                    </div>
                                                    <div>
                                                        {/* Dropdown chọn sắp xếp */}
                                                        <select
                                                            value={sortOption}
                                                            onChange={(e) => setSortOption(e.target.value)}
                                                            className="form-select"
                                                        >
                                                            <option value="">Sort</option>
                                                            <option value="price-asc">Price: Low to High</option>
                                                            <option value="price-desc">Price: High to Low</option>
                                                            <option value="name-asc">Name: A-Z</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* Danh sách sản phẩm */}
                                                {sortedCartItems.map(item => (
                                                    <MDBCard className="mb-3" key={item.id}>
                                                        <MDBCardBody>
                                                            <div className="d-flex justify-content-between">
                                                                <div className="d-flex flex-row align-items-center">
                                                                    <div>
                                                                        <MDBCardImage
                                                                            src={item.image || "https://via.placeholder.com/150"}
                                                                            fluid className="rounded-3"
                                                                            style={{ width: "65px" }}
                                                                            alt="Shopping item"
                                                                        />
                                                                    </div>
                                                                    <div className="ms-3">
                                                                        <MDBTypography tag="h5">{item.title}</MDBTypography>
                                                                        {/* <p className="small mb-0">{item.title}</p> */}
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-row align-items-center">
                                                                    <div className="quantity-control d-flex align-items-center">
                                                                        <MDBIcon
                                                                            icon="minus-circle"
                                                                            onClick={() => decreaseQuantity(item.id)}
                                                                            style={{ cursor: 'pointer', color: item.quantity > 1 ? '#007bff' : '#ccc' }}
                                                                        />
                                                                        <MDBTypography tag="h5" className="fw-normal mb-0 mx-2">{item.quantity}</MDBTypography>
                                                                        <MDBIcon
                                                                            icon="plus-circle"
                                                                            onClick={() => increaseQuantity(item.id)}
                                                                            style={{ cursor: 'pointer', color: '#007bff' }}
                                                                        />
                                                                    </div>
                                                                    <div style={{ width: "auto", marginRight: "10px" }}>
                                                                        <MDBTypography tag="h5" className="mb-0">{formatCurrency(item.price * item.quantity)}</MDBTypography>
                                                                    </div>
                                                                    <a href="#!" onClick={() => removeItem(item.id)} style={{ color: item.quantity > 1 ? "#cecece" : "#ccc" }}>
                                                                        <MDBIcon fas icon="trash-alt" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                ))}

                                            </MDBCol>

                                            <MDBCol lg="5">
                                                <MDBCard className="bg-primary text-white rounded-3">
                                                    <MDBCardBody>
                                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                                            <MDBTypography tag="h5" className="mb-0">Card details</MDBTypography>
                                                            <MDBCardImage
                                                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                                fluid className="rounded-3"
                                                                style={{ width: "45px" }}
                                                                alt="Avatar"
                                                            />
                                                        </div>

                                                        <p className="small">Card type</p>
                                                        <a href="#!" type="submit" className="text-white">
                                                            <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                                                        </a>
                                                        <a href="#!" type="submit" className="text-white">
                                                            <MDBIcon fab icon="cc-visa fa-2x me-2" />
                                                        </a>
                                                        <a href="#!" type="submit" className="text-white">
                                                            <MDBIcon fab icon="cc-amex fa-2x me-2" />
                                                        </a>
                                                        <a href="#!" type="submit" className="text-white">
                                                            <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                                                        </a>

                                                        <form className="mt-4">
                                                            <MDBInput className="mb-4" label="Cardholder's Name" type="text" size="lg" contrast />
                                                            <MDBInput className="mb-4" label="Card Number" type="text" size="lg" minLength="19" maxLength="19" placeholder="1234 5678 9012 3457" contrast />
                                                            <MDBInput className="mb-4" label="Expiration" type="text" size="lg" placeholder="MM/YYYY" contrast />
                                                            <MDBInput className="mb-4" label="CVV" type="password" size="lg" minLength="3" maxLength="3" placeholder="CVV" contrast />
                                                            <button
    
    onClick={handlePayment}
    type="button"
    style={{
        backgroundColor: "#00897b",
        color: "#fff", // Đặt màu chữ nếu cần
        padding: "10px 20px",
        fontSize: "18px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        width: "100%", // Để thay thế cho `block` trong MDBBtn
        marginBottom: "16px" // Thay thế `mb-4` trong MDB
    }}
>
    Pay
</button>
                                                        </form>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            </div>

            <div className="Cart-Container-02">
                <div className="additional-products">
                    <h5 className="mb-4">Other products you may like :</h5>
                    <div className="product-row" ref={productRowRef}>
                        {additionalProducts.map(product => (
                            <div className="product-card" key={product.id}>
                                <img src={product.image || "https://via.placeholder.com/150"} alt={product.title || "Product"} className="product-image" />
                                <div className="product-body">
                                    <h5 className="product-name">{product.title}</h5>
                                    <p className="product-description small">{product.description}</p>
                                    <h5 className="product-price">{formatCurrency(product.price)}</h5>
                                    <button className="add-to-cart" onClick={() => addToCart(product)}>
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Nút điều hướng */}
                    <button className="navigation-button left" onClick={() => scrollProductRow('left')}><IoIosArrowDropleft /></button>
                    <button className="navigation-button right" onClick={() => scrollProductRow('right')}><IoIosArrowDropright /></button>
                </div>
            </div>

        </div>

    );
}
