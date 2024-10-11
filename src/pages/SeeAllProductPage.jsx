import React, { useEffect, useState } from 'react';
import Product from '../components/Product'; // Import component Product đã tạo trước đó
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
    sizes: [
      { id: 'size-1', name: 'S', count: 10 },
      { id: 'size-2', name: 'M', count: 20 },
      { id: 'size-3', name: 'L', count: 15 },
      { id: 'size-4', name: 'XL', count: 5 },
      { id: 'size-5', name: 'XXL', count: 2 },
    ],
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
    sizes: [
      { id: 'size-1', name: 'S', count: 12 },
      { id: 'size-2', name: 'M', count: 18 },
      { id: 'size-3', name: 'L', count: 0 },
      { id: 'size-4', name: 'XL', count: 6 },
      { id: 'size-5', name: 'XXL', count: 1 },
    ],
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
    sizes: [
      { id: 'size-1', name: 'S', count: 5 },
      { id: 'size-2', name: 'M', count: 10 },
      { id: 'size-3', name: 'L', count: 8 },
      { id: 'size-4', name: 'XL', count: 4 },
      { id: 'size-5', name: 'XXL', count: 0 },
    ],
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
    sizes: [
      { id: 'size-1', name: 'S', count: 0 },
      { id: 'size-2', name: 'M', count: 12 },
      { id: 'size-3', name: 'L', count: 18 },
      { id: 'size-4', name: 'XL', count: 10 },
      { id: 'size-5', name: 'XXL', count: 3 },
    ],
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
    sizes: [
      { id: 'size-1', name: 'S', count: 8 },
      { id: 'size-2', name: 'M', count: 10 },
      { id: 'size-3', name: 'L', count: 5 },
      { id: 'size-4', name: 'XL', count: 2 },
      { id: 'size-5', name: 'XXL', count: 1 },
    ],
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
    sizes: [
      { id: 'size-1', name: 'S', count: 4 },
      { id: 'size-2', name: 'M', count: 7 },
      { id: 'size-3', name: 'L', count: 3 },
      { id: 'size-4', name: 'XL', count: 1 },
      { id: 'size-5', name: 'XXL', count: 0 },
    ],
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
    sizes: [
      { id: 'size-1', name: 'S', count: 5 },
      { id: 'size-2', name: 'M', count: 5 },
      { id: 'size-3', name: 'L', count: 10 },
      { id: 'size-4', name: 'XL', count: 4 },
      { id: 'size-5', name: 'XXL', count: 2 },
    ],
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
    sizes: [
      { id: 'size-1', name: 'S', count: 6 },
      { id: 'size-2', name: 'M', count: 2 },
      { id: 'size-3', name: 'L', count: 0 },
      { id: 'size-4', name: 'XL', count: 8 },
      { id: 'size-5', name: 'XXL', count: 1 },
    ],
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
    sizes: [
      { id: 'size-1', name: 'S', count: 2 },
      { id: 'size-2', name: 'M', count: 4 },
      { id: 'size-3', name: 'L', count: 8 },
      { id: 'size-4', name: 'XL', count: 3 },
      { id: 'size-5', name: 'XXL', count: 1 },
    ],
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
    sizes: [
      { id: 'size-1', name: 'S', count: 3 },
      { id: 'size-2', name: 'M', count: 5 },
      { id: 'size-3', name: 'L', count: 7 },
      { id: 'size-4', name: 'XL', count: 2 },
      { id: 'size-5', name: 'XXL', count: 0 },
    ],
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
            isLoading={false}
            selectedBrands={selectedBrands}
            onSelectBrands={setSelectedBrands}
          />
          <SizeFilter
            isLoading={false}
            selectedSizes={selectedSizes}
            onSelectSizes={setSelectedSizes}
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
          </div>
          {/* /store top filter */}

          {/* Store products */}
          <div className="row">
            {productsState.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </div>
          {/* /store products */}

          {/* Store bottom filter */}
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
                      class="bi bi-chevron-double-left"
                      viewBox="0 0 14 14"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                      />
                      <path
                        fill-rule="evenodd"
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
                      pointerEvents: currentPage === page + 1 ? 'none' : 'auto',
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
                      class="bi bi-chevron-double-right"
                      viewBox="0 0 14 14"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
                      />
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
