import React, { useEffect, useState, useRef } from 'react';
import { Animated, useWindowDimensions, } from 'react';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import Product from '../components/Product';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import Banner from "../components/Banner";
import { BASE_URL } from "../components/api/config";
import { axiosInstance } from "../components/api/axiosConfig";
import { useNavigate } from 'react-router-dom';
import DesktopCollections from "../components/DesktopCollections";
import MobileCollections from "../components/MobileCollections";

const HomePage = () => {
    const [mockCollections, setAllCollections] = useState({});
    const sliderRefNew = useRef(null);
    const sliderRefSale = useRef(null);
    const [loading, setLoading] = useState(true);
    const isDesktop = useMediaQuery({ minWidth: 769 });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [newProducts, setNewProducts] = useState([]);
    const [saleOffProducts, setSaleOffProducts] = useState([]);
    const [banners, setBanner] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let apiUrl = `${BASE_URL}collection/123e4567-e89b-12d3-a456-426614174000`;
        setLoading(true);
        axiosInstance
            .get(apiUrl, {
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                },
            })
            .then((response) => {
                const dataColletion = response.data.data;
                setAllCollections(dataColletion);
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setAllCollections([]); // Lỗi 400, coi như không có sản phẩm
                    setLoading(true);
                } else {
                    console.error('Error fetching data:', error);
                }
            })
            .finally(() => {
                setLoading(false); // Kết thúc loading
            });
    }, []);
    useEffect(() => {
        let apiUrl = `${BASE_URL}slideshows?content=banner`;
        setLoading(true);
        axiosInstance
            .get(apiUrl, {
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                },
            })
            .then((response) => {
                const dataColletion = response.data.data;
                setBanner(dataColletion);
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setBanner([]);
                    setLoading(true);
                } else {
                    console.error('Error fetching data:', error);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        let apiUrl = `${BASE_URL}products/filters?direction=desc&sort=productSale`;
        setLoading(true);
        axiosInstance
            .get(apiUrl, {
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                },
            })
            .then((response) => {
                const dataColletion = response.data.data.content;
                setSaleOffProducts(dataColletion);
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setSaleOffProducts([]);
                    setLoading(true);
                } else {
                    console.error('Error fetching data:', error);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        let apiUrl = `${BASE_URL}products/new/created`;
        setLoading(true);
        axiosInstance
            .get(apiUrl, {
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                },
            })
            .then((response) => {
                const dataColletion = response.data.data;
                setNewProducts(dataColletion);
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setNewProducts([]);
                    setLoading(true);
                } else {
                    console.error('Error fetching data:', error);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
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
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: false,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            }
        ],
    };
    useEffect(() => {
        let apiUrl = `${BASE_URL}product-suppliers/category`;
        setLoading(true);
        axiosInstance
            .get(apiUrl, {
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                },
            })
            .then((response) => {
                const dataSuppliers = response.data.data;
                setSuppliers(dataSuppliers);
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setSuppliers([]); // Lỗi 400, coi như không có sản phẩm
                    setLoading(true);
                } else {
                    console.error('Error fetching data:', error);
                }
            })
            .finally(() => {
                setLoading(false); // Kết thúc loading
            });
    }, []);
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);

    const handleMouseDown = (e) => {
        setDragging(false);
        setStartX(e.clientX); // Lưu vị trí bắt đầu
    };

    const handleMouseMove = (e) => {
        if (Math.abs(e.clientX - startX) > 5) {
            setDragging(true); // Nếu khoảng cách kéo lớn hơn 5px => coi như đang kéo
        }
    };

    const handleMouseUp = (supplierId) => {
        if (!dragging) {
            handleClick(supplierId); // Chỉ gọi handleClick nếu không kéo
        }
    };
    const handleClick = (id) => {

        const data = { supplierIds: [id] }; // Dữ liệu cần truyền
        navigate('/product-list', { state: data }); // Truyền dữ liệu qua state
    };



    return (
        <>
            <div className="section">
                <div className="container">
                    {/* New Products Section */}
                    <div className="row row-title">
                        <Banner banners={banners} loading={loading} />
                        {loading ? <Skeleton height={150} /> : (<Slider {...settings}>
                            {suppliers.map((supplier) => (
                                <div 
                                key={supplier.productSupplierSd}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove} 
                                onClick={() => handleMouseUp(supplier.productSupplierSd)}>
                                    <img
                                        src={supplier.productSupplierLogo}
                                        alt={supplier.productSupplierName}

                                        style={{
                                            width: isDesktop ? "100px" : "70px",
                                            height: isDesktop ? "100px" : "70px",
                                            margin: isDesktop ? "25%" : "5%",
                                            marginTop: isDesktop ? 0 : "20%",
                                            cursor: 'pointer',
                                        }}
                                    />
                                </div>
                            ))}
                        </Slider>)}

                        <div className="section-title text-center">
                            <h3 className="titlex">New Products</h3>
                        </div>
                        {loading && isDesktop ? (
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
                        ) : loading && isMobile ? (
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
                        {loading && isDesktop ? (
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
                                    {saleOffProducts.slice(0, 10).map((product) => (
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
                        ) : loading && isMobile ? (
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
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h3 className="title" style={{ textAlign: 'center' }}>Collections</h3>
                            </div>
                        </div>
                        {loading ? (
                            <Skeleton count={3} height={200} />
                        ) : isDesktop ? (
                            <DesktopCollections collections={mockCollections} />
                        ) : (
                            <MobileCollections collections={mockCollections} />
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
        </>
    );
};

export default HomePage;