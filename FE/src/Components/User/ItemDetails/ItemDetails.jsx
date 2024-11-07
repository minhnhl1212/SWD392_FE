import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import './ItemDetails.css';
import Header from "../../../Components/Items/Header/Header";
import Footer from "../../../Components/Items/Footer/Footer";

import { IoCartOutline } from "react-icons/io5";
import P21 from '/src/assets/Product/21.jpg';

import P211 from '/src/assets/Product/21.1.jpg';
import P212 from '/src/assets/Product/21.2.jpg';
import P213 from '/src/assets/Product/21.3.jpg';
import P214 from '/src/assets/Product/21.4.jpg';
import P215 from '/src/assets/Product/21.5.jpg';
import P216 from '/src/assets/Product/21.6.jpg';
import P217 from '/src/assets/Product/21.7.jpg';

import P218 from '/src/assets/Product/21.8.jpg';
import P219 from '/src/assets/Product/21.9.jpg';
import P2110 from '/src/assets/Product/21.10.jpg';
import P2211 from '/src/assets/Product/21.11.jpg';
import P2112 from '/src/assets/Product/21.12.jpg';



const ItemDetails = () => {
    const { title } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartCount] = useState(10); // Giả sử số lượng sản phẩm trong giỏ là 10
    const [mainImage, setMainImage] = useState(''); // Thêm state để quản lý ảnh chính
    const { addToCart } = useCart();

    const imagePaths = [
        P218,
        P219,
        P2110,
        P2211,
        P2112,
    ];


    // Sample product data
    const fakeData = [
        {
            id: 1,
            quantity: 1,
            title: 'Combo xe điều khiển từ xa có camera giám sát',
            description: `Combo xe điều khiển từ xa có camera giám sát là combo do chính NSHOP biên soạn, thường được sử dụng để học tập, nghiên cứu, giải trí…v…v.
            Kết hợp với module ESP32-Camera, chúng ta có thể điều khiển thông qua wifi đang sử dụng bằng website thông qua địa chỉ IP và không cần phải theo dõi khi điều khiển như combo dùng bluetooth vì đã được tích hợp thêm camera có thể giám sát qua màn hình và điều khiển đi bất kì đâu.
            Lưu ý: combo này là tự ráp, quý khách chỉ cần đấu nối và nạp code theo đúng sơ đồ là chạy, quý khách có thể chỉnh sửa lại code để tối ưu hơn.`,
            price: '560000',
            currency: '₫',
            images: [P21, P211, P212, P213, P214, P215, P216, P217],
            status: 'Còn hàng',
            additionalInfo: {
                loyaltyPoints: '❤️ Công thêm 56 điểm tích lũy',
                shipping: {
                    hcm: 'Miễn phí vận chuyển [tối đa 35.000đ]',
                    other: 'Miễn phí vận chuyển [tối đa 35.000đ]',
                },
                storeAvailability: 'Xem chi nhánh còn hàng',
                details: {
                    productList: [
                        'Khung xe robot 3 bánh',
                        'Mạch thu phát Wifi BLE ESP32-CAM Ai-Thinker',
                        'Mạch Điều Khiển Động Cơ DC L298N',
                        'Hộp Pin 18650 2 cell có nắp và công tắc',
                        'Pin cell 18650 2000mAh (1 pin màu sắc ngẫu nhiên)',
                        'Test board cắm mini, Breadboard Mini SYB-170 (màu sắc ngẫu nhiên)',
                        'Dây Cắm Test Board Đực Cái 20 cm',
                    ],
                    weight: '290g',
                    codeInstructions: 'R5XC',
                    connectionInstructions: [
                        'Đấu nối động cơ vào module L298N',
                        'Đấu nối nguồn pin vào module L298N',
                        'Đấu nối nguồn vào module ESP32-Camera',
                        'Đấu nối tín hiệu từ module L298N vào ESP32-Camera',
                        'Đấu nối hoàn chỉnh và kiểm tra lại',
                    ],
                    demoVideo: 'https://youtu.be/-2QauRxO-iA',
                    referenceCode: 'Code tham khảo: [Code đầy đủ](https://www.mediafire.com/file/ikjbz0g7zqwj417/ESP32-CAR.rar/file)',
                    codeSnippet:
                        `/* ESP32 Camera Car */
#include "esp_camera.h"
#include <WiFi.h>
#define CAMERA_MODEL_AI_THINKER
const char* ap_ssid = "ESP32-CAR";
const char* ap_password = "12345678";

#if defined(CAMERA_MODEL_WROVER_KIT)
#define PWDN_GPIO_NUM    -1
#define RESET_GPIO_NUM   -1
#define XCLK_GPIO_NUM    21
#define SIOD_GPIO_NUM    26
#define SIOC_GPIO_NUM    27
#define Y9_GPIO_NUM      35
#define Y8_GPIO_NUM      34
#define Y7_GPIO_NUM      39
#define Y6_GPIO_NUM      36
#define Y5_GPIO_NUM      19
#define Y4_GPIO_NUM      18
#define Y3_GPIO_NUM       5
#define Y2_GPIO_NUM       4
#define VSYNC_GPIO_NUM   25
#define HREF_GPIO_NUM    23
#define PCLK_GPIO_NUM    22
#elif defined(CAMERA_MODEL_AI_THINKER)
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22
#else
#error "Camera model not selected"
#endif

extern int IN1 =  2;
extern int IN2 = 14;
extern int IN3 = 15;
extern int IN4 = 13;
extern int LED =  4;
extern String WiFiAddr ="";
void startCameraServer();
void setup() {
  Serial.begin(115200);
  Serial.setDebugOutput(true);
  Serial.println();
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  pinMode(LED, OUTPUT);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
  digitalWrite(LED, LOW);

  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  if(psramFound()){
    config.frame_size = FRAMESIZE_UXGA;
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }
  sensor_t * s = esp_camera_sensor_get();
  s->set_framesize(s, FRAMESIZE_CIF);
  WiFi.softAP(ap_ssid, ap_password);
  IPAddress IP = WiFi.softAPIP();
  Serial.print("Access Point Started! Use 'http://");
  Serial.print(IP);
  WiFiAddr = IP.toString();
  Serial.println("' to connect");
  startCameraServer();
}

void loop() {}
`
                },
            },
        },
    ];

    useEffect(() => {
        const foundProduct = fakeData.find((item) => item.title === decodeURIComponent(title));

        if (foundProduct) {
            setProduct(foundProduct);
            setMainImage(foundProduct.images[0]); // Đặt ảnh chính ban đầu
            setLoading(false);
        } else {
            setError('Product not found');
            setLoading(false);
            navigate('/NotFound');
        }
    }, [title, navigate]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            alert("Sản phẩm đã được thêm vào giỏ hàng!");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return (
            <div>
                <p>{error}</p>
                <a href="/">Go back to Home</a>
            </div>
        );
    }
    return (
        <div id="item-details">
            <Header />

            <div className='item-details-container-1'>
                {product ? (
                    <div className="item-info">
                        <div className="item-image">
                            {/* Ảnh chính */}

                            <div className='item-image-maintain'>
                                <img src={mainImage} alt={product.title} className="main-product-image" />
                            </div>

                            <div className="thumbnail-images">
                                {product.images.map((image, index) => (
                                    <div key={index} className="thumbnail-container">
                                        <img
                                            src={image}
                                            alt={`Thumbnail ${index}`}
                                            className="thumbnail"
                                            onClick={() => setMainImage(image)} // Thay đổi ảnh chính khi click
                                        />
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className="item-details-content">
                            <h2>{product.title}</h2>
                            <span className="item-price">{product.price} {product.currency}</span>
                            <button className="btn-buy" onClick={handleAddToCart} disabled={product.status === 'Hết hàng'}>
                                Chọn mua
                            </button>
                            
                            <span className="item-status">Sản phẩm hiện đang {product.status}.</span>
                            <a href="#" className="store-availability">Xem chi nhánh còn hàng</a>
                            <div className="item-description">
                                <h3>Mô tả sản phẩm</h3>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading product...</p>
                )}
            </div>

            <div className='item-details-container-2'>
                <h3>Chi tiết sản phẩm</h3>
                <p>{product.additionalInfo.details.description}</p>
                <h4>Danh sách sản phẩm combo xe điều khiển:</h4>
                <ul>
                    {product.additionalInfo.details.productList.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <p>Khối lượng: {product.additionalInfo.details.weight}</p>
                <h4>Hướng dẫn nạp code:</h4>
                <p>{product.additionalInfo.details.codeInstructions}</p>
                <h4>Hướng dẫn đấu nối khi nạp code</h4>
                <ol>
                    {product.additionalInfo.details.connectionInstructions.map((item, index) => (
                        <li key={index}>
                            <h3>{item}</h3>
                            {imagePaths[index] && (
                                <img src={imagePaths[index]} alt={`Hình ảnh cho ${item}`} style={{ width: '55%', marginLeft: '185px' }} />
                            )}
                        </li>
                    ))}
                </ol>
                <h4>Video demo</h4>
                <p><a href={product.additionalInfo.details.demoVideo} target="_blank" rel="noopener noreferrer">Xem video demo</a></p>
                <h4>Code tham khảo:</h4>
                <pre>
                    <code>
                        {product.additionalInfo.details.codeSnippet}
                    </code>
                </pre>
                <p dangerouslySetInnerHTML={{ __html: product.additionalInfo.details.referenceCode }} />
            </div>

            <div className="cart-icon-container">
                <IoCartOutline className="cart-icon" />
                <span className="cart-count">{cartCount}</span>
            </div>

            <Footer />
        </div>
    );
};

export default ItemDetails;
