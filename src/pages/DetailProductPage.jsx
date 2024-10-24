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


const ProductDetail = () => {
    const location = useLocation();
    const [productsState, setProductsState] = useState([]); // Dữ liệu sản phẩm
    const { images, name, price, oldPrice, categories, rating, sale, isNew, } = location.state || {};
    const [categoryIdss, setCategoryIdss] = useState(); // Dữ liệu sản phẩm


    const getCategoryItems = (categories) => {
        // Kiểm tra xem categories có phải là một mảng không
        if (!Array.isArray(categories)) {
            return null; // hoặc return []; nếu bạn muốn trả về một mảng rỗng
        }

        // Khởi tạo danh sách để lưu trữ các mục danh mục
        let categoryItems = [];

        // Duyệt qua từng danh mục trong mảng categories
        categories.forEach(category => {
            // Kiểm tra nếu category có giá trị hợp lệ
            if (category && category.categoryId) {
                // Thêm danh mục hiện tại vào danh sách
                categoryItems.push(
                    <li key={category.categoryId}>
                        <a href={`#${category.categoryId}`}>{category.categoryName}</a>
                    </li>
                );

                // Nếu có danh mục con, thêm danh sách các danh mục con vào
                if (category.categoryChildren && category.categoryChildren.length > 0) {
                    const childItems = getCategoryItems(category.categoryChildren); // Đệ quy để lấy danh mục con
                    // Duyệt qua từng danh mục con và thêm vào danh sách
                    categoryItems = categoryItems.concat(childItems);
                }
            }
        });

        return categoryItems;
    };



    const [selectedImage, setSelectedImage] = useState(
        images && images.length > 0
            ? images[0]?.['productImagePath'] // Nếu có hình ảnh, sử dụng tấm đầu tiên
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/langvi-300px-No_image_available.svg.png' // Nếu không có hình ảnh, sử dụng ảnh mặc định
    );

    const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
    
    useEffect(() => {
        if (categories && categories.length > 0) {
            setCategoryIdss(categories[0].categoryId); // Lấy categoryId của danh mục đầu tiên, nếu có
        }
    }, [categories]);
    useEffect(() => {
        let apiUrl = `${BASE_URL}products/${categoryIdss}`;
        console.log(apiUrl);

        // Khởi tạo danh sách query params
        axiosInstance.get(apiUrl, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })
            .then(response => {
                const { content } = response.data.data;
                setProductsState(content);
            })
            .catch(error => {
                // console.error("Error fetching data:", error);
            });
    }, [categoryIdss]);

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
        slidesToShow: 4, // Hiển thị 4 sản phẩm trên desktop
        slidesToScroll: 1,
        autoplay: true, // Tự động chạy
        autoplaySpeed: 2000, // Chuyển mỗi 2 giây
        arrows: false,
    };
    const isDesktop = useMediaQuery({ minWidth: 481 });
    const getCategoryList = (categories, categoriesId) => {
        // Kiểm tra nếu chuỗi chứa dấu |
        if (categories.includes('|') && categoriesId.includes('|')) {
            // Nếu có dấu |, cắt chuỗi và tạo các phần tử <li>
            const categoryIds = categoriesId.split('|'); // Tách chuỗi categoriesId thành mảng

            return categories.split('|').map((category, index) => (
                <li key={index}>
                    <a href={`#${categoryIds[index]}`}>{category}</a> {/* Dùng dấu ngoặc móc {} để truyền động giá trị */}
                </li>
            ));
        } else {

            // Nếu không có dấu |, chỉ hiển thị một <li>
            return (
                <li>
                    <a href={`#${categoriesId}`}>{categories}</a> {/* Truyền động giá trị categoriesId */}
                </li>
            );
        }
    };

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
                                {images && Array.isArray(images) && images.length > 0 ? (
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
                                )}

                            </div>
                        </div>


                        {/* Product Details */}
                        <div className="col-md-5">
                            <div className="product-details">
                                <h2 className="product-name">{name}</h2>
                                <div>
                                    <div className="product-rating">
                                        {renderRating()}
                                    </div>
                                    <a className="review-link" href="#">
                                        5 Review(s) | Add your review
                                    </a>
                                </div>
                                <div>
                                    <h3 className="product-price">
                                        ${price} <del className="product-old-price">${oldPrice}</del>
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
                                    {getCategoryItems(categories)}

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
                                {/* product tab content */}
                                <div className="tab-content">

                                </div>
                                {/* /product tab content  */}
                            </div>
                        </div>
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
                            // Hiển thị các skeleton trong khi đang tải
                            Array(6).fill().map((_, index) => (
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
                                                <div className="col-md-4 col-xs-6 marginBottom" key={product['productId']}>
                                                    <Product
                                                        key={product['productId']}
                                                        id={product['productId']}
                                                        name={product['productName']}
                                                        price={product['productPriceSale']}
                                                        oldPrice={product['productPrice']}
                                                        categories={product['categories']}
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
