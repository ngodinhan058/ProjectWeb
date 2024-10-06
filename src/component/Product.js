import React from 'react';

const Product = ({ imgSrc, category, name, price, oldPrice, rating, isNew }) => {
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

  return (
    <div className="col-md-4 col-xs-6">
      <div className="product">
        <div className="product-img">
          <img src={imgSrc} alt={name} />
          <div className="product-label">
            {isNew && <span className="new">NEW</span>}
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
