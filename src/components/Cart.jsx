import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [error, setError] = useState('');

  // Hàm lưu giỏ hàng vào localStorage
  const saveCartToStorage = (items) => {
    console.log("Saving to localStorage:", items);  // Kiểm tra dữ liệu lưu vào localStorage
    localStorage.setItem('cart', JSON.stringify({ items }));  // Đảm bảo lưu với key 'cart' và cấu trúc chứa 'items'
  };

  // Hàm tải giỏ hàng từ localStorage
  const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      if (parsedCart && Array.isArray(parsedCart.items)) {
        setCartItems(parsedCart.items); // Lấy danh sách sản phẩm từ trường 'items'
      } else {
        setCartItems([]); // Nếu không phải mảng, gán giỏ hàng là mảng rỗng
      }
    } else {
      console.log("No cart items found in localStorage.");  // Nếu không có dữ liệu
      setCartItems([]); // Giỏ hàng rỗng nếu không có gì trong localStorage
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      saveCartToStorage({ items: updatedItems }); // Lưu vào localStorage với cấu trúc đúng
      return updatedItems;
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      saveCartToStorage({ items: updatedItems }); // Lưu vào localStorage với cấu trúc đúng
      return updatedItems;
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    if (!customerName || !customerPhone) {
      setError('Vui lòng nhập đầy đủ tên và số điện thoại');
      return;
    }
    setError('');

    // Lưu thông tin khách hàng vào localStorage với key là 'user'
    const userInfo = { name: customerName, phone: customerPhone };
    localStorage.setItem('user', JSON.stringify(userInfo));

    alert('Đặt hàng thành công!');
  };
  useEffect(() => {
    // Kiểm tra xem có thông tin khách hàng trong localStorage không
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userInfo = JSON.parse(storedUser);
      setCustomerName(userInfo.name || '');  // Nạp tên khách hàng vào
      setCustomerPhone(userInfo.phone || ''); // Nạp số điện thoại khách hàng vào
    }

    loadCartFromStorage();
    setTimeout(() => setIsLoading(false), 1000); // Giả lập thời gian tải dữ liệu
  }, []);  // Chạy 1 lần khi component mount

  // Tải giỏ hàng từ localStorage khi component mount
  useEffect(() => {
    loadCartFromStorage();
    setTimeout(() => setIsLoading(false), 1000); // Giả lập thời gian tải dữ liệu
  }, []);


  return (
    <div className="cart">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Đơn giá</th>
            <th>Size</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: cartItems.length }).map((_, index) => (
              <tr key={index}>
                <td><Skeleton height={75} width={80} /></td>
                <td><Skeleton width={70} height={15} /></td>
                <td><Skeleton width={60} height={15} /></td>
                <td><Skeleton width={20} height={15} /></td>
                <td><Skeleton width={50} height={15} /></td>
                <td><Skeleton width={40} height={15} /></td>
                <td><Skeleton width={37} height={15} /></td>
              </tr>
            ))
            : cartItems.map((item) => (
              <tr key={item.id}>
                <td><img src={item.image} alt={item.name} className="product-image" /></td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.size}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="quantity-input"
                  />
                </td>
                <td>{(parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity).toLocaleString()+ " ₫"}</td>
                <td>
                  <button onClick={() => handleRemoveItem(item.id)} className="remove-button">Xóa</button>
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>
      <div className="cart-summary">
        <p>Tổng tiền: <span className="total-price">{calculateTotal().toLocaleString()} VND</span></p>

        <input
          type="text"
          placeholder="Nhập tên của bạn"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className={`customer-input ${error && !customerName ? 'error-input' : ''}`}
        />
        <input
          type="text"
          placeholder="Nhập số điện thoại của bạn"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          className={`customer-input ${error && !customerPhone ? 'error-input' : ''}`}
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
