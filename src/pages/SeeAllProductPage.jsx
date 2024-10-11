import React, { useEffect, useState } from 'react';
import Product from '../components/Product'; // Import your Product component
import ScrollToTop from '../components/ScrollToTop';
import BrandFilter from '../components/BrandFilter';
import PriceFilter from '../components/PriceFilter';
import CategoryFilter from '../components/CategoryFilter';
import SizeFilter from '../components/SizeFilter';
import axios from 'axios';

const Store = () => {
    const [productsState, setProductsState] = useState([]); // Dữ liệu sản phẩm
    const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
    const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
    const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại (theo API)
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang (theo API)
    const [totalElements, setTotalElements] = useState(1); // Tổng số sản phẩm
    const [pageSize, setPageSize] = useState(20); // Kích thước trang (số sản phẩm mỗi trang)
    const [sort, setSort] = useState(''); // Kích thước trang (số sản phẩm mỗi trang)
    const [direction, setDirection] = useState(''); // Kích thước trang (số sản phẩm mỗi trang)
    const [priceRange, setPriceRange] = useState({ minPrice: 5, maxPrice: 1000 });
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    const handlePriceChange = (range) => {
        setPriceRange(range); // Update the price range state
    };

    // Fetch product data từ API khi trang hiện tại thay đổi
    useEffect(() => {
        setIsLoading(true); // Bắt đầu trạng thái loading

        axios.get(
            `http://192.168.1.11:8080/api/v1/products?page=${currentPage}&size=${pageSize}&sort=${sort}&direction=${direction}`
        )
            .then(response => {
                const { content } = response.data.data; // Lấy dữ liệu sản phẩm
                const { totalPages, number, size, totalElements } = response.data.data.page; // Lấy thông tin trang
                setProductsState(content); // Lưu sản phẩm vào state
                setTotalPages(totalPages); // Lưu tổng số trang
                setCurrentPage(number); // Lưu số trang hiện tại (number từ API bắt đầu từ 0)
                setPageSize(size); // Lưu số lượng sản phẩm mỗi trang
                setTotalElements(totalElements); // Lưu tổng số sản phẩm
                setIsLoading(false); // Dừng trạng thái loading
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, [currentPage, pageSize, sort, direction]); // Cập nhật khi currentPage hoặc pageSize thay đổi
    

    // Filter products based on price range
    useEffect(() => {
        const filtered = productsState.filter(
            (product) =>
                product['product-price'] >= priceRange.minPrice && product['product-price'] <= priceRange.maxPrice
        );
        setFilteredProducts(filtered); // Update the filtered product list
    }, [priceRange, productsState]); // Trigger filtering when price range or productsState changes

    // Chuyển trang
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    const handleSelectChange = (event) => {
        const value = event.target.value.split('|')
        setDirection(value[1])
        setSort(value[0]); // Cập nhật state với giá trị được chọn
        // console.log(sort, direction)
    };



    return (
        <div className="section">
            <div className="container">
                <div id="aside" className="col-md-3">
                    <CategoryFilter isLoading={isLoading} />
                    <PriceFilter isLoading={isLoading} onPriceChange={handlePriceChange} />

                    <BrandFilter
                        isLoading={isLoading}
                        onSelectBrands={setSelectedBrands}
                        selectedBrands={selectedBrands}
                    />
                    <SizeFilter
                        isLoading={isLoading}
                        onSelectSizes={setSelectedSizes}
                        selectedSizes={selectedSizes}
                    />
                </div>
                <div id="store" className="col-md-9">
                    <div className="store-sort">
                        <label>
                            Sort By:
                            <select className="input-select" value={`${sort}|${direction}`} onChange={handleSelectChange}>
                                <option value="">All</option>
                                <option value="price|asc">1</option>
                                <option value="price|desc">2</option>
                            </select>
                        </label>

                        <label>
                            Show:
                            <select className="input-select">
                                <option value="0">20</option>
                                <option value="1">50</option>
                            </select>
                        </label>
                    </div>
                    {/* Store products */}
                    <div className="row">
                        {!isLoading && filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <Product
                                    key={product['product-id']}
                                    id={product['product-id']}
                                    name={product['product-name']}
                                    price={product['product-price']}
                                    images={product['product-images']}
                                    rating={product['product-rating']}
                                    isLoading={isLoading}
                                />
                            ))
                        ) : (
                            productsState.map((product) => (
                                <Product
                                    key={product['product-id']}
                                    id={product['product-id']}
                                    name={product['product-name']}
                                    price={product['product-price']}
                                    images={product['product-images']}
                                    rating={product['product-rating']}
                                    isLoading={isLoading}
                                />
                            ))
                        )}
                    </div>
                    {/* /store products */}

                    {/* Store bottom filter */}
                    {!isLoading && (
                        <div className="store-filter clearfix">
                            <span className="store-qty">
                                Showing {currentPage * pageSize + 1}-
                                {Math.min((currentPage + 1) * pageSize, totalElements)} of{' '}
                                {totalElements} products
                            </span>
                            <ul className="store-pagination">
                                {/* First page button */}
                                {currentPage > 0 && (
                                    <li>
                                        <a href="#!" onClick={() => handlePageChange(0)} style={{ color: '#000' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 14 14">
                                                <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                                                <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                                            </svg>
                                        </a>
                                    </li>
                                )}

                                {/* Previous page button */}
                                {currentPage > 0 && (
                                    <li>
                                        <a href="#!" onClick={() => handlePageChange(currentPage - 1)} style={{ color: '#000' }}>
                                            <i className="fa fa-chevron-left"></i>
                                        </a>
                                    </li>
                                )}

                                {/* Page numbers */}
                                {[...Array(totalPages).keys()].map((page) => (
                                    <li key={page} className={currentPage === page ? 'active' : ''}>
                                        <a
                                            href="#!"
                                            onClick={() => handlePageChange(page)}
                                            style={{
                                                color: currentPage === page ? '#fff' : '#000',
                                                pointerEvents: currentPage === page ? 'none' : 'auto',
                                            }}
                                        >
                                            {page + 1}
                                        </a>
                                    </li>
                                ))}

                                {/* Next page button */}
                                {currentPage < totalPages - 1 && (
                                    <li>
                                        <a href="#!" onClick={() => handlePageChange(currentPage + 1)} style={{ color: '#000' }}>
                                            <i className="fa fa-chevron-right"></i>
                                        </a>
                                    </li>
                                )}

                                {/* Last page button */}
                                {currentPage < totalPages - 1 && (
                                    <li>
                                        <a href="#!" onClick={() => handlePageChange(totalPages - 1)} style={{ color: '#000' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 14 14">
                                                <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708" />
                                                <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708" />
                                            </svg>
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                    {/* /store bottom filter */}
                </div>
            </div>
            <ScrollToTop />
        </div>
    );
};

export default Store;