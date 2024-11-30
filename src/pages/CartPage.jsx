import React, { useEffect, useMemo, useState } from 'react';
import CartItem from '../components/CartItem.jsx';
import Skeleton from 'react-loading-skeleton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../components/api/config';
import axios from 'axios';

const CartPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(); // Quản lý state số lượng
  const [cartId, setCartId] = useState(); // Quản lý state số lượng

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
  useEffect(() => {
    const savedCartId = localStorage.getItem('cartId');
    setCartId(savedCartId)

  }, []);
  // useEffect(() => {
  //   loadCartFromStorage();
  // }, [cartItems]);

  const calculateTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const quantity = item.quantity || 0; // Nếu quantity là null hoặc undefined, gán 0
      if (quantity > 0) {
        return total + parseFloat(item.price.replace(/\D/g, ''), 10) * quantity;
      }
      return total; // Bỏ qua sản phẩm nếu quantity <= 0
    }, 0);
  }, [cartItems]);
  
  const handleQuantityChangeUser = async (id, isDecrease, sizeId) => {
  console.log("ádsadsadsa",id, isDecrease, sizeId);

    // Chuẩn bị payload
    const cartItemData = {
      cartItem: {
        productQuantity: 1, // -1 nếu giảm, +1 nếu tăng
        productId: id,
        sizeId: sizeId,
      },
    };

    try {
      // Gửi yêu cầu tương ứng dựa trên hành động
      const response = isDecrease
        ? await axios.delete(`${BASE_URL}cart/${cartId}`, { data: cartItemData }) // Xóa sản phẩm nếu giảm
        : await axios.put(`${BASE_URL}cart/${cartId}`, cartItemData); // Cập nhật nếu tăng

      if (response.status === 200 || response.status === 201) {
        console.log("Cập nhật giỏ hàng thành công:", response.data);
      } else {
        console.error("Không thể cập nhật giỏ hàng:", response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng:", error);
    }
  };
    // Delete item from cart
    const handleDeleteUser = async (id, size) => {
      const cartItemData = {
        cartItem: {
          productId: id,
          sizeId: size,
        },
      };
      try {
        // Gửi yêu cầu xoá sản phẩm
        const response = await axios.delete(`${BASE_URL}cart/${cartId}`, {
          data: cartItemData,
        });
  
        if (response.status === 200) {
          console.log("Sản phẩm đã được xoá:", response.data);
  
        
        } else {
          console.error("Không thể xoá sản phẩm khỏi giỏ hàng:", response.data.message);
        }
      } catch (error) {
        console.error("Lỗi khi xoá sản phẩm:", error.message);
      }
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
    setTimeout(() => setIsLoading(false), 1000);
  }, []);  // Chạy 1 lần khi component mount

  useEffect(() => {
    loadCartFromStorage();
    setTimeout(() => setIsLoading(false), 1000); // Giả lập thời gian tải dữ liệu
  }, []);
  
  const handlePlaceOrder = async () => {
    if (!customerName || !customerPhone) {
      setError('Vui lòng nhập đầy đủ tên và số điện thoại');
      return;
    }
    setError('');
    setIsLoading(true);
    const apiUrl = `${BASE_URL}order/guest`;
    console.log(apiUrl);
    

    const orderData = {
      cart: cartId,
      orderCoupon: [],
      orderNote: "",
      orderPayment: 1,
      userName: customerName,
      userPhone: customerPhone,
      userEmail: "",
      userAddress: "",
      userDistrict: "",
      userCity: "",
      userWard: "",
      totalPrice: calculateTotal,
    };
    // console.log(orderData);

    try { 
      // Make the API call to place the order
      const response = await axios.post(apiUrl, orderData);

      // Handle the response
      if (response.status === 200 || response.status === 201) {
        const userInfo = { name: customerName, phone: customerPhone };
        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.removeItem('cart');
        localStorage.removeItem("cartId");
        localStorage.removeItem("guestId");
        alert('Đơn hàng đã được ghi nhận, nhân viên chúng tôi sẽ liên hệ quý khách sớm nhất có thể để xác nhận đơn');
        window.location.reload()
        console.log('Success', 'Order placed successfully!');
      } else {
        console.log('Error', 'Failed to place the order. Please try again.');
        alert('Có lỗi trong quá trình ghi nhận đơn đặt hàng, xin thử lại hoặc liên hệ số hotline để được hỗ trợ');
      }
    } catch (error) {
      // console.error('Error placing order:', error);
      console.log('Error', 'Thất Bại '+ error);
      alert('Có lỗi trong quá trình ghi nhận đơn đặt hàng, xin thử lại hoặc liên hệ số hotline để được hỗ trợ ');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cart-page">
      <CartItem cartItems={cartItems} onSetCartItems={setCartItems} onQuantityChange={handleQuantityChangeUser} onDelete={handleDeleteUser}/>

      <div className="cart-summary">
        <p>
          Tổng tiền:
          {isLoading ? (
            <span className="total-price">
              {' '}
              <Skeleton width={80} height={20} />
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
          className={`customer-input ${error && !customerName ? 'error-input' : ''
            }`}
        />
        <input
          type="text"
          placeholder="Nhập số điện thoại của bạn"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          className={`customer-input ${error && !customerPhone ? 'error-input' : ''
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
