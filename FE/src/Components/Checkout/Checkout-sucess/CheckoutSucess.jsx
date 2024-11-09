import React, { useEffect, useState } from "react";
import "./CheckoutSucess.css";
import { useCart } from "../../../context/CartContext";

const CheckoutSucess = () => {
  const [transactionId, setTransactionId] = useState("");
  const [transactionTime, setTransactionTime] = useState("");
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const { clearCart } = useCart();

  useEffect(() => {
    // Lấy các tham số từ URL
    const urlParams = new URLSearchParams(window.location.search);

    // Kiểm tra mã phản hồi thanh toán từ VNPay
    const responseCode = urlParams.get("vnp_ResponseCode");
    const transactionId = urlParams.get("vnp_TransactionNo");
    const payDate = urlParams.get("vnp_PayDate");

    // Chỉ khi `vnp_ResponseCode` là "00" mới xóa giỏ hàng và hiển thị thành công
    if (responseCode === "00") {
      setIsPaymentSuccess(true);
      setTransactionId(transactionId);

      // Định dạng thời gian giao dịch từ `YYYYMMDDHHMMSS` thành `DD-MM-YYYY HH:MM:SS`
      if (payDate) {
        const formattedDate = `${payDate.slice(6, 8)}-${payDate.slice(4, 6)}-${payDate.slice(0, 4)} ${payDate.slice(8, 10)}:${payDate.slice(10, 12)}:${payDate.slice(12, 14)}`;
        setTransactionTime(formattedDate);
      }

      // Xóa giỏ hàng sau khi thanh toán thành công
      clearCart();
    } else {
      setIsPaymentSuccess(false);
    }
  }, [clearCart]);

  return (
    <div id="checksuccess" className="success-container">
      <div className="success-box">
        {isPaymentSuccess ? (
          <>
            <div className="check-icon">
              <span>✔️</span>
            </div>
            <h2>Payment Successful!</h2>
            <div className="transaction-info">
              <p><strong>Transaction ID:</strong> {transactionId}</p>
              <p><strong>Transaction Time:</strong> {transactionTime}</p>
            </div>
          </>
        ) : (
          <>
            <div className="error-icon">
              <span>❌</span>
            </div>
            <h2>Payment Failed</h2>
            <p>There was an issue with your payment. Please try again or contact support.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutSucess;
