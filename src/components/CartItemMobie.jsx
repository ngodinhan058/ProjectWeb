import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CartMobie = () => {
     const [isLoading, setIsLoading] = useState(true);
     const [cartItems, setCartItems] = useState([]);
     const [customerName, setCustomerName] = useState('');
     const [customerPhone, setCustomerPhone] = useState('');
     const [error, setError] = useState('');

     // Hàm lưu giỏ hàng vào localStorage
     const saveCartToStorage = (items) => {
          console.log("Saving to localStorage:", items);
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
               console.log("No cart items found in localStorage.");  // Nếu không có dữ liệu
               setCartItems([]); // Giỏ hàng rỗng nếu không có gì trong localStorage
          }
     };

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

     const handleRemoveItem = (id) => {
          setCartItems((prevItems) => {
               const updatedItems = prevItems.filter((item) => item.id !== id);
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
                    item.id === id && item.size == size ? { ...item, quantity: item.quantity + 1 } : item
               );
               saveCartToStorage(updatedItems); // Lưu giỏ hàng đã cập nhật vào localStorage
               return updatedItems;
          });
     };

     const calculateTotal = () => {
          return cartItems.reduce((total, item) => {
               const quantity = item.quantity || 0; // Nếu quantity là null hoặc undefined, gán 0
               if (quantity > 0) {
                    return total + parseFloat(item.price.replace(/[^\d.-]/g, '')) * quantity;
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
               setCustomerName(userInfo.name || '');  // Nạp tên khách hàng vào
               setCustomerPhone(userInfo.phone || ''); // Nạp số điện thoại khách hàng vào
          }

          loadCartFromStorage();
          setTimeout(() => setIsLoading(false), 1000); // Giả lập thời gian tải dữ liệu
     }, []);


     useEffect(() => {
          loadCartFromStorage();
          setTimeout(() => setIsLoading(false), 1000);
     }, []);


     return (
          <div className="cart">
               <table className="cart-table">
                    <thead>
                         <div className="titleCart">GIỎ HÀNG CỦA BẠN</div>
                    </thead>
                    <tbody>
                         {isLoading ? (
                              // Hiển thị Skeleton khi dữ liệu đang được tải
                              cartItems.map((_, index) => (
                                   <tr key={index}>
                                        <td><Skeleton height={75} width={75} /></td> {/* Skeleton cho ảnh sản phẩm */}
                                        <td>
                                             <Skeleton width={150} height={20} /> {/* Skeleton cho tên sản phẩm */}
                                             <Skeleton width={100} height={15} /> {/* Skeleton cho giá sản phẩm */}
                                        </td>
                                        <td>
                                             <Skeleton width={50} height={30} /> {/* Skeleton cho số lượng */}
                                             <Skeleton width={60} height={30} /> {/* Skeleton cho nút tăng giảm */}
                                        </td>
                                   </tr>
                              ))
                         ) : (
                              cartItems.map((item) => (
                                   <tr key={item.id}>
                                        <td>
                                             <img src={item.image} alt={item.name} className="product-image" />
                                        </td>
                                        <td>
                                             <h3>{item.name}</h3>
                                             <p>Size: {item.size}</p>
                                             <p>Giá: {item.price}</p>
                                        </td>
                                        <td>
                                             {/* <button onClick={() => handleDecrement(item.id, item.size)}>-</button>
                                             {item.quantity}
                                             <button onClick={() => handleIncrement(item.id, item.size)}>+</button> */}

                                             <input type="number" value={item.quantity} onChange={(e) => handleQuantityChange(item.id, e.target.value)} min="1" className="quantity-input"
                                             />
                                             <br />
                                             <button onClick={() => handleRemoveItem(item.id)} className="remove-button">Xóa</button>
                                        </td>
                                   </tr>
                              ))
                         )}
                    </tbody>
               </table>
          </div>
     );
};

export default CartMobie;
