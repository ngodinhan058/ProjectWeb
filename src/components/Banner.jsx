import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Link } from 'react-router-dom';

const BannerCarousel = ({ banners, loading }) => {
  if (loading) {
    return (
      <div className="skeleton-container">
        <div className="skeleton shimmer"></div>
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return <div>No banners available</div>;
  }

  return (
    <div className="carousel">
      <Slide
        autoplay={true}
        duration={10000}
        pauseOnHover={true}
        infinite={true}
        indicators={(index) => <div className="custom-indicator"></div>}
        arrows={false}
      >
        {banners.map((banner, index) => (
          <div
            className="each-slide"
            key={banner.id}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "auto",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Link to={`/product-list/${banner.imageUrl}`}>
              <img
                src={banner.imagePath}
                alt={`Banner ${index + 1}`}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            </Link>
          </div>
        ))}
      </Slide>
    </div>
  );
};
export default BannerCarousel;
