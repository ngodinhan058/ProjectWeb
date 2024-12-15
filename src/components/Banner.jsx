import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerCarousel = ({ banners, loading }) => {
  // Cấu hình cho react-slick
  const settings = {
    dots: true, // Hiển thị các chấm indicator
    infinite: true, // Vòng lặp carousel
    speed: 500, // Thời gian chuyển đổi
    slidesToShow: 1, // Số slide hiển thị
    slidesToScroll: 1, // Số slide scroll mỗi lần
    autoplay: true, // Tự động chuyển
    autoplaySpeed: 10000, // Thời gian mỗi slide (10 giây)
    pauseOnHover: true, // Dừng khi hover
    arrows: false, // Ẩn nút mũi tên
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
                style={{ maxWidth: "100%", height: 390, objectFit: "contain" }}
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
          >
            <Link to={`/product-list/${banner.imageUrl}`}>
              <img
                src={banner.imagePath}
                alt={`Banner ${index + 1}`}
                style={{
                  maxWidth: "100%",
                  height: 390,
                  objectFit: "contain",
                }}
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
