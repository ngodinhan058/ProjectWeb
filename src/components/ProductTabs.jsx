import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { BASE_URL } from './api/config';
import { axiosInstance } from './api/axiosConfig';

const ProductTabs = ({ image, id }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false); // Đặt mặc định là false để rút gọn
  const [productsState, setProductsState] = useState([]);
  const [productsImage, setProductsImage] = useState([]);
  

  useEffect(() => {
    let apiUrl = `${BASE_URL}product/${id}`;
    axiosInstance
      .get(apiUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      })
      .then((response) => {
        const productData = response.data.data;
        const productImg= response.data.data.productImages;

        setProductsState(productData);
        setProductsImage(productImg);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  // console.log(productsImage);
  
  const descriptionMarkdown = `

### Description
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliq.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
![Product Image](../${productsImage[0]?.["productImagePath"]}) 


### Kết Thúc Mô Tả
  `;
  const markdownToHtml = (markdown) => {
    
    return markdown
    .replace(/!\[(.*?)\]\((.*?)\)/g, (index , altText, imgPath) => {
      // Chuyển đổi cú pháp ảnh Markdown thành thẻ HTML <img>
      return `<img alt="${altText}" src="../${productsImage[imgPath]?.["productImagePath"]}" style="width:300px; height:250px; display:inline-block;" />`;
    })
      .replace(/#### (.*?)\n/g, '<h4>$1</h4>') // Chuyển đổi #### thành <h4>
      .replace(/### (.*?)\n/g, '<h3>$1</h3>')  // Chuyển đổi ### thành <h3>
      .replace(/## (.*?)\n/g, '<h2>$1</h2>')   // Chuyển đổi ## thành <h2>
      .replace(/# (.*?)\n/g, '<h1>$1</h1>')    // Chuyển đổi # thành <h1>
      .replace(/\n/g, '<br />')                // Chuyển đổi xuống dòng
      .replace(/^\* (.*?)(?=\n|$)/gm, '<li>$1</li>') // Chuyển đổi dòng bắt đầu bằng * thành <li>
      .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');    // Bao <ul> xung quanh <li>
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
            <Skeleton count={8} />
          ) : (
            <>
              {activeTab === 'description' && (
                <div id="tab1">
                  <div
                    className={`description-content ${isExpanded ? 'expanded' : 'collapsed'}`}
                    dangerouslySetInnerHTML={{
                      __html: markdownToHtml(
                        isExpanded
                          ? (productsState.post?.postContent || descriptionMarkdown)
                          : (productsState.post?.postContent || descriptionMarkdown).split("### More Content")[0]
                      )
                    }}
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
