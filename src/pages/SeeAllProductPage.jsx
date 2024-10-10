import React, { useState } from "react";
import Product from "../components/Product"; // Import component Product đã tạo trước đó
import FilterPrice from "../components/PriceFilter"; // Import component Product đã tạo trước đó
import FilterBrand from "../components/BrandFilter"; // Import component Product đã tạo trước đó

const Store = () => {
  // Dữ liệu giả sản phẩm
  const products = [
    {
      id: 1,
      img1: "./img/product01.png",
      img2: "./img/product02.png",
      category: "Category",
      name: "Product 1",
      price: 980.0,
      oldPrice: 990.0,
      rating: 1,
      isNew: false,
      sale: null,
    },
    {
      id: 2,
      img1: "./img/product02.png",
      img2: "./img/product03.png",
      category: "Category",
      name: "Product 2",
      price: 980.0,
      oldPrice: 990.0,
      rating: 2,
      isNew: false,
      sale: 50,
    },
    {
      id: 3,
      img1: "./img/product03.png",
      img2: "./img/product04.png",
      category: "Category",
      name: "Product 3",
      price: 980.0,
      oldPrice: 990.0,
      rating: 3,
      isNew: true,
      sale: null,
    },
    {
      id: 4,
      img1: "./img/product04.png",
      img2: "./img/product05.png",
      category: "Category",
      name: "Product 4",
      price: 980.0,
      oldPrice: 990.0,
      rating: 5,
      isNew: true,
      sale: 30,
    },
    {
      id: 5,
      img1: "./img/product05.png",
      img2: "./img/product06.png",
      category: "Category",
      name: "Product 5",
      price: 980.0,
      oldPrice: 990.0,
      rating: 1,
      isNew: false,
      sale: null,
    },
    {
      id: 6,
      img1: "./img/product06.png",
      img2: "./img/product07.png",
      category: "Category",
      name: "Product 6",
      price: 980.0,
      oldPrice: 990.0,
      rating: 0,
      isNew: true,
      sale: 30,
    },
    {
      id: 7,
      img1: "./img/product07.png",
      img2: "./img/product08.png",
      category: "Category",
      name: "Product 7",
      price: 980.0,
      oldPrice: 990.0,
      rating: 1,
      isNew: true,
      sale: 70,
    },
    {
      id: 8,
      img1: "./img/product08.png",
      img2: "./img/product01.png",
      category: "Category",
      name: "Product 8",
      price: 980.0,
      oldPrice: 990.0,
      rating: 5,
      isNew: false,
      sale: 30,
    },

    // thêm dữ liệu để test filter
    {
      id: 9,
      img1: "./img/product01.png",
      img2: "./img/product02.png",
      category: "SAMSUNG",
      name: "Product 1",
      price: 580.0,
      oldPrice: 990.0,
      rating: 1,
      isNew: false,
      sale: null,
    },
    {
      id: 10,
      img1: "./img/product02.png",
      img2: "./img/product03.png",
      category: "LG",
      name: "Product 2",
      price: 480.0,
      oldPrice: 990.0,
      rating: 2,
      isNew: false,
      sale: 50,
    },
    {
      id: 11,
      img1: "./img/product03.png",
      img2: "./img/product04.png",
      category: "SONY",
      name: "Product 3",
      price: 380.0,
      oldPrice: 990.0,
      rating: 3,
      isNew: true,
      sale: null,
    },
    {
      id: 12,
      img1: "./img/product04.png",
      img2: "./img/product05.png",
      category: "SAMSUNG",
      name: "Product 4",
      price: 280.0,
      oldPrice: 990.0,
      rating: 5,
      isNew: true,
      sale: 30,
    },
    {
      id: 13,
      img1: "./img/product05.png",
      img2: "./img/product06.png",
      category: "SAMSUNG",
      name: "Product 5",
      price: 180.0,
      oldPrice: 990.0,
      rating: 1,
      isNew: false,
      sale: null,
    },
    {
      id: 14,
      img1: "./img/product06.png",
      img2: "./img/product07.png",
      category: "SONY",
      name: "Product 6",
      price: 80.0,
      oldPrice: 990.0,
      rating: 0,
      isNew: true,
      sale: 30,
    },
    {
      id: 15,
      img1: "./img/product07.png",
      img2: "./img/product08.png",
      category: "LG",
      name: "Product 7",
      price: 80.0,
      oldPrice: 990.0,
      rating: 1,
      isNew: true,
      sale: 70,
    },
    {
      id: 16,
      img1: "./img/product08.png",
      img2: "./img/product01.png",
      category: "LG",
      name: "Product 8",
      price: 50.0,
      oldPrice: 990.0,
      rating: 5,
      isNew: false,
      sale: 30,
    },
  ];

  // State quản lý trang hiện tại và số sản phẩm trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPriceRange, setSelectedPriceRange] = useState([5, 1000]); // Default price range
  const [selectedBrand, setSelectedBrand] = useState(null); // For brand filtering

  const [loading, setLoading] = useState(false); // State để quản lý loading

  const productsPerPage = 3;

  // Tính toán các sản phẩm cần hiển thị dựa trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Hàm lọc sản phẩm dựa trên giá và thương hiệu
  const filterProducts = (products) => {
    const [minPrice, maxPrice] = selectedPriceRange;

    return products.filter((product) => {
      const isInPriceRange =
        product.price >= minPrice && product.price <= maxPrice;
      const isInBrand = selectedBrand
        ? selectedBrand.includes(product.category)
        : true; // Change logic based on your brand filtering

      return isInPriceRange && isInBrand;
    });
  };

  const filteredProducts = filterProducts(products);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Tính toán các sản phẩm hiện tại sau khi lọc
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setLoading(true); // Bắt đầu loading
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setLoading(false); // Kết thúc loading
    }, 1000);
  };

  // Hàm để nhận giá trị từ PriceFilter
  const handlePriceChange = (min, max) => {
    console.log(`Price changed to: ${min} - ${max}`);
    setLoading(true); // Bắt đầu loading
    setTimeout(() => {
      setSelectedPriceRange([min, max]);
      setCurrentPage(1); // Reset to first page when changing price range
      setLoading(false); // Kết thúc loading
    }, 1000); // Delay 1 second
  };

  // Hàm để nhận giá trị từ BrandFilter
  const handleBrandChange = (brand) => {
    setLoading(true); // Bắt đầu loading
    setTimeout(() => {
      setSelectedBrand(brand);
      setCurrentPage(1); // Reset to first page when changing brand
      setLoading(false); // Kết thúc loading
    }, 1000); // Delay 1 second
  };

  return (
    <div className="section">
      <div className="container">
        <div id="aside" className="col-md-3">
          <FilterPrice onPriceChange={handlePriceChange} />
          <FilterBrand onBrandChange={handleBrandChange} />
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
          {loading ? (
            <div className="loading">Đang tải...</div>
          ) : (
            <>
              <div className="row">
                {currentProducts.map((product) => (
                  <Product key={product.id} {...product} />
                ))}
              </div>
  
              {/* Store bottom filter */}
              <div className="store-filter clearfix">
                <span className="store-qty">
                  Showing {indexOfFirstProduct + 1}-
                  {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                  {filteredProducts.length} products
                </span>
                <ul className="store-pagination">
                  {/* Nút về trang đầu (ẩn khi ở trang đầu) */}
                  {currentPage !== 1 && (
                    <li>
                      <a
                        href="#!"
                        onClick={() => handlePageChange(1)}
                        style={{ color: "#000" }}
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
                        style={{ color: "#000" }}
                      >
                        <i className="fa fa-chevron-left"></i>
                      </a>
                    </li>
                  )}
  
                  {/* Nút số trang */}
                  {[...Array(totalPages).keys()].map((page) => (
                    <li
                      key={page}
                      className={currentPage === page + 1 ? "active" : ""}
                    >
                      <a
                        href="#!"
                        onClick={() => handlePageChange(page + 1)}
                        style={{
                          color: currentPage === page + 1 ? "#fff" : "red",
                          pointerEvents: currentPage === page + 1 ? "none" : "auto",
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
                        style={{ color: "#000" }}
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
                        style={{ color: "#000" }}
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
              {/* /store bottom filter */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
