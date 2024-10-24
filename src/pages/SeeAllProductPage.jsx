import React, { useEffect, useState } from 'react';
import Product from '../components/Product'; // Import your Product component
import ScrollToTop from '../components/ScrollToTop';
import BrandFilter from '../components/BrandFilter';
import PriceFilter from '../components/PriceFilter';
import CategoryFilter from '../components/CategoryFilter';
import SizeFilter from '../components/SizeFilter';
import axios from 'axios';
import { BASE_URL } from '../components/api/config';
import { axiosInstance } from '../components/api/axiosConfig';

const Store = () => {
    const [productsState, setProductsState] = useState([]); // Dữ liệu sản phẩm
    const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
    const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại (theo API)
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang (theo API)
    const [totalElements, setTotalElements] = useState(1); // Tổng số sản phẩm
    const [pageSize, setPageSize] = useState(20); // Kích thước trang (số sản phẩm mỗi trang)
    const [sort, setSort] = useState('id'); // Kích thước trang (số sản phẩm mỗi trang)
    const [direction, setDirection] = useState(''); // Kích thước trang (số sản phẩm mỗi trang)
    const [categoryId, setCategoryId] = useState([]);


    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000000);



    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);


    useEffect(() => {
        let apiUrl = `${BASE_URL}products/filters?`;
        // Khởi tạo danh sách query params
        const queryParams = [];
        if (currentPage !== null && currentPage !== undefined) queryParams.push(`page=${currentPage}`); // Thêm tham số page
        if (pageSize) queryParams.push(`size=${pageSize}`);
        if (direction && direction !== "") queryParams.push(`direction=${direction}`);
        // if (sort && sort != "") queryParams.push(`sort=${sort}`);
        if (minPrice !== null && minPrice !== undefined) queryParams.push(`minPrice=${minPrice}`);
        if (maxPrice !== null && maxPrice !== undefined) queryParams.push(`maxPrice=${maxPrice}`);
        if (categoryId !== null && categoryId !== "") queryParams.push(`categoryId=${categoryId}`);

        apiUrl += queryParams.join('&');

        axiosInstance.get(apiUrl, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })
            .then(response => {
                const { content } = response.data.data;
                const { totalPages, number, size, totalElements } = response.data.data.page;
                setProductsState(content);

                setTotalPages(totalPages);
                setCurrentPage(number);
                setPageSize(size);
                setTotalElements(totalElements);
                setIsLoading(false);
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setProductsState([]); // Lỗi 400, coi như không có sản phẩm
                    setIsLoading(false);
                } else {
                    console.error("Error fetching data:", error);
                }

            });
    }, [currentPage, pageSize, sort, direction, minPrice, maxPrice, categoryId]);

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
    // Handle price range change
    const handlePriceChange = ({ minPrice, maxPrice }) => {
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
    };
    // Hàm xử lý khi thay đổi danh mục
    const handleCategoryChange = (selectedSubcCategory) => {
        if (selectedSubcCategory != null) {
            setCategoryId(selectedSubcCategory);
        }

        // Cập nhật danh mục được chọnz
    };
    return (
        <div className="section">
            <div className="container">
                <div id="aside" className="col-md-3">
                    <CategoryFilter isLoading={isLoading} onCategoryChange={handleCategoryChange} />
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
                                <option value="price|asc">Tăng Dần (Giá)</option>
                                <option value="price|desc">Giảm Dần (Giá)</option>
                                <option value="sale|desc">Giảm Dần (Sale)</option>

                            </select>
                        </label>

                    </div>
                    {/* Store products */}
                    <div className="row">

                        {isLoading ? (
                            // Render các Skeleton
                            Array(20).fill().map((_, index) => (
                                <Product
                                    key={index}
                                    isLoading={isLoading}
                                />
                            ))
                        ) : (
                            productsState.length > 0 ? (
                                productsState.map((product) => (
                                    <div className="col-md-3 col-xs-6">
                                        <Product
                                            key={product['productId']}
                                            id={product['productId']}
                                            name={product['productName']}
                                            price={product['productPriceSale']}
                                            oldPrice={product['productPrice']}
                                            supplier={product['productSupplier']['productSupplierName']}
                                            images={product['productImages']}
                                            rating={product['productRating']}
                                            sale={product['productSale']}

                                            isLoading={false}  // Đặt isLoading là false khi không tải
                                        />
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <h3>Không có sản phẩm</h3>
                                </div>
                            )
                        )}
                    </div>

                    {/* /store products */}

                    {/* Store bottom filter */}


                    {!isLoading && productsState.length > 0 ? (
                        <div className="store-filter clearfix">
                            <span className="store-qty">
                                Showing {currentPage * pageSize + 1}-
                                {Math.min((currentPage + 1) * pageSize, totalElements)} of{' '}
                                {totalElements} products
                            </span>
                            <ul className="store-pagination">
                                {/* First page button */}
                                <li>
                                    <a
                                        href="#!"
                                        onClick={() => handlePageChange(0)}
                                        style={{
                                            color: currentPage > 0 ? '#000' : '#ccc',
                                            pointerEvents: currentPage > 0 ? 'auto' : 'auto'
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 14 14">
                                            <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                                            <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                                        </svg>
                                    </a>
                                </li>

                                {/* Previous page button */}
                                <li>
                                    <a
                                        href="#!"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        style={{
                                            color: currentPage > 0 ? '#000' : '#ccc',
                                            pointerEvents: currentPage > 0 ? 'auto' : 'auto'
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                                        </svg>
                                    </a>
                                </li>

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
                                <li>
                                    <a
                                        href="#!"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        style={{
                                            color: currentPage < totalPages - 1 ? '#000' : '#ccc',
                                            pointerEvents: currentPage < totalPages - 1 ? 'auto' : 'none'
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                                        </svg>
                                    </a>
                                </li>

                                {/* Last page button */}
                                <li>
                                    <a
                                        href="#!"
                                        onClick={() => handlePageChange(totalPages - 1)}
                                        style={{
                                            color: currentPage < totalPages - 1 ? '#000' : '#ccc',
                                            pointerEvents: currentPage < totalPages - 1 ? 'auto' : 'none'
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 14 14">
                                            <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708" />
                                            <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="store-filter clearfix">
                            <span className="store-qty">
                                Showing {currentPage * pageSize + 1}-
                                {Math.min((currentPage + 1) * pageSize, totalElements)} of{' '}
                                {totalElements} products
                            </span>
                            <ul className="store-pagination">
                                {/* First page button */}
                                <li>
                                    <a
                                        href="#!"
                                        onClick={() => handlePageChange(0)}
                                        style={{
                                            color: currentPage > 0 ? '#000' : '#ccc',
                                            pointerEvents: currentPage > 0 ? 'auto' : 'auto'
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 14 14">
                                            <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                                            <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                                        </svg>
                                    </a>
                                </li>

                                {/* Previous page button */}
                                <li>
                                    <a
                                        href="#!"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        style={{
                                            color: currentPage > 0 ? '#000' : '#ccc',
                                            pointerEvents: currentPage > 0 ? 'auto' : 'auto'
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                                        </svg>
                                    </a>
                                </li>

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
                                <li>
                                    <a
                                        href="#!"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        style={{
                                            color: currentPage < totalPages - 1 ? '#000' : '#ccc',
                                            pointerEvents: currentPage < totalPages - 1 ? 'auto' : 'none'
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                                        </svg>
                                    </a>
                                </li>

                                {/* Last page button */}
                                <li>
                                    <a
                                        href="#!"
                                        onClick={() => handlePageChange(totalPages - 1)}
                                        style={{
                                            color: currentPage < totalPages - 1 ? '#000' : '#ccc',
                                            pointerEvents: currentPage < totalPages - 1 ? 'auto' : 'none'
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 14 14">
                                            <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708" />
                                            <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708" />
                                        </svg>
                                    </a>
                                </li>
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