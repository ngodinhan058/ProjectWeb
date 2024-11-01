import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductTabs = ({ image }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false); // Đặt mặc định là false để rút gọn

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const descriptionMarkdown = `

### Description
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliq.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
![Product Image](../${image[0]?.["productImagePath"]}) 

### Description 2
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

![Product Image](../${image[1]?.["productImagePath"]}) 
### Detail
#### Từ : Việt Nam
#### Material : Polime
#### Địa Chỉ : Thành Phố Hồ Chí Minh

![Product Image](../${image[2]?.["productImagePath"]}) 
### End
  `;

  const markdownToHtml = (markdown) => {
    return markdown
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" style="width:300px; height:250px; display:inline-block;" />') // Chuyển đổi cú pháp hình ảnh
      .replace(/#### (.*?)\n/g, '<h5>$1</h5>') // Chuyển đổi ### thành <h3>
      .replace(/### (.*?)\n/g, '<h3>$1</h3>') // Chuyển đổi ### thành <h3>
      .replace(/## (.*?)\n/g, '<h2>$1</h2>')   // Chuyển đổi ## thành <h2>
      .replace(/# (.*?)\n/g, '<h1>$1</h1>')     // Chuyển đổi # thành <h1>
      .replace(/\n/g, '<br />')                  // Chuyển đổi xuống dòng
      .replace(/\* (.*?)\n/g, '<li>$1</li>')     // Chuyển đổi * thành <li>
      .replace(/<(li)>/g, '<ul><li>')            // Thêm <ul> trước <li>
      .replace(/<\/li>/g, '</li></ul>');         // Đóng <ul> sau <li>
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="col-md-12">
      <div id="product-tab">
        <ul className="tab-nav">
          <li className={activeTab === 'description' ? 'active' : ''}>
            <button onClick={() => handleTabClick('description')}>Description</button>
          </li>
          <li className={activeTab === 'details' ? 'active' : ''}>
            <button onClick={() => handleTabClick('details')}>Comment</button>
          </li>
          <li className={activeTab === 'reviews' ? 'active' : ''}>
            <button onClick={() => handleTabClick('reviews')}>Reviews (3)</button>
          </li>
        </ul>

        <div className="tab-content">
          {loading ? (
            <Skeleton count={3} />
          ) : (
            <>
              {activeTab === 'description' && (
                <div id="tab1">
                  <div
                    className={`description-content ${isExpanded ? 'expanded' : 'collapsed'}`}
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(isExpanded ? descriptionMarkdown : descriptionMarkdown.split("### More Content")[0]) }}
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
