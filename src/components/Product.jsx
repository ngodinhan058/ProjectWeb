import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

const Product = ({  id, img1, img2, name, category, price, oldPrice, rating, sale, isNew }) => {
 
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
  // State để quản lý ảnh hiện tại (hover hoặc không hover)
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/${id}`, {
      state: { id, img1, img2, name, category, price, oldPrice, rating, sale, isNew },
    });
  };
  return (
    <div className="col-md-3 col-xs-6">
      <div key={id} className="product"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        
          <div className="product-img">
            {/* Hiển thị ảnh 1 bình thường, ảnh 2 khi hover */}
            <img src={isHovered ? img2 : img1} alt={name} />
            <div className="product-label">
              {sale !== null && <span className="sale">-{sale}%</span>}
              {isNew && <span className="new" style={{ marginLeft: 5, }}>NEW</span>}
            </div>
          </div>
          <div className="product-body">
            <p className="product-category">{category}</p>
            <h3 className="product-name">
              <a href="#">{name}</a>
            </h3>
            <h4 className="product-price">
              ${price.toFixed(2)} <del className="product-old-price">${oldPrice.toFixed(2)}</del>
            </h4>
            <div className="product-rating">{renderRating()}</div>
            <div className="product-btns">
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
            </div>
          </div>
          <div className="add-to-cart">
            <button className="add-to-cart-btn">
              <i className="fa fa-shopping-cart"></i> add to cart
            </button>
          </div>
        
      </div>
    </div>
  );
};

export default Product;
