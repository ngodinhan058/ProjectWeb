import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ categories, name }) => {
    // Lấy danh mục cha và danh mục con
    const parentCategory = categories[0]; // Giả sử danh mục cha là phần tử đầu tiên
    const parentCategoryName = parentCategory?.categoryName; // Tên danh mục cha
    const parentCategoryId = parentCategory?.categoryId; // ID danh mục cha
    const childCategories = parentCategory?.categoryChildren || []; // Lấy danh sách danh mục con

    return (
        <div className="col-md-12">
            <ul className="breadcrumb-tree">
                <li><Link to="/">Home</Link></li>
                {parentCategoryName && (
                    <li>
                        <Link to={`/${parentCategoryId}`} id={`parent-category-${parentCategoryId}`}>
                            {parentCategoryName}
                        </Link>
                    </li>
                )}
                {childCategories.map((child) => (
                    <li key={child.categoryId}>
                        <Link to={`/${child.categoryId}`} id={`child-category-${child.categoryId}`}>
                            {child.categoryName}
                        </Link>
                    </li>
                ))}
                <li className="active" id="product-name">{name}</li>
            </ul>
        </div>
    );
};

export default Breadcrumb;
