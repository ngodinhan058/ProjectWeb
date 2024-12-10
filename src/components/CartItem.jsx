import React, { useEffect, useState, useContext  } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { CartContext } from './CartContext';

const Cart = ({  onQuantityChange, onDelete }) => {
  const { cartItems, setCartItems } = useContext(CartContext);  
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [error, setError] = useState('');

  const handleRemoveItem = (id, size, sizeId) => {
    const updatedItems = cartItems.items.filter(
      (item) => !(item.id === id && item.size === size)
    );
    onDelete(id, sizeId);
    setCartItems(updatedItems); // Cập nhật giỏ hàng
  };

  const handleDecrement = (id, size, sizeId) => {
    const updatedItems = cartItems.items.map((item) =>
      item.id === id && item.size === size && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    onQuantityChange(id, true, sizeId);
    setCartItems(updatedItems); // Cập nhật giỏ hàng
  };

  const handleIncrement = (id, size, sizeId) => {
    const updatedItems = cartItems.items.map((item) =>
      item.id === id && item.size === size
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    onQuantityChange(id, false, sizeId);
    setCartItems(updatedItems); // Cập nhật giỏ hàng
  };



  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userInfo = JSON.parse(storedUser);
      setCustomerName(userInfo.name || '');
      setCustomerPhone(userInfo.phone || '');
    }

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Giao diện mobile
  const mobileLayout = (
    <div className="cart">
      <div className="titleCart">GIỎ HÀNG CỦA BẠN</div>
      <div>
        {isLoading ? (
          cartItems.items.map((_, index) => (
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
          cartItems.items.map((item) => (
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
            ? Array.from({ length: cartItems.items.length }).map((_, index) => (
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
            : cartItems.items.map((item) => (
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