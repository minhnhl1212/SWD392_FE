import React, { useEffect, useState } from "react";
import "./CheckoutSucess.css";

const CheckoutSucess = () => {
  const [transactionId, setTransactionId] = useState("");
  const [transactionTime, setTransactionTime] = useState("");

  useEffect(() => {
    // Lấy URL hiện tại
    const urlParams = new URLSearchParams(window.location.search);
    
    // Lấy mã giao dịch và thời gian giao dịch
    const transactionId = urlParams.get("vnp_TransactionNo");
    const payDate = urlParams.get("vnp_PayDate");

    setTransactionId(transactionId);

    // Định dạng lại thời gian giao dịch từ `YYYYMMDDHHMMSS` thành `DD-MM-YYYY HH:MM:SS`
    if (payDate) {
      const formattedDate = `${payDate.slice(6, 8)}-${payDate.slice(4, 6)}-${payDate.slice(0, 4)} ${payDate.slice(8, 10)}:${payDate.slice(10, 12)}:${payDate.slice(12, 14)}`;
      setTransactionTime(formattedDate);
    }
  }, []);

  return (
    
    <div id="checksuccess" className="success-container">
      <div className="success-box">
        <div className="check-icon">
          <span>✔️</span>
        </div>
        <h2>Payment Successful!</h2>
<div className="transaction-info">
  <p><strong>Transaction ID:</strong> {transactionId}</p>
  <p><strong>Transaction Time:</strong> {transactionTime}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSucess;
