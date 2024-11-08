import { useState } from 'react';
import './../Profile/Profile.css';

import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';


const initialData = {
    name: "Hembo Tingor",
    role: "New User",
    email: "rntng@gmail.com",
    phone: "98979989898",
    address: "6th Floor, OneHub Saigon, High-Tech Park, Tan Phu Ward, District 9, Ho Chi Minh City",
    socialLinks: {
        facebook: "#!",
        twitter: "#!",
        instagram: "#!"
    },
    recentOrders: [
        {
            order: "123456",
            date: "29-09-2024",
            status: "Delivered",
            total: "$129.99"
        },
        {
            order: "987654",
            date: "10-10-2024",
            status: "In Transit",
            total: "$89.99"
        }
    ]
};

export default function Profile() {
    const [profileData, setProfileData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState("https://img.icons8.com/bubbles/100/000000/user.png");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
    };

    const handleImageChange = (e) => {
        setNewImageUrl(e.target.value);
    };

    return (
        <div id="Profile">
            <div className="page-content">
                <div className="padding">
                    <div className="profile-container">
                        <div className="user-card-full">
                            <div className="user-profile-container">
                                <div className="user-profile bg-c-lite-green">
                                    <div className="profile-content text-center">
                                        <div className="profile-image">
                                            <img src={newImageUrl} className="img-radius" alt="User-Profile-Image" />
                                        </div>
                                        <h6 className="f-w-600">{profileData.name}</h6>
                                        <p>{profileData.role}</p>
                                        <ul className="social-links">
                                            <li>
                                                <a href={profileData.socialLinks.facebook} title="facebook">
                                                    <FaFacebook size={20} color="#E6E6FA" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href={profileData.socialLinks.twitter} title="twitter">
                                                    <FaTwitter size={20} color="#E6E6FA" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href={profileData.socialLinks.instagram} title="instagram">
                                                    <FaInstagram size={20} color="#E6E6FA" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="user-info">
                                    {isEditing ? (
                                        <form onSubmit={handleSubmit}>
                                            <div className="info-block">
                                                <h6 className="section-title">Edit Profile</h6>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={profileData.name}
                                                    onChange={handleChange}
                                                    placeholder="Name"
                                                />
                                                <input
                                                    type="text"
                                                    name="email"
                                                    value={profileData.email}
                                                    onChange={handleChange}
                                                    placeholder="Email"
                                                />
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={profileData.phone}
                                                    onChange={handleChange}
                                                    placeholder="Phone"
                                                />
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={profileData.address}
                                                    onChange={handleChange}
                                                    placeholder="Address"
                                                />
                                                <input
                                                    type="text"
                                                    onChange={handleImageChange}
                                                    placeholder="Profile Image URL"
                                                />
                                                <button type="submit" className='button-save'>Save</button>
                                                <button type="button" className='button-cancel' onClick={() => setIsEditing(false)}>Cancel</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <div className="info-block">
                                                <h6 className="section-title">Contact Information</h6>
                                                <div className="info-row">
                                                    <div className="info-column">
                                                        <p>Email</p>
                                                        <h6 className="text-muted">{profileData.email}</h6>
                                                    </div>
                                                    <div className="info-column">
                                                        <p>Phone</p>
                                                        <h6 className="text-muted">{profileData.phone}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="info-block">
                                                <h6 className="section-title">Address Shipping</h6>
                                                <div className="info-row">
                                                    <p>{profileData.address}</p>
                                                </div>
                                            </div>
                                            <div className="info-block">
    <h6 className="section-title">Recent Orders</h6>
    
    {/* Tiêu đề cột */}
    <div className="info-row header-row">
        <div className="info-column">
            <p>Order</p>
        </div>
        <div className="info-column">
            <p>Date</p>
        </div>
        <div className="info-column">
            <p>Status</p>
        </div>
        <div className="info-column">
            <p>Total</p>
        </div>
    </div>

    {/* Dữ liệu đơn hàng */}
    {profileData.recentOrders.map((orderData, index) => (
        <div className="info-row" key={index}>
            <div className="info-column">
                <h6 className="text-muted">{orderData.order}</h6>
            </div>
            <div className="info-column">
                <h6 className="text-muted">{orderData.date}</h6>
            </div>
            <div className="info-column">
                <h6 className="text-muted">{orderData.status}</h6>
            </div>
            <div className="info-column">
                <h6 className="text-muted">{orderData.total}</h6>
            </div>
        </div>
    ))}
</div>


                                            <button className="edit-profile" onClick={() => setIsEditing(true)}>
                                                Edit Profile
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
