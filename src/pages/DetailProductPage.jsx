import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick'; // Import react-slick
import 'slick-carousel/slick/slick.css'; // Import slick CSS
import 'slick-carousel/slick/slick-theme.css'; // Import slick theme CSS
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, Link } from 'react-router-dom';
import Product from '../components/Product';
import { BASE_URL } from '../components/api/config';
import { axiosInstance } from '../components/api/axiosConfig';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ZoomEffect from '../components/ZoomEffect';
import ProductTabs from '../components/ProductTabs';
import Breadcrumb from '../components/Breadcrumb';
import axios from 'axios';
import PopupImage from '../components/PopupImage';



// Hàm tính toán thời gian hết hạn (ở đây là 1 tuần)
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // 1 tuần (mili giây)
const getExpiryTime = () => Date.now() + ONE_WEEK;

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    id,
  } = location.state || {};
  const [categoryId, setCategoryId] = useState(); // Dữ liệu sản phẩm
  const [selectedSize, setSelectedSize] = useState(''); // Đặt size mặc định
  const [categoriess, setCategoriess] = useState([]);
  const [hoveredSize, setHoveredSize] = useState(null);
  // Cài đặt cho slider (carousel) trên desktop
  const sliderRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [images, setImage] = useState('');
  const [productsState, setProductsState] = useState(null); // Dữ liệu sản phẩm ban đầu là null thay vì mảng rỗng
  const [productsRelate, setProductsRelate] = useState([]); // Dữ liệu sản phẩm liên quan
  const [quantityP, setQuantityP] = useState([]); // Dữ liệu sản phẩm liên quan
  const [isLoading, setIsLoading] = useState(true); // Đang tải dữ liệu
  // Hàm lấy dữ liệu sản phẩm
  const fetchProductData = async (id) => {
    const productsApiUrl = `${BASE_URL}product/${id}`; // API lấy thông tin sản phẩm theo ID
    try {
      const response = await axios.get(productsApiUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true', // Bỏ qua cảnh báo của ngrok nếu có
        },
      });
      return response.data.data; // Trả về dữ liệu sản phẩm
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  };

  // Hàm lấy sản phẩm liên quan
  const fetchRelatedProducts = async (categoryId) => {
    const categoriesApiUrl = `${BASE_URL}products/relate/${categoryId}`; // API lấy sản phẩm liên quan theo categoryId
    try {
      const response = await axios.get(categoriesApiUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });
      return response.data.data; // Trả về dữ liệu sản phẩm liên quan
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm liên quan:', error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  };

  
  const fetchAllCategories = async () => {
    const categoriesApiUrl = `${BASE_URL}categories`; // API lấy sản phẩm liên quan theo categoryId
    try {
      const response = await axios.get(categoriesApiUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });
      return response.data.data; // Trả về dữ liệu sản phẩm liên quan
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm liên quan:', error);
      throw error;
    }
  };

  // Hàm chính để gọi đồng thời hết API
  const fetchData = async () => {
    try {
      const productsData = await fetchProductData(id);
      const categoryId = productsData.categories[0].categoryId;
      const images = productsData.productImages;
      const productRelateData = await fetchRelatedProducts(categoryId);
      const allCategories = await fetchAllCategories();

      setProductsState(productsData);
      setProductsRelate(productRelateData);
      setCategoriess(allCategories)
      setCategoryId(categoryId)
      setImage(images)
      setIsLoading(false);

    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (productsState && productsState.productImages && productsState.productImages.length > 0) {
      setSelectedImage(`../${productsState.productImages[0]?.productImagePath}`);
    } else {
      setSelectedImage(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/langvi-300px-No_image_available.svg.png'
      );
    }
  }, [productsState, id]);
  const handleImageClick = (imgSrc, index) => {
    setSelectedImage(`../${imgSrc}`);
  };
  const renderRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i} className={i <= productsState.productRating ? 'fa fa-star' : 'fa fa-star-o'}></i>
      );
    }
    return stars;
  };


  // THÊM CART VÀO LOCAL
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [errorCheck, setErrorCheck] = useState(false);
  const [errorCheckQuantity, setErrorCheckQuantity] = useState(false);
  useEffect(() => {
    if (selectedSize && quantity > 0) {
      setError('');
    }
  }, [selectedSize, quantity])
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      const { items, expiry } = JSON.parse(savedCart);
      if (Date.now() > expiry) {
        localStorage.removeItem('cart');
      } else {
        setCart(Array.isArray(items) ? items : []); // Đảm bảo items là mảng
      }
    } else {
      setCart([]); // Nếu không có dữ liệu trong localStorage, khởi tạo cart là mảng rỗng
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      const cartData = {
        items: cart,
        expiry: getExpiryTime(), // Get the new expiry time
      };
      localStorage.setItem('cart', JSON.stringify(cartData)); // Save updated cart to localStorage
    }
  }, [cart]);


  const handleAddToCart = async () => {
    if (!selectedSize) {
      setError('Vui lòng chọn kích thước sản phẩm');
      setErrorCheck(false);
      setTimeout(() => setErrorCheck(true), 0);
      return;
    }
  
    if (quantity < 1) {
      setError('Vui lòng chọn số lượng hợp lệ');
      setErrorCheck(false);
      setTimeout(() => setErrorCheck(true), 0);
      return;
    }
  
    // Lấy thông tin kích thước đã chọn từ productSizes
    const selectedProductSize = productsState.productSizes.find(
      (size) => size.productSizeName === selectedSize
    );
  
    if (!selectedProductSize) {
      setError('Kích thước sản phẩm không tồn tại');
      setErrorCheck(false);
      setTimeout(() => setErrorCheck(true), 0);
      return;
    }
  
    // Nếu vượt qua các kiểm tra, tiến hành thêm sản phẩm vào giỏ hàng
    setError('');
    setErrorCheck(false);
    setErrorCheckQuantity(false);
  
    const basePrice = parseInt(productsState.productPriceSale.replace(/\D/g, ''), 10);
  
    const existingProductIndex = cart.findIndex(
      (item) => item.id === id && item.size === selectedSize
    );
  
    let updatedCart;
    if (existingProductIndex !== -1) {
      // Cập nhật sản phẩm có trong giỏ hàng
      updatedCart = cart.map((item, index) =>
        index === existingProductIndex
          ? {
              ...item,
              quantity: item.quantity + quantity,
              price: basePrice.toLocaleString() + " ₫",
              total: (basePrice * (item.quantity + quantity)).toLocaleString() + " ₫",
              image: selectedImage,
            }
          : item
      );
    } else {
      // Thêm sản phẩm mới vào giỏ hàng
      const newProduct = {
        id,
        name: productsState.productName,
        size: selectedSize,
        quantity,
        price: basePrice.toLocaleString() + " ₫",
        total: (basePrice * quantity).toLocaleString() + " ₫",
        image: selectedImage,
      };
      updatedCart = [...cart, newProduct];
    }
  
    // Cập nhật giỏ hàng vào state và localStorage
    setCart(updatedCart);
    const cartData = {
      items: updatedCart,
      expiry: getExpiryTime(), // Lấy thời gian hết hạn mới
    };
    localStorage.setItem('cart', JSON.stringify(cartData)); // Lưu giỏ hàng vào localStorage
  
    // Dữ liệu gửi đến API
    const cartItemData = {
      cartItem: {
        productQuantity: quantity,
        productId: id,
        sizeId: selectedProductSize.productSizeId,
      },
    };
  
    console.log("response",cartItemData);
    try {
      // Gửi yêu cầu PUT đến API để thêm sản phẩm vào giỏ hàng
      const response = await axios.post(`${BASE_URL}cart/guest`, cartItemData);
      
      if (response.status === 200) {
        console.log("Sản phẩm đã được thêm vào giỏ hàng:", response.data);
      } else {
        console.error("Không thể thêm sản phẩm vào giỏ hàng:", response.data.message);
      }
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
    }
  
    // Điều hướng và reload trang
    setTimeout(() => {
      navigate("/cart");
      // window.location.reload();
    }, 100);
  };
  

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  // Hàm xử lý khi có thay đổi trong ô input
  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    } else {
      setQuantity(1); // Nếu giá trị nhập không hợp lệ thì đặt về 1
    }
  };
  // KẾT THÚC THÊM CART VÀO LOCAL


  const [isHoveredUp, setIsHoveredUp] = useState(false);
  const [isHoveredDown, setIsHoveredDown] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 481 });
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const DownArrow = ({ className, style, onClick }) => (
    <div
      className={className}
      style={{
        ...style,
        width: 40,
        height: 40,
        display: 'block',
        background: isHoveredUp ? '#ef233c' : '#fff',
        border: '1px solid #e4e7ed',
        color: isHoveredUp ? '#fff' : '#000',
        textAlign: 'center',
        transition: 'background 0.3s, color 0.3s',
        position: isMobile ? 'absolute' : '',
        top: isMobile ? '40%' : '-4%',
        left: isMobile ? '0%' : '',
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHoveredUp(true)}
      onMouseLeave={() => setIsHoveredUp(false)}
    >
      <i
        className={isMobile ? 'fa fa-chevron-left' : 'fa fa-chevron-up'}
        style={{ fontSize: 20, position: 'absolute', right: '22%', top: '20%' }}
      ></i>
    </div>
  );

  const UpArrow = ({ className, style, onClick }) => (
    <div
      className={className}
      style={{
        ...style,
        width: 40,
        height: 40,
        display: 'block',
        background: isHoveredDown ? '#ef233c' : '#fff',
        border: '1px solid #e4e7ed',
        color: isHoveredDown ? '#fff' : '#000',
        textAlign: 'center',
        transition: 'background-color 0.3s ease, color 0.3s ease', // Đảm bảo cú pháp đúng
        position: isMobile ? 'absolute' : '',
        bottom: isDesktop ? '40%' : '-4%',
        top: isMobile ? '40%' : '',
        left: isMobile ? '100%' : '',
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHoveredDown(true)}
      onMouseLeave={() => setIsHoveredDown(false)}
    >
      <i
        className={isMobile ? 'fa fa-chevron-right' : 'fa fa-chevron-down'}
        style={{ fontSize: 20, position: 'absolute', right: '22%', top: '20%' }}
      ></i>
    </div>
  );
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: isDesktop,
    verticalSwiping: true,
    arrows: true,
    nextArrow: <UpArrow />, // Mũi tên xuống tùy chỉnh
    prevArrow: <DownArrow />, // Mũi tên lên tùy chỉnh
  };

  const sliderSettings = {
    infinite: true,
    speed: 100,
    slidesToShow: 4, // Hiển thị 4 sản phẩm trên desktop
    slidesToScroll: 1,
    autoplay: true, // Tự động chạy
    autoplaySpeed: 2000, // Chuyển mỗi 2 giây
    arrows: false,
  };

  return (
    <>
      <div id="breadcrumb" className="section">
        <div className="container">
          <div className="row">
            {/* <Breadcrumb categoryId={categoryIdss} allCategories={categoriess} /> */}
            <Breadcrumb
              categoryId={categoryId}
              allCategories={categoriess}
            />

          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="row">
            {/* Main Image */}
            <div
              className="col-md-5 col-md-push-2"
              style={{ position: 'relative' }}
            >
              <div id="product-main-img">
                <div className="product-preview">
                  {isLoading ? (
                    <Skeleton height={400} />
                  ) : isMobile ? (
                    <PopupImage img={selectedImage} />
                  ) : (
                    <ZoomEffect imageUrl={selectedImage} zoomLevel={2} />
                  )}
                </div>
              </div>
            </div>
            {/* Thumbnail Images */}
            <div className="col-md-2 col-md-pull-5">
              <div id="product-imgs">
                {isLoading ? (
                  <div
                    style={{
                      display: isMobile ? 'flex' : 'block',
                      flexDirection: isMobile ? 'row' : 'column',
                      gap: isMobile ? '1px' : '',
                      padding: isMobile ? '0' : '',
                      justifyContent: isMobile ? 'space-between' : '',
                      objectFit: 'contain',
                    }}
                  >
                    {/* Hiển thị skeleton cho 2 hình ảnh thumbnail */}
                    <Skeleton
                      height={isDesktop ? 160 : 120}
                      width={isDesktop ? 150 : 120}
                      style={{ marginBottom: 10 }}
                    />
                    <Skeleton
                      height={isDesktop ? 160 : 120}
                      width={isDesktop ? 150 : 120}
                      style={{ marginBottom: 10 }}
                    />
                    <Skeleton
                      height={isDesktop ? 160 : 120}
                      width={isDesktop ? 150 : 120}
                      style={{ marginBottom: 10 }}
                    />
                  </div>
                ) : productsState.productImages && Array.isArray(productsState.productImages) && productsState.productImages.length > 0 ? (
                  <Slider {...settings}>
                    {productsState.productImages.map((image, index) => (
                      <div
                        key={index}
                        className={`product-preview ${selectedImage === image.productImagePath
                          ? 'selected'
                          : ''
                          }`}
                        onClick={() => handleImageClick(image.productImagePath)}
                      >
                        <img
                          src={`../${image.productImagePath}`}
                          alt={`Product ${index + 1}`}
                        />
                      </div>
                    ))}
                  </Slider>
                ) : null}
              </div>
            </div>

            {/* Product Details */}
            <div className="col-md-5">
              <div className="product-details">
                <h2 className="product-name">
                  {isLoading ? <Skeleton width={200} /> : productsState.productName}
                </h2>
                <div>
                  <div className="product-rating">
                    {isLoading ? <Skeleton width={100} /> : renderRating()}
                  </div>
                  <a className="review-link" href="#">
                    {isLoading ? (
                      <Skeleton width={150} />
                    ) : (
                      '5 Review(s) | Add your review'
                    )}
                  </a>
                </div>
                <div>
                  <h3 className="product-price">
                    {isLoading ? (
                      <>
                        <Skeleton width={80} />
                        <Skeleton width={50} style={{ marginLeft: 10 }} />
                      </>
                    ) : (
                      <>
                        {productsState.productSale > 0 ? (
                          <>
                            {productsState.productPriceSale}{' '}
                            <del className="product-old-price">{productsState.productPrice}</del>
                            <span className="product-available">
                              {isLoading ? <Skeleton width={80} /> : 'In Stock'}
                            </span>
                          </>
                        ) : (
                          <>{productsState.productPriceSale} </>
                        )}
                      </>
                    )}
                  </h3>
                </div>
                <p>
                  {isLoading ? (
                    <Skeleton count={3} />
                  ) : (
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                  )}
                </p>

                <div className="product-options">
                  Size :
                  <label>
                    {isLoading ? (
                      <Skeleton width={100} height={30} />
                    ) : (
                      <div>
                        {productsState.productSizes.map((size, index) => (
                          <button
                            key={size.productSizeId}
                            className={`size-option 
                            ${selectedSize === size.productSizeName ? 'selected' : ''} 
                            ${hoveredSize === size.productSizeName ? 'hovered' : ''} 
                            ${size.productSizeQuantity.productSizeQuantity === 0 ? 'disabled' : ''}
                            ${errorCheck && size.productSizeQuantity.productSizeQuantity > 0 ? 'flash-border' : ''}`
                            }
                            onClick={() => setSelectedSize(size.productSizeName)}
                            onMouseEnter={() => setHoveredSize(size.productSizeName)}
                            onMouseLeave={() => setHoveredSize(null)}
                            disabled={size.productSizeQuantity.productSizeQuantity === 0} // Disable if quantity is 0
                          >
                            {size.productSizeName}
                          </button>
                        ))}
                      </div>

                    )}
                  </label>
                </div>

                <div className="add-to-cart">
                  <div className="qty-label">
                    {isLoading ? (
                      <Skeleton width={80} height={30} />
                    ) : (
                      <>
                        Qty:
                        <div className="input-number">
                          <input
                            type="number"
                            className={errorCheckQuantity ? 'flash-quantity' : ''}
                            value={quantity}
                            onChange={handleInputChange}
                          />
                          <span className="qty-up" onClick={() => handleQuantityChange(1)}>+</span>
                          <span className="qty-down" onClick={() => handleQuantityChange(-1)}>-</span>
                        </div>
                      </>
                    )}
                  </div>
                  {isLoading ? (
                    <Skeleton width={150} height={40} />
                  ) : (
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                      <i className="fa fa-shopping-cart"></i> add to cart
                    </button>
                  )}
                  {error && <p className="error-message" style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }}>{error}</p>}
                </div>

                <ul className="product-btns">
                  {isLoading ? (
                    <Skeleton width={180} height={30} />
                  ) : (
                    <>
                      <li>
                        <a href="">
                          <i className="fa fa-heart-o"></i> add to wishlist
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <i className="fa fa-exchange"></i> add to compare
                        </a>
                      </li>
                    </>
                  )}
                </ul>
                <ul className="product-links">
                  {isLoading ? (
                    <Skeleton width={100} height={30} />
                  ) : (
                    <>
                      <li>Category: </li>
                      <Link to={`product-list/${productsState.categories[0].categoryId}`}>
                        <li key={productsState.categories[0].categoryId}>
                          <a href={`#${productsState.categories[0].categoryId}`}> {productsState.categories[0].categoryName}</a>
                        </li>
                      </Link>
                    </>
                  )}
                </ul>
                <ul className="product-links">
                  {isLoading ? (
                    <Skeleton width={100} height={30} />
                  ) : (
                    <>
                      <li>Brand: </li>
                      <li>{productsState.productSupplier.productSupplierName}</li>
                    </>
                  )}
                </ul>

                <ul className="product-links">
                  {isLoading ? (
                    <Skeleton width={180} height={30} />
                  ) : (
                    <>
                      <li>Share:</li>
                      <li>
                        <a href="#">
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-google-plus"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-envelope"></i>
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            {/* Product Tabs */}
            <ProductTabs image={images} id={id} />
            {/* Product Tabs */}
          </div>
          {/* row */}
        </div>
        {/* container */}
      </div>
      <div>
        {/* container */}
        <div className="container">
          <div className="row">
            <div className="section-title text-center">
              <h3 className="title">Related Products</h3>
            </div>

            {isLoading ? (
              isDesktop ? (
                Array(4)
                  .fill()
                  .map((_, index) => (
                    <div className="col-md-3 col-xs-6" key={index}>
                      <Product isLoading={isLoading} />
                    </div>
                  ))
              ) : (
                <div className="product-grid">
                  {Array(6)
                    .fill()
                    .map((_, index) => (
                      <div className="product-item" key={index}>
                        <Product isLoading={isLoading} />
                      </div>
                    ))}
                </div>
              )
            ) : isDesktop ? (
              productsRelate.length > 0 ? (
                <div className="slider-container">
                  <button
                    className="custom-prev-btn"
                    onClick={() => sliderRef.current.slickPrev()}
                  >
                    <i className="fa fa-chevron-left" style={{ fontSize: 20, marginRight: 3 }}></i>
                  </button>
                  <Slider ref={sliderRef} {...sliderSettings}>
                    {productsRelate.map((product) => (
                      <div className="col-md-3 col-xs-6 marginBottom" key={product.productId}>
                        <Product
                          id={product.productId}
                          name={product.productName}
                          price={product.productPriceSale}
                          oldPrice={product.productPrice}
                          categories={product.categories}
                          images={product.productImages}
                          rating={product.productRating}
                          sale={product.productSale}
                          isLoading={false}
                        />
                      </div>
                    ))}
                  </Slider>
                  <button
                    className="custom-next-btn"
                    onClick={() => sliderRef.current.slickNext()}
                  >
                    <i className="fa fa-chevron-right" style={{ fontSize: 20, marginLeft: 5 }}></i>
                  </button>
                </div>
              ) : (
                null
              )
            ) : (
              <div className="product-grid">
                {productsRelate.map((product) => (
                  <div className="product-item" key={product.productId}>
                    <Product
                      id={product.productId}
                      name={product.productName}
                      price={product.productPriceSale}
                      oldPrice={product.productPrice}
                      images={product.productImages}
                      rating={product.productRating}
                      sale={product.productSale}
                      isLoading={false}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* /container */}
      </div>
    </>
  );
};

export default ProductDetail;
