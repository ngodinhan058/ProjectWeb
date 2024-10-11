import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryFilter = () => {
  const [categories, setCategories] = useState([]); // Lưu dữ liệu danh mục từ API
  const [openCategoryId, setOpenCategoryId] = useState(null); // Theo dõi danh mục cha nào đang mở
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // Theo dõi danh mục con được chọn
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading

  // Fetch dữ liệu từ API khi component được mount
  useEffect(() => {
    setIsLoading(true); // Bắt đầu trạng thái loading

    axios.get('http://192.168.1.11:8080/api/v1/tree')
      .then(response => {
        setCategories(response.data.data); // Lưu dữ liệu từ API vào state
        setIsLoading(false); // Tắt trạng thái loading sau khi nhận dữ liệu
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Tắt trạng thái loading nếu có lỗi xảy ra
      });
  }, []); // [] đảm bảo chỉ gọi API khi component mount lần đầu

  // Hàm để mở/đóng danh mục cha
  const toggleCategory = (id) => {
    if (openCategoryId === id) {
      console.log(openCategoryId)
      setOpenCategoryId(null); // Đóng nếu đã mở
    } else {
      setOpenCategoryId(id); // Mở nếu chưa mở
    }
  };

  // Hàm xử lý khi nhấn vào danh mục con
  const handleCategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    console.log(`Selected subcategory: ${subcategory['category-name']}`); // Xử lý logic khi chọn danh mục con
  };

  if (isLoading) {
    return <div>Loading...</div>; // Hiển thị loading nếu dữ liệu chưa tải xong
  }

  return (
    <div className="aside">
      <h3 className="aside-title">Category</h3>
      <div className="checkbox-filter">
        {categories.map((category) => (
          <div key={category.id}>
            <h4 onClick={() => toggleCategory(category.id)}>
              {category['category-name']}
              {openCategoryId === category.id ? ' ▲' : ' ▼'}
            </h4>

            {/* Hiển thị danh mục con nếu danh mục cha đang mở */}
            {openCategoryId === category.id && category.childrens && category.childrens.length > 0 && (
              <div className="subcategory">
                {category.childrens.map((subcategory) => (
                  <div
                    key={subcategory['category-slug']}
                    className={`subcategory-item ${selectedSubcategory?.['category-slug'] === subcategory['category-slug'] ? 'selected' : ''}`}
                    onClick={() => handleCategorySelect(subcategory)}
                  >
                    {subcategory['category-name']}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
