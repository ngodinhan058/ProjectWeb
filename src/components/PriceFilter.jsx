import React, { useState, useEffect, useRef  } from "react";

const PriceRangeSlider = ({ onPriceChange, onPageChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [error, setError] = useState("");
  const resetPageRef = useRef(false); // Track if page reset is needed

  const formatPrice = (price) => price.toLocaleString("vi-VN");

  const validatePrices = (min, max) => {
    if (min > max) {
      setError("Giá tối thiểu không được lớn hơn giá tối đa!");
      return false;
    }
    setError("");
    return true;
  };

  const handleMinInputChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 9) value = value.slice(0, 9);
    value = parseInt(value, 10) || 0;

    setMinPrice(value);
    validatePrices(value, maxPrice);
    resetPageRef.current = true;
  };

  const handleMaxInputChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 9) value = value.slice(0, 9);
    value = parseInt(value, 10) || 0;

    setMaxPrice(value);
    validatePrices(minPrice, value);
    resetPageRef.current = true;
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
    resetPageRef.current = true;
  };

  useEffect(() => {
    // Set a debounce timer of 1 second
    const debounce = setTimeout(() => {
      if (!error) {
        onPriceChange({ minPrice, maxPrice });
        if (resetPageRef.current) {
          onPageChange(0);
          resetPageRef.current = false;
        }
      }
    }, 1000);

    return () => clearTimeout(debounce); // Clear timeout if values change before 1000ms
  }, [minPrice, maxPrice, onPriceChange, onPageChange, error]);



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
        <div style={{ position: "absolute", fontSize: 16, top: 10 }}>
          {formatPrice(minPrice)} ₫
        </div>
        <input
          type="range"
          className="range-max"
          min="0"
          max={2000000}
          value={maxPrice}
          step="10000"
          onChange={(e) => handleRangeInputChange(e, "max")}
        />
        <div style={{ position: "absolute", right: 0, fontSize: 16, top: 10 }}>
          {formatPrice(maxPrice)} ₫
        </div>
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
