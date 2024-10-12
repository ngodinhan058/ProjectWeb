import React, { useState , useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CategoryFilter = () => {
  const [openCategory, setOpenCategory] = useState(null); // Theo dõi danh mục nào đang mở
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // Theo dõi danh mục con được chọn
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  
  // Dữ liệu mẫu với danh mục cha và con
  useEffect(() => {
    const fetchCategories = async () => {
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCategories([
        // Sample category data

        {
          id: 'category-1',
          name: 'Đồng hồ',
          subcategories: [
            { id: 'subcategory-1', name: 'Đồng hồ thể thao', count: 200 },
            { id: 'subcategory-2', name: 'Đồng hồ thông minh', count: 150 },
            { id: 'subcategory-3', name: 'Đồng hồ cơ', count: 120 },
            { id: 'subcategory-4', name: 'Đồng hồ điện tử', count: 80 },
          ],
        },
        {
          id: 'category-2',
          name: 'Phụ kiện',
          subcategories: [
            { id: 'subcategory-1', name: 'Giày thể thao', count: 300 },
            { id: 'subcategory-2', name: 'Mũ thể thao', count: 50 },
            { id: 'subcategory-3', name: 'Túi thể thao', count: 100 },
            { id: 'subcategory-4', name: 'Vớ thể thao', count: 60 },
            { id: 'subcategory-5', name: 'Băng đô thể thao', count: 30 },
          ],
        },
        {
          id: 'category-3',
          name: 'Áo',
          subcategories: [
            { id: 'subcategory-1', name: 'Áo thun thể thao', count: 250 },
            { id: 'subcategory-2', name: 'Áo khoác thể thao', count: 40 },
            { id: 'subcategory-3', name: 'Áo lót thể thao', count: 90 },
            { id: 'subcategory-4', name: 'Áo dài tay', count: 25 },
          ],
        },
        {
          id: 'category-4',
          name: 'Quần',
          subcategories: [
            { id: 'subcategory-1', name: 'Quần đùi thể thao', count: 75 },
            { id: 'subcategory-2', name: 'Quần legging', count: 110 },
            { id: 'subcategory-3', name: 'Quần dài thể thao', count: 60 },
            { id: 'subcategory-4', name: 'Quần jogger', count: 130 },
          ],
        },
        {
          id: 'category-5',
          name: 'Giày địa hình',
          subcategories: [
            { id: 'subcategory-1', name: 'Giày leo núi', count: 80 },
            { id: 'subcategory-2', name: 'Giày trekking', count: 90 },
            { id: 'subcategory-3', name: 'Giày chạy địa hình', count: 50 },
            { id: 'subcategory-4', name: 'Giày đi bộ', count: 40 },
          ],
        },
        {
          id: 'category-6',
          name: 'Giày chạy',
          subcategories: [
            { id: 'subcategory-1', name: 'Giày chạy bộ', count: 80 },
            { id: 'subcategory-2', name: 'Giày chạy địa hình', count: 90 },
            { id: 'subcategory-3', name: 'Giày chạy đường phố', count: 50 },
            { id: 'subcategory-4', name: 'Giày chạy bền', count: 40 },
          ],
        },
        {
          id: 'category-7',
          name: 'Dinh dưỡng',
          subcategories: [
            { id: 'subcategory-1', name: 'Bột protein', count: 80 },
            { id: 'subcategory-2', name: 'Thực phẩm bổ sung', count: 90 },
            { id: 'subcategory-3', name: 'Thức uống thể thao', count: 50 },
            { id: 'subcategory-4', name: 'Vitamin và khoáng chất', count: 40 },
          ],
        },
      ]);
      setLoading(false); // Set loading to false after fetching
    };
    fetchCategories();
  }, []);


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
        {loading ? (
          // Show skeleton while loading
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} height={30} style={{ marginBottom: '10px' }} />
          ))
        ) : (
          categories.map((category) => (
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
          ))
        )}
      </div>
    </div>
  );
};


export default CategoryFilter;