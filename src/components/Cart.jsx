import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'SPEEDGOAT 5 | GIÀY CHẠY TRAIL NAM HOKA',
      size: '45 1/3',
      image: 'https://supersports.com.vn/cdn/shop/files/1134497-LSQ-1.jpg?v=1708674002&width=1000',
      price: 2219400,
      quantity: 1,
    },
    {
        id: 2,
        name: 'SPEEDGOAT 4 | GIÀY CHẠY TRAIL NỮ HOKA',
        size: '45 1/3',
        image: 'https://supersports.com.vn/cdn/shop/files/1134497-LSQ-1.jpg?v=1708674002&width=1000', 
        price: 2215120,
        quantity: 6,
      },
  ]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [error, setError] = useState('');

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    if (!customerName || !customerPhone) {
      setError('Vui lòng nhập đầy đủ tên và số điện thoại');
      return;
    }
    setError('');
    localStorage.setItem('customerName', customerName);
    localStorage.setItem('customerPhone', customerPhone);
    alert('Đặt hàng thành công!');
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="cart">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td><img src={item.image} alt={item.name} className="product-image" /></td>
              <td>
                {item.name}
                <br />
                {item.size}
              </td>
              <td>{item.price.toLocaleString()} VND</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="quantity-input"
                />
              </td>
              <td>{(item.price * item.quantity).toLocaleString()} VND</td>
              <td>
                <button onClick={() => handleRemoveItem(item.id)} className="remove-button">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-summary">
        <p>Tổng tiền: <span className="total-price">{calculateTotal().toLocaleString()} VND</span></p>

        <input
          type="text"
          placeholder="Nhập tên của bạn"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="customer-input"
        />
        <input
          type="text"
          placeholder="Nhập số điện thoại của bạn"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          className="customer-input"
        />
        {error && <p className="error-message">{error}</p>}

        <button className="continue-shopping">Tiếp tục mua hàng</button>
        <button
          className="checkout"
          disabled={cartItems.length === 0}
          onClick={handlePlaceOrder}
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default Cart;
