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
    const [sort, setSort] = useState('id'); // Kích thước trang (số sản phẩm mỗi trang)
    const [direction, setDirection] = useState(''); // Kích thước trang (số sản phẩm mỗi trang)
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000000);



    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);


    useEffect(() => {
       
        let apiUrl = 'http://192.168.1.11:8080/api/v1/products/filters?';

        // Khởi tạo danh sách query params
        const queryParams = [];
        if (currentPage !== null && currentPage !== undefined) queryParams.push(`page=${currentPage}`); // Thêm tham số page
        if (pageSize) queryParams.push(`size=${pageSize}`);
        if (direction && direction !== "") queryParams.push(`direction=${direction}`);
        if (minPrice !== null && minPrice !== undefined) queryParams.push(`minPrice=${minPrice}`);
        if (maxPrice !== null && maxPrice !== undefined) queryParams.push(`maxPrice=${maxPrice}`);

        if (selectedCategories.length > 0) {
            const categoryIds = selectedCategories.map(cat => cat['category-id']).join(','); // Ghép các `category-id` thành chuỗi
            queryParams.push(`category_id=${categoryIds}`);
        }



        apiUrl += queryParams.join('&');

        console.log(apiUrl);

        axios.get(apiUrl)
            .then(response => {
                const { content } = response.data.data;
                const { totalPages, number, size, totalElements } = response.data.data.page;
                setProductsState(content);
                setTotalPages(totalPages);
                setCurrentPage(number);
                setPageSize(size);
                setTotalElements(totalElements);
                setIsLoading(false);

                const filtered = content.filter(product =>
                    product['product-price'] >= minPrice && product['product-price'] <= maxPrice
                );
                setFilteredProducts(filtered);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, [currentPage, pageSize, sort, direction, minPrice, maxPrice, selectedCategories]);
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
    const handleCategoryChange = (selectedSubcategories) => {
        setSelectedCategories(selectedSubcategories); // Cập nhật danh mục được chọn
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
                                <option value="">All</option>
                                <option value="price|asc">Tăng Dần (Giá)</option>
                                <option value="price|desc">Giảm Dần (Giá)</option>
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
                                    sale={product['product-sale']}
                                    isLoading={isLoading}
                                />
                            ))
                        ) : (

                            <div>
                                <h3>Không có sản phẩm</h3>
                            </div>
                        )}
                    </div>
                    {/* /store products */}

                    {/* Store bottom filter */}


                    {!isLoading && filteredProducts.length > 0 ? (
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
                                            pointerEvents: currentPage > 0 ? 'auto' : 'none'
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
                                            pointerEvents: currentPage > 0 ? 'auto' : 'none'
                                        }}
                                    >
                                        <i className="fa fa-chevron-left"></i>
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
                                        <i className="fa fa-chevron-right"></i>
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
                        <></>
                    )}

                    {/* /store bottom filter */}
                </div>
            </div>
            <ScrollToTop />
        </div>
    );
};

export default Store;