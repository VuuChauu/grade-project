"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../styles/payment.css";

export default function PaymentPage() {
  const [phuongThuc, setPhuongThuc] = useState("card");
  const [showChiTietThe, setShowChiTietThe] = useState(true);
  const [soThe, setSoThe] = useState("");
  const [ngayHetHan, setNgayHetHan] = useState("");
  const [cvv, setCvv] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const router = useRouter();
  useEffect(() => {
    setShowChiTietThe(phuongThuc === "card");
    setErrorMessage("");
  }, [phuongThuc]);

  // dữ liệu giỏ hàng
  const gioHang = [
    {
      name: "Cà phê đen",
      price: 37000,
      quantity: 3,
      note: "Không đường, không đá",
    },
    {
      name: "Cà phê sữa",
      price: 22000,
      quantity: 4,
      note: "Nhiều sữa, đá viên",
    },
  ];

  const tongTien = gioHang.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const handleBack = () => {
    router.back();
  };
  const xuLyThe = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 19) value = value.slice(0, 19);
    setSoThe(value);
  };

  const xuLyNgayHetHan = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); 
  
    if (value.length > 4) value = value.slice(0, 4); 
  
    let formattedValue = "";
  
    if (value.length >= 2) {
      let month = parseInt(value.slice(0, 2)); 
      if (month > 12) month = 12; 
      formattedValue = month.toString().padStart(2, "0"); 
      if (value.length > 2) {
        formattedValue += "/" + value.slice(2, 4); 
      }
    } else {
      formattedValue = value; 
    }
  
    setNgayHetHan(formattedValue);
  };
  
  const xuLyCVV = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); 
    if (value.length > 3) value = value.slice(0, 3);
    setCvv(value);
  };

  const kiemTraInputs = () => {
    if (phuongThuc === "card") {
      if (!soThe.trim()) {
        setErrorMessage("Nhập thông tin");
        return false;
      }
      if (!ngayHetHan.trim()) {
        setErrorMessage("Nhập thông tin");
        return false;
      }
      if (!cvv.trim()) {
        setErrorMessage("Nhập thông tin");
        return false;
      }
      if (soThe.length < 16 || soThe.length > 19 ) {
        setErrorMessage("Thanh toán thất bại! Vui lòng kiểm tra lại");
        return false;
      }
      if (ngayHetHan.length !== 5 || !ngayHetHan.includes("/")) {
        setErrorMessage("Thanh toán thất bại! Vui lòng kiểm tra lại");
        return false;
      }
      const [monthStr, yearStr] = ngayHetHan.split("/");
      const month = parseInt(monthStr, 10);
      const year = parseInt("20" + yearStr, 10); 
      if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
        return false;
      }
  
      const ngayHienTai = new Date();
      const namHientai = ngayHienTai.getFullYear();
      const thangHienTai = ngayHienTai.getMonth() + 1;
  
      if (year < namHientai || (year === namHientai && month < thangHienTai)) {
        setErrorMessage("Thẻ đã hết hạn.");
        return false;
      }
  
      if (cvv.length !== 3) {
        setErrorMessage("Thanh toán thất bại! Vui lòng kiểm tra lại");
        return false;
      }
    }
  
    setErrorMessage("");
    return true;
  };
  
  const thanhToanThanhCong = () => {
    if (kiemTraInputs()) {
      alert("Thanh toán thành công"); 
    }
  };

  return (
    <div className="container">
      <main className="main">
        {/* Nút quay lại */}
        <div className="backButtonContainer" >
          <div className="backButtonCircle" onClick={handleBack}>
            <button className="backButton">←</button>
          </div>
        </div>

        {/* Tiêu đề */}
        <h1 className="title">Thanh toán</h1>

        {/* Thông tin đơn hàng */}
        <div className="section_info_order">
          <h2 className="sectionTitle">Chi tiết đơn hàng</h2>
          {gioHang.map((item, index) => (
            <div key={index} className="orderDetailsItem">
              <div>
                <span>{item.name} x {item.quantity}</span>
                {item.note && <p className="note">{item.note}</p>}
              </div>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="orderDetailsTotal">
            <span>Tổng tiền:</span>
            <span>{formatCurrency(tongTien)}</span>
          </div>
        </div>

        {/* Chọn phương thức thanh toán */}
        <div className="section_pay">
          <label className={`phuongThuc ${phuongThuc === "card" ? "active" : ""} ${phuongThuc !== "card" ? "disabled" : ""}`}>
            <input type="radio" name="phuongThuc" value="card" checked={phuongThuc === "card"} onChange={() => setPhuongThuc("card")}
            />
            <span className="paymentContent">
              <span className="icon">💳</span>
              <span>Credit Card</span>
            </span>
          </label>

          <label className={`phuongThuc ${phuongThuc === "cash" ? "active" : ""} ${phuongThuc !== "cash" ? "disabled" : ""}`}>
            <input type="radio" name="phuongThuc" value="cash" checked={phuongThuc === "cash"} onChange={() => setPhuongThuc("cash")}
            />
            <span className="paymentContent">
              <span className="icon">💵</span>
              <span>Tiền mặt</span>
            </span>
          </label>
        </div>

         {/* Thông tin thẻ tín dụng */}
         <div className={`cardDetails ${showChiTietThe ? "show" : "hide"}`}>
          <input className="input" type="text" placeholder="Card number"value={soThe} onChange={xuLyThe}/>
          <div className="row">
            <input className="inputSmall" placeholder="MM/YY" value={ngayHetHan} onChange={xuLyNgayHetHan}/>
            <input className="inputSmall" placeholder="CVV" value={cvv} onChange={xuLyCVV}/>
          </div>
        </div>
        {/* Nút thanh toán */}
        <button className="payButton" onClick={thanhToanThanhCong}>
          {phuongThuc === "cash" ? "Đặt hàng" : "Thanh toán"}
        </button>
        {/* thông báo lỗi dưới nút thanh toán */}
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}

        {/* hủy thanh toán */}
        <button className="cancelButton" onClick={handleBack}>Đóng</button>
      </main>
    </div>
  );
}
