import React from 'react';

const SortAndShow = ({ setCurrentPage }) => {
  // Hàm xử lý khi thay đổi giá trị Sort hoặc Show
  const handleSortOrShowChange = () => {
    setCurrentPage(1); // Quay về trang đầu tiên khi thay đổi giá trị
  };

  return (
    <div className="store-filter clearfix">
      <div className="store-sort">
        <label>
          Sort By:
          <select className="input-select" onChange={handleSortOrShowChange}>
            <option value="0">Giá (giảm dần)</option>
            <option value="1">Giá (tăng dần)</option>
            <option value="2">Mức ưu đãi (giảm dần)</option>
          </select>
        </label>

        <label>
          Show:
          <select className="input-select" onChange={handleSortOrShowChange}>
            <option value="0">20</option>
            <option value="1">50</option>
            <option value="all">All products</option>
          </select>
        </label>
      </div>
      <ul className="store-grid">
        <li className="active">
          <i className="fa fa-th"></i>
        </li>
        <li>
          <a href="#!">
            <i className="fa fa-th-list"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SortAndShow;
  