import React, { useState, useEffect } from "react";

const PriceRangeSlider = ({ onPriceChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [error, setError] = useState("");
  const priceGap = 10000;

  const validatePrices = (min, max) => {
    if (min > max) {
      setError("Giá tối thiểu không được lớn hơn giá tối đa!");
      return false; // Giá không hợp lệ
    }
    setError(""); // Xóa thông báo lỗi
    return true; // Giá hợp lệ
  };

  const handleMinInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= maxPrice) { // Kiểm tra trong khoảng hợp lệ
      setMinPrice(value); // Cập nhật giá min
      validatePrices(value, maxPrice); // Kiểm tra giá
    }
  };

  const handleMaxInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= minPrice && value <= 2000000) { // Kiểm tra trong khoảng hợp lệ
      setMaxPrice(value); // Cập nhật giá max
      validatePrices(minPrice, value); // Kiểm tra giá
    }
  };

  const handleRangeInputChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (type === "min" && value >= 0 && value <= maxPrice && validatePrices(value, maxPrice)) {
      setMinPrice(value); // Cập nhật giá min nếu hợp lệ
    } else if (type === "max" && value >= minPrice && value <= 2000000 && validatePrices(minPrice, value)) {
      setMaxPrice(value); // Cập nhật giá max nếu hợp lệ
    }
  };

  const handleQtyUp = (type) => {
    if (type === "min" && minPrice + priceGap <= maxPrice && minPrice + priceGap <= 2000000) {
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
      onPriceChange({ minPrice, maxPrice });
    }, 1000); // Delay filtering by 1 second
    return () => clearTimeout(debounce);
  }, [minPrice, maxPrice, onPriceChange]);

  return (
    <div className="aside">
      <h3 className="aside-title">Price</h3>
      <div className="slider">
        <div
          className="progress"
          style={{
            left: `${(minPrice / 2000000) * 100}%`,
            right: `${100 - (maxPrice / 2000000) * 100}%`,
          }}
        ></div>
      </div>
      <div className="range-input">
        <input
          type="range"
          className="range-min"
          min="0"
          max="2000000"
          value={minPrice}
          step="10000"
          onChange={(e) => handleRangeInputChange(e, "min")}
          disabled={minPrice > maxPrice} // Vô hiệu hóa khi min > max
        />
        <input
          type="range"
          className="range-max"
          min="0"
          max="2000000"
          value={maxPrice}
          step="10000"
          onChange={(e) => handleRangeInputChange(e, "max")}
          disabled={maxPrice < minPrice} // Vô hiệu hóa khi max < min
        />
      </div>
      <div className="price-input">
        <div className="field input-number price-min">
          <input
            type="number"
            className={`input-min ${error ? "error" : ""}`}
            value={minPrice}
            onChange={handleMinInputChange}
            min="0"
            max="2000000"
            step="10000"
          />
          <span className="qty-up" onClick={() => handleQtyUp("min")}>+</span>
          <span className="qty-down" onClick={() => handleQtyDown("min")}>-</span>
        </div>
        <div className="separator">-</div>
        <div className="field input-number price-max">
          <input
            type="number"
            className={`input-max ${error ? "error" : ""}`}
            value={maxPrice}
            onChange={handleMaxInputChange}
            min="0"
            max="2000000"
            step="10000"
          />
          <span className="qty-up" onClick={() => handleQtyUp("max")}>+</span>
          <span className="qty-down" onClick={() => handleQtyDown("max")}>-</span>
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PriceRangeSlider;
