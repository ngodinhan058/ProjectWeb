import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick'; // Import react-slick
import 'slick-carousel/slick/slick.css'; // Import slick CSS
import 'slick-carousel/slick/slick-theme.css'; // Import slick theme CSS
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
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

const ProductDetail = () => {
  const location = useLocation();
  const [productsState, setProductsState] = useState([]); // Dữ liệu sản phẩm
  const {
    id,
    images,
    name,
    price,
    supplier,
    oldPrice,
    categories,
    rating,
    sale,
    isNew,
  } = location.state || {};
  const [categoryIdss, setCategoryIdss] = useState(); // Dữ liệu sản phẩm

  const getCategoryItems = (categories) => {
    // Kiểm tra xem categories có phải là một mảng không
    if (!Array.isArray(categories)) {
      return null; // hoặc return []; nếu bạn muốn trả về một mảng rỗng
    }
    // Khởi tạo danh sách để lưu trữ các mục danh mục
    let categoryItems = [];
    // Duyệt qua từng danh mục trong mảng categories
    categories.forEach((category) => {
      // Kiểm tra nếu category có giá trị hợp lệ
      if (category && category.categoryId) {
        // Thêm danh mục hiện tại vào danh sách
        categoryItems.push(
          <Link to={`/${category.categoryId}`}>
            <li key={category.categoryId}>
              <a href={`#${category.categoryId}`}> {category.categoryName}</a>
            </li>
          </Link>
        );
      }
    });

    return categoryItems;
  };
  // Mảng size
  const [selectedSize, setSelectedSize] = useState(''); // Đặt size mặc định
  // Thiết lập mặc định là 'S'
  const sizes = [
    ['S', 5], // Size S với số lượng 5
    ['M', 0], // Size M với số lượng 0 (vô hiệu hóa)
    ['L', 3], // Size L với số lượng 3
    ['XL', 0], // Size XL với số lượng 0 (vô hiệu hóa)
  ];
  const [categoriess, setCategoriess] = useState([]);
  const [hoveredSize, setHoveredSize] = useState(null);
  // Cài đặt cho slider (carousel) trên desktop
  const sliderRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState('');

  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(`../${images[0]?.['productImagePath']}`);
    } else {
      setSelectedImage(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/langvi-300px-No_image_available.svg.png'
      );
    }
  }, [images, id]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategoryIdss(categories[0].categoryId); // Lấy categoryId của danh mục đầu tiên, nếu có
    }
  }, [categories]);

  useEffect(() => {
    let apiUrl = `${BASE_URL}products/relate/${categoryIdss}`;
    console.log(apiUrl);

    // Khởi tạo danh sách query params
    axiosInstance
      .get(apiUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      })
      .then((response) => {
        const { content } = response.data.data;
        setProductsState(content);
        setIsLoading(false); // Kết thúc tải
      })
      .catch((error) => {
        console.error('Error fetching data:', error);

      });
  }, [categoryIdss]);

  useEffect(() => {
    let apiUrl = `${BASE_URL}categories`;
    axios
      .get(apiUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      })
      .then((response) => {
        const { data } = response.data;
        setCategoriess(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  const renderRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i} className={i <= rating ? 'fa fa-star' : 'fa fa-star-o'}></i>
      );
    }
    return stars;
  };

  const handleImageClick = (imgSrc, index) => {
    setSelectedImage(`../${imgSrc}`);
  };

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
            <Breadcrumb categoryId={categoryIdss} allCategories={categoriess} />
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
                ) : images && Array.isArray(images) && images.length > 0 ? (
                  <Slider {...settings}>
                    {images.map((image, index) => (
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
                  {' '}
                  {isLoading ? <Skeleton width={200} /> : name}
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
                        {sale > 0 ? (
                          <>
                            {price}{' '}
                            <del className="product-old-price">{oldPrice}</del>
                            <span className="product-available">
                              {isLoading ? <Skeleton width={80} /> : 'In Stock'}
                            </span>
                          </>
                        ) : (
                          <>{price} </>
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
                        {sizes.map(([size, quantity], index) => (
                          <button
                            key={index}
                            className={`size-option 
                              ${selectedSize ===
                                size
                                ? 'selected'
                                : ''
                              }
                              ${hoveredSize ===
                                size
                                ? 'hovered'
                                : ''
                              }
                              ${quantity === 0
                                ? 'disabled'
                                : ''
                              }`}
                            onClick={() => setSelectedSize(size)}
                            onMouseEnter={() => setHoveredSize(size)} // Khi hover vào
                            onMouseLeave={() => setHoveredSize(null)} // Khi không còn hover
                            disabled={quantity === 0} // Vô hiệu hóa nếu số lượng = 0
                          >
                            {size}
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
                          <input type="number" />
                          <span className="qty-up">+</span>
                          <span className="qty-down">-</span>
                        </div>
                      </>
                    )}
                  </div>
                  {isLoading ? (
                    <Skeleton width={150} height={40} />
                  ) : (
                    <button className="add-to-cart-btn">
                      <i className="fa fa-shopping-cart"></i> add to cart
                    </button>
                  )}
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
                      {getCategoryItems(categories)}
                    </>
                  )}
                </ul>
                <ul className="product-links">
                  {isLoading ? (
                    <Skeleton width={100} height={30} />
                  ) : (
                    <>
                      <li>Brand: </li>
                      <li>{supplier}</li>
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
            <ProductTabs image={images} />
            {/* Product Tabs */}
          </div>
          {/* row */}
        </div>
        {/* container */}
      </div>
      <div>
        {/* container */}
        <div className="container">
          {/* row */}
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
              productsState.length > 0 ? (
                <div className="slider-container">
                  <button
                    className="custom-prev-btn"
                    onClick={() => sliderRef.current.slickPrev()}
                  >
                    <i className="fa fa-chevron-left" style={{ fontSize: 20, marginRight: 3 }}></i>
                  </button>
                  <Slider ref={sliderRef} {...sliderSettings}>
                    {productsState.map((product) => (
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
                <div className="product-grid">
                  {productsState.map((product) => (
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
              )
            ) : (
              <div className="product-grid">
                {productsState.map((product) => (
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
          {/* /row */}
        </div>
        {/* /container */}
      </div>
    </>
  );
};

export default ProductDetail;
