import React from 'react';
import { useLocation } from 'react-router-dom';

const Breadcrumb = ({ categories, name }) => {
    // Lấy danh mục cha và danh mục con
    const parentCategory = categories[0]; // Giả sử danh mục cha là phần tử đầu tiên
    const parentCategoryName = parentCategory?.categoryName; // Tên danh mục cha
    const parentCategoryId = parentCategory?.categoryId; // ID danh mục cha
    const childCategories = parentCategory?.categoryChildren || []; // Lấy danh sách danh mục con

    return (
        <div className="col-md-12">
            <ul className="breadcrumb-tree">
                <li><a href="http://localhost:3000/" id="home-link">Home</a></li>
                {parentCategoryName && (
                    <li>
                        <a href={`#${parentCategoryId}`} id={`parent-category-${parentCategoryId}`}>
                            {parentCategoryName}
                        </a>
                    </li>
                )}
                {childCategories.map((child) => (
                    <li key={child.categoryId}>
                        <a href={`#${child.categoryId}`} id={`child-category-${child.categoryId}`}>
                            {child.categoryName}
                        </a>
                    </li>
                ))}
                <li className="active" id="product-name">{name}</li>
            </ul>
        </div>
    );
};

export default Breadcrumb;
