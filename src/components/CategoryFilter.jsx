import React, { useState } from 'react';

const CategoryFilter = () => {
  const [openCategory, setOpenCategory] = useState(null); // Theo dõi danh mục nào đang mở
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // Theo dõi danh mục con được chọn

  // Dữ liệu mẫu với danh mục cha và con
  const categories = [
    {
      id: 'category-1',
      name: 'Quần áo thể thao',
      subcategories: [
        { id: 'subcategory-1', name: 'Áo thể thao', count: 200 },
        { id: 'subcategory-2', name: 'Quần thể thao', count: 150 },
        { id: 'subcategory-6', name: 'Áo khoác thể thao', count: 120 },
        { id: 'subcategory-7', name: 'Bộ đồ thể thao', count: 80 },
      ],
    },
    {
      id: 'category-2',
      name: 'Phụ kiện thể thao',
      subcategories: [
        { id: 'subcategory-3', name: 'Giày thể thao', count: 300 },
        { id: 'subcategory-4', name: 'Mũ thể thao', count: 50 },
        { id: 'subcategory-5', name: 'Túi thể thao', count: 100 },
        { id: 'subcategory-8', name: 'Vớ thể thao', count: 60 },
        { id: 'subcategory-9', name: 'Băng đô thể thao', count: 30 },
      ],
    },
    {
      id: 'category-3',
      name: 'Thiết bị thể thao',
      subcategories: [
        { id: 'subcategory-10', name: 'Dụng cụ tập gym', count: 250 },
        { id: 'subcategory-11', name: 'Máy chạy bộ', count: 40 },
        { id: 'subcategory-12', name: 'Tạ thể hình', count: 90 },
        { id: 'subcategory-13', name: 'Xe đạp tập thể dục', count: 25 },
      ],
    },
    {
      id: 'category-4',
      name: 'Dụng cụ thể thao ngoài trời',
      subcategories: [
        { id: 'subcategory-14', name: 'Vợt tennis', count: 75 },
        { id: 'subcategory-15', name: 'Bóng đá', count: 110 },
        { id: 'subcategory-16', name: 'Ván trượt', count: 60 },
        { id: 'subcategory-17', name: 'Bóng rổ', count: 130 },
      ],
    },
    {
      id: 'category-5',
      name: 'Trang phục bơi lội',
      subcategories: [
        { id: 'subcategory-18', name: 'Đồ bơi nam', count: 80 },
        { id: 'subcategory-19', name: 'Đồ bơi nữ', count: 90 },
        { id: 'subcategory-20', name: 'Kính bơi', count: 50 },
        { id: 'subcategory-21', name: 'Mũ bơi', count: 40 },
      ],
    },
  ];

  // Hàm để mở/đóng danh mục cha
  const toggleCategory = (id) => {
    if (openCategory === id) {
      setOpenCategory(null); // Đóng nếu đã mở
    } else {
      setOpenCategory(id); // Mở nếu chưa mở
    }
  };

  // Hàm xử lý khi nhấn vào danh mục con
  const handleCategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    console.log(`Selected subcategory: ${subcategory.name}`); // Xử lý logic khi chọn danh mục con
    // Ví dụ: gọi API để load lại danh sách sản phẩm theo subcategory.id
  };

  return (
    <div className="aside">
      <h3 className="aside-title">Category</h3>
      <div className="checkbox-filter">
        {categories.map((category) => (
          <div key={category.id}>
            <h4 onClick={() => toggleCategory(category.id)}>
              {category.name}
              {openCategory === category.id ? ' ▲' : ' ▼'}
            </h4>

            {openCategory === category.id && (
              <div className="subcategory">
                {category.subcategories.map((subcategory) => (
                  <div
                    key={subcategory.id}
                    className={`subcategory-item ${selectedSubcategory?.id === subcategory.id ? 'selected' : ''}`}
                    onClick={() => handleCategorySelect(subcategory)}
                  >
                    {subcategory.name}
                    <small> ({subcategory.count})</small>
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