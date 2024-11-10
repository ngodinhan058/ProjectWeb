import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const Header = () => {
  const [cartItems, setCartItems] = useState({ items: [] });  // Default to an object with an empty 'items' array

  // Hàm để lấy giỏ hàng từ localStorage và thiết lập state
  useEffect(() => {
    const cartData = localStorage.getItem('cart');
  
    if (cartData) {
      try {
        const parsedData = JSON.parse(cartData);
        console.log(parsedData);  // Kiểm tra xem dữ liệu có đúng không

        // Kiểm tra xem parsedData có phải là mảng hay không
        if (parsedData && parsedData.items && Array.isArray(parsedData.items)) {
          setCartItems(parsedData);  // Set entire cart object
        } else {
          console.error("cartData is not an array:", parsedData);
          setCartItems({ items: [] });  // Reset to empty items array
        }
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setCartItems({ items: [] });  // Reset to empty items array if error occurs
      }
    }
  }, []);

  // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
  const updateQuantity = (itemId, newQuantity, e) => {
    // Ngừng sự kiện để không đóng dropdown
    e.stopPropagation();

    let updatedItems = [...cartItems.items];

    // Nếu số lượng mới <= 0, xóa sản phẩm khỏi giỏ
    if (newQuantity <= 0) {
      updatedItems = updatedItems.filter(item => item.id !== itemId);
    } else {
      // Nếu số lượng hợp lệ, chỉ cập nhật số lượng
      updatedItems = updatedItems.map(item => {
        if (item.id === itemId) {
          item.quantity = newQuantity;  // Cập nhật số lượng mới
        }
        return item;
      });
    }

    // Cập nhật lại state và localStorage
    const updatedCart = { items: updatedItems };
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeItem = (itemId, e) => {
    // Ngừng sự kiện để không đóng dropdown
    e.stopPropagation();

    const updatedItems = cartItems.items.filter(item => item.id !== itemId);

    // Cập nhật state và lưu vào localStorage
    const updatedCart = { items: updatedItems };
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Tính tổng số lượng sản phẩm trong giỏ
  const getTotalQuantity = () => {
    return cartItems.items.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  // Tính tổng giá trị giỏ hàng
  const getTotalPrice = () => {
    return cartItems.items.reduce((total, item) => total + parseFloat(item.price.replace(' ₫', '').replace(',', '')) * item.quantity, 0).toFixed(2) ;
  };

  return (
    <header>
      {/* TOP HEADER */}
      <div id="top-header">
        <div className="container">
          <ul className="header-links pull-left">
            <li><a href="#"><i className="fa fa-phone"></i> +021-95-51-84</a></li>
            <li><a href="#"><i className="fa fa-envelope-o"></i> email@email.com</a></li>
            <li><a href="#"><i className="fa fa-map-marker"></i> 1734 Stonecoal Road</a></li>
          </ul>
          <ul className="header-links pull-right">
            <li><a href="#"><i className="fa fa-dollar"></i> USD</a></li>
            <li><a href="#"><i className="fa fa-user-o"></i> My Account</a></li>
          </ul>
        </div>
      </div>
      {/* /TOP HEADER */}

      {/* MAIN HEADER */}
      <div id="header">
        <div className="container">
          <div className="row">
            {/* LOGO */}
            <div className="col-md-3">
              <div className="header-logo">
                <a href="http://localhost:3000/" className="logo">
                  <img src="../img/logo.png" alt="Logo" />
                </a>
              </div>
            </div>
            {/* /LOGO */}

            {/* SEARCH BAR */}
            <div className="col-md-6">
              <div className="header-search">
                <form>
                  <select className="input-select">
                    <option value="0">All Categories</option>
                    <option value="1">Category 01</option>
                    <option value="2">Category 02</option>
                  </select>
                  <input className="input" placeholder="Search here" />
                  <button className="search-btn">Search</button>
                </form>
              </div>
            </div>
            {/* /SEARCH BAR */}

            {/* ACCOUNT */}
            <div className="col-md-3 clearfix">
              <div className="header-ctn">
                {/* Wishlist */}
                <div>
                  <a href="#">
                    <i className="fa fa-heart-o"></i>
                    <span>Your Wishlist</span>
                    <div className="qty">2</div>
                  </a>
                </div>
                {/* /Wishlist */}

                {/* Cart */}
                <div className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                    <i className="fa fa-shopping-cart"></i>
                    <span>Your Cart</span>
                    <div className="qty">{getTotalQuantity()}</div> {/* Hiển thị tổng số lượng sản phẩm từ localStorage */}
                  </a>
                  <div className="cart-dropdown">
                    <div className="cart-list">
                      {cartItems.items.map(item => (
                        <div key={item.id} className="product-widget">
                          <div className="product-img">
                            <img src={item.image} alt={item.name} />
                          </div>
                          <div className="product-body">
                            <h3 className="product-name"><a href="#">{item.name}</a></h3>
                            <h4 className="product-price">
                              <span className="qty">{item.quantity}x</span>
                              {item.price}
                            </h4>
                          </div>
                          <button 
                            className="delete" 
                            onClick={(e) => removeItem(item.id, e)}  // Gọi hàm xóa khi nhấn nút
                          >
                            <i className="fa fa-close"></i>
                          </button>
                          <div>
                            {/* Cập nhật số lượng */}
                            <button className="" onClick={(e) => updateQuantity(item.id, item.quantity + 1, e)}>+</button>
                            <button className="" onClick={(e) => updateQuantity(item.id, item.quantity - 1, e)}>-</button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="cart-summary">
                      <small>{getTotalQuantity()} Item(s) selected</small>
                      <h5>SUBTOTAL: {getTotalPrice()} ₫</h5>
                    </div>
                    <div className="cart-btns">
                      {/* Thay thế thẻ a bằng Link */}
                      <Link to="/cart">View Cart</Link>
                      <a href="#">Checkout <i className="fa fa-arrow-circle-right"></i></a>
                    </div>
                  </div>
                </div>
                {/* /Cart */}

                {/* Menu Toggle */}
                <div className="menu-toggle">
                  <a href="#">
                    <i className="fa fa-bars"></i>
                    <span>Menu</span>
                  </a>
                </div>
                {/* /Menu Toggle */}
              </div>
            </div>
            {/* /ACCOUNT */}
          </div>
        </div>
      </div>
      {/* /MAIN HEADER */}
    </header>
  );
};

export default Header;
