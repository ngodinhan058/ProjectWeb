
import React from 'react';

const SortAndShow = () => {
  return (
    <div className="store-filter clearfix">
      <div className="store-sort">
        <label>
          Sort By:
          <select className="input-select">
            <option value="0">Giá (giảm dần)</option>
            <option value="1">Giá (tăng dần)</option>
            <option value="2">Đánh giá (giảm dần)</option>
            <option value="3">Đánh giá (tăng dần)</option>
            <option value="4">Ưu đãi (giảm dần)</option>
          </select>
        </label>

        <label>
          Show:
          <select className="input-select">
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
          <a href="#">
            <i className="fa fa-th-list"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SortAndShow;
