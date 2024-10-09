import React, { useState } from 'react';

const BrandFilter = ({ onBrandChange }) => {
  const [selectedBrands, setSelectedBrands] = useState({});

  const brands = [
    { id: 'brand-1', name: 'SAMSUNG', count: 578 },
    { id: 'brand-2', name: 'LG', count: 125 },
    { id: 'brand-3', name: 'SONY', count: 755 },
    { id: 'brand-4', name: 'Category', count: 755 },
  ];

  const handleCheckboxChange = (id) => {
    setSelectedBrands((prev) => {
      const newSelectedBrands = {
        ...prev,
        [id]: !prev[id],
      };

      // Tạo mảng các thương hiệu đã chọn
      const selectedBrandList = Object.keys(newSelectedBrands)
        .filter(brandId => newSelectedBrands[brandId])
        .map(brandId => brands.find(brand => brand.id === brandId).name);

      // Gọi onBrandChange với danh sách thương hiệu đã chọn
      onBrandChange(selectedBrandList);
      return newSelectedBrands;
    });
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
