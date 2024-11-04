import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useParams } from 'react-router-dom';
import { BASE_URL } from './api/config';
import { axiosInstance } from './api/axiosConfig';

const BrandFilter = ({ isLoading, selectedBrands, onSelectBrands }) => {
  // const brands = [
  //   { id: 'brand-1', name: 'Adidas', count: 578 },
  //   { id: 'brand-2', name: 'Coros', count: 125 },
  //   { id: 'brand-3', name: 'Black Diamon', count: 755 },
  //   { id: 'brand-4', name: 'KOO', count: 578 },
  // ];

  const { categoryIdFromLink } = useParams(); // Lấy categoryId từ URL
  const [brands, setBrands] = useState([]);

  const handleCheckboxChange = (id) => {
    onSelectBrands((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    //**
    //@GetMapping(value = {"/product-suppliers/category/{categoryId}", "/product-sizes/category/{categoryId}/"})

    let apiUrl = '';
    if (categoryIdFromLink === undefined) {
      apiUrl = `${BASE_URL}product-suppliers/category`;
    } else {
      apiUrl = `${BASE_URL}product-suppliers/category/${categoryIdFromLink}?`;
    }

    axiosInstance
      .get(apiUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      })
      .then((response) => {
        setBrands(response.data.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
        } else {
          console.error('Error fetching data:', error);
        }
      });
  }, [categoryIdFromLink]);

  return (
    <div className="aside">
      <h3 className="aside-title">Brand</h3>
      <div
        className="checkbox-filter"
        style={{ maxHeight: 160, overflowY: 'scroll' }}
      >
        {brands.map((brand) =>
          isLoading ? (
            // Add key to Skeleton component
            <Skeleton
              key={brand.id}
              height={28}
              // style={{ marginTop: '10px' }}
            />
          ) : (
            // Add key to parent div of each brand item
            <div
              className="input-checkbox"
              key={brand['productSupplierSd']}
              style={{ marginTop: '6px' }}
            >
              <input
                type="checkbox"
                id={brand['productSupplierSd']}
                checked={selectedBrands.includes(brand['productSupplierSd'])}
                onChange={() =>
                  handleCheckboxChange(brand['productSupplierSd'])
                }
              />
              <label htmlFor={brand['productSupplierSd']}>
                <span></span>
                <small style={{ fontSize: 16 }}>
                  {brand['productSupplierName']}
                </small>
              </label>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BrandFilter;
