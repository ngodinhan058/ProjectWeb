import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Product = ({ id, images, name, categories, price, oldPrice, rating, sale, isNew, isLoading }) => {
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

  const image = [images]




  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/chi-tiet/${id}`, {
      state: { id, images, name, categories, price, oldPrice, rating, sale, isNew },
      
    });
    window.scrollTo(0, 0);
  };
  return (

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
          src={
            isHovered
              ? `../${image[0]?.[1]?.['productImagePath'] || image[0]?.[0]?.['productImagePath'] || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/langvi-300px-No_image_available.svg.png'}`
              : `../${image[0]?.[0]?.['productImagePath'] || image[0]?.[1]?.['productImagePath'] || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/langvi-300px-No_image_available.svg.png'}`
          }
            alt={image[0]?.[0]?.['productImageAlt'] || 'Default Alt Text'} // Giá trị alt, nếu không có thì dùng văn bản mặc định
          />
        )}

        <div className="product-label">
          {/* Thêm skeleton loading cho sale và isNew */}
          {isLoading ? (
            <></>
          ) : (
            <>
              {sale !== 0 && <span className="sale">-{sale}%</span>}
              {isNew && <span className="new" style={{ marginLeft: 5 }}>NEW</span>}
            </>
          )}
        </div>
      </div>
      <div className="product-body">
        {/* <p className="product-category">{isLoading ? <Skeleton width={80} /> : categories}</p> */}
        <h3 className="product-name">
          {isLoading ? <Skeleton width={150} /> : <a href="#">{name}</a>}
        </h3>
        <h4 className="product-price">
          {isLoading ? (
            <Skeleton width={100} />
          ) : (
            <>
              <div>
                {price}
              </div>
              {sale !== 0 ? (
                <del className="product-old-price">
                  {oldPrice}
                </del>
              ) : (
                <del className="product-old-price" style={{ color: '#fff' }}>
                  {price}
                </del>
              )}

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

      {isLoading ? (
        <></>
      ) : (
        <div className="add-to-cart">
          <button className="add-to-cart-btn">
            <i className="fa fa-shopping-cart"></i> add to cart
          </button>
        </div>
      )}
    </div>

  );
};

export default Product;