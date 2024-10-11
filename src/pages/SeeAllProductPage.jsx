import React, { useEffect, useState } from 'react';
import Product from '../components/Product'; // Import your Product component
import axios from 'axios';

const Store = () => {
    const [productsState, setProductsState] = useState([]); // Dữ liệu sản phẩm
    const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
    const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại (theo API)
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang (theo API)
    const [totalElements, setTotalElements] = useState(1); // Tổng số sản phẩm
    const [pageSize, setPageSize] = useState(3); // Kích thước trang (số sản phẩm mỗi trang)
    const [sort, setSort] = useState(''); // Kích thước trang (số sản phẩm mỗi trang)
    const [direction, setDirection] = useState(''); // Kích thước trang (số sản phẩm mỗi trang)


    // Fetch product data từ API khi trang hiện tại thay đổi
    useEffect(() => {
        setIsLoading(true); // Bắt đầu trạng thái loading
        axios.get(`http://192.168.1.11:8080/api/v1/products?page=${currentPage}&size=${pageSize}&sort=${sort}&direction=${direction}`)
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
        console.log(sort, direction)
    };



    return (
        <div className="section">
            <div className="container">
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
                        {!isLoading && productsState.length > 0 ? (
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
                        ) : (
                            <div className="no-products">
                                <h3>Không tìm thấy sản phẩm</h3>
                            </div>
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
                                            First
                                        </a>
                                    </li>
                                )}

                                {/* Previous page button */}
                                {currentPage > 0 && (
                                    <li>
                                        <a href="#!" onClick={() => handlePageChange(currentPage - 1)} style={{ color: '#000' }}>
                                            Previous
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
                                            Next
                                        </a>
                                    </li>
                                )}

                                {/* Last page button */}
                                {currentPage < totalPages - 1 && (
                                    <li>
                                        <a href="#!" onClick={() => handlePageChange(totalPages - 1)} style={{ color: '#000' }}>
                                            Last
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                    {/* /store bottom filter */}
                </div>
            </div>
        </div>
    );
};

export default Store;
