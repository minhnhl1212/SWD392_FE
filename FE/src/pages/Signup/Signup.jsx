import React, { useState } from "react";
import "./Signup.css";
import Google from '/src/assets/Logo/Google.png';
import Apple from '/src/assets/Logo/Apple.webp';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../context/userContext";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [signUpError, setSignUpError] = useState('');
    const { registerUser } = useUser();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleGoogleSignUp = async (event) => {
        event.preventDefault();
        // Logic đăng ký bằng Google
    };

    
    const handleSignUp = (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const userData = {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        // Đăng ký người dùng vào UserContext
        registerUser(userData);

        // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
        navigate("/login");
    };

    return (
        <div id="SignUpPage">
            <div className="signup-container">
                <h2 className="form-title">Sign up with</h2>
                <div className="social-signup">
                    <button onClick={handleGoogleSignUp} className="social-button">
                        <img src={Google} alt="Google" style={{ width: '40px' }} />
                        Google
                    </button>
                    <button className="social-button">
                        <img src={Apple} alt="Apple" style={{ width: '40px' }} />
                        Apple
                    </button>
                </div>

                <p className="separator"><span>or</span></p>

                <form onSubmit={handleSignUp} className="signup-form">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="input-field"
                            required
                        />
                        {/* <i className="material-symbols-outlined">person</i> */}
                    </div>

                    <div className="input-wrapper">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            className="input-field"
                            required
                        />
                        <i className="material-symbols-outlined">mail</i>
                    </div>

                    <div className="input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="input-field"
                            required
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

                    <button className="signup-button" type="submit">Sign Up</button>
                </form>

                {signUpError && (
                    <p className="error-text">{signUpError}</p>
                )}

                <p className="login-text">Already have an account?
                    <a href="/login"> Log in</a>
                </p>
            </div>
        </div>
    );
}
