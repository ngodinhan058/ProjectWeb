import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { BASE_URL } from './api/config';
import { axiosInstance } from './api/axiosConfig';
import { useParams } from 'react-router-dom';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

const SizeFilter = ({ isLoading, selectedSizes, onSelectSizes }) => {
  const [sizes, setSizes] = useState([]); // Lưu dữ liệu danh mục từ API

  const { categoryIdFromLink } = useParams(); // Lấy categoryId từ URL

  useEffect(() => {
    //**
    //@GetMapping(value = {"/product-suppliers/category/{categoryId}", "/product-sizes/category/{categoryId}/"})
    let apiUrl = '';
    if (categoryIdFromLink === undefined) {
      apiUrl = `${BASE_URL}product-sizes/category`;
    } else {
      apiUrl = `${BASE_URL}product-sizes/category/${categoryIdFromLink}?`;
    }

    axiosInstance
      .get(apiUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      })
      .then((response) => {
        setSizes(response.data.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
        } else {
          console.error('Error fetching data:', error);
        }
      });
  }, [categoryIdFromLink]);

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
        style={{ maxHeight: 160, overflowY: 'scroll' }}
      >
        {sizes.map((size) =>
          isLoading ? (
            <Skeleton height={28} />
          ) : (
            <div
              className="input-checkbox"
              key={size['productSizeId']}
              style={{ marginTop: '6px' }}
            >
              <input
                type="checkbox"
                id={size['productSizeId']}
                checked={selectedSizes.includes(size['productSizeId'])}
                onChange={() => handleCheckboxChange(size['productSizeId'])}
              />
              <label htmlFor={size['productSizeId']}>
                <span></span>

                <small style={{ fontSize: 16 }}>
                  {size['productSizeName']}
                </small>
              </label>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SizeFilter;
