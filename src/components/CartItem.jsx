import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Cart = ({ cartItems, onSetCartItems: setCartItems, onQuantityChange, onDelete}) => {
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

  // console.log('Cart', cartItems);


  const handleRemoveItem = (id, size, sizeId) => {
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
      onDelete(id, sizeId)
      return updatedItems;
    });
  };

  const handleDecrement = (id, size, sizeId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === id && item.quantity > 1 && item.size == size) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item; // Giữ nguyên nếu số lượng = 1
      });
      onQuantityChange(id, true, sizeId);
      saveCartToStorage(updatedItems); // Lưu giỏ hàng đã cập nhật vào localStorage
      return updatedItems;
    });
  };

  const handleIncrement = (id, size, sizeId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id && item.size == size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      onQuantityChange(id, false, sizeId);

      saveCartToStorage(updatedItems); // Lưu giỏ hàng đã cập nhật vào localStorage
      return updatedItems;
    });
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
              <div className="cart-item-column image">
               <Skeleton height={75} width={80} />
              </div>
              <div className="cart-item-column info">
                <Skeleton width={160} height={20} />
                <Skeleton width={50} height={15} />
                <Skeleton width={100} height={15} />
              </div>
              <div className="cart-item-column actions">
                <Skeleton width={50} height={30} />
                <Skeleton width={50} height={30} />
              </div>
            </div>
          ))
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item-mobile">
              <div className="cart-item-column image">
                <img src={item.image} alt={item.name} className="product-image" />
              </div>
              <div className="cart-item-column info">
                <div>{item.name}</div>
                <div>Size: {item.size}</div>
                <div className="cart-price1">Giá: {item.price}</div>
              </div>
              <div className="cart-item-column actions">
                <div>
                  <button className='btn-giam' onClick={() => handleDecrement(item.id, item.size, item.sizeId)}>-</button>
                  {item.quantity}
                  <button className='btn-tang' onClick={() => handleIncrement(item.id, item.size, item.sizeId)}>+</button>
                  <br />
                  <button className="remove-button" onClick={() => handleRemoveItem(item.id, item.size, item.sizeId)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>

                </div>
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
                <td><Skeleton height={75} width={75} /></td>
                <td><Skeleton width={190} height={15} /></td>
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
                <td className="price-column">{item.price}</td>
                <td>{item.size}</td>
                <td>
                  <button onClick={() => handleDecrement(item.id, item.size, item.sizeId)}>-</button>
                  {item.quantity}
                  <button onClick={() => handleIncrement(item.id, item.size, item.sizeId)}>+</button>
                </td>
                <td>
                  {(
                    parseInt(item.price.replace(/\D/g, ''), 10) *
                    item.quantity
                  ).toLocaleString('vi-VN') + ' ₫'}
                </td>
                <td>
                  <button onClick={() => handleRemoveItem(item.id, item.size, item.sizeId)} className="remove-button1">Xóa</button>
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