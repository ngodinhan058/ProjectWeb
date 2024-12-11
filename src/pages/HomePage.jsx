import React, { useEffect, useState, useRef } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import Product from '../components/Product';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';

const HomePage = () => {
    const sliderRefNew = useRef(null);
    const sliderRefSale = useRef(null);
    const [isLoadingNew, setIsLoadingNew] = useState(true);
    const [isLoadingSale, setIsLoadingSale] = useState(true);
    const isDesktop = useMediaQuery({ minWidth: 769 }); // Desktop: màn hình >= 769px
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // Mobile: màn hình <= 768px
    const [newProducts, setNewProducts] = useState([]);
    const [saleOffProducts, setSaleOffProducts] = useState([]);

    // Cấu hình slider
    const sliderSettings = {
        infinite: true,
        speed: 100,
        slidesToShow: 4, // Hiển thị 4 sản phẩm trên desktop
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };

    // Giả lập tải dữ liệu từ API
    useEffect(() => {
        setTimeout(() => {
            const mockNewProducts = Array(6)
                .fill(null)
                .map((_, index) => ({
                    productId: index + 1,
                    productName: `New Product ${index + 1}`,
                    productPriceSale: 100 + index * 10,
                    productPrice: 150 + index * 15,
                    categories: ['Category 1', 'Category 2'],
                    productImages: [`https://via.placeholder.com/150?text=New+Product+${index + 1}`],
                    productRating: 4.5,
                    productSale: 10,
                }));
            setNewProducts(mockNewProducts);
            setIsLoadingNew(false);
        }, 2000);

        setTimeout(() => {
            const mockSaleOffProducts = Array(6)
                .fill(null)
                .map((_, index) => ({
                    productId: index + 1,
                    productName: `Sale Product ${index + 1}`,
                    productPriceSale: 50 + index * 5,
                    productPrice: 100 + index * 10,
                    categories: ['Category A', 'Category B'],
                    productImages: [`https://via.placeholder.com/150?text=Sale+Product+${index + 1}`],
                    productRating: 4.0,
                    productSale: 20,
                }));
            setSaleOffProducts(mockSaleOffProducts);
            setIsLoadingSale(false);
        }, 2000);
    }, []);

    return (
        <div className="section">
            <div className="container">
                {/* New Products Section */}
                <div className="row row-title">
                    <div className="section-title text-center">
                        <h3 className="titlex">New Products</h3>
                    </div>
                    {isLoadingNew && isDesktop ? (
                        // Hiển thị skeleton cho desktop
                        Array(4)
                            .fill()
                            .map((_, index) => (
                                <div className="col-md-3 col-xs-6" key={index}>
                                    <Product isLoading={true} />
                                </div>
                            ))
                    ) : isDesktop ? (
                        // Hiển thị slider cho desktop
                        <div className="slider-container">
                            <button
                                className="custom-prev-btn"
                                onClick={() => sliderRefNew.current.slickPrev()}
                            >
                                <i className="fa fa-chevron-left" style={{ fontSize: 20, marginRight: 3 }}></i>
                            </button>
                            <Slider ref={sliderRefNew} {...sliderSettings}>
                                {newProducts.map((product) => (
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
                                onClick={() => sliderRefNew.current.slickNext()}
                            >
                                <i className="fa fa-chevron-right" style={{ fontSize: 20, marginLeft: 3 }}></i>
                            </button>
                        </div>
                    ) : isLoadingNew && isMobile ? (
                        // Hiển thị skeleton cho mobile (2 cột và 6 skeleton)
                        <div className="product-grid">
                            {Array(6)
                                .fill()
                                .map((_, index) => (
                                    <div className="product-item" key={index}>
                                        <Product isLoading={true} />
                                    </div>
                                ))}
                        </div>
                    ) : (
                        // Hiển thị sản phẩm thông thường cho mobile
                        <div className="product-grid">
                            {newProducts.map((product) => (
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

                {/* Sale Off Products Section */}
                <div className="row row-title">
                    <div className="section-title text-center">
                        <h3 className="titlex">Sale Off Products</h3>
                    </div>
                    {isLoadingSale && isDesktop ? (
                        // Hiển thị skeleton cho desktop
                        Array(4)
                            .fill()
                            .map((_, index) => (
                                <div className="col-md-3 col-xs-6" key={index}>
                                    <Product isLoading={true} />
                                </div>
                            ))
                    ) : isDesktop ? (
                        // Hiển thị slider cho desktop
                        <div className="slider-container">
                            <button
                                className="custom-prev-btn"
                                onClick={() => sliderRefSale.current.slickPrev()}
                            >
                                <i className="fa fa-chevron-left" style={{ fontSize: 20, marginRight: 3 }}></i>
                            </button>
                            <Slider ref={sliderRefSale} {...sliderSettings}>
                                {saleOffProducts.map((product) => (
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
                                onClick={() => sliderRefSale.current.slickNext()}
                            >
                                <i className="fa fa-chevron-right" style={{ fontSize: 20, marginLeft: 3 }}></i>
                            </button>
                        </div>
                    ) : isLoadingSale && isMobile ? (
                        // Hiển thị skeleton cho mobile (2 cột và 6 skeleton)
                        <div className="product-grid">
                            {Array(6)
                                .fill()
                                .map((_, index) => (
                                    <div className="product-item" key={index}>
                                        <Product isLoading={true} />
                                    </div>
                                ))}
                        </div>
                    ) : (
                        // Hiển thị sản phẩm thông thường cho mobile
                        <div className="product-grid">
                            {saleOffProducts.map((product) => (
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

                {/* Policy Bar */}
                <div className="row policy-bar">
                    <div className="col-md-4 policy-item">
                        <i className="bi bi-truck"></i>
                        MIỄN PHÍ VẬN CHUYỂN (BILL lớn 1M)
                    </div>
                    <div className="col-md-4 policy-item">
                        <i className="bi bi-arrow-repeat"></i>
                        ĐỔI TRẢ TRONG VÒNG 7 NGÀY
                    </div>
                    <div className="col-md-4 policy-item">
                        <i className="bi bi-shop"></i>
                        SẢN PHẨM TRẢI NGHIỆM SẴN TẠI STORE
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
