import React, { useState, useRef } from "react";
import "./../Cart/Cart.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import { useCart } from "../../../context/CartContext";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";


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
                                                            <MDBBtn type="submit" block size="lg" className="mb-4" style={{ backgroundColor: "#00897b" }}>
                                                                Pay
                                                            </MDBBtn>
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
