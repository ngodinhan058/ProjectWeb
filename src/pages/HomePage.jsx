import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import DesktopCollections from "../components/DesktopCollections";
import MobileCollections from "../components/MobileCollections";

const mockCollections = [
  {
    id: 1,
    name: "Collections Top 1",
    image:
      "https://pos.nvncdn.com/be3294-43017/campaign/20240524_oNYjSZ5b.jpeg",
    products: [
      {
        id: "00f81ac1-1e15-4e26-9aac-a44c2873f4e8",
        name: "iPhone 16",
        image:
          "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329149/iphone-16-pro-max-titan-den-1-638638962017739954-750x500.jpg",
        price: "234đ",
      },
      {
        id: "31360000-0000-0000-0000-000000000000",
        name: "Xiaomi 14 Ultra",
        image:
          "https://cdn.tgdd.vn/Products/Images/42/313889/xiaomi-14-ultra-1-750x500.jpg",
        price: "180.000 ₫",
      },
      {
        id: "50038924-ade1-48bc-8336-73b11255bfb5",
        name: "MacBook Air M1",
        image:
          "https://cdn.tgdd.vn/Products/Images/44/231244/grey-1-750x500.jpg",
        price: "190.000 ₫",
      },
      {
        id: "31380000-0000-0000-0000-000000000000",
        name: "Xiaomi 14T Pro",
        image:
          "https://cdn.tgdd.vn/Products/Images/42/313889/xiaomi-14-ultra-1-750x500.jpg",
        price: "1.090.000 ₫",
      },
      {
        id: "32e0ed13-66fd-4608-b783-b999cecfbd40",
        name: "Laptop Gaming MSI GF63",
        image:
          "https://cdn.tgdd.vn/Products/Images/44/231244/grey-1-750x500.jpg",
        price: "1.430.000 đ",
      },
      {
        id: "a547c7cf-f93e-4833-99fc-b82ffd1c0242",
        name: "iPhone 16 Pro Max",
        image:
          "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329149/iphone-16-pro-max-titan-den-1-638638962017739954-750x500.jpg",
        price: "1.490.00 đ",
      },
    ],
  },
  {
    id: 2,
    name: "Collection Trending",
    image:
      "https://pos.nvncdn.com/be3294-43017/campaign/20241123_WLCk6DeD.jpeg",
    products: [
      {
        id: "dd65a34e-f646-462e-a3ce-8d78d28460fe",
        name: "Samsung Galaxy S24 Ultra",
        image:
          "https://cdn.tgdd.vn/Products/Images/42/326348/samsung-galaxy-z-fold6-xanh-navy-1-750x500.jpg",
        price: "1.499.000 ₫",
      },
      {
        id: "d7b72420-5642-48f7-895e-6204b572dc51",
        name: "Samsung Galaxy A06",
        image:
          "https://cdn.tgdd.vn/Products/Images/42/326348/samsung-galaxy-z-fold6-xanh-navy-1-750x500.jpg",
        price: "1.490.000 đ",
      },
      {
        id: "baf72de3-9128-453e-8a20-dcecce3f3305",
        name: "iPhone 15 Pro Max",
        image:
          "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329149/iphone-16-pro-max-titan-den-1-638638962017739954-750x500.jpg",
        price: "1.590.000 đ",
      },
      {
        id: "1d489d11-4245-4fc9-b5f3-a37e85c91b6d",
        name: "iPhone 16 Plus",
        image:
          "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/329149/iphone-16-pro-max-titan-den-1-638638962017739954-750x500.jpg",
        price: "1.990.000 đ",
      },
      {
        id: "778640d8-1429-4255-aa82-8374d5342a13",
        name: "Samsung Galaxy Z Flip 6",
        image:
          "https://cdn.tgdd.vn/Products/Images/42/326348/samsung-galaxy-z-fold6-xanh-navy-1-750x500.jpg",
        price: "1.990.000 đ",
      },
      {
        id: "9bd60040-5503-4dff-95a9-cc5112f49313",
        name: "Samsung Galaxy Z Fold 6",
        image:
          "https://cdn.tgdd.vn/Products/Images/42/326348/samsung-galaxy-z-fold6-xanh-navy-1-750x500.jpg",
        price: "1.890.000 đ",
      },
    ],
  },
];

const HomePage = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ minWidth: 481 });

  useEffect(() => {
    setTimeout(() => {
      setCollections(mockCollections);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-title">
              <h3 className="title">Collections</h3>
            </div>
          </div>
          {loading ? (
            <Skeleton count={3} height={200} />
          ) : isDesktop ? (
            <DesktopCollections collections={collections} />
          ) : (
            <MobileCollections collections={collections} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
