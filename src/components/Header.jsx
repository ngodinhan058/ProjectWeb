import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Header = () => {
  const [cartItems, setCartItems] = useState({ items: [] }); // Default to an object with an empty 'items' array
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cập nhật trạng thái isMobile khi thay đổi kích thước cửa sổ
  window.addEventListener('resize', () => {
    setIsMobile(window.innerWidth <= 991);
  });

  // Hàm để lấy giỏ hàng từ localStorage và thiết lập state
  useEffect(() => {
    const cartData = localStorage.getItem('cart');

    if (cartData) {
      try {
        const parsedData = JSON.parse(cartData);
        console.log(parsedData); // Kiểm tra xem dữ liệu có đúng không

        // Kiểm tra xem parsedData có phải là mảng hay không
        if (parsedData && parsedData.items && Array.isArray(parsedData.items)) {
          setCartItems(parsedData); // Set entire cart object
        } else {
          console.error('cartData is not an array:', parsedData);
          setCartItems({ items: [] }); // Reset to empty items array
        }
      } catch (error) {
        console.error('Error parsing cart data:', error);
        setCartItems({ items: [] }); // Reset to empty items array if error occurs
      }
    }
    getTotalQuantity();
  }, []);

  // Lắng nghe sự kiện nhấp chuột ra ngoài menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Đóng menu khi nhấp ra ngoài
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Clean up khi component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Tính tổng số lượng sản phẩm trong giỏ
  const getTotalQuantity = () => {
    return cartItems.items.reduce(
      (total, item) => total + (item.quantity || 0),
      0
    );
  };

  const handleLanguageSelect = (language) => {
    console.log('Selected language: ${language}');
    setDropdownOpen(false); // Đóng dropdown sau khi chọn
  };

  // State to track if the screen width is mobile
  const [isMobile, setIsMobile] = useState(false);
  // State to track if search bar is visible (only for mobile)
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  // State to track if the language modal is visible
  const [isDropdownOpen, setDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header>
      {/* TOP HEADER */}
      <div id="top-header">
        <div className="container">
          <ul className="header-links pull-left">
            <li>
              <a href="#">
                <i className="fa fa-phone"></i> +021-95-51-84
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-envelope-o"></i> email@email.com
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-map-marker"></i> 1734 Stonecoal Road
              </a>
            </li>
          </ul>
          <ul className="header-links pull-right">
            <li>
              <a href="#">
                <i className="fa fa-dollar"></i> USD
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-user-o"></i> My Account
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* /TOP HEADER */}

      {/* MAIN HEADER */}
      <div id="header">
        <div className="container">
          <div className="row">
            {/* LOGO */}
            {!isMobile && (
              <div className="col-3 d-flex justify-content-start align-items-center">
                <div className="header-logo">
                  <a href="http://localhost:3000/" className="logo">
                    <img src="../img/logo.png" alt="Logo" />
                  </a>
                </div>
              </div>
            )}
            {/* /LOGO */}

            {/* SEARCH BAR (only for desktop) */}
            {!isMobile && (
              <div className="col-md-7">
                <div className="header-search ml-5">
                  <form>
                    <select className="input-select">
                      <option value="0">All Categories</option>
                      <option value="1">Category 01</option>
                      <option value="2">Category 02</option>
                    </select>
                    <input
                      className="input input-desktop"
                      placeholder="Search here"
                    />
                    <button className="search-btn">Search</button>
                  </form>
                </div>
              </div>
            )}
            {/* /SEARCH BAR */}

            {/* ICONS AND MENU */}
            <div
              className={
                isMobile
                  ? 'col-12 d-flex justify-content-end align-items-center header-ctn-mobile'
                  : 'col-md-3 clearfix'
              }
            >
              {/* Menu Toggle (for mobile) */}
              {isMobile && (
                <div className="col-md-3 header-ctn-mobile">
                  <div className="menu-toggle float-left" onClick={toggleMenu}>
                    <a href="#">
                      <i className="fa fa-bars"></i>
                    </a>
                  </div>
                </div>
              )}

              {/* Menu */}
              {isMobile && (
                <nav
                  id="responsive-nav"
                  className={isMenuOpen ? 'active' : 'none'}
                  ref={menuRef}
                >
                  <ul className="main-nav">
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">Shop</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                    <li>
                      <a href="#">About</a>
                    </li>
                  </ul>
                </nav>
              )}

              {/* LOGO */}
              {isMobile && (
                <div className="col-md-6 header-ctn-mobile">
                  <a href="http://localhost:3000/" className="logo">
                    <img src="../img/logo.png" alt="Logo" />
                  </a>
                </div>
              )}
              {/* /LOGO */}

              {!isMobile && (
                <div className="col-md-8 header-ctn ">
                  {/* Language Icon */}
                  <div className="language-dropdown">
                    <a href="#" onClick={toggleDropdown}>
                      <i className="fa fa-solid fa-language"></i>
                      {!isMobile && <span>Language</span>}
                    </a>
                    {isDropdownOpen && (
                      <ul className="dropdown-menu">
                        <li onClick={() => handleLanguageSelect('English')}>
                          <button>English</button>
                        </li>
                        <li onClick={() => handleLanguageSelect('Spanish')}>
                          <button>Spanish</button>
                        </li>
                        <li onClick={() => handleLanguageSelect('French')}>
                          <button>French</button>
                        </li>
                        <li onClick={() => handleLanguageSelect('German')}>
                          <button>German</button>
                        </li>
                      </ul>
                    )}
                  </div>

                  {/* Cart */}
                  <div>
                    <Link to="/cart" className="cart-link">
                      <i className="fa fa-shopping-cart"></i>
                      {!isMobile && <span>Your cart</span>}
                      <div className="qty">{getTotalQuantity()}</div>{' '}
                      {/* Hiển thị tổng số lượng sản phẩm */}
                    </Link>
                  </div>
                  {/* /Cart */}
                </div>
              )}

              {isMobile && (
                <div className="col-md-3 header-ctn-mobile ">
                  <div className="icon-mobile">
                    <a href="#" onClick={toggleSearch}>
                      <i className="fa fa-solid fa-search"></i>
                    </a>
                  </div>

                  {/* Language Icon */}
                  <div className="language-dropdown-mobile icon-mobile">
                    <a href="#" onClick={toggleDropdown}>
                      <i className="fa fa-solid fa-language"></i>
                      {!isMobile && <span>Language</span>}
                    </a>
                    {isDropdownOpen && (
                      <ul className="dropdown-menu">
                        <li onClick={() => handleLanguageSelect('English')}>
                          <button>English</button>
                        </li>
                        <li onClick={() => handleLanguageSelect('Spanish')}>
                          <button>Spanish</button>
                        </li>
                        <li onClick={() => handleLanguageSelect('French')}>
                          <button>French</button>
                        </li>
                        <li onClick={() => handleLanguageSelect('German')}>
                          <button>German</button>
                        </li>
                      </ul>
                    )}
                  </div>

                  {/* Cart */}
                  <div>
                    <Link to="/cart" className="cart-link icon-mobile">
                      <i className="fa fa-shopping-cart"></i>
                      {!isMobile && <span>Your cart</span>}
                    </Link>
                  </div>
                  {/* /Cart */}
                </div>
              )}
            </div>
            {/* /ICON AND MENU */}

            {/* SEARCH BAR (only for mobile, toggle visibility) */}
            {isMobile && isSearchVisible && (
              <div className="col-12 d-inline-block justify-content-center ">
                <div className="header-search">
                  <form className="d-flex">
                    <input
                      className="input input-mobile"
                      placeholder="Search here"
                    />
                    <button className="search-btn">Search</button>
                  </form>
                </div>
              </div>
            )}
            {/* /SEARCH BAR */}
          </div>
        </div>
      </div>
      {/* /MAIN HEADER */}
    </header>
  );
};

export default Header;
