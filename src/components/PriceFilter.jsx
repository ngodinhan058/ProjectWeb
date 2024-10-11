import React, { useState , useEffect } from "react";

const PriceRangeSlider = () => {
  const [minPrice, setMinPrice] = useState(5); 
  const [maxPrice, setMaxPrice] = useState(1000); 
  const priceGap = 10; 

  const handleMinInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 5 && value <= 1000 && maxPrice - value >= priceGap) {
      setMinPrice(value);
    }
  };

  const handleMaxInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 5 && value <= 1000 && value - minPrice >= priceGap) {
      setMaxPrice(value);
    }
  };

  const handleRangeInputChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (value >= 5 && value <= 1000) {
      if (type === "min" && maxPrice - value >= priceGap) {
        setMinPrice(value);
      } else if (type === "max" && value - minPrice >= priceGap) {
        setMaxPrice(value);
      }
    }
  };

  const handleQtyUp = (type) => {
    if (type === "min" && maxPrice - (minPrice + 10) >= priceGap && minPrice + 10 <= 1000) {
      setMinPrice((prev) => prev + 10); 
    } else if (type === "max" && (maxPrice + 10) - minPrice >= priceGap && maxPrice + 10 <= 1000) {
      setMaxPrice((prev) => prev + 10);
    }
  };

  const handleQtyDown = (type) => {
    if (type === "min" && maxPrice - (minPrice - 10) >= priceGap && minPrice - 10 >= 5) {
      setMinPrice((prev) => prev - 10);
    } else if (type === "max" && maxPrice - 10 >= minPrice && maxPrice - 10 >= 5) {
      setMaxPrice((prev) => prev - 10);
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
          step="10" 
          onChange={(e) => handleRangeInputChange(e, "min")}
        />
        <input
          type="range"
          className="range-max"
          min="5"
          max="1000"
          value={maxPrice}
          step="10"
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
            step="10"
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
            min="5"
            max="1000"
            step="10"
          />
          <span className="qty-up" onClick={() => handleQtyUp("max")}>+</span>
          <span className="qty-down" onClick={() => handleQtyDown("max")}>-</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
