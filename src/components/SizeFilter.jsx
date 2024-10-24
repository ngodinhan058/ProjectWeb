import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { BASE_URL } from './api/config';

const SizeFilter = ({ isLoading, selectedSizes, onSelectSizes }) => {
  const [sizes, setSizes] = useState([]); // Lưu dữ liệu danh mục từ API
  // const sizes = [
  //   { id: 'size-1', name: 'S', count: 578 },
  //   { id: 'size-2', name: 'M', count: 125 },
  //   { id: 'size-3', name: 'L', count: 755 },
  //   { id: 'size-4', name: 'XL', count: 578 },
  //   { id: 'size-5', name: 'XXL', count: 125 },
  //   { id: 'size-6', name: 'XXXL', count: 755 },
  // ];
  // Fetch dữ liệu từ API khi component được mount
  // useEffect(() => {
  //   let apiUrl = `${BASE_URL}/size`;
  //   axios.get(apiUrl)
  //     .then(response => {
  //       setSizes(response.data.data || []); // Lưu dữ liệu từ API vào state
        
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
        
  //     });
  // }, []); // [] đảm bảo chỉ gọi API khi component mount lần đầu
  // console.log(sizes)

  const handleCheckboxChange = (id) => {
    onSelectSizes((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="aside">
      <h3 className="aside-title">Size</h3>
      <div
        className="checkbox-filter"
        style={{ maxHeight: 140, overflowY: 'scroll' }}
      >
        {/* {sizes.map((size) =>
          isLoading ? (
            <Skeleton height={20} />
          ) : (
            <div className="input-checkbox" key={size['product-size-id']}>
              <input
                type="checkbox"
                id={size['product-size-id']}
                checked={selectedSizes.includes(size['product-size-id'])}
                onChange={() => handleCheckboxChange(size['product-size-id'])}
              />
              <label htmlFor={size['product-size-id']}>
                <span></span>
                {size['product-size-name']}
                <small>({size.count})</small>
              </label>
            </div>
          )
        )} */}
      </div>
    </div>
  );
};

export default SizeFilter;
