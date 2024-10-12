import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryFilter = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]); // Lưu dữ liệu danh mục từ API
  const [openCategoryId, setOpenCategoryId] = useState(null); // Theo dõi danh mục cha nào đang mở
  const [selectedSubcategories, setSelectedSubcategories] = useState([]); // Theo dõi nhiều danh mục con được chọn
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading

  // Fetch dữ liệu từ API khi component được mount
  useEffect(() => {
    setIsLoading(true); // Bắt đầu trạng thái loading

    axios.get('http://192.168.1.11:8080/api/v1/tree')
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

  // Hàm xử lý khi nhấn vào danh mục con (cho phép chọn nhiều danh mục con)
  const handleCategorySelect = (subcategory) => {
    setSelectedSubcategories((prevSelected) => {
      if (prevSelected.find((item) => item['category-id'] === subcategory['category-id'])) {
        // Bỏ chọn nếu danh mục con đã được chọn trước đó
        return prevSelected.filter((item) => item['category-id'] !== subcategory['category-id']);
      } else {
        // Thêm danh mục con nếu chưa được chọn
        return [...prevSelected, subcategory];
      }
    });
  };

  // Kiểm tra xem danh mục con có đang được chọn không
  const isSubcategorySelected = (subcategory) => {
    return selectedSubcategories.find((item) => item['category-id'] === subcategory['category-id']);
  };

  // Hiển thị loading nếu dữ liệu chưa tải xong
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="aside">
      <h3 className="aside-title">Category</h3>
      <div className="checkbox-filter">
        {categories.length === 0 ? (
          <div>No categories available</div> // Hiển thị nếu không có danh mục nào
        ) : (
          categories.map((category) => (
            <div key={category['category-id']}>
              <h4 onClick={() => toggleCategory(category['category-id'])}>
                {category['category-name']}
                <span>{openCategoryId === category['category-id'] ? ' ▲' : ' ▼'}</span>
              </h4>

              {/* Hiển thị danh mục con nếu danh mục cha đang mở */}
              {openCategoryId === category['category-id'] && category.childrens && category.childrens.length > 0 ? (
                <div className="subcategory">
                  {category.childrens.map((subcategory) => (
                    <div
                      key={`${category['category-id']}-${subcategory['category-slug']}`} // Sử dụng tổ hợp ID để tránh trùng lặp
                      className={`subcategory-item ${isSubcategorySelected(subcategory) ? 'selected' : ''}`}
                      onClick={() => handleCategorySelect(subcategory)}
                    >
                      {subcategory['category-name']}
                      <small> ({subcategory.count || 0})</small>
                    </div>
                  ))}
                </div>
              ) : openCategoryId === category['category-id'] && (!category.childrens || category.childrens.length === 0) ? (
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
