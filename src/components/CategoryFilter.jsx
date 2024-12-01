import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import { BASE_URL } from './api/config';
import { Link, useParams } from 'react-router-dom';

const CategoryFilter = ({ isLoading, onCategoryChange }) => {
  const [openCategoryId, setOpenCategoryId] = useState(null); 
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); 
  const [categories, setCategories] = useState([]); 
  const { categoryIdFromLink } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}categories`, {
          headers: { 'ngrok-skip-browser-warning': 'true' },
        });
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategories();

    if (categoryIdFromLink) {
      setSelectedSubcategory(categoryIdFromLink);
    }
  }, [categoryIdFromLink]);

  useEffect(() => {
    onCategoryChange(selectedSubcategory);

    if (selectedSubcategory) {
      const parentCategory = categories.find(category =>
        category.categoryChildren?.some(subcategory => subcategory.categoryId === selectedSubcategory)
      );
      if (parentCategory) {
        setOpenCategoryId(parentCategory.categoryId);
      }
    }
  }, [selectedSubcategory, categories]);

  const toggleCategory = (id) => {
    setOpenCategoryId((prevId) => (prevId === id ? null : id));
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedSubcategory(prev => (prev === categoryId ? null : categoryId));

    // Nếu là danh mục cha được chọn, đóng tất cả danh mục con
    if (categoryId === openCategoryId) {
      setOpenCategoryId(null);
    } else {
      setOpenCategoryId(categoryId);
    }
  };

  const isSubcategorySelected = (categoryId) => selectedSubcategory === categoryId;
  const isCategorySelected = (categoryId) => selectedSubcategory === categoryId;

  return (
    <div className="aside">
      <h3 className="aside-title">Category</h3>
      <div className="checkbox-filter">
        {categories.map((category, index) => (
          isLoading ? (
            <Skeleton height={37.6} key={index} style={{ marginTop: 10 }} />
          ) : (
            <div key={category.categoryId} style={{ position: 'relative' }}>
              <Link
                to={isCategorySelected(category.categoryId) ? `/product-list` : `/product-list/${category.categoryId}`}
                onClick={() => handleCategorySelect(category.categoryId)}
                className={`category-item ${isCategorySelected(category.categoryId) ? 'selected' : ''}`}
              >
                <h4>{category.categoryName}</h4>
              </Link>

              <div
                style={{ position: 'absolute', top: 10, right: '5%' }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategory(category.categoryId);
                }}
              >
                <span style={{ cursor: 'pointer', color: '#000' }}>
                  {openCategoryId === category.categoryId ? ' ▲' : ' ▼'}
                </span>
              </div>

              {openCategoryId === category.categoryId && (
                category.categoryChildren?.length > 0 ? (
                  <div className="subcategory">
                    {category.categoryChildren.map((subcategory) => (
                      <Link
                        to={isSubcategorySelected(subcategory.categoryId) ? `/product-list` : `/product-list/${subcategory.categoryId}`}
                        key={`${category.categoryId}-${subcategory.categoryId}`}
                        onClick={() => handleCategorySelect(subcategory.categoryId)}
                      >
                        <div className={`subcategory-item ${isSubcategorySelected(subcategory.categoryId) ? 'selected' : ''}`}>
                          {subcategory.categoryName}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div>No subcategories available</div>
                )
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
