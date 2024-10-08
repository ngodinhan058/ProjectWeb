import React, { useState } from 'react';

const BrandFilter = () => {
  const [selectedBrands, setSelectedBrands] = useState({});

  const brands = [
    { id: 'brand-1', name: 'SAMSUNG', count: 578 },
    { id: 'brand-2', name: 'LG', count: 125 },
    { id: 'brand-3', name: 'SONY', count: 755 },
    { id: 'brand-4', name: 'SAMSUNG', count: 578 },
    { id: 'brand-5', name: 'LG', count: 125 },
    { id: 'brand-6', name: 'SONY', count: 755 },
  ];

  const handleCheckboxChange = (id) => {
    setSelectedBrands((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="aside">
      <h3 className="aside-title">Brand</h3>
      <div className="checkbox-filter">
        {brands.map((brand) => (
          <div className="input-checkbox" key={brand.id}>
            <input
              type="checkbox"
              id={brand.id}
              checked={selectedBrands[brand.id] || false}
              onChange={() => handleCheckboxChange(brand.id)}
            />
            <label htmlFor={brand.id}>
              <span></span>
              {brand.name}
              <small>({brand.count})</small>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
