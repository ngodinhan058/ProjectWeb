import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';

const CategoryFilter = ({ onCategoryChange }) => {
  const [openCategoryId, setOpenCategoryId] = useState(null); // Theo dõi danh mục cha nào đang mở
  const [selectedSubcategories, setSelectedSubcategories] = useState([]); // Theo dõi nhiều danh mục con được chọn
  const [categories, setCategories] = useState([]); // Lưu dữ liệu danh mục từ API
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading

  // Fetch dữ liệu từ API khi component được mount
 // Fetch dữ liệu từ API khi component được mount
 useEffect(() => {
  setIsLoading(true); // Bắt đầu trạng thái loading

  axios.get('')
    .then(response => {
      setCategories(response.data.data || []); // Lưu dữ liệu từ API vào state
      setIsLoading(false); // Tắt trạng thái loading sau khi nhận dữ liệu
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setIsLoading(false); // Tắt trạng thái loading nếu có lỗi xảy ra
    });
}, []); // [] đảm bảo chỉ gọi API khi component mount lần đầu


  useEffect(() => {
    onCategoryChange(selectedSubcategories);
  }, [selectedSubcategories]);

  // Hàm để mở/đóng danh mục cha
  const toggleCategory = (id) => {
    setOpenCategoryId((prevId) => (prevId === id ? null : id)); // Đóng nếu đã mở, mở nếu chưa mở
  };

  const handleCategorySelect = (category) => {
    setSelectedSubcategories([category] != null ? [category] : []);
  };



  // Kiểm tra xem danh mục con có đang được chọn không
  const isSubcategorySelected = (subcategory) => {
    return selectedSubcategories.find((item) => item['categoryId'] === subcategory['categoryId']);
  };

  // Hiển thị loading nếu dữ liệu chưa tải xong
  if (isLoading) {
    return (
      <div className="aside">
        <h3 className="aside-title">Category</h3>
        <div className="checkbox-filter">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} height={30} style={{ marginBottom: '10px' }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="aside">
      <h3 className="aside-title">Category</h3>
      <div className="checkbox-filter">
        {categories.length === 0 ? (
          <div>No categories available</div> // Hiển thị nếu không có danh mục nào
        ) : (
          categories.map((category) => (
             <div key={category['categoryId']} style={{ position: 'relative', }}>
              <div style={{ position: 'absolute', top: 10, right: '5%' }} onClick={() => {
                toggleCategory(category['categoryId']);
              }}><span style={{ cursor: 'pointer' }} >{openCategoryId === category['categoryId'] ? ' ▲' : ' ▼'}</span></div>
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
                      className={`subcategory-item ${isSubcategorySelected(subcategory) ? 'selected' : ''}`}
                      onClick={() => handleCategorySelect(subcategory)}
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
