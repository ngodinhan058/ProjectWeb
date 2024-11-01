import React, { useState, useEffect } from "react";

const PriceRangeSlider = ({ onPriceChange, onPageChange }) => {
  const DEFAULT_MIN_PRICE = 0;
  const DEFAULT_MAX_PRICE = 2000000;

  const [minPrice, setMinPrice] = useState(DEFAULT_MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
  const [tempMinPrice, setTempMinPrice] = useState(DEFAULT_MIN_PRICE);
  const [tempMaxPrice, setTempMaxPrice] = useState(DEFAULT_MAX_PRICE);
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
    const value = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
    setTempMinPrice(value);
  };

  const handleMaxInputChange = (e) => {
    const value = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
    setTempMaxPrice(value);
  };

  const handleMinBlur = () => {
    if (validatePrices(tempMinPrice, maxPrice)) {
      setMinPrice(tempMinPrice);
      onPriceChange({ minPrice: tempMinPrice, maxPrice });
      onPageChange(0);
    } else {
      setTempMinPrice(minPrice);
    }
  };

  const handleMaxBlur = () => {
    if (validatePrices(minPrice, tempMaxPrice)) {
      setMaxPrice(tempMaxPrice);
      onPriceChange({ minPrice, maxPrice: tempMaxPrice });
      onPageChange(0);
    } else {
      setTempMaxPrice(maxPrice);
    }
  };

  const handleRangeInputChange = (e, type) => {
    const value = parseInt(e.target.value, 10);
    if (type === "min") {
      if (value >= 0 && value <= maxPrice) {
        setMinPrice(value);
        validatePrices(value, maxPrice);
        onPageChange(0);
      }
    } else if (type === "max") {
      if (value <= DEFAULT_MAX_PRICE && value >= minPrice) {
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
    } else if (type === "max" && maxPrice + priceGap <= DEFAULT_MAX_PRICE) {
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
      if (!error) {
        onPriceChange({ minPrice, maxPrice });
      }
    }, 1000);
    return () => clearTimeout(debounce);
  }, [minPrice, maxPrice, onPriceChange, error]);

  useEffect(() => {
    if (minPrice > maxPrice) {
      setError("Giá tối thiểu không được lớn hơn giá tối đa!");
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (minPrice >= DEFAULT_MAX_PRICE || maxPrice <= 0) {
      const resetTimeout = setTimeout(() => {
        setMinPrice(DEFAULT_MIN_PRICE);
        setMaxPrice(DEFAULT_MAX_PRICE);
        setTempMinPrice(DEFAULT_MIN_PRICE);
        setTempMaxPrice(DEFAULT_MAX_PRICE);
        setError("");
      }, 2000);
      return () => clearTimeout(resetTimeout);
    }
  }, [minPrice, maxPrice]);

  return (
    <div className="aside">
      <h3 className="aside-title">Giá</h3>
      <div className="slider">
        <div
          className="progress"
          style={{
            left: minPrice > maxPrice ? "0%" : `${(minPrice / DEFAULT_MAX_PRICE) * 100}%`,
            right: minPrice > maxPrice ? "0%" : `${100 - (maxPrice / DEFAULT_MAX_PRICE) * 100}%`,
          }}
        ></div>
      </div>
      <div className="range-input">
        <input
          type="range"
          className="range-min"
          min="0"
          max={DEFAULT_MAX_PRICE}
          value={minPrice > maxPrice ? 0 : minPrice}
          step="10000"
          onChange={(e) => handleRangeInputChange(e, "min")}
        />
        <input
          type="range"
          className="range-max"
          min="0"
          max={DEFAULT_MAX_PRICE}
          value={minPrice > maxPrice ? DEFAULT_MAX_PRICE : maxPrice}
          step="10000"
          onChange={(e) => handleRangeInputChange(e, "max")}
        />
      </div>
      <div className="price-input">
        <div className="field input-number">
          <input
            type="text"
            className={`input-min ${error ? "error" : ""}`}
            value={tempMinPrice === minPrice ? formatPrice(minPrice) : tempMinPrice}
            onChange={handleMinInputChange}
            onBlur={handleMinBlur}
            min="0"
            max={DEFAULT_MAX_PRICE}
          />
        </div>
        <div className="field input-number">
          <input
            type="text"
            className={`input-max ${error ? "error" : ""}`}
            value={tempMaxPrice === maxPrice ? formatPrice(maxPrice) : tempMaxPrice}
            onChange={handleMaxInputChange}
            onBlur={handleMaxBlur}
            min="0"
            max={DEFAULT_MAX_PRICE}
          />
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PriceRangeSlider;
