import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import DesktopCollections from "../components/DesktopCollections";
import MobileCollections from "../components/MobileCollections";
import { BASE_URL } from "../components/api/config";
import { axiosInstance } from "../components/api/axiosConfig";
const HomePage = () => {
  const [mockCollections, setAllCollections] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ minWidth: 481 });
  const [suppliers, setSuppliers] = useState([]);
  const [offset, setOffset] = useState(0); // Offset để điều chỉnh vị trí


  useEffect(() => {
    let apiUrl = `${BASE_URL}collection/123e4567-e89b-12d3-a456-426614174000`;
    setLoading(true);
    axiosInstance
      .get(apiUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      })
      .then((response) => {
        const dataColletion = response.data.data;
        setAllCollections(dataColletion);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setAllCollections([]); // Lỗi 400, coi như không có sản phẩm
          setLoading(true);
        } else {
          console.error('Error fetching data:', error);
        }
      })
      .finally(() => {
        setLoading(false); // Kết thúc loading
      });
  }, []);
  useEffect(() => {
    let apiUrl = `${BASE_URL}product-suppliers/category`;
    setLoading(true);
    axiosInstance
      .get(apiUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      })
      .then((response) => {
        const dataSuppliers = response.data.data;
        setSuppliers(dataSuppliers);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setSuppliers([]); // Lỗi 400, coi như không có sản phẩm
          setLoading(true);
        } else {
          console.error('Error fetching data:', error);
        }
      })
      .finally(() => {
        setLoading(false); // Kết thúc loading
      });
  }, []);
  const displayedsuppliers = suppliers.slice(
    offset,
    offset + 6
  );

  useEffect(() => {
    if (suppliers.length > 6) {
      const interval = setInterval(() => {
        setOffset((prevOffset) => (prevOffset + 1) % suppliers.length);
      }, 6000); // Mỗi 6 giây

      return () => clearInterval(interval); // Dọn dẹp khi component unmount
    }
  }, [suppliers]);

  return (
    <>
      <div className="logo-container" style={{ display: "flex", overflow: "hidden" }}>
        {displayedsuppliers.map((suppliers) => (
          <div key={suppliers.productSupplierSd} className="logo-item" style={{ flex: "0 0 auto" }}>
            <img
              src={suppliers.productSupplierLogo}
              alt={suppliers.productSupplierName}
              className="logo-image"
              style={{ width: "150px", height: "150px", margin: "0 10px" }}
            />
          </div>
        ))}
      </div>

      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title">
                <h3 className="title" style={{ textAlign: 'center' }}>Collections</h3>
              </div>
            </div>
            {loading ? (
              <Skeleton count={3} height={200} />
            ) : isDesktop ? (
              <DesktopCollections collections={mockCollections} />
            ) : (
              <MobileCollections collections={mockCollections} />
            )}
          </div>
        </div>
      </div>

    </>
  );
};

export default HomePage;