import React, { useEffect, useState, useRef } from 'react';
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

const BannerCarousel = ({ banners, loading }) => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    arrows: false,
  };
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e) => {
    setDragging(false);
    setStartX(e.clientX); // Lưu vị trí bắt đầu
  };

  const handleMouseMove = (e) => {
    if (Math.abs(e.clientX - startX) > 5) {
      setDragging(true); // Nếu khoảng cách kéo lớn hơn 5px => coi như đang kéo
    }
  };

  const handleMouseUp = (supplierId) => {
    if (!dragging) {
      handleClick(supplierId); // Chỉ gọi handleClick nếu không kéo
    }
  };
  const handleClick = (url) => {
    navigate(`/product-list/${url}`); // Truyền dữ liệu qua state
  };

  if (loading) {
    return <Skeleton height={390} />;
  }

  // Nếu không có banner, hiển thị hình ảnh placeholder
  if (!banners || banners.length === 0) {
    const placeholderImages = new Array(3).fill(
      "https://placehold.co/1200x400"
    );
    return (
      <Slider {...settings}>
        {placeholderImages.map((url, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            <img
              src={url}
              alt={`Placeholder ${index + 1}`}
              style={{ maxWidth: "100%", height: 390, objectFit: "contain", }}
            />
          </div>
        ))}
      </Slider>
    );
  }

  return (
    <div className="carousel">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onClick={() => handleMouseUp(banner.imageUrl)}
          >
            <img
              src={banner.imagePath}
              alt={`Banner ${index + 1}`}
              style={{
                maxWidth: "100%",
                height: 390,
                objectFit: "contain",
                cursor: 'pointer'

              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
