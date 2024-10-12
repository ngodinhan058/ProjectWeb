import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CategoryFilter = () => {
<<<<<<< HEAD
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
=======
  const [categories, setCategories] = useState([]); // Lưu dữ liệu danh mục từ API
  const [openCategoryId, setOpenCategoryId] = useState(null); // Theo dõi danh mục cha nào đang mở
  const [selectedSubcategories, setSelectedSubcategories] = useState([]); // Theo dõi nhiều danh mục con được chọn
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading

  // Fetch dữ liệu từ API khi component được mount
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true); // Bắt đầu trạng thái loading

      try {
        const response = await axios.get('http://192.168.136.135:8080/api/v1/tree');
        setCategories(response.data.data || []); // Lưu dữ liệu từ API vào state
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Tắt trạng thái loading sau khi nhận dữ liệu
      }
>>>>>>> d26fa692e386deef82b6f9b0943367f20a460497
    };

    fetchCategories();
  }, []); // [] đảm bảo chỉ gọi API khi component mount lần đầu

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
