import React, { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'SPEEDGOAT 5 | GIÀY CHẠY TRAIL NAM HOKA',
      size: '45 1/3',
      image: 'https://via.placeholder.com/100', // replace with actual image URL
      price: 2219400,
      quantity: 1,
    },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
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
        <button className="continue-shopping">Tiếp tục mua hàng</button>
        <button className="checkout">Đặt hàng</button>
      </div>
    </div>
  );
};

export default Cart;
