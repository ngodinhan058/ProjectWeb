import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Đảm bảo import CSS cho skeleton

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const [isExpanded, setIsExpanded] = useState(false); // Trạng thái hiển thị toàn bộ hay rút gọn

  // Giả lập tải dữ liệu khi khởi động
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Thời gian tải dữ liệu
    return () => clearTimeout(timer); // Dọn dẹp khi component unmount
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setLoading(true); // Khi chuyển tab, thiết lập lại trạng thái loading
    setTimeout(() => setLoading(false), 3000); // Giả lập thời gian tải dữ liệu
  };

  // Nội dung mô tả bằng Markdown
  const descriptionMarkdown = `
### Description
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliq.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Images

  `;

  // Hàm chuyển đổi Markdown thành HTML (do không sài được thư viện)
  const markdownToHtml = (markdown) => {
    return markdown
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" style="max-width: 100%; height: auto;" />') // Chuyển đổi cú pháp hình ảnh
      .replace(/### (.*?)\n/g, '<h3>$1</h3>') // Chuyển đổi ### thành <h3>
      .replace(/## (.*?)\n/g, '<h2>$1</h2>')   // Chuyển đổi ## thành <h2>
      .replace(/# (.*?)\n/g, '<h1>$1</h1>')     // Chuyển đổi # thành <h1>
      .replace(/\n/g, '<br />')                  // Chuyển đổi xuống dòng
      .replace(/\* (.*?)\n/g, '<li>$1</li>')     // Chuyển đổi * thành <li>
      .replace(/<(li)>/g, '<ul><li>')            // Thêm <ul> trước <li>
      .replace(/<\/li>/g, '</li></ul>');         // Đóng <ul> sau <li>
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded); // Đảo ngược trạng thái giữa rút gọn và hiển thị đầy đủ
  };

  return (
    <div className="col-md-12">
      <div id="product-tab">
        {/* Tab điều hướng */}
        <ul className="tab-nav">
          <li className={activeTab === 'description' ? 'active' : ''}>
            <button onClick={() => handleTabClick('description')}>
              Description
            </button>
          </li>
          <li className={activeTab === 'details' ? 'active' : ''}>
            <button onClick={() => handleTabClick('details')}>
              Comment
            </button>
          </li>
          <li className={activeTab === 'reviews' ? 'active' : ''}>
            <button onClick={() => handleTabClick('reviews')}>
              Reviews (3)
            </button>
          </li>
        </ul>

        {/* Nội dung của các tab */}
        <div className="tab-content">
          {loading ? (
            <Skeleton count={8} />
          ) : (
            <>
              {activeTab === 'description' && (
                <div id="tab1">
                  <div
                    className={`description-content ${isExpanded ? 'expanded' : ''}`}
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(descriptionMarkdown) }}
                  />
                  <button onClick={handleToggleExpand} className="btn-see-more">
                    {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                  </button>
                </div>
              )}

              {activeTab === 'details' && (
                <div id="tab2">
                  <h4>Tính năng Details đang phát triển...</h4>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div id="tab3">
                  <h4>Tính năng Comment đang phát triển...</h4>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
