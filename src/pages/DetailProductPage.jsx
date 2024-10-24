import React, { useEffect, useState, useRef } from 'react';
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css"; // Import slick CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick theme CSS
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



const ProductDetail = () => {
    const location = useLocation();
    const [productsState, setProductsState] = useState([]); // Dữ liệu sản phẩm
    const { images, name, category, price, oldPrice, rating, sale, isNew } = location.state || {};
    const [selectedImage, setSelectedImage] = useState(
        images && images.length > 0
            ? images[0]?.['productImagePath'] // Nếu có hình ảnh, sử dụng tấm đầu tiên
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/langvi-300px-No_image_available.svg.png' // Nếu không có hình ảnh, sử dụng ảnh mặc định
    );
    const [isLoading, setIsLoading] = useState(false); // Trạng thái loading



    useEffect(() => {
        setIsLoading(true); // Bắt đầu tải
        let apiUrl = `${BASE_URL}products/filters?`;
        axiosInstance.get(apiUrl, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })
            .then(response => {
                const { content } = response.data.data;
                setProductsState(content);
                setIsLoading(false); // Kết thúc tải
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setIsLoading(false); // Kết thúc tải dù có lỗi
            });
    }, []);


    const renderRating = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={i <= rating ? 'fa fa-star' : 'fa fa-star-o'}
                ></i>
            );
        }
        return stars;
    };

    const handleImageClick = (imgSrc) => {
        setSelectedImage(imgSrc);
    };

    const [isHoveredUp, setIsHoveredUp] = useState(false);
    const [isHoveredDown, setIsHoveredDown] = useState(false);
    const [isHoveredLeft, setIsHoveredLeft] = useState(false);
    const [isHoveredRight, setIsHoveredRight] = useState(false);

    const DownArrow = ({ className, style, onClick }) => (
        <div
            className={className}
            style={{
                ...style, width: 40,
                height: 40,
                display: 'block',
                background: isHoveredUp ? '#ef233c' : '#fff',
                border: '1px solid #e4e7ed',
                color: isHoveredUp ? '#fff' : '#000',
                textAlign: 'center',
                top: '-4%',
                transition: 'background 0.3s, color 0.3s',
            }}
            onClick={onClick}
            onMouseEnter={() => setIsHoveredUp(true)}
            onMouseLeave={() => setIsHoveredUp(false)}
        >
            <i className="fa fa-chevron-up" style={{ fontSize: 20, position: 'absolute', right: '22%', top: '20%' }}></i>
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
            }}
            onClick={onClick}
            onMouseEnter={() => setIsHoveredDown(true)}
            onMouseLeave={() => setIsHoveredDown(false)}
        >
            <i className="fa fa-chevron-down" style={{ fontSize: 20, position: 'absolute', right: '22%', top: '20%' }}></i>
        </div>
    );
    const RightArrow = ({ className, style, onClick }) => (
        <div
            className={className}
            style={{
                ...style,

                display: 'block',
                background: isHoveredRight ? '#ef233c' : '#000',
                border: '1px solid #e4e7ed',
                color: isHoveredRight ? '#fff' : '#000',
                textAlign: 'center',
                transition: 'background 0.3s, color 0.3s',
                marginRight: 20,

            }}
            onClick={onClick}
            onMouseEnter={() => setIsHoveredRight(true)}
            onMouseLeave={() => setIsHoveredRight(false)}
        >

        </div>
    );

    const LeftArrow = ({ className, style, onClick }) => (
        <div
            className={className}
            style={{
                ...style,
                width: 40,
                height: 40,
                display: 'block',
                background: isHoveredLeft ? '#ef233c' : '#fff',
                border: '1px solid #e4e7ed',
                color: isHoveredLeft ? '#fff' : '#000',
                textAlign: 'center',
                transition: 'background-color 0.3s ease, color 0.3s ease',
                marginLeft: 20,
            }}
            onClick={onClick}
            onMouseEnter={() => setIsHoveredLeft(true)}
            onMouseLeave={() => setIsHoveredLeft(false)}
        >
            <i className="fa fa-chevron-left" style={{ fontSize: 20, position: 'absolute', right: '33%', top: '25%' }}></i>
        </div>
    );
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        arrows: true,
        nextArrow: <UpArrow />, // Mũi tên xuống tùy chỉnh
        prevArrow: <DownArrow />, // Mũi tên lên tùy chỉnh
    };
    // Cài đặt cho slider (carousel) trên desktop
    const sliderRef = useRef(null);
    const sliderSettings = {
        infinite: true,
        speed: 100,
        slidesToShow: 6, // Hiển thị 4 sản phẩm trên desktop
        slidesToScroll: 1,
        autoplay: true, // Tự động chạy
        autoplaySpeed: 2000, // Chuyển mỗi 2 giây
        arrows: false,
    };
    const isDesktop = useMediaQuery({ minWidth: 481 });
    return (
        <>
            <div id="breadcrumb" className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="breadcrumb-tree">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">All Categories</a></li>
                                <li><a href="#">Accessories</a></li>
                                <li><a href="#">Headphones</a></li>
                                <li className="active">Product name goes here</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <div className="row">
                        {/* Main Image */}
                        <div className="col-md-5 col-md-push-2" style={{ position: 'relative' }}>
                            <div id="product-main-img">
                                <div className="product-preview">
                                    {isLoading ? (
                                        <Skeleton height={400} />
                                    ) : (
                                        <ZoomEffect imageUrl={selectedImage} zoomLevel={2} />
                                    )}
                                </div>

                            </div>
                        </div>
                        {/* Thumbnail Images */}
                        {/* Thumbnail Images */}
                        <div className="col-md-2 col-md-pull-5">
                            <div id="product-imgs">
                                {isLoading ? (
                                    <div>
                                        {/* Hiển thị skeleton cho 2 hình ảnh thumbnail */}
                                        <Skeleton height={160} width={150} style={{ marginBottom: 10 }} />
                                        <Skeleton height={160} width={150} style={{ marginBottom: 10 }} />
                                        <Skeleton height={160} width={150} style={{ marginBottom: 10 }} />
                                    </div>
                                ) : (
                                    images && Array.isArray(images) && images.length > 0 ? (
                                        <Slider {...settings}>
                                            {images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className={`product-preview ${selectedImage === image.productImagePath ? "selected" : ""}`}
                                                    onClick={() => handleImageClick(image.productImagePath)}
                                                >
                                                    <img src={image.productImagePath} alt={`Product ${index + 1}`} />
                                                </div>
                                            ))}
                                        </Slider>
                                    ) : (
                                        null
                                    )
                                )}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="col-md-5">
                            <div className="product-details">
                                <h2 className="product-name"> {isLoading ? <Skeleton width={200} /> : name}</h2>
                                <div>
                                    <div className="product-rating">
                                        {isLoading ? <Skeleton width={100} /> : renderRating()}
                                    </div>
                                    <a className="review-link" href="#">
                                        {isLoading ? <Skeleton width={150} /> : '5 Review(s) | Add your review'}
                                    </a>
                                </div>
                                <div>
                                    <h3 className="product-price">
                                        {isLoading ? (
                                            <>
                                                <Skeleton width={80} /> <Skeleton width={50} style={{ marginLeft: 10 }} />
                                            </>
                                        ) : (
                                            <>
                                                ${price} <del className="product-old-price">${oldPrice}</del>
                                            </>
                                        )}
                                    </h3>
                                    <span className="product-available">{isLoading ? <Skeleton width={80} /> : 'In Stock'}</span>
                                </div>
                                <p>
                                    {isLoading ? <Skeleton count={3} /> : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
                                </p>

                                <div className="product-options">
                                    <label>
                                        Size
                                        {isLoading ? (
                                            <Skeleton width={100} height={30} />
                                        ) : (
                                            <select className="input-select">
                                                <option value="0">X</option>
                                            </select>
                                        )}
                                    </label>
                                    <label>
                                        Color
                                        {isLoading ? (
                                            <Skeleton width={100} height={30} />
                                        ) : (
                                            <select className="input-select">
                                                <option value="0">Red</option>
                                            </select>
                                        )}
                                    </label>
                                </div>

                                <div className="add-to-cart">
                                    <div className="qty-label">
                                        {isLoading ? (
                                            <Skeleton width={80} height={30} />
                                        ) : (
                                            <>
                                                Qty
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
                                                <a href="#">
                                                    <i className="fa fa-heart-o"></i> add to wishlist
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
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
                                            <li>Category:</li>
                                            <li>
                                                <a href="#">{category}</a>
                                            </li>
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
                        <ProductTabs />
                        {/* Product Tabs */}
                    </div>
                    {/* row */}
                </div>
                {/* container */}
            </div>
            <div>
                {/* container */}
                <div class="container">
                    {/* row */}
                    <div class="row">

                        <div class="section-title text-center">
                            <h3 class="title">Related Products</h3>
                        </div>
                        {isLoading ? (
                            // Hiển thị các skeleton trong khi đang tải
                            Array(1).fill().map((_, index) => (
                                <Product
                                    key={index}
                                    isLoading={isLoading}
                                />
                            ))
                        ) : (
                            productsState.length > 0 ? (
                                isDesktop ? (
                                    <div className="slider-container">
                                        <button className="custom-prev-btn" onClick={() => sliderRef.current.slickPrev()}>
                                            <i className="fa fa-chevron-left" style={{ fontSize: 20, marginRight: 3, }}></i>
                                        </button>
                                        <Slider ref={sliderRef} {...sliderSettings}>
                                            {productsState.map((product) => (
                                                <div className="col-md-2 col-xs-6 marginBottom">
                                                    <Product
                                                        key={product['productId']}
                                                        id={product['productId']}
                                                        name={product['productName']}
                                                        price={product['productPriceSale']}
                                                        oldPrice={product['productPrice']}
                                                        images={product['productImages']}
                                                        rating={product['productRating']}
                                                        sale={product['productSale']}
                                                        isLoading={false}
                                                    />
                                                </div>

                                            ))}
                                        </Slider>
                                        <button className="custom-next-btn" onClick={() => sliderRef.current.slickNext()}>
                                            <i className="fa fa-chevron-right" style={{ fontSize: 20, marginLeft: 5, }}></i>
                                        </button>
                                    </div>
                                ) : (

                                    <div className="product-grid">
                                        {productsState.map((product) => (
                                            <div className="product-item" key={product['productId']}>
                                                <Product
                                                    key={product['productId']}
                                                    id={product['productId']}
                                                    name={product['productName']}
                                                    price={product['productPriceSale']}
                                                    oldPrice={product['productPrice']}
                                                    images={product['productImages']}
                                                    rating={product['productRating']}
                                                    sale={product['productSale']}
                                                    isLoading={false}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )
                            ) : (
                                null // Khi không có sản phẩm
                            )
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
