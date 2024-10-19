import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import { BASE_URL } from './api/config';

const CategoryFilter = ({ onCategoryChange }) => {
  const [openCategoryId, setOpenCategoryId] = useState(null); // Theo dõi danh mục cha nào đang mở
  const [selectedSubcategories, setSelectedSubcategories] = useState([]); // Theo dõi nhiều danh mục con được chọn
  const [categories, setCategories] = useState([]); // Lưu dữ liệu danh mục từ API
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading

  // Fetch dữ liệu từ API khi component được mount
useEffect(() => {
  let apiUrl = `${BASE_URL}categories`;
  axios.get(apiUrl, {
      headers: {
          'ngrok-skip-browser-warning': 'true'
      }
  })
      .then(response => {
          const { data } = response.data;
          console.log("danh muc", data)
          setCategories(data);
          setIsLoading(false)
      })
      .catch(error => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
      });
}, []);

  useEffect(() => {
    onCategoryChange(selectedSubcategories);
  }, [selectedSubcategories]);

  // Hàm để mở/đóng danh mục cha
  const toggleCategory = (id) => {
    setOpenCategoryId((prevId) => (prevId === id ? null : id)); // Đóng nếu đã mở, mở nếu chưa mở
  };

  const handleCategorySelect = (categoryId) => {
    // Kiểm tra xem danh mục đã được chọn chưa
    if (selectedSubcategories.includes(categoryId)) {
      // Nếu đã được chọn, thì bỏ chọn
      setSelectedSubcategories((prevSelected) =>
        prevSelected.filter((id) => id !== categoryId)
      );
    } else {
      // Nếu chưa được chọn, thì chọn nó
      setSelectedSubcategories((prevSelected) => [...prevSelected, categoryId]);
    }
  };
  
  // Kiểm tra xem danh mục con có đang được chọn không
  const isSubcategorySelected = (subcategoryId) => {
    return selectedSubcategories.includes(subcategoryId);
  };
  
  return (
    <div className="aside">
      <h3 className="aside-title">Category</h3>
      <div className="checkbox-filter">
        {categories.length === 0 ? (
          <div>No categories available</div> // Hiển thị nếu không có danh mục nào
        ) : (
          categories.map((category) => (
            <div key={category['categoryId']} style={{ position: 'relative' }}>
              <div
                style={{ position: 'absolute', top: 10, right: '5%' }}
                onClick={() => {
                  toggleCategory(category['categoryId']);
                }}
              >
                <span style={{ cursor: 'pointer' }}>
                  {openCategoryId === category['categoryId'] ? ' ▲' : ' ▼'}
                </span>
              </div>
              <h4
                onClick={() => {
                  handleCategorySelect(category['categoryId']); // Gọi để lưu id của danh mục cha khi nhấn vào
                }}
              >
                {category['categoryName']}
              </h4>
              {/* Hiển thị danh mục con nếu danh mục cha đang mở */}
              {openCategoryId === category['categoryId'] && category.categoryChildren && category.categoryChildren.length > 0 ? (
                <div className="subcategory">
                  {category.categoryChildren.map((subcategory) => (
                    <div
                      key={`${category['categoryId']}-${subcategory['categoryId']}`} // Sử dụng tổ hợp ID để tránh trùng lặp
                      className={`subcategory-item ${isSubcategorySelected(subcategory['categoryId']) ? 'selected' : ''}`}
                      onClick={() => handleCategorySelect(subcategory['categoryId'])}
                    >
                      {subcategory['categoryName']}
                      <small> ({subcategory.count || 0})</small>
                    </div>
                  ))}
                </div>
              ) : openCategoryId === category['categoryId'] && (!category.categoryChildren || category.categoryChildren.length === 0) ? (
                <div>No subcategories available</div> // Hiển thị nếu không có danh mục con
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );  
};

export default CategoryFilter;
