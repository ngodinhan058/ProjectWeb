import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Cart = ({ cartItems, onSetCartItems: setCartItems }) => {
  const [isLoading, setIsLoading] = useState(true);
  //const [cartItems, setCartItems] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [error, setError] = useState('');

  // Hàm lưu giỏ hàng vào localStorage
  const saveCartToStorage = (items) => {
    console.log('Saving to localStorage:', items);
    localStorage.setItem('cart', JSON.stringify({ items })); // Lưu dưới key 'cart'
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
      console.log('No cart items found in localStorage.'); // Nếu không có dữ liệu
      setCartItems([]); // Giỏ hàng rỗng nếu không có gì trong localStorage
    }
  };

  console.log('Cart', cartItems);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; // Không cho phép số lượng dưới 1
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      saveCartToStorage(updatedItems); // Lưu giỏ hàng đã cập nhật vào localStorage
      return updatedItems;
    });
  };

  const handleRemoveItem = (id, size) => {
    const dupItems = cartItems.filter(
      (item) => item.id === id && item.size !== size
    );

    setCartItems((prevItems) => {
      const updatedItems = [
        ...prevItems.filter((item) => item.id !== id),
        ...dupItems,
      ];

      console.log('Updated', updatedItems);

      saveCartToStorage(updatedItems); // Lưu giỏ hàng đã cập nhật vào localStorage
      return updatedItems;
    });
  };

  const handleDecrement = (id, size) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === id && item.quantity > 1 && item.size == size) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item; // Giữ nguyên nếu số lượng = 1
      });
      saveCartToStorage(updatedItems); // Lưu giỏ hàng đã cập nhật vào localStorage
      return updatedItems;
    });
  };

  const handleIncrement = (id, size) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id && item.size == size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      saveCartToStorage(updatedItems); // Lưu giỏ hàng đã cập nhật vào localStorage
      return updatedItems;
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const quantity = item.quantity || 0; // Nếu quantity là null hoặc undefined, gán 0
      if (quantity > 0) {
        return (
          total + parseFloat(item.price.replace(/[^\d.-]/g, '')) * quantity
        );
      }
      return total; // Bỏ qua sản phẩm nếu quantity <= 0
    }, 0);
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
      setCustomerName(userInfo.name || ''); // Nạp tên khách hàng vào
      setCustomerPhone(userInfo.phone || ''); // Nạp số điện thoại khách hàng vào
    }

    loadCartFromStorage();
    setTimeout(() => setIsLoading(false), 1000); // Giả lập thời gian tải dữ liệu
  }, []); // Chạy 1 lần khi component mount

  // Tải giỏ hàng từ localStorage khi component mount
  useEffect(() => {
    loadCartFromStorage();
    setTimeout(() => setIsLoading(false), 1000); // Giả lập thời gian tải dữ liệu
  }, []);

   // Kiểm tra kích thước màn hình
   useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);  // Nếu chiều rộng màn hình nhỏ hơn 768px, set isMobile = true
    };

    handleResize(); // Kiểm tra ngay khi component được mount
    window.addEventListener('resize', handleResize);  // Lắng nghe sự kiện thay đổi kích thước màn hình

    return () => {
      window.removeEventListener('resize', handleResize); // Dọn dẹp khi component unmount
    };
  }, []);

  useEffect(() => {
    loadCartFromStorage();
    setTimeout(() => setIsLoading(false), 1000); // Giả lập thời gian tải dữ liệu
  }, []); 

  // Giao diện mobile
  const mobileLayout = (
    <div className="cart">
      <div className="titleCart">GIỎ HÀNG CỦA BẠN</div>
      <div>
        {isLoading ? (
          cartItems.map((_, index) => (
            <div key={index} className="cart-item-mobile">
              <Skeleton height={75} width={75} />
              <Skeleton width={150} height={20} />
              <Skeleton width={100} height={15} />
              <Skeleton width={50} height={30} />
              <Skeleton width={60} height={30} />
            </div>
          ))
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item-mobile">
              <img src={item.image} alt={item.name} className="product-image" />
              <div>{item.name}</div>
              <div>{item.price}</div>
              <div>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  min="1"
                  className="quantity-input"
                />
                <button onClick={() => handleRemoveItem(item.id, item.size)}>Xóa</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // Giao diện Desktop
  const desktopLayout = (
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
                  <td><Skeleton width={90} height={34.8} /></td>
                  <td><Skeleton width={80} height={15} /></td>
                  <td><Skeleton width={50.5} height={34.8} /></td>
                </tr>
              ))
            : cartItems.map((item) => (
                <tr key={item.id}>
                  <td><img src={item.image} alt={item.name} className="product-image" /></td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.size}</td>
                  <td>
                    <button onClick={() => handleDecrement(item.id, item.size)}>-</button>
                    {item.quantity}
                    <button onClick={() => handleIncrement(item.id, item.size)}>+</button>
                  </td>
                  <td>
                    {(
                      parseInt(item.price.replace(/\D/g, ''), 10) *
                      item.quantity
                    ).toLocaleString('vi-VN') + ' ₫'}
                  </td>
                  <td>
                    <button onClick={() => handleRemoveItem(item.id, item.size)} className="remove-button">Xóa</button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );

  return isMobile ? mobileLayout : desktopLayout;
};
export default Cart;