import React, { useState, useEffect, useRef } from 'react';
import { Animated, useWindowDimensions, } from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import DesktopCollections from "../components/DesktopCollections";
import MobileCollections from "../components/MobileCollections";
import Banner from "../components/Banner";
import { BASE_URL } from "../components/api/config";
import { axiosInstance } from "../components/api/axiosConfig";

const HomePage = () => {
  const [mockCollections, setAllCollections] = useState({});
  const [loading, setLoading] = useState(true);
  const [banners, setBanner] = useState([]);
  const isDesktop = useMediaQuery({ minWidth: 481 });
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
    let apiUrl = `${BASE_URL}slideshows?content=banner`;
    setLoading(true);
    axiosInstance
      .get(apiUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      })
      .then((response) => {
        const dataColletion = response.data.data;
        setBanner(dataColletion);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setBanner([]);
          setLoading(true);
        } else {
          console.error('Error fetching data:', error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // const scrollX = useRef(0);
  // const scrollViewRef = useRef(null);
  // const { width: windowWidth } = useWindowDimensions();
  // const intervalRef = useRef(null);

  // useEffect(() => {
  //   let currentIndex = 0;

  //   intervalRef.current = setInterval(() => {
  //     if (scrollViewRef.current) {
  //       currentIndex = (currentIndex + 1) % banners.length;
  //       scrollX.current = currentIndex * windowWidth;

  //       // Animate scroll using `scrollLeft` for horizontal scrolling
  //       scrollViewRef.current.scrollTo({
  //         left: scrollX.current,
  //         behavior: 'smooth', // Smooth scrolling
  //       });
  //     }
  //   }, 3000); // Auto-scroll every 3 seconds

  //   return () => {
  //     clearInterval(intervalRef.current); // Clear interval when the component unmounts
  //   };
  // }, [windowWidth, banners.length]);
  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <Banner banners={banners} loading={loading}/>
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
  );
};

export default HomePage;
