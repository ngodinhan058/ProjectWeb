import React, { useState, useEffect } from "react";

const PriceRangeSlider = ({ onPriceChange }) => {
  const [minPrice, setMinPrice] = useState(0); // Giá trị tối thiểu
  const [maxPrice, setMaxPrice] = useState(2000000); // Giá trị tối đa
  const priceGap = 10000; // Khoảng cách tối thiểu giữa min và max

  useEffect(() => {
    const debounce = setTimeout(() => {
      onPriceChange({ minPrice, maxPrice });
    }, 1000); // Delay filtering by 1 second

    return () => clearTimeout(debounce);
  }, [minPrice, maxPrice, onPriceChange]);

  const handleMinInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 2000000 && maxPrice - value >= priceGap) {
      setMinPrice(value);
    }
  };

  const handleMaxInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 2000000 && value - minPrice >= priceGap) {
      setMaxPrice(value);
    }
  };

  const handleRangeInputChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 2000000) {
      if (type === "min" && maxPrice - value >= priceGap) {
        setMinPrice(value);
      } else if (type === "max" && value - minPrice >= priceGap) {
        setMaxPrice(value);
      }
    }
  };

  const handleQtyUp = (type) => {
    if (type === "min" && maxPrice - (minPrice + 10000) >= priceGap && minPrice + 10000 <= 2000000) {
      setMinPrice((prev) => prev + 10000); 
    } else if (type === "max" && (maxPrice + 10000) - minPrice >= priceGap && maxPrice + 10000 <= 2000000) {
      setMaxPrice((prev) => prev + 10000);
    }
  };

  const handleQtyDown = (type) => {
    if (type === "min" && maxPrice - (minPrice - 10000) >= priceGap && minPrice - 10000 >= 0) {
      setMinPrice((prev) => prev - 10000);
    } else if (type === "max" && maxPrice - 10000 >= minPrice && maxPrice - 10000 >= 0) {
      setMaxPrice((prev) => prev - 10000);
    }
  };  

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
        />
        <input
          type="range"
          className="range-max"
          min="0"
          max="2000000"
          value={maxPrice}
          step="10000"
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
            min="0"
            max="2000000"
            step="10000"
          />
          <span className="qty-up" onClick={() => handleQtyUp("min")}>+</span>
          <span className="qty-down" onClick={() => handleQtyDown("min")}>-</span>
        </div>
        <div className="separator">-</div>
        <div className="field input-number price-min">
          <input
            type="number"
            className="input-max"
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
    </div>
  );
};

export default PriceRangeSlider;
