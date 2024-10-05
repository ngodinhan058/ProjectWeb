import React from 'react';
import '../styles/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/font-awesome.min.css'
import '../styles/nouislider.min.css'
import '../styles/slick-theme.css'
import '../styles/slick.css'


// Constants
const productImages = [
    '/img/product08.png',
];

const productName = 'Product name goes here';
const productPrice = 980.00;
const oldProductPrice = 990.00;
const stockStatus = 'In Stock';
const reviewsCount = 10;
const reviewLinkText = `${reviewsCount} Review(s) | Add your review`;

const ratingStars = 4.5;
const ratingStarIcons = Array(5).fill(0).map((_, index) => {
    return index < Math.floor(ratingStars) ? 'fa fa-star' : 'fa fa-star-o';
});

const sizeOptions = [{ value: '0', label: 'X' }];
const colorOptions = [{ value: '0', label: 'Red' }];

const categories = ['Headphones', 'Accessories'];

const socialLinks = [
    { platform: 'Facebook', icon: 'fa fa-facebook', href: '#' },
    { platform: 'Twitter', icon: 'fa fa-twitter', href: '#' },
    { platform: 'Google+', icon: 'fa fa-google-plus', href: '#' },
    { platform: 'Email', icon: 'fa fa-envelope', href: '#' },
];

const ProductDetails = () => {
    return (
        <div>

            <div id="breadcrumb" className="section">
                {/* container */}
                <div className="container">
                    {/* row */}
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
                    {/* /row */}
                </div>
                {/* /container */}
            </div>
            <div className="section">
                {/* container */}
                <div className="container">
                    {/* row */}
                    <div className="row">
                        {/* Product main img */}
                        <div className="col-md-5 col-md-push-2">
                            <div id="product-main-img">
                                {productImages.map((image, index) => (
                                    <div className="product-preview" key={index}>
                                        <img src={image} alt={`Product ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* /Product main img */}

                        {/* Product thumb imgs */}
                        <div className="col-md-2 col-md-pull-5">
                            <div id="product-imgs">
                                {productImages.map((src, index) => (
                                    <div className="product-preview" key={index}>
                                        <img src={src} alt={`Product thumbnail ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* /Product thumb imgs */}

                        {/* Product details */}
                        <div className="col-md-5">
                            <div className="product-details">
                                <h2 className="product-name">{productName}</h2>
                                <div>
                                    <div className="product-rating">
                                        {ratingStarIcons.map((className, index) => (
                                            <i className={className} key={index}></i>
                                        ))}
                                    </div>
                                    <a className="review-link" href="#">{reviewLinkText}</a>
                                </div>
                                <div>
                                    <h3 className="product-price">
                                        ${productPrice.toFixed(2)} <del className="product-old-price">${oldProductPrice.toFixed(2)}</del>
                                    </h3>
                                    <span className="product-available">{stockStatus}</span>
                                </div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                                <div className="product-options">
                                    <label>
                                        Size
                                        <select className="input-select">
                                            {sizeOptions.map((option) => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label>
                                        Color
                                        <select className="input-select">
                                            {colorOptions.map((option) => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
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
                                    <li><a href="#"><i className="fa fa-heart-o"></i> add to wishlist</a></li>
                                    <li><a href="#"><i className="fa fa-exchange"></i> add to compare</a></li>
                                </ul>

                                <ul className="product-links">
                                    <li>Category:</li>
                                    {categories.map((category, index) => (
                                        <li key={index}><a href="#">{category}</a></li>
                                    ))}
                                </ul>

                                <ul className="product-links">
                                    <li>Share:</li>
                                    {socialLinks.map((link, index) => (
                                        <li key={index}><a href={link.href}><i className={link.icon}></i></a></li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                        {/* /Product details */}

                        {/* Product tab */}
                        <div className="col-md-12">
                            <div id="product-tab">
                                {/* product tab nav */}
                                <ul className="tab-nav">
                                    <li className="active"><a data-toggle="tab" href="#tab1">Description</a></li>
                                    <li><a data-toggle="tab" href="#tab2">Details</a></li>
                                    <li><a data-toggle="tab" href="#tab3">Reviews (3)</a></li>
                                </ul>
                                {/* /product tab nav */}

                                {/* product tab content */}
                                <div className="tab-content">
                                    {/* tab1  */}
                                    <div id="tab1" className="tab-pane fade in active">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /tab1  */}

                                    {/* tab2  */}
                                    <div id="tab2" className="tab-pane fade">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /tab2  */}

                                    {/* tab3  */}
                                    <div id="tab3" className="tab-pane fade">
                                        <div className="row">
                                            {/* Rating */}
                                            <div className="col-md-3">
                                                <div id="rating">
                                                    <div className="rating-avg">
                                                        <span>{ratingStars}</span>
                                                        <div className="rating-stars">
                                                            {ratingStarIcons.map((className, index) => (
                                                                <i className={className} key={index}></i>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* /Rating */}
                                        </div>
                                    </div>
                                    {/* /tab3  */}
                                </div>
                                {/* /product tab content  */}
                            </div>
                        </div>
                        {/* /Product tab */}
                    </div>
                    {/* /row */}
                </div>
                {/* /container */}
            </div>
        </div>
    );
};

export default ProductDetails;
