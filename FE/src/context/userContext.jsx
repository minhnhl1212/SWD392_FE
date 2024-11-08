// src/contexts/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const sampleAccounts = [
        { username: "JohnDoe", email: "john@example.com", password: "password123" },
        { username: "JaneSmith", email: "jane@example.com", password: "mypassword" },
        { username: "AliceWonder", email: "alice@example.com", password: "alicepass" },
    ];

    // Khởi tạo `user` từ `localStorage` nếu có, nếu không thì là `null`
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Cập nhật `localStorage` mỗi khi `user` thay đổi
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user"); // Xóa nếu user là null
        }
    }, [user]);

    // Hàm đăng ký người dùng và lưu vào state và localStorage
    const registerUser = (userData) => {
        setUser(userData);
    };

    // Hàm xác thực đăng nhập
    // Hàm đăng nhập với kiểm tra tài khoản mẫu
    const loginUser = (email, password) => {
        // Kiểm tra với các tài khoản mẫu
        const foundUser = sampleAccounts.find(
            (account) => account.email === email && account.password === password
        );

        if (foundUser) {
            setUser(foundUser); // Lưu tài khoản mẫu vào state và localStorage
            return true;
        }
        // Nếu không tìm thấy trong các tài khoản mẫu, trả về false
        return false;
    };

    // Hàm đăng xuất người dùng
    const logoutUser = () => {
        setUser(null); // Xóa user khỏi state
    };

    return (
        <UserContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};
// Hook để sử dụng UserContext
export const useUser = () => useContext(UserContext);
