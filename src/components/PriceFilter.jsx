import React, { useState } from "react";

const PriceRangeSlider = ({ onPriceChange }) => {
  const [minPrice, setMinPrice] = useState(5); // Change initial min price to 5
  const [maxPrice, setMaxPrice] = useState(1000); // Change initial max price to 1000
  const [error, setError] = useState("");
  const priceGap = 5; // Adjusted price gap to match new min/max

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 2000);
  };

  const handleMinInputChange = (e) => {
    let value = parseInt(e.target.value) || 5;
    if (value < 5) {
      showError("Min price cannot be less than 5!");
      value = 5;
    } else if (value > maxPrice - priceGap) {
      showError("Min price is too close to Max price!");
    } else {
      setMinPrice(value);
    }
    setMinPrice(value);
    onPriceChange(value, maxPrice); // Gọi hàm callback để cập nhật giá
  };

  const handleMaxInputChange = (e) => {
    let value = parseInt(e.target.value) || 1000;
    if (value > 1000) value = 1000;
    if (value < minPrice + priceGap) {
      showError("Max Price is too close to Min Price");
    } else {
      setMaxPrice(value);
    }
    setMaxPrice(value);
    onPriceChange(minPrice, value); // Gọi hàm callback để cập nhật giá
  };

  const handleRangeInputChange = (e, type) => {
    let value = parseInt(e.target.value) || (type === "min" ? 5 : 1000);
    if (type === "min") {
      setMinPrice(value);
      onPriceChange(value, maxPrice); // Cập nhật giá khi thay đổi min
    } else if (type === "max") {
      setMaxPrice(value);
      onPriceChange(minPrice, value); // Cập nhật giá khi thay đổi max
    }
  };

  const handleQtyUp = (type) => {
    if (type === "min" && minPrice + 5 <= maxPrice - priceGap) {
      setMinPrice((prev) => prev + 5);
    } else if (type === "max" && maxPrice + 5 <= 1000) {
      setMaxPrice((prev) => prev + 5);
    }
  };

  const handleQtyDown = (type) => {
    if (type === "min" && minPrice - 5 >= 5) {
      setMinPrice((prev) => prev - 5);
    } else if (type === "max" && maxPrice - 5 >= minPrice + priceGap) {
      setMaxPrice((prev) => prev - 5);
    }
  };

  return (
    <div className="aside">
      <h3 className="aside-title">Price</h3>
      <div className="slider">
        <div
          className="progress"
          style={{
            left: `${(minPrice / 1000) * 100}%`,
            right: `${100 - (maxPrice / 1000) * 100}%`,
          }}
        ></div>
      </div>
      <div className="range-input">
        <input
          type="range"
          className="range-min"
          min="5"
          max="1000"
          value={minPrice}
          step="5"
          onChange={(e) => handleRangeInputChange(e, "min")}
        />
        <input
          type="range"
          className="range-max"
          min="5"
          max="1000"
          value={maxPrice}
          step="5"
          onChange={(e) => handleRangeInputChange(e, "max")}
        />
      </div>
      <div className="price-input">
        <div className="field input-number price-min">
          <input
            type="number"
            className="input-min"
            value={minPrice}
            onChange={handleMinInputChange}
            min="5"
            max="1000"
            step="5"
          />
          <span className="qty-up" onClick={() => handleQtyUp("min")}>
            +
          </span>
          <span className="qty-down" onClick={() => handleQtyDown("min")}>
            -
          </span>
        </div>
        <div className="separator">-</div>
        <div className="field input-number price-max">
          <input
            type="number"
            className="input-max"
            value={maxPrice}
            onChange={handleMaxInputChange}
            min="5"
            max="1000"
            step="5"
          />
          <span className="qty-up" onClick={() => handleQtyUp("max")}>
            +
          </span>
          <span className="qty-down" onClick={() => handleQtyDown("max")}>
            -
          </span>
        </div>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default PriceRangeSlider;
