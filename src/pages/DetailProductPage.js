import React, { useState } from "react";
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css"; // Import slick CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick theme CSS

const ProductDetail = () => {
    const [selectedImage, setSelectedImage] = useState("./img/product01.png");

    const handleImageClick = (imgSrc) => {
        setSelectedImage(imgSrc);
    };

    const [isHoveredUp, setIsHoveredUp] = useState(false);
    const [isHoveredDown, setIsHoveredDown] = useState(false);

    // Custom arrow cho nút lên
    const PrevArrow = ({ className, style, onClick }) => (
        <div
            className={className}
            style={{ ...style, width: 40,
                height: 40,
                display: 'block',
                background: isHoveredUp ? '#ef233c' : '#fff',
                border: '1px solid #e4e7ed',
                color: isHoveredUp ? '#fff' : '#000',
                textAlign: 'center',
                top: '-4%',
                transition: 'background 0.3s, color 0.3s',  }}
            onClick={onClick}
            onMouseEnter={() => setIsHoveredUp(true)}
            onMouseLeave={() => setIsHoveredUp(false)}
        >
            <i className="fa fa-chevron-up" style={{ fontSize: 20, position: 'absolute', right: '22%', top: '20%' }}></i>
        </div>
    );

    // Custom arrow cho nút xuống
    const NextArrow = ({ className, style, onClick }) => (
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
            <i className="fa fa-chevron-down" style={{ fontSize: 20, position: 'absolute', right: '22%', top: '20%'}}></i>
        </div>
    );
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        arrows: true, // Ẩn mũi tên mặc định của Slick
        nextArrow: <NextArrow />, // Mũi tên xuống tùy chỉnh
        prevArrow: <PrevArrow />, // Mũi tên lên tùy chỉnh
        
      };
      

    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    {/* Main Image */}
                    <div className="col-md-5 col-md-push-2">
                        <div id="product-main-img">
                            <div className="product-preview">
                                <img src={selectedImage} alt="Selected" />
                            </div>
                        </div>
                    </div>

                    {/* Thumbnail Images */}
                    <div className="col-md-2 col-md-pull-5">
                        <div id="product-imgs">
                            <Slider {...settings}>
                                {["./img/product01.png", "./img/product03.png", "./img/product06.png", "./img/product08.png"].map(
                                    (imgSrc, index) => (
                                        <div
                                            key={index}
                                            className="product-preview"
                                            onClick={() => handleImageClick(imgSrc)}
                                            style={{
                                                border: selectedImage === imgSrc ? "2px solid #ef233c" : "none",
    
                                            }}
                                        >
                                            <img src={imgSrc} alt={`Product ${index + 1}`} />
                                        </div>
                                    )
                                )}
                            </Slider>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="col-md-5">
                        <div className="product-details">
                            <h2 className="product-name">Product name goes here</h2>
                            <div>
                                <div className="product-rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-o"></i>
                                </div>
                                <a className="review-link" href="#">
                                    10 Review(s) | Add your review
                                </a>
                            </div>
                            <div>
                                <h3 className="product-price">
                                    $980.00 <del className="product-old-price">$990.00</del>
                                </h3>
                                <span className="product-available">In Stock</span>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat.
                            </p>

                            <div className="product-options">
                                <label>
                                    Size
                                    <select className="input-select">
                                        <option value="0">X</option>
                                    </select>
                                </label>
                                <label>
                                    Color
                                    <select className="input-select">
                                        <option value="0">Red</option>
                                    </select>
                                </label>
                            </div>

                            <div className="add-to-cart">
                                <div className="qty-label">
                                    Qty
                                    <div className="input-number">
                                        <input type="number" />
                                        <span className="qty-up">+</span>
                                        <span className="qty-down">-</span>
                                    </div>
                                </div>
                                <button className="add-to-cart-btn">
                                    <i className="fa fa-shopping-cart"></i> add to cart
                                </button>
                            </div>

                            <ul className="product-btns">
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
                            </ul>

                            <ul className="product-links">
                                <li>Category:</li>
                                <li>
                                    <a href="#">Headphones</a>
                                </li>
                                <li>
                                    <a href="#">Accessories</a>
                                </li>
                            </ul>

                            <ul className="product-links">
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
                            </ul>
                        </div>
                    </div>

                    {/* Product Tabs */}
                    <div className="col-md-12">
                        <div id="product-tab">
                            <ul className="tab-nav">
                                <li className="active">
                                    <a data-toggle="tab" href="#tab1">
                                        Description
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#tab2">
                                        Details
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#tab3">
                                        Reviews (3)
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
