import React, { useState } from "react";
 

const PriceRangeSlider = () => {
  const [minPrice, setMinPrice] = useState(0); 
  const [maxPrice, setMaxPrice] = useState(2000000); 
  const priceGap = 10000; 

  const handleMinInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (maxPrice - value >= priceGap) {
      setMinPrice(value);
    }
  };

  const handleMaxInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value - minPrice >= priceGap) {
      setMaxPrice(value);
    }
  };

  const handleRangeInputChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (type === "min" && maxPrice - value >= priceGap) {
      setMinPrice(value);
    } else if (type === "max" && value - minPrice >= priceGap) {
      setMaxPrice(value);
    }
  };

  const handleQtyUp = (type) => {
    if (type === "min" && maxPrice - (minPrice + 10000) >= priceGap) {
      setMinPrice((prev) => prev + 10000); 
    } else if (type === "max" && (maxPrice + 10000) - minPrice >= priceGap) {
      setMaxPrice((prev) => prev + 10000);
    }
  };

  const handleQtyDown = (type) => {
    if (type === "min" && maxPrice - (minPrice - 10000) >= priceGap && minPrice > 0) {
      setMinPrice((prev) => prev - 10000);
    } else if (type === "max" && maxPrice - 10000 >= minPrice) {
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
