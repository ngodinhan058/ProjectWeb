import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import { BASE_URL } from './api/config';
import { Link, useParams } from 'react-router-dom';

const CategoryFilter = ({ onCategoryChange }) => {
  const [openCategoryId, setOpenCategoryId] = useState(null); // Theo dõi danh mục cha nào đang mở
  const [selectedSubcategories, setSelectedSubcategories] = useState([]); // Theo dõi nhiều danh mục con được chọn
  const [categories, setCategories] = useState([]); // Lưu dữ liệu danh mục từ API
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const { categoryIdFromLink } = useParams();

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
    setSelectedSubcategories(categoryId)

  };

  // Kiểm tra xem danh mục con có đang được chọn không
  const isSubcategorySelected = (categoryId) => {
    return selectedSubcategories && selectedSubcategories.includes(categoryId);
  };

  return (
    <div className="aside">
      <h3 className="aside-title">Category</h3>
      <div className="checkbox-filter">
        {categories.length === 0 ? (
          Array(5).fill().map((_, index) => (
            <Skeleton height={30} />
          ))
          // Hiển thị nếu không có danh mục nào
        ) : (
          categories.map((category) => (
            <div key={category['categoryId']} style={{ position: 'relative' }}>
              <Link
                to={`/${category['categoryId']}`}
                onClick={() => handleCategorySelect(category['categoryId'])}
                className={`category-item ${isSubcategorySelected(category['categoryId']) ? 'selected' : ''}`}
              >
                <h4>{category['categoryName']}</h4>
              </Link>

              <div
                style={{ position: 'absolute', top: 10, right: '5%' }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategory(category['categoryId']);
                }}
              >
                <span style={{ cursor: 'pointer', color: '#000' }}>
                  {openCategoryId === category['categoryId'] ? ' ▲' : ' ▼'}
                </span>
              </div>

              {/* Hiển thị danh mục con nếu danh mục cha đang mở */}
              {openCategoryId === category['categoryId'] && category.categoryChildren && category.categoryChildren.length > 0 ? (
                <div className="subcategory">
                  {category.categoryChildren.map((subcategory) => (
                    <Link
                      to={`/${subcategory['categoryId']}`}
                      onClick={() => handleCategorySelect(subcategory['categoryId'])}
                    >
                      <div
                        key={`${category['categoryId']}-${subcategory['categoryId']}`}
                        className={`subcategory-item ${isSubcategorySelected(subcategory['categoryId']) ? 'selected' : ''}`}
                      >
                        {subcategory['categoryName']}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : openCategoryId === category['categoryId'] && (!category.categoryChildren || category.categoryChildren.length === 0) ? (
                <div>No subcategories available</div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
