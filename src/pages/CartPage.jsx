import React, { useEffect, useMemo, useState } from 'react';
import CartItem from '../components/CartItem.jsx';
import Skeleton from 'react-loading-skeleton';

const CartPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [error, setError] = useState('');

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
      console.log('No cart items found in localStorage.'); // Nếu không có dữ liệu
      setCartItems([]); // Giỏ hàng rỗng nếu không có gì trong localStorage
    }
  };

  const calculateTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const quantity = item.quantity || 0; // Nếu quantity là null hoặc undefined, gán 0
      if (quantity > 0) {
        return (
          total + parseFloat(item.price.replace(/[^\d.-]/g, '')) * quantity
        );
      }
      return total; // Bỏ qua sản phẩm nếu quantity <= 0
    }, 0);
  }, [cartItems]);

  console.log(calculateTotal);

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
      setCustomerName(userInfo.name || ''); // Nạp tên khách hàng vào
      setCustomerPhone(userInfo.phone || ''); // Nạp số điện thoại khách hàng vào
    }

    loadCartFromStorage();
    setTimeout(() => setIsLoading(false), 1000);
  }, []); // Chạy 1 lần khi component mount

  useEffect(() => {
    loadCartFromStorage();
    setTimeout(() => setIsLoading(false), 1000); // Giả lập thời gian tải dữ liệu
  }, []);

  return (
    <div className="cart-page">
      <CartItem cartItems={cartItems} onSetCartItems={setCartItems} />

      <div className="cart-summary">
        <p>
          Tổng tiền:
          {isLoading ? (
            <span className="total-price">
              {' '}
              <Skeleton width={80} />
            </span> // Hiển thị khi dữ liệu đang tải
          ) : (
            <span className="total-price">
              {' '}
              {calculateTotal.toLocaleString()} ₫
            </span> // Hiển thị tổng tiền khi đã tải xong
          )}
        </p>

        <input
          type="text"
          placeholder="Nhập tên của bạn"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className={`customer-input ${
            error && !customerName ? 'error-input' : ''
          }`}
        />
        <input
          type="text"
          placeholder="Nhập số điện thoại của bạn"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          className={`customer-input ${
            error && !customerPhone ? 'error-input' : ''
          }`}
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

export default CartPage;
