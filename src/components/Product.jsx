import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Product = ({ id, images, name, category, price, oldPrice, rating, sale, isNew, isLoading }) => {

  const renderRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={i <= rating ? 'fa fa-star' : 'fa fa-star-o'}
        ></i>
      );
    }
    return stars;
  };

  const img1 = [images]

  // console.log(img1)


  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/${id}`, {
      state: { id, images, name, category, price, oldPrice, rating, sale, isNew },
    });
  };

  return (
    <div className="col-md-3 col-xs-6">
      <div
        key={id}
        className="product"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="product-img">
          {/* Hiển thị skeleton khi đang load */}
          {isLoading ? (
            <Skeleton height={300} />
          ) : (
            <img
              src={isHovered
                ? img1[0][1]?.['product-image-path'] || img1[0][0]['product-image-path'] // Sử dụng ảnh thứ hai nếu không null, ngược lại sử dụng ảnh mặc định
                : img1[0][0]?.['product-image-path'] || img1[0][1]['product-image-path'] // Tương tự cho ảnh đầu tiên
              }
              alt={img1[0][0]?.['product-image-alt'] || 'Default Alt Text'} // Giá trị alt, nếu không có thì dùng văn bản mặc định
            />

          )}
          <div className="product-label">
            {/* Thêm skeleton loading cho sale và isNew */}
            {isLoading ? (
              <Skeleton width={50} />
            ) : (
              <>
                {sale !== null && <span className="sale">-{sale}%</span>}
                {isNew && <span className="new" style={{ marginLeft: 5 }}>NEW</span>}
              </>
            )}
          </div>
        </div>
        <div className="product-body">
          <p className="product-category">{isLoading ? <Skeleton width={80} /> : category}</p>
          <h3 className="product-name">
            {isLoading ? <Skeleton width={150} /> : <a href="#">{name}</a>}
          </h3>
          <h4 className="product-price">
            {isLoading ? (
              <Skeleton width={100} />
            ) : (
              <>
                ${price.toFixed(2)} <del className="product-old-price">${price.toFixed(2)}</del>
              </>
            )}
          </h4>
          <div className="product-rating">
            {isLoading ? <Skeleton width={100} /> : renderRating()}
          </div>
          <div className="product-btns">
            {isLoading ? (
              <Skeleton width={150} height={30} />
            ) : (
              <>
                <button className="add-to-wishlist">
                  <i className="fa fa-heart-o"></i>
                  <span className="tooltipp">add to wishlist</span>
                </button>
                <button className="add-to-compare">
                  <i className="fa fa-exchange"></i>
                  <span className="tooltipp">add to compare</span>
                </button>
                <button className="quick-view">
                  <i className="fa fa-eye"></i>
                  <span className="tooltipp">quick view</span>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="add-to-cart">
          {isLoading ? (
            <Skeleton width={150} height={40} />
          ) : (
            <button className="add-to-cart-btn">
              <i className="fa fa-shopping-cart"></i> add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;