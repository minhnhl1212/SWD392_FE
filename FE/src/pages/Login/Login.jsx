import React, { useState, useEffect } from "react";
import "./login.css";
import Google from '/src/assets/Logo/Google.png';
import Apple from '/src/assets/Logo/Apple.webp';
import { Link, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../context/userContext";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const { loginUser } = useUser(); // Lấy hàm loginUser từ UserContext
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (event) => {
        event.preventDefault();

        if (loginUser(email, password)) {
            // Chuyển hướng đến trang chính nếu đăng nhập thành công
            console.log("Login successful! Redirecting...");
            navigate("/home");
        } else {
            console.log("Login failed");
            setLoginError("Incorrect email or password.");
        }
    };
  

    return (
        <div id="LoginPage">
            <div className="login-container">
                <h2 className="form-title">Log in with</h2>
                <div className="social-login">
               
                    <button  className="social-button" >
                        <img src={Google} alt="Google" style={{ width: '40px' }} />
                        Google
                    </button>
                    
                    <button className="social-button">
                        <img src={Apple} alt="Apple" style={{ width: '40px' }} />
                        Apple
                    </button>
                </div>

                <p className="separator"><span>or</span></p>

               
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="input-wrapper">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="input-field"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                            <i className="material-symbols-outlined">mail</i>
                        </div>

                        <div className="input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="input-field"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                            <i className="material-symbols-rounded">lock</i>
                            {/* <i
                                className="material-symbols-rounded"
                                onClick={togglePasswordVisibility}
                                style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                            >
                                {showPassword ? "visibility_off" : "visibility"}
                            </i> */}
                        </div>
                        <a href="#" className="forgot-password-link">Forgot Password?</a>

                        <button className="login-button" type="submit">Log In</button>
                    </form>
                

              
                    {/* <div className="text-center mt-6">
                        <h2 className="text-2xl font-bold">Login Success</h2>
                        <p>You are now logged in.</p>
                    </div> */}
                
                <p className="signup-text">Don't have an account?
                    <a href="/signup"> Signup now</a>
                </p>
            </div>
        </div>
    );
}
