import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Breadcrumb = ({ categoryId, allCategories }) => {
  const [breadcrumbPath, setBreadcrumbPath] = useState([]);

  const findCategoryById = (categories, id) => {
    for (const category of categories) {
      if (category.categoryId === id) return category;
      if (category.categoryChildren && category.categoryChildren.length > 0) {
        const childCategory = findCategoryById(category.categoryChildren, id);
        if (childCategory) return childCategory;
      }
    }
    return null;
  };

  const buildBreadcrumbPath = (currentCategoryId, path = []) => {
    const category = findCategoryById(allCategories, currentCategoryId);
    
    if (category) {
      // Thêm danh mục hiện tại vào đầu đường dẫn
      path.unshift({
        categoryId: category.categoryId,
        categoryName: category.categoryName
      });

      // Nếu có danh mục cha, gọi đệ quy để thêm vào đường dẫn
      if (category.categoryParent) {
        return buildBreadcrumbPath(category.categoryParent, path);
      }
    }
    return path;
  };

  useEffect(() => {
    const path = buildBreadcrumbPath(categoryId);
    setBreadcrumbPath(path);
  }, [categoryId, allCategories]); // Cập nhật khi categoryId hoặc allCategories thay đổi

  return (
    <nav aria-label="breadcrumb">
      <ul className="breadcrumb">
        <li key="home">
          <Link to="/">Trang chủ</Link>
        </li>
        {breadcrumbPath.map((cat, index) => (
          <li key={cat.categoryId}>
            <Link to={`/${cat.categoryId}`}>
              {cat.categoryName}
            </Link>
            {index < breadcrumbPath.length - 1 }
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
