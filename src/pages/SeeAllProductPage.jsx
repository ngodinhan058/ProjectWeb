import React, { useState } from 'react';
import Product from '../components/Product'; // Import component Product đã tạo trước đó


const Store = () => {
    // Dữ liệu giả sản phẩm
    const products = [
        { id: 1, img1: './img/product01.png',img2: './img/product02.png', category: 'Category', name: 'Product 1', price: 980.00, oldPrice: 990.00, rating: 1, isNew: false, sale: null},
        { id: 2, img1: './img/product02.png',img2: './img/product03.png', category: 'Category', name: 'Product 2', price: 980.00, oldPrice: 990.00, rating: 2, isNew: false, sale: 50 },
        { id: 3, img1: './img/product03.png',img2: './img/product04.png', category: 'Category', name: 'Product 3', price: 980.00, oldPrice: 990.00, rating: 3, isNew: true, sale: null },
        { id: 4, img1: './img/product04.png',img2: './img/product05.png', category: 'Category', name: 'Product 4', price: 980.00, oldPrice: 990.00, rating: 5, isNew: true, sale: 30 },
        { id: 5, img1: './img/product05.png',img2: './img/product06.png', category: 'Category', name: 'Product 5', price: 980.00, oldPrice: 990.00, rating: 1, isNew: false, sale: null },
        { id: 6, img1: './img/product06.png',img2: './img/product07.png', category: 'Category', name: 'Product 6', price: 980.00, oldPrice: 990.00, rating: 0, isNew: true, sale: 30 },
        { id: 7, img1: './img/product07.png',img2: './img/product08.png', category: 'Category', name: 'Product 7', price: 980.00, oldPrice: 990.00, rating: 1, isNew: true, sale: 70 },
        { id: 8, img1: './img/product08.png',img2: './img/product01.png', category: 'Category', name: 'Product 8', price: 980.00, oldPrice: 990.00, rating: 5, isNew: false, sale: 30 },
    ];

    // State quản lý trang hiện tại và số sản phẩm trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 3;

    // Tính toán các sản phẩm cần hiển thị dựa trên trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Tạo mảng số trang
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (

        <div className="section">
            <div className="container">
                <div id="aside" className="col-md-3"></div>

                <div id="store" className="col-md-9">
                    {/* Store top filter */}
                    <div className="store-filter clearfix">
                        <div className="store-sort">
                            <label>
                                Sort By:
                                <select className="input-select">
                                    <option value="0">Popular</option>
                                    <option value="1">Position</option>
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
                        <ul className="store-grid">
                            <li className="active"><i className="fa fa-th"></i></li>
                            <li><a href="#"><i className="fa fa-th-list"></i></a></li>
                        </ul>
                    </div>
                    {/* /store top filter */}

                    {/* Store products */}
                    <div className="row">
                        {currentProducts.map((product) => (
                            <Product key={product.id} {...product} />
                        ))}
                    </div>
                    {/* /store products */}

                    {/* Store bottom filter */}
                    <div className="store-filter clearfix">
                        <span className="store-qty">
                            Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} of {products.length} products
                        </span>
                        <ul className="store-pagination">

                            {/* Nút về trang đầu (ẩn khi ở trang đầu) */}
                            {currentPage !== 1 && (
                                <li>
                                    <a href="#!" onClick={() => handlePageChange(1)} style={{ color: '#000' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 14 14">
                                            <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                                            <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                                        </svg>
                                    </a>
                                </li>
                            )}

                            {/* Nút trang trước (ẩn khi ở trang đầu) */}
                            {currentPage !== 1 && (
                                <li>
                                    <a href="#!" onClick={() => handlePageChange(currentPage - 1)} style={{ color: '#000' }}>
                                        <i className="fa fa-chevron-left"></i>
                                    </a>
                                </li>
                            )}

                            {/* Nút số trang */}
                            {[...Array(totalPages).keys()].map(page => (
                                <li key={page} className={currentPage === page + 1 ? 'active' : ''}>
                                    <a
                                        href="#!"
                                        onClick={() => handlePageChange(page + 1)}
                                        style={{ color: currentPage === page + 1 ? '#fff' : 'red', pointerEvents: currentPage === page + 1 ? 'none' : 'auto' }}
                                    >
                                        {page + 1}
                                    </a>
                                </li>
                            ))}

                            {/* Nút trang kế tiếp (ẩn khi ở trang cuối) */}
                            {currentPage !== totalPages && (
                                <li>
                                    <a href="#!" onClick={() => handlePageChange(currentPage + 1)} style={{ color: '#000' }}>
                                        <i className="fa fa-chevron-right"></i>
                                    </a>
                                </li>
                            )}

                            {/* Nút tới trang cuối (ẩn khi ở trang cuối) */}
                            {currentPage !== totalPages && (
                                <li>
                                    <a href="#!" onClick={() => handlePageChange(totalPages)} style={{ color: '#000' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 14 14">
                                            <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708" />
                                            <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708" />
                                        </svg>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>


                    {/* /store bottom filter */}
                </div>

            </div>
        </div>


    );
};

export default Store;