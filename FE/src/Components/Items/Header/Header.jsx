import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import SliderCards from "../SliderCards/SliderCards";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { LuUserCog, LuBookMarked, LuBarChartBig } from "react-icons/lu";
import { TbBellCheck } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import { useUser } from "../../../context/userContext";
import LogoNSHOP from "../../../assets/Logo NSHOP.png";

export default function Header() {
    const { user, logoutUser } = useUser(); // Lấy user và hàm logout từ UserContext
    const [isDropDown, setIsDropDown] = useState(false);
    const [height, setHeight] = useState('0px');
    const contentDropdownRef = useRef(null);
    const [isDropDownUser, setIsDropDownUser] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        if (isDropDown) {
            document.querySelector('.search-result-container').classList.add("show");
            document.querySelector('.search-bar').classList.add("slide");
            setHeight(`400px`);
        } else {
            document.querySelector('.search-result-container').classList.remove("show");
            document.querySelector('.search-bar').classList.remove("slide");
            setHeight('0px');
        }
    }, [isDropDown]);

    useEffect(() => {
        setDatas(null);
    }, [searchInput]);

    const handleSearchFocus = () => {
        setIsDropDown(true);
    }

    const handleCancelBtn = () => {
        setIsDropDown(false);
    }

    const handleLogOut = () => {
        logoutUser(); // Gọi hàm logout từ UserContext
        window.location.href = '/login';
    }

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            window.location.href = `/search?q=${searchInput}&page=1`;
        }
    }

    return (
        <div id="header">
            <div className="header-shown">
                <div className="logo-title">
                    <Link to="/home" className="logo-link">
                        <img src={LogoNSHOP} alt="" className="logo" />
                    </Link>
                    <span className="title">NSHOP</span>
                </div>

                {/* Navigation Links */}
                <nav className="nav-links">
                    <Link to="/home">Home</Link>
                    <Link to="/product">Product</Link>
                    <Link to="/cart">Cart</Link>
                    {/* <Link to="/profile">Profile</Link> */}
                </nav>

                <div className="search-container">
                    <div className="search-bar">
                        <IoSearchOutline />
                        <input
                            type="text"
                            placeholder="Searching for course"
                            onFocus={handleSearchFocus}
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={handleInputKeyDown}
                        />
                    </div>
                </div>

                <div className="action-button">
                    {isDropDown ? (
                        <div className="cancel-btn" onClick={handleCancelBtn}>CANCEL</div>
                    ) : (
                        user ? (
                            <div className="user-action" onClick={() => setIsDropDownUser(prev => !prev)}>
                                <div className="user-logo">
                                    {user.imgUrl ? (
                                        <img src={user.imgUrl} alt="" />
                                    ) : (
                                        <HiOutlineUserCircle />
                                    )}
                                </div>
                                <div className="user-info">
                                    <p className="name">{user.username}</p>
                                    {/* <p className="email">{user.email}</p> */}
                                </div>
                                <div className={`user-dropdown ${isDropDownUser ? 'active' : ''}`}>
                                    <div className="dropdown-container">
                                        <div className="arrow"></div>
                                        <div className="notification special-block">
                                            <TbBellCheck />
                                            Notification
                                        </div>
                                        <Link to="/profile" className="selection-block">
                                            <LuUserCog />
                                            Account Profile
                                        </Link>
                                        <Link to="/student/my-learning/completed" className="selection-block">
                                            <LuBookMarked />
                                            My Learning
                                        </Link>
                                        <Link to="/" className="selection-block">
                                            <LuBarChartBig />
                                            Dashboard
                                        </Link>
                                        <div className="logout special-block" onClick={handleLogOut}>
                                            <BiLogOut />
                                            Log Out
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="login-signup">
                                <Link to="/login" className="login">Log in</Link>
                                <Link to="/signup" className="signup">Sign Up</Link>
                            </div>
                        ))}
                </div>
            </div>
            <div
                ref={contentDropdownRef}
                className="search-result-container"
                style={{ height: height }}
            >
                <p className="title">Recommend</p>
                <div className="slider-container">
                    <SliderCards datas={datas} />
                </div>
            </div>
        </div>
    );
}
