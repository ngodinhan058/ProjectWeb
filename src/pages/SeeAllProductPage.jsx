import React, { useEffect, useState } from 'react';
import Product from '../components/Product'; // Import component Product đã tạo trước đó

import CategoryFilter from '../components/CategoryFilter'; // Import component Product đã tạo trước đó
import PriceFilter from '../components/PriceFilter'; // Import component Product đã tạo trước đó
const Store = () => {
    const products = [
        { id: 1, img1: '../img/20230304_9yEIrUoAkjIxrmbe.jpeg',img2: 'src/img/20230304_rkzwbDstkLriSEhu.jpeg', category: 'Category', name: 'Product 1', price: 980.00, oldPrice: 990.00, rating: 1, isNew: false, sale: null},
        { id: 2, img1: '../img/product02.png',img2: '../img/product03.png', category: 'Category', name: 'Product 2', price: 980.00, oldPrice: 990.00, rating: 2, isNew: false, sale: 50 },
        { id: 3, img1: '../img/product03.png',img2: '../img/product04.png', category: 'Category', name: 'Product 3', price: 980.00, oldPrice: 990.00, rating: 3, isNew: true, sale: null },
        { id: 4, img1: '../img/20230520_4Yf4WmBs11.jpeg',img2: '../img/20230427_igl1jUu9wv.png', category: 'Category', name: 'Product 4', price: 980.00, oldPrice: 990.00, rating: 5, isNew: true, sale: 30 },
        { id: 5, img1: '../img/product05.png',img2: '../img/product06.png', category: 'Category', name: 'Product 5', price: 980.00, oldPrice: 990.00, rating: 1, isNew: false, sale: null },
        { id: 6, img1: '../img/20230424_fwmnvLxZKl.jpeg',img2: '../img/20230525_OzpmexkNIq.jpeg', category: 'Category', name: 'Product 6', price: 980.00, oldPrice: 990.00, rating: 0, isNew: true, sale: 30 },
        { id: 7, img1: '../img/product07.png',img2: '../img/product08.png', category: 'Category', name: 'Product 7', price: 980.00, oldPrice: 990.00, rating: 1, isNew: true, sale: 70 },
        { id: 8, img1: '../img/product08.png',img2: '../img/product09.png', category: 'Category', name: 'Product 8', price: 980.00, oldPrice: 990.00, rating: 5, isNew: false, sale: 30 },
        { id: 9, img1: '../img/product09.png',img2: '../img/product10.png', category: 'Category', name: 'Product 1', price: 980.00, oldPrice: 990.00, rating: 1, isNew: false, sale: null},
        { id: 10, img1: '../img/product10.png',img2: '../img/product11.png', category: 'Category', name: 'Product 2', price: 980.00, oldPrice: 990.00, rating: 2, isNew: false, sale: 50 },
        { id: 11, img1: '../img/product11.png',img2: '../img/product12.png', category: 'Category', name: 'Product 3', price: 980.00, oldPrice: 990.00, rating: 3, isNew: true, sale: null },
        { id: 12, img1: '../img/product12.png',img2: '../img/product01.png', category: 'Category', name: 'Product 4', price: 980.00, oldPrice: 990.00, rating: 5, isNew: true, sale: 30 },
        { id: 13, img1: '../img/product01.png',img2: '../img/product02.png', category: 'Category', name: 'Product 5', price: 980.00, oldPrice: 990.00, rating: 1, isNew: false, sale: null },
        { id: 14, img1: '../img/product02.png',img2: '../img/product03.png', category: 'Category', name: 'Product 6', price: 980.00, oldPrice: 990.00, rating: 0, isNew: true, sale: 30 },
        { id: 15, img1: '../img/product03.png',img2: '../img/product04.png', category: 'Category', name: 'Product 7', price: 980.00, oldPrice: 990.00, rating: 1, isNew: true, sale: 70 },
        { id: 16, img1: '../img/product04.png',img2: '../img/product05.png', category: 'Category', name: 'Product 8', price: 980.00, oldPrice: 990.00, rating: 5, isNew: false, sale: 30 },
        { id: 17, img1: '../img/product05.png',img2: '../img/product06.png', category: 'Category', name: 'Product 1', price: 980.00, oldPrice: 990.00, rating: 1, isNew: false, sale: null},
        { id: 18, img1: '../img/product06.png',img2: '../img/product03.png', category: 'Category', name: 'Product 2', price: 980.00, oldPrice: 990.00, rating: 2, isNew: false, sale: 50 },
        { id: 19, img1: '../img/product07.png',img2: '../img/product04.png', category: 'Category', name: 'Product 3', price: 980.00, oldPrice: 990.00, rating: 3, isNew: true, sale: null },
        { id: 20, img1: '../img/product08.png',img2: '../img/product05.png', category: 'Category', name: 'Product 4', price: 980.00, oldPrice: 990.00, rating: 5, isNew: true, sale: 30 },
        { id: 21, img1: '../img/product09.png',img2: '../img/product06.png', category: 'Category', name: 'Product 5', price: 980.00, oldPrice: 990.00, rating: 1, isNew: false, sale: null },
        { id: 22, img1: '../img/product10.png',img2: '../img/product07.png', category: 'Category', name: 'Product 6', price: 980.00, oldPrice: 990.00, rating: 0, isNew: true, sale: 30 },
        { id: 23, img1: '../img/product11.png',img2: '../img/product08.png', category: 'Category', name: 'Product 7', price: 980.00, oldPrice: 990.00, rating: 1, isNew: true, sale: 70 },
        { id: 24, img1: '../img/product12.png',img2: '../img/product01.png', category: 'Category', name: 'Product 8', price: 980.00, oldPrice: 990.00, rating: 5, isNew: false, sale: 30 },
        { id: 25, img1: '../img/product05.png',img2: '../img/product06.png', category: 'Category', name: 'Product 1', price: 980.00, oldPrice: 990.00, rating: 1, isNew: false, sale: null},
        { id: 26, img1: '../img/product06.png',img2: '../img/product03.png', category: 'Category', name: 'Product 2', price: 980.00, oldPrice: 990.00, rating: 2, isNew: false, sale: 50 },
        { id: 27, img1: '../img/product07.png',img2: '../img/product04.png', category: 'Category', name: 'Product 3', price: 980.00, oldPrice: 990.00, rating: 3, isNew: true, sale: null },
        { id: 28, img1: '../img/product08.png',img2: '../img/product05.png', category: 'Category', name: 'Product 4', price: 980.00, oldPrice: 990.00, rating: 5, isNew: true, sale: 30 },
        { id: 29, img1: '../img/product09.png',img2: '../img/product06.png', category: 'Category', name: 'Product 5', price: 980.00, oldPrice: 990.00, rating: 1, isNew: false, sale: null },
        { id: 30, img1: '../img/product10.png',img2: '../img/product07.png', category: 'Category', name: 'Product 6', price: 980.00, oldPrice: 990.00, rating: 0, isNew: true, sale: 30 },
        { id: 31, img1: '../img/product11.png',img2: '../img/product08.png', category: 'Category', name: 'Product 7', price: 980.00, oldPrice: 990.00, rating: 1, isNew: true, sale: 70 },
        { id: 32, img1: '../img/product12.png',img2: '../img/product01.png', category: 'Category', name: 'Product 8', price: 980.00, oldPrice: 990.00, rating: 5, isNew: false, sale: 30 }, { id: 17, img1: '../img/product05.png',img2: '../img/product06.png', category: 'Category', name: 'Product 1', price: 980.00, oldPrice: 990.00, rating: 1, isNew: false, sale: null},
        { id: 33, img1: '../img/product06.png',img2: '../img/product03.png', category: 'Category', name: 'Product 2', price: 980.00, oldPrice: 990.00, rating: 2, isNew: false, sale: 50 },
        { id: 34, img1: '../img/product07.png',img2: '../img/product04.png', category: 'Category', name: 'Product 3', price: 980.00, oldPrice: 990.00, rating: 3, isNew: true, sale: null },
        { id: 35, img1: '../img/product08.png',img2: '../img/product05.png', category: 'Category', name: 'Product 4', price: 980.00, oldPrice: 990.00, rating: 5, isNew: true, sale: 30 },
        { id: 36, img1: '../img/product09.png',img2: '../img/product06.png', category: 'Category', name: 'Product 5', price: 980.00, oldPrice: 990.00, rating: 1, isNew: false, sale: null },
        { id: 37, img1: '../img/product10.png',img2: '../img/product07.png', category: 'Category', name: 'Product 6', price: 980.00, oldPrice: 990.00, rating: 0, isNew: true, sale: 30 },
        { id: 38, img1: '../img/product11.png',img2: '../img/product08.png', category: 'Category', name: 'Product 7', price: 980.00, oldPrice: 990.00, rating: 1, isNew: true, sale: 70 },
        { id: 39, img1: '../img/product12.png',img2: '../img/product01.png', category: 'Category', name: 'Product 8', price: 980.00, oldPrice: 990.00, rating: 5, isNew: false, sale: 30 },
        { id: 40, img1: '../img/product12.png',img2: '../img/product01.png', category: 'Category', name: 'Product 8', price: 980.00, oldPrice: 990.00, rating: 5, isNew: false, sale: 30 },
        { id: 41, img1: '../img/product12.png',img2: '../img/product01.png', category: 'Category', name: 'Product 8', price: 980.00, oldPrice: 990.00, rating: 5, isNew: false, sale: 30 },
        { id: 42, img1: '../img/product12.png',img2: '../img/product01.png', category: 'Category', name: 'Product 8', price: 980.00, oldPrice: 990.00, rating: 5, isNew: false, sale: 30 },
        { id: 42, img1: '../img/product12.png',img2: '../img/product01.png', category: 'Category', name: 'Product 8', price: 500.00, oldPrice: 990.00, rating: 5, isNew: false, sale: 30 },
    ];

    // State quản lý trang hiện tại và số sản phẩm trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;    

    // Tính toán các sản phẩm cần hiển thị dựa trên trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
    // Giả lập việc tải dữ liệu trong 2 giây
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Thời gian chờ 2 giây

        return () => clearTimeout(timer); // Dọn dẹp bộ đếm thời gian
    }, []);

    // Tạo mảng số trang
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className="section">
            <div className="container">
                <div id="aside" className="col-md-3">
                    <CategoryFilter />
                    <PriceFilter />
                </div>
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
                        {currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
                                <Product key={product.id} {...product} isLoading={isLoading} />
                            ))
                        ) : (
                            <div className="no-products">   
                                <h3>Không tìm thấy sản phẩm</h3>
                            </div>
                        )}
                    </div>
                    {/* /store products */}

                    {/* Store bottom filter */}
                    {currentProducts.length > 0 ? (
                        <div className="store-filter clearfix">
                            <span className="store-qty">
                                Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} of {products.length} products
                            </span>
                            <ul className="store-pagination">
                                {/* Nút về trang đầu (ẩn khi ở trang đầu) */}
                                {currentPage !== 1 && (
                                    <li>
                                        <a href="#!" onClick={() => handlePageChange(1)} style={{ color: '#000' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 14 14">
                                                <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                                                <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
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
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 14 14">
                                                <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708" />
                                                <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708" />
                                            </svg>
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    ) : (
                        <div className="store-filter clearfix">
                        </div>

                    )}
                    {/* /store bottom filter */}
                </div>
=======
import BrandFilter from '../components/BrandFilter';
import SizeFilter from '../components/SizeFilter';

const products = [
  {
    id: 1,
    img1: './img/20230304_9yEIrUoAkjIxrmbe.jpeg',
    img2: './img/20230304_rkzwbDstkLriSEhu.jpeg',
    category: 'Category',
    name: 'Product 1',
    price: 980.0,
    oldPrice: 990.0,
    rating: 1,
    isNew: false,
    sale: null,
    brandId: 'brand-1',
  },
  {
    id: 2,
    img1: './img/product02.png',
    img2: './img/product03.png',
    category: 'Category',
    name: 'Product 2',
    price: 980.0,
    oldPrice: 990.0,
    rating: 2,
    isNew: false,
    sale: 50,
    brandId: 'brand-2',
  },
  {
    id: 3,
    img1: './img/product03.png',
    img2: './img/product04.png',
    category: 'Category',
    name: 'Product 3',
    price: 980.0,
    oldPrice: 990.0,
    rating: 3,
    isNew: true,
    sale: null,
    brandId: 'brand-3',
  },
  {
    id: 4,
    img1: './img/20230520_4Yf4WmBs11.jpeg',
    img2: './img/20230427_igl1jUu9wv.png',
    category: 'Category',
    name: 'Product 4',
    price: 980.0,
    oldPrice: 990.0,
    rating: 5,
    isNew: true,
    sale: 30,
    brandId: 'brand-1',
  },
  {
    id: 5,
    img1: './img/product05.png',
    img2: './img/product06.png',
    category: 'Category',
    name: 'Product 5',
    price: 980.0,
    oldPrice: 990.0,
    rating: 1,
    isNew: false,
    sale: null,
    brandId: 'brand-2',
  },
  {
    id: 6,
    img1: './img/20230424_fwmnvLxZKl.jpeg',
    img2: './img/20230525_OzpmexkNIq.jpeg',
    category: 'Category',
    name: 'Product 6',
    price: 980.0,
    oldPrice: 990.0,
    rating: 0,
    isNew: true,
    sale: 30,
    brandId: 'brand-3',
  },
  {
    id: 7,
    img1: './img/product07.png',
    img2: './img/product08.png',
    category: 'Category',
    name: 'Product 7',
    price: 980.0,
    oldPrice: 990.0,
    rating: 1,
    isNew: true,
    sale: 70,
    brandId: 'brand-1',
  },
  {
    id: 8,
    img1: './img/product08.png',
    img2: './img/product09.png',
    category: 'Category',
    name: 'Product 8',
    price: 980.0,
    oldPrice: 990.0,
    rating: 5,
    isNew: false,
    sale: 30,
    brandId: 'brand-2',
  },
  {
    id: 9,
    img1: './img/product09.png',
    img2: './img/product10.png',
    category: 'Category',
    name: 'Product 1',
    price: 980.0,
    oldPrice: 990.0,
    rating: 1,
    isNew: false,
    sale: null,
    brandId: 'brand-3',
  },
  {
    id: 10,
    img1: './img/product10.png',
    img2: './img/product11.png',
    category: 'Category',
    name: 'Product 2',
    price: 980.0,
    oldPrice: 990.0,
    rating: 2,
    isNew: false,
    sale: 50,
    brandId: 'brand-1',
  },
];

const Store = () => {
  // Dữ liệu giả sản phẩm

  // You can fill in the brandId for the rest of the products similarly.

  // State quản lý trang hiện tại và số sản phẩm trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const productsPerPage = 20;
  const [productsState, setProductsState] = useState(products);

  // Tính toán các sản phẩm cần hiển thị dựa trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  // Giả lập việc tải dữ liệu trong 2 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Thời gian chờ 2 giây

    return () => clearTimeout(timer); // Dọn dẹp bộ đếm thời gian
  }, []);

  // Tạo mảng số trang
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brandId);
      const sizeMatch =
        selectedSizes.length === 0 ||
        selectedSizes.some((sizeId) =>
          product.sizes.some((size) => size.id === sizeId && size.count > 0)
        );

      return brandMatch && sizeMatch;
    });

    setProductsState(filteredProducts);
  }, [selectedBrands, selectedSizes]);

  return (
    <div className="section">
      <div className="container">
        <div id="aside" className="col-md-3">
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
              <li className="active">
                <i className="fa fa-th"></i>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-th-list"></i>
                </a>
              </li>
            </ul>
          </div>
          {/* /store top filter */}

          {/* Store products */}
          <div className="row">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Product key={product.id} {...product} isLoading={isLoading} />
              ))
            ) : (
              <div className="no-products">
                <h3>Không tìm thấy sản phẩm</h3>
              </div>
            )}
          </div>
          {/* /store products */}

          {/* Store bottom filter */}
          {currentProducts.length > 0 ? (
            <div className="store-filter clearfix">
              <span className="store-qty">
                Showing {indexOfFirstProduct + 1}-
                {Math.min(indexOfLastProduct, products.length)} of{' '}
                {products.length} products
              </span>
              <ul className="store-pagination">
                {/* Nút về trang đầu (ẩn khi ở trang đầu) */}
                {currentPage !== 1 && (
                  <li>
                    <a
                      href="#!"
                      onClick={() => handlePageChange(1)}
                      style={{ color: '#000' }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className="bi bi-chevron-double-left"
                        viewBox="0 0 14 14"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                        />
                        <path
                          fillRule="evenodd"
                          d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                        />
                      </svg>
                    </a>
                  </li>
                )}

                {/* Nút trang trước (ẩn khi ở trang đầu) */}
                {currentPage !== 1 && (
                  <li>
                    <a
                      href="#!"
                      onClick={() => handlePageChange(currentPage - 1)}
                      style={{ color: '#000' }}
                    >
                      <i className="fa fa-chevron-left"></i>
                    </a>
                  </li>
                )}

                {/* Nút số trang */}
                {[...Array(totalPages).keys()].map((page) => (
                  <li
                    key={page}
                    className={currentPage === page + 1 ? 'active' : ''}
                  >
                    <a
                      href="#!"
                      onClick={() => handlePageChange(page + 1)}
                      style={{
                        color: currentPage === page + 1 ? '#fff' : 'red',
                        pointerEvents:
                          currentPage === page + 1 ? 'none' : 'auto',
                      }}
                    >
                      {page + 1}
                    </a>
                  </li>
                ))}

                {/* Nút trang kế tiếp (ẩn khi ở trang cuối) */}
                {currentPage !== totalPages && (
                  <li>
                    <a
                      href="#!"
                      onClick={() => handlePageChange(currentPage + 1)}
                      style={{ color: '#000' }}
                    >
                      <i className="fa fa-chevron-right"></i>
                    </a>
                  </li>
                )}

                {/* Nút tới trang cuối (ẩn khi ở trang cuối) */}
                {currentPage !== totalPages && (
                  <li>
                    <a
                      href="#!"
                      onClick={() => handlePageChange(totalPages)}
                      style={{ color: '#000' }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className="bi bi-chevron-double-right"
                        viewBox="0 0 14 14"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
                        />
                        <path
                          fillRule="evenodd"
                          d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
                        />
                      </svg>
                    </a>
                  </li>
                )}
              </ul>

            </div>
          ) : (
            <div className="store-filter clearfix"></div>
          )}
          {/* /store bottom filter */}
        </div>
      </div>
    </div>
  );
};

export default Store;
