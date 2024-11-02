import React, { useState, useEffect } from "react";

const PriceRangeSlider = ({ onPriceChange, onPageChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [error, setError] = useState("");

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN');
  };

  const validatePrices = (min, max) => {
    if (min < 0 || max < 0) {
      setError("Giá không thể là số âm.");
      return false;
    }
    if (min > max) {
      setError("Giá tối thiểu không được lớn hơn giá tối đa!");
      return false;
    }
    if (min > 2000000 || max > 2000000) {
      setError("Giá không được vượt quá 2,000,000 ₫.");
      return false;
    }
    setError("");
    return true;
  };

  const handleMinInputChange = (e) => {
    const value = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0;
    if (validatePrices(value, maxPrice)) {
      setMinPrice(value);
      onPriceChange({ minPrice: value, maxPrice });
      onPageChange(0);
    }
  };

  const handleMaxInputChange = (e) => {
    const value = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0;
    if (validatePrices(minPrice, value)) {
      setMaxPrice(value);
      onPriceChange({ minPrice, maxPrice: value });
      onPageChange(0);
    }
  };

  const handleRangeInputChange = (e, type) => {
    const value = parseInt(e.target.value, 10);
    if (type === "min" && value >= 0 && value <= maxPrice && value <= 2000000) {
      setMinPrice(value);
      validatePrices(value, maxPrice);
    } else if (type === "max" && value >= minPrice && value <= 2000000) {
      setMaxPrice(value);
      validatePrices(minPrice, value);
    }
    setTimeout(() => {
      onPageChange(0);
    }, 1000);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!error) {
        if (minPrice >= 2000000 || maxPrice <= 0) {
            setMinPrice(0);
            setMaxPrice(2000000);
            setError("");
        }
       else {
        onPriceChange({ minPrice, maxPrice });
       }
      }
    }, 1000);
    return () => clearTimeout(debounce);
  }, [minPrice, maxPrice, onPriceChange, error]);

  

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
          max={2000000}
          value={minPrice}
          step="10000"
          onChange={(e) => handleRangeInputChange(e, "min")}
        />
        <div style={{position: 'absolute', fontSize: 16, top: 10}}>{formatPrice(minPrice)}{' ₫'}</div>
        <input
          type="range"
          className="range-max"
          min="0"
          max={2000000}
          value={maxPrice}
          step="10000"
          onChange={(e) => handleRangeInputChange(e, "max")}
        />
        <div style={{ position: 'absolute', right:0, fontSize: 16,top: 10 }}>{formatPrice(maxPrice)}{' ₫'}</div>
      </div>
      <div className="price-input">
        <div className="field input-number">
          <input
            type="text"
            className={`input-min ${error ? "error" : ""}`}
            value={formatPrice(minPrice)}
            onChange={handleMinInputChange}
            min="0"
            max={2000000}
          />  
        </div>
        <div className="field input-number">
          <input
            type="text"
            className={`input-max ${error ? "error" : ""}`}
            value={formatPrice(maxPrice)}
            onChange={handleMaxInputChange}
            min="0"
            max={2000000}
          />
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PriceRangeSlider;
