import React, { useState, useEffect } from "react";

const PriceRangeSlider = ({ onPriceChange , onPageChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [error, setError] = useState("");
  const priceGap = 10000;

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
  };

  const validatePrices = (min, max) => {
    if (min > max) {
      setError("Giá tối thiểu không được lớn hơn giá tối đa!");
      return false;
    }
    setError("");
    return true;
  };

  const handleMinInputChange = (e) => {
    const value = parseInt(e.target.value.replace(/,/g, ''), 10);
    if (value >= 0) {
      setMinPrice(value);
      validatePrices(value, maxPrice);
      onPageChange(0);
    }
  };

  const handleMaxInputChange = (e) => {
    const value = parseInt(e.target.value.replace(/,/g, ''), 10);
    if (value <= 2000000) {
      setMaxPrice(value);
      validatePrices(minPrice, value);
      onPageChange(0);
    }
  };

  const handleRangeInputChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (type === "min") {
      if (value >= 0 && value <= maxPrice) {
        setMinPrice(value);
        validatePrices(value, maxPrice);
        onPageChange(0);
      }
    } else if (type === "max") {
      if (value <= 2000000 && value >= minPrice) {
        setMaxPrice(value);
        validatePrices(minPrice, value);
        onPageChange(0);
      }
    }
  };

  const handleQtyUp = (type) => {
    if (type === "min" && minPrice + priceGap <= maxPrice) {
      setMinPrice((prev) => {
        const newMin = prev + priceGap;
        validatePrices(newMin, maxPrice);
        return newMin;
      });
    } else if (type === "max" && maxPrice + priceGap <= 2000000) {
      setMaxPrice((prev) => {
        const newMax = prev + priceGap;
        validatePrices(minPrice, newMax);
        return newMax;
      });
    }
  };

  const handleQtyDown = (type) => {
    if (type === "min" && minPrice - priceGap >= 0) {
      setMinPrice((prev) => {
        const newMin = prev - priceGap;
        validatePrices(newMin, maxPrice);
        return newMin;
      });
    } else if (type === "max" && maxPrice - priceGap >= minPrice) {
      setMaxPrice((prev) => {
        const newMax = prev - priceGap;
        validatePrices(minPrice, newMax);
        return newMax;
      });
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      // Chỉ gửi giá trị khi không có lỗi
      if (!error) {
        onPriceChange({ minPrice, maxPrice });
      }
    }, 1000);
    return () => clearTimeout(debounce);
  }, [minPrice, maxPrice, onPriceChange, error]);

  useEffect(() => {
    // Kiểm tra và xử lý khi minPrice > maxPrice
    if (minPrice > maxPrice) {
      setError("Giá tối thiểu không được lớn hơn giá tối đa!"); // Hiển thị lỗi
    }
  }, [minPrice, maxPrice]);

  return (
    <div className="aside">
      <h3 className="aside-title">Giá</h3>
      <div className="slider">
        <div
          className="progress"
          style={{
            left: minPrice > maxPrice ? "0%" : `${(minPrice / 2000000) * 100}%`,
            right: minPrice > maxPrice ? "0%" : `${100 - (maxPrice / 2000000) * 100}%`,
          }}
        ></div>
      </div>
      <div className="range-input">
        <input
          type="range"
          className="range-min"
          min="0"
          max="2000000"
          value={minPrice > maxPrice ? 0 : minPrice} // Giá trị cho đầu nút min
          step="10000"
          onChange={(e) => handleRangeInputChange(e, "min")}
        />
        <input
          type="range"
          className="range-max"
          min="0"
          max="2000000"
          value={minPrice > maxPrice ? 2000000 : maxPrice} // Giá trị cho đầu nút max
          step="10000"
          onChange={(e) => handleRangeInputChange(e, "max")}
        />
      </div>
      <div className="price-input">
        <div className="field input-number">
          <input
            type="text"
            className={`input-min ${error ? "error" : ""}`}
            value={formatPrice(minPrice)}
            onChange={handleMinInputChange}
            min="0"
            max="2000000"
          />
        </div>
        
        <div className="field input-number">
          <input
            type="text"
            className={`input-max ${error ? "error" : ""}`}
            value={formatPrice(maxPrice)}
            onChange={handleMaxInputChange}
            min="0"
            max="2000000"
          />
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PriceRangeSlider;
