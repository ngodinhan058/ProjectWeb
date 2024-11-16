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

  // State to track if the screen width is mobile
  const [isMobile, setIsMobile] = useState(false);
  // State to track if search bar is visible (only for mobile)
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  // State to track if the language modal is visible
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);

  // Update the state based on window width
  const updateWindowDimensions = () => {
    setIsMobile(window.innerWidth <= 767); // If width <= 767px, consider it mobile
  };

  // Use useEffect to listen for changes in window size
  useEffect(() => {
    updateWindowDimensions(); // Check initial window size
    window.addEventListener('resize', updateWindowDimensions); // Add resize event listener
    
    // Cleanup the event listener on unmount
    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  // Toggle the visibility of the search bar (only for mobile)
  const toggleSearch = () => {
    if (isMobile) {
      setIsSearchVisible(!isSearchVisible);
    }
  };

  // Toggle the language modal visibility
  const toggleLanguageModal = () => {
    setIsLanguageModalVisible(!isLanguageModalVisible);
  };

  return (
    <header style={{ overflow: 'hidden' }}>
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
            <div className={isMobile ? "col-4 d-flex justify-content-start align-items-center" : "col-md-3"}>
              <div className="header-logo">
                <a href="http://localhost:3000/" className="logo">
                  <img src="../img/logo.png" alt="Logo" />
                </a>
              </div>
            </div>
            {/* /LOGO */}

            {/* SEARCH BAR (only for desktop) */}
            {!isMobile && (
              <div className="col-md-6">
                <div className="header-search ml-5">
                  <form>
                    <select className="input-select">
                      <option value="0">All Categories</option>
                      <option value="1">Category 01</option>
                      <option value="2">Category 02</option>
                    </select>
                    <input className="input input-desktop" placeholder="Search here" />
                    <button className="search-btn">Search</button>
                  </form>
                </div>
              </div>
            )}
            {/* /SEARCH BAR */}

            {/* SEARCH BAR (only for mobile, toggle visibility) */}
            {isMobile && isSearchVisible && (
              <div className="col-12 d-inline-block justify-content-center ">
                <div className="header-search">
                  <form className="d-flex">
                    <input className="input input-mobile" placeholder="Search here" />
                    <button className="search-btn">Search</button>
                  </form>
                </div>
              </div>
            )}
            {/* /SEARCH BAR */}

            {/* ICONS AND MENU */}
            <div className={isMobile ? "col-8 row d-flex justify-content-end align-items-center" : "col-md-3 clearfix"}>
              {/* Menu Toggle (for mobile) */}
              <div className="col-md-3 header-three-line">
                {isMobile && (
                  <div className="menu-toggle float-left">
                    <a href="#" onClick={toggleSearch}>
                      <i className="fa fa-bars"></i>
                    </a>
                  </div>
                )}
              </div>

              <div className="col-md-9 header-ctn">
                {/* Search Icon (only for mobile) */}
                {isMobile && (
                  <div>
                    <a href="#" onClick={toggleSearch}>
                      <i className="fa fa-solid fa-search"></i>
                    </a>
                  </div>
                )}

                {/* Language Icon */}
                <div>
                  <a href="#" onClick={toggleLanguageModal}>
                    <i className="fa fa-solid fa-language"></i>
                    {!isMobile && <span>Language</span>}
                  </a>
                </div>

                {/* Cart */}
                <div>
                  <Link to="/cart" className="cart-link">
                    <i className="fa fa-shopping-cart"></i>
                    {!isMobile && <span>Your cart</span>}
                    <div className="qty">{getTotalQuantity()}</div> {/* Hiển thị tổng số lượng sản phẩm */}
                  </Link>
                </div>
                {/* /Cart */}
              </div>
            </div>
            {/* /ICON AND MENU */}
          </div>
        </div>
      </div>
      {/* /MAIN HEADER */}

      {/* LANGUAGE SELECTION MODAL */}
      {isLanguageModalVisible && (
        <div className="language-modal">
          <div className="modal-content">
            <span className="close-btn" onClick={toggleLanguageModal}>&times;</span>
            <h3>Select Language</h3>
            <ul>
              <li><button>English</button></li>
              <li><button>Spanish</button></li>
              <li><button>French</button></li>
              <li><button>German</button></li>
            </ul>
          </div>
        </div>
      )}
      {/* /LANGUAGE SELECTION MODAL */}
    </header>
  );
};

export default Header;
